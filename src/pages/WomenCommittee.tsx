import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import { Users, Heart, BookOpen, Shield, Download } from 'lucide-react';

export const WomenCommittee: React.FC = () => {
  const { leng } = useLanguage();

  return (
    <div className="xqqPage min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full mb-3">
            Xotin-qizlar kengashi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {leng === 'uz'
              ? 'Xotin-qizlar masalalari bo‘yicha maslahat kengashi'
              : 'Консультативный совет по вопросам женщин'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Universitetda tahsil olayotgan talaba-qizlar hamda faoliyat yuritayotgan ayol xodimlarning huquq va manfaatlarini himoya qilish, ijtimoiy-siyosiy faolligini oshirish va iqtidorlarini qo‘llab-quvvatlash.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-100 gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Kengashning asosiy maqsad va vazifalari
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Kengash nizomi va yillik faoliyat rejasi asosida ish olib boradi
              </p>
            </div>

            <a
              href="/static/media/xqq.e363c063dd7bc3f70d40.docx"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f56100] text-white rounded-xl text-xs font-bold shadow hover:bg-[#d95200] transition-colors"
            >
              <Download className="w-4 h-4" />
              Nizomni yuklab olish (.docx)
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-3">
              <Users className="w-8 h-8 text-purple-600" />
              <h4 className="font-bold text-gray-900 text-base">Ijtimoiy himoya</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ijtimoiy himoyaga muhtoj talaba-qizlarni moddiy va ma'naviy qo'llab-quvvatlash, stipendiyalar va imtiyozlar ajratish.
              </p>
            </div>

            <div className="p-6 bg-pink-50/60 rounded-2xl border border-pink-100 space-y-3">
              <BookOpen className="w-8 h-8 text-pink-600" />
              <h4 className="font-bold text-gray-900 text-base">Ilmiy izlanishlar</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Yosh olima ayollar, magistrant va iqtidorli talaba-qizlarning ilmiy tadqiqotlari va startap loyihalarini rag'batlantirish.
              </p>
            </div>

            <div className="p-6 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold text-gray-900 text-base">Huquqiy ko'mak</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Har qanday tazyiq va zo'ravonlikdan himoya qilish, bepul yuridik va psixologik maslahatlar taqdim etish.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WomenCommittee;
