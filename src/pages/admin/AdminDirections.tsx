import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { StudyDirection } from '../../types';
import { Plus, Edit2, Trash2, Search, X, GraduationCap, Check } from 'lucide-react';

export const AdminDirections: React.FC = () => {
  const { directions, addDirection, updateDirection, deleteDirection } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Omit<StudyDirection, 'id'>>({
    code: '',
    name_uz: '',
    name_ru: '',
    name_en: '',
    duration: '4 yil',
    type: 'kunduzgi',
    faculty: 'Aniq va tabiiy fanlar fakulteti',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      code: '60' + Math.floor(Math.random() * 800000 + 100000),
      name_uz: '',
      name_ru: '',
      name_en: '',
      duration: '4 yil',
      type: 'kunduzgi',
      faculty: 'Aniq va tabiiy fanlar fakulteti',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: StudyDirection) => {
    setEditingId(item.id);
    setFormData({
      code: item.code || '',
      name_uz: item.name_uz || '',
      name_ru: item.name_ru || '',
      name_en: item.name_en || '',
      duration: item.duration || '4 yil',
      type: item.type || 'kunduzgi',
      faculty: item.faculty || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name_uz) {
      alert("Iltimos, yo'nalish nomini kiriting!");
      return;
    }

    if (editingId) {
      updateDirection(editingId, formData);
    } else {
      addDirection(formData);
    }

    setIsModalOpen(false);
  };

  const filtered = directions.filter((d) => {
    const matchType = selectedType === 'all' || d.type === selectedType;
    const q = searchTerm.toLowerCase();
    const matchQuery =
      (d.name_uz && d.name_uz.toLowerCase().includes(q)) ||
      (d.code && d.code.toLowerCase().includes(q)) ||
      (d.faculty && d.faculty.toLowerCase().includes(q));
    return matchType && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Ta'lim Yo'nalishlari Boshqaruvi</h2>
          <p className="text-xs text-gray-500 mt-1">
            Kunduzgi, sirtqi va magistratura yo'nalishlarini qo'shish va tahrirlash (jami: {directions.length} ta)
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="bg-[#f56100] hover:bg-[#e05600] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi yo'nalish qo'shish</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Yo'nalish nomi, shifri yoki fakulteti bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#f56100] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Shakl:</span>
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'kunduzgi', label: 'Kunduzgi' },
            { id: 'sirtqi', label: 'Sirtqi' },
            { id: 'magistratura', label: 'Magistratura' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedType === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-32">Shifr</th>
                <th className="px-6 py-4">Yo'nalish nomi (UZ / RU / EN)</th>
                <th className="px-6 py-4">Ta'lim shakli</th>
                <th className="px-6 py-4">Muddati</th>
                <th className="px-6 py-4">Fakultet</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Yo'nalish topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-700">
                      <span className="bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                        {item.code || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{item.name_uz}</div>
                      {item.name_ru && (
                        <div className="text-gray-400 text-[11px]">RU: {item.name_ru}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md font-semibold text-[11px] uppercase ${
                          item.type === 'kunduzgi'
                            ? 'bg-emerald-50 text-emerald-700'
                            : item.type === 'sirtqi'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {item.type || 'kunduzgi'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {item.duration || '4 yil'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                      {item.faculty || "Umumiy ta'lim"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Bu yo'nalishni o'chirmoqchimisiz?")) {
                              deleteDirection(item.id);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingId ? "Yo'nalishni tahrirlash" : "Yangi yo'nalish qo'shish"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Yo'nalish kodi (Shifr) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Ta'lim shakli</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  >
                    <option value="kunduzgi">Kunduzgi (4 yil)</option>
                    <option value="sirtqi">Sirtqi (5 yil)</option>
                    <option value="magistratura">Magistratura (2 yil)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Yo'nalish nomi (O'zbekcha) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name_uz}
                  onChange={(e) => setFormData({ ...formData, name_uz: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Nomi (Ruscha)</label>
                  <input
                    type="text"
                    value={formData.name_ru || ''}
                    onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Nomi (Inglizcha)</label>
                  <input
                    type="text"
                    value={formData.name_en || ''}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">O'qish muddati</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tegishli fakultet</label>
                  <input
                    type="text"
                    value={formData.faculty}
                    onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#f56100] hover:bg-[#e05600] text-white rounded-xl font-bold shadow-md shadow-orange-500/20"
                >
                  {editingId ? "Saqlash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDirections;
