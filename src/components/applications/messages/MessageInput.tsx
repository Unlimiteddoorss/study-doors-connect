
import { useState, FormEvent } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { createMessage } from '@/services/messageService';
import { v4 as uuidv4 } from 'uuid';

interface MessageInputProps {
  applicationId: string;
  onMessageSent: () => void;
}

const MessageInput = ({ applicationId, onMessageSent }: MessageInputProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && attachments.length === 0) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, you would get the current user ID and role from auth context
      const userId = 'student-1';
      const userRole = 'student';
      
      // Create a message object
      const newMessage = {
        id: uuidv4(),
        application_id: applicationId,
        sender_id: userId,
        sender_role: userRole,
        content: message.trim(),
        attachments: attachments.length > 0 ? attachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })) : null,
        created_at: new Date().toISOString(),
        is_read: false
      };
      
      // Send message to server
      await createMessage(newMessage);
      
      // Reset form
      setMessage('');
      setAttachments([]);
      
      // Notify parent component
      onMessageSent();
      
      toast({
        title: t('messages.sent', 'تم إرسال الرسالة'),
        description: t('messages.sentDescription', 'تم إرسال رسالتك بنجاح'),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('messages.error', 'خطأ في الإرسال'),
        description: t('messages.errorDescription', 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...fileArray]);
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="border-t pt-4">
      {attachments.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 text-sm">
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button 
                type="button" 
                onClick={() => removeAttachment(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('messages.placeholder', 'اكتب رسالتك هنا...')}
        className="resize-none mb-2"
        rows={3}
      />
      
      <div className="flex justify-between items-center">
        <div>
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              {t('messages.attachment', 'إرفاق ملف')}
            </Button>
          </label>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading || (!message.trim() && attachments.length === 0)}
          className="gap-2"
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {t('messages.send', 'إرسال')}
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
