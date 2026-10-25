from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/api/partners", tags=["Partners (Hamkorlar)"])

@router.get("/", response_model=List[schemas.PartnerResponse])
def get_partners(db: Session = Depends(get_db)):
    return crud.get_all_partners(db)

@router.post("/", response_model=schemas.PartnerResponse, status_code=status.HTTP_201_CREATED)
def add_partner(data: schemas.PartnerCreate, db: Session = Depends(get_db)):
    return crud.create_partner(db, data)

@router.delete("/{partner_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_partner(partner_id: int, db: Session = Depends(get_db)):
    success = crud.delete_partner(db, partner_id)
    if not success:
        raise HTTPException(status_code=404, detail="Hamkor topilmadi")
    return None
