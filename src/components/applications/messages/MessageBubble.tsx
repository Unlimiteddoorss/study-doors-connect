
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Download } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  url: string;
  size?: number;
  type?: string;
}

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    sender: 'student' | 'admin';
    senderName: string;
    timestamp: Date;
    attachments?: Attachment[];
  };
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatMessageDate = (date: Date): string => {
    return new Intl.DateTimeFormat(i18n.language, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`flex ${message.sender === 'student' ? (isRtl ? 'justify-start' : 'justify-end') : (isRtl ? 'justify-end' : 'justify-start')}`}>
      <div className="flex gap-2 max-w-[80%]">
        {message.sender !== 'student' && !isRtl && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png" alt={message.senderName} />
            <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
          </Avatar>
        )}
        
        <div>
          <div className={`rounded-lg p-3 inline-block ${
            message.sender === 'student'
              ? 'bg-unlimited-blue text-white'
              : 'bg-white border'
          }`}>
            <p className="break-words">{message.text}</p>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map(attachment => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 p-2 rounded ${
                      message.sender === 'student'
                        ? 'bg-unlimited-dark-blue hover:bg-unlimited-dark-blue/90'
                        : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm truncate">{attachment.name}</span>
                    {attachment.size && (
                      <span className="text-xs opacity-70">{formatFileSize(attachment.size)}</span>
                    )}
                    <Download className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <div className={`mt-1 text-xs text-unlimited-gray ${message.sender === 'student' ? 'text-right' : 'text-left'}`}>
            {formatMessageDate(message.timestamp)}
          </div>
        </div>
        
        {message.sender !== 'student' && isRtl && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png" alt={message.senderName} />
            <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
