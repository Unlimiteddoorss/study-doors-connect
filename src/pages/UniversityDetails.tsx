
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import { turkishUniversities, University } from '@/data/programsData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find the university by ID
  const university: University | undefined = turkishUniversities.find(
    (uni) => uni.id === Number(id)
  );

  if (!university) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <p>{t('universityDetails.notFound')}</p>
        </div>
      </MainLayout>
    );
  }

  const handleApplyNow = () => {
    // Navigate to the apply page with university ID as a parameter
    navigate(`/apply?university=${university.id}`);
    
    toast({
      title: t('universityDetails.applyStarted'),
      description: t('universityDetails.applyStartedDesc', { university: university.name }),
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/universities" className="inline-flex items-center mb-4">
          <ArrowLeft className="mr-2" />
          {t('universityDetails.backToUniversities')}
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={university.image || 'https://via.placeholder.com/400'}
              alt={university.name}
              className="rounded-lg shadow-md"
            />
            <h1 className="text-3xl font-bold mt-4">{university.name}</h1>
            {university.nameAr && <h2 className="text-2xl mt-2">{university.nameAr}</h2>}
            <p className="text-gray-600 mt-2">
              {i18n.language === 'ar'
                ? `${university.city}, ${university.country}`
                : `${university.city}, ${university.country}`}
            </p>
            {university.website && (
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {university.website}
              </a>
            )}
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">{t('universityDetails.overview')}</div>
            <p>{university.description || t('universityDetails.noDescription')}</p>

            <div className="mt-4">
              <div className="text-sm text-gray-600">
                {i18n.language === 'ar'
                  ? `النوع: ${university.type}`
                  : `Type: ${university.type}`}
              </div>
              <div className="text-sm text-gray-600">
                {i18n.language === 'ar'
                  ? `سنة التأسيس: ${university.founded}`
                  : `Founded: ${university.founded}`}
              </div>
              <div className="text-sm text-gray-600">
                {i18n.language === 'ar'
                  ? `عدد الطلاب: ${university.students}`
                  : `Students: ${university.students}`}
              </div>
              <div className="text-sm text-gray-600">
                {i18n.language === 'ar'
                  ? `الترتيب: ${university.ranking}`
                  : `Ranking: ${university.ranking}`}
              </div>
              {university.localRanking && (
                <div className="text-sm text-gray-600">
                  {i18n.language === 'ar'
                    ? `الترتيب المحلي: ${university.localRanking}`
                    : `Local Ranking: ${university.localRanking}`}
                </div>
              )}
              <div className="text-sm text-gray-600">
                {i18n.language === 'ar'
                  ? `الرسوم: ${university.fees}`
                  : `Fees: ${university.fees}`}
              </div>
              {(university.accreditation || (university.accreditations && university.accreditations.length > 0)) && (
                <div className="text-sm text-gray-600">
                  {i18n.language === 'ar'
                    ? `الاعتمادات: ${university.accreditation || university.accreditations?.join(', ')}`
                    : `Accreditations: ${university.accreditation || university.accreditations?.join(', ')}`}
                </div>
              )}
              <div className="text-sm text-gray-600">
                {i18n.language === 'ar'
                  ? `اللغات: ${university.languages?.join(', ') || 'غير محدد'}`
                  : `Languages: ${university.languages?.join(', ') || 'Not specified'}`}
              </div>
            </div>

            <Button 
              onClick={handleApplyNow}
              className="mt-6 bg-unlimited-blue hover:bg-unlimited-dark-blue text-white"
            >
              {t('universityDetails.applyNow')}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UniversityDetails;
