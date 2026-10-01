import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import {
  LayoutDashboard,
  Newspaper,
  Type,
  Image as ImageIcon,
  GraduationCap,
  Users,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Edit3,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAdminLoggedIn, logout, isLiveEditMode, toggleLiveEditMode } = useCMS();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);

  if (!isAdminLoggedIn) {
    return null;
  }

  const navLinks = [
    { to: '/admin', label: 'Bosh sahifa (Dashboard)', icon: LayoutDashboard, end: true },
    { to: '/admin/news', label: 'Yangiliklar', icon: Newspaper },
    { to: '/admin/words', label: "So'zlar & Tarjimalar", icon: Type },
    { to: '/admin/media', label: 'Rasmlar & Media', icon: ImageIcon },
    { to: '/admin/directions', label: "Ta'lim yo'nalishlari", icon: GraduationCap },
    { to: '/admin/staff', label: 'Rektorat & Xodimlar', icon: Users },
    { to: '/admin/settings', label: 'Zaxira & Sozlamalar', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0f172a] text-white flex-shrink-0 flex flex-col border-r border-gray-800">
        <div className="p-6 border-b border-gray-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f56100] rounded-xl flex items-center justify-center font-bold text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide text-white">UTU RANCH</h2>
              <span className="text-[11px] text-[#f56100] font-semibold block tracking-wider uppercase">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#f56100] text-white shadow-md shadow-orange-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="p-4 border-t border-gray-800/80 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Saytni ko'rish
            </span>
            <span className="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">Yangi oyna</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Chiqish (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-gray-900">
              Universitet Axborot Tizimi Boshqaruvi
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Edit Toggle */}
            <button
              type="button"
              onClick={toggleLiveEditMode}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isLiveEditMode
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Jonli tahrir rejimi: {isLiveEditMode ? 'FAOL' : 'O‘CHIK'}</span>
            </button>

            <Link
              to="/"
              className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Saytga o'tish</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
