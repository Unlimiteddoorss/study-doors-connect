
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Autocomplete } from "@/components/ui/autocomplete";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, BookOpen, GraduationCap, Globe, Building, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
interface Program {
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

interface University {
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
  // Note: The dummy programs may not have a direct degreeLevel field, using associative logic
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

  // Selected program details
  const selectedProgramDetails = selectedProgram
    ? programs.find(program => program.id.toString() === selectedProgram)
    : null;

  // Selected university details  
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
        </TabsContent>
        
        {/* Search Programs Tab */}
        <TabsContent value="search" className="space-y-4 mt-4">
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
        </TabsContent>
      </Tabs>
      
      {/* Program Details Section */}
      {selectedProgramDetails && selectedUniversityDetails && (
        <Card className="mt-6 border border-unlimited-blue">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-unlimited-blue" />
                <h3 className="text-lg font-medium">
                  {isRtl && selectedProgramDetails.nameAr ? selectedProgramDetails.nameAr : selectedProgramDetails.title}
                </h3>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-unlimited-gray" />
                  <span>
                    {isRtl && selectedUniversityDetails.nameAr ? selectedUniversityDetails.nameAr : selectedUniversityDetails.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-unlimited-gray" />
                  <span>
                    {selectedUniversityDetails.city}, {countries.find(c => c.value === selectedUniversityDetails.country)?.label}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-unlimited-blue/10">
                    {getDegreeFromTitle(selectedProgramDetails.title)}
                  </Badge>
                  {selectedProgramDetails.duration && (
                    <Badge variant="outline" className="bg-unlimited-blue/10">
                      {selectedProgramDetails.duration}
                    </Badge>
                  )}
                  {selectedProgramDetails.language && (
                    <Badge variant="outline" className="bg-unlimited-blue/10">
                      {selectedProgramDetails.language}
                    </Badge>
                  )}
                  {(selectedProgramDetails.tuitionFee || selectedProgramDetails.fee) && (
                    <Badge variant="outline" className="bg-unlimited-blue/10">
                      {typeof selectedProgramDetails.tuitionFee === 'number' 
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedProgramDetails.tuitionFee)
                        : selectedProgramDetails.fee || selectedProgramDetails.tuitionFee}
                    </Badge>
                  )}
                </div>
              </div>
              
              {selectedProgramDetails.description && (
                <div className="mt-4 text-sm text-unlimited-gray">
                  <p>{selectedProgramDetails.description}</p>
                </div>
              )}
              
              {/* Admission Requirements */}
              {selectedProgramDetails.admissionRequirements && selectedProgramDetails.admissionRequirements.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">{t('application.program.admissionRequirements')}</h4>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {selectedProgramDetails.admissionRequirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Additional Preferences */}
      <div className="space-y-4 mt-6">
        <h4 className="font-medium">{t('application.program.additionalPreferences')}</h4>
        
        <div className="space-y-2">
          <Label>{t('application.program.preferredLanguage')}</Label>
          <RadioGroup 
            value={preferredLanguage} 
            onValueChange={setPreferredLanguage}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="english" id="english" />
              <Label htmlFor="english">{t('application.program.languages.english')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="turkish" id="turkish" />
              <Label htmlFor="turkish">{t('application.program.languages.turkish')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="arabic" id="arabic" />
              <Label htmlFor="arabic">{t('application.program.languages.arabic')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="french" id="french" />
              <Label htmlFor="french">{t('application.program.languages.french')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">{t('application.program.languages.other')}</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">{t('application.program.additionalNotes')}</Label>
          <Textarea 
            id="notes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder={t('application.program.notesPlaceholder')}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgramSelectionForm;
