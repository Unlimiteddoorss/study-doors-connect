
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessagesContainer from '@/components/applications/messages/MessagesContainer';
import MessagesAI from '@/components/applications/messages/MessagesAI';
import { 
  MessageSquare, 
  Users, 
  School, 
  Bell, 
  Calendar, 
  Filter, 
  Plus, 
  ArrowUp,
  CheckCircle
} from 'lucide-react';
import { getMessages } from '@/services/messageService';

// Новый компонент для отображения контактов
const ContactsList = () => {
  const [contacts, setContacts] = useState([
    {
      id: 'advisor-1',
      name: 'أحمد المرشد',
      role: 'مستشار تعليمي',
      avatar: 'أ',
      avatarColor: 'bg-green-500',
      lastMessage: 'مرحباً، هل لديك أي استفسارات جديدة؟',
      lastMessageTime: '10:30',
      unreadCount: 3,
      isOnline: true
    },
    {
      id: 'university-1',
      name: 'قسم القبول - جامعة إسطنبول',
      role: 'ممثل جامعة',
      avatar: 'ج',
      avatarColor: 'bg-purple-500',
      lastMessage: 'تم مراجعة طلبك وهناك بعض الملاحظات...',
      lastMessageTime: 'أمس',
      unreadCount: 1,
      isOnline: false
    },
    {
      id: 'advisor-2',
      name: 'ليلى المساعدة',
      role: 'مستشار تعليمي',
      avatar: 'ل',
      avatarColor: 'bg-green-500',
      lastMessage: 'تم تحديث معلومات المنحة الدراسية',
      lastMessageTime: 'الأحد',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 'university-2',
      name: 'قسم السكن الجامعي - جامعة أنقرة',
      role: 'خدمات السكن',
      avatar: 'س',
      avatarColor: 'bg-orange-500',
      lastMessage: 'نرجو تأكيد حجز السكن الجامعي قبل نهاية الشهر',
      lastMessageTime: '2 مايو',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 'system-1',
      name: 'إشعارات النظام',
      role: 'نظام',
      avatar: 'ن',
      avatarColor: 'bg-blue-500',
      lastMessage: 'تم تحديث حالة طلبك إلى "قيد المراجعة النهائية"',
      lastMessageTime: '30 أبريل',
      unreadCount: 0,
      isOnline: true
    }
  ]);
  const [filter, setFilter] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    if (filter === 'unread') return contact.unreadCount > 0;
    if (filter === 'online') return contact.isOnline;
    return true;
  });

  return (
    <Card className="h-[calc(100vh-13rem)]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">جهات الاتصال</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-1" />
              فلتر
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-1" />
              جديد
            </Button>
          </div>
        </div>
        <CardDescription>
          تواصل مع المستشارين وممثلي الجامعات
        </CardDescription>
        <Tabs defaultValue="all" className="mt-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all" onClick={() => setFilter('all')}>الجميع</TabsTrigger>
            <TabsTrigger value="unread" onClick={() => setFilter('unread')}>غير مقروءة</TabsTrigger>
            <TabsTrigger value="online" onClick={() => setFilter('online')}>متصل</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="px-4 py-2 space-y-2">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
              >
                <div className={`w-10 h-10 rounded-full ${contact.avatarColor} text-white flex items-center justify-center flex-shrink-0 relative`}>
                  {contact.avatar}
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-grow overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{contact.name}</h4>
                    <span className="text-xs text-unlimited-gray">{contact.lastMessageTime}</span>
                  </div>
                  <div className="text-sm text-unlimited-gray truncate">{contact.lastMessage}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      {contact.role}
                    </span>
                    {contact.unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Компонент новостей и уведомлений для правой боковой панели
const MessagingUpdates = () => {
  const { toast } = useToast();
  const [updates, setUpdates] = useState([
    {
      id: 1,
      title: 'ميزة جديدة - الرسائل الصوتية',
      description: 'يمكنك الآن إرسال رسائل صوتية في المحادثات',
      date: '8 مايو 2025',
      isNew: true,
      type: 'feature'
    },
    {
      id: 2,
      title: 'موعد مقابلة قبول',
      description: 'تم جدولة مقابلة القبول مع جامعة إسطنبول',
      date: '15 مايو 2025',
      isNew: true,
      type: 'appointment'
    },
    {
      id: 3,
      title: 'تحديث حالة الطلب',
      description: 'تم تحديث حالة طلبك إلى "قيد المراجعة النهائية"',
      date: '5 مايو 2025',
      isNew: false,
      type: 'update'
    },
    {
      id: 4,
      title: 'موعد نهائي للمستندات',
      description: 'يرجى تقديم المستندات المطلوبة قبل 20 مايو',
      date: '1 مايو 2025',
      isNew: false,
      type: 'deadline'
    }
  ]);

  const markAsRead = (id) => {
    setUpdates(updates.map(update => 
      update.id === id ? {...update, isNew: false} : update
    ));
    
    toast({
      title: "تم وضع علامة كمقروء",
      description: "تم تعيين الإشعار كمقروء بنجاح",
    });
  };

  return (
    <Card className="h-[calc(100vh-13rem)]">
      <CardHeader>
        <CardTitle className="text-lg">آخر التحديثات</CardTitle>
        <CardDescription>
          أحدث الأخبار والتنبيهات المتعلقة بطلباتك
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="px-4 py-2 space-y-3">
            {updates.map(update => (
              <div 
                key={update.id}
                className={`p-3 rounded-md border ${
                  update.isNew ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium flex items-center">
                      {update.type === 'feature' && <Bell className="h-4 w-4 ml-1 text-unlimited-blue" />}
                      {update.type === 'appointment' && <Calendar className="h-4 w-4 ml-1 text-green-500" />}
                      {update.type === 'update' && <ArrowUp className="h-4 w-4 ml-1 text-purple-500" />}
                      {update.type === 'deadline' && <Bell className="h-4 w-4 ml-1 text-red-500" />}
                      {update.title}
                      {update.isNew && (
                        <Badge variant="secondary" className="mr-2 h-5 px-2 text-xs">جديد</Badge>
                      )}
                    </h4>
                    <p className="text-sm text-unlimited-gray mt-1">{update.description}</p>
                    <div className="text-xs text-unlimited-gray mt-2">{update.date}</div>
                  </div>
                  {update.isNew && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={() => markAsRead(update.id)}
                    >
                      <CheckCircle className="h-4 w-4 text-unlimited-blue" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const StudentMessages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeApplication, setActiveApplication] = useState({
    id: 'app-123',
    programName: 'بكالوريوس الطب',
    universityName: 'جامعة إسطنبول'
  });
  const [applications, setApplications] = useState([
    {
      id: 'app-123',
      programName: 'بكالوريوس الطب',
      universityName: 'جامعة إسطنبول',
      unreadCount: 2
    },
    {
      id: 'app-456',
      programName: 'ماجستير هندسة البرمجيات',
      universityName: 'جامعة أنقرة',
      unreadCount: 0
    }
  ]);

  useEffect(() => {
    // محاكاة التحميل
    const timer = setTimeout(() => {
      setIsLoading(false);

      // إظهار إشعار الترحيب
      toast({
        title: "مرحباً بك في نظام الرسائل المحدث",
        description: "تم تحديث نظام الرسائل بتاريخ 8 مايو 2025 مع العديد من الميزات الجديدة",
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">الرسائل</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 ml-1" />
              الإشعارات
              <Badge variant="secondary" className="mr-1">3</Badge>
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 ml-1" />
              رسالة جديدة
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card className="col-span-4 bg-gradient-to-r from-unlimited-light-blue to-unlimited-blue text-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-1">مركز الرسائل والتواصل</h2>
                  <p className="text-blue-50">
                    تواصل مباشرة مع المستشارين التعليميين وممثلي الجامعات وتابع المستجدات
                  </p>
                  <div className="flex items-center mt-3 gap-5">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 ml-1" />
                      <span>5 جهات اتصال</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 ml-1" />
                      <span>12 رسالة جديدة</span>
                    </div>
                    <div className="flex items-center">
                      <School className="h-5 w-5 ml-1" />
                      <span>2 طلبات تقديم</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Button variant="secondary" size="lg">
                    تصفح الجامعات الجديدة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="mb-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="messages" className="relative">
                المراسلات
                <Badge variant="secondary" className="absolute -top-2 -left-2">4</Badge>
              </TabsTrigger>
              <TabsTrigger value="contacts">جهات الاتصال</TabsTrigger>
              <TabsTrigger value="ai-assistant">المساعد الذكي</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <select className="bg-white border border-unlimited-gray/20 rounded px-3 py-1 text-sm">
                <option value="">اختر الطلب...</option>
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.programName} - {app.universityName}
                    {app.unreadCount > 0 ? ` (${app.unreadCount} غير مقروء)` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unlimited-blue"></div>
            </div>
          ) : (
            <>
              <TabsContent value="messages">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="col-span-1">
                    <ContactsList />
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="h-[calc(100vh-13rem)]">
                      <CardContent className="p-0">
                        <MessagesContainer
                          programName={activeApplication.programName}
                          universityName={activeApplication.universityName}
                          applicationId={activeApplication.id}
                        />
                      </CardContent>
                    </Card>
                  </div>
                  <div className="col-span-1">
                    <MessagingUpdates />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contacts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Placeholder for contacts list */}
                  <Card>
                    <CardHeader>
                      <CardTitle>المستشارين التعليميين</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>قائمة المستشارين التعليميين المتاحين للتواصل</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>ممثلي الجامعات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>قائمة ممثلي الجامعات المتاحين للتواصل</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>خدمات الدعم</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>فريق الدعم والخدمات الطلابية</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="ai-assistant" className="h-[calc(100vh-20rem)]">
                <Card className="h-full">
                  <CardContent className="p-0 h-full">
                    <MessagesAI applicationId={activeApplication.id} />
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
