
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  Send, 
  MessageSquare, 
  Lightbulb, 
  FileText, 
  University, 
  Globe,
  BookOpen,
  MapPin,
  Clock,
  DollarSign,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: 'general' | 'university' | 'documents' | 'visa' | 'fees';
}

interface MessagesAIProps {
  applicationId: string;
}

const MessagesAI = ({ applicationId }: MessagesAIProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // الرسائل التوجيهية
  const quickQuestions = [
    { icon: University, text: 'ما هي متطلبات القبول؟', category: 'university' },
    { icon: FileText, text: 'ما هي المستندات المطلوبة؟', category: 'documents' },
    { icon: Globe, text: 'كيف أحصل على تأشيرة الدراسة؟', category: 'visa' },
    { icon: DollarSign, text: 'ما هي تكاليف الدراسة؟', category: 'fees' },
    { icon: MapPin, text: 'معلومات عن السكن الجامعي', category: 'general' },
    { icon: BookOpen, text: 'متى يبدأ العام الدراسي؟', category: 'university' }
  ];

  useEffect(() => {
    // رسالة ترحيب من المساعد الذكي
    const welcomeMessage: AIMessage = {
      id: 'welcome',
      content: 'مرحباً بك! أنا المساعد الذكي لمنصة أبواب بلا حدود. يمكنني مساعدتك في:\n\n• الإجابة على استفساراتك حول الجامعات والبرامج\n• توضيح متطلبات القبول والمستندات\n• شرح إجراءات التأشيرة والسفر\n• معلومات عن التكاليف والمنح\n• أي استفسارات أخرى متعلقة بدراستك\n\nاختر سؤالاً من الأسئلة السريعة أدناه أو اكتب استفسارك مباشرة.',
      isUser: false,
      timestamp: new Date(),
      category: 'general'
    };
    
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText?: string) => {
    const content = messageText || inputMessage.trim();
    if (!content) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setIsLoading(true);

    // محاكاة رد المساعد الذكي
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        isUser: false,
        timestamp: new Date(),
        category: aiResponse.category
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      setIsLoading(false);

      toast({
        description: "تم استلام رد المساعد الذكي"
      });
    }, 2000 + Math.random() * 2000);
  };

  const generateAIResponse = (question: string): { content: string; category: string } => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('متطلبات') || lowerQuestion.includes('قبول')) {
      return {
        content: `متطلبات القبول تختلف حسب الجامعة والبرنامج، ولكن المتطلبات العامة تشمل:

📋 **المستندات الأساسية:**
• شهادة الثانوية العامة أو ما يعادلها
• كشف درجات مصدق ومترجم
• جواز سفر ساري المفعول
• صور شخصية

📊 **المتطلبات الأكاديمية:**
• معدل لا يقل عن 70% للبرامج العادية
• معدل لا يقل عن 85% للبرامج الطبية
• اختبار اللغة (TOEFL/IELTS) لبعض البرامج

هل تريد معلومات محددة عن برنامج معين؟`,
        category: 'university'
      };
    }

    if (lowerQuestion.includes('مستندات') || lowerQuestion.includes('أوراق')) {
      return {
        content: `المستندات المطلوبة للتقديم:

📑 **المستندات الأساسية:**
• شهادة الثانوية العامة الأصلية
• كشف درجات مصدق من وزارة التعليم
• ترجمة معتمدة للشهادات (إنجليزي/تركي)
• تصديق من وزارة الخارجية

🆔 **المستندات الشخصية:**
• جواز سفر ساري (6 أشهر على الأقل)
• 4 صور شخصية حديثة
• صورة من بطاقة الهوية

💼 **مستندات إضافية:**
• خطاب نوايا (Statement of Purpose)
• خطابات توصية (إن وجدت)
• شهادات أنشطة أو خبرات

يمكنني مساعدتك في معرفة المستندات المحددة لجامعتك.`,
        category: 'documents'
      };
    }

    if (lowerQuestion.includes('تأشيرة') || lowerQuestion.includes('فيزا')) {
      return {
        content: `إجراءات الحصول على تأشيرة الدراسة:

✅ **خطوات التأشيرة:**
1. الحصول على قبول جامعي نهائي
2. تجهيز المستندات المطلوبة
3. تحديد موعد في القنصلية
4. تقديم الطلب ودفع الرسوم
5. انتظار القرار (15-30 يوم)

📋 **المستندات للتأشيرة:**
• خطاب القبول الجامعي
• إثبات القدرة المالية
• تأمين صحي
• حجز طيران مبدئي
• إثبات السكن

💰 **الرسوم:**
• رسوم التأشيرة: حوالي 60-110 دولار
• رسوم إضافية حسب الجنسية

هل تحتاج معلومات عن متطلبات بلد معين؟`,
        category: 'visa'
      };
    }

    if (lowerQuestion.includes('تكلفة') || lowerQuestion.includes('رسوم') || lowerQuestion.includes('مصاريف')) {
      return {
        content: `تكاليف الدراسة والمعيشة:

🎓 **الرسوم الدراسية السنوية:**
• الجامعات الحكومية: 2,000 - 8,000 دولار
• الجامعات الخاصة: 8,000 - 25,000 دولار
• البرامج الطبية: 15,000 - 45,000 دولار

🏠 **تكاليف المعيشة الشهرية:**
• السكن: 200 - 600 دولار
• الطعام: 150 - 300 دولار
• المواصلات: 50 - 100 دولار
• أخرى: 100 - 200 دولار

💳 **المجموع السنوي:**
• الحد الأدنى: 8,000 - 12,000 دولار
• المتوسط: 15,000 - 25,000 دولار

💡 **فرص توفير المال:**
• المنح الدراسية الجزئية
• العمل الجزئي للطلاب
• السكن المشترك

تختلف التكاليف حسب المدينة والجامعة. هل تريد معلومات عن جامعة محددة؟`,
        category: 'fees'
      };
    }

    // رد عام
    return {
      content: `شكراً لسؤالك! 

أنا هنا لمساعدتك في جميع الاستفسارات المتعلقة بالدراسة في الخارج. يمكنني تقديم معلومات مفصلة عن:

🎯 **خدماتي تشمل:**
• معلومات عن الجامعات والبرامج
• متطلبات القبول والتقديم
• إجراءات التأشيرة والسفر
• التكاليف والمنح الدراسية
• السكن والمعيشة
• نصائح للطلاب الجدد

لا تتردد في طرح أي سؤال محدد أو استخدم الأسئلة السريعة لاستكشاف المواضيع المختلفة.

كيف يمكنني مساعدتك اليوم؟`,
      category: 'general'
    };
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'university': return <University className="h-4 w-4" />;
      case 'documents': return <FileText className="h-4 w-4" />;
      case 'visa': return <Globe className="h-4 w-4" />;
      case 'fees': return <DollarSign className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'university': return 'text-blue-600 bg-blue-50';
      case 'documents': return 'text-green-600 bg-green-50';
      case 'visa': return 'text-purple-600 bg-purple-50';
      case 'fees': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-unlimited-blue to-unlimited-light-blue text-white">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <div>
            <h3 className="font-semibold">المساعد الذكي</h3>
            <p className="text-sm opacity-90">متاح 24/7 للإجابة على استفساراتك</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-unlimited-blue text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {!message.isUser && message.category && (
                  <div className="flex items-center gap-1 mb-2">
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(message.category)}`}>
                      {getCategoryIcon(message.category)}
                      <span className="mr-1">
                        {message.category === 'university' && 'جامعات'}
                        {message.category === 'documents' && 'مستندات'}
                        {message.category === 'visa' && 'تأشيرة'}
                        {message.category === 'fees' && 'رسوم'}
                        {message.category === 'general' && 'عام'}
                      </span>
                    </Badge>
                  </div>
                )}
                <div className="whitespace-pre-line text-sm">{message.content}</div>
                <div className={`text-xs mt-1 opacity-70`}>
                  {message.timestamp.toLocaleTimeString('ar-SA', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                <div className="flex items-center gap-1">
                  <Bot className="h-4 w-4 text-unlimited-blue" />
                  <span className="text-sm text-gray-600">المساعد يكتب</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t bg-gray-50">
          <h4 className="text-sm font-medium mb-3 text-gray-700">أسئلة سريعة:</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => {
              const IconComponent = question.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(question.text)}
                  className="justify-start text-xs h-auto p-2 whitespace-normal"
                  disabled={isLoading}
                >
                  <IconComponent className="h-3 w-3 ml-1 flex-shrink-0" />
                  {question.text}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب استفسارك هنا..."
            className="resize-none"
            rows={2}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={() => handleSendMessage()} 
            disabled={!inputMessage.trim() || isLoading}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagesAI;
