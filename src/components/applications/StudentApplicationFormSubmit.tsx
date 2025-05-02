
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Check, ArrowLeft, Loader2, AlertTriangle, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { validateApplicationStep } from '@/utils/applicationUtils';
import { useNavigate } from 'react-router-dom';

// Define window interface to support gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void;
  }
}

interface StudentApplicationFormSubmitProps {
  isLastStep: boolean;
  isSubmitting: boolean;
  canSubmit: boolean;
  currentStep: number;
  formData: any;
  progress: number;
  onBack: () => void;
  onSubmit: () => void;
  onSaveAsDraft?: () => void;
}

const StudentApplicationFormSubmit = ({
  isLastStep,
  isSubmitting,
  canSubmit,
  currentStep,
  formData,
  progress,
  onBack,
  onSubmit,
  onSaveAsDraft
}: StudentApplicationFormSubmitProps) => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = () => {
    // For demo purposes, we consider the user as authenticated if there's a userRole in localStorage
    return !!localStorage.getItem('userRole');
  };

  const handleSubmit = () => {
    // Check authentication first
    if (!isAuthenticated()) {
      toast({
        title: t("auth.required", "تسجيل الدخول مطلوب"),
        description: t("auth.pleaseLogin", "يرجى تسجيل الدخول للمتابعة"),
        variant: "destructive"
      });
      
      // Save current progress to localStorage
      if (onSaveAsDraft) {
        onSaveAsDraft();
        
        toast({
          title: t("application.draft.saved", "تم حفظ المسودة"),
          description: t("application.draft.redirectLogin", "سيتم توجيهك لصفحة تسجيل الدخول"),
        });
      }
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/login', { state: { returnUrl: '/apply' } });
      }, 1500);
      
      return;
    }
    
    // Reset validation errors
    setValidationErrors([]);
    
    // Validate the current step
    const { isValid, errors } = validateApplicationStep(currentStep, formData, t);
    
    if (!isValid) {
      // Show validation errors and prevent submission
      toast({
        title: t("application.validation.error", "خطأ في البيانات"),
        description: t("application.validation.completeAllFields", "يرجى إكمال جميع الحقول المطلوبة"),
        variant: "destructive"
      });
      
      setValidationErrors(errors);
      return;
    }
    
    // Track submission in analytics
    try {
      console.log("Tracking form submission event");
      
      // Handle Google Analytics tracking properly
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          'event_category': 'application',
          'event_label': 'student_application',
          'value': isLastStep ? 'final_submit' : 'next_step',
          'step': currentStep
        });
      } else {
        // Fallback tracking for when gtag is not available
        console.log("Google Analytics not available, tracking locally");
      }
    } catch (error) {
      console.error("Analytics error:", error);
      // Don't stop the form submission if analytics fails
    }
    
    // Call the onSubmit handler
    onSubmit();
    
    // Show success toast for better UX
    if (isLastStep) {
      toast({
        title: t("application.submission.success", "تم التقديم بنجاح"),
        description: t("application.submission.successMessage", "تم تقديم طلبك بنجاح وسيتم مراجعته قريباً"),
      });
    } else {
      toast({
        title: t("application.step.saved", "تم حفظ البيانات"),
        description: t("application.step.savedDescription", "تم حفظ بيانات هذه الخطوة بنجاح"),
      });
    }
  };

  const handleSaveDraft = () => {
    if (onSaveAsDraft) {
      onSaveAsDraft();
      
      toast({
        title: t("application.draft.saved", "تم حفظ المسودة"),
        description: t("application.draft.savedDescription", "يمكنك العودة لاستكمال الطلب لاحقاً"),
      });
    }
  };

  return (
    <div className="mt-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-medium">{t('application.progress', 'تقدم الطلب')}</span>
          <span>{progress}%</span>
        </div>
        <Progress 
          value={progress} 
          className={`h-2 ${
            progress >= 75 ? 'bg-green-500' : 
            progress >= 50 ? 'bg-unlimited-blue' : 
            progress >= 25 ? 'bg-yellow-500' : 'bg-red-400'
          }`} 
        />
      </div>
      
      {/* Validation errors display */}
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
      
      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className={`order-2 sm:order-1 flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            {isRtl ? (
              <>
                {t('application.navigation.previous', "السابق")}
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" />
                {t('application.navigation.previous', "السابق")}
              </>
            )}
          </Button>
        )}
        
        {/* Save as draft button */}
        {onSaveAsDraft && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleSaveDraft}
            className="order-3 sm:order-2 flex items-center gap-1"
          >
            <Save className="h-4 w-4 mr-1" />
            {t('application.buttons.saveAsDraft', 'حفظ كمسودة')}
          </Button>
        )}
        
        {isLastStep ? (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto order-1 sm:order-3 bg-unlimited-blue hover:bg-unlimited-dark-blue"
          >
            {isSubmitting ? (
              <>
                <Loader2 className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4 animate-spin`} /> 
                {t('application.buttons.submitting', "جاري التقديم...")}
              </>
            ) : (
              <>
                <Check className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4`} /> 
                {t('application.buttons.submit', "تقديم الطلب")}
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full sm:w-auto order-1 sm:order-3 bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            {isRtl ? (
              <>
                <ArrowLeft className="h-4 w-4" />
                {t('application.navigation.next', "التالي")}
              </>
            ) : (
              <>
                {t('application.navigation.next', "التالي")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
      
      {isLastStep && (
        <p className="text-sm text-unlimited-gray mt-4 text-center">
          {t('application.buttons.submitNote', "بالضغط على زر التقديم، أنت توافق على شروط وأحكام الخدمة.")}
        </p>
      )}
    </div>
  );
};

export default StudentApplicationFormSubmit;
