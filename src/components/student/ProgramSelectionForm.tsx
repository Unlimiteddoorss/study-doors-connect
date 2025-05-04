
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Check, School, MapPin, Bookmark, BookOpen, Award, Users } from 'lucide-react';
import { Autocomplete } from '@/components/ui/autocomplete';
import { motion, AnimatePresence } from 'framer-motion';

interface Program {
  id: number;
  name: string;
  university: string;
  degree: string;
  duration: string;
  language: string;
  feesPerYear: number;
  scholarshipAvailable: boolean;
  description?: string;
  studentsCount?: number;
  rating?: number;
  location?: string;
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
  const [filterUniversity, setFilterUniversity] = useState<string>('all');
  const [compareMode, setCompareMode] = useState(false);
  const [comparedPrograms, setComparedPrograms] = useState<Program[]>([]);
  
  // قائمة الجامعات للاختيار
  const universities = [
    { value: 'all', label: t('application.program.allUniversities') },
    { value: 'جامعة إسطنبول', label: 'جامعة إسطنبول' },
    { value: 'جامعة أنقرة', label: 'جامعة أنقرة' },
    { value: 'جامعة إسطنبول التقنية', label: 'جامعة إسطنبول التقنية' },
    { value: 'جامعة الشرق الأوسط التقنية', label: 'جامعة الشرق الأوسط التقنية' },
    { value: 'جامعة البسفور', label: 'جامعة البسفور' },
  ];
  
  // برامج افتراضية كمثال مع معلومات إضافية
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
      description: 'برنامج الطب البشري المعتمد دوليًا يوفر تدريبًا شاملاً في مجال الطب والجراحة مع التركيز على البحث العلمي والممارسة السريرية.',
      studentsCount: 450,
      rating: 4.8,
      location: 'إسطنبول، تركيا',
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
      description: 'برنامج متميز في هندسة الحاسوب يجمع بين النظرية والتطبيق العملي من خلال مشاريع واقعية وتدريب ميداني.',
      studentsCount: 380,
      rating: 4.5,
      location: 'أنقرة، تركيا',
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
      description: 'برنامج ماجستير متميز يركز على القيادة الاستراتيجية وريادة الأعمال في سوق العمل العالمي.',
      studentsCount: 120,
      rating: 4.6,
      location: 'إسطنبول، تركيا',
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
      description: 'برنامج متخصص في علوم البيانات والذكاء الاصطناعي مع تركيز على التطبيقات العملية في مختلف المجالات.',
      studentsCount: 95,
      rating: 4.9,
      location: 'أنقرة، تركيا',
    },
    {
      id: 5,
      name: 'الهندسة المعمارية',
      university: 'جامعة البسفور',
      degree: 'bachelor',
      duration: '5 سنوات',
      language: 'english',
      feesPerYear: 5800,
      scholarshipAvailable: true,
      description: 'برنامج معتمد دوليًا في الهندسة المعمارية يجمع بين التصميم الإبداعي والتكنولوجيا المتقدمة والاستدامة.',
      studentsCount: 210,
      rating: 4.7,
      location: 'إسطنبول، تركيا',
    },
  ];

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch = searchQuery === '' || 
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (program.description && program.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLanguage = filterLanguage === 'all' || program.language === filterLanguage;
      const matchesDegree = filterDegree === 'all' || program.degree === filterDegree;
      const matchesUniversity = filterUniversity === 'all' || program.university === filterUniversity;
      
      return matchesSearch && matchesLanguage && matchesDegree && matchesUniversity;
    });
  }, [searchQuery, filterLanguage, filterDegree, filterUniversity]);

  const toggleCompareProgram = (program: Program) => {
    if (comparedPrograms.some(p => p.id === program.id)) {
      setComparedPrograms(comparedPrograms.filter(p => p.id !== program.id));
    } else {
      if (comparedPrograms.length < 3) {
        setComparedPrograms([...comparedPrograms, program]);
      } else {
        toast({
          title: t('application.program.compareLimit'),
          description: t('application.program.compareLimitDescription'),
          variant: 'destructive',
        });
      }
    }
  };

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

  // تصنيف البرامج
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
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
            
            <Autocomplete 
              options={universities}
              value={filterUniversity} 
              onChange={setFilterUniversity}
              placeholder={t('application.program.university')}
              searchPlaceholder={t('application.program.searchUniversity')}
              emptyMessage={t('application.program.noUniversitiesFound')}
              className="w-full md:w-[200px]"
            />
            
            <Select value={filterLanguage} onValueChange={setFilterLanguage}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t('application.program.language')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('application.program.allLanguages')}</SelectItem>
                <SelectItem value="english">{t('application.program.english')}</SelectItem>
                <SelectItem value="turkish">{t('application.program.turkish')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterDegree} onValueChange={setFilterDegree}>
              <SelectTrigger className="w-full md:w-[180px]">
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
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-unlimited-gray">
              {filteredPrograms.length} {t('application.program.programsFound')}
            </p>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCompareMode(!compareMode)}
              className={compareMode ? "bg-unlimited-blue text-white hover:bg-unlimited-dark-blue hover:text-white" : ""}
            >
              {compareMode ? t('application.program.stopComparing') : t('application.program.comparePrograms')}
            </Button>
          </div>

          {/* مقارنة البرامج */}
          <AnimatePresence>
            {compareMode && comparedPrograms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <h4 className="font-medium mb-2">{t('application.program.comparing')} ({comparedPrograms.length}/3)</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-right">{t('application.program.programName')}</th>
                          {comparedPrograms.map(program => (
                            <th key={program.id} className="border p-2 text-right min-w-[200px]">
                              <div className="flex items-center justify-between">
                                <span>{program.name}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => toggleCompareProgram(program)}
                                  className="h-6 w-6 p-0"
                                >
                                  ×
                                </Button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2 font-medium">{t('application.program.university')}</td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-uni`} className="border p-2">{program.university}</td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border p-2 font-medium">{t('application.program.degree')}</td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-degree`} className="border p-2">
                              {program.degree === 'bachelor' 
                                ? t('application.program.bachelor') 
                                : program.degree === 'master'
                                  ? t('application.program.master')
                                  : t('application.program.phd')}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border p-2 font-medium">{t('application.program.duration')}</td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-duration`} className="border p-2">{program.duration}</td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border p-2 font-medium">{t('application.program.language')}</td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-lang`} className="border p-2">
                              {program.language === 'english'
                                ? t('application.program.english')
                                : t('application.program.turkish')}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border p-2 font-medium">{t('application.program.annualFees')}</td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-fees`} className="border p-2">${program.feesPerYear}</td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border p-2 font-medium">{t('application.program.scholarship')}</td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-scholarship`} className="border p-2">
                              {program.scholarshipAvailable ? 
                                <Badge className="bg-green-100 text-green-800">
                                  {t('application.program.available')}
                                </Badge> : 
                                <Badge variant="outline">
                                  {t('application.program.notAvailable')}
                                </Badge>
                              }
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border p-2 font-medium">{t('application.program.rating')}</td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-rating`} className="border p-2">
                              {program.rating ? renderStarRating(program.rating) : '-'}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border p-2"></td>
                          {comparedPrograms.map(program => (
                            <td key={`${program.id}-action`} className="border p-2">
                              <Button
                                size="sm"
                                onClick={() => handleSelectProgram(program)}
                                className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                              >
                                {t('application.program.select')}
                              </Button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrograms.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-unlimited-gray">{t('application.program.noResults')}</p>
              </div>
            ) : (
              filteredPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="cursor-pointer hover:border-unlimited-blue transition-colors h-full">
                    <CardContent className="p-4 flex flex-col h-full" onClick={() => !compareMode && handleSelectProgram(program)}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-lg">{program.name}</h4>
                          <div className="flex items-center gap-1 text-unlimited-gray">
                            <School className="h-4 w-4" />
                            <p className="text-sm">{program.university}</p>
                          </div>
                          
                          {program.location && (
                            <div className="flex items-center gap-1 text-unlimited-gray mt-1">
                              <MapPin className="h-4 w-4" />
                              <p className="text-xs">{program.location}</p>
                            </div>
                          )}
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
                      
                      {program.description && (
                        <p className="text-unlimited-gray text-sm mb-3 line-clamp-2">{program.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
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
                      
                      <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
                        {program.rating && (
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-yellow-500" />
                            {renderStarRating(program.rating)}
                          </div>
                        )}
                        
                        {program.studentsCount && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-unlimited-gray" />
                            <span className="text-sm text-unlimited-gray">{program.studentsCount} طالب</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-auto">
                        {compareMode ? (
                          <Button 
                            className={`w-full ${
                              comparedPrograms.some(p => p.id === program.id)
                                ? 'bg-unlimited-blue hover:bg-unlimited-dark-blue text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-unlimited-gray'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompareProgram(program);
                            }}
                          >
                            {comparedPrograms.some(p => p.id === program.id)
                              ? t('application.program.removeFromComparison')
                              : t('application.program.addToComparison')}
                          </Button>
                        ) : (
                          <Button 
                            className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectProgram(program);
                            }}
                          >
                            {t('application.program.selectProgram')}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-green-50 border border-green-200 p-4 rounded-md"
          >
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">{t('application.program.selectedProgram')}</h4>
                <p className="text-sm text-unlimited-gray">{t('application.program.selectionComplete')}</p>
              </div>
            </div>
          </motion.div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-xl">{selectedProgram.name}</h3>
                  <div className="flex items-center gap-1 text-unlimited-gray mt-1">
                    <School className="h-4 w-4" />
                    <p className="text-sm">{selectedProgram.university}</p>
                  </div>
                  
                  {selectedProgram.location && (
                    <div className="flex items-center gap-1 text-unlimited-gray mt-2">
                      <MapPin className="h-4 w-4" />
                      <p className="text-sm">{selectedProgram.location}</p>
                    </div>
                  )}
                  
                  {selectedProgram.description && (
                    <div className="mt-4 text-unlimited-gray text-sm border-t pt-3">
                      {selectedProgram.description}
                    </div>
                  )}
                  
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm">
                        <span className="text-unlimited-gray">{t('application.program.annualFees')}: </span>
                        <span className="font-bold">${selectedProgram.feesPerYear}</span>
                      </div>
                    </div>
                    
                    {selectedProgram.scholarshipAvailable && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          {t('application.program.scholarshipAvailable')}
                        </Badge>
                      </div>
                    )}
                    
                    {selectedProgram.rating && (
                      <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                        <span className="text-unlimited-gray text-sm mr-2">{t('application.program.rating')}: </span>
                        {renderStarRating(selectedProgram.rating)}
                      </div>
                    )}
                    
                    {selectedProgram.studentsCount && (
                      <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                        <Users className="h-4 w-4 text-unlimited-gray mr-2" />
                        <span className="text-sm">{selectedProgram.studentsCount} {t('application.program.students')}</span>
                      </div>
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
