from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/api/vacancies", tags=["Vacancies (Bo'sh ish o'rinlari)"])

@router.get("/", response_model=List[schemas.VacancyResponse])
def get_vacancies(db: Session = Depends(get_db)):
    return crud.get_all_vacancies(db)

@router.post("/", response_model=schemas.VacancyResponse, status_code=status.HTTP_201_CREATED)
def add_vacancy(data: schemas.VacancyCreate, db: Session = Depends(get_db)):
    return crud.create_vacancy(db, data)

@router.delete("/{vac_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_vacancy(vac_id: int, db: Session = Depends(get_db)):
    success = crud.delete_vacancy(db, vac_id)
    if not success:
        raise HTTPException(status_code=404, detail="Vakansiya topilmadi")
    return None
