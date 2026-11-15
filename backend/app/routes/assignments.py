from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.assignment import Assignment, AssignmentStatus
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

router = APIRouter(prefix="/assignments", tags=["Assignments"])

class AssignmentResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: Optional[str]
    subject: str
    teacher_name: str
    deadline: datetime
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[AssignmentResponse])
def get_assignments(
    department: str = "BSc IT",
    semester: str = "5",
    db: Session = Depends(get_db)
):
    assignments = db.query(Assignment).filter(
        Assignment.department == department,
        Assignment.semester == semester,
        Assignment.status == AssignmentStatus.ACTIVE
    ).order_by(Assignment.deadline).all()
    return assignments

@router.post("/seed")
def seed_assignments(db: Session = Depends(get_db)):
    sample = [
        Assignment(
            title="Data Structures Lab Assignment",
            description="Implement a Binary Search Tree with insert, delete and search operations.",
            subject="Data Structures",
            teacher_name="Prof. Sharma",
            department="BSc IT",
            semester="5",
            deadline=datetime(2026, 11, 20, 23, 59)
        ),
        Assignment(
            title="Web Technology Project",
            description="Build a responsive website using HTML, CSS and JavaScript.",
            subject="Web Technology",
            teacher_name="Prof. Mehta",
            department="BSc IT",
            semester="5",
            deadline=datetime(2026, 11, 25, 23, 59)
        ),
        Assignment(
            title="Database Management Assignment",
            description="Write SQL queries for the given ER diagram and normalize to 3NF.",
            subject="Database Management",
            teacher_name="Prof. Joshi",
            department="BSc IT",
            semester="5",
            deadline=datetime(2026, 11, 18, 23, 59)
        ),
    ]
    for a in sample:
        db.add(a)
    db.commit()
    return {"message": "Sample assignments added"}