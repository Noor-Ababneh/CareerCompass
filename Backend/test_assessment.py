import database as db
import assessment_mock
from main import submit_assessment, get_saved_assessment, AssessmentInput

def test_assessment_flow():
    # 1. Test POST /api/assessments
    payload = AssessmentInput(
        grades={"math": 85, "physics": 70, "eng_adv": 95},
        gpa=83.33,
        field="EngineeringIT",
        stage="senior"
    )
    
    print("Testing submit_assessment...")
    response = submit_assessment(payload)
    print("Response keys:", response.keys())
    
    assessment_id = response["assessment_id"]
    print(f"Got assessment_id: {assessment_id}")
    
    print("Verifying response structure matches frontend...")
    result = response.get("result", {})
    assert "sortedImprovementPlan" in result
    assert "learningPlan" in result
    assert "eligibleMajors" in result
    print("Result structure looks correct.")
    
    # 2. Test GET /api/assessments/{id}
    print(f"\nTesting get_saved_assessment with id {assessment_id}...")
    get_response = get_saved_assessment(assessment_id)
    assert get_response.get("assessment_id") == assessment_id
    assert "result" in get_response
    assert "created_at" in get_response
    
    print("GET response successfully verified.")
    print("Test passed! 🎉")

if __name__ == "__main__":
    test_assessment_flow()
