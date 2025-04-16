
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
      description: `يتم الآن تحميل التقرير بصيغة ${format === 'pdf' ? 'PDF' : 'Excel'}`,
      variant: "default",
    });

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "تم التحميل بنجاح",
        description: `تم تحميل التقرير بصيغة ${format === 'pdf' ? 'PDF' : 'Excel'} بنجاح`,
        variant: "success",
      });
    }, 2000);
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "تم إرسال التقرير إلى الطابعة",
      variant: "default",
    });
    window.print();
  };

  const handleDateChange = (range: { from: Date; to: Date }) => {
    if (range.from && range.to) {
      toast({
        title: "تم تحديث الفترة الزمنية",
        description: `تم تحديث التقرير للفترة من ${range.from.toLocaleDateString('ar-SA')} إلى ${range.to.toLocaleDateString('ar-SA')}`,
        variant: "success",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        onClick={handlePrint}
        className="hover:bg-gray-100 transition-colors"
      >
        <Printer className="h-4 w-4 ml-2" />
        طباعة
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleDownload('pdf')}
        className="hover:bg-gray-100 transition-colors"
      >
        <Download className="h-4 w-4 ml-2" />
        تحميل PDF
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleDownload('excel')}
        className="hover:bg-gray-100 transition-colors"
      >
        <FileSpreadsheet className="h-4 w-4 ml-2" />
        تحميل Excel
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:bg-blue-700 transition-colors">
            <Calendar className="h-4 w-4 ml-2" />
            تغيير الفترة
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>اختر الفترة الزمنية</DialogTitle>
          </DialogHeader>
          <DatePickerWithRange 
            className="mt-4" 
            onChange={handleDateChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
