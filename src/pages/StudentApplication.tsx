
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import ApplicationForm from '@/components/applications/ApplicationForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Search, FilterIcon, GraduationCap, Building, Globe, Check, Clock, Plus, FileText, AlertCircle, MessageCircle } from 'lucide-react';
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
import ApplicationStatus from '@/components/applications/ApplicationStatus';

const programs = [
  {
    id: 1,
    title: "Medicine (English)",
    titleAr: "الطب البشري (بالإنجليزية)",
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

const StudentApplication = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all_countries');
  const [selectedLevel, setSelectedLevel] = useState('all_levels');
  const [selectedLanguage, setSelectedLanguage] = useState('all_languages');
  const [activeTab, setActiveTab] = useState('new-application');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isRtl = i18n.language === 'ar';
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  
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
    const program = programs.find(p => p.id === programId);
    if (program) {
      setSelectedProgramId(programId);
      setSelectedProgram(program);
      toast({
        title: t("application.notifications.applyStart"),
        description: getLocalizedValue(
          `You are applying to ${program.title} at ${program.university}`, 
          `أنت تقوم بالتقديم على ${program.titleAr} في ${program.universityAr}`
        ),
      });
      setActiveTab('new-application');
    }
  };
  
  const handleContinueApplication = (applicationId: string) => {
    const appToComplete = applications.find(app => app.id === applicationId);
    if (appToComplete) {
      const program = programs.find(p => p.id === appToComplete.programDetails?.programId);
      if (program) {
        setSelectedProgramId(program.id);
        setSelectedProgram(program);
      }
    }
    
    toast({
      title: t("application.notifications.continueApplication"),
      description: t("application.notifications.continueApplicationDesc"),
    });
    setActiveTab('new-application');
  };
  
  const handleViewApplication = (applicationId: string) => {
    navigate(`/dashboard/applications/${applicationId}`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'accepted':
        return <Badge className="bg-green-500">{t("application.status.approved")}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">{t("application.status.rejected")}</Badge>;
      case 'reviewing':
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
      image: "/placeholder.svg"
    };
  };
  
  const countries = [...new Set(programs.map(p => p.country))];
  const levels = [...new Set(programs.map(p => p.level))];
  const languages = [...new Set(programs.map(p => p.language))];

  useEffect(() => {
    const storedApplications = localStorage.getItem('studentApplications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
  }, [activeTab]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab && ['new-application', 'browse-programs', 'my-applications'].includes(tab)) {
      setActiveTab(tab);
    }
    
    const programId = urlParams.get('programId');
    if (programId) {
      const programIdNum = parseInt(programId);
      setSelectedProgramId(programIdNum);
      const program = programs.find(p => p.id === programIdNum);
      if (program) {
        setSelectedProgram(program);
        setActiveTab('new-application');
      }
    }
    
    const universityId = urlParams.get('universityId');
    if (universityId) {
      setActiveTab('browse-programs');
    }
  }, [location]);

  const handleApplicationSubmitted = () => {
    const storedApplications = localStorage.getItem('studentApplications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
  };

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
            </TabsList>
            
            <TabsContent value="new-application" className="space-y-4">
              <ApplicationForm 
                programId={selectedProgramId || undefined}
                programName={selectedProgram?.titleAr || selectedProgram?.title}
                universityId={selectedProgram?.universityId}
                universityName={selectedProgram?.universityAr || selectedProgram?.university}
                onApplicationSubmitted={handleApplicationSubmitted}
              />
            </TabsContent>
            
            <TabsContent value="browse-programs" className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-unlimited-dark-blue">{t("application.tabs.browsePrograms")}</h2>
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
                  <h2 className="text-2xl font-bold text-unlimited-dark-blue">{t("application.myApplications.title")}</h2>
                  <p className="text-unlimited-gray">{t("application.myApplications.subtitle")}</p>
                </div>
                
                {applications.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {applications.map((application) => {
                      return (
                        <Card key={application.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
                          <div className="flex flex-col md:flex-row">
                            <img 
                              src={application.programDetails?.image || "/placeholder.svg"} 
                              alt={application.program} 
                              className="w-full md:w-48 h-36 object-cover"
                            />
                            <div className="flex-1 flex flex-col">
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-lg">
                                      {application.program}
                                    </CardTitle>
                                    <CardDescription>
                                      {application.university}
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
                                      {isRtl ? `تاريخ التقديم: ${application.date}` : 
                                             `Submission Date: ${application.date}`}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-unlimited-gray">
                                    <FileText className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                                    <span>
                                      {isRtl ? `رقم الطلب: ${application.id}` : 
                                             `Application ID: ${application.id}`}
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
                                  <>
                                    <Button 
                                      onClick={() => handleViewApplication(application.id)}
                                      variant="outline"
                                    >
                                      <FileText className="h-4 w-4 ml-2" />
                                      {t("application.myApplications.viewDetails")}
                                    </Button>
                                    
                                    <Button asChild>
                                      <Link to={`/messages?application=${application.id}`}>
                                        <MessageCircle className="h-4 w-4 ml-2" />
                                        {t("application.myApplications.contactAdvisor")}
                                      </Link>
                                    </Button>
                                  </>
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
