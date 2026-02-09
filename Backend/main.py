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