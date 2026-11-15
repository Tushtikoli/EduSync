import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Boolean, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import enum

class AssignmentStatus(str, enum.Enum):
    ACTIVE = "active"
    CLOSED = "closed"

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    subject = Column(String(100), nullable=False)
    teacher_name = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    semester = Column(String(10), nullable=False)
    deadline = Column(DateTime, nullable=False)
    status = Column(Enum(AssignmentStatus), default=AssignmentStatus.ACTIVE)
    created_at = Column(DateTime, default=datetime.utcnow)

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    assignment_id = Column(UUID(as_uuid=True), ForeignKey("assignments.id"), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow)
    is_late = Column(Boolean, default=False)