
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
          >
            الجميع
          </Button>
          <Button 
            variant={selectedView === 'appointments' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('appointments')}
          >
            المواعيد
          </Button>
          <Button 
            variant={selectedView === 'updates' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('updates')}
          >
            التحديثات
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="px-4 py-2 space-y-3">
            {filteredUpdates.map((update) => (
              <div
                key={update.id}
                className={cn(
                  "p-4 rounded-lg border transition-all hover:shadow-sm cursor-pointer",
                  update.isNew 
                    ? "border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800" 
                    : "border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
                )}
                onClick={() => markAsRead(update.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{update.title}</h4>
                      {update.isNew && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          جديد
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-unlimited-gray mb-2">{update.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-unlimited-gray">{update.date}</span>
                      <div className="flex items-center gap-1">
                        {update.type === 'appointment' && <Calendar className="h-3 w-3" />}
                        {update.type === 'update' && <Bell className="h-3 w-3" />}
                        {update.type === 'feature' && <ArrowUp className="h-3 w-3" />}
                        {update.type === 'deadline' && <ArrowUp className="h-3 w-3 text-orange-500" />}
                      </div>
                    </div>
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

const StudentMessages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacts');

  useEffect(() => {
    console.log('StudentMessages component mounted successfully');
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">الرسائل والتواصل</h1>
            <p className="text-unlimited-gray">تواصل مع المستشارين وممثلي الجامعات</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/user-messages')}>
              <MessageSquare className="h-4 w-4 ml-2" />
              المحادثات المفصلة
            </Button>
            <Button onClick={() => navigate('/apply')}>
              <Plus className="h-4 w-4 ml-2" />
              طلب جديد
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              جهات الاتصال
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              الرسائل
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              التحديثات
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              المساعد الذكي
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            <ContactsList />
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <MessagesContainer 
              programName="برنامج الهندسة"
              universityName="جامعة إسطنبول"
              applicationId="default-app-id"
            />
          </TabsContent>

          <TabsContent value="updates" className="space-y-4">
            <MessagingUpdates />
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-4">
            <MessagesAI applicationId="ai-assistant" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
