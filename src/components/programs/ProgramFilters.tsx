
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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

interface ProgramFiltersProps {
  onApplyFilters: (filters: ProgramFiltersValues) => void;
  className?: string;
  countries: string[];
  languages: string[];
  initialFilters?: Partial<ProgramFiltersValues>;
  isMobileFilterOpen?: boolean;
  onCloseMobileFilter?: () => void;
}

const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  onApplyFilters,
  className,
  countries,
  languages,
  initialFilters = {},
  isMobileFilterOpen = false,
  onCloseMobileFilter
}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<ProgramFiltersValues>({
    search: initialFilters.search || '',
    country: initialFilters.country || [],
    degreeType: initialFilters.degreeType || [],
    language: initialFilters.language || [],
    duration: initialFilters.duration || [1, 6],
    tuitionRange: initialFilters.tuitionRange || [0, 50000],
    hasScholarship: initialFilters.hasScholarship || false,
    isPopular: initialFilters.isPopular || false
  });
  
  const degreeTypes = [
    { value: 'bachelor', label: t('programs.bachelor', 'بكالوريوس') },
    { value: 'master', label: t('programs.master', 'ماجستير') },
    { value: 'phd', label: t('programs.phd', 'دكتوراه') },
    { value: 'diploma', label: t('programs.diploma', 'دبلوم') },
  ];
  
  const handleCheckboxChange = (field: 'degreeType' | 'country' | 'language', value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[field]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }
      
      return { ...prev, [field]: currentValues };
    });
  };
  
  const handleToggleChange = (field: 'hasScholarship' | 'isPopular') => {
    setFilters(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const handleReset = () => {
    setFilters({
      search: '',
      country: [],
      degreeType: [],
      language: [],
      duration: [1, 6],
      tuitionRange: [0, 50000],
      hasScholarship: false,
      isPopular: false
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
    
    if (onCloseMobileFilter && isMobileFilterOpen) {
      onCloseMobileFilter();
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-unlimited-blue/5 border-b py-3 px-4">
        <CardTitle className="text-md flex items-center">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {t('programs.filters', 'تصفية البرامج')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
            <Input
              type="text"
              placeholder={t('programs.searchPlaceholder', 'ابحث عن برنامج...') as string}
              className="pl-10"
              value={filters.search}
              onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          
          <Accordion type="multiple" defaultValue={["degree", "country", "language", "tuition"]}>
            <AccordionItem value="degree" className="border-b">
              <AccordionTrigger className="py-3">
                {t('programs.degreeType', 'نوع الدرجة')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {degreeTypes.map(degree => (
                    <div key={degree.value} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id={`degree-${degree.value}`}
                        checked={filters.degreeType.includes(degree.value)}
                        onCheckedChange={() => handleCheckboxChange('degreeType', degree.value)}
                      />
                      <label
                        htmlFor={`degree-${degree.value}`}
                        className="text-sm leading-none text-unlimited-dark-blue cursor-pointer"
                      >
                        {degree.label}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="country" className="border-b">
              <AccordionTrigger className="py-3">
                {t('programs.country', 'الدولة')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {countries.map(country => (
                    <div key={country} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id={`country-${country}`}
                        checked={filters.country.includes(country)}
                        onCheckedChange={() => handleCheckboxChange('country', country)}
                      />
                      <label
                        htmlFor={`country-${country}`}
                        className="text-sm leading-none text-unlimited-dark-blue cursor-pointer"
                      >
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="language" className="border-b">
              <AccordionTrigger className="py-3">
                {t('programs.language', 'لغة الدراسة')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {languages.map(language => (
                    <div key={language} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id={`language-${language}`}
                        checked={filters.language.includes(language)}
                        onCheckedChange={() => handleCheckboxChange('language', language)}
                      />
                      <label
                        htmlFor={`language-${language}`}
                        className="text-sm leading-none text-unlimited-dark-blue cursor-pointer"
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="duration" className="border-b">
              <AccordionTrigger className="py-3">
                {t('programs.duration', 'مدة الدراسة')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 px-2">
                  <Slider
                    value={filters.duration}
                    min={1}
                    max={6}
                    step={1}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value as [number, number] }))}
                  />
                  <div className="flex justify-between text-sm text-unlimited-gray">
                    <span>{filters.duration[0]} {t('programs.years', 'سنة')}</span>
                    <span>{t('programs.to', 'إلى')}</span>
                    <span>{filters.duration[1]} {t('programs.years', 'سنوات')}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="tuition" className="border-b">
              <AccordionTrigger className="py-3">
                {t('programs.tuition', 'الرسوم الدراسية')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 px-2">
                  <Slider
                    value={filters.tuitionRange}
                    min={0}
                    max={50000}
                    step={1000}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, tuitionRange: value as [number, number] }))}
                  />
                  <div className="flex justify-between text-sm text-unlimited-gray">
                    <span>{formatCurrency(filters.tuitionRange[0])}</span>
                    <span>{t('programs.to', 'إلى')}</span>
                    <span>{formatCurrency(filters.tuitionRange[1])}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="other" className="border-b">
              <AccordionTrigger className="py-3">
                {t('programs.otherOptions', 'خيارات أخرى')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id="scholarship"
                      checked={filters.hasScholarship}
                      onCheckedChange={() => handleToggleChange('hasScholarship')}
                    />
                    <label
                      htmlFor="scholarship"
                      className="text-sm leading-none text-unlimited-dark-blue cursor-pointer"
                    >
                      {t('programs.showScholarship', 'برامج تقدم منح دراسية')}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id="popular"
                      checked={filters.isPopular}
                      onCheckedChange={() => handleToggleChange('isPopular')}
                    />
                    <label
                      htmlFor="popular"
                      className="text-sm leading-none text-unlimited-dark-blue cursor-pointer"
                    >
                      {t('programs.showPopular', 'البرامج الأكثر شعبية')}
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="submit"
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue w-full"
            >
              {t('programs.applyFilters', 'تطبيق الفلاتر')}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('programs.resetFilters', 'إعادة تعيين الفلاتر')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProgramFilters;
