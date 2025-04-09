
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  BarChart2,
  Calendar,
  Download,
  Edit,
  Plus,
  Search,
  Trash,
  Upload,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from '@/components/dashboard/AdminSidebar';

type Program = {
  id: string;
  title: string;
  titleAr: string;
  university: string;
  country: string;
  duration: string;
  language: string;
  tuitionFee: string;
  discountedFee: string;
  level: string;
  description: string;
  seats: number;
  createdAt: string;
  status: 'active' | 'inactive';
};

const initialPrograms: Program[] = [
  {
    id: 'PROG-001',
    title: 'Medicine (English)',
    titleAr: 'الطب البشري (بالإنجليزية)',
    university: 'Istanbul University',
    country: 'Turkey',
    duration: '6 years',
    language: 'English',
    tuitionFee: '$26,400',
    discountedFee: '$24,600',
    level: 'Bachelor',
    description: 'Bachelor of Medicine program taught in English',
    seats: 50,
    createdAt: '2023-01-15',
    status: 'active',
  },
  {
    id: 'PROG-002',
    title: 'Medicine (Turkish)',
    titleAr: 'الطب البشري (بالتركية)',
    university: 'Istanbul University',
    country: 'Turkey',
    duration: '6 years',
    language: 'Turkish',
    tuitionFee: '$20,000',
    discountedFee: '$19,000',
    level: 'Bachelor',
    description: 'Bachelor of Medicine program taught in Turkish',
    seats: 30,
    createdAt: '2023-01-15',
    status: 'active',
  },
  {
    id: 'PROG-003',
    title: 'Dentistry (English)',
    titleAr: 'طب الأسنان (بالإنجليزية)',
    university: 'Istanbul University',
    country: 'Turkey',
    duration: '5 years',
    language: 'English',
    tuitionFee: '$22,000',
    discountedFee: '$21,090',
    level: 'Bachelor',
    description: 'Bachelor of Dentistry program taught in English',
    seats: 40,
    createdAt: '2023-01-18',
    status: 'active',
  },
  {
    id: 'PROG-004',
    title: 'Computer Science (English)',
    titleAr: 'علوم الحاسوب (بالإنجليزية)',
    university: 'Budapest University',
    country: 'Hungary',
    duration: '4 years',
    language: 'English',
    tuitionFee: '$12,000',
    discountedFee: '$11,000',
    level: 'Bachelor',
    description: 'Bachelor of Computer Science program taught in English',
    seats: 60,
    createdAt: '2023-01-20',
    status: 'active',
  },
  {
    id: 'PROG-005',
    title: 'Business Administration (English)',
    titleAr: 'إدارة الأعمال (بالإنجليزية)',
    university: 'Warsaw University',
    country: 'Poland',
    duration: '4 years',
    language: 'English',
    tuitionFee: '$10,000',
    discountedFee: '$9,500',
    level: 'Bachelor',
    description: 'Bachelor of Business Administration program taught in English',
    seats: 80,
    createdAt: '2023-01-22',
    status: 'active',
  },
  {
    id: 'PROG-006',
    title: 'Civil Engineering (English)',
    titleAr: 'الهندسة المدنية (بالإنجليزية)',
    university: 'Prague University',
    country: 'Czech Republic',
    duration: '4 years',
    language: 'English',
    tuitionFee: '$11,000',
    discountedFee: '$10,500',
    level: 'Bachelor',
    description: 'Bachelor of Civil Engineering program taught in English',
    seats: 45,
    createdAt: '2023-01-25',
    status: 'active',
  },
  {
    id: 'PROG-007',
    title: 'Pharmacy (English)',
    titleAr: 'الصيدلة (بالإنجليزية)',
    university: 'Istanbul University',
    country: 'Turkey',
    duration: '5 years',
    language: 'English',
    tuitionFee: '$18,000',
    discountedFee: '$17,000',
    level: 'Bachelor',
    description: 'Bachelor of Pharmacy program taught in English',
    seats: 35,
    createdAt: '2023-01-28',
    status: 'active',
  },
  {
    id: 'PROG-008',
    title: 'Master of Business Administration',
    titleAr: 'ماجستير إدارة الأعمال',
    university: 'Istanbul University',
    country: 'Turkey',
    duration: '2 years',
    language: 'English',
    tuitionFee: '$15,000',
    discountedFee: '$14,000',
    level: 'Master',
    description: 'Master of Business Administration program',
    seats: 30,
    createdAt: '2023-02-01',
    status: 'active',
  },
];

const ManagePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry ? program.country === selectedCountry : true;
    const matchesUniversity = selectedUniversity ? program.university === selectedUniversity : true;
    const matchesLevel = selectedLevel ? program.level === selectedLevel : true;
    
    return matchesSearch && matchesCountry && matchesUniversity && matchesLevel;
  });

  // Get unique universities and countries for filters
  const universities = Array.from(new Set(programs.map(program => program.university)));
  const countries = Array.from(new Set(programs.map(program => program.country)));
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleImportPrograms = () => {
    // Simulate importing programs
    toast({
      title: "تم استيراد البرامج",
      description: "تم استيراد بيانات البرامج الدراسية بنجاح",
    });
    setIsImportDialogOpen(false);
  };

  const handleExportPrograms = () => {
    // Simulate exporting programs
    toast({
      title: "تم تصدير البرامج",
      description: "تم تصدير بيانات البرامج الدراسية بنجاح",
    });
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter((program) => program.id !== id));
    toast({
      title: "تم حذف البرنامج",
      description: `تم حذف البرنامج بنجاح`,
    });
  };

  const handleAddProgram = () => {
    // Simulate adding a new program
    const newProgram: Program = {
      id: `PROG-00${programs.length + 1}`,
      title: 'New Program',
      titleAr: 'برنامج جديد',
      university: 'Istanbul University',
      country: 'Turkey',
      duration: '4 years',
      language: 'English',
      tuitionFee: '$10,000',
      discountedFee: '$9,500',
      level: 'Bachelor',
      description: 'New program description',
      seats: 30,
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'active',
    };
    
    setPrograms([...programs, newProgram]);
    setIsAddProgramDialogOpen(false);
    
    toast({
      title: "تم إضافة البرنامج",
      description: "تم إضافة البرنامج الجديد بنجاح",
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('');
    setSelectedUniversity('');
    setSelectedLevel('');
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة البرامج الدراسية</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isAddProgramDialogOpen} onOpenChange={setIsAddProgramDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة برنامج جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>إضافة برنامج دراسي جديد</DialogTitle>
                  <DialogDescription>
                    أدخل معلومات البرنامج الدراسي الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">العنوان (بالإنجليزية)</label>
                      <Input id="title" placeholder="أدخل عنوان البرنامج بالإنجليزية" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="titleAr" className="text-sm font-medium">العنوان (بالعربية)</label>
                      <Input id="titleAr" placeholder="أدخل عنوان البرنامج بالعربية" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="university" className="text-sm font-medium">الجامعة</label>
                      <Input id="university" placeholder="أدخل اسم الجامعة" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium">البلد</label>
                      <Input id="country" placeholder="أدخل اسم البلد" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="duration" className="text-sm font-medium">المدة</label>
                      <Input id="duration" placeholder="مثال: 4 سنوات" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="language" className="text-sm font-medium">لغة الدراسة</label>
                      <Input id="language" placeholder="مثال: الإنجليزية" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="level" className="text-sm font-medium">المستوى</label>
                      <Select>
                        <SelectTrigger id="level">
                          <SelectValue placeholder="اختر المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bachelor">بكالوريوس</SelectItem>
                          <SelectItem value="Master">ماجستير</SelectItem>
                          <SelectItem value="PhD">دكتوراه</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="tuitionFee" className="text-sm font-medium">الرسوم الدراسية</label>
                      <Input id="tuitionFee" placeholder="مثال: $10,000" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="discountedFee" className="text-sm font-medium">السعر بعد الخصم</label>
                      <Input id="discountedFee" placeholder="مثال: $9,500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="seats" className="text-sm font-medium">عدد المقاعد</label>
                      <Input id="seats" placeholder="مثال: 30" type="number" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">الوصف</label>
                    <textarea 
                      id="description" 
                      className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input"
                      placeholder="أدخل وصفًا للبرنامج الدراسي"
                    ></textarea>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">صورة البرنامج</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Button variant="outline" type="button">
                        <Upload className="h-4 w-4 mr-2" />
                        اختر صورة
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddProgramDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button type="button" onClick={handleAddProgram}>
                    إضافة البرنامج
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>استيراد بيانات البرامج</DialogTitle>
                  <DialogDescription>
                    يرجى تحميل ملف CSV أو Excel يحتوي على بيانات البرامج الدراسية.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                    <p className="mt-2 text-sm text-unlimited-gray">
                      اسحب وأفلت الملف هنا أو انقر للاختيار
                    </p>
                    <input type="file" className="hidden" />
                    <Button variant="outline" className="mt-4">
                      اختيار ملف
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleImportPrograms}>
                    <Upload className="h-4 w-4 mr-2" />
                    استيراد البيانات
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportPrograms}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="table" className="space-y-4">
          <TabsList>
            <TabsTrigger value="table">
              <BarChart2 className="h-4 w-4 mr-2" />
              عرض جدولي
            </TabsTrigger>
            <TabsTrigger value="cards">
              <BookOpen className="h-4 w-4 mr-2" />
              عرض البطاقات
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
              <Input
                placeholder="البحث عن برنامج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-[300px]"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر البلد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع البلدان</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الجامعات</SelectItem>
                  {universities.map((university) => (
                    <SelectItem key={university} value={university}>
                      {university}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع المستويات</SelectItem>
                  <SelectItem value="Bachelor">بكالوريوس</SelectItem>
                  <SelectItem value="Master">ماجستير</SelectItem>
                  <SelectItem value="PhD">دكتوراه</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" onClick={resetFilters} className="h-10">
                <X className="h-4 w-4 mr-2" />
                مسح
              </Button>
            </div>
          </div>
          
          <TabsContent value="table" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>اسم البرنامج</TableHead>
                    <TableHead className="hidden md:table-cell">الجامعة</TableHead>
                    <TableHead className="hidden lg:table-cell">البلد</TableHead>
                    <TableHead className="hidden lg:table-cell">المستوى</TableHead>
                    <TableHead className="hidden xl:table-cell">الرسوم الدراسية</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPrograms.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-24 text-unlimited-gray">
                        لا توجد برامج تطابق معايير البحث
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{program.titleAr}</p>
                            <p className="text-xs text-unlimited-gray">{program.title}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{program.university}</TableCell>
                        <TableCell className="hidden lg:table-cell">{program.country}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge variant="outline">{program.level}</Badge>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div>
                            <p className="text-unlimited-blue">{program.discountedFee}</p>
                            <p className="text-xs text-unlimited-gray line-through">{program.tuitionFee}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteProgram(program.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-unlimited-gray">
                  عرض {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredPrograms.length)} من {filteredPrograms.length}
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPrograms.map((program) => (
                <Card key={program.id} className="overflow-hidden">
                  <div className="h-40 bg-unlimited-blue/10 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-unlimited-blue/50" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{program.titleAr}</CardTitle>
                        <CardDescription>{program.title}</CardDescription>
                      </div>
                      <Badge variant="outline">{program.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-unlimited-gray">
                        <Globe className="h-4 w-4 ml-2" />
                        <span>{program.country}</span>
                      </div>
                      <div className="flex items-center text-unlimited-gray">
                        <Building className="h-4 w-4 ml-2" />
                        <span>{program.university}</span>
                      </div>
                      <div className="flex items-center text-unlimited-gray">
                        <Calendar className="h-4 w-4 ml-2" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center text-unlimited-gray">
                        <GraduationCap className="h-4 w-4 ml-2" />
                        <span>لغة التدريس: {program.language}</span>
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
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      تعديل
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteProgram(program.id)}>
                      <Trash className="h-4 w-4 mr-2" />
                      حذف
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Pagination for cards view */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-unlimited-gray">
                  عرض {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredPrograms.length)} من {filteredPrograms.length}
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ManagePrograms;
