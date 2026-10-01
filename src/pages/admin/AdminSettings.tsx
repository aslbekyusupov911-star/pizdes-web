import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Key,
  Database,
  FileCode,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { exportAllData, importAllData, resetAllToDefault } = useCMS();
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [importJsonText, setImportJsonText] = useState('');

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utu_ranch_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus("Barcha sayt ma'lumotlari zaxira fayl sifatida yuklab olindi!");
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (importAllData(content)) {
          showStatus("Ma'lumotlar zaxiradan muvaffaqiyatli tiklandi!");
        } else {
          showStatus("Xatolik: JSON fayli formati noto'g'ri!", 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleManualImport = () => {
    if (!importJsonText) return;
    if (importAllData(importJsonText)) {
      setImportJsonText('');
      showStatus("Ma'lumotlar matndan muvaffaqiyatli tiklandi!");
    } else {
      showStatus("Xatolik: JSON matni formati noto'g'ri!", 'error');
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "DIQQAT: Saytning barcha so'zlari, rasmlari va yangiliklarini dastlabki holatga qaytarmoqchimisiz? Barcha o'zgartirishlar bekor qilinadi."
      )
    ) {
      resetAllToDefault();
      showStatus("Sayt dastlabki rasmiy holatiga qaytarildi!");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Zaxira Nusxa va Tizim Sozlamalari</h2>
          <p className="text-xs text-gray-500 mt-1">
            Saytdagi barcha o'zgarishlarni eksport qilish, boshqa kompyuterga ko'chirish yoki tiklash
          </p>
        </div>

        {statusMessage && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border animate-fade-in ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Backup and Restore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Zaxira nusxasini yuklab olish</h3>
            <p className="text-xs text-gray-500 mt-1">
              Saytdagi barcha yangiliklar, so'zlar, rasmlar va o'zgarishlarni bitta `.json` faylga saqlab oling.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadBackup}
            className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Faylni yuklab olish (.json)</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Zaxira fayldan tiklash</h3>
            <p className="text-xs text-gray-500 mt-1">
              Oldin yuklab olingan `.json` faylni yuklab, sayt ma'lumotlarini bir zumda to'ldiring.
            </p>
          </div>

          <label className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            <span>Faylni tanlash (.json)</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImportJsonFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Manual JSON Import box */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-gray-400" />
          <h3 className="font-bold text-base text-gray-900">JSON matnini to'g'ridan-to'g'ri kiritish</h3>
        </div>
        <textarea
          rows={4}
          placeholder='{"translations": {...}, "news": [...]} formatidagi matnni shu yerga qo‘ying...'
          value={importJsonText}
          onChange={(e) => setImportJsonText(e.target.value)}
          className="w-full text-xs font-mono p-3 border border-gray-200 rounded-2xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleManualImport}
            disabled={!importJsonText}
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-900 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Matndan tiklash
          </button>
        </div>
      </div>

      {/* Reset to Factory Defaults */}
      <div className="bg-red-50/60 rounded-3xl p-6 border border-red-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Dastlabki holatga qaytarish</span>
          </div>
          <p className="text-xs text-red-600 max-w-lg">
            Saytdagi barcha kiritilgan o'zgarishlarni o'chirib, universitetning asl rasmiy ma'lumotlariga qaytaradi.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 flex items-center gap-2 transition-all flex-shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Dastlabki holatga qaytarish</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
