
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMessages } from '@/services/messageService';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  application_id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  attachments?: any[];
  created_at: string;
  is_read: boolean;
}

interface MessagesContainerProps {
  programName: string;
  universityName: string;
  applicationId: string;
}

const MessagesContainer = ({ programName, universityName, applicationId }: MessagesContainerProps) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages when component mounts or applicationId changes
  useEffect(() => {
    fetchMessages();
  }, [applicationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch messages from the server using Supabase
      const result = await getMessages(applicationId);
      setMessages(result);
    } catch (error) {
      console.error('Error fetching messages:', error);
      
      // For demo, generate some mock messages if the server request fails
      const mockMessages: Message[] = [
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'advisor-1',
          sender_role: 'advisor',
          content: 'مرحباً، أود إبلاغك بأن طلبك قيد المراجعة حالياً. يمكنك الاستفسار عن أي شيء هنا.',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          is_read: true
        },
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'student-1',
          sender_role: 'student',
          content: 'شكراً لكم. متى يمكنني توقع رد نهائي على طلبي؟',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          is_read: true
        },
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'advisor-1',
          sender_role: 'advisor',
          content: 'عادة ما تستغرق مراجعة الطلبات من 7 إلى 14 يوم عمل. سيتم إشعارك فور صدور القرار النهائي.',
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          is_read: true
        }
      ];
      
      setMessages(mockMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessageSent = () => {
    // Refresh messages after sending a new one
    fetchMessages();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{t('application.messages.title', 'المراسلات')}</CardTitle>
        <CardDescription>
          {programName} - {universityName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden flex flex-col pb-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
          </div>
        ) : messages.length > 0 ? (
          <div className="flex-1 overflow-y-auto mb-4 pr-1">
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageItem 
                  key={message.id} 
                  message={message} 
                  isCurrentUser={message.sender_role === 'student'}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-unlimited-gray">
              <p>{t('application.messages.noMessages', 'لا توجد رسائل بعد.')}</p>
              <p>{t('application.messages.startConversation', 'ابدأ المحادثة بإرسال رسالة.')}</p>
            </div>
          </div>
        )}
        
        <MessageInput applicationId={applicationId} onMessageSent={handleMessageSent} />
      </CardContent>
    </Card>
  );
};

export default MessagesContainer;
