import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import { Home as HomeIcon, CheckCircle2, Wifi, Coffee, BookOpen, Shield, Users } from 'lucide-react';

export const Dormitory: React.FC = () => {
  const { leng } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const dormPhotos = [
    { src: '/static/media/yt1.ef86abae717d76a7b495.png', title: 'Yotoqxona yashash xonalari' },
    { src: '/static/media/yt2.cb1db1eb9b9889711fc0.png', title: 'Dars tayyorlash zali (Kutubxona)' },
    { src: '/static/media/yt3.303fc8f9c7896dd50a10.png', title: 'Dam olish va sport maydonchasi' },
    { src: '/static/media/yt4.1e0298550311a7d50813.png', title: 'Zamonaviy oshxona va kofe zona' },
    { src: '/static/media/yt5.00dd9888198bacf9be38.png', title: 'Yuvinish va kir yuvish majmuasi' }
  ];

  return (
    <div className="dormitoryPage min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
            Talabalar xizmati
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {leng === 'uz' ? 'Talabalar turar joyi (TTJ)' : 'Студенческое общежитие'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Urganch Ranch texnologiya universitetining yangi talabalar turar joyi 2025 yil mart oyida qurilib foydalanishga topshirilgan bo‘lib, Urganch shahar Xonqa ko‘chasi 26A-uy manzilida joylashgan. Yangi TTJ talabalarning ehtiyojini 100 foizga qondiradi.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f56100] flex items-center justify-center flex-shrink-0">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base mb-1">Yuqori tezlikdagi Wi-Fi</h4>
              <p className="text-xs text-gray-500">Barcha xonalar va umumiy dars xonalarida bepul optik internet tarmog'i.</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f56100] flex items-center justify-center flex-shrink-0">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base mb-1">Zamonaviy oshxona</h4>
              <p className="text-xs text-gray-500">Muzlatgich, mikroto'lqinli pech va zarur oshxona texnikalari bilan jihozlangan.</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f56100] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base mb-1">24/7 Xavfsizlik</h4>
              <p className="text-xs text-gray-500">Videokuzatuv tizimi va kecha-yu kunduz qo'riqlash xizmati ta'minlangan.</p>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Talabalar turar joyi galereyasi
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dormPhotos.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group relative aspect-video"
                onClick={() => setSelectedImg(item.src)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[11px] text-white font-medium line-clamp-1">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TTJ Application banner */}
        <div className="bg-gradient-to-r from-orange-600 to-[#f56100] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
              Yotoqxonaga ariza topshirmoqchimisiz?
            </h3>
            <p className="text-orange-100 text-sm max-w-xl">
              Universitet talabalari HEMIS axborot tizimi orqali onlayn ariza berib, o‘z joylarini band qilishlari mumkin.
            </p>
          </div>
          <a
            href="https://student.utu-ranch.uz/dashboard/login"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-white text-[#f56100] font-bold rounded-2xl shadow hover:bg-orange-50 transition-colors flex-shrink-0 text-sm"
          >
            HEMIS orqali ariza topshirish
          </a>
        </div>
      </div>

      {/* Modal Zoom */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white p-2">
            <button
              type="button"
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black font-bold"
            >
              ✕
            </button>
            <img src={selectedImg} alt="Dormitory Zoom" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dormitory;
