
import { useState } from 'react';
import { Eye, MessageCircle, MoreHorizontal, Plus, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  applications: number;
  lastActive: string;
};

const initialStudents: Student[] = [
  {
    id: 'STD-001',
    name: 'أحمد محمد',
    email: 'ahmad@example.com',
    phone: '+966 50 123 4567',
    applications: 2,
    lastActive: '2023-04-10',
  },
  {
    id: 'STD-002',
    name: 'سارة عبدالله',
    email: 'sara@example.com',
    phone: '+966 55 987 6543',
    applications: 1,
    lastActive: '2023-04-08',
  },
  {
    id: 'STD-003',
    name: 'محمد علي',
    email: 'mohammed@example.com',
    phone: '+966 54 111 2222',
    applications: 3,
    lastActive: '2023-04-12',
  },
  {
    id: 'STD-004',
    name: 'فاطمة أحمد',
    email: 'fatima@example.com',
    phone: '+966 56 333 4444',
    applications: 0,
    lastActive: '2023-04-05',
  },
  {
    id: 'STD-005',
    name: 'عبدالله خالد',
    email: 'abdullah@example.com',
    phone: '+966 59 555 6666',
    applications: 1,
    lastActive: '2023-04-11',
  },
];

// Schema for student form validation
const studentFormSchema = z.object({
  name: z.string().min(2, { message: "اسم الطالب يجب أن يكون أكثر من حرفين" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
});

export function AgentStudentsList() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  // Filtered students based on search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.includes(searchQuery)
  );

  // Form for adding new student
  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleAddStudent = (values: z.infer<typeof studentFormSchema>) => {
    const newStudent = {
      id: `STD-${String(students.length + 1).padStart(3, '0')}`,
      name: values.name,
      email: values.email,
      phone: values.phone,
      applications: 0,
      lastActive: new Date().toISOString().split('T')[0],
    };
    
    setStudents([...students, newStudent]);
    form.reset();
    setIsAddDialogOpen(false);
    
    toast({
      title: "تمت إضافة الطالب",
      description: "تم إضافة الطالب الجديد بنجاح",
    });
  };

  const handleSendMessage = (studentId: string) => {
    toast({
      title: "إرسال رسالة",
      description: `تم فتح محادثة مع الطالب رقم ${studentId}`,
    });
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleCreateApplication = (studentId: string) => {
    toast({
      title: "إنشاء طلب جديد",
      description: `تم فتح نموذج طلب جديد للطالب رقم ${studentId}`,
    });
  };

  const handleViewApplications = (studentId: string) => {
    toast({
      title: "عرض طلبات الطالب",
      description: `تم فتح صفحة عرض طلبات الطالب رقم ${studentId}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            placeholder="البحث عن طالب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-[300px]"
          />
        </div>
        
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
                أدخل معلومات الطالب الجديد. سيتم ربط الطالب بحسابك كوكيل.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddStudent)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input placeholder="اسم الطالب" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="البريد الإلكتروني" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="رقم الهاتف" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    إضافة الطالب
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">رقم الطالب</TableHead>
              <TableHead>الاسم</TableHead>
              <TableHead className="hidden md:table-cell">البريد الإلكتروني</TableHead>
              <TableHead className="hidden md:table-cell">الهاتف</TableHead>
              <TableHead>طلبات</TableHead>
              <TableHead className="hidden md:table-cell">آخر نشاط</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-40 text-unlimited-gray">
                  لا توجد بيانات متطابقة مع البحث
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.phone}</TableCell>
                  <TableCell>{student.applications}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleViewStudent(student)}
                      >
                        <User className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleSendMessage(student.id)}
                      >
                        <MessageCircle className="h-4 w-4" />
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
                          <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                            <Eye className="h-4 w-4 ml-2" />
                            عرض معلومات الطالب
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(student.id)}>
                            <MessageCircle className="h-4 w-4 ml-2" />
                            إرسال رسالة
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCreateApplication(student.id)}>
                            <Plus className="h-4 w-4 ml-2" />
                            إنشاء طلب جديد
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewApplications(student.id)}>
                            <Eye className="h-4 w-4 ml-2" />
                            عرض طلبات الطالب
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

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>معلومات الطالب</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-unlimited-gray">رقم الطالب</p>
                  <p className="font-medium">{selectedStudent.id}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">الاسم</p>
                  <p className="font-medium">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">البريد الإلكتروني</p>
                  <p className="font-medium">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">الهاتف</p>
                  <p className="font-medium">{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">عدد الطلبات</p>
                  <p className="font-medium">{selectedStudent.applications}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">آخر نشاط</p>
                  <p className="font-medium">{selectedStudent.lastActive}</p>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleSendMessage(selectedStudent.id);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  إرسال رسالة
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleCreateApplication(selectedStudent.id);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء طلب جديد
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
