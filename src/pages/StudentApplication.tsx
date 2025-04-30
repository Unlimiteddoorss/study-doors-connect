
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';
import StudentApplicationFormSubmit from '@/components/applications/StudentApplicationFormSubmit';
import ApplicationSubmissionHandler from '@/components/applications/ApplicationSubmissionHandler';
import StudentApplicationHeader from '@/components/student/StudentApplicationHeader';

const StudentApplication = () => {
  const [step, setStep] = useState<'form' | 'review' | 'submitting' | 'completed'>('form');
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | undefined>(undefined);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setStep('review');
  };

  const handleReviewBack = () => {
    setStep('form');
  };

  const submitApplication = async () => {
    if (!formData) return;
    
    setStep('submitting');
    setIsSubmitting(true);
    
    try {
      // Here we would normally submit the application data to the backend
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate a random application ID
      const generatedId = `APP-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      setApplicationId(generatedId);
      
      setIsSubmitSuccess(true);
      setStep('completed');
      
      // Show success toast
      toast({
        title: "تم إرسال طلبك بنجاح",
        description: `رقم الطلب: ${generatedId}`,
      });
      
      // Add the application to local storage for demo purposes
      try {
        const existingApps = localStorage.getItem('studentApplications');
        const applications = existingApps ? JSON.parse(existingApps) : [];
        
        applications.push({
          id: generatedId,
          date: new Date().toISOString().split('T')[0],
          program: formData.desiredProgram,
          university: formData.desiredUniversity,
          status: 'pending',
          statusColor: 'text-yellow-600 bg-yellow-100',
        });
        
        localStorage.setItem('studentApplications', JSON.stringify(applications));
      } catch (error) {
        console.error('Error saving application to local storage', error);
      }
      
      return { success: true, applicationId: generatedId };
    } catch (error) {
      setSubmitError("حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.");
      setIsSubmitSuccess(false);
      return { success: false, error: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى." };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(null);
    setStep('form');
    setIsSubmitSuccess(false);
    setSubmitError(null);
    setApplicationId(undefined);
  };

  const viewApplication = () => {
    if (applicationId) {
      navigate(`/dashboard/applications/${applicationId}`);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'form':
        return <StudentApplicationForm onSubmit={handleFormSubmit} />;
      
      case 'review':
        if (!formData) return null;
        
        const applicationDataForReview = {
          personalInfo: {
            fullName: `${formData.firstName} ${formData.middleName} ${formData.lastName}`,
            nationality: formData.nationality,
            residence: formData.residenceCountry,
          },
          educationInfo: {
            level: formData.educationLevel === 'highschool' ? 'الثانوية العامة' : 
                  formData.educationLevel === 'bachelor' ? 'بكالوريوس' : 
                  formData.educationLevel === 'master' ? 'ماجستير' : 'دكتوراه',
            university: formData.universityName,
          },
          programInfo: {
            university: formData.desiredUniversity,
            program: formData.desiredProgram,
            degreeLevel: formData.degreeLevel === 'bachelor' ? 'بكالوريوس' : 
                        formData.degreeLevel === 'master' ? 'ماجستير' : 'دكتوراه',
            academicYear: formData.academicYear,
          }
        };
        
        return (
          <StudentApplicationFormSubmit 
            onSubmit={submitApplication}
            onCancel={handleReviewBack}
            applicationData={applicationDataForReview}
          />
        );
      
      case 'submitting':
      case 'completed':
        return (
          <ApplicationSubmissionHandler
            isSubmitting={isSubmitting}
            isSuccess={isSubmitSuccess}
            error={submitError}
            applicationId={applicationId}
            handleSubmit={submitApplication}
            resetForm={resetForm}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-16">
        <StudentApplicationHeader showNewButton={false} />
        {renderStep()}
      </div>
    </DashboardLayout>
  );
};

export default StudentApplication;
