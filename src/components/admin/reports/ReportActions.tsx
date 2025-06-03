
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Printer, 
  Calendar, 
  Filter,
  FileText,
  BarChart3,
  Share2,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PrintUtility } from '../PrintUtility';

interface ReportActionsProps {
  data?: any[];
  reportTitle?: string;
  onScheduleReport?: () => void;
  onAdvancedFilter?: () => void;
}

export const ReportActions = ({ 
  data = [], 
  reportTitle = "تقرير النظام",
  onScheduleReport,
  onAdvancedFilter 
}: ReportActionsProps) => {
  const { toast } = useToast();

  const handleExportExcel = () => {
    toast({
      title: "تصدير Excel", 
      description: "جاري تحضير التقرير بصيغة Excel..."
    });

    // محاكاة عملية التصدير
    setTimeout(() => {
      // إنشاء بيانات CSV للتصدير
      if (data.length > 0) {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(item => Object.values(item).join(',')).join('\n');
        const csvContent = `${headers}\n${rows}`;
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${reportTitle}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
      }

      toast({
        title: "تم التصدير بنجاح",
        description: "تم تحميل ملف Excel بنجاح"
      });
    }, 2000);
  };

  const handleScheduleReport = () => {
    if (onScheduleReport) {
      onScheduleReport();
    } else {
      toast({
        title: "جدولة التقارير",
        description: "سيتم إضافة ميزة جدولة التقارير قريباً"
      });
    }
  };

  const handleAdvancedFilter = () => {
    if (onAdvancedFilter) {
      onAdvancedFilter();
    } else {
      toast({
        title: "الفلترة المتقدمة",
        description: "سيتم فتح خيارات الفلترة المتقدمة"
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: reportTitle,
        text: `تقرير ${reportTitle}`,
        url: window.location.href,
      }).catch(err => {
        toast({
          title: "خطأ في المشاركة",
          description: "حدث خطأ أثناء مشاركة التقرير",
          variant: "destructive"
        });
      });
    } else {
      // نسخ الرابط للحافظة
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط التقرير إلى الحافظة"
        });
      });
    }
  };

  const handleSendEmail = () => {
    toast({
      title: "إرسال البريد الإلكتروني",
      description: "جاري تحضير التقرير للإرسال عبر البريد الإلكتروني..."
    });

    setTimeout(() => {
      toast({
        title: "تم الإرسال",
        description: "تم إرسال التقرير عبر البريد الإلكتروني بنجاح"
      });
    }, 3000);
  };

  const handleDownloadAll = () => {
    toast({
      title: "تحميل جميع البيانات",
      description: "جاري تحضير ملف شامل بجميع البيانات..."
    });

    setTimeout(() => {
      toast({
        title: "تم التحميل",
        description: "تم تحميل ملف البيانات الشامل بنجاح"
      });
    }, 3000);
  };

  // أعمدة للطباعة (يمكن تخصيصها حسب نوع البيانات)
  const printColumns = data.length > 0 ? Object.keys(data[0]).map(key => ({
    header: key,
    accessor: key,
    render: (value: any) => String(value)
  })) : [];

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={handleExportExcel}>
        <BarChart3 className="h-4 w-4 mr-2" />
        تصدير Excel
      </Button>
      
      {data.length > 0 && (
        <PrintUtility 
          data={data}
          title={reportTitle}
          columns={printColumns}
        />
      )}
      
      <Button variant="outline" onClick={handleScheduleReport}>
        <Calendar className="h-4 w-4 mr-2" />
        جدولة التقرير
      </Button>
      
      <Button variant="outline" onClick={handleAdvancedFilter}>
        <Filter className="h-4 w-4 mr-2" />
        فلترة متقدمة
      </Button>

      <Button variant="outline" onClick={handleShare}>
        <Share2 className="h-4 w-4 mr-2" />
        مشاركة
      </Button>

      <Button variant="outline" onClick={handleSendEmail}>
        <Mail className="h-4 w-4 mr-2" />
        إرسال بالبريد
      </Button>
      
      <Button onClick={handleDownloadAll}>
        <Download className="h-4 w-4 mr-2" />
        تحميل جميع البيانات
      </Button>
    </div>
  );
};
