
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/RealAuthProvider';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, User } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const TestAuth = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testPassword, setTestPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signOut, user, userRole, loading } = useAuth();
  const { toast } = useToast();

  const demoAccounts = [
    {
      email: 'admin@demo.com',
      password: 'Demo123!',
      role: 'admin',
      name: 'مدير النظام',
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      email: 'student1@demo.com',
      password: 'Demo123!',
      role: 'student',
      name: 'طالب تجريبي',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      email: 'agent1@demo.com',
      password: 'Demo123!',
      role: 'agent',
      name: 'وكيل تجريبي',
      icon: Users,
      color: 'bg-green-500'
    }
  ];

  const handleQuickLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بك ${email}`,
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || !testPassword) return;

    setIsLoading(true);
    try {
      await signIn(testEmail, testPassword);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بك ${testEmail}`,
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "شكراً لاستخدام النظام",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue mx-auto mb-4"></div>
            <p>جاري التحقق من حالة المصادقة...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">اختبار نظام المصادقة</h1>
            <p className="text-gray-600">اختبر تسجيل الدخول باستخدام الحسابات التجريبية</p>
          </div>

          {user ? (
            // User is logged in
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">تم تسجيل الدخول بنجاح</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
                    <p><strong>الدور:</strong> <Badge>{userRole}</Badge></p>
                    <p><strong>معرف المستخدم:</strong> {user.id}</p>
                    <Button onClick={handleSignOut} variant="outline">
                      تسجيل الخروج
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // User is not logged in
            <div className="space-y-8">
              {/* Demo Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle>الحسابات التجريبية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {demoAccounts.map((account, index) => {
                      const Icon = account.icon;
                      return (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`${account.color} text-white p-2 rounded-lg`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{account.name}</h3>
                              <Badge variant="outline">{account.role}</Badge>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>البريد:</strong> {account.email}</p>
                            <p><strong>كلمة المرور:</strong> {account.password}</p>
                          </div>
                          <Button 
                            onClick={() => handleQuickLogin(account.email, account.password)}
                            disabled={isLoading}
                            className="w-full"
                            size="sm"
                          >
                            تسجيل دخول سريع
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Manual Login */}
              <Card>
                <CardHeader>
                  <CardTitle>تسجيل دخول يدوي</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleManualLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="أدخل البريد الإلكتروني"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Input
                        id="password"
                        type="password"
                        value={testPassword}
                        onChange={(e) => setTestPassword(e.target.value)}
                        placeholder="أدخل كلمة المرور"
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TestAuth;
