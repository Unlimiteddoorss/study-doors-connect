
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

// Create medical programs data
const medicalPrograms = dummyPrograms
  .filter(program => 
    program.name.includes('طب') || 
    program.name.includes('صيدلة') || 
    program.name.includes('طبي') ||
    program.name.includes('تمريض') ||
    program.name.includes('Medicine') ||
    program.name.includes('Pharmacy') ||
    program.name.includes('Medical') ||
    program.name.includes('Nursing')
  )
  .concat([
    {
      id: 101,
      title: "بكالوريوس الطب والجراحة - MBBS",
      university: "جامعة إسطنبول",
      location: "Turkey، إسطنبول",
      language: "إنجليزية",
      duration: "6 سنوات",
      deadline: "15/08/2023",
      fee: "$8,500 / سنة",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      scholarshipAvailable: true,
      badges: ["برنامج معتمد", "تدريب عملي"]
    },
    {
      id: 102,
      title: "بكالوريوس طب الأسنان",
      university: "جامعة أنقرة",
      location: "Turkey، أنقرة",
      language: "تركية",
      duration: "5 سنوات",
      deadline: "30/07/2023",
      fee: "$7,500 / سنة",
      discount: "$6,800 / سنة",
      image: "https://images.unsplash.com/photo-1588776814546-daab30f0477e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["منهج حديث", "معامل متطورة"]
    },
    {
      id: 103,
      title: "بكالوريوس الصيدلة",
      university: "جامعة إزمير",
      location: "Turkey، إزمير",
      language: "إنجليزية وتركية",
      duration: "5 سنوات",
      deadline: "10/09/2023",
      fee: "$5,200 / سنة",
      image: "https://images.unsplash.com/photo-1585435557343-3b348b7a7cef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["تدريب مهني", "برنامج تبادل طلابي"]
    },
    {
      id: 104,
      title: "بكالوريوس العلاج الطبيعي",
      university: "جامعة بورصة",
      location: "Turkey، بورصة",
      language: "إنجليزية",
      duration: "4 سنوات",
      deadline: "20/08/2023",
      fee: "$4,800 / سنة",
      discount: "$4,300 / سنة",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["تدريب ميداني", "فرص وظيفية"]
    },
    {
      id: 105,
      title: "ماجستير الجراحة العامة",
      university: "جامعة إسطنبول",
      location: "Turkey، إسطنبول",
      language: "إنجليزية",
      duration: "3 سنوات",
      deadline: "05/08/2023",
      fee: "$10,200 / سنة",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      badges: ["بحث متخصص", "تدريب في المستشفيات"]
    }
  ]);

const MedicalPrograms = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState(medicalPrograms);
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
    let result = medicalPrograms;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        program =>
          program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        if (program.title.includes('بكالوريوس') && selectedDegree === 'Bachelor') return true;
        if (program.title.includes('ماجستير') && selectedDegree === 'Master') return true;
        if (program.title.includes('دكتوراه') && selectedDegree === 'Doctorate') return true;
        return false;
      });
    }
    
    // Apply specialty filter
    if (selectedSpecialty && selectedSpecialty !== "all") {
      result = result.filter(program => {
        switch(selectedSpecialty) {
          case "Medicine":
            return program.title.includes('طب') && !program.title.includes('أسنان');
          case "Dentistry":
            return program.title.includes('أسنان');
          case "Pharmacy":
            return program.title.includes('صيدلة');
          case "Nursing":
            return program.title.includes('تمريض');
          case "Physiotherapy":
            return program.title.includes('علاج طبيعي');
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
          const priceA = parseFloat(a.discount ? a.discount.replace('$', '').replace(',', '') : a.fee.replace('$', '').replace(',', '').split(' ')[0]);
          const priceB = parseFloat(b.discount ? b.discount.replace('$', '').replace(',', '') : b.fee.replace('$', '').replace(',', '').split(' ')[0]);
          return priceA - priceB;
        });
        break;
      case "priceDesc":
        result = [...result].sort((a, b) => {
          const priceA = parseFloat(a.discount ? a.discount.replace('$', '').replace(',', '') : a.fee.replace('$', '').replace(',', '').split(' ')[0]);
          const priceB = parseFloat(b.discount ? b.discount.replace('$', '').replace(',', '') : b.fee.replace('$', '').replace(',', '').split(' ')[0]);
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
      description: `تم البحث عن: ${searchTerm || 'جميع البرامج الطبية'}`,
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

  // Add Medical Specialties
  const medicalSpecialties = [
    { value: "Medicine", label: "الطب البشري" },
    { value: "Dentistry", label: "طب الأسنان" },
    { value: "Pharmacy", label: "الصيدلة" },
    { value: "Nursing", label: "التمريض" },
    { value: "Physiotherapy", label: "العلاج الطبيعي" }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="البرامج الطبية"
          subtitle="استكشف أفضل برامج الطب والعلوم الصحية في أرقى الجامعات العالمية"
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
              تم العثور على <span className="font-semibold text-unlimited-blue">{filteredPrograms.length}</span> برنامج طبي
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
          programs={programsToDisplay}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          onResetFilters={resetFilters}
        />
      </div>
    </MainLayout>
  );
};

export default MedicalPrograms;
