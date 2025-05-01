
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: TablePaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    // If totalPages is small, just show all pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return pages;
    }
    
    // Show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => onPageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Calculate start and end of the sibling pages
    const startSibling = Math.max(2, currentPage - siblingCount);
    const endSibling = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add left ellipsis if needed
    if (startSibling > 2) {
      pages.push(
        <PaginationItem key="left-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add sibling pages
    for (let i = startSibling; i <= endSibling; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add right ellipsis if needed
    if (endSibling < totalPages - 1) {
      pages.push(
        <PaginationItem key="right-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show last page if not already included
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        
        {renderPageNumbers()}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { TablePagination };
