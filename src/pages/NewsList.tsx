import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import TabsHeader from '../components/TabsHeader';
import { newsTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { yangiliklar as defaultNewsObj } from '../data/initialData';
import { NewsItem } from '../types';
import { Eye, Calendar, Search } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface NewsListProps {
  category?: 'all' | 'public' | 'university' | 'international';
}

export const NewsList: React.FC<NewsListProps> = ({ category = 'all' }) => {
  const { leng, t } = useLanguage();
  const { news } = useCMS();
  const [searchParams] = useSearchParams();
  const searchParamQuery = searchParams.get('search') || '';

  const initialArticles: NewsItem[] = (defaultNewsObj as any)?.results || [];
  const articlesList = (news && news.length > 0) ? news : initialArticles;
  const [searchTerm, setSearchTerm] = useState(searchParamQuery);

  const getActiveTab = () => {
    if (category === 'public') return 2;
    if (category === 'university') return 3;
    if (category === 'international') return 4;
    return 1;
  };

  const filtered = articlesList.filter((item) => {
    if (category !== 'all' && item.category && item.category !== category) {
      return false;
    }
    const q = searchTerm.toLowerCase();
    const title = (item.title_uz || item.title_ru || item.title_en || '').toLowerCase();
    const desc = (item.desc_uz || item.desc_ru || item.desc_en || '').toLowerCase();
    return title.includes(q) || desc.includes(q);
  });

  return (
    <div className="newsListPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={newsTabs} activeButton={getActiveTab()} />

        <div className="mt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {getActiveTab() === 1
                ? t('news')
                : getActiveTab() === 2
                ? t('publicEvents')
                : getActiveTab() === 3
                ? t('university')
                : t('internationalRelations')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Universitet hayotiga doir eng so‘nggi yangiliklar va voqealar
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={leng === 'uz' ? "Yangiliklarni qidirish..." : "Поиск новостей..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f56100] transition-colors shadow-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => {
            const title =
              (leng === 'ru' && item.title_ru) ||
              (leng === 'en' && item.title_en) ||
              item.title_uz;

            const desc =
              (leng === 'ru' && item.desc_ru) ||
              (leng === 'en' && item.desc_en) ||
              item.desc_uz ||
              "Urganch Ranch Texnologiya Universiteti rasmiy xabari.";

            return (
              <ScrollReveal
                key={item.id}
                animation="fade-up"
                delay={(idx % 3) * 100}
                className="h-full flex"
              >
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group w-full">
                  <div>
                    <div className="h-56 overflow-hidden bg-gray-100 relative">
                      <Link to={`/news/${item.id}`}>
                        <img
                          src={item.image || '/static/media/news2.8d897ad50f4a5125cf2d.png'}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#f56100]" />
                          {item.created_at}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-gray-400" />
                          {item.views || 64}
                        </span>
                      </div>

                      <Link to={`/news/${item.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#f56100] transition-colors line-clamp-2 mb-2 leading-snug">
                          {title}
                        </h3>
                      </Link>

                      <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to={`/news/${item.id}`}
                      className="inline-block text-xs font-bold text-[#f56100] hover:text-[#d95200]"
                    >
                      {t('details')} →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsList;
