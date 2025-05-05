
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, Mail, FileText, Calendar, Info, AlertCircle, Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'success' | 'info' | 'warning' | 'error' | 'update';
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
    },
    {
      id: 'notif2',
      title: 'مستندات مطلوبة',
      message: 'يرجى تحميل نسخة من جواز السفر الخاص بك',
      time: 'منذ 5 ساعات',
      isRead: false,
      type: 'warning',
    },
    {
      id: 'notif3',
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة من قسم الدعم',
      time: 'منذ يوم واحد',
      isRead: true,
      type: 'info',
    },
    {
      id: 'notif4',
      title: 'تحديث النظام',
      message: 'تم تحديث منصة أبواب بلا حدود بميزات جديدة',
      time: 'منذ 3 أيام',
      isRead: true,
      type: 'update',
    },
    {
      id: 'notif5',
      title: 'موعد مقابلة',
      message: 'لديك موعد مقابلة قادمة مع ممثل الجامعة',
      time: 'منذ أسبوع',
      isRead: true,
      type: 'info',
    },
  ]);

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

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: t("notifications.deleted", "تم الحذف"),
      description: t("notifications.deletedDescription", "تم حذف الإشعار بنجاح"),
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">{t("notifications.title", "الإشعارات")}</CardTitle>
          <CardDescription>{t("notifications.subtitle", "إدارة الإشعارات والتنبيهات")}</CardDescription>
        </div>
        <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
          {t("notifications.markAllRead", "تحديد الكل كمقروء")}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex gap-3 p-4 rounded-lg relative ${
                  notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-r-4 border-unlimited-blue'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="bg-white p-2 h-min rounded-full shadow-sm">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-unlimited-gray">{notification.time}</span>
                  </div>
                  <p className="text-sm text-unlimited-gray mt-1">{notification.message}</p>
                  <div className="flex mt-2 gap-2">
                    <Button size="sm" variant="link" className="p-0 h-auto text-unlimited-blue">
                      {t("notifications.viewDetails", "عرض التفاصيل")}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="link" 
                      className="p-0 h-auto text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      {t("notifications.delete", "حذف")}
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
    </Card>
  );
};

export default NotificationList;
