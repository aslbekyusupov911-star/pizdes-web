from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/api/directions", tags=["Study Directions (Ta'lim yo'nalishlari)"])

@router.get("/", response_model=List[schemas.DirectionResponse])
def get_directions(
    type: Optional[str] = Query(None, description="kunduzgi, sirtqi, magistratura, all"),
    db: Session = Depends(get_db)
):
    return crud.get_all_directions(db, study_type=type)

@router.get("/{dir_id}", response_model=schemas.DirectionResponse)
def get_direction(dir_id: int, db: Session = Depends(get_db)):
    item = crud.get_direction_by_id(db, dir_id)
    if not item:
        raise HTTPException(status_code=404, detail="Yo'nalish topilmadi")
    return item

@router.post("/", response_model=schemas.DirectionResponse, status_code=status.HTTP_201_CREATED)
def add_direction(dir_data: schemas.DirectionCreate, db: Session = Depends(get_db)):
    return crud.create_direction(db, dir_data)

@router.put("/{dir_id}", response_model=schemas.DirectionResponse)
def update_direction(dir_id: int, dir_data: schemas.DirectionUpdate, db: Session = Depends(get_db)):
    item = crud.update_direction(db, dir_id, dir_data)
    if not item:
        raise HTTPException(status_code=404, detail="Yo'nalish topilmadi")
    return item

@router.delete("/{dir_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_direction(dir_id: int, db: Session = Depends(get_db)):
    success = crud.delete_direction(db, dir_id)
    if not success:
        raise HTTPException(status_code=404, detail="Yo'nalish topilmadi")
    return None
