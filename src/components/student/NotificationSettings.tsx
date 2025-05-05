
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Mail, Bell, Calendar, FileText, AlertCircle, Smartphone, Globe, Info, Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';

interface NotificationSettingsProps {
  initialSettings?: {
    emailNotifications: boolean;
    applicationUpdates: boolean;
    messageNotifications: boolean;
    marketingEmails: boolean;
    pushNotifications?: boolean;
    smsNotifications?: boolean;
    notificationDigest?: 'instant' | 'daily' | 'weekly';
    notificationSound?: boolean;
    browserNotifications?: boolean;
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
    pushNotifications: true,
    smsNotifications: false,
    notificationDigest: 'instant' as const,
    notificationSound: true,
    browserNotifications: true,
  });

  const [phoneNumber, setPhoneNumber] = useState('966');
  const [activeTab, setActiveTab] = useState('general');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

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

  const handleSelectChange = (setting: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: t("notifications.settings.updated", "تم تحديث الإعدادات"),
      description: t("notifications.settings.updatedDescription", "تم تحديث إعدادات الإشعارات بنجاح"),
    });
    
    console.log(`Updated ${setting} to:`, value);
  };

  const handleVerifyPhone = () => {
    if (phoneNumber && phoneNumber.length > 5) {
      toast({
        title: "تم إرسال رمز التحقق",
        description: `تم إرسال رمز التحقق إلى الرقم ${phoneNumber}`,
      });
    } else {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم هاتف صحيح",
        variant: "destructive"
      });
    }
  };

  const saveAllSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ جميع إعدادات الإشعارات بنجاح",
    });
  };

  const resetToDefaults = () => {
    setSettings({
      emailNotifications: true,
      applicationUpdates: true,
      messageNotifications: true,
      marketingEmails: false,
      pushNotifications: true,
      smsNotifications: false,
      notificationDigest: 'instant' as const,
      notificationSound: true,
      browserNotifications: true,
    });
    
    toast({
      title: "تم إعادة الضبط",
      description: "تم إعادة ضبط إعدادات الإشعارات إلى الوضع الافتراضي",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("notifications.settings.title", "إعدادات الإشعارات")}</CardTitle>
        <CardDescription>
          {t("notifications.settings.description", "تحكم في كيفية تلقي الإشعارات وتنظيمها")}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="general" className="flex-1">
              <Bell className="h-4 w-4 ml-2" />
              عام
            </TabsTrigger>
            <TabsTrigger value="email" className="flex-1">
              <Mail className="h-4 w-4 ml-2" />
              البريد الإلكتروني
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex-1">
              <Smartphone className="h-4 w-4 ml-2" />
              الجوال
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">
              <Settings className="h-4 w-4 ml-2" />
              متقدم
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="space-y-4">
          <TabsContent value="general" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>{t("notifications.settings.applicationUpdates", "تحديثات الطلبات")}</span>
                  <p className="text-sm text-unlimited-gray">تلقي إشعارات عند تغيير حالة الطلب أو طلب معلومات إضافية</p>
                </div>
              </div>
              <Switch 
                checked={settings.applicationUpdates} 
                onCheckedChange={() => handleToggleSetting('applicationUpdates')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>{t("notifications.settings.messageNotifications", "إشعارات الرسائل")}</span>
                  <p className="text-sm text-unlimited-gray">تلقي إشعارات عند استلام رسائل جديدة</p>
                </div>
              </div>
              <Switch 
                checked={settings.messageNotifications} 
                onCheckedChange={() => handleToggleSetting('messageNotifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>{t("notifications.settings.marketingEmails", "النشرات الإخبارية والعروض")}</span>
                  <p className="text-sm text-unlimited-gray">تلقي النشرات الإخبارية والعروض الخاصة والفعاليات</p>
                </div>
              </div>
              <Switch 
                checked={settings.marketingEmails} 
                onCheckedChange={() => handleToggleSetting('marketingEmails')} 
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h3 className="font-medium">تواتر الإشعارات</h3>
              <RadioGroup 
                value={settings.notificationDigest} 
                onValueChange={(value) => handleSelectChange('notificationDigest', value)}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse py-2">
                  <RadioGroupItem value="instant" id="instant" />
                  <Label htmlFor="instant">فوري (تلقي الإشعارات فور حدوثها)</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse py-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">ملخص يومي (تلقي ملخص يومي بجميع الإشعارات)</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse py-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">ملخص أسبوعي (تلقي ملخص أسبوعي بجميع الإشعارات)</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="mt-0 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>{t("notifications.settings.emailNotifications", "إشعارات البريد الإلكتروني")}</span>
                  <p className="text-sm text-unlimited-gray">تلقي جميع الإشعارات عبر البريد الإلكتروني</p>
                </div>
              </div>
              <Switch 
                checked={settings.emailNotifications} 
                onCheckedChange={() => handleToggleSetting('emailNotifications')} 
              />
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline py-2">
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 ml-2" />
                    إعدادات متقدمة للبريد الإلكتروني
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">تنسيق HTML للرسائل</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">تضمين الروابط للإجراءات السريعة</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">إشعارات الردود على تعليقاتك</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium flex items-center">
                <Info className="h-4 w-4 ml-2 text-unlimited-blue" />
                البريد الإلكتروني المؤكد
              </h3>
              <p className="text-sm text-unlimited-gray mt-1">user@example.com</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">تغيير البريد الإلكتروني</Button>
                <Button variant="outline" size="sm">إعادة إرسال التأكيد</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="mt-0 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>إشعارات الدفع (Push)</span>
                  <p className="text-sm text-unlimited-gray">تلقي إشعارات فورية على جهازك</p>
                </div>
              </div>
              <Switch 
                checked={settings.pushNotifications} 
                onCheckedChange={() => handleToggleSetting('pushNotifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>صوت الإشعارات</span>
                  <p className="text-sm text-unlimited-gray">تشغيل صوت عند استلام إشعار جديد</p>
                </div>
              </div>
              <Switch 
                checked={settings.notificationSound} 
                onCheckedChange={() => handleToggleSetting('notificationSound')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>الرسائل النصية (SMS)</span>
                  <p className="text-sm text-unlimited-gray">تلقي تحديثات مهمة عبر الرسائل النصية</p>
                </div>
              </div>
              <Switch 
                checked={settings.smsNotifications} 
                onCheckedChange={() => handleToggleSetting('smsNotifications')} 
              />
            </div>
            
            {settings.smsNotifications && (
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium">رقم الهاتف للإشعارات النصية</h3>
                <div className="flex gap-2 mt-2">
                  <Input 
                    placeholder="أدخل رقم الهاتف" 
                    className="max-w-xs"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button onClick={handleVerifyPhone}>تحقق</Button>
                </div>
                {!isPhoneVerified && (
                  <div className="mt-2 text-sm flex items-center text-unlimited-blue">
                    <AlertCircle className="h-4 w-4 ml-1" />
                    مطلوب التحقق من رقم الهاتف
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-0 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-unlimited-gray" />
                <div>
                  <span>إشعارات المتصفح</span>
                  <p className="text-sm text-unlimited-gray">السماح بإشعارات سطح المكتب عند استخدام المتصفح</p>
                </div>
              </div>
              <Switch 
                checked={settings.browserNotifications} 
                onCheckedChange={() => handleToggleSetting('browserNotifications')} 
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">أوقات الإزعاج</h3>
              <p className="text-sm text-unlimited-gray">تعيين الأوقات التي لا ترغب في تلقي إشعارات فيها</p>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label>من</Label>
                  <Select defaultValue="22:00">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر وقتاً" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>{`${i.toString().padStart(2, '0')}:00`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>إلى</Label>
                  <Select defaultValue="07:00">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر وقتاً" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>{`${i.toString().padStart(2, '0')}:00`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Label>أيام تطبيق أوقات الإزعاج</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => (
                    <Button key={index} variant="outline" className="h-8">
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" onClick={resetToDefaults}>
          استعادة الإعدادات الافتراضية
        </Button>
        <Button onClick={saveAllSettings}>
          <Save className="h-4 w-4 ml-2" />
          حفظ الإعدادات
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
