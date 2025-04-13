
import React from 'react';
import { Filter, X } from 'lucide-react';
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
  tempFeeRange: [number, number];
  setTempFeeRange: (value: [number, number]) => void;
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
  tempFeeRange,
  setTempFeeRange,
  countryTranslations,
  hasActiveFilters
}) => {
  // ترجمة اسم المدينة من الإنجليزية إلى العربية
  const translateCity = (city: string): string => {
    return countryTranslations[city] || city;
  };

  // ترجمة الدرجة العلمية
  const translateDegree = (degree: string): string => {
    switch(degree) {
      case 'Bachelor': return 'بكالوريوس';
      case 'Master': return 'ماجستير';
      case 'PhD': return 'دكتوراه';
      case 'Diploma': return 'دبلوم';
      case 'Vocational School': return 'معهد مهني';
      default: return degree;
    }
  };

  // ترجمة اللغة
  const translateLanguage = (language: string): string => {
    switch(language) {
      case 'English': return 'الإنجليزية';
      case 'Turkish': return 'التركية';
      case 'Arabic': return 'العربية';
      default: return language;
    }
  };

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-2">
      <div className="flex items-center gap-1 text-unlimited-gray">
        <Filter className="h-4 w-4" />
        <span>المرشحات النشطة:</span>
      </div>
      
      {searchTerm && (
        <Badge variant="secondary" className="flex items-center gap-1 text-base py-1.5 px-3">
          بحث: {searchTerm}
          <X 
            className="h-4 w-4 mr-1 cursor-pointer" 
            onClick={() => setSearchTerm('')} 
          />
        </Badge>
      )}
      
      {selectedCity !== 'all' && (
        <Badge variant="secondary" className="flex items-center gap-1 text-base py-1.5 px-3">
          المدينة: {translateCity(selectedCity)}
          <X 
            className="h-4 w-4 mr-1 cursor-pointer" 
            onClick={() => setSelectedCity('all')} 
          />
        </Badge>
      )}
      
      {selectedType !== 'all' && (
        <Badge variant="secondary" className="flex items-center gap-1 text-base py-1.5 px-3">
          النوع: {selectedType === 'Private' ? 'خاصة' : 'حكومية'}
          <X 
            className="h-4 w-4 mr-1 cursor-pointer" 
            onClick={() => setSelectedType('all')} 
          />
        </Badge>
      )}

      {selectedDegree && selectedDegree !== 'all' && setSelectedDegree && (
        <Badge variant="secondary" className="flex items-center gap-1 text-base py-1.5 px-3">
          الدرجة: {translateDegree(selectedDegree)}
          <X 
            className="h-4 w-4 mr-1 cursor-pointer" 
            onClick={() => setSelectedDegree('all')} 
          />
        </Badge>
      )}

      {selectedLanguage && selectedLanguage !== 'all' && setSelectedLanguage && (
        <Badge variant="secondary" className="flex items-center gap-1 text-base py-1.5 px-3">
          اللغة: {translateLanguage(selectedLanguage)}
          <X 
            className="h-4 w-4 mr-1 cursor-pointer" 
            onClick={() => setSelectedLanguage('all')} 
          />
        </Badge>
      )}
      
      {(minFee !== undefined || maxFee !== undefined) && setMinFee && setMaxFee && (
        <Badge variant="secondary" className="flex items-center gap-1 text-base py-1.5 px-3">
          الرسوم: {minFee !== undefined ? `${minFee}$` : '0$'} - {maxFee !== undefined ? `${maxFee}$` : 'غير محدد'}
          <X 
            className="h-4 w-4 mr-1 cursor-pointer" 
            onClick={() => {
              setMinFee(undefined);
              setMaxFee(undefined);
              setTempFeeRange([0, 30000]);
            }} 
          />
        </Badge>
      )}
      
      {worldRanking !== undefined && setWorldRanking && (
        <Badge variant="secondary" className="flex items-center gap-1 text-base py-1.5 px-3">
          التصنيف العالمي: {worldRanking < 1000 ? `أفضل من ${worldRanking}` : 'غير مصنفة'}
          <X 
            className="h-4 w-4 mr-1 cursor-pointer" 
            onClick={() => setWorldRanking(undefined)} 
          />
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
