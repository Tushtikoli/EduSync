import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import enum

class MaterialType(str, enum.Enum):
    NOTES = "Notes"
    PYQ = "PYQ"
    ASSIGNMENT = "Assignment"
    REFERENCE = "Reference"

class StudyMaterial(Base):
    __tablename__ = "study_materials"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    subject = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    semester = Column(String(10), nullable=False)
    material_type = Column(Enum(MaterialType), default=MaterialType.NOTES)
    file_url = Column(String(500), nullable=True)
    teacher_name = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)