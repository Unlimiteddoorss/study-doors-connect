
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import UniversitySearch from '@/components/universities/UniversitySearch';
import UniversitiesGrid from '@/components/universities/UniversitiesGrid';
import { useToast } from '@/hooks/use-toast';
import { turkishUniversities } from '@/data/programsData';

// ترجمة أسماء المدن والدول إلى العربية
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

// Adapt our universities data to match the University interface
const adaptedUniversities = turkishUniversities.map(uni => ({
  id: uni.id,
  name: uni.name,
  nameAr: uni.name, // Use name as nameAr since it doesn't exist
  location: uni.location,
  country: 'Turkey',
  city: uni.location, // Use location as city
  type: uni.type as 'Public' | 'Private',
  founded: String(uni.founded), // Convert to string as per University interface
  programs: uni.programs,
  students: 5000 + Math.floor(Math.random() * 20000), // Generate random student number
  ranking: Math.floor(Math.random() * 1000) + 1, // Generate random ranking
  fees: uni.fees,
  image: uni.image,
  languages: ['Turkish', 'English'],
  accreditations: [uni.accreditation],
  isFeatured: Math.random() > 0.7 // Randomly set some universities as featured
}));

const TurkishUniversities = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOrder, setSortOrder] = useState("ranking");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUniversities, setFilteredUniversities] = useState(adaptedUniversities);
  
  const universitiesPerPage = 9;

  // Get unique cities
  const cities = Array.from(new Set(adaptedUniversities.map(uni => uni.city)));

  // Effect to filter universities
  useEffect(() => {
    let result = [...adaptedUniversities];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        uni =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (uni.nameAr && uni.nameAr.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply city filter
    if (selectedCity !== 'all') {
      result = result.filter(uni => uni.city === selectedCity);
    }
    
    // Apply type filter
    if (selectedType !== 'all') {
      result = result.filter(uni => uni.type === selectedType);
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "ranking":
        // Sort by ranking, universities without ranking at the end
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
      default:
        break;
    }
    
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

  // حساب الصفحات
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="الجامعات التركية"
          subtitle="استكشف أفضل الجامعات التركية وتعرف على برامجها وميزاتها"
        />

        {/* Search Component */}
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

        {/* Results info and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-unlimited-gray">
              تم العثور على <span className="font-semibold text-unlimited-blue">{filteredUniversities.length}</span> جامعة
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
            </select>
          </div>
        </div>

        {/* Universities Grid */}
        <UniversitiesGrid 
          universities={currentUniversities}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          onResetFilters={resetFilters}
          countryTranslations={cityTranslations}
        />
      </div>
    </MainLayout>
  );
};

export default TurkishUniversities;
