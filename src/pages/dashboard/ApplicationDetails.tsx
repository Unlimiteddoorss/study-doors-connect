
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ApplicationSteps from '@/components/student/ApplicationSteps';
import ApplicationMessages from '@/components/applications/ApplicationMessages';
import ApplicationStatusBadges from '@/components/applications/ApplicationStatusBadges';
import ApplicationDetailsSection from '@/components/applications/ApplicationDetailsSection';
import ApplicationTimeline from '@/components/applications/ApplicationTimeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { FileText, MessageCircle, Clock, Info } from 'lucide-react';

// Mock application data
const mockApplication = {
  id: 'APP-001',
  program: 'بكالوريوس هندسة البرمجيات',
  university: 'جامعة إسطنبول التقنية',
  date: '2025-04-10',
  status: 'conditional',
  studentName: 'ناصر أحمد إبراهيم خليل',
  studentEmail: 'naser.ahmad@example.com',
  studentPhone: '+90 552 421 2215',
  studentNationality: 'أفغانستان',
  fathersName: 'محمد',
  mothersName: 'نورا خليل',
  passportId: 'P0523096',
  academicYear: '2025-2026',
  semester: 'الفصل الربيعي',
  applicationId: '123169',
  onlineApplicationId: '44343',
  applicationDate: '26/12/2024 09:16:14',
  creator: 'Unlimited Doors',
  assignee: 'Unlimited Doors',
  cl1: 'فاطمة محمد',
  cl2: 'جاسمين شاهين',
};

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    // In a real app, fetch application details based on the ID
    // For now, using mock data
    setTimeout(() => {
      setApplication(mockApplication);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  // If application not found
  if (!application) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h2 className="text-xl font-bold text-unlimited-gray">
            {t("application.notFound", "لم يتم العثور على الطلب")}
          </h2>
          <p className="text-unlimited-gray mt-2">
            {t("application.notFoundDescription", "الطلب الذي تبحث عنه غير موجود أو تم حذفه")}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // Current application step based on status
  const getCurrentStep = () => {
    switch (application.status) {
      case 'pending':
        return 1;
      case 'documents':
        return 2;
      case 'review':
        return 3;
      case 'conditional':
        return 4;
      case 'approved':
      case 'paid':
      case 'registered':
        return 5;
      default:
        return 1;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-2">
            {t("application.details.title", "تفاصيل الطلب")}
          </h1>
          <p className="text-unlimited-gray">
            {application.program} - {application.university}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <ApplicationStatusBadges status={application.status} />
          </div>
        </div>

        <ApplicationSteps currentStep={getCurrentStep()} />
        
        <Tabs defaultValue="details" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="details" className="gap-2">
              <Info className="h-4 w-4" />
              {t("application.details.tabs.details", "التفاصيل")}
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {t("application.details.tabs.messages", "المراسلات")}
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="h-4 w-4" />
              {t("application.details.tabs.documents", "المستندات")}
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Clock className="h-4 w-4" />
              {t("application.details.tabs.timeline", "مسار الطلب")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0">
            <ApplicationDetailsSection application={application} />
          </TabsContent>

          <TabsContent value="messages" className="mt-0">
            <ApplicationMessages 
              programName={application.program} 
              universityName={application.university}
              applicationId={parseInt(application.applicationId)}
            />
          </TabsContent>

          <TabsContent value="documents" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{t("application.details.documents.title", "مستندات الطلب")}</CardTitle>
                <CardDescription>
                  {t("application.details.documents.subtitle", "جميع المستندات المطلوبة والمقدمة للطلب")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-unlimited-gray text-center py-8">
                  {t("application.documents.comingSoon", "سيتم إضافة هذه الميزة قريبًا")}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <ApplicationTimeline applicationId={id || ''} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetails;
