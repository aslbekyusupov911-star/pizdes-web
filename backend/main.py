import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, Base
from .routers import (
    admissions,
    news,
    directions,
    staff,
    partners,
    vacancies,
    contact,
    upload,
    auth,
)

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="UTU Ranch University Backend API",
    description="Urganch Ranch Texnologiya Universiteti uchun to'liq RESTful Backend API (Qabul, Yangiliklar, Yo'nalishlar, Rektorat, Vakansiyalar)",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads static folder
uploads_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Include all routers
app.include_router(admissions.router)
app.include_router(news.router)
app.include_router(directions.router)
app.include_router(staff.router)
app.include_router(partners.router)
app.include_router(vacancies.router)
app.include_router(contact.router)
app.include_router(upload.router)
app.include_router(auth.router)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "service": "UTU Ranch University Backend API",
        "database": engine.dialect.name,
        "version": "2.0.0"
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "UTU Ranch Texnologiya Universiteti API tizimi muvaffaqiyatli ishlamoqda.",
        "documentation": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
