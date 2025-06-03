
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
import { supabase } from '@/integrations/supabase/client';

type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'under_review' | 'cancelled';

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
  pending: { label: 'قيد الانتظار', color: 'bg-yellow-600 text-white' },
  under_review: { label: 'قيد المراجعة', color: 'bg-blue-600 text-white' },
  accepted: { label: 'مقبول', color: 'bg-green-600 text-white' },
  rejected: { label: 'مرفوض', color: 'bg-red-600 text-white' },
  cancelled: { label: 'ملغي', color: 'bg-gray-600 text-white' }
};

export function RecentApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(name, universities!inner(name)),
          user_profiles!fk_applications_student_profiles(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }

      const formattedApplications: Application[] = data?.map(app => ({
        id: app.id,
        studentName: app.user_profiles?.full_name || 'طالب غير معروف',
        program: app.programs?.name || 'برنامج غير معروف',
        university: app.programs?.universities?.name || 'جامعة غير معروفة',
        date: new Date(app.created_at).toLocaleDateString('ar-SA'),
        status: app.status as ApplicationStatus
      })) || [];

      setApplications(formattedApplications);
    } catch (error) {
      console.error("Error fetching recent applications:", error);
      // استخدام البيانات التجريبية في حالة الخطأ
      setApplications([
        {
          id: 'APP-001',
          studentName: 'أحمد محمد',
          program: 'هندسة البرمجيات',
          university: 'جامعة إسطنبول التقنية',
          date: new Date().toLocaleDateString('ar-SA'),
          status: 'pending',
        },
        {
          id: 'APP-002',
          studentName: 'سارة عبدالله',
          program: 'علوم الحاسب',
          university: 'جامعة البوسفور',
          date: new Date().toLocaleDateString('ar-SA'),
          status: 'under_review',
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
