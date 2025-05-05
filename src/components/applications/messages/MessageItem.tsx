
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Paperclip } from 'lucide-react';

interface Attachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

interface MessageItemProps {
  message: {
    id: string;
    content: string;
    created_at: string;
    sender_role: string;
    attachments?: Attachment[];
  };
  isCurrentUser: boolean;
}

const MessageItem = ({ message, isCurrentUser }: MessageItemProps) => {
  // Format date
  const formatMessageDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy, HH:mm', { locale: ar });
    } catch (error) {
      return dateString;
    }
  };

  // Get sender name based on role
  const getSenderName = (role: string) => {
    switch (role) {
      case 'student':
        return 'أنت';
      case 'admin':
        return 'مدير النظام';
      case 'advisor':
        return 'المستشار التعليمي';
      case 'university':
        return 'ممثل الجامعة';
      default:
        return role;
    }
  };

  // Format file size
  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${Math.round(sizeInBytes / 1024 * 10) / 10} KB`;
    } else {
      return `${Math.round(sizeInBytes / (1024 * 1024) * 10) / 10} MB`;
    }
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] md:max-w-[70%] ${isCurrentUser ? 'bg-unlimited-blue text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-3`}>
        {!isCurrentUser && (
          <div className="text-xs font-medium mb-1">{getSenderName(message.sender_role)}</div>
        )}
        
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment, index) => (
              <div key={index} className={`flex items-center p-2 rounded ${isCurrentUser ? 'bg-unlimited-dark-blue/30' : 'bg-gray-200'} text-xs`}>
                <Paperclip className="h-3 w-3 mr-2 flex-shrink-0" />
                <div className="flex-1 truncate">{attachment.name}</div>
                <div className="ml-2">{formatFileSize(attachment.size)}</div>
              </div>
            ))}
          </div>
        )}
        
        <div className={`text-xs mt-1 ${isCurrentUser ? 'text-unlimited-light-blue' : 'text-gray-500'} text-left`}>
          {formatMessageDate(message.created_at)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
