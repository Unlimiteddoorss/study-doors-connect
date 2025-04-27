
import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: 'user' | 'admin' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: { name: string; url: string; type: string }[];
}

interface MessagesContextType {
  messages: Message[];
  sendMessage: (text: string, files?: File[]) => Promise<void>;
  markAsRead: () => void;
  unreadCount: number;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  const sendMessage = async (text: string, files?: File[]) => {
    try {
      const attachments = files?.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }));

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        message: text,
        timestamp: new Date().toISOString(),
        read: true,
        attachments
      };

      setMessages(prev => [...prev, newMessage]);

      // Simulate server response
      setTimeout(() => {
        const response: Message = {
          id: `msg-${Date.now() + 1}`,
          sender: 'admin',
          message: 'شكراً لتواصلك معنا. سيتم الرد على رسالتك قريباً.',
          timestamp: new Date().toISOString(),
          read: false
        };
        setMessages(prev => [...prev, response]);
      }, 1000);

    } catch (error) {
      toast({
        title: "خطأ في إرسال الرسالة",
        description: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    }
  };

  const markAsRead = () => {
    setMessages(prev =>
      prev.map(msg => ({ ...msg, read: true }))
    );
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <MessagesContext.Provider value={{ messages, sendMessage, markAsRead, unreadCount }}>
      {children}
    </MessagesContext.Provider>
  );
}

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};
