
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UniversitySearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  resetFilters: () => void;
  cities: string[];
  countryTranslations?: Record<string, string>;
}

const UniversitySearch: React.FC<UniversitySearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  handleSearch,
  resetFilters,
  cities,
  countryTranslations = {}
}) => {
  // ترجمة اسم المدينة من الإنجليزية إلى العربية
  const translateCity = (city: string): string => {
    return countryTranslations[city] || city;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          
          <div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue text-unlimited-gray"
            >
              <option value="all">جميع المدن</option>
              {cities.sort().map((city) => (
                <option key={city} value={city}>
                  {translateCity(city)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue text-unlimited-gray"
            >
              <option value="all">جميع أنواع الجامعات</option>
              <option value="Public">حكومية</option>
              <option value="Private">خاصة</option>
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

export default UniversitySearch;
