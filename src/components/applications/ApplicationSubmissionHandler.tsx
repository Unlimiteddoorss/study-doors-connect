
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
}

const ApplicationSubmissionHandler = ({ 
  formData, 
  onSubmit, 
  onCancel,
  universityId,
  programId
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
      submissionDate: new Date().toISOString(),
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a random application number
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      const appNumber = `APP-${randomNumber}`;
      setApplicationNumber(appNumber);
      
      // Here you would normally save the data to a database
      console.log('Submitting application data:', submitData);
      
      // Show success message
      toast({
        title: "تم تقديم الطلب بنجاح",
        description: `رقم الطلب الخاص بك هو ${appNumber}`,
        variant: "default",
      });
      
      // Open the confirmation dialog
      setIsDialogOpen(true);
      setIsSubmitting(false);
      
      // Call the onSubmit callback if provided
      if (onSubmit) onSubmit();
      
      // Store application in local storage for demo purposes
      const applications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
      applications.push({
        id: appNumber,
        status: 'pending',
        lastUpdate: new Date().toLocaleDateString('ar-SA'),
        program: submitData.programName || 'برنامج جامعي',
        university: submitData.universityName || 'جامعة إسطنبول جيليشيم',
        date: new Date().toLocaleDateString('ar-SA'),
      });
      localStorage.setItem('studentApplications', JSON.stringify(applications));
      
    }, 1500); // Simulating network delay
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
