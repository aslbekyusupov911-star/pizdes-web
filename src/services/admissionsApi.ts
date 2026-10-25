export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface AdmissionPayload {
  first_name: string;
  last_name: string;
  middle_name?: string;
  passport_series: string;
  passport_number: string;
  phone: string;
  email?: string;
  birth_date?: string;
  gender: string;
  region: string;
  study_type: string;
  direction: string;
}

export interface AdmissionItem extends AdmissionPayload {
  id: number;
  application_number: string;
  status: 'yangi' | 'korilmoqda' | 'qabul_qilindi' | 'rad_etildi';
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface AdmissionStats {
  total: number;
  new: number;
  in_review: number;
  accepted: number;
  rejected: number;
  by_study_type: Record<string, number>;
  by_direction: Record<string, number>;
}

export const admissionsApi = {
  // Yangi ariza yuborish
  async submit(data: AdmissionPayload): Promise<AdmissionItem> {
    const res = await fetch(`${API_BASE_URL}/api/admissions/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Arizani yuborishda xatolik yuz berdi');
    }
    return res.json();
  },

  // Barcha arizalarni olish
  async getAll(params?: {
    search?: string;
    status?: string;
    study_type?: string;
    direction?: string;
  }): Promise<AdmissionItem[]> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status && params.status !== 'all') query.append('status', params.status);
    if (params?.study_type && params.study_type !== 'all') query.append('study_type', params.study_type);
    if (params?.direction && params.direction !== 'all') query.append('direction', params.direction);

    const res = await fetch(`${API_BASE_URL}/api/admissions/?${query.toString()}`);
    if (!res.ok) {
      throw new Error("Arizalarni yuklashda xatolik yuz berdi");
    }
    return res.json();
  },

  // Statistika
  async getStats(): Promise<AdmissionStats> {
    const res = await fetch(`${API_BASE_URL}/api/admissions/stats`);
    if (!res.ok) {
      throw new Error("Statistikani yuklashda xatolik yuz berdi");
    }
    return res.json();
  },

  // Ariza raqami orqali tekshirish
  async track(applicationNumber: string): Promise<AdmissionItem> {
    const res = await fetch(`${API_BASE_URL}/api/admissions/track/${encodeURIComponent(applicationNumber.trim())}`);
    if (!res.ok) {
      throw new Error("Bunday raqamli ariza topilmadi");
    }
    return res.json();
  },

  // Holatni yangilash
  async updateStatus(id: number, status: string, admin_notes?: string): Promise<AdmissionItem> {
    const res = await fetch(`${API_BASE_URL}/api/admissions/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, admin_notes }),
    });
    if (!res.ok) {
      throw new Error("Holatni yangilashda xatolik");
    }
    return res.json();
  },

  // Arizani o'chirish
  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/admissions/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error("Arizani o'chirishda xatolik");
    }
  },
};
