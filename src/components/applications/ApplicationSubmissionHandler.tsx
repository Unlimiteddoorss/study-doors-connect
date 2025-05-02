
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ApplicationSubmissionHandlerProps {
  formData: any;
  onSubmit: () => void;
}

const ApplicationSubmissionHandler = ({
  formData,
  onSubmit
}: ApplicationSubmissionHandlerProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // تحقق من اكتمال جميع البيانات المطلوبة
  const isFormComplete = () => {
    const hasPersonalInfo = formData.personalInfo?.firstName && 
                           formData.personalInfo?.lastName && 
                           formData.personalInfo?.email;
                           
    const hasDocuments = formData.documents?.some((doc: any) => doc.status === 'uploaded');
    
    const hasAcademicInfo = formData.academicInfo?.education;
    
    const hasProgramSelection = formData.program?.name && formData.university;
    
    return hasPersonalInfo && hasAcademicInfo && hasProgramSelection;
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) {
      setError(t('application.validation.completeAllFields', 'يرجى إكمال جميع الحقول المطلوبة'));
      toast({
        title: t('application.validation.error', 'خطأ في البيانات'),
        description: t('application.validation.completeAllFields', 'يرجى إكمال جميع الحقول المطلوبة'),
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // لأغراض العرض، نقوم بتأخير إرسال النموذج لمحاكاة طلب الشبكة
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // محاكاة حفظ البيانات في التخزين المحلي
      const submittedApplications = localStorage.getItem('studentApplications');
      const existingApplications = submittedApplications ? JSON.parse(submittedApplications) : [];
      
      const newApplication = {
        id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
        program: formData.program?.name || 'برنامج غير معروف',
        university: formData.university || 'جامعة غير معروفة',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        formData: formData
      };
      
      existingApplications.push(newApplication);
      localStorage.setItem('studentApplications', JSON.stringify(existingApplications));
      
      // تنفيذ دالة الإرسال المرسلة من المكون الأب
      onSubmit();
      
      // عرض رسالة نجاح
      toast({
        title: t('application.submission.success', 'تم التقديم بنجاح'),
        description: t('application.submission.successMessage', 'تم تقديم طلبك بنجاح وسيتم مراجعته قريباً'),
      });
      
      // التوجيه إلى صفحة الطلبات
      setTimeout(() => {
        navigate('/dashboard/applications');
      }, 1500);
      
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(t('error.submission', 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.'));
      toast({
        title: t('error.title', 'خطأ'),
        description: t('error.submission', 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      {error && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}
      
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-unlimited-blue hover:bg-unlimited-dark-blue w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t('application.buttons.submitting', 'جاري التقديم...')}
          </>
        ) : (
          <>
            <Check className="mr-2 h-5 w-5" />
            {t('application.buttons.submit', 'تقديم الطلب')}
          </>
        )}
      </Button>
      
      <p className="text-sm text-unlimited-gray text-center mt-4">
        {t('application.buttons.submitNote', 'بالضغط على زر التقديم، أنت توافق على شروط وأحكام الخدمة.')}
      </p>
    </div>
  );
};

export default ApplicationSubmissionHandler;
