import { useState } from 'react';
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
  universityId?: number;
  programId?: number;
  universityName?: string;
  programName?: string;
}

const ApplicationSubmissionHandler = ({ 
  formData, 
  onSubmit, 
  onCancel,
  universityId,
  programId,
  universityName,
  programName
}: ApplicationSubmissionHandlerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    
    // Include university and program ID in the form data if available
    const submitData = {
      ...formData,
      universityId: universityId || null,
      programId: programId || null,
      universityName: universityName || 'جامعة إسطنبول جيليشيم',
      programName: programName || 'برنامج جامعي',
      submissionDate: new Date().toISOString(),
    };
    
    // Generate a random application number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const appNumber = `APP-${randomNumber}`;
    setApplicationNumber(appNumber);
    
    console.log('Submitting application data:', submitData);
    
    // Store application in local storage with complete details for students to track
    const currentDate = new Date();
    
    // Student applications storage
    const applications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    applications.push({
      id: appNumber,
      status: 'pending',
      lastUpdate: currentDate.toLocaleDateString('ar-SA'),
      program: submitData.programName,
      university: submitData.universityName,
      date: currentDate.toLocaleDateString('ar-SA'),
      personalInfo: {
        name: submitData.fullName || formData?.personalInfo?.fullName,
        email: submitData.email || formData?.personalInfo?.email,
        phone: submitData.phone || formData?.personalInfo?.phone,
        nationality: submitData.nationality || formData?.personalInfo?.nationality,
      },
      programDetails: {
        programId: submitData.programId,
        universityId: submitData.universityId,
        image: "/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png" // Default university image
      },
      documents: submitData.documents || [],
      submissionTimestamp: currentDate.getTime()
    });
    localStorage.setItem('studentApplications', JSON.stringify(applications));
    
    // Admin applications storage - separate to keep admin data isolated
    const adminApplications = JSON.parse(localStorage.getItem('adminApplications') || '[]');
    adminApplications.push({
      id: appNumber,
      status: 'pending',
      lastUpdate: currentDate.toLocaleDateString('ar-SA'),
      submissionDate: currentDate.toLocaleDateString('ar-SA'),
      program: submitData.programName,
      university: submitData.universityName,
      studentName: submitData.fullName || formData?.personalInfo?.fullName,
      studentEmail: submitData.email || formData?.personalInfo?.email,
      studentPhone: submitData.phone || formData?.personalInfo?.phone,
      nationality: submitData.nationality || formData?.personalInfo?.nationality,
      unread: true,
      important: false,
      notes: [],
      programDetails: {
        programId: submitData.programId,
        universityId: submitData.universityId,
      },
      documents: submitData.documents || [],
      submissionTimestamp: currentDate.getTime()
    });
    localStorage.setItem('adminApplications', JSON.stringify(adminApplications));
    
    // Show success message
    toast({
      title: "تم تقديم الطلب بنجاح",
      description: `رقم الطلب الخاص بك هو ${appNumber}`,
      variant: "default",
    });
    
    // Open the confirmation dialog
    setTimeout(() => {
      setIsDialogOpen(true);
      setIsSubmitting(false);
      
      // Call the onSubmit callback if provided
      if (onSubmit) onSubmit();
    }, 1000);
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
