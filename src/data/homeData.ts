import { NewsItem, PartnerItem } from '../types';

export const initialNews: NewsItem[] = [
  {
    id: 1,
    title_uz: "Ranch Texnologiya Universitetida yangi o'quv yili tantanali ochilishi",
    title_ru: "Торжественное открытие нового учебного года в Университете Ранч",
    title_en: "Grand opening of the new academic year at Ranch Technology University",
    image: "/static/media/news2.8d897ad50f4a5125cf2d.png",
    created_at: "2024-09-02",
    views: 1240,
    desc_uz: "Universitetimizda 2024/2025-o'quv yili ko'tarinki ruhda boshlandi.",
    desc_ru: "В нашем университете 2024/2025 учебный год начался на высоком уровне.",
    desc_en: "The 2024/2025 academic year began at a high standard at our university."
  },
  {
    id: 2,
    title_uz: "Xalqaro hamkorlik doirasida xorijiy professorlar dars mashg'ulotlari",
    title_ru: "Занятия зарубежных профессоров в рамках международного сотрудничества",
    title_en: "Lectures by foreign professors within international cooperation",
    image: "/static/media/news3.40b3796627f4aa275288.png",
    created_at: "2024-09-15",
    views: 980,
    desc_uz: "Turkiya va Germaniyaning yetakchi OTMlaridan tashrif buyurgan professor-o'qituvchilar ma'ruzalari davom etmoqda.",
    desc_ru: "Продолжаются лекции преподавателей ведущих вузов Турции и Германии.",
    desc_en: "Lectures by professors from leading universities in Turkey and Germany continue."
  },
  {
    id: 3,
    title_uz: "Talabalar turar joyi to'liq zamonaviy sharoitlar bilan foydalanishga topshirildi",
    title_ru: "Студенческое общежитие введено в эксплуатацию с современными условиями",
    title_en: "Student dormitory commissioned with all modern facilities",
    image: "/static/media/ranchAfter7.60370a13c0e25a4af7b0.png",
    created_at: "2024-10-01",
    views: 1450,
    desc_uz: "Barcha qulayliklarga ega yangi talabalar turar joyi talabalarni qabul qildi.",
    desc_ru: "Новое комфортабельное общежитие приняло студентов.",
    desc_en: "A new comfortable dormitory welcomed students."
  }
];

export const initialPartners: PartnerItem[] = [
  {
    id: 1,
    name: "Toshkent Davlat Iqtisodiyot Universiteti",
    image: "/static/media/ranchRes1.67c2bb4b658dd2536538.png",
    url_link: "https://tsue.uz"
  },
  {
    id: 2,
    name: "Urganch Davlat Universiteti",
    image: "/static/media/logoRight1.701ec19f51fdaf1b64f2aa51fff6cf22.svg",
    url_link: "https://urdu.uz"
  },
  {
    id: 3,
    name: "Istanbul University",
    image: "/static/media/logoRight2.a376b4835777eeeefa4553e2e4b03df1.svg",
    url_link: "https://istanbul.edu.tr"
  },
  {
    id: 4,
    name: "University of Malaya",
    image: "/static/media/logoRight3.c7e2f6e670c9d427ebb708ce04df77df.svg",
    url_link: "https://um.edu.my"
  },
  {
    id: 5,
    name: "TD Kongre",
    image: "/static/media/ranchRes1.67c2bb4b658dd2536538.png",
    url_link: "https://tdkongre.com"
  }
];

export interface StudyPill {
  code: string | null;
  uz: string;
  ru: string;
  en: string;
  icon?: string;
}

export const studyPills: StudyPill[][] = [
  [
    { code: "603.01", uz: "Iqtisodiyot", ru: "Экономика", en: "Economy", icon: "/static/media/marketingIcon.49b05b4c0777681d90de0f1ac1da2053.svg" },
    { code: "6041030", uz: "Buxgalteriya hisobi", ru: "Бухгалтерский учёт", en: "Accounting", icon: "/static/media/money.3aa5be4ba28f9e70b241d75001b16f4f.svg" },
    { code: "60310300", uz: "Menejment", ru: "Менеджмент", en: "Management", icon: "/static/media/manageUser.b24294bd5127574789e5b0deccaa48e6.svg" },
    { code: "603.02", uz: "Marketing", ru: "Маркетинг", en: "Marketing", icon: "/static/media/marketingIcon.49b05b4c0777681d90de0f1ac1da2053.svg" },
    { code: null, uz: "Filologiya va tillarni o'qitish", ru: "Филология и обучение языкам", en: "Philology and Teaching Languages", icon: "/static/media/menuBook.429b233c683352037094a9d1f29c7a75.svg" }
  ],
  [
    { code: null, uz: "Maktabgacha ta'lim", ru: "Дошкольное образование", en: "Preschool education", icon: "/static/media/menuBook.429b233c683352037094a9d1f29c7a75.svg" },
    { code: null, uz: "Matematika", ru: "Математика", en: "Mathematics", icon: "/static/media/miyaIcon.da1e80904040ba37d81ddc5419beeb3e.svg" },
    { code: null, uz: "Kompyuter injiniringi", ru: "Компьютерная инженерия", en: "Computer engineering", icon: "/static/media/masterSet.615b63fe77f1a8e1d571e38d1ed033b5.svg" }
  ],
  [
    { code: null, uz: "Kiberxavfsizlik injiniringi", ru: "Инженерия кибербезопасности", en: "Cyber Security engineering", icon: "/static/media/setIcon.d660b56e0aea3ae45f3aaa67babedb24.svg" },
    { code: null, uz: "Texnologik mashinalar va jihozlar", ru: "Технологические машины и оборудование", en: "Technological machines and equipment", icon: "/static/media/masterSet.615b63fe77f1a8e1d571e38d1ed033b5.svg" }
  ],
  [
    { code: null, uz: "Boshlang'ich ta'lim", ru: "Начальное образование", en: "Primary education", icon: "/static/media/menuBook.429b233c683352037094a9d1f29c7a75.svg" },
    { code: null, uz: "Bank ishi", ru: "Банковское дело", en: "Banking", icon: "/static/media/money.3aa5be4ba28f9e70b241d75001b16f4f.svg" },
    { code: null, uz: "Energetika muhandisligi", ru: "Энергетическая инженерия", en: "Energy engineering", icon: "/static/media/masterSet.615b63fe77f1a8e1d571e38d1ed033b5.svg" }
  ],
  [
    { code: null, uz: "Transport vositalari muhandisligi", ru: "Транспортное машиностроение", en: "Vehicle Engineering", icon: "/static/media/masterSet.615b63fe77f1a8e1d571e38d1ed033b5.svg" },
    { code: null, uz: "Arxitektura", ru: "Архитектура", en: "Architecture", icon: "/static/media/setIcon.d660b56e0aea3ae45f3aaa67babedb24.svg" },
    { code: null, uz: "Shahar qurilishi va xo'jaligi", ru: "Городское строительство", en: "Civil engineering", icon: "/static/media/masterSet.615b63fe77f1a8e1d571e38d1ed033b5.svg" }
  ]
];
