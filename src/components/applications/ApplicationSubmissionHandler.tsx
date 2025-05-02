
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, AlertTriangle, FileText, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { 
  saveApplicationToStorage,
  getApplicationProgress,
  validateApplicationStep
} from '@/utils/applicationUtils';

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
  const [errors, setErrors] = useState<string[]>([]);
  
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

  const applicationProgress = getApplicationProgress(formData);

  const validateAllSteps = (): { isValid: boolean; errors: string[] } => {
    const allErrors: string[] = [];
    let isValid = true;
    
    // Validate all steps
    for (let step = 1; step <= 4; step++) {
      const stepValidation = validateApplicationStep(step, formData, t);
      if (!stepValidation.isValid) {
        isValid = false;
        allErrors.push(...stepValidation.errors);
      }
    }
    
    return { isValid, errors: allErrors };
  };

  const handleSubmit = async () => {
    // Reset errors
    setErrors([]);
    
    // Validate all steps
    const validation = validateAllSteps();
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast({
        title: t('application.validation.error', 'خطأ في البيانات'),
        description: t('application.validation.completeAllFields', 'يرجى إكمال جميع الحقول المطلوبة'),
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // لأغراض العرض، نقوم بتأخير إرسال النموذج لمحاكاة طلب الشبكة
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // تحضير بيانات الطلب
      const applicationData = {
        id: formData.id || `APP-${Math.floor(1000 + Math.random() * 9000)}`,
        program: formData.program?.name || 'برنامج غير معروف',
        university: formData.university || 'جامعة غير معروفة',
        date: new Date().toISOString().split('T')[0],
        status: 'submitted',
        formData: formData,
        timeline: [
          {
            id: Date.now(),
            status: 'submitted',
            date: new Date().toISOString(),
            title: t('application.status.submitted', 'تم تقديم الطلب'),
            description: t('application.status.submittedDescription', 'تم استلام طلبك وسيتم مراجعته قريبًا'),
          }
        ]
      };
      
      // حفظ بيانات الطلب
      const saved = saveApplicationToStorage(applicationData);
      
      if (!saved) {
        throw new Error('Failed to save application');
      }
      
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
      setErrors([t('error.submission', 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.')]);
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
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>{t('application.review.completion', 'اكتمال الطلب')}</span>
          <span className="font-medium">{applicationProgress}%</span>
        </div>
        <Progress 
          value={applicationProgress} 
          className={`h-2 ${
            applicationProgress >= 90 ? 'bg-green-500' : 
            applicationProgress >= 70 ? 'bg-unlimited-blue' : 
            applicationProgress >= 40 ? 'bg-yellow-500' : 'bg-red-400'
          }`} 
        />
      </div>
      
      {/* Remaining required actions */}
      {applicationProgress < 100 && (
        <div className="mb-6 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">
                {t('application.review.actionsRequired', 'إجراءات مطلوبة')}
              </h4>
              <p className="text-sm text-yellow-700 mb-2">
                {t('application.review.actionsRequiredDescription', 'يتعين عليك إكمال الخطوات التالية قبل تقديم طلبك:')}
              </p>
              <ul className="text-sm list-disc list-inside text-yellow-700">
                {!formData.personalInfo?.firstName && (
                  <li>{t('application.review.completePersonalInfo', 'إكمال المعلومات الشخصية')}</li>
                )}
                {(!formData.documents || !formData.documents.some((doc: any) => doc.status === 'uploaded')) && (
                  <li>{t('application.review.uploadDocuments', 'تحميل المستندات المطلوبة')}</li>
                )}
                {!formData.academicInfo?.education && (
                  <li>{t('application.review.completeAcademicInfo', 'إكمال المعلومات الأكاديمية')}</li>
                )}
                {!formData.program?.name && (
                  <li>{t('application.review.selectProgram', 'اختيار البرنامج والجامعة')}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Error display */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-medium text-red-800">
                {t('application.validation.pleaseCorrect', 'يرجى تصحيح الأخطاء التالية')}
              </h4>
              <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Document status summary */}
      {formData.documents && formData.documents.length > 0 && (
        <div className="mb-6 p-4 border border-blue-100 bg-blue-50 rounded-md">
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-unlimited-blue mt-0.5" />
            <div>
              <h4 className="font-medium text-unlimited-dark-blue">
                {t('application.review.documentStatus', 'حالة المستندات')}
              </h4>
              <p className="text-sm text-unlimited-gray mb-2">
                {t('application.review.documentsUploaded', 'تم تحميل {count} من أصل {total} من المستندات', { 
                  count: formData.documents.filter((doc: any) => doc.status === 'uploaded').length, 
                  total: formData.documents.length 
                })}
              </p>
              <div className="space-y-1">
                {formData.documents.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${doc.status === 'uploaded' ? 'bg-green-500' : doc.required ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm text-unlimited-dark-blue">{doc.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      doc.status === 'uploaded' ? 'bg-green-100 text-green-800' : 
                      doc.required ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status === 'uploaded' 
                        ? t('application.documents.uploaded', 'تم التحميل')
                        : doc.required 
                          ? t('application.documents.required', 'مطلوب') 
                          : t('application.documents.optional', 'اختياري')
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || applicationProgress < 70}
        className={`bg-unlimited-blue hover:bg-unlimited-dark-blue w-full ${applicationProgress < 70 ? 'opacity-70 cursor-not-allowed' : ''}`}
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
      
      {applicationProgress < 70 && (
        <p className="text-sm text-red-500 text-center mt-2">
          {t('application.review.minimumCompletion', 'يجب إكمال 70% على الأقل من الطلب للتمكن من التقديم')}
        </p>
      )}
      
      <p className="text-sm text-unlimited-gray text-center mt-4">
        {t('application.buttons.submitNote', 'بالضغط على زر التقديم، أنت توافق على شروط وأحكام الخدمة.')}
      </p>
    </div>
  );
};

export default ApplicationSubmissionHandler;
