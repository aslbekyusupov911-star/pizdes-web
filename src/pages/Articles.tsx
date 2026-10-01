import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import { maqolalar as defaultArticles } from '../data/initialData';
import { BookOpen, User, Calendar, FileText, ArrowLeft, Download } from 'lucide-react';

export const Articles: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { leng } = useLanguage();
  const [articles, setArticles] = useState<any[]>(defaultArticles || []);

  useEffect(() => {
    fetch('https://new.utu-ranch.uz/news/maqolalar/')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) setArticles(json);
      })
      .catch(() => {});
  }, []);

  // Single article view
  if (id) {
    const article = articles.find((a) => String(a.id) === String(id)) || articles[0] || {
      id: 1,
      title: "Raqamli iqtisodiyot sharoitida boshqaruv tizimlarini optimallashtirish",
      author: "Prof. N. X. Yusupov, Dots. M. I. Rahimov",
      date: "2024-05-18",
      journal: "Ranch Ilmiy Axborotnomasi, №2 (2024)",
      abstract: "Ushbu maqolada raqamli texnologiyalar va sun'iy intellekt vositalarining korporativ boshqaruv samaradorligiga ta'siri tahlil qilingan. Xorijiy tajriba va O'zbekiston amaliyoti qiyosiy o'rganilgan."
    };

    return (
      <div className="articleDetailPage min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="mb-6">
            <Link
              to="/qqk"
              className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#f56100] gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Maqolalar ro‘yxatiga qaytish
            </Link>
          </div>

          <article className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-4">
              Ilmiy maqola
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {article.title || article.title_uz}
            </h1>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500 pb-6 mb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#f56100]" />
                {article.author || "Ranch tadqiqotchilari"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {article.date || "2024"}
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                {article.journal || "Ranch Journal"}
              </span>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
              <h3 className="font-bold text-gray-900 text-lg">Annotatsiya:</h3>
              <p>{article.abstract || article.desc_uz || "Maqolada dolzarb muammolar va ularning ilmiy-amaliy yechimlari keltirilgan."}</p>

              <div className="pt-8">
                <a
                  href="https://ranchjournal.uz"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#f56100] text-white rounded-xl text-sm font-bold shadow hover:bg-[#d95200] transition-colors"
                >
                  <Download className="w-4 h-4" /> To'liq maqolani yuklab olish (PDF)
                </a>
              </div>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    );
  }

  // Articles list
  return (
    <div className="articlesListPage min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-orange-50 text-[#f56100] text-xs font-bold rounded-full mb-3">
            Ilmiy faoliyat
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            {leng === 'uz' ? 'Ilmiy maqolalar va nashrlar' : 'Научные статьи и публикации'}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Professor-o‘qituvchilar, yosh olimlar va magistrantlarning ilmiy maqolalari
          </p>
        </div>

        <div className="space-y-4">
          {articles.map((item: any, idx: number) => {
            const title = item.title || item.title_uz || `Ilmiy maqola №${idx + 1}`;
            const author = item.author || "Mualliflar guruhi";

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f56100] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#f56100]" />
                      <span>{author}</span>
                      <span>•</span>
                      <span>ranchjournal.uz</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/qqk/${item.id || idx + 1}`}
                    className="px-4 py-2 bg-orange-50 text-[#f56100] hover:bg-[#f56100] hover:text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Batafsil
                  </Link>
                  <a
                    href="https://ranchjournal.uz"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    PDF
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Articles;
