
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
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { realApplicationsService, RealApplication } from '@/services/realApplicationsService';

type ApplicationStatus = 'pending' | 'under_review' | 'accepted' | 'rejected' | 'cancelled';

const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-yellow-600 text-white' },
  under_review: { label: 'قيد المراجعة', color: 'bg-blue-600 text-white' },
  accepted: { label: 'مقبول', color: 'bg-green-600 text-white' },
  rejected: { label: 'مرفوض', color: 'bg-red-600 text-white' },
  cancelled: { label: 'ملغي', color: 'bg-gray-600 text-white' }
};

export function RecentApplications() {
  const [applications, setApplications] = useState<RealApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleAsyncError, logInfo, logError } = useErrorHandler();

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications = async () => {
    const result = await handleAsyncError(async () => {
      setIsLoading(true);
      
      const data = await realApplicationsService.getAllApplications();
      
      // أخذ آخر 5 طلبات فقط
      const recentApplications = data.slice(0, 5);
      setApplications(recentApplications);
      
      logInfo(`تم جلب ${recentApplications.length} طلبات حديثة`, { 
        count: recentApplications.length 
      });
    }, "خطأ في جلب الطلبات الحديثة");

    if (result !== null) {
      setIsLoading(false);
    }
  };

  const handleViewApplication = (id: string) => {
    try {
      logInfo(`عرض تفاصيل الطلب: ${id}`, { applicationId: id });
      navigate(`/admin/applications/${id}`);
    } catch (error) {
      logError(error, { context: 'handleViewApplication', applicationId: id });
    }
  };

  const handleDownloadDocuments = async (id: string) => {
    await handleAsyncError(async () => {
      logInfo(`طلب تنزيل مستندات الطلب: ${id}`, { applicationId: id });
      toast({
        title: "تنزيل المستندات",
        description: `سيتم تطوير وظيفة تنزيل مستندات الطلب ${id} قريباً`,
      });
    }, `خطأ في تنزيل مستندات الطلب ${id}`);
  };

  const handleUpdateStatus = async (id: string, newStatus: ApplicationStatus) => {
    await handleAsyncError(async () => {
      await realApplicationsService.updateApplicationStatus(
        id, 
        newStatus, 
        `تم تغيير الحالة إلى ${statusConfig[newStatus].label}`
      );
      
      // تحديث الطلبات المحلية
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
      
      toast({
        title: "تم تحديث الحالة",
        description: `تم تغيير حالة الطلب إلى ${statusConfig[newStatus].label}`,
      });
    }, `خطأ في تحديث حالة الطلب ${id}`);
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-unlimited-blue"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-unlimited-gray">لا توجد طلبات حديثة</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-unlimited-blue/20">
                <th className="text-right py-2 px-2">الطالب</th>
                <th className="text-right py-2 px-2">البرنامج</th>
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
                      <p className="text-xs text-unlimited-gray">
                        {application.studentCountry}
                      </p>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div>
                      <p className="font-medium">{application.programName}</p>
                      <p className="text-xs text-unlimited-gray">
                        {application.universityName}
                      </p>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <Badge className={statusConfig[application.status as ApplicationStatus]?.color || 'bg-unlimited-gray text-white'}>
                      {statusConfig[application.status as ApplicationStatus]?.label || application.status}
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, 'under_review')}>
                            وضع قيد المراجعة
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, 'accepted')}>
                            قبول الطلب
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, 'rejected')}>
                            رفض الطلب
                          </DropdownMenuItem>
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
