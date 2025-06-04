
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { realApplicationsService, RealApplication } from '@/services/realApplicationsService';
import { exportService } from '@/services/exportService';
import ApplicationDetailsSection from '@/components/applications/ApplicationDetailsSection';
import ApplicationDetailsActions from '@/components/applications/ApplicationDetailsActions';
import ApplicationTimeline from '@/components/applications/ApplicationTimeline';
import ApplicationMessages from '@/components/applications/ApplicationMessages';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleAsyncError, logInfo, logError } = useErrorHandler();
  
  const [application, setApplication] = useState<RealApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    if (id) {
      fetchApplicationDetails();
    }
  }, [id]);

  const fetchApplicationDetails = async () => {
    if (!id) return;
    
    const result = await handleAsyncError(async () => {
      setIsLoading(true);
      
      const data = await realApplicationsService.getApplicationById(id);
      setApplication(data);
      
      // محاكاة بيانات الجدول الزمني
      const mockTimeline = [
        {
          id: '1',
          date: data.created_at,
          status: 'submitted',
          note: 'تم تقديم الطلب بنجاح',
          by: 'النظام',
          type: 'status_change'
        },
        {
          id: '2',
          date: new Date().toISOString(),
          status: 'under_review',
          note: 'بدء مراجعة الطلب من قبل الإدارة',
          by: 'مدير القبول',
          type: 'status_change'
        }
      ];
      
      setTimeline(mockTimeline);
      
      logInfo(`تم جلب تفاصيل الطلب: ${id}`, { applicationId: id });
    }, `خطأ في جلب تفاصيل الطلب ${id}`);

    if (result !== null) {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!application) return;

    await handleAsyncError(async () => {
      await realApplicationsService.updateApplicationStatus(
        application.id,
        newStatus,
        `تم تغيير الحالة إلى ${newStatus}`
      );
      
      setApplication(prev => prev ? { ...prev, status: newStatus } : null);
      
      // تحديث الجدول الزمني
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: newStatus,
        note: `تم تغيير حالة الطلب إلى ${newStatus}`,
        by: 'المدير',
        type: 'status_change' as const
      };
      
      setTimeline(prev => [newEntry, ...prev]);
      
      logInfo(`تم تغيير حالة الطلب ${application.id} إلى ${newStatus}`);
    }, `خطأ في تحديث حالة الطلب`);
  };

  const handleExport = async (format: string) => {
    if (!application) return;

    await handleAsyncError(async () => {
      await exportService.exportApplication(application, { 
        format: format as 'pdf' | 'excel' | 'csv' 
      });
      
      logInfo(`تم تصدير الطلب ${application.id} بصيغة ${format}`);
    }, `خطأ في تصدير الطلب بصيغة ${format}`);
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="student">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout userRole="student">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">الطلب غير موجود</h2>
          <Button onClick={() => navigate('/applications')}>
            العودة إلى قائمة الطلبات
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/applications')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
          <h1 className="text-2xl font-bold">تفاصيل الطلب</h1>
        </div>

        {/* Actions Bar */}
        <ApplicationDetailsActions
          application={application}
          onStatusChange={handleStatusChange}
          onExport={handleExport}
        />

        {/* Main Content */}
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">تفاصيل الطلب</TabsTrigger>
            <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <ApplicationDetailsSection application={application} />
          </TabsContent>

          <TabsContent value="timeline">
            <ApplicationTimeline timeline={timeline} isLoading={false} />
          </TabsContent>

          <TabsContent value="documents">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">المستندات المرفقة</h3>
              <p className="text-gray-600">سيتم تطوير هذا القسم قريباً</p>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <ApplicationMessages
              programName={application.programName || 'البرنامج'}
              universityName={application.universityName || 'الجامعة'}
              applicationId={application.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetails;
