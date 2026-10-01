import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { axloq_qoidasi as defaultEthics } from '../data/initialData';
import { FileCheck, Download, HeartHandshake, BookOpen } from 'lucide-react';

export const RulesEtika: React.FC = () => {
  const { leng, t } = useLanguage();
  const [ethicsData, setEthicsData] = useState<any[]>(defaultEthics || []);

  useEffect(() => {
    fetch('https://new.utu-ranch.uz/category/axloq-qoidasi/')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) setEthicsData(json);
      })
      .catch(() => {});
  }, []);

  const item = ethicsData[0] || {};
  const content =
    (leng === 'ru' && item.content_ru) ||
    (leng === 'en' && item.content_en) ||
    item.content_uz;

  return (
    <div className="rulesEtikaPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={6} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-gray-100 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
                {leng === 'uz' ? 'Odob-axloq kodeksi' : 'Кодекс этики'}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {t('ethics')}
              </h1>
            </div>

            <a
              href="/static/media/Odob Axloq kodeksi2.402bfd2e9af8a3204de9.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f56100] text-white rounded-xl text-sm font-bold shadow hover:bg-[#d95200] transition-colors"
            >
              <Download className="w-4 h-4" />
              {leng === 'uz' ? 'Kodeksni yuklab olish (.pdf)' : 'Скачать кодекс (.pdf)'}
            </a>
          </div>

          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className="space-y-6">
                <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-[#f56100]" />
                    {leng === 'uz' ? 'Asosiy tamoyillar' : 'Основные принципы'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {leng === 'uz'
                      ? "Universitetda o'zaro hurmat, adolat, halollik, shaffoflik va akademik erkinlik ustuvor qadriyatlar hisoblanadi. Talaba va o'qituvchilar o'rtasida sog'lom ma'naviy muhitni saqlash asosiy vazifadir."
                      : 'В университете взаимное уважение, справедливость, честность и академическая свобода являются ключевыми ценностями.'}
                  </p>
                </section>

                <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#f56100]" />
                    {leng === 'uz' ? 'Akademik halollik' : 'Академическая честность'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {leng === 'uz'
                      ? "Ko'chirmakashlik (plagiat), soxtalashtirish, noqonuniy yordam olish yoki berish qat'iyan taqiqlanadi. Har bir talaba o'z bilimi va mehnati bilan baholanadi."
                      : 'Плагиат, подделка и несанкционированная помощь строго запрещены.'}
                  </p>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RulesEtika;
