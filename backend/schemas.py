from datetime import datetime
from typing import Optional, List, Dict
from pydantic import BaseModel, ConfigDict, Field

# ----------------- ADMISSION SCHEMAS -----------------
class AdmissionBase(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    middle_name: Optional[str] = None
    passport_series: str = Field(..., min_length=1, max_length=10)
    passport_number: str = Field(..., min_length=5, max_length=20)
    phone: str = Field(..., min_length=7, max_length=50)
    email: Optional[str] = None
    birth_date: Optional[str] = None
    gender: str = "Erkak"
    region: str
    study_type: str = "kunduzgi"
    direction: str

class AdmissionCreate(AdmissionBase):
    pass

class AdmissionUpdateStatus(BaseModel):
    status: str = Field(..., description="yangi, korilmoqda, qabul_qilindi, rad_etildi")
    admin_notes: Optional[str] = None

class AdmissionResponse(AdmissionBase):
    id: int
    application_number: str
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class AdmissionStats(BaseModel):
    total: int
    new: int
    in_review: int
    accepted: int
    rejected: int
    by_study_type: Dict[str, int]
    by_direction: Dict[str, int]

# ----------------- NEWS SCHEMAS -----------------
class NewsBase(BaseModel):
    title_uz: str
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    desc_uz: Optional[str] = None
    desc_ru: Optional[str] = None
    desc_en: Optional[str] = None
    content_uz: Optional[str] = None
    content_ru: Optional[str] = None
    content_en: Optional[str] = None
    image: str
    category: Optional[str] = "university"
    post_url: Optional[str] = None

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    desc_uz: Optional[str] = None
    desc_ru: Optional[str] = None
    desc_en: Optional[str] = None
    content_uz: Optional[str] = None
    content_ru: Optional[str] = None
    content_en: Optional[str] = None
    image: Optional[str] = None
    category: Optional[str] = None
    post_url: Optional[str] = None

class NewsResponse(NewsBase):
    id: int
    views: int = 0
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# ----------------- STUDY DIRECTION SCHEMAS -----------------
class DirectionBase(BaseModel):
    code: Optional[str] = None
    name_uz: str
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    degree: Optional[str] = "Bakalavr"
    duration: Optional[str] = "4 yil"
    type: Optional[str] = "kunduzgi"  # kunduzgi, sirtqi, magistratura
    contract_uz: Optional[str] = None
    grant_uz: Optional[str] = None
    faculty: Optional[str] = None
    icon: Optional[str] = None

class DirectionCreate(DirectionBase):
    pass

class DirectionUpdate(BaseModel):
    code: Optional[str] = None
    name_uz: Optional[str] = None
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    degree: Optional[str] = None
    duration: Optional[str] = None
    type: Optional[str] = None
    contract_uz: Optional[str] = None
    grant_uz: Optional[str] = None
    faculty: Optional[str] = None
    icon: Optional[str] = None

class DirectionResponse(DirectionBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# ----------------- STAFF / RECTORATE SCHEMAS -----------------
class StaffBase(BaseModel):
    name_uz: str
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    position_uz: Optional[str] = None
    position_ru: Optional[str] = None
    position_en: Optional[str] = None
    lavozim_uz: Optional[str] = None
    lavozim_ru: Optional[str] = None
    lavozim_en: Optional[str] = None
    malumot_uz: Optional[str] = None
    malumot_ru: Optional[str] = None
    malumot_en: Optional[str] = None
    degree_uz: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    reception_days_uz: Optional[str] = None
    uchrashuv_vaqti_uz: Optional[str] = None
    uchrashuv_vaqti_ru: Optional[str] = None
    uchrashuv_vaqti_en: Optional[str] = None
    image: str
    order_num: Optional[int] = 0

class StaffCreate(StaffBase):
    pass

class StaffUpdate(BaseModel):
    name_uz: Optional[str] = None
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    position_uz: Optional[str] = None
    position_ru: Optional[str] = None
    position_en: Optional[str] = None
    lavozim_uz: Optional[str] = None
    lavozim_ru: Optional[str] = None
    lavozim_en: Optional[str] = None
    malumot_uz: Optional[str] = None
    malumot_ru: Optional[str] = None
    malumot_en: Optional[str] = None
    degree_uz: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    reception_days_uz: Optional[str] = None
    uchrashuv_vaqti_uz: Optional[str] = None
    image: Optional[str] = None

class StaffResponse(StaffBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# ----------------- PARTNER SCHEMAS -----------------
class PartnerBase(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    image: str
    url_link: str

class PartnerCreate(PartnerBase):
    pass

class PartnerResponse(PartnerBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# ----------------- VACANCY SCHEMAS -----------------
class VacancyBase(BaseModel):
    title_uz: str
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    category: Optional[str] = "Pedagogik"
    department: str
    salary: Optional[str] = "Kelishilgan holda"
    type: Optional[str] = "To'liq stavka"
    deadline: Optional[str] = None
    requirements: Optional[str] = None

class VacancyCreate(VacancyBase):
    pass

class VacancyResponse(VacancyBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# ----------------- CONTACT / RESUME SCHEMAS -----------------
class ContactBase(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    vacancy_title: Optional[str] = None
    message: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# ----------------- AUTH SCHEMAS -----------------
class LoginRequest(BaseModel):
    password: str

class LoginResponse(BaseModel):
    success: bool
    token: str
    message: str
