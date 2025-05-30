import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import ProgramCard from '@/components/programs/ProgramCard';
import ProgramsGrid from '@/components/programs/ProgramsGrid';
import ProgramSearch from '@/components/programs/ProgramSearch';
import ProgramFilters, { ProgramFiltersValues } from '@/components/programs/ProgramFilters';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/shared/ModeToggle';
import { Search, SlidersHorizontal } from 'lucide-react';
import { dummyPrograms, availableCountries, convertToProgramInfo, ProgramInfo } from '@/data/programsData';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import ProgramSEO from '@/components/seo/ProgramSEO';

// Define a type for the filter toggle function
type FilterToggleFunction = (filterValue: string) => void;

const Programs = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedDegree, setSelectedDegree] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [filteredPrograms, setFilteredPrograms] = useState(dummyPrograms);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State for advanced filters
  const [advancedFilters, setAdvancedFilters] = useState<ProgramFiltersValues>({
    search: '',
    country: [],
    degreeType: [],
    language: [],
    duration: [1, 6],
    tuitionRange: [0, 50000],
    hasScholarship: false,
    isPopular: false,
  });

  // Function to handle advanced filter application
  const handleApplyFilters = (filters: ProgramFiltersValues) => {
    setAdvancedFilters(filters);
  };

  // Toggle functions for advanced filters
  const toggleCountryFilter: FilterToggleFunction = (country: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      country: prev.country.includes(country)
        ? prev.country.filter(c => c !== country)
        : [...prev.country, country],
    }));
  };

  const toggleLevelFilter: FilterToggleFunction = (level: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      degreeType: prev.degreeType.includes(level)
        ? prev.degreeType.filter(l => l !== level)
        : [...prev.degreeType, level],
    }));
  };

  const toggleSpecialtyFilter: FilterToggleFunction = (specialty: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      // Assuming you want to store specialties in some state, modify accordingly
      // Example: specialty: prev.specialty.includes(specialty) ? prev.specialty.filter(s => s !== specialty) : [...prev.specialty, specialty],
    }));
  };

  const toggleLanguageFilter: FilterToggleFunction = (language: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      language: prev.language.includes(language)
        ? prev.language.filter(l => l !== language)
        : [...prev.language, language],
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم البحث",
      description: `تم البحث عن: ${searchTerm || 'جميع البرامج'}`,
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCountry('all');
    setSelectedDegree('all');
    setSelectedSpecialty('all');
    setAdvancedFilters({
      search: '',
      country: [],
      degreeType: [],
      language: [],
      duration: [1, 6],
      tuitionRange: [0, 50000],
      hasScholarship: false,
      isPopular: false,
    });
    toast({
      title: "تم إعادة ضبط التصفية",
      description: "تم مسح جميع عوامل التصفية والبحث",
    });
  };

  useEffect(() => {
    setIsLoading(true);
    let results = [...dummyPrograms];

    // Apply search filter
    if (searchTerm) {
      results = results.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply country filter
    if (selectedCountry !== 'all') {
      results = results.filter(program => program.country.includes(selectedCountry));
    }

    // Apply degree filter
    if (selectedDegree !== 'all') {
      results = results.filter(program => selectedDegree === 'Bachelor' ? program.name.toLowerCase().includes('bachelor') : program.name.toLowerCase().includes(selectedDegree.toLowerCase()));
    }

    // Apply specialty filter
    if (selectedSpecialty !== 'all') {
      results = results.filter(program => program.name.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    }

    // Apply advanced filters
    if (advancedFilters.search) {
      results = results.filter(program =>
        program.name.toLowerCase().includes(advancedFilters.search.toLowerCase()) ||
        program.university.toLowerCase().includes(advancedFilters.search.toLowerCase())
      );
    }

    if (advancedFilters.country.length > 0) {
      results = results.filter(program => advancedFilters.country.some(country => program.country.includes(country)));
    }

    if (advancedFilters.degreeType.length > 0) {
      results = results.filter(program => advancedFilters.degreeType.some(degree => program.name.toLowerCase().includes(degree.toLowerCase())));
    }

    if (advancedFilters.language.length > 0) {
      results = results.filter(program => {
        if (Array.isArray(program.language)) {
          return program.language.some(lang => advancedFilters.language.includes(lang));
        }
        return advancedFilters.language.includes(program.language);
      });
    }

    results = results.filter(program => {
      const duration = typeof program.duration === 'number'
        ? program.duration
        : typeof program.duration === 'string'
          ? parseInt(program.duration)
          : 0;
      return duration >= advancedFilters.duration[0] && duration <= advancedFilters.duration[1];
    });

    results = results.filter(program => {
      const fee = typeof program.tuition_fee === 'number'
        ? program.tuition_fee
        : 0;
      return fee >= advancedFilters.tuitionRange[0] && fee <= advancedFilters.tuitionRange[1];
    });

    if (advancedFilters.hasScholarship) {
      results = results.filter(program => program.has_scholarship);
    }

    if (advancedFilters.isPopular) {
      results = results.filter(program => program.is_popular);
    }

    setFilteredPrograms(results);
    setIsLoading(false);
  }, [searchTerm, selectedCountry, selectedDegree, selectedSpecialty, advancedFilters]);

  // Convert Legacy Program type to ProgramInfo type for rendering
  const programsToDisplay = filteredPrograms
    .map(program => convertToProgramInfo(program));

  return (
    <MainLayout>
      <ProgramSEO
        title="برامج الجامعات - ابحث عن برنامجك المثالي"
        description="تصفح مجموعتنا الواسعة من البرامج الأكاديمية للعثور على البرنامج الذي يناسب اهتماماتك وأهدافك المهنية. اكتشف البرامج والجامعات الرائدة اليوم."
        keywords={["برامج جامعية", "بحث عن برنامج", "برامج أكاديمية", "دراسة جامعية", "تعليم عالي"]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <SectionTitle
            title="البرامج الدراسية"
            subtitle="استكشف مجموعة واسعة من البرامج الأكاديمية من أفضل الجامعات."
          />
          <ModeToggle />
        </div>

        {isMobile ? (
          <>
            <Button onClick={() => setIsFilterOpen(true)} className="mb-4">
              <SlidersHorizontal className="w-4 h-4 ml-2" />
              {isFilterOpen ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
            </Button>

            {isFilterOpen && (
              <ProgramFilters
                onApplyFilters={handleApplyFilters}
                countries={availableCountries}
                languages={['English', 'Arabic', 'Turkish']}
                initialFilters={advancedFilters}
                className="mb-8"
                isMobileFilterOpen={isFilterOpen}
                onCloseMobileFilter={() => setIsFilterOpen(false)}
                filters={{
                  countries: [],
                  levels: [],
                  specialties: [],
                  languages: []
                }}
                toggleCountryFilter={toggleCountryFilter}
                toggleLevelFilter={toggleLevelFilter}
                toggleSpecialtyFilter={toggleSpecialtyFilter}
                toggleLanguageFilter={toggleLanguageFilter}
                resetFilters={resetFilters}
              />
            )}

            <ProgramSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedDegree={selectedDegree}
              setSelectedDegree={setSelectedDegree}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={setSelectedSpecialty}
              handleSearch={handleSearch}
              resetFilters={resetFilters}
            />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProgramFilters
                onApplyFilters={handleApplyFilters}
                countries={availableCountries}
                languages={['English', 'Arabic', 'Turkish']}
                initialFilters={advancedFilters}
                className="mb-8"
                filters={{
                  countries: [],
                  levels: [],
                  specialties: [],
                  languages: []
                }}
                toggleCountryFilter={toggleCountryFilter}
                toggleLevelFilter={toggleLevelFilter}
                toggleSpecialtyFilter={toggleSpecialtyFilter}
                toggleLanguageFilter={toggleLanguageFilter}
                resetFilters={resetFilters}
              />
            </div>
            <div className="md:col-span-3">
              <ProgramSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedDegree={selectedDegree}
                setSelectedDegree={setSelectedDegree}
                selectedSpecialty={selectedSpecialty}
                setSelectedSpecialty={setSelectedSpecialty}
                handleSearch={handleSearch}
                resetFilters={resetFilters}
              />
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-48 w-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ProgramsGrid
                  programs={programsToDisplay}
                  currentPage={1}
                  totalPages={1}
                  onPageChange={() => {}}
                  isLoading={isLoading}
                  onResetFilters={resetFilters}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Programs;
