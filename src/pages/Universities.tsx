
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, School, SlidersHorizontal } from 'lucide-react';
import { turkishUniversities } from '@/data/programsData';
import { useToast } from '@/hooks/use-toast';
import UniversitiesGrid from '@/components/universities/UniversitiesGrid';
import UniversitiesMap from '@/components/universities/UniversitiesMap';
import ViewToggle from '@/components/universities/ViewToggle';
import UniversityComparison from '@/components/universities/UniversityComparison';

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
  
  const universitiesPerPage = 12;

  useEffect(() => {
    if (searchTerm) {
      setFilteredUniversities(
        turkishUniversities.filter(
          university =>
            university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            university.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUniversities(turkishUniversities);
    }
  }, [searchTerm]);

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
  
  // إزالة جميع الجامعات من المقارنة
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="الجامعات التركية"
          subtitle="استكشف أفضل الجامعات التركية وتعرف على برامجها وميزاتها"
        />

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
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن جامعة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Results info and View Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-unlimited-gray">
              تم العثور على <span className="font-semibold text-unlimited-blue">{filteredUniversities.length}</span> جامعة
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleMap}
              className="border-unlimited-blue text-unlimited-blue"
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
          onResetFilters={() => setSearchTerm("")}
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
      </div>
    </MainLayout>
  );
};

export default Universities;
