# EduSync - Database Connection
# This file creates and manages the connection to our PostgreSQL database

import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the database URL from .env file
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the database engine
# This is the actual connection to PostgreSQL
engine = create_engine(DATABASE_URL.replace("postgresql+psycopg://", "postgresql+psycopg2://").replace("postgresql://", "postgresql+psycopg2://"))

# SessionLocal is used to create database sessions
# A session is like opening and closing a connection to the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all our database models
# Every table we create will inherit from this
Base = declarative_base()

# Dependency function - used in API routes to get a database session
# It opens a session, gives it to the route, then closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Test the database connection
def test_connection():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            print("✅ Database connected successfully!")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False