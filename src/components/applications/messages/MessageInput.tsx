
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendMessage } from '@/services/messageService';
import { PaperclipIcon, X, Send, Image, FileText, Smile } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MessageInputProps {
  applicationId: string;
  onMessageSent: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ applicationId, onMessageSent }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = async () => {
    if ((!message.trim() && attachments.length === 0) || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would handle file uploads here
      // For simplicity, we'll just simulate it
      const attachmentData = attachments.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // This is just for demo purposes
      }));
      
      // Send message to server (in this case, our mock service)
      await sendMessage(
        applicationId,
        'student-1', // Hardcoded for demo
        message,
        attachmentData
      );
      
      // Clear form and notify parent
      setMessage('');
      setAttachments([]);
      onMessageSent();
      
      // Show success toast
      toast({
        title: t('messages.sent', 'تم إرسال الرسالة'),
        description: t('messages.sentSuccess', 'تم إرسال رسالتك بنجاح'),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        title: t('messages.error', 'خطأ'),
        description: t('messages.sendError', 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
      
      // Clear the input so the same file can be selected again
      e.target.value = '';
    }
  };
  
  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="w-full">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 max-h-24 overflow-y-auto p-2 bg-gray-50 rounded-md">
          {attachments.map((file, index) => (
            <div 
              key={index}
              className="bg-white border rounded-md px-2 py-1 flex items-center gap-2 text-sm shadow-sm"
            >
              {file.type.includes('image') ? (
                <Image className="h-4 w-4 text-unlimited-gray" />
              ) : (
                <FileText className="h-4 w-4 text-unlimited-gray" />
              )}
              <span className="truncate max-w-[100px]">{file.name}</span>
              <span className="text-xs text-unlimited-gray">
                {file.size < 1024 * 1024
                  ? `${Math.round(file.size / 1024)} KB`
                  : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 rounded-full"
                onClick={() => handleRemoveAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        {/* Attachment options */}
        <div className="flex-shrink-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" type="button">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="flex gap-2 p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Image className="h-4 w-4" />
                  صورة
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileText className="h-4 w-4" />
                  ملف
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
            className="hidden"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        {/* Message input */}
        <div className="flex-grow">
          <Textarea
            placeholder={t('messages.typePlaceholder', 'اكتب رسالتك هنا...')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            className="resize-none min-h-[70px] max-h-28"
          />
        </div>
        
        {/* Send button */}
        <Button
          type="button"
          disabled={(!message.trim() && attachments.length === 0) || isSubmitting}
          onClick={handleSendMessage}
          className="flex-shrink-0"
        >
          {isSubmitting ? (
            <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
          ) : (
            <Send className="h-4 w-4 ml-1" />
          )}
          {t('messages.send', 'إرسال')}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
