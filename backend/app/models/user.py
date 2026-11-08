# EduSync - User Model
# This file defines the users table in our database
# Every person in EduSync (student, teacher, admin) is first a User

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import enum

# Define the allowed roles in our system
class UserRole(str, enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"

class User(Base):
    # This tells SQLAlchemy the table name in PostgreSQL
    __tablename__ = "users"

    # Primary key - unique ID for every user
    # We use UUID instead of 1,2,3... for security
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Basic information
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    
    # Password will always be stored as a hash, never plain text
    hashed_password = Column(String(255), nullable=False)

    # Role determines what the user can access
    role = Column(Enum(UserRole), nullable=False)

    # Account status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

    # Timestamps - automatically set
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email} ({self.role})>"