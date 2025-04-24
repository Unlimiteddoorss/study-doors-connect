
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, FileText, Download, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

interface ApplicationMessagesProps {
  programName: string;
  universityName: string;
  applicationId: number;
}

const ApplicationMessages = ({ programName, universityName, applicationId }: ApplicationMessagesProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  
  // Sample messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t("application.messages.sampleMessage1"),
      sender: 'student',
      senderName: 'محمد أحمد',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: true
    },
    {
      id: '2',
      text: t("application.messages.sampleMessage2"),
      sender: 'admin',
      senderName: 'سارة محمود - مستشارة القبول',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true
    },
    {
      id: '3',
      text: t("application.messages.sampleMessage3"),
      sender: 'student',
      senderName: 'محمد أحمد',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
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
  ]);
  
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    
    setIsSending(true);
    
    // Create attachment objects from files
    const messageAttachments = attachments.map((file, index) => ({
      id: `attachment-${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type
    }));
    
    // Add new message to list
    setTimeout(() => {
      const newMessageObj: Message = {
        id: `msg-${Date.now()}`,
        text: newMessage,
        sender: 'student',
        senderName: 'محمد أحمد',
        timestamp: new Date(),
        attachments: messageAttachments.length > 0 ? messageAttachments : undefined,
        read: false
      };
      
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
      setAttachments([]);
      setIsSending(false);
      
      // Simulate admin response after 1-3 seconds
      if (Math.random() > 0.5) {
        const responseDelay = Math.random() * 2000 + 1000;
        setTimeout(() => {
          const adminResponse: Message = {
            id: `msg-${Date.now()}`,
            text: 'شكراً لرسالتك. سيتم الرد عليك قريباً من قبل فريق القبول.',
            sender: 'admin',
            senderName: 'نظام الرسائل الآلي',
            timestamp: new Date(),
            read: false
          };
          
          setMessages(prev => [...prev, adminResponse]);
        }, responseDelay);
      }
    }, 500);
  };
  
  const handleAttachmentUpload = (files: FileList | null) => {
    if (!files) return;
    
    // Convert FileList to Array and add to attachments
    const newAttachments = Array.from(files);
    setAttachments([...attachments, ...newAttachments]);
    
    toast({
      title: "تم إرفاق الملفات",
      description: `تم إرفاق ${newAttachments.length} ملف/ملفات بنجاح.`
    });
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const formatMessageDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (diff < oneDay) {
      // Today, show time
      return t("application.messages.sampleTime1").replace('10:30 صباحًا', new Intl.DateTimeFormat(i18n.language, {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date));
    } else if (diff < oneDay * 2) {
      // Yesterday
      return isRtl ? 'الأمس ' + new Intl.DateTimeFormat(i18n.language, {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date) : 'Yesterday ' + new Intl.DateTimeFormat(i18n.language, {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } else {
      // Older messages
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("application.messages.title")}</CardTitle>
        <CardDescription>
          {t("application.messages.subtitle", { program: programName, university: universityName })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Messages container */}
        <div className="border rounded-md bg-gray-50 p-4 h-80 overflow-y-auto mb-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-unlimited-gray">
                <p>لا توجد رسائل حتى الآن</p>
                <p className="text-sm">ابدأ بإرسال رسالة للحصول على المساعدة</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id} className="flex flex-col">
                  <div className={`flex ${message.sender === 'student' ? (isRtl ? 'justify-start' : 'justify-end') : (isRtl ? 'justify-end' : 'justify-start')}`}>
                    <div className="flex gap-2 max-w-[80%]">
                      {message.sender !== 'student' && !isRtl && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png" alt={message.senderName} />
                          <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div>
                        <div className={`rounded-lg p-3 inline-block ${
                          message.sender === 'student'
                            ? 'bg-unlimited-blue text-white'
                            : 'bg-white border'
                        }`}>
                          <p className="break-words">{message.text}</p>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map(attachment => (
                                <a
                                  key={attachment.id}
                                  href={attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center gap-2 p-2 rounded ${
                                    message.sender === 'student'
                                      ? 'bg-unlimited-dark-blue hover:bg-unlimited-dark-blue/90'
                                      : 'bg-gray-100 hover:bg-gray-200'
                                  } transition-colors`}
                                >
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm truncate">{attachment.name}</span>
                                  {attachment.size && (
                                    <span className="text-xs opacity-70">{formatFileSize(attachment.size)}</span>
                                  )}
                                  <Download className="h-4 w-4" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className={`mt-1 text-xs text-unlimited-gray ${message.sender === 'student' ? 'text-right' : 'text-left'}`}>
                          {formatMessageDate(message.timestamp)}
                        </div>
                      </div>
                      
                      {message.sender !== 'student' && isRtl && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png" alt={message.senderName} />
                          <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                  
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
        
        {/* New message form */}
        <div>
          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-1 bg-gray-100 rounded p-1 pr-2 text-sm">
                  <FileText className="h-4 w-4 text-unlimited-gray" />
                  <span className="max-w-[150px] truncate">{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 ml-1"
                    onClick={() => removeAttachment(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-2">
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                multiple
                onChange={(e) => handleAttachmentUpload(e.target.files)}
              />
            </div>
            
            <Textarea
              placeholder={t("application.messages.inputPlaceholder")}
              className="flex-1"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <Button
              type="button"
              onClick={handleSendMessage}
              disabled={isSending || (newMessage.trim() === '' && attachments.length === 0)}
            >
              <Send className={`h-4 w-4 ${isRtl ? 'mr-1' : 'ml-1'}`} />
              {t("application.messages.send")}
            </Button>
          </div>
          
          <p className="text-xs text-unlimited-gray mt-2 text-center">
            يمكنك استخدام الزر Enter للإرسال. استخدم Shift + Enter لإضافة سطر جديد.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationMessages;
