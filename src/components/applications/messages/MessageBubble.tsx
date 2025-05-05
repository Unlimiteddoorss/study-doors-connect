
import { useState } from 'react';
import { Check, Clock, Download, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatRelativeTime } from '@/utils/dateUtils';

interface MessageBubbleProps {
  message: {
    id: string;
    sender: 'student' | 'admin' | 'agent';
    senderName: string;
    text: string;
    timestamp: Date;
    read: boolean;
    attachments?: {
      id: string;
      name: string;
      url: string;
      size?: number;
      type?: string;
    }[];
  };
  isSender: boolean;
}

const MessageBubble = ({ message, isSender }: MessageBubbleProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Format the message timestamp
  const formattedTime = formatRelativeTime(message.timestamp);

  const getSenderInitials = () => {
    return message.senderName
      .split(' ')
      .slice(0, 2)
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };

  const getSenderAvatar = () => {
    if (message.sender === 'admin') return '/images/admin-avatar.jpg';
    if (message.sender === 'agent') return '/images/agent-avatar.jpg';
    return '/images/student-avatar.jpg';
  };

  const getSenderColor = () => {
    if (message.sender === 'admin') return 'bg-unlimited-blue text-white';
    if (message.sender === 'agent') return 'bg-green-600 text-white';
    return 'bg-gray-700 text-white';
  };

  const getAttachmentIcon = (type: string) => {
    if (type.startsWith('image/')) return <Eye className="h-4 w-4" />;
    return <Download className="h-4 w-4" />;
  };

  const handleDownload = (url: string, fileName: string) => {
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: t('messages.downloadStarted', 'بدأ التحميل'),
        description: t('messages.downloadingFile', 'جاري تحميل الملف: {fileName}', { fileName }),
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: t('error.downloadFailed', 'فشل التحميل'),
        description: t('error.tryAgainLater', 'يرجى المحاولة مرة أخرى لاحقًا'),
        variant: 'destructive'
      });
    }
  };

  const handlePreview = (url: string) => {
    if (previewUrl === url) {
      setPreviewUrl(null);
    } else {
      setPreviewUrl(url);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className={`flex gap-3 mb-6 ${isSender ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar (only shown for non-sender) */}
      {!isSender && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={getSenderAvatar()} alt={message.senderName} />
          <AvatarFallback className={getSenderColor()}>{getSenderInitials()}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isSender ? 'order-1' : 'order-2'}`}>
        {/* Sender name & timestamp */}
        <div className={`flex items-center gap-2 text-xs text-unlimited-gray mb-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
          {!isSender && <span className="font-medium">{message.senderName}</span>}
          <span>{formattedTime}</span>
          {isSender && (
            <span className="flex items-center">
              {message.read ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
        
        {/* Message bubble */}
        <div 
          className={`rounded-lg p-3 ${
            isSender 
              ? 'bg-unlimited-blue text-white rounded-tr-none' 
              : 'bg-gray-100 text-unlimited-dark-blue rounded-tl-none'
          } ${isRtl ? 'text-right' : 'text-left'}`}
        >
          {/* Message text */}
          <p className="whitespace-pre-wrap">{message.text}</p>
          
          {/* Attachments section */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/20">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="mt-1">
                  <div className={`flex items-center gap-2 ${
                    isSender ? 'text-white/90' : 'text-unlimited-gray'
                  }`}>
                    <div className="flex-1 truncate text-sm">
                      {attachment.name}
                      {attachment.size && (
                        <span className="text-xs opacity-70 ml-1">
                          ({formatFileSize(attachment.size)})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {attachment.type?.startsWith('image/') && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-6 w-6 ${isSender ? 'hover:bg-white/20' : 'hover:bg-gray-200'}`}
                          onClick={() => handlePreview(attachment.url)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-6 w-6 ${isSender ? 'hover:bg-white/20' : 'hover:bg-gray-200'}`}
                        onClick={() => handleDownload(attachment.url, attachment.name)}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Image preview */}
        {previewUrl && previewUrl.match(/\.(jpeg|jpg|gif|png)$/i) && (
          <div className="mt-2 relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white h-7 w-7 p-0 rounded-full"
              onClick={() => setPreviewUrl(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="rounded-md max-h-[300px] object-contain"
              onError={() => {
                toast({
                  title: t('error.previewFailed', 'فشل تحميل المعاينة'),
                  variant: 'destructive'
                });
                setPreviewUrl(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
