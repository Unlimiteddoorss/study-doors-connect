
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

interface NotificationCenterProps {
  className?: string;
}

const NotificationCenter = ({ className = '' }: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'طلب جديد',
      message: 'تم تقديم طلب جديد من قبل الطالب أحمد محمد',
      time: 'منذ 5 دقائق',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'تحديث حالة الطلب',
      message: 'تم قبول الطالب مريم أحمد في جامعة الملك سعود',
      time: 'منذ 30 دقيقة',
      read: false,
      type: 'success'
    },
    {
      id: 3,
      title: 'تنبيه: وثائق ناقصة',
      message: 'الطالب خالد عبدالله لديه وثائق ناقصة تحتاج إلى تحديث',
      time: 'منذ 2 ساعة',
      read: false,
      type: 'warning'
    },
    {
      id: 4,
      title: 'فشل عملية الدفع',
      message: 'فشلت عملية دفع الرسوم للطالب سارة علي',
      time: 'منذ 3 ساعات',
      read: true,
      type: 'error'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-unlimited-blue" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-unlimited-warning" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-unlimited-success" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-unlimited-danger" />;
      default:
        return <Info className="h-5 w-5 text-unlimited-blue" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-unlimited-danger text-white">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute z-50 mt-2 top-full right-0 w-80 bg-white shadow-lg rounded-md border border-gray-200">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium">الإشعارات</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-unlimited-blue hover:text-unlimited-dark-blue"
                onClick={markAllAsRead}
              >
                تعيين الكل كمقروء
              </Button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            <AnimatePresence>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-unlimited-blue/5' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0 mt-1">
                        {getIconByType(notification.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-unlimited-dark-blue">{notification.title}</h4>
                          <div className="flex gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 text-unlimited-gray"
                              onClick={() => removeNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-unlimited-gray mt-1">{notification.message}</p>
                        <span className="text-xs text-unlimited-gray mt-2 block">{notification.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-4 text-center text-unlimited-gray">
                  <p>لا توجد إشعارات</p>
                </div>
              )}
            </AnimatePresence>
          </div>
          <div className="p-2 border-t border-gray-200">
            <Button variant="ghost" className="w-full text-sm text-unlimited-blue">
              عرض جميع الإشعارات
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default NotificationCenter;
