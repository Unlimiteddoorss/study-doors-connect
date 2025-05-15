import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, School, SlidersHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UniversitiesGrid from '@/components/universities/UniversitiesGrid';
import UniversitiesMap from '@/components/universities/UniversitiesMap';
import ViewToggle from '@/components/universities/ViewToggle';
import UniversityComparison from '@/components/universities/UniversityComparison';
import UniversityAdvancedFilters, { FiltersState } from '@/components/universities/UniversityAdvancedFilters';
import UniversitySEO from '@/components/seo/UniversitySEO';
import ScrollToTop from '@/components/shared/ScrollToTop';
import CountUp from '@/components/shared/CountUp';
import DarkModeToggle from '@/components/shared/DarkModeToggle';
import SavedFilters from '@/components/universities/SavedFilters';

// Define the University type locally since the imported one has issues
interface University {
  id: number;
  name: string;
  nameAr?: string;
  country: string;
  city: string;
  location: string;
  type: "Public" | "Private";
  founded: string;
  programs: number;
  students: number;
  ranking: number;
  fees: string;
  image: string;
  website: string;
  languages: string[];
  accreditation: string;
  isFeatured: boolean;
}

// Define turkish universities data here
const turkishUniversities: University[] = [
  {
    id: 1,
    name: "Istanbul Technical University",
    nameAr: "جامعة إسطنبول التقنية",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Public",
    founded: "1773",
    programs: 120,
    students: 32000,
    ranking: 501,
    fees: "$6,000 - $8,000",
    image: "/images/universities/istanbul-technical-university.jpg",
    website: "https://www.itu.edu.tr/en",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  },
  {
    id: 2,
    name: "Bilkent University",
    nameAr: "جامعة بيلكنت",
    location: "Ankara",
    city: "Ankara",
    country: "Turkey",
    type: "Private",
    founded: "1984",
    programs: 89,
    students: 12500,
    ranking: 401,
    fees: "$8,000 - $12,000",
    image: "/images/universities/bilkent-university.jpg",
    website: "http://www.bilkent.edu.tr/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  },
  {
    id: 3,
    name: "Middle East Technical University",
    nameAr: "جامعة الشرق الأوسط التقنية",
    location: "Ankara",
    city: "Ankara",
    country: "Turkey",
    type: "Public",
    founded: "1956",
    programs: 110,
    students: 27000,
    ranking: 451,
    fees: "$5,000 - $7,000",
    image: "/images/universities/middle-east-technical-university.jpg",
    website: "https://www.metu.edu.tr/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: false
  },
  {
    id: 4,
    name: "Koç University",
    nameAr: "جامعة كوتش",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Private",
    founded: "1993",
    programs: 75,
    students: 7000,
    ranking: 451,
    fees: "$15,000 - $20,000",
    image: "/images/universities/koc-university.jpg",
    website: "https://www.ku.edu.tr/en/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  },
  {
    id: 5,
    name: "Boğaziçi University",
    nameAr: "جامعة بوغaziتشي",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Public",
    founded: "1863",
    programs: 95,
    students: 15000,
    ranking: 551,
    fees: "$5,000 - $7,000",
    image: "/images/universities/bogazici-university.jpg",
    website: "http://www.boun.edu.tr/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: false
  },
  {
    id: 6,
    name: "Sabancı University",
    nameAr: "جامعة سابانجي",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Private",
    founded: "1994",
    programs: 60,
    students: 4000,
    ranking: 521,
    fees: "$12,000 - $18,000",
    image: "/images/universities/sabanci-university.jpg",
    website: "https://www.sabanciuniv.edu/en",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  }
];

// ترجمة أسماء الدول إلى العربية
const countryTranslations: Record<string, string> = {
  'Turkey': 'تركيا',
  'Istanbul': 'إسطنبول',
  'Ankara': 'أنقرة',
  'Antalya': 'أنطاليا',
  'Alanya': 'ألانيا',
  'Izmir': 'إزمير',
  'Bursa': 'بورصة',
  'Konya': 'قونيا',
  'Kayseri': 'قيصري',
  'Eskisehir': 'إسكي شهير',
  'Trabzon': 'طرابزون',
  'Sakarya': 'سكاريا',
  'Cyprus': 'قبرص',
  'Kyrenia': 'كيرينيا',
  'Nicosia': 'نيقوسيا',
  'Famagusta': 'فماغوستا',
};

type ViewMode = 'grid' | 'list';

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(turkishUniversities);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const { toast } = useToast();
  
  // إضافة حالة للفلترة المتقدمة
  const [advancedFilters, setAdvancedFilters] = useState<FiltersState>({
    search: '',
    types: [],
    locations: [],
    languages: [],
    minRanking: undefined,
    maxRanking: undefined,
    minStudents: undefined,
    maxStudents: undefined,
    featured: false
  });
  
  const universitiesPerPage = 12;

  // إنشاء خيارات القوائم المنسدلة
  const locationOptions = Array.from(new Set(
    turkishUniversities.map(uni => uni.city)
  )).map(city => ({ 
    value: city as string, 
    label: countryTranslations[city] || city 
  }));

  const typeOptions = [
    { value: 'Public', label: 'حكومية' },
    { value: 'Private', label: 'خاصة' }
  ];

  const languageOptions = [
    { value: 'English', label: 'الإنجليزية' },
    { value: 'Turkish', label: 'التركية' },
    { value: 'Arabic', label: 'العربية' }
  ];
  
  // تطبيق جميع الفلاتر
  useEffect(() => {
    // تحديث قيمة البحث النصي من الفلتر المتقدم
    if (searchTerm !== advancedFilters.search) {
      setSearchTerm(advancedFilters.search);
    }

    let results = [...turkishUniversities];
    
    // فلترة بالنص
    if (searchTerm) {
      results = results.filter(
        university =>
          university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (university.nameAr && university.nameAr.includes(searchTerm)) ||
          university.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          university.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // فلترة بنوع الجامعة
    if (advancedFilters.types.length > 0) {
      results = results.filter(
        university => advancedFilters.types.includes(university.type)
      );
    }
    
    // فلترة بالموقع
    if (advancedFilters.locations.length > 0) {
      results = results.filter(
        university => advancedFilters.locations.includes(university.city)
      );
    }
    
    // فلترة باللغة
    if (advancedFilters.languages.length > 0) {
      results = results.filter(
        university => {
          if (!university.languages) return false;
          return advancedFilters.languages.some(
            lang => university.languages?.includes(lang)
          );
        }
      );
    }
    
    // فلترة بالتصنيف
    if (advancedFilters.minRanking !== undefined) {
      results = results.filter(
        university => university.ranking !== undefined && university.ranking >= (advancedFilters.minRanking || 0)
      );
    }
    
    if (advancedFilters.maxRanking !== undefined) {
      results = results.filter(
        university => university.ranking !== undefined && university.ranking <= (advancedFilters.maxRanking || Infinity)
      );
    }
    
    // فلترة بعدد الطلاب
    if (advancedFilters.minStudents !== undefined) {
      results = results.filter(
        university => university.students >= (advancedFilters.minStudents || 0)
      );
    }
    
    if (advancedFilters.maxStudents !== undefined) {
      results = results.filter(
        university => university.students <= (advancedFilters.maxStudents || Infinity)
      );
    }
    
    // فلترة بالجامعات المميزة
    if (advancedFilters.featured) {
      results = results.filter(university => university.isFeatured);
    }
    
    setFilteredUniversities(results);
    setCurrentPage(1); // إعادة تعيين الصفحة الحالية عند تغيير الفلاتر
  }, [searchTerm, advancedFilters]);
  
  // تحديث حالة البحث النصي
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setAdvancedFilters(prev => ({ ...prev, search: value }));
  };

  // حساب صفحة العرض الحالية
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);

  // التنقل بين الصفحات
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // إضافة أو إزالة جامعة من المقارنة
  const handleToggleCompare = (id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(existingId => existingId !== id);
      } else {
        // تحقق من عدد الجامعات المحددة، وعدم السماح بأكثر من 3
        if (prev.length >= 3) {
          toast({
            title: "الحد الأقصى للمقارنة",
            description: "يمكنك مقارنة حتى 3 جامعات في نفس الوقت",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, id];
      }
    });
  };
  
  // إزالة جميع الجامعات من المق��رنة
  const clearCompareSelection = () => {
    setCompareIds([]);
    toast({
      title: "تم إزالة جميع الجامعات",
      description: "تم مسح قائمة المقارنة بنجاح",
    });
  };
  
  // التحكم في عرض نافذة المقارنة
  const handleShowComparison = () => {
    if (compareIds.length > 0) {
      setShowComparison(true);
    } else {
      toast({
        title: "لا توجد جامعات محددة",
        description: "الرجاء تحديد جامعات للمقارنة أولاً",
        variant: "destructive",
      });
    }
  };
  
  // التحكم في عرض الخريطة
  const toggleMap = () => {
    setShowMap(prev => !prev);
  };
  
  // عند النقر على جامعة في الخريطة
  const handleMapUniversitySelect = (universityId: number) => {
    // التمرير إلى الجامعة في القائمة
    const universityElement = document.getElementById(`university-${universityId}`);
    if (universityElement) {
      universityElement.scrollIntoView({ behavior: 'smooth' });
      universityElement.classList.add('ring-2', 'ring-unlimited-blue');
      setTimeout(() => {
        universityElement.classList.remove('ring-2', 'ring-unlimited-blue');
      }, 2000);
    }
  };

  // إعادة تعيين جميع الفلاتر
  const resetAllFilters = () => {
    setAdvancedFilters({
      search: '',
      types: [],
      locations: [],
      languages: [],
      minRanking: undefined,
      maxRanking: undefined,
      minStudents: undefined,
      maxStudents: undefined,
      featured: false
    });
    setSearchTerm('');
  };

  // حساب إحصائيات الجامعات
  const stats = {
    total: turkishUniversities.length,
    public: turkishUniversities.filter(uni => uni.type === 'Public').length,
    private: turkishUniversities.filter(uni => uni.type === 'Private').length,
    cities: Array.from(new Set(turkishUniversities.map(uni => uni.city))).length,
    programs: turkishUniversities.reduce((sum, uni) => sum + uni.programs, 0),
  };

  // تطبيق مجموعة فلتر محفوظة
  const applySavedFilter = (filters: FiltersState) => {
    setAdvancedFilters(filters);
  };

  return (
    <MainLayout>
      {/* Add SEO Component */}
      <UniversitySEO 
        title="الجامعات التركية - أفضل الخيارات للدراسة في تركيا"
        description="استكشف أفضل الجامعات التركية الحكومية والخاصة، مع برامج دراسية متنوعة ومنح دراسية متاحة. تعرف على التكاليف والمواقع والتخصصات المتاحة."
        keywords={["جامعات تركيا", "دراسة في تركيا", "منح دراسية", "جامعات خاصة", "جامعات حكومية", "برامج دراسية"]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center">
          <SectionTitle
            title="الجامعات التركية"
            subtitle="استكشف أفضل الجامعات التركية وتعرف على برامجها وميزاتها"
          />
          <DarkModeToggle />
        </div>

        {/* University Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 mt-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue dark:text-unlimited-blue">
              <CountUp end={stats.total} duration={1500} />
            </div>
            <div className="text-unlimited-gray dark:text-gray-300 mt-2">جامعة</div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue dark:text-unlimited-blue">
              <CountUp end={stats.public} duration={1500} />
            </div>
            <div className="text-unlimited-gray dark:text-gray-300 mt-2">جامعة حكومية</div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue dark:text-unlimited-blue">
              <CountUp end={stats.private} duration={1500} />
            </div>
            <div className="text-unlimited-gray dark:text-gray-300 mt-2">جامعة خاصة</div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue dark:text-unlimited-blue">
              <CountUp end={stats.cities} duration={1500} />
            </div>
            <div className="text-unlimited-gray dark:text-gray-300 mt-2">مدينة</div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue dark:text-unlimited-blue">
              <CountUp end={stats.programs} duration={1500} />+
            </div>
            <div className="text-unlimited-gray dark:text-gray-300 mt-2">برنامج دراسي</div>
          </div>
        </div>

        {/* Map Section */}
        {showMap && (
          <div className="mb-8">
            <UniversitiesMap 
              universities={filteredUniversities}
              onSelectUniversity={handleMapUniversitySelect}
              countryTranslations={countryTranslations}
            />
          </div>
        )}

        {/* Search Component */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن جامعة..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Advanced Filters */}
        <UniversityAdvancedFilters 
          filters={advancedFilters}
          onChange={setAdvancedFilters}
          onReset={resetAllFilters}
          locations={locationOptions}
          types={typeOptions}
          languages={languageOptions}
          countryTranslations={countryTranslations}
        />

        {/* Results info and View Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-unlimited-gray dark:text-gray-300">
              تم العثور على <span className="font-semibold text-unlimited-blue">{filteredUniversities.length}</span> جامعة
            </p>
            
            {/* Add Saved Filters Component */}
            <SavedFilters
              currentFilters={advancedFilters}
              onApplyFilter={applySavedFilter}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleMap}
              className="border-unlimited-blue text-unlimited-blue dark:border-blue-400 dark:text-blue-400"
            >
              <MapPin className="h-4 w-4 ml-2" />
              {showMap ? 'إخفاء الخريطة' : 'عرض الخريطة'}
            </Button>
            
            {compareIds.length > 0 && (
              <Button 
                size="sm" 
                className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
                onClick={handleShowComparison}
              >
                مقارنة ({compareIds.length})
              </Button>
            )}
            
            <ViewToggle 
              currentView={viewMode} 
              onViewChange={setViewMode} 
            />
          </div>
        </div>

        {/* Universities Grid */}
        <UniversitiesGrid
          universities={currentUniversities}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          onResetFilters={resetAllFilters}
          countryTranslations={countryTranslations}
          viewMode={viewMode}
          compareIds={compareIds}
          onToggleCompare={handleToggleCompare}
          onClearAllCompare={clearCompareSelection}
        />
        
        {/* Comparison Dialog */}
        <UniversityComparison
          universities={turkishUniversities}
          selectedIds={compareIds}
          onClose={() => setShowComparison(false)}
          countryTranslations={countryTranslations}
        />
        
        {/* Scroll To Top Button */}
        <ScrollToTop />
      </div>
    </MainLayout>
  );
};

export default Universities;
