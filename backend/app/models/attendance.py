# EduSync - Attendance Model
import uuid
from datetime import datetime, date
from sqlalchemy import Column, String, Boolean, DateTime, Date, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    subject = Column(String(100), nullable=False)
    date = Column(Date, nullable=False, default=date.today)
    is_present = Column(Boolean, default=False)
    marked_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Attendance {self.student_id} {self.subject} {self.date}>"