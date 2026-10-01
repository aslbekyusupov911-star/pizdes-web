export type Language = 'uz' | 'ru' | 'en';

export interface NewsItem {
  id: number;
  title_uz: string;
  title_ru?: string;
  title_en?: string;
  desc_uz?: string;
  desc_ru?: string;
  desc_en?: string;
  content_uz?: string;
  content_ru?: string;
  content_en?: string;
  image: string;
  created_at: string;
  views?: number;
  category?: string;
  post_url?: string;
}

export interface StudyDirection {
  id: number;
  code: string | null;
  name_uz: string;
  name_ru: string;
  name_en: string;
  icon?: string;
  contract_uz?: string;
  grant_uz?: string;
  degree?: string;
  duration?: string;
  type?: 'kunduzgi' | 'sirtqi' | 'magistratura';
  faculty?: string;
}

export interface FacultyDepartment {
  id: number;
  name_uz: string;
  name_ru?: string;
  name_en?: string;
  dean_uz?: string;
  dean_ru?: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
  image?: string | null;
  courses_count?: number;
  phone?: string | null;
  email?: string | null;
  parent?: any;
  children_kafedra?: {
    id: number;
    name_uz: string;
    name_ru?: string;
    name_en?: string;
    head?: string;
  }[];
}

export interface CenterDepartment {
  id: number;
  name_uz: string;
  name_ru?: string;
  name_en?: string;
  head_uz?: string;
  head_ru?: string;
  phone?: string | null;
  email?: string | null;
  description_uz?: string;
  image?: string | null;
}

export interface RectorateMember {
  id: number;
  name_uz: string;
  name_ru?: string;
  name_en?: string;
  position_uz?: string;
  position_ru?: string;
  position_en?: string;
  lavozim_uz?: string;
  lavozim_ru?: string;
  lavozim_en?: string;
  malumot_uz?: string | null;
  malumot_ru?: string | null;
  malumot_en?: string | null;
  degree_uz?: string | null;
  phone?: string | null;
  cantact?: string | null;
  email?: string | null;
  reception_days_uz?: string | null;
  uchrashuv_vaqti_uz?: string | null;
  uchrashuv_vaqti_ru?: string | null;
  uchrashuv_vaqti_en?: string | null;
  image: string;
}

export interface PartnerItem {
  id: number;
  name?: string;
  title?: string;
  image: string;
  url_link: string;
}

export interface VacancyItem {
  id: number;
  title: string;
  department: string;
  type: string;
  salary: string;
  deadline: string;
  requirements: string[];
}

export type StaffMember = RectorateMember;
