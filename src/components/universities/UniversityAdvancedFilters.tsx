
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Autocomplete } from '@/components/ui/autocomplete';
import { SlidersHorizontal, X, Check, Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface FiltersState {
  search: string;
  types: string[];
  locations: string[];
  languages: string[];
  minRanking?: number;
  maxRanking?: number;
  minStudents?: number;
  maxStudents?: number;
  featured: boolean;
}

interface UniversityAdvancedFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onReset: () => void;
  locations: { value: string; label: string }[];
  types: { value: string; label: string }[];
  languages: { value: string; label: string }[];
  isMobile?: boolean;
  countryTranslations: Record<string, string>;
}

const UniversityAdvancedFilters: React.FC<UniversityAdvancedFiltersProps> = ({
  filters,
  onChange,
  onReset,
  locations,
  types,
  languages,
  isMobile = false,
  countryTranslations
}) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  // Helper function to update a specific filter
  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  // Helper function to toggle array values
  const toggleArrayValue = (key: 'types' | 'locations' | 'languages', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.types.length) count++;
    if (filters.locations.length) count++;
    if (filters.languages.length) count++;
    if (filters.minRanking !== undefined || filters.maxRanking !== undefined) count++;
    if (filters.minStudents !== undefined || filters.maxStudents !== undefined) count++;
    if (filters.featured) count++;
    return count;
  };

  // Active filter badges
  const renderFilterBadges = () => {
    const badges = [];
    
    // Add search term
    if (filters.search) {
      badges.push(
        <Badge key="search" variant="outline" className="flex items-center gap-1">
          <span>بحث: {filters.search}</span>
          <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('search', '')} />
        </Badge>
      );
    }
    
    // Add university types
    filters.types.forEach(type => {
      badges.push(
        <Badge key={`type-${type}`} variant="outline" className="flex items-center gap-1">
          <span>النوع: {type === 'Public' ? 'حكومية' : 'خاصة'}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => toggleArrayValue('types', type)} 
          />
        </Badge>
      );
    });
    
    // Add locations
    filters.locations.forEach(location => {
      badges.push(
        <Badge key={`location-${location}`} variant="outline" className="flex items-center gap-1">
          <span>الموقع: {countryTranslations[location] || location}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => toggleArrayValue('locations', location)} 
          />
        </Badge>
      );
    });
    
    // Add languages
    filters.languages.forEach(language => {
      const languageLabel = 
        language === 'English' ? 'الإنجليزية' : 
        language === 'Turkish' ? 'التركية' : 
        language === 'Arabic' ? 'العربية' : language;
        
      badges.push(
        <Badge key={`language-${language}`} variant="outline" className="flex items-center gap-1">
          <span>اللغة: {languageLabel}</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => toggleArrayValue('languages', language)} 
          />
        </Badge>
      );
    });
    
    // Add ranking range
    if (filters.minRanking !== undefined || filters.maxRanking !== undefined) {
      badges.push(
        <Badge key="ranking" variant="outline" className="flex items-center gap-1">
          <span>
            التصنيف: {filters.minRanking !== undefined ? filters.minRanking : ''}
            {filters.minRanking !== undefined && filters.maxRanking !== undefined ? ' - ' : ''}
            {filters.maxRanking !== undefined ? filters.maxRanking : ''}
          </span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => {
              updateFilter('minRanking', undefined);
              updateFilter('maxRanking', undefined);
            }} 
          />
        </Badge>
      );
    }
    
    // Add students range
    if (filters.minStudents !== undefined || filters.maxStudents !== undefined) {
      badges.push(
        <Badge key="students" variant="outline" className="flex items-center gap-1">
          <span>
            الطلاب: {filters.minStudents !== undefined ? filters.minStudents : ''}
            {filters.minStudents !== undefined && filters.maxStudents !== undefined ? ' - ' : ''}
            {filters.maxStudents !== undefined ? filters.maxStudents : ''}
          </span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => {
              updateFilter('minStudents', undefined);
              updateFilter('maxStudents', undefined);
            }} 
          />
        </Badge>
      );
    }
    
    // Add featured
    if (filters.featured) {
      badges.push(
        <Badge key="featured" variant="outline" className="flex items-center gap-1">
          <span>الجامعات المميزة فقط</span>
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => updateFilter('featured', false)} 
          />
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-unlimited-blue" />
            <h3 className="font-semibold text-lg">البحث المتقدم</h3>
            {countActiveFilters() > 0 && (
              <Badge className="bg-unlimited-blue">
                {countActiveFilters()}
              </Badge>
            )}
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <SlidersHorizontal className="h-4 w-4 ml-1" />
                {isOpen ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
              </Button>
            </CollapsibleTrigger>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {renderFilterBadges()}
              
              {countActiveFilters() > 0 && (
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-red-50"
                  onClick={onReset}
                >
                  مسح الكل
                </Badge>
              )}
            </div>
            
            <CollapsibleContent>
              <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* البحث بالنص */}
                <div>
                  <label className="block text-sm font-medium mb-1">البحث بالنص</label>
                  <Input 
                    placeholder="اسم الجامعة أو موقعها..." 
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                  />
                </div>
                
                {/* نوع الجامعة */}
                <div>
                  <label className="block text-sm font-medium mb-1">نوع الجامعة</label>
                  <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                      <div key={type.value} className="flex items-center">
                        <Checkbox 
                          id={`type-${type.value}`}
                          checked={filters.types.includes(type.value)}
                          onCheckedChange={() => toggleArrayValue('types', type.value)}
                        />
                        <label 
                          htmlFor={`type-${type.value}`}
                          className="mr-2 text-sm"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* الموقع */}
                <div>
                  <label className="block text-sm font-medium mb-1">الموقع</label>
                  <Autocomplete
                    options={locations}
                    value={filters.locations.length === 1 ? filters.locations[0] : ''}
                    onChange={(value) => {
                      if (value) {
                        updateFilter('locations', [value]);
                      } else {
                        updateFilter('locations', []);
                      }
                    }}
                    placeholder="اختر الموقع"
                    allowFiltering={true}
                  />
                </div>
                
                {/* اللغة */}
                <div>
                  <label className="block text-sm font-medium mb-1">لغة الدراسة</label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <div key={language.value} className="flex items-center">
                        <Checkbox 
                          id={`language-${language.value}`}
                          checked={filters.languages.includes(language.value)}
                          onCheckedChange={() => toggleArrayValue('languages', language.value)}
                        />
                        <label 
                          htmlFor={`language-${language.value}`}
                          className="mr-2 text-sm"
                        >
                          {language.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* جامعات مميزة */}
                <div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="featured"
                      checked={filters.featured}
                      onCheckedChange={(checked) => updateFilter('featured', checked === true)}
                    />
                    <label
                      htmlFor="featured"
                      className="mr-2 text-sm font-medium"
                    >
                      عرض الجامعات المميزة فقط
                    </label>
                  </div>
                </div>
                
                {/* أزرار التحكم */}
                <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={onReset}
                  >
                    إعادة ضبط
                  </Button>
                  <Button 
                    className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
                    onClick={() => setIsOpen(false)}
                  >
                    <Check className="h-4 w-4 ml-1" />
                    تطبيق الفلترة
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityAdvancedFilters;
