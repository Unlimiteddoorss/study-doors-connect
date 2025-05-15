
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ProgramFiltersValues {
  search: string;
  country: string[];
  degreeType: string[];
  language: string[];
  duration: [number, number];
  tuitionRange: [number, number];
  hasScholarship: boolean;
  isPopular: boolean;
}

export interface ProgramFiltersProps {
  onApplyFilters: (filters: ProgramFiltersValues) => void;
  countries: string[];
  languages: string[];
  initialFilters: ProgramFiltersValues;
  className?: string;
  isMobileFilterOpen?: boolean;
  onCloseMobileFilter?: () => void;
  filters?: {
    countries: string[];
    levels: string[];
    specialties: string[];
    languages: string[];
  };
  toggleCountryFilter?: (country: string) => void;
  toggleLevelFilter?: (level: string) => void;
  toggleSpecialtyFilter?: (specialty: string) => void;
  toggleLanguageFilter?: (language: string) => void;
  resetFilters?: () => void;
}

const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  onApplyFilters,
  countries,
  languages,
  initialFilters,
  className = '',
  isMobileFilterOpen,
  onCloseMobileFilter,
  filters = {
    countries: [],
    levels: [],
    specialties: [],
    languages: []
  },
  toggleCountryFilter,
  toggleLevelFilter,
  toggleSpecialtyFilter,
  toggleLanguageFilter,
  resetFilters
}) => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<ProgramFiltersValues>(initialFilters);
  
  // Update local state when initialFilters change
  useEffect(() => {
    setFilterValues(initialFilters);
  }, [initialFilters]);
  
  const handleInputChange = (field: keyof ProgramFiltersValues, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const toggleArrayValue = (field: keyof ProgramFiltersValues, value: string) => {
    if (!Array.isArray(filterValues[field])) return;
    
    setFilterValues(prev => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: currentArray.includes(value) 
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };
  
  const handleApply = () => {
    onApplyFilters(filterValues);
    if (onCloseMobileFilter) {
      onCloseMobileFilter();
    }
  };
  
  const handleReset = () => {
    const resetValues: ProgramFiltersValues = {
      search: '',
      country: [],
      degreeType: [],
      language: [],
      duration: [1, 6],
      tuitionRange: [0, 50000],
      hasScholarship: false,
      isPopular: false
    };
    
    setFilterValues(resetValues);
    onApplyFilters(resetValues);
    
    if (resetFilters) {
      resetFilters();
    }
  };
  
  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t('programs.filters', 'فلاتر البرامج')}
          </CardTitle>
          {isMobileFilterOpen && (
            <Button variant="ghost" size="sm" onClick={onCloseMobileFilter}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="search">{t('programs.searchPrograms', 'بحث البرامج')}</Label>
          <div className="flex mt-2">
            <Input
              id="search"
              type="text"
              value={filterValues.search}
              onChange={(e) => handleInputChange('search', e.target.value)}
              placeholder={t('programs.searchByName', 'ابحث باسم البرنامج أو الجامعة')}
              className="rounded-r-none"
            />
            <Button 
              type="button" 
              className="rounded-l-none"
              variant="default"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <Label>{t('programs.country', 'الدولة')}</Label>
          <div className="space-y-2 mt-2">
            {countries.map((country) => (
              <div key={country} className="flex items-center">
                <Checkbox 
                  id={`country-${country}`} 
                  checked={filterValues.country.includes(country)}
                  onCheckedChange={() => toggleArrayValue('country', country)}
                  className="ml-2"
                />
                <Label htmlFor={`country-${country}`} className="cursor-pointer">{country}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label>{t('programs.degreeType', 'نوع الدرجة')}</Label>
          <div className="space-y-2 mt-2">
            {['bachelor', 'master', 'doctorate'].map((degree) => (
              <div key={degree} className="flex items-center">
                <Checkbox 
                  id={`degree-${degree}`} 
                  checked={filterValues.degreeType.includes(degree)}
                  onCheckedChange={() => toggleArrayValue('degreeType', degree)}
                  className="ml-2"
                />
                <Label htmlFor={`degree-${degree}`} className="cursor-pointer">
                  {degree === 'bachelor' ? t('programs.bachelor', 'بكالوريوس') : 
                   degree === 'master' ? t('programs.master', 'ماجستير') : 
                   t('programs.doctorate', 'دكتوراه')}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <Label>{t('programs.duration', 'مدة الدراسة')}</Label>
            <span className="text-sm text-unlimited-gray">
              {filterValues.duration[0]} - {filterValues.duration[1]} {t('programs.years', 'سنوات')}
            </span>
          </div>
          <Slider
            value={filterValues.duration}
            min={1}
            max={6}
            step={1}
            onValueChange={(value) => handleInputChange('duration', value as [number, number])}
            className="py-4"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <Label>{t('programs.tuitionFee', 'الرسوم الدراسية')}</Label>
            <span className="text-sm text-unlimited-gray">
              ${filterValues.tuitionRange[0]} - ${filterValues.tuitionRange[1]}
            </span>
          </div>
          <Slider
            value={filterValues.tuitionRange}
            min={0}
            max={50000}
            step={1000}
            onValueChange={(value) => handleInputChange('tuitionRange', value as [number, number])}
            className="py-4"
          />
        </div>
        
        <div>
          <Label>{t('programs.language', 'لغة الدراسة')}</Label>
          <div className="space-y-2 mt-2">
            {languages.map((language) => (
              <div key={language} className="flex items-center">
                <Checkbox 
                  id={`language-${language}`} 
                  checked={filterValues.language.includes(language)}
                  onCheckedChange={() => toggleArrayValue('language', language)}
                  className="ml-2"
                />
                <Label htmlFor={`language-${language}`} className="cursor-pointer">{language}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox 
              id="has-scholarship" 
              checked={filterValues.hasScholarship}
              onCheckedChange={(checked) => handleInputChange('hasScholarship', !!checked)}
              className="ml-2"
            />
            <Label htmlFor="has-scholarship" className="cursor-pointer">
              {t('programs.hasScholarship', 'منح دراسية متاحة')}
            </Label>
          </div>
          
          <div className="flex items-center">
            <Checkbox 
              id="is-popular" 
              checked={filterValues.isPopular}
              onCheckedChange={(checked) => handleInputChange('isPopular', !!checked)}
              className="ml-2"
            />
            <Label htmlFor="is-popular" className="cursor-pointer">
              {t('programs.isPopular', 'البرامج الشائعة')}
            </Label>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="flex-1"
          >
            {t('programs.resetFilters', 'إعادة ضبط')}
          </Button>
          <Button 
            onClick={handleApply} 
            className="flex-1"
          >
            {t('programs.applyFilters', 'تطبيق')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramFilters;
