
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StudentApplicationFormSubmitProps {
  isLastStep: boolean;
  isSubmitting: boolean;
  canSubmit: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

const StudentApplicationFormSubmit = ({
  isLastStep,
  isSubmitting,
  canSubmit,
  onBack,
  onSubmit
}: StudentApplicationFormSubmitProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!canSubmit) {
      toast({
        title: "تحقق من البيانات",
        description: "يرجى إكمال جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    // Track submission in analytics
    try {
      console.log("Tracking form submission");
      // يمكنك إضافة تتبع التحليلات الحقيقي هنا
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          'event_category': 'application',
          'event_label': 'student_application'
        });
      }
    } catch (error) {
      console.error("Analytics error:", error);
    }
    
    onSubmit();
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isSubmitting}
        className="order-2 sm:order-1 flex items-center gap-1"
      >
        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        {t('application.navigation.previous')}
      </Button>
      {isLastStep ? (
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto order-1 sm:order-2 bg-unlimited-blue hover:bg-unlimited-dark-blue"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('application.buttons.submitting')}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> {t('application.buttons.submit')}
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto order-1 sm:order-2 bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-1"
        >
          {t('application.navigation.next')}
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        </Button>
      )}
    </div>
  );
};

export default StudentApplicationFormSubmit;
