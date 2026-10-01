import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { Download, ZoomIn, Network } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export const Structure: React.FC = () => {
  const { leng, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const structImg = "/static/media/Struktura-1.0033cea3a75c4dc358cb.png";

  return (
    <div className="structurePage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={8} />

        <ScrollReveal animation="fade-up" duration={700}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-gray-100 gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
                  {leng === 'uz' ? 'Tashkiliy boshqaruv' : 'Организационная структура'}
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {t('structure')}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Urganch Ranch Texnologiya Universiteti boshqaruv va fakultetlar tuzilmasi
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-sm font-bold transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                  Kattalashtirish
                </button>
                <a
                  href={structImg}
                  download="UTU_RANCH_Tashkiliy_Tuzilmasi.png"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f56100] text-white rounded-xl text-sm font-bold shadow hover:bg-[#d95200] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {leng === 'uz' ? 'Yuklab olish' : 'Скачать'}
                </a>
              </div>
            </div>

            <ScrollReveal animation="zoom-in" delay={200} duration={800}>
              <div className="mt-8 flex justify-center">
                <div
                  className="max-w-5xl w-full bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm cursor-zoom-in overflow-hidden"
                  onClick={() => setModalOpen(true)}
                >
                  <img
                    src={structImg}
                    alt="Universitet tashkiliy tuzilmasi"
                    className="w-full h-auto object-contain hover:scale-[1.01] transition-transform"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[92vh] overflow-auto bg-white rounded-2xl p-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black font-bold"
            >
              ✕
            </button>
            <img
              src={structImg}
              alt="Universitet tashkiliy tuzilmasi"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Structure;
