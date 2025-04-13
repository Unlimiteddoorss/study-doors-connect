
import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { availableDegrees, availableLanguages } from '@/data/universityPrograms';

interface AdvancedFilterPopoverProps {
  selectedDegree?: string;
  setSelectedDegree?: (value: string) => void;
  selectedLanguage?: string;
  setSelectedLanguage?: (value: string) => void;
  tempFeeRange: [number, number];
  handleFeeRangeChange: (values: number[]) => void;
  applyFeeFilter: () => void;
  worldRanking?: number;
  setWorldRanking?: (value: number | undefined) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const AdvancedFilterPopover: React.FC<AdvancedFilterPopoverProps> = ({
  selectedDegree,
  setSelectedDegree,
  selectedLanguage,
  setSelectedLanguage,
  tempFeeRange,
  handleFeeRangeChange,
  applyFeeFilter,
  worldRanking,
  setWorldRanking,
  handleSearch
}) => {
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

  return (
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
          {tempFeeRange && (
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
                    onChange={(e) => handleFeeRangeChange([parseInt(e.target.value) || 0, tempFeeRange[1]])}
                  />
                </div>
                <div>
                  <Input 
                    type="number" 
                    placeholder="إلى" 
                    value={tempFeeRange[1]}
                    onChange={(e) => handleFeeRangeChange([tempFeeRange[0], parseInt(e.target.value) || 30000])}
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
  );
};

export default AdvancedFilterPopover;
