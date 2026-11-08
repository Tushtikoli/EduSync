# EduSync Backend - Main Application Entry Point
# This file starts the FastAPI server and registers all routes

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.core.database import test_connection

# Load environment variables from .env file
load_dotenv()

# Test database connection on startup
print("Testing database connection...")
test_connection()

# Create the FastAPI application instance
app = FastAPI(
    title="EduSync API",
    description="AI-Powered Student Education System Backend",
    version="1.0.0"
)

# CORS middleware - allows our React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint - just to verify the server is running
@app.get("/")
def root():
    return {
        "message": "Welcome to EduSync API",
        "status": "running",
        "version": "1.0.0"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}