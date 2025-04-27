
import { format, isToday, isYesterday } from 'date-fns';
import { ar } from 'date-fns/locale';

export const formatMessageDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return `اليوم ${format(date, 'HH:mm', { locale: ar })}`;
    } else if (isYesterday(date)) {
      return `الأمس ${format(date, 'HH:mm', { locale: ar })}`;
    } else {
      return format(date, 'dd MMM yyyy HH:mm', { locale: ar });
    }
  } catch (error) {
    return dateString;
  }
};

export const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return '🖼️';
  if (type.includes('pdf')) return '📄';
  if (type.includes('doc') || type.includes('docx')) return '📝';
  if (type.includes('xls') || type.includes('xlsx')) return '📊';
  if (type.includes('zip') || type.includes('rar')) return '📦';
  return '📎';
};

export const getFileTypeLabel = (type: string) => {
  if (type.startsWith('image/')) return 'صورة';
  if (type.includes('pdf')) return 'ملف PDF';
  if (type.includes('doc') || type.includes('docx')) return 'مستند Word';
  if (type.includes('xls') || type.includes('xlsx')) return 'جدول Excel';
  if (type.includes('zip') || type.includes('rar')) return 'ملف مضغوط';
  return 'ملف';
};

export const formatFileSize = (bytes: number) => {
  const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
  if (bytes === 0) return '0 بايت';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

