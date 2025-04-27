
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
  if (type.includes('zip') || type.includes('rar')) return '📦';
  return '📎';
};
