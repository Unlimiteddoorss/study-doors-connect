
import { useState } from 'react';
import { Eye, Download, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'processing';

type Application = {
  id: string;
  studentName: string;
  program: string;
  university: string;
  date: string;
  status: ApplicationStatus;
};

const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-unlimited-warning text-white' },
  approved: { label: 'مقبول', color: 'bg-unlimited-success text-white' },
  rejected: { label: 'مرفوض', color: 'bg-unlimited-danger text-white' },
  processing: { label: 'قيد المعالجة', color: 'bg-unlimited-info text-white' },
};

const recentApplications: Application[] = [
  {
    id: 'APP-2023-001',
    studentName: 'أحمد محمد',
    program: 'هندسة البرمجيات',
    university: 'جامعة لندن',
    date: '2023-04-01',
    status: 'approved',
  },
  {
    id: 'APP-2023-002',
    studentName: 'سارة عبدالله',
    program: 'علوم الحاسب',
    university: 'جامعة تورنتو',
    date: '2023-04-02',
    status: 'pending',
  },
  {
    id: 'APP-2023-003',
    studentName: 'عمر خالد',
    program: 'إدارة الأعمال',
    university: 'جامعة ملبورن',
    date: '2023-04-03',
    status: 'processing',
  },
  {
    id: 'APP-2023-004',
    studentName: 'فاطمة علي',
    program: 'الطب البشري',
    university: 'جامعة برلين',
    date: '2023-04-04',
    status: 'rejected',
  },
  {
    id: 'APP-2023-005',
    studentName: 'محمد أحمد',
    program: 'علوم البيانات',
    university: 'جامعة طوكيو',
    date: '2023-04-05',
    status: 'approved',
  }
];

export function RecentApplications() {
  const [applications, setApplications] = useState<Application[]>(recentApplications);
  const { toast } = useToast();

  const handleViewApplication = (id: string) => {
    toast({
      title: "عرض الطلب",
      description: `تم فتح الطلب رقم ${id}`,
    });
  };

  const handleDownloadDocuments = (id: string) => {
    toast({
      title: "تنزيل المستندات",
      description: `جاري تنزيل مستندات الطلب رقم ${id}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-unlimited-blue/20">
              <th className="text-right py-2 px-2">الطالب</th>
              <th className="text-right py-2 px-2">الحالة</th>
              <th className="text-right py-2 px-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-b border-gray-100">
                <td className="py-2 px-2">
                  <div>
                    <p className="font-medium">{application.studentName}</p>
                    <p className="text-xs text-unlimited-gray">{application.program}</p>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <Badge className={statusConfig[application.status].color}>
                    {statusConfig[application.status].label}
                  </Badge>
                </td>
                <td className="py-2 px-2">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleViewApplication(application.id)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">عرض</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleDownloadDocuments(application.id)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">تنزيل</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">المزيد من الخيارات</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>خيارات الطلب</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>تغيير الحالة</DropdownMenuItem>
                        <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                        <DropdownMenuItem>إضافة ملاحظة</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-unlimited-danger">حذف</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Button variant="outline" size="sm">
          عرض جميع الطلبات
        </Button>
      </div>
    </div>
  );
}
