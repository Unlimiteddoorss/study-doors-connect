
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  MoreVertical, 
  Download, 
  Copy, 
  Reply, 
  Flag, 
  Trash2,
  Share2,
  ClipboardCopy,
  PaperclipIcon,
  CheckCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Attachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

interface MessageItemProps {
  message: {
    id: string;
    application_id: string;
    sender_id: string;
    sender_role: string;
    content: string;
    attachments?: Attachment[];
    created_at: string;
    is_read: boolean;
  };
  isCurrentUser: boolean;
}

const MessageItem = ({ message, isCurrentUser }: MessageItemProps) => {
  const { toast } = useToast();
  const [showAttachmentPreview, setShowAttachmentPreview] = useState<Attachment | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const senderName = isCurrentUser ? 'أنت' : 
    message.sender_role === 'advisor' ? 'المستشار التعليمي' : 
    message.sender_role === 'university' ? 'ممثل الجامعة' : 'مستخدم';
  
  const avatarFallback = isCurrentUser ? 'أ' : 
    message.sender_role === 'advisor' ? 'م' : 'ج';
    
  const avatarColor = isCurrentUser ? 'bg-unlimited-blue text-white' : 
    message.sender_role === 'advisor' ? 'bg-green-500 text-white' : 
    'bg-purple-500 text-white';
  
  const avatarImage = isCurrentUser ? '/assets/user-avatar.png' : 
    message.sender_role === 'advisor' ? '/assets/advisor-avatar.png' : 
    '/assets/university-avatar.png';

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4 text-unlimited-blue" />;
    } else if (type.includes('pdf')) {
      return <FileText className="h-4 w-4 text-red-500" />;
    } else {
      return <PaperclipIcon className="h-4 w-4 text-unlimited-gray" />;
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "تم النسخ",
      description: "تم نسخ محتوى الرسالة"
    });
  };

  const handleTranslateMessage = () => {
    setIsTranslating(true);
    
    // Simulate translation delay
    setTimeout(() => {
      setIsTranslating(false);
      setShowTranslation(true);
      toast({
        title: "تمت الترجمة",
        description: "تمت ترجمة الرسالة"
      });
    }, 1000);
  };

  const handleDownloadAttachment = (attachment: Attachment) => {
    toast({
      title: "جاري التحميل",
      description: `جاري تحميل ${attachment.name}`
    });
    
    // In a real app, this would trigger a download
    setTimeout(() => {
      toast({
        title: "اكتمل التحميل",
        description: `تم تحميل ${attachment.name} بنجاح`
      });
    }, 1500);
  };

  const handleReportMessage = () => {
    toast({
      title: "تم الإبلاغ",
      description: "شكراً لإبلاغك. سيتم مراجعة الرسالة من قبل فريقنا."
    });
  };

  const getAttachmentThumbnail = (attachment: Attachment) => {
    if (attachment.type.startsWith('image/')) {
      // In a real app, this would be the actual image URL
      return "/assets/image-placeholder.jpg";
    }
    return null;
  };

  // Create a simulated translation of the message (for demo purposes)
  const translatedContent = "This is a simulated translation of the message content. In a real application, this would be an actual translation from Arabic to English using a translation service.";

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={avatarImage} alt={senderName} />
          <AvatarFallback className={avatarColor}>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-2.5 rounded-lg ${
          isCurrentUser ? 'bg-unlimited-blue text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}>
          <div className="flex justify-between items-start mb-1">
            <span className={`text-xs ${isCurrentUser ? 'text-unlimited-light-blue' : 'text-unlimited-gray'}`}>
              {senderName}
            </span>
            <div className="flex items-center">
              {message.sender_role === 'university' && (
                <Badge variant="outline" className="ml-1 text-[10px] h-4 bg-purple-50 text-purple-700 border-purple-200">
                  رسمي
                </Badge>
              )}
            </div>
          </div>
          
          <p className="mb-1 whitespace-pre-wrap">{message.content}</p>
          
          {showTranslation && (
            <div className="mt-2 p-2 border-t border-white/20 text-sm">
              <div className="flex items-center mb-1">
                <Badge variant="outline" className={isCurrentUser ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"}>
                  الترجمة (EN)
                </Badge>
              </div>
              <p className="italic text-sm">{translatedContent}</p>
            </div>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-2 rounded ${
                    isCurrentUser ? 'bg-unlimited-dark-blue/30' : 'bg-gray-200'
                  }`}
                >
                  {getFileIcon(attachment.type)}
                  <div className="ml-2 flex-1 min-w-0">
                    <div className="truncate text-sm">{attachment.name}</div>
                    <div className="text-xs opacity-70">{formatFileSize(attachment.size)}</div>
                  </div>
                  
                  <div className="flex items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setShowAttachmentPreview(attachment)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>معاينة</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleDownloadAttachment(attachment)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>تحميل</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className={`flex justify-between items-center mt-1.5 text-xs ${
            isCurrentUser ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
          }`}>
            <span>
              {format(new Date(message.created_at), 'HH:mm', { locale: ar })}
            </span>
            {isCurrentUser && (
              <div className="flex items-center">
                <CheckCircle className={`h-3 w-3 ml-1 ${message.is_read ? 'text-green-400' : 'text-unlimited-light-blue/50'}`} />
                {message.is_read ? 'تمت القراءة' : 'تم الإرسال'}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex mt-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-7 px-2 text-xs ${isCurrentUser ? 'text-unlimited-light-blue' : 'text-unlimited-gray'}`}
            onClick={handleCopyMessage}
          >
            <Copy className="h-3 w-3 mr-1" />
            نسخ
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-7 px-2 text-xs ${isCurrentUser ? 'text-unlimited-light-blue' : 'text-unlimited-gray'}`}
            onClick={handleTranslateMessage}
            disabled={isTranslating || showTranslation}
          >
            {isTranslating ? (
              <>
                <span className="loading loading-spinner loading-xs mr-1"></span>
                جاري الترجمة...
              </>
            ) : showTranslation ? (
              <>
                <ClipboardCopy className="h-3 w-3 mr-1" />
                تمت الترجمة
              </>
            ) : (
              <>
                <ClipboardCopy className="h-3 w-3 mr-1" />
                ترجمة
              </>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-7 px-2 text-xs ${isCurrentUser ? 'text-unlimited-light-blue' : 'text-unlimited-gray'}`}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isCurrentUser ? "end" : "start"}>
              <DropdownMenuItem onClick={() => {
                toast({
                  title: "جاري الرد",
                  description: "تم فتح محرر الرد"
                });
              }}>
                <Reply className="h-4 w-4 ml-2" />
                رد
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toast({
                  title: "تمت المشاركة",
                  description: "تم نسخ رابط الرسالة"
                });
              }}>
                <Share2 className="h-4 w-4 ml-2" />
                مشاركة
              </DropdownMenuItem>
              {!isCurrentUser && (
                <DropdownMenuItem onClick={handleReportMessage}>
                  <Flag className="h-4 w-4 ml-2" />
                  إبلاغ
                </DropdownMenuItem>
              )}
              {isCurrentUser && (
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: "تم الحذف",
                    description: "تم حذف الرسالة"
                  });
                }}>
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src={avatarImage} alt={senderName} />
          <AvatarFallback className={avatarColor}>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
      
      {/* Attachment Preview Dialog */}
      <Dialog open={!!showAttachmentPreview} onOpenChange={() => setShowAttachmentPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {showAttachmentPreview && getFileIcon(showAttachmentPreview.type)}
              <span className="mr-2">{showAttachmentPreview?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
            {showAttachmentPreview?.type.startsWith('image/') ? (
              <div className="relative w-full h-[400px] bg-gray-100 rounded flex items-center justify-center">
                <img 
                  src={getAttachmentThumbnail(showAttachmentPreview) || ''} 
                  alt="معاينة المرفق" 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
            ) : (
              <div className="p-8 text-center">
                <FileText className="h-20 w-20 mx-auto mb-4 text-unlimited-gray opacity-50" />
                <p className="text-unlimited-gray">المعاينة غير متاحة لهذا النوع من الملفات</p>
                <Button 
                  className="mt-4" 
                  onClick={() => handleDownloadAttachment(showAttachmentPreview)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  تحميل الملف
                </Button>
              </div>
            )}
            
            <div className="mt-4 w-full text-sm">
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="text-unlimited-gray">نوع الملف:</span>
                <span>{showAttachmentPreview?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-unlimited-gray">حجم الملف:</span>
                <span>{showAttachmentPreview ? formatFileSize(showAttachmentPreview.size) : ''}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAttachmentPreview(null)}>
              إغلاق
            </Button>
            {showAttachmentPreview && (
              <Button onClick={() => handleDownloadAttachment(showAttachmentPreview)}>
                <Download className="h-4 w-4 ml-1" />
                تحميل
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageItem;
