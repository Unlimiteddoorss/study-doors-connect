
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell, 
  Mail,
  Bug,
  Users,
  FileText
} from 'lucide-react';
import CodeTestingPanel from '@/components/admin/CodeTestingPanel';

const SystemSettings = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-unlimited-dark-blue">
            إعدادات النظام
          </h1>
          <p className="text-unlimited-gray mt-2">
            إدارة إعدادات النظام العامة وفحص حالة الأكواد
          </p>
        </div>

        <Tabs defaultValue="testing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="testing">فحص الأكواد</TabsTrigger>
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="database">قاعدة البيانات</TabsTrigger>
            <TabsTrigger value="security">الأمان</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
            <TabsTrigger value="backup">النسخ الاحتياطي</TabsTrigger>
          </TabsList>

          <TabsContent value="testing" className="space-y-6">
            <CodeTestingPanel />
          </TabsContent>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-unlimited-blue" />
                  الإعدادات العامة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">اسم النظام</h4>
                      <p className="text-sm text-gray-600">Unlimited Edu Platform</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">إصدار النظام</h4>
                      <p className="text-sm text-gray-600">v2.1.0</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">اللغة الافتراضية</h4>
                      <p className="text-sm text-gray-600">العربية</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">المنطقة الزمنية</h4>
                      <p className="text-sm text-gray-600">Asia/Riyadh</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-unlimited-blue" />
                  إعدادات قاعدة البيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">حالة الاتصال</h4>
                      <p className="text-sm text-green-600">متصل ✓</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">نوع قاعدة البيانات</h4>
                      <p className="text-sm text-gray-600">PostgreSQL</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">عدد الجداول</h4>
                      <p className="text-sm text-gray-600">12 جدول</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">آخر نسخة احتياطية</h4>
                      <p className="text-sm text-gray-600">اليوم 03:00 ص</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-unlimited-blue" />
                  إعدادات الأمان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">المصادقة الثنائية</h4>
                      <p className="text-sm text-green-600">مفعلة ✓</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">تشفير البيانات</h4>
                      <p className="text-sm text-green-600">مفعل ✓</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">انتهاء الجلسة</h4>
                      <p className="text-sm text-gray-600">24 ساعة</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">سجلات التدقيق</h4>
                      <p className="text-sm text-green-600">مفعلة ✓</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-unlimited-blue" />
                  إعدادات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">الإشعارات الفورية</h4>
                      <p className="text-sm text-green-600">مفعلة ✓</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">إشعارات البريد</h4>
                      <p className="text-sm text-green-600">مفعلة ✓</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">إشعارات SMS</h4>
                      <p className="text-sm text-yellow-600">معطلة</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">تكرار الإشعارات</h4>
                      <p className="text-sm text-gray-600">فوري</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-unlimited-blue" />
                  النسخ الاحتياطي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">النسخ التلقائي</h4>
                      <p className="text-sm text-green-600">مفعل - يومياً ✓</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">مكان التخزين</h4>
                      <p className="text-sm text-gray-600">السحابة</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">عدد النسخ المحفوظة</h4>
                      <p className="text-sm text-gray-600">30 نسخة</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">حجم آخر نسخة</h4>
                      <p className="text-sm text-gray-600">2.8 GB</p>
                    </div>
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
