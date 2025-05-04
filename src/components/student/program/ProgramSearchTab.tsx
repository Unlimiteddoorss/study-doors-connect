
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Program, University } from '../ProgramSelectionForm';

interface ProgramSearchTabProps {
  programSearchQuery: string;
  setProgramSearchQuery: (value: string) => void;
  selectedProgram: string;
  setSelectedProgram: (value: string) => void;
  setSelectedUniversity: (value: string) => void;
  setSelectedCountry: (value: string) => void;
  programs: Program[];
  universities: University[];
  isRtl: boolean;
}

const ProgramSearchTab = ({
  programSearchQuery,
  setProgramSearchQuery,
  selectedProgram,
  setSelectedProgram,
  setSelectedUniversity,
  setSelectedCountry,
  programs,
  universities,
  isRtl
}: ProgramSearchTabProps) => {
  const { t } = useTranslation();

  // Helper function to determine degree from title
  const getDegreeFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('بكالوريوس')) return 'bachelor';
    if (lowerTitle.includes('ماجستير')) return 'master';
    if (lowerTitle.includes('دكتوراه')) return 'phd';
    if (lowerTitle.includes('دبلوم')) return 'diploma';
    return 'bachelor'; // Default
  };
  
  // Search all programs
  const allProgramsFiltered = programSearchQuery 
    ? programs.filter(program => 
        program.title.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
        (program.nameAr && program.nameAr.includes(programSearchQuery))
      )
    : programs;

  // Format searched programs for display
  const searchedProgramOptions = allProgramsFiltered.map(program => {
    const university = universities.find(uni => uni.id.toString() === program.university);
    return {
      value: program.id.toString(),
      label: isRtl && program.nameAr ? program.nameAr : program.title,
      description: university 
        ? `${isRtl && university.nameAr ? university.nameAr : university.name} - ${getDegreeFromTitle(program.title)}`
        : getDegreeFromTitle(program.title),
      group: university 
        ? isRtl && university.nameAr ? university.nameAr : university.name
        : t('application.program.unknownUniversity')
    };
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('application.program.searchByName')}</Label>
        <Input 
          value={programSearchQuery}
          onChange={(e) => setProgramSearchQuery(e.target.value)}
          placeholder={t('application.program.searchProgramsPlaceholder')}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label>{t('application.program.searchResults')}</Label>
        <Autocomplete
          options={searchedProgramOptions}
          value={selectedProgram}
          onChange={(value) => {
            setSelectedProgram(value);
            // Find the university for this program
            const program = programs.find(p => p.id.toString() === value);
            if (program) {
              setSelectedUniversity(program.university);
              
              // Find the university details to set country
              const university = universities.find(u => u.id.toString() === program.university);
              if (university) {
                setSelectedCountry(university.country);
              }
            }
          }}
          placeholder={t('application.program.selectFromResults')}
          emptyMessage={t('application.program.noResultsFound')}
          showDescription={true}
          groupByCategory={true}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProgramSearchTab;
