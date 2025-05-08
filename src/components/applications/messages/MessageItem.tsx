
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { User, Download, FileText, Image, PaperclipIcon, MoreVertical, Copy, Reply, Forward, Star, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Attachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

interface Message {
  id: string;
  application_id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  attachments?: Attachment[];
  created_at: string;
  is_read: boolean;
}

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  const { toast } = useToast();
  const [showAttachmentPreview, setShowAttachmentPreview] = useState<string | null>(null);
  
  // Format the date from the created_at field
  const formattedDate = format(new Date(message.created_at), 'HH:mm', { locale: ar });

  const getSenderRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-unlimited-blue';
      case 'advisor':
        return 'bg-green-500';
      case 'university':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getSenderName = (role: string) => {
    switch (role) {
      case 'student':
        return 'أنت';
      case 'advisor':
        return 'المستشار التعليمي';
      case 'university':
        return 'ممثل الجامعة';
      default:
        return 'المستخدم';
    }
  };

  const getAttachmentIcon = (type: string) => {
    if (type.includes('image')) {
      return <Image className="h-4 w-4 text-unlimited-gray ml-2" />;
    } else {
      return <FileText className="h-4 w-4 text-unlimited-gray ml-2" />;
    }
  };

  const getAttachmentPreviewUrl = (attachment: Attachment) => {
    return attachment.url || '#';
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: 'تم النسخ',
      description: 'تم نسخ نص الرسالة إلى الحافظة.',
    });
  };

  const handleForward = () => {
    toast({
      title: 'إعادة توجيه',
      description: 'سيتم تنفيذ هذه الميزة قريباً.',
    });
  };

  const handleReply = () => {
    toast({
      title: 'رد',
      description: 'سيتم تنفيذ هذه الميزة قريباً.',
    });
  };

  const handleStar = () => {
    toast({
      title: 'تمييز بنجمة',
      description: 'تم تمييز الرسالة بنجمة.',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 ml-3">
          <div className={`w-9 h-9 rounded-full ${getSenderRoleColor(message.sender_role)} flex items-center justify-center text-white`}>
            <User className="h-5 w-5" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[75%] ${isCurrentUser ? 'ml-4' : 'mr-4'}`}>
        {!isCurrentUser && (
          <div className="text-sm font-medium text-unlimited-gray mb-1">
            {getSenderName(message.sender_role)}
          </div>
        )}
        
        <div className={`p-4 rounded-lg ${
          isCurrentUser 
            ? 'bg-unlimited-blue text-white rounded-tr-none' 
            : 'bg-gray-100 rounded-tl-none'
        }`}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-2 rounded ${
                    isCurrentUser ? 'bg-unlimited-dark-blue/20' : 'bg-gray-200'
                  }`}
                >
                  <div className="flex items-center overflow-hidden">
                    {getAttachmentIcon(attachment.type)}
                    <span className="truncate max-w-[150px] text-sm">{attachment.name}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-xs ml-2">{formatFileSize(attachment.size)}</span>
                    
                    <div className="flex">
                      {attachment.type.includes('image') && (
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => setShowAttachmentPreview(attachment.name)}
                          >
                            <Image className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      )}
                      
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between mt-2 items-center">
            <div className={`text-xs ${isCurrentUser ? 'text-unlimited-light-blue/80' : 'text-unlimited-gray'}`}>
              {formattedDate}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`h-6 w-6 p-0 rounded-full ${
                    isCurrentUser ? 'text-white/70 hover:text-white hover:bg-unlimited-dark-blue/20' : 'text-unlimited-gray hover:bg-gray-200'
                  }`}
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isCurrentUser ? 'end' : 'start'} className="w-48">
                <DropdownMenuItem onClick={handleCopyText}>
                  <Copy className="h-4 w-4 ml-2" />
                  نسخ النص
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleReply}>
                  <Reply className="h-4 w-4 ml-2" />
                  رد
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleForward}>
                  <Forward className="h-4 w-4 ml-2" />
                  إعادة توجيه
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleStar}>
                  <Star className="h-4 w-4 ml-2" />
                  تمييز بنجمة
                </DropdownMenuItem>
                {isCurrentUser && (
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-9 h-9 rounded-full bg-unlimited-blue flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
        </div>
      )}
      
      {/* Image Preview Dialog */}
      {message.attachments && message.attachments.some(a => a.type.includes('image')) && (
        <Dialog>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PaperclipIcon className="h-5 w-5" />
                معاينة المرفق
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center">
              {message.attachments
                .filter(a => a.type.includes('image') && a.name === showAttachmentPreview)
                .map((attachment, index) => (
                  <div key={index} className="text-center">
                    <img 
                      src={getAttachmentPreviewUrl(attachment)}
                      alt={attachment.name}
                      className="max-w-full max-h-[70vh] object-contain rounded-md"
                    />
                    <p className="mt-2 text-sm text-unlimited-gray">{attachment.name} ({formatFileSize(attachment.size)})</p>
                    <Button className="mt-3" size="sm" onClick={() => window.open(getAttachmentPreviewUrl(attachment))}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل الملف
                    </Button>
                  </div>
                ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MessageItem;
