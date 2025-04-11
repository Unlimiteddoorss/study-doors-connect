
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { availableCountries, degreeTypes, programSpecialties } from '@/data/programsData';

interface ProgramSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedDegree: string;
  setSelectedDegree: (value: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  resetFilters: () => void;
  countryTranslations?: Record<string, string>;
}

const ProgramSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedDegree,
  setSelectedDegree,
  selectedSpecialty,
  setSelectedSpecialty,
  handleSearch,
  resetFilters,
  countryTranslations = {}
}: ProgramSearchProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن برنامج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
          
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue text-unlimited-gray"
            >
              <option value="all">جميع الدول</option>
              {availableCountries.sort().map((country) => (
                <option key={country} value={country}>
                  {countryTranslations[country] || country}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue text-unlimited-gray"
            >
              <option value="all">جميع الدرجات العلمية</option>
              <option value="Bachelor">بكالوريوس</option>
              <option value="Master">ماجستير</option>
              <option value="Doctorate">دكتوراه</option>
            </select>
          </div>
          
          <div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue text-unlimited-gray"
            >
              <option value="all">جميع التخصصات</option>
              <option value="Business">إدارة أعمال</option>
              <option value="Engineering">هندسة</option>
              <option value="Medicine">طب</option>
              <option value="Computer Science">علوم حاسوب</option>
              <option value="Arts">فنون</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
          >
            إعادة ضبط
          </Button>
          
          <Button
            type="submit"
            className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
          >
            بحث
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProgramSearch;
