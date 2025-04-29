
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createApplication } from '@/services/applicationService';
import { useAuth } from '@/hooks/useAuth';
import { Application } from '@/types/supabase';

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
  const isRtl = i18n.language === 'ar';

  const handleSubmit = async () => {
    setValidationErrors([]);
    
    if (!canSubmit) {
      toast({
        title: t("application.validation.error"),
        description: t("application.validation.completeAllFields"),
        variant: "destructive"
      });
      return;
    }

    if (isLastStep) {
      setIsSubmitting(true);
      
      try {
        // Create the application in Supabase
        const applicationData: Partial<Application> = {
          student_id: user?.id || '',
          university_id: formData.university?.id || 0,
          program_id: formData.program?.id || 0,
          status: 'pending' as Application['status'], // Fixed type issue by explicitly typing as Application['status']
          personal_info: formData.personalInfo || {},
          academic_info: formData.academicInfo || {},
        };
        
        const { data, error } = await createApplication(applicationData);
        
        if (error) {
          toast({
            title: t("application.submission.error"),
            description: error,
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        // Call the original onSubmit
        onSubmit();

        // Show success message
        toast({
          title: t("application.submission.success"),
          description: t("application.submission.successMessage")
        });

        // Navigate to the application details page
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
          title: t("application.submission.error"),
          description: error.message || t("application.submission.errorMessage"),
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
        
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto order-1 sm:order-2 bg-unlimited-blue hover:bg-unlimited-dark-blue"
        >
          {isSubmitting ? (
            <>
              <Loader2 className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4 animate-spin`} />
              {t('application.buttons.submitting')}
            </>
          ) : (
            <>
              <Check className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t(isLastStep ? 'application.buttons.submit' : 'application.buttons.next')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StudentApplicationFormSubmit;
