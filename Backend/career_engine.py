"""
career_engine.py -- CareerCompass scoring engine (v3)

Frameworks
  1. Holland RIASEC      -> 18 interest items  + Holland-code congruence of every major
  2. Fleishman & Reilly  -> 12 ability items   (gate abilities of each major)
  3. O*NET               -> 12 work style / context / value items

Unchanged from v1/v2: 42 questions (18/12/12), 7 per RIASEC letter, type weights 1.0/1.5/1.2,
                      raw RIASEC score = sum(weight * answer)  (so the Vue results page keeps working).
New in v3           : every question gives explicit points to specific majors (scoring_map.py).
"""
from __future__ import annotations

import json
import math
from collections import Counter
from pathlib import Path
from typing import Dict, List, Optional

from scoring_map import MAJORS, MAJOR_BY_ID, QUESTION_POINTS

DIMS = ("R", "I", "A", "S", "E", "C")
WEIGHTS = {"interest": 1.0, "aptitude": 1.5, "style": 1.2}        # unchanged

# ---- tunables (calibrated in test_career_engine.py) ---------------------------------
W_ITEMS, W_HOLLAND = 0.80, 0.20       # share of the two signals in the final major score
IPSATIZE = 0.60                       # how much of the student's own average answer is removed
DISPLAY_FULL = 0.85                   # final score shown as 100 % (ideal students of each major score 0.69-0.92)
DISPLAY_FLOOR = 0.00                  # final score that is shown as 0 %
TIE_FIELD_GAP = 0.010                 # tie-breaker only if top-2 fields are this close ...
TIE_MAJOR_GAP = 0.012                 # ... AND their best majors are this close
CLOSE_MAJOR_GAP = 0.02                # majors this close to #1 are flagged "also very close"
FLAT_STD = 0.45                       # answers with std below this are "straight-lining"

# ---- questions ---------------------------------------------------------------------
with open(Path(__file__).with_name("questions_ar.json"), encoding="utf-8") as _f:
    QUESTIONS: List[dict] = json.load(_f)
Q_BY_ID = {q["id"]: q for q in QUESTIONS}
_cnt = Counter(q["type"] for q in QUESTIONS)
assert len(QUESTIONS) == 42 and _cnt == {"interest": 18, "aptitude": 12, "style": 12}, _cnt
assert set(Q_BY_ID) == set(QUESTION_POINTS), "questions and scoring map are out of sync"
MAX_DIM = {d: sum(5 * WEIGHTS[q["type"]] for q in QUESTIONS if q["dimension"] == d) for d in DIMS}

FIELDS = {
    "Health":        {"name": "الحقل الصحي"},
    "EngineeringIT": {"name": "حقل العلوم والتكنولوجيا والهندسة"},
    "Humanities":    {"name": "حقل العلوم الإنسانية والاجتماعية"},
    "Business":      {"name": "حقل الأعمال"},
}

# per-major denominators: the most a major can collect = sum(|points| * question weight)
_MAJOR_MAX: Dict[str, float] = {m["id"]: 0.0 for m in MAJORS}
for _qid, _pts in QUESTION_POINTS.items():
    _w = WEIGHTS[Q_BY_ID[_qid]["type"]]
    for _m, _p in _pts.items():
        _MAJOR_MAX[_m] += abs(_p) * _w


# ---- tie-breaker (absolute last resort: 2 concrete choices between the two tied FIELDS) ----
_TB = {
    frozenset(("Health", "EngineeringIT")): (
        "لو عندك أسبوع كامل تعمل فيه شيئاً واحداً، أيهما تختار؟",
        {"Health": "أعتني بمرضى في مستشفى أو عيادة وأتابع حالتهم",
         "EngineeringIT": "أصمّم أو أبني جهازاً أو برنامجاً وأجرّبه حتى يعمل"}),
    frozenset(("Health", "Humanities")): (
        "أي موقف يُسعدك أكثر؟",
        {"Health": "أن أساعد مريضاً على التعافي من مرض أو إصابة",
         "Humanities": "أن أساعد طالباً على فهم درسه أو شخصاً على حل مشكلة نفسية أو اجتماعية"}),
    frozenset(("Health", "Business")): (
        "لو عندك أسبوع كامل تعمل فيه شيئاً واحداً، أيهما تختار؟",
        {"Health": "أعمل في مستشفى أو صيدلية وأخدم المرضى",
         "Business": "أدير متجراً أو مشروعاً صغيراً وأتابع أرباحه"}),
    frozenset(("EngineeringIT", "Humanities")): (
        "أي مشروع مدرسي تختار؟",
        {"EngineeringIT": "أصنع جهازاً أو تطبيقاً أو نموذجاً يشتغل فعلاً",
         "Humanities": "أكتب موضوعاً أو أصمّم عملاً فنياً أو أشرح فكرة لجمهور"}),
    frozenset(("EngineeringIT", "Business")): (
        "أي مشروع مدرسي تختار؟",
        {"EngineeringIT": "أصنع جهازاً أو تطبيقاً أو نموذجاً يشتغل فعلاً",
         "Business": "أضع خطة لبيع منتج وأحسب التكاليف والأرباح"}),
    frozenset(("Humanities", "Business")): (
        "أي مشروع مدرسي تختار؟",
        {"Humanities": "أكتب أو أصمّم أو أعلّم زملائي موضوعاً مهماً",
         "Business": "أقود فريقاً لبيع منتج وأتخذ قرارات الميزانية"}),
}


# ---- helpers -------------------------------------------------------------------------
def _clip(x, lo=0.0, hi=1.0):
    return max(lo, min(hi, x))


def validate_answers(answers: Dict[str, int]) -> Dict[str, int]:
    missing = [q["id"] for q in QUESTIONS if q["id"] not in answers]
    if missing:
        raise ValueError(f"missing answers: {missing}")
    out = {}
    for q in QUESTIONS:
        v = answers[q["id"]]
        if not isinstance(v, int) or isinstance(v, bool) or not 1 <= v <= 5:
            raise ValueError(f"answer for {q['id']} must be an integer 1-5")
        out[q["id"]] = v
    return out


def raw_scores(answers: Dict[str, int]) -> Dict[str, float]:
    """Identical to the Vue logic: score[dim] += WEIGHT[type] * answer."""
    r = {d: 0.0 for d in DIMS}
    for q in QUESTIONS:
        r[q["dimension"]] += WEIGHTS[q["type"]] * answers[q["id"]]
    return {d: round(v, 4) for d, v in r.items()}


def dimension_percent(raw: Dict[str, float]) -> Dict[str, int]:
    return {d: round(raw[d] / MAX_DIM[d] * 100) for d in DIMS}


def _centered(answers: Dict[str, int]) -> Dict[str, float]:
    """1..5 -> -1..+1, then remove part of the student's own mean (cancels 'agree with everything')."""
    z = {k: (v - 3) / 2 for k, v in answers.items()}
    mean = sum(z.values()) / len(z)
    return {k: _clip(v - IPSATIZE * mean, -1.0, 1.0) for k, v in z.items()}


def _holland_fit(raw: Dict[str, float], code: str) -> float:
    """Position-weighted congruence (3,2,1) between the major's Holland code and the student's profile. 0..1"""
    frac = {d: raw[d] / MAX_DIM[d] for d in DIMS}
    lo, hi = min(frac.values()), max(frac.values())
    s = {d: ((frac[d] - lo) / (hi - lo) if hi > lo else 0.5) for d in DIMS}
    w = (3, 2, 1)
    return sum(w[i] * s[c] for i, c in enumerate(code)) / 6


def _display(score: float) -> int:
    return round(100 * _clip((score - DISPLAY_FLOOR) / (DISPLAY_FULL - DISPLAY_FLOOR)))


def score_majors(answers: Dict[str, int]) -> List[dict]:
    """Final score of a major = 0.8 * item fit + 0.2 * Holland congruence.
       item fit = sum over questions( points * type-weight * centred answer ) / most the major can collect."""
    raw = raw_scores(answers)
    a = _centered(answers)
    results = []
    for m in MAJORS:
        contribs = []
        total = 0.0
        for qid, pts in QUESTION_POINTS.items():
            p = pts.get(m["id"], 0)
            if p == 0:
                continue
            c = p * WEIGHTS[Q_BY_ID[qid]["type"]] * a[qid]
            total += c
            contribs.append((qid, p, c))
        item_fit = total / _MAJOR_MAX[m["id"]]                      # -1 .. 1
        h = _holland_fit(raw, m["holland"])                          # 0 .. 1
        score = W_ITEMS * item_fit + W_HOLLAND * (2 * h - 1)
        contribs.sort(key=lambda t: -t[2])
        strengths = [{"question_id": q, "label_ar": Q_BY_ID[q]["label_ar"], "points": p,
                      "your_answer": answers[q], "source": Q_BY_ID[q]["source"]}
                     for q, p, c in contribs if c > 0 and p > 0][:3]
        gaps = [{"question_id": q, "label_ar": Q_BY_ID[q]["label_ar"], "points": p, "your_answer": answers[q]}
                for q, p, c in sorted(contribs, key=lambda t: t[2]) if p >= 2 and c <= 0][:2]
        results.append({"id": m["id"], "name": m["name"], "field": m["field"], "minGPA": m["minGPA"],
                        "reason": m["reason"], "holland": m["holland"], "score": round(score, 4),
                        "item_fit": round(item_fit, 4), "holland_fit": round(h, 4),
                        "matchPct": _display(score), "strengths": strengths, "gaps": gaps})
    results.sort(key=lambda r: -r["score"])
    return results


def _explain(r: dict) -> str:
    s = "، ".join(x["label_ar"] for x in r["strengths"]) or "—"
    txt = f"رُشِّح لك «{r['name']}» لأن إجاباتك أظهرت: {s}."
    if r["gaps"]:
        txt += " ويحتاج منك تطويراً في: " + "، ".join(x["label_ar"] for x in r["gaps"]) + "."
    return txt


def _field_scores(ranked: List[dict]) -> Dict[str, float]:
    out = {}
    for f in FIELDS:
        top = [r["score"] for r in ranked if r["field"] == f][:3]
        out[f] = 0.7 * top[0] + 0.2 * top[1] + 0.1 * top[2]
    return out


def analyze(answers: Dict[str, int], tiebreak_choice: Optional[str] = None) -> dict:
    """tiebreak_choice: a field key picked by the student, or None / 'none'."""
    answers = validate_answers(answers)
    raw = raw_scores(answers)
    ranked = score_majors(answers)
    fs = _field_scores(ranked)
    order = sorted(fs, key=lambda f: -fs[f])
    best, second = order[0], order[1]

    best_major = {f: next(r["score"] for r in ranked if r["field"] == f) for f in FIELDS}
    field_gap = fs[best] - fs[second]
    major_gap = abs(best_major[best] - best_major[second])
    vals = list(answers.values())
    mean = sum(vals) / len(vals)
    std = math.sqrt(sum((v - mean) ** 2 for v in vals) / len(vals))
    flat = std < FLAT_STD
    needs_tiebreak = (field_gap < TIE_FIELD_GAP and major_gap < TIE_MAJOR_GAP
                      and tiebreak_choice is None and not flat)

    chosen = best
    if tiebreak_choice in (best, second):
        chosen = tiebreak_choice

    in_field = [r for r in ranked if r["field"] == chosen]
    top = in_field[:3]
    for r in top:
        r["why_ar"] = _explain(r)
    close = [r["name"] for r in in_field[1:4] if in_field[0]["score"] - r["score"] < CLOSE_MAJOR_GAP]
    others = [r for r in ranked if r["field"] != chosen][:2]
    code = "".join(d for d, _ in sorted(raw.items(), key=lambda kv: -kv[1])[:3])

    tb = None
    if needs_tiebreak:
        q, opts = _TB[frozenset((best, second))]
        tb = {"question": q,
              "options": [{"value": f, "text": opts[f]} for f in (best, second)] +
                         [{"value": "none", "text": "لا أستطيع أن أقرر الآن"}]}

    return {
        "scores": raw,                                   # same shape the Vue results page already reads
        "dimension_percent": dimension_percent(raw),
        "riasec_code": code,
        "field": chosen,
        "field_name": FIELDS[chosen]["name"],
        "field_match_percent": {f: _display(fs[f]) for f in FIELDS},
        "top_majors": top,
        "also_very_close": close,
        "also_consider": others,
        "validity": {"answer_std": round(std, 2), "flat_pattern": flat,
                     "message_ar": "إجاباتك متشابهة جداً، يُفضَّل إعادة المقياس بتركيز لنتيجة أدق." if flat else None},
        "confidence": {"field_gap": round(field_gap, 4), "major_gap": round(major_gap, 4),
                       "level": "high" if field_gap >= 0.04 else "medium" if field_gap >= TIE_FIELD_GAP else "low"},
        "needs_tiebreak": needs_tiebreak,
        "tiebreak": tb,
    }