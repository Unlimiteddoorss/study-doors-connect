import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash } from 'lucide-react';
import { availableCountries } from '@/data/programsData';

// New interface for ProgramFiltersValues
export interface ProgramFiltersValues {
  search?: string;
  country: string[];
  degreeType: string[];
  language: string[];
  duration: [number, number];
  tuitionRange: [number, number];
  hasScholarship: boolean;
  isPopular: boolean;
}

// Legacy filters interface for backward compatibility
export interface LegacyFilters {
  country: string;
  university: string;
  degree: string;
  language: string;
  fee: [number, number];
  hasScholarship: boolean;
}

// Filter options interface
export interface FilterOptions {
  countries: string[];
  levels: string[];
  specialties: string[];
  languages: string[];
}

interface ProgramFiltersProps {
  onApplyFilters?: (filters: ProgramFiltersValues) => void;
  filters?: LegacyFilters | FilterOptions;
  setFilters?: React.Dispatch<React.SetStateAction<LegacyFilters>>;
  countries?: Array<{ value: string; label: string; }>;
  languages?: string[];
  initialFilters?: ProgramFiltersValues;
  className?: string;
  isMobileFilterOpen?: boolean;
  onCloseMobileFilter?: () => void;
  toggleCountryFilter?: (country: string) => void;
  toggleLevelFilter?: (level: string) => void;
  toggleSpecialtyFilter?: (specialty: string) => void;
  toggleLanguageFilter?: (language: string) => void;
  resetFilters?: () => void;
}

// Helper function to format price
const formatPrice = (value: number): string => {
  return `$${value.toLocaleString()}`;
};

// Helper function to format duration
const formatDuration = (value: number): string => {
  return value === 1 ? `${value} سنة` : `${value} سنوات`;
};

const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  onApplyFilters,
  filters,
  setFilters,
  countries = availableCountries,
  languages = ['English', 'Arabic', 'Turkish'],
  initialFilters,
  className = '',
  isMobileFilterOpen = false,
  onCloseMobileFilter,
  toggleCountryFilter,
  toggleLevelFilter,
  toggleSpecialtyFilter,
  toggleLanguageFilter,
  resetFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<ProgramFiltersValues>(
    initialFilters || {
      search: '',
      country: [],
      degreeType: [],
      language: [],
      duration: [1, 6],
      tuitionRange: [0, 50000],
      hasScholarship: false,
      isPopular: false,
    }
  );

  // Levels for degree types
  const levels = [
    { value: 'bachelor', label: 'البكالوريوس' },
    { value: 'master', label: 'الماجستير' },
    { value: 'phd', label: 'الدكتوراه' },
    { value: 'diploma', label: 'الدبلوم' },
  ];

  // Handle local filter changes
  const handleFilterChange = (
    field: keyof ProgramFiltersValues,
    value: any
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(localFilters);
    }
    
    if (onCloseMobileFilter && isMobileFilterOpen) {
      onCloseMobileFilter();
    }
  };

  // Reset local filters
  const handleResetFilters = () => {
    setLocalFilters({
      search: '',
      country: [],
      degreeType: [],
      language: [],
      duration: [1, 6],
      tuitionRange: [0, 50000],
      hasScholarship: false,
      isPopular: false,
    });
    
    if (resetFilters) {
      resetFilters();
    }
  };

  // Handle legacy filters if provided
  const handleLegacyFilterChange = (field: keyof LegacyFilters, value: any) => {
    if (setFilters) {
      setFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <Card
      className={`p-4 overflow-auto ${
        isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white' : ''
      } ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">تصفية البرامج</h3>
        {isMobileFilterOpen && onCloseMobileFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseMobileFilter}
            className="text-gray-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        )}
      </div>

      <Accordion type="multiple" className="w-full">
        {/* Search Filter */}
        <AccordionItem value="search" className="border-b">
          <AccordionTrigger className="py-3">البحث</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">ابحث عن برنامج</Label>
                <Input
                  id="search"
                  placeholder="ادخل اسم البرنامج..."
                  value={localFilters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Country Filter */}
        <AccordionItem value="country" className="border-b">
          <AccordionTrigger className="py-3">الدولة</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {countries.map((country) => (
                <div key={country.value} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`country-${country.value}`}
                    checked={localFilters.country.includes(country.value)}
                    onCheckedChange={(checked) => {
                      const newCountries = checked
                        ? [...localFilters.country, country.value]
                        : localFilters.country.filter((c) => c !== country.value);
                      
                      handleFilterChange('country', newCountries);
                      
                      if (toggleCountryFilter) {
                        toggleCountryFilter(country.value);
                      }
                    }}
                  />
                  <Label
                    htmlFor={`country-${country.value}`}
                    className="text-sm cursor-pointer flex-grow"
                  >
                    {country.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Degree Level Filter */}
        <AccordionItem value="degreeType" className="border-b">
          <AccordionTrigger className="py-3">درجة البرنامج</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {levels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`level-${level.value}`}
                    checked={localFilters.degreeType.includes(level.value)}
                    onCheckedChange={(checked) => {
                      const newLevels = checked
                        ? [...localFilters.degreeType, level.value]
                        : localFilters.degreeType.filter((l) => l !== level.value);
                      
                      handleFilterChange('degreeType', newLevels);
                      
                      if (toggleLevelFilter) {
                        toggleLevelFilter(level.value);
                      }
                    }}
                  />
                  <Label
                    htmlFor={`level-${level.value}`}
                    className="text-sm cursor-pointer flex-grow"
                  >
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Language Filter */}
        <AccordionItem value="language" className="border-b">
          <AccordionTrigger className="py-3">لغة الدراسة</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`language-${language}`}
                    checked={localFilters.language.includes(language)}
                    onCheckedChange={(checked) => {
                      const newLanguages = checked
                        ? [...localFilters.language, language]
                        : localFilters.language.filter((l) => l !== language);
                      
                      handleFilterChange('language', newLanguages);
                      
                      if (toggleLanguageFilter) {
                        toggleLanguageFilter(language);
                      }
                    }}
                  />
                  <Label
                    htmlFor={`language-${language}`}
                    className="text-sm cursor-pointer flex-grow"
                  >
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Duration Filter */}
        <AccordionItem value="duration" className="border-b">
          <AccordionTrigger className="py-3">مدة البرنامج</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{formatDuration(localFilters.duration[0])}</span>
                  <span>{formatDuration(localFilters.duration[1])}</span>
                </div>
                <Slider
                  value={localFilters.duration}
                  min={1}
                  max={6}
                  step={1}
                  onValueChange={(value) =>
                    handleFilterChange('duration', value as [number, number])
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Tuition Fee Filter */}
        <AccordionItem value="tuitionRange" className="border-b">
          <AccordionTrigger className="py-3">الرسوم الدراسية</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{formatPrice(localFilters.tuitionRange[0])}</span>
                  <span>{formatPrice(localFilters.tuitionRange[1])}</span>
                </div>
                <Slider
                  value={localFilters.tuitionRange}
                  min={0}
                  max={50000}
                  step={1000}
                  onValueChange={(value) =>
                    handleFilterChange('tuitionRange', value as [number, number])
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Options */}
        <AccordionItem value="additionalOptions" className="border-b">
          <AccordionTrigger className="py-3">خيارات إضافية</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="hasScholarship" className="cursor-pointer">
                  يوجد منح دراسية
                </Label>
                <Switch
                  id="hasScholarship"
                  checked={localFilters.hasScholarship}
                  onCheckedChange={(checked) =>
                    handleFilterChange('hasScholarship', checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isPopular" className="cursor-pointer">
                  البرامج الشهيرة فقط
                </Label>
                <Switch
                  id="isPopular"
                  checked={localFilters.isPopular}
                  onCheckedChange={(checked) =>
                    handleFilterChange('isPopular', checked)
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col space-y-2 mt-4">
        <Button onClick={applyFilters} className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
          تطبيق التصفية
        </Button>
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="w-full flex items-center justify-center gap-2"
        >
          <Trash className="h-4 w-4" />
          إعادة ضبط
        </Button>
      </div>
    </Card>
  );
};

export default ProgramFilters;
