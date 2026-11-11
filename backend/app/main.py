from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.core.database import test_connection
from app.routes import auth
from app.routes import announcements

load_dotenv()

print("Testing database connection...")
test_connection()

app = FastAPI(
    title="EduSync API",
    description="AI-Powered Student Education System Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(announcements.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to EduSync API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}