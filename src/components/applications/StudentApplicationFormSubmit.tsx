
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Check, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

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
  const { t, i18n } = useTranslation();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const isRtl = i18n.language === 'ar';

  const handleSubmit = () => {
    // Reset validation errors
    setValidationErrors([]);
    
    if (!canSubmit) {
      // Show validation errors and prevent submission
      toast({
        title: t("application.validation.error"),
        description: t("application.validation.completeAllFields"),
        variant: "destructive"
      });
      
      // For demo purposes, show some sample validation errors
      if (isLastStep) {
        setValidationErrors([
          t("application.validation.errors.missingDocuments"),
          t("application.validation.errors.incompleteProfile")
        ]);
      }
      
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
          'value': isLastStep ? 'final_submit' : 'next_step'
        });
      } else {
        // Fallback tracking for when gtag is not available
        console.log("Google Analytics not available, tracking locally");
        // You could implement a custom event tracking solution here
      }
      
      // Additional tracking services could be added here
      
    } catch (error) {
      console.error("Analytics error:", error);
      // Don't stop the form submission if analytics fails
    }
    
    // Call the onSubmit handler
    onSubmit();
  };

  return (
    <div className="mt-6">
      {/* Validation errors display */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 rounded-md">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">{t("application.validation.pleaseCorrect")}</p>
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
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="order-2 sm:order-1 flex items-center gap-1"
        >
          {isRtl ? (
            <>
              {t('application.navigation.previous')}
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <ArrowLeft className="h-4 w-4" />
              {t('application.navigation.previous')}
            </>
          )}
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto order-1 sm:order-2 bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-1"
          >
            {isRtl ? (
              <>
                <ArrowLeft className="h-4 w-4" />
                {t('application.navigation.next')}
              </>
            ) : (
              <>
                {t('application.navigation.next')}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
      
      {isLastStep && (
        <p className="text-sm text-unlimited-gray mt-4 text-center">
          {t('application.buttons.submitNote')}
        </p>
      )}
    </div>
  );
};

export default StudentApplicationFormSubmit;
