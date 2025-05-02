
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MessageInputProps {
  onSendMessage: (text: string, attachments: File[]) => void;
  isSending: boolean;
}

const MessageInput = ({ onSendMessage, isSending }: MessageInputProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAttachmentUpload = (files: FileList | null) => {
    if (!files) return;
    const newAttachments = Array.from(files);
    setAttachments([...attachments, ...newAttachments]);
    
    toast({
      title: "تم إرفاق الملفات",
      description: `تم إرفاق ${newAttachments.length} ملف/ملفات بنجاح.`
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage(newMessage, attachments);
      setNewMessage('');
      setAttachments([]);
    }
  };

  return (
    <div>
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 rounded p-1 pr-2 text-sm">
              <span className="max-w-[150px] truncate">{file.name}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 ml-1"
                onClick={() => removeAttachment(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex gap-2">
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            multiple
            onChange={(e) => handleAttachmentUpload(e.target.files)}
          />
        </div>
        
        <Textarea
          placeholder={t("application.messages.inputPlaceholder")}
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        
        <Button
          type="button"
          onClick={handleSend}
          disabled={isSending || (newMessage.trim() === '' && attachments.length === 0)}
        >
          <Send className={`h-4 w-4 ${isRtl ? 'mr-1' : 'ml-1'}`} />
          {t("application.messages.send")}
        </Button>
      </div>
      
      <p className="text-xs text-unlimited-gray mt-2 text-center">
        {t("application.messages.enterHint", "يمكنك استخدام الزر Enter للإرسال. استخدم Shift + Enter لإضافة سطر جديد.")}
      </p>
    </div>
  );
};

export default MessageInput;
