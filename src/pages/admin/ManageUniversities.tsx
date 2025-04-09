
import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload } from 'lucide-react';
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type University = {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  city: string;
  website: string;
  programsCount: number;
  studentsCount: number;
  ranking: number;
  status: 'active' | 'inactive';
};

const initialUniversities: University[] = [
  {
    id: 'UNI-001',
    name: 'Istanbul University',
    nameAr: 'جامعة إسطنبول',
    country: 'Turkey',
    city: 'Istanbul',
    website: 'https://www.istanbul.edu.tr',
    programsCount: 42,
    studentsCount: 156,
    ranking: 500,
    status: 'active',
  },
  {
    id: 'UNI-002',
    name: 'Warsaw University',
    nameAr: 'جامعة وارسو',
    country: 'Poland',
    city: 'Warsaw',
    website: 'https://www.uw.edu.pl',
    programsCount: 28,
    studentsCount: 87,
    ranking: 320,
    status: 'active',
  },
  {
    id: 'UNI-003',
    name: 'Budapest University',
    nameAr: 'جامعة بودابست',
    country: 'Hungary',
    city: 'Budapest',
    website: 'https://www.elte.hu',
    programsCount: 35,
    studentsCount: 103,
    ranking: 450,
    status: 'active',
  },
  {
    id: 'UNI-004',
    name: 'Prague University',
    nameAr: 'جامعة براغ',
    country: 'Czech Republic',
    city: 'Prague',
    website: 'https://cuni.cz',
    programsCount: 22,
    studentsCount: 65,
    ranking: 380,
    status: 'inactive',
  },
  {
    id: 'UNI-005',
    name: 'Ankara University',
    nameAr: 'جامعة أنقرة',
    country: 'Turkey',
    city: 'Ankara',
    website: 'https://www.ankara.edu.tr',
    programsCount: 30,
    studentsCount: 92,
    ranking: 550,
    status: 'active',
  },
];

const statusConfig = {
  active: { label: 'نشط', color: 'bg-unlimited-success text-white' },
  inactive: { label: 'غير نشط', color: 'bg-unlimited-gray text-white' },
};

const ManageUniversities = () => {
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.country.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCountry = countryFilter === 'all' || university.country === countryFilter;
    const matchesStatus = statusFilter === 'all' || university.status === statusFilter;
    
    return matchesSearch && matchesCountry && matchesStatus;
  });

  // Get unique countries for filters
  const countries = Array.from(new Set(universities.map(university => university.country)));

  const handleAddUniversity = () => {
    // محاكاة إضافة جامعة جديدة
    toast({
      title: "تمت إضافة الجامعة",
      description: "تم إضافة الجامعة الجديدة بنجاح",
    });
    setIsAddDialogOpen(false);
  };

  const handleImportUniversities = () => {
    // محاكاة استيراد بيانات الجامعات
    toast({
      title: "تم استيراد البيانات",
      description: "تم استيراد بيانات الجامعات بنجاح",
    });
    setIsImportDialogOpen(false);
  };

  const handleExportUniversities = () => {
    // محاكاة تصدير بيانات الجامعات
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات الجامعات بنجاح",
    });
  };

  const handleDeleteUniversity = (id: string) => {
    setUniversities(universities.filter((university) => university.id !== id));
    toast({
      title: "تم حذف الجامعة",
      description: `تم حذف الجامعة رقم ${id} بنجاح`,
    });
  };

  const toggleUniversityStatus = (id: string) => {
    setUniversities(
      universities.map((university) =>
        university.id === id
          ? {
              ...university,
              status: university.status === 'active' ? 'inactive' : 'active',
            }
          : university
      )
    );
    
    const university = universities.find((u) => u.id === id);
    if (university) {
      toast({
        title: "تم تغيير الحالة",
        description: `تم تغيير حالة الجامعة ${university.name} بنجاح`,
      });
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الجامعات</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة جامعة
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>إضافة جامعة جديدة</DialogTitle>
                  <DialogDescription>
                    أدخل معلومات الجامعة الجديدة. اضغط على حفظ عند الانتهاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الاسم (بالإنجليزية)</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الاسم (بالعربية)</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الدولة</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">المدينة</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الموقع الإلكتروني</label>
                    <Input type="url" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">التصنيف العالمي</label>
                    <Input type="number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">شعار الجامعة</label>
                    <div className="col-span-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                        <Button variant="outline" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          اختر ملفاً
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddUniversity}>
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
                  <DialogTitle>استيراد بيانات الجامعات</DialogTitle>
                  <DialogDescription>
                    يرجى تحميل ملف CSV أو Excel يحتوي على بيانات الجامعات.
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
                  <Button type="submit" onClick={handleImportUniversities}>
                    <Upload className="h-4 w-4 mr-2" />
                    استيراد البيانات
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportUniversities}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="البحث عن جامعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <div className="flex flex-row gap-2 items-center">
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
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">رقم الجامعة</TableHead>
                <TableHead>اسم الجامعة</TableHead>
                <TableHead className="hidden md:table-cell">الدولة</TableHead>
                <TableHead className="hidden lg:table-cell">المدينة</TableHead>
                <TableHead className="hidden lg:table-cell">عدد البرامج</TableHead>
                <TableHead className="hidden md:table-cell">عدد الطلاب</TableHead>
                <TableHead className="hidden md:table-cell">التصنيف</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUniversities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center h-40 text-unlimited-gray">
                    لا توجد بيانات متطابقة مع البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredUniversities.map((university) => (
                  <TableRow key={university.id}>
                    <TableCell className="font-medium">{university.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{university.nameAr}</p>
                        <p className="text-xs text-unlimited-gray">{university.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{university.country}</TableCell>
                    <TableCell className="hidden lg:table-cell">{university.city}</TableCell>
                    <TableCell className="hidden lg:table-cell">{university.programsCount}</TableCell>
                    <TableCell className="hidden md:table-cell">{university.studentsCount}</TableCell>
                    <TableCell className="hidden md:table-cell">{university.ranking}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[university.status].color}>
                        {statusConfig[university.status].label}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>خيارات الجامعة</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toggleUniversityStatus(university.id)}>
                              {university.status === 'active' ? 'تعطيل الجامعة' : 'تفعيل الجامعة'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>عرض البرامج</DropdownMenuItem>
                            <DropdownMenuItem>عرض الطلاب</DropdownMenuItem>
                            <DropdownMenuItem>زيارة الموقع الرسمي</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-unlimited-danger focus:text-unlimited-danger"
                              onClick={() => handleDeleteUniversity(university.id)}
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
    </DashboardLayout>
  );
};

export default ManageUniversities;
