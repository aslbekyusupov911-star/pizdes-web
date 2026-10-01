import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Search, Plus, Edit2, Check, X, Save, Trash2 } from 'lucide-react';
import { Language } from '../../types';

export const AdminWords: React.FC = () => {
  const { translations, updateTranslation, addTranslationKey, deleteTranslationKey } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLang, setActiveLang] = useState<Language>('uz');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState({ uz: '', ru: '', en: '' });
  const [savedSuccessKey, setSavedSuccessKey] = useState<string | null>(null);

  // New key modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newUz, setNewUz] = useState('');
  const [newRu, setNewRu] = useState('');
  const [newEn, setNewEn] = useState('');

  const keys = Object.keys(translations.uz);

  const filteredKeys = keys.filter((k) => {
    const q = searchTerm.toLowerCase();
    const uzVal = (translations.uz[k] || '').toLowerCase();
    const ruVal = (translations.ru[k] || '').toLowerCase();
    const enVal = (translations.en[k] || '').toLowerCase();
    return (
      k.toLowerCase().includes(q) ||
      uzVal.includes(q) ||
      ruVal.includes(q) ||
      enVal.includes(q)
    );
  });

  const handleStartEdit = (key: string) => {
    setEditingKey(key);
    setTempValues({
      uz: translations.uz[key] || '',
      ru: translations.ru[key] || '',
      en: translations.en[key] || '',
    });
  };

  const handleSave = (key: string) => {
    updateTranslation('uz', key, tempValues.uz);
    updateTranslation('ru', key, tempValues.ru);
    updateTranslation('en', key, tempValues.en);
    window.dispatchEvent(new Event('utu_translations_updated'));
    setEditingKey(null);
    setSavedSuccessKey(key);
    setTimeout(() => setSavedSuccessKey(null), 2500);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newUz) {
      alert("Iltimos, kalit va o'zbekcha matnni kiriting!");
      return;
    }
    addTranslationKey(newKey, newUz, newRu, newEn);
    window.dispatchEvent(new Event('utu_translations_updated'));
    setIsAddModalOpen(false);
    setNewKey('');
    setNewUz('');
    setNewRu('');
    setNewEn('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Sayt Matnlari va So'zlari Tahririyati
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Saytdagi har bir sarlavha, tugma, menyu va tavsiflarni 3 tilda (UZ, RU, EN) bir zumda o'zgartiring (jami: {keys.length} ta yozuv)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#f56100] hover:bg-[#e05600] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi so'z / matn qo'shish</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Istalgan so'zni qidirish (masalan: Abituriyent, Qabul, Rektorat)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#f56100] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Ko'rish tili:</span>
          {(['uz', 'ru', 'en'] as Language[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setActiveLang(l)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors ${
                activeLang === l
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Words Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-44">Tizim Kaliti</th>
                <th className="px-6 py-4">O'zbekcha (UZ)</th>
                <th className="px-6 py-4">Ruscha (RU)</th>
                <th className="px-6 py-4">Inglizcha (EN)</th>
                <th className="px-6 py-4 text-right w-36">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredKeys.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Mos keluvchi so'z topilmadi.
                  </td>
                </tr>
              ) : (
                filteredKeys.map((key) => {
                  const isEditing = editingKey === key;
                  const isSaved = savedSuccessKey === key;

                  return (
                    <tr
                      key={key}
                      className={`hover:bg-gray-50/80 transition-colors ${
                        isSaved ? 'bg-emerald-50/60' : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-mono font-bold text-blue-700 align-top">
                        <span className="bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                          {key}
                        </span>
                      </td>

                      {/* UZ */}
                      <td className="px-6 py-4 align-top">
                        {isEditing ? (
                          <textarea
                            rows={2}
                            value={tempValues.uz}
                            onChange={(e) =>
                              setTempValues({ ...tempValues, uz: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                          />
                        ) : (
                          <span className="text-gray-900 font-medium">
                            {translations.uz[key] || '-'}
                          </span>
                        )}
                      </td>

                      {/* RU */}
                      <td className="px-6 py-4 align-top">
                        {isEditing ? (
                          <textarea
                            rows={2}
                            value={tempValues.ru}
                            onChange={(e) =>
                              setTempValues({ ...tempValues, ru: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                          />
                        ) : (
                          <span className="text-gray-600">
                            {translations.ru[key] || '-'}
                          </span>
                        )}
                      </td>

                      {/* EN */}
                      <td className="px-6 py-4 align-top">
                        {isEditing ? (
                          <textarea
                            rows={2}
                            value={tempValues.en}
                            onChange={(e) =>
                              setTempValues({ ...tempValues, en: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                          />
                        ) : (
                          <span className="text-gray-600">
                            {translations.en[key] || '-'}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right align-top">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleSave(key)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 shadow-xs"
                              title="Saqlash"
                            >
                              <Check className="w-3.5 h-3.5" /> Saqlash
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingKey(null)}
                              className="p-1 text-gray-500 hover:bg-gray-200 rounded-lg"
                              title="Bekor qilish"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(key)}
                              className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Tahrirlash
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Translation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Yangi so'z / matn qo'shish</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNew} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Kalit nomi (Inglizcha lotincha, masalan: customBannerText) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="masalan: studentClubTitle"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  O'zbekcha matn *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newUz}
                  onChange={(e) => setNewUz(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Ruscha matn (ixtiyoriy)
                </label>
                <textarea
                  rows={2}
                  value={newRu}
                  onChange={(e) => setNewRu(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Inglizcha matn (ixtiyoriy)
                </label>
                <textarea
                  rows={2}
                  value={newEn}
                  onChange={(e) => setNewEn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#f56100] hover:bg-[#e05600] text-white rounded-xl font-bold shadow-md shadow-orange-500/20"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWords;
