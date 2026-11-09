# EduSync - User Schemas
# These define what data is accepted and returned by our API
# Pydantic validates the data automatically

from pydantic import BaseModel, EmailStr
from enum import Enum
from uuid import UUID
from datetime import datetime

class UserRole(str, Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"

# Schema for registering a new user
class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: UserRole

# Schema for logging in
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for the response after login
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    full_name: str

# Schema for returning user data (never includes password)
class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: str
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True