
import { Download, Printer, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const ReportActions = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "جاري التحميل",
      description: "يتم الآن تحميل التقرير بصيغة PDF"
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "تم إرسال التقرير إلى الطابعة"
    });
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="h-4 w-4 ml-2" />
        طباعة
      </Button>
      <Button variant="outline" onClick={handleDownload}>
        <Download className="h-4 w-4 ml-2" />
        تحميل التقرير
      </Button>
      <Button>
        <Calendar className="h-4 w-4 ml-2" />
        تغيير الفترة
      </Button>
    </div>
  );
};
