from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/api/contact", tags=["Contact & Resumes (Murojaatlar va Rezyumelar)"])

@router.post("/", response_model=schemas.ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_form(data: schemas.ContactCreate, db: Session = Depends(get_db)):
    return crud.create_contact(db, data)

@router.get("/", response_model=List[schemas.ContactResponse])
def get_contact_messages(db: Session = Depends(get_db)):
    return crud.get_all_contacts(db)
