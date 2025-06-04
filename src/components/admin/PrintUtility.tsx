
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, FileText, Download, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface PrintUtilityProps {
  data: any[];
  title: string;
  columns: Array<{
    header: string;
    accessor: string;
    render?: (value: any) => string;
  }>;
  orientation?: 'portrait' | 'landscape';
  includeHeader?: boolean;
  includeFooter?: boolean;
}

export const PrintUtility = ({ 
  data, 
  title, 
  columns,
  orientation = 'portrait',
  includeHeader = true,
  includeFooter = true
}: PrintUtilityProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "خطأ في الطباعة",
        description: "لا يمكن فتح نافذة الطباعة. تأكد من السماح للنوافذ المنبثقة.",
        variant: "destructive"
      });
      return;
    }

    const printContent = generatePrintContent();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);

    toast({
      title: "جاري الطباعة",
      description: "تم إرسال المحتوى للطباعة"
    });
  };

  const generatePrintContent = () => {
    const currentDate = new Date().toLocaleDateString('ar-SA');
    
    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
            @page { 
              size: A4 ${orientation}; 
              margin: 15mm;
            }
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            color: #333;
            direction: rtl;
            font-size: 12px;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #1e40af;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .header h1 {
            color: #1e40af;
            margin: 0;
            font-size: 24px;
          }
          
          .header .date {
            color: #666;
            margin-top: 10px;
            font-size: 14px;
          }
          
          .table-container {
            width: 100%;
            margin-top: 20px;
            overflow-x: auto;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
            font-size: 11px;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 6px 8px;
            text-align: right;
            vertical-align: top;
          }
          
          th {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #1e40af;
            font-size: 12px;
          }
          
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 15px;
          }
          
          .summary {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f0f9ff;
            border-radius: 8px;
            border: 1px solid #e0e7ff;
          }
          
          .summary h3 {
            margin: 0 0 10px 0;
            color: #1e40af;
            font-size: 16px;
          }
          
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 48px;
            color: rgba(0,0,0,0.05);
            z-index: -1;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="watermark">أبواب بلا حدود</div>
        
        ${includeHeader ? `
          <div class="header">
            <h1>${title}</h1>
            <div class="date">تاريخ الطباعة: ${currentDate}</div>
          </div>
        ` : ''}
        
        <div class="summary">
          <h3>ملخص البيانات</h3>
          <p><strong>إجمالي السجلات:</strong> ${data.length}</p>
          <p><strong>تاريخ الإنشاء:</strong> ${currentDate}</p>
          <p><strong>المصدر:</strong> نظام إدارة الطلبات - أبواب بلا حدود</p>
        </div>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                ${columns.map(col => `<th>${col.header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(item => `
                <tr>
                  ${columns.map(col => {
                    const value = item[col.accessor];
                    const displayValue = col.render ? col.render(value) : value;
                    return `<td>${displayValue || '-'}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        ${includeFooter ? `
          <div class="footer">
            <p>تم إنشاء هذا التقرير من نظام إدارة الطلبات - أبواب بلا حدود</p>
            <p>التاريخ: ${currentDate} | الصفحة 1 من 1</p>
            <p>© 2024 أبواب بلا حدود - جميع الحقوق محفوظة</p>
          </div>
        ` : ''}
      </body>
      </html>
    `;
  };

  const handleExportPDF = async () => {
    try {
      toast({
        title: "جاري التصدير",
        description: "جاري تحضير ملف PDF...",
      });

      const doc = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: 'a4'
      });

      // إعداد الخط العربي
      doc.setFont('helvetica');
      
      // العنوان
      doc.setFontSize(20);
      doc.text(title, 105, 20, { align: 'center' });
      
      // التاريخ
      const currentDate = new Date().toLocaleDateString('ar-SA');
      doc.setFontSize(12);
      doc.text(`تاريخ الطباعة: ${currentDate}`, 105, 35, { align: 'center' });
      
      // الملخص
      doc.setFontSize(14);
      doc.text('ملخص البيانات', 20, 55);
      doc.setFontSize(10);
      doc.text(`إجمالي السجلات: ${data.length}`, 20, 65);
      
      // الجدول
      let yPosition = 80;
      const rowHeight = 10;
      const colWidth = (doc.internal.pageSize.width - 40) / columns.length;
      
      // رؤوس الجدول
      doc.setFontSize(10);
      doc.setFillColor(240, 240, 240);
      columns.forEach((col, index) => {
        doc.rect(20 + (index * colWidth), yPosition, colWidth, rowHeight, 'F');
        doc.text(col.header, 25 + (index * colWidth), yPosition + 7);
      });
      
      yPosition += rowHeight;
      
      // بيانات الجدول
      data.forEach((item) => {
        if (yPosition > doc.internal.pageSize.height - 30) {
          doc.addPage();
          yPosition = 20;
        }
        
        columns.forEach((col, index) => {
          const value = item[col.accessor];
          const displayValue = col.render ? col.render(value) : String(value || '-');
          doc.rect(20 + (index * colWidth), yPosition, colWidth, rowHeight);
          doc.text(displayValue.substring(0, 15), 25 + (index * colWidth), yPosition + 7);
        });
        
        yPosition += rowHeight;
      });
      
      // التذييل
      doc.setFontSize(8);
      doc.text('© 2024 أبواب بلا حدود - جميع الحقوق محفوظة', 105, doc.internal.pageSize.height - 10, { align: 'center' });
      
      doc.save(`${title}_${currentDate}.pdf`);
      
      toast({
        title: "تم التصدير بنجاح",
        description: "تم تحميل ملف PDF بنجاح"
      });
      
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء إنشاء ملف PDF",
        variant: "destructive"
      });
    }
  };

  const handleAdvancedPrint = () => {
    // فتح نافذة إعدادات الطباعة المتقدمة
    toast({
      title: "إعدادات الطباعة المتقدمة",
      description: "سيتم تطوير هذه الميزة قريباً"
    });
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="h-4 w-4 mr-2" />
        طباعة سريعة
      </Button>
      <Button variant="outline" onClick={handleExportPDF}>
        <FileText className="h-4 w-4 mr-2" />
        تصدير PDF
      </Button>
      <Button variant="outline" onClick={handleAdvancedPrint}>
        <Settings className="h-4 w-4 mr-2" />
        إعدادات متقدمة
      </Button>
    </div>
  );
};
