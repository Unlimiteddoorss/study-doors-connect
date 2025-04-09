
import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload, X } from 'lucide-react';
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

type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  applications: number;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
};

const initialStudents: Student[] = [
  {
    id: 'STD-001',
    name: 'أحمد محمد',
    email: 'ahmad@example.com',
    phone: '+966 50 123 4567',
    country: 'السعودية',
    applications: 3,
    status: 'active',
    registrationDate: '2023-01-15',
  },
  {
    id: 'STD-002',
    name: 'سارة عبدالله',
    email: 'sara@example.com',
    phone: '+971 55 123 4567',
    country: 'الإمارات',
    applications: 1,
    status: 'active',
    registrationDate: '2023-02-20',
  },
  {
    id: 'STD-003',
    name: 'محمد عبدالرحمن',
    email: 'mohammad@example.com',
    phone: '+965 60 123 4567',
    country: 'الكويت',
    applications: 2,
    status: 'pending',
    registrationDate: '2023-03-05',
  },
  {
    id: 'STD-004',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '+974 33 123 4567',
    country: 'قطر',
    applications: 0,
    status: 'inactive',
    registrationDate: '2023-03-15',
  },
  {
    id: 'STD-005',
    name: 'خالد أحمد',
    email: 'khalid@example.com',
    phone: '+973 35 123 4567',
    country: 'البحرين',
    applications: 1,
    status: 'active',
    registrationDate: '2023-04-01',
  },
  {
    id: 'STD-006',
    name: 'نورة سعيد',
    email: 'noura@example.com',
    phone: '+968 99 123 4567',
    country: 'عمان',
    applications: 2,
    status: 'active',
    registrationDate: '2023-04-10',
  },
  {
    id: 'STD-007',
    name: 'عمر حسن',
    email: 'omar@example.com',
    phone: '+962 77 123 4567',
    country: 'الأردن',
    applications: 1,
    status: 'pending',
    registrationDate: '2023-04-15',
  },
];

const statusConfig = {
  active: { label: 'نشط', color: 'bg-unlimited-success text-white' },
  inactive: { label: 'غير نشط', color: 'bg-unlimited-gray text-white' },
  pending: { label: 'قيد التفعيل', color: 'bg-unlimited-warning text-white' },
};

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = () => {
    // محاكاة إضافة طالب جديد
    toast({
      title: "تمت إضافة الطالب",
      description: "تم إضافة الطالب الجديد بنجاح",
    });
    setIsAddDialogOpen(false);
  };

  const handleImportStudents = () => {
    // محاكاة استيراد بيانات الطلاب
    toast({
      title: "تم استيراد البيانات",
      description: "تم استيراد بيانات الطلاب بنجاح",
    });
    setIsImportDialogOpen(false);
  };

  const handleExportStudents = () => {
    // محاكاة تصدير بيانات الطلاب
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات الطلاب بنجاح",
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
    toast({
      title: "تم حذف الطالب",
      description: `تم حذف الطالب رقم ${id} بنجاح`,
    });
  };

  const toggleStudentStatus = (id: string) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === 'active' ? 'inactive' : 'active',
            }
          : student
      )
    );
    
    const student = students.find((s) => s.id === id);
    if (student) {
      toast({
        title: "تم تغيير الحالة",
        description: `تم تغيير حالة الطالب ${student.name} بنجاح`,
      });
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الطلاب</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة طالب
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>إضافة طالب جديد</DialogTitle>
                  <DialogDescription>
                    أدخل معلومات الطالب الجديد. اضغط على حفظ عند الانتهاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الاسم</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">البريد الإلكتروني</label>
                    <Input type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الهاتف</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الدولة</label>
                    <Input className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStudent}>
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
                  <DialogTitle>استيراد بيانات الطلاب</DialogTitle>
                  <DialogDescription>
                    يرجى تحميل ملف CSV أو Excel يحتوي على بيانات الطلاب.
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
                  <Button type="submit" onClick={handleImportStudents}>
                    <Upload className="h-4 w-4 mr-2" />
                    استيراد البيانات
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportStudents}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="البحث عن طالب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
              <SelectItem value="pending">قيد التفعيل</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">رقم الطالب</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead className="hidden md:table-cell">الهاتف</TableHead>
                <TableHead className="hidden md:table-cell">الدولة</TableHead>
                <TableHead className="hidden md:table-cell">طلبات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-40 text-unlimited-gray">
                    لا توجد بيانات متطابقة مع البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.phone}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.country}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.applications}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[student.status].color}>
                        {statusConfig[student.status].label}
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
                            <DropdownMenuLabel>خيارات الطالب</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toggleStudentStatus(student.id)}>
                              {student.status === 'active' ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                            <DropdownMenuItem>إعادة تعيين كلمة المرور</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-unlimited-danger focus:text-unlimited-danger"
                              onClick={() => handleDeleteStudent(student.id)}
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

export default ManageStudents;
