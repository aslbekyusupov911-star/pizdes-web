import sys
import os

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from backend.database import SessionLocal, Base, engine
from backend.models import (
    Admission,
    NewsItem,
    StudyDirection,
    StaffMember,
    PartnerItem,
    VacancyItem,
)

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # 1. Seed Admissions
        if db.query(Admission).count() == 0:
            sample_admissions = [
                Admission(
                    application_number="UTU-2026-0001",
                    first_name="Asadbek",
                    last_name="Karimov",
                    middle_name="Bahrom o'g'li",
                    passport_series="AA",
                    passport_number="7654321",
                    phone="+998 90 123 45 67",
                    email="asadbek.k@gmail.com",
                    birth_date="2006-05-14",
                    gender="Erkak",
                    region="Xorazm viloyati",
                    study_type="kunduzgi",
                    direction="Kompyuter injiniringi",
                    status="qabul_qilindi",
                    admin_notes="Barcha hujjatlar to'liq. Suhbatdan a'lo darajada o'tdi."
                ),
                Admission(
                    application_number="UTU-2026-0002",
                    first_name="Dilnoza",
                    last_name="Rustamova",
                    middle_name="Alisher qizi",
                    passport_series="AB",
                    passport_number="1239874",
                    phone="+998 93 456 78 90",
                    email="dilnoza_r@mail.ru",
                    birth_date="2005-11-20",
                    gender="Ayol",
                    region="Xorazm viloyati",
                    study_type="kunduzgi",
                    direction="Iqtisodiyot (tarmoqlar va sohalar bo'yicha)",
                    status="korilmoqda",
                    admin_notes="Attestat nusxasi kutilmoqda."
                ),
                Admission(
                    application_number="UTU-2026-0003",
                    first_name="Javohir",
                    last_name="Sobirov",
                    middle_name="Otabek o'g'li",
                    passport_series="AC",
                    passport_number="9871235",
                    phone="+998 99 876 54 32",
                    email="j.sobirov@yahoo.com",
                    birth_date="2004-03-08",
                    gender="Erkak",
                    region="Toshkent shahri",
                    study_type="sirtqi",
                    direction="Buxgalteriya hisobi va audit",
                    status="yangi",
                    admin_notes=None
                ),
            ]
            for adm in sample_admissions:
                db.add(adm)
            print("Arizalar kiritildi.")

        # 2. Seed News
        if db.query(NewsItem).count() == 0:
            sample_news = [
                NewsItem(
                    title_uz="Ranch Texnologiya Universitetida yangi o'quv yili tantanali ochilishi",
                    title_ru="Торжественное открытие нового учебного года в Университете Ранч",
                    title_en="Grand opening of the new academic year at Ranch Technology University",
                    desc_uz="Universitetimizda 2024/2025-o'quv yili ko'tarinki ruhda boshlandi.",
                    desc_ru="В нашем университете 2024/2025 учебный год начался на высоком уровне.",
                    desc_en="The 2024/2025 academic year began at a high standard at our university.",
                    content_uz="Urganch Ranch Texnologiya Universitetida yangi o'quv yilining ochilish marosimi tantanali tarzda o'tkazildi. Tadbirda universitet rahbariyati, professor-o'qituvchilar, talabalar va ularning ota-onalari ishtirok etdilar.",
                    image="/static/media/news2.8d897ad50f4a5125cf2d.png",
                    category="university",
                    views=1240,
                ),
                NewsItem(
                    title_uz="Xalqaro hamkorlik doirasida xorijiy professorlar dars mashg'ulotlari",
                    title_ru="Занятия зарубежных профессоров в рамках международного сотрудничества",
                    title_en="Lectures by foreign professors within international cooperation",
                    desc_uz="Turkiya va Germaniyaning yetakchi OTMlaridan tashrif buyurgan professor-o'qituvchilar ma'ruzalari davom etmoqda.",
                    desc_ru="Продолжаются лекции преподавателей ведущих вузов Турции и Германии.",
                    desc_en="Lectures by professors from leading universities in Turkey and Germany continue.",
                    content_uz="Universitetimiz xalqaro hamkorlik aloqalarini kengaytirish doirasida xorijiy yetakchi ta'lim muassasalari bilan yaqin aloqalarni o'rnatgan. Joriy semestr davomida Turkiya va Yevropa davlatlaridan taklif etilgan mutaxassislar talabalarimizga zamonaviy bilim va ko'nikmalarni ulashmoqdalar.",
                    image="/static/media/news3.40b3796627f4aa275288.png",
                    category="international",
                    views=980,
                ),
                NewsItem(
                    title_uz="Talabalar turar joyi to'liq zamonaviy sharoitlar bilan foydalanishga topshirildi",
                    title_ru="Студенческое общежитие введено в эксплуатацию с современными условиями",
                    title_en="Student dormitory commissioned with all modern facilities",
                    desc_uz="Barcha qulayliklarga ega yangi talabalar turar joyi talabalarni qabul qildi.",
                    desc_ru="Новое комфортабельное общежитие приняло студентов.",
                    desc_en="A new comfortable dormitory welcomed students.",
                    content_uz="Universitet talabalari uchun barcha qulayliklar yaratilgan zamonaviy talabalar turar joyi o'z eshiklarini ochdi. Xonalarda internet, dars qilish zonalari va dam olish maydonchalari mavjud.",
                    image="/static/media/ranchAfter7.60370a13c0e25a4af7b0.png",
                    category="public",
                    views=1450,
                ),
            ]
            for n in sample_news:
                db.add(n)
            print("Yangiliklar kiritildi.")

        # 3. Seed Directions
        if db.query(StudyDirection).count() == 0:
            sample_directions = [
                StudyDirection(
                    code="60610500",
                    name_uz="Kompyuter injiniringi",
                    name_ru="Компьютерный инжиниринг",
                    name_en="Computer Engineering",
                    degree="Bakalavr",
                    duration="4 yil",
                    type="kunduzgi",
                    contract_uz="14 000 000 so'm",
                    grant_uz="Mavjud (Grand kvotasi)",
                    faculty="Axborot texnologiyalari fakulteti"
                ),
                StudyDirection(
                    code="60410100",
                    name_uz="Iqtisodiyot (tarmoqlar va sohalar bo'yicha)",
                    name_ru="Экономика",
                    name_en="Economics",
                    degree="Bakalavr",
                    duration="4 yil",
                    type="kunduzgi",
                    contract_uz="13 500 000 so'm",
                    grant_uz="Mavjud",
                    faculty="Iqtisodiyot va moliya fakulteti"
                ),
                StudyDirection(
                    code="60410500",
                    name_uz="Buxgalteriya hisobi va audit",
                    name_ru="Бухгалтерский учет и аудит",
                    name_en="Accounting and Auditing",
                    degree="Bakalavr",
                    duration="5 yil",
                    type="sirtqi",
                    contract_uz="11 000 000 so'm",
                    grant_uz="Mavjud emas",
                    faculty="Iqtisodiyot va moliya fakulteti"
                ),
                StudyDirection(
                    code="60610200",
                    name_uz="Axborot tizimlari va texnologiyalari",
                    name_ru="Информационные системы и технологии",
                    name_en="Information Systems and Technologies",
                    degree="Bakalavr",
                    duration="5 yil",
                    type="sirtqi",
                    contract_uz="11 500 000 so'm",
                    grant_uz="Mavjud emas",
                    faculty="Axborot texnologiyalari fakulteti"
                ),
                StudyDirection(
                    code="70610501",
                    name_uz="Kompyuter tizimlari va ularning dasturiy ta'minoti",
                    name_ru="Компьютерные системы и программное обеспечение",
                    name_en="Computer Systems and Software",
                    degree="Magistr",
                    duration="2 yil",
                    type="magistratura",
                    contract_uz="16 000 000 so'm",
                    grant_uz="Mavjud",
                    faculty="Magistratura bo'limi"
                ),
            ]
            for d in sample_directions:
                db.add(d)
            print("Ta'lim yo'nalishlari kiritildi.")

        # 4. Seed Staff
        if db.query(StaffMember).count() == 0:
            sample_staff = [
                StaffMember(
                    name_uz="Matyusupov Baxtiyor Saidovich",
                    name_ru="Матюсупов Бахтиёр Саидович",
                    name_en="Matyusupov Bakhtiyor Saidovich",
                    position_uz="Rektor",
                    lavozim_uz="Universitet Rektori",
                    degree_uz="Iqtisod fanlari doktori, Professor",
                    phone="+998 62 227 70 00",
                    email="rector@utu-ranch.uz",
                    reception_days_uz="Har haftaning chorshanba kuni, 14:00 - 17:00",
                    uchrashuv_vaqti_uz="Chorshanba: 14:00 - 17:00",
                    image="/static/media/shoir2.9220c38350a744394b98.png",
                    order_num=1
                ),
                StaffMember(
                    name_uz="Ibragimov Doniyor Rustamovich",
                    name_ru="Ибрагимов Дониёр Рустамович",
                    name_en="Ibragimov Doniyor Rustamovich",
                    position_uz="O'quv ishlari bo'yicha prorektor",
                    lavozim_uz="O'quv ishlari bo'yicha prorektor",
                    degree_uz="Texnika fanlari nomzodi, Dotsent",
                    phone="+998 62 227 70 01",
                    email="academic@utu-ranch.uz",
                    reception_days_uz="Har haftaning seshanba va juma kunlari, 10:00 - 13:00",
                    uchrashuv_vaqti_uz="Seshanba, Juma: 10:00 - 13:00",
                    image="/static/media/student/student_1.jpg",
                    order_num=2
                ),
            ]
            for s in sample_staff:
                db.add(s)
            print("Rektorat xodimlari kiritildi.")

        # 5. Seed Partners
        if db.query(PartnerItem).count() == 0:
            sample_partners = [
                PartnerItem(
                    name="Toshkent Davlat Iqtisodiyot Universiteti",
                    image="/static/media/ranchRes1.67c2bb4b658dd2536538.png",
                    url_link="https://tsue.uz"
                ),
                PartnerItem(
                    name="Urganch Davlat Universiteti",
                    image="/static/media/logoRight1.701ec19f51fdaf1b64f2aa51fff6cf22.svg",
                    url_link="https://urdu.uz"
                ),
                PartnerItem(
                    name="Istanbul University",
                    image="/static/media/logoRight2.a376b4835777eeeefa4553e2e4b03df1.svg",
                    url_link="https://istanbul.edu.tr"
                ),
            ]
            for p in sample_partners:
                db.add(p)
            print("Hamkorlar kiritildi.")

        # 6. Seed Vacancies
        if db.query(VacancyItem).count() == 0:
            sample_vacancies = [
                VacancyItem(
                    title_uz="Ingliz tili fani o‘qituvchisi (Professor / Dotsent)",
                    title_ru="Преподаватель английского языка",
                    title_en="English Language Teacher",
                    category="Pedagogik",
                    department="Jahon tillari kafedrasi",
                    salary="Kelishilgan holda (Yuqori daraja)",
                    type="To'liq stavka",
                    deadline="2026-06-30",
                    requirements="Filologiya yoki chet tillari bo'yicha oliy ma'lumot; Kamida IELTS 7.5 yoki CEFR C1 darajasidagi sertifikat",
                ),
                VacancyItem(
                    title_uz="Sun'iy intellekt va dasturlash o‘qituvchisi",
                    title_ru="Преподаватель искусственного интеллекта и программирования",
                    title_en="Artificial Intelligence and Programming Lecturer",
                    category="Pedagogik",
                    department="Kompyuter injiniringi kafedrasi",
                    salary="8 000 000 - 15 000 000 so'm",
                    type="To'liq stavka",
                    deadline="2026-07-15",
                    requirements="IT yoki amaliy matematika bo'yicha magistr/PhD; Python, C++ yoki zamonaviy texnologiyalarda amaliy tajriba",
                ),
            ]
            for v in sample_vacancies:
                db.add(v)
            print("Vakansiyalar kiritildi.")

        db.commit()
        print("Baza to'liq muvaffaqiyatli to'ldirildi!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
