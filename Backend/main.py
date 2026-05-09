from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional
import database as db
import uuid
import assessment_mock
app = FastAPI(title="CareerCompass API")
@app.on_event("startup")
def startup_event():
    db.init_db()
    db.insert_sample_data()
    print("CareerCompass Backend is working")
class StudentRegistration(BaseModel):
    name: str
    email: EmailStr
    grade_level: str
    stream: Optional[str] = None
    math_score: Optional[int] = None
    science_score: Optional[int] = None
    english_score: Optional[int] = None
    arabic_score: Optional[int] = None

class AssessmentInput(BaseModel):
    grades: dict
    gpa: float
    field: str
    stage: str
@app.get("/")
def read_root():
    return {
        "message": "مرحبا في CareerCompass",
        "status": "running",
        "database": "ready"
    }
#هون تسجيل طالب جديد
@app.post("/register")
def register_student(
    name: str = Form(...),
    email: str = Form(...),
    grade_level: str = Form(...),
    stream: Optional[str] = Form(None),
    math_score: Optional[int] = Form(None),
    science_score: Optional[int] = Form(None),
    english_score: Optional[int] = Form(None),
    arabic_score: Optional[int] = Form(None)
):
    # Validation
    if grade_level not in ['9', '10', '11', '12']:
        raise HTTPException(status_code=400, detail="الصف الدراسي غير صحيح")
    
    if grade_level == '12' and not stream:
        raise HTTPException(status_code=400, detail="يجب اختيار الفرع للصف الثاني عشر")
    
    try:
        conn = db.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO students 
            (name, email, grade_level, stream, math_score, science_score, english_score, arabic_score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (name, email, grade_level, stream, math_score, science_score, english_score, arabic_score))
        
        student_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {
            "message": f"أهلاً {name}! تم تسجيلك بنجاح ✅",
            "student_id": student_id,
            "grade": grade_level
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطأ في التسجيل: {str(e)}")


# بنجيب الأسئلة
@app.get("/questions")
def get_questions():
    questions = db.get_all_questions()
    return {"questions": questions, "total": len(questions)}


# بنجيب التخصصات حسب الفرع
@app.get("/majors/{stream}")
def get_majors(stream: str):
    majors = db.get_majors_by_stream(stream)
    return {"stream": stream, "majors": majors, "count": len(majors)}


# Gap Analysis
@app.get("/gap-analysis/{student_id}/{field_name}")
def gap_analysis(student_id: int, field_name: str):
    gap = db.calculate_gap(student_id, field_name)
    
    if not gap:
        raise HTTPException(status_code=404, detail="الطالب أو المجال غير موجود")
    
    recommendations = []
    if gap['math_gap'] > 0:
        recommendations.append(f"تحتاج لتحسين علامة الرياضيات بمقدار {gap['math_gap']} نقطة")
    
    if gap['science_gap'] > 0:
        recommendations.append(f"تحتاج لتحسين علامة العلوم بمقدار {gap['science_gap']} نقطة")
    
    if not recommendations:
        recommendations.append("ممتاز! أنت مؤهل لهذا المجال 🎉")
    
    return {
        "field": field_name,
        "gaps": gap,
        "recommendations": recommendations
    }


# تقييم وحفظ النتيجة
@app.post("/api/assessments")
def submit_assessment(data: AssessmentInput):
    assessment_id = str(uuid.uuid4())
    db.save_assessment(assessment_id, data.gpa, data.field, data.stage, data.grades)
    
    result = assessment_mock.evaluate_assessment(
        grades=data.grades,
        gpa=data.gpa,
        field=data.field,
        stage=data.stage
    )
    return {
        "message": "تم حفظ التقييم بنجاح",
        "assessment_id": assessment_id,
        "result": result
    }


# جلب تقييم محفوظ
@app.get("/api/assessments/{assessment_id}")
def get_saved_assessment(assessment_id: str):
    record = db.get_assessment(assessment_id)
    if not record:
        raise HTTPException(status_code=404, detail="التقييم غير موجود")
        
    result = assessment_mock.evaluate_assessment(
        grades=record['grades'],
        gpa=record['gpa'],
        field=record['field'],
        stage=record['stage']
    )
    return {
        "assessment_id": assessment_id,
        "result": result,
        "created_at": record['created_at']
    }


# تيست للداتابيس
@app.get("/test-db")
def test_database():
    try:
        conn = db.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) as count FROM students")
        students_count = cursor.fetchone()['count']
        
        cursor.execute("SELECT COUNT(*) as count FROM questions")
        questions_count = cursor.fetchone()['count']
        
        cursor.execute("SELECT COUNT(*) as count FROM majors")
        majors_count = cursor.fetchone()['count']
        
        cursor.execute("SELECT COUNT(*) as count FROM fields")
        fields_count = cursor.fetchone()['count']
        
        conn.close()
        
        return {
            "status": "✅ Database Connected",
            "tables": {
                "students": students_count,
                "questions": questions_count,
                "majors": majors_count,
                "fields": fields_count
            }
        }
    except Exception as e:
        return {"status": "❌ Error", "message": str(e)}


# للتشغيل
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)