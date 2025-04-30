
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { hasValidSupabaseCredentials } from '@/lib/supabase';

interface StudentApplicationFormSubmitProps {
  isSubmitting?: boolean;
  university?: any;
  program?: any;
  isValid: boolean;
  onSubmit: () => void;
}

const StudentApplicationFormSubmit = ({
  isSubmitting = false,
  university,
  program,
  isValid,
  onSubmit
}: StudentApplicationFormSubmitProps) => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [supabaseConfigured] = useState(hasValidSupabaseCredentials());
  const isRtl = i18n.language === 'ar';

  const validateApplicationData = () => {
    const errors: string[] = [];
    
    if (!university?.id) {
      errors.push(t("application.validation.noUniversity", "يرجى اختيار الجامعة"));
    }
    
    if (!program?.id) {
      errors.push(t("application.validation.noProgram", "يرجى اختيار البرنامج"));
    }
    
    return errors;
  };

  const handleSubmit = () => {
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
    
    if (!isValid) {
      toast({
        title: t("application.validation.error", "خطأ في التحقق"),
        description: t("application.validation.completeAllFields", "يرجى إكمال جميع الحقول المطلوبة"),
        variant: "destructive"
      });
      return;
    }

    // التحقق من صحة البيانات
    const errors = validateApplicationData();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // استدعاء وظيفة onSubmit
    onSubmit();
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
      
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting || !isValid || !supabaseConfigured}
        className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
      >
        {isSubmitting ? (
          <>
            <Loader2 className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4 animate-spin`} />
            {t('application.buttons.submitting', 'جاري الإرسال...')}
          </>
        ) : (
          <>
            <Check className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4`} />
            {t('application.buttons.submit', 'تقديم الطلب')}
          </>
        )}
      </Button>
    </div>
  );
};

export default StudentApplicationFormSubmit;
