
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import ProgramSearch from '@/components/programs/ProgramSearch';
import ProgramsGrid from '@/components/programs/ProgramsGrid';
import { SlidersHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dummyPrograms } from '@/data/programsData';
import { Program } from '@/types';

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
const engineeringPrograms: Program[] = dummyPrograms
  .filter(program => 
    program.title && program.title.includes('هندسة')
  )
  .concat([
    {
      id: "201",
      name: "بكالوريوس الهندسة المدنية",
      title: "بكالوريوس الهندسة المدنية",
      university: "جامعة اسطنبول التقنية",
      universityId: "u201",
      location: "Turkey، إسطنبول",
      language: "إنجليزية",
      duration: "4 سنوات",
      deadline: "30/08/2023",
      tuitionFee: "$5,200 / سنة",
      fee: "$5,200 / سنة",
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      country: "Turkey",
      city: "إسطنبول"
    },
    {
      id: "202",
      name: "بكالوريوس هندسة البرمجيات",
      title: "بكالوريوس هندسة البرمجيات",
      university: "جامعة الشرق الأوسط التقنية",
      universityId: "u202",
      location: "Turkey، أنقرة",
      language: "إنجليزية",
      duration: "4 سنوات",
      deadline: "15/08/2023",
      tuitionFee: "$4,800 / سنة",
      fee: "$4,200 / سنة",
      discount: 15,
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      country: "Turkey",
      city: "أنقرة"
    },
    {
      id: "203",
      name: "بكالوريوس الهندسة الميكانيكية",
      title: "بكالوريوس الهندسة الميكانيكية",
      university: "جامعة إسطنبول بيلجي",
      universityId: "u203",
      location: "Turkey، إسطنبول",
      language: "إنجليزية",
      duration: "4 سنوات",
      deadline: "10/09/2023",
      tuitionFee: "$5,500 / سنة",
      fee: "$5,500 / سنة",
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      country: "Turkey",
      city: "إسطنبول"
    },
    {
      id: "204",
      name: "بكالوريوس الهندسة الكهربائية",
      title: "بكالوريوس الهندسة الكهربائية",
      university: "جامعة يلدز التقنية",
      universityId: "u204",
      location: "Turkey، إسطنبول",
      language: "تركية وإنجليزية",
      duration: "4 سنوات",
      deadline: "05/08/2023",
      tuitionFee: "$4,900 / سنة",
      fee: "$4,500 / سنة",
      discount: 10,
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      country: "Turkey",
      city: "إسطنبول"
    },
    {
      id: "205",
      name: "ماجستير هندسة الإلكترونيات",
      title: "ماجستير هندسة الإلكترونيات",
      university: "جامعة غازي",
      universityId: "u205",
      location: "Turkey، أنقرة",
      language: "إنجليزية",
      duration: "2 سنوات",
      deadline: "20/08/2023",
      tuitionFee: "$6,800 / سنة",
      fee: "$6,800 / سنة",
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      country: "Turkey",
      city: "أنقرة"
    },
    {
      id: "206",
      name: "بكالوريوس هندسة الطيران",
      title: "بكالوريوس هندسة الطيران",
      university: "جامعة اسطنبول التقنية",
      universityId: "u201",
      location: "Turkey، إسطنبول",
      language: "إنجليزية",
      duration: "4 سنوات",
      deadline: "01/09/2023",
      tuitionFee: "$7,200 / سنة",
      fee: "$7,200 / سنة",
      currency: "USD",
      imageUrl: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      country: "Turkey",
      city: "إسطنبول"
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
  
  // Update filtered programs when search term or filters change
  useEffect(() => {
    let result = engineeringPrograms;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        program =>
          program.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply country filter
    if (selectedCountry && selectedCountry !== "all") {
      result = result.filter(program => {
        const programCountry = program.location.split('،')[0].trim();
        return programCountry === selectedCountry;
      });
    }
    
    // Apply degree filter
    if (selectedDegree && selectedDegree !== "all") {
      result = result.filter(program => {
        if (program.title?.includes('بكالوريوس') && selectedDegree === 'Bachelor') return true;
        if (program.title?.includes('ماجستير') && selectedDegree === 'Master') return true;
        if (program.title?.includes('دكتوراه') && selectedDegree === 'Doctorate') return true;
        return false;
      });
    }
    
    // Apply specialty filter
    if (selectedSpecialty && selectedSpecialty !== "all") {
      result = result.filter(program => {
        switch(selectedSpecialty) {
          case "Civil":
            return program.title?.includes('مدنية');
          case "Computer":
            return program.title?.includes('برمجيات') || program.title?.includes('حاسوب');
          case "Mechanical":
            return program.title?.includes('ميكانيكية');
          case "Electrical":
            return program.title?.includes('كهربائية');
          case "Electronics":
            return program.title?.includes('إلكترونيات');
          case "Aerospace":
            return program.title?.includes('طيران');
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
          const priceA = parseFloat((a.discount ? a.fee : a.tuitionFee).toString().replace('$', '').replace(',', '').split(' ')[0]);
          const priceB = parseFloat((b.discount ? b.fee : b.tuitionFee).toString().replace('$', '').replace(',', '').split(' ')[0]);
          return priceA - priceB;
        });
        break;
      case "priceDesc":
        result = [...result].sort((a, b) => {
          const priceA = parseFloat((a.discount ? a.fee : a.tuitionFee).toString().replace('$', '').replace(',', '').split(' ')[0]);
          const priceB = parseFloat((b.discount ? b.fee : b.tuitionFee).toString().replace('$', '').replace(',', '').split(' ')[0]);
          return priceB - priceA;
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
          handleSearch={handleSearch}
          resetFilters={resetFilters}
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
        <ProgramsGrid 
          programs={currentPrograms}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          onResetFilters={resetFilters}
        />
      </div>
    </MainLayout>
  );
};

export default EngineeringPrograms;
