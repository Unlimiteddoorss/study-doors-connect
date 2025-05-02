import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  text: string;
  sender: 'student' | 'admin';
  senderName: string;
  timestamp: Date;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size?: number;
    type?: string;
  }[];
  read: boolean;
}

interface MessagesContainerProps {
  programName: string;
  universityName: string;
  applicationId: number;
}

const MessagesContainer = ({ programName, universityName, applicationId }: MessagesContainerProps) => {
  const { t, i18n } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Keep existing mock messages setup
    const mockMessages: Message[] = [
      {
        id: '1',
        text: t("application.messages.sampleMessage1"),
        sender: 'student',
        senderName: 'محمد أحمد',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        read: true
      },
      {
        id: '2',
        text: t("application.messages.sampleMessage2"),
        sender: 'admin',
        senderName: 'سارة محمود - مستشارة القبول',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true
      },
      {
        id: '3',
        text: t("application.messages.sampleMessage3"),
        sender: 'student',
        senderName: 'محمد أحمد',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
        attachments: [
          {
            id: '1',
            name: 'passport_scan.pdf',
            url: '/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png',
            size: 2500000,
            type: 'application/pdf'
          }
        ]
      }
    ];

    setMessages(mockMessages);
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string, attachments: File[]) => {
    setIsSending(true);

    const messageAttachments = attachments.map((file, index) => ({
      id: `attachment-${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type
    }));

    setTimeout(() => {
      const newMessageObj: Message = {
        id: `msg-${Date.now()}`,
        text,
        sender: 'student',
        senderName: 'محمد أحمد',
        timestamp: new Date(),
        attachments: messageAttachments.length > 0 ? messageAttachments : undefined,
        read: false
      };

      setMessages(prev => [...prev, newMessageObj]);
      setIsSending(false);

      if (Math.random() > 0.5) {
        setTimeout(() => {
          const adminResponse: Message = {
            id: `msg-${Date.now()}`,
            text: t('application.messages.autoResponse', 'شكراً لرسالتك. سيتم الرد عليك قريباً من قبل فريق القبول.'),
            sender: 'admin',
            senderName: t('application.messages.autoResponseSender', 'نظام الرسائل الآلي'),
            timestamp: new Date(),
            read: false
          };

          setMessages(prev => [...prev, adminResponse]);
        }, Math.random() * 2000 + 1000);
      }
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("application.messages.title")}</CardTitle>
        <CardDescription>
          {t("application.messages.subtitle", { program: programName, university: universityName })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md bg-gray-50 p-4 h-80 overflow-y-auto mb-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-unlimited-gray">
                <p>{t("application.messages.noMessages")}</p>
                <p className="text-sm">{t("application.messages.startConversation")}</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id} className="flex flex-col">
                  <MessageBubble message={message} />
                  
                  {index < messages.length - 1 && 
                   new Date(messages[index + 1].timestamp).getDate() !== new Date(message.timestamp).getDate() && (
                    <div className="relative my-6">
                      <Separator />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2 text-xs text-unlimited-gray">
                        {new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium' }).format(messages[index + 1].timestamp)}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <MessageInput onSendMessage={handleSendMessage} isSending={isSending} />
      </CardContent>
    </Card>
  );
};

export default MessagesContainer;
