# CareerCompass

CareerCompass is a full-stack academic guidance system designed to help students in Jordan choose their ideal university majors. It uses a scientific assessment and analyzes academic grades to provide personalized recommendations.

Tech Stack
- Frontend: Vue.js 3, Vite, Tailwind CSS, Pinia
- Backend and Database: Python, FastAPI, SQLite
- Integration: Axios and CORS Middleware

Key Features
- Advanced Assessment: A 48-question evaluation based on the RIASEC model measuring interests, abilities, and work styles.
- Smart Matching Algorithm: Analyzes student answers to match them with updated Jordanian academic fields.
- Full-Stack Integration: Assessment data is securely sent via API, processed, and stored in the backend database.
- Personal Improvement Plan: Analyzes gaps between current grades and target major requirements to provide a clear study plan.
- University Guide: A comprehensive directory of public and private universities in Jordan.

How to Run Locally
You need to run both the frontend and backend servers to use the application.

1. Backend (FastAPI)
Navigate to the Backend folder.
Run: pip install -r requirements.txt
Run: python main.py
The backend will be available at http://localhost:8000

2. Frontend (Vue.js)
Navigate to the Frontend folder.
Run: npm install
Run: npm run dev
The frontend will be available at http://localhost:5173

Demo Mode Note
The authentication system is currently in Demo Mode to allow recruiters and reviewers to easily test the platform. You can enter any email and password combination to bypass the login screen and explore the dashboard directly.

About
This system was built as a graduation project to help Jordanian students make informed, data-driven decisions about their academic future.