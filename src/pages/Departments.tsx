import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { otdellar as defaultDepartments } from '../data/initialData';
import { CenterDepartment } from '../types';
import { Building2, Mail, Phone, User } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export const Departments: React.FC = () => {
  const { leng, t } = useLanguage();
  const [departments, setDepartments] = useState<CenterDepartment[]>(defaultDepartments as CenterDepartment[]);

  useEffect(() => {
    fetch('https://new.utu-ranch.uz/category/otdellar/')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) setDepartments(json);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="departmentsPage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={3} />

        <div className="mt-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              {t('centers')}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              {leng === 'uz'
                ? "Universitetning boshqaruv markazlari, o‘quv-uslubiy va ma’muriy bo‘limlari"
                : leng === 'ru'
                ? 'Центры управления, учебно-методические и административные отделы университета'
                : 'Management centers, educational and administrative departments of the university'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, idx) => {
              const name =
                (leng === 'ru' && dept.name_ru) ||
                (leng === 'en' && dept.name_en) ||
                dept.name_uz;

              const head =
                (leng === 'ru' && dept.head_ru) ||
                dept.head_uz ||
                (leng === 'uz' ? "Bo'lim boshlig'i" : 'Руководитель отдела');

              const desc =
                dept.description_uz ||
                (leng === 'uz'
                  ? "Universitet faoliyatini tashkil etish, nazorat qilish va rivojlantirishga mas'ul bo'lim."
                  : 'Отдел, отвечающий за организацию, контроль и развитие деятельности университета.');

              return (
                <ScrollReveal
                  key={dept.id}
                  animation="fade-up"
                  delay={(idx % 3) * 70}
                  className="h-full flex"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between w-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f56100] flex items-center justify-center mb-4">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {name}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#f56100]" />
                        <span className="font-medium text-gray-800">{head}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{dept.phone || "(62) 227 77 72"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{dept.email || "university@utu-ranch.uz"}</span>
                      </div>
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

export default Departments;
