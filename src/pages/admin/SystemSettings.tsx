
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Shield, 
  Mail, 
  Database, 
  Bell,
  FileText,
  Save,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SystemSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // إعدادات عامة
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Unlimited Edu',
    siteDescription: 'منصة التعليم الجامعي',
    supportEmail: 'support@unlimitededu.com',
    maintenanceMode: false,
    registrationEnabled: true,
    maxFileSize: 10, // MB
    defaultLanguage: 'ar'
  });

  // إعدادات الأمان
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: 24, // hours
    passwordMinLength: 8,
    maxLoginAttempts: 5,
    requireEmailVerification: true
  });

  // إعدادات الإشعارات
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    systemMaintenance: true
  });

  const handleSaveGeneral = async () => {
    setIsLoading(true);
    // محاكاة حفظ الإعدادات
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الإعدادات العامة بنجاح"
    });
    setIsLoading(false);
  };

  const handleSaveSecurity = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الأمان بنجاح"
    });
    setIsLoading(false);
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الإشعارات بنجاح"
    });
    setIsLoading(false);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">
              إعدادات النظام
            </h1>
            <p className="text-unlimited-gray mt-2">
              إدارة إعدادات النظام والأمان والإشعارات
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              عام
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              الأمان
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              النسخ الاحتياطي
            </TabsTrigger>
          </TabsList>

          {/* الإعدادات العامة */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  الإعدادات العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">اسم الموقع</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        siteName: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">البريد الإلكتروني للدعم</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        supportEmail: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">الحد الأقصى لحجم الملف (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={generalSettings.maxFileSize}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        maxFileSize: parseInt(e.target.value)
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">اللغة الافتراضية</Label>
                    <select
                      id="defaultLanguage"
                      className="w-full px-3 py-2 border rounded-md"
                      value={generalSettings.defaultLanguage}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        defaultLanguage: e.target.value
                      })}
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                      <option value="tr">Türkçe</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">وصف الموقع</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({
                      ...generalSettings,
                      siteDescription: e.target.value
                    })}
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="maintenanceMode">وضع الصيانة</Label>
                    <p className="text-sm text-gray-500">إيقاف الموقع مؤقتاً للصيانة</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({
                      ...generalSettings,
                      maintenanceMode: checked
                    })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="registrationEnabled">تمكين التسجيل</Label>
                    <p className="text-sm text-gray-500">السماح للمستخدمين الجدد بإنشاء حسابات</p>
                  </div>
                  <Switch
                    id="registrationEnabled"
                    checked={generalSettings.registrationEnabled}
                    onCheckedChange={(checked) => setGeneralSettings({
                      ...generalSettings,
                      registrationEnabled: checked
                    })}
                  />
                </div>

                <Button onClick={handleSaveGeneral} disabled={isLoading} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'جاري الحفظ...' : 'حفظ الإعدادات العامة'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* إعدادات الأمان */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  إعدادات الأمان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">مهلة انتهاء الجلسة (ساعات)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value)
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">الحد الأدنى لطول كلمة المرور</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        passwordMinLength: parseInt(e.target.value)
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">الحد الأقصى لمحاولات تسجيل الدخول</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="3"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        maxLoginAttempts: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="twoFactorRequired">المصادقة الثنائية مطلوبة</Label>
                      <p className="text-sm text-gray-500">إجبار جميع المستخدمين على تفعيل المصادقة الثنائية</p>
                    </div>
                    <Switch
                      id="twoFactorRequired"
                      checked={securitySettings.twoFactorRequired}
                      onCheckedChange={(checked) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorRequired: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="requireEmailVerification">التحقق من البريد الإلكتروني مطلوب</Label>
                      <p className="text-sm text-gray-500">إجبار المستخدمين على تأكيد بريدهم الإلكتروني</p>
                    </div>
                    <Switch
                      id="requireEmailVerification"
                      checked={securitySettings.requireEmailVerification}
                      onCheckedChange={(checked) => setSecuritySettings({
                        ...securitySettings,
                        requireEmailVerification: checked
                      })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveSecurity} disabled={isLoading} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  {isLoading ? 'جاري الحفظ...' : 'حفظ إعدادات الأمان'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* إعدادات الإشعارات */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  إعدادات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="emailNotifications">الإشعارات بالبريد الإلكتروني</Label>
                      <p className="text-sm text-gray-500">إرسال إشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="smsNotifications">الإشعارات بالرسائل النصية</Label>
                      <p className="text-sm text-gray-500">إرسال إشعارات عبر الرسائل النصية</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="pushNotifications">الإشعارات المباشرة</Label>
                      <p className="text-sm text-gray-500">إرسال إشعارات مباشرة في المتصفح</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="adminAlerts">تنبيهات المشرفين</Label>
                      <p className="text-sm text-gray-500">إشعارات خاصة للمشرفين والإداريين</p>
                    </div>
                    <Switch
                      id="adminAlerts"
                      checked={notificationSettings.adminAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        adminAlerts: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="systemMaintenance">إشعارات صيانة النظام</Label>
                      <p className="text-sm text-gray-500">إشعارات حول صيانة وتحديثات النظام</p>
                    </div>
                    <Switch
                      id="systemMaintenance"
                      checked={notificationSettings.systemMaintenance}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        systemMaintenance: checked
                      })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} disabled={isLoading} className="w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  {isLoading ? 'جاري الحفظ...' : 'حفظ إعدادات الإشعارات'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* النسخ الاحتياطي */}
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  النسخ الاحتياطي والاستعادة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">النسخة الاحتياطية التلقائية</h3>
                    <p className="text-sm text-gray-500 mb-4">آخر نسخة احتياطية: أمس الساعة 3:00 ص</p>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      إنشاء نسخة احتياطية الآن
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">استعادة النظام</h3>
                    <p className="text-sm text-gray-500 mb-4">استعادة النظام من نسخة احتياطية سابقة</p>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      عرض النسخ المتاحة
                    </Button>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">النسخ الاحتياطية الحديثة</h3>
                  <div className="space-y-2">
                    {[
                      { date: 'أمس', time: '3:00 ص', size: '245 MB', status: 'مكتملة' },
                      { date: 'قبل يومين', time: '3:00 ص', size: '243 MB', status: 'مكتملة' },
                      { date: 'قبل ثلاثة أيام', time: '3:00 ص', size: '241 MB', status: 'مكتملة' }
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{backup.date} - {backup.time}</span>
                          <p className="text-sm text-gray-500">{backup.size} - {backup.status}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">تحميل</Button>
                          <Button size="sm" variant="outline">استعادة</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
