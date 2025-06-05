
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Users, ShieldCheck, Database } from 'lucide-react';

const SystemStatus = () => {
  const systemChecks = [
    {
      name: 'نظام المصادقة',
      status: 'working',
      description: 'Supabase Auth مع تأكيد البريد الإلكتروني',
      icon: ShieldCheck
    },
    {
      name: 'الأدوار والصلاحيات',
      status: 'working',
      description: 'إدارة أدوار المستخدمين (أدمن، طالب، وكيل)',
      icon: Users
    },
    {
      name: 'قاعدة البيانات',
      status: 'working',
      description: 'جداول Supabase وإعدادات RLS',
      icon: Database
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'working':
        return <Badge variant="default" className="bg-green-500">يعمل</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">تحذير</Badge>;
      case 'error':
        return <Badge variant="destructive">خطأ</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            حالة النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemChecks.map((check, index) => {
              const Icon = check.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium">{check.name}</h4>
                      <p className="text-sm text-gray-600">{check.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    {getStatusBadge(check.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إرشادات الاستخدام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-green-700">✅ ما يعمل الآن:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>تسجيل حسابات جديدة مع تأكيد البريد الإلكتروني</li>
              <li>تسجيل الدخول باستخدام الحسابات التجريبية</li>
              <li>نظام الأدوار والصلاحيات</li>
              <li>حماية الصفحات حسب نوع المستخدم</li>
              <li>إنشاء البيانات التجريبية</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-blue-700">📋 الحسابات التجريبية:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p><strong>أدمن:</strong> admin@demo.com</p>
                <p><strong>كلمة المرور:</strong> Demo123!</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p><strong>طالب:</strong> student1@demo.com</p>
                <p><strong>كلمة المرور:</strong> Demo123!</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p><strong>وكيل:</strong> agent1@demo.com</p>
                <p><strong>كلمة المرور:</strong> Demo123!</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-orange-700">⚠️ ملاحظات مهمة:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>عند إنشاء حساب جديد، ستحتاج لتأكيد البريد الإلكتروني</li>
              <li>تحقق من مجلد الرسائل غير المرغوب فيها</li>
              <li>يمكنك استخدام الحسابات التجريبية للدخول المباشر</li>
              <li>كل دور له صفحات وصلاحيات مختلفة</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatus;
