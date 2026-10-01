import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { Shield, Lock, ArrowLeft, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login, isAdminLoggedIn } = useCMS();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
      navigate('/admin');
    } else {
      setError(true);
    }
  };

  const handleQuickLogin = () => {
    login('admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a1128] to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#f56100] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Saytga qaytish</span>
          </Link>
          <div className="bg-orange-50 text-[#f56100] px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
            UTU Ranch CMS
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#f56100] to-amber-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 font-sans tracking-tight">
            Boshqaruv Paneli
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Universitet rasmiy saytini tahrirlash uchun parolni kiriting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Admin Paroli
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Parolni kiriting..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f56100] focus:bg-white focus:outline-none transition-all text-sm font-medium"
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>Parol noto'g'ri. Iltimos qaytadan urinib ko'ring.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#f56100] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all transform active:scale-98 flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Tizimga kirish</span>
          </button>
        </form>

        {/* Quick Test Login */}
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 mb-2">Test yoki namoyish uchun:</p>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Birlamchi kirish (Parol: admin)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
