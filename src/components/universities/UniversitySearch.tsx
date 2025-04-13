
import React, { useState, useCallback } from 'react';
import SearchInput from './search/SearchInput';
import LocationFilter from './search/LocationFilter';
import UniversityTypeFilter from './search/UniversityTypeFilter';
import ActiveFilters from './search/ActiveFilters';
import SearchButtons from './search/SearchButtons';

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
  selectedDegree?: string;
  setSelectedDegree?: (value: string) => void;
  selectedLanguage?: string;
  setSelectedLanguage?: (value: string) => void;
  minFee?: number;
  setMinFee?: (value: number | undefined) => void;
  maxFee?: number;
  setMaxFee?: (value: number | undefined) => void;
  worldRanking?: number;
  setWorldRanking?: (value: number | undefined) => void;
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
  countryTranslations = {},
  selectedDegree,
  setSelectedDegree,
  selectedLanguage,
  setSelectedLanguage,
  minFee,
  setMinFee,
  maxFee,
  setMaxFee,
  worldRanking,
  setWorldRanking
}) => {
  // حالة قيم الرسوم الدراسية المؤقتة للسلايدر
  const [tempFeeRange, setTempFeeRange] = useState<[number, number]>([
    minFee || 0,
    maxFee || 30000
  ]);

  // تحديث قيم الرسوم المؤقتة
  const handleFeeRangeChange = (values: number[]) => {
    setTempFeeRange([values[0], values[1]]);
  };

  // تطبيق فلتر الرسوم
  const applyFeeFilter = useCallback(() => {
    if (setMinFee) setMinFee(tempFeeRange[0]);
    if (setMaxFee) setMaxFee(tempFeeRange[1]);
  }, [tempFeeRange, setMinFee, setMaxFee]);

  // التحقق من وجود فلاتر نشطة
  const hasActiveFilters = Boolean(
    searchTerm || 
    selectedCity !== 'all' || 
    selectedType !== 'all' || 
    (selectedDegree && selectedDegree !== 'all') || 
    (selectedLanguage && selectedLanguage !== 'all') ||
    (minFee !== undefined) || 
    (maxFee !== undefined) ||
    (worldRanking !== undefined)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* البحث */}
          <SearchInput 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* فلتر المدينة */}
          <LocationFilter 
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            countryTranslations={countryTranslations}
          />
          
          {/* فلتر نوع الجامعة */}
          <UniversityTypeFilter 
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        
        {/* المرشحات النشطة */}
        <ActiveFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedDegree={selectedDegree}
          setSelectedDegree={setSelectedDegree}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          minFee={minFee}
          setMinFee={setMinFee}
          maxFee={maxFee}
          setMaxFee={setMaxFee}
          worldRanking={worldRanking}
          setWorldRanking={setWorldRanking}
          tempFeeRange={tempFeeRange}
          setTempFeeRange={setTempFeeRange}
          countryTranslations={countryTranslations}
          hasActiveFilters={hasActiveFilters}
        />
        
        {/* أزرار البحث والفلترة */}
        <SearchButtons 
          resetFilters={resetFilters}
          selectedDegree={selectedDegree}
          setSelectedDegree={setSelectedDegree}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          tempFeeRange={tempFeeRange}
          handleFeeRangeChange={handleFeeRangeChange}
          applyFeeFilter={applyFeeFilter}
          worldRanking={worldRanking}
          setWorldRanking={setWorldRanking}
          handleSearch={handleSearch}
          hasActiveFilters={hasActiveFilters}
        />
      </form>
    </div>
  );
};

export default UniversitySearch;
