
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
import { useToast } from '@/hooks/use-toast';

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

export function AgentStudentsList() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.includes(searchQuery)
  );

  const handleAddStudent = () => {
    toast({
      title: "تمت إضافة الطالب",
      description: "تم إضافة الطالب الجديد بنجاح",
    });
    setIsAddDialogOpen(false);
  };

  const handleSendMessage = (studentId: string) => {
    toast({
      title: "إرسال رسالة",
      description: `تم فتح محادثة مع الطالب رقم ${studentId}`,
    });
  };

  const handleViewStudent = (studentId: string) => {
    toast({
      title: "عرض معلومات الطالب",
      description: `تم فتح صفحة الطالب رقم ${studentId}`,
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
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddStudent}>
                إضافة الطالب
              </Button>
            </DialogFooter>
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
                        onClick={() => handleViewStudent(student.id)}
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
                          <DropdownMenuItem onClick={() => handleViewStudent(student.id)}>
                            عرض معلومات الطالب
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(student.id)}>
                            إرسال رسالة
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            إنشاء طلب جديد
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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
    </div>
  );
}
