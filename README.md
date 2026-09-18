# CareerCompass

An academic guidance platform helping Jordanian high school students choose the right university major. It is a web-based digital advisor built to bridge the gap between a student's academic potential and their future career opportunities. Tailored specifically for the Jordanian educational landscape, the platform uses a dual-track logic system to serve both Pre-Tawjihi students (Grades 9-11) and Tawjihi students (Grade 12). By combining academic performance data with a multi-dimensional psychometric assessment evaluating Vocational Interests, Cognitive Aptitudes, and Work Styles, CareerCompass aims to reduce major-switching rates and align students with university pathways that genuinely fit them. This project is a graduation requirement for the Faculty of Prince Al-Hussein Bin Abdallah II for Information Technology, Al al-Bayt University (2025/2026).

## About The Project

A striking number of students never take an interest or aptitude assessment before choosing a major, and it shows: most university students surveyed for this project said they had considered switching majors after enrolling. CareerCompass was built to close that gap by giving students a scientific, data-driven starting point before they commit to a field. 

The platform's dual-track logic adapts to where a student is in their journey:
* **Pre-Tawjihi Track (Grades 9-11):** Focuses on early planning, generating a custom Action Plan identifying skill gaps and specific subjects to improve well before Tawjihi year.
* **Tawjihi Track (Grade 12):** Focuses on immediate decision-making, matching the student's final grades and stream directly against university admission thresholds to surface the top-fit majors.

## Key Features

* **Multi-Dimensional Psychometric Assessment:** A scenario-based interest test evaluating students across Holland's RIASEC model, core aptitudes, and work-style preferences, with intelligent tie-breaker logic for closely competing results.
* **Intelligent Recommendation Engine:** Cross-references assessment results and academic grades to surface a Top 3 major match, complete with fit percentage, minimum required GPA, and tailored reasoning.
* **Academic Gap Analysis:** Compares a student's current grades against a target field's requirements and generates a phased, actionable improvement plan.
* **Jordanian Universities Directory:** A searchable, filterable database of local university faculties, programs, and admission requirements.
* **Student Dashboard:** A central hub summarizing assessment results, academic standing, and next steps.

## Tech Stack

* **Frontend:** Built using Vue.js 3 (Composition API) as a reactive Single Page Application, Pinia for state management, Tailwind CSS for styling, Vite for build tooling, and Axios as the API client.
* **Backend:** Powered by Python and FastAPI for the REST API and scoring/recommendation logic, SQLite for relational data storage, and Uvicorn as the ASGI server.

## Project Structure

The project is divided into a **Backend** directory containing the FastAPI application, database schema, and scoring logic, and a **Frontend** directory containing the Vue 3 application, stores, and page-level components.

## Getting Started

**Prerequisites:** Node.js (v20.19+ or v22.12+) and Python 3.9+.

**Backend Setup:**
Navigate to the Backend folder, install requirements via pip, and run the main python file. The API will be available at localhost port 8000, where it automatically creates the SQLite database and seeds it with sample data.

**Frontend Setup:**
Navigate to the Frontend folder, install dependencies via npm, and run the development server. The app will be available at localhost port 5173. The backend must be running first for the frontend to work.

## Roadmap

* Cloud deployment using Netlify and managed backend hosting.
* AI-powered conversational guidance assistant.
* Integration with Jordan's Unified Admissions Portal for live cut-off GPAs.
* Native iOS and Android apps.
* Longitudinal tracking from Grade 9 through university graduation.

## Team

**Developed by:**
Noor Fuad Ababneh, 
Hadeel Rafiq Mohammad

**Academic Supervisor:**
Dr. Mohammad Alsharo

Department of Computer Information Systems, Faculty of Prince Al-Hussein Bin Abdallah II for Information Technology, Al al-Bayt University.




## License

This project was developed for academic purposes as part of a graduation project requirement.
