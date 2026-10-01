import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialNews, initialPartners } from '../data/homeData';
import {
  rektorot as initialRektorat,
  yonalishlar as initialKunduzgi,
  yonalishlar_sirtqi as initialSirtqi,
  yonalishlar_magister as initialMagister,
} from '../data/initialData';
import { translations as defaultTranslations } from './LanguageContext';
import { Language, NewsItem, StudyDirection, StaffMember, PartnerItem, VacancyItem } from '../types';

const combinedInitialDirections: StudyDirection[] = [
  ...initialKunduzgi.map((d: any) => ({ ...d, type: 'kunduzgi' as const })),
  ...initialSirtqi.map((d: any) => ({ ...d, type: 'sirtqi' as const })),
  ...initialMagister.map((d: any) => ({ ...d, type: 'magistratura' as const })),
];

const initialVacanciesList: VacancyItem[] = [
  {
    id: 1,
    title: "Ingliz tili fani o‘qituvchisi (Professor / Dotsent)",
    department: "Jahon tillari kafedrasi",
    salary: "Kelishilgan holda (Yuqori daraja)",
    type: "To'liq stavka",
    deadline: "2026-02-15",
    requirements: [
      "Filologiya yoki chet tillari bo'yicha oliy ma'lumot",
      "Kamida IELTS 7.5 yoki CEFR C1 darajasidagi sertifikat",
    ],
  },
  {
    id: 2,
    title: "Sun'iy intellekt va dasturlash o‘qituvchisi",
    department: "Kompyuter injiniringi kafedrasi",
    salary: "8 000 000 - 15 000 000 so'm",
    type: "To'liq stavka",
    deadline: "2026-03-01",
    requirements: [
      "IT yoki amaliy matematika bo'yicha magistr/PhD",
      "Python, C++ yoki zamonaviy texnologiyalarda amaliy tajriba",
    ],
  },
];

export interface SiteMediaConfig {
  heroTitleUz: string;
  heroTitleRu: string;
  heroTitleEn: string;
  heroBuildingDay: string;
  heroBuildingNight: string;
  heroScholarPortrait: string;
  youtubeVideoUrl: string;
  plan1Img: string;
  plan2Img: string;
  plan3Img: string;
  plan4Img: string;
  admissionBannerImg: string;
  studentPhotos: string[];
}

export const defaultMediaConfig: SiteMediaConfig = {
  heroTitleUz: '/static/media/Haqiqat34.3258b9424a3fa1eab20a.png',
  heroTitleRu: '/static/media/title_ru.ec167194d510877f47a4c49b607202b9.svg',
  heroTitleEn: '/static/media/title_en.9cc83034bf050344c12764859e11cf26.svg',
  heroBuildingDay: '/static/media/ranchAfter7.60370a13c0e25a4af7b0.png',
  heroBuildingNight: '/static/media/ranchBefore7.d79308645f34a3a23df9.png',
  heroScholarPortrait: '/static/media/shoir2.9220c38350a744394b98.png',
  youtubeVideoUrl: 'https://www.youtube.com/embed/sy8lpKZPkp8',
  plan1Img: '/static/media/plan1.de266218136823878216.png',
  plan2Img: '/static/media/plan2.9d5510683e6d22d11fa0.png',
  plan3Img: '/static/media/plan3.0127f15bafd3ed503c42.png',
  plan4Img: '/static/media/plan4.cf62e0097012d9660c2e.png',
  admissionBannerImg: '/static/media/userNot.88d721c36cc1387fe369ead3c66ea285.svg',
  studentPhotos: [
    '/static/media/student/student_1.jpg',
    '/static/media/student/student_2.jpg',
    '/static/media/student/student_3.jpg',
    '/static/media/student/student_4.jpg',
    '/static/media/student/student_5.jpg',
    '/static/media/student/student_6.jpg',
    '/static/media/student/student_7.jpg',
    '/static/media/student/student_8.jpg',
  ],
};

interface CMSContextType {
  isAdminLoggedIn: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  isLiveEditMode: boolean;
  toggleLiveEditMode: () => void;

  // Words & Translations
  translations: Record<Language, Record<string, string>>;
  updateTranslation: (lang: Language, key: string, value: string) => void;
  addTranslationKey: (key: string, uz: string, ru: string, en: string) => void;
  deleteTranslationKey: (key: string) => void;

  // Media
  media: SiteMediaConfig;
  updateMediaField: (field: keyof SiteMediaConfig, value: any) => void;
  addStudentPhoto: (url: string) => void;
  removeStudentPhoto: (index: number) => void;

  // News
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => NewsItem;
  updateNews: (id: number, item: Partial<NewsItem>) => void;
  deleteNews: (id: number) => void;

  // Directions
  directions: StudyDirection[];
  addDirection: (item: Omit<StudyDirection, 'id'>) => void;
  updateDirection: (id: number, item: Partial<StudyDirection>) => void;
  deleteDirection: (id: number) => void;

  // Staff / Rectorate
  staff: StaffMember[];
  addStaff: (item: Omit<StaffMember, 'id'>) => void;
  updateStaff: (id: number, item: Partial<StaffMember>) => void;
  deleteStaff: (id: number) => void;

  // Partners
  partners: PartnerItem[];
  addPartner: (item: Omit<PartnerItem, 'id'>) => void;
  updatePartner: (id: number, item: Partial<PartnerItem>) => void;
  deletePartner: (id: number) => void;

  // Vacancies
  vacancies: VacancyItem[];
  addVacancy: (item: Omit<VacancyItem, 'id'>) => void;
  updateVacancy: (id: number, item: Partial<VacancyItem>) => void;
  deleteVacancy: (id: number) => void;

  // Export / Import / Reset
  exportAllData: () => string;
  importAllData: (jsonStr: string) => boolean;
  resetAllToDefault: () => void;
}

const STORAGE_KEY = 'utu_ranch_cms_state_v2';
const AUTH_KEY = 'utu_ranch_admin_auth';

export const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isLiveEditMode, setIsLiveEditMode] = useState<boolean>(false);

  // Core CMS state
  const [translations, setTranslations] = useState<Record<Language, Record<string, string>>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_translations');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultTranslations;
  });

  const [media, setMedia] = useState<SiteMediaConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_media');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultMediaConfig;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_news');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialNews;
  });

  const [directions, setDirections] = useState<StudyDirection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_directions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return combinedInitialDirections;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_staff');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialRektorat as unknown as StaffMember[];
  });

  const [partners, setPartners] = useState<PartnerItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_partners');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialPartners;
  });

  const [vacancies, setVacancies] = useState<VacancyItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_vacancies');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialVacanciesList;
  });

  // Save to localStorage when states update
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_translations', JSON.stringify(translations));
  }, [translations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_media', JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_directions', JSON.stringify(directions));
  }, [directions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_vacancies', JSON.stringify(vacancies));
  }, [vacancies]);

  // Auth functions
  const login = (password: string) => {
    if (password === 'admin' || password === 'ranch2026' || password === '123456') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setIsLiveEditMode(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const toggleLiveEditMode = () => {
    setIsLiveEditMode((prev) => !prev);
  };

  // Translations
  const updateTranslation = (lang: Language, key: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value,
      },
    }));
  };

  const addTranslationKey = (key: string, uz: string, ru: string, en: string) => {
    setTranslations((prev) => ({
      uz: { ...prev.uz, [key]: uz },
      ru: { ...prev.ru, [key]: ru },
      en: { ...prev.en, [key]: en },
    }));
  };

  const deleteTranslationKey = (key: string) => {
    setTranslations((prev) => {
      const newUz = { ...prev.uz };
      const newRu = { ...prev.ru };
      const newEn = { ...prev.en };
      delete newUz[key];
      delete newRu[key];
      delete newEn[key];
      return { uz: newUz, ru: newRu, en: newEn };
    });
  };

  // Media
  const updateMediaField = (field: keyof SiteMediaConfig, value: any) => {
    setMedia((prev) => ({ ...prev, [field]: value }));
  };

  const addStudentPhoto = (url: string) => {
    setMedia((prev) => ({
      ...prev,
      studentPhotos: [url, ...prev.studentPhotos],
    }));
  };

  const removeStudentPhoto = (index: number) => {
    setMedia((prev) => ({
      ...prev,
      studentPhotos: prev.studentPhotos.filter((_, i) => i !== index),
    }));
  };

  // News
  const addNews = (item: Omit<NewsItem, 'id'>): NewsItem => {
    const newId = Date.now();
    const newItem: NewsItem = { ...item, id: newId };
    setNews((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateNews = (id: number, item: Partial<NewsItem>) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...item } : n))
    );
  };

  const deleteNews = (id: number) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  // Directions
  const addDirection = (item: Omit<StudyDirection, 'id'>) => {
    const newId = Date.now();
    setDirections((prev) => [{ ...item, id: newId }, ...prev]);
  };

  const updateDirection = (id: number, item: Partial<StudyDirection>) => {
    setDirections((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...item } : d))
    );
  };

  const deleteDirection = (id: number) => {
    setDirections((prev) => prev.filter((d) => d.id !== id));
  };

  // Staff
  const addStaff = (item: Omit<StaffMember, 'id'>) => {
    const newId = Date.now();
    setStaff((prev) => [{ ...item, id: newId }, ...prev]);
  };

  const updateStaff = (id: number, item: Partial<StaffMember>) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...item } : s))
    );
  };

  const deleteStaff = (id: number) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  // Partners
  const addPartner = (item: Omit<PartnerItem, 'id'>) => {
    const newId = Date.now();
    setPartners((prev) => [{ ...item, id: newId }, ...prev]);
  };

  const updatePartner = (id: number, item: Partial<PartnerItem>) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...item } : p))
    );
  };

  const deletePartner = (id: number) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  // Vacancies
  const addVacancy = (item: Omit<VacancyItem, 'id'>) => {
    const newId = Date.now();
    setVacancies((prev) => [{ ...item, id: newId }, ...prev]);
  };

  const updateVacancy = (id: number, item: Partial<VacancyItem>) => {
    setVacancies((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...item } : v))
    );
  };

  const deleteVacancy = (id: number) => {
    setVacancies((prev) => prev.filter((v) => v.id !== id));
  };

  // Backup & Reset
  const exportAllData = () => {
    const fullBackup = {
      version: 2,
      exportedAt: new Date().toISOString(),
      translations,
      media,
      news,
      directions,
      staff,
      partners,
      vacancies,
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const importAllData = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.translations) setTranslations(data.translations);
      if (data.media) setMedia(data.media);
      if (data.news) setNews(data.news);
      if (data.directions) setDirections(data.directions);
      if (data.staff) setStaff(data.staff);
      if (data.partners) setPartners(data.partners);
      if (data.vacancies) setVacancies(data.vacancies);
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  };

  const resetAllToDefault = () => {
    setTranslations(defaultTranslations);
    setMedia(defaultMediaConfig);
    setNews(initialNews);
    setDirections(combinedInitialDirections);
    setStaff(initialRektorat as unknown as StaffMember[]);
    setPartners(initialPartners);
    setVacancies(initialVacanciesList);
    localStorage.removeItem(STORAGE_KEY + '_translations');
    localStorage.removeItem(STORAGE_KEY + '_media');
    localStorage.removeItem(STORAGE_KEY + '_news');
    localStorage.removeItem(STORAGE_KEY + '_directions');
    localStorage.removeItem(STORAGE_KEY + '_staff');
    localStorage.removeItem(STORAGE_KEY + '_partners');
    localStorage.removeItem(STORAGE_KEY + '_vacancies');
  };

  return (
    <CMSContext.Provider
      value={{
        isAdminLoggedIn,
        login,
        logout,
        isLiveEditMode,
        toggleLiveEditMode,
        translations,
        updateTranslation,
        addTranslationKey,
        deleteTranslationKey,
        media,
        updateMediaField,
        addStudentPhoto,
        removeStudentPhoto,
        news,
        addNews,
        updateNews,
        deleteNews,
        directions,
        addDirection,
        updateDirection,
        deleteDirection,
        staff,
        addStaff,
        updateStaff,
        deleteStaff,
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        vacancies,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        exportAllData,
        importAllData,
        resetAllToDefault,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
