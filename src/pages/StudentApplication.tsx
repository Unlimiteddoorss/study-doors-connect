import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { hasValidSupabaseCredentials } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

// Define application data interface
interface ApplicationData {
  personalInfo?: any;
  documents?: any[];
  academicInfo?: any;
  program?: any;
  university?: string;
}

const StudentApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [formData, setFormData] = useState<ApplicationData>({});
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRtl = i18n.language === 'ar';
  const hasSupabase = hasValidSupabaseCredentials();

  // Check if user is logged in
  if (!user) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto py-8 px-4">
          <Alert className="mb-4 border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              {t("auth.requiredLogin", "يجب تسجيل الدخول لتقديم طلب جديد.")}
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  // Validate current step data
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

  // Go to previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Go to next step or submit
  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Update form data
  const updateFormData = (step: number, data: any) => {
    setFormData(prevData => {
      switch(step) {
        case 1:
          return { ...prevData, personalInfo: { ...prevData.personalInfo, ...data } };
        case 2:
          return { ...prevData, documents: data };
        case 3:
          return { ...prevData, academicInfo: { ...prevData.academicInfo, ...data } };
        case 4:
          return { ...prevData, program: data.program, university: data.university };
        default:
          return prevData;
      }
    });
  };

  // Check if form is complete
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

  // Render current step content
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
          <ApplicationReview formData={formData} />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <StudentApplicationHeader />
        
        {!hasSupabase && (
          <Alert className="mb-4 border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              {t("supabase.setup.requiredForSubmission", "تكوين Supabase مطلوب لتقديم الطلبات. يرجى الرجوع إلى دليل الإعداد في الصفحة الرئيسية.")}
            </AlertDescription>
          </Alert>
        )}
        
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
              formData={formData}
              onBack={handleBack}
              onSubmit={handleNext}
            />
          ) : (
            <div className="mt-8">
              <ApplicationSubmissionHandler 
                formData={formData} 
                onSubmit={() => {
                  // Show success message and redirect to dashboard
                  toast({
                    title: t("application.submission.success"),
                    description: t("application.submission.successMessage")
                  });
                  navigate('/dashboard/applications');
                }}
              />
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplication;
