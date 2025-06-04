
import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    applicationId?: string;
    studentName?: string;
    universityName?: string;
  };
}

interface NotificationCenterProps {
  userId: string;
  userRole: 'student' | 'admin' | 'agent';
}

const NotificationCenter = ({ userId, userRole }: NotificationCenterProps) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // محاكاة الإشعارات حسب نوع المستخدم
  useEffect(() => {
    loadNotifications();
    
    // محاكاة إشعارات فورية
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        addNewNotification();
      }
    }, 30000); // كل 30 ثانية

    return () => clearInterval(interval);
  }, [userId, userRole]);

  const loadNotifications = () => {
    setIsLoading(true);
    
    // محاكاة تحميل الإشعارات
    setTimeout(() => {
      const mockNotifications = generateMockNotifications(userRole);
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockNotifications = (role: string): Notification[] => {
    const baseNotifications: Notification[] = [];

    if (role === 'student') {
      baseNotifications.push(
        {
          id: '1',
          title: 'تم قبول طلبك',
          message: 'تهانينا! تم قبول طلبك في جامعة إسطنبول - برنامج الطب البشري',
          type: 'success',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          actionUrl: '/applications/123',
          metadata: {
            applicationId: '123',
            universityName: 'جامعة إسطنبول'
          }
        },
        {
          id: '2',
          title: 'مستندات مطلوبة',
          message: 'يرجى تحميل نسخة من جواز السفر لاستكمال طلبك',
          type: 'warning',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          read: false,
          actionUrl: '/applications/123/documents'
        },
        {
          id: '3',
          title: 'رسالة جديدة',
          message: 'لديك رسالة جديدة من جامعة أنقرة',
          type: 'info',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          read: true
        }
      );
    } else if (role === 'admin') {
      baseNotifications.push(
        {
          id: '4',
          title: 'طلب جديد',
          message: 'تم تقديم طلب جديد من الطالب أحمد محمد',
          type: 'info',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          read: false,
          metadata: {
            applicationId: '124',
            studentName: 'أحمد محمد'
          }
        },
        {
          id: '5',
          title: 'تحديث حالة طلب',
          message: 'تم تحديث حالة طلب رقم 125 إلى "قيد المراجعة"',
          type: 'success',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          read: false
        }
      );
    }

    return baseNotifications;
  };

  const addNewNotification = () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: 'إشعار جديد',
      message: 'لديك تحديث جديد في النظام',
      type: 'info',
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // إشعار صوتي أو مرئي
    toast({
      title: newNotification.title,
      description: newNotification.message,
    });
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">الإشعارات</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 ml-1" />
                تحديد الكل كمقروء
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="max-h-96">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-unlimited-blue mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">جاري التحميل...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد إشعارات</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getNotificationIcon(notification.type)}
                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(notification.timestamp, { 
                            addSuffix: true, 
                            locale: ar 
                          })}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 text-xs"
                            >
                              تحديد كمقروء
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-6 w-6"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-3 border-t">
            <Button variant="outline" className="w-full" size="sm">
              عرض جميع الإشعارات
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
