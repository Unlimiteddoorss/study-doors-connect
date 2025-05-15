
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import ProgramSearch from '@/components/programs/ProgramSearch';
import ProgramsGrid from '@/components/programs/ProgramsGrid';
import { SlidersHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dummyPrograms, ProgramInfo, convertToProgramInfo } from '@/data/programsData';

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

// Create engineering programs data
const engineeringPrograms = dummyPrograms
  .filter(program => 
    (program.name && (program.name.includes('هندسة') || program.name.includes('Engineering')))
  )
  .concat([
    {
      id: 201,
      name: "بكالوريوس الهندسة المدنية",
      university: "جامعة اسطنبول التقنية",
      country: "Turkey",
      city: "إسطنبول",
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 5200,
      language: "إنجليزية",
      is_popular: true,
      has_scholarship: false,
      description: "برنامج شامل يغطي تصميم وبناء الهياكل المدنية.",
      university_image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 202,
      name: "بكالوريوس هندسة البرمجيات",
      university: "جامعة الشرق الأوسط التقنية",
      country: "Turkey",
      city: "أنقرة",
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 4800,
      language: "إنجليزية",
      is_popular: false,
      has_scholarship: true,
      description: "برنامج متميز في هندسة البرمجيات وتطوير النظم.",
      university_image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 203,
      name: "بكالوريوس الهندسة الميكانيكية",
      university: "جامعة إسطنبول بيلجي",
      country: "Turkey",
      city: "إسطنبول",
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 5500,
      language: "إنجليزية",
      is_popular: false,
      has_scholarship: true,
      description: "دراسة مبادئ الميكانيكا والديناميكا وعلوم المواد.",
      university_image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 204,
      name: "بكالوريوس الهندسة الكهربائية",
      university: "جامعة يلدز التقنية",
      country: "Turkey",
      city: "إسطنبول",
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 4900,
      language: "تركية وإنجليزية",
      is_popular: false,
      has_scholarship: false,
      description: "برنامج متكامل في الهندسة الكهربائية والإلكترونية.",
      university_image: "https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 205,
      name: "ماجستير هندسة الإلكترونيات",
      university: "جامعة غazi",
      country: "Turkey",
      city: "أنقرة",
      degree_type: "Master",
      duration: 2,
      tuition_fee: 6800,
      language: "إنجليزية",
      is_popular: true,
      has_scholarship: true,
      description: "دراسات متقدمة في الإلكترونيات والدوائر المتكاملة.",
      university_image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 206,
      name: "بكالوريوس هندسة الطيران",
      university: "جامعة اسطنبول التقنية",
      country: "Turkey",
      city: "إسطنبول",
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 7200,
      language: "إنجليزية",
      is_popular: false,
      has_scholarship: true,
      description: "دراسة تصميم وتطوير المركبات الجوية والفضائية.",
      university_image: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]);

const EngineeringPrograms = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState(engineeringPrograms);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 9;
  
  // Convert Legacy Program type to ProgramInfo type for rendering
  const programsToDisplay = filteredPrograms
    .map(program => convertToProgramInfo(program));

  // Update filtered programs when search term or filters change
  useEffect(() => {
    let result = engineeringPrograms;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        program =>
          (program.name && program.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          program.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply country filter
    if (selectedCountry && selectedCountry !== "all") {
      result = result.filter(program => {
        return program.country === selectedCountry;
      });
    }
    
    // Apply degree filter
    if (selectedDegree && selectedDegree !== "all") {
      result = result.filter(program => {
        if (program.name && program.name.includes('بكالوريوس') && selectedDegree === 'Bachelor') return true;
        if (program.name && program.name.includes('ماجستير') && selectedDegree === 'Master') return true;
        if (program.name && program.name.includes('دكتوراه') && selectedDegree === 'Doctorate') return true;
        return false;
      });
    }
    
    // Apply specialty filter
    if (selectedSpecialty && selectedSpecialty !== "all") {
      result = result.filter(program => {
        if (!program.name) return false;
        switch(selectedSpecialty) {
          case "Civil":
            return program.name.includes('مدنية');
          case "Computer":
            return program.name.includes('برمجيات') || program.name.includes('حاسوب');
          case "Mechanical":
            return program.name.includes('ميكانيكية');
          case "Electrical":
            return program.name.includes('كهربائية');
          case "Electronics":
            return program.name.includes('إلكترونيات');
          case "Aerospace":
            return program.name.includes('طيران');
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "newest":
        // In a real app, this would sort by date added
        break;
      case "priceAsc":
        result = [...result].sort((a, b) => {
          const priceA = a.tuition_fee || 0;
          const priceB = b.tuition_fee || 0;
          return priceA - priceB;
        });
        break;
      case "priceDesc":
        result = [...result].sort((a, b) => {
          const priceA = a.tuition_fee || 0;
          const priceB = b.tuition_fee || 0;
          return priceB - priceA;
        });
        break;
      case "relevance":
      default:
        // In a real app, this would use a relevance algorithm
        // For now, put featured programs first
        result = [...result].sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0));
        break;
    }
    
    setFilteredPrograms(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCountry, selectedDegree, selectedSpecialty, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم البحث",
      description: `تم البحث عن: ${searchTerm || 'جميع برامج الهندسة'}`,
    });
  };

  const resetFilters = () => {
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

  // Add Engineering Specialties
  const engineeringSpecialties = [
    { value: "Civil", label: "الهندسة المدنية" },
    { value: "Computer", label: "هندسة الحاسوب والبرمجيات" },
    { value: "Mechanical", label: "الهندسة الميكانيكية" },
    { value: "Electrical", label: "الهندسة الكهربائية" },
    { value: "Electronics", label: "هندسة الإلكترونيات" },
    { value: "Aerospace", label: "هندسة الطيران" }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="برامج الهندسة"
          subtitle="استكشف أفضل برامج الهندسة بمختلف تخصصاتها في أرقى الجامعات العالمية"
        />

        {/* Search Component */}
        <ProgramSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedDegree={selectedDegree}
          setSelectedDegree={setSelectedDegree}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          handleSearch={(e) => e.preventDefault()}
          resetFilters={() => {
            setSearchTerm('');
            setSelectedCountry("");
            setSelectedDegree("");
            setSelectedSpecialty("");
            setSortOrder("relevance");
            
            toast({
              title: "تم إعادة ضبط التصفية",
              description: "تم مسح جميع عوامل التصفية والبحث",
            });
          }}
          countryTranslations={countryTranslations}
        />

        {/* Results info and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-unlimited-gray">
              تم العثور على <span className="font-semibold text-unlimited-blue">{filteredPrograms.length}</span> برنامج هندسي
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-unlimited-gray" />
            <span className="text-unlimited-gray">ترتيب حسب:</span>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-md text-unlimited-gray focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                
                toast({
                  title: "تم تغيير الترتيب",
                  description: `تم ترتيب البرامج حسب: ${e.target.options[e.target.selectedIndex].text}`,
                });
              }}
            >
              <option value="relevance">الأكثر صلة</option>
              <option value="newest">الأحدث</option>
              <option value="priceAsc">السعر: من الأقل للأعلى</option>
              <option value="priceDesc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Programs Grid */}
        <ProgramsGrid 
          programs={programsToDisplay}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPrograms.length / programsPerPage)}
          onPageChange={(pageNumber) => {
            if (pageNumber > 0 && pageNumber <= Math.ceil(filteredPrograms.length / programsPerPage)) {
              setCurrentPage(pageNumber);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onResetFilters={() => {
            setSearchTerm('');
            setSelectedCountry("");
            setSelectedDegree("");
            setSelectedSpecialty("");
            setSortOrder("relevance");
            
            toast({
              title: "تم إعادة ضبط التصفية",
              description: "تم مسح جميع عوامل التصفية والبحث",
            });
          }}
        />
      </div>
    </MainLayout>
  );
};

export default EngineeringPrograms;
