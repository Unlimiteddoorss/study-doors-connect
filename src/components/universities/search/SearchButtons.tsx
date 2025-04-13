
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilterX, Search, SlidersHorizontal } from 'lucide-react';

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
  handleSearch,
  hasActiveFilters
}) => {
  return (
    <div className="flex justify-end mt-4 gap-3">
      {hasActiveFilters && (
        <Button
          type="button"
          variant="outline"
          onClick={resetFilters}
          className="flex items-center gap-1"
        >
          <FilterX className="h-4 w-4" />
          إعادة ضبط
        </Button>
      )}
      
      <Button
        type="submit"
        className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-1"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
        بحث
      </Button>
    </div>
  );
};

export default SearchButtons;
