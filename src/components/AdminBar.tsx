import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import {
  Shield,
  Edit3,
  PlusCircle,
  LogOut,
  Sliders,
  Check,
  X,
  Type,
  Image as ImageIcon,
  BookOpen,
} from 'lucide-react';

export const AdminBar: React.FC = () => {
  const { isAdminLoggedIn, logout, isLiveEditMode, toggleLiveEditMode, translations, updateTranslation } = useCMS();
  const navigate = useNavigate();
  const location = useLocation();
  const [showQuickWordModal, setShowQuickWordModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ uz: '', ru: '', en: '' });

  // Hide on admin routes to prevent duplicate UI
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  if (!isAdminLoggedIn) {
    return (
      <Link
        to="/admin/login"
        className="fixed bottom-4 right-4 z-40 bg-gray-900/80 hover:bg-[#f56100] text-white p-2.5 rounded-full shadow-lg backdrop-blur transition-all duration-300 group opacity-40 hover:opacity-100"
        title="Admin tizimiga kirish"
      >
        <Shield className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
      </Link>
    );
  }

  const handleStartEdit = (key: string) => {
    setEditingKey(key);
    setEditValues({
      uz: translations.uz[key] || '',
      ru: translations.ru[key] || '',
      en: translations.en[key] || '',
    });
  };

  const handleSaveWord = (key: string) => {
    updateTranslation('uz', key, editValues.uz);
    updateTranslation('ru', key, editValues.ru);
    updateTranslation('en', key, editValues.en);
    window.dispatchEvent(new Event('utu_translations_updated'));
    setEditingKey(null);
  };

  const filteredKeys = Object.keys(translations.uz)
    .filter((k) => {
      const q = searchTerm.toLowerCase();
      return (
        k.toLowerCase().includes(q) ||
        (translations.uz[k] && translations.uz[k].toLowerCase().includes(q)) ||
        (translations.ru[k] && translations.ru[k].toLowerCase().includes(q)) ||
        (translations.en[k] && translations.en[k].toLowerCase().includes(q))
      );
    })
    .slice(0, 15);

  return (
    <>
      {/* Floating Top Admin Bar */}
      <aside aria-label="Admin Boshqaruv Paneli" className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white border-b border-gray-700/60 shadow-xl px-4 py-2 flex flex-wrap items-center justify-between text-xs font-sans">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#f56100] px-2.5 py-1 rounded-md font-bold tracking-wide">
            <Shield className="w-3.5 h-3.5" />
            <span>ADMIN MODE</span>
          </div>
          <span className="hidden sm:inline text-gray-400">
            Hozirgi sahifa: <strong className="text-white">{location.pathname}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Edit Mode toggle */}
          <button
            type="button"
            onClick={toggleLiveEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
              isLiveEditMode
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            title="Jonli tahrirlash: sahifadagi har bir matnni o'zgartirish imkonini beradi"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Jonli tahrir {isLiveEditMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Quick Word Edit Modal Toggle */}
          <button
            type="button"
            onClick={() => setShowQuickWordModal(true)}
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-md transition-colors"
          >
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">So'zlarni qidirish</span>
          </button>

          {/* Go to Full Admin Panel */}
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-md transition-colors"
            title="Chiqish"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Quick Word Edit Modal */}
      {showQuickWordModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden text-gray-800">
            {/* Modal Header */}
            <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-[#f56100]" />
                <h3 className="font-bold text-base">Saytdagi barcha so'z va matnlarni qidirish & tahrirlash</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickWordModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <input
                type="text"
                placeholder="Istalgan so'z yoki kalitni yozing (masalan: 'Abituriyent', 'Universitet', 'Qabul')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f56100] focus:outline-none text-sm"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Topildi: {filteredKeys.length} ta matn. Istalgan matn ustiga bosing va o'zgartiring.
              </p>
            </div>

            {/* Words List */}
            <div className="overflow-y-auto p-4 space-y-3 flex-1">
              {filteredKeys.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Hech narsa topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
                </div>
              ) : (
                filteredKeys.map((key) => {
                  const isEditing = editingKey === key;
                  return (
                    <div
                      key={key}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {key}
                        </span>
                        {!isEditing ? (
                          <button
                            type="button"
                            onClick={() => handleStartEdit(key)}
                            className="text-xs text-[#f56100] font-semibold hover:underline flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            O'zgartirish
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSaveWord(key)}
                              className="text-xs bg-emerald-600 text-white px-2.5 py-1 rounded font-semibold flex items-center gap-1 hover:bg-emerald-700"
                            >
                              <Check className="w-3 h-3" /> Saqlash
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingKey(null)}
                              className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded font-medium hover:bg-gray-400"
                            >
                              Bekor
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                          <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase">O'zbekcha (uz)</label>
                            <textarea
                              rows={2}
                              value={editValues.uz}
                              onChange={(e) => setEditValues({ ...editValues, uz: e.target.value })}
                              className="w-full text-xs p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase">Ruscha (ru)</label>
                            <textarea
                              rows={2}
                              value={editValues.ru}
                              onChange={(e) => setEditValues({ ...editValues, ru: e.target.value })}
                              className="w-full text-xs p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase">Inglizcha (en)</label>
                            <textarea
                              rows={2}
                              value={editValues.en}
                              onChange={(e) => setEditValues({ ...editValues, en: e.target.value })}
                              className="w-full text-xs p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-700">
                          <div>
                            <strong className="text-gray-400 block text-[10px]">UZ:</strong>
                            <p className="line-clamp-2">{translations.uz[key] || '-'}</p>
                          </div>
                          <div>
                            <strong className="text-gray-400 block text-[10px]">RU:</strong>
                            <p className="line-clamp-2">{translations.ru[key] || '-'}</p>
                          </div>
                          <div>
                            <strong className="text-gray-400 block text-[10px]">EN:</strong>
                            <p className="line-clamp-2">{translations.en[key] || '-'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-gray-100 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
              <span>Barcha o'zgarishlar darhol saytda aks etadi</span>
              <button
                type="button"
                onClick={() => {
                  setShowQuickWordModal(false);
                  navigate('/admin/words');
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                To'liq so'zlar jadvaliga o'tish →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBar;
