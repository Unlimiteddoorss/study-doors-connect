
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

// Support legacy filter format
export interface LegacyFilters {
  country: string;
  university: string;
  degree: string;
  language: string;
  fee: number[];
  hasScholarship: boolean;
}

export interface FiltersMapping {
  countries?: string[];
  levels?: string[];
  specialties?: string[];
  languages?: string[];
}

export interface ProgramFiltersProps {
  onApplyFilters?: (filters: ProgramFiltersValues) => void;
  countries?: string[];
  languages?: string[];
  initialFilters?: ProgramFiltersValues;
  className?: string;
  isMobileFilterOpen?: boolean;
  onCloseMobileFilter?: () => void;
  filters?: FiltersMapping;
  toggleCountryFilter?: (country: string) => void;
  toggleLevelFilter?: (level: string) => void;
  toggleSpecialtyFilter?: (specialty: string) => void;
  toggleLanguageFilter?: (language: string) => void;
  resetFilters?: () => void;
}

const ProgramFilters: React.FC<ProgramFiltersProps | { filters: LegacyFilters, setFilters: (filters: LegacyFilters) => void }> = (props) => {
  const { t } = useTranslation();
  
  // Handle legacy props structure
  if ('filters' in props && 'setFilters' in props && typeof props.setFilters === 'function') {
    const { filters, setFilters } = props;
    
    // Legacy filters UI
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t('programs.filters', 'فلاتر البرامج')}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">{t('programs.country', 'الدولة')}</h3>
            <div className="space-y-1">
              <Button 
                variant={filters.country === 'Turkey' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, country: filters.country === 'Turkey' ? '' : 'Turkey'})}
                className="mr-2 mb-2"
              >
                تركيا
              </Button>
              <Button 
                variant={filters.country === 'Cyprus' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, country: filters.country === 'Cyprus' ? '' : 'Cyprus'})}
                className="mr-2 mb-2"
              >
                قبرص
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t('programs.degreeType', 'نوع الدرجة')}</h3>
            <div className="space-y-1">
              <Button 
                variant={filters.degree === 'Bachelor' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, degree: filters.degree === 'Bachelor' ? '' : 'Bachelor'})}
                className="mr-2 mb-2"
              >
                بكالوريوس
              </Button>
              <Button 
                variant={filters.degree === 'Master' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, degree: filters.degree === 'Master' ? '' : 'Master'})}
                className="mr-2 mb-2"
              >
                ماجستير
              </Button>
              <Button 
                variant={filters.degree === 'PhD' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, degree: filters.degree === 'PhD' ? '' : 'PhD'})}
                className="mr-2 mb-2"
              >
                دكتوراه
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t('programs.language', 'لغة الدراسة')}</h3>
            <div className="space-y-1">
              <Button 
                variant={filters.language === 'English' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, language: filters.language === 'English' ? '' : 'English'})}
                className="mr-2 mb-2"
              >
                الإنجليزية
              </Button>
              <Button 
                variant={filters.language === 'Turkish' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, language: filters.language === 'Turkish' ? '' : 'Turkish'})}
                className="mr-2 mb-2"
              >
                التركية
              </Button>
              <Button 
                variant={filters.language === 'Arabic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters({...filters, language: filters.language === 'Arabic' ? '' : 'Arabic'})}
                className="mr-2 mb-2"
              >
                العربية
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">{t('programs.tuitionFee', 'الرسوم الدراسية')}</h3>
              <span className="text-sm text-unlimited-gray">
                ${filters.fee[0]} - ${filters.fee[1]}
              </span>
            </div>
            <Slider
              value={filters.fee}
              min={0}
              max={20000}
              step={500}
              onValueChange={(value) => setFilters({...filters, fee: value as [number, number]})}
              className="py-4"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="scholarship"
              checked={filters.hasScholarship}
              onCheckedChange={(checked) => 
                setFilters({...filters, hasScholarship: checked === true})
              }
            />
            <Label htmlFor="scholarship" className="mr-2 cursor-pointer">
              {t('programs.hasScholarship', 'منح دراسية متاحة')}
            </Label>
          </div>
          
          <Button 
            onClick={() => setFilters({
              country: '',
              university: '',
              degree: '',
              language: '',
              fee: [0, 20000],
              hasScholarship: false
            })} 
            variant="outline" 
            className="w-full"
          >
            {t('programs.resetFilters', 'إعادة ضبط')}
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Modern version of filters
  const { 
    onApplyFilters,
    countries = ["Turkey", "Cyprus", "UK", "USA", "Canada"],
    languages = ["English", "Turkish", "Arabic"],
    initialFilters = {
      search: '',
      country: [],
      degreeType: [],
      language: [],
      duration: [1, 6],
      tuitionRange: [0, 50000],
      hasScholarship: false,
      isPopular: false
    },
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
  } = props as ProgramFiltersProps;
  
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
    if (onApplyFilters) {
      onApplyFilters(filterValues);
    }
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
    if (onApplyFilters) {
      onApplyFilters(resetValues);
    }
    
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
