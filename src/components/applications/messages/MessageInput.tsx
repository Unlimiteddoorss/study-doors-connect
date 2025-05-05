
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send, X, FileText, Image, File } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { uploadMessageAttachment } from '@/services/messageService';

interface MessageInputProps {
  applicationId: string;
  onSendMessage: (content: string, attachments: any[]) => Promise<void>;
  disabled?: boolean;
}

const MessageInput = ({ applicationId, onSendMessage, disabled = false }: MessageInputProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (fileType.includes('pdf')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newAttachments = [...attachments];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: t('error.fileTooLarge', 'الملف كبير جدًا'),
            description: t('error.maxFileSize', 'الحد الأقصى لحجم الملف هو 5 ميجابايت'),
            variant: 'destructive'
          });
          continue;
        }

        const fileData = await uploadMessageAttachment(applicationId, file);
        newAttachments.push(fileData);
      }

      setAttachments(newAttachments);
      
      toast({
        title: t('messages.attachmentsUploaded', 'تم رفع المرفقات'),
        description: t('messages.attachmentsReady', 'المرفقات جاهزة للإرسال'),
      });
    } catch (error) {
      console.error('Error uploading attachments:', error);
      toast({
        title: t('error.uploadFailed', 'فشل رفع الملفات'),
        description: t('error.tryAgain', 'يرجى المحاولة مرة أخرى'),
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!message.trim() && attachments.length === 0) return;
    
    try {
      await onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('error.sendFailed', 'فشل إرسال الرسالة'),
        description: t('error.tryAgain', 'يرجى المحاولة مرة أخرى'),
        variant: 'destructive'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t pt-3">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((attachment, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm">
              {getFileIcon(attachment.type)}
              <span className="max-w-[150px] truncate">{attachment.name}</span>
              <button 
                type="button" 
                onClick={() => removeAttachment(i)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('messages.typeSomething', 'اكتب رسالتك هنا...')}
            className={`min-h-[80px] resize-none ${isRtl ? 'text-right' : 'text-left'}`}
            disabled={disabled || isUploading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button 
            type="button" 
            size="icon" 
            variant="outline" 
            onClick={handleAttachFile}
            disabled={disabled || isUploading}
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">{t('messages.attach', 'إرفاق ملف')}</span>
          </Button>
          <Button 
            type="submit" 
            size="icon" 
            disabled={(!message.trim() && attachments.length === 0) || disabled || isUploading}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">{t('messages.send', 'إرسال')}</span>
          </Button>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        multiple
        accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
      />
      
      <p className="text-xs text-unlimited-gray mt-2">
        {t('messages.supportedFileTypes', 'الملفات المدعومة: الصور, PDF, Word, Excel, PowerPoint, النصوص')}
        {' • '}
        {t('messages.maxFileSize', 'الحد الأقصى للملف: 5MB')}
      </p>
    </form>
  );
};

export default MessageInput;
