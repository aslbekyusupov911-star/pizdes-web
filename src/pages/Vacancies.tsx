import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle2, Send, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { contactApi } from '../services/api';

export const Vacancies: React.FC = () => {
  const { leng, t } = useLanguage();
  const { vacancies: cmsVacancies } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<number | null>(1);

  // Resume form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resumeSubmitting, setResumeSubmitting] = useState(false);
  const [resumeSuccess, setResumeSuccess] = useState(false);

  const fallbackVacancies = [
    {
      id: 1,
      title_uz: "Ingliz tili fani o‘qituvchisi (Professor / Dotsent)",
      category: "Pedagogik",
      department: "Jahon tillari kafedrasi",
      salary: "Kelishilgan holda (Yuqori daraja)",
      type: "To'liq stavka",
      deadline: "2025-01-30",
      requirements: [
        "Filologiya yoki chet tillari bo'yicha oliy ma'lumot (magistr yoki ilmiy daraja)",
        "Kamida IELTS 7.5 yoki CEFR C1 darajasidagi sertifikat",
        "OTMda kamida 3 yillik pedagogik ish staji",
        "Zamonaviy interfaol o'qitish metodikalarini bilish"
      ]
    },
    {
      id: 2,
      title_uz: "Sun'iy intellekt va dasturlash o‘qituvchisi",
      category: "Pedagogik",
      department: "Kompyuter injiniringi kafedrasi",
      salary: "8 000 000 - 15 000 000 so'm",
      type: "To'liq stavka",
      deadline: "2025-02-15",
      requirements: [
        "IT, axborot texnologiyalari yoki amaliy matematika bo'yicha magistr/PhD",
        "Python, PyTorch/TensorFlow, C++ yoki zamonaviy texnologiyalarda amaliy tajriba",
        "Xalqaro ilmiy jurnallarda maqolalar mavjudligi rag'batlantiriladi"
      ]
    },
    {
      id: 3,
      title_uz: "Iqtisodiyot va Moliya kafedrasi dotsenti",
      category: "Pedagogik",
      department: "Iqtisodiyot kafedrasi",
      salary: "Kelishilgan holda",
      type: "To'liq stavka",
      deadline: "2025-01-25",
      requirements: [
        "Iqtisod fanlari bo'yicha falsafa doktori (PhD) yoki fan doktori (DSc)",
        "Kredit-modul tizimida dars o'tish tajribasi",
        "Xorijiy ilmiy anjumanlarda ishtirok etganlik"
      ]
    },
    {
      id: 4,
      title_uz: "Xalqaro aloqalar bo‘yicha yetakchi mutaxassis",
      category: "Ma'muriy",
      department: "Xalqaro hamkorlik bo'limi",
      salary: "6 000 000 - 10 000 000 so'm",
      type: "To'liq stavka",
      deadline: "2025-02-01",
      requirements: [
        "Oliy ma'lumot (Xalqaro munosabatlar, Ingliz tili yoki Menejment)",
        "Ingliz tilida erkin so'zlasha olish va rasmiy xat yozish qobiliyati (IELTS 7.0+)",
        "Xorijiy OTMlar bilan shartnomalar va almashinuv dasturlari tuzish ko'nikmasi"
      ]
    }
  ];

  const vacancies = (cmsVacancies && cmsVacancies.length > 0) ? cmsVacancies : fallbackVacancies;

  const categories = ['Barchasi', 'Pedagogik', "Ma'muriy"];

  const filtered = selectedCategory === 'Barchasi'
    ? vacancies
    : vacancies.filter((v) => v.category === selectedCategory);

  return (
    <div className="vacanciesPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={10} />

        <div className="mt-10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {t('vacancies')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Urganch Ranch Texnologiya Universiteti jamoasiga qo‘shiling
            </p>
          </div>

          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#f56100] text-white shadow-md scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#f56100]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 bg-white rounded-3xl border transition-all cursor-pointer ${
                    expandedId === item.id
                      ? 'border-[#f56100] shadow-md ring-2 ring-orange-100'
                      : 'border-gray-100 shadow-sm hover:border-gray-300'
                  }`}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-lg">
                      {item.department}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Muddat: {item.deadline}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title_uz}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        expandedId === item.id ? 'rotate-180 text-[#f56100]' : ''
                      }`}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#f56100]" /> {item.type}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-gray-700">
                      <DollarSign className="w-3.5 h-3.5 text-green-600" /> {item.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> Urganch shahri
                    </span>
                  </div>

                  {expandedId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-gray-100"
                    >
                      <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider mb-2">
                        Nomzodga qo'yiladigan talablar:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1.5">
                        {(Array.isArray(item.requirements)
                          ? item.requirements
                          : typeof item.requirements === 'string'
                          ? item.requirements.split(';')
                          : []
                        ).map((req: string, rIdx: number) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#f56100] flex-shrink-0 mt-0.5" />
                            <span>{req.trim()}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVacancy(item);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className="px-4 py-2 bg-[#f56100] text-white rounded-xl text-xs font-bold hover:bg-[#d95200] transition-colors"
                        >
                          Ushbu vakansiyaga ariza berish
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Application Sidebar */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-fit space-y-6 sticky top-24">
            <h3 className="font-bold text-gray-900 text-lg">
              {leng === 'uz' ? 'Rezyume topshirish' : 'Подать резюме'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              O'zingizga ma'qul kelgan bo'sh ish o'rniga nomzodlik uchun ma'lumotlaringizni to'ldiring.
            </p>

            {resumeSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-gray-900">Rezyumeingiz qabul qilindi!</h4>
                <p className="text-xs text-gray-600">
                  Kadrlar bo'limi tez orada siz bilan bog'lanadi.
                </p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setResumeSubmitting(true);
                  try {
                    await contactApi.send({
                      name: applicantName,
                      phone: applicantPhone,
                      email: applicantEmail,
                      vacancy_title: selectedVacancy?.title_uz || 'Umumiy nomzodlik',
                      message: 'Vakansiya bo\'yicha rezyume yuborildi',
                    });
                    setResumeSuccess(true);
                    setApplicantName('');
                    setApplicantPhone('');
                    setApplicantEmail('');
                    setTimeout(() => setResumeSuccess(false), 5000);
                  } catch (err: any) {
                    alert("Rezyumeni yuborishda xatolik yuz berdi: " + (err.message || ''));
                  } finally {
                    setResumeSubmitting(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">To'liq ism-familiyangiz *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Aliyev Vali G'aniyevich"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#f56100]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Telefon raqamingiz *</label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#f56100]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Elektron pochta</label>
                  <input
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="nomzod@gmail.com"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#f56100]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Qiziqtirgan vakansiya</label>
                  <select
                    value={selectedVacancy?.title_uz || ''}
                    onChange={(e) => {
                      const found = vacancies.find((v) => v.title_uz === e.target.value);
                      if (found) setSelectedVacancy(found);
                    }}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#f56100]"
                  >
                    <option value="">Vakansiyani tanlang...</option>
                    {vacancies.map((v) => (
                      <option key={v.id} value={v.title_uz}>{v.title_uz}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={resumeSubmitting}
                  className="w-full py-3 bg-[#f56100] text-white rounded-xl text-xs font-bold hover:bg-[#d95200] transition-colors shadow flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-70 cursor-pointer"
                >
                  {resumeSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Ariza yuborish
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Vacancies;
