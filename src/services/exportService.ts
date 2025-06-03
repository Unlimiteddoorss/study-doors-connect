
import { RealApplication } from './realApplicationsService';

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  includeDocuments?: boolean;
  includeTimeline?: boolean;
}

export const exportService = {
  // تصدير طلب واحد
  async exportApplication(application: RealApplication, options: ExportOptions) {
    try {
      const { format } = options;
      
      switch (format) {
        case 'pdf':
          return await this.exportToPDF(application);
        case 'excel':
          return await this.exportToExcel(application);
        case 'csv':
          return await this.exportToCSV(application);
        default:
          throw new Error('صيغة التصدير غير مدعومة');
      }
    } catch (error) {
      console.error('خطأ في التصدير:', error);
      throw error;
    }
  },

  // تصدير متعدد الطلبات
  async exportMultipleApplications(applications: RealApplication[], options: ExportOptions) {
    try {
      const { format } = options;
      
      switch (format) {
        case 'excel':
          return await this.exportMultipleToExcel(applications);
        case 'csv':
          return await this.exportMultipleToCSV(applications);
        default:
          throw new Error('التصدير المتعدد متاح فقط لـ Excel و CSV');
      }
    } catch (error) {
      console.error('خطأ في التصدير المتعدد:', error);
      throw error;
    }
  },

  // تصدير PDF للطلب الواحد
  async exportToPDF(application: RealApplication) {
    // استخدام مكتبة jsPDF
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // إعداد الخط العربي (إذا كان متاحاً)
    doc.setFont('helvetica');
    doc.setFontSize(16);
    
    // العنوان
    doc.text(`Application Details - ${application.id}`, 20, 20);
    
    let yPosition = 40;
    const lineHeight = 10;
    
    // معلومات الطالب
    doc.setFontSize(14);
    doc.text('Student Information:', 20, yPosition);
    yPosition += lineHeight;
    
    doc.setFontSize(12);
    doc.text(`Name: ${application.studentName || 'N/A'}`, 30, yPosition);
    yPosition += lineHeight;
    doc.text(`Email: ${application.personal_info?.email || 'N/A'}`, 30, yPosition);
    yPosition += lineHeight;
    doc.text(`Phone: ${application.personal_info?.phone || 'N/A'}`, 30, yPosition);
    yPosition += lineHeight;
    doc.text(`Country: ${application.studentCountry || 'N/A'}`, 30, yPosition);
    yPosition += lineHeight * 2;
    
    // معلومات البرنامج
    doc.setFontSize(14);
    doc.text('Program Information:', 20, yPosition);
    yPosition += lineHeight;
    
    doc.setFontSize(12);
    doc.text(`University: ${application.universityName || 'N/A'}`, 30, yPosition);
    yPosition += lineHeight;
    doc.text(`Program: ${application.programName || 'N/A'}`, 30, yPosition);
    yPosition += lineHeight;
    doc.text(`Status: ${application.status}`, 30, yPosition);
    yPosition += lineHeight;
    doc.text(`Applied: ${new Date(application.created_at).toLocaleDateString()}`, 30, yPosition);
    
    // تنزيل الملف
    doc.save(`application-${application.id}.pdf`);
    
    return { success: true, message: 'تم تصدير PDF بنجاح' };
  },

  // تصدير Excel للطلب الواحد
  async exportToExcel(application: RealApplication) {
    const XLSX = await import('xlsx');
    
    const workbook = XLSX.utils.book_new();
    
    // ورقة معلومات أساسية
    const basicInfo = [
      ['Application ID', application.id],
      ['Student Name', application.studentName || ''],
      ['Email', application.personal_info?.email || ''],
      ['Phone', application.personal_info?.phone || ''],
      ['Country', application.studentCountry || ''],
      ['University', application.universityName || ''],
      ['Program', application.programName || ''],
      ['Status', application.status],
      ['Applied Date', new Date(application.created_at).toLocaleDateString()],
    ];
    
    const basicSheet = XLSX.utils.aoa_to_sheet(basicInfo);
    XLSX.utils.book_append_sheet(workbook, basicSheet, 'Basic Info');
    
    // ورقة المعلومات الشخصية
    if (application.personal_info) {
      const personalData = Object.entries(application.personal_info).map(([key, value]) => [key, value]);
      const personalSheet = XLSX.utils.aoa_to_sheet([['Field', 'Value'], ...personalData]);
      XLSX.utils.book_append_sheet(workbook, personalSheet, 'Personal Info');
    }
    
    // ورقة المعلومات الأكاديمية
    if (application.academic_info) {
      const academicData = Object.entries(application.academic_info).map(([key, value]) => [key, value]);
      const academicSheet = XLSX.utils.aoa_to_sheet([['Field', 'Value'], ...academicData]);
      XLSX.utils.book_append_sheet(workbook, academicSheet, 'Academic Info');
    }
    
    // تنزيل الملف
    XLSX.writeFile(workbook, `application-${application.id}.xlsx`);
    
    return { success: true, message: 'تم تصدير Excel بنجاح' };
  },

  // تصدير CSV للطلب الواحد
  async exportToCSV(application: RealApplication) {
    const csvData = [
      ['Field', 'Value'],
      ['Application ID', application.id],
      ['Student Name', application.studentName || ''],
      ['Email', application.personal_info?.email || ''],
      ['Phone', application.personal_info?.phone || ''],
      ['Country', application.studentCountry || ''],
      ['University', application.universityName || ''],
      ['Program', application.programName || ''],
      ['Status', application.status],
      ['Applied Date', new Date(application.created_at).toLocaleDateString()],
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    
    // إنشاء وتنزيل الملف
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `application-${application.id}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: 'تم تصدير CSV بنجاح' };
  },

  // تصدير Excel متعدد
  async exportMultipleToExcel(applications: RealApplication[]) {
    const XLSX = await import('xlsx');
    
    const workbook = XLSX.utils.book_new();
    
    // تحضير البيانات
    const data = applications.map(app => ({
      'Application ID': app.id,
      'Student Name': app.studentName || '',
      'Email': app.personal_info?.email || '',
      'Phone': app.personal_info?.phone || '',
      'Country': app.studentCountry || '',
      'University': app.universityName || '',
      'Program': app.programName || '',
      'Status': app.status,
      'Applied Date': new Date(app.created_at).toLocaleDateString(),
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    
    // تنزيل الملف
    XLSX.writeFile(workbook, `applications-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    return { success: true, message: `تم تصدير ${applications.length} طلب بنجاح` };
  },

  // تصدير CSV متعدد
  async exportMultipleToCSV(applications: RealApplication[]) {
    const headers = [
      'Application ID',
      'Student Name', 
      'Email',
      'Phone',
      'Country',
      'University',
      'Program',
      'Status',
      'Applied Date'
    ];
    
    const csvData = [
      headers,
      ...applications.map(app => [
        app.id,
        app.studentName || '',
        app.personal_info?.email || '',
        app.personal_info?.phone || '',
        app.studentCountry || '',
        app.universityName || '',
        app.programName || '',
        app.status,
        new Date(app.created_at).toLocaleDateString()
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    
    // إنشاء وتنزيل الملف
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: `تم تصدير ${applications.length} طلب بنجاح` };
  }
};
