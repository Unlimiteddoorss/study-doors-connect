
import React from 'react';
import { Program } from '@/types';
import ProgramCard from '@/components/programs/ProgramCard';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/Pagination';

interface ProgramsGridProps {
  programs: Program[];
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  isLoading?: boolean;
  onResetFilters?: () => void;
}

const ProgramsGrid: React.FC<ProgramsGridProps> = ({
  programs,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unlimited-blue"></div>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على برامج تطابق بحثك</p>
        {onResetFilters && (
          <Button onClick={onResetFilters} className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
            إعادة ضبط البحث
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default ProgramsGrid;
