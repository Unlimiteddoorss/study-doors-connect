
import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, Globe, MoreHorizontal, Plus, Search, Trash, Upload } from 'lucide-react';
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
  country: string;
  city: string;
  website: string;
  programs: number;
  students: number;
  ranking: number;
  featured: boolean;
  status: 'active' | 'inactive';
};

const initialUniversities: University[] = [
  {
    id: 'UNI-001',
    name: 'جامعة أكسفورد',
    country: 'المملكة المتحدة',
    city: 'أكسفورد',
    website: 'https://www.ox.ac.uk',
    programs: 45,
    students: 87,
    ranking: 5,
    featured: true,
    status: 'active',
  },
  {
    id: 'UNI-002',
    name: 'جامعة هارفارد',
    country: 'الولايات المتحدة',
    city: 'كامبريدج',
    website: 'https://www.harvard.edu',
    programs: 52,
    students: 120,
    ranking: 2,
    featured: true,
    status: 'active',
  },
  {
    id: 'UNI-003',
    name: 'جامعة تورنتو',
    country: 'كندا',
    city: 'تورنتو',
    website: 'https://www.utoronto.ca',
    programs: 38,
    students: 65,
    ranking: 18,
    featured: false,
    status: 'active',
  },
  {
    id: 'UNI-004',
    name: 'جامعة ملبورن',
    country: 'أستراليا',
    city: 'ملبورن',
    website: 'https://www.unimelb.edu.au',
    programs: 42,
    students: 54,
    ranking: 32,
    featured: false,
    status: 'active',
  },
  {
    id: 'UNI-005',
    name: 'جامعة طوكيو',
    country: 'اليابان',
    city: 'طوكيو',
    website: 'https://www.u-tokyo.ac.jp',
    programs: 30,
    students: 42,
    ranking: 23,
    featured: false,
    status: 'active',
  },
  {
    id: 'UNI-006',
    name: 'جامعة السوربون',
    country: 'فرنسا',
    city: 'باريس',
    website: 'https://www.sorbonne-universite.fr',
    programs: 35,
    students: 48,
    ranking: 45,
    featured: true,
    status: 'active',
  },
  {
    id: 'UNI-007',
    name: 'جامعة برلين الحرة',
    country: 'ألمانيا',
    city: 'برلين',
    website: 'https://www.fu-berlin.de',
    programs: 28,
    students: 36,
    ranking: 86,
    featured: false,
    status: 'inactive',
  },
];

const countryOptions = [
  'الولايات المتحدة',
  'المملكة المتحدة',
  'كندا',
  'أستراليا',
  'ألمانيا',
  'فرنسا',
  'اليابان',
  'الصين',
  'سنغافورة',
  'هولندا',
];

const statusConfig = {
  active: { label: 'نشطة', color: 'bg-unlimited-success text-white' },
  inactive: { label: 'غير نشطة', color: 'bg-unlimited-gray text-white' },
};

const ManageUniversities = () => {
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCountry = countryFilter === 'all' || university.country === countryFilter;
    
    return matchesSearch && matchesCountry;
  });

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
        description: `تم تغيير حالة جامعة ${university.name} بنجاح`,
      });
    }
  };

  const toggleFeatured = (id: string) => {
    setUniversities(
      universities.map((university) =>
        university.id === id
          ? {
              ...university,
              featured: !university.featured,
            }
          : university
      )
    );
    
    const university = universities.find((u) => u.id === id);
    if (university) {
      toast({
        title: university.featured ? "تم إلغاء تمييز الجامعة" : "تم تمييز الجامعة",
        description: `تم تحديث حالة جامعة ${university.name} بنجاح`,
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
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>إضافة جامعة جديدة</DialogTitle>
                  <DialogDescription>
                    أدخل معلومات الجامعة الجديدة. اضغط على حفظ عند الانتهاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">اسم الجامعة</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الدولة</label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="اختر دولة" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">المدينة</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الموقع الإلكتروني</label>
                    <Input className="col-span-3" placeholder="https://" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">التصنيف العالمي</label>
                    <Input type="number" className="col-span-3" />
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
          
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="الدولة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الدول</SelectItem>
              {countryOptions.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">رقم الجامعة</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead className="hidden md:table-cell">الدولة</TableHead>
                <TableHead className="hidden md:table-cell">المدينة</TableHead>
                <TableHead className="hidden lg:table-cell">البرامج</TableHead>
                <TableHead className="hidden lg:table-cell">الطلاب</TableHead>
                <TableHead className="hidden md:table-cell">التصنيف</TableHead>
                <TableHead>مميزة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUniversities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-40 text-unlimited-gray">
                    لا توجد بيانات متطابقة مع البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredUniversities.map((university) => (
                  <TableRow key={university.id}>
                    <TableCell className="font-medium">{university.id}</TableCell>
                    <TableCell>{university.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{university.country}</TableCell>
                    <TableCell className="hidden md:table-cell">{university.city}</TableCell>
                    <TableCell className="hidden lg:table-cell">{university.programs}</TableCell>
                    <TableCell className="hidden lg:table-cell">{university.students}</TableCell>
                    <TableCell className="hidden md:table-cell">{university.ranking}</TableCell>
                    <TableCell>
                      <Badge variant={university.featured ? "default" : "outline"}>
                        {university.featured ? 'نعم' : 'لا'}
                      </Badge>
                    </TableCell>
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => window.open(university.website, '_blank')}
                        >
                          <Globe className="h-4 w-4" />
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
                            <DropdownMenuItem onClick={() => toggleFeatured(university.id)}>
                              {university.featured ? 'إلغاء تمييز الجامعة' : 'تمييز الجامعة'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>إدارة برامج الجامعة</DropdownMenuItem>
                            <DropdownMenuItem>عرض طلبات الجامعة</DropdownMenuItem>
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
