# EduSync - Announcement Model
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import enum

class AnnouncementTag(str, enum.Enum):
    EXAM = "Exam"
    HOLIDAY = "Holiday"
    ASSIGNMENT = "Assignment"
    EVENT = "Event"
    GENERAL = "General"

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=True)
    tag = Column(Enum(AnnouncementTag), default=AnnouncementTag.GENERAL)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Announcement {self.title}>"