
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ApplicationSteps from '@/components/student/ApplicationSteps';
import ApplicationMessages from '@/components/applications/ApplicationMessages';
import ApplicationStatusBadges from '@/components/applications/ApplicationStatusBadges';
import ApplicationDetailsSection from '@/components/applications/ApplicationDetailsSection';
import ApplicationTimeline from '@/components/applications/ApplicationTimeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { FileText, MessageCircle, Clock, Info, ArrowLeft, Edit, DownloadCloud, Eye, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getApplicationFromStorage } from '@/utils/applicationUtils';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    // Fetch application details based on ID from local storage
    setTimeout(() => {
      const applicationData = getApplicationFromStorage(id);
      
      if (applicationData) {
        setApplication(applicationData);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  // For download simulation
  const handleDownloadDocuments = () => {
    toast({
      title: t('application.documents.downloading', 'جاري التحميل'),
      description: t('application.documents.downloadStarted', 'بدأ تحميل المستندات')
    });
    setTimeout(() => {
      toast({
        title: t('application.documents.downloaded', 'تم التحميل'),
        description: t('application.documents.downloadComplete', 'تم تحميل المستندات بنجاح')
      });
    }, 2000);
  };

  // For preview simulation
  const handlePreviewApplication = () => {
    toast({
      title: t('application.preview.generating', 'جاري إنشاء المعاينة'),
      description: t('application.preview.generatingDescription', 'يتم الآن إنشاء معاينة الطلب')
    });
    setTimeout(() => {
      toast({
        title: t('application.preview.ready', 'المعاينة جاهزة'),
        description: t('application.preview.readyDescription', 'يمكنك الآن معاينة الطلب')
      });
    }, 1500);
  };

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
        <div className="max-w-7xl mx-auto px-4">
          <Button 
            variant="outline"
            className="mb-4"
            onClick={() => navigate('/dashboard/applications')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('application.navigation.backToApplications', 'العودة إلى الطلبات')}
          </Button>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-unlimited-gray mb-2">
                  {t("application.notFound", "لم يتم العثور على الطلب")}
                </h2>
                <p className="text-unlimited-gray mb-6">
                  {t("application.notFoundDescription", "الطلب الذي تبحث عنه غير موجود أو تم حذفه")}
                </p>
                <Button 
                  onClick={() => navigate('/dashboard/applications')}
                >
                  {t("application.navigation.viewAllApplications", "عرض جميع الطلبات")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Current application step based on status
  const getCurrentStep = () => {
    switch (application.status) {
      case 'draft':
        return 0;
      case 'submitted':
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

  // Calculate expected timeline based on status
  const getExpectedDates = () => {
    const currentDate = new Date(application.date);
    const documentReviewDate = new Date(currentDate);
    documentReviewDate.setDate(documentReviewDate.getDate() + 7);
    
    const applicationReviewDate = new Date(documentReviewDate);
    applicationReviewDate.setDate(applicationReviewDate.getDate() + 14);
    
    const decisionDate = new Date(applicationReviewDate);
    decisionDate.setDate(decisionDate.getDate() + 10);
    
    return {
      documentReview: documentReviewDate.toLocaleDateString('ar-SA'),
      applicationReview: applicationReviewDate.toLocaleDateString('ar-SA'),
      decision: decisionDate.toLocaleDateString('ar-SA'),
    };
  };

  const expectedDates = getExpectedDates();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4">
        <Button 
          variant="outline"
          className="mb-4"
          onClick={() => navigate('/dashboard/applications')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('application.navigation.backToApplications', 'العودة إلى الطلبات')}
        </Button>

        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-1">
                {t("application.details.title", "تفاصيل الطلب")}
              </h1>
              <p className="text-unlimited-gray">
                {application.program} - {application.university}
              </p>
              <p className="text-sm text-unlimited-gray mt-1">
                <span className="font-medium">{t('application.details.applicationId', 'رقم الطلب')}:</span> {application.id}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {application.status === 'draft' ? (
                <Button 
                  className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
                  onClick={() => navigate(`/apply/${application.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t('application.buttons.continueEditing', 'متابعة التعديل')}
                </Button>
              ) : (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline"
                          onClick={handleDownloadDocuments}
                        >
                          <DownloadCloud className="mr-2 h-4 w-4" />
                          {t('application.buttons.downloadDocuments', 'تحميل المستندات')}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('application.buttons.downloadDocumentsTooltip', 'تحميل جميع مستندات الطلب كملف مضغوط')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={handlePreviewApplication}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {t('application.buttons.previewApplication', 'معاينة الطلب')}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('application.buttons.previewApplicationTooltip', 'معاينة الطلب كما سيظهر للجامعة')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <ApplicationStatusBadges status={application.status} />
            
            {application.status === 'draft' && (
              <Alert className="mt-4 bg-yellow-50 text-yellow-800 border-yellow-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t('application.alert.draftTitle', 'طلب غير مكتمل')}</AlertTitle>
                <AlertDescription>
                  {t('application.alert.draftDescription', 'هذا الطلب لا يزال في حالة المسودة. يرجى إكمال الطلب وتقديمه.')}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <ApplicationSteps currentStep={getCurrentStep()} />
        
        <div className="mb-6">
          <Card className="bg-unlimited-light-blue/10 border-unlimited-blue">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-sm text-unlimited-gray mb-1">{t('application.timeline.documentReview', 'مراجعة المستندات')}</p>
                  <p className="font-medium text-unlimited-dark-blue">{expectedDates.documentReview}</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-sm text-unlimited-gray mb-1">{t('application.timeline.applicationReview', 'مراجعة الطلب')}</p>
                  <p className="font-medium text-unlimited-dark-blue">{expectedDates.applicationReview}</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-sm text-unlimited-gray mb-1">{t('application.timeline.expectedDecision', 'القرار المتوقع')}</p>
                  <p className="font-medium text-unlimited-dark-blue">{expectedDates.decision}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
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
              applicationId={application.id}
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
              <CardContent className="space-y-4">
                {application.formData?.documents?.length > 0 ? (
                  application.formData.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-md">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${doc.status === 'uploaded' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{doc.name}</h4>
                          <Badge variant={doc.status === 'uploaded' ? 'default' : 'secondary'}>
                            {doc.status === 'uploaded' ? 
                              t('application.documents.uploaded', 'تم التحميل') : 
                              doc.required ? 
                              t('application.documents.required', 'مطلوب') : 
                              t('application.documents.optional', 'اختياري')}
                          </Badge>
                        </div>
                        {doc.description && <p className="text-sm text-unlimited-gray">{doc.description}</p>}
                      </div>
                      <div>
                        {doc.status === 'uploaded' ? (
                          <Button variant="outline" size="sm">
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            {t('application.documents.view', 'عرض')}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                            <AlertCircle className="h-3.5 w-3.5 mr-1" />
                            {t('application.documents.missing', 'ناقص')}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-unlimited-gray text-center py-8">
                    {t("application.documents.noDocuments", "لا توجد مستندات لهذا الطلب")}
                  </p>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <p className="text-sm text-unlimited-gray">
                  {application.formData?.documents?.filter((doc: any) => doc.status === 'uploaded').length || 0} من {application.formData?.documents?.length || 0} {t('application.documents.uploadedCount', 'مستند تم تحميله')}
                </p>
                <Button 
                  variant="outline"
                  disabled={!application.formData?.documents?.some((doc: any) => doc.status === 'uploaded')}
                  onClick={handleDownloadDocuments}
                >
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  {t('application.buttons.downloadAll', 'تحميل الكل')}
                </Button>
              </CardFooter>
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
