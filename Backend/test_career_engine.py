"""Validation harness. Run:  python3 test_career_engine.py   (or pytest)
These are SELF-CONSISTENCY checks of the design, not proof of predictive validity on real students."""
import itertools
import math
import random
from collections import Counter

import career_engine as ce
from scoring_map import MAJORS, QUESTION_POINTS, MAJOR_BY_ID

random.seed(11)
MIDS = [m["id"] for m in MAJORS]


# ---------- 1. structure ----------------------------------------------------------------
def test_structure():
    Q = ce.QUESTIONS
    assert len(Q) == 42
    assert Counter(q["type"] for q in Q) == {"interest": 18, "aptitude": 12, "style": 12}
    assert Counter(q["phase"] for q in Q) == {1: 18, 2: 12, 3: 12}
    assert Counter(q["dimension"] for q in Q) == {d: 7 for d in "RIASEC"}
    assert len({q["text_ar"] for q in Q}) == 42 and len({q["trait"] for q in Q}) == 42


# ---------- 2. every major has enough evidence -------------------------------------------
def test_major_coverage():
    for mid in MIDS:
        pts = [p[mid] for p in QUESTION_POINTS.values() if mid in p]
        pos = [x for x in pts if x > 0]
        assert len(pos) >= 5, (mid, "fewer than 5 supporting questions", len(pos))
        assert max(pos) == 3, (mid, "no defining (3) question")


# ---------- 3. redundancy: cosine similarity of the question->major vectors -------------------
def _vec(qid):
    return [QUESTION_POINTS[qid].get(m, 0) for m in MIDS]


def _cos(a, b):
    na, nb = math.sqrt(sum(x * x for x in a)), math.sqrt(sum(x * x for x in b))
    return sum(x * y for x, y in zip(a, b)) / (na * nb)


def redundancy_report(top=8):
    ids = [q["id"] for q in ce.QUESTIONS]
    pairs = sorted(((_cos(_vec(a), _vec(b)), a, b) for a, b in itertools.combinations(ids, 2)), reverse=True)
    return pairs[:top]


def test_no_redundant_questions():
    worst = redundancy_report(1)[0]
    print("most similar pair:", worst)
    assert worst[0] < 0.80, worst


# ---------- 4. ideal student of each major must get that major ------------------------------
def ideal_answers(mid, other=2):
    a = {}
    for q in ce.QUESTIONS:
        p = QUESTION_POINTS[q["id"]].get(mid, 0)
        a[q["id"]] = 5 if p >= 2 else 4 if p == 1 else 1 if p < 0 else other
    return a


def rank_of(mid, answers):
    ranked = ce.score_majors(answers)
    return [r["id"] for r in ranked].index(mid) + 1, ranked


def test_each_major_is_reachable():
    rows, bad = [], []
    for mid in MIDS:
        rk, ranked = rank_of(mid, ideal_answers(mid))
        rows.append((mid, rk, ranked[0]["id"], ranked[0]["matchPct"]))
        if rk > 3:
            bad.append((mid, rk))
    n1 = sum(1 for r in rows if r[1] == 1)
    print(f"ideal students: #1 for {n1}/{len(MIDS)} majors; not in top-3: {bad}")
    for r in rows:
        if r[1] != 1:
            print("   ", r)
    assert not bad
    return rows


# ---------- 5. noisy students: target in top-3 ------------------------------------------------
def noisy(mid, sd=1.0):
    a = ideal_answers(mid)
    return {k: int(max(1, min(5, round(v + random.gauss(0, sd))))) for k, v in a.items()}


def test_noise_robustness(n=60, sd=1.0):
    t1 = t3 = tot = fld = 0
    for mid in MIDS:
        for _ in range(n):
            rk, ranked = rank_of(mid, noisy(mid, sd))
            tot += 1
            t1 += rk == 1
            t3 += rk <= 3
            fld += ranked[0]["field"] == MAJOR_BY_ID[mid]["field"]
    print(f"noise sd={sd}: target #1 {t1/tot:.1%}  top-3 {t3/tot:.1%}  top-field correct {fld/tot:.1%}")
    return t1 / tot, t3 / tot, fld / tot


# ---------- 6. tie-breaker rate ----------------------------------------------------------------
def test_tiebreaker_rate():
    tb = n = 0
    for mid in MIDS:
        for _ in range(40):
            n += 1
            tb += ce.analyze(noisy(mid, 1.0))["needs_tiebreak"]
    tbr = 0
    for _ in range(3000):
        a = {q["id"]: random.randint(1, 5) for q in ce.QUESTIONS}
        tbr += ce.analyze(a)["needs_tiebreak"]
    print(f"tie-breaker: realistic students {tb/n:.1%}   fully random answers {tbr/3000:.1%}")
    return tb / n, tbr / 3000


def test_random_spread():
    c = Counter()
    for _ in range(3000):
        a = {q["id"]: random.randint(1, 5) for q in ce.QUESTIONS}
        c[ce.analyze(a)["top_majors"][0]["id"]] += 1
    print(f"random students -> {len(c)} distinct #1 majors; most common share {max(c.values())/3000:.1%}")


def test_validation_and_flat():
    import pytest
    with pytest.raises(ValueError):
        ce.analyze({"R_I_1": 5})
    r = ce.analyze({q["id"]: 5 for q in ce.QUESTIONS})
    assert r["validity"]["flat_pattern"] and not r["needs_tiebreak"]


if __name__ == "__main__":
    test_structure(); test_major_coverage()
    print("top redundant pairs:")
    for p in redundancy_report(6):
        print("   %.2f  %s  %s" % p)
    test_no_redundant_questions()
    test_each_major_is_reachable()
    for sd in (0.7, 1.0, 1.3):
        test_noise_robustness(sd=sd)
    test_tiebreaker_rate()
    test_random_spread()