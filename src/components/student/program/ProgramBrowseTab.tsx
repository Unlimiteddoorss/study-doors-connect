
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Program, University, countries, degreeLevels } from '../ProgramSelectionForm';

interface ProgramBrowseTabProps {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedDegreeLevel: string;
  setSelectedDegreeLevel: (value: string) => void;
  selectedUniversity: string;
  setSelectedUniversity: (value: string) => void;
  selectedProgram: string;
  setSelectedProgram: (value: string) => void;
  universities: University[];
  programs: Program[];
  isRtl: boolean;
}

const ProgramBrowseTab = ({
  selectedCountry,
  setSelectedCountry,
  selectedDegreeLevel,
  setSelectedDegreeLevel,
  selectedUniversity,
  setSelectedUniversity,
  selectedProgram,
  setSelectedProgram,
  universities,
  programs,
  isRtl
}: ProgramBrowseTabProps) => {
  const { t } = useTranslation();

  // Format universities for the autocomplete component
  const universityOptions = universities.map((university) => ({
    value: university.id.toString(),
    label: isRtl && university.nameAr ? university.nameAr : university.name,
    description: `${university.city}, ${countries.find(c => c.value === university.country)?.label || university.country}`,
    group: countries.find(c => c.value === university.country)?.label || university.country
  }));

  // Format universities filtered by selected country
  const filteredUniversities = selectedCountry 
    ? universities.filter(uni => uni.country === selectedCountry)
    : universities;
  
  const filteredUniversityOptions = filteredUniversities.map(university => ({
    value: university.id.toString(),
    label: isRtl && university.nameAr ? university.nameAr : university.name,
    description: university.city
  }));

  // Get programs for the selected university
  const universityPrograms = selectedUniversity 
    ? programs.filter(program => program.university === selectedUniversity)
    : [];
  
  // Filter programs by degree level if selected
  // Helper function to determine degree from title
  const getDegreeFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('بكالوريوس')) return 'bachelor';
    if (lowerTitle.includes('ماجستير')) return 'master';
    if (lowerTitle.includes('دكتوراه')) return 'phd';
    if (lowerTitle.includes('دبلوم')) return 'diploma';
    return 'bachelor'; // Default
  };

  const filteredPrograms = selectedDegreeLevel
    ? universityPrograms.filter(program => getDegreeFromTitle(program.title) === selectedDegreeLevel)
    : universityPrograms;

  // Format programs for the autocomplete component
  const programOptions = filteredPrograms.map(program => ({
    value: program.id.toString(),
    label: isRtl && program.nameAr ? program.nameAr : program.title,
    description: `${program.duration}, ${program.language}`
  }));

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('application.program.selectCountry')}</Label>
          <Autocomplete
            options={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            placeholder={t('application.program.chooseCountry')}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>{t('application.program.degreeLevel')}</Label>
          <Autocomplete
            options={degreeLevels}
            value={selectedDegreeLevel}
            onChange={setSelectedDegreeLevel}
            placeholder={t('application.program.chooseDegree')}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>{t('application.program.selectUniversity')}</Label>
        <Autocomplete
          options={filteredUniversityOptions}
          value={selectedUniversity}
          onChange={setSelectedUniversity}
          placeholder={t('application.program.chooseUniversity')}
          emptyMessage={t('application.program.noUniversitiesFound')}
          showDescription={true}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label>{t('application.program.selectProgram')}</Label>
        <Autocomplete
          options={programOptions}
          value={selectedProgram}
          onChange={setSelectedProgram}
          placeholder={t('application.program.chooseProgram')}
          emptyMessage={
            !selectedUniversity 
              ? t('application.program.selectUniversityFirst') 
              : t('application.program.noProgramsFound')
          }
          showDescription={true}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProgramBrowseTab;
