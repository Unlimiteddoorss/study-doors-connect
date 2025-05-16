import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { useTranslation } from 'react-i18next';
import ProgramSearch from '@/components/programs/ProgramSearch';
import ProgramsGrid from '@/components/programs/ProgramsGrid';
import ProgramFilters, { LegacyFilters } from '@/components/programs/ProgramFilters';
import { ProgramInfo, convertToProgramInfo } from '@/data/programsData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const EngineeringPrograms: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isAdminMode } = useAdmin();
  const [programs, setPrograms] = useState<ProgramInfo[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<LegacyFilters>({
    country: '',
    university: '',
    degree: '',
    language: '',
    fee: [0, 100000],
    hasScholarship: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  
  // Simulate API call to fetch programs
  useEffect(() => {
    const fetchData = async () => {
      // Mock data for engineering programs
      const engineeringPrograms = [
        {
          id: 101,
          name: "Civil Engineering",
          name_ar: "الهندسة المدنية",
          university: "Istanbul Technical University",
          university_id: 1,
          degree_type: "Bachelor",
          duration: 4,
          tuition_fee: 5500,
          language: "English",
          country: "Turkey",
          city: "Istanbul",
          is_popular: true,
          has_scholarship: false,
          description: "Learn the principles of structural engineering, construction, and urban planning.",
          university_image: "/images/universities/istanbul-technical-university.jpg"
        },
        {
          id: 102,
          name: "Mechanical Engineering",
          name_ar: "الهندسة الميكانيكية",
          university: "Middle East Technical University",
          university_id: 3,
          degree_type: "Bachelor",
          duration: 4,
          tuition_fee: 5300,
          language: "English",
          country: "Turkey",
          city: "Ankara",
          is_popular: false,
          has_scholarship: true,
          description: "Study the principles of mechanics, thermodynamics, and energy conversion.",
          university_image: "/images/universities/middle-east-technical-university.jpg"
        },
        {
          id: 103,
          name: "Electrical Engineering",
          name_ar: "الهندسة الكهربائية",
          university: "Boğaziçi University",
          university_id: 5,
          degree_type: "Bachelor",
          duration: 4,
          tuition_fee: 6000,
          language: "English",
          country: "Turkey",
          city: "Istanbul",
          is_popular: false,
          has_scholarship: false,
          description: "Focus on electrical systems, power generation, and electronic components.",
          university_image: "/images/universities/bogazici-university.jpg"
        },
        {
          id: 104,
          name: "Computer Engineering",
          name_ar: "هندسة الحاسوب",
          university: "Koç University",
          university_id: 4,
          degree_type: "Bachelor",
          duration: 4,
          tuition_fee: 7500,
          language: "English",
          country: "Turkey",
          city: "Istanbul",
          is_popular: true,
          has_scholarship: true,
          description: "Study computer hardware, software systems, and network architecture.",
          university_image: "/images/universities/koc-university.jpg"
        },
        {
          id: 105,
          name: "Chemical Engineering",
          name_ar: "الهندسة الكيميائية",
          university: "Bilkent University",
          university_id: 2,
          degree_type: "Bachelor", 
          duration: 4,
          tuition_fee: 6200,
          language: "English",
          country: "Turkey",
          city: "Ankara",
          is_popular: false,
          has_scholarship: true,
          description: "Focus on chemical processes, materials, and sustainable technologies.",
          university_image: "/images/universities/bilkent-university.jpg"
        }
      ];

      // Convert to ProgramInfo format
      const engineeringProgramsFormatted = engineeringPrograms.map(program => convertToProgramInfo(program));
      
      setTimeout(() => {
        setPrograms(engineeringProgramsFormatted);
        setFilteredPrograms(engineeringProgramsFormatted);
        setIsLoading(false);
      }, 1000); // Simulate loading delay
    };

    fetchData();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = [...programs];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (program) =>
          program.name?.toLowerCase().includes(query) ||
          program.university.toLowerCase().includes(query) ||
          program.description?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.country) {
      result = result.filter((program) => program.country === filters.country);
    }
    if (filters.university) {
      result = result.filter((program) => program.university === filters.university);
    }
    if (filters.degree) {
      result = result.filter((program) => program.degree_type === filters.degree);
    }
    if (filters.language) {
      result = result.filter((program) => {
        if (Array.isArray(program.language)) {
          return program.language.includes(filters.language);
        }
        return program.language === filters.language;
      });
    }
    
    if (filters.hasScholarship) {
      result = result.filter((program) => program.has_scholarship === true);
    }

    // Apply fee range filter
    result = result.filter(
      (program) =>
        (program.tuition_fee || 0) >= filters.fee[0] &&
        (program.tuition_fee || 0) <= filters.fee[1]
    );

    setFilteredPrograms(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters, programs]);

  // Handle pagination
  const programsPerPage = 6;
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  const currentPrograms = filteredPrograms.slice(
    (currentPage - 1) * programsPerPage,
    currentPage * programsPerPage
  );

  const handleAddProgram = () => {
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة البرنامج الجديد بنجاح"
    });
    setIsAddProgramDialogOpen(false);
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{t('engineeringPrograms.title')} | Unlimited Doors</title>
        <meta name="description" content={t('engineeringPrograms.metaDescription')} />
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-unlimited-dark-blue mb-2">
            {t('engineeringPrograms.title')}
          </h1>
          <p className="text-unlimited-gray max-w-2xl mx-auto">
            {t('engineeringPrograms.subtitle')}
          </p>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <ProgramSearch
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            placeholder={t('engineeringPrograms.searchPlaceholder')}
          />
          
          {isAdminMode && (
            <Button 
              onClick={() => setIsAddProgramDialogOpen(true)}
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة برنامج جديد
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProgramFilters 
              filters={filters} 
              setFilters={setFilters} 
            />
          </div>

          <div className="lg:col-span-3">
            <ProgramsGrid
              programs={currentPrograms}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
              onResetFilters={() => {
                setFilters({
                  country: '',
                  university: '',
                  degree: '',
                  language: '',
                  fee: [0, 100000],
                  hasScholarship: false,
                });
                setSearchQuery('');
              }}
              isAdminMode={isAdminMode}
            />
          </div>
        </div>
      </div>
      
      {/* Add Program Dialog */}
      <Dialog open={isAddProgramDialogOpen} onOpenChange={setIsAddProgramDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة برنامج دراسي جديد</DialogTitle>
            <DialogDescription>
              أدخل معلومات البرنامج الدراسي الجديد أدناه
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program-name" className="text-right">اسم البرنامج</Label>
              <Input id="program-name" placeholder="بكالوريوس الهندسة المدنية" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program-name-ar" className="text-right">اسم البرنامج (عربي)</Label>
              <Input id="program-name-ar" placeholder="بكالوريوس الهندسة المدنية" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="university" className="text-right">الجامعة</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Istanbul Technical University</SelectItem>
                  <SelectItem value="2">Bilkent University</SelectItem>
                  <SelectItem value="3">Middle East Technical University</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="degree-type" className="text-right">الدرجة العلمية</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الدرجة العلمية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bachelor">بكالوريوس</SelectItem>
                  <SelectItem value="Master">ماجستير</SelectItem>
                  <SelectItem value="PhD">دكتوراه</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">المدة (سنوات)</Label>
              <Input id="duration" type="number" min="1" max="10" placeholder="4" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tuition" className="text-right">الرسوم الدراسية ($)</Label>
              <Input id="tuition" type="number" placeholder="5000" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">لغة الدراسة</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">الإنجليزية</SelectItem>
                  <SelectItem value="Turkish">التركية</SelectItem>
                  <SelectItem value="Arabic">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">منحة دراسية</Label>
              <div className="flex items-center space-x-2 rtl:space-x-reverse col-span-3">
                <Checkbox id="scholarship" />
                <label htmlFor="scholarship" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  البرنامج يقدم منحة دراسية
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">الوصف</Label>
              <Textarea id="description" placeholder="وصف البرنامج الدراسي..." className="col-span-3" />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddProgramDialogOpen(false)}>
              إلغاء
            </Button>
            <Button type="button" onClick={handleAddProgram}>
              إضافة البرنامج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default EngineeringPrograms;
