
import { format, isToday, isYesterday } from 'date-fns';
import { ar } from 'date-fns/locale';
import { FileIcon, FileText, FileImage, FileArchive, File } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Attachment {
  name: string;
  url: string;
  type: string;
}

interface MessageBubbleProps {
  message: string;
  sender: 'user' | 'admin' | 'system';
  timestamp: string;
  attachments?: Attachment[];
}

const MessageBubble = ({ message, sender, timestamp, attachments }: MessageBubbleProps) => {
  // محاذاة الرسائل حسب المرسل
  const isUser = sender === 'user';
  const isSystem = sender === 'system';
  
  // تنسيق التاريخ
  const formatMessageDate = (dateString: string) => {
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
  
  // تحديد نوع المرفق وأيقونته
  const getAttachmentIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-4 w-4" />;
    } else if (type.includes('pdf')) {
      return <FileText className="h-4 w-4" />;
    } else if (type.includes('zip') || type.includes('rar') || type.includes('archive')) {
      return <FileArchive className="h-4 w-4" />;
    } else {
      return <File className="h-4 w-4" />;
    }
  };
  
  // الحصول على اختصار اسم المرسل
  const getSenderInitials = () => {
    if (isUser) return 'أنت';
    if (isSystem) return 'S';
    return 'قبول';
  };
  
  // الحصول على صورة المرسل
  const getSenderAvatar = () => {
    if (isUser) return '/placeholder.svg';
    if (isSystem) return '/placeholder.svg';
    return '/placeholder.svg';
  };
  
  // الحصول على اسم المرسل
  const getSenderName = () => {
    if (isUser) return 'أنت';
    if (isSystem) return 'النظام';
    return 'فريق القبول';
  };

  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'} ${isSystem ? 'justify-center' : ''}`}>
      {/* صورة المستخدم - تظهر فقط للرسائل الواردة */}
      {!isUser && !isSystem && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={getSenderAvatar()} alt={getSenderName()} />
          <AvatarFallback>{getSenderInitials()}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isSystem ? 'w-full max-w-xl' : ''}`}>
        {/* اسم المرسل والتاريخ */}
        {!isSystem && (
          <div className={`flex text-xs mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className={`${isUser ? 'text-unlimited-blue' : 'text-unlimited-gray'}`}>
              {getSenderName()}
            </span>
            <span className="mx-1 text-unlimited-gray">•</span>
            <span className="text-unlimited-gray">
              {formatMessageDate(timestamp)}
            </span>
          </div>
        )}
        
        {/* فقاعة الرسالة */}
        <div className={`rounded-lg p-3 ${
          isSystem 
            ? 'bg-gray-100 text-center' 
            : isUser 
              ? 'bg-unlimited-blue text-white' 
              : 'bg-gray-100 text-unlimited-dark-blue'
        }`}>
          {/* نص الرسالة */}
          <div className="whitespace-pre-wrap break-words">{message}</div>
          
          {/* المرفقات */}
          {attachments && attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {attachments.map((attachment, index) => (
                <a 
                  key={index}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-2 rounded ${
                    isUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-1 rounded ${isUser ? 'bg-blue-500' : 'bg-blue-100'}`}>
                    {getAttachmentIcon(attachment.type)}
                  </div>
                  <span className={`text-sm truncate ${isUser ? 'text-white' : 'text-unlimited-dark-blue'}`}>
                    {attachment.name}
                  </span>
                  <FileIcon className={`h-3 w-3 ${isUser ? 'text-blue-200' : 'text-blue-500'}`} />
                </a>
              ))}
            </div>
          )}
        </div>
        
        {/* تاريخ الرسائل النظامية */}
        {isSystem && (
          <div className="text-xs text-unlimited-gray text-center mt-1">
            {formatMessageDate(timestamp)}
          </div>
        )}
      </div>
      
      {/* صورة المستخدم - تظهر فقط للرسائل المرسلة */}
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={getSenderAvatar()} alt={getSenderName()} />
          <AvatarFallback>{getSenderInitials()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;
