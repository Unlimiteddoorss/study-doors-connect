
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SearchButtonsProps {
  resetFilters: () => void;
  selectedDegree?: string;
  setSelectedDegree?: (value: string) => void;
  selectedLanguage?: string;
  setSelectedLanguage?: (value: string) => void;
  tempFeeRange?: [number, number];
  handleFeeRangeChange?: (values: number[]) => void;
  applyFeeFilter?: () => void;
  worldRanking?: number;
  setWorldRanking?: (value: number | undefined) => void;
  handleSearch: (e: React.FormEvent) => void;
  hasActiveFilters: boolean;
}

const SearchButtons: React.FC<SearchButtonsProps> = ({
  resetFilters,
  selectedDegree,
  setSelectedDegree,
  selectedLanguage,
  setSelectedLanguage,
  tempFeeRange = [0, 30000],
  handleFeeRangeChange,
  applyFeeFilter,
  worldRanking,
  setWorldRanking,
  handleSearch,
  hasActiveFilters
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  return (
    <div className="flex justify-between mt-4">
      <Button 
        type="button" 
        onClick={() => setIsFilterOpen(true)} 
        variant="outline"
        className="flex items-center gap-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>فلاتر متقدمة</span>
      </Button>
      
      <div className="space-x-2">
        {hasActiveFilters && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={resetFilters}
          >
            إعادة ضبط
          </Button>
        )}
        
        <Button 
          type="submit" 
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
        >
          بحث
        </Button>
      </div>
      
      {/* مربع حوار الفلاتر المتقدمة */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>فلاتر متقدمة</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {setSelectedDegree && (
              <div className="grid gap-2">
                <Label htmlFor="degree">الدرجة العلمية</Label>
                <Select 
                  value={selectedDegree} 
                  onValueChange={setSelectedDegree}
                >
                  <SelectTrigger id="degree">
                    <SelectValue placeholder="جميع الدرجات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الدرجات</SelectItem>
                    <SelectItem value="bachelor">بكالوريوس</SelectItem>
                    <SelectItem value="master">ماجستير</SelectItem>
                    <SelectItem value="phd">دكتوراه</SelectItem>
                    <SelectItem value="diploma">دبلوم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {setSelectedLanguage && (
              <div className="grid gap-2">
                <Label htmlFor="language">لغة الدراسة</Label>
                <Select 
                  value={selectedLanguage} 
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="جميع اللغات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع اللغات</SelectItem>
                    <SelectItem value="English">الإنجليزية</SelectItem>
                    <SelectItem value="Turkish">التركية</SelectItem>
                    <SelectItem value="Arabic">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {handleFeeRangeChange && tempFeeRange && (
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label>الرسوم الدراسية (بالدولار الأمريكي)</Label>
                  <span className="text-sm text-unlimited-gray">
                    ${tempFeeRange[0]} - ${tempFeeRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={tempFeeRange}
                  max={30000}
                  step={1000}
                  onValueChange={handleFeeRangeChange}
                  className="my-4"
                />
              </div>
            )}
            
            {setWorldRanking && (
              <div className="grid gap-2">
                <Label htmlFor="ranking">التصنيف العالمي</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Select 
                        value={worldRanking?.toString() || "all"} 
                        onValueChange={(val) => {
                          if (val === "all") {
                            setWorldRanking(undefined);
                          } else {
                            setWorldRanking(Number(val));
                          }
                        }}
                      >
                        <SelectTrigger id="ranking">
                          <SelectValue placeholder="جميع التصنيفات" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع التصنيفات</SelectItem>
                          <SelectItem value="500">أقل من 500</SelectItem>
                          <SelectItem value="1000">أقل من 1000</SelectItem>
                          <SelectItem value="2000">أقل من 2000</SelectItem>
                        </SelectContent>
                      </Select>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>فلترة الجامعات حسب ترتيبها العالمي</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsFilterOpen(false)}
            >
              إلغاء
            </Button>
            {applyFeeFilter && (
              <Button 
                type="button" 
                onClick={() => {
                  applyFeeFilter();
                  setIsFilterOpen(false);
                }}
                className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
              >
                تطبيق
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchButtons;
