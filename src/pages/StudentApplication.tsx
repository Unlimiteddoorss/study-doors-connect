
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';
import StudentApplicationFormSubmit from '@/components/applications/StudentApplicationFormSubmit';
import ApplicationSubmissionHandler from '@/components/applications/ApplicationSubmissionHandler';

const StudentApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);

  const handleApplicationSubmit = async (data) => {
    setFormData(data);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          applicationId: 'APP-' + Math.random().toString(36).substring(2, 8).toUpperCase()
        });
      }, 2000);
    });
  };

  return (
    <DashboardLayout userRole="student">
      <div className="container py-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-unlimited-dark-blue">تقديم طلب التحاق</h1>

        <ApplicationSubmissionHandler onSubmit={handleApplicationSubmit}>
          {({ isSubmitting, isSuccess, error, applicationId, handleSubmit, resetForm }) => (
            <>
              {!isSubmitting && !isSuccess && !error ? (
                <StudentApplicationForm 
                  onSubmit={(data) => {
                    toast({
                      title: "تم استلام بياناتك",
                      description: "جاري معالجة طلبك...",
                    });
                    handleSubmit(data);
                  }}
                />
              ) : (
                <StudentApplicationFormSubmit
                  isSubmitting={isSubmitting}
                  isSuccess={isSuccess}
                  error={error}
                  applicationId={applicationId}
                  onReset={resetForm}
                />
              )}
            </>
          )}
        </ApplicationSubmissionHandler>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplication;
