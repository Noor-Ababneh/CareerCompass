import sqlite3
from typing import Optional, List, Dict

DB_NAME = "careercompass.db"

def get_connection():
 # نشبك على الداتابيس
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  #للحصول على النتائج بديكشيناري 
    return conn


def init_db():
    """إنشاء جميع الجداول الأربعة للنظام"""
    conn = get_connection()
    cursor = conn.cursor()
    
    #  جدول الطلاب (13 عمود) 
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        grade_level TEXT NOT NULL CHECK(grade_level IN ('9', '10', '11', '12')),
        stream TEXT CHECK(stream IN (
            'Scientific', 'Literary', 'Industrial', 'Agriculture', 
            'Hotel', 'Home_Economics', 'Sharia', 'Health', 
            'Engineering', 'Tech', 'Business', 'Law', 'Social'
        )),
        math_score INTEGER CHECK(math_score >= 0 AND math_score <= 100),
        science_score INTEGER CHECK(science_score >= 0 AND science_score <= 100),
        english_score INTEGER CHECK(english_score >= 0 AND english_score <= 100),
        arabic_score INTEGER CHECK(arabic_score >= 0 AND arabic_score <= 100),
        R INTEGER DEFAULT 0,
        I INTEGER DEFAULT 0,
        A INTEGER DEFAULT 0,
        S INTEGER DEFAULT 0,
        E INTEGER DEFAULT 0,
        C INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    #  جدول الأسئلة (RIASEC) 
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        category TEXT NOT NULL CHECK(category IN ('R', 'I', 'A', 'S', 'E', 'C')),
        order_num INTEGER
    )
    """)
    
    # جداول للتخصصات الجامعية
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS majors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_en TEXT,
        related_field TEXT NOT NULL CHECK(related_field IN (
            'Health', 'Engineering', 'Tech', 'Social', 'Law', 'Business'
        )),
        min_average REAL CHECK(min_average >= 0 AND min_average <= 100),
        allowed_streams TEXT NOT NULL,
        required_riasec TEXT,
        description TEXT
    )
    """)
    
    # تيبلز للحقول
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS fields (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        name_en TEXT,
        required_riasec TEXT NOT NULL,
        focus_subjects TEXT NOT NULL,
        description TEXT,
        min_math_score INTEGER DEFAULT 60,
        min_science_score INTEGER DEFAULT 60
    )
    """)
    
    conn.commit()
    conn.close()
    print("✅ جميع الجداول تم إنشاؤها بنجاح!")


def insert_sample_data():
    """إدخال بيانات تجريبية للاختبار"""
    conn = get_connection()
    cursor = conn.cursor()
    
    # حقول التوجيهي الجديدة تبعون هاي السنة اضفناهم هون
    fields_data = [
        ('المجال الصحي', 'Health', 'I,S', 'Science,English', 
         'الطب، التمريض، الصيدلة، المختبرات الطبية', 75, 75),
        
        ('المجال الهندسي', 'Engineering', 'R,I', 'Math,Science', 
         'الهندسة المدنية، الميكانيكية، الكهربائية', 70, 70),
        
        ('المجال التقني', 'Tech', 'I,C', 'Math,English', 
         'علوم الحاسوب، أمن المعلومات، الذكاء الاصطناعي', 65, 60),
        
        ('المجال الاجتماعي واللغات', 'Social', 'A,S', 'Arabic,English', 
         'الخدمة الاجتماعية، علم النفس، اللغات', 60, 55),
        
        ('المجال القانوني والشرعي', 'Law', 'E,S', 'Arabic,English', 
         'القانون، الشريعة، العلوم السياسية', 65, 55),
        
        ('المجال التجاري والإداري', 'Business', 'E,C', 'Math,English', 
         'إدارة الأعمال، المحاسبة، التسويق، الاقتصاد', 60, 55)
    ]
    
    cursor.executemany("""
        INSERT OR IGNORE INTO fields 
        (name, name_en, required_riasec, focus_subjects, description, min_math_score, min_science_score)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, fields_data)
    
    # إضافة تخصصات بس لسا مش كاملين
    majors_data = [
        ('الطب البشري', 'Medicine', 'Health', 90.0, 'Scientific', 'I,S', 'تشخيص وعلاج الأمراض'),
        ('هندسة البرمجيات', 'Software Engineering', 'Tech', 75.0, 'Scientific,Industrial', 'I,C', 'تطوير البرمجيات والتطبيقات'),
        ('الهندسة المدنية', 'Civil Engineering', 'Engineering', 80.0, 'Scientific,Engineering', 'R,I', 'تصميم وبناء البنية التحتية'),
        ('إدارة الأعمال', 'Business Administration', 'Business', 70.0, 'Literary,Business', 'E,C', 'إدارة المشاريع والشركات'),
        ('القانون', 'Law', 'Law', 75.0, 'Literary,Law', 'E,S', 'دراسة القوانين والتشريعات'),
        ('علم النفس', 'Psychology', 'Social', 72.0, 'Literary,Social', 'S,A', 'دراسة السلوك البشري'),
    ]
    
    cursor.executemany("""
        INSERT OR IGNORE INTO majors 
        (name, name_en, related_field, min_average, allowed_streams, required_riasec, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, majors_data)
    
    #  إضافة 12 سؤال نموذجي (2 لكل فئة)
    questions_data = [
        # Realistic (R)
        ('هل تحب العمل بيديك وإصلاح الأشياء؟', 'R', 1),
        ('هل تفضل العمل في الهواء الطلق أو في ورشة؟', 'R', 2),
        
        # Investigative (I)
        ('هل تستمتع بحل المسائل الرياضية المعقدة؟', 'I', 3),
        ('هل تحب إجراء التجارب العلمية؟', 'I', 4),
        
        # Artistic (A)
        ('هل تحب الرسم أو الكتابة الإبداعية؟', 'A', 5),
        ('هل تستمتع بالتعبير عن مشاعرك من خلال الفن؟', 'A', 6),
        
        # Social (S)
        ('هل تحب مساعدة الآخرين وحل مشاكلهم؟', 'S', 7),
        ('هل تفضل العمل في فريق بدلاً من العمل وحدك؟', 'S', 8),
        
        # Enterprising (E)
        ('هل تحب قيادة المشاريع وإقناع الآخرين بأفكارك؟', 'E', 9),
        ('هل تستمتع بالمنافسة والفوز؟', 'E', 10),
        
        # Conventional (C)
        ('هل تحب تنظيم الأشياء والعمل وفق جداول؟', 'C', 11),
        ('هل تفضل اتباع التعليمات والقواعد بدقة؟', 'C', 12),
    ]
    
    cursor.executemany("""
        INSERT OR IGNORE INTO questions (text, category, order_num)
        VALUES (?, ?, ?)
    """, questions_data)
    
    conn.commit()
    conn.close()
    print("ضفنا الديتا سكسسفلي ووه")


def get_all_questions() -> List[Dict]:
    """جلب جميع الأسئلة"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM questions ORDER BY order_num")
    questions = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return questions


def get_majors_by_stream(stream: str) -> List[Dict]:
    """جلب التخصصات المتاحة لفرع معين"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM majors 
        WHERE allowed_streams LIKE ?
        ORDER BY min_average DESC
    """, (f'%{stream}%',))
    majors = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return majors


def get_field_by_riasec(top_codes: str) -> Optional[Dict]:
    """البحث عن المجال الأنسب بناءً على أعلى كودين RIASEC"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM fields 
        WHERE required_riasec = ?
    """, (top_codes,))
    field = cursor.fetchone()
    conn.close()
    return dict(field) if field else None


def calculate_gap(student_id: int, field_name: str) -> Dict:
    """حساب الفجوة بين علامات الطالب ومتطلبات المجال"""
    conn = get_connection()
    cursor = conn.cursor()
    
    # بناخد بيانات الطالب
    cursor.execute("SELECT math_score, science_score FROM students WHERE id = ?", (student_id,))
    student = cursor.fetchone()
    
    # بنعرف شو المجال بده متطلبات
    cursor.execute("SELECT min_math_score, min_science_score FROM fields WHERE name_en = ?", (field_name,))
    field = cursor.fetchone()
    
    conn.close()
    
    if not student or not field:
        return {}
    
    return {
        'math_gap': max(0, field['min_math_score'] - (student['math_score'] or 0)),
        'science_gap': max(0, field['min_science_score'] - (student['science_score'] or 0))
    }


# تشغيل 
if __name__ == "__main__":
    init_db()
    insert_sample_data()
    print("\n🎉 قاعدة البيانات جاهزة للعمل!")