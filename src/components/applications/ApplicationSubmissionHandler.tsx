
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { createApplication } from "@/services/applicationService";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Check, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { hasValidSupabaseCredentials } from "@/lib/supabase";

interface ApplicationSubmissionHandlerProps {
  formData: any;
  onSubmit: () => void;
}

const ApplicationSubmissionHandler = ({ formData, onSubmit }: ApplicationSubmissionHandlerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [supabaseConfigured] = useState(hasValidSupabaseCredentials());

  const handleSubmit = async () => {
    if (!supabaseConfigured) {
      setError(t("supabase.setup.required", "يجب تكوين Supabase أولاً"));
      return;
    }

    if (!user?.id) {
      setError(t("application.auth.required", "يجب تسجيل الدخول لتقديم الطلب"));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.personalInfo?.firstName || !formData.personalInfo?.lastName) {
        throw new Error(t("application.validation.personalInfoIncomplete", "المعلومات الشخصية غير مكتملة"));
      }

      if (!formData.academicInfo?.education) {
        throw new Error(t("application.validation.academicInfoIncomplete", "المعلومات الأكاديمية غير مكتملة"));
      }

      if (!formData.program?.name || !formData.university) {
        throw new Error(t("application.validation.programSelectionIncomplete", "لم يتم اختيار البرنامج أو الجامعة"));
      }

      // Prepare application data for submission
      const applicationData = {
        student_id: user.id,
        university_id: formData.university?.id || 1, // Fallback to default if missing
        program_id: formData.program?.id || 1, // Fallback to default if missing
        personal_info: formData.personalInfo || {},
        academic_info: formData.academicInfo || {},
        status: 'pending',
      };

      // Create application in database
      const { data, error: apiError } = await createApplication(applicationData);

      if (apiError) {
        throw new Error(apiError);
      }

      // Call the onSubmit callback
      onSubmit();

      // Display success message
      toast({
        title: t("application.submission.success", "تم تقديم الطلب بنجاح"),
        description: t("application.submission.successMessage", "سيتم مراجعة طلبك في أقرب وقت ممكن"),
      });

      // Navigate to the application details page
      if (data) {
        navigate(`/dashboard/applications/${data.id}`);
      } else {
        navigate('/dashboard/applications');
      }
    } catch (err: any) {
      console.error('Application submission error:', err);
      setError(err.message || t("application.submission.error", "حدث خطأ أثناء تقديم الطلب"));
      
      toast({
        title: t("application.submission.error", "خطأ في تقديم الطلب"),
        description: err.message || t("application.submission.errorMessage", "حدث خطأ أثناء تقديم طلبك"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert className="border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-800" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {!supabaseConfigured && (
        <Alert className="border-yellow-300 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            {t("supabase.setup.requiredForSubmission", "تكوين Supabase مطلوب لتقديم الطلبات. يرجى الرجوع إلى دليل الإعداد")}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !supabaseConfigured || !user}
          className="px-10 py-6 text-lg bg-unlimited-blue hover:bg-unlimited-blue/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t("application.buttons.submitting", "جاري تقديم الطلب...")}
            </>
          ) : (
            <>
              <Check className="mr-2 h-5 w-5" />
              {t("application.buttons.submitApplication", "تقديم الطلب")}
            </>
          )}
        </Button>
      </div>

      <p className="text-center text-sm text-unlimited-gray pt-4">
        {t("application.submission.notice", "بالضغط على زر التقديم، أنت توافق على شروط وأحكام التقديم للجامعة")}
      </p>
    </div>
  );
};

export default ApplicationSubmissionHandler;
