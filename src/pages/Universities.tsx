
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { UniversitiesGrid } from '@/components/universities/UniversitiesGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';

// Sample university data
const universities = [
  {
    id: 1,
    name: "جامعة إسطنبول جيليشيم",
    nameAr: "جامعة إسطنبول جيليشيم",
    location: "إسطنبول، تركيا",
    country: "تركيا",
    ranking: "#28",
    description: "تأسست جامعة إسطنبول جيليشيم في عام 2008 وهي واحدة من الجامعات الرائدة في إسطنبول، تركيا.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/7a/Ozyegin_University_logo.png",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    establishedYear: 2008,
    programCount: 257,
    studentCount: 35000,
    website: "https://www.gelisim.edu.tr"
  },
  {
    id: 2,
    name: "جامعة أوزيجين",
    nameAr: "جامعة أوزيجين",
    location: "إسطنبول، تركيا",
    country: "تركيا",
    ranking: "#32",
    description: "جامعة رائدة في مجال الأعمال والتكنولوجيا",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/7a/Ozyegin_University_logo.png",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    establishedYear: 2007,
    programCount: 150,
    studentCount: 20000,
    website: "https://www.ozyegin.edu.tr"
  },
  {
    id: 3,
    name: "جامعة فاتح سلطان محمد",
    nameAr: "جامعة فاتح سلطان محمد",
    location: "إسطنبول، تركيا",
    country: "تركيا",
    ranking: "#45",
    description: "جامعة عريقة تجمع بين التراث والحداثة",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/2/27/Fatih_Sultan_Mehmet_Vak%C4%B1f_%C3%9Cniversitesi_logo.jpg",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    establishedYear: 2010,
    programCount: 120,
    studentCount: 15000,
    website: "https://www.fsm.edu.tr"
  },
  {
    id: 4,
    name: "جامعة المجر للتكنولوجيا",
    nameAr: "جامعة المجر للتكنولوجيا",
    location: "بودابست، المجر",
    country: "المجر",
    ranking: "#201-250",
    description: "جامعة رائدة في مجال الهندسة والعلوم التطبيقية",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/d/d4/BME_logo.jpg",
    imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    establishedYear: 1782,
    programCount: 180,
    studentCount: 22000,
    website: "https://www.bme.hu"
  }
];

const Universities = () => {
  useEffect(() => {
    document.title = 'الجامعات - أبواب بلا حدود';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState(universities);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter universities based on search query
    const filtered = universities.filter(university => 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUniversities(filtered);
  };

  const resetFilters = () => {
    setFilteredUniversities(universities);
    setSearchQuery('');
    setShowFilters(false);
  };
  
  return (
    <MainLayout>
      <div className="bg-unlimited-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">الجامعات</h1>
          <p className="text-lg max-w-2xl mx-auto text-center">اكتشف أفضل الجامعات حول العالم وتعرف على برامجها الأكاديمية</p>
          
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
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-unlimited-gray mb-2">الدولة</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">جميع الدول</option>
                <option value="turkey">تركيا</option>
                <option value="cyprus">قبرص</option>
                <option value="hungary">المجر</option>
                <option value="poland">بولندا</option>
              </select>
            </div>
            
            <div>
              <label className="block text-unlimited-gray mb-2">التصنيف العالمي</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">جميع التصنيفات</option>
                <option value="top100">أفضل 100</option>
                <option value="100-200">101 - 200</option>
                <option value="200-500">201 - 500</option>
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
        
        <UniversitiesGrid universities={filteredUniversities} />
      </div>
    </MainLayout>
  );
};

export default Universities;
