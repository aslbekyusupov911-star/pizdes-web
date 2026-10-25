import { NewsItem, StudyDirection, StaffMember, PartnerItem, VacancyItem } from '../types';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ==================== NEWS API ====================
export const newsApi = {
  async getAll(category?: string, search?: string): Promise<NewsItem[]> {
    const q = new URLSearchParams();
    if (category && category !== 'all') q.append('category', category);
    if (search) q.append('search', search);
    const res = await fetch(`${API_BASE_URL}/api/news/?${q.toString()}`);
    if (!res.ok) throw new Error("Yangiliklarni yuklashda xatolik");
    return res.json();
  },

  async getById(id: number): Promise<NewsItem> {
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`);
    if (!res.ok) throw new Error("Yangilik topilmadi");
    return res.json();
  },

  async create(data: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    const res = await fetch(`${API_BASE_URL}/api/news/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Yangilik qo'shishda xatolik");
    return res.json();
  },

  async update(id: number, data: Partial<NewsItem>): Promise<NewsItem> {
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Yangilikni yangilashda xatolik");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Yangilikni o'chirishda xatolik");
  },
};

// ==================== DIRECTIONS API ====================
export const directionsApi = {
  async getAll(type?: string): Promise<StudyDirection[]> {
    const q = new URLSearchParams();
    if (type && type !== 'all') q.append('type', type);
    const res = await fetch(`${API_BASE_URL}/api/directions/?${q.toString()}`);
    if (!res.ok) throw new Error("Yo'nalishlarni yuklashda xatolik");
    return res.json();
  },

  async create(data: Omit<StudyDirection, 'id'>): Promise<StudyDirection> {
    const res = await fetch(`${API_BASE_URL}/api/directions/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Yo'nalish qo'shishda xatolik");
    return res.json();
  },

  async update(id: number, data: Partial<StudyDirection>): Promise<StudyDirection> {
    const res = await fetch(`${API_BASE_URL}/api/directions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Yo'nalishni tahrirlashda xatolik");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/directions/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Yo'nalishni o'chirishda xatolik");
  },
};

// ==================== STAFF API ====================
export const staffApi = {
  async getAll(): Promise<StaffMember[]> {
    const res = await fetch(`${API_BASE_URL}/api/staff/`);
    if (!res.ok) throw new Error("Xodimlarni yuklashda xatolik");
    return res.json();
  },

  async create(data: Omit<StaffMember, 'id'>): Promise<StaffMember> {
    const res = await fetch(`${API_BASE_URL}/api/staff/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Xodim qo'shishda xatolik");
    return res.json();
  },

  async update(id: number, data: Partial<StaffMember>): Promise<StaffMember> {
    const res = await fetch(`${API_BASE_URL}/api/staff/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Xodimni yangilashda xatolik");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/staff/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Xodimni o'chirishda xatolik");
  },
};

// ==================== PARTNERS API ====================
export const partnersApi = {
  async getAll(): Promise<PartnerItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/partners/`);
    if (!res.ok) throw new Error("Hamkorlarni yuklashda xatolik");
    return res.json();
  },

  async create(data: Omit<PartnerItem, 'id'>): Promise<PartnerItem> {
    const res = await fetch(`${API_BASE_URL}/api/partners/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hamkor qo'shishda xatolik");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/partners/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Hamkorni o'chirishda xatolik");
  },
};

// ==================== VACANCIES API ====================
export const vacanciesApi = {
  async getAll(): Promise<VacancyItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/vacancies/`);
    if (!res.ok) throw new Error("Vakansiyalarni yuklashda xatolik");
    return res.json();
  },

  async create(data: Omit<VacancyItem, 'id'>): Promise<VacancyItem> {
    const res = await fetch(`${API_BASE_URL}/api/vacancies/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Vakansiya qo'shishda xatolik");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/vacancies/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Vakansiyani o'chirishda xatolik");
  },
};

// ==================== CONTACT / RESUMES API ====================
export const contactApi = {
  async send(data: {
    name: string;
    phone: string;
    email?: string;
    vacancy_title?: string;
    message?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Murojaatni yuborishda xatolik");
    return res.json();
  },

  async getAll() {
    const res = await fetch(`${API_BASE_URL}/api/contact/`);
    if (!res.ok) throw new Error("Murojaatlarni yuklashda xatolik");
    return res.json();
  },
};

// ==================== FILE UPLOAD API ====================
export const uploadApi = {
  async upload(file: File): Promise<{ success: boolean; url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE_URL}/api/upload/`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error("Faylni yuklashda xatolik");
    return res.json();
  },
};
