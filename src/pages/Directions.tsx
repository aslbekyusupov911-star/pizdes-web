import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import TabsHeader from '../components/TabsHeader';
import { studyTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import {
  yonalishlar as defaultKunduzgi,
  yonalishlar_sirtqi as defaultSirtqi,
  yonalishlar_magister as defaultMagister
} from '../data/initialData';
import { Search, GraduationCap, Clock, Award, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface DirectionsProps {
  initialType?: 'kunduzgi' | 'sirtqi' | 'magistratura' | 'all';
}

export const Directions: React.FC<DirectionsProps> = ({ initialType = 'all' }) => {
  const { leng, t } = useLanguage();
  const { directions } = useCMS();
  const [activeTab, setActiveTab] = useState(() => {
    if (initialType === 'sirtqi') return 2;
    if (initialType === 'magistratura') return 3;
    return 1;
  });
  const [search, setSearch] = useState('');

  let currentList: any[] = [];
  if (directions && directions.length > 0) {
    if (activeTab === 1) currentList = directions.filter(d => !d.type || d.type === 'kunduzgi');
    else if (activeTab === 2) currentList = directions.filter(d => d.type === 'sirtqi');
    else if (activeTab === 3) currentList = directions.filter(d => d.type === 'magistratura');
    else currentList = directions;
  } else {
    if (activeTab === 1) currentList = defaultKunduzgi;
    else if (activeTab === 2) currentList = defaultSirtqi;
    else if (activeTab === 3) currentList = defaultMagister;
    else currentList = defaultKunduzgi;
  }

  const filtered = currentList.filter((item: any) => {
    const q = search.toLowerCase();
    const name = (item.name_uz || item.title_uz || item.name || '').toLowerCase();
    const code = (item.code || '').toLowerCase();
    return name.includes(q) || code.includes(q);
  });

  const getDurationText = () => {
    if (activeTab === 1) return leng === 'uz' ? '4 yil (Kunduzgi)' : '4 года (Очно)';
    if (activeTab === 2) return leng === 'uz' ? '5 yil (Sirtqi)' : '5 лет (Заочно)';
    return leng === 'uz' ? '2 yil (Magistratura)' : '2 года (Магистратура)';
  };

  return (
    <div className="directionsPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={studyTabs} activeButton={activeTab} setActiveButton={setActiveTab} />

        <div className="mt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {activeTab === 1
                ? t('fullTime')
                : activeTab === 2
                ? t('correspondence')
                : t('master')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {leng === 'uz'
                ? `Jami ${filtered.length} ta ta'lim yo'nalishi mavjud`
                : `Всего ${filtered.length} направлений образования`}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={leng === 'uz' ? "Yo'nalish kodi yoki nomi..." : "Код или название..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Notice for Sirtqi */}
        {activeTab === 2 && (
          <div className="mb-6 p-4 bg-orange-50/70 border border-orange-200 rounded-2xl text-xs md:text-sm text-gray-700 leading-relaxed">
            *60110400 - Boshlang'ich ta'lim va 60111200 - Jismoniy madaniyat yo'nalishining sirtqi ta'lim shakliga hujjat topshirish uchun kamida 5 yillik pedagogik stajga ega bo'lish talab qilinadi.
            **60730900 - Shahar qurilish va loyihalash va 60730100 - Arxitektura yo'nalishlarining sirtqi ta'lim shakliga talabalar imtihon asosida qabul qilinadi.
          </div>
        )}

        {/* Directions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: any, idx: number) => {
            const name =
              (leng === 'ru' && item.name_ru) ||
              (leng === 'en' && item.name_en) ||
              item.name_uz ||
              item.name ||
              item.title_uz;

            const code = item.code || item.kod || `60${idx + 1}0000`;

            return (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={(idx % 3) * 70}
                className="h-full flex"
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-orange-50 text-[#f56100] font-mono font-bold text-xs rounded-lg">
                        {code}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {getDurationText()}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                      {name}
                    </h3>

                    <div className="space-y-1.5 text-xs text-gray-500 mb-6">
                      <p className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#f56100]" />
                        <span>{activeTab === 3 ? "Magistr darajasi" : "Bakalavr darajasi"}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#f56100]" />
                        <span>Kredit-modul tizimi (ECTS)</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href="https://qabul.utu-ranch.uz"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f56100] hover:text-[#d45200] group"
                    >
                      <span>{t('onlineAdmission')}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Directions;
