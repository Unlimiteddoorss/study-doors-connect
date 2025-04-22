
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'processing' | 'completed' | 'archived' | 'review' | 'documents';

type Application = {
  id: string;
  studentName?: string;
  program: string;
  university: string;
  date?: string;
  createdDate?: string;
  status: ApplicationStatus;
};

const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-unlimited-warning text-white' },
  review: { label: 'قيد المراجعة', color: 'bg-unlimited-warning text-white' },
  approved: { label: 'مقبول', color: 'bg-unlimited-success text-white' },
  rejected: { label: 'مرفوض', color: 'bg-unlimited-danger text-white' },
  processing: { label: 'قيد المعالجة', color: 'bg-unlimited-info text-white' },
  completed: { label: 'مكتمل', color: 'bg-unlimited-blue text-white' },
  archived: { label: 'مؤرشف', color: 'bg-unlimited-gray text-white' },
  documents: { label: 'بانتظار المستندات', color: 'bg-unlimited-info text-white' }
};

// Sample default applications
const defaultApplications: Application[] = [
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
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load applications from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
      const adminAppsString = localStorage.getItem('adminApplications');
      if (adminAppsString) {
        const adminApps = JSON.parse(adminAppsString);
        // Get only the most recent 5 applications
        setApplications(adminApps.slice(0, 5));
      } else {
        // If no admin applications, check student applications
        const studentAppsString = localStorage.getItem('studentApplications');
        if (studentAppsString) {
          const studentApps = JSON.parse(studentAppsString);
          setApplications(studentApps.slice(0, 5));
          // Also save these to admin applications
          localStorage.setItem('adminApplications', JSON.stringify(studentApps));
        } else {
          // If no applications found, use default ones
          setApplications(defaultApplications);
          localStorage.setItem('adminApplications', JSON.stringify(defaultApplications));
        }
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications(defaultApplications);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleViewApplication = (id: string) => {
    toast({
      title: "عرض الطلب",
      description: `تم فتح الطلب رقم ${id}`,
    });
    navigate(`/admin/applications?id=${id}`);
  };

  const handleDownloadDocuments = (id: string) => {
    toast({
      title: "تنزيل المستندات",
      description: `جاري تنزيل مستندات الطلب رقم ${id}`,
    });
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-unlimited-blue"></div>
        </div>
      ) : (
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
                      <p className="font-medium">{application.studentName || 'طالب'}</p>
                      <p className="text-xs text-unlimited-gray">{application.program}</p>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <Badge className={statusConfig[application.status]?.color || 'bg-unlimited-gray text-white'}>
                      {statusConfig[application.status]?.label || application.status}
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
                          <DropdownMenuItem onClick={() => handleViewApplication(application.id)}>
                            عرض التفاصيل
                          </DropdownMenuItem>
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
      )}
      <div className="text-center">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/applications')}>
          عرض جميع الطلبات
        </Button>
      </div>
    </div>
  );
}
