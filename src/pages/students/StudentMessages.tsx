
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
  CheckCircle,
  Search,
  Settings,
  X
} from 'lucide-react';
import { getMessages } from '@/services/messageService';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Contact list component with search and filtering capabilities
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Apply both filter and search
  const filteredContacts = contacts.filter(contact => {
    // Filter by status
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && contact.unreadCount > 0) || 
      (filter === 'online' && contact.isOnline);
    
    // Filter by search query
    const matchesSearch = 
      searchQuery === '' || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Card className="h-[calc(100vh-13rem)]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">جهات الاتصال</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant={showFilters ? "default" : "outline"} 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 ml-1" />
              فلتر
            </Button>
            <Button size="sm" className="animate-pulse-once">
              <Plus className="h-4 w-4 ml-1" />
              جديد
            </Button>
          </div>
        </div>
        <CardDescription>
          تواصل مع المستشارين وممثلي الجامعات
        </CardDescription>
        
        {showFilters && (
          <div className="mt-3 space-y-3 animate-slide-in-down">
            <div className="relative">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="بحث..." 
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-1 top-1 h-7 w-7"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Tabs defaultValue="all" className="mt-2">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all" onClick={() => setFilter('all')}>الجميع</TabsTrigger>
                <TabsTrigger value="unread" onClick={() => setFilter('unread')}>غير مقروءة</TabsTrigger>
                <TabsTrigger value="online" onClick={() => setFilter('online')}>متصل</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="px-4 py-2 space-y-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all hover:shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-full ${contact.avatarColor} text-white flex items-center justify-center flex-shrink-0 relative transition-transform hover:scale-105`}>
                    {contact.avatar}
                    {contact.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{contact.name}</h4>
                      <span className="text-xs text-unlimited-gray">{contact.lastMessageTime}</span>
                    </div>
                    <div className="text-sm text-unlimited-gray truncate">{contact.lastMessage}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {contact.role}
                      </span>
                      {contact.unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-2 animate-pulse">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-unlimited-gray">
                <Search className="h-10 w-10 mb-3 text-unlimited-gray/50" />
                <p className="mb-1">لا توجد نتائج</p>
                <p className="text-sm">جرب تغيير كلمات البحث أو إعادة ضبط الفلاتر</p>
                <Button variant="link" onClick={() => {
                  setSearchQuery('');
                  setFilter('all');
                }}>
                  إعادة ضبط
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Updates and notifications component
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
  
  const [selectedView, setSelectedView] = useState<'all' | 'appointments' | 'updates'>('all');

  const markAsRead = (id: number) => {
    setUpdates(updates.map(update => 
      update.id === id ? {...update, isNew: false} : update
    ));
    
    toast({
      title: "تم وضع علامة كمقروء",
      description: "تم تعيين الإشعار كمقروء بنجاح",
    });
  };
  
  const markAllAsRead = () => {
    setUpdates(updates.map(update => ({...update, isNew: false})));
    
    toast({
      title: "تم تعيين الكل كمقروء",
      description: "تم تعيين جميع الإشعارات كمقروءة بنجاح",
    });
  };
  
  const filteredUpdates = updates.filter(update => {
    if (selectedView === 'all') return true;
    if (selectedView === 'appointments') return update.type === 'appointment';
    if (selectedView === 'updates') return update.type === 'update' || update.type === 'feature';
    return true;
  });
  
  const hasNewUpdates = updates.some(update => update.isNew);

  return (
    <Card className="h-[calc(100vh-13rem)]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">آخر التحديثات</CardTitle>
          {hasNewUpdates && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              تعيين الكل كمقروء
            </Button>
          )}
        </div>
        <CardDescription>
          أحدث الأخبار والتنبيهات المتعلقة بطلباتك
        </CardDescription>
        <div className="flex gap-2 mt-2">
          <Button 
            variant={selectedView === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('all')}
            className="flex-1"
          >
            الكل
          </Button>
          <Button 
            variant={selectedView === 'appointments' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('appointments')}
            className="flex-1"
          >
            المواعيد
          </Button>
          <Button 
            variant={selectedView === 'updates' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('updates')}
            className="flex-1"
          >
            التحديثات
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="px-4 py-2 space-y-3">
            {filteredUpdates.length > 0 ? (
              filteredUpdates.map(update => (
                <div 
                  key={update.id}
                  className={cn(
                    "p-3 rounded-md border transition-all",
                    update.isNew 
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 animate-pulse-light" 
                      : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:shadow-sm"
                  )}
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
                        className="h-6 w-6 p-0 rounded-full hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/30"
                        onClick={() => markAsRead(update.id)}
                      >
                        <CheckCircle className="h-4 w-4 text-unlimited-blue" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-unlimited-gray">
                <Bell className="h-10 w-10 mb-3 text-unlimited-gray/50" />
                <p>لا توجد تحديثات لعرضها</p>
              </div>
            )}
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
  const [activeTab, setActiveTab] = useState('messages');
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
  
  const handleApplicationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const appId = e.target.value;
    const selected = applications.find(app => app.id === appId);
    if (selected) {
      setActiveApplication(selected);
      
      toast({
        title: `تم تغيير الطلب النشط`,
        description: `${selected.programName} - ${selected.universityName}`
      });
    }
  };

  useEffect(() => {
    // محاكاة التحميل
    const timer = setTimeout(() => {
      setIsLoading(false);

      // إظهار إشعار الترحيب
      toast({
        title: "مرحباً بك في نظام الرسائل المحدث",
        description: "تم تحديث نظام الرسائل بتاريخ 8 مايو 2025 مع العديد من الميزات الجديدة"
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
            <Button variant="outline" className="relative">
              <Bell className="h-4 w-4 ml-1" />
              الإشعارات
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 animate-pulse"
              >
                3
              </Badge>
            </Button>
            <Button className="animate-scale-in">
              <MessageSquare className="h-4 w-4 ml-1" />
              رسالة جديدة
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card className="col-span-4 bg-gradient-to-r from-unlimited-light-blue to-unlimited-blue text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-dots.svg')] opacity-10"></div>
            <CardContent className="p-4 relative z-10">
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
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="animate-bounce-light hover:bg-white hover:text-unlimited-blue transition-all"
                  >
                    تصفح الجامعات الجديدة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs 
          defaultValue="messages" 
          className="mb-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="messages" className="relative">
                المراسلات
                <Badge variant="secondary" className="absolute -top-2 -left-2">4</Badge>
              </TabsTrigger>
              <TabsTrigger value="contacts">جهات الاتصال</TabsTrigger>
              <TabsTrigger value="ai-assistant">المساعد الذكي</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 items-center">
              <select 
                className="bg-white dark:bg-gray-800 border border-unlimited-gray/20 rounded px-3 py-1 text-sm"
                value={activeApplication.id}
                onChange={handleApplicationChange}
              >
                <option value="" disabled>اختر الطلب...</option>
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.programName} - {app.universityName}
                    {app.unreadCount > 0 ? ` (${app.unreadCount} غير مقروء)` : ''}
                  </option>
                ))}
              </select>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="flex flex-col items-center">
                <div className="animate-rotate-360 rounded-full h-12 w-12 border-b-2 border-unlimited-blue"></div>
                <p className="mt-4 text-unlimited-gray animate-pulse">جاري تحميل الرسائل...</p>
              </div>
            </div>
          ) : (
            <>
              <TabsContent value="messages" className="animate-fade-in">
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
                  <Card className="animate-slide-in-up [animation-delay:100ms]">
                    <CardHeader>
                      <CardTitle>المستشارين التعليميين</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>قائمة المستشارين التعليميين المتاحين للتواصل</p>
                      <Button className="mt-4 w-full">عرض المستشارين</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="animate-slide-in-up [animation-delay:200ms]">
                    <CardHeader>
                      <CardTitle>ممثلي الجامعات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>قائمة ممثلي الجامعات المتاحين للتواصل</p>
                      <Button className="mt-4 w-full">عرض الممثلين</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="animate-slide-in-up [animation-delay:300ms]">
                    <CardHeader>
                      <CardTitle>خدمات الدعم</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>فريق الدعم والخدمات الطلابية</p>
                      <Button className="mt-4 w-full">طلب المساعدة</Button>
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
