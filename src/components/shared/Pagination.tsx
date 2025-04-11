
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push(null); // Placeholder for ellipsis
      }
      
      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push(null); // Placeholder for ellipsis
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className={`flex justify-center mt-12 ${className}`}>
      <div className="flex items-center gap-2">
        <Button 
          variant="pagination" 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          aria-label="الصفحة السابقة"
        >
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
        </Button>
        
        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === null) {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2">
                ...
              </span>
            );
          }
          
          return (
            <Button 
              key={pageNumber}
              variant="pagination"
              aria-current={pageNumber === currentPage ? "page" : undefined}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          );
        })}
        
        <Button 
          variant="pagination" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="الصفحة التالية"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
