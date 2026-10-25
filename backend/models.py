from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from .database import Base

def get_utc_now():
    return datetime.now(timezone.utc)

class Admission(Base):
    __tablename__ = "admissions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    application_number = Column(String(50), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    middle_name = Column(String(100), nullable=True)
    passport_series = Column(String(10), nullable=False)
    passport_number = Column(String(20), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(150), nullable=True)
    birth_date = Column(String(50), nullable=True)
    gender = Column(String(20), default="Erkak")
    region = Column(String(150), nullable=False)
    study_type = Column(String(50), nullable=False)  # kunduzgi, sirtqi, magistratura
    direction = Column(String(250), nullable=False)
    status = Column(String(50), default="yangi", index=True)  # yangi, korilmoqda, qabul_qilindi, rad_etildi
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(DateTime, default=get_utc_now, onupdate=get_utc_now)

class NewsItem(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title_uz = Column(String(500), nullable=False)
    title_ru = Column(String(500), nullable=True)
    title_en = Column(String(500), nullable=True)
    desc_uz = Column(Text, nullable=True)
    desc_ru = Column(Text, nullable=True)
    desc_en = Column(Text, nullable=True)
    content_uz = Column(Text, nullable=True)
    content_ru = Column(Text, nullable=True)
    content_en = Column(Text, nullable=True)
    image = Column(String(500), nullable=False)
    category = Column(String(50), default="university")  # all, public, university, international, elon
    views = Column(Integer, default=0)
    post_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=get_utc_now)

class StudyDirection(Base):
    __tablename__ = "study_directions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code = Column(String(50), nullable=True)
    name_uz = Column(String(255), nullable=False)
    name_ru = Column(String(255), nullable=True)
    name_en = Column(String(255), nullable=True)
    degree = Column(String(100), default="Bakalavr")
    duration = Column(String(100), default="4 yil")
    type = Column(String(50), default="kunduzgi")  # kunduzgi, sirtqi, magistratura
    contract_uz = Column(String(100), nullable=True)
    grant_uz = Column(String(100), nullable=True)
    faculty = Column(String(255), nullable=True)
    icon = Column(String(255), nullable=True)

class StaffMember(Base):
    __tablename__ = "staff_members"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name_uz = Column(String(255), nullable=False)
    name_ru = Column(String(255), nullable=True)
    name_en = Column(String(255), nullable=True)
    position_uz = Column(String(255), nullable=True)
    position_ru = Column(String(255), nullable=True)
    position_en = Column(String(255), nullable=True)
    lavozim_uz = Column(String(255), nullable=True)
    lavozim_ru = Column(String(255), nullable=True)
    lavozim_en = Column(String(255), nullable=True)
    malumot_uz = Column(Text, nullable=True)
    malumot_ru = Column(Text, nullable=True)
    malumot_en = Column(Text, nullable=True)
    degree_uz = Column(String(255), nullable=True)
    phone = Column(String(100), nullable=True)
    email = Column(String(150), nullable=True)
    reception_days_uz = Column(String(255), nullable=True)
    uchrashuv_vaqti_uz = Column(String(255), nullable=True)
    uchrashuv_vaqti_ru = Column(String(255), nullable=True)
    uchrashuv_vaqti_en = Column(String(255), nullable=True)
    image = Column(String(500), nullable=False)
    order_num = Column(Integer, default=0)

class PartnerItem(Base):
    __tablename__ = "partners"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=True)
    title = Column(String(255), nullable=True)
    image = Column(String(500), nullable=False)
    url_link = Column(String(500), nullable=False)

class VacancyItem(Base):
    __tablename__ = "vacancies"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title_uz = Column(String(255), nullable=False)
    title_ru = Column(String(255), nullable=True)
    title_en = Column(String(255), nullable=True)
    category = Column(String(100), default="Pedagogik")
    department = Column(String(255), nullable=False)
    salary = Column(String(100), default="Kelishilgan holda")
    type = Column(String(100), default="To'liq stavka")
    deadline = Column(String(100), nullable=True)
    requirements = Column(Text, nullable=True)  # JSON formatted list

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(150), nullable=False)
    phone = Column(String(100), nullable=False)
    email = Column(String(150), nullable=True)
    vacancy_title = Column(String(255), nullable=True)
    message = Column(Text, nullable=True)
    status = Column(String(50), default="yangi")  # yangi, boglanildi, yopildi
    created_at = Column(DateTime, default=get_utc_now)
