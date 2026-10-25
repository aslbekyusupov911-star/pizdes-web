import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import TabsHeader from '../components/TabsHeader';
import { universityTabs } from '../data/navigationTabs';
import Footer from '../components/Footer';
import { rektorot as defaultRectorate } from '../data/initialData';
import { RectorateMember } from '../types';
import { Calendar, Mail, Phone, Award } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export const Rectorate: React.FC = () => {
  const { leng, t } = useLanguage();
  const { staff } = useCMS();
  const members = (staff && staff.length > 0) ? (staff as unknown as RectorateMember[]) : (defaultRectorate as unknown as RectorateMember[]);

  return (
    <div className="rectoratePage min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TabsHeader buttons={universityTabs} activeButton={4} />

        <div className="mt-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              {t('rectorate')}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              {leng === 'uz'
                ? "Urganch Ranch Texnologiya Universiteti rahbariyati va rektorat a'zolari"
                : leng === 'ru'
                ? 'Руководство и члены ректората Ургенчского Технологического Университета Ранч'
                : 'Leadership and rectorate members of Urgench Ranch Technology University'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, idx) => {
              const name =
                (leng === 'ru' && member.name_ru) ||
                (leng === 'en' && member.name_en) ||
                member.name_uz;

              const position =
                (leng === 'ru' && (member.lavozim_ru || member.position_ru)) ||
                (leng === 'en' && (member.lavozim_en || member.position_en)) ||
                member.lavozim_uz ||
                member.position_uz ||
                "Rektorat a'zosi";

              const reception =
                (leng === 'ru' && member.uchrashuv_vaqti_ru) ||
                (leng === 'en' && member.uchrashuv_vaqti_en) ||
                member.uchrashuv_vaqti_uz ||
                member.reception_days_uz ||
                (leng === 'uz' ? "Dushanba - Juma: 14:00 - 17:00" : 'Понедельник - Пятница: 14:00 - 17:00');

              const phone = member.phone || member.cantact || "(62) 227 77 72";
              const email = member.email || "rectorat@utu-ranch.uz";

              return (
                <ScrollReveal
                  key={member.id}
                  animation="fade-up"
                  delay={(idx % 3) * 90}
                  className="h-full flex"
                >
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col w-full">
                    <div className="h-72 w-full bg-gray-100 overflow-hidden relative">
                      <img
                        src={member.image || '/static/media/psixolog.e3d4d6908e9fd3e303de.jpg'}
                        alt={name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="inline-block px-2.5 py-0.5 bg-[#f56100] text-xs font-bold rounded-full mb-1">
                          {position}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {name}
                        </h3>
                        {member.degree_uz && (
                          <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
                            <Award className="w-3.5 h-3.5 text-[#f56100]" />
                            {member.degree_uz}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#f56100] flex-shrink-0" />
                          <span>{reception}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{member.phone || "(62) 227 77 72"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{member.email || "rectorat@utu-ranch.uz"}</span>
                        </div>
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

export default Rectorate;
