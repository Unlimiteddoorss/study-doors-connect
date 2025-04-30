
import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip } from 'lucide-react';
import { type Message } from '@/pages/messaging/UserMessages';

interface MessagesListProps {
  messages: Message[];
  currentUserId?: string;
}

const MessagesList = ({ messages, currentUserId = 'student' }: MessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === currentUserId
                  ? 'bg-unlimited-blue text-white rounded-tl-none'
                  : 'bg-gray-100 text-gray-800 rounded-tr-none'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Paperclip className="h-3 w-3" />
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs underline"
                      >
                        {attachment.name}
                      </a>
                    </div>
                  ))}
                </div>
              )}
              <div
                className={`text-xs mt-1 text-right ${
                  message.sender === currentUserId ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
                }`}
              >
                {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
