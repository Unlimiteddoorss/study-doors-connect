import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Bot, Book, Search, ArrowRight, User, Sparkles, SendHorizontal, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface MessagesAIProps {
  applicationId: string;
}

interface AIMessage {
  id: string;
  role: 'ai' | 'user' | 'system';
  content: string;
  timestamp: Date;
  thinking?: boolean;
  links?: {
    title: string;
    url: string;
  }[];
}

const MessagesAI = ({ applicationId }: MessagesAIProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Predefined suggestions
  const suggestions = [
    "ما هي المستندات المطلوبة لطلبي؟",
    "متى يمكنني توقع الحصول على رد نهائي؟",
    "ما هي الخطوة التالية في عملية التقديم؟",
    "هل يمكنني تعديل بعض المعلومات في طلبي؟"
  ];
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Add welcome message
      setMessages([
        {
          id: '1',
          role: 'system',
          content: 'تم تفعيل المساعد الذكي لطلبك. يمكنك طرح أي أسئلة متعلقة بطلب القبول الخاص بك.',
          timestamp: new Date(),
        },
        {
          id: '2',
          role: 'ai',
          content: `مرحباً! أنا المساعد الذكي الخاص بمنصة أبواب بلا حدود. يمكنني مساعدتك في أي استفسارات متعلقة بطلب القبول الخاص بك رقم (${applicationId}). ماذا تريد أن تعرف؟`,
          timestamp: new Date(),
        }
      ]);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [applicationId]);
  
  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setIsThinking(true);
    setInputValue('');
    setShowSuggestions(false);
    
    // Simulate AI thinking and response
    const thinkingMessage: AIMessage = {
      id: `thinking-${Date.now()}`,
      role: 'ai',
      content: '',
      timestamp: new Date(),
      thinking: true
    };
    
    setMessages(prev => [...prev, thinkingMessage]);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsThinking(false);
      
      // Replace thinking message with actual response
      setMessages(prev => {
        const filtered = prev.filter(m => !m.thinking);
        
        let response: AIMessage;
        
        // Generate different responses based on query content
        if (text.includes('مستندات') || text.includes('وثائق')) {
          response = {
            id: Date.now().toString(),
            role: 'ai',
            content: 'للتقديم على هذا البرنامج، ستحتاج إلى المستندات التالية: \n\n1. جواز السفر ساري المفعول \n2. شهادة الثانوية العامة مترجمة ومصدقة \n3. كشف الدرجات \n4. صورتان شخصيتان بخلفية بيضاء \n5. شهادة إجادة اللغة الإنجليزية (إن وجدت) \n\nهل تحتاج مساعدة بخصوص أي من هذه المستندات؟',
            timestamp: new Date(),
            links: [
              {
                title: 'قائمة المستندات المطلوبة',
                url: `/applications/${applicationId}/documents`
              },
              {
                title: 'نماذج الترجمة المعتمدة',
                url: '/resources/translation-templates'
              }
            ]
          };
        } else if (text.includes('متى') || text.includes('موعد')) {
          response = {
            id: Date.now().toString(),
            role: 'ai',
            content: 'وفقًا لجدول الطلبات الحالي، من المتوقع أن يتم مراجعة طلبك في موعد أقصاه 15 مايو 2025. عادةً ما تستغرق عملية المراجعة النهائية من 7 إلى 14 يومًا، وسيتم إخطارك فور صدور القرار النهائي عبر البريد الإلكتروني والإشعارات داخل المنصة.',
            timestamp: new Date(),
            links: [
              {
                title: 'جدول مواعيد القبول',
                url: '/admission-timeline'
              }
            ]
          };
        } else if (text.includes('تعديل') || text.includes('تغيير')) {
          response = {
            id: Date.now().toString(),
            role: 'ai',
            content: 'يمكنك تعديل المعلومات في طلبك طالما أن حالة الطلب "قيد المراجعة الأولية". بعد بدء المراجعة النهائية، لن تتمكن من تعديل البيانات الأساسية، ولكن يمكنك دائمًا إرسال مستندات إضافية أو معلومات توضيحية عبر نظام المراسلات. للتعديل، يرجى الانتقال إلى صفحة تفاصيل الطلب والضغط على زر "تعديل الطلب".',
            timestamp: new Date(),
            links: [
              {
                title: 'تعديل الطلب',
                url: `/applications/${applicationId}/edit`
              }
            ]
          };
        } else {
          response = {
            id: Date.now().toString(),
            role: 'ai',
            content: `شكرًا على سؤالك. بناءً على طلبك رقم (${applicationId})، يمكنني إخبارك أن طلبك حاليًا في مرحلة المراجعة الأولية. تم استلام جميع مستنداتك الأساسية، لكن قد تحتاج إلى تقديم شهادة إجادة اللغة الإنجليزية لاستكمال متطلبات القبول. هل ترغب في معرفة المزيد عن متطلبات اللغة أو أي جانب آخر من جوانب طلبك؟`,
            timestamp: new Date()
          };
        }
        
        return [...filtered, response];
      });
    }, 2000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <MessageSquare className="h-12 w-12 text-unlimited-blue mb-4" />
          <h3 className="text-lg font-medium mb-2">جاري تحميل المساعد الذكي...</h3>
          <Progress value={65} className="w-[250px] mb-6" />
          <p className="text-unlimited-gray text-center max-w-md">
            المساعد الذكي هو تقنية جديدة تم إطلاقها في مايو 2025 لمساعدة الطلاب في الإجابة عن استفساراتهم بشكل فوري.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-unlimited-light-blue flex items-center justify-center ml-2">
                      {message.role === "ai" ? (
                        <MessageSquare className="h-4 w-4 text-unlimited-blue" />
                      ) : (
                        <Bot className="h-4 w-4 text-unlimited-gray" />
                      )}
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg",
                      message.role === "user"
                        ? "bg-unlimited-blue text-white rounded-br-none"
                        : message.role === "system"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-unlimited-light-blue/20 text-unlimited-dark-blue rounded-bl-none"
                    )}
                  >
                    {message.thinking ? (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 rounded-full bg-unlimited-blue animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-unlimited-blue animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 rounded-full bg-unlimited-blue animate-bounce"></div>
                      </div>
                    ) : (
                      <>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        
                        {message.links && message.links.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm font-medium">روابط مفيدة:</p>
                            {message.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                className="flex items-center text-sm bg-white/60 hover:bg-white/80 p-2 rounded transition-colors"
                              >
                                <ArrowRight className="h-3 w-3 ml-1" />
                                {link.title}
                              </a>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs mt-1 text-unlimited-gray/70 text-right">
                          {format(message.timestamp, 'HH:mm', { locale: ar })}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-unlimited-gray" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {showSuggestions && !isThinking && (
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-sm font-medium mb-3 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-unlimited-blue" />
                اقتراحات أسئلة شائعة
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start overflow-hidden text-overflow-ellipsis"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    <Search className="h-3 w-3 ml-2 flex-shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب سؤالك هنا..."
                className="resize-none"
                disabled={isThinking}
              />
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isThinking}
                >
                  {isThinking ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSuggestions(prev => !prev)}
                  title={showSuggestions ? "إخفاء الاقتراحات" : "إظهار الاقتراحات"}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-unlimited-gray text-center">
              <div className="flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3" />
                تم تحديث المساعد الذكي بتاريخ 8 مايو 2025 - الإصدار 2.5
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessagesAI;
