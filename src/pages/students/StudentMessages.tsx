
import { useState, useRef, useEffect } from 'react';
import { Send, User, Search, MoreVertical, Paperclip, Image, File, X, MessageSquare, ChevronLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MessageType = 'text' | 'image' | 'file';

type Message = {
  id: string;
  content: string;
  sender: 'admin' | 'student' | 'agent';
  type: MessageType;
  timestamp: Date;
  read: boolean;
  attachments?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
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
    status?: 'online' | 'offline' | 'away';
    lastActive?: Date;
  }[];
  lastMessage: string;
  updatedAt: Date;
  unreadCount: number;
  messages: Message[];
  isStarred?: boolean;
  category?: 'support' | 'application' | 'university' | 'general';
};

// بيانات محادثات تجريبية
const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
      { id: 'admin-1', name: 'فريق الدعم', role: 'admin', status: 'online' },
      { id: 'student-1', name: 'أنا', role: 'student' }
    ],
    lastMessage: 'شكراً لكم على المساعدة',
    updatedAt: new Date(2023, 3, 15, 10, 30),
    unreadCount: 1,
    isStarred: true,
    category: 'support',
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
      { id: 'agent-1', name: 'محمد الخالدي (وكيل)', role: 'agent', status: 'away', lastActive: new Date(2023, 3, 14, 15, 30) },
      { id: 'student-1', name: 'أنا', role: 'student' }
    ],
    lastMessage: 'سأتواصل معك قريباً بخصوص مستنداتك',
    updatedAt: new Date(2023, 3, 14, 14, 45),
    unreadCount: 2,
    category: 'application',
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
        attachments: [
          {
            name: 'قائمة_المستندات_المطلوبة.pdf',
            size: 2500000,
            type: 'application/pdf',
            url: '#'
          }
        ]
      },
    ],
  },
  {
    id: 'conv-3',
    participants: [
      { id: 'admin-2', name: 'قسم القبول - جامعة إسطنبول', role: 'admin', status: 'offline', lastActive: new Date(2023, 3, 10, 9, 20) },
      { id: 'student-1', name: 'أنا', role: 'student' }
    ],
    lastMessage: 'تم استلام طلبك وسيتم مراجعته قريباً',
    updatedAt: new Date(2023, 3, 10, 9, 20),
    unreadCount: 0,
    category: 'university',
    messages: [
      {
        id: 'msg-11',
        content: 'مرحباً، نود إعلامك بأننا استلمنا طلب الالتحاق الخاص بك وسيتم مراجعته من قبل لجنة القبول في غضون 10 أيام عمل',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 10, 9, 20),
        read: true,
        relatedTo: {
          type: 'application',
          id: 'APP-123',
          name: 'طلب التحاق بجامعة إسطنبول'
        }
      }
    ],
  }
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

const getParticipantStatusColor = (status?: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'away':
      return 'bg-yellow-500';
    case 'offline':
    default:
      return 'bg-gray-400';
  }
};

const StudentMessages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // تصفية المحادثات حسب البحث والتصنيف
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && conversation.unreadCount > 0;
    if (activeTab === 'starred') return matchesSearch && conversation.isStarred;
    if (activeTab === 'support' || activeTab === 'application' || activeTab === 'university') {
      return matchesSearch && conversation.category === activeTab;
    }
    
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
    setShowMobileConversation(true);
    
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

  // إضافة محادثة جديدة
  const startNewConversation = () => {
    setIsComposing(true);
  };

  // إرسال رسالة جديدة
  const sendMessage = () => {
    if ((!newMessage.trim() && attachments.length === 0) || !selectedConversation) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage.trim(),
      sender: 'student',
      type: 'text',
      timestamp: new Date(),
      read: true,
      attachments: attachments.length > 0 ? attachments.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })) : undefined
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage.trim() || 'تم إرسال مرفقات',
          updatedAt: new Date(),
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      lastMessage: newMessage.trim() || 'تم إرسال مرفقات',
      updatedAt: new Date(),
      messages: [...selectedConversation.messages, newMsg]
    });
    
    setNewMessage('');
    setAttachments([]);
    
    // تمرير تلقائي للأسفل
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    
    // عرض إشعار نجاح الإرسال
    toast({
      title: 'تم إرسال الرسالة',
      description: 'تم إرسال رسالتك بنجاح',
    });
  };

  // إضافة مرفقات للرسالة
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...fileArray]);
    }
  };
  
  // إزالة مرفق من الرسالة
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // تبديد محادثة
  const toggleStarConversation = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedConversations = conversations.map(conv => {
      if (conv.id === id) {
        return {
          ...conv,
          isStarred: !conv.isStarred
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    if (selectedConversation?.id === id) {
      setSelectedConversation({
        ...selectedConversation,
        isStarred: !selectedConversation.isStarred
      });
    }
    
    toast({
      title: 'تم تحديث المحادثة',
      description: updatedConversations.find(c => c.id === id)?.isStarred 
        ? 'تمت إضافة المحادثة إلى المفضلة' 
        : 'تمت إزالة المحادثة من المفضلة',
    });
  };

  // حذف محادثة
  const deleteConversation = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    
    if (selectedConversation?.id === id) {
      setSelectedConversation(null);
      setShowMobileConversation(false);
    }
    
    toast({
      title: 'تم حذف المحادثة',
      description: 'تم حذف المحادثة بنجاح',
    });
  };

  // إحصاء إجمالي الرسائل غير المقروءة
  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  // العودة إلى قائمة المحادثات (للجوال)
  const handleBackToList = () => {
    setShowMobileConversation(false);
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
          
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={startNewConversation}>
                <MessageSquare className="h-4 w-4 ml-2" />
                بدء محادثة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>محادثة جديدة</DialogTitle>
                <DialogDescription>
                  اختر نوع المحادثة التي تريد بدءها
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-4" onClick={() => { toast({ title: "تم إنشاء محادثة جديدة", description: "تم إنشاء محادثة جديدة مع فريق الدعم" }); }}>
                    <User className="h-6 w-6 mb-2" />
                    فريق الدعم
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-4" onClick={() => { toast({ title: "تم إنشاء محادثة جديدة", description: "تم إنشاء محادثة جديدة مع مستشار تعليمي" }); }}>
                    <MessageSquare className="h-6 w-6 mb-2" />
                    مستشار تعليمي
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full" onClick={() => { toast({ title: "تم إنشاء محادثة جديدة", description: "تم إنشاء محادثة جديدة بنجاح" }); }}>
                  إنشاء محادثة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-1 border rounded-md overflow-hidden">
          {/* قائمة المحادثات */}
          <div className={`w-full lg:w-1/3 border-l bg-gray-50 ${showMobileConversation ? 'hidden md:block' : 'block'}`}>
            <div className="p-3 border-b">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
                <Input
                  placeholder="البحث في المحادثات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">الكل</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">غير مقروءة</TabsTrigger>
                  <TabsTrigger value="starred" className="flex-1">مفضلة</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <ScrollArea className="h-[calc(100vh-270px)]">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-gray-100 border-b relative ${
                      selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                    } ${conversation.isStarred ? 'border-r-2 border-yellow-400' : ''}`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className={`h-10 w-10 rounded-full ${getParticipantColor(conversation.participants.find(p => p.role !== 'student')?.role || 'admin')} flex items-center justify-center text-white`}>
                            <User className="h-6 w-6" />
                          </div>
                          <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getParticipantStatusColor(conversation.participants.find(p => p.role !== 'student')?.status)}`}></div>
                        </div>
                        <div className="mr-3 flex-1">
                          <div className="font-medium flex items-center">
                            {conversation.participants.find(p => p.role !== 'student')?.name || 'المستخدم'}
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-unlimited-danger text-white text-xs mr-2 h-5 min-w-5 flex items-center justify-center">{conversation.unreadCount}</Badge>
                            )}
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
                        <div className="flex mt-1">
                          <button 
                            onClick={(e) => toggleStarConversation(conversation.id, e)}
                            className={`p-1 rounded-full ${conversation.isStarred ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={conversation.isStarred ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 text-gray-400 hover:text-unlimited-gray rounded-full ml-1">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => deleteConversation(conversation.id, e)}>
                                حذف المحادثة
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast({ title: "تم كتم المحادثة", description: "تم كتم الإشعارات لهذه المحادثة" }); }}>
                                كتم الإشعارات
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast({ title: "تم تصدير المحادثة", description: "تم تصدير المحادثة كملف PDF" }); }}>
                                تصدير المحادثة
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-unlimited-gray">
                  لا توجد محادثات تطابق البحث
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* نافذة المحادثة */}
          {selectedConversation && showMobileConversation ? (
            <div className="flex flex-col flex-1">
              {/* رأس المحادثة */}
              <div className="p-3 border-b flex items-center justify-between bg-gray-50">
                <div className="flex items-center">
                  <button 
                    onClick={handleBackToList}
                    className="md:hidden p-2 ml-1 text-unlimited-gray hover:bg-gray-200 rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="relative">
                    <div className={`h-10 w-10 rounded-full ${getParticipantColor(selectedConversation.participants.find(p => p.role !== 'student')?.role || 'admin')} flex items-center justify-center text-white`}>
                      <User className="h-6 w-6" />
                    </div>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getParticipantStatusColor(selectedConversation.participants.find(p => p.role !== 'student')?.status)}`}></div>
                  </div>
                  <div className="mr-3">
                    <div className="font-medium">
                      {selectedConversation.participants.find(p => p.role !== 'student')?.name || 'المستخدم'}
                    </div>
                    <div className="text-xs text-unlimited-gray">
                      {selectedConversation.participants.find(p => p.role !== 'student')?.status === 'online' 
                        ? 'متصل الآن' 
                        : selectedConversation.participants.find(p => p.role !== 'student')?.status === 'away' 
                          ? 'غير متواجد' 
                          : 'غير متصل'}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast({ title: "تم حذف المحادثة", description: "تم حذف المحادثة بنجاح" })}>
                        حذف المحادثة
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "تم كتم المحادثة", description: "تم كتم الإشعارات لهذه المحادثة" })}>
                        كتم الإشعارات
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "تم تصدير المحادثة", description: "تم تصدير المحادثة كملف PDF" })}>
                        تصدير المحادثة
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* محتوى المحادثة */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages[0]?.relatedTo && (
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-100 rounded-lg p-2 text-xs text-unlimited-gray text-center">
                        محادثة متعلقة بـ: {selectedConversation.messages[0].relatedTo.name}
                      </div>
                    </div>
                  )}
                
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'student'
                            ? 'bg-unlimited-blue text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <div 
                                key={index} 
                                className={`flex items-center p-2 rounded ${message.sender === 'student' ? 'bg-unlimited-dark-blue/30' : 'bg-gray-200'} text-xs`}
                              >
                                <Paperclip className="h-3 w-3 ml-2 flex-shrink-0" />
                                <div className="flex-1 truncate">{attachment.name}</div>
                                <div className="mr-2">{(attachment.size / 1024 / 1024).toFixed(1)} MB</div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === 'student' ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
                          } flex justify-end items-center gap-1`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                          {message.sender === 'student' && (
                            <span>
                              {message.read ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-unlimited-light-blue" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-unlimited-light-blue" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* مربع إدخال الرسالة */}
              <div className="p-3 border-t">
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm">
                        <div className="truncate max-w-[150px]">{file.name}</div>
                        <div className="text-xs text-unlimited-gray">({(file.size / 1024 / 1024).toFixed(1)} MB)</div>
                        <button 
                          type="button" 
                          onClick={() => removeAttachment(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-end space-x-2 rtl:space-x-reverse">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="flex divide-x rtl:divide-x-reverse border border-border rounded-md overflow-hidden">
                        <label htmlFor="file-upload" className="p-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                          <File className="h-4 w-4" />
                          <span className="text-sm">ملف</span>
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                        </label>
                        <label htmlFor="image-upload" className="p-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                          <Image className="h-4 w-4" />
                          <span className="text-sm">صورة</span>
                          <input
                            type="file"
                            id="image-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
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
                    disabled={!newMessage.trim() && attachments.length === 0}
                    className="h-10"
                  >
                    <Send className="h-5 w-5 ml-1" />
                    إرسال
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={`hidden md:flex flex-1 items-center justify-center bg-gray-50 ${showMobileConversation ? 'hidden' : 'flex'}`}>
              <div className="text-center">
                <div className="bg-unlimited-light-blue rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-12 w-12 text-unlimited-blue" />
                </div>
                <h3 className="text-xl font-medium text-unlimited-dark-blue mb-2">اختر محادثة</h3>
                <p className="text-unlimited-gray max-w-md">
                  اختر محادثة من القائمة للبدء في التواصل مع فريق الدعم أو الوكلاء أو ممثلي الجامعات.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={startNewConversation}
                >
                  <MessageSquare className="h-4 w-4 ml-2" />
                  بدء محادثة جديدة
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
