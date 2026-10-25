from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/api/staff", tags=["Staff (Rektorat va Xodimlar)"])

@router.get("/", response_model=List[schemas.StaffResponse])
def get_staff_members(db: Session = Depends(get_db)):
    return crud.get_all_staff(db)

@router.get("/{staff_id}", response_model=schemas.StaffResponse)
def get_staff_member(staff_id: int, db: Session = Depends(get_db)):
    item = crud.get_staff_by_id(db, staff_id)
    if not item:
        raise HTTPException(status_code=404, detail="Xodim topilmadi")
    return item

@router.post("/", response_model=schemas.StaffResponse, status_code=status.HTTP_201_CREATED)
def add_staff_member(data: schemas.StaffCreate, db: Session = Depends(get_db)):
    return crud.create_staff(db, data)

@router.put("/{staff_id}", response_model=schemas.StaffResponse)
def update_staff_member(staff_id: int, data: schemas.StaffUpdate, db: Session = Depends(get_db)):
    item = crud.update_staff(db, staff_id, data)
    if not item:
        raise HTTPException(status_code=404, detail="Xodim topilmadi")
    return item

@router.delete("/{staff_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_staff_member(staff_id: int, db: Session = Depends(get_db)):
    success = crud.delete_staff(db, staff_id)
    if not success:
        raise HTTPException(status_code=404, detail="Xodim topilmadi")
    return None
