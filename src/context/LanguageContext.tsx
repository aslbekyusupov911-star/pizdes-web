import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  leng: Language;
  setLeng: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  leng: 'uz',
  setLeng: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const translations: Record<Language, Record<string, string>> = {
  uz: {
    university: "Universitet",
    about: "Universitet haqida",
    departments: "Kafedralar",
    centers: "Markaz va bo'limlar",
    rectorate: "Rektorat",
    rules: "Universitet ichki mehnat tartib qoidalar",
    ethics: "Universitet odob-axloq qoidalari",
    charter: "Universitet nizomi",
    abutrient: "Abituriyent",
    fullTime: "Kunduzgi ta'lim yo'nalishlari",
    fullTimeCourse: "Kunduzgi ta'lim yo'nalishlari nomi (o'qish muddati 4 yil)",
    correspondence: "Sirtqi ta'lim yo'nalishlari",
    onlineAdmission: "Onlayn ariza topshirish",
    master: "Magistratura",
    library: "Onlayn kutubxona",
    jurnal: "Universitet ilmiy elektron jurnali",
    weHave: "Bizda",
    teachers: "Professional o'qituvchilar",
    popularFields: "Talabgor yo'nalishlar",
    coolStudents: "Ajoyib talabalar",
    studentLife: "Talabalar hayoti",
    onlineAdmissionTitle: "Hujjatlarni onlayn topshirish",
    onlineAdmissionPrompt: "Universitetga kirishga tayyormisiz? Hoziroq shaklni to'ldiring va oliy ta'limga sayohatingizni boshlang.",
    submissionDocuments: "Hujjatlarni topshirish",
    resources: "Resurslar",
    eLibrary: "Elektron kutubxona",
    fieldsOfStudy: "TA'LIM YO'NALISHLARI",
    moreNews: "Ko'proq yangiliklar",
    details: "Batafsil",
    newCampusDevelopment: "Yangi o'quv binolari va yotoqxonalarni barpo etish. Talabalarning o'qish va yashash sharoitlarini yaxshilash maqsadida kampusni kengaytirish.",
    sportsInfrastructure: "Sport infratuzilmasini rivojlantirish. O'quvchilarning jismoniy rivojlanishiga ko'maklashish maqsadida zamonaviy sport majmualari va maydonchalari barpo etilmoqda.",
    advancedTechLearning: "Ta'limning ilg'or texnologiyalarini joriy etish. Innovatsion ta'lim dasturlarini yaratish uchun virtual haqiqat va sun'iy intellektdan foydalanish.",
    internationalCooperation: "Xalqaro hamkorlikni kengaytirish. Dunyoning yetakchi universitetlari bilan almashinuv va qo'sh diplom dasturlari sonini ko'paytirish.",
    partners: "Bizning hamkorlar",
    news: "Yangiliklar",
    publicEvents: "Ommaviy tadbirlar",
    internationalRelations: "Xalqaro munosabatlar",
    loginToAccess: "Ko'rish uchun tizimga kiring",
    login: "Kirish",
    publicServices: "Jamoat xizmatlari",
    dormitoryTTJ: "Talabalar turar joyi",
    womenCommittee: "Xotin-qizlar masalalari",
    youngPsychClub: "Yosh psixologlar klubi",
    structure: "Universitet tashkiliy tuzilmasi",
    documents: "Ta'lim to'g'risidagi hujjatlar",
    vacancies: "Vakansiyalar",
    announcements: "E'lonlar",
    articles: "Maqolalar",
    conference: "Konferensiya",
    international: "Xalqaro hamkorlik",
    surveys: "So'rovnomalar",
    contact: "Aloqa",
    workingDays: "Ish kunlari:",
    monSat: "Dushanba - Shanba: 9:00 - 18:00",
    sunday: "Yakshanba: dam olish kuni",
    address: "Xorazm viloyati, Urganch shahri, Xonqa ko'chasi 26A-uy",
    phone: "(62) 227 77 72",
    email: "university@utu-ranch.uz"
  },
  ru: {
    university: "Университет",
    about: "Об Университете",
    departments: "Факультеты",
    centers: "Центры и Отделы",
    rectorate: "Ректорат",
    rules: "Кодекс внутреннего трудового порядка университета",
    ethics: "Кодекс поведения",
    charter: "Устав Университета",
    abutrient: "Абитуриент",
    fullTime: "Очное направление образования",
    fullTimeCourse: "Название курсов очного обучения (срок обучения 4 года)",
    correspondence: "Заочное направление образования",
    onlineAdmission: "Онлайн подача документов",
    master: "Магистратура",
    library: "Онлайн библиотека",
    jurnal: "Научный электронный журнал университета",
    weHave: "У нас",
    teachers: "Профессиональных Учителей",
    popularFields: "Востребованных Направлений",
    coolStudents: "Крутых Студентов",
    studentLife: "Жизнь студентов",
    onlineAdmissionTitle: "Онлайн подача документов",
    onlineAdmissionPrompt: "Готовитесь к поступлению в университет? Заполните форму прямо сейчас и начните свой путь к высшему образованию.",
    submissionDocuments: "Подача документов",
    resources: "Ресурсы",
    eLibrary: "Электронная библиотека",
    fieldsOfStudy: "НАПРАВЛЕНИЯ ОБУЧЕНИЯ",
    moreNews: "Больше новостей",
    details: "Подробно",
    newCampusDevelopment: "Создание новых учебных корпусов и общежитий. Расширение кампуса для улучшения условий обучения и проживания студентов.",
    sportsInfrastructure: "Развитие спортивной инфраструктуры. Построение современных спортивных комплексов и площадок для содействия физическому развитию студентов.",
    advancedTechLearning: "Внедрение передовых технологий обучения. Использование виртуальной реальности и искусственного интеллекта для создания инновационных образовательных программ.",
    internationalCooperation: "Расширение международного сотрудничества. Увеличение числа программ обмена и двойных дипломов с ведущими мировыми университетами.",
    partners: "Наши Партнеры",
    news: "Новости",
    publicEvents: "Публичные мероприятия",
    internationalRelations: "Международные отношения",
    loginToAccess: "Войдите в систему для доступа",
    login: "Войти",
    publicServices: "Общественные услуги",
    dormitoryTTJ: "Студенческое общежитие",
    womenCommittee: "Комитет женщин",
    youngPsychClub: "Клуб молодых психологов",
    structure: "Структура Университета",
    documents: "Документы об образовании",
    vacancies: "Вакансии",
    announcements: "Объявления",
    articles: "Статьи",
    conference: "Конференция",
    international: "Международное сотрудничество",
    surveys: "Опросы",
    contact: "Связаться",
    workingDays: "Рабочие дни:",
    monSat: "Понедельник - Суббота: 9:00 - 18:00",
    sunday: "Воскресенье: Выходной",
    address: "Хорезмская область, г. Ургенч, ул. Ханка 26A",
    phone: "(62) 227 77 72",
    email: "university@utu-ranch.uz"
  },
  en: {
    university: "University",
    about: "About University",
    departments: "Faculties",
    centers: "Centers and other departments",
    rectorate: "University Rectorate",
    rules: "BEHAVIORAL CODE",
    ethics: "Code of Ethics",
    charter: "University charter",
    abutrient: "Applicant",
    fullTime: "Full-time education programs",
    fullTimeCourse: "Name of full-time courses (4 years of study)",
    correspondence: "Correspondence education programs",
    onlineAdmission: "Online admission",
    master: "Master's degree",
    library: "Online library",
    jurnal: "University scientific e-journal",
    weHave: "We have",
    teachers: "Professional teachers",
    popularFields: "Popular areas of study",
    coolStudents: "Cool Students",
    studentLife: "Students' life",
    onlineAdmissionTitle: "Online submission of documents",
    onlineAdmissionPrompt: "Are you preparing to enter university? Fill out the form now and start your journey to higher education.",
    submissionDocuments: "Submission of documents",
    resources: "Resources",
    eLibrary: "E-library",
    fieldsOfStudy: "FIELDS OF STUDY",
    moreNews: "More news",
    details: "More detail",
    newCampusDevelopment: "Creation of new academic buildings and dormitories. Expansion of the campus to improve the conditions for students to study and live.",
    sportsInfrastructure: "Development of sports infrastructure. Construction of modern sports complexes and grounds to promote physical development of students.",
    advancedTechLearning: "Implementation of advanced learning technologies. Using virtual reality and artificial intelligence to create innovative educational programs.",
    internationalCooperation: "Expansion of international cooperation. Increase in the number of exchange programs and double degrees with leading world universities.",
    partners: "Our Partners",
    news: "News",
    publicEvents: "Public events",
    internationalRelations: "International relations",
    loginToAccess: "Log in to the system for access",
    login: "Log In",
    publicServices: "Public Services",
    dormitoryTTJ: "Student Dormitory",
    womenCommittee: "Women's Committee",
    youngPsychClub: "Young Psychologists Club",
    structure: "Structure of the University",
    documents: "Educational documents",
    vacancies: "Vacancies",
    announcements: "Announcements",
    articles: "Articles",
    conference: "Conference",
    international: "International Cooperation",
    surveys: "Surveys",
    contact: "Contact",
    workingDays: "Working days:",
    monSat: "Monday - Saturday: 9:00 - 18:00",
    sunday: "Sunday: Rest day",
    address: "Khorezm region, Urgench city, Khonqa street 26A",
    phone: "(62) 227 77 72",
    email: "university@utu-ranch.uz"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leng, setLengState] = useState<Language>(() => {
    const saved = localStorage.getItem('utu_lang') as Language;
    return saved === 'ru' || saved === 'en' ? saved : 'uz';
  });

  const [activeTranslations, setActiveTranslations] = useState<Record<Language, Record<string, string>>>(() => {
    try {
      const saved = localStorage.getItem('utu_ranch_cms_state_v2_translations');
      if (saved) return JSON.parse(saved);
    } catch {}
    return translations;
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('utu_ranch_cms_state_v2_translations');
        if (saved) {
          setActiveTranslations(JSON.parse(saved));
        }
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    // Custom event for in-tab sync
    window.addEventListener('utu_translations_updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('utu_translations_updated', handleStorage);
    };
  }, []);

  const setLeng = (newLang: Language) => {
    setLengState(newLang);
    localStorage.setItem('utu_lang', newLang);
  };

  const t = (key: string): string => {
    return (
      activeTranslations[leng]?.[key] ||
      translations[leng]?.[key] ||
      activeTranslations.uz?.[key] ||
      translations.uz[key] ||
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ leng, setLeng, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
