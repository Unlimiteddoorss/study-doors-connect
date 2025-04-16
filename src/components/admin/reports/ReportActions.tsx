
import { Download, Printer, Calendar, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePickerWithRange } from '@/components/ui/date-range-picker';

export const ReportActions = () => {
  const { toast } = useToast();

  const handleDownload = (format: 'pdf' | 'excel') => {
    toast({
      title: "جاري التحميل",
      description: `يتم الآن تحميل التقرير بصيغة ${format === 'pdf' ? 'PDF' : 'Excel'}`
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "تم إرسال التقرير إلى الطابعة"
    });
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="h-4 w-4 ml-2" />
        طباعة
      </Button>
      <Button variant="outline" onClick={() => handleDownload('pdf')}>
        <Download className="h-4 w-4 ml-2" />
        تحميل PDF
      </Button>
      <Button variant="outline" onClick={() => handleDownload('excel')}>
        <FileSpreadsheet className="h-4 w-4 ml-2" />
        تحميل Excel
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Calendar className="h-4 w-4 ml-2" />
            تغيير الفترة
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>اختر الفترة الزمنية</DialogTitle>
          </DialogHeader>
          <DatePickerWithRange className="mt-4" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

