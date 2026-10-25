# 🏛️ UTU Ranch Universiteti - Backend API (FastAPI)

Ushbu backend **Urganch Ranch Texnologiya Universiteti** rasmiy veb-sayti uchun **Python (FastAPI)** va **SQLAlchemy** asosida yaratilgan.

---

## ⚡ Asosiy Imkoniyatlar

1. **Onlayn Qabul Tizimi (Admissions API)**:
   - Abituriyentlar uchun onlayn ariza topshirish (`POST /api/admissions/`).
   - Avtomatik tartib raqami shakllantirish: masalan, `UTU-2026-0001`.
   - Ariza holatini kuzatish (Track status) (`GET /api/admissions/track/{application_number}`).
   - Adminlar uchun arizalar ro'yxati, filtrlash (shakl, yo'nalish, holat) va qidiruv (`GET /api/admissions/`).
   - Arizalar statistikasi (`GET /api/admissions/stats`).
   - Holatni o'zgartirish va admin izohini qo'shish (`PATCH /api/admissions/{id}/status`).
   - Arizalarni o'chirish (`DELETE /api/admissions/{id}`).

2. **Ko'p Ma'lumotlar Bazasi (Multi-Database Support)**:
   - **Birlamchi (Default)**: SQLite (`admissions.db`) — alohida server talab qilmaydi, fayl ko'rinishida darhol ishlaydi.
   - **PostgreSQL**: `.env` faylida `DATABASE_URL=postgresql+psycopg2://user:pass@localhost:5432/db` ko'rsatilsa, avtomatik PostgreSQL bilan ishlaydi.
   - **MySQL**: `.env` faylida `DATABASE_URL=mysql+pymysql://user:pass@localhost:3306/db` ko'rsatilsa, avtomatik MySQL bilan ishlaydi.

3. **Interaktiv API Hujjatlari (Swagger UI)**:
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🚀 Ishga Tushirish

### 1. Backend Serverni Ishga Tushirish:
```bash
# npm buyrug'i orqali:
npm run backend

# yoki to'g'ridan-to'g'ri Python orqali:
backend\venv\Scripts\python backend/run.py
```
Backend `http://localhost:8000` portida ishga tushadi.

### 2. Frontendni Ishga Tushirish:
```bash
npm run dev
```
Frontend `http://localhost:3000` portida ishga tushadi.

---

## 📂 Backend Tuzilishi

```
backend/
├── venv/                 # Python virtual muhiti
├── .env                  # Sozlamalar va DATABASE_URL
├── database.py           # SQLAlchemy ulanishi va sessiyalari
├── models.py             # Ma'lumotlar bazasi modellari (Admission)
├── schemas.py            # Pydantic validatsiya sxemalari
├── crud.py               # Ma'lumotlar bazasi operatsiyalari
├── seed.py               # Boshlang'ich demo ma'lumotlar kiritish
├── run.py                # Serverni ishga tushirish skripti
├── main.py               # FastAPI ilovasi va CORS
└── routers/
    └── admissions.py     # Qabul tizimi marshrutlari (Routes)
```

---

## 🖥️ Admin Paneli

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Qabul arizalari bo'limi: [http://localhost:3000/admin/admissions](http://localhost:3000/admin/admissions)
- Tezkor kirish paroli: `admin` yoki `ranch2026`
