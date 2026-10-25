from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/api/admissions", tags=["Admissions (Qabul Arizalari)"])

@router.post("/", response_model=schemas.AdmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_admission(admission: schemas.AdmissionCreate, db: Session = Depends(get_db)):
    """
    Yangi abituriyent arizasini topshirish (Online Qabul).
    """
    return crud.create_admission(db=db, data=admission)

@router.get("/", response_model=List[schemas.AdmissionResponse])
def list_admissions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    search: Optional[str] = Query(None, description="Ism, familiya, ariza raqami yoki telefon bo'yicha qidirish"),
    status: Optional[str] = Query(None, description="Holat: all, yangi, korilmoqda, qabul_qilindi, rad_etildi"),
    study_type: Optional[str] = Query(None, description="Ta'lim shakli: all, kunduzgi, sirtqi, magistratura"),
    direction: Optional[str] = Query(None, description="Yo'nalish nomi"),
    db: Session = Depends(get_db)
):
    """
    Barcha arizalar ro'yxatini filtrlash va qidirish bilan olish (Admin panel uchun).
    """
    return crud.get_admissions(
        db=db,
        skip=skip,
        limit=limit,
        search=search,
        status=status,
        study_type=study_type,
        direction=direction,
    )

@router.get("/stats", response_model=schemas.AdmissionStats)
def get_stats(db: Session = Depends(get_db)):
    """
    Arizalar umumiy statistikasi (jami, yangi, qabul qilingan, yo'nalishlar kesimida).
    """
    return crud.get_admission_stats(db=db)

@router.get("/track/{application_number}", response_model=schemas.AdmissionResponse)
def track_admission(application_number: str, db: Session = Depends(get_db)):
    """
    Abituriyent o'z arizasi holatini ariza raqami orqali tekshirishi (masalan, UTU-2026-0001).
    """
    item = crud.get_admission_by_number(db=db, app_number=application_number)
    if not item:
        raise HTTPException(status_code=404, detail="Bunday raqamli ariza topilmadi")
    return item

@router.get("/{admission_id}", response_model=schemas.AdmissionResponse)
def get_admission(admission_id: int, db: Session = Depends(get_db)):
    """
    Arizani ID orqali olish.
    """
    item = crud.get_admission_by_id(db=db, admission_id=admission_id)
    if not item:
        raise HTTPException(status_code=404, detail="Ariza topilmadi")
    return item

@router.patch("/{admission_id}/status", response_model=schemas.AdmissionResponse)
def update_status(
    admission_id: int,
    data: schemas.AdmissionUpdateStatus,
    db: Session = Depends(get_db)
):
    """
    Ariza holatini yangilash (korilmoqda, qabul_qilindi, rad_etildi).
    """
    item = crud.update_admission_status(db=db, admission_id=admission_id, update_data=data)
    if not item:
        raise HTTPException(status_code=404, detail="Ariza topilmadi")
    return item

@router.delete("/{admission_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_admission(admission_id: int, db: Session = Depends(get_db)):
    """
    Arizani o'chirish.
    """
    success = crud.delete_admission(db=db, admission_id=admission_id)
    if not success:
        raise HTTPException(status_code=404, detail="Ariza topilmadi")
    return None
