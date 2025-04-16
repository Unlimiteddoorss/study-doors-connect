
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

interface ApplicationSubmissionHandlerProps {
  formData?: any;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const ApplicationSubmissionHandler = ({ 
  formData, 
  onSubmit, 
  onCancel 
}: ApplicationSubmissionHandlerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    // Generate a random application number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const appNumber = `APP-${randomNumber}`;
    setApplicationNumber(appNumber);
    
    // Here you would normally save the data to a database
    console.log('Submitting application data:', formData);
    
    // Show success message
    toast({
      title: "تم تقديم الطلب بنجاح",
      description: `رقم الطلب الخاص بك هو ${appNumber}`,
    });
    
    // Open the confirmation dialog
    setIsDialogOpen(true);
    
    // Call the onSubmit callback if provided
    if (onSubmit) onSubmit();
  };

  const viewApplicationStatus = () => {
    navigate('/dashboard/applications');
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-end space-x-4 rtl:space-x-reverse mt-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
        )}
        <Button onClick={handleFormSubmit}>
          تقديم الطلب
        </Button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تم تقديم طلبك بنجاح</AlertDialogTitle>
            <AlertDialogDescription>
              <p>
                شكراً لتقديمك الطلب. تم تسجيل طلبك برقم:
                <span className="block text-center font-bold text-xl my-3 text-unlimited-blue">
                  {applicationNumber}
                </span>
              </p>
              <p className="mt-2">
                يمكنك متابعة حالة طلبك من لوحة التحكم الخاصة بك، وسيتم إشعارك بأي تغييرات في حالة الطلب.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={viewApplicationStatus}>
              متابعة حالة الطلب
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApplicationSubmissionHandler;
