import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { leng, setLeng, t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<number>(0);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(0);
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/newsAll?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const changeLanguage = (l: Language) => {
    setLeng(l);
    setLangOpen(false);
  };

  const langNames: Record<Language, string> = {
    uz: "O‘zbekcha",
    ru: "Русский",
    en: "English"
  };

  return (
    <nav
      ref={navRef}
      className={`nav sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white'
      }`}
    >
      <div className="nav_left">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <img
            src="/static/media/ranchLogo.1eb0c0349fd7f8618d6e6e26e7a8a161.svg"
            alt="UTU Ranch Logo"
            className="hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="nav_right">
        <div className="menu_drops">
          {/* Universitet */}
          <div className="menu_drop relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown !== 1 ? 1 : 0)}
              className="menu_drop_btn1"
              type="button"
            >
              <p>{t('university')}</p>
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === 1 ? 'rotate-180 text-[#f56100]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 1 && (
                <motion.div
                  className="menu_panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link to="/about" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('about')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/department" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('departments')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/departments" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('centers')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/rektorat" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('rectorate')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/rules" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('rules')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/rulesEtika" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('ethics')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/regulation" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('charter')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/tashkiliytuzilmasi" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('structure')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/qoidalar" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('documents')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/Vacancies" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('vacancies')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/newsAll" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('news')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>

                  {/* Submenu for public services */}
                  <div
                    className="submenu_parent relative"
                    onMouseEnter={() => setIsSubmenuOpen(true)}
                    onMouseLeave={() => setIsSubmenuOpen(false)}
                  >
                    <button type="button" className="flex justify-between items-center w-full">
                      <p>{t('publicServices')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {isSubmenuOpen && (
                      <div className="submenu_right">
                        <Link to="/TTJ" onClick={() => { setActiveDropdown(0); setIsSubmenuOpen(false); }}>
                          <button type="button">
                            <p>{t('dormitoryTTJ')}</p>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                        <Link to="/XQQ" onClick={() => { setActiveDropdown(0); setIsSubmenuOpen(false); }}>
                          <button type="button">
                            <p>{t('womenCommittee')}</p>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                        <Link to="/YPK" onClick={() => { setActiveDropdown(0); setIsSubmenuOpen(false); }}>
                          <button type="button">
                            <p>{t('youngPsychClub')}</p>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Abituriyent */}
          <div className="menu_drop relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown !== 2 ? 2 : 0)}
              className="menu_drop_btn1"
              type="button"
            >
              <p>{t('abutrient')}</p>
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === 2 ? 'rotate-180 text-[#f56100]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 2 && (
                <motion.div
                  className="menu_panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link to="/kunduzgi" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('fullTime')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/sirtqi" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('correspondence')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/form" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('onlineAdmission')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Magistratura */}
          <div className="menu_drop relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown !== 3 ? 3 : 0)}
              className="menu_drop_btn1"
              type="button"
            >
              <p>{t('master')}</p>
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === 3 ? 'rotate-180 text-[#f56100]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 3 && (
                <motion.div
                  className="menu_panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link to="/magistratura" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('master')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc-46WYp8t2Q2IWAZSd19tW_hJigel2FhzFIdX2pFdxkA-FGQ/viewform?usp=header"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>
                        {leng === 'uz'
                          ? 'Magistratura uchun so‘rovnoma'
                          : leng === 'ru'
                          ? 'Опросник для магистратуры'
                          : "Survey for Master's degree"}
                      </p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resurslar */}
          <div className="menu_drop relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown !== 4 ? 4 : 0)}
              className="menu_drop_btn1"
              type="button"
            >
              <p>{t('resources')}</p>
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === 4 ? 'rotate-180 text-[#f56100]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 4 && (
                <motion.div
                  className="menu_panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <a
                    href="https://edu.utu-ranch.uz"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>{t('library')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                  <a
                    href="https://ranchjournal.uz"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>{t('jurnal')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* E'lonlar */}
          <div className="menu_drop relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown !== 5 ? 5 : 0)}
              className="menu_drop_btn1"
              type="button"
            >
              <p>{t('announcements')}</p>
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === 5 ? 'rotate-180 text-[#f56100]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 5 && (
                <motion.div
                  className="menu_panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <a
                    href="https://tdkongre.com/en/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>{t('conference')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                  <Link to="/elonlar" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('announcements')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/qqk" onClick={() => setActiveDropdown(0)}>
                    <button type="button">
                      <p>{t('articles')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Xalqaro hamkorlik */}
          <div className="menu_drop relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown !== 6 ? 6 : 0)}
              className="menu_drop_btn1"
              type="button"
            >
              <p>{t('international')}</p>
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === 6 ? 'rotate-180 text-[#f56100]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 6 && (
                <motion.div
                  className="menu_panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <a
                    href="https://international.utu-ranch.uz/mobility"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>{t('international')}</p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* So'rovnomalar */}
          <div className="menu_drop relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown !== 7 ? 7 : 0)}
              className="menu_drop_btn1"
              type="button"
            >
              <p>{t('surveys')}</p>
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === 7 ? 'rotate-180 text-[#f56100]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 7 && (
                <motion.div
                  className="menu_panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSflIDfeD-tyQ70reZTWFnoY7Ne-za3sy7RvMdlUnk50EbVFow/viewform?usp=header"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>
                        {leng === 'uz'
                          ? 'Iqtisodiyot fakulteti'
                          : leng === 'ru'
                          ? 'Факультет экономики'
                          : 'Economics Faculty'}
                      </p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdM9_vEUyRSfzkxx1mu117XZjcBKLh86rI2qE51AkMcEjlK_Q/viewform?usp=header"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>
                        {leng === 'uz'
                          ? 'Pedagogika va filologiya fakulteti'
                          : leng === 'ru'
                          ? 'Факультет педагогики и филологии'
                          : 'Faculty of Pedagogy and Philology'}
                      </p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScnVUuIE-ugnp2qJQDiKoIRpxPNgd1VNeZfANgzt5LC8LXS-w/viewform?usp=header"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>
                        {leng === 'uz'
                          ? 'Innovatsion texnologiyalar fakulteti'
                          : leng === 'ru'
                          ? 'Факультет инновационных технологий'
                          : 'Faculty of Innovative Technologies'}
                      </p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/1wEC8lwRm7Dajeh4Vtz5RUB8Nv4vRmdkWBuUMeJKb5AI/edit?pli=1"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>
                        {leng === 'uz'
                          ? 'Tibbiyot fanlari fakulteti 1'
                          : leng === 'ru'
                          ? 'Факультет медицинских наук 1'
                          : 'Faculty of Medical Sciences 1'}
                      </p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfn5FON1hghOofpZ-XVoVBnpN4wuszp48BriY0YSX0VUhdxSQ/viewform?usp=header"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(0)}
                  >
                    <button type="button">
                      <p>
                        {leng === 'uz'
                          ? 'Tibbiyot fanlari fakulteti 2'
                          : leng === 'ru'
                          ? 'Факультет медицинских наук 2'
                          : 'Faculty of Medical Sciences 2'}
                      </p>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search button & Animated Popup */}
        <div className="search relative">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            title="Qidiruv / Search"
            className="hover:scale-110 transition-transform"
          >
            <Search className="w-5 h-5 text-gray-700 hover:text-[#f56100] transition-colors" />
          </button>
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                className="absolute right-0 top-12 bg-white rounded-2xl shadow-2xl p-3 border border-gray-100 flex items-center gap-2 z-50 min-w-[300px]"
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
              >
                <form onSubmit={handleSearchSubmit} className="flex items-center w-full gap-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={
                      leng === 'uz'
                        ? "Sayt bo'yicha qidirish..."
                        : leng === 'ru'
                        ? "Поиск по сайту..."
                        : "Search site..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-sm outline-none px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#f56100]"
                  />
                  <button type="submit" className="text-[#f56100] hover:scale-110 p-1.5 transition-transform">
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language selector */}
        <div className="langugeSelect relative">
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 hover:text-[#f56100] transition-colors"
          >
            <p>{langNames[leng]}</p>
            <ChevronDown
              className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${
                langOpen ? 'rotate-180 text-[#f56100]' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                className="langugeSelect_menu"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <button type="button" onClick={() => changeLanguage('uz')}>
                  O‘zbekcha
                  <img src="/static/media/uzFlag.0b9d6fe9c18854556b04.png" alt="Uzbek" />
                </button>
                <button type="button" onClick={() => changeLanguage('ru')}>
                  Русский
                  <img src="/static/media/ruFlag.143e2d2b10c45cd59e9e.png" alt="Russian" />
                </button>
                <button type="button" onClick={() => changeLanguage('en')}>
                  English
                  <img src="/static/media/en.3d7971231eaae8092c45.png" alt="English" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Login Button (Hemis Student Cabinet) */}
        <a
          href="https://student.utu-ranch.uz/dashboard/login"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button" className="login hover:scale-105 transition-transform">
            <p>{t('login')}</p>
            <div>
              <img
                src="/static/media/userLogin.274ae05b0e599ce3b98a533e5d1bdd6b.svg"
                alt="User Icon"
              />
            </div>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Header;
