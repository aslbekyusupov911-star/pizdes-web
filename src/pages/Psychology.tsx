import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import { Heart, Send, Phone, Mail, User, ShieldCheck } from 'lucide-react';

export const Psychology: React.FC = () => {
  const { leng } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const gallery = [
    '/static/media/psixolog.e3d4d6908e9fd3e303de.jpg',
    '/static/media/ps2.d864002de727163280a3.jpg',
    '/static/media/ps3.1322b14e91b53300f91a.jpg',
    '/static/media/ps4.edad4bee03746a486fd0.jpg',
    '/static/media/ps5.e1d48229c5c40fee8e33.jpg'
  ];

  return (
    <div className="ypkPage min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full mb-3">
            Ijtimoiy-psixologik xizmat
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {leng === 'uz' ? 'Yoshlar psixologik markazi' : 'Психологический центр молодежи'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Talabalar va ishchi xodimlarning ruhiy salomatligini mustahkamlash, shaxsiy va kasbiy rivojlanishiga ko'maklashish hamda qiyin vaziyatlarda maxfiy professional yordam ko'rsatish markazi.
          </p>
        </div>

        {/* Telegram Bot Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Send className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                Psixologik yordam boti (Anonim)
              </h3>
              <p className="text-blue-100 text-xs md:text-sm">
                Talabalar va ishchi xodimlar uchun to'liq anonim murojaat qilish imkoniyati yaratilgan.
              </p>
            </div>
          </div>
          <a
            href="https://t.me/ranch_psixologik_yordam_bot"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl text-sm shadow hover:bg-blue-50 transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <span>@ranch_psixologik_yordam_bot</span>
          </a>
        </div>

        {/* Psychologist Profile */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-56 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
            <img
              src="/static/media/psixolog.e3d4d6908e9fd3e303de.jpg"
              alt="Munira Niyazmetova"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <span className="text-xs font-bold text-[#f56100] uppercase tracking-wider">
              Mas'ul mutaxassis
            </span>
            <h3 className="text-2xl font-extrabold text-gray-900">
              Niyazmetova Munira Ibragimovna
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Urganch Ranch Texnologiya Universiteti bosh psixologi
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Talabalarning moslashuv jarayonlari, stress va xavotirni bartaraf etish, o'zaro muloqot va shaxsiy o'sish bo'yicha yakka tartibda hamda guruhli psixologik treninglar olib boradi.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                100% Maxfiylik kafolati
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" />
                (62) 227 77 72
              </span>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Psixologik treninglar va seminarlar galereyasi
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer aspect-square"
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img}
                  alt={`Trening ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <img src={selectedImg} alt="Trening Zoom" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Psychology;
