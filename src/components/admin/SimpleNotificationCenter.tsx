
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bell, Check, Clock, Eye, Star, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type Notification = {
  id: string;
  type: 'alert' | 'message' | 'task' | 'info';
  title: string;
  description: string;
  time: string;
  read: boolean;
  starred?: boolean;
};

// Demo notifications data
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'طلب جديد مقدم',
    description: 'أحمد محمد قدم طلب تسجيل جديد في برنامج الطب',
    time: 'منذ 5 دقائق',
    read: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'رسالة من الدعم الفني',
    description: 'هناك تحديث جديد متوفر للنظام',
    time: 'منذ 30 دقيقة',
    read: false,
    starred: true,
  },
  {
    id: '3',
    type: 'task',
    title: 'مهمة تحتاج مراجعة',
    description: 'هناك 3 طلبات تحتاج إلى مراجعة عاجلة',
    time: 'منذ ساعة',
    read: true,
  }
];

const SimpleNotificationCenter = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'starred') return notification.starred;
    return true;
  });
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const toggleStar = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, starred: !n.starred } : n
    ));
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': 
        return <div className="p-2 rounded-full bg-red-100 text-red-600"><Bell className="h-4 w-4" /></div>;
      case 'message': 
        return <div className="p-2 rounded-full bg-blue-100 text-blue-600"><Eye className="h-4 w-4" /></div>;
      case 'task': 
        return <div className="p-2 rounded-full bg-amber-100 text-amber-600"><Clock className="h-4 w-4" /></div>;
      default: 
        return <div className="p-2 rounded-full bg-green-100 text-green-600"><Check className="h-4 w-4" /></div>;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          aria-label="الإشعارات"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 max-h-[80vh] overflow-hidden">
        <div className="flex flex-col h-full max-h-[70vh]">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">{t('notifications.title', 'الإشعارات')}</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead} 
                  className="text-xs"
                >
                  {t('notifications.markAllRead', 'تحديد الكل كمقروء')}
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
            <TabsList className="grid grid-cols-3 p-1 mx-4 my-2">
              <TabsTrigger value="all" className="text-xs">
                {t('notifications.all', 'الكل')}
                <Badge variant="outline" className="ml-1">{notifications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                {t('notifications.unread', 'غير مقروءة')}
                <Badge variant="outline" className="ml-1">{unreadCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="starred" className="text-xs">
                {t('notifications.starred', 'مهمة')}
                <Badge variant="outline" className="ml-1">{notifications.filter(n => n.starred).length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[400px] px-2">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex p-3 mb-2 rounded-lg",
                      notification.read ? "bg-gray-50" : "bg-blue-50 border-r-2 border-blue-500"
                    )}
                  >
                    <div className="flex-shrink-0 mr-3 rtl:mr-0 rtl:ml-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <button 
                            onClick={() => toggleStar(notification.id)} 
                            className="text-gray-400 hover:text-yellow-500 focus:outline-none"
                          >
                            <Star 
                              className={cn(
                                "h-3 w-3", 
                                notification.starred ? "fill-yellow-500 text-yellow-500" : ""
                              )} 
                            />
                          </button>
                          <button 
                            onClick={() => removeNotification(notification.id)} 
                            className="text-gray-400 hover:text-red-500 focus:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markAsRead(notification.id)} 
                            className="text-xs h-6 px-2"
                          >
                            {t('notifications.markRead', 'تحديد كمقروء')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Bell className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500">
                    {activeTab === 'all' ? t('notifications.noNotifications', 'لا توجد إشعارات') :
                     activeTab === 'unread' ? t('notifications.noUnreadNotifications', 'لا توجد إشعارات غير مقروءة') :
                     t('notifications.noStarredNotifications', 'لا توجد إشعارات مهمة')}
                  </p>
                </div>
              )}
            </div>
          </Tabs>
          
          <div className="border-t p-3 text-center">
            <Button 
              variant="link" 
              size="sm" 
              className="text-blue-600 text-xs"
              onClick={() => setIsOpen(false)}
            >
              {t('notifications.viewAllNotifications', 'عرض جميع الإشعارات')}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SimpleNotificationCenter;
