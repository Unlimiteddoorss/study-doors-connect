
import React from 'react';
import { Program } from '@/data/programsData';
import ProgramCard from '../programs/ProgramCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, BookOpen, School, Globe } from 'lucide-react';

interface UniversityProgramsProps {
  programs: Program[];
  universityId: number;
  universityName: string;
}

const UniversityPrograms = ({ programs, universityId, universityName }: UniversityProgramsProps) => {
  const allPrograms = programs;
  
  // Group programs by degree
  const bachelorPrograms = programs.filter(program => program.degree === 'Bachelor');
  const masterPrograms = programs.filter(program => program.degree === 'Master');
  const phdPrograms = programs.filter(program => program.degree === 'Doctorate');
  
  // Group programs by language
  const englishPrograms = programs.filter(program => program.language === 'English');
  const turkishPrograms = programs.filter(program => program.language === 'Turkish');
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-unlimited-blue mb-6">البرامج الدراسية في {universityName}</h2>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <School className="h-4 w-4" />
            <span>جميع البرامج ({allPrograms.length})</span>
          </TabsTrigger>
          
          <TabsTrigger value="bachelor" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>بكالوريوس ({bachelorPrograms.length})</span>
          </TabsTrigger>
          
          <TabsTrigger value="master" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>ماجستير ({masterPrograms.length})</span>
          </TabsTrigger>
          
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>لغة الدراسة</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPrograms.length > 0 ? (
              allPrograms.map((program) => (
                <ProgramCard key={program.id} program={program as any} />
              ))
            ) : (
              <p className="col-span-3 text-center text-unlimited-gray">لا توجد برامج متاحة حالياً</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="bachelor" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bachelorPrograms.length > 0 ? (
              bachelorPrograms.map((program) => (
                <ProgramCard key={program.id} program={program as any} />
              ))
            ) : (
              <p className="col-span-3 text-center text-unlimited-gray">لا توجد برامج بكالوريوس متاحة حالياً</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="master" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterPrograms.length > 0 ? (
              masterPrograms.map((program) => (
                <ProgramCard key={program.id} program={program as any} />
              ))
            ) : (
              <p className="col-span-3 text-center text-unlimited-gray">لا توجد برامج ماجستير متاحة حالياً</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="language" className="mt-6">
          <Tabs defaultValue="english" className="w-full">
            <TabsList className="w-full grid grid-cols-2 gap-4">
              <TabsTrigger value="english">البرامج باللغة الإنجليزية ({englishPrograms.length})</TabsTrigger>
              <TabsTrigger value="turkish">البرامج باللغة التركية ({turkishPrograms.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="english" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {englishPrograms.length > 0 ? (
                  englishPrograms.map((program) => (
                    <ProgramCard key={program.id} program={program as any} />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-unlimited-gray">لا توجد برامج باللغة الإنجليزية متاحة حالياً</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="turkish" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {turkishPrograms.length > 0 ? (
                  turkishPrograms.map((program) => (
                    <ProgramCard key={program.id} program={program as any} />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-unlimited-gray">لا توجد برامج باللغة التركية متاحة حالياً</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UniversityPrograms;
