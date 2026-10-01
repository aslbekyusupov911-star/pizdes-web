import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import { Calendar, Bell, ExternalLink, MapPin } from 'lucide-react';

export const Announcements: React.FC = () => {
  const { leng } = useLanguage();

  const announcements = [
    {
      id: 1,
      title_uz: "Xalqaro ilmiy-amaliy anjuman: «Zamonaviy texnologiyalar va innovatsion ta'lim»",
      title_ru: "Международная конференция: «Современные технологии и инновационное образование»",
      title_en: "International Scientific Conference: 'Modern Technologies and Innovative Education'",
      date: "2024-11-25",
      location: "Bosh bino, Konferens zali",
      desc_uz: "Barcha professor-o'qituvchilar, magistrantlar va mustaqil izlanuvchilar o'z ilmiy maqolalari bilan ishtirok etishlari mumkin.",
      link: "https://tdkongre.com/en/"
    },
    {
      id: 2,
      title_uz: "2024/2025 o'quv yili qishki semestr imtihonlari jadvali",
      title_ru: "Расписание экзаменов зимнего семестра 2024/2025 учебного года",
      title_en: "Winter semester examination schedule 2024/2025",
      date: "2024-12-10",
      location: "HEMIS portali",
      desc_uz: "Imtihonlar HEMIS platformasi orqali shaffof va adolatli tarzda tashkil etiladi.",
      link: "https://student.utu-ranch.uz"
    },
    {
      id: 3,
      title_uz: "Xorijiy universitetlarda akademik mobillik dasturiga tanlov e'loni",
      title_ru: "Конкурс на программу академической мобильности в зарубежных вузах",
      title_en: "Selection call for academic mobility programs in foreign universities",
      date: "2025-01-15",
      location: "Xalqaro hamkorlik bo'limi",
      desc_uz: "Turkiya, Polsha va Malayziya universitetlarida bir semestr mobaynida o'qish imkoniyati.",
      link: "https://international.utu-ranch.uz/mobility"
    }
  ];

  return (
    <div className="elonlarPage min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
            E'lonlar & Konferensiyalar
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            {leng === 'uz' ? "Universitet e'lonlari" : leng === 'ru' ? 'Объявления университета' : 'University Announcements'}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Talabalar, tadqiqotchilar va jamoatchilik uchun dolzarb e’lonlar va ilmiy anjumanlar
          </p>
        </div>

        <div className="space-y-6">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#f56100] flex items-center justify-center flex-shrink-0">
                  <Bell className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1 text-gray-600 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#f56100]" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                    {leng === 'ru' ? item.title_ru : leng === 'en' ? item.title_en : item.title_uz}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                    {item.desc_uz}
                  </p>
                </div>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f56100] text-white rounded-xl text-xs font-bold shadow hover:bg-[#d95200] transition-colors flex-shrink-0"
              >
                <span>Batafsil ma'lumot</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Announcements;
