import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { turkishUniversities } from '@/data/programsData';
import UniversityCard from '@/components/universities/UniversityCard';
import Pagination from '@/components/shared/Pagination';

const TurkishUniversities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(turkishUniversities);
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 12;

  useEffect(() => {
    if (searchTerm) {
      setFilteredUniversities(
        turkishUniversities.filter(
          university =>
            university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            university.city.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUniversities(turkishUniversities);
    }
  }, [searchTerm]);

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

  const countryTranslations: Record<string, string> = {
    'Turkey': 'تركيا',
    'Istanbul': 'إسطنبول',
    'Ankara': 'أنقرة',
    'Antalya': 'أنطاليا',
    'Alanya': 'ألانيا',
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="الجامعات التركية"
          subtitle="استكشف أفضل الجامعات التركية وتعرف على برامجها وميزاتها"
        />

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

        <div className="mb-6">
          <p className="text-unlimited-gray">
            تم العثور على <span className="font-semibold text-unlimited-blue">{filteredUniversities.length}</span> جامعة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentUniversities.map(university => (
            <UniversityCard 
              key={university.id} 
              university={{
                ...university,
                programsCount: university.programsCount
              }}
              countryTranslations={countryTranslations}
            />
          ))}
        </div>
        
        {filteredUniversities.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default TurkishUniversities;
