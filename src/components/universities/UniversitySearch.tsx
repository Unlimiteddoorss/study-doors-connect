
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

  const hasActiveFilters = searchTerm || selectedCity !== 'all' || selectedType !== 'all';

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
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
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
        
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 mb-2">
            <div className="flex items-center gap-1 text-unlimited-gray">
              <Filter className="h-4 w-4" />
              <span>المرشحات النشطة:</span>
            </div>
            
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                بحث: {searchTerm}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchTerm('')} />
              </Badge>
            )}
            
            {selectedCity !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                المدينة: {translateCity(selectedCity)}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedCity('all')} />
              </Badge>
            )}
            
            {selectedType !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                النوع: {selectedType === 'Private' ? 'خاصة' : 'حكومية'}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedType('all')} />
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
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
