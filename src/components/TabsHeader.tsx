import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

export interface TabButton {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
  link: string;
}

export const TabsHeader: React.FC<{
  buttons: TabButton[];
  activeButton: number;
  setActiveButton?: (id: number) => void;
}> = ({ buttons, activeButton, setActiveButton }) => {
  const { leng } = useLanguage();

  const getLabel = (btn: TabButton, l: Language) => {
    if (l === 'ru') return btn.name_ru || btn.name_uz;
    if (l === 'en') return btn.name_en || btn.name_uz;
    return btn.name_uz;
  };

  return (
    <div className="btnHeader">
      {buttons.map((btn) => (
        <Link key={btn.id} to={btn.link}>
          <button
            type="button"
            className={activeButton === btn.id ? 'active' : ''}
            onClick={() => setActiveButton && setActiveButton(btn.id)}
          >
            {getLabel(btn, leng)}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default TabsHeader;
