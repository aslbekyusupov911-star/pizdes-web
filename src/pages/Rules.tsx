import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { universitetichkitartibqonunlari as defaultRules } from '../data/initialData';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export const Rules: React.FC = () => {
  const { leng, t } = useLanguage();
  const [rulesData, setRulesData] = useState<any[]>(defaultRules || []);

  useEffect(() => {
    fetch('https://new.utu-ranch.uz/category/universitetichkitartibqonunlari/')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) setRulesData(json);
      })
      .catch(() => {});
  }, []);

  const item = rulesData[0] || {};
  const content =
    (leng === 'ru' && item.content_ru) ||
    (leng === 'en' && item.content_en) ||
    item.content_uz;

  return (
    <div className="rulesPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={5} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-gray-100 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
                {leng === 'uz' ? 'Rasmiy me’yoriy hujjat' : 'Официальный регламент'}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {t('rules')}
              </h1>
            </div>

            <a
              href="/static/media/xqq.e363c063dd7bc3f70d40.docx"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f56100] text-white rounded-xl text-sm font-bold shadow hover:bg-[#d95200] transition-colors"
            >
              <Download className="w-4 h-4" />
              {leng === 'uz' ? 'Hujjatni yuklab olish (.docx)' : 'Скачать документ (.docx)'}
            </a>
          </div>

          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className="space-y-6">
                <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#f56100]" />
                    I BOB. UMUMIY QOIDALAR
                  </h3>
                  <p className="text-gray-600 text-sm">
                    1. Mazkur Ichki mehnat tartibi qoidalari Urganch Ranch Texnologiya Universiteti barcha xodimlari va professor-o'qituvchilari uchun majburiy hisoblanadi.
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    2. Qoidalarning maqsadi — mehnat intizomini mustahkamlash, ish vaqtidan oqilona foydalanish, mehnat unumdorligini va ta'lim sifatini oshirishdan iborat.
                  </p>
                </section>

                <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#f56100]" />
                    II BOB. ISH VAQTI VA UNING DAVOMIYLIGI
                  </h3>
                  <p className="text-gray-600 text-sm">
                    1. Universitetda 6 kunlik ish haftasi belgilangan.
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    2. Dars mashg'ulotlari tasdiqlangan dars jadvali asosida olib boriladi.
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    3. Xodimlar va professor-o'qituvchilar belgilangan ish rejimiga qat'iy rioya etishlari shart.
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

export default Rules;
