import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Mail,
  Smartphone,
  Settings,
  Clock,
  Calendar,
  FileText,
  Info,
  MessageSquare,
  Check,
  AlertTriangle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

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
  
  const [emailSettings, setEmailSettings] = useState({
    applicationUpdates: true,
    messageNotifications: true,
    systemUpdates: true,
    marketingEmails: false,
    deadlineReminders: true,
    paymentReminders: true,
  });
  
  const [pushSettings, setPushSettings] = useState({
    applicationUpdates: true,
    messageNotifications: true,
    systemUpdates: true,
    deadlineReminders: true,
    paymentReminders: true,
  });
  
  const [mobileSettings, setMobileSettings] = useState({
    smsNotifications: false,
    phoneNumber: '',
    verifiedPhone: false,
  });
  
  const [advancedSettings, setAdvancedSettings] = useState({
    notificationFrequency: 'immediate',
    digestTime: '18:00',
    doNotDisturb: false,
    doNotDisturbStart: '22:00',
    doNotDisturbEnd: '08:00',
    quietMode: false,
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
    });
  };
  
  const handleResetSettings = () => {
    setSettings({
      emailNotifications: true,
      applicationUpdates: true,
      messageNotifications: true,
      marketingEmails: false,
    });
    
    setEmailSettings({
      applicationUpdates: true,
      messageNotifications: true,
      systemUpdates: true,
      marketingEmails: false,
      deadlineReminders: true,
      paymentReminders: true,
    });
    
    setPushSettings({
      applicationUpdates: true,
      messageNotifications: true,
      systemUpdates: true,
      deadlineReminders: true,
      paymentReminders: true,
    });
    
    setMobileSettings({
      smsNotifications: false,
      phoneNumber: '',
      verifiedPhone: false,
    });
    
    setAdvancedSettings({
      notificationFrequency: 'immediate',
      digestTime: '18:00',
      doNotDisturb: false,
      doNotDisturbStart: '22:00',
      doNotDisturbEnd: '08:00',
      quietMode: false,
    });
    
    toast({
      title: "تم إعادة ضبط الإعدادات",
      description: "تم إعادة ضبط جميع إعدادات الإشعارات إلى الإعدادات الافتراضية",
    });
  };
  
  const handlePhoneVerification = () => {
    if (mobileSettings.phoneNumber) {
      toast({
        title: "تم إرسال رمز التحقق",
        description: `تم إرسال رمز التحقق إلى الرقم ${mobileSettings.phoneNumber}`,
      });
    } else {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم هاتف صحيح",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t("notifications.settings.title", "إعدادات الإشعارات")}</CardTitle>
        <CardDescription>{t("notifications.settings.subtitle", "تخصيص كيفية تلقي الإشعارات")}</CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="general">
        <div className="px-6">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              عام
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              البريد الإلكتروني
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              الجوال
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              متقدم
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="px-6 pb-0">
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-y-0.5">
                <div>
                  <h3 className="text-base font-medium">تفعيل الإشعارات</h3>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عن طلباتك والرسائل والتحديثات</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-base font-medium mb-4">أنواع الإشعارات</h3>
                
                <div className="grid gap-6">
                  <div className="flex items-center justify-between space-y-0.5">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">تحديثات الطلبات</div>
                        <p className="text-sm text-muted-foreground">إشعارات عن حالة طلباتك والمستندات المطلوبة</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.applicationUpdates}
                      onCheckedChange={(checked) => setSettings({...settings, applicationUpdates: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-y-0.5">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">الرسائل</div>
                        <p className="text-sm text-muted-foreground">إشعارات عن الرسائل الجديدة والردود</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.messageNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, messageNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-y-0.5">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium">المواعيد والتواريخ النهائية</div>
                        <p className="text-sm text-muted-foreground">تذكيرات بالمواعيد والتواريخ النهائية للتقديم</p>
                      </div>
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-y-0.5">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Info className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">تحديثات النظام</div>
                        <p className="text-sm text-muted-foreground">إشعارات عن تحديثات النظام والميزات الجديدة</p>
                      </div>
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-y-0.5">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">رسائل تسويقية</div>
                        <p className="text-sm text-muted-foreground">عروض وفرص جديدة من الجامعات والبرامج</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => setSettings({...settings, marketingEmails: checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <div className="flex items-center justify-between space-y-0.5">
              <div>
                <h3 className="text-base font-medium">إشعارات البريد الإلكتروني</h3>
                <p className="text-sm text-muted-foreground">تلقي إشعارات عبر البريد الإلكتروني</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="text-base font-medium">الإعدادات التفصيلية للبريد الإلكتروني</h3>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-app-updates" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-unlimited-blue" /> تحديثات الطلبات
                  </Label>
                  <Switch
                    id="email-app-updates"
                    checked={emailSettings.applicationUpdates}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, applicationUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-messages" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-600" /> الرسائل الجديدة
                  </Label>
                  <Switch
                    id="email-messages"
                    checked={emailSettings.messageNotifications}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, messageNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-system-updates" className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-purple-600" /> تحديثات النظام
                  </Label>
                  <Switch
                    id="email-system-updates"
                    checked={emailSettings.systemUpdates}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-marketing" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-600" /> رسائل تسويقية
                  </Label>
                  <Switch
                    id="email-marketing"
                    checked={emailSettings.marketingEmails}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, marketingEmails: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-deadlines" className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" /> تذكير بالتواريخ النهائية
                  </Label>
                  <Switch
                    id="email-deadlines"
                    checked={emailSettings.deadlineReminders}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, deadlineReminders: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-payments" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-600" /> تذكير بالمدفوعات
                  </Label>
                  <Switch
                    id="email-payments"
                    checked={emailSettings.paymentReminders}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, paymentReminders: checked})}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    تردد إشعارات البريد الإلكتروني
                  </h4>
                  
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التردد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">فوري</SelectItem>
                      <SelectItem value="daily">ملخص يومي</SelectItem>
                      <SelectItem value="weekly">ملخص أسبوعي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-y-0.5">
                <div>
                  <h3 className="text-base font-medium">إشعارات SMS</h3>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عبر الرسائل النصية القصيرة</p>
                </div>
                <Switch
                  checked={mobileSettings.smsNotifications}
                  onCheckedChange={(checked) => setMobileSettings({...mobileSettings, smsNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="phone-number">رقم الهاتف</Label>
                  <Input 
                    type="tel" 
                    id="phone-number" 
                    placeholder="أدخل رقم هاتفك" 
                    value={mobileSettings.phoneNumber}
                    onChange={(e) => setMobileSettings({...mobileSettings, phoneNumber: e.target.value})}
                  />
                </div>
                
                <Button variant="outline" onClick={handlePhoneVerification} disabled={mobileSettings.verifiedPhone}>
                  {mobileSettings.verifiedPhone ? "تم التحقق" : "التحقق من رقم الهاتف"}
                </Button>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-base font-medium">أنواع الإشعارات عبر SMS</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-app-updates" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-unlimited-blue" /> تحديثات الطلبات
                    </Label>
                    <Switch
                      id="sms-app-updates"
                      checked={pushSettings.applicationUpdates}
                      onCheckedChange={(checked) => setPushSettings({...pushSettings, applicationUpdates: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-messages" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-green-600" /> الرسائل الجديدة
                    </Label>
                    <Switch
                      id="sms-messages"
                      checked={pushSettings.messageNotifications}
                      onCheckedChange={(checked) => setPushSettings({...pushSettings, messageNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-deadlines" className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" /> تذكير بالتواريخ النهائية
                    </Label>
                    <Switch
                      id="sms-deadlines"
                      checked={pushSettings.deadlineReminders}
                      onCheckedChange={(checked) => setPushSettings({...pushSettings, deadlineReminders: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-payments" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-teal-600" /> تذكير بالمدفوعات
                    </Label>
                    <Switch
                      id="sms-payments"
                      checked={pushSettings.paymentReminders}
                      onCheckedChange={(checked) => setPushSettings({...pushSettings, paymentReminders: checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-4">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50">
                  <h3 className="text-base font-medium">وضع عدم الإزعاج</h3>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform peer-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="do-not-disturb">تفعيل وضع عدم الإزعاج</Label>
                    <Switch
                      id="do-not-disturb"
                      checked={advancedSettings.doNotDisturb}
                      onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, doNotDisturb: checked})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dnd-start">البداية</Label>
                      <Input 
                        type="time" 
                        id="dnd-start" 
                        value={advancedSettings.doNotDisturbStart}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, doNotDisturbStart: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dnd-end">النهاية</Label>
                      <Input 
                        type="time" 
                        id="dnd-end" 
                        value={advancedSettings.doNotDisturbEnd}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, doNotDisturbEnd: e.target.value})}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50">
                  <h3 className="text-base font-medium">الوضع الهادئ</h3>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform peer-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quiet-mode">تفعيل الوضع الهادئ</Label>
                    <Switch
                      id="quiet-mode"
                      checked={advancedSettings.quietMode}
                      onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, quietMode: checked})}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">يتم تأخير جميع الإشعارات غير العاجلة حتى يتم تعطيل الوضع الهادئ</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>
          
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between items-center border-t mt-6 pt-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">إعادة ضبط الإعدادات</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>إعادة ضبط الإعدادات؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيؤدي هذا الإجراء إلى إعادة ضبط جميع إعدادات الإشعارات إلى الإعدادات الافتراضية. هل تريد المتابعة؟
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetSettings}>متابعة</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <div className="flex gap-2">
          <Button variant="outline">إلغاء</Button>
          <Button onClick={handleSaveSettings}>
            <Check className="mr-2 h-4 w-4" />
            حفظ الإعدادات
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
