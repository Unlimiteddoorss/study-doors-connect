
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import ProgramBrowseTab from '@/components/student/program/ProgramBrowseTab';
import ProgramSearchTab from '@/components/student/program/ProgramSearchTab';
import ProgramDetails from '@/components/student/program/ProgramDetails';
import PreferencesForm from '@/components/student/program/PreferencesForm';

// Import university and program data
import { turkishUniversities as universities } from '@/data/programsData';
import { dummyPrograms as programsData } from '@/data/programsData';

// Define the country data
const countries = [
  { value: 'turkey', label: 'Turkey' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'germany', label: 'Germany' },
  { value: 'france', label: 'France' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'china', label: 'China' },
  { value: 'japan', label: 'Japan' },
  { value: 'south_korea', label: 'South Korea' },
  { value: 'russia', label: 'Russia' },
  { value: 'italy', label: 'Italy' },
  { value: 'spain', label: 'Spain' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'norway', label: 'Norway' },
  { value: 'finland', label: 'Finland' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'austria', label: 'Austria' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'new_zealand', label: 'New Zealand' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'malaysia', label: 'Malaysia' },
];

// Define the degree levels
const degreeLevels = [
  { value: 'bachelor', label: "Bachelor's" },
  { value: 'master', label: "Master's" },
  { value: 'phd', label: 'PhD' },
  { value: 'associate', label: 'Associate' },
  { value: 'certificate', label: 'Certificate' },
  { value: 'diploma', label: 'Diploma' },
];

// Updated Program interface to match the actual program data structure from programsData
export interface Program {
  id: number;
  title: string;
  nameAr?: string;
  university: string;
  location: string;
  language: string;
  duration: string;
  deadline: string;
  fee: string;
  discount?: string;
  image: string;
  isFeatured?: boolean;
  badges?: string[];
  scholarshipAvailable?: boolean;
  description?: string;
  admissionRequirements?: string[];
  tuitionFee?: number | string;
}

export interface University {
  id: number;
  name: string;
  nameAr?: string;
  country: string;
  city: string;
  description?: string;
  logo?: string;
  programs?: number;
  image?: string;
  location?: string;
}

interface ProgramSelectionFormProps {
  initialData: {
    program?: any;
    university?: string;
  };
  onSave: (data: any) => void;
}

// Export countries and degreeLevels for use in sub-components
export { countries, degreeLevels };

const ProgramSelectionForm = ({ initialData, onSave }: ProgramSelectionFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';

  const [activeTab, setActiveTab] = useState<string>("browse");
  const [selectedCountry, setSelectedCountry] = useState<string>(initialData?.program?.country || "");
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState<string>(initialData?.program?.degreeLevel || "");
  const [selectedUniversity, setSelectedUniversity] = useState<string>(initialData?.university || "");
  const [selectedProgram, setSelectedProgram] = useState<string>(initialData?.program?.id ? initialData.program.id.toString() : "");
  const [programSearchQuery, setProgramSearchQuery] = useState<string>("");
  const [preferredLanguage, setPreferredLanguage] = useState<string>(initialData?.program?.language || "");
  const [additionalNotes, setAdditionalNotes] = useState<string>(initialData?.program?.notes || "");

  // Format the programs data to match our requirements
  const programs = programsData.map(program => ({
    ...program,
    id: program.id,
    title: program.title,
    nameAr: program.title, // Using title as nameAr for now since it's in Arabic
  }));

  // Get selected program and university details
  const selectedProgramDetails = selectedProgram
    ? programs.find(program => program.id.toString() === selectedProgram)
    : null;

  const selectedUniversityDetails = selectedProgramDetails
    ? universities.find(uni => uni.id.toString() === selectedProgramDetails.university)
    : selectedUniversity
      ? universities.find(uni => uni.id.toString() === selectedUniversity)
      : null;

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedProgram || !selectedProgramDetails || !selectedUniversityDetails) {
      toast({
        title: t('application.validation.error'),
        description: t('application.validation.selectProgram'),
        variant: 'destructive'
      });
      return;
    }

    // Prepare data for saving
    const programData = {
      id: selectedProgramDetails.id,
      title: selectedProgramDetails.title,
      nameAr: selectedProgramDetails.nameAr,
      duration: selectedProgramDetails.duration,
      language: selectedProgramDetails.language || preferredLanguage,
      notes: additionalNotes
    };

    onSave({
      program: programData,
      university: selectedUniversityDetails.id.toString()
    });

    toast({
      title: t('application.program.saved'),
      description: t('application.program.programSaved'),
    });
  };

  // Sync state when initialData changes
  useEffect(() => {
    if (initialData?.program?.id) {
      setSelectedProgram(initialData.program.id.toString());
      
      const program = programs.find(p => p.id.toString() === initialData.program.id.toString());
      if (program) {
        setSelectedUniversity(program.university);
        setPreferredLanguage(program.language || "");
        
        const university = universities.find(u => u.id.toString() === program.university);
        if (university) {
          setSelectedCountry(university.country);
        }
      }
    }
    
    if (initialData?.university) {
      setSelectedUniversity(initialData.university);
      
      const university = universities.find(u => u.id.toString() === initialData.university);
      if (university) {
        setSelectedCountry(university.country);
      }
    }
    
    if (initialData?.program?.notes) {
      setAdditionalNotes(initialData.program.notes);
    }
    
    if (initialData?.program?.language) {
      setPreferredLanguage(initialData.program.language);
    }
  }, [initialData]);

  // Save data when program selection changes
  useEffect(() => {
    if (selectedProgram && selectedUniversityDetails) {
      const programDetails = programs.find(program => program.id.toString() === selectedProgram);
      if (programDetails) {
        handleSubmit();
      }
    }
  }, [selectedProgram, selectedUniversity]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.program.title')}</h3>
        <p className="text-unlimited-gray">{t('application.program.description')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {t('application.program.browseByLocation')}
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            {t('application.program.searchPrograms')}
          </TabsTrigger>
        </TabsList>
        
        {/* Browse by Location Tab */}
        <TabsContent value="browse" className="space-y-4 mt-4">
          <ProgramBrowseTab 
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedDegreeLevel={selectedDegreeLevel}
            setSelectedDegreeLevel={setSelectedDegreeLevel}
            selectedUniversity={selectedUniversity}
            setSelectedUniversity={setSelectedUniversity}
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            universities={universities}
            programs={programs}
            isRtl={isRtl}
          />
        </TabsContent>
        
        {/* Search Programs Tab */}
        <TabsContent value="search" className="space-y-4 mt-4">
          <ProgramSearchTab
            programSearchQuery={programSearchQuery}
            setProgramSearchQuery={setProgramSearchQuery}
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            setSelectedUniversity={setSelectedUniversity}
            setSelectedCountry={setSelectedCountry}
            programs={programs}
            universities={universities}
            isRtl={isRtl}
          />
        </TabsContent>
      </Tabs>
      
      {/* Program Details Section */}
      {selectedProgramDetails && selectedUniversityDetails && (
        <ProgramDetails
          program={selectedProgramDetails}
          university={selectedUniversityDetails}
          isRtl={isRtl}
          countries={countries}
        />
      )}
      
      {/* Additional Preferences */}
      <PreferencesForm
        preferredLanguage={preferredLanguage}
        setPreferredLanguage={setPreferredLanguage}
        additionalNotes={additionalNotes}
        setAdditionalNotes={setAdditionalNotes}
      />
    </div>
  );
};

export default ProgramSelectionForm;
