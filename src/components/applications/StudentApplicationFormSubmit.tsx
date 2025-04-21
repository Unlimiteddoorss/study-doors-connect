
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!canSubmit) {
      toast({
        title: t('form.checkData'),
        description: t('form.completeAllRequiredFields'),
        variant: "destructive"
      });
      return;
    }
    
    // Log submission attempt for debugging
    console.log('Submitting student application form');
    
    onSubmit();
    
    if (isLastStep) {
      // After successful submission, we'll redirect to dashboard in ApplicationSubmissionHandler
      console.log('Final step submission completed');
    }
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
        {t('form.previous')}
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('form.submitting')}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> {t('form.submitApplication')}
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
          {t('form.next')}
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        </Button>
      )}
    </div>
  );
};

export default StudentApplicationFormSubmit;
