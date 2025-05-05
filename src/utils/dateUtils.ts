import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import i18next from 'i18next';

// Get the appropriate locale object for date-fns
export const getLocale = () => {
  const currentLanguage = i18next.language;
  return currentLanguage === 'ar' ? ar : enUS;
};

// Format a date relative to now (e.g. "2 hours ago", "yesterday", etc.)
export const formatRelativeTime = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const locale = getLocale();
  
  if (isToday(parsedDate)) {
    return format(parsedDate, 'p', { locale }); // Time only for today
  }
  
  if (isYesterday(parsedDate)) {
    return i18next.t('date.yesterday', 'أمس') + ' ' + format(parsedDate, 'p', { locale });
  }
  
  // If within 7 days, show relative time
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 7) {
    return formatDistanceToNow(parsedDate, { addSuffix: true, locale });
  }
  
  // Otherwise show full date
  return format(parsedDate, 'PPp', { locale });
};

// Format a date to a standard format
export const formatDate = (date: Date | string, showTime = false) => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const locale = getLocale();
  
  if (showTime) {
    return format(parsedDate, 'PPpp', { locale });
  }
  
  return format(parsedDate, 'PP', { locale });
};
