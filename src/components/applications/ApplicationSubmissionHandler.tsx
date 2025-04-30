
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');

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

  const generateApplicationId = () => {
    // إنشاء رقم طلب فريد بتنسيق خاص
    const prefix = 'APP';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const timestamp = new Date().getTime().toString().slice(-4);
    return `${prefix}-${randomNum}-${timestamp}`;
  };

  const handleConfirmSubmit = () => {
    if (!isFormComplete()) {
      setError(t('application.validation.completeAllFields', 'يرجى إكمال جميع الحقول المطلوبة'));
      toast({
        title: t('application.validation.error', 'خطأ في البيانات'),
        description: t('application.validation.completeAllFields', 'يرجى إكمال جميع الحقول المطلوبة'),
        variant: 'destructive'
      });
      setShowConfirmDialog(false);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // إنشاء رقم طلب جديد
      const newApplicationId = generateApplicationId();
      setApplicationId(newApplicationId);

      // لأغراض العرض، نقوم بتأخير إرسال النموذج لمحاكاة طلب الشبكة
      setTimeout(async () => {
        try {
          // محاكاة حفظ البيانات في التخزين المحلي
          const submittedApplications = localStorage.getItem('studentApplications');
          const existingApplications = submittedApplications ? JSON.parse(submittedApplications) : [];
          
          const newApplication = {
            id: newApplicationId,
            program: formData.program?.name || 'برنامج غير معروف',
            university: formData.university || 'جامعة غير معروفة',
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            formData: formData,
            timeline: [
              {
                status: 'pending',
                date: new Date().toISOString(),
                note: 'تم استلام الطلب وهو قيد المراجعة'
              }
            ]
          };
          
          existingApplications.push(newApplication);
          localStorage.setItem('studentApplications', JSON.stringify(existingApplications));
          
          // تنفيذ دالة الإرسال المرسلة من المكون الأب
          onSubmit();
          
          // إظهار حالة الاكتمال
          setSubmissionComplete(true);
          setIsSubmitting(false);
          
          // عرض رسالة نجاح
          toast({
            title: t('application.submission.success', 'تم التقديم بنجاح'),
            description: t('application.submission.successMessage', 'تم تقديم طلبك بنجاح وسيتم مراجعته قريباً'),
          });
          
        } catch (err) {
          console.error('Error in submission timeout:', err);
          handleSubmissionError();
        }
      }, 2000);
      
    } catch (err) {
      console.error('Error submitting application:', err);
      handleSubmissionError();
    }
  };
  
  const handleSubmissionError = () => {
    setIsSubmitting(false);
    setError(t('error.submission', 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.'));
    toast({
      title: t('error.title', 'خطأ'),
      description: t('error.submission', 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.'),
      variant: 'destructive'
    });
    setShowConfirmDialog(false);
  };

  const handleViewApplication = () => {
    // التوجيه إلى صفحة تفاصيل الطلب
    navigate(`/dashboard/applications/${applicationId}`);
  };
  
  const handleViewAllApplications = () => {
    // التوجيه إلى صفحة الطلبات
    navigate('/dashboard/applications');
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
        onClick={() => setShowConfirmDialog(true)}
        className="bg-unlimited-blue hover:bg-unlimited-dark-blue w-full"
        size="lg"
      >
        <Check className="mr-2 h-5 w-5" />
        {t('application.buttons.submit', 'تقديم الطلب')}
      </Button>
      
      <p className="text-sm text-unlimited-gray text-center mt-4">
        {t('application.buttons.submitNote', 'بالضغط على زر التقديم، أنت توافق على شروط وأحكام الخدمة.')}
      </p>

      {/* نافذة تأكيد إرسال الطلب */}
      <Dialog open={showConfirmDialog && !submissionComplete} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('application.confirmation.title', 'تأكيد تقديم الطلب')}</DialogTitle>
            <DialogDescription>
              {t('application.confirmation.description', 'هل أنت متأكد من رغبتك في تقديم هذا الطلب؟ لا يمكن تعديل المعلومات بعد التقديم.')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md bg-yellow-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {t('application.confirmation.warning', 'يرجى التأكد من صحة جميع المعلومات قبل التقديم.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              {t('application.buttons.cancel', 'إلغاء')}
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSubmit}
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('application.buttons.submitting', 'جاري التقديم...')}
                </>
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  {t('application.buttons.confirmSubmit', 'تأكيد التقديم')}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة اكتمال التقديم وعرض رقم الطلب */}
      <Dialog open={submissionComplete} onOpenChange={(open) => {
        if (!open) handleViewApplication();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              {t('application.success.title', 'تم تقديم الطلب بنجاح')}
            </DialogTitle>
            <DialogDescription>
              {t('application.success.description', 'تهانينا! تم تقديم طلبك بنجاح وسيتم مراجعته من قبل فريقنا.')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="rounded-md bg-green-50 p-6 mb-4 text-center">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                {t('application.success.applicationNumber', 'رقم الطلب')}
              </h3>
              <p className="text-2xl font-bold text-unlimited-dark-blue tracking-wide">
                {applicationId}
              </p>
              <p className="text-sm text-green-600 mt-2">
                {t('application.success.saveNumber', 'يرجى الاحتفاظ بهذا الرقم للرجوع إليه في المستقبل')}
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col space-y-2">
            <Button
              onClick={handleViewApplication}
              className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
            >
              {t('application.success.viewApplication', 'عرض تفاصيل الطلب')}
            </Button>
            <Button
              onClick={handleViewAllApplications}
              variant="outline"
              className="w-full"
            >
              {t('application.success.viewAllApplications', 'عرض جميع الطلبات')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationSubmissionHandler;
