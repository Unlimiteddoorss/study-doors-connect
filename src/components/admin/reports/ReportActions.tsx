
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Printer, 
  Calendar, 
  Filter,
  FileText,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ReportActions = () => {
  const { toast } = useToast();

  const handleExportPDF = () => {
    toast({
      title: "تصدير PDF",
      description: "جاري تحضير التقرير بصيغة PDF..."
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "تصدير Excel", 
      description: "جاري تحضير التقرير بصيغة Excel..."
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleScheduleReport = () => {
    toast({
      title: "جدولة التقارير",
      description: "سيتم إضافة ميزة جدولة التقارير قريباً"
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={handleExportPDF}>
        <FileText className="h-4 w-4 mr-2" />
        تصدير PDF
      </Button>
      <Button variant="outline" onClick={handleExportExcel}>
        <BarChart3 className="h-4 w-4 mr-2" />
        تصدير Excel
      </Button>
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="h-4 w-4 mr-2" />
        طباعة
      </Button>
      <Button variant="outline" onClick={handleScheduleReport}>
        <Calendar className="h-4 w-4 mr-2" />
        جدولة التقرير
      </Button>
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        فلترة متقدمة
      </Button>
      <Button>
        <Download className="h-4 w-4 mr-2" />
        تحميل جميع البيانات
      </Button>
    </div>
  );
};
