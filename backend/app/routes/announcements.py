# EduSync - Announcements Routes
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.announcement import Announcement
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

router = APIRouter(prefix="/announcements", tags=["Announcements"])

class AnnouncementResponse(BaseModel):
    id: uuid.UUID
    title: str
    content: Optional[str]
    tag: str
    created_at: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[AnnouncementResponse])
def get_announcements(db: Session = Depends(get_db)):
    announcements = db.query(Announcement).filter(
        Announcement.is_active == True
    ).order_by(Announcement.created_at.desc()).limit(10).all()
    return announcements

@router.post("/seed")
def seed_announcements(db: Session = Depends(get_db)):
    sample = [
        Announcement(title="Internal Exam Schedule Released", tag="Exam", content="Check notice board"),
        Announcement(title="Holiday on 15th November", tag="Holiday", content="College closed"),
        Announcement(title="Assignment submission deadline extended", tag="Assignment", content="New deadline: 20th Nov"),
        Announcement(title="Workshop on AI - Register Now", tag="Event", content="AI workshop this Friday"),
    ]
    for a in sample:
        db.add(a)
    db.commit()
    return {"message": "Sample announcements added"}