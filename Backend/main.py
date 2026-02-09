from fastapi import FastAPI
import sqlite3
app = FastAPI()
def init_db():
    conn = sqlite3.connect("careercompass.db")
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        grade_level TEXT
    )
    """)
    conn.commit()
    conn.close()
init_db()
@app.get("/")
def read_root():
    return {"message": "CareerCompass backend is working whoooo yayayayayaay w database is Ready kaman"}
from fastapi import Form
@app.post("/register")
def register(name: str = Form(...), email: str = Form(...), grade_level: str = Form(...)):
    conn = sqlite3.connect("careercompass.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO students (name, email, grade_level) VALUES (?, ?, ?)", (name, email, grade_level))
    conn.commit()
    conn.close()
    return {"message": f"Welcome {name}! You have been registered successfully."}