
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  category: 'system' | 'application' | 'message' | 'alert';
}

const NotificationCenter = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'تم قبول طلب جديد',
      message: 'تم قبول طالب جديد في جامعة إسطنبول - برنامج الهندسة',
      time: 'منذ 5 دقائق',
      isRead: false,
      category: 'application'
    },
    {
      id: 2,
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة من المشرف أحمد',
      time: 'منذ 15 دقيقة',
      isRead: false,
      category: 'message'
    },
    {
      id: 3,
      title: 'تم تحديث النظام',
      message: 'تم تحديث النظام إلى الإصدار الجديد 2.4.0',
      time: 'منذ ساعة',
      isRead: true,
      category: 'system'
    },
    {
      id: 4,
      title: 'تنبيه هام',
      message: 'هناك 5 طلبات بحاجة إلى مراجعة عاجلة',
      time: 'منذ 3 ساعات',
      isRead: false,
      category: 'alert'
    },
    {
      id: 5,
      title: 'تم رفض طلب',
      message: 'تم رفض طلب الطالب محمد أحمد - برنامج الطب',
      time: 'منذ 4 ساعات',
      isRead: true,
      category: 'application'
    }
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'system': return 'bg-blue-100 text-blue-600';
      case 'application': return 'bg-green-100 text-green-600';
      case 'message': return 'bg-purple-100 text-purple-600';
      case 'alert': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'system': return '🛠️';
      case 'application': return '📝';
      case 'message': return '💬';
      case 'alert': return '⚠️';
      default: return '📌';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setIsOpen(true)}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-unlimited-blue text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0" sideOffset={5}>
        <motion.div 
          className="max-h-[500px] overflow-hidden flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">{t('notifications.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {unreadCount === 0 
                  ? t('notifications.allRead') 
                  : t('notifications.unread', { count: unreadCount })}
              </p>
            </div>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  {t('notifications.markAllRead')}
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                  {t('notifications.clearAll')}
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="all" className="flex-1">
            <div className="px-2 border-b">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">{t('notifications.all')}</TabsTrigger>
                <TabsTrigger value="unread">{t('notifications.unread')}</TabsTrigger>
                <TabsTrigger value="system">{t('notifications.system')}</TabsTrigger>
                <TabsTrigger value="alerts">{t('notifications.alerts')}</TabsTrigger>
              </TabsList>
            </div>

            <div className="overflow-y-auto max-h-[350px] p-2">
              <AnimatePresence>
                <TabsContent value="all" className="m-0">
                  {notifications.length > 0 ? (
                    <ul className="space-y-2">
                      {notifications.map((notification) => (
                        <motion.li
                          key={notification.id}
                          variants={itemVariants}
                          className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors hover:bg-gray-50 ${!notification.isRead ? 'bg-unlimited-blue/5' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getCategoryColor(notification.category)} flex items-center justify-center text-lg`}>
                            {getCategoryIcon(notification.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{notification.title}</h4>
                              {!notification.isRead && <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>}
                            </div>
                            <p className="text-sm text-unlimited-gray line-clamp-2">{notification.message}</p>
                            <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                          </div>
                          <button 
                            className="flex-shrink-0 text-muted-foreground hover:text-unlimited-danger opacity-0 hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            &times;
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Bell className="h-16 w-16 text-unlimited-gray opacity-20 mb-2" />
                      <p className="text-unlimited-gray">{t('notifications.empty')}</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="unread" className="m-0">
                  {notifications.filter(n => !n.isRead).length > 0 ? (
                    <ul className="space-y-2">
                      {notifications.filter(n => !n.isRead).map((notification) => (
                        <motion.li
                          key={notification.id}
                          variants={itemVariants}
                          className="p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors hover:bg-gray-50 bg-unlimited-blue/5"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getCategoryColor(notification.category)} flex items-center justify-center text-lg`}>
                            {getCategoryIcon(notification.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{notification.title}</h4>
                              <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                            </div>
                            <p className="text-sm text-unlimited-gray line-clamp-2">{notification.message}</p>
                            <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                          </div>
                          <button 
                            className="flex-shrink-0 text-muted-foreground hover:text-unlimited-danger opacity-0 hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            &times;
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Bell className="h-16 w-16 text-unlimited-gray opacity-20 mb-2" />
                      <p className="text-unlimited-gray">{t('notifications.noUnread')}</p>
                    </div>
                  )}
                </TabsContent>
                
                {/* System notifications tab */}
                <TabsContent value="system" className="m-0">
                  {notifications.filter(n => n.category === 'system').length > 0 ? (
                    <ul className="space-y-2">
                      {notifications.filter(n => n.category === 'system').map((notification) => (
                        <motion.li
                          key={notification.id}
                          variants={itemVariants}
                          className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors hover:bg-gray-50 ${!notification.isRead ? 'bg-unlimited-blue/5' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          {/* Similar structure as above */}
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                            🛠️
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{notification.title}</h4>
                              {!notification.isRead && <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>}
                            </div>
                            <p className="text-sm text-unlimited-gray line-clamp-2">{notification.message}</p>
                            <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Bell className="h-16 w-16 text-unlimited-gray opacity-20 mb-2" />
                      <p className="text-unlimited-gray">{t('notifications.noSystem')}</p>
                    </div>
                  )}
                </TabsContent>
                
                {/* Alerts tab */}
                <TabsContent value="alerts" className="m-0">
                  {notifications.filter(n => n.category === 'alert').length > 0 ? (
                    <ul className="space-y-2">
                      {notifications.filter(n => n.category === 'alert').map((notification) => (
                        <motion.li
                          key={notification.id}
                          variants={itemVariants}
                          className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors hover:bg-gray-50 ${!notification.isRead ? 'bg-unlimited-blue/5' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          {/* Similar structure as above */}
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-lg">
                            ⚠️
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{notification.title}</h4>
                              {!notification.isRead && <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>}
                            </div>
                            <p className="text-sm text-unlimited-gray line-clamp-2">{notification.message}</p>
                            <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Bell className="h-16 w-16 text-unlimited-gray opacity-20 mb-2" />
                      <p className="text-unlimited-gray">{t('notifications.noAlerts')}</p>
                    </div>
                  )}
                </TabsContent>
              </AnimatePresence>
            </div>
          </Tabs>
          
          <div className="p-3 border-t">
            <Button size="sm" className="w-full" variant="outline">
              {t('notifications.viewAll')}
            </Button>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
