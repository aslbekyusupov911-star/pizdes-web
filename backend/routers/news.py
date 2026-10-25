from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(prefix="/api/news", tags=["News (Yangiliklar)"])

@router.get("/", response_model=List[schemas.NewsResponse])
def get_news(
    category: Optional[str] = Query(None, description="all, public, university, international, elon"),
    search: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: Session = Depends(get_db)
):
    return crud.get_all_news(db, category=category, search=search, skip=skip, limit=limit)

@router.get("/{news_id}", response_model=schemas.NewsResponse)
def get_single_news(news_id: int, db: Session = Depends(get_db)):
    item = crud.get_news_by_id(db, news_id)
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    return item

@router.post("/", response_model=schemas.NewsResponse, status_code=status.HTTP_201_CREATED)
def add_news(news_data: schemas.NewsCreate, db: Session = Depends(get_db)):
    return crud.create_news(db, news_data)

@router.put("/{news_id}", response_model=schemas.NewsResponse)
def update_existing_news(news_id: int, news_data: schemas.NewsUpdate, db: Session = Depends(get_db)):
    item = crud.update_news(db, news_id, news_data)
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    return item

@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_news(news_id: int, db: Session = Depends(get_db)):
    success = crud.delete_news(db, news_id)
    if not success:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    return None
