import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { obuniversitet as defaultAbout } from '../data/initialData';

export const About: React.FC = () => {
  const { leng, t } = useLanguage();
  const [data, setData] = useState<any[]>(defaultAbout || []);

  useEffect(() => {
    fetch('https://new.utu-ranch.uz/category/obuniversitet/')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) setData(json);
      })
      .catch(() => {});
  }, []);

  const aboutItem = data[0] || {};
  const content =
    leng === 'ru'
      ? aboutItem.content_ru || aboutItem.content_uz
      : leng === 'en'
      ? aboutItem.content_en || aboutItem.content_uz
      : aboutItem.content_uz;

  return (
    <div className="aboutPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={1} />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mt-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
            <div className="lg:w-1/2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {leng === 'uz'
                  ? 'Urganch Ranch Texnologiya Universiteti'
                  : leng === 'ru'
                  ? 'Ургенчский Технологический Университет Ранч'
                  : 'Urgench Ranch Technology University'}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {leng === 'uz'
                  ? "Ranch Texnologiya Universiteti — zamonaviy ta'lim standartlari, yuqori malakali professor-o'qituvchilar va innovatsion texnologiyalarga asoslangan yetakchi oliy ta'lim muassasasi."
                  : leng === 'ru'
                  ? 'Технологический университет Ранч — ведущее высшее образовательное учреждение, основанное на современных стандартах обучения и инновационных технологиях.'
                  : 'Ranch Technology University is a leading higher education institution based on modern educational standards, qualified faculty, and innovative technologies.'}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <h3 className="text-3xl font-black text-[#f56100]">180+</h3>
                  <p className="text-xs text-gray-500 font-medium">{t('teachers')}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#f56100]">40+</h3>
                  <p className="text-xs text-gray-500 font-medium">{t('popularFields')}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#f56100]">7 000+</h3>
                  <p className="text-xs text-gray-500 font-medium">{t('coolStudents')}</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src="/static/media/ranchAfter7.60370a13c0e25a4af7b0.png"
                alt="UTU Ranch Campus"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="text-white font-medium text-sm">
                  Urganch shahri, Xonqa ko'chasi 26A-uy
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Content / History */}
          {content && (
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed pt-8 border-t border-gray-100 space-y-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Mission & Vision cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-orange-50/60 rounded-2xl p-6 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-[#f56100]">
                {leng === 'uz' ? 'Bizning missiyamiz' : leng === 'ru' ? 'Наша миссия' : 'Our Mission'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {leng === 'uz'
                  ? "Mehnat bozorida raqobatbardosh, mustaqil fikrlaydigan va yuqori kasbiy madaniyatga ega mutaxassislarni tayyorlash."
                  : leng === 'ru'
                  ? 'Подготовка конкурентоспособных специалистов с независимым мышлением и высокой профессиональной культурой.'
                  : 'Training competitive professionals with independent thinking and high professional standards.'}
              </p>
            </div>

            <div className="bg-blue-50/60 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-blue-600">
                {leng === 'uz' ? 'Xalqaro e’tirof' : leng === 'ru' ? 'Международное признание' : 'Global Recognition'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {leng === 'uz'
                  ? "Dunyoning yetakchi universitetlari bilan almashinuv, xalqaro amaliyot va qo'shma diplom dasturlari."
                  : leng === 'ru'
                  ? 'Программы обмена, международная практика и совместные дипломы с ведущими мировыми университетами.'
                  : 'Exchange programs, global internships, and dual degree tracks with prominent universities worldwide.'}
              </p>
            </div>

            <div className="bg-green-50/60 rounded-2xl p-6 border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-green-600">
                {leng === 'uz' ? 'Innovatsiya va amaliyot' : leng === 'ru' ? 'Инновации и практика' : 'Innovation & Practice'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {leng === 'uz'
                  ? "Zamonaviy laboratoriyalar, IT markazlari va yirik ishlab chiqarish korxonalarida real ishlab chiqarish amaliyoti."
                  : leng === 'ru'
                  ? 'Современные лаборатории, IT-центры и реальная производственная практика на крупных предприятиях.'
                  : 'Modern laboratories, IT facilities, and real industrial internships at top corporations.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
