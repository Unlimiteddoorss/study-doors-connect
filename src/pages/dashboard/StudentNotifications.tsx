
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Check, Mail, FileText, Calendar, Info, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'success' | 'info' | 'warning' | 'error' | 'update';
}

const StudentNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
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

  const [settings, setSettings] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    messageNotifications: true,
    marketingEmails: false,
  });

  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast({
      title: "تم تحديث الإعدادات",
      description: "تم تحديث إعدادات الإشعارات بنجاح",
    });
  };

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
      title: "تمت القراءة",
      description: "تم تحديث جميع الإشعارات كمقروءة",
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
      title: "تم الحذف",
      description: "تم حذف الإشعار بنجاح",
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">الإشعارات</CardTitle>
              <CardDescription>إدارة الإشعارات والتنبيهات</CardDescription>
            </div>
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              تحديد الكل كمقروء
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
                          عرض التفاصيل
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
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 mx-auto text-unlimited-gray opacity-30" />
                  <p className="text-unlimited-gray mt-2">لا توجد إشعارات جديدة</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إعدادات الإشعارات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-unlimited-gray" />
                <span>إشعارات البريد الإلكتروني</span>
              </div>
              <Switch 
                checked={settings.emailNotifications} 
                onCheckedChange={() => handleToggleSetting('emailNotifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-unlimited-gray" />
                <span>تحديثات الطلبات</span>
              </div>
              <Switch 
                checked={settings.applicationUpdates} 
                onCheckedChange={() => handleToggleSetting('applicationUpdates')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-unlimited-gray" />
                <span>إشعارات الرسائل</span>
              </div>
              <Switch 
                checked={settings.messageNotifications} 
                onCheckedChange={() => handleToggleSetting('messageNotifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-unlimited-gray" />
                <span>النشرات الإخبارية والعروض</span>
              </div>
              <Switch 
                checked={settings.marketingEmails} 
                onCheckedChange={() => handleToggleSetting('marketingEmails')} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentNotifications;
