
import React from 'react';
import { University } from '@/components/universities/UniversityCard';
import UniversityCard from '@/components/universities/UniversityCard';
import UniversityListItem from '@/components/universities/UniversityListItem';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/Pagination';
import { X } from 'lucide-react';
import UniversityCardCompare from './UniversityCardCompare';

type ViewMode = 'grid' | 'list';

interface UniversitiesGridProps {
  universities: University[];
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  isLoading?: boolean;
  onResetFilters?: () => void;
  countryTranslations?: Record<string, string>;
  viewMode?: ViewMode;
  compareIds?: number[];
  onToggleCompare?: (id: number) => void;
  onClearAllCompare?: () => void;
}

const UniversitiesGrid: React.FC<UniversitiesGridProps> = ({
  universities,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  onResetFilters,
  countryTranslations = {},
  viewMode = 'grid',
  compareIds = [],
  onToggleCompare,
  onClearAllCompare
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unlimited-blue"></div>
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على جامعات تطابق بحثك</p>
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
      {/* Compare Bar */}
      {compareIds.length > 0 && onToggleCompare && onClearAllCompare && (
        <div className="sticky top-4 z-10 bg-unlimited-blue text-white rounded-lg p-3 mb-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">مقارنة الجامعات:</span>
            <div className="flex gap-1">
              {compareIds.map(id => {
                const university = universities.find(uni => uni.id === id);
                if (!university) return null;
                
                return (
                  <div key={id} className="bg-white/20 text-white rounded-full px-2 py-1 text-sm flex items-center">
                    <span className="truncate max-w-[100px]">{university.nameAr || university.name}</span>
                    <button 
                      className="ml-1 hover:bg-white/30 rounded-full p-0.5"
                      onClick={() => onToggleCompare(id)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/40 text-white"
              onClick={onClearAllCompare}
            >
              إلغاء الجميع
            </Button>
            <Button 
              size="sm" 
              className="bg-white text-unlimited-blue hover:bg-white/90"
            >
              عرض المقارنة
            </Button>
          </div>
        </div>
      )}

      {/* Universities List/Grid */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        : "flex flex-col space-y-4"
      }>
        {universities.map((university) => (
          viewMode === 'grid' ? (
            <div key={university.id} className="relative">
              {onToggleCompare && (
                <UniversityCardCompare
                  id={university.id}
                  isSelected={compareIds.includes(university.id)}
                  onToggleCompare={onToggleCompare}
                />
              )}
              <UniversityCard 
                university={university}
                countryTranslations={countryTranslations}
              />
            </div>
          ) : (
            <UniversityListItem
              key={university.id}
              university={university}
              isCompareSelected={compareIds.includes(university.id)}
              onToggleCompare={onToggleCompare || (() => {})}
              countryTranslations={countryTranslations}
            />
          )
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

export default UniversitiesGrid;
