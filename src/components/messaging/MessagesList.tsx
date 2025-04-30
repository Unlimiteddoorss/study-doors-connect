
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, PaperclipIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
  read?: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

interface MessagesListProps {
  messages: Message[];
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  };
  onSendMessage: (content: string, attachments?: File[]) => void;
}

const MessagesList = ({
  messages,
  recipient,
  onSendMessage,
}: MessagesListProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim() === '' && attachments.length === 0) return;
    
    onSendMessage(newMessage, attachments);
    setNewMessage('');
    setAttachments([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length > 5) {
        toast({
          title: "تجاوز الحد الأقصى للمرفقات",
          description: "لا يمكن إرفاق أكثر من 5 ملفات في رسالة واحدة",
          variant: "destructive",
        });
        return;
      }
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="border-b p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={recipient.avatar} alt={recipient.name} />
          <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{recipient.name}</h3>
          <p className="text-sm text-unlimited-gray">
            {recipient.isOnline ? 'متصل الآن' : 'غير متصل'}
          </p>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-unlimited-blue text-white rounded-tr-none'
                    : 'bg-gray-100 text-unlimited-dark-blue rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="text-sm flex items-center">
                        <PaperclipIcon className="h-3 w-3 mr-1" />
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {attachment.name}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-unlimited-blue-100'
                      : 'text-unlimited-gray'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <CardContent className="p-4 border-t">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded px-2 py-1 flex items-center gap-1 text-sm"
              >
                <PaperclipIcon className="h-3 w-3" />
                <span className="max-w-[100px] truncate">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-unlimited-gray hover:text-unlimited-red"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            type="button"
            className="shrink-0"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <PaperclipIcon className="h-4 w-4" />
            <input
              type="file"
              id="file-upload"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </Button>
          <Textarea
            placeholder="اكتب رسالتك هنا..."
            className="resize-none min-h-[80px]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button
            size="icon"
            className="shrink-0"
            onClick={handleSendMessage}
            disabled={newMessage.trim() === '' && attachments.length === 0}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesList;
