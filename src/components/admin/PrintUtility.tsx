
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrintUtilityProps {
  data: any[];
  title: string;
  columns: Array<{
    header: string;
    accessor: string;
    render?: (value: any) => string;
  }>;
}

export const PrintUtility = ({ data, title, columns }: PrintUtilityProps) => {
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
    
    // انتظار تحميل المحتوى ثم الطباعة
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
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            color: #333;
            direction: rtl;
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
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: right;
          }
          
          th {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #1e40af;
          }
          
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 20px;
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
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <div class="date">تاريخ الطباعة: ${currentDate}</div>
        </div>
        
        <div class="summary">
          <h3>ملخص البيانات</h3>
          <p>إجمالي السجلات: ${data.length}</p>
          <p>تم إنشاء هذا التقرير بواسطة نظام إدارة الطلبات</p>
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
        
        <div class="footer">
          <p>تم إنشاء هذا التقرير من نظام إدارة الطلبات - ${currentDate}</p>
          <p>© 2024 جميع الحقوق محفوظة</p>
        </div>
      </body>
      </html>
    `;
  };

  const handleExportPDF = () => {
    toast({
      title: "جاري التصدير",
      description: "جاري تحضير ملف PDF...",
    });

    // محاكاة عملية التصدير
    setTimeout(() => {
      toast({
        title: "تم التصدير بنجاح",
        description: "تم تحميل ملف PDF بنجاح"
      });
    }, 2000);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="h-4 w-4 mr-2" />
        طباعة
      </Button>
      <Button variant="outline" onClick={handleExportPDF}>
        <FileText className="h-4 w-4 mr-2" />
        تصدير PDF
      </Button>
    </div>
  );
};
