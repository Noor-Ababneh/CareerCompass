import pytest
from fastapi.testclient import TestClient
from main import app

# إنشاء "مستخدم وهمي" لفحص النظام
client = TestClient(app)

def test_read_root():
    """فحص الصفحة الرئيسية وتأكد عمل السيرفر"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "مرحبا في CareerCompass",
        "status": "running",
        "database": "ready"
    }

def test_submit_assessment_returns_plan():
    """فحص إرسال العلامات واستلام خطة التطوير"""
    payload = {
        "grades": {"math": 85, "physics": 70, "eng_adv": 95},
        "gpa": 83.33,
        "field": "EngineeringIT",
        "stage": "senior"
    }
    
    # محاكاة إرسال البيانات من الواجهة
    response = client.post("/api/assessments", json=payload)
    
    # التأكد من نجاح الطلب
    assert response.status_code == 200
    
    # التأكد من صحة البيانات المرجعة
    data = response.json()
    assert "assessment_id" in data
    assert "result" in data
    assert "sortedImprovementPlan" in data["result"]
    assert "eligibleMajors" in data["result"]

def test_get_invalid_assessment():
    """فحص طلب تقييم غير موجود (يجب أن يعطي خطأ 404)"""
    response = client.get("/api/assessments/invalid-id-123")
    assert response.status_code == 404