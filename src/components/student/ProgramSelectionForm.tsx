
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Check } from 'lucide-react';

interface Program {
  id: number;
  name: string;
  university: string;
  degree: string;
  duration: string;
  language: string;
  feesPerYear: number;
  scholarshipAvailable: boolean;
}

interface ProgramSelectionFormProps {
  initialData?: {
    program?: Program;
    university?: string;
  };
  onSave: (data: {
    program: Program;
    university: string;
  }) => void;
}

const ProgramSelectionForm = ({ initialData = {}, onSave }: ProgramSelectionFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(initialData.program || null);
  const [filterLanguage, setFilterLanguage] = useState<string>('all');
  const [filterDegree, setFilterDegree] = useState<string>('all');
  
  // برامج افتراضية كمثال
  const programs: Program[] = [
    {
      id: 1,
      name: 'الطب البشري',
      university: 'جامعة إسطنبول',
      degree: 'bachelor',
      duration: '6 سنوات',
      language: 'english',
      feesPerYear: 6000,
      scholarshipAvailable: true,
    },
    {
      id: 2,
      name: 'هندسة الحاسوب',
      university: 'جامعة أنقرة',
      degree: 'bachelor',
      duration: '4 سنوات',
      language: 'turkish',
      feesPerYear: 4500,
      scholarshipAvailable: true,
    },
    {
      id: 3,
      name: 'إدارة الأعمال',
      university: 'جامعة إسطنبول التقنية',
      degree: 'master',
      duration: '2 سنوات',
      language: 'english',
      feesPerYear: 5500,
      scholarshipAvailable: false,
    },
    {
      id: 4,
      name: 'علوم البيانات',
      university: 'جامعة الشرق الأوسط التقنية',
      degree: 'master',
      duration: '2 سنوات',
      language: 'english',
      feesPerYear: 7000,
      scholarshipAvailable: true,
    },
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = searchQuery === '' || 
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLanguage = filterLanguage === 'all' || program.language === filterLanguage;
    const matchesDegree = filterDegree === 'all' || program.degree === filterDegree;
    
    return matchesSearch && matchesLanguage && matchesDegree;
  });

  const handleSelectProgram = (program: Program) => {
    setSelectedProgram(program);
    
    // حفظ البيانات فورًا لاستخدامها في الخطوة التالية
    onSave({
      program,
      university: program.university
    });
    
    // عرض رسالة تأكيد
    toast({
      title: t('application.program.selected'),
      description: t('application.program.selectedDescription', { program: program.name }),
    });
  };

  const handleClearSelection = () => {
    setSelectedProgram(null);
  };

  const handleSaveClick = () => {
    if (!selectedProgram) {
      toast({
        title: t('application.validation.error'),
        description: t('application.validation.selectProgram'),
        variant: 'destructive',
      });
      return;
    }
    
    onSave({
      program: selectedProgram,
      university: selectedProgram.university
    });
    
    toast({
      title: t('application.form.saved'),
      description: t('application.form.programSaved'),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.program.title')}</h3>
        <p className="text-unlimited-gray">{t('application.program.description')}</p>
      </div>
      
      {!selectedProgram ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray" />
              <Input
                placeholder={t('application.program.searchPlaceholder')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={filterLanguage} onValueChange={setFilterLanguage}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t('application.program.language')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('application.program.allLanguages')}</SelectItem>
                <SelectItem value="english">{t('application.program.english')}</SelectItem>
                <SelectItem value="turkish">{t('application.program.turkish')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterDegree} onValueChange={setFilterDegree}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t('application.program.degree')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('application.program.allDegrees')}</SelectItem>
                <SelectItem value="bachelor">{t('application.program.bachelor')}</SelectItem>
                <SelectItem value="master">{t('application.program.master')}</SelectItem>
                <SelectItem value="phd">{t('application.program.phd')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrograms.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-unlimited-gray">{t('application.program.noResults')}</p>
              </div>
            ) : (
              filteredPrograms.map((program) => (
                <Card key={program.id} className="cursor-pointer hover:border-unlimited-blue transition-colors">
                  <CardContent className="p-4" onClick={() => handleSelectProgram(program)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{program.name}</h4>
                        <p className="text-sm text-unlimited-gray">{program.university}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">
                            {program.degree === 'bachelor' 
                              ? t('application.program.bachelor') 
                              : program.degree === 'master'
                                ? t('application.program.master')
                                : t('application.program.phd')}
                          </Badge>
                          
                          <Badge variant="outline">
                            {program.language === 'english'
                              ? t('application.program.english')
                              : t('application.program.turkish')}
                          </Badge>
                          
                          <Badge variant="outline">{program.duration}</Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-unlimited-blue">
                          ${program.feesPerYear}/
                          <span className="text-sm font-normal text-unlimited-gray">{t('application.program.year')}</span>
                        </div>
                        
                        {program.scholarshipAvailable && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            {t('application.program.scholarshipAvailable')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-unlimited-blue hover:bg-unlimited-dark-blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectProgram(program);
                      }}
                    >
                      {t('application.program.selectProgram')}
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">{t('application.program.selectedProgram')}</h4>
                <p className="text-sm text-unlimited-gray">{t('application.program.selectionComplete')}</p>
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-xl">{selectedProgram.name}</h3>
                  <p className="text-unlimited-gray">{selectedProgram.university}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">
                      {selectedProgram.degree === 'bachelor' 
                        ? t('application.program.bachelor') 
                        : selectedProgram.degree === 'master'
                          ? t('application.program.master')
                          : t('application.program.phd')}
                    </Badge>
                    
                    <Badge variant="outline">
                      {selectedProgram.language === 'english'
                        ? t('application.program.english')
                        : t('application.program.turkish')}
                    </Badge>
                    
                    <Badge variant="outline">{selectedProgram.duration}</Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm">
                      <span className="text-unlimited-gray">{t('application.program.annualFees')}: </span>
                      <span className="font-bold">${selectedProgram.feesPerYear}</span>
                    </div>
                    
                    {selectedProgram.scholarshipAvailable && (
                      <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
                        {t('application.program.scholarshipAvailable')}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={handleClearSelection}>
                  {t('application.program.change')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSaveClick}
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
          disabled={!selectedProgram}
        >
          {t('application.buttons.saveProgress')}
        </Button>
      </div>
    </div>
  );
};

export default ProgramSelectionForm;
