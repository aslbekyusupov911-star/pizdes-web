import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

# Database URL from environment or fallback to SQLite
# Format for PostgreSQL: postgresql+psycopg2://user:password@localhost:5432/utu_university
# Format for MySQL: mysql+pymysql://user:password@localhost:3306/utu_university
# Default fallback: SQLite file in backend directory
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./admissions.db")

# SQLite needs connect_args check_same_thread=False
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(
        DATABASE_URL,
        connect_args=connect_args,
        pool_pre_ping=True,
    )
except Exception as e:
    # If connection string has an issue, fallback safely to SQLite
    print(f"Warning: Failed to initialize engine with {DATABASE_URL}: {e}")
    print("Falling back to sqlite:///./admissions.db")
    engine = create_engine("sqlite:///./admissions.db", connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
