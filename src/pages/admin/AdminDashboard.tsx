import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import {
  Newspaper,
  Type,
  Image as ImageIcon,
  GraduationCap,
  Users,
  Briefcase,
  PlusCircle,
  Edit3,
  ExternalLink,
  CheckCircle,
  Eye,
  Calendar,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { news, translations, directions, staff, media } = useCMS();

  const totalWords = Object.keys(translations.uz).length;

  const cards = [
    {
      title: 'Yangiliklar',
      count: news.length,
      desc: "Universitet yangilik va maqolalari",
      icon: Newspaper,
      color: 'from-blue-500 to-indigo-600',
      link: '/admin/news',
      actionLabel: 'Yangilik qo‘shish',
    },
    {
      title: "So'zlar va Matnlar",
      count: totalWords,
      desc: "3 tildagi barcha so'z va matnlar",
      icon: Type,
      color: 'from-amber-500 to-orange-600',
      link: '/admin/words',
      actionLabel: 'So‘zlarni tahrirlash',
    },
    {
      title: "Rasmlar & Media",
      count: media.studentPhotos.length + 6,
      desc: "Barcha bannerlar, binolar va rasmlar",
      icon: ImageIcon,
      color: 'from-emerald-500 to-teal-600',
      link: '/admin/media',
      actionLabel: 'Rasmlarni almashtirish',
    },
    {
      title: "Ta'lim Yo'nalishlari",
      count: directions.length,
      desc: "Kunduzgi, sirtqi, magistratura",
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-600',
      link: '/admin/directions',
      actionLabel: 'Yo‘nalishlarni ko‘rish',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-[#1e293b] to-gray-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gray-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#f56100] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Tizim tayyor
            </span>
            <span className="text-gray-400 text-xs">UTU Ranch Universitet boshqaruvi</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Xush kelibsiz, Boshqaruvchi!
          </h2>
          <p className="text-gray-300 text-sm mt-1 max-w-xl">
            Ushbu panel orqali saytdagi har bitta so'z, har bitta sahifa, rasmlar va yangiliklarni istalgan vaqtda real vaqt rejimida o'zgartirishingiz mumkin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/news"
            className="bg-[#f56100] hover:bg-[#e05600] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yangi yangilik qo'shish</span>
          </Link>
          <Link
            to="/admin/words"
            className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>So'zlarni tahrirlash</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${c.color} text-white flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-gray-900 tracking-tight">
                    {c.count}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-900">{c.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <Link
                  to={c.link}
                  className="text-xs font-bold text-[#f56100] hover:text-[#d04e00] flex items-center justify-between group"
                >
                  <span>{c.actionLabel}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent News & Quick Edit list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">So'nggi yangiliklar</h3>
              <p className="text-xs text-gray-500">Saytda chop etilgan so'nggi ma'lumotlar</p>
            </div>
            <Link
              to="/admin/news"
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Barchasini ko'rish →
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {news.slice(0, 4).map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-12 rounded-xl object-cover flex-shrink-0 bg-gray-100 border border-gray-100"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {item.title_uz || item.title_ru || item.title_en}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.created_at}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[#f56100]" />
                        {item.views || 48} ko'rildi
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/admin/news"
                  className="text-xs font-semibold text-gray-600 hover:text-[#f56100] px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#f56100] flex-shrink-0 transition-colors"
                >
                  Tahrirlash
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Instructions & Help */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Qo'llanma va Imkoniyatlar</h3>
            <p className="text-xs text-gray-500 mb-6">
              Saytni o'zgartirish bo'yicha qulay imkoniyatlar
            </p>

            <div className="space-y-4 text-xs text-gray-600">
              <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100">
                <strong className="block text-gray-900 font-bold mb-1">
                  1. Jonli tahrir (Live Edit)
                </strong>
                Saytning istalgan sahifasida turganda yuqoridagi "Jonli tahrir" tugmasini yoqing va so'zlarni to'g'ridan-to'g'ri o'zgartiring.
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                <strong className="block text-gray-900 font-bold mb-1">
                  2. Har bir so'zni o'zgartirish
                </strong>
                "So'zlar & Tarjimalar" bo'limida o'zbekcha, ruscha va inglizcha istalgan so'zni qidirib tahrirlang.
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <strong className="block text-gray-900 font-bold mb-1">
                  3. Rasmlarni almashtirish
                </strong>
                "Rasmlar & Media" bo'limida asosiy binolar, talabalar rasmlari va videolarni yangilang.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              to="/admin/settings"
              className="text-xs text-gray-500 hover:text-gray-800 font-semibold block text-center"
            >
              Ma'lumotlar zaxirasi va sozlamalar →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
