
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Shield, Key, Lock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountManagement from '@/components/auth/AccountManagement';

const AccountSettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  // تفعيل أو تعطيل المصادقة الثنائية
  const toggle2FA = () => {
    setIsLoading(true);
    
    // محاكاة الاتصال بالخادم
    setTimeout(() => {
      const newStatus = !is2FAEnabled;
      setIs2FAEnabled(newStatus);
      
      toast({
        title: newStatus ? "تم تفعيل المصادقة الثنائية" : "تم تعطيل المصادقة الثنائية",
        description: newStatus 
          ? "تم تفعيل المصادقة الثنائية بنجاح لحسابك" 
          : "تم تعطيل المصادقة الثنائية لحسابك"
      });
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">إعدادات الحساب</h1>
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" />
              إعدادات الأمان
            </TabsTrigger>
            <TabsTrigger value="accounts">
              <Key className="mr-2 h-4 w-4" />
              الحسابات الفرعية
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
                <CardDescription>
                  إدارة إعدادات الأمان وخيارات المصادقة لحسابك
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-start gap-4">
                      <Shield className="h-6 w-6 mt-1 text-unlimited-blue" />
                      <div>
                        <h3 className="font-medium">المصادقة الثنائية</h3>
                        <p className="text-sm text-unlimited-gray">
                          {is2FAEnabled 
                            ? "المصادقة الثنائية مفعلة، سيتم إرسال رمز تحقق عند تسجيل الدخول" 
                            : "قم بتفعيل المصادقة الثنائية لتعزيز أمان حسابك"
                          }
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant={is2FAEnabled ? "outline" : "unlimited"} 
                      onClick={toggle2FA}
                      disabled={isLoading}
                    >
                      {is2FAEnabled ? "تعطيل" : "تفعيل"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-start gap-4">
                      <Key className="h-6 w-6 mt-1 text-unlimited-blue" />
                      <div>
                        <h3 className="font-medium">تغيير كلمة المرور</h3>
                        <p className="text-sm text-unlimited-gray">
                          قم بتغيير كلمة المرور الخاصة بحسابك
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      تغيير
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>سجل تسجيل الدخول</CardTitle>
                <CardDescription>
                  اطّلع على آخر نشاطات تسجيل الدخول إلى حسابك
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Button variant="link" className="px-0">
                  عرض سجل تسجيل الدخول الكامل
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accounts">
            <AccountManagement />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
