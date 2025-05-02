
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import StudentApplicationHeader from '@/components/student/StudentApplicationHeader';
import ApplicationSteps from '@/components/student/ApplicationSteps';
import PersonalInfoForm from '@/components/student/PersonalInfoForm';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentApplicationFormSubmit from '@/components/applications/StudentApplicationFormSubmit';
import { useTranslation } from 'react-i18next';
import DocumentsUploadForm from '@/components/student/DocumentsUploadForm';
import AcademicInfoForm from '@/components/student/AcademicInfoForm';
import ProgramSelectionForm from '@/components/student/ProgramSelectionForm';
import ApplicationReview from '@/components/student/ApplicationReview';
import ApplicationSubmissionHandler from '@/components/applications/ApplicationSubmissionHandler';
import { saveApplicationToStorage, getApplicationProgress } from '@/utils/applicationUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Save, AlertTriangle, ArrowLeft } from 'lucide-react';

// تعريف واجهة بيانات الطلب
interface ApplicationData {
  id?: string;
  personalInfo?: any;
  documents?: any[];
  academicInfo?: any;
  program?: any;
  university?: string;
  status?: string;
}

const StudentApplication = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [formData, setFormData] = useState<ApplicationData>({});
  const [progress, setProgress] = useState(0);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();

  // جلب بيانات الطلب من التخزين المحلي إذا كان هناك معرف
  useEffect(() => {
    if (id) {
      try {
        const existingApplications = localStorage.getItem('studentApplications');
        if (existingApplications) {
          const applications = JSON.parse(existingApplications);
          const application = applications.find((app: any) => app.id === id);
          
          if (application && application.formData) {
            setFormData(application.formData);
          }
        }
      } catch (error) {
        console.error('Error loading application data:', error);
      }
    }
    
    // تحديث نسبة التقدم
    const calculatedProgress = getApplicationProgress(formData);
    setProgress(calculatedProgress);
  }, [id, formData]);

  // التحقق من اكتمال البيانات حسب الخطوة الحالية
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      // التحقق من بيانات الطالب الشخصية
      if (!formData.personalInfo?.firstName || !formData.personalInfo?.lastName) {
        toast({
          title: t("application.validation.error"),
          description: t("application.validation.personalInfoIncomplete"),
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 2) {
      // التحقق من المستندات
      // هنا يمكن التحقق من وجود المستندات المطلوبة
    } else if (currentStep === 3) {
      // التحقق من المعلومات الأكاديمية
      if (!formData.academicInfo?.education) {
        toast({
          title: t("application.validation.error"),
          description: t("application.validation.academicInfoIncomplete"),
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 4) {
      // التحقق من اختيار البرنامج
      if (!formData.program?.name || !formData.university) {
        toast({
          title: t("application.validation.error"),
          description: t("application.validation.programSelectionIncomplete"),
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };

  // العودة للخطوة السابقة
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // الانتقال للخطوة التالية أو إرسال الطلب
  const handleNext = () => {
    if (!validateCurrentStep()) return;

    // حفظ الطلب
    const applicationData = {
      ...formData,
      status: 'draft',
      id: formData.id || `APP-${Math.floor(1000 + Math.random() * 9000)}`
    };
    
    saveApplicationToStorage({
      id: applicationData.id,
      status: 'draft',
      program: formData.program?.name || 'برنامج غير معروف',
      university: formData.university || 'جامعة غير معروفة',
      date: new Date().toISOString().split('T')[0],
      formData: applicationData
    });
    
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      
      // تحديث التقدم
      const calculatedProgress = getApplicationProgress(formData);
      setProgress(calculatedProgress);
    }
  };

  // تحديث بيانات النموذج
  const updateFormData = (step: number, data: any) => {
    setFormData(prevData => {
      let updatedData;
      
      switch(step) {
        case 1:
          updatedData = { ...prevData, personalInfo: { ...prevData.personalInfo, ...data } };
          break;
        case 2:
          updatedData = { ...prevData, documents: data };
          break;
        case 3:
          updatedData = { ...prevData, academicInfo: { ...prevData.academicInfo, ...data } };
          break;
        case 4:
          updatedData = { ...prevData, program: data.program, university: data.university };
          break;
        default:
          updatedData = prevData;
      }
      
      // تحديث التقدم
      const calculatedProgress = getApplicationProgress(updatedData);
      setProgress(calculatedProgress);
      
      return updatedData;
    });
  };

  const isFormComplete = () => {
    // التحقق من اكتمال جميع البيانات المطلوبة للطلب
    return (
      formData.personalInfo?.firstName && 
      formData.personalInfo?.lastName &&
      formData.academicInfo?.education &&
      formData.program?.name &&
      formData.university
    );
  };

  // حفظ الطلب كمسودة
  const handleSaveAsDraft = () => {
    try {
      // تجهيز بيانات الطلب
      const applicationData = {
        id: formData.id || `APP-${Math.floor(1000 + Math.random() * 9000)}`,
        program: formData.program?.name || 'برنامج غير معروف',
        university: formData.university || 'جامعة غير معروفة',
        date: new Date().toISOString().split('T')[0],
        status: 'draft',
        formData: formData,
      };
      
      // حفظ بيانات الطلب
      const saved = saveApplicationToStorage(applicationData);
      
      if (saved) {
        toast({
          title: t('application.draft.saved'),
          description: t('application.draft.savedDescription'),
        });
      } else {
        throw new Error('Failed to save application draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: t('application.draft.error'),
        description: t('application.draft.errorDescription'),
        variant: 'destructive'
      });
    }
  };

  // العودة إلى قائمة الطلبات
  const handleBackToList = () => {
    if (progress > 0) {
      setShowDiscardDialog(true);
    } else {
      navigate('/dashboard/applications');
    }
  };

  // عند تغيير القسم من صفحة المراجعة
  const handleEditSection = (section: string) => {
    switch (section) {
      case 'personal':
        setCurrentStep(1);
        break;
      case 'documents':
        setCurrentStep(2);
        break;
      case 'academic':
        setCurrentStep(3);
        break;
      case 'program':
        setCurrentStep(4);
        break;
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <PersonalInfoForm 
            initialData={formData.personalInfo} 
            onSave={(data) => updateFormData(1, data)}
          />
        );
      case 2:
        return (
          <DocumentsUploadForm 
            initialDocuments={formData.documents} 
            onSave={(data) => updateFormData(2, data)}
          />
        );
      case 3:
        return (
          <AcademicInfoForm 
            initialData={formData.academicInfo} 
            onSave={(data) => updateFormData(3, data)}
          />
        );
      case 4:
        return (
          <ProgramSelectionForm 
            initialData={{ program: formData.program, university: formData.university }}
            onSave={(data) => updateFormData(4, data)}
          />
        );
      case 5:
        return (
          <ApplicationReview 
            formData={formData} 
            onEdit={handleEditSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <StudentApplicationHeader />
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleBackToList}
            >
              <ArrowLeft className="h-4 w-4" />
              {t('application.buttons.backToList', 'العودة للقائمة')}
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleSaveAsDraft}
                  >
                    <Save className="h-4 w-4" />
                    {t('application.buttons.saveAsDraft', 'حفظ كمسودة')}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('application.buttons.saveAsDraftTooltip', 'حفظ بياناتك الحالية كمسودة للعودة إليها لاحقًا')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">{t('application.progress', 'تقدم الطلب')}</span>
            <span>{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className={`h-2 ${progress >= 75 ? 'bg-green-500' : progress >= 50 ? 'bg-unlimited-blue' : progress >= 25 ? 'bg-yellow-500' : 'bg-red-400'}`} 
          />
        </div>
        
        <Card className="p-6">
          <ApplicationSteps currentStep={currentStep} />
          
          <div className="mb-6">
            {renderStepContent()}
          </div>
          
          {currentStep < 5 ? (
            <StudentApplicationFormSubmit
              isLastStep={false}
              isSubmitting={isSubmitting}
              canSubmit={canSubmit}
              currentStep={currentStep}
              formData={formData}
              progress={progress}
              onBack={handleBack}
              onSubmit={handleNext}
            />
          ) : (
            <div className="mt-8">
              <ApplicationSubmissionHandler 
                formData={formData} 
                onSubmit={() => {
                  // تم إرسال الطلب بنجاح
                  toast({
                    title: t("application.submission.success"),
                    description: t("application.submission.successMessage")
                  });
                }}
              />
            </div>
          )}
        </Card>
      </div>

      {/* Dialog to confirm discarding changes */}
      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              {t('application.discard.title', 'مغادرة الصفحة')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('application.discard.description', 'هل أنت متأكد من أنك تريد مغادرة هذه الصفحة؟ قد تفقد التغييرات التي لم يتم حفظها.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t('application.discard.cancel', 'إلغاء')}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
              onClick={() => {
                handleSaveAsDraft();
                navigate('/dashboard/applications');
              }}
            >
              {t('application.discard.saveAndExit', 'حفظ والخروج')}
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => navigate('/dashboard/applications')}
            >
              {t('application.discard.discardChanges', 'تجاهل التغييرات')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default StudentApplication;
