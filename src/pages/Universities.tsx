
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UniversitiesGrid from '@/components/universities/UniversitiesGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal } from 'lucide-react';

const dummyUniversities = [
  {
    id: '1',
    name: 'جامعة اسطنبول',
    country: 'تركيا',
    city: 'اسطنبول',
    logo: '/placeholder.svg',
    type: 'public',
    rating: 4.5,
    programsCount: 120,
    language: 'التركية والإنجليزية',
  },
  {
    id: '2',
    name: 'جامعة أنقرة',
    country: 'تركيا',
    city: 'أنقرة',
    logo: '/placeholder.svg',
    type: 'public',
    rating: 4.2,
    programsCount: 90,
    language: 'التركية',
  },
  {
    id: '3',
    name: 'الجامعة التركية الألمانية',
    country: 'تركيا',
    city: 'اسطنبول',
    logo: '/placeholder.svg',
    type: 'private',
    rating: 4.7,
    programsCount: 50,
    language: 'الإنجليزية والألمانية',
  },
  {
    id: '4',
    name: 'جامعة بهتشه شهير',
    country: 'تركيا',
    city: 'اسطنبول',
    logo: '/placeholder.svg',
    type: 'private',
    rating: 4.4,
    programsCount: 75,
    language: 'الإنجليزية',
  },
  {
    id: '5',
    name: 'جامعة مرمرة',
    country: 'تركيا',
    city: 'اسطنبول',
    logo: '/placeholder.svg',
    type: 'public',
    rating: 4.3,
    programsCount: 110,
    language: 'التركية',
  },
  {
    id: '6',
    name: 'جامعة قبرص الشرق الأوسط',
    country: 'قبرص',
    city: 'نيقوسيا',
    logo: '/placeholder.svg',
    type: 'private',
    rating: 4.1,
    programsCount: 60,
    language: 'الإنجليزية',
  },
];

const Universities = () => {
  useEffect(() => {
    document.title = 'الجامعات - أبواب بلا حدود';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState(dummyUniversities);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUniversities.length / 9);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = dummyUniversities.filter(uni => 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUniversities(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilteredUniversities(dummyUniversities);
    setSearchQuery('');
    setShowFilters(false);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <div className="bg-unlimited-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">الجامعات</h1>
          <p className="text-lg max-w-2xl mx-auto text-center">اكتشف أفضل الجامعات في تركيا وقبرص وأوروبا</p>
          
          <div className="mt-8 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="ابحث عن جامعة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white text-unlimited-dark-blue"
              />
              <Button type="submit" className="bg-white text-unlimited-blue hover:bg-gray-100">
                <Search className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 justify-center">
            <TabsTrigger value="all">جميع الجامعات</TabsTrigger>
            <TabsTrigger value="turkey">تركيا</TabsTrigger>
            <TabsTrigger value="cyprus">قبرص</TabsTrigger>
            <TabsTrigger value="europe">أوروبا</TabsTrigger>
          </TabsList>
          
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-unlimited-gray mb-2">المدينة</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option value="">جميع المدن</option>
                  <option value="istanbul">اسطنبول</option>
                  <option value="ankara">أنقرة</option>
                  <option value="nicosia">نيقوسيا</option>
                </select>
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">نوع الجامعة</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option value="">الكل</option>
                  <option value="public">حكومية</option>
                  <option value="private">خاصة</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={resetFilters}
                  className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                >
                  إعادة ضبط
                </Button>
              </div>
            </div>
          )}
          
          <TabsContent value="all">
            <UniversitiesGrid 
              universities={filteredUniversities}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </TabsContent>
          
          <TabsContent value="turkey">
            <UniversitiesGrid 
              universities={filteredUniversities.filter(uni => uni.country === 'تركيا')}
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUniversities.filter(uni => uni.country === 'تركيا').length / 9)}
              onPageChange={handlePageChange}
            />
          </TabsContent>
          
          <TabsContent value="cyprus">
            <UniversitiesGrid 
              universities={filteredUniversities.filter(uni => uni.country === 'قبرص')}
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUniversities.filter(uni => uni.country === 'قبرص').length / 9)}
              onPageChange={handlePageChange}
            />
          </TabsContent>
          
          <TabsContent value="europe">
            <UniversitiesGrid 
              universities={filteredUniversities.filter(uni => uni.country !== 'تركيا' && uni.country !== 'قبرص')}
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUniversities.filter(uni => uni.country !== 'تركيا' && uni.country !== 'قبرص').length / 9)}
              onPageChange={handlePageChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Universities;
