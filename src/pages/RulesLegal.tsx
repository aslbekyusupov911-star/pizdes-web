import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { ExternalLink, Scale, FileText } from 'lucide-react';

export const RulesLegal: React.FC = () => {
  const { leng, t } = useLanguage();

  const legalDocs = [
    {
      id: 1,
      title: "O‘zbekiston Respublikasining «Ta’lim to‘g‘risida»gi Qonuni",
      docNo: "O‘RQ-637-son",
      date: "23.09.2020",
      link: "https://lex.uz/docs/-5013007",
      desc: "Ta'lim sohasidagi munosabatlarni tartibga soluvchi asosiy davlat qonuni."
    },
    {
      id: 2,
      title: "Oliy ta’lim muassasalariga o‘qishga qabul qilish, talabalar o‘qishini ko‘chirish, qayta tiklash va o‘qishdan chetlashtirish tartibi to‘g‘risidagi nizom",
      docNo: "VMQ-393-son",
      date: "20.06.2017",
      link: "https://lex.uz/docs/-5193564",
      desc: "Qabul va o'qish jarayonini tashkil etish reglamenti."
    },
    {
      id: 3,
      title: "Oliy ta’lim muassasalarida talabalar bilimini nazorat qilish va baholash tizimi to‘g‘risidagi nizom",
      docNo: "Ro‘yxat raqami 3069",
      date: "26.09.2018",
      link: "https://lex.uz/docs/3916793",
      desc: "Talabalar bilimini oraliq va yakuniy nazorat qilish tartibi."
    },
    {
      id: 4,
      title: "Oliy ta’lim muassasalarida ta’lim jarayonini kredit-modul tizimida tashkil etish tartibi to‘g‘risidagi nizom",
      docNo: "VMQ-824-son",
      date: "31.12.2020",
      link: "https://lex.uz/docs/5443081",
      desc: "ECTS kredit-modul ta'lim tizimini joriy etish qoidalari."
    },
    {
      id: 5,
      title: "Oliy ta’lim tashkilotlarida ta’lim sifatini oshirish va ularning xalqaro reytinglarga kirishini ta’minlash chora-tadbirlari",
      docNo: "PQ-60-son",
      date: "24.12.2021",
      link: "https://lex.uz/docs/5705038",
      desc: "Xalqaro akkreditatsiya va ta'lim sifati talablari."
    },
    {
      id: 6,
      title: "Magistratura to‘g‘risidagi nizomni tasdiqlash haqida",
      docNo: "VMQ-36-son",
      date: "02.03.2015",
      link: "https://lex.uz/docs/3244181",
      desc: "Ikkinchi bosqich oliy ta'lim — magistratura bosqichi qoidalari."
    },
    {
      id: 7,
      title: "Nodavlat ta’lim xizmatlarini ko‘rsatish sohasidagi faoliyatni litsenziyalash tartibi to‘g‘risidagi nizom",
      docNo: "VMQ-241-son",
      date: "27.03.2018",
      link: "https://lex.uz/docs/4545884",
      desc: "Nodavlat oliy ta'lim muassasalari litsenziyalash talablari."
    },
    {
      id: 8,
      title: "Oliy ta’lim muassasasi professor-o‘qituvchilar tarkibining o‘quv, ilmiy-uslubiy va ma’naviy ishlar yuklamasini belgilash tartibi",
      docNo: "Ro‘yxat raqami 2704",
      date: "28.08.2015",
      link: "https://lex.uz/docs/-2579469",
      desc: "Professor-o'qituvchilar yillik ish yuklamasi me'yorlari."
    }
  ];

  return (
    <div className="rulesLegalPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={9} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mt-8">
          <div className="border-b border-gray-100 pb-8 mb-8">
            <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
              Lex.uz qonunchilik bazasi
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {leng === 'uz'
                ? "Ta’lim to‘g‘risidagi normativ-huquqiy hujjatlar"
                : leng === 'ru'
                ? "Нормативно-правовые документы об образовании"
                : "Educational Regulatory Documents"}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Urganch Ranch Texnologiya Universiteti faoliyati O‘zbekiston Respublikasi Konstitutsiyasi va quyidagi qonunchilik hujjatlariga asoslanadi:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {legalDocs.map((doc) => (
              <a
                key={doc.id}
                href={doc.link}
                target="_blank"
                rel="noreferrer"
                className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#f56100] hover:bg-orange-50/20 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-2">
                    <span className="flex items-center gap-1 text-[#f56100]">
                      <Scale className="w-3.5 h-3.5" />
                      {doc.docNo}
                    </span>
                    <span>{doc.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#f56100] transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {doc.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-gray-600 group-hover:text-[#f56100]">
                  <span>Lex.uz portalida o‘qish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RulesLegal;
