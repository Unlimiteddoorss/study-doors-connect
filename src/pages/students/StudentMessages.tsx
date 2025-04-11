
import { useState, useRef, useEffect } from 'react';
import { Send, User, Search, MoreVertical, Paperclip, Image, File, X, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

type MessageType = 'text' | 'image' | 'file';

type Message = {
  id: string;
  content: string;
  sender: 'admin' | 'student' | 'agent';
  type: MessageType;
  timestamp: Date;
  read: boolean;
  relatedTo?: {
    type: 'application' | 'program' | 'general';
    id?: string;
    name?: string;
  };
};

type Conversation = {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'student' | 'agent';
  }[];
  lastMessage: string;
  updatedAt: Date;
  unreadCount: number;
  messages: Message[];
};

// بيانات محادثات تجريبية
const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
      { id: 'admin-1', name: 'فريق الدعم', role: 'admin' },
      { id: 'student-1', name: 'أنا', role: 'student' }
    ],
    lastMessage: 'شكراً لكم على المساعدة',
    updatedAt: new Date(2023, 3, 15, 10, 30),
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        content: 'السلام عليكم، لدي استفسار حول طلب التسجيل الخاص بي',
        sender: 'student',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 0),
        read: true,
        relatedTo: {
          type: 'application',
          id: 'APP-123',
          name: 'طلب التحاق بجامعة إسطنبول'
        }
      },
      {
        id: 'msg-2',
        content: 'أهلاً بك، كيف يمكننا مساعدتك؟',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 5),
        read: true,
      },
      {
        id: 'msg-3',
        content: 'هل يمكنكم إخباري عن حالة طلبي؟',
        sender: 'student',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 10),
        read: true,
      },
      {
        id: 'msg-4',
        content: 'طلبك قيد المراجعة حالياً، سنخبرك بأي تحديثات خلال 48 ساعة',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 20),
        read: true,
      },
      {
        id: 'msg-5',
        content: 'شكراً لكم على المساعدة',
        sender: 'student',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 30),
        read: false,
      },
    ],
  },
  {
    id: 'conv-2',
    participants: [
      { id: 'agent-1', name: 'محمد الخالدي (وكيل)', role: 'agent' },
      { id: 'student-1', name: 'أنا', role: 'student' }
    ],
    lastMessage: 'سأتواصل معك قريباً بخصوص مستنداتك',
    updatedAt: new Date(2023, 3, 14, 14, 45),
    unreadCount: 2,
    messages: [
      {
        id: 'msg-6',
        content: 'مرحباً، أريد المساعدة بخصوص برنامج الطب البشري',
        sender: 'student',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 30),
        read: true,
        relatedTo: {
          type: 'program',
          id: 'PRG-456',
          name: 'برنامج الطب البشري - جامعة وارسو'
        }
      },
      {
        id: 'msg-7',
        content: 'أهلاً بك، أنا الوكيل المسؤول عن التقديم للجامعات البولندية. كيف يمكنني مساعدتك؟',
        sender: 'agent',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 35),
        read: true,
      },
      {
        id: 'msg-8',
        content: 'أحتاج لمعرفة المستندات المطلوبة والمواعيد النهائية للتقديم',
        sender: 'student',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 40),
        read: true,
      },
      {
        id: 'msg-9',
        content: 'سأرسل لك قائمة بكل المستندات المطلوبة ومواعيد التقديم قريباً',
        sender: 'agent',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 42),
        read: false,
      },
      {
        id: 'msg-10',
        content: 'سأتواصل معك قريباً بخصوص مستنداتك',
        sender: 'agent',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 45),
        read: false,
      },
    ],
  },
];

const getParticipantColor = (role: string) => {
  switch (role) {
    case 'student':
      return 'bg-unlimited-blue';
    case 'agent':
      return 'bg-unlimited-success';
    case 'admin':
      return 'bg-unlimited-dark-blue';
    default:
      return 'bg-unlimited-gray';
  }
};

const StudentMessages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // تصفية المحادثات حسب البحث
  const filteredConversations = conversations.filter((conversation) => {
    const participantNames = conversation.participants.map(p => p.name.toLowerCase());
    const matchesSearch = participantNames.some(name => name.includes(searchQuery.toLowerCase())) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // التمرير إلى آخر رسالة عند اختيار محادثة
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation]);

  // تحديث حالة قراءة الرسائل عند فتح محادثة
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // تحديث حالة القراءة للرسائل
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
  };

  // إرسال رسالة جديدة
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage.trim(),
      sender: 'student',
      type: 'text',
      timestamp: new Date(),
      read: true,
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage.trim(),
          updatedAt: new Date(),
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      lastMessage: newMessage.trim(),
      updatedAt: new Date(),
      messages: [...selectedConversation.messages, newMsg]
    });
    
    setNewMessage('');
    
    // تمرير تلقائي للأسفل
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  return (
    <DashboardLayout userRole="student">
      <div className="flex flex-col h-[calc(100vh-150px)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-unlimited-dark-blue">الرسائل</div>
            {getTotalUnreadCount() > 0 && (
              <Badge className="bg-unlimited-danger text-white mr-2">{getTotalUnreadCount()} جديدة</Badge>
            )}
          </div>
          
          <Button>
            <MessageSquare className="h-4 w-4 ml-2" />
            بدء محادثة جديدة
          </Button>
        </div>
        
        <div className="flex flex-1 border rounded-md overflow-hidden">
          {/* قائمة المحادثات */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-l bg-gray-50">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
                <Input
                  placeholder="البحث في المحادثات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-270px)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 border-b ${
                    selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full ${getParticipantColor(conversation.participants.find(p => p.role !== 'student')?.role || 'admin')} flex items-center justify-center text-white`}>
                        <User className="h-6 w-6" />
                      </div>
                      <div className="mr-3">
                        <div className="font-medium">
                          {conversation.participants.find(p => p.role !== 'student')?.name || 'المستخدم'}
                        </div>
                        <div className="text-sm text-unlimited-gray truncate max-w-[180px]">
                          {conversation.lastMessage}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-unlimited-gray">
                        {formatDistanceToNow(conversation.updatedAt, { addSuffix: true, locale: ar })}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-unlimited-danger">{conversation.unreadCount}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          {/* نافذة المحادثة */}
          {selectedConversation ? (
            <div className="hidden md:flex md:flex-col flex-1">
              {/* رأس المحادثة */}
              <div className="p-3 border-b flex items-center justify-between bg-gray-50">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full ${getParticipantColor(selectedConversation.participants.find(p => p.role !== 'student')?.role || 'admin')} flex items-center justify-center text-white`}>
                    <User className="h-6 w-6" />
                  </div>
                  <div className="mr-3">
                    <div className="font-medium">
                      {selectedConversation.participants.find(p => p.role !== 'student')?.name || 'المستخدم'}
                    </div>
                    {selectedConversation.messages[0]?.relatedTo && (
                      <div className="text-xs text-unlimited-gray">
                        {selectedConversation.messages[0].relatedTo.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* محتوى المحادثة */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'student'
                            ? 'bg-unlimited-blue text-white rounded-tl-none'
                            : 'bg-gray-100 text-gray-800 rounded-tr-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === 'student' ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* مربع إدخال الرسالة */}
              <div className="p-3 border-t">
                <div className="flex items-end space-x-2 rtl:space-x-reverse">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex-1">
                    <Textarea
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="resize-none"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                  </div>
                  
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="h-10"
                  >
                    <Send className="h-5 w-5 ml-1" />
                    إرسال
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="bg-unlimited-light-blue rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-12 w-12 text-unlimited-blue" />
                </div>
                <h3 className="text-xl font-medium text-unlimited-dark-blue mb-2">اختر محادثة</h3>
                <p className="text-unlimited-gray max-w-md">
                  اختر محادثة من القائمة للبدء في التواصل مع فريق الدعم أو الوكلاء.
                </p>
              </div>
            </div>
          )}
          
          {/* عرض المحادثة على الشاشات الصغيرة */}
          {selectedConversation && (
            <div className="md:hidden flex flex-col flex-1">
              <div className="p-3 border-b flex items-center justify-between bg-gray-50">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <div className={`h-8 w-8 rounded-full ${getParticipantColor(selectedConversation.participants.find(p => p.role !== 'student')?.role || 'admin')} flex items-center justify-center text-white`}>
                    <User className="h-4 w-4" />
                  </div>
                  <div className="mr-2">
                    <div className="font-medium text-sm">
                      {selectedConversation.participants.find(p => p.role !== 'student')?.name || 'المستخدم'}
                    </div>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'student'
                            ? 'bg-unlimited-blue text-white rounded-tl-none'
                            : 'bg-gray-100 text-gray-800 rounded-tr-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === 'student' ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t">
                <div className="flex items-end space-x-2 rtl:space-x-reverse">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex-1">
                    <Input
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </div>
                  
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    size="icon"
                    className="h-10 w-10"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
