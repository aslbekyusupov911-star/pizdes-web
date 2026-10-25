import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  Check,
  X
} from 'lucide-react';
import { admissionsApi, AdmissionItem, AdmissionStats } from '../../services/admissionsApi';

export const AdminAdmissions: React.FC = () => {
  const [admissions, setAdmissions] = useState<AdmissionItem[]>([]);
  const [stats, setStats] = useState<AdmissionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [studyTypeFilter, setStudyTypeFilter] = useState('all');

  // Modal states
  const [selectedItem, setSelectedItem] = useState<AdmissionItem | null>(null);
  const [editStatusItem, setEditStatusItem] = useState<AdmissionItem | null>(null);
  const [newStatus, setNewStatus] = useState<string>('yangi');
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [items, statsData] = await Promise.all([
        admissionsApi.getAll({
          search: search || undefined,
          status: statusFilter,
          study_type: studyTypeFilter,
        }),
        admissionsApi.getStats().catch(() => null),
      ]);
      setAdmissions(items);
      if (statsData) setStats(statsData);
    } catch (err: any) {
      console.error("Fetch admissions error:", err);
      setError("Arizalarni yuklashda xatolik yuz berdi. Backend server ishlayotganini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, studyTypeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleUpdateStatus = async () => {
    if (!editStatusItem) return;
    setUpdating(true);
    try {
      await admissionsApi.updateStatus(editStatusItem.id, newStatus, adminNotes);
      setEditStatusItem(null);
      await fetchData();
    } catch (err: any) {
      alert("Holatni yangilashda xatolik: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number, appNum: string) => {
    if (!window.confirm(`Haqiqatan ham #${appNum} arizani o'chirmoqchimisiz?`)) {
      return;
    }
    try {
      await admissionsApi.delete(id);
      await fetchData();
    } catch (err: any) {
      alert("Arizani o'chirishda xatolik: " + err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'qabul_qilindi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Qabul qilindi
          </span>
        );
      case 'korilmoqda':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Ko'rib chiqilmoqda
          </span>
        );
      case 'rad_etildi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Rad etildi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Yangi ariza
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#f56100] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Qabul Arizalari Boshqaruvi</h1>
          </div>
          <p className="text-xs text-gray-500">
            Abituriyentlar tomonidan yuborilgan onlayn qabul arizalari (FastAPI Backend)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchData()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Yangilash
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-[11px] text-gray-500 font-bold block mb-1">Jami arizalar</span>
            <div className="text-2xl font-black text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
            <span className="text-[11px] text-blue-600 font-bold block mb-1">Yangi arizalar</span>
            <div className="text-2xl font-black text-blue-600">{stats.new}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
            <span className="text-[11px] text-amber-600 font-bold block mb-1">Ko'rib chiqilmoqda</span>
            <div className="text-2xl font-black text-amber-600">{stats.in_review}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
            <span className="text-[11px] text-emerald-600 font-bold block mb-1">Qabul qilindi</span>
            <div className="text-2xl font-black text-emerald-600">{stats.accepted}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm col-span-2 md:col-span-1">
            <span className="text-[11px] text-rose-600 font-bold block mb-1">Rad etildi</span>
            <div className="text-2xl font-black text-rose-600">{stats.rejected}</div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full md:w-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Ism, familiya, ariza raqami yoki telefon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#f56100]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#f56100] text-white rounded-xl text-xs font-bold hover:bg-[#d95200] transition-colors"
          >
            Qidirish
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#f56100]"
          >
            <option value="all">Barcha holatlar</option>
            <option value="yangi">Yangi</option>
            <option value="korilmoqda">Ko'rib chiqilmoqda</option>
            <option value="qabul_qilindi">Qabul qilindi</option>
            <option value="rad_etildi">Rad etildi</option>
          </select>

          <select
            value={studyTypeFilter}
            onChange={(e) => setStudyTypeFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#f56100]"
          >
            <option value="all">Barcha ta'lim shakllari</option>
            <option value="kunduzgi">Kunduzgi</option>
            <option value="sirtqi">Sirtqi</option>
            <option value="magistratura">Magistratura</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#f56100] mb-2" />
            Ma'lumotlar yuklanmoqda...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-xs text-red-500">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            {error}
          </div>
        ) : admissions.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-500">
            Arizalar topilmadi.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Ariza №</th>
                  <th className="py-3.5 px-4">Abituriyent</th>
                  <th className="py-3.5 px-4">Yo'nalish & Shakli</th>
                  <th className="py-3.5 px-4">Pasport & Viloyat</th>
                  <th className="py-3.5 px-4">Aloqa</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {admissions.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#f56100]">
                      {item.application_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">
                        {item.last_name} {item.first_name}
                      </div>
                      <div className="text-[11px] text-gray-500">{item.middle_name || '—'}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-semibold text-gray-800 truncate" title={item.direction}>
                        {item.direction}
                      </div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 bg-gray-100 rounded text-[10px] uppercase font-bold text-gray-600">
                        {item.study_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-gray-700">{item.passport_series} {item.passport_number}</div>
                      <div className="text-[11px] text-gray-500">{item.region}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{item.phone}</div>
                      <div className="text-[11px] text-gray-500 truncate max-w-[150px]">{item.email || '—'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedItem(item)}
                          title="Batafsil ko'rish"
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditStatusItem(item);
                            setNewStatus(item.status);
                            setAdminNotes(item.admin_notes || '');
                          }}
                          title="Holatni o'zgartirish"
                          className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.application_number)}
                          title="O'chirish"
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-[#f56100]">
                  #{selectedItem.application_number}
                </span>
                {getStatusBadge(selectedItem.status)}
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block mb-0.5">To'liq F.I.Sh:</span>
                <p className="font-bold text-sm text-gray-900">
                  {selectedItem.last_name} {selectedItem.first_name} {selectedItem.middle_name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl">
                <div>
                  <span className="text-gray-400 block mb-0.5">Pasport ma'lumoti:</span>
                  <p className="font-mono font-bold text-gray-900">
                    {selectedItem.passport_series} {selectedItem.passport_number}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Tug'ilgan sana / Jinsi:</span>
                  <p className="font-medium text-gray-900">
                    {selectedItem.birth_date || '—'} ({selectedItem.gender})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl">
                <div>
                  <span className="text-gray-400 block mb-0.5">Telefon raqam:</span>
                  <p className="font-bold text-gray-900">{selectedItem.phone}</p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Elektron pochta:</span>
                  <p className="font-medium text-gray-900">{selectedItem.email || '—'}</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block mb-0.5">Viloyat:</span>
                <p className="font-medium text-gray-900">{selectedItem.region}</p>
              </div>

              <div className="p-3 bg-orange-50/50 border border-orange-100 rounded-xl">
                <span className="text-gray-400 block mb-0.5">Tanlangan ta'lim yo'nalishi:</span>
                <p className="font-bold text-gray-900 text-sm">{selectedItem.direction}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-[#f56100] text-[10px] font-bold rounded uppercase">
                  {selectedItem.study_type} ta'lim
                </span>
              </div>

              {selectedItem.admin_notes && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="text-blue-900 font-bold block mb-1">Admin izohi:</span>
                  <p className="text-gray-700">{selectedItem.admin_notes}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {editStatusItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">
                Ariza holatini yangilash (#{editStatusItem.application_number})
              </h3>
              <button
                onClick={() => setEditStatusItem(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-500 font-bold mb-1.5">Yangi holatni tanlang:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#f56100]"
                >
                  <option value="yangi">Yangi ariza</option>
                  <option value="korilmoqda">Ko'rib chiqilmoqda</option>
                  <option value="qabul_qilindi">Qabul qilindi</option>
                  <option value="rad_etildi">Rad etildi</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-500 font-bold mb-1.5">Qabul komissiyasi izohi (Ixtiyoriy):</label>
                <textarea
                  rows={3}
                  placeholder="Masalan: Hujjatlar to'liq tekshirildi, suhbat sanasi..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#f56100]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditStatusItem(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                disabled={updating}
                onClick={handleUpdateStatus}
                className="px-5 py-2 bg-[#f56100] text-white rounded-xl text-xs font-bold hover:bg-[#d95200] transition-colors"
              >
                {updating ? "Saqlanmoqda..." : "Saqlash"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdmissions;
