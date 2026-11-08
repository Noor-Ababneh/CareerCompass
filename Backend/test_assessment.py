import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    """التحقق من أن الصفحة الرئيسية تعمل وتُرجع رسالة الحالة الصحيحة"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "مرحبا في CareerCompass",
        "status": "running",
        "database": "ready"
    }

def test_submit_assessment_returns_plan():
    """التحقق من أن إرسال العلامات يُرجع خطة تطوير تحتوي على الحقول المطلوبة"""
    payload = {
        "grades": {"math": 85, "physics": 70, "eng_adv": 95},
        "gpa": 83.33,
        "field": "EngineeringIT",
        "stage": "senior"
    }
    
    response = client.post("/api/assessments", json=payload)
    
    assert response.status_code == 200
    
    data = response.json()
    assert "assessment_id" in data
    assert "result" in data
    assert "sortedImprovementPlan" in data["result"]
    assert "eligibleMajors" in data["result"]

def test_get_invalid_assessment():
    """التحقق من أن طلب تقييم بمعرّف غير موجود يُرجع خطأ 404"""
    response = client.get("/api/assessments/invalid-id-123")
    assert response.status_code == 404