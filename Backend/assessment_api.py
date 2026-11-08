"""assessment_api.py -- add to main.py with:  app.include_router(assessment_api.router)"""
from typing import Dict, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

import career_engine as ce

router = APIRouter(prefix="/api/assessment", tags=["assessment"])


class ScoreRequest(BaseModel):
    answers: Dict[str, int]                 # {"R_I_1": 5, "R_I_2": 3, ...}  values 1-5
    tiebreak_choice: Optional[str] = None   # field key, or "none"


@router.get("/questions")
def questions():
    return {"questions": ce.QUESTIONS, "total": len(ce.QUESTIONS)}


@router.post("/score")
def score(req: ScoreRequest):
    try:
        return ce.analyze(req.answers, req.tiebreak_choice)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))