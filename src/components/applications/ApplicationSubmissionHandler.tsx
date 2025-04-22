
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
import { Check, FileText, Loader2 } from 'lucide-react';

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
  documents: {
    name: string;
    status: 'uploaded' | 'required' | 'approved';
  }[];
  formData?: any;
}

const ApplicationSubmissionHandler = ({ 
  formData, 
  onSubmit, 
  onCancel 
}: ApplicationSubmissionHandlerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate a unique application number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const appNumber = `APP-${randomNumber}`;
    setApplicationNumber(appNumber);
    
    // Prepare application object
    const newApplication: StoredApplication = {
      id: appNumber,
      program: formData?.program?.name || "برنامج جديد",
      programId: formData?.program?.id,
      university: formData?.university || "الجامعة",
      status: "pending", // Initial status
      date: new Date().toISOString().split('T')[0],
      statusColor: 'text-yellow-600 bg-yellow-100',
      messages: 0,
      studentName: formData?.personalInfo?.fullName || localStorage.getItem('userName') || "طالب",
      studentId: localStorage.getItem('userId') || "user-" + Date.now(),
      documents: [
        { name: 'جواز السفر', status: 'required' },
        { name: 'الشهادة الدراسية', status: 'required' },
        { name: 'صورة شخصية', status: 'required' }
      ],
      formData: formData // Store the complete form data
    };

    try {
      // تجهيز البيانات للإرسال
      const payload = {
        application: newApplication,
        submitDate: new Date().toISOString(),
        applicantIP: await fetchUserIP(),
        source: window.location.hostname,
        referrer: document.referrer
      };

      // Send application data to your actual server API
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api-endpoint.com/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // يمكنك إضافة token للمصادقة إذا كان مطلوبًا
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('فشل في إرسال الطلب');
      }

      const result = await response.json();
      console.log('Application submitted to server:', result);
      
      // إضافة البيانات إلى التخزين المحلي أيضًا كنسخة احتياطية
      const existingApplicationsString = localStorage.getItem('studentApplications');
      const existingApplications = existingApplicationsString 
        ? JSON.parse(existingApplicationsString) 
        : [];
      
      existingApplications.push(newApplication);
      localStorage.setItem('studentApplications', JSON.stringify(existingApplications));
      
      // إضافة البيانات إلى تطبيقات المشرفين أيضًا
      const adminAppsString = localStorage.getItem('adminApplications');
      const adminApps = adminAppsString ? JSON.parse(adminAppsString) : [];
      adminApps.push({
        ...newApplication,
        status: "pending", // Make sure it's pending for admin review
      });
      localStorage.setItem('adminApplications', JSON.stringify(adminApps));
      
      // Show success toast
      toast({
        title: "تم تقديم الطلب بنجاح",
        description: `رقم الطلب الخاص بك هو ${appNumber}`,
        variant: "default",
      });
      
      // Open confirmation dialog
      setIsDialogOpen(true);
      
      // Call onSubmit callback if provided
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "حدث خطأ أثناء تقديم الطلب",
        description: "يرجى المحاولة مرة أخرى لاحقًا أو التواصل مع الدعم الفني",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get user IP address
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
            إلغاء
          </Button>
        )}
        <Button 
          onClick={handleFormSubmit} 
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> جاري التقديم...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              تقديم الطلب
            </>
          )}
        </Button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center text-unlimited-blue">
              تم تقديم طلبك بنجاح
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-50 p-3">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <p className="text-center">
                شكراً لتقديمك الطلب. تم تسجيل طلبك برقم:
                <span className="block text-center font-bold text-xl my-3 text-unlimited-blue">
                  {applicationNumber}
                </span>
              </p>
              <p className="text-center">
                يمكنك متابعة حالة طلبك من لوحة التحكم الخاصة بك، وسيتم إشعارك بأي تغييرات في حالة الطلب.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-center">
            <AlertDialogAction 
              onClick={viewApplicationStatus}
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-2 w-full sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              متابعة حالة الطلب
            </AlertDialogAction>
            <Button
              variant="outline"
              onClick={goToHomePage}
              className="w-full sm:w-auto"
            >
              العودة للرئيسية
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApplicationSubmissionHandler;
