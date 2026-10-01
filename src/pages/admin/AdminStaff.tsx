import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { StaffMember } from '../../types';
import { Plus, Edit2, Trash2, Search, X, Users, Upload, Phone, Mail, Clock } from 'lucide-react';

export const AdminStaff: React.FC = () => {
  const { staff, addStaff, updateStaff, deleteStaff } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Omit<StaffMember, 'id'>>({
    name_uz: '',
    name_ru: '',
    name_en: '',
    lavozim_uz: '',
    lavozim_ru: '',
    lavozim_en: '',
    phone: '(62) 227 77 72',
    email: 'university@utu-ranch.uz',
    image: '/static/media/psixolog.e3d4d6908e9fd3e303de.jpg',
    uchrashuv_vaqti_uz: 'Dushanba - Juma: 14:00 - 17:00',
    degree_uz: 'Fan nomzodi, dotsent',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name_uz: '',
      name_ru: '',
      name_en: '',
      lavozim_uz: '',
      lavozim_ru: '',
      lavozim_en: '',
      phone: '(62) 227 77 72',
      email: 'university@utu-ranch.uz',
      image: '/static/media/psixolog.e3d4d6908e9fd3e303de.jpg',
      uchrashuv_vaqti_uz: 'Dushanba - Juma: 14:00 - 17:00',
      degree_uz: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: StaffMember) => {
    setEditingId(item.id);
    setFormData({
      name_uz: item.name_uz || '',
      name_ru: item.name_ru || '',
      name_en: item.name_en || '',
      lavozim_uz: item.lavozim_uz || '',
      lavozim_ru: item.lavozim_ru || '',
      lavozim_en: item.lavozim_en || '',
      phone: item.phone || '(62) 227 77 72',
      email: item.email || 'university@utu-ranch.uz',
      image: item.image || '/static/media/psixolog.e3d4d6908e9fd3e303de.jpg',
      uchrashuv_vaqti_uz: item.uchrashuv_vaqti_uz || '',
      degree_uz: item.degree_uz || '',
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
    if (!formData.name_uz || !formData.lavozim_uz) {
      alert("Iltimos, ism-sharif va lavozimni kiriting!");
      return;
    }

    if (editingId) {
      updateStaff(editingId, formData);
    } else {
      addStaff(formData);
    }

    setIsModalOpen(false);
  };

  const filtered = staff.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      (s.name_uz && s.name_uz.toLowerCase().includes(q)) ||
      (s.lavozim_uz && s.lavozim_uz.toLowerCase().includes(q)) ||
      (s.degree_uz && s.degree_uz.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Rektorat va Rahbariyat Boshqaruvi</h2>
          <p className="text-xs text-gray-500 mt-1">
            Universitet rahbariyati, dekanlar va bo'lim boshliqlarini tahrirlash (jami: {staff.length} kishi)
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="bg-[#f56100] hover:bg-[#e05600] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi xodim qo'shish</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Ism-sharif yoki lavozim bo'yicha qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm border-none focus:outline-none"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name_uz}
                  className="w-20 h-24 rounded-2xl object-cover border border-gray-200 shadow-xs flex-shrink-0 bg-gray-50"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-2">
                    {item.name_uz}
                  </h4>
                  <p className="text-xs text-[#f56100] font-semibold mt-1 line-clamp-2">
                    {item.lavozim_uz}
                  </p>
                  {item.degree_uz && (
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                      {item.degree_uz}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                {item.phone && (
                  <div className="flex items-center gap-2 truncate">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.phone}</span>
                  </div>
                )}
                {item.email && (
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.email}</span>
                  </div>
                )}
                {item.uchrashuv_vaqti_uz && (
                  <div className="flex items-center gap-2 truncate">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.uchrashuv_vaqti_uz}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Tahrirlash</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Bu xodim ma'lumotlarini o'chirmoqchimisiz?")) {
                    deleteStaff(item.id);
                  }
                }}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="O'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingId ? "Xodim ma'lumotlarini tahrirlash" : "Yangi xodim qo'shish"}
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
              {/* Photo */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Xodim fotosurati</label>
                <div className="flex items-center gap-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-20 rounded-xl object-cover border border-gray-200"
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Rasm URL havolasi..."
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

              {/* Names */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  F.I.SH (O'zbekcha) *
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
                  <label className="block font-bold text-gray-500 mb-1">F.I.SH (Ruscha)</label>
                  <input
                    type="text"
                    value={formData.name_ru || ''}
                    onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1">F.I.SH (Inglizcha)</label>
                  <input
                    type="text"
                    value={formData.name_en || ''}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Lavozimi (O'zbekcha) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lavozim_uz}
                  onChange={(e) => setFormData({ ...formData, lavozim_uz: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Telefon raqami</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email manzili</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Qabul kunlari va vaqti</label>
                <input
                  type="text"
                  value={formData.uchrashuv_vaqti_uz || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, uchrashuv_vaqti_uz: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#f56100] focus:outline-none"
                  placeholder="masalan: Dushanba - Juma: 14:00 - 17:00"
                />
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

export default AdminStaff;
