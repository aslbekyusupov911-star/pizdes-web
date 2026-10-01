import React, { useState } from 'react';
import { useCMS, SiteMediaConfig } from '../../context/CMSContext';
import {
  Image as ImageIcon,
  Upload,
  Video,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { media, updateMediaField, addStudentPhoto, removeStudentPhoto } = useCMS();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleFileUpload = (
    field: keyof SiteMediaConfig,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateMediaField(field, reader.result as string);
        triggerSuccess('Rasm muvaffaqiyatli yangilandi!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudentPhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addStudentPhoto(reader.result as string);
        triggerSuccess("Talaba rasmi galereyaga qo'shildi!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudentPhotoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) return;
    addStudentPhoto(newPhotoUrl);
    setNewPhotoUrl('');
    triggerSuccess("Talaba rasmi galereyaga qo'shildi!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Rasmlar va Media Boshqaruvi</h2>
          <p className="text-xs text-gray-500 mt-1">
            Saytdagi har bir rasm, bino surati, video va talabalar galereyasini o'zgartiring
          </p>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-200 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* 1. Main Hero Media */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-gray-900">Bosh Sahifa (Hero) Rasmlari</h3>
          <p className="text-xs text-gray-500">
            Universitet binosining kunduzgi/tungi surati va mutafakkir olim portreti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daytime Building */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-700 block mb-2">
                1. Bino (Kunduzgi ko'rinish)
              </span>
              <div className="w-full h-40 bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center p-2 mb-3">
                <img
                  src={media.heroBuildingDay}
                  alt="Daytime"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={media.heroBuildingDay}
                onChange={(e) => updateMediaField('heroBuildingDay', e.target.value)}
                className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Rasm URL havolasi..."
              />
              <label className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Yangi rasm yuklash</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('heroBuildingDay', e)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Nighttime Building */}
          <div className="p-4 bg-gray-900 text-white rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-200 block mb-2">
                2. Bino (Tungi yoritilgan ko'rinish)
              </span>
              <div className="w-full h-40 bg-gray-950 rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center p-2 mb-3">
                <img
                  src={media.heroBuildingNight}
                  alt="Nighttime"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={media.heroBuildingNight}
                onChange={(e) => updateMediaField('heroBuildingNight', e.target.value)}
                className="w-full text-xs p-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none"
                placeholder="Rasm URL havolasi..."
              />
              <label className="w-full py-2 bg-[#f56100] hover:bg-[#e05600] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Yangi rasm yuklash</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('heroBuildingNight', e)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Scholar Portrait */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-700 block mb-2">
                3. Bino yonidagi olim portreti
              </span>
              <div className="w-full h-40 bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center p-2 mb-3">
                <img
                  src={media.heroScholarPortrait}
                  alt="Scholar"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={media.heroScholarPortrait}
                onChange={(e) => updateMediaField('heroScholarPortrait', e.target.value)}
                className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Rasm URL havolasi..."
              />
              <label className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Yangi rasm yuklash</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('heroScholarPortrait', e)}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 2. YouTube Video & Admission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Embed */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Video className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-base font-bold text-gray-900">Universitet Video Havolasi (YouTube)</h3>
              <p className="text-xs text-gray-500">"Rejalar - 2030" bo'limida o'ynaladigan video</p>
            </div>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
            <iframe
              src={media.youtubeVideoUrl}
              title="Preview"
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              YouTube Embed URL havolasi
            </label>
            <input
              type="text"
              value={media.youtubeVideoUrl}
              onChange={(e) => {
                updateMediaField('youtubeVideoUrl', e.target.value);
                triggerSuccess('Video havolasi yangilandi!');
              }}
              placeholder="https://www.youtube.com/embed/..."
              className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Format: https://www.youtube.com/embed/VIDEO_ID
            </span>
          </div>
        </div>

        {/* Admission Banner Image */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Sparkles className="w-5 h-5 text-[#f56100]" />
            <div>
              <h3 className="text-base font-bold text-gray-900">Onlayn Hujjat Topshirish Rasmi</h3>
              <p className="text-xs text-gray-500">Qabul banneridagi talaba illyustratsiyasi</p>
            </div>
          </div>

          <div className="w-full h-52 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-center p-4">
            <img
              src={media.admissionBannerImg}
              alt="Admission"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={media.admissionBannerImg}
              onChange={(e) => updateMediaField('admissionBannerImg', e.target.value)}
              className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Rasm URL havolasi..."
            />
            <label className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Yangi rasm yuklash</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('admissionBannerImg', e)}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 3. Student Life Gallery Photos */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Talabalar Hayoti Galereyasi ({media.studentPhotos.length} ta rasm)
            </h3>
            <p className="text-xs text-gray-500">
              Bosh sahifadagi karuseldagi talabalarning haqiqiy foto lavhalari
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="px-4 py-2 bg-[#f56100] hover:bg-[#e05600] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-orange-500/20">
              <Plus className="w-4 h-4" />
              <span>Kompyuterdan yangi rasm qo'shish</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAddStudentPhotoFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.studentPhotos.map((photoUrl, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-200 shadow-xs"
            >
              <img
                src={photoUrl}
                alt={`Student ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Bu rasmni galereyadan o'chirmoqchimisiz?")) {
                      removeStudentPhoto(idx);
                      triggerSuccess("Rasm o'chirildi!");
                    }
                  }}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg transition-transform active:scale-95"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMedia;
