import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Search, FilterIcon, GraduationCap, Building, Globe, Check, Clock, Plus, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplicationDocuments from '@/components/applications/ApplicationDocuments';
import ApplicationMessages from '@/components/applications/ApplicationMessages';

const programs = [
  {
    id: 1,
    title: "Medicine (English)",
    titleAr: "الط�� البشري (بالإنجليزية)",
    university: "Istanbul University",
    universityAr: "جامعة اسطنبول",
    country: "Turkey",
    countryAr: "تركيا",
    duration: "6 years",
    durationAr: "6 سنوات",
    language: "English",
    languageAr: "الإنجليزية",
    tuitionFee: "$26,400",
    tuitionFeeAr: "26,400 دولار أمريكي",
    discountedFee: "$24,600",
    discountedFeeAr: "24,600 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "Bachelor",
    levelAr: "بكالوريوس",
  },
  {
    id: 2,
    title: "Medicine (Turkish)",
    titleAr: "الطب البشري (بالتركية)",
    university: "Istanbul University",
    universityAr: "جامعة اسطنبول",
    country: "Turkey",
    countryAr: "تركيا",
    duration: "6 years",
    durationAr: "6 سنوات",
    language: "Turkish",
    languageAr: "التركية",
    tuitionFee: "$20,000",
    tuitionFeeAr: "20,000 دولار أمريكي",
    discountedFee: "$19,000",
    discountedFeeAr: "19,000 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "Bachelor",
    levelAr: "بكالوريوس",
  },
  {
    id: 3,
    title: "Dentistry (English)",
    titleAr: "طب الأسنان (بالإنجليزية)",
    university: "Istanbul University",
    universityAr: "جامعة اسطنبول",
    country: "Turkey",
    countryAr: "تركيا",
    duration: "5 years",
    durationAr: "5 سنوات",
    language: "English",
    languageAr: "الإنجليزية",
    tuitionFee: "$22,000",
    tuitionFeeAr: "22,000 دولار أمريكي",
    discountedFee: "$21,090",
    discountedFeeAr: "21,090 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "Bachelor",
    levelAr: "بكالوريوس",
  },
  {
    id: 4,
    title: "Computer Engineering",
    titleAr: "هندسة الحاسوب",
    university: "Bahcesehir University",
    universityAr: "جامعة باهتشه شهير",
    country: "Turkey",
    countryAr: "تركيا",
    duration: "4 years",
    durationAr: "4 سنوات",
    language: "English",
    languageAr: "الإنجليزية",
    tuitionFee: "$18,400",
    tuitionFeeAr: "18,400 دولار أمريكي",
    discountedFee: "$16,900",
    discountedFeeAr: "16,900 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "Bachelor",
    levelAr: "بكالوريوس",
  },
  {
    id: 5,
    title: "Business Administration",
    titleAr: "إدارة الأعمال",
    university: "Bahcesehir University",
    universityAr: "جامعة باهتشه شهير",
    country: "Turkey",
    countryAr: "تركيا",
    duration: "4 years",
    durationAr: "4 سنوات",
    language: "English",
    languageAr: "الإنجليزية",
    tuitionFee: "$15,200",
    tuitionFeeAr: "15,200 دولار أمريكي",
    discountedFee: "$14,500",
    discountedFeeAr: "14,500 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "Bachelor",
    levelAr: "بكالوريوس",
  },
];

const myApplications = [
  {
    id: 101,
    programId: 1,
    status: "review",
    submissionDate: "2025-03-15",
    notes: "Under review by admissions team",
    notesAr: "قيد المراجعة من قبل المختصين"
  },
  {
    id: 102,
    programId: 3,
    status: "incomplete",
    submissionDate: "2025-03-10",
    notes: "Please complete required documents",
    notesAr: "يرجى استكمال المستندات المطلوبة"
  }
];

const StudentApplication = () => {
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all_countries');
  const [selectedLevel, setSelectedLevel] = useState('all_levels');
  const [selectedLanguage, setSelectedLanguage] = useState('all_languages');
  const [activeTab, setActiveTab] = useState('new-application');
  const [applicationDetailTab, setApplicationDetailTab] = useState('form');
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';
  
  const getLocalizedValue = (enValue: string, arValue: string) => {
    return i18n.language === 'ar' ? arValue : enValue;
  };

  const filteredPrograms = programs.filter((program) => {
    const programTitle = getLocalizedValue(program.title, program.titleAr).toLowerCase();
    const programUniversity = getLocalizedValue(program.university, program.universityAr).toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch = programTitle.includes(searchLower) || 
                         programUniversity.includes(searchLower);
                         
    const matchesCountry = selectedCountry === 'all_countries' || 
                          getLocalizedValue(program.country, program.countryAr) === getLocalizedValue("Turkey", "تركيا");
                          
    const matchesLevel = selectedLevel === 'all_levels' || 
                         getLocalizedValue(program.level, program.levelAr) === getLocalizedValue("Bachelor", "بكالوريوس");
                         
    const matchesLanguage = selectedLanguage === 'all_languages' || 
                          getLocalizedValue(program.language, program.languageAr) === getLocalizedValue("English", "الإنجليزية");
    
    return matchesSearch && matchesCountry && matchesLevel && matchesLanguage;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all_countries');
    setSelectedLevel('all_levels');
    setSelectedLanguage('all_languages');
  };

  const handleApplyNow = (programId: number) => {
    toast({
      title: t("application.notifications.applyStart"),
      description: t("application.notifications.applyStartDesc"),
    });
    setActiveTab('new-application');
  };
  
  const handleContinueApplication = (applicationId: number) => {
    toast({
      title: t("application.notifications.continueApplication"),
      description: t("application.notifications.continueApplicationDesc"),
    });
    setSelectedApplication(applicationId);
    setApplicationDetailTab('form');
    setActiveTab('application-detail');
  };
  
  const handleViewApplication = (applicationId: number) => {
    setSelectedApplication(applicationId);
    setApplicationDetailTab('form');
    setActiveTab('application-detail');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">{t("application.status.approved")}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">{t("application.status.rejected")}</Badge>;
      case 'review':
        return <Badge className="bg-amber-500">{t("application.status.review")}</Badge>;
      case 'incomplete':
        return <Badge className="bg-blue-500">{t("application.status.incomplete")}</Badge>;
      default:
        return <Badge>{t("application.status.processing")}</Badge>;
    }
  };
  
  const getProgramById = (id: number) => {
    return programs.find(program => program.id === id) || {
      title: "Unknown",
      titleAr: "غير معروف",
      university: "Unknown",
      universityAr: "غير معروف",
      image: "/placeholder.svg",
      level: "Unknown",
      levelAr: "غير معروف",
      country: "Unknown",
      countryAr: "غير معروف",
      duration: "Unknown",
      durationAr: "غير معروف",
      language: "Unknown",
      languageAr: "غير معروف",
      tuitionFee: "$0",
      tuitionFeeAr: "0 دولار أمريكي",
      discountedFee: "$0",
      discountedFeeAr: "0 دولار أمريكي",
    };
  };
  
  const getApplicationById = (id: number) => {
    return myApplications.find(app => app.id === id);
  };
  
  const countries = [...new Set(programs.map(p => p.country))];
  const levels = [...new Set(programs.map(p => p.level))];
  const languages = [...new Set(programs.map(p => p.language))];

  useEffect(() => {
    const programId = searchParams.get('program');
    const applicationId = searchParams.get('application');
    
    if (applicationId) {
      const appId = parseInt(applicationId);
      if (!isNaN(appId)) {
        setSelectedApplication(appId);
        setActiveTab('application-detail');
        return;
      }
    }
    
    const tab = searchParams.get('tab');
    if (tab && ['new-application', 'browse-programs', 'my-applications'].includes(tab)) {
      setActiveTab(tab);
      return;
    }
  }, [searchParams]);

  const currentApplication = selectedApplication ? getApplicationById(selectedApplication) : null;
  const currentProgram = currentApplication ? getProgramById(currentApplication.programId) : null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title={t("application.title")}
          subtitle={t("application.subtitle")}
        />
        
        <div className="max-w-7xl mx-auto mt-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full md:w-[600px] grid-cols-3">
              <TabsTrigger value="new-application">{t("application.tabs.newApplication")}</TabsTrigger>
              <TabsTrigger value="browse-programs">{t("application.tabs.browsePrograms")}</TabsTrigger>
              <TabsTrigger value="my-applications">{t("application.tabs.myApplications")}</TabsTrigger>
              <TabsTrigger value="application-detail" className="hidden"></TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-application" className="space-y-4">
              <StudentApplicationForm />
            </TabsContent>
            
            <TabsContent value="application-detail" className="space-y-4">
              {currentApplication && currentProgram && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-unlimited-blue">
                        {getLocalizedValue(currentProgram.title, currentProgram.titleAr)}
                      </h2>
                      <p className="text-unlimited-gray">
                        {getLocalizedValue(currentProgram.university, currentProgram.universityAr)} | 
                        {getLocalizedValue("Application", "رقم الطلب")}: #{selectedApplication}
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                      {getStatusBadge(currentApplication.status)}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('my-applications')}
                      >
                        Back to Applications
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Tabs value={applicationDetailTab} onValueChange={setApplicationDetailTab}>
                      <TabsList className="grid w-full md:w-[600px] grid-cols-3">
                        <TabsTrigger value="form">
                          <FileText className="h-4 w-4 mr-2" />
                          Application Form
                        </TabsTrigger>
                        <TabsTrigger value="documents">
                          <FileText className="h-4 w-4 mr-2" />
                          {t("application.documents.title")}
                        </TabsTrigger>
                        <TabsTrigger value="messages">
                          <FileText className="h-4 w-4 mr-2" />
                          {t("application.messages.title")}
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="form" className="mt-6">
                        <div className="space-y-4">
                          {currentApplication.status === 'incomplete' ? (
                            <StudentApplicationForm />
                          ) : (
                            <Card>
                              <CardHeader>
                                <CardTitle>Application Details</CardTitle>
                                <CardDescription>
                                  Submitted on {currentApplication.submissionDate}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                <div className="border-b pb-4">
                                  <h3 className="font-semibold text-lg mb-3">{t("application.personal.title")}</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.personal.firstName")}</p>
                                      <p>محمد</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.personal.lastName")}</p>
                                      <p>أحمد</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.personal.email")}</p>
                                      <p>mohamed@example.com</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.personal.phone")}</p>
                                      <p>+965 1234 5678</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.personal.dateOfBirth")}</p>
                                      <p>15/07/2000</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.personal.nationality")}</p>
                                      <p>Kuwait</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="border-b pb-4">
                                  <h3 className="font-semibold text-lg mb-3">{t("application.academic.title")}</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.academic.highSchoolName")}</p>
                                      <p>Kuwait International School</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.academic.yearOfGraduation")}</p>
                                      <p>2023</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.academic.gpa")}</p>
                                      <p>3.8</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.academic.certificateType")}</p>
                                      <p>{t("application.academic.scientificTrack")}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                      <p className="text-sm text-unlimited-gray">{t("application.academic.englishProficiency")}</p>
                                      <p>IELTS: 7.5</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-lg mb-3">{t("application.program.title")}</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.program.selectProgram")}</p>
                                      <p>{getLocalizedValue(currentProgram.title, currentProgram.titleAr)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.program.selectUniversity")}</p>
                                      <p>{getLocalizedValue(currentProgram.university, currentProgram.universityAr)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.program.intakeDate")}</p>
                                      <p>{getLocalizedValue("Fall 2025", "خريف 2025")}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-unlimited-gray">{t("application.program.programLevel")}</p>
                                      <p>{getLocalizedValue(currentProgram.level, currentProgram.levelAr)}</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="documents" className="mt-6">
                        <ApplicationDocuments 
                          programName={getLocalizedValue(currentProgram.title, currentProgram.titleAr)}
                          universityName={getLocalizedValue(currentProgram.university, currentProgram.universityAr)}
                          applicationId={selectedApplication}
                          readOnly={currentApplication.status !== 'incomplete'}
                        />
                      </TabsContent>
                      
                      <TabsContent value="messages" className="mt-6">
                        <ApplicationMessages
                          programName={getLocalizedValue(currentProgram.title, currentProgram.titleAr)}
                          universityName={getLocalizedValue(currentProgram.university, currentProgram.universityAr)}
                          applicationId={selectedApplication}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="browse-programs" className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-unlimited-blue">{t("application.tabs.browsePrograms")}</h2>
                  <p className="text-unlimited-gray">
                    {isRtl ? 
                      "اختر من بين مجموعة متنوعة من البرامج الدراسية المتاحة" : 
                      "Choose from a variety of available study programs"
                    }
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-unlimited-gray`} />
                      <Input
                        placeholder={t("application.search.placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={isRtl ? "pl-10" : "pr-10"}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("application.search.country")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_countries">{t("application.search.allCountries")}</SelectItem>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>
                            {getLocalizedValue(country, country === "Turkey" ? "تركيا" : country)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("application.search.level")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_levels">{t("application.search.allLevels")}</SelectItem>
                        {levels.map(level => (
                          <SelectItem key={level} value={level}>
                            {getLocalizedValue(level, level === "Bachelor" ? "بكالوريوس" : 
                                                  level === "Master" ? "ماجستير" : 
                                                  level === "PhD" ? "دكتوراه" : level)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("application.search.language")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_languages">{t("application.search.allLanguages")}</SelectItem>
                        {languages.map(language => (
                          <SelectItem key={language} value={language}>
                            {getLocalizedValue(language, language === "English" ? "الإنجليزية" : 
                                                      language === "Turkish" ? "التركية" : 
                                                      language === "Arabic" ? "العربية" : language)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" onClick={resetFilters} className="flex-shrink-0">
                    <FilterIcon className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                    {t("application.search.resetFilters")}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program) => (
                    <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
                      <img 
                        src={program.image} 
                        alt={getLocalizedValue(program.title, program.titleAr)} 
                        className="w-full h-36 object-cover"
                      />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{getLocalizedValue(program.title, program.titleAr)}</CardTitle>
                            <CardDescription>{getLocalizedValue(program.university, program.universityAr)}</CardDescription>
                          </div>
                          <Badge variant="secondary">{getLocalizedValue(program.level, program.levelAr)}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-unlimited-gray">
                            <Globe className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                            <span>{getLocalizedValue(program.country, program.countryAr)}</span>
                          </div>
                          <div className="flex items-center text-unlimited-gray">
                            <Building className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                            <span>{getLocalizedValue(program.university, program.universityAr)}</span>
                          </div>
                          <div className="flex items-center text-unlimited-gray">
                            <GraduationCap className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                            <span>
                              {isRtl ? `مدة الدراسة: ${program.durationAr}` : `Duration: ${program.duration}`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-unlimited-gray text-sm">
                            {t("application.programCard.tuitionFees")}:
                          </p>
                          <div className="flex items-baseline">
                            <span className="text-unlimited-blue font-bold">
                              {getLocalizedValue(program.discountedFee, program.discountedFeeAr)}
                            </span>
                            <span className="text-unlimited-gray text-sm line-through mr-2">
                              {getLocalizedValue(program.tuitionFee, program.tuitionFeeAr)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button className="w-full hover-scale" onClick={() => handleApplyNow(program.id)}>
                          <Plus className={`h-4 w-4 ${isRtl ? 'ml-1' : 'mr-1'}`} />
                          {t("application.programCard.applyNow")}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {filteredPrograms.length === 0 && (
                  <div className="text-center py-12 text-unlimited-gray animate-fade-in">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-unlimited-blue" />
                    <h3 className="text-xl font-medium mb-2">{t("application.noPrograms.title")}</h3>
                    <p>{t("application.noPrograms.description")}</p>
                    <Button variant="outline" className="mt-4" onClick={resetFilters}>
                      {t("application.noPrograms.resetFilters")}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="my-applications" className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-unlimited-blue">{t("application.myApplications.title")}</h2>
                  <p className="text-unlimited-gray">{t("application.myApplications.subtitle")}</p>
                </div>
                
                {myApplications.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {myApplications.map((application) => {
                      const program = getProgramById(application.programId);
                      return (
                        <Card key={application.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
                          <div className="flex flex-col md:flex-row">
                            <img 
                              src={program.image} 
                              alt={getLocalizedValue(program.title, program.titleAr)} 
                              className="w-full md:w-48 h-36 object-cover"
                            />
                            <div className="flex-1 flex flex-col">
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-lg">
                                      {getLocalizedValue(program.title, program.titleAr)}
                                    </CardTitle>
                                    <CardDescription>
                                      {getLocalizedValue(program.university, program.universityAr)}
                                    </CardDescription>
                                  </div>
                                  {getStatusBadge(application.status)}
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center text-unlimited-gray">
                                    <Clock className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                                    <span>
                                      {isRtl ? `تاريخ التقديم: ${application.submissionDate}` : 
                                             `Submission Date: ${application.submissionDate}`}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-unlimited-gray">
                                    <FileText className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                                    <span>
                                      {isRtl ? `ملاحظات: ${application.notesAr}` : 
                                             `Notes: ${application.notes}`}
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="pt-0 flex flex-wrap gap-2 justify-end">
                                {application.status === 'incomplete' ? (
                                  <Button 
                                    onClick={() => handleContinueApplication(application.id)}
                                    variant="default"
                                    className="hover-scale"
                                  >
                                    {t("application.myApplications.completeApplication")}
                                  </Button>
                                ) : (
                                  <Button 
                                    onClick={() => handleViewApplication(application.id)}
                                    variant="outline"
                                  >
                                    {t("application.myApplications.viewDetails")}
                                  </Button>
                                )}
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-unlimited-gray animate-fade-in">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-unlimited-blue" />
                    <h3 className="text-xl font-medium mb-2">{t("application.myApplications.empty.title")}</h3>
                    <p>{t("application.myApplications.empty.description")}</p>
                    <Button 
                      className="mt-4 hover-scale" 
                      onClick={() => setActiveTab('browse-programs')}
                    >
                      {t("application.myApplications.empty.browsePrograms")}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentApplication;
