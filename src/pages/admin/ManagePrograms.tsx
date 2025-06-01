
import { useState } from 'react';
import { BookOpen, CheckCircle, Download, Edit, Eye, MoreHorizontal, Search, Trash, Upload, Loader2, Grid, List, Users, MapPin } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/admin/FormDialog';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { AdminPageActions } from '@/components/admin/AdminPageActions';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
} from '@/components/ui/select';
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useTableFilters } from '@/hooks/admin/useTableFilters';
import { TablePagination } from '@/components/admin/TablePagination';
import { TableSkeleton } from '@/components/admin/TableSkeleton';
import { useAdminActions } from '@/hooks/admin/useAdminActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Program {
  id: string;
  nameAr: string;
  nameEn: string;
  university: string;
  universityId: string;
  degree: string;
  duration: number;
  tuitionFee: number;
  discountedFee: number;
  language: string;
  country: string;
  city: string;
  studentsCount: number;
  status: 'active' | 'inactive';
  hasScholarship: boolean;
}

const dummyPrograms: Program[] = [
  {
    id: "PROG001",
    nameAr: "علوم الحاسوب",
    nameEn: "Computer Science",
    university: "جامعة إسطنبول التقنية",
    universityId: "UNI001",
    degree: "Bachelor",
    duration: 4,
    tuitionFee: 6000,
    discountedFee: 5400,
    language: "English",
    country: "Turkey",
    city: "Istanbul",
    studentsCount: 150,
    status: "active",
    hasScholarship: true
  },
  {
    id: "PROG002",
    nameAr: "الهندسة الميكانيكية",
    nameEn: "Mechanical Engineering",
    university: "جامعة الشرق الأوسط التقنية",
    universityId: "UNI002",
    degree: "Bachelor",
    duration: 4,
    tuitionFee: 5800,
    discountedFee: 5800,
    language: "English",
    country: "Turkey",
    city: "Ankara",
    studentsCount: 120,
    status: "active",
    hasScholarship: false
  },
  {
    id: "PROG003",
    nameAr: "الطب البشري",
    nameEn: "Medicine",
    university: "جامعة أنقرة",
    universityId: "UNI003",
    degree: "Bachelor",
    duration: 6,
    tuitionFee: 12000,
    discountedFee: 10800,
    language: "English",
    country: "Turkey",
    city: "Ankara",
    studentsCount: 200,
    status: "active",
    hasScholarship: true
  },
  {
    id: "PROG004",
    nameAr: "إدارة الأعمال",
    nameEn: "Business Administration",
    university: "جامعة بيلكنت",
    universityId: "UNI004",
    degree: "Master",
    duration: 2,
    tuitionFee: 8000,
    discountedFee: 7200,
    language: "English",
    country: "Turkey",
    city: "Ankara",
    studentsCount: 80,
    status: "inactive",
    hasScholarship: false
  }
];

const itemsPerPage = 8;

const ManagePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>(dummyPrograms);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { 
    isLoading: isActionLoading, 
    confirmAction, 
    isConfirmDialogOpen, 
    executePendingAction, 
    cancelConfirmAction,
    handleAction 
  } = useAdminActions();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems: filteredPrograms
  } = useTableFilters(
    programs,
    ['nameAr', 'nameEn', 'university'],
    [
      { field: 'country', defaultValue: 'all' },
      { field: 'status', defaultValue: 'all' },
      { field: 'degree', defaultValue: 'all' },
      { field: 'language', defaultValue: 'all' }
    ]
  );

  const countries = Array.from(new Set(programs.map(program => program.country)));
  const degrees = Array.from(new Set(programs.map(program => program.degree)));
  const languages = Array.from(new Set(programs.map(program => program.language)));
  
  // حساب الإحصائيات
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const bachelorPrograms = programs.filter(p => p.degree === 'Bachelor').length;
  const masterPrograms = programs.filter(p => p.degree === 'Master').length;
  const totalStudents = programs.reduce((sum, p) => sum + p.studentsCount, 0);
  const scholarshipPrograms = programs.filter(p => p.hasScholarship).length;

  const handleAddProgram = () => {
    handleAction(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newProgram: Program = {
          id: `PROG${(programs.length + 1).toString().padStart(3, '0')}`,
          nameAr: "برنامج جديد",
          nameEn: "New Program",
          university: "جامعة جديدة",
          universityId: "UNI001",
          degree: "Bachelor",
          duration: 4,
          tuitionFee: 5000,
          discountedFee: 5000,
          language: "English",
          country: "Turkey",
          city: "Istanbul",
          studentsCount: 0,
          status: "active",
          hasScholarship: false
        };
        
        setPrograms([...programs, newProgram]);
      },
      {
        successMessage: "تم إضافة البرنامج بنجاح",
        onSuccess: () => setIsAddDialogOpen(false)
      }
    );
  };

  const handleDeleteProgram = (id: string) => {
    setSelectedProgramId(id);
    
    confirmAction(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        setPrograms(programs.filter(p => p.id !== id));
      },
      {
        successMessage: "تم حذف البرنامج بنجاح"
      }
    );
  };

  const handleEditProgram = (id: string) => {
    setSelectedProgramId(id);
    setIsEditDialogOpen(true);
  };

  const toggleProgramStatus = (id: string) => {
    handleAction(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
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
      },
      {
        successMessage: "تم تغيير حالة البرنامج بنجاح"
      }
    );
  };

  const statusConfig = {
    active: { label: 'نشط', color: 'bg-green-600 text-white' },
    inactive: { label: 'غير نشط', color: 'bg-gray-600 text-white' },
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const currentItems = filteredPrograms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const selectedProgram = selectedProgramId ? 
    programs.find(program => program.id === selectedProgramId) : null;

  return (
    <DashboardLayout userRole="admin">
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة البرامج الأكاديمية</h2>
          
          <AdminPageActions 
            onAdd={() => setIsAddDialogOpen(true)}
            onImport={() => setIsImportDialogOpen(true)}
            onExport={() => {}}
            addLabel="إضافة برنامج"
            importLabel="استيراد البرامج"
            exportLabel="تصدير البرامج"
            isLoading={isActionLoading}
          />
        </div>
        
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي البرامج</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-dark-blue">{totalPrograms}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">البرامج النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-green-600">{activePrograms}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">برامج البكالوريوس</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-blue">{bachelorPrograms}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">برامج الماجستير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-purple-600">{masterPrograms}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-blue">{totalStudents}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">برامج المنح</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-2xl font-bold text-yellow-600">{scholarshipPrograms}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* مرشحات البحث */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="ابحث في البرامج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={filters.degree} onValueChange={(value) => setFilters({...filters, degree: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="نوع الدرجة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدرجات</SelectItem>
                {degrees.map((degree) => (
                  <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.language} onValueChange={(value) => setFilters({...filters, language: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="لغة الدراسة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع اللغات</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="bg-gray-100 rounded-md p-1 flex">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* عرض البرامج */}
        <Tabs defaultValue="grid" value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'grid')} className="w-full">
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : currentItems.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-unlimited-gray text-xl">لم يتم العثور على برامج</p>
                </div>
              ) : (
                currentItems.map((program) => (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{program.nameAr}</CardTitle>
                          <p className="text-sm text-unlimited-gray">{program.nameEn}</p>
                        </div>
                        <Badge className={statusConfig[program.status].color}>
                          {statusConfig[program.status].label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-unlimited-gray">الجامعة:</span>
                          <span>{program.university}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-unlimited-gray">الدرجة:</span>
                          <span>{program.degree}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-unlimited-gray">المدة:</span>
                          <span>{program.duration} سنوات</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-unlimited-gray">الرسوم:</span>
                          <span>${program.tuitionFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-unlimited-gray">عدد الطلاب:</span>
                          <span>{program.studentsCount}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProgram(program.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProgram(program.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          حذف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="rounded-md border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الرقم</TableHead>
                    <TableHead>اسم البرنامج</TableHead>
                    <TableHead>الجامعة</TableHead>
                    <TableHead>الدرجة</TableHead>
                    <TableHead>الرسوم</TableHead>
                    <TableHead>الطلاب</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableSkeleton columns={8} rows={itemsPerPage} />
                  ) : currentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center h-40 text-unlimited-gray">
                        لم يتم العثور على برامج
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentItems.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{program.nameAr}</p>
                            <p className="text-xs text-unlimited-gray">{program.nameEn}</p>
                          </div>
                        </TableCell>
                        <TableCell>{program.university}</TableCell>
                        <TableCell>{program.degree}</TableCell>
                        <TableCell>${program.tuitionFee.toLocaleString()}</TableCell>
                        <TableCell>{program.studentsCount}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[program.status].color}>
                            {statusConfig[program.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleEditProgram(program.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-600"
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
          </TabsContent>
        </Tabs>
        
        {filteredPrograms.length > itemsPerPage && (
          <div className="py-4 flex justify-center">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Dialog إضافة برنامج */}
        <FormDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          title="إضافة برنامج جديد"
          description="أدخل تفاصيل البرنامج الأكاديمي الجديد"
          onSubmit={handleAddProgram}
          submitLabel="إضافة البرنامج"
          isLoading={isActionLoading}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">الاسم بالعربية</label>
            <Input className="col-span-3" placeholder="اسم البرنامج بالعربية" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">الاسم بالإنجليزية</label>
            <Input className="col-span-3" placeholder="Program Name in English" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">الجامعة</label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر الجامعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uni1">جامعة إسطنبول التقنية</SelectItem>
                <SelectItem value="uni2">جامعة الشرق الأوسط التقنية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">نوع الدرجة</label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="نوع الدرجة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bachelor">بكالوريوس</SelectItem>
                <SelectItem value="Master">ماجستير</SelectItem>
                <SelectItem value="PhD">دكتوراه</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">المدة (بالسنوات)</label>
            <Input type="number" className="col-span-3" placeholder="4" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">الرسوم الدراسية</label>
            <Input type="number" className="col-span-3" placeholder="5000" />
          </div>
        </FormDialog>

        {/* Dialog تعديل برنامج */}
        {selectedProgram && (
          <FormDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            title="تعديل البرنامج"
            description="تعديل تفاصيل البرنامج الأكاديمي"
            onSubmit={() => {
              handleAction(
                async () => {
                  await new Promise(resolve => setTimeout(resolve, 800));
                },
                {
                  successMessage: "تم تحديث البرنامج بنجاح",
                  onSuccess: () => setIsEditDialogOpen(false)
                }
              );
            }}
            submitLabel="حفظ التغييرات"
            isLoading={isActionLoading}
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">الاسم بالعربية</label>
              <Input className="col-span-3" defaultValue={selectedProgram.nameAr} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">الاسم بالإنجليزية</label>
              <Input className="col-span-3" defaultValue={selectedProgram.nameEn} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">نوع الدرجة</label>
              <Select defaultValue={selectedProgram.degree}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bachelor">بكالوريوس</SelectItem>
                  <SelectItem value="Master">ماجستير</SelectItem>
                  <SelectItem value="PhD">دكتوراه</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">المدة (بالسنوات)</label>
              <Input type="number" className="col-span-3" defaultValue={selectedProgram.duration} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">الرسوم الدراسية</label>
              <Input type="number" className="col-span-3" defaultValue={selectedProgram.tuitionFee} />
            </div>
          </FormDialog>
        )}

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelConfirmAction}
          onConfirm={executePendingAction}
          title="تأكيد حذف البرنامج"
          description="هل أنت متأكد من رغبتك في حذف هذا البرنامج؟ لا يمكن التراجع عن هذا الإجراء."
          confirmLabel="حذف"
          cancelLabel="إلغاء"
          isLoading={isActionLoading}
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default ManagePrograms;
