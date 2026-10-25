import random
from datetime import datetime
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from . import models, schemas

# ==================== ADMISSIONS ====================
def generate_application_number(db: Session) -> str:
    current_year = datetime.now().year
    count = db.query(models.Admission).count() + 1
    return f"UTU-{current_year}-{count:04d}"

def create_admission(db: Session, data: schemas.AdmissionCreate) -> models.Admission:
    app_num = generate_application_number(db)
    while db.query(models.Admission).filter(models.Admission.application_number == app_num).first():
        app_num = f"UTU-{datetime.now().year}-{random.randint(1000, 9999)}"

    db_item = models.Admission(
        application_number=app_num,
        first_name=data.first_name.strip(),
        last_name=data.last_name.strip(),
        middle_name=data.middle_name.strip() if data.middle_name else None,
        passport_series=data.passport_series.strip().upper(),
        passport_number=data.passport_number.strip(),
        phone=data.phone.strip(),
        email=data.email.strip() if data.email else None,
        birth_date=data.birth_date,
        gender=data.gender,
        region=data.region,
        study_type=data.study_type,
        direction=data.direction,
        status="yangi",
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_admissions(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    status: Optional[str] = None,
    study_type: Optional[str] = None,
    direction: Optional[str] = None,
) -> List[models.Admission]:
    query = db.query(models.Admission)

    if status and status != "all":
        query = query.filter(models.Admission.status == status)

    if study_type and study_type != "all":
        query = query.filter(models.Admission.study_type == study_type)

    if direction and direction != "all":
        query = query.filter(models.Admission.direction == direction)

    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            (models.Admission.first_name.ilike(search_term)) |
            (models.Admission.last_name.ilike(search_term)) |
            (models.Admission.application_number.ilike(search_term)) |
            (models.Admission.phone.ilike(search_term)) |
            (models.Admission.passport_number.ilike(search_term))
        )

    return query.order_by(desc(models.Admission.created_at)).offset(skip).limit(limit).all()

def get_admission_by_id(db: Session, admission_id: int) -> Optional[models.Admission]:
    return db.query(models.Admission).filter(models.Admission.id == admission_id).first()

def get_admission_by_number(db: Session, app_number: str) -> Optional[models.Admission]:
    return db.query(models.Admission).filter(models.Admission.application_number == app_number.strip()).first()

def update_admission_status(db: Session, admission_id: int, update_data: schemas.AdmissionUpdateStatus) -> Optional[models.Admission]:
    item = get_admission_by_id(db, admission_id)
    if not item:
        return None
    item.status = update_data.status
    if update_data.admin_notes is not None:
        item.admin_notes = update_data.admin_notes
    db.commit()
    db.refresh(item)
    return item

def delete_admission(db: Session, admission_id: int) -> bool:
    item = get_admission_by_id(db, admission_id)
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True

def get_admission_stats(db: Session) -> schemas.AdmissionStats:
    total = db.query(models.Admission).count()
    new_count = db.query(models.Admission).filter(models.Admission.status == "yangi").count()
    in_review = db.query(models.Admission).filter(models.Admission.status == "korilmoqda").count()
    accepted = db.query(models.Admission).filter(models.Admission.status == "qabul_qilindi").count()
    rejected = db.query(models.Admission).filter(models.Admission.status == "rad_etildi").count()

    study_types = db.query(models.Admission.study_type, func.count(models.Admission.id)).group_by(models.Admission.study_type).all()
    by_study_type = {st: count for st, count in study_types if st}

    directions = db.query(models.Admission.direction, func.count(models.Admission.id)).group_by(models.Admission.direction).all()
    by_direction = {dir_name: count for dir_name, count in directions if dir_name}

    return schemas.AdmissionStats(
        total=total,
        new=new_count,
        in_review=in_review,
        accepted=accepted,
        rejected=rejected,
        by_study_type=by_study_type,
        by_direction=by_direction,
    )

# ==================== NEWS ====================
def get_all_news(db: Session, category: Optional[str] = None, search: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[models.NewsItem]:
    query = db.query(models.NewsItem)
    if category and category != "all":
        query = query.filter(models.NewsItem.category == category)
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            (models.NewsItem.title_uz.ilike(search_term)) |
            (models.NewsItem.title_ru.ilike(search_term)) |
            (models.NewsItem.title_en.ilike(search_term)) |
            (models.NewsItem.desc_uz.ilike(search_term))
        )
    return query.order_by(desc(models.NewsItem.created_at)).offset(skip).limit(limit).all()

def get_news_by_id(db: Session, news_id: int) -> Optional[models.NewsItem]:
    item = db.query(models.NewsItem).filter(models.NewsItem.id == news_id).first()
    if item:
        item.views = (item.views or 0) + 1
        db.commit()
        db.refresh(item)
    return item

def create_news(db: Session, data: schemas.NewsCreate) -> models.NewsItem:
    item = models.NewsItem(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_news(db: Session, news_id: int, data: schemas.NewsUpdate) -> Optional[models.NewsItem]:
    item = db.query(models.NewsItem).filter(models.NewsItem.id == news_id).first()
    if not item:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

def delete_news(db: Session, news_id: int) -> bool:
    item = db.query(models.NewsItem).filter(models.NewsItem.id == news_id).first()
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True

# ==================== DIRECTIONS ====================
def get_all_directions(db: Session, study_type: Optional[str] = None) -> List[models.StudyDirection]:
    query = db.query(models.StudyDirection)
    if study_type and study_type != "all":
        query = query.filter(models.StudyDirection.type == study_type)
    return query.all()

def get_direction_by_id(db: Session, dir_id: int) -> Optional[models.StudyDirection]:
    return db.query(models.StudyDirection).filter(models.StudyDirection.id == dir_id).first()

def create_direction(db: Session, data: schemas.DirectionCreate) -> models.StudyDirection:
    item = models.StudyDirection(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_direction(db: Session, dir_id: int, data: schemas.DirectionUpdate) -> Optional[models.StudyDirection]:
    item = get_direction_by_id(db, dir_id)
    if not item:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

def delete_direction(db: Session, dir_id: int) -> bool:
    item = get_direction_by_id(db, dir_id)
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True

# ==================== STAFF ====================
def get_all_staff(db: Session) -> List[models.StaffMember]:
    return db.query(models.StaffMember).order_by(models.StaffMember.order_num, models.StaffMember.id).all()

def get_staff_by_id(db: Session, staff_id: int) -> Optional[models.StaffMember]:
    return db.query(models.StaffMember).filter(models.StaffMember.id == staff_id).first()

def create_staff(db: Session, data: schemas.StaffCreate) -> models.StaffMember:
    item = models.StaffMember(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_staff(db: Session, staff_id: int, data: schemas.StaffUpdate) -> Optional[models.StaffMember]:
    item = get_staff_by_id(db, staff_id)
    if not item:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

def delete_staff(db: Session, staff_id: int) -> bool:
    item = get_staff_by_id(db, staff_id)
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True

# ==================== PARTNERS ====================
def get_all_partners(db: Session) -> List[models.PartnerItem]:
    return db.query(models.PartnerItem).all()

def create_partner(db: Session, data: schemas.PartnerCreate) -> models.PartnerItem:
    item = models.PartnerItem(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def delete_partner(db: Session, partner_id: int) -> bool:
    item = db.query(models.PartnerItem).filter(models.PartnerItem.id == partner_id).first()
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True

# ==================== VACANCIES ====================
def get_all_vacancies(db: Session) -> List[models.VacancyItem]:
    return db.query(models.VacancyItem).all()

def create_vacancy(db: Session, data: schemas.VacancyCreate) -> models.VacancyItem:
    item = models.VacancyItem(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def delete_vacancy(db: Session, vac_id: int) -> bool:
    item = db.query(models.VacancyItem).filter(models.VacancyItem.id == vac_id).first()
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True

# ==================== CONTACT MESSAGES / RESUMES ====================
def create_contact(db: Session, data: schemas.ContactCreate) -> models.ContactMessage:
    item = models.ContactMessage(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def get_all_contacts(db: Session) -> List[models.ContactMessage]:
    return db.query(models.ContactMessage).order_by(desc(models.ContactMessage.created_at)).all()
