import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { NewsItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  Eye,
  Calendar,
  Image as ImageIcon,
  Check,
  X,
  Upload,
} from 'lucide-react';

export const AdminNews: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    title_uz: '',
    title_ru: '',
    title_en: '',
    desc_uz: '',
    desc_ru: '',
    desc_en: '',
    image: '',
    category: "O'quv jarayoni",
    created_at: new Date().toISOString().split('T')[0],
    views: 120,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title_uz: '',
      title_ru: '',
      title_en: '',
      desc_uz: '',
      desc_ru: '',
      desc_en: '',
      image: '/static/media/news2.8d897ad50f4a5125cf2d.png',
      category: "O'quv jarayoni",
      created_at: new Date().toISOString().split('T')[0],
      views: Math.floor(Math.random() * 80) + 40,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormData({
      title_uz: item.title_uz || '',
      title_ru: item.title_ru || '',
      title_en: item.title_en || '',
      desc_uz: item.desc_uz || '',
      desc_ru: item.desc_ru || '',
      desc_en: item.desc_en || '',
      image: item.image || '',
      category: item.category || "O'quv jarayoni",
      created_at: item.created_at || new Date().toISOString().split('T')[0],
      views: item.views || 50,
    });
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_uz) {
      alert("Iltimos, o'zbekcha sarlavhani kiriting!");
      return;
    }

    if (editingId) {
      updateNews(editingId, formData);
    } else {
      addNews({
        ...formData,
        post_url: 'https://utu-ranch.uz',
      });
    }

    setIsModalOpen(false);
  };

  const filteredNews = news.filter((n) => {
    const q = searchTerm.toLowerCase();
    return (
      (n.title_uz && n.title_uz.toLowerCase().includes(q)) ||
      (n.title_ru && n.title_ru.toLowerCase().includes(q)) ||
      (n.title_en && n.title_en.toLowerCase().includes(q)) ||
      (n.category && n.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Yangiliklar Boshqaruvi</h2>
          <p className="text-xs text-gray-500 mt-1">
            Saytdagi barcha yangiliklarni qo'shish, o'chirish va tahrirlash (jami: {news.length} ta)
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="bg-[#f56100] hover:bg-[#e05600] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi yangilik qo'shish</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Yangilik sarlavhasi yoki toifasi bo'yicha qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm border-none focus:outline-none"
        />
      </div>

      {/* News Table / Grid */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Rasm</th>
                <th className="px-6 py-4">Sarlavha (UZ / RU / EN)</th>
                <th className="px-6 py-4">Toifa</th>
                <th className="px-6 py-4">Sana</th>
                <th className="px-6 py-4">Ko'rildi</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Yangilik topilmadi.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={item.image || '/static/media/news2.8d897ad50f4a5125cf2d.png'}
                        alt=""
                        className="w-16 h-12 rounded-xl object-cover border border-gray-100 bg-gray-100 flex-shrink-0"
                      />
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-bold text-gray-900 line-clamp-1">{item.title_uz}</div>
                      {item.title_ru && (
                        <div className="text-gray-400 text-[11px] line-clamp-1">RU: {item.title_ru}</div>
                      )}
                      {item.title_en && (
                        <div className="text-gray-400 text-[11px] line-clamp-1">EN: {item.title_en}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-semibold text-[11px]">
                        {item.category || "O'quv jarayoni"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {item.created_at || '2026-09-30'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-gray-600 font-semibold">
                        <Eye className="w-3.5 h-3.5 text-[#f56100]" />
                        {item.views || 48}
                      </span>
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
                            if (confirm("Haqiqatan ham bu yangilikni o'chirmoqchimisiz?")) {
                              deleteNews(item.id);
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingId ? "Yangilikni tahrirlash" : "Yangi yangilik qo'shish"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              {/* Image Preview & Upload */}
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Rasm (Muqova)</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-16 rounded-xl object-cover border border-gray-200"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Rasm havolasi (URL)..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer font-semibold text-[11px]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Kompyuterdan rasm yuklash</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Titles */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Sarlavha (O'zbekcha) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_uz}
                    onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-500 mb-1">Sarlavha (Ruscha)</label>
                    <input
                      type="text"
                      value={formData.title_ru}
                      onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-500 mb-1">Sarlavha (Inglizcha)</label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Batafsil matn (O'zbekcha)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.desc_uz}
                    onChange={(e) => setFormData({ ...formData, desc_uz: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-500 mb-1">Matn (Ruscha)</label>
                    <textarea
                      rows={2}
                      value={formData.desc_ru}
                      onChange={(e) => setFormData({ ...formData, desc_ru: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-500 mb-1">Matn (Inglizcha)</label>
                    <textarea
                      rows={2}
                      value={formData.desc_en}
                      onChange={(e) => setFormData({ ...formData, desc_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Meta (Category, Date) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Toifa (Kategoriya)</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Sana</label>
                  <input
                    type="date"
                    value={formData.created_at}
                    onChange={(e) => setFormData({ ...formData, created_at: e.target.value })}
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
                  {editingId ? "Saqlash" : "Chop etish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
