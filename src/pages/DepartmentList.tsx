import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { kafedrashu as defaultFaculties } from '../data/initialData';
import { FacultyDepartment } from '../types';
import { GraduationCap, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export const DepartmentList: React.FC = () => {
  const { leng, t } = useLanguage();
  const [faculties, setFaculties] = useState<FacultyDepartment[]>(defaultFaculties as unknown as FacultyDepartment[]);

  useEffect(() => {
    fetch('https://new.utu-ranch.uz/category/kafedrashu/')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) setFaculties(json);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="departmentsPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={2} />

        <div className="mt-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              {t('departments')}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              {leng === 'uz'
                ? "Ranch Texnologiya Universitetining ta'lim beruvchi kafedralari va fakultetlari"
                : leng === 'ru'
                ? 'Кафедры и факультеты Технологического университета Ранч'
                : 'Faculties and departments of Ranch Technology University'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculties.map((fac, idx) => {
              const name =
                (leng === 'ru' && fac.name_ru) ||
                (leng === 'en' && fac.name_en) ||
                fac.name_uz;

              const desc =
                (leng === 'ru' && fac.description_ru) ||
                (leng === 'en' && fac.description_en) ||
                fac.description_uz ||
                (leng === 'uz'
                  ? "Zamonaviy o'quv dasturlari va malakali o'qituvchilar tarkibiga ega kafedra."
                  : 'Факультет с современными учебными планами и опытными педагогами.');

              return (
                <ScrollReveal
                  key={fac.id}
                  animation="fade-up"
                  delay={(idx % 3) * 80}
                  className="h-full flex"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col justify-between w-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f56100] flex items-center justify-center mb-5">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">
                        ID: #{fac.id}
                      </span>
                      <Link
                        to={`/department/${fac.id}`}
                        className="inline-flex items-center text-sm font-bold text-[#f56100] hover:text-[#d45200] gap-1 group"
                      >
                        {t('details')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DepartmentList;
