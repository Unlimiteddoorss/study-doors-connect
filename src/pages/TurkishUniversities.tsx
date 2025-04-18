
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Info } from 'lucide-react';
import UniversitySearch from '@/components/universities/UniversitySearch';
import UniversitiesGrid from '@/components/universities/UniversitiesGrid';
import { useToast } from '@/hooks/use-toast';
import { turkishUniversities } from '@/data/programsData';

const cityTranslations: Record<string, string> = {
  'Turkey': 'تركيا',
  'Istanbul': 'إسطنبول',
  'Ankara': 'أنقرة',
  'Antalya': 'أنطاليا',
  'Izmir': 'إزمير',
  'Bursa': 'بورصة',
  'Konya': 'قونيا',
  'Adana': 'أضنة',
  'Gaziantep': 'غازي عنتاب',
  'Mersin': 'مرسين',
  'Kayseri': 'قيصري',
  'Alanya': 'ألانيا',
  'Eskisehir': 'إسكي شهير',
  'Trabzon': 'طرابزون',
  'Samsun': 'سامسون',
  'Sakarya': 'سكاريا',
  'Cyprus': 'قبرص',
  'Kyrenia': 'كيرينيا',
  'Nicosia': 'نيقوسيا',
  'Famagusta': 'فماغوستا',
};

const adaptedUniversities = turkishUniversities.map(uni => ({
  id: uni.id,
  name: uni.name,
  nameAr: uni.name,
  location: uni.location,
  country: 'Turkey',
  city: uni.location,
  type: uni.type as 'Public' | 'Private',
  founded: String(uni.founded),
  programs: uni.programs,
  students: 5000 + Math.floor(Math.random() * 20000),
  ranking: Math.floor(Math.random() * 1000) + 1,
  fees: uni.fees,
  image: uni.image,
  languages: ['Turkish', 'English'],
  accreditations: uni.accreditations || ['YÖK'], // Fixed accreditation reference
  isFeatured: Math.random() > 0.7
}));

const TurkishUniversities = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOrder, setSortOrder] = useState("ranking");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUniversities, setFilteredUniversities] = useState(adaptedUniversities);
  const [totalUniversities, setTotalUniversities] = useState(adaptedUniversities.length);
  
  const universitiesPerPage = 9;

  const cities = Array.from(new Set(adaptedUniversities.map(uni => uni.city)));

  useEffect(() => {
    let result = [...adaptedUniversities];
    
    if (searchTerm) {
      result = result.filter(
        uni =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (uni.nameAr && uni.nameAr.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCity !== 'all') {
      result = result.filter(uni => uni.city === selectedCity);
    }
    
    if (selectedType !== 'all') {
      result = result.filter(uni => uni.type === selectedType);
    }
    
    switch (sortOrder) {
      case "ranking":
        result = [...result].sort((a, b) => {
          if (a.ranking && b.ranking) return a.ranking - b.ranking;
          if (!a.ranking && b.ranking) return 1;
          if (a.ranking && !b.ranking) return -1;
          return 0;
        });
        break;
      case "name":
        result = [...result].sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "founded":
        result = [...result].sort((a, b) => {
          const aYear = parseInt(a.founded);
          const bYear = parseInt(b.founded);
          return aYear - bYear;
        });
        break;
      case "featured":
        result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "programs":
        result = [...result].sort((a, b) => b.programs - a.programs);
        break;
      default:
        break;
    }
    
    setTotalUniversities(result.length);
    setFilteredUniversities(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCity, selectedType, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم البحث",
      description: `تم البحث عن: ${searchTerm || 'جميع الجامعات'}`,
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedType('all');
    setSortOrder('ranking');
    
    toast({
      title: "تم إعادة ضبط التصفية",
      description: "تم مسح جميع عوامل التصفية والبحث",
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    
    toast({
      title: "تم تغيير الترتيب",
      description: `تم ترتيب الجامعات حسب: ${e.target.options[e.target.selectedIndex].text}`,
    });
  };

  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="الجامعات التركية"
          subtitle="استكشف أفضل الجامعات التركية الخاصة وتعرف على برامجها وميزاتها"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue">{turkishUniversities.length}</div>
            <div className="text-unlimited-gray mt-2">جامعة خاصة في تركيا</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue">{turkishUniversities.reduce((sum, uni) => sum + uni.programs, 0)}+</div>
            <div className="text-unlimited-gray mt-2">برنامج دراسي</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue">{cities.length}</div>
            <div className="text-unlimited-gray mt-2">مدينة تركية</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-unlimited-blue">100%</div>
            <div className="text-unlimited-gray mt-2">معترف بها عالمياً</div>
          </div>
        </div>

        <UniversitySearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          handleSearch={handleSearch}
          resetFilters={resetFilters}
          cities={cities}
          countryTranslations={cityTranslations}
        />

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-unlimited-gray">
              تم العثور على <span className="font-semibold text-unlimited-blue">{totalUniversities}</span> جامعة
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
              <option value="ranking">التصنيف العالمي</option>
              <option value="name">الاسم</option>
              <option value="founded">تاريخ التأسيس</option>
              <option value="featured">الجامعات المميزة</option>
              <option value="programs">عدد البرامج</option>
            </select>
          </div>
        </div>

        <UniversitiesGrid 
          universities={currentUniversities}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          onResetFilters={resetFilters}
          countryTranslations={cityTranslations}
        />

        <div className="mt-16 bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-unlimited-blue" />
            <h3 className="text-xl font-bold">معلومات عن الجامعات التركية الخاصة</h3>
          </div>
          
          <div className="space-y-4 text-unlimited-gray">
            <p>
              تعتبر الجامعات التركية الخاصة من أفضل الخيارات للدراسة في الخارج، حيث تقدم برامج معتمدة عالمياً بلغات متعددة وبرسوم دراسية تنافسية.
            </p>
            <p>
              تتميز الجامعات الخاصة في تركيا بجودة التعليم العالية، والمرافق الحديثة، وفرص التدريب العملي، بالإضافة إلى إمكانية الحصول على منح دراسية للطلاب المتميزين.
            </p>
            <p>
              جميع الجامعات المدرجة معترف بها من مجلس التعليم العالي التركي (YÖK) وتقدم شهادات معترف بها دولياً، مما يتيح للخريجي�� فرص عمل واسعة في مختلف أنحاء العالم.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-unlimited-blue mb-2">لغات التدريس</h4>
              <p className="text-unlimited-gray">تقدم الجامعات التركية برامج باللغات الإنجليزية والتركية، وبعضها يوفر برامج باللغة العربية أيضاً.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-unlimited-blue mb-2">الرسوم الدراسية</h4>
              <p className="text-unlimited-gray">تتراوح الرسوم الدراسية السنوية بين 6,000 و15,000 دولار أمريكي، اعتماداً على الجامعة والتخصص.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-unlimited-blue mb-2">المنح الدراسية</h4>
              <p className="text-unlimited-gray">تقدم العديد من الجامعات منحاً دراسية تصل إلى 50% من الرسوم للطلاب المتميزين أكاديمياً.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TurkishUniversities;
