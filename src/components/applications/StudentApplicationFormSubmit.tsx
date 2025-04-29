
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createApplication } from '@/services/applicationService';
import { useAuth } from '@/hooks/useAuth';
import { Application } from '@/types/supabase';
import { hasValidSupabaseCredentials } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StudentApplicationFormSubmitProps {
  isLastStep: boolean;
  isSubmitting: boolean;
  canSubmit: boolean;
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
}

const StudentApplicationFormSubmit = ({
  isLastStep,
  isSubmitting: propIsSubmitting,
  canSubmit,
  formData,
  onBack,
  onSubmit
}: StudentApplicationFormSubmitProps) => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(propIsSubmitting);
  const [supabaseConfigured, setSupabaseConfigured] = useState(hasValidSupabaseCredentials());
  const isRtl = i18n.language === 'ar';

  const validateApplicationData = () => {
    const errors: string[] = [];
    
    if (!user?.id) {
      errors.push(t("application.validation.notLoggedIn", "يجب تسجيل الدخول لتقديم الطلب"));
    }
    
    if (!formData.university?.id) {
      errors.push(t("application.validation.noUniversity", "يرجى اختيار الجامعة"));
    }
    
    if (!formData.program?.id) {
      errors.push(t("application.validation.noProgram", "يرجى اختيار البرنامج"));
    }
    
    if (!formData.personalInfo?.firstName || !formData.personalInfo?.lastName) {
      errors.push(t("application.validation.incompletePersonalInfo", "المعلومات الشخصية غير مكتملة"));
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    // التحقق من تكوين Supabase
    if (!supabaseConfigured) {
      toast({
        title: t("supabase.setup.required", "إعداد Supabase مطلوب"),
        description: t("supabase.setup.configureFirst", "يجب تكوين Supabase قبل تقديم الطلب"),
        variant: "destructive"
      });
      return;
    }
    
    // مسح الأخطاء السابقة
    setValidationErrors([]);
    
    if (!canSubmit) {
      toast({
        title: t("application.validation.error", "خطأ في التحقق"),
        description: t("application.validation.completeAllFields", "يرجى إكمال جميع الحقول المطلوبة"),
        variant: "destructive"
      });
      return;
    }

    if (isLastStep) {
      // التحقق من صحة البيانات
      const errors = validateApplicationData();
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // إنشاء الطلب في Supabase
        const applicationData: Partial<Application> = {
          student_id: user?.id || '',
          university_id: formData.university?.id || 0,
          program_id: formData.program?.id || 0,
          status: 'pending' as Application['status'], // تم تعديل نوع البيانات بشكل صريح كـ Application['status']
          personal_info: formData.personalInfo || {},
          academic_info: formData.academicInfo || {},
        };
        
        const { data, error } = await createApplication(applicationData);
        
        if (error) {
          toast({
            title: t("application.submission.error", "خطأ في تقديم الطلب"),
            description: error,
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        // استدعاء وظيفة onSubmit الأصلية
        onSubmit();

        // عرض رسالة النجاح
        toast({
          title: t("application.submission.success", "تم تقديم الطلب بنجاح"),
          description: t("application.submission.successMessage", "سيتم مراجعة طلبك في أقرب وقت ممكن")
        });

        // الانتقال إلى صفحة تفاصيل الطلب
        if (data) {
          setTimeout(() => {
            navigate(`/dashboard/applications/${data.id}`);
          }, 1500);
        } else {
          navigate('/dashboard/applications');
        }
      } catch (error: any) {
        console.error('Error submitting application:', error);
        toast({
          title: t("application.submission.error", "خطأ في تقديم الطلب"),
          description: error.message || t("application.submission.errorMessage", "حدث خطأ أثناء إرسال طلبك"),
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      onSubmit();
    }
  };

  return (
    <div className="mt-6">
      {!supabaseConfigured && (
        <Alert className="mb-4 border-yellow-300 bg-yellow-50">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            {t("supabase.setup.requiredForSubmission", "تكوين Supabase مطلوب لتقديم الطلبات. يرجى الرجوع إلى دليل الإعداد في الصفحة الرئيسية.")}
          </AlertDescription>
        </Alert>
      )}
      
      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 rounded-md">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">{t("application.validation.pleaseCorrect", "يرجى تصحيح الأخطاء التالية")}</p>
              <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className={`order-2 sm:order-1 flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}
        >
          {isRtl ? (
            <>
              {t('application.navigation.previous', 'السابق')}
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <ArrowLeft className="h-4 w-4" />
              {t('application.navigation.previous', 'السابق')}
            </>
          )}
        </Button>
        
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || (!isLastStep && !canSubmit) || (isLastStep && !supabaseConfigured)}
          className="w-full sm:w-auto order-1 sm:order-2 bg-unlimited-blue hover:bg-unlimited-dark-blue"
        >
          {isSubmitting ? (
            <>
              <Loader2 className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4 animate-spin`} />
              {t('application.buttons.submitting', 'جاري الإرسال...')}
            </>
          ) : (
            <>
              <Check className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t(isLastStep ? 'application.buttons.submit' : 'application.buttons.next', isLastStep ? 'تقديم الطلب' : 'التالي')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StudentApplicationFormSubmit;
