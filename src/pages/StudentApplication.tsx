
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Search, FilterIcon, GraduationCap, Building, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

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

const StudentApplication = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all_countries');
  const [selectedLevel, setSelectedLevel] = useState('all_levels');
  const [selectedLanguage, setSelectedLanguage] = useState('all_languages');

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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="تقديم طلب التحاق"
          subtitle="قدم طلبك للالتحاق بأفضل الجامعات العالمية"
        />
        
        <div className="max-w-7xl mx-auto mt-10">
          <Tabs defaultValue="new-application" className="space-y-8">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="new-application">تقديم طلب جديد</TabsTrigger>
              <TabsTrigger value="browse-programs">استعراض البرامج</TabsTrigger>
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
                    <Card key={program.id} className="overflow-hidden">
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
                            <Globe className="h-4 w-4 mr-2" />
                            <span>{program.country}</span>
                          </div>
                          <div className="flex items-center text-unlimited-gray">
                            <Building className="h-4 w-4 mr-2" />
                            <span>{program.university}</span>
                          </div>
                          <div className="flex items-center text-unlimited-gray">
                            <GraduationCap className="h-4 w-4 mr-2" />
                            <span>مدة الدراسة: {program.duration}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-unlimited-gray text-sm">الرسوم الدراسية:</p>
                          <div className="flex items-baseline">
                            <span className="text-unlimited-blue font-bold">{program.discountedFee}</span>
                            <span className="text-unlimited-gray text-sm line-through ml-2">{program.tuitionFee}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button className="w-full">التقديم على هذا البرنامج</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentApplication;
