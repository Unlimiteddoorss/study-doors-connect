
import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import StudentApplicationHeader from '@/components/student/StudentApplicationHeader';
import ApplicationSteps from '@/components/student/ApplicationSteps';
import PersonalInfoForm from '@/components/student/PersonalInfoForm';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentApplicationFormSubmit from '@/components/applications/StudentApplicationFormSubmit';
import { useTranslation } from 'react-i18next';
import DocumentsUploadForm from '@/components/student/DocumentsUploadForm';
import AcademicInfoForm from '@/components/student/AcademicInfoForm';
import ProgramSelectionForm from '@/components/student/ProgramSelectionForm';
import ApplicationReview from '@/components/student/ApplicationReview';
import ApplicationSubmissionHandler from '@/components/applications/ApplicationSubmissionHandler';
import { saveApplicationToStorage, getApplicationProgress } from '@/utils/applicationUtils';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Save, AlertTriangle, ArrowLeft, FileText, BookOpen, User, School, CheckCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

// Define the application data interface
interface ApplicationData {
  id?: string;
  personalInfo?: any;
  documents?: any[];
  academicInfo?: any;
  program?: any;
  university?: string;
  status?: string;
}

const StudentApplication = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [formData, setFormData] = useState<ApplicationData>({});
  const [progress, setProgress] = useState(0);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [autoSaveIndicator, setAutoSaveIndicator] = useState<null | 'saving' | 'saved' | 'error'>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();
  const location = useLocation();
  const autoSaveTimerRef = useRef<number | null>(null);

  // Load application data from localStorage
  useEffect(() => {
    if (id) {
      try {
        const existingApplications = localStorage.getItem('studentApplications');
        if (existingApplications) {
          const applications = JSON.parse(existingApplications);
          const application = applications.find((app: any) => app.id === id);
          
          if (application && application.formData) {
            setFormData(application.formData);
            // Set step based on progress
            const calculatedProgress = getApplicationProgress(application.formData);
            if (calculatedProgress >= 75) setCurrentStep(5); // Review
            else if (calculatedProgress >= 50) setCurrentStep(4); // Program Selection
            else if (calculatedProgress >= 25) setCurrentStep(3); // Academic Info
            else if (calculatedProgress > 0) setCurrentStep(2); // Documents
            else setCurrentStep(1); // Personal Info
          }
        }
      } catch (error) {
        console.error('Error loading application data:', error);
      }
    }
    
    // Update progress
    const calculatedProgress = getApplicationProgress(formData);
    setProgress(calculatedProgress);
  }, [id, formData]);

  // Auto-scroll to top on step change
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  // Auto-save feature
  useEffect(() => {
    // Only auto-save if we have some data and are past step 1
    if (Object.keys(formData).length > 0 && (formData.personalInfo || formData.documents || formData.academicInfo)) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      
      setAutoSaveIndicator('saving');
      
      autoSaveTimerRef.current = window.setTimeout(() => {
        try {
          handleSaveAsDraft();
          setAutoSaveIndicator('saved');
          setTimeout(() => setAutoSaveIndicator(null), 2000);
        } catch (error) {
          console.error("Auto-save error:", error);
          setAutoSaveIndicator('error');
          setTimeout(() => setAutoSaveIndicator(null), 3000);
        }
      }, 3000) as unknown as number;
    }
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [formData]);

  // Validate the current step data
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      // Validate personal info
      if (!formData.personalInfo?.firstName || !formData.personalInfo?.lastName) {
        toast({
          title: t("application.validation.error"),
          description: t("application.validation.personalInfoIncomplete"),
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 2) {
      // Validate documents - just warn if none uploaded
      if (!formData.documents || formData.documents.length === 0) {
        toast({
          title: t("application.validation.warning"),
          description: t("application.validation.noDocumentsUploaded"),
        });
        // Continue anyway - documents might not be ready
        return true;
      }
    } else if (currentStep === 3) {
      // Validate academic info
      if (!formData.academicInfo?.education) {
        toast({
          title: t("application.validation.error"),
          description: t("application.validation.academicInfoIncomplete"),
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 4) {
      // Validate program selection
      if (!formData.program?.name || !formData.university) {
        toast({
          title: t("application.validation.error"),
          description: t("application.validation.programSelectionIncomplete"),
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };

  // Go back to previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Go to next step
  const handleNext = () => {
    if (!validateCurrentStep()) return;

    // Save application
    const applicationData = {
      ...formData,
      status: 'draft',
      id: formData.id || `APP-${Math.floor(1000 + Math.random() * 9000)}`
    };
    
    saveApplicationToStorage({
      id: applicationData.id,
      status: 'draft',
      program: formData.program?.name || 'برنامج غير معروف',
      university: formData.university || 'جامعة غير معروفة',
      date: new Date().toISOString().split('T')[0],
      formData: applicationData
    });
    
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      
      // Update progress
      const calculatedProgress = getApplicationProgress(formData);
      setProgress(calculatedProgress);
    }
  };

  // Update form data based on step
  const updateFormData = (step: number, data: any) => {
    setFormData(prevData => {
      let updatedData;
      
      switch(step) {
        case 1:
          updatedData = { ...prevData, personalInfo: { ...prevData.personalInfo, ...data } };
          break;
        case 2:
          updatedData = { ...prevData, documents: data };
          break;
        case 3:
          updatedData = { ...prevData, academicInfo: { ...prevData.academicInfo, ...data } };
          break;
        case 4:
          updatedData = { ...prevData, program: data.program, university: data.university };
          break;
        default:
          updatedData = prevData;
      }
      
      // Update progress
      const calculatedProgress = getApplicationProgress(updatedData);
      setProgress(calculatedProgress);
      
      return updatedData;
    });
  };

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.personalInfo?.firstName && 
      formData.personalInfo?.lastName &&
      formData.academicInfo?.education &&
      formData.program?.name &&
      formData.university
    );
  };

  // Save application as draft
  const handleSaveAsDraft = () => {
    try {
      // Prepare application data
      const applicationData = {
        id: formData.id || `APP-${Math.floor(1000 + Math.random() * 9000)}`,
        program: formData.program?.name || 'برنامج غير معروف',
        university: formData.university || 'جامعة غير معروفة',
        date: new Date().toISOString().split('T')[0],
        status: 'draft',
        formData: formData,
      };
      
      // Save application data
      const saved = saveApplicationToStorage(applicationData);
      
      if (saved) {
        // Only show toast when manually saving
        if (autoSaveIndicator !== 'saving') {
          toast({
            title: t('application.draft.saved'),
            description: t('application.draft.savedDescription'),
          });
        }
        return true;
      } else {
        throw new Error('Failed to save application draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: t('application.draft.error'),
        description: t('application.draft.errorDescription'),
        variant: 'destructive'
      });
      return false;
    }
  };

  // Go back to applications list
  const handleBackToList = () => {
    if (progress > 0) {
      setShowDiscardDialog(true);
    } else {
      navigate('/dashboard/applications');
    }
  };

  // Edit a specific section from review page
  const handleEditSection = (section: string) => {
    switch (section) {
      case 'personal':
        setCurrentStep(1);
        break;
      case 'documents':
        setCurrentStep(2);
        break;
      case 'academic':
        setCurrentStep(3);
        break;
      case 'program':
        setCurrentStep(4);
        break;
    }
  };

  // Get step icon
  const getStepIcon = (step: number) => {
    switch(step) {
      case 1: return <User className="h-5 w-5" />;
      case 2: return <FileText className="h-5 w-5" />;
      case 3: return <BookOpen className="h-5 w-5" />;
      case 4: return <School className="h-5 w-5" />;
      case 5: return <CheckCheck className="h-5 w-5" />;
      default: return null;
    }
  };

  // Get tab value for current step
  const getTabValue = () => {
    switch(currentStep) {
      case 1: return 'personal';
      case 2: return 'documents';
      case 3: return 'academic'; 
      case 4: return 'program';
      case 5: return 'review';
      default: return 'personal';
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    switch(value) {
      case 'personal': setCurrentStep(1); break;
      case 'documents': setCurrentStep(2); break;
      case 'academic': setCurrentStep(3); break;
      case 'program': setCurrentStep(4); break;
      case 'review': setCurrentStep(5); break;
    }
  };

  // Render content for current step
  const renderStepContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <PersonalInfoForm 
              initialData={formData.personalInfo} 
              onSave={(data) => updateFormData(1, data)}
            />
          )}
          {currentStep === 2 && (
            <DocumentsUploadForm 
              initialDocuments={formData.documents} 
              onSave={(data) => updateFormData(2, data)}
            />
          )}
          {currentStep === 3 && (
            <AcademicInfoForm 
              initialData={formData.academicInfo} 
              onSave={(data) => updateFormData(3, data)}
            />
          )}
          {currentStep === 4 && (
            <ProgramSelectionForm 
              initialData={{ program: formData.program, university: formData.university }}
              onSave={(data) => updateFormData(4, data)}
            />
          )}
          {currentStep === 5 && (
            <ApplicationReview 
              formData={formData} 
              onEdit={handleEditSection}
            />
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <StudentApplicationHeader />
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleBackToList}
            >
              <ArrowLeft className="h-4 w-4" />
              {t('application.buttons.backToList', 'العودة للقائمة')}
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1 relative"
                    onClick={handleSaveAsDraft}
                  >
                    <Save className="h-4 w-4" />
                    {t('application.buttons.saveAsDraft', 'حفظ كمسودة')}
                    
                    {/* Auto-save indicator */}
                    {autoSaveIndicator && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs">
                        {autoSaveIndicator === 'saving' && (
                          <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full text-xs">
                            {t('application.autoSave.saving', 'جارِ الحفظ...')}
                          </span>
                        )}
                        {autoSaveIndicator === 'saved' && (
                          <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">
                            {t('application.autoSave.saved', 'تم الحفظ')}
                          </span>
                        )}
                        {autoSaveIndicator === 'error' && (
                          <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs">
                            {t('application.autoSave.error', 'خطأ')}
                          </span>
                        )}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('application.buttons.saveAsDraftTooltip', 'حفظ بياناتك الحالية كمسودة للعودة إليها لاحقًا')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">{t('application.progress', 'تقدم الطلب')}</span>
            <span>{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className={`h-2 ${
              progress >= 75 ? 'bg-green-500' : 
              progress >= 50 ? 'bg-unlimited-blue' : 
              progress >= 25 ? 'bg-yellow-500' : 'bg-red-400'
            }`} 
          />
        </div>
        
        <Card className="p-6" ref={formRef}>
          {/* Desktop Tabs for easier navigation */}
          <div className="hidden md:block mb-6">
            <Tabs 
              defaultValue={getTabValue()} 
              value={getTabValue()}
              onValueChange={handleTabChange} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="personal" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('application.steps.personal', 'البيانات الشخصية')}</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('application.steps.documents', 'المستندات')}</span>
                </TabsTrigger>
                <TabsTrigger value="academic" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('application.steps.academic', 'المعلومات الأكاديمية')}</span>
                </TabsTrigger>
                <TabsTrigger value="program" className="flex items-center gap-1">
                  <School className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('application.steps.program', 'البرنامج')}</span>
                </TabsTrigger>
                <TabsTrigger value="review" className="flex items-center gap-1">
                  <CheckCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('application.steps.review', 'المراجعة')}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Mobile Steps */}
          <div className="block md:hidden mb-6">
            <ApplicationSteps currentStep={currentStep} />
          </div>
          
          <div className="mb-6">
            {renderStepContent()}
          </div>
          
          <Separator className="my-6" />
          
          {currentStep < 5 ? (
            <StudentApplicationFormSubmit
              isLastStep={false}
              isSubmitting={isSubmitting}
              canSubmit={canSubmit}
              currentStep={currentStep}
              formData={formData}
              progress={progress}
              onBack={handleBack}
              onSubmit={handleNext}
              onSaveAsDraft={handleSaveAsDraft}
            />
          ) : (
            <div className="mt-8">
              <ApplicationSubmissionHandler 
                formData={formData} 
                onSubmit={() => {
                  // Application submitted successfully
                  toast({
                    title: t("application.submission.success"),
                    description: t("application.submission.successMessage")
                  });
                }}
              />
            </div>
          )}
        </Card>
      </div>

      {/* Dialog to confirm discarding changes */}
      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              {t('application.discard.title', 'مغادرة الصفحة')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('application.discard.description', 'هل أنت متأكد من أنك تريد مغادرة هذه الصفحة؟ قد تفقد التغييرات التي لم يتم حفظها.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t('application.discard.cancel', 'إلغاء')}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
              onClick={() => {
                handleSaveAsDraft();
                navigate('/dashboard/applications');
              }}
            >
              {t('application.discard.saveAndExit', 'حفظ والخروج')}
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => navigate('/dashboard/applications')}
            >
              {t('application.discard.discardChanges', 'تجاهل التغييرات')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default StudentApplication;
