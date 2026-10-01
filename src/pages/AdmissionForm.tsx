import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import { yonalishlar as defaultCourses } from '../data/initialData';
import { Send, CheckCircle2, User, Phone, Mail, Calendar, FileText } from 'lucide-react';

export const AdmissionForm: React.FC = () => {
  const { leng, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    passportSeries: '',
    passportNumber: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: 'Erkak',
    region: 'Xorazm viloyati',
    studyType: 'kunduzgi',
    direction: defaultCourses[0]?.name_uz || 'Iqtisodiyot',
  });

  const regions = [
    "Xorazm viloyati",
    "Toshkent shahri",
    "Toshkent viloyati",
    "Samarqand viloyati",
    "Buxoro viloyati",
    "Navoiy viloyati",
    "Qashqadaryo viloyati",
    "Surxondaryo viloyati",
    "Farg'ona viloyati",
    "Andijon viloyati",
    "Namangan viloyati",
    "Jizzax viloyati",
    "Sirdaryo viloyati",
    "Qoraqalpog'iston Respublikasi"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="admissionFormPage min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
            Qabul 2024 / 2025
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            {t('onlineAdmissionTitle')}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            {t('onlineAdmissionPrompt')}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-10 md:p-16 border border-gray-100 shadow-xl text-center space-y-4 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Arizangiz muvaffaqiyatli qabul qilindi!
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Hurmatli {form.firstName} {form.lastName}, sizning arizangiz Urganch Ranch Texnologiya Universiteti qabul komissiyasiga topshirildi. Qabul komissiyasi mutaxassislari tez orada siz bilan bog‘lanadi.
            </p>
            <div className="p-4 bg-orange-50 rounded-2xl text-xs text-[#f56100] font-bold">
              Ariza raqami: #UTU-2024-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              Yangi ariza topshirish
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl space-y-8"
          >
            {/* Full Name */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-[#f56100]" />
                1. Familiya, Ism, Sharifingiz
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Familiya *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Yusupov"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Ism *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Aslbek"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Otasining ismi</label>
                  <input
                    type="text"
                    placeholder="Masalan: Farhod o'g'li"
                    value={form.middleName}
                    onChange={(e) => setForm({ ...form, middleName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                  />
                </div>
              </div>
            </div>

            {/* Passport & Contacts */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f56100]" />
                2. Pasport va aloqa ma'lumotlari
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Pasport seriya *</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    placeholder="AA"
                    value={form.passportSeries}
                    onChange={(e) => setForm({ ...form, passportSeries: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100] uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Pasport raqam *</label>
                  <input
                    type="text"
                    required
                    maxLength={7}
                    placeholder="1234567"
                    value={form.passportNumber}
                    onChange={(e) => setForm({ ...form, passportNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Telefon raqam *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Elektron pochta</label>
                  <input
                    type="email"
                    placeholder="nomzod@mail.uz"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                  />
                </div>
              </div>
            </div>

            {/* Region, Gender, Date */}
            <div className="pt-6 border-t border-gray-100 grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tug'ilgan sana *</label>
                <input
                  type="date"
                  required
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Jinsi *</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                >
                  <option value="Erkak">Erkak</option>
                  <option value="Ayol">Ayol</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Doimiy yashash viloyati *</label>
                <select
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                >
                  {regions.map((reg, idx) => (
                    <option key={idx} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Study Program */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#f56100]" />
                3. Ta'lim shakli va yo'nalishi
              </h3>

              <div className="flex gap-4 mb-4">
                {['kunduzgi', 'sirtqi', 'magistratura'].map((st) => (
                  <label
                    key={st}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs font-bold transition-all ${
                      form.studyType === st
                        ? 'border-[#f56100] bg-orange-50 text-[#f56100]'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="studyType"
                      value={st}
                      checked={form.studyType === st}
                      onChange={(e) => setForm({ ...form, studyType: e.target.value })}
                      className="hidden"
                    />
                    <span className="capitalize">{st} ta'lim</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Tanlangan ta'lim yo'nalishi *</label>
                <select
                  value={form.direction}
                  onChange={(e) => setForm({ ...form, direction: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                >
                  {defaultCourses.map((c: any, i: number) => (
                    <option key={i} value={c.name_uz || c.name}>
                      {c.code ? `${c.code} — ` : ''}{c.name_uz || c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#f56100] text-white rounded-2xl font-bold shadow-lg hover:bg-[#d95200] transition-colors flex items-center justify-center gap-2 text-base"
            >
              <Send className="w-5 h-5" />
              Arizani rasmiylashtirish va yuborish
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdmissionForm;
