
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const programs = [
  {
    id: 1,
    title: "الطب البشري (بالإنجليزية)",
    titleAr: "الطب البشري (بالإنجليزية)",
    university: "جامعة اسطنبول",
    country: "تركيا",
    duration: "6 سنوات",
    language: "الإنجليزية",
    tuitionFee: "26,400 دولار أمريكي",
    discountedFee: "24,600 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "بكالوريوس",
  },
  {
    id: 2,
    title: "الطب البشري (بالتركية)",
    titleAr: "الطب البشري (بالتركية)",
    university: "جامعة اسطنبول",
    country: "تركيا",
    duration: "6 سنوات",
    language: "التركية",
    tuitionFee: "20,000 دولار أمريكي",
    discountedFee: "19,000 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "بكالوريوس",
  },
  {
    id: 3,
    title: "طب الأسنان (بالإنجليزية)",
    titleAr: "طب الأسنان (بالإنجليزية)",
    university: "جامعة اسطنبول",
    country: "تركيا",
    duration: "5 سنوات",
    language: "الإنجليزية",
    tuitionFee: "22,000 دولار أمريكي",
    discountedFee: "21,090 دولار أمريكي",
    image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png",
    level: "بكالوريوس",
  },
];

const myApplications = [
  {
    id: 101,
    programId: 1,
    status: "review",
    submissionDate: "2025-03-15",
    notes: "قيد المراجعة من قبل المختصين",
  },
  {
    id: 102,
    programId: 3,
    status: "incomplete",
    submissionDate: "2025-03-10",
    notes: "يرجى استكمال المستندات المطلوبة",
  }
];

const StudentApplication = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all_countries');
  const [selectedLevel, setSelectedLevel] = useState('all_levels');
  const [selectedLanguage, setSelectedLanguage] = useState('all_languages');
  const [activeTab, setActiveTab] = useState('new-application');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all_countries' || program.country === selectedCountry;
    const matchesLevel = selectedLevel === 'all_levels' || program.level === selectedLevel;
    const matchesLanguage = selectedLanguage === 'all_languages' || program.language === selectedLanguage;
    
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
      title: "بدء التقديم",
      description: "تم بدء عملية التقديم للبرنامج بنجاح",
    });
    setActiveTab('new-application');
  };
  
  const handleContinueApplication = (applicationId: number) => {
    toast({
      title: "متابعة الطلب",
      description: "يمكنك الآن متابعة استكمال طلبك",
    });
    setActiveTab('new-application');
  };
  
  const handleViewApplication = (applicationId: number) => {
    navigate(`/dashboard/applications/${applicationId}`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">تمت الموافقة</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">مرفوض</Badge>;
      case 'review':
        return <Badge className="bg-amber-500">قيد المراجعة</Badge>;
      case 'incomplete':
        return <Badge className="bg-blue-500">غير مكتمل</Badge>;
      default:
        return <Badge>قيد الإجراء</Badge>;
    }
  };
  
  const getProgramById = (id: number) => {
    return programs.find(program => program.id === id) || {
      title: "غير معروف",
      university: "غير معروف",
      image: "/placeholder.svg"
    };
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="تقديم طلب التحاق"
          subtitle="قدم طلبك للالتحاق بأفضل الجامعات العالمية"
        />
        
        <div className="max-w-7xl mx-auto mt-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full md:w-[600px] grid-cols-3">
              <TabsTrigger value="new-application">تقديم طلب جديد</TabsTrigger>
              <TabsTrigger value="browse-programs">استعراض البرامج</TabsTrigger>
              <TabsTrigger value="my-applications">طلباتي</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-application" className="space-y-4">
              <StudentApplicationForm />
            </TabsContent>
            
            <TabsContent value="browse-programs" className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-unlimited-dark-blue">استكشاف البرامج الدراسية</h2>
                  <p className="text-unlimited-gray">اختر من بين مجموعة متنوعة من البرامج الدراسية المتاحة</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray" />
                      <Input
                        placeholder="ابحث عن برنامج أو جامعة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="البلد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_countries">جميع البلدان</SelectItem>
                        <SelectItem value="تركيا">تركيا</SelectItem>
                        <SelectItem value="المجر">المجر</SelectItem>
                        <SelectItem value="بولندا">بولندا</SelectItem>
                        <SelectItem value="التشيك">التشيك</SelectItem>
                        <SelectItem value="قبرص">قبرص</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="المستوى الدراسي" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_levels">جميع المستويات</SelectItem>
                        <SelectItem value="بكالوريوس">بكالوريوس</SelectItem>
                        <SelectItem value="ماجستير">ماجستير</SelectItem>
                        <SelectItem value="دكتوراه">دكتوراه</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="لغة الدراسة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_languages">جميع اللغات</SelectItem>
                        <SelectItem value="الإنجليزية">الإنجليزية</SelectItem>
                        <SelectItem value="التركية">التركية</SelectItem>
                        <SelectItem value="العربية">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" onClick={resetFilters} className="flex-shrink-0">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    إعادة تعيين
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program) => (
                    <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-36 object-cover"
                      />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{program.titleAr}</CardTitle>
                            <CardDescription>{program.university}</CardDescription>
                          </div>
                          <Badge variant="secondary">{program.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-unlimited-gray">
                            <Globe className="h-4 w-4 ml-2" />
                            <span>{program.country}</span>
                          </div>
                          <div className="flex items-center text-unlimited-gray">
                            <Building className="h-4 w-4 ml-2" />
                            <span>{program.university}</span>
                          </div>
                          <div className="flex items-center text-unlimited-gray">
                            <GraduationCap className="h-4 w-4 ml-2" />
                            <span>مدة الدراسة: {program.duration}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-unlimited-gray text-sm">الرسوم الدراسية:</p>
                          <div className="flex items-baseline">
                            <span className="text-unlimited-blue font-bold">{program.discountedFee}</span>
                            <span className="text-unlimited-gray text-sm line-through mr-2">{program.tuitionFee}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button className="w-full" onClick={() => handleApplyNow(program.id)}>
                          <Plus className="h-4 w-4 ml-1" />
                          التقديم على هذا البرنامج
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {filteredPrograms.length === 0 && (
                  <div className="text-center py-12 text-unlimited-gray">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-unlimited-blue" />
                    <h3 className="text-xl font-medium mb-2">لا توجد برامج مطابقة</h3>
                    <p>لا يوجد برامج تطابق معايير البحث الحالية. يرجى تعديل خيارات البحث أو إعادة تعيين الفلاتر.</p>
                    <Button variant="outline" className="mt-4" onClick={resetFilters}>
                      إعادة تعيين الفلاتر
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="my-applications" className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-unlimited-dark-blue">طلباتي</h2>
                  <p className="text-unlimited-gray">تتبع حالة طلباتك وتحديثاتها</p>
                </div>
                
                {myApplications.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {myApplications.map((application) => {
                      const program = getProgramById(application.programId);
                      return (
                        <Card key={application.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <img 
                              src={program.image} 
                              alt={program.title} 
                              className="w-full md:w-48 h-36 object-cover"
                            />
                            <div className="flex-1 flex flex-col">
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-lg">{program.title}</CardTitle>
                                    <CardDescription>{program.university}</CardDescription>
                                  </div>
                                  {getStatusBadge(application.status)}
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center text-unlimited-gray">
                                    <Clock className="h-4 w-4 ml-2" />
                                    <span>تاريخ التقديم: {application.submissionDate}</span>
                                  </div>
                                  <div className="flex items-center text-unlimited-gray">
                                    <FileText className="h-4 w-4 ml-2" />
                                    <span>ملاحظات: {application.notes}</span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="pt-0 flex flex-wrap gap-2 justify-end">
                                {application.status === 'incomplete' ? (
                                  <Button 
                                    onClick={() => handleContinueApplication(application.id)}
                                    variant="default"
                                  >
                                    استكمال الطلب
                                  </Button>
                                ) : (
                                  <Button 
                                    onClick={() => handleViewApplication(application.id)}
                                    variant="outline"
                                  >
                                    عرض التفاصيل
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
                  <div className="text-center py-12 text-unlimited-gray">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-unlimited-blue" />
                    <h3 className="text-xl font-medium mb-2">لا توجد طلبات حالية</h3>
                    <p>لم تقم بتقديم أي طلبات بعد. استعرض البرامج المتاحة وقدم طلبك الآن.</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setActiveTab('browse-programs')}
                    >
                      استعراض البرامج
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
