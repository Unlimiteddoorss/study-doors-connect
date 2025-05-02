
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import UniversityHeader from '@/components/universities/UniversityHeader';
import UniversityPrograms from '@/components/universities/UniversityPrograms';
import { turkishUniversities } from '@/data/programsData';
import { getUniversityPrograms } from '@/data/universityPrograms';

const BahcesehirUniversity = () => {
  const universityId = 8; // ID for Bahcesehir University
  const university = turkishUniversities.find(u => u.id === universityId);
  const programs = getUniversityPrograms(universityId);

  if (!university) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-unlimited-gray mb-4">لم يتم العثور على معلومات الجامعة</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <SectionTitle
          title={university.nameAr || university.name}
          subtitle="استكشف البرامج والتخصصات المتاحة في جامعة باهتشه شهير"
        />

        {/* University Header */}
        <UniversityHeader university={university} />

        {/* University Programs */}
        <UniversityPrograms 
          programs={programs}
          universityId={universityId}
          universityName={university.nameAr || university.name}
        />
      </div>
    </MainLayout>
  );
};

export default BahcesehirUniversity;
