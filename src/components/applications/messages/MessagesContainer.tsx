
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import { Separator } from '@/components/ui/separator';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchApplicationMessages, 
  sendApplicationMessage,
  markMessagesAsRead
} from '@/services/messageService';

interface MessagesContainerProps {
  programName: string;
  universityName: string;
  applicationId: string;
}

const MessagesContainer = ({ programName, universityName, applicationId }: MessagesContainerProps) => {
  const { t, i18n } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Simulate current user data (should come from auth context in production)
  const currentUser = {
    id: localStorage.getItem('userRole') || 'student',
    role: localStorage.getItem('userRole') || 'student',
    name: localStorage.getItem('userRole') === 'admin' ? 'سارة محمود - مستشارة القبول' : 'محمد أحمد'
  };
  
  const loadMessages = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll use a mix of real and mock data
      let fetchedMessages = [];
      
      try {
        // Try to fetch from Supabase if connected
        fetchedMessages = await fetchApplicationMessages(applicationId);
      } catch (err) {
        console.log('Using mock messages (Supabase not connected)');
        // Use mock data if Supabase fetch fails
        fetchedMessages = [
          {
            id: '1',
            application_id: applicationId,
            sender_id: 'student-1',
            sender_role: 'student',
            content: t("application.messages.sampleMessage1", "مرحبًا، لدي استفسار بخصوص متطلبات القبول في البرنامج. هل يمكنني معرفة المزيد عن المستندات المطلوبة؟"),
            created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            is_read: true
          },
          {
            id: '2',
            application_id: applicationId,
            sender_id: 'admin-1',
            sender_role: 'admin',
            content: t("application.messages.sampleMessage2", "أهلاً بك! بالنسبة لمتطلبات القبول، ستحتاج إلى شهادة الثانوية العامة مع كشف الدرجات، جواز سفر ساري المفعول، وشهادة إجادة اللغة الإنجليزية. هل لديك أي أسئلة محددة حول أي من هذه المستندات؟"),
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            is_read: true
          },
          {
            id: '3',
            application_id: applicationId,
            sender_id: 'student-1',
            sender_role: 'student',
            content: t("application.messages.sampleMessage3", "شكرًا لك على المعلومات. هل هناك حد أدنى للدرجات مطلوب للقبول في البرنامج؟"),
            created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            is_read: true
          }
        ];
      }
      
      // Format messages for UI
      const formattedMessages = fetchedMessages.map(msg => ({
        id: msg.id,
        sender: msg.sender_role as 'student' | 'admin' | 'agent',
        senderName: msg.sender_role === 'admin' ? 'سارة محمود - مستشارة القبول' : 
                   msg.sender_role === 'agent' ? 'عمر خالد - مستشار الطلاب' : 'محمد أحمد',
        text: msg.content,
        timestamp: new Date(msg.created_at),
        read: msg.is_read === true,
        attachments: msg.attachments
      }));
      
      setMessages(formattedMessages);
      
      // Mark messages as read (if user is not the sender)
      try {
        await markMessagesAsRead(applicationId, currentUser.id);
      } catch (err) {
        console.log('Could not mark messages as read (mock or connection issue)');
      }
      
    } catch (err) {
      console.error('Error loading messages:', err);
      setError(t('messages.loadError', 'حدث خطأ أثناء تحميل الرسائل. يرجى المحاولة مرة أخرى.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Load messages when component mounts
  useEffect(() => {
    loadMessages();
    
    // Set up polling to refresh messages every 30 seconds
    const interval = setInterval(() => {
      loadMessages();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [applicationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string, attachments: any[] = []) => {
    if (!content.trim() && attachments.length === 0) return;
    
    setIsSending(true);
    
    try {
      // Try to send via Supabase
      const newMessage = {
        application_id: applicationId,
        sender_id: currentUser.id,
        sender_role: currentUser.role,
        content: content.trim(),
        attachments: attachments.length > 0 ? attachments : undefined,
        is_read: false
      };
      
      // Add optimistically to UI
      const uiMessage = {
        id: `temp-${Date.now()}`,
        sender: currentUser.role as 'student' | 'admin' | 'agent',
        senderName: currentUser.name,
        text: content.trim(),
        timestamp: new Date(),
        read: false,
        attachments: attachments.length > 0 ? attachments : undefined
      };
      
      setMessages(prev => [...prev, uiMessage]);
      
      try {
        // Send to server
        await sendApplicationMessage(newMessage);
      } catch (err) {
        console.log('Using mock messages (Supabase not connected for send)');
        // Just continue with optimistic update for demo
      }
      
      // For demo, simulate a reply from admin after 3 seconds if user is student
      if (currentUser.role === 'student') {
        setTimeout(() => {
          const adminReply = {
            id: `reply-${Date.now()}`,
            sender: 'admin' as 'student' | 'admin' | 'agent',
            senderName: 'سارة محمود - مستشارة القبول',
            text: t('messages.autoReply', 'شكرًا لرسالتك! سيتم الرد عليك في أقرب وقت ممكن.'),
            timestamp: new Date(),
            read: true
          };
          
          setMessages(prev => [...prev, adminReply]);
        }, 3000);
      }
      
    } catch (err) {
      console.error('Error sending message:', err);
      toast({
        title: t('messages.sendError', 'حدث خطأ أثناء إرسال الرسالة'),
        description: t('messages.tryAgain', 'يرجى المحاولة مرة أخرى'),
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("application.messages.title", "المراسلات")}</CardTitle>
        <CardDescription>
          {t("application.messages.subtitle", "التواصل مع فريق القبول بخصوص")} {programName} - {universityName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4 border-b">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-unlimited-blue" />
              <span className="ml-2">{t('messages.loading', 'جاري تحميل الرسائل...')}</span>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('error.title', 'خطأ')}</AlertTitle>
              <AlertDescription>
                {error}
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={loadMessages}
                  >
                    {t('messages.retry', 'إعادة المحاولة')}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-unlimited-gray">
              <p className="mb-2">{t('messages.noMessages', 'لا توجد رسائل بعد')}</p>
              <p className="text-sm">{t('messages.startConversation', 'ابدأ المحادثة مع فريق القبول')}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto p-2">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSender={message.sender === currentUser.role}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <MessageInput
            applicationId={applicationId}
            onSendMessage={handleSendMessage}
            disabled={isSending}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesContainer;
