import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { kafedrashu as defaultFaculties } from '../data/initialData';
import { ArrowLeft, BookOpen, Download, UserCheck, Mail, Phone } from 'lucide-react';

export const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { leng, t } = useLanguage();
  const [faculty, setFaculty] = useState<any>(null);

  useEffect(() => {
    const found = defaultFaculties.find((f: any) => String(f.id) === String(id));
    if (found) setFaculty(found);

    fetch(`https://new.utu-ranch.uz/category/kafedrakontent/by-kafedra/${id}/`)
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) {
          setFaculty((prev: any) => ({ ...prev, ...json }));
        }
      })
      .catch(() => {});
  }, [id]);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    );
  }

  const name =
    (leng === 'ru' && faculty.name_ru) ||
    (leng === 'en' && faculty.name_en) ||
    faculty.name_uz;

  const desc =
    (leng === 'ru' && faculty.description_ru) ||
    (leng === 'en' && faculty.description_en) ||
    faculty.description_uz;

  const syllabi = [
    { title: "O'quv rejasi va dasturlar", code: "MOD-2024", size: "1.4 MB" },
    { title: "Kafedra ilmiy yo'nalishlari", code: "RES-2024", size: "850 KB" },
    { title: "Kredit-modul tizimi qo'llanmasi", code: "HEMIS-CR", size: "2.1 MB" },
  ];

  return (
    <div className="departmentDetailPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={2} />

        <div className="mt-8 mb-6">
          <Link
            to="/department"
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#f56100] gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {leng === 'uz' ? 'Kafedralar ro‘yxatiga qaytish' : 'Назад к списку кафедр'}
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="border-b border-gray-100 pb-8 mb-8">
            <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] font-semibold text-xs rounded-full uppercase tracking-wider mb-4">
              Kafedra #{faculty.id}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              {name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              {desc ||
                (leng === 'uz'
                  ? "Kafedra universitetning asosiy o'quv-ilmiy bo'g'ini bo'lib, zamonaviy mutaxassislarni tayyorlash bilan shug'ullanadi."
                  : 'Кафедра является основным учебно-научным звеном университета.')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Faculty programs / Courses */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#f56100]" />
                  {leng === 'uz' ? 'Kafedra yo‘nalishlari va fanlar' : 'Направления и дисциплины'}
                </h3>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
                  <p className="text-sm text-gray-600">
                    {leng === 'uz'
                      ? "Ushbu kafedra doirasida talabalarga fundamental va amaliy fanlar, xalqaro tajribaga asoslangan modullar o'qitiladi."
                      : 'В рамках кафедры преподаются фундаментальные и прикладные дисциплины.'}
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1.5 pt-2">
                    <li>Kredit-modul tizimi (ECTS) bo'yicha tashkil etilgan darslar</li>
                    <li>Xorijiy professorlar ishtirokidagi mahorat darslari</li>
                    <li>Zamonaviy kompyuter laboratoriyalarida amaliy mashg'ulotlar</li>
                    <li>Soha korxonalari bilan hamkorlikdagi dual ta'lim</li>
                  </ul>
                </div>
              </div>

              {/* Syllabi and materials */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#f56100]" />
                  {leng === 'uz' ? 'O‘quv hujjatlari va sillabuslar' : 'Учебные материалы'}
                </h3>
                <div className="space-y-3">
                  {syllabi.map((syl, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-[#f56100] transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{syl.title}</h4>
                        <span className="text-xs text-gray-400">{syl.code} • {syl.size}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`${syl.title} yuklab olinmoqda...`)}
                        className="px-4 py-2 bg-orange-50 text-[#f56100] hover:bg-[#f56100] hover:text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Yuklab olish
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with Dean / Contacts */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-[#f56100] flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {faculty.dean_uz || "Kafedra mudiri"}
                  </h4>
                  <p className="text-xs text-gray-500">Kafedra rahbari</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>(62) 227 77 72</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>university@utu-ranch.uz</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://student.utu-ranch.uz/dashboard/login"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center w-full py-3 bg-[#f56100] text-white rounded-xl text-sm font-bold shadow hover:bg-[#d95200] transition-colors"
                >
                  HEMIS tizimiga kirish
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DepartmentDetail;
