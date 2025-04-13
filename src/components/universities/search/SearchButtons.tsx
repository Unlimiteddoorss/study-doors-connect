
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import AdvancedFilterPopover from './AdvancedFilterPopover';

interface SearchButtonsProps {
  resetFilters: () => void;
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
  hasActiveFilters: boolean;
}

const SearchButtons: React.FC<SearchButtonsProps> = ({
  resetFilters,
  selectedDegree,
  setSelectedDegree,
  selectedLanguage,
  setSelectedLanguage,
  tempFeeRange,
  handleFeeRangeChange,
  applyFeeFilter,
  worldRanking,
  setWorldRanking,
  handleSearch,
  hasActiveFilters
}) => {
  return (
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
        <AdvancedFilterPopover 
          selectedDegree={selectedDegree}
          setSelectedDegree={setSelectedDegree}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          tempFeeRange={tempFeeRange}
          handleFeeRangeChange={handleFeeRangeChange}
          applyFeeFilter={applyFeeFilter}
          worldRanking={worldRanking}
          setWorldRanking={setWorldRanking}
          handleSearch={handleSearch}
        />
        
        <Button
          type="submit"
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-base px-6 py-2"
        >
          بحث
          <Search className="h-4 w-4 mr-2" />
        </Button>
      </div>
    </div>
  );
};

export default SearchButtons;
