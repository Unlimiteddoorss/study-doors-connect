
import React, { useState, useCallback } from 'react';
import { Search, Filter, X, ChevronDown, DollarSign, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { availableDegrees, availableLanguages } from '@/data/universityPrograms';

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

  const hasActiveFilters = searchTerm || selectedCity !== 'all' || selectedType !== 'all' || 
                        (selectedDegree && selectedDegree !== 'all') || 
                        (selectedLanguage && selectedLanguage !== 'all') ||
                        (minFee !== undefined) || (maxFee !== undefined) ||
                        (worldRanking !== undefined);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن جامعة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 h-12 text-lg"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* City Select */}
          <Select 
            value={selectedCity} 
            onValueChange={setSelectedCity}
          >
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="اختر المدينة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المدن</SelectItem>
              {cities.sort().map((city) => (
                <SelectItem key={city} value={city}>
                  {translateCity(city)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* University Type Select */}
          <Select 
            value={selectedType} 
            onValueChange={setSelectedType}
          >
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="نوع الجامعة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع أنواع الجامعات</SelectItem>
              <SelectItem value="Public">حكومية</SelectItem>
              <SelectItem value="Private">خاصة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Active Filters */}
        {hasActiveFilters && (
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
        )}
        
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="text-base px-4 py-2"
          >
            إعادة ضبط
          </Button>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex items-center gap-1 text-base px-4 py-2"
                >
                  <Filter className="h-4 w-4" />
                  فلترة متقدمة
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">خيارات متقدمة</h4>
                  
                  {/* فلتر الدرجة العلمية */}
                  {setSelectedDegree && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الدرجة العلمية</label>
                      <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                        <SelectTrigger>
                          <SelectValue placeholder="جميع الدرجات" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الدرجات</SelectItem>
                          {availableDegrees.map(degree => (
                            <SelectItem key={degree} value={degree}>
                              {translateDegree(degree)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {/* فلتر اللغة */}
                  {setSelectedLanguage && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">لغة الدراسة</label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="جميع اللغات" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع اللغات</SelectItem>
                          {availableLanguages.map(language => (
                            <SelectItem key={language} value={language}>
                              {translateLanguage(language)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {/* فلتر الرسوم السنوية */}
                  {setMinFee && setMaxFee && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">الرسوم السنوية</label>
                        <div className="flex justify-between mt-1 text-sm text-unlimited-gray">
                          <span>${tempFeeRange[0]}</span>
                          <span>${tempFeeRange[1]}</span>
                        </div>
                        <Slider 
                          defaultValue={[tempFeeRange[0], tempFeeRange[1]]} 
                          max={30000} 
                          step={500}
                          value={[tempFeeRange[0], tempFeeRange[1]]}
                          onValueChange={handleFeeRangeChange}
                          className="mt-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Input 
                            type="number" 
                            placeholder="من" 
                            value={tempFeeRange[0]}
                            onChange={(e) => setTempFeeRange([parseInt(e.target.value) || 0, tempFeeRange[1]])}
                          />
                        </div>
                        <div>
                          <Input 
                            type="number" 
                            placeholder="إلى" 
                            value={tempFeeRange[1]}
                            onChange={(e) => setTempFeeRange([tempFeeRange[0], parseInt(e.target.value) || 30000])}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* فلتر التصنيف العالمي */}
                  {setWorldRanking && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">التصنيف العالمي</label>
                      <div className="grid grid-cols-1 gap-2">
                        <Select 
                          value={worldRanking?.toString() || 'all'} 
                          onValueChange={(value) => setWorldRanking(value === 'all' ? undefined : parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر التصنيف" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">جميع الجامعات</SelectItem>
                            <SelectItem value="500">أفضل 500 جامعة</SelectItem>
                            <SelectItem value="1000">أفضل 1000 جامعة</SelectItem>
                            <SelectItem value="2000">أفضل 2000 جامعة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <Button 
                      type="button" 
                      className="w-full bg-unlimited-blue" 
                      onClick={() => {
                        applyFeeFilter();
                        handleSearch(new Event('submit') as unknown as React.FormEvent);
                      }}
                    >
                      تطبيق الفلتر
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button
              type="submit"
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-base px-6 py-2"
            >
              بحث
              <Search className="h-4 w-4 mr-2" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UniversitySearch;
