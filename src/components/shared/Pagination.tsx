
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // إنشاء مصفوفة لأرقام الصفحات التي سيتم عرضها
  const getPageNumbers = () => {
    const pages = [];
    
    // إضافة الصفحة الأولى دائمًا
    pages.push(1);
    
    if (totalPages <= 5) {
      // إذا كان العدد الإجمالي للصفحات 5 أو أقل، عرض جميع الصفحات
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // عرض الصفحات حول الصفحة الحالية
      if (currentPage > 3) {
        pages.push('ellipsis1');
      }
      
      // الصفحات حول الصفحة الحالية
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis2');
      }
      
      // إضافة الصفحة الأخيرة دائمًا
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((page, index) => 
        page === 'ellipsis1' || page === 'ellipsis2' ? (
          <Button
            key={`ellipsis-${index}`}
            variant="ghost"
            disabled
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page as number)}
            className={currentPage === page ? "bg-unlimited-blue hover:bg-unlimited-dark-blue" : ""}
          >
            {page}
          </Button>
        )
      )}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );
};
