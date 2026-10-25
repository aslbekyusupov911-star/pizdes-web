import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import { yonalishlar as defaultCourses } from '../data/initialData';
import { Send, CheckCircle2, User, Phone, Mail, Calendar, FileText, Search, Loader2, AlertCircle, Copy, Check } from 'lucide-react';
import { admissionsApi, AdmissionItem } from '../services/admissionsApi';

export const AdmissionForm: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<AdmissionItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Track status state
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedItem, setTrackedItem] = useState<AdmissionItem | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    passportSeries: '',
    passportNumber: '',
    phone: '+998 ',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await admissionsApi.submit({
        first_name: form.firstName,
        last_name: form.lastName,
        middle_name: form.middleName,
        passport_series: form.passportSeries.toUpperCase(),
        passport_number: form.passportNumber,
        phone: form.phone,
        email: form.email || undefined,
        birth_date: form.birthDate || undefined,
        gender: form.gender,
        region: form.region,
        study_type: form.studyType,
        direction: form.direction,
      });

      setSubmittedData(res);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Arizani yuborishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    setTrackingLoading(true);
    setTrackError(null);
    setTrackedItem(null);

    try {
      const res = await admissionsApi.track(trackingCode.trim());
      setTrackedItem(res);
    } catch (err: any) {
      setTrackError("Ushbu raqam bilan ariza topilmadi. Raqamni to'g'ri kiritganingizni tekshiring (masalan: UTU-2026-0001).");
    } finally {
      setTrackingLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'qabul_qilindi':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs">Qabul qilindi ✅</span>;
      case 'korilmoqda':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-bold text-xs">Ko'rib chiqilmoqda ⏳</span>;
      case 'rad_etildi':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold text-xs">Rad etildi ❌</span>;
      default:
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-xs">Yangi topshirilgan 📝</span>;
    }
  };

  return (
    <div className="admissionFormPage min-h-screen bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3 border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-[#f56100] animate-pulse"></span>
            Qabul 2026 / 2027
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {t('onlineAdmissionTitle') || "Onlayn Hujjat Topshirish"}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            {t('onlineAdmissionPrompt') || "Urganch Ranch Texnologiya Universiteti talabasi bo'lish uchun arizangizni to'ldiring"}
          </p>

          {/* Navigation tabs */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'apply'
                  ? 'bg-[#f56100] text-white shadow-lg shadow-orange-500/25'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Ariza topshirish
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'track'
                  ? 'bg-[#f56100] text-white shadow-lg shadow-orange-500/25'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Ariza holatini tekshirish
            </button>
          </div>
        </div>

        {/* Tab 1: Track Application */}
        {activeTab === 'track' && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Arizangiz holatini tekshiring</h2>
              <p className="text-xs text-gray-500">Ariza topshirganingizda berilgan ro'yxatga olish raqamini kiriting</p>
            </div>

            <form onSubmit={handleTrack} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masalan: UTU-2026-0001"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono uppercase tracking-wider outline-none focus:border-[#f56100]"
                />
                <button
                  type="submit"
                  disabled={trackingLoading}
                  className="px-6 py-3 bg-[#f56100] text-white rounded-xl text-xs font-bold hover:bg-[#d95200] transition-colors flex items-center gap-2"
                >
                  {trackingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Tekshirish
                </button>
              </div>
            </form>

            {trackError && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs flex items-center gap-2 border border-red-100">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{trackError}</span>
              </div>
            )}

            {trackedItem && (
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-gray-500">Ariza raqami:</span>
                  <span className="font-mono font-bold text-gray-900">{trackedItem.application_number}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-gray-500">Abituriyent:</span>
                  <span className="font-semibold text-gray-900">{trackedItem.first_name} {trackedItem.last_name}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-gray-500">Yo'nalish:</span>
                  <span className="font-semibold text-gray-900 text-right">{trackedItem.direction}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-gray-500">Ta'lim shakli:</span>
                  <span className="font-semibold capitalize text-gray-900">{trackedItem.study_type}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs text-gray-500">Ariza holati:</span>
                  {getStatusBadge(trackedItem.status)}
                </div>
                {trackedItem.admin_notes && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900">
                    <span className="font-bold block mb-1">Qabul komissiyasi izohi:</span>
                    {trackedItem.admin_notes}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Apply Form */}
        {activeTab === 'apply' && (
          <>
            {submittedData ? (
              <div className="bg-white rounded-3xl p-8 md:p-14 border border-gray-100 shadow-xl text-center space-y-4 max-w-xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">
                  Arizangiz muvaffaqiyatli qabul qilindi!
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hurmatli <span className="font-bold text-gray-900">{submittedData.first_name} {submittedData.last_name}</span>,
                  sizning arizangiz Urganch Ranch Texnologiya Universiteti ma'lumotlar bazasiga kiritildi.
                </p>

                <div className="p-5 bg-orange-50/80 rounded-2xl border border-orange-200 text-left space-y-2">
                  <div className="text-xs text-gray-500 font-medium">Sizning unikal ariza raqamingiz:</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-black text-[#f56100]">
                      {submittedData.application_number}
                    </span>
                    <button
                      onClick={() => copyToClipboard(submittedData.application_number)}
                      className="px-3 py-1.5 bg-white border border-orange-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-100/50 transition-colors flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Nusxalandi" : "Nusxalash"}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500 pt-1">
                    Ushbu raqam orqali arizangiz holatini saytda kuzatib borishingiz mumkin.
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedData(null);
                      setForm({
                        ...form,
                        lastName: '',
                        firstName: '',
                        middleName: '',
                        passportNumber: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
                  >
                    Yangi ariza topshirish
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl space-y-8"
              >
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Section 1: Full Name */}
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
                        placeholder="Masalan: Otabek o'g'li"
                        value={form.middleName}
                        onChange={(e) => setForm({ ...form, middleName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Passport and Contact */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#f56100]" />
                    2. Pasport va aloqa ma'lumotlari
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Pasport seriya *</label>
                      <input
                        type="text"
                        required
                        maxLength={2}
                        placeholder="AA"
                        value={form.passportSeries}
                        onChange={(e) => setForm({ ...form, passportSeries: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono uppercase outline-none focus:border-[#f56100]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Pasport raqami *</label>
                      <input
                        type="text"
                        required
                        maxLength={7}
                        placeholder="1234567"
                        value={form.passportNumber}
                        onChange={(e) => setForm({ ...form, passportNumber: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono outline-none focus:border-[#f56100]"
                      />
                    </div>
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                      <label className="block text-xs text-gray-500 mb-1">Elektron pochta (Email)</label>
                      <input
                        type="email"
                        placeholder="nomi@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
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
                </div>

                {/* Section 3: Study Program */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#f56100]" />
                    3. Ta'lim shakli va yo'nalishi
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {['kunduzgi', 'sirtqi', 'magistratura'].map((st) => (
                      <label
                        key={st}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border cursor-pointer text-xs font-bold transition-all ${
                          form.studyType === st
                            ? 'border-[#f56100] bg-orange-50 text-[#f56100] shadow-sm'
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
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

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#f56100] text-white rounded-2xl font-bold shadow-xl shadow-orange-500/25 hover:bg-[#d95200] transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Ariza yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Arizani rasmiylashtirish va yuborish
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdmissionForm;
