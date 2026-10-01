import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, X, ExternalLink } from 'lucide-react';

export const RightPanels: React.FC = () => {
  const { leng, t } = useLanguage();
  const [studentOpen, setStudentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStudentOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeAll = () => {
    setStudentOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay when any drawer is open */}
      {(studentOpen || menuOpen) && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeAll}
        />
      )}

      <div className="rightMenu z-50">
        {/* Student Drawer */}
        <div
          className="rightMenuStudent"
          style={{
            transform: studentOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 50,
          }}
        >
          {/* Student Trigger Tab */}
          <button
            type="button"
            onClick={() => {
              setStudentOpen(true);
              setMenuOpen(false);
            }}
            className={`studentTriggerBtn transition-transform duration-300 hover:scale-105 ${menuOpen ? 'noneBtn' : ''}`}
            style={{
              position: 'absolute',
              left: '-140px',
              top: '160px',
              display: studentOpen ? 'none' : 'flex',
            }}
          >
            <img
              src="/static/media/userLogin.274ae05b0e599ce3b98a533e5d1bdd6b.svg"
              alt="Students"
              className="w-5 h-5 mr-1"
            />
            <span>
              {leng === 'uz' ? 'Talabalar' : leng === 'ru' ? 'Студенты' : 'Students'}
            </span>
          </button>

          <div className="rightMenuStudent_menu">
            <div className="rightMenuStudent_menu_info">
              <div className="rightMenuStudent_menu_info_left">
                <h1>{t('loginToAccess')}</h1>
                <p className="text-xs text-gray-500 mb-4">
                  Dars jadvallari, baholar va fan dasturlari uchun HEMIS talaba kabinetiga kiring.
                </p>
                <a
                  href="https://student.utu-ranch.uz/dashboard/login"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  <button type="button" className="hover:scale-105 transition-transform">
                    {t('login')}
                    <ExternalLink className="w-4 h-4 ml-1 inline" />
                  </button>
                </a>
              </div>
              <div className="rightMenuStudent_menu_info_right">
                <img
                  src="/static/media/userHomeHeader.3f13b181bf59ecdb5223fac8947e577d.svg"
                  alt="Student Illustration"
                  className="animate-float"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStudentOpen(false)}
              className="rightMenuCloseBtn hover:scale-110 transition-transform"
              title="Yopish / Close"
            >
              <img
                src="/static/media/nazad.ecf4ae5079aa235ea01d3b29f3246904.svg"
                alt="Back"
              />
              <span className="flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </span>
            </button>
          </div>
        </div>

        {/* Main Hamburger Navigation Drawer */}
        <div
          className="rightMenuMenu"
          style={{
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 50,
          }}
        >
          {/* Menu Trigger Tab */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(true);
              setStudentOpen(false);
            }}
            className={`menuTriggerBtn transition-transform duration-300 hover:scale-105 ${studentOpen ? 'noneBtn' : ''}`}
            style={{
              position: 'absolute',
              left: '-120px',
              top: '230px',
              display: menuOpen ? 'none' : 'flex',
            }}
          >
            <img
              src="/static/media/menu.28b3dc9fb33e9e39bf4c687c996d97bd.svg"
              alt="Menu"
              className="w-5 h-5 mr-1"
            />
            <span>
              {leng === 'uz' ? 'Menyu' : leng === 'ru' ? 'Меню' : 'Menu'}
            </span>
          </button>

          <div className="rightMenuMenu_menu">
            <Link to="/" onClick={closeAll}>
              <img
                src="/static/media/ranchLogo.1eb0c0349fd7f8618d6e6e26e7a8a161.svg"
                alt="Ranch logo"
                className="w-28 mb-6 hover:scale-105 transition-transform"
              />
            </Link>

            <div className="rightMenuMenu_menu_menus">
              {/* News */}
              <ul>
                <span>{t('news')}</span>
                <Link to="/newsAll" onClick={closeAll}>
                  <li>{t('news')}</li>
                </Link>
                <Link to="/publicNews" onClick={closeAll}>
                  <li>{t('publicEvents')}</li>
                </Link>
                <Link to="/newsUnversity" onClick={closeAll}>
                  <li>{t('university')}</li>
                </Link>
                <Link to="/xalqaroNews" onClick={closeAll}>
                  <li>{t('internationalRelations')}</li>
                </Link>
              </ul>

              {/* University */}
              <ul>
                <span>{t('university')}</span>
                <Link to="/about" onClick={closeAll}>
                  <li>{t('about')}</li>
                </Link>
                <Link to="/department" onClick={closeAll}>
                  <li>{t('departments')}</li>
                </Link>
                <Link to="/departments" onClick={closeAll}>
                  <li>{t('centers')}</li>
                </Link>
                <Link to="/rektorat" onClick={closeAll}>
                  <li>{t('rectorate')}</li>
                </Link>
                <Link to="/rules" onClick={closeAll}>
                  <li>{t('rules')}</li>
                </Link>
                <Link to="/rulesEtika" onClick={closeAll}>
                  <li>{t('ethics')}</li>
                </Link>
                <Link to="/regulation" onClick={closeAll}>
                  <li>{t('charter')}</li>
                </Link>
                <Link to="/tashkiliytuzilmasi" onClick={closeAll}>
                  <li>{t('structure')}</li>
                </Link>
                <Link to="/qoidalar" onClick={closeAll}>
                  <li>{t('documents')}</li>
                </Link>
                <Link to="/Vacancies" onClick={closeAll}>
                  <li>{t('vacancies')}</li>
                </Link>
                <Link to="/TTJ" onClick={closeAll}>
                  <li>{t('dormitoryTTJ')}</li>
                </Link>
                <Link to="/YPK" onClick={closeAll}>
                  <li>{t('youngPsychClub')}</li>
                </Link>
                <Link to="/XQQ" onClick={closeAll}>
                  <li>{t('womenCommittee')}</li>
                </Link>
              </ul>

              {/* Abituriyent */}
              <ul>
                <span>{t('abutrient')}</span>
                <Link to="/kunduzgi" onClick={closeAll}>
                  <li>{t('fullTime')}</li>
                </Link>
                <Link to="/sirtqi" onClick={closeAll}>
                  <li>{t('correspondence')}</li>
                </Link>
                <Link to="/form" onClick={closeAll}>
                  <li>{t('onlineAdmission')}</li>
                </Link>
              </ul>

              {/* HEMIS */}
              <ul>
                <span>HEMIS</span>
                <a
                  href="https://student.utu-ranch.uz"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeAll}
                >
                  <li>HEMIS Talaba portali</li>
                </a>
              </ul>

              {/* Magistratura */}
              <ul>
                <span>{t('master')}</span>
                <Link to="/magistratura" onClick={closeAll}>
                  <li>{t('master')}</li>
                </Link>
              </ul>

              {/* Resources */}
              <ul>
                <span>{t('resources')}</span>
                <a
                  href="https://edu.utu-ranch.uz/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeAll}
                >
                  <li>{t('library')}</li>
                </a>
                <a
                  href="https://ranchjournal.uz/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeAll}
                >
                  <li>{t('jurnal')}</li>
                </a>
              </ul>

              {/* Announcements */}
              <ul>
                <span>{t('announcements')}</span>
                <Link to="/elonlar" onClick={closeAll}>
                  <li>{t('announcements')}</li>
                </Link>
                <Link to="/qqk" onClick={closeAll}>
                  <li>{t('articles')}</li>
                </Link>
              </ul>
            </div>

            <button
              type="button"
              onClick={closeAll}
              className="rightMenuCloseBtn hover:scale-110 transition-transform"
              title="Yopish / Close"
            >
              <img
                src="/static/media/nazad.ecf4ae5079aa235ea01d3b29f3246904.svg"
                alt="Back"
              />
              <span className="flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightPanels;
