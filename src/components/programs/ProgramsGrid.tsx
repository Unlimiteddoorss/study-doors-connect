
import React from 'react';
import ProgramCard from './ProgramCard';
import { Link } from 'react-router-dom';

interface Program {
  id: string;
  name: string;
  university: string;
  degree: string;
  duration: string;
  language: string;
  tuition: string;
  image?: string;
  isFeatured?: boolean;
}

interface ProgramsGridProps {
  programs: Program[];
  emptyMessage?: string;
}

const ProgramsGrid = ({ programs, emptyMessage = "لم يتم العثور على برامج مطابقة للمعايير المحددة" }: ProgramsGridProps) => {
  // إضافة برنامج هندسة البرمجيات
  const softwareEngineeringProgram = {
    id: 'software-engineering',
    name: 'هندسة البرمجيات',
    university: 'جامعة اسطنبول التقنية',
    degree: 'بكالوريوس',
    duration: '4 سنوات',
    language: 'الإنجليزية',
    tuition: '5500 دولار/سنوياً',
    isFeatured: true
  };

  // دمج البرامج مع برنامج هندسة البرمجيات
  const allPrograms = [softwareEngineeringProgram, ...programs];

  if (allPrograms.length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-md bg-gray-50">
        <p className="text-unlimited-gray">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allPrograms.map((program) => (
        program.id === 'software-engineering' ? (
          <Link key={program.id} to="/programs/software-engineering" className="transition-transform hover:scale-[1.02]">
            <ProgramCard program={program} />
          </Link>
        ) : (
          <Link key={program.id} to={`/program/${program.id}`} className="transition-transform hover:scale-[1.02]">
            <ProgramCard program={program} />
          </Link>
        )
      ))}
    </div>
  );
};

export default ProgramsGrid;
