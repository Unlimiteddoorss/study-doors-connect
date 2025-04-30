
import { useState } from 'react';

interface SubmissionHandlerProps {
  onSubmit: (data: any) => Promise<{ success: boolean; applicationId?: string; error?: string }>;
  children: React.ReactNode;
}

const ApplicationSubmissionHandler: React.FC<SubmissionHandlerProps> = ({
  onSubmit,
  children
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | undefined>(undefined);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onSubmit(data);
      
      if (result.success) {
        setIsSuccess(true);
        if (result.applicationId) {
          setApplicationId(result.applicationId);
        }
      } else {
        setError(result.error || 'حدث خطأ غير معروف أثناء إرسال الطلب');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع أثناء إرسال الطلب');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
    setApplicationId(undefined);
  };

  return (
    <div>
      {children({
        isSubmitting,
        isSuccess,
        error,
        applicationId,
        handleSubmit,
        resetForm
      })}
    </div>
  );
};

export default ApplicationSubmissionHandler;
