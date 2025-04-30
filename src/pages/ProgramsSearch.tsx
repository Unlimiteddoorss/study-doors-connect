
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Slider
} from "@/components/ui/slider";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Download, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data for programs
const mockPrograms = [
  {
    id: "1",
    name: "Bachelor of Business Administration (English)",
    nameAr: "بكالوريوس إدارة الأعمال (إنجليزي)",
    university: "Ozyegin University",
    universityAr: "جامعة أوزيجين",
    tuition: 12100,
    discountedTuition: 11495,
    currency: "USD",
    degree: "Bachelor",
    language: "English",
    speciality: "Business, Economics & Administrative Sciences / Business Administration, Management, General",
    location: "Turkey, Istanbul",
    logo: "/lovable-uploads/c680345e-7ede-49f4-9539-2d79414c5e22.png",
    commission: 0,
    hasAccreditation: true
  },
  {
    id: "2",
    name: "Bachelor of Economics (English)",
    nameAr: "بكالوريوس الاقتصاد (إنجليزي)",
    university: "Ozyegin University",
    universityAr: "جامعة أوزيجين",
    tuition: 12100,
    discountedTuition: 11495,
    currency: "USD",
    degree: "Bachelor",
    language: "English",
    speciality: "Business, Economics & Administrative Sciences / Accounting, Finance & Economics",
    location: "Turkey, Istanbul",
    logo: "/lovable-uploads/c680345e-7ede-49f4-9539-2d79414c5e22.png",
    commission: 0,
    hasAccreditation: true
  },
  {
    id: "3",
    name: "Bachelor of Entrepreneurship (English)",
    nameAr: "بكالوريوس ريادة الأعمال (إنجليزي)",
    university: "Ozyegin University",
    universityAr: "جامعة أوزيجين",
    tuition: 12100,
    discountedTuition: 11495,
    currency: "USD",
    degree: "Bachelor",
    language: "English",
    speciality: "Business, Economics & Administrative Sciences / Entrepreneurship",
    location: "Turkey, Istanbul",
    logo: "/lovable-uploads/c680345e-7ede-49f4-9539-2d79414c5e22.png",
    commission: 0,
    hasAccreditation: true
  },
  {
    id: "4",
    name: "Bachelor of International Finance (English)",
    nameAr: "بكالوريوس التمويل الدولي (إنجليزي)",
    university: "Ozyegin University",
    universityAr: "جامعة أوزيجين",
    tuition: 12100,
    discountedTuition: 11495,
    currency: "USD",
    degree: "Bachelor",
    language: "English",
    speciality: "Business, Economics & Administrative Sciences / Accounting, Finance & Economics",
    location: "Turkey, Istanbul",
    logo: "/lovable-uploads/c680345e-7ede-49f4-9539-2d79414c5e22.png",
    commission: 0,
    hasAccreditation: true
  },
  {
    id: "5",
    name: "Master of Business Administration (Thesis) (English)",
    nameAr: "ماجستير إدارة الأعمال (رسالة) (إنجليزي)",
    university: "Istanbul Medipol University",
    universityAr: "جامعة إسطنبول ميديبول",
    tuition: 8000,
    discountedTuition: 7600,
    currency: "USD",
    degree: "Master",
    language: "English",
    speciality: "Business, Economics & Administrative Sciences / Business Administration",
    location: "Turkey, Istanbul",
    logo: "/lovable-uploads/dbd3909c-00e0-4028-87b9-7c67c6beda53.png",
    commission: 500,
    hasAccreditation: true
  },
  {
    id: "6",
    name: "Master of Computer Engineering (Thesis) (English)",
    nameAr: "ماجستير هندسة الحاسوب (رسالة) (إنجليزي)",
    university: "Istanbul Technical University",
    universityAr: "جامعة إسطنبول التقنية",
    tuition: 9500,
    discountedTuition: 9500,
    currency: "USD",
    degree: "Master",
    language: "English",
    speciality: "Engineering / Computer Engineering",
    location: "Turkey, Istanbul",
    logo: "/lovable-uploads/2be9319f-b77f-4bb2-9766-1d7f5383d723.png",
    commission: 300,
    hasAccreditation: true
  },
];

// Interface for filter state
interface FilterState {
  schoolTypes: string[];
  countries: string | null;
  city: string | null;
  university: string | null;
  degree: string | null;
  field: string | null;
  speciality: string | null;
  language: string | null;
  keywords: string;
  tuitionRange: [number, number];
}

const ProgramsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [programs, setPrograms] = useState(mockPrograms);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<FilterState>({
    schoolTypes: [],
    countries: null,
    city: null,
    university: null,
    degree: null,
    field: null,
    speciality: null,
    language: null,
    keywords: '',
    tuitionRange: [0, 30000],
  });
  
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleSchoolTypeToggle = (type: string) => {
    setFilters((prev) => {
      const types = prev.schoolTypes.includes(type)
        ? prev.schoolTypes.filter((t) => t !== type)
        : [...prev.schoolTypes, type];
      return { ...prev, schoolTypes: types };
    });
  };
  
  const handleSearchSubmit = () => {
    // In a real app, this would filter based on the search query and filters
    // For now, we'll just show a toast message
    toast({
      title: "تم البحث",
      description: `تم البحث عن "${searchQuery}" مع تطبيق الفلاتر المحددة.`,
    });
  };
  
  const handleResetFilters = () => {
    setFilters({
      schoolTypes: [],
      countries: null,
      city: null,
      university: null,
      degree: null,
      field: null,
      speciality: null,
      language: null,
      keywords: '',
      tuitionRange: [0, 30000],
    });
  };
  
  const handleExportToPdf = () => {
    toast({
      title: "جاري التصدير",
      description: "جاري تصدير نتائج البحث إلى ملف PDF.",
    });
    // In a real app, this would trigger a PDF download
  };
  
  const handleViewProgram = (programId: string) => {
    navigate(`/programs/${programId}`);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-2">البحث عن البرامج الدراسية</h1>
          <p className="text-unlimited-gray">ابحث عن البرامج الدراسية المتاحة واستعرض التفاصيل</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray" />
              <Input
                placeholder="ابحث باسم البرنامج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  تصفية النتائج
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>تصفية البرامج</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">ترتيب حسب</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="الافتراضي" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">الافتراضي</SelectItem>
                        <SelectItem value="tuition-asc">السعر: من الأقل إلى الأعلى</SelectItem>
                        <SelectItem value="tuition-desc">السعر: من الأعلى إلى الأقل</SelectItem>
                        <SelectItem value="name-asc">الاسم: أ-ي</SelectItem>
                        <SelectItem value="name-desc">الاسم: ي-أ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">نوع المؤسسة</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id="college" 
                          checked={filters.schoolTypes.includes('college')} 
                          onCheckedChange={() => handleSchoolTypeToggle('college')} 
                        />
                        <label htmlFor="college" className="text-sm">كلية</label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id="institution" 
                          checked={filters.schoolTypes.includes('institution')} 
                          onCheckedChange={() => handleSchoolTypeToggle('institution')} 
                        />
                        <label htmlFor="institution" className="text-sm">معهد</label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id="university" 
                          checked={filters.schoolTypes.includes('university')} 
                          onCheckedChange={() => handleSchoolTypeToggle('university')} 
                        />
                        <label htmlFor="university" className="text-sm">جامعة</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">الدولة</h3>
                    <Select 
                      value={filters.countries || undefined} 
                      onValueChange={(value) => handleFilterChange('countries', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="غير محدد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Turkey">تركيا</SelectItem>
                        <SelectItem value="United Kingdom">المملكة المتحدة</SelectItem>
                        <SelectItem value="United States">الولايات المتحدة</SelectItem>
                        <SelectItem value="Canada">كندا</SelectItem>
                        <SelectItem value="Germany">ألمانيا</SelectItem>
                        <SelectItem value="France">فرنسا</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">المدينة</h3>
                    <Select 
                      value={filters.city || undefined} 
                      onValueChange={(value) => handleFilterChange('city', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="غير محدد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Istanbul">إسطنبول</SelectItem>
                        <SelectItem value="Ankara">أنقرة</SelectItem>
                        <SelectItem value="London">لندن</SelectItem>
                        <SelectItem value="New York">نيويورك</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">الجامعة</h3>
                    <Select 
                      value={filters.university || undefined} 
                      onValueChange={(value) => handleFilterChange('university', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="غير محدد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ozyegin University">جامعة أوزيجين</SelectItem>
                        <SelectItem value="Istanbul Medipol University">جامعة إسطنبول ميديبول</SelectItem>
                        <SelectItem value="Istanbul Technical University">جامعة إسطنبول التقنية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">الدرجة العلمية</h3>
                    <Select 
                      value={filters.degree || undefined} 
                      onValueChange={(value) => handleFilterChange('degree', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="غير محدد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bachelor">بكالوريوس</SelectItem>
                        <SelectItem value="Master">ماجستير</SelectItem>
                        <SelectItem value="PhD">دكتوراه</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">المجال</h3>
                    <Select 
                      value={filters.field || undefined} 
                      onValueChange={(value) => handleFilterChange('field', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="غير محدد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Business & Management">إدارة الأعمال</SelectItem>
                        <SelectItem value="Engineering">الهندسة</SelectItem>
                        <SelectItem value="Medicine & Health Sciences">الطب والعلوم الصحية</SelectItem>
                        <SelectItem value="Computer Science">علوم الحاسوب</SelectItem>
                        <SelectItem value="Economics">الاقتصاد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">التخصص</h3>
                    <Select 
                      value={filters.speciality || undefined} 
                      onValueChange={(value) => handleFilterChange('speciality', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="غير محدد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Business Administration">إدارة الأعمال</SelectItem>
                        <SelectItem value="Computer Engineering">هندسة الحاسوب</SelectItem>
                        <SelectItem value="Medicine">الطب البشري</SelectItem>
                        <SelectItem value="Economics">الاقتصاد</SelectItem>
                        <SelectItem value="Entrepreneurship">ريادة الأعمال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">لغة التدريس</h3>
                    <Select 
                      value={filters.language || undefined} 
                      onValueChange={(value) => handleFilterChange('language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="غير محدد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">الإنجليزية</SelectItem>
                        <SelectItem value="Turkish">التركية</SelectItem>
                        <SelectItem value="Arabic">العربية</SelectItem>
                        <SelectItem value="German">الألمانية</SelectItem>
                        <SelectItem value="French">الفرنسية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">كلمات مفتاحية</h3>
                    <Input 
                      placeholder="أدخل كلمات مفتاحية للبحث" 
                      value={filters.keywords} 
                      onChange={(e) => handleFilterChange('keywords', e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <h3 className="text-sm font-medium">الرسوم الدراسية ($)</h3>
                    <div className="pt-6">
                      <Slider
                        defaultValue={[0, 30000]}
                        max={30000}
                        step={100}
                        minStepsBetweenThumbs={10}
                        value={filters.tuitionRange}
                        onValueChange={(value: [number, number]) => handleFilterChange('tuitionRange', value)}
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">${filters.tuitionRange[0]}</span>
                        <span className="text-sm">${filters.tuitionRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleResetFilters}>إعادة تعيين</Button>
                  <Button onClick={() => { handleSearchSubmit(); setIsFilterOpen(false); }}>تطبيق الفلاتر</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Button variant="default" onClick={handleSearchSubmit}>
            <Search className="h-4 w-4 mr-2" />
            بحث
          </Button>
        </div>

        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleExportToPdf} className="gap-2">
            <Download className="h-4 w-4" />
            تصدير إلى PDF
          </Button>
        </div>

        <div className="space-y-6">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="bg-gray-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l">
                  <img src={program.logo} alt={program.university} className="w-28 h-28 object-contain mb-4" />
                  <div className="text-center">
                    <h3 className="font-medium text-unlimited-dark-blue">{program.universityAr}</h3>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-unlimited-blue p-0 h-auto"
                      onClick={() => window.open(`/universities/${program.university.toLowerCase().replace(/ /g, '-')}`, '_blank')}
                    >
                      عرض الجامعة
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                    {program.hasAccreditation && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          معتمدة
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-span-3 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-unlimited-dark-blue mb-3">{program.nameAr}</h2>
                      
                      <div className="space-y-3 mb-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-unlimited-gray text-sm">التخصص:</p>
                            <p className="font-medium">{program.speciality.split('/')[1].trim()}</p>
                          </div>
                          <div>
                            <p className="text-unlimited-gray text-sm">لغة التدريس:</p>
                            <p className="font-medium">{program.language === "English" ? "اللغة الإنجليزية" : program.language}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-unlimited-gray text-sm">الدرجة العلمية:</p>
                            <p className="font-medium">
                              {program.degree === "Bachelor" ? "بكالوريوس" : 
                               program.degree === "Master" ? "ماجستير" : 
                               program.degree === "PhD" ? "دكتوراه" : program.degree}
                            </p>
                          </div>
                          <div>
                            <p className="text-unlimited-gray text-sm">الموقع:</p>
                            <p className="font-medium">{program.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="default" 
                      onClick={() => handleViewProgram(program.id)}
                    >
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
                
                <div className="bg-unlimited-light-blue/10 p-6 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-unlimited-gray text-sm mb-1">الرسوم الدراسية</p>
                    
                    {program.discountedTuition < program.tuition ? (
                      <>
                        <p className="line-through text-unlimited-gray text-sm">{program.tuition} {program.currency}</p>
                        <p className="text-xl font-bold text-unlimited-dark-blue">{program.discountedTuition} {program.currency}</p>
                      </>
                    ) : (
                      <p className="text-xl font-bold text-unlimited-dark-blue">{program.tuition} {program.currency}</p>
                    )}
                    
                    <p className="text-unlimited-gray text-xs">
                      السعر لكل سنة دراسية
                    </p>
                    
                    <Separator className="my-4" />
                    
                    <p className="text-unlimited-gray text-sm mb-1">العمولة</p>
                    <p className="text-unlimited-blue font-bold">
                      {program.commission} {program.currency}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProgramsSearch;
