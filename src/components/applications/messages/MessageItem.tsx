
import { useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Paperclip, Download, Check, CheckCheck, MoreVertical, Copy, Reply, Trash2, Forward } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

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
  const { toast } = useToast();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

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

  // Preview image attachment
  const handleImagePreview = (attachment: Attachment) => {
    // In a real app, this would use the actual URL
    const previewUrl = attachment.url || `https://placekitten.com/800/600?image=${Math.floor(Math.random() * 16)}`;
    setPreviewImage(previewUrl);
    setShowImagePreview(true);
  };

  // Download attachment
  const handleDownload = (attachment: Attachment) => {
    toast({
      title: "جاري التحميل",
      description: `جاري تحميل ${attachment.name}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "تم التحميل",
        description: `تم تحميل ${attachment.name} بنجاح`,
      });
    }, 1500);
  };

  // Copy message content
  const copyMessageContent = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "تم النسخ",
      description: "تم نسخ محتوى الرسالة إلى الحافظة",
    });
  };

  // Reply to message
  const replyToMessage = () => {
    toast({
      title: "الرد على الرسالة",
      description: "تم تحديد هذه الرسالة للرد عليها",
    });
  };

  // Forward message
  const forwardMessage = () => {
    toast({
      title: "إعادة توجيه الرسالة",
      description: "تمت إعادة توجيه الرسالة",
    });
  };

  // Delete message
  const deleteMessage = () => {
    toast({
      title: "حذف الرسالة",
      description: "تم حذف الرسالة",
      variant: "destructive"
    });
  };

  // Check if attachment is an image
  const isImageAttachment = (attachment: Attachment) => {
    return attachment.type.startsWith('image/');
  };

  // Get avatar for message
  const getAvatar = () => {
    switch (message.sender_role) {
      case 'student':
        return (
          <div className="bg-unlimited-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm">
            ط
          </div>
        );
      case 'advisor':
        return (
          <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm">
            م
          </div>
        );
      case 'university':
        return (
          <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm">
            ج
          </div>
        );
      default:
        return (
          <div className="bg-unlimited-gray text-white w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm">
            ؟
          </div>
        );
    }
  };

  return (
    <div className={`flex gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 pt-1">
          {getAvatar()}
        </div>
      )}
      
      <div className={`group max-w-[85%] md:max-w-[70%] ${isCurrentUser ? 'bg-unlimited-blue text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-3 relative`}>
        <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`p-1 rounded-full ${isCurrentUser ? 'text-unlimited-light-blue hover:bg-unlimited-dark-blue' : 'text-unlimited-gray hover:bg-gray-200'}`}>
                <MoreVertical className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isCurrentUser ? "end" : "start"}>
              <DropdownMenuItem onClick={copyMessageContent}>
                <Copy className="h-4 w-4 ml-2" />
                نسخ النص
              </DropdownMenuItem>
              <DropdownMenuItem onClick={replyToMessage}>
                <Reply className="h-4 w-4 ml-2" />
                رد
              </DropdownMenuItem>
              <DropdownMenuItem onClick={forwardMessage}>
                <Forward className="h-4 w-4 ml-2" />
                إعادة توجيه
              </DropdownMenuItem>
              {isCurrentUser && (
                <DropdownMenuItem onClick={deleteMessage} className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {!isCurrentUser && (
          <div className="text-xs font-medium mb-1">{getSenderName(message.sender_role)}</div>
        )}
        
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment, index) => (
              <div 
                key={index} 
                className={`flex items-center p-2 rounded ${isCurrentUser ? 'bg-unlimited-dark-blue/30' : 'bg-gray-200'} text-xs`}
              >
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center">
                    <Paperclip className="h-3 w-3 ml-2 flex-shrink-0" />
                    <div className="truncate flex-1">{attachment.name}</div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs opacity-80">{formatFileSize(attachment.size)}</div>
                    <div className="flex gap-1">
                      {isImageAttachment(attachment) && (
                        <button 
                          onClick={() => handleImagePreview(attachment)}
                          className={`p-1 rounded-full ${isCurrentUser ? 'hover:bg-unlimited-dark-blue' : 'hover:bg-gray-300'} transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4z" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </button>
                      )}
                      
                      <button 
                        onClick={() => handleDownload(attachment)}
                        className={`p-1 rounded-full ${isCurrentUser ? 'hover:bg-unlimited-dark-blue' : 'hover:bg-gray-300'} transition-colors`}
                      >
                        <Download className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className={`text-xs mt-2 ${isCurrentUser ? 'text-unlimited-light-blue' : 'text-gray-500'} flex justify-between items-center`}>
          <span>{formatMessageDate(message.created_at)}</span>
          {isCurrentUser && (
            <span className="flex items-center">
              <CheckCheck className="h-3 w-3 text-unlimited-light-blue" />
            </span>
          )}
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="flex-shrink-0 pt-1">
          {getAvatar()}
        </div>
      )}
      
      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>معاينة الصورة</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img src={previewImage} alt="معاينة" className="max-h-[500px] w-auto object-contain rounded-md" />
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowImagePreview(false)}>إغلاق</Button>
            <Button className="mr-2" onClick={() => {
              toast({
                title: "جاري التحميل",
                description: "جاري تحميل الصورة...",
              });
              
              setTimeout(() => {
                toast({
                  title: "تم التحميل",
                  description: "تم تحميل الصورة بنجاح",
                });
              }, 1500);
            }}>
              <Download className="h-4 w-4 ml-1" />
              تحميل
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageItem;
