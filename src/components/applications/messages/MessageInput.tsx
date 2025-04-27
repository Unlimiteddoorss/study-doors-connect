
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isSending?: boolean;
  placeholder?: string;
  hasFiles?: boolean;
}

const MessageInput = ({ onSendMessage, isSending = false, placeholder = 'اكتب رسالة...', hasFiles = false }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // تفعيل إرسال الرسالة عند الضغط على Enter (بدون Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() || hasFiles) {
        handleSendMessage();
      }
    }
  };
  
  // ضبط ارتفاع النص تلقائياً
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  
  const handleSendMessage = () => {
    if (!isSending && (message.trim() || hasFiles)) {
      onSendMessage(message);
      setMessage('');
      
      // إعادة ضبط ارتفاع النص
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="flex w-full items-end gap-2">
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
        disabled={isSending || (!message.trim() && !hasFiles)}
        className="flex-shrink-0 bg-unlimited-blue hover:bg-unlimited-dark-blue h-10"
      >
        {isSending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default MessageInput;
