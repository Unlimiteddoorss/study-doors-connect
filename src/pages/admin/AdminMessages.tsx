
import { useState, useRef, useEffect } from 'react';
import { Send, User, Search, MoreVertical, Paperclip, Image, File, X, MessageSquare, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

type MessageType = 'text' | 'image' | 'file';

type Message = {
  id: string;
  content: string;
  sender: 'admin' | 'user' | 'agent' | 'university';
  type: MessageType;
  timestamp: Date;
  read: boolean;
};

type Conversation = {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'user' | 'agent' | 'university';
  }[];
  lastMessage: string;
  updatedAt: Date;
  unreadCount: number;
  messages: Message[];
  category: 'students' | 'agents' | 'universities' | 'staff';
};

// بيانات محادثات تجريبية
const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
      { id: 'admin-1', name: 'فريق الدعم', role: 'admin' },
      { id: 'user-1', name: 'أحمد محمد', role: 'user' }
    ],
    lastMessage: 'شكراً لكم على المتابعة السريعة',
    updatedAt: new Date(2023, 3, 15, 10, 30),
    unreadCount: 2,
    category: 'students',
    messages: [
      {
        id: 'msg-1',
        content: 'السلام عليكم، لدي استفسار حول طلب التسجيل الخاص بي',
        sender: 'user',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 0),
        read: true,
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
        content: 'أريد معرفة حالة طلبي للالتحاق بجامعة لندن',
        sender: 'user',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 10),
        read: true,
      },
      {
        id: 'msg-4',
        content: 'تم التحقق من طلبك، وهو حالياً قيد المراجعة من قبل الجامعة. سنخبرك فور وصول الرد.',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 20),
        read: true,
      },
      {
        id: 'msg-5',
        content: 'شكراً لكم على المتابعة السريعة',
        sender: 'user',
        type: 'text',
        timestamp: new Date(2023, 3, 15, 10, 30),
        read: false,
      },
    ],
  },
  {
    id: 'conv-2',
    participants: [
      { id: 'admin-1', name: 'فريق الدعم', role: 'admin' },
      { id: 'user-2', name: 'سارة عبدالله', role: 'user' }
    ],
    lastMessage: 'تم إرسال المستندات المطلوبة',
    updatedAt: new Date(2023, 3, 14, 14, 45),
    unreadCount: 0,
    category: 'students',
    messages: [
      {
        id: 'msg-6',
        content: 'مرحباً، أرغب في معرفة المستندات المطلوبة للتقديم',
        sender: 'user',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 30),
        read: true,
      },
      {
        id: 'msg-7',
        content: 'مرحباً سارة، يمكنك الاطلاع على قائمة المستندات المطلوبة في صفحة التقديم. هل تحتاجين إلى مساعدة محددة؟',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 35),
        read: true,
      },
      {
        id: 'msg-8',
        content: 'نعم، هل الشهادة الجامعية مترجمة أم يمكن إرسالها باللغة العربية؟',
        sender: 'user',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 40),
        read: true,
      },
      {
        id: 'msg-9',
        content: 'يجب أن تكون الشهادة مترجمة إلى اللغة الإنجليزية ومصدقة من وزارة الخارجية.',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 42),
        read: true,
      },
      {
        id: 'msg-10',
        content: 'تم إرسال المستندات المطلوبة',
        sender: 'user',
        type: 'text',
        timestamp: new Date(2023, 3, 14, 14, 45),
        read: true,
      },
    ],
  },
  {
    id: 'conv-3',
    participants: [
      { id: 'agent-1', name: 'خالد الأحمد', role: 'agent' },
      { id: 'admin-1', name: 'فريق الدعم', role: 'admin' }
    ],
    lastMessage: 'سأقوم بمتابعة الطلبات الجديدة خلال الأسبوع القادم',
    updatedAt: new Date(2023, 3, 16, 9, 15),
    unreadCount: 3,
    category: 'agents',
    messages: [
      {
        id: 'msg-11',
        content: 'السلام عليكم، لدي بعض الاستفسارات حول الطلبات الجديدة',
        sender: 'agent',
        type: 'text',
        timestamp: new Date(2023, 3, 16, 9, 0),
        read: true,
      },
      {
        id: 'msg-12',
        content: 'مرحباً خالد، كيف يمكننا مساعدتك؟',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 16, 9, 5),
        read: true,
      },
      {
        id: 'msg-13',
        content: 'هل هناك تحديث على سياسات القبول للفصل القادم؟',
        sender: 'agent',
        type: 'text',
        timestamp: new Date(2023, 3, 16, 9, 10),
        read: false,
      },
      {
        id: 'msg-14',
        content: 'سأقوم بمتابعة الطلبات الجديدة خلال الأسبوع القادم',
        sender: 'agent',
        type: 'text',
        timestamp: new Date(2023, 3, 16, 9, 15),
        read: false,
      },
    ],
  },
  {
    id: 'conv-4',
    participants: [
      { id: 'university-1', name: 'جامعة إسطنبول', role: 'university' },
      { id: 'admin-1', name: 'فريق الدعم', role: 'admin' }
    ],
    lastMessage: 'تم تحديث متطلبات القبول للفصل القادم',
    updatedAt: new Date(2023, 3, 17, 11, 45),
    unreadCount: 1,
    category: 'universities',
    messages: [
      {
        id: 'msg-15',
        content: 'مرحباً، نود إبلاغكم بتحديثات جديدة بخصوص متطلبات القبول',
        sender: 'university',
        type: 'text',
        timestamp: new Date(2023, 3, 17, 11, 30),
        read: true,
      },
      {
        id: 'msg-16',
        content: 'شكراً للتواصل. هل يمكنكم إرسال التفاصيل الكاملة؟',
        sender: 'admin',
        type: 'text',
        timestamp: new Date(2023, 3, 17, 11, 35),
        read: true,
      },
      {
        id: 'msg-17',
        content: 'نعم، سنرسل لكم ملف PDF يحتوي على جميع التحديثات خلال ساعات',
        sender: 'university',
        type: 'text',
        timestamp: new Date(2023, 3, 17, 11, 40),
        read: true,
      },
      {
        id: 'msg-18',
        content: 'تم تحديث متطلبات القبول للفصل القادم',
        sender: 'university',
        type: 'text',
        timestamp: new Date(2023, 3, 17, 11, 45),
        read: false,
      },
    ],
  },
];

const getParticipantColor = (role: string) => {
  switch (role) {
    case 'user':
      return 'bg-unlimited-blue';
    case 'agent':
      return 'bg-unlimited-success';
    case 'university':
      return 'bg-unlimited-warning';
    case 'admin':
      return 'bg-unlimited-dark-blue';
    default:
      return 'bg-unlimited-gray';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'students':
      return 'الطلاب';
    case 'agents':
      return 'الوكلاء';
    case 'universities':
      return 'الجامعات';
    case 'staff':
      return 'فريق العمل';
    default:
      return category;
  }
};

const AdminMessages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [newMessage, setNewMessage] = useState('');
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false);
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // تصفية المحادثات حسب البحث والفئة
  const filteredConversations = conversations.filter((conversation) => {
    const participantNames = conversation.participants.map(p => p.name.toLowerCase());
    const matchesSearch = participantNames.some(name => name.includes(searchQuery.toLowerCase())) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || conversation.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
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
      sender: 'admin',
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

  const handleSendAttachment = (type: MessageType) => {
    toast({
      title: "إرسال مرفق",
      description: `تم إرسال المرفق بنجاح`,
    });
    setIsAttachmentDialogOpen(false);
  };

  const handleCreateConversation = () => {
    toast({
      title: "إنشاء محادثة",
      description: "تم إنشاء المحادثة الجديدة بنجاح",
    });
    setIsNewConversationOpen(false);
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col h-[calc(100vh-150px)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-unlimited-dark-blue">نظام المراسلات</div>
            {getTotalUnreadCount() > 0 && (
              <Badge className="bg-unlimited-danger text-white mr-2">{getTotalUnreadCount()} جديدة</Badge>
            )}
          </div>
          
          <Dialog open={isNewConversationOpen} onOpenChange={setIsNewConversationOpen}>
            <DialogTrigger asChild>
              <Button>
                <MessageSquare className="h-4 w-4 ml-2" />
                محادثة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إنشاء محادثة جديدة</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right col-span-1">الفئة</label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="students">الطلاب</SelectItem>
                        <SelectItem value="agents">الوكلاء</SelectItem>
                        <SelectItem value="universities">الجامعات</SelectItem>
                        <SelectItem value="staff">فريق العمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right col-span-1">المستلم</label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستلم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user-1">أحمد محمد</SelectItem>
                        <SelectItem value="user-2">سارة عبدالله</SelectItem>
                        <SelectItem value="agent-1">خالد الأحمد (وكيل)</SelectItem>
                        <SelectItem value="university-1">جامعة إسطنبول</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right col-span-1">الموضوع</label>
                  <Input className="col-span-3" placeholder="موضوع الرسالة" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label className="text-right col-span-1 mt-3">الرسالة</label>
                  <div className="col-span-3">
                    <textarea 
                      className="w-full border rounded-md p-2 h-24" 
                      placeholder="اكتب رسالتك هنا..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCreateConversation}>إنشاء</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-1 border rounded-md overflow-hidden">
          {/* قائمة المحادثات */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-l bg-gray-50">
            <div className="p-3 border-b">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
                <Input
                  placeholder="البحث في المحادثات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs defaultValue="all" onValueChange={(value) => setCategoryFilter(value)}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">الكل</TabsTrigger>
                  <TabsTrigger value="students" className="flex-1">الطلاب</TabsTrigger>
                  <TabsTrigger value="agents" className="flex-1">الوكلاء</TabsTrigger>
                  <TabsTrigger value="universities" className="flex-1">الجامعات</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <ScrollArea className="h-[calc(100vh-270px)]">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-unlimited-gray">
                  لا توجد محادثات متطابقة مع البحث
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-gray-100 border-b ${
                      selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full ${getParticipantColor(conversation.participants.find(p => p.role !== 'admin')?.role || 'user')} flex items-center justify-center text-white`}>
                          <User className="h-6 w-6" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">
                            {conversation.participants.find(p => p.role !== 'admin')?.name || 'المستخدم'}
                          </div>
                          <div className="text-xs text-unlimited-gray">
                            {getCategoryLabel(conversation.category)}
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
                ))
              )}
            </ScrollArea>
          </div>
          
          {/* نافذة المحادثة */}
          {selectedConversation ? (
            <div className="hidden md:flex md:flex-col flex-1">
              {/* رأس المحادثة */}
              <div className="p-3 border-b flex items-center justify-between bg-gray-50">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full ${getParticipantColor(selectedConversation.participants.find(p => p.role !== 'admin')?.role || 'user')} flex items-center justify-center text-white`}>
                    <User className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">
                      {selectedConversation.participants.find(p => p.role !== 'admin')?.name || 'المستخدم'}
                    </div>
                    <div className="text-xs text-unlimited-gray">
                      {getCategoryLabel(selectedConversation.category)}
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>تحديث المحادثة</DropdownMenuItem>
                    <DropdownMenuItem>إعادة توجيه المحادثة</DropdownMenuItem>
                    <DropdownMenuItem>تحميل المحادثة</DropdownMenuItem>
                    <DropdownMenuItem>أرشفة المحادثة</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* محتوى المحادثة */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'admin'
                            ? 'bg-unlimited-dark-blue text-white rounded-tr-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === 'admin' ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                          {message.sender !== 'admin' && (
                            <span className="mr-2">
                              {message.read ? '✓✓' : '✓'}
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
                <div className="flex items-end space-x-2 rtl:space-x-reverse">
                  <Dialog open={isAttachmentDialogOpen} onOpenChange={setIsAttachmentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>إرسال مرفق</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 gap-6 py-4">
                        <div
                          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSendAttachment('image')}
                        >
                          <Image className="h-12 w-12 mx-auto text-unlimited-gray mb-2" />
                          <p className="font-medium">إرسال صورة</p>
                          <p className="text-sm text-unlimited-gray mt-1">PNG, JPG, GIF حتى 10MB</p>
                        </div>
                        
                        <div
                          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSendAttachment('file')}
                        >
                          <File className="h-12 w-12 mx-auto text-unlimited-gray mb-2" />
                          <p className="font-medium">إرسال ملف</p>
                          <p className="text-sm text-unlimited-gray mt-1">PDF, DOCX, XLSX حتى 20MB</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
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
                  اختر محادثة من القائمة للبدء في التواصل. يمكنك إرسال رسائل ومرفقات.
                </p>
                <Button className="mt-4" onClick={() => setIsNewConversationOpen(true)}>
                  <MessageSquare className="h-4 w-4 ml-2" />
                  بدء محادثة جديدة
                </Button>
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
                  <div className={`h-8 w-8 rounded-full ${getParticipantColor(selectedConversation.participants.find(p => p.role !== 'admin')?.role || 'user')} flex items-center justify-center text-white`}>
                    <User className="h-4 w-4" />
                  </div>
                  <div className="ml-2">
                    <div className="font-medium text-sm">
                      {selectedConversation.participants.find(p => p.role !== 'admin')?.name || 'المستخدم'}
                    </div>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'admin'
                            ? 'bg-unlimited-dark-blue text-white rounded-tr-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === 'admin' ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
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
                    onClick={() => setIsAttachmentDialogOpen(true)}
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

export default AdminMessages;
