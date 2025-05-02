
import { useState } from 'react';
import { Eye, FileText, MessageCircle, MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type ApplicationStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'completed';

type Application = {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  university: string;
  submittedDate: string;
  status: ApplicationStatus;
};

const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-unlimited-warning text-white' },
  processing: { label: 'قيد المعالجة', color: 'bg-unlimited-info text-white' },
  approved: { label: 'مقبول', color: 'bg-unlimited-success text-white' },
  rejected: { label: 'مرفوض', color: 'bg-unlimited-danger text-white' },
  completed: { label: 'مكتمل', color: 'bg-unlimited-blue text-white' },
};

const initialApplications: Application[] = [
  {
    id: 'APP-001',
    studentId: 'STD-001',
    studentName: 'أحمد محمد',
    program: 'هندسة البرمجيات',
    university: 'جامعة لندن',
    submittedDate: '2023-04-01',
    status: 'approved',
  },
  {
    id: 'APP-002',
    studentId: 'STD-001',
    studentName: 'أحمد محمد',
    program: 'علوم الحاسب',
    university: 'جامعة أكسفورد',
    submittedDate: '2023-04-03',
    status: 'processing',
  },
  {
    id: 'APP-003',
    studentId: 'STD-002',
    studentName: 'سارة عبدالله',
    program: 'إدارة الأعمال',
    university: 'جامعة هارفارد',
    submittedDate: '2023-04-05',
    status: 'pending',
  },
  {
    id: 'APP-004',
    studentId: 'STD-003',
    studentName: 'محمد علي',
    program: 'الطب البشري',
    university: 'جامعة تورنتو',
    submittedDate: '2023-04-07',
    status: 'rejected',
  },
  {
    id: 'APP-005',
    studentId: 'STD-003',
    studentName: 'محمد علي',
    program: 'الهندسة الطبية',
    university: 'جامعة ملبورن',
    submittedDate: '2023-04-08',
    status: 'approved',
  },
  {
    id: 'APP-006',
    studentId: 'STD-003',
    studentName: 'محمد علي',
    program: 'علوم البيانات',
    university: 'جامعة طوكيو',
    submittedDate: '2023-04-10',
    status: 'completed',
  },
  {
    id: 'APP-007',
    studentId: 'STD-005',
    studentName: 'عبدالله خالد',
    program: 'الذكاء الاصطناعي',
    university: 'جامعة كامبريدج',
    submittedDate: '2023-04-12',
    status: 'pending',
  },
];

export function AgentApplicationsList() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const { toast } = useToast();

  const filteredApplications = applications.filter((application) => {
    const matchesSearch = 
      application.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewApplication = (applicationId: string) => {
    toast({
      title: "عرض تفاصيل الطلب",
      description: `تم فتح الطلب رقم ${applicationId}`,
    });
  };

  const handleSendMessage = (applicationId: string) => {
    toast({
      title: "إرسال رسالة",
      description: `تم فتح المحادثة حول الطلب رقم ${applicationId}`,
    });
  };

  const handleCheckStatus = (applicationId: string) => {
    toast({
      title: "التحقق من حالة الطلب",
      description: `جاري التحقق من حالة الطلب رقم ${applicationId}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            placeholder="البحث في الطلبات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-[300px]"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ApplicationStatus | 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">قيد الانتظار</SelectItem>
            <SelectItem value="processing">قيد المعالجة</SelectItem>
            <SelectItem value="approved">مقبول</SelectItem>
            <SelectItem value="rejected">مرفوض</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">رقم الطلب</TableHead>
              <TableHead>الطالب</TableHead>
              <TableHead className="hidden md:table-cell">البرنامج</TableHead>
              <TableHead className="hidden md:table-cell">الجامعة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="hidden md:table-cell">تاريخ التقديم</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-40 text-unlimited-gray">
                  لا توجد بيانات متطابقة مع البحث
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{application.studentName}</p>
                      <p className="text-xs text-unlimited-gray">{application.studentId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{application.program}</TableCell>
                  <TableCell className="hidden md:table-cell">{application.university}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[application.status].color}>
                      {statusConfig[application.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{application.submittedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleViewApplication(application.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleSendMessage(application.id)}
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
                          <DropdownMenuLabel>خيارات الطلب</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewApplication(application.id)}>
                            عرض تفاصيل الطلب
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(application.id)}>
                            إرسال رسالة
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCheckStatus(application.id)}>
                            التحقق من الحالة
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            المستندات
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
