
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Bell, CheckCircle, ChevronDown, ChevronRight, FileText, Info, MessageSquare, Settings, User, Users, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from '@/hooks/use-toast';

type NotificationType = 'message' | 'application' | 'system' | 'agent' | 'student' | 'university';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  link: string;
  details?: {
    studentId?: string;
    studentName?: string;
    agentId?: string;
    agentName?: string;
    applicationId?: string;
    universityName?: string;
    programName?: string;
    action?: string;
  };
};

const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'طلب التحاق جديد',
    message: 'تم تقديم طلب التحاق جديد بواسطة أحمد محمد لبرنامج الطب البشري في جامعة إسطنبول',
    type: 'application',
    timestamp: new Date(2023, 3, 20, 9, 30),
    read: false,
    link: '/admin/applications',
    details: {
      studentId: 'STD-001',
      studentName: 'أحمد محمد',
      applicationId: 'APP-123',
      universityName: 'جامعة إسطنبول',
      programName: 'الطب البشري',
    },
  },
  {
    id: 'notif-2',
    title: 'رسالة جديدة',
    message: 'لديك رسالة جديدة من الوكيل خالد الأحمد',
    type: 'message',
    timestamp: new Date(2023, 3, 20, 10, 15),
    read: false,
    link: '/admin/messages',
    details: {
      agentId: 'AGT-002',
      agentName: 'خالد الأحمد',
    },
  },
  {
    id: 'notif-3',
    title: 'تم تحديث بيانات طالب',
    message: 'قام الطالب سارة عبدالله بتحديث بياناته الشخصية',
    type: 'student',
    timestamp: new Date(2023, 3, 19, 15, 45),
    read: false,
    link: '/admin/students',
    details: {
      studentId: 'STD-002',
      studentName: 'سارة عبدالله',
      action: 'تحديث البيانات',
    },
  },
  {
    id: 'notif-4',
    title: 'تحديث في نظام المنصة',
    message: 'تم تحديث نظام المنصة إلى الإصدار 2.5. تحقق من التغييرات الجديدة.',
    type: 'system',
    timestamp: new Date(2023, 3, 19, 9, 0),
    read: true,
    link: '/admin',
  },
  {
    id: 'notif-5',
    title: 'تسجيل وكيل جديد',
    message: 'تم تسجيل وكيل جديد بحاجة للموافقة: محمد العلي',
    type: 'agent',
    timestamp: new Date(2023, 3, 18, 14, 20),
    read: true,
    link: '/admin/agents',
    details: {
      agentId: 'AGT-006',
      agentName: 'محمد العلي',
      action: 'تسجيل جديد',
    },
  },
  {
    id: 'notif-6',
    title: 'تحديث شروط القبول',
    message: 'قامت جامعة وارسو بتحديث شروط القبول للعام الدراسي القادم',
    type: 'university',
    timestamp: new Date(2023, 3, 17, 11, 30),
    read: true,
    link: '/admin/universities',
    details: {
      universityName: 'جامعة وارسو',
      action: 'تحديث شروط القبول',
    },
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="h-5 w-5 text-unlimited-blue" />;
    case 'application':
      return <FileText className="h-5 w-5 text-unlimited-success" />;
    case 'system':
      return <Settings className="h-5 w-5 text-unlimited-gray" />;
    case 'agent':
      return <User className="h-5 w-5 text-unlimited-warning" />;
    case 'student':
      return <Users className="h-5 w-5 text-unlimited-dark-blue" />;
    case 'university':
      return <Info className="h-5 w-5 text-unlimited-purple" />;
    default:
      return <Bell className="h-5 w-5 text-unlimited-gray" />;
  }
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [expandedNotifications, setExpandedNotifications] = useState<string[]>([]);
  const { toast } = useToast();

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    toast({
      title: "تم تحديث الإشعارات",
      description: "تم تحديد جميع الإشعارات كمقروءة",
    });
  };

  const handleDismissNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    toast({
      description: "تم حذف الإشعار",
    });
  };

  const handleToggleExpand = (id: string) => {
    if (expandedNotifications.includes(id)) {
      setExpandedNotifications(expandedNotifications.filter(noteId => noteId !== id));
    } else {
      setExpandedNotifications([...expandedNotifications, id]);
      // تحديد الإشعار كمقروء عند توسيعه
      handleMarkAsRead(id);
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">الإشعارات</h2>
            {unreadCount > 0 && (
              <Badge className="bg-unlimited-danger text-white mr-2">{unreadCount} جديدة</Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 ml-2" />
                  إعدادات الإشعارات
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>إدارة تفضيلات الإشعارات</DropdownMenuItem>
                <DropdownMenuItem>تعطيل إشعارات البريد الإلكتروني</DropdownMenuItem>
                <DropdownMenuItem>تعطيل إشعارات الرسائل</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCircle className="h-4 w-4 ml-2" />
              تحديد الكل كمقروء
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="message">الرسائل</TabsTrigger>
            <TabsTrigger value="application">الطلبات</TabsTrigger>
            <TabsTrigger value="student">الطلاب</TabsTrigger>
            <TabsTrigger value="agent">الوكلاء</TabsTrigger>
            <TabsTrigger value="system">النظام</TabsTrigger>
          </TabsList>
          
          {['all', 'message', 'application', 'student', 'agent', 'system'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="border rounded-md">
                <ScrollArea className="h-[calc(100vh-250px)]">
                  {notifications
                    .filter(notification => tab === 'all' || notification.type === tab)
                    .length === 0 ? (
                    <div className="flex items-center justify-center h-40">
                      <p className="text-unlimited-gray">لا توجد إشعارات في هذا القسم</p>
                    </div>
                  ) : (
                    notifications
                      .filter(notification => tab === 'all' || notification.type === tab)
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((notification) => (
                        <Collapsible
                          key={notification.id}
                          open={expandedNotifications.includes(notification.id)}
                          onOpenChange={() => handleToggleExpand(notification.id)}
                        >
                          <div 
                            className={`p-4 border-b flex items-start gap-3 ${
                              notification.read ? 'bg-white' : 'bg-blue-50'
                            } hover:bg-gray-50`}
                          >
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-unlimited-dark-blue">
                                  {notification.title}
                                </h4>
                                <div className="flex items-center">
                                  <p className="text-xs text-unlimited-gray ml-2">
                                    {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: ar })}
                                  </p>
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      {expandedNotifications.includes(notification.id) ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </CollapsibleTrigger>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDismissNotification(notification.id);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-unlimited-gray mt-1 truncate">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="p-4 bg-gray-50 border-b">
                              <div className="text-sm">
                                {notification.details && (
                                  <div className="space-y-2">
                                    {notification.details.studentName && (
                                      <p><span className="font-medium">الطالب:</span> {notification.details.studentName}</p>
                                    )}
                                    {notification.details.agentName && (
                                      <p><span className="font-medium">الوكيل:</span> {notification.details.agentName}</p>
                                    )}
                                    {notification.details.universityName && (
                                      <p><span className="font-medium">الجامعة:</span> {notification.details.universityName}</p>
                                    )}
                                    {notification.details.programName && (
                                      <p><span className="font-medium">البرنامج:</span> {notification.details.programName}</p>
                                    )}
                                    {notification.details.applicationId && (
                                      <p><span className="font-medium">رقم الطلب:</span> {notification.details.applicationId}</p>
                                    )}
                                    {notification.details.action && (
                                      <p><span className="font-medium">الإجراء:</span> {notification.details.action}</p>
                                    )}
                                    <div className="pt-2">
                                      <Button variant="link" asChild className="p-0">
                                        <a href={notification.link}>عرض التفاصيل</a>
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                {!notification.details && (
                                  <div className="pt-2">
                                    <Button variant="link" asChild className="p-0">
                                      <a href={notification.link}>عرض التفاصيل</a>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminNotifications;
