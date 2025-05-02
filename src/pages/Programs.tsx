import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import ProgramCard from '@/components/programs/ProgramCard';
import ProgramSearch from '@/components/programs/ProgramSearch';
import ProgramFilters from '@/components/programs/ProgramFilters';
import { dummyPrograms, availableCountries, Program } from '@/data/programsData';
import { useToast } from '@/hooks/use-toast';

// ترجمة أسماء الدول إلى العربية
const countryTranslations: Record<string, string> = {
  'Australia': 'أستراليا',
  'Azerbaijan': 'أذربيجان',
  'Bosnia and Herzegovina': 'البوسنة والهرسك',
  'Czech Republic': 'جمهورية التشيك',
  'Egypt': 'مصر',
  'Georgia': 'جورجيا',
  'Germany': 'ألمانيا',
  'Hungary': 'المجر',
  'Ireland': 'أيرلندا',
  'Kosovo': 'كوسوفو',
  'Macedonia': 'مقدونيا',
  'Malaysia': 'ماليزيا',
  'Malta': 'مالطا',
  'Montenegro': 'الجبل الأسود',
  'Northern Cyprus': 'شمال قبرص',
  'Poland': 'بولندا',
  'Scotland': 'اسكتلندا',
  'Serbia': 'صربيا',
  'Spain': 'إسبانيا',
  'Turkey': 'تركيا',
  'United Kingdom': 'المملكة المتحدة',
  'United States': 'الولايات المتحدة الأمريكية',
  'United Arab Emirates': 'الإمارات العربية المتحدة'
};

const Programs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>(dummyPrograms);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 12;
  
  // Filters state
  const [filters, setFilters] = useState({
    countries: [] as string[],
    levels: [] as string[],
    specialties: [] as string[],
    languages: [] as string[],
  });

  // Update filtered programs when search term or filters change
  useEffect(() => {
    let result = dummyPrograms;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        program =>
          program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply country filters
    if (filters.countries.length > 0) {
      result = result.filter(program => {
        const programCountry = program.location.split('،')[0].trim();
        return filters.countries.some(country => programCountry === country);
      });
    }
    
    // Apply level filters (this would need proper tagging in the data)
    if (filters.levels.length > 0) {
      result = result.filter(program => {
        if (program.title.includes('بكالوريوس') && filters.levels.includes('Bachelor')) return true;
        if (program.title.includes('ماجستير') && filters.levels.includes('Master')) return true;
        if (program.title.includes('دكتوراه') && filters.levels.includes('Doctorate')) return true;
        return false;
      });
    }
    
    // Apply language filters
    if (filters.languages.length > 0) {
      result = result.filter(program => 
        filters.languages.includes(program.language)
      );
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "newest":
        // In a real app, this would sort by date added
        break;
      case "priceAsc":
        result = [...result].sort((a, b) => {
          return a.discountedFee - b.discountedFee;
        });
        break;
      case "priceDesc":
        result = [...result].sort((a, b) => {
          return b.discountedFee - a.discountedFee;
        });
        break;
      case "relevance":
      default:
        // In a real app, this would use a relevance algorithm
        // For now, put featured programs first
        result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
    
    setFilteredPrograms(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // If we had a server-side search, we would fetch here
    // Instead, the filtering is handled by the useEffect above
    toast({
      title: "تم البحث",
      description: `تم البحث عن: ${searchTerm || 'جميع البرامج'}`,
    });
  };

  const toggleCountryFilter = (country: string) => {
    setFilters(prevFilters => {
      if (prevFilters.countries.includes(country)) {
        return {
          ...prevFilters,
          countries: prevFilters.countries.filter(c => c !== country)
        };
      } else {
        return {
          ...prevFilters,
          countries: [...prevFilters.countries, country]
        };
      }
    });
  };

  const toggleLevelFilter = (level: string) => {
    setFilters(prevFilters => {
      if (prevFilters.levels.includes(level)) {
        return {
          ...prevFilters,
          levels: prevFilters.levels.filter(l => l !== level)
        };
      } else {
        return {
          ...prevFilters,
          levels: [...prevFilters.levels, level]
        };
      }
    });
  };

  const toggleSpecialtyFilter = (specialty: string) => {
    setFilters(prevFilters => {
      if (prevFilters.specialties.includes(specialty)) {
        return {
          ...prevFilters,
          specialties: prevFilters.specialties.filter(s => s !== specialty)
        };
      } else {
        return {
          ...prevFilters,
          specialties: [...prevFilters.specialties, specialty]
        };
      }
    });
  };

  const toggleLanguageFilter = (language: string) => {
    setFilters(prevFilters => {
      if (prevFilters.languages.includes(language)) {
        return {
          ...prevFilters,
          languages: prevFilters.languages.filter(l => l !== language)
        };
      } else {
        return {
          ...prevFilters,
          languages: [...prevFilters.languages, language]
        };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      countries: [],
      levels: [],
      specialties: [],
      languages: [],
    });
    setSearchTerm('');
    setSelectedCountry("");
    setSelectedDegree("");
    setSelectedSpecialty("");
    setSortOrder("relevance");
    
    toast({
      title: "تم إعادة ضبط التصفية",
      description: "تم مسح جميع عوامل التصفية والبحث",
    });
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    if (value && value !== "all") {
      setFilters(prev => ({
        ...prev,
        countries: [value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        countries: []
      }));
    }
  };

  const handleDegreeChange = (value: string) => {
    setSelectedDegree(value);
    if (value && value !== "all") {
      setFilters(prev => ({
        ...prev,
        levels: [value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        levels: []
      }));
    }
  };

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
    if (value && value !== "all") {
      setFilters(prev => ({
        ...prev,
        specialties: [value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        specialties: []
      }));
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    
    toast({
      title: "تم تغيير الترتيب",
      description: `تم ترتيب البرامج حسب: ${e.target.options[e.target.selectedIndex].text}`,
    });
  };

  // حساب الصفحات
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  // التنقل بين الصفحات
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ترجمة البلد من الإنجليزية إلى العربية
  const translateCountry = (country: string): string => {
    // استخراج اسم البلد من السلسلة النصية (مثال: "Turkey، إسطنبول")
    const countryName = country.split('،')[0].trim();
    return countryTranslations[countryName] || countryName;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="البرامج الدراسية"
          subtitle="استكشف مئات البرامج الدراسية في أفضل الجامعات العالمية"
        />

        {/* Search Component */}
        <ProgramSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCountry={selectedCountry}
          setSelectedCountry={handleCountryChange}
          selectedDegree={selectedDegree}
          setSelectedDegree={handleDegreeChange}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={handleSpecialtyChange}
          handleSearch={handleSearch}
          resetFilters={resetFilters}
          countryTranslations={countryTranslations}
        />

        {/* Results info and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-unlimited-gray">
              تم العثور على <span className="font-semibold text-unlimited-blue">{filteredPrograms.length}</span> برنامج دراسي
            </p>
            <ProgramFilters 
              filters={filters}
              toggleCountryFilter={toggleCountryFilter}
              toggleLevelFilter={toggleLevelFilter}
              toggleSpecialtyFilter={toggleSpecialtyFilter}
              toggleLanguageFilter={toggleLanguageFilter}
              resetFilters={resetFilters}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-unlimited-gray" />
            <span className="text-unlimited-gray">ترتيب حسب:</span>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-md text-unlimited-gray focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="relevance">الأكثر صلة</option>
              <option value="newest">الأحدث</option>
              <option value="priceAsc">السعر: من الأقل للأعلى</option>
              <option value="priceDesc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Programs Grid */}
        {currentPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPrograms.map((program) => (
              <ProgramCard 
                key={program.id} 
                program={program as any} // Use type assertion to avoid type errors
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على برامج تطابق بحثك</p>
            <Button onClick={resetFilters} className="bg-unlimited-blue hover:bg-unlimited-dark-blue">إعادة ضبط البحث</Button>
          </div>
        )}

        {/* Pagination */}
        {filteredPrograms.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button 
                variant="pagination" 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // إذا كان عدد الصفحات أكثر من 5، نعرض الصفحات المحيطة بالصفحة الحالية
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else {
                  if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                }
                
                return (
                  <Button 
                    key={pageNum}
                    variant="pagination"
                    aria-current={pageNum === currentPage ? "page" : undefined}
                    onClick={() => paginate(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button 
                variant="pagination" 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Programs;
