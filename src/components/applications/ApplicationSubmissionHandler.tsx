
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '@/services/applicationService';
import { useAuth } from '@/hooks/useAuth';
import { Check, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Application } from '@/types/supabase';

interface ApplicationSubmissionHandlerProps {
  formData: any;
  onSubmit: () => void;
}

const ApplicationSubmissionHandler = ({
  formData,
  onSubmit
}: ApplicationSubmissionHandlerProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user?.id) {
      toast({
        title: t("application.validation.error", "خطأ في التحقق"),
        description: t("application.validation.notLoggedIn", "يجب تسجيل الدخول لتقديم الطلب"),
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create application in Supabase
      const applicationData: Partial<Application> = {
        student_id: user.id,
        university_id: formData.university?.id || 0,
        program_id: formData.program?.id || 0,
        status: 'pending' as Application['status'],
        personal_info: formData.personalInfo || {},
        academic_info: formData.academicInfo || {},
      };
      
      const { data, error } = await createApplication(applicationData);
      
      if (error) {
        throw new Error(error);
      }
      
      // Call onSubmit callback
      onSubmit();

      // Show success message
      toast({
        title: t("application.submission.success", "تم تقديم الطلب بنجاح"),
        description: t("application.submission.successMessage", "سيتم مراجعة طلبك في أقرب وقت ممكن")
      });

      // Navigate to application details
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
  };

  return (
    <Button 
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="w-full sm:w-auto bg-unlimited-blue hover:bg-unlimited-dark-blue"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('application.buttons.submitting', 'جاري الإرسال...')}
        </>
      ) : (
        <>
          <Check className="mr-2 h-4 w-4" />
          {t('application.buttons.submit', 'تقديم الطلب')}
        </>
      )}
    </Button>
  );
};

export default ApplicationSubmissionHandler;
