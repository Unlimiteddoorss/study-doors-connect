
import React from 'react';
import ProgramCard from './ProgramCard';
import { Link } from 'react-router-dom';
import { TablePagination } from '@/components/admin/TablePagination';
import { Program } from './ProgramCard';

interface ExtendedProgramBase {
  id: string | number;
  isFeatured?: boolean;
}

interface SoftwareEngineeringProgram extends ExtendedProgramBase {
  id: string;
  name: string;
  university: string;
  degree: string;
  duration: string;
  language: string;
  tuition: string;
  image?: string;
}

// Union type for both program formats
type ProgramType = Program | SoftwareEngineeringProgram;

interface ProgramsGridProps {
  programs: ProgramType[];
  emptyMessage?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onResetFilters?: () => void;
}

const ProgramsGrid = ({ 
  programs, 
  emptyMessage = "لم يتم العثور على برامج مطابقة للمعايير المحددة",
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters
}: ProgramsGridProps) => {
  // إضافة برنامج هندسة البرمجيات
  const softwareEngineeringProgram: SoftwareEngineeringProgram = {
    id: 'software-engineering',
    name: 'هندسة البرمجيات',
    university: 'جامعة اسطنبول التقنية',
    degree: 'بكالوريوس',
    duration: '4 سنوات',
    language: 'الإنجليزية',
    tuition: '5500 دولار/سنوياً',
    isFeatured: true
  };
  
  // إضافة برنامج هندسة البرمجيات لجامعة كولتور
  const kulturSoftwareEngineeringProgram: SoftwareEngineeringProgram = {
    id: 'kultur-software-engineering',
    name: 'هندسة البرمجيات',
    university: 'جامعة اسطنبول كولتور',
    degree: 'بكالوريوس',
    duration: '4 سنوات',
    language: 'الإنجليزية',
    tuition: '7600 دولار/سنوياً',
    isFeatured: true
  };

  // دمج البرامج مع برنامج هندسة البرمجيات
  const allPrograms = [softwareEngineeringProgram, kulturSoftwareEngineeringProgram, ...programs];

  if (allPrograms.length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-md bg-gray-50">
        <p className="text-unlimited-gray">{emptyMessage}</p>
        {onResetFilters && (
          <button 
            onClick={onResetFilters}
            className="mt-4 text-unlimited-blue hover:underline"
          >
            إعادة ضبط المرشحات
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPrograms.map((program) => {
          // Determine if this is the software engineering program by ID
          const isTechUnivSoftwareEngProgram = program.id === 'software-engineering';
          const isKulturUnivSoftwareEngProgram = program.id === 'kultur-software-engineering';
          
          if (isTechUnivSoftwareEngProgram || isKulturUnivSoftwareEngProgram) {
            const softwareProgram = program as SoftwareEngineeringProgram;
            // Transform to match ProgramCard expected props
            const adaptedProgram: Program = {
              id: softwareProgram.id,
              title: softwareProgram.name,
              university: softwareProgram.university,
              location: 'Turkey، إسطنبول',
              language: softwareProgram.language,
              duration: softwareProgram.duration,
              deadline: '2024/12/31',
              fee: softwareProgram.tuition,
              image: isTechUnivSoftwareEngProgram 
                ? '/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png' 
                : '/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png',
              isFeatured: softwareProgram.isFeatured,
              badges: [
                softwareProgram.degree, 
                'معتمد دولياً', 
                isKulturUnivSoftwareEngProgram ? 'خصم 50%' : 'فرصة تدريب عملي'
              ],
              discount: isKulturUnivSoftwareEngProgram ? '3800 دولار/سنوياً' : undefined
            };
            
            return (
              <Link key={program.id} to="/programs/software-engineering" className="transition-transform hover:scale-[1.02]">
                <ProgramCard program={adaptedProgram} />
              </Link>
            );
          } else {
            // Regular program
            const standardProgram = program as Program;
            return (
              <Link key={program.id} to={`/program/${program.id}`} className="transition-transform hover:scale-[1.02]">
                <ProgramCard program={standardProgram} />
              </Link>
            );
          }
        })}
      </div>
      
      {/* Pagination controls */}
      {currentPage && totalPages && totalPages > 1 && onPageChange && (
        <div className="mt-8 flex justify-center">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProgramsGrid;
