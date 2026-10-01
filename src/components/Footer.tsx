import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { leng, t } = useLanguage();

  return (
    <footer id="footer">
      <div className="footerCon">
        <Link to="/">
          <img
            src="/static/media/ranchLogo.1eb0c0349fd7f8618d6e6e26e7a8a161.svg"
            alt="Ranch logo"
            className="footer-logo"
          />
        </Link>

        {/* Universitet */}
        <div>
          <h1 className="footer_h1_menu">{t('university')}</h1>
          <ul className="footerUl">
            <Link to="/about">
              <li>{t('about')}</li>
            </Link>
            <Link to="/department">
              <li>{t('departments')}</li>
            </Link>
            <Link to="/departments">
              <li>{t('centers')}</li>
            </Link>
            <Link to="/rektorat">
              <li>{t('rectorate')}</li>
            </Link>
            <Link to="/rules">
              <li>{t('rules')}</li>
            </Link>
            <Link to="/rulesEtika">
              <li>{t('ethics')}</li>
            </Link>
            <Link to="/regulation">
              <li>{t('charter')}</li>
            </Link>
          </ul>
        </div>

        {/* Yangiliklar */}
        <div>
          <h1 className="footer_h1_menu">{t('news')}</h1>
          <ul className="footerUl">
            <Link to="/newsAll">
              <li>{t('news')}</li>
            </Link>
            <Link to="/publicNews">
              <li>{t('publicEvents')}</li>
            </Link>
            <Link to="/newsUnversity">
              <li>{t('university')}</li>
            </Link>
            <Link to="/xalqaroNews">
              <li>{t('internationalRelations')}</li>
            </Link>
          </ul>
        </div>

        {/* Abituriyent */}
        <div>
          <h1 className="footer_h1_menu">{t('abutrient')}</h1>
          <ul className="footerUl">
            <Link to="/kunduzgi">
              <li>{t('fullTime')}</li>
            </Link>
            <Link to="/sirtqi">
              <li>{t('correspondence')}</li>
            </Link>
            <a href="https://qabul.utu-ranch.uz" target="_blank" rel="noreferrer">
              <li>{t('onlineAdmission')}</li>
            </a>
          </ul>
        </div>

        {/* Resurslar */}
        <div>
          <h1 className="footer_h1_menu">{t('resources')}</h1>
          <ul className="footerUl">
            <a href="https://edu.utu-ranch.uz/" target="_blank" rel="noreferrer">
              <li>{t('library')}</li>
            </a>
            <a href="https://ranchjournal.uz/" target="_blank" rel="noreferrer">
              <li>
                {leng === 'uz'
                  ? 'Universitet ilmiy elektron jurnali'
                  : leng === 'ru'
                  ? 'Научный электронный журнал университета'
                  : 'University scientific e-journal'}
              </li>
            </a>
          </ul>
        </div>

        {/* E'lonlar */}
        <div>
          <h1 className="footer_h1_menu">
            {leng === 'uz' ? "E'lonlar" : leng === 'ru' ? 'Объявления' : 'Announcements'}
          </h1>
          <ul className="footerUl">
            <Link to="/elonlar">
              <li>
                {leng === 'uz' ? "E'lonlar" : leng === 'ru' ? 'Объявления' : 'Announcements'}
              </li>
            </Link>
            <Link to="/qqk">
              <li>{leng === 'uz' ? 'Maqolalar' : leng === 'ru' ? 'Статьи' : 'Articles'}</li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="fixpost">
        <div className="footer-store-links">
          <div className="btnApp">
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/static/media/googleplay.87e01868cd80867980b8f31254fd6ad0.svg"
                alt="Google Play Store"
                className="store-link"
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/static/media/applestore.a00c0b7d931d4072ee7686271ee3adaa.svg"
                alt="Apple App Store"
                className="store-link"
              />
            </a>
          </div>

          <div className="store-links2">
            <a href="tel:+998622277772" title="Telefon">
              <img
                src="/static/media/phoneNumber.024c92b2d1a3de52be80d59286145403.svg"
                alt="Phone number"
              />
            </a>
            <a
              href="https://www.instagram.com/utu_ranch/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              <img
                src="/static/media/instaFooter.41646793cda3580fb7070d23d4480f28.svg"
                alt="Instagram"
              />
            </a>
            <a
              href="https://t.me/UTU_Ranch"
              target="_blank"
              rel="noreferrer"
              title="Telegram"
            >
              <img
                src="/static/media/telegramFooter.f06ede36c583007019468485e692116d.svg"
                alt="Telegram"
              />
            </a>
            <a
              href="https://www.youtube.com/@uturanch"
              target="_blank"
              rel="noreferrer"
              title="YouTube"
            >
              <img
                src="/static/media/youtubeFooter.50d228eb99191d741034dfdb5bffbd63.svg"
                alt="YouTube"
              />
            </a>
            <a
              href="mailto:university@utu-ranch.uz"
              title="Email"
            >
              <img
                src="/static/media/mailIcon.a7d210a22e6d0faa77b513d18bb9115f.svg"
                alt="Email"
              />
            </a>
          </div>
        </div>

        <hr id="hrborder" />

        <div className="py-4 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} UTU Ranch — Ranch Texnologiya Universiteti. Barcha huquqlar himoyalangan.</p>
          <Link
            to="/admin"
            className="text-gray-400 hover:text-[#f56100] transition-colors font-medium flex items-center gap-1"
          >
            <span>Boshqaruv (Admin)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
