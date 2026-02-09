from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "CareerCompass (or website for student guider career) backend is working whoooo yayayayayaay"}
