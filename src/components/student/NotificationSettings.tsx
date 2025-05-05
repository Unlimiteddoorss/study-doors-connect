
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Mail, Bell, Calendar, FileText } from 'lucide-react';

interface NotificationSettingsProps {
  initialSettings?: {
    emailNotifications: boolean;
    applicationUpdates: boolean;
    messageNotifications: boolean;
    marketingEmails: boolean;
  };
}

const NotificationSettings = ({ initialSettings }: NotificationSettingsProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState(initialSettings || {
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
    
    // Display success toast
    toast({
      title: t("notifications.settings.updated", "تم تحديث الإعدادات"),
      description: t("notifications.settings.updatedDescription", "تم تحديث إعدادات الإشعارات بنجاح"),
    });
    
    // In a real app, you would save settings to the backend
    console.log('Updated notification settings:', {
      ...settings,
      [setting]: !settings[setting]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("notifications.settings.title", "إعدادات الإشعارات")}</CardTitle>
        <CardDescription>
          {t("notifications.settings.description", "تحكم في الإشعارات التي تريد استلامها")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-unlimited-gray" />
            <span>{t("notifications.settings.emailNotifications", "إشعارات البريد الإلكتروني")}</span>
          </div>
          <Switch 
            checked={settings.emailNotifications} 
            onCheckedChange={() => handleToggleSetting('emailNotifications')} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-unlimited-gray" />
            <span>{t("notifications.settings.applicationUpdates", "تحديثات الطلبات")}</span>
          </div>
          <Switch 
            checked={settings.applicationUpdates} 
            onCheckedChange={() => handleToggleSetting('applicationUpdates')} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-unlimited-gray" />
            <span>{t("notifications.settings.messageNotifications", "إشعارات الرسائل")}</span>
          </div>
          <Switch 
            checked={settings.messageNotifications} 
            onCheckedChange={() => handleToggleSetting('messageNotifications')} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-unlimited-gray" />
            <span>{t("notifications.settings.marketingEmails", "النشرات الإخبارية والعروض")}</span>
          </div>
          <Switch 
            checked={settings.marketingEmails} 
            onCheckedChange={() => handleToggleSetting('marketingEmails')} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
