
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, Mail, FileText, Calendar, Info, AlertCircle, Bell, X, Star, Bookmark, MessageSquare, Download, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'success' | 'info' | 'warning' | 'error' | 'update';
  actionUrl?: string;
  actionLabel?: string;
  isImportant?: boolean;
}

interface NotificationListProps {
  initialNotifications?: Notification[];
}

const NotificationList = ({ initialNotifications }: NotificationListProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications || [
    {
      id: 'notif1',
      title: 'تم تحديث حالة طلبك',
      message: 'تم قبول طلبك للبرنامج الدراسي في جامعة أوزيجين',
      time: 'منذ ساعتين',
      isRead: false,
      type: 'success',
      actionUrl: '/dashboard/applications/app-123',
      actionLabel: 'عرض الطلب',
      isImportant: true
    },
    {
      id: 'notif2',
      title: 'مستندات مطلوبة',
      message: 'يرجى تحميل نسخة من جواز السفر الخاص بك قبل الموعد النهائي',
      time: 'منذ 5 ساعات',
      isRead: false,
      type: 'warning',
      actionUrl: '/dashboard/applications/app-123?tab=documents',
      actionLabel: 'تحميل المستندات',
    },
    {
      id: 'notif3',
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة من قسم الدعم بخصوص استفسارك عن مواعيد التقديم',
      time: 'منذ يوم واحد',
      isRead: true,
      type: 'info',
      actionUrl: '/messages',
      actionLabel: 'عرض الرسالة',
    },
    {
      id: 'notif4',
      title: 'تحديث النظام',
      message: 'تم تحديث منصة أبواب بلا حدود بميزات جديدة للبحث عن البرامج والجامعات',
      time: 'منذ 3 أيام',
      isRead: true,
      type: 'update',
    },
    {
      id: 'notif5',
      title: 'موعد مقابلة',
      message: 'لديك موعد مقابلة قادمة مع ممثل الجامعة يوم الثلاثاء القادم الساعة 2 ظهراً',
      time: 'منذ أسبوع',
      isRead: true,
      type: 'info',
      actionUrl: '/dashboard/calendar',
      actionLabel: 'إضافة للتقويم',
      isImportant: true
    },
    {
      id: 'notif6',
      title: 'عرض منحة دراسية',
      message: 'أنت مؤهل للتقديم على منحة دراسية في جامعة إسطنبول تغطي 50% من الرسوم الدراسية',
      time: 'منذ أسبوعين',
      isRead: true,
      type: 'success',
      actionUrl: '/scholarships/123',
      actionLabel: 'التقديم الآن',
      isImportant: true
    },
    {
      id: 'notif7',
      title: 'تذكير بالموعد النهائي',
      message: 'تبقى 3 أيام على الموعد النهائي للتقديم في برنامج الطب البشري بجامعة وارسو',
      time: 'منذ أسبوعين',
      isRead: true,
      type: 'warning',
      actionUrl: '/programs/456',
      actionLabel: 'التقديم الآن',
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState<boolean>(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="h-5 w-5 text-green-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'update': return <Bell className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5 text-unlimited-blue" />;
    }
  };

  const getNotificationBgColor = (type: string, isRead: boolean) => {
    if (!isRead) return 'bg-blue-50 border-r-4 border-unlimited-blue';
    
    switch (type) {
      case 'success': return 'bg-green-50';
      case 'info': return 'bg-blue-50';
      case 'warning': return 'bg-yellow-50';
      case 'error': return 'bg-red-50';
      case 'update': return 'bg-purple-50';
      default: return 'bg-gray-50';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.isRead;
    if (activeTab === 'important') return notif.isImportant;
    
    return notif.type === activeTab;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    toast({
      title: t("notifications.markedAllRead", "تمت القراءة"),
      description: t("notifications.markedAllReadDescription", "تم تحديث جميع الإشعارات كمقروءة"),
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const deleteNotification = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: t("notifications.deleted", "تم الحذف"),
      description: t("notifications.deletedDescription", "تم حذف الإشعار بنجاح"),
    });
  };

  const toggleImportant = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isImportant: !notif.isImportant } : notif
    ));
    
    const notification = notifications.find(n => n.id === id);
    toast({
      title: notification?.isImportant ? "تمت إزالة الإشعار من المهمة" : "تمت إضافة الإشعار للمهمة",
      description: notification?.isImportant ? "تم إزالة الإشعار من قائمة الإشعارات المهمة" : "تم إضافة الإشعار إلى قائمة الإشعارات المهمة",
    });
  };

  const toggleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(nid => nid !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedNotifications([]);
  };

  const selectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(notif => !selectedNotifications.includes(notif.id)));
    toast({
      title: t("notifications.deleted", "تم الحذف"),
      description: `تم حذف ${selectedNotifications.length} إشعارات بنجاح`,
    });
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  const markSelectedAsRead = () => {
    setNotifications(notifications.map(notif => 
      selectedNotifications.includes(notif.id) ? { ...notif, isRead: true } : notif
    ));
    toast({
      title: t("notifications.markedRead", "تمت القراءة"),
      description: `تم تحديث ${selectedNotifications.length} إشعارات كمقروءة`,
    });
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const downloadAllNotifications = () => {
    // في تطبيق حقيقي، سيتم إنشاء ملف تصدير
    toast({
      title: "تم تصدير الإشعارات",
      description: "تم تصدير الإشعارات بنجاح إلى ملف",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">{t("notifications.title", "الإشعارات")}</CardTitle>
          <CardDescription>{t("notifications.subtitle", "إدارة الإشعارات والتنبيهات")}</CardDescription>
        </div>
        
        <div className="flex gap-2">
          {selectMode ? (
            <>
              <Button variant="outline" size="sm" onClick={toggleSelectMode}>
                <X className="h-4 w-4 ml-1" />
                إلغاء
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={selectAll}
              >
                {selectedNotifications.length === filteredNotifications.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={toggleSelectMode}>
                <Check className="h-4 w-4 ml-1" />
                تحديد
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead} 
                disabled={unreadCount === 0}
              >
                تحديد الكل كمقروء
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={downloadAllNotifications}>
                    <Download className="h-4 w-4 ml-2" />
                    تصدير الإشعارات
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setNotifications([]);
                    toast({
                      title: "تم حذف جميع الإشعارات",
                      description: "تم حذف جميع الإشعارات بنجاح",
                    });
                  }}>
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف جميع الإشعارات
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </CardHeader>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">
              الكل
              {notifications.length > 0 && (
                <Badge variant="secondary" className="mr-2">{notifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              غير مقروءة
              {unreadCount > 0 && (
                <Badge variant="secondary" className="mr-2">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="important" className="flex-1">
              مهمة
              {notifications.filter(n => n.isImportant).length > 0 && (
                <Badge variant="secondary" className="mr-2">{notifications.filter(n => n.isImportant).length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent>
          {selectMode && selectedNotifications.length > 0 && (
            <div className="bg-unlimited-light-blue/10 rounded-md p-3 mb-4 flex justify-between items-center">
              <div>تم تحديد {selectedNotifications.length} إشعارات</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={markSelectedAsRead}>
                  <Check className="h-4 w-4 ml-1" />
                  تحديد كمقروء
                </Button>
                <Button size="sm" variant="destructive" onClick={deleteSelected}>
                  <Trash2 className="h-4 w-4 ml-1" />
                  حذف المحدد
                </Button>
              </div>
            </div>
          )}
        
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex gap-3 p-4 rounded-lg relative ${
                    getNotificationBgColor(notification.type, notification.isRead)
                  } ${selectMode ? 'cursor-pointer' : ''}`}
                  onClick={() => selectMode ? toggleSelectNotification(notification.id) : markAsRead(notification.id)}
                >
                  {selectMode && (
                    <div className="absolute right-3 top-3">
                      <Checkbox 
                        checked={selectedNotifications.includes(notification.id)} 
                        onCheckedChange={() => toggleSelectNotification(notification.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  
                  <div className="bg-white p-2 h-min rounded-full shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <h4 className="font-medium">{notification.title}</h4>
                        {notification.isImportant && (
                          <Badge variant="outline" className="mr-2 border-yellow-400 text-yellow-600">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                            مهم
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-unlimited-gray">{notification.time}</span>
                    </div>
                    
                    <p className="text-sm text-unlimited-gray mt-1">{notification.message}</p>
                    
                    <div className="flex mt-3 gap-2 flex-wrap">
                      {notification.actionUrl && notification.actionLabel && (
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = notification.actionUrl!;
                          }}
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImportant(notification.id, e);
                        }}
                      >
                        {notification.isImportant ? (
                          <>
                            <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400" />
                            إزالة من المهمة
                          </>
                        ) : (
                          <>
                            <Star className="h-3.5 w-3.5 mr-1" />
                            إضافة للمهمة
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id, e);
                        }}
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-unlimited-gray opacity-30" />
                <p className="text-unlimited-gray mt-2">{t("notifications.empty", "لا توجد إشعارات جديدة")}</p>
              </div>
            )}
          </div>
        </CardContent>
        
        {filteredNotifications.length > 0 && (
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="text-sm text-unlimited-gray">
              {filteredNotifications.length} إشعارات
            </div>
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={!filteredNotifications.some(n => !n.isRead)}>
              <Check className="h-3.5 w-3.5 ml-1" />
              تحديد الكل كمقروء
            </Button>
          </CardFooter>
        )}
      </Tabs>
    </Card>
  );
};

export default NotificationList;
