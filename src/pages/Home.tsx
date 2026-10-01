import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import Footer from '../components/Footer';
import { Eye, Edit3, Image as ImageIcon } from 'lucide-react';
import { studyPills } from '../data/homeData';

export const Home: React.FC = () => {
  const { leng, t } = useLanguage();
  const { media, news, isLiveEditMode, updateMediaField } = useCMS();
  const [scrollY, setScrollY] = useState(0);
  const [isNightMode, setIsNightMode] = useState(false);

  // Scroll listener for sticky text letter highlighting & day/night
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrollY(y);
      setIsNightMode(y >= 460);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vertical letter coloring calculation matching original bundle
  // News text by language
  const newsWord = leng === 'ru' ? 'Новости' : leng === 'en' ? 'News' : 'Yangilik';
  const getNewsLetterColor = (index: number) => {
    return scrollY > 2100 + 120 * index ? '#f56100' : 'black';
  };

  // Strategic Plan text by language
  const planWord = leng === 'ru' ? 'Планы - 2030' : leng === 'en' ? 'Plans - 2030' : 'Rejalar - 2030';
  const getPlanLetterColor = (index: number) => {
    return scrollY > 4300 + 50 * index ? '#f56100' : 'white';
  };

  // Title image based on language (from CMS media)
  const titleImage =
    leng === 'uz'
      ? media.heroTitleUz
      : leng === 'ru'
      ? media.heroTitleRu
      : media.heroTitleEn;

  return (
    <>
      {/* 1. HERO BANNER */}
      <div className={`Home ${isLiveEditMode ? 'ring-2 ring-blue-400/40 relative' : ''}`}>
        {isLiveEditMode && (
          <div className="absolute top-2 left-2 z-30 bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
            Hero Bo'limi (Tahrirlash rejimi)
          </div>
        )}

        <div className="Home_title_png">
          <img
            className={leng === 'uz' || leng === 'en' ? 'imgtop' : 'imgRus'}
            src={titleImage}
            alt="Title Image"
          />
        </div>

        <div className="Home_Images">
          <div className="Home_Images_userImg">
            <img
              src={media.heroScholarPortrait}
              alt="User"
            />
          </div>

          <div
            className="Home_Images_ranchImage cursor-pointer"
            onClick={() => setIsNightMode(!isNightMode)}
            title="Bino ustiga bosing: Kunduz / Tun almashadi"
          >
            <div
              className="Home_Images_ranchImage_after"
              style={{
                opacity: isNightMode ? 0 : 1,
                transition: 'opacity 0.8s ease-in-out',
              }}
            >
              <img
                src={media.heroBuildingDay}
                alt="Building Daytime"
              />
            </div>
            <div
              className="Home_Images_ranchImage_before"
              style={{
                opacity: isNightMode ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
              }}
            >
              <img
                src={media.heroBuildingNight}
                alt="Building Nighttime"
              />
            </div>
          </div>

          <div className="Home_Images_logo">
            <img src="/static/media/logoRight1.701ec19f51fdaf1b64f2aa51fff6cf22.svg" alt="" />
            <img src="/static/media/logoRight2.a376b4835777eeeefa4553e2e4b03df1.svg" alt="" />
            <img src="/static/media/logoRight3.c7e2f6e670c9d427ebb708ce04df77df.svg" alt="" />
          </div>
        </div>

        {/* Hero Contact Bar */}
        <div className="headerContact">
          <div className="headerContact_contact">
            <div className="headerContact_contact_phone">
              <img
                src="/static/media/operatorSmail.0a224c369eb7cb76a3ed14b07f3a2efa.svg"
                alt=""
              />
              <p>(62) 227 77 72</p>
            </div>
            <div className="headerContact_contact_mIcon">
              <a
                href="https://www.instagram.com/utu_ranch?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/static/media/instagramIcon.dbcfca19fa1cfe74b003e6e76ec59e1d.svg"
                  alt="Instagram"
                />
              </a>
              <a href="https://t.me/UTU_Ranch" target="_blank" rel="noreferrer">
                <img
                  src="/static/media/telegramIcon.f78eb09486f26adfebdf7000511389ae.svg"
                  alt="Telegram"
                />
              </a>
              <a
                href="https://youtube.com/@uturanch?si=K0lmi49i4JRO74uc"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/static/media/youtubeIcon.b3d40c005cb405f5f21c0e740d08756b.svg"
                  alt="YouTube"
                />
              </a>
              <a href="mailto:university@utu-ranch.uz">
                <img
                  src="/static/media/mailIcon.a7d210a22e6d0faa77b513d18bb9115f.svg"
                  alt="Email"
                />
              </a>
            </div>
          </div>
          <div className="headerContact_line" />
        </div>
      </div>

      {/* 2. STATS SECTION ("BIZDA BOR" / "У НАС" / "WE HAVE") */}
      <div className="home_about_Con">
        <div className="home_about">
          <p className="home_about_title">{t('weHave')}</p>
          <div className="home_about_about">
            <div className="home_about_about_left">
              <img src="/static/media/logoRight1.701ec19f51fdaf1b64f2aa51fff6cf22.svg" alt="" />
              <img src="/static/media/logoRight2.a376b4835777eeeefa4553e2e4b03df1.svg" alt="" />
              <img src="/static/media/logoRight3.c7e2f6e670c9d427ebb708ce04df77df.svg" alt="" />
            </div>
            <div className="home_about_about_main">
              <div>
                <span>180</span>
                <p className="home_about_about_main_thin">{t('teachers')}</p>
              </div>
              <div>
                <span>40  </span>
                <p className="home_about_about_main_thin">{t('popularFields')}</p>
              </div>
              <div>
                <span>7 124</span>
                <p className="home_about_about_main_thin">{t('coolStudents')}</p>
              </div>
            </div>
            <div className="home_about_about_right">
              <img src="/static/media/logoRight1.701ec19f51fdaf1b64f2aa51fff6cf22.svg" alt="" />
              <img src="/static/media/logoRight2.a376b4835777eeeefa4553e2e4b03df1.svg" alt="" />
              <img src="/static/media/logoRight3.c7e2f6e670c9d427ebb708ce04df77df.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. STUDENT LIFE SWIPER CAROUSEL (FROM CMS MEDIA) */}
      <div className="homeSwiper">
        <div className="flex items-center justify-center gap-3">
          <p>{t('studentLife')}</p>
          {isLiveEditMode && (
            <Link
              to="/admin/media"
              className="text-xs bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow hover:bg-emerald-700"
            >
              <ImageIcon className="w-3 h-3" />
              <span>Rasmlarni almashtirish</span>
            </Link>
          )}
        </div>
        <div className="relative overflow-hidden w-full py-4">
          <div className="flex gap-4 animate-marquee-left">
            {media.studentPhotos.concat(media.studentPhotos).map((imgSrc, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-72 h-48 md:w-96 md:h-64 rounded-3xl overflow-hidden shadow-md bg-gray-100"
              >
                <img
                  src={imgSrc}
                  alt={`Student life ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. INSTAGRAM ANIMATED LINK */}
      <a
        className="instaLink"
        href="https://www.instagram.com/utu_ranch?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noreferrer"
      >
        <div className="instaAnimation">
          <img src="/static/media/gifInsta.16c47e8e86e4c96d9eb0.gif" alt="" />
          <img src="/static/media/instagramIcon.dbcfca19fa1cfe74b003e6e76ec59e1d.svg" alt="" />
          <p>@utu-ranch</p>
        </div>
      </a>

      {/* 5. ONLINE ADMISSION CALLOUT */}
      <div className="home_zyafka">
        <div className="home_zyafka_box">
          <div className="home_zyafka_box_rigth">
            <img src={media.admissionBannerImg} alt="" />
          </div>
          <div className="home_zyafka_box_left">
            <div className="home_zyafka_box_left_texts">
              <p>{t('onlineAdmissionTitle')}</p>
              <p>{t('onlineAdmissionPrompt')}</p>
            </div>
            <a href="https://qabul.utu-ranch.uz" target="_blank" rel="noreferrer">
              <button type="button">{t('submissionDocuments')}</button>
            </a>
          </div>
        </div>
      </div>

      {/* 6. RESOURCES */}
      <div className="resurce">
        <div className="resurce_con">
          <p className="resurce_title">{t('resources')}</p>
          <div className="resurce_boxes">
            <div className="resurce_boxes_top">
              <a
                href="https://student.utu-ranch.uz/dashboard/login"
                target="_blank"
                rel="noreferrer"
              >
                <div className="resurce_boxes_top_box">
                  <p>HEMIS</p>
                  <img
                    src="/static/media/userLogin.274ae05b0e599ce3b98a533e5d1bdd6b.svg"
                    alt=""
                    style={{ width: '4vw', transform: 'none', marginRight: '2vw' }}
                  />
                </div>
              </a>
              <a href="https://edu.utu-ranch.uz/" target="_blank" rel="noreferrer">
                <div className="resurce_boxes_top_box">
                  <p>{t('eLibrary')}</p>
                  <img
                    src="/static/media/injiner2.dcb751a808eb4b0bd251.png"
                    alt=""
                    style={{ width: '6vw', transform: 'none', marginRight: '2vw' }}
                  />
                </div>
              </a>
              <a href="https://ranchjournal.uz/" target="_blank" rel="noreferrer">
                <div className="resurce_boxes_top_box">
                  <p>
                    {leng === 'uz'
                      ? 'Universitet ilmiy elektron jurnali'
                      : leng === 'ru'
                      ? 'Научный электронный журнал'
                      : 'University scientific e-journal'}
                  </p>
                  <img
                    src="/static/media/injiner3.63b1ec45897b89f19540.png"
                    alt=""
                    style={{ width: '6vw', transform: 'none', marginRight: '2vw' }}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 7. NEWS SECTION WITH ROTATING TEXT & SCROLL-REVEAL VERTICAL LETTERS */}
      <div className="newsTop">
        <div className="newsTopTitle">
          <img
            className={
              leng === 'uz'
                ? 'uznewsimg'
                : leng === 'ru'
                ? 'runewsimg'
                : 'ennewsimg'
            }
            src={
              leng === 'uz'
                ? '/static/media/text.8cbf41b401f12532f27ff99133eb0d01.svg'
                : leng === 'ru'
                ? '/static/media/title_ru.ec167194d510877f47a4c49b607202b9.svg'
                : '/static/media/title_en.9cc83034bf050344c12764859e11cf26.svg'
            }
            alt=""
          />
          <img
            src="/static/media/Subtract.fcbe77438469d319387870e2df185242.svg"
            alt=""
          />
        </div>
      </div>

      <div className="news">
        <div className="sticky-element">
          {Array.from(newsWord).map((char, index) => (
            <span
              key={index}
              style={{
                color: getNewsLetterColor(index),
                transition: 'color 0.25s ease-out',
                display: 'inline-block',
                fontWeight: 900,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <Link to="/newsAll">
          <button type="button" className="newsBtn">
            {t('moreNews')}
          </button>
        </Link>

        <div className="news_content">
          {news.slice(0, 3).map((item) => {
            const title =
              (leng === 'ru' && item.title_ru) ||
              (leng === 'en' && item.title_en) ||
              item.title_uz;

            return (
              <div key={item.id} className="news_content_boxes">
                <Link to={`/news/${item.id}`}>
                  <img
                    src={item.image || '/static/media/news2.8d897ad50f4a5125cf2d.png'}
                    alt={title}
                  />
                </Link>
                <p className="news_content_boxes_title">{title}</p>
                <div className="news_content_boxes_footer">
                  <span>{item.created_at}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#f56100]" />
                    {item.views || 48}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. STUDY DIRECTIONS CONTINUOUS MARQUEES */}
      <div className="study">
        <p className="study_title">{t('fieldsOfStudy')}</p>
        <div className="study_btnAnim">
          {/* Line 1 - moving left */}
          <div className="study_btnAnim_line">
            {studyPills[0].concat(studyPills[0]).map((item, idx) => (
              <button key={idx} type="button">
                <img src={item.icon} alt="" />
                {item[leng]}
              </button>
            ))}
          </div>

          {/* Line 2 - moving right */}
          <div className="study_btnAnim_line_R">
            {studyPills[1].concat(studyPills[1]).map((item, idx) => (
              <button key={idx} type="button">
                <img src={item.icon} alt="" />
                {item[leng]}
              </button>
            ))}
          </div>

          {/* Line 3 - moving left */}
          <div className="study_btnAnim_line">
            {studyPills[2].concat(studyPills[2]).map((item, idx) => (
              <button key={idx} type="button">
                <img src={item.icon} alt="" />
                {item[leng]}
              </button>
            ))}
          </div>
        </div>

        <Link className="study_btnBottm" to="/kunduzgi">
          <button type="button">{t('details')}</button>
        </Link>
      </div>

      {/* 9. STRATEGIC PLANS 2030 (VIDEO & 4 STAGES) */}
      <div className="plan">
        <div className="plan_video">
          <iframe
            width="560"
            height="315"
            src={media.youtubeVideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="plan_imageUn">
          <img src="/static/media/unBg.c7af3acba4dc731d08f5c1aaba68a502.svg" alt="" />
          <img src="/static/media/BgRanchRes.953b919bf7b9f238c71dca068b0df803.svg" alt="" />
          <img src="/static/media/ranchBgDark.59de70c226698291a0cf.png" alt="" />
          <img src="/static/media/ranchRes1.67c2bb4b658dd2536538.png" alt="" />
        </div>

        <div className="plan_indfos">
          <div className="plan_indfos_boxes">
            {/* Box 01 */}
            <div className="plan_indfos_box">
              <div className="plan_indfos_box_left">
                <h1>01</h1>
                <p>{t('newCampusDevelopment')}</p>
              </div>
              <div className="plan_indfos_box_right">
                <img src={media.plan1Img} alt="" />
                <img src={media.plan2Img} alt="" />
                <img src={media.plan3Img} alt="" />
                <img src={media.plan4Img} alt="" />
              </div>
            </div>

            {/* Box 02 */}
            <div className="plan_indfos_box">
              <div className="plan_indfos_box_left">
                <h1>02</h1>
                <p>{t('sportsInfrastructure')}</p>
              </div>
              <div className="plan_indfos_box_right">
                <img src={media.plan2Img} alt="" />
                <img src={media.plan1Img} alt="" />
                <img src={media.plan3Img} alt="" />
                <img src={media.plan4Img} alt="" />
              </div>
            </div>

            {/* Box 03 */}
            <div className="plan_indfos_box">
              <div className="plan_indfos_box_left">
                <h1>03</h1>
                <p>{t('advancedTechLearning')}</p>
              </div>
              <div className="plan_indfos_box_right">
                <img src={media.plan3Img} alt="" />
                <img src={media.plan1Img} alt="" />
                <img src={media.plan2Img} alt="" />
                <img src={media.plan4Img} alt="" />
              </div>
            </div>

            {/* Box 04 */}
            <div className="plan_indfos_box">
              <div className="plan_indfos_box_left">
                <h1>04</h1>
                <p>{t('internationalCooperation')}</p>
              </div>
              <div className="plan_indfos_box_right">
                <img src={media.plan4Img} alt="" />
                <img src={media.plan1Img} alt="" />
                <img src={media.plan2Img} alt="" />
                <img src={media.plan3Img} alt="" />
              </div>
            </div>
          </div>

          <div className="plan_indfos_right">
            {Array.from(planWord).map((char, index) => (
              <span
                key={index}
                style={{
                  WebkitTextFillColor: getPlanLetterColor(index),
                  transition: 'color 0.3s ease-out',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 10. PARTNERS CAROUSEL */}
      <div className="partnor">
        <p className="partnor_title">{t('partners')}</p>
        <div className="overflow-hidden py-6">
          <div className="flex gap-8 animate-marquee-left">
            {[
              {
                title: 'Toshkent davlat iqtisodiyot universiteti',
                image: 'https://new.utu-ranch.uz/media/sliders/2024/09/Toshkent_davlat_iqtisodiyot_universiteti.jpg',
                url_link: 'https://tsue.uz/',
              },
              {
                title: 'Nizomiy nomidagi pedagogika universiteti',
                image: 'https://new.utu-ranch.uz/media/sliders/2024/09/594c396d0eb9d0244a93be543b2a9c76.jpg',
                url_link: 'https://www.tdpu.uz/',
              },
              {
                title: 'Jahon tillari universiteti',
                image: 'https://new.utu-ranch.uz/media/sliders/2024/09/favicon_ru_RU.png',
                url_link: 'https://www.uzswlu.uz/',
              },
              {
                title: 'Toshkent axborot texnologiyalari universiteti',
                image: 'https://new.utu-ranch.uz/media/sliders/2024/09/W73eM8T-hn5cLRoa_rQWKshn3eUutXvm.png',
                url_link: 'https://tuit.uz/urganch-filiali',
              },
            ]
              .concat([
                {
                  title: 'Toshkent davlat iqtisodiyot universiteti',
                  image: 'https://new.utu-ranch.uz/media/sliders/2024/09/Toshkent_davlat_iqtisodiyot_universiteti.jpg',
                  url_link: 'https://tsue.uz/',
                },
                {
                  title: 'Nizomiy nomidagi pedagogika universiteti',
                  image: 'https://new.utu-ranch.uz/media/sliders/2024/09/594c396d0eb9d0244a93be543b2a9c76.jpg',
                  url_link: 'https://www.tdpu.uz/',
                },
              ])
              .map((partner, idx) => (
                <a
                  key={idx}
                  href={partner.url_link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:scale-105 transition-transform"
                >
                  <img
                    src={partner.image}
                    alt={partner.title || 'Partner'}
                    className="h-16 w-auto object-contain max-w-[140px]"
                  />
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* 11. FOOTER WITH INTERACTIVE MAP */}
      <div className="footer">
        <div className="map">
          <div className="mapForm">
            <p className="mapForm_title">
              {leng === 'uz' ? 'Aloqa' : leng === 'ru' ? 'Связаться' : 'Contact'}
            </p>
            <a href="tel:+998622277772">
              <button type="button">
                (62) 227 77 72
              </button>
            </a>
            <a href="mailto:university@utu-ranch.uz">
              <button type="button">
                university@utu-ranch.uz
              </button>
            </a>
            <div className="mapForm_info">
              <p>
                {leng === 'uz'
                  ? 'Ish kunlari:'
                  : leng === 'ru'
                  ? 'Рабочие дни:'
                  : 'Working days:'}
              </p>
              <p>
                {leng === 'uz'
                  ? 'Dushanba - Shanba:'
                  : leng === 'ru'
                  ? 'Понедельник - Суббота:'
                  : 'Monday - Saturday:'}{' '}
                9:00 - 18:00
              </p>
              <p>
                {leng === 'uz'
                  ? 'Yakshanba: dam olish'
                  : leng === 'ru'
                  ? 'Воскресенье: Отдых'
                  : 'Sunday: Rest'}
              </p>
            </div>
          </div>

          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac563d5ce2683af91dc5c32336920c183457c2dd841d04e5d4c2e6e76d86c2e11&source=constructor"
            width="1140"
            height="600"
            frameBorder="0"
            title="Yandex Map Location"
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
