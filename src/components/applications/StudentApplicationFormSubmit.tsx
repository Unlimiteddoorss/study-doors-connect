
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Check, ArrowLeft, Loader2 } from 'lucide-react';

interface StudentApplicationFormSubmitProps {
  isLastStep: boolean;
  isSubmitting: boolean;
  canSubmit: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

const StudentApplicationFormSubmit = ({
  isLastStep,
  isSubmitting,
  canSubmit,
  onBack,
  onSubmit
}: StudentApplicationFormSubmitProps) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!canSubmit) {
      toast({
        title: "تحقق من البيانات",
        description: "يرجى إكمال جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    onSubmit();
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isSubmitting}
        className="order-2 sm:order-1 flex items-center gap-1"
      >
        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        السابق
      </Button>
      {isLastStep ? (
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto order-1 sm:order-2 bg-unlimited-blue hover:bg-unlimited-dark-blue"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري التقديم...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> تقديم الطلب
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto order-1 sm:order-2 bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-1"
        >
          التالي
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        </Button>
      )}
    </div>
  );
};

export default StudentApplicationFormSubmit;
