from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.timetable import TimetableSlot, DayOfWeek
from pydantic import BaseModel
from typing import List
import uuid

router = APIRouter(prefix="/timetable", tags=["Timetable"])

class TimetableResponse(BaseModel):
    id: uuid.UUID
    day: str
    start_time: str
    end_time: str
    subject: str
    teacher_name: str
    room: str
    department: str
    semester: int

    class Config:
        from_attributes = True

@router.get("/today", response_model=List[TimetableResponse])
def get_today_timetable(
    department: str = "BSc IT",
    semester: int = 5,
    db: Session = Depends(get_db)
):
    today = DayOfWeek[
        ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"][
            __import__('datetime').datetime.now().weekday()
        ]
    ]
    slots = db.query(TimetableSlot).filter(
        TimetableSlot.day == today,
        TimetableSlot.department == department,
        TimetableSlot.semester == semester
    ).order_by(TimetableSlot.start_time).all()
    return slots

@router.get("/week", response_model=List[TimetableResponse])
def get_week_timetable(
    department: str = "BSc IT",
    semester: int = 5,
    db: Session = Depends(get_db)
):
    slots = db.query(TimetableSlot).filter(
        TimetableSlot.department == department,
        TimetableSlot.semester == semester
    ).order_by(TimetableSlot.day, TimetableSlot.start_time).all()
    return slots

@router.post("/seed")
def seed_timetable(db: Session = Depends(get_db)):
    slots = [
        TimetableSlot(day=DayOfWeek.MONDAY, start_time="09:00", end_time="10:00", subject="Data Structures", teacher_name="Prof. Sharma", room="Lab 2", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.MONDAY, start_time="11:00", end_time="12:00", subject="Web Technology", teacher_name="Prof. Mehta", room="Room 301", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.MONDAY, start_time="13:00", end_time="14:00", subject="Database Management", teacher_name="Prof. Joshi", room="Room 205", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.TUESDAY, start_time="09:00", end_time="10:00", subject="Software Engineering", teacher_name="Prof. Khan", room="Room 102", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.TUESDAY, start_time="11:00", end_time="12:00", subject="Data Structures", teacher_name="Prof. Sharma", room="Lab 2", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.WEDNESDAY, start_time="09:00", end_time="10:00", subject="Web Technology", teacher_name="Prof. Mehta", room="Room 301", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.WEDNESDAY, start_time="11:00", end_time="12:00", subject="Database Management", teacher_name="Prof. Joshi", room="Room 205", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.THURSDAY, start_time="09:00", end_time="10:00", subject="Software Engineering", teacher_name="Prof. Khan", room="Room 102", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.THURSDAY, start_time="11:00", end_time="12:00", subject="Data Structures", teacher_name="Prof. Sharma", room="Lab 2", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.FRIDAY, start_time="09:00", end_time="10:00", subject="Web Technology", teacher_name="Prof. Mehta", room="Room 301", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.FRIDAY, start_time="11:00", end_time="12:00", subject="Database Management", teacher_name="Prof. Joshi", room="Room 205", department="BSc IT", semester=5),
        TimetableSlot(day=DayOfWeek.SATURDAY, start_time="09:00", end_time="10:00", subject="Software Engineering", teacher_name="Prof. Khan", room="Room 102", department="BSc IT", semester=5),
    ]
    for slot in slots:
        db.add(slot)
    db.commit()
    return {"message": "Timetable seeded successfully"}