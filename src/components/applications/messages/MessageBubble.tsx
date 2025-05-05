
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Paperclip, FileText, Image, File, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MessageProps {
  message: {
    id: string;
    sender: 'student' | 'admin' | 'agent';
    senderName: string;
    text: string;
    timestamp: Date;
    read: boolean;
    attachments?: any[];
  };
  isSender: boolean;
}

// Helper to get file icon based on file type
const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
  if (fileType.includes('pdf')) return <FileText className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
};

const MessageBubble = ({ message, isSender }: MessageProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [showAttachments, setShowAttachments] = useState(true);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(i18n.language, { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isToday) {
      return t('messages.today', 'اليوم');
    } else if (isYesterday) {
      return t('messages.yesterday', 'أمس');
    } else {
      return date.toLocaleDateString(i18n.language, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
    }
  };
  
  const getSenderInitials = () => {
    if (!message.senderName) return '??';
    
    const nameParts = message.senderName.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  };
  
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isSender ? 'order-2' : 'order-1'}`}>
        <div className="flex items-start gap-2">
          {!isSender && (
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src="" alt={message.senderName} />
              <AvatarFallback className={`text-xs ${
                message.sender === 'admin' ? 'bg-unlimited-blue text-white' :
                message.sender === 'agent' ? 'bg-amber-500 text-white' :
                'bg-green-500 text-white'
              }`}>
                {getSenderInitials()}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div>
            {!isSender && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">{message.senderName}</span>
                <Badge variant="outline" className="text-xs px-2 py-0">
                  {message.sender === 'admin' ? 
                    t('messages.universityAdmin', 'مسؤول الجامعة') :
                    message.sender === 'agent' ?
                    t('messages.educationalAgent', 'وكيل تعليمي') :
                    t('messages.student', 'طالب')
                  }
                </Badge>
              </div>
            )}
            
            <div className={`rounded-lg px-4 py-2 ${
              isSender ? 
                'bg-unlimited-blue text-white rounded-tr-none' : 
                'bg-gray-100 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap break-words">
                {message.text}
              </p>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2">
                  <div 
                    className="flex items-center gap-1 text-xs cursor-pointer"
                    onClick={() => setShowAttachments(!showAttachments)}
                  >
                    <Paperclip className="h-3 w-3" />
                    <span>
                      {message.attachments.length} {t('messages.attachments', 'مرفقات')}
                    </span>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      {showAttachments ? 
                        <X className="h-3 w-3" /> : 
                        <span className="text-xs">+</span>
                      }
                    </Button>
                  </div>
                  
                  {showAttachments && (
                    <div className="mt-1 space-y-1">
                      {message.attachments.map((attachment, index) => (
                        <div 
                          key={index}
                          className={`flex items-center gap-1 p-1 rounded text-xs ${
                            isSender ? 'bg-unlimited-dark-blue/30' : 'bg-gray-200'
                          }`}
                        >
                          {getFileIcon(attachment.type)}
                          <span className="truncate max-w-[120px]">
                            {attachment.name}
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-4 w-4 ml-auto p-0"
                                >
                                  <Download className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {t('messages.download', 'تحميل')}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className={`text-xs text-gray-500 mt-1 flex gap-2 ${
              isSender ? 'justify-end' : 'justify-start'
            }`}>
              <span>{formatTime(message.timestamp)}</span>
              <span>{formatDate(message.timestamp)}</span>
              {isSender && (
                <span>
                  {message.read ? 
                    t('messages.read', 'تم القراءة') : 
                    t('messages.sent', 'تم الإرسال')
                  }
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
