
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationList from '@/components/student/NotificationList';
import NotificationSettings from '@/components/student/NotificationSettings';
import { Bell, Settings } from 'lucide-react';

const StudentNotifications = () => {
  const initialNotifications = [
    {
      id: 'notif1',
      title: 'تم تحديث حالة طلبك',
      message: 'تم قبول طلبك للبرنامج الدراسي في جامعة أوزيجين',
      time: 'منذ ساعتين',
      isRead: false,
      type: 'success' as const,
    },
    {
      id: 'notif2',
      title: 'مستندات مطلوبة',
      message: 'يرجى تحميل نسخة من جواز السفر الخاص بك',
      time: 'منذ 5 ساعات',
      isRead: false,
      type: 'warning' as const,
    },
    {
      id: 'notif3',
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة من قسم الدعم',
      time: 'منذ يوم واحد',
      isRead: true,
      type: 'info' as const,
    },
    {
      id: 'notif4',
      title: 'تحديث النظام',
      message: 'تم تحديث منصة أبواب بلا حدود بميزات جديدة',
      time: 'منذ 3 أيام',
      isRead: true,
      type: 'update' as const,
    },
    {
      id: 'notif5',
      title: 'موعد مقابلة',
      message: 'لديك موعد مقابلة قادمة مع ممثل الجامعة',
      time: 'منذ أسبوع',
      isRead: true,
      type: 'info' as const,
    },
  ];

  const [settings, setSettings] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    messageNotifications: true,
    marketingEmails: false,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              إعدادات الإشعارات
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="mt-0">
            <NotificationList initialNotifications={initialNotifications} />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <NotificationSettings initialSettings={settings} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentNotifications;
