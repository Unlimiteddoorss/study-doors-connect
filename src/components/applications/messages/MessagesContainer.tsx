
import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Message {
  id: string;
  sender: 'user' | 'admin' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: { name: string; url: string; type: string }[];
}

interface MessagesContainerProps {
  programName: string;
  universityName: string;
  applicationId: number;
  onMessageRead?: () => void;
}

const MessagesContainer = ({ programName, universityName, applicationId, onMessageRead }: MessagesContainerProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // محاكاة جلب الرسائل من الخادم
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'system',
        message: 'مرحباً بك في نظام المراسلات الخاص بطلب القبول. يمكنك التواصل مباشرة مع فريق القبول من خلال هذه النافذة.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        read: true
      },
      {
        id: '2',
        sender: 'admin',
        message: `مرحباً! شكراً لاهتمامك بالتقديم في برنامج ${programName} في ${universityName}. نحن هنا للإجابة على استفساراتك.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: true
      },
      {
        id: '3',
        sender: 'admin',
        message: 'يرجى تحميل نسخة مصدقة من شهادة الثانوية العامة لاستكمال طلبك.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: false
      }
    ];
    
    setTimeout(() => {
      setMessages(mockMessages);
      setIsLoading(false);
      
      // تعليم الرسائل غير المقروءة كمقروءة بعد عرضها
      const hasUnread = mockMessages.some(msg => !msg.read);
      if (hasUnread && onMessageRead) {
        onMessageRead();
        
        // تحديث حالة القراءة في المصفوفة المحلية
        setMessages(prev => 
          prev.map(msg => ({ ...msg, read: true }))
        );
      }
    }, 1000);
  }, [programName, universityName, applicationId, onMessageRead]);
  
  // التمرير إلى آخر رسالة عند تحميل الرسائل أو إضافة رسالة جديدة
  useEffect(() => {
    if (!isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);
  
  // إرسال رسالة جديدة
  const sendMessage = (messageText: string) => {
    if (!messageText.trim() && uploadedFiles.length === 0) return;
    
    setIsSending(true);
    
    // إنشاء كائنات المرفقات
    const attachments = uploadedFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    }));
    
    // محاكاة إرسال الرسالة
    setTimeout(() => {
      const newMessage: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        message: messageText,
        timestamp: new Date().toISOString(),
        read: true,
        attachments: attachments.length > 0 ? attachments : undefined
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsSending(false);
      setUploadedFiles([]);
      
      // محاكاة رد تلقائي من المسؤول بعد فترة
      if (messageText.trim()) {
        simulateAdminReply(messageText);
      }
    }, 500);
  };
  
  // محاكاة رد تلقائي من المسؤول
  const simulateAdminReply = (userMessage: string) => {
    setTimeout(() => {
      let replyMessage = '';
      
      // محاكاة رد بسيط مبني على محتوى رسالة المستخدم
      if (userMessage.includes('متى') || userMessage.includes('موعد') || userMessage.includes('وقت')) {
        replyMessage = 'عادةً ما تستغرق مراجعة الطلب من 3-5 أيام عمل. سنعلمك فور وجود أي تطورات.';
      } else if (userMessage.includes('مستند') || userMessage.includes('وثيقة') || userMessage.includes('شهادة')) {
        replyMessage = 'يمكنك تحميل المستندات المطلوبة من صفحة المستندات في طلبك. تأكد من أن جميع المستندات مصدقة.';
      } else if (userMessage.includes('قبول') || userMessage.includes('موافقة')) {
        replyMessage = 'يتم إرسال نتائج القبول عبر البريد الإلكتروني وتحديث حالة طلبك في النظام. يرجى متابعة بريدك الإلكتروني بشكل منتظم.';
      } else if (userMessage.includes('شكرا') || userMessage.includes('شكرًا')) {
        replyMessage = 'نحن في خدمتك دائمًا. لا تتردد في التواصل معنا إذا كان لديك أي استفسارات أخرى.';
      } else {
        replyMessage = 'شكرًا لتواصلك معنا. سيقوم فريق القبول بالرد على استفسارك في أقرب وقت ممكن، عادة خلال 24 ساعة.';
      }
      
      const adminReply: Message = {
        id: `admin-${Date.now()}`,
        sender: 'admin',
        message: replyMessage,
        timestamp: new Date().toISOString(),
        read: true
      };
      
      setMessages(prev => [...prev, adminReply]);
      
      // تحديث الرسائل غير المقروءة
      if (onMessageRead) {
        onMessageRead();
      }
      
    }, 3000 + Math.random() * 2000); // توقيت عشوائي بين 3-5 ثواني
  };
  
  // معالجة رفع الملفات
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      
      // التحقق من حجم الملفات (الحد الأقصى 5 ميجابايت)
      const oversizedFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast({
          title: "حجم الملف كبير جداً",
          description: `يجب أن لا يتجاوز حجم الملف 5 ميجابايت: ${oversizedFiles.map(f => f.name).join(', ')}`,
          variant: "destructive"
        });
        
        // إزالة الملفات الكبيرة
        const validFiles = newFiles.filter(file => file.size <= 5 * 1024 * 1024);
        setUploadedFiles(prev => [...prev, ...validFiles]);
        return;
      }
      
      // التحقق من عدد الملفات (الحد الأقصى 5 ملفات في المرة الواحدة)
      if (uploadedFiles.length + newFiles.length > 5) {
        toast({
          title: "عدد الملفات كبير",
          description: "يمكنك رفع 5 ملفات كحد أقصى في المرة الواحدة.",
          variant: "destructive"
        });
        
        // أخذ أول 5 ملفات فقط
        const filesSlice = newFiles.slice(0, 5 - uploadedFiles.length);
        setUploadedFiles(prev => [...prev, ...filesSlice]);
        return;
      }
      
      // إضافة الملفات الجديدة
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "تم رفع الملفات",
        description: `تم إضافة ${newFiles.length} ملف بنجاح.`
      });
    }
  };
  
  // حذف ملف من قائمة الملفات المرفوعة
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* منطقة عرض الرسائل */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-start">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="ml-4 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-20 w-64" />
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="mr-4 space-y-2">
                <Skeleton className="h-4 w-40 ml-auto" />
                <Skeleton className="h-16 w-56" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.message}
              sender={message.sender}
              timestamp={message.timestamp}
              attachments={message.attachments}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-unlimited-gray">لا توجد رسائل. ابدأ محادثة جديدة!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* عرض الملفات المرفوعة */}
      {uploadedFiles.length > 0 && (
        <div className="px-4 py-2 border-t">
          <p className="text-xs text-unlimited-gray mb-2">الملفات المرفقة:</p>
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file, index) => (
              <div 
                key={index}
                className="bg-blue-50 text-blue-700 text-xs rounded px-2 py-1 flex items-center"
              >
                <FileUp className="h-3 w-3 mr-1" />
                <span className="truncate max-w-[120px]">{file.name}</span>
                <button 
                  className="ml-1 text-blue-700 hover:text-blue-900"
                  onClick={() => removeFile(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* منطقة إدخال الرسائل */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="flex-shrink-0"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-4 w-4" />
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </Button>
          <MessageInput 
            onSendMessage={sendMessage}
            isSending={isSending}
            placeholder="اكتب رسالة..."
            hasFiles={uploadedFiles.length > 0}
          />
        </div>
        <p className="text-xs text-unlimited-gray mt-2 text-center">
          يمكنك إرفاق ملفات (الحد الأقصى: 5 ملفات، 5 ميجابايت لكل ملف)
        </p>
      </div>
    </div>
  );
};

export default MessagesContainer;
