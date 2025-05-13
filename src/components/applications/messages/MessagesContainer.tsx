
import { useEffect, useRef, useState } from 'react';
import MessageBubble, { MessageBubbleProps } from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio' | 'video' | 'other';
  fileName: string;
  fileSize: string;
  url: string;
  thumbnail?: string;
  file: File;
}

interface MessagesContainerProps {
  programName: string;
  universityName: string;
  applicationId: string;
}

const MessagesContainer = ({ 
  programName, 
  universityName, 
  applicationId 
}: MessagesContainerProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const replyToMessageRef = useRef<string | null>(null);
  
  // Load sample messages for demo
  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      const demoMessages: MessageBubbleProps[] = [
        {
          id: '1',
          sender: {
            name: 'مسؤول القبول',
            initials: 'م',
          },
          content: 'مرحباً بك في نظام التقديم على جامعة إسطنبول. يمكنك التواصل معنا مباشرة من خلال هذه المحادثة لأي استفسارات متعلقة بطلبك.',
          timestamp: '10:30 صباحاً، 5 مايو 2025',
          isUser: false,
        },
        {
          id: '2',
          sender: {
            name: 'أنت',
          },
          content: 'شكراً جزيلاً! لدي بعض الاستفسارات حول المستندات المطلوبة للتقديم.',
          timestamp: '10:35 صباحاً، 5 مايو 2025',
          isUser: true,
          isRead: true,
        },
        {
          id: '3',
          sender: {
            name: 'مسؤول القبول',
            initials: 'م',
          },
          content: 'بالتأكيد، تحتاج إلى تقديم المستندات التالية:\n- نسخة من جواز السفر\n- كشف الدرجات\n- شهادة الثانوية العامة\n- صورة شخصية\n- رسالة توصية (اختياري)',
          timestamp: '10:40 صباحاً، 5 مايو 2025',
          isUser: false,
        },
        {
          id: '4',
          sender: {
            name: 'مسؤول القبول',
            initials: 'م',
          },
          content: 'يمكنك الاطلاع على المزيد من المعلومات في دليل التقديم المرفق.',
          timestamp: '10:42 صباحاً، 5 مايو 2025',
          isUser: false,
          attachments: [
            {
              id: 'attachment-1',
              type: 'document',
              fileName: 'دليل التقديم.pdf',
              fileSize: '2.5 MB',
              url: 'https://example.com/guide.pdf'
            }
          ]
        },
        {
          id: '5',
          sender: {
            name: 'أنت',
          },
          content: 'شكراً جزيلاً للمعلومات! هل هناك موعد نهائي للتقديم؟',
          timestamp: '10:45 صباحاً، 5 مايو 2025',
          isUser: true,
          isRead: true,
        },
        {
          id: '6',
          sender: {
            name: 'مسؤول القبول',
            initials: 'م',
          },
          content: 'الموعد النهائي للتقديم هو 20 يونيو 2025. نوصي بتقديم طلبك مبكراً لضمان معالجته في الوقت المناسب.',
          timestamp: '10:50 صباحاً، 5 مايو 2025',
          isUser: false,
        },
      ];
      
      setMessages(demoMessages);
      setIsLoading(false);
    }, 1500);
  }, []);
  
  // Handle scroll behavior
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading]);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Generate a reply from the "university" after a short delay
  const simulateReply = (userMessage: string) => {
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        const replyContent = getSimulatedReply(userMessage);
        const newMessage: MessageBubbleProps = {
          id: `message-${Date.now()}`,
          sender: {
            name: 'مسؤول القبول',
            initials: 'م',
          },
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + `, ${new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}`,
          isUser: false,
        };
        
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };
  
  // Generate a realistic response based on user message content
  const getSimulatedReply = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('موعد') || lowerCaseMessage.includes('متى') || lowerCaseMessage.includes('تاريخ')) {
      return 'المواعيد المهمة القادمة:\n- الموعد النهائي للتقديم: 20 يونيو 2025\n- إعلان نتائج القبول: 15 يوليو 2025\n- بدء الدراسة: 15 سبتمبر 2025';
    } else if (lowerCaseMessage.includes('مستند') || lowerCaseMessage.includes('وثائق') || lowerCaseMessage.includes('أوراق')) {
      return 'المستندات المطلوبة للتقديم هي:\n1. صورة من جواز السفر\n2. كشف درجات آخر مؤهل دراسي\n3. شهادة إجادة اللغة الإنجليزية (إن وجدت)\n4. السيرة الذاتية\n5. خطاب النوايا';
    } else if (lowerCaseMessage.includes('تكلفة') || lowerCaseMessage.includes('رسوم') || lowerCaseMessage.includes('سعر')) {
      return 'رسوم البرنامج تختلف حسب التخصص. لبرنامج الطب حوالي 20,000$ سنوياً. تتوفر خيارات للمنح الدراسية والتقسيط، يمكنك الاستفسار عن التفاصيل.';
    } else if (lowerCaseMessage.includes('شكر') || lowerCaseMessage.includes('thanks')) {
      return 'شكراً لك! نحن دائماً في خدمتك. إذا كان لديك أي استفسارات أخرى، لا تتردد في التواصل معنا.';
    } else {
      return 'شكراً لرسالتك. سنقوم بمراجعتها والرد عليك في أقرب وقت ممكن. إذا كانت هناك أي استفسارات عاجلة، يمكنك التواصل معنا مباشرة على الرقم +90 XXX XXX XXXX.';
    }
  };
  
  // Handle sending a new message
  const handleSendMessage = (message: string, attachments?: Attachment[]) => {
    if (!message.trim() && (!attachments || attachments.length === 0)) return;
    
    const newMessage: MessageBubbleProps = {
      id: `message-${Date.now()}`,
      sender: {
        name: 'أنت',
      },
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + `, ${new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      isUser: true,
      isRead: false,
      attachments: attachments?.map(att => ({
        id: att.id,
        type: att.type,
        fileName: att.fileName,
        fileSize: att.fileSize,
        url: att.url,
        thumbnail: att.thumbnail
      }))
    };
    
    if (replyToMessageRef.current) {
      // Here you would handle replying to a specific message
      // For demo, we're just adding the new message
      replyToMessageRef.current = null;
    }
    
    setMessages(prev => [...prev, newMessage]);
    simulateReply(message);
    
    toast({
      description: "تم إرسال رسالتك بنجاح"
    });
  };
  
  // Handle replying to a specific message
  const handleReplyToMessage = (messageId: string) => {
    replyToMessageRef.current = messageId;
    const message = messages.find(m => m.id === messageId);
    
    if (message) {
      toast({
        title: `الرد على رسالة ${message.isUser ? 'منك' : 'من ' + message.sender.name}`,
        description: message.content.substring(0, 50) + (message.content.length > 50 ? '...' : '')
      });
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0f172a]">
      {/* Messages container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 mb-1 scroll-smooth"
      >
        {isLoading ? (
          // Skeleton loaders for messages
          <div className="space-y-4">
            <div className="flex items-start">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="ml-2 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-64 rounded-md" />
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="mr-2 space-y-2">
                <Skeleton className="h-4 w-32 ml-auto" />
                <Skeleton className="h-12 w-48 rounded-md" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="ml-2 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-72 rounded-md" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="text-center mb-8">
                <div className="inline-block py-1 px-3 bg-unlimited-light-blue/20 text-unlimited-blue rounded-full text-sm mb-1">
                  بدء المحادثة
                </div>
                <div className="text-xs text-unlimited-gray">5 مايو 2025</div>
              </div>
              
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  {...message} 
                  onReply={handleReplyToMessage}
                />
              ))}
            </div>
            
            {isTyping && (
              <TypingIndicator 
                isTyping={true} 
                name="مسؤول القبول" 
                className="mb-4"
              />
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-20 right-4 rounded-full h-8 w-8 bg-white shadow-md border"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
      
      {/* Message input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onTypingChange={setIsTyping}
        disabled={isLoading}
        placeholder="اكتب رسالتك هنا..."
      />
    </div>
  );
};

export default MessagesContainer;
