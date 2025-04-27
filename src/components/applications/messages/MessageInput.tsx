
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, Paperclip } from 'lucide-react';
import { useMessageAttachments } from '@/hooks/useMessageAttachments';
import MessageAttachments from './MessageAttachments';

interface MessageInputProps {
  onSendMessage: (message: string, attachments: File[]) => void;
  isSending?: boolean;
  placeholder?: string;
}

const MessageInput = ({ onSendMessage, isSending = false, placeholder = 'اكتب رسالة...' }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    attachments, 
    addAttachments, 
    removeAttachment, 
    clearAttachments,
    hasAttachments 
  } = useMessageAttachments();
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() || hasAttachments) {
        handleSendMessage();
      }
    }
  };
  
  const handleSendMessage = () => {
    if (!isSending && (message.trim() || hasAttachments)) {
      onSendMessage(
        message, 
        attachments.map(att => att.file)
      );
      setMessage('');
      clearAttachments();
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {hasAttachments && (
        <MessageAttachments
          attachments={attachments}
          onRemove={removeAttachment}
        />
      )}
      
      <div className="flex w-full items-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="flex-shrink-0"
          onClick={handleFileClick}
          disabled={isSending}
        >
          <Paperclip className="h-4 w-4" />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => addAttachments(e.target.files)}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          />
        </Button>
        
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-10 flex-1 resize-none overflow-hidden rounded-md py-2"
          rows={1}
          maxLength={1000}
          disabled={isSending}
        />
        
        <Button
          type="button"
          size="icon"
          onClick={handleSendMessage}
          disabled={isSending || (!message.trim() && !hasAttachments)}
          className="flex-shrink-0 bg-unlimited-blue hover:bg-unlimited-dark-blue h-10"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <p className="text-xs text-unlimited-gray text-center">
        يمكنك إرفاق ملفات (الحد الأقصى: 5 ملفات، 5 ميجابايت لكل ملف)
      </p>
    </div>
  );
};

export default MessageInput;
