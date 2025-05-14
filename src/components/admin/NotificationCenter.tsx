
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { toast } from '@/hooks/use-toast';

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
  },
  {
    id: '4',
    type: 'info',
    title: 'إحصائيات الشهر',
    description: 'تم تحديث تقارير وإحصائيات الشهر الجاري',
    time: 'منذ 2 ساعة',
    read: true,
  },
  {
    id: '5',
    type: 'alert',
    title: 'تنبيه أمان',
    description: 'تم تسجيل الدخول من جهاز جديد، الرجاء التحقق',
    time: 'منذ 3 ساعات',
    read: false,
    starred: true,
  },
];

const NotificationCenter = () => {
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
    toast({
      title: "تم تحديث الإشعارات",
      description: "تم تحديد جميع الإشعارات كمقروءة",
    });
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
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-unlimited-danger animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 max-h-[80vh] overflow-hidden">
        <div className="flex flex-col h-full max-h-[70vh]">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">{t('notifications.title')}</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead} 
                  className="text-xs"
                >
                  {t('notifications.markAllRead')}
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
            <TabsList className="grid grid-cols-3 p-1 mx-4 my-2">
              <TabsTrigger value="all" className="text-xs">
                {t('notifications.all')}
                <Badge variant="outline" className="ml-1">{notifications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                {t('notifications.unread')}
                <Badge variant="outline" className="ml-1">{unreadCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="starred" className="text-xs">
                {t('notifications.starred')}
                <Badge variant="outline" className="ml-1">{notifications.filter(n => n.starred).length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[400px] px-2">
              <AnimatePresence>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex p-3 mb-2 rounded-lg",
                        notification.read ? "bg-gray-50" : "bg-unlimited-blue/5 border-r-2 border-unlimited-blue"
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
                              className="text-gray-400 hover:text-unlimited-warning focus:outline-none"
                            >
                              <Star 
                                className={cn(
                                  "h-3 w-3", 
                                  notification.starred ? "fill-unlimited-warning text-unlimited-warning" : ""
                                )} 
                              />
                            </button>
                            <button 
                              onClick={() => removeNotification(notification.id)} 
                              className="text-gray-400 hover:text-unlimited-danger focus:outline-none"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-unlimited-gray mt-1">
                          {notification.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-unlimited-gray">{notification.time}</span>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => markAsRead(notification.id)} 
                              className="text-xs h-6 px-2"
                            >
                              {t('notifications.markRead')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    <Bell className="h-10 w-10 text-unlimited-gray/40 mb-3" />
                    <p className="text-sm text-unlimited-gray">
                      {activeTab === 'all' ? t('notifications.noNotifications') :
                       activeTab === 'unread' ? t('notifications.noUnreadNotifications') :
                       t('notifications.noStarredNotifications')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
          
          <div className="border-t p-3 text-center">
            <Button 
              variant="link" 
              size="sm" 
              className="text-unlimited-blue text-xs"
              onClick={() => setIsOpen(false)}
            >
              {t('notifications.viewAllNotifications')}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
