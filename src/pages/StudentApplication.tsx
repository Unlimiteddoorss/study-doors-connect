import { useState } from 'react';
import { Card } from "@/components/ui/card";
import StudentApplicationHeader from '@/components/student/StudentApplicationHeader';
import ApplicationSteps from '@/components/student/ApplicationSteps';
import PersonalInfoForm from '@/components/student/PersonalInfoForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Check, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentApplicationFormSubmit from '@/components/applications/StudentApplicationFormSubmit';

const StudentApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      // Handle final submission
      setTimeout(() => {
        setIsSubmitting(false);
        // Navigate to applications list or show success message
      }, 2000);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <StudentApplicationHeader />
        
        <Card className="p-6">
          <ApplicationSteps currentStep={currentStep} />
          
          {currentStep === 1 && <PersonalInfoForm />}
          {/* Add other step components here */}
          
          <StudentApplicationFormSubmit
            isLastStep={currentStep === 5}
            isSubmitting={isSubmitting}
            canSubmit={canSubmit}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplication;
