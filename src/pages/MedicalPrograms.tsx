
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { useTranslation } from 'react-i18next';
import ProgramSearch from '@/components/programs/ProgramSearch';
import ProgramsGrid from '@/components/programs/ProgramsGrid';
import ProgramFilters, { LegacyFilters } from '@/components/programs/ProgramFilters';
import { ProgramInfo, convertToProgramInfo } from '@/data/programsData';
import { useToast } from '@/hooks/use-toast';

const MedicalPrograms: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<ProgramInfo[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<LegacyFilters>({
    country: '',
    university: '',
    degree: '',
    language: '',
    fee: [0, 100000],
    hasScholarship: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate API call to fetch programs
  useEffect(() => {
    const fetchData = async () => {
      // Mock data for medical programs
      const medicalPrograms = [
        {
          id: 201,
          name: "Medicine",
          name_ar: "الطب البشري",
          university: "Ankara University",
          university_id: 6,
          degree_type: "Bachelor",
          duration: 6,
          tuition_fee: 12000,
          language: "English",
          country: "Turkey",
          city: "Ankara",
          is_popular: true,
          has_scholarship: true,
          description: "Complete medical training program including clinical practice.",
          university_image: "/images/universities/ankara-university.jpg"
        },
        {
          id: 202,
          name: "Dentistry",
          name_ar: "طب الأسنان",
          university: "Istanbul University",
          university_id: 7,
          degree_type: "Bachelor",
          duration: 5,
          tuition_fee: 10500,
          language: "English",
          country: "Turkey",
          city: "Istanbul",
          is_popular: true,
          has_scholarship: false,
          description: "Comprehensive dental education with clinical training.",
          university_image: "/images/universities/istanbul-university.jpg"
        },
        {
          id: 203,
          name: "Pharmacy",
          name_ar: "الصيدلة",
          university: "Hacettepe University",
          university_id: 8,
          degree_type: "Bachelor",
          duration: 5,
          tuition_fee: 9000,
          language: "English",
          country: "Turkey",
          city: "Ankara",
          is_popular: false,
          has_scholarship: true,
          description: "Study pharmaceutical sciences and medication management.",
          university_image: "/images/universities/hacettepe-university.jpg"
        },
        {
          id: 204,
          name: "Nursing",
          name_ar: "التمريض",
          university: "Ege University",
          university_id: 9,
          degree_type: "Bachelor",
          duration: 4,
          tuition_fee: 7000,
          language: "Turkish",
          country: "Turkey",
          city: "Izmir",
          is_popular: false,
          has_scholarship: true,
          description: "Comprehensive nursing education with clinical practice.",
          university_image: "/images/universities/ege-university.jpg"
        },
        {
          id: 205,
          name: "Physical Therapy",
          name_ar: "العلاج الطبيعي",
          university: "Gazi University",
          university_id: 10,
          degree_type: "Bachelor",
          duration: 4,
          tuition_fee: 8000,
          language: "English",
          country: "Turkey",
          city: "Ankara",
          is_popular: false,
          has_scholarship: false,
          description: "Learn rehabilitation techniques and patient care.",
          university_image: "/images/universities/gazi-university.jpg"
        }
      ];

      // Convert to ProgramInfo format
      const medicalProgramsFormatted = medicalPrograms.map(program => convertToProgramInfo(program));
      
      setTimeout(() => {
        setPrograms(medicalProgramsFormatted);
        setFilteredPrograms(medicalProgramsFormatted);
        setIsLoading(false);
      }, 1000); // Simulate loading delay
    };

    fetchData();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = [...programs];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (program) =>
          program.name?.toLowerCase().includes(query) ||
          program.university.toLowerCase().includes(query) ||
          program.description?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.country) {
      result = result.filter((program) => program.country === filters.country);
    }
    if (filters.university) {
      result = result.filter((program) => program.university === filters.university);
    }
    if (filters.degree) {
      result = result.filter((program) => program.degree_type === filters.degree);
    }
    if (filters.language) {
      result = result.filter((program) => {
        if (Array.isArray(program.language)) {
          return program.language.includes(filters.language);
        }
        return program.language === filters.language;
      });
    }
    
    if (filters.hasScholarship) {
      result = result.filter((program) => program.has_scholarship === true);
    }

    // Apply fee range filter
    result = result.filter(
      (program) =>
        (program.tuition_fee || 0) >= filters.fee[0] &&
        (program.tuition_fee || 0) <= filters.fee[1]
    );

    setFilteredPrograms(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters, programs]);

  // Handle pagination
  const programsPerPage = 6;
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  const currentPrograms = filteredPrograms.slice(
    (currentPage - 1) * programsPerPage,
    currentPage * programsPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم البحث",
      description: `تم البحث عن: ${searchQuery || 'جميع البرامج الطبية'}`,
    });
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{t('medicalPrograms.title', 'البرامج الطبية')} | Unlimited Doors</title>
        <meta name="description" content={t('medicalPrograms.metaDescription', 'استكشف البرامج الطبية المتاحة في أفضل الجامعات')} />
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-unlimited-dark-blue mb-2">
            {t('medicalPrograms.title', 'البرامج الطبية')}
          </h1>
          <p className="text-unlimited-gray max-w-2xl mx-auto">
            {t('medicalPrograms.subtitle', 'استكشف مجموعة واسعة من البرامج الطبية في أفضل الجامعات التركية')}
          </p>
        </div>

        <div className="mb-8">
          <ProgramSearch
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            placeholder={t('medicalPrograms.searchPlaceholder', 'ابحث عن برنامج طبي...')}
            handleSearch={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProgramFilters 
              filters={filters} 
              setFilters={setFilters} 
            />
          </div>

          <div className="lg:col-span-3">
            <ProgramsGrid
              programs={currentPrograms}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
              onResetFilters={() => {
                setFilters({
                  country: '',
                  university: '',
                  degree: '',
                  language: '',
                  fee: [0, 100000],
                  hasScholarship: false,
                });
                setSearchQuery('');
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MedicalPrograms;
