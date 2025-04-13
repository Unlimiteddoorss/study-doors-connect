
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ActiveFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
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
  tempFeeRange?: [number, number];
  setTempFeeRange?: (value: [number, number]) => void;
  countryTranslations: Record<string, string>;
  hasActiveFilters: boolean;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedDegree,
  setSelectedDegree,
  selectedLanguage,
  setSelectedLanguage,
  minFee,
  setMinFee,
  maxFee,
  setMaxFee,
  worldRanking,
  setWorldRanking,
  countryTranslations
}) => {
  // ترجمة اسم البلد إذا كانت متوفرة
  const translateCity = (city: string): string => {
    return countryTranslations[city] || city;
  };
  
  if (!searchTerm && selectedCity === 'all' && selectedType === 'all' && 
      (!selectedDegree || selectedDegree === 'all') && 
      (!selectedLanguage || selectedLanguage === 'all') && 
      minFee === undefined && maxFee === undefined && 
      worldRanking === undefined) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <div className="text-sm text-unlimited-gray mr-2 flex items-center">المرشحات النشطة:</div>
      
      {searchTerm && (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>بحث: {searchTerm}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => setSearchTerm('')}
          />
        </Badge>
      )}
      
      {selectedCity !== 'all' && (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>المدينة: {translateCity(selectedCity)}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => setSelectedCity('all')}
          />
        </Badge>
      )}
      
      {selectedType !== 'all' && (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>النوع: {selectedType === 'Public' ? 'حكومية' : 'خاصة'}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => setSelectedType('all')}
          />
        </Badge>
      )}
      
      {selectedDegree && selectedDegree !== 'all' && setSelectedDegree && (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>الدرجة: {selectedDegree}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => setSelectedDegree('all')}
          />
        </Badge>
      )}
      
      {selectedLanguage && selectedLanguage !== 'all' && setSelectedLanguage && (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>اللغة: {selectedLanguage}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => setSelectedLanguage('all')}
          />
        </Badge>
      )}
      
      {(minFee !== undefined || maxFee !== undefined) && setMinFee && setMaxFee && (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>
            الرسوم: ${minFee || 0} - ${maxFee || 30000}
          </span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => {
              setMinFee(undefined);
              setMaxFee(undefined);
            }}
          />
        </Badge>
      )}
      
      {worldRanking !== undefined && setWorldRanking && (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>التصنيف: {worldRanking}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => setWorldRanking(undefined)}
          />
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
