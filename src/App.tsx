import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { LanguageProvider } from './context/LanguageContext';
import Preloader from './components/Preloader';
import Header from './components/Header';
import RightPanels from './components/RightPanels';
import ScrollToTop from './components/ScrollToTop';
import AdminBar from './components/AdminBar';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import DepartmentList from './pages/DepartmentList';
import DepartmentDetail from './pages/DepartmentDetail';
import Departments from './pages/Departments';
import Rectorate from './pages/Rectorate';
import Rules from './pages/Rules';
import RulesEtika from './pages/RulesEtika';
import Regulation from './pages/Regulation';
import Structure from './pages/Structure';
import RulesLegal from './pages/RulesLegal';
import Directions from './pages/Directions';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import Announcements from './pages/Announcements';
import Articles from './pages/Articles';
import Vacancies from './pages/Vacancies';
import Dormitory from './pages/Dormitory';
import Psychology from './pages/Psychology';
import WomenCommittee from './pages/WomenCommittee';
import AdmissionForm from './pages/AdmissionForm';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminWords from './pages/admin/AdminWords';
import AdminMedia from './pages/admin/AdminMedia';
import AdminDirections from './pages/admin/AdminDirections';
import AdminStaff from './pages/admin/AdminStaff';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAdmissions from './pages/admin/AdminAdmissions';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <AdminBar />}
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <RightPanels />}

      <main className={!isAdminRoute ? 'min-h-screen' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/university" element={<About />} />
          <Route path="/department" element={<DepartmentList />} />
          <Route path="/department/:id" element={<DepartmentDetail />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/rektorat" element={<Rectorate />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/rulesEtika" element={<RulesEtika />} />
          <Route path="/regulation" element={<Regulation />} />
          <Route path="/tashkiliytuzilmasi" element={<Structure />} />
          <Route path="/qoidalar" element={<RulesLegal />} />
          <Route path="/Vacancies" element={<Vacancies />} />

          {/* Study Directions */}
          <Route path="/napravleniya" element={<Directions initialType="all" />} />
          <Route path="/kunduzgi" element={<Directions initialType="kunduzgi" />} />
          <Route path="/sirtqi" element={<Directions initialType="sirtqi" />} />
          <Route path="/magistratura" element={<Directions initialType="magistratura" />} />
          <Route path="/study" element={<Directions initialType="all" />} />

          {/* News & Events */}
          <Route path="/newsAll" element={<NewsList category="all" />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/publicNews" element={<NewsList category="public" />} />
          <Route path="/newsUnversity" element={<NewsList category="university" />} />
          <Route path="/xalqaroNews" element={<NewsList category="international" />} />
          <Route path="/elonlar" element={<Announcements />} />
          <Route path="/qqk" element={<Articles />} />
          <Route path="/qqk/:id" element={<Articles />} />

          {/* Services & Campus Life */}
          <Route path="/TTJ" element={<Dormitory />} />
          <Route path="/YPK" element={<Psychology />} />
          <Route path="/XQQ" element={<WomenCommittee />} />

          {/* Admission Form */}
          <Route path="/form" element={<AdmissionForm />} />
          <Route path="/entry" element={<AdmissionForm />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admissions" element={<AdminAdmissions />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="words" element={<AdminWords />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="directions" element={<AdminDirections />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if directly visiting admin
    if (window.location.pathname.startsWith('/admin')) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CMSProvider>
      <LanguageProvider>
        {loading ? (
          <Preloader onComplete={() => setLoading(false)} />
        ) : (
          <BrowserRouter>
            <div className="App min-h-screen bg-white text-gray-900 font-sans selection:bg-[#f56100] selection:text-white">
              <AppLayout />
            </div>
          </BrowserRouter>
        )}
      </LanguageProvider>
    </CMSProvider>
  );
}
