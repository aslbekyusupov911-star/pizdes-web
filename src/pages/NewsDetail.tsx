import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import Footer from '../components/Footer';
import { yangiliklar as defaultNewsObj } from '../data/initialData';
import { NewsItem } from '../types';
import { newsApi } from '../services/api';
import { Calendar, Eye, ArrowLeft, Share2 } from 'lucide-react';

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { leng, t } = useLanguage();
  const { news } = useCMS();
  const allArticles: NewsItem[] = (defaultNewsObj as any)?.results || [];
  const [article, setArticle] = useState<NewsItem | null>(null);

  useEffect(() => {
    // 1. Check in CMS news
    const cmsFound = news.find((a) => String(a.id) === String(id));
    if (cmsFound) {
      setArticle(cmsFound);
      return;
    }

    // 2. Check in fallback default articles
    const defaultFound = allArticles.find((a) => String(a.id) === String(id));
    if (defaultFound) setArticle(defaultFound);

    // 3. Fetch from FastAPI backend
    if (id) {
      newsApi.getById(Number(id))
        .then((item) => {
          if (item) setArticle(item);
        })
        .catch(() => {});
    }
  }, [id, news]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Yangilik yuklanmoqda...</p>
      </div>
    );
  }

  const title =
    (leng === 'ru' && article.title_ru) ||
    (leng === 'en' && article.title_en) ||
    article.title_uz;

  const content =
    (leng === 'ru' && article.content_ru) ||
    (leng === 'en' && article.content_en) ||
    article.content_uz ||
    article.desc_uz ||
    "Urganch Ranch Texnologiya Universitetida yangi loyihalar va o'quv dasturlari muvaffaqiyatli amalga oshirilmoqda. Talabalarimiz xalqaro standartlar asosida ta'lim olib, amaliy ko'nikmalarini oshirmoqdalar.";

  return (
    <div className="newsDetailPage min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/newsAll"
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#f56100] gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {leng === 'uz' ? 'Barcha yangiliklarga qaytish' : 'Назад ко всем новостям'}
          </Link>
        </div>

        <article className="bg-white rounded-3xl p-6 md:p-12 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <Calendar className="w-4 h-4 text-[#f56100]" />
                {article.created_at}
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <Eye className="w-4 h-4 text-[#f56100]" />
                {article.views || 108} ko'rishlar
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Havola nusxalandi!");
                }
              }}
              className="inline-flex items-center gap-1 text-gray-500 hover:text-[#f56100] transition-colors"
              title="Ulashish"
            >
              <Share2 className="w-4 h-4" />
              <span>Ulashish</span>
            </button>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {title}
          </h1>

          <div className="rounded-2xl overflow-hidden shadow-lg mb-8 bg-gray-100">
            <img
              src={article.image || '/static/media/news2.8d897ad50f4a5125cf2d.png'}
              alt={title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Related news */}
          <div className="mt-14 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {leng === 'uz' ? 'Mavzuga oid boshqa yangiliklar' : 'Другие новости'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {allArticles
                .filter((a) => String(a.id) !== String(article.id))
                .slice(0, 2)
                .map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/news/${rel.id}`}
                    className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#f56100] transition-colors flex gap-4 items-center group"
                  >
                    <img
                      src={rel.image}
                      alt=""
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <span className="text-xs text-gray-400">{rel.created_at}</span>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#f56100] line-clamp-2 mt-0.5">
                        {rel.title_uz}
                      </h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;
