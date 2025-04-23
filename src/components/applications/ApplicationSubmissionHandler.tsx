import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Check, FileText, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ApplicationSubmissionHandlerProps {
  formData?: any;
  onSubmit?: () => void;
  onCancel?: () => void;
}

// Interface for stored application
interface StoredApplication {
  id: string;
  program: string;
  programId?: number;
  university: string;
  status: string;
  date: string;
  statusColor: string;
  messages: number;
  studentId?: string;
  studentName?: string;
  academicYear?: string;
  semester?: string;
  pinCode?: string;
  scholarshipStatus?: string;
  assignedTo?: string;
  documents: {
    name: string;
    status: 'uploaded' | 'required' | 'approved';
  }[];
  formData?: any;
}

// API endpoint from environment variable
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.unlimited-education.com/api/applications';

const ApplicationSubmissionHandler = ({ 
  formData, 
  onSubmit, 
  onCancel 
}: ApplicationSubmissionHandlerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionProgress, setSubmissionProgress] = useState<number>(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // Function to handle form submission
  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSubmissionProgress(10);
    
    try {
      // Generate unique application number with current date prefix
      const now = new Date();
      const datePrefix = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      const appNumber = `APP-${datePrefix}-${randomNumber}`;
      setApplicationNumber(appNumber);
      setSubmissionProgress(20);
      
      // Get current semester based on date
      const semester = now.getMonth() >= 8 || now.getMonth() <= 1 ? 'Fall' : 'Spring';
      const academicYear = `${now.getFullYear()}-${now.getFullYear() + 1}`;
      
      // Prepare new application object
      const newApplication: StoredApplication = {
        id: appNumber,
        program: formData?.program?.name || "برنامج جديد",
        programId: formData?.program?.id,
        university: formData?.university?.name || formData?.university || "الجامعة",
        status: "pending", // Initial status
        date: new Date().toISOString().split('T')[0],
        statusColor: 'text-yellow-600 bg-yellow-100',
        messages: 0,
        studentName: formData?.personalInfo?.fullName || localStorage.getItem('userName') || "طالب",
        studentId: localStorage.getItem('userId') || "user-" + Date.now(),
        academicYear,
        semester,
        pinCode: Math.floor(10000000 + Math.random() * 90000000).toString(),
        documents: [
          { name: t('documents.passport'), status: 'required' },
          { name: t('documents.diploma'), status: 'required' },
          { name: t('documents.photo'), status: 'required' },
          { name: t('documents.transcript'), status: 'required' },
          { name: t('documents.motivation'), status: 'required' }
        ],
        formData: formData // Store full form data
      };

      setSubmissionProgress(40);

      try {
        // Prepare payload for API with additional metadata
        const payload = {
          application: newApplication,
          submitDate: new Date().toISOString(),
          applicantIP: await fetchUserIP(),
          source: window.location.hostname,
          referrer: document.referrer,
          sessionId: localStorage.getItem('sessionId') || generateSessionId(),
          language: localStorage.getItem('language') || i18n.language,
          userAgent: navigator.userAgent,
          screen: {
            width: window.screen.width,
            height: window.screen.height
          },
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        console.log("Sending application data to API:", API_ENDPOINT);
        setSubmissionProgress(60);

        // Check if we have a valid API endpoint before attempting API call
        if (API_ENDPOINT && API_ENDPOINT !== 'https://api.unlimited-education.com/api/applications') {
          // Send application data to API with retry mechanism
          const response = await fetchWithRetry(API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-Application-Source': 'web',
              // Add auth token if available
              ...(localStorage.getItem('authToken') ? {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
              } : {})
            },
            body: JSON.stringify(payload)
          }, 3); // Retry up to 3 times

          setSubmissionProgress(80);

          // Parse response
          const responseData = await response.json();

          // Validate response
          if (!response.ok) {
            throw new Error(responseData.message || t('application.error.submitFailed'));
          }

          console.log('Application submitted successfully:', responseData);
          
          // If API returns updated application data, use it
          if (responseData.application) {
            saveApplicationToLocalStorage(responseData.application);
          } else {
            // Otherwise use our local version
            saveApplicationToLocalStorage(newApplication);
          }
        } else {
          // No valid API endpoint, just use local storage
          console.log('No valid API endpoint specified, saving to local storage only');
          setSubmissionProgress(80);
          saveApplicationToLocalStorage(newApplication);
        }
        
        setSubmissionProgress(100);
        
        // Show success toast
        toast({
          title: t('application.success.submitted'),
          description: t('application.success.submittedWithId', { id: appNumber }),
          variant: "default",
        });
        
        // Show confirmation dialog
        setIsDialogOpen(true);
        
        // Call onSubmit callback if provided
        if (onSubmit) onSubmit();

      } catch (apiError: any) {
        console.error('Error during API submission:', apiError);
        
        // Save locally even if API fails
        saveApplicationToLocalStorage(newApplication);
        
        if (apiError.message.includes('Network') || apiError.message.includes('CORS')) {
          // Show error but also success for local storage
          setError(t('application.error.networkIssue'));
          
          toast({
            title: t('application.partialSuccess.title'),
            description: t('application.partialSuccess.description'),
            variant: "default",
          });
          
          // Still show dialog with application number
          setIsDialogOpen(true);
          
          // Call onSubmit callback if provided
          if (onSubmit) onSubmit();
        } else {
          // Critical error
          setError(t('application.error.submitFailed'));
          toast({
            title: t('application.error.title'),
            description: apiError.message || t('application.error.description'),
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error in submission process:', error);
      setError(t('application.error.general'));
      toast({
        title: t('application.error.title'),
        description: t('application.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch with retry mechanism for handling network issues
  const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, delay = 1000) => {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (retries <= 1) throw err;
      
      // Wait for the specified delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry with one fewer retry remaining
      console.log(`Retrying fetch, ${retries-1} retries left`);
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
  };

  // Save application to localStorage
  const saveApplicationToLocalStorage = (application: StoredApplication) => {
    try {
      // Add to student applications
      const existingApplicationsString = localStorage.getItem('studentApplications');
      const existingApplications = existingApplicationsString 
        ? JSON.parse(existingApplicationsString) 
        : [];
      
      // Check if application already exists, update it if so
      const existingIndex = existingApplications.findIndex((app: any) => app.id === application.id);
      if (existingIndex >= 0) {
        existingApplications[existingIndex] = application;
      } else {
        existingApplications.push(application);
      }
      
      localStorage.setItem('studentApplications', JSON.stringify(existingApplications));
      
      // Add to admin applications too (for demo purposes)
      const adminAppsString = localStorage.getItem('adminApplications');
      const adminApps = adminAppsString ? JSON.parse(adminAppsString) : [];
      
      // Check if admin application exists
      const existingAdminIndex = adminApps.findIndex((app: any) => app.id === application.id);
      if (existingAdminIndex >= 0) {
        adminApps[existingAdminIndex] = {
          ...application,
          status: application.status, // Keep the same status
        };
      } else {
        adminApps.push({
          ...application,
          status: "pending", // Ensure it's pending for admin review
        });
      }
      
      localStorage.setItem('adminApplications', JSON.stringify(adminApps));

      console.log('Application saved to local storage');
    } catch (error) {
      console.error('Error saving application to local storage:', error);
    }
  };

  // Helper function to get user IP
  const fetchUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
      return 'unknown';
    }
  };

  // Generate unique session ID
  const generateSessionId = () => {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('sessionId', sessionId);
    return sessionId;
  };

  // Check for unsent applications on component load
  useEffect(() => {
    // Sync pending applications function
    const syncPendingApplications = async () => {
      try {
        // Check if there's anything to sync
        const pendingSync = localStorage.getItem('pendingApplicationSync');
        if (!pendingSync) return;
        
        const pendingApps = JSON.parse(pendingSync);
        if (!pendingApps.length) return;
        
        console.log(`Found ${pendingApps.length} pending applications to sync`);
        
        // Try to sync each pending application
        for (const app of pendingApps) {
          try {
            const response = await fetch(`${API_ENDPOINT}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Application-Source': 'web-sync',
              },
              body: JSON.stringify(app)
            });
            
            if (response.ok) {
              // Remove from pending list
              const updatedPending = pendingApps.filter((a: any) => a.application.id !== app.application.id);
              localStorage.setItem('pendingApplicationSync', JSON.stringify(updatedPending));
              
              console.log(`Successfully synced application ${app.application.id}`);
            }
          } catch (syncError) {
            console.error(`Failed to sync application ${app.application.id}:`, syncError);
            // Keep in pending list for next attempt
          }
        }
      } catch (error) {
        console.error("Error syncing pending applications:", error);
      }
    };

    // Only sync if API endpoint is available and valid
    if (API_ENDPOINT && API_ENDPOINT !== 'https://api.unlimited-education.com/api/applications') {
      syncPendingApplications();
    }
  }, []);

  // Navigation functions
  const viewApplicationStatus = () => {
    navigate('/dashboard/applications');
    setIsDialogOpen(false);
  };

  const goToHomePage = () => {
    navigate('/');
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-end space-x-4 rtl:space-x-reverse mt-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2" disabled={isSubmitting}>
            {t('application.buttons.cancel')}
          </Button>
        )}
        <Button 
          onClick={handleFormSubmit} 
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {t('application.buttons.submitting')}
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              {t('application.buttons.submit')}
            </>
          )}
        </Button>
      </div>

      {isSubmitting && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div 
              className="bg-unlimited-blue h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${submissionProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-unlimited-gray text-center">
            {submissionProgress < 50 
              ? t('application.progress.preparing') 
              : submissionProgress < 80 
                ? t('application.progress.submitting')
                : t('application.progress.finalizing')
            }
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-md flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-800">{t('application.error.title')}</h4>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center text-unlimited-blue">
              {t('application.dialog.submitted')}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-50 p-3">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <p className="text-center">
                {t('application.dialog.thanks')}
                <span className="block text-center font-bold text-xl my-3 text-unlimited-blue">
                  {applicationNumber}
                </span>
              </p>
              <p className="text-center">
                {t('application.dialog.followUp')}
              </p>
              
              {/* Application summary */}
              <div className="border rounded-md p-4 mt-4 bg-gray-50">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-unlimited-gray">{t('application.summary.program')}:</span>
                    <span className="font-medium">{formData?.program?.name || "برنامج جديد"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-unlimited-gray">{t('application.summary.university')}:</span>
                    <span>{formData?.university?.name || formData?.university || "الجامعة"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-unlimited-gray">{t('application.summary.date')}:</span>
                    <span>{new Date().toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-center">
            <AlertDialogAction 
              onClick={viewApplicationStatus}
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-2 w-full sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              {t('application.dialog.viewStatus')}
            </AlertDialogAction>
            <Button
              variant="outline"
              onClick={goToHomePage}
              className="w-full sm:w-auto"
            >
              {t('application.dialog.home')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApplicationSubmissionHandler;
