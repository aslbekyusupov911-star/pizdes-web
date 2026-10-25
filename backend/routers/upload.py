import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter(prefix="/api/upload", tags=["Upload (Fayl va Rasmlar)"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "public", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    # Validate file extension
    ext = os.path.splitext(file.filename)[1].lower()
    allowed = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".pdf", ".docx"]
    if ext not in allowed:
        raise HTTPException(status_code=400, detail="Faqat rasm yoki hujjat fayllarini yuklash mumkin")

    unique_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "success": True,
        "filename": unique_filename,
        "url": f"/uploads/{unique_filename}"
    }
