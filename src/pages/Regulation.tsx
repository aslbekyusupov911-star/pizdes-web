import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, FileText, ZoomIn, Download } from 'lucide-react';

export const Regulation: React.FC = () => {
  const { leng, t } = useLanguage();
  const [activePage, setActivePage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const pages = [
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0001.a89e3c7811848dd4995a.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0002.3de940a810f33df18aba.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0003.bf0eaa28f591b6b311e3.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0004.d0dd54619c235383bfcb.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0005.4107039e2ad7acd9bbe7.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0006.c85909d228bd1aa9cf87.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0007.52a6836b22109b3f12b4.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0008.57b7c7319a15aa4928de.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0009.3d55f46edb1efd4da036.jpg',
    '/static/media/янги Устав UTU_RANCH 15.11.23 (2)_page-0010.cd9775ab3310bf58b039.jpg',
  ];

  return (
    <div className="regulationPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={7} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-gray-100 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
                {leng === 'uz' ? 'Davlat ro‘yxatidan o‘tgan' : 'Государственный устав'}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {t('charter')}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Urganch Ranch Texnologiya Universiteti rasmiy ta’sis nizomi (15.11.2023)
              </p>
            </div>

            <a
              href={pages[activePage - 1]}
              download={`UTU_RANCH_Nizom_Page_${activePage}.jpg`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f56100] text-white rounded-xl text-sm font-bold shadow hover:bg-[#d95200] transition-colors"
            >
              <Download className="w-4 h-4" />
              {leng === 'uz' ? 'Sahifani yuklab olish' : 'Скачать страницу'}
            </a>
          </div>

          {/* Document Viewer */}
          <div className="mt-8 flex flex-col items-center">
            {/* Page navigation controls */}
            <div className="flex items-center gap-4 mb-6 bg-gray-50 px-6 py-2.5 rounded-full border border-gray-200">
              <button
                type="button"
                disabled={activePage === 1}
                onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
                className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-sm font-bold text-gray-800">
                {activePage} / {pages.length} - sahifa
              </span>
              <button
                type="button"
                disabled={activePage === pages.length}
                onClick={() => setActivePage((prev) => Math.min(pages.length, prev + 1))}
                className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="ml-3 pl-3 border-l border-gray-300 text-gray-600 hover:text-[#f56100] flex items-center gap-1 text-xs font-semibold"
              >
                <ZoomIn className="w-4 h-4" /> Kattalashtirish
              </button>
            </div>

            {/* Current Page Image */}
            <div
              className="max-w-3xl w-full bg-gray-100 rounded-2xl shadow-xl overflow-hidden cursor-zoom-in border border-gray-200"
              onClick={() => setModalOpen(true)}
            >
              <img
                src={pages[activePage - 1]}
                alt={`Charter page ${activePage}`}
                className="w-full h-auto object-contain hover:scale-[1.01] transition-transform"
              />
            </div>

            {/* Thumbnails row */}
            <div className="flex gap-2 overflow-x-auto w-full py-4 mt-6 max-w-4xl scrollbar-thin">
              {pages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePage(idx + 1)}
                  className={`flex-shrink-0 w-16 h-22 rounded-lg overflow-hidden border-2 transition-all ${
                    activePage === idx + 1 ? 'border-[#f56100] ring-2 ring-orange-200' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Zoom */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto bg-white rounded-2xl p-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black font-bold"
            >
              ✕
            </button>
            <img
              src={pages[activePage - 1]}
              alt={`Charter page ${activePage}`}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Regulation;
