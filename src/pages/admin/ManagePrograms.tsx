
import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload, MessageSquare } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Countries data
const availableCountries = [
  'Australia', 'Azerbaijan', 'Bosnia and Herzegovina', 'Czech Republic', 'Egypt', 
  'Georgia', 'Germany', 'Hungary', 'Ireland', 'Kosovo', 'Macedonia', 'Malaysia', 
  'Malta', 'Montenegro', 'Northern Cyprus', 'Poland', 'Scotland', 'Serbia', 'Spain', 
  'Turkey', 'United Kingdom', 'United States'
];

// Degree types
const degreeTypes = [
  'Associate', 'Bachelor', 'Diploma', 'Doctorate', 'Foundation Year', 
  'Language Course', 'Master', 'Training Course'
];

// Program specialties - first 20 for brevity
const programSpecialties = [
  'Accounting and Auditing', 'Accounting, Finance & Economics', 'Aerospace, Aeronautical', 
  'Agriculture', 'Agriculture Engineering', 'Animal Science', 'Anthropology', 'Arabic', 
  'Archaeology', 'Architectural Engineering', 'Architecture', 'Art', 'Astronomy', 
  'Aviation Management', 'Aviation Technology', 'Biochemistry', 'Biology', 'Biomedical', 
  'Biomedical Engineering', 'Business Administration, Management, General'
];

type Program = {
  id: string;
  name: string;
  university: string;
  department: string;
  level: 'bachelor' | 'master' | 'phd';
  duration: string;
  language: string;
  fees: number;
  status: 'active' | 'inactive' | 'new';
  applicationCount: number;
  country: string;
};

const initialPrograms: Program[] = [
  {
    id: 'PRG-001',
    name: 'الطب البشري',
    university: 'جامعة إسطنبول',
    department: 'كلية الطب',
    level: 'bachelor',
    duration: '6 سنوات',
    language: 'إنجليزية',
    fees: 8500,
    status: 'active',
    applicationCount: 45,
    country: 'Turkey'
  },
  {
    id: 'PRG-002',
    name: 'طب الأسنان',
    university: 'جامعة وارسو',
    department: 'كلية طب الأسنان',
    level: 'bachelor',
    duration: '5 سنوات',
    language: 'إنجليزية',
    fees: 7200,
    status: 'active',
    applicationCount: 32,
    country: 'Poland'
  },
  {
    id: 'PRG-003',
    name: 'هندسة البرمجيات',
    university: 'جامعة براغ',
    department: 'كلية الهندسة',
    level: 'bachelor',
    duration: '4 سنوات',
    language: 'إنجليزية',
    fees: 5000,
    status: 'active',
    applicationCount: 56,
    country: 'Czech Republic'
  },
  {
    id: 'PRG-004',
    name: 'علوم الحاسوب',
    university: 'جامعة بودابست',
    department: 'كلية تكنولوجيا المعلومات',
    level: 'master',
    duration: '2 سنوات',
    language: 'إنجليزية',
    fees: 6200,
    status: 'new',
    applicationCount: 12,
    country: 'Hungary'
  },
  {
    id: 'PRG-005',
    name: 'الصيدلة',
    university: 'جامعة أنقرة',
    department: 'كلية الصيدلة',
    level: 'bachelor',
    duration: '5 سنوات',
    language: 'تركية وإنجليزية',
    fees: 6800,
    status: 'active',
    applicationCount: 38,
    country: 'Turkey'
  },
  {
    id: 'PRG-006',
    name: 'إدارة الأعمال',
    university: 'جامعة إسطنبول',
    department: 'كلية إدارة الأعمال',
    level: 'master',
    duration: '2 سنوات',
    language: 'إنجليزية',
    fees: 4500,
    status: 'inactive',
    applicationCount: 20,
    country: 'Turkey'
  },
  {
    id: 'PRG-007',
    name: 'الذكاء الاصطناعي',
    university: 'جامعة براغ',
    department: 'كلية علوم الحاسوب',
    level: 'phd',
    duration: '3 سنوات',
    language: 'إنجليزية',
    fees: 9000,
    status: 'new',
    applicationCount: 8,
    country: 'Czech Republic'
  },
];

const statusConfig = {
  active: { label: 'نشط', color: 'bg-unlimited-success text-white' },
  inactive: { label: 'غير نشط', color: 'bg-unlimited-gray text-white' },
  new: { label: 'جديد', color: 'bg-unlimited-warning text-white' },
};

const levelConfig = {
  bachelor: 'بكالوريوس',
  master: 'ماجستير',
  phd: 'دكتوراه',
};

const ManagePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [searchQuery, setSearchQuery] = useState('');
  const [universityFilter, setUniversityFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  
  // Form fields for new program
  const [newProgram, setNewProgram] = useState({
    name: '',
    university: '',
    department: '',
    level: 'bachelor',
    duration: '',
    language: '',
    fees: 0,
    country: '',
    specialty: '',
  });

  const { toast } = useToast();

  const universities = Array.from(new Set(programs.map(program => program.university)));
  const countries = Array.from(new Set(programs.map(program => program.country)));

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = 
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesUniversity = universityFilter === 'all' || program.university === universityFilter;
    const matchesLevel = levelFilter === 'all' || program.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || program.country === countryFilter;
    
    return matchesSearch && matchesUniversity && matchesLevel && matchesStatus && matchesCountry;
  });

  const handleAddProgram = () => {
    const newProgramEntry = {
      id: `PRG-${String(programs.length + 1).padStart(3, '0')}`,
      name: newProgram.name,
      university: newProgram.university,
      department: newProgram.department,
      level: newProgram.level as 'bachelor' | 'master' | 'phd',
      duration: newProgram.duration,
      language: newProgram.language,
      fees: parseFloat(String(newProgram.fees)),
      status: 'new' as const,
      applicationCount: 0,
      country: newProgram.country
    };

    setPrograms([...programs, newProgramEntry]);
    
    toast({
      title: "تمت إضافة البرنامج",
      description: "تم إضافة البرنامج الجديد بنجاح",
    });
    
    // Reset form
    setNewProgram({
      name: '',
      university: '',
      department: '',
      level: 'bachelor',
      duration: '',
      language: '',
      fees: 0,
      country: '',
      specialty: '',
    });
    
    setIsAddDialogOpen(false);
  };

  const handleImportPrograms = () => {
    toast({
      title: "تم استيراد البيانات",
      description: "تم استيراد بيانات البرامج بنجاح",
    });
    setIsImportDialogOpen(false);
  };

  const handleExportPrograms = () => {
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات البرامج بنجاح",
    });
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter((program) => program.id !== id));
    toast({
      title: "تم حذف البرنامج",
      description: `تم حذف البرنامج رقم ${id} بنجاح`,
    });
  };

  const handleToggleProgramStatus = (id: string) => {
    setPrograms(
      programs.map((program) =>
        program.id === id
          ? {
              ...program,
              status: program.status === 'active' ? 'inactive' : 'active',
            }
          : program
      )
    );
    
    const program = programs.find((p) => p.id === id);
    if (program) {
      toast({
        title: "تم تغيير الحالة",
        description: `تم تغيير حالة البرنامج ${program.name} بنجاح`,
      });
    }
  };

  const handleContactProgram = (id: string) => {
    setSelectedProgramId(id);
    setIsContactDialogOpen(true);
  };

  const handleSendMessage = () => {
    toast({
      title: "تم إرسال الرسالة",
      description: "تم إرسال الرسالة بنجاح إلى المسؤولين عن البرنامج",
    });
    setIsContactDialogOpen(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewProgram(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة البرامج الدراسية</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة برنامج
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>إضافة برنامج جديد</DialogTitle>
                  <DialogDescription>
                    أدخل معلومات البرنامج الدراسي الجديد. اضغط على حفظ عند الانتهاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">اسم البرنامج</label>
                    <Input 
                      className="col-span-3" 
                      value={newProgram.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الدولة</label>
                    <div className="col-span-3">
                      <Select 
                        value={newProgram.country}
                        onValueChange={(value) => handleInputChange('country', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الدولة" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {availableCountries.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الجامعة</label>
                    <Input 
                      className="col-span-3" 
                      value={newProgram.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">القسم</label>
                    <Input 
                      className="col-span-3" 
                      value={newProgram.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">التخصص</label>
                    <div className="col-span-3">
                      <Select 
                        value={newProgram.specialty}
                        onValueChange={(value) => handleInputChange('specialty', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التخصص" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {programSpecialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">المستوى</label>
                    <div className="col-span-3">
                      <Select 
                        value={newProgram.level}
                        onValueChange={(value) => handleInputChange('level', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">بكالوريوس</SelectItem>
                          <SelectItem value="master">ماجستير</SelectItem>
                          <SelectItem value="phd">دكتوراه</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">مدة الدراسة</label>
                    <Input 
                      className="col-span-3" 
                      value={newProgram.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">لغة الدراسة</label>
                    <Input 
                      className="col-span-3" 
                      value={newProgram.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الرسوم (دولار)</label>
                    <Input 
                      type="number" 
                      className="col-span-3"
                      value={newProgram.fees}
                      onChange={(e) => handleInputChange('fees', parseFloat(e.target.value))} 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="mr-2">
                    إلغاء
                  </Button>
                  <Button type="submit" onClick={handleAddProgram}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    حفظ
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
                    يرجى تحميل ملف CSV أو Excel يحتوي على بيانات البرامج.
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
          
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الدولة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدول</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={universityFilter} onValueChange={setUniversityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الجامعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الجامعات</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>{university}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="bachelor">بكالوريوس</SelectItem>
                <SelectItem value="master">ماجستير</SelectItem>
                <SelectItem value="phd">دكتوراه</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="new">جديد</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">رقم البرنامج</TableHead>
                <TableHead>اسم البرنامج</TableHead>
                <TableHead className="hidden md:table-cell">الجامعة</TableHead>
                <TableHead className="hidden lg:table-cell">الدولة</TableHead>
                <TableHead className="hidden lg:table-cell">المستوى</TableHead>
                <TableHead className="hidden lg:table-cell">المدة</TableHead>
                <TableHead>الرسوم</TableHead>
                <TableHead>الطلبات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-40 text-unlimited-gray">
                    لا توجد بيانات متطابقة مع البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">{program.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{program.name}</p>
                        <p className="text-xs text-unlimited-gray hidden md:block lg:hidden">{program.university}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{program.university}</TableCell>
                    <TableCell className="hidden lg:table-cell">{program.country}</TableCell>
                    <TableCell className="hidden lg:table-cell">{levelConfig[program.level]}</TableCell>
                    <TableCell className="hidden lg:table-cell">{program.duration}</TableCell>
                    <TableCell>{program.fees} $</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {program.applicationCount}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[program.status].color}>
                        {statusConfig[program.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleContactProgram(program.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>خيارات البرنامج</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleProgramStatus(program.id)}>
                              {program.status === 'active' ? 'تعطيل البرنامج' : 'تفعيل البرنامج'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>عرض تفاصيل البرنامج</DropdownMenuItem>
                            <DropdownMenuItem>عرض طلبات الالتحاق</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to="/admin/messages" className="flex items-center w-full">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                التواصل مع إدارة البرنامج
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-unlimited-danger focus:text-unlimited-danger"
                              onClick={() => handleDeleteProgram(program.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>التواصل مع إدارة البرنامج</DialogTitle>
            <DialogDescription>
              {selectedProgramId && programs.find(p => p.id === selectedProgramId)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">الموضوع</label>
              <Input className="col-span-3" placeholder="موضوع الرسالة" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right col-span-1 mt-3">الرسالة</label>
              <div className="col-span-3">
                <textarea 
                  className="w-full border rounded-md p-2 h-32" 
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">المرفقات</label>
              <div className="col-span-3">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  إضافة مرفقات
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactDialogOpen(false)} className="mr-2">
              إلغاء
            </Button>
            <Button onClick={handleSendMessage}>
              <MessageSquare className="h-4 w-4 mr-2" />
              إرسال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManagePrograms;
