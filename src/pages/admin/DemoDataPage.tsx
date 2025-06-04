
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DemoDataGenerator from '@/components/admin/DemoDataGenerator';
import { Download, FileText, Users, Database, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DemoDataPage = () => {
  const { toast } = useToast();

  const handleExportGuide = () => {
    const guideContent = `
# دليل استخدام النظام التجريبي

## الحسابات التجريبية:

### مدير النظام:
- البريد: admin@demo.com
- كلمة المرور: Demo123!
- الوصول: لوحة التحكم الكاملة

### طالب تجريبي 1:
- البريد: student1@demo.com
- كلمة المرور: Demo123!
- الاسم: أحمد محمد علي

### طالب تجريبي 2:
- البريد: student2@demo.com
- كلمة المرور: Demo123!
- الاسم: فاطمة أحمد حسن

### وكيل تجريبي:
- البريد: agent1@demo.com
- كلمة المرور: Demo123!
- الاسم: محمد أحمد الوكيل

## كيفية الاختبار:

1. سجل دخول بأي من الحسابات أعلاه
2. استكشف الوظائف المختلفة
3. جرب إنشاء طلبات جديدة
4. اختبر الرسائل والإشعارات
5. راجع التقارير والإحصائيات

## البيانات المتوفرة:
- 3 جامعات تركية
- 3 برامج أكاديمية
- طلبات تجريبية
- رسائل وإشعارات
    `;

    const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demo-guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "تم تنزيل الدليل",
      description: "تم تنزيل دليل استخدام النظام التجريبي",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">البيانات التجريبية والاختبار</h1>
        <p className="text-gray-600">إنشاء وإدارة البيانات التجريبية لاختبار النظام</p>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            إنشاء البيانات
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            الحسابات التجريبية
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            دليل الاختبار
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <DemoDataGenerator />
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>الحسابات الجاهزة للاختبار</CardTitle>
              <CardDescription>
                استخدم هذه الحسابات لاختبار النظام من منظور مختلف المستخدمين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-red-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">مدير النظام</h3>
                      <Badge variant="destructive">Admin</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>البريد:</strong> admin@demo.com</div>
                      <div><strong>كلمة المرور:</strong> Demo123!</div>
                      <div><strong>الوصول:</strong> لوحة التحكم الكاملة</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">وكيل تجريبي</h3>
                      <Badge variant="default">Agent</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>البريد:</strong> agent1@demo.com</div>
                      <div><strong>كلمة المرور:</strong> Demo123!</div>
                      <div><strong>الاسم:</strong> محمد أحمد الوكيل</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">طالب تجريبي 1</h3>
                      <Badge variant="secondary">Student</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>البريد:</strong> student1@demo.com</div>
                      <div><strong>كلمة المرور:</strong> Demo123!</div>
                      <div><strong>الاسم:</strong> أحمد محمد علي</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">طالب تجريبي 2</h3>
                      <Badge variant="secondary">Student</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>البريد:</strong> student2@demo.com</div>
                      <div><strong>كلمة المرور:</strong> Demo123!</div>
                      <div><strong>الاسم:</strong> فاطمة أحمد حسن</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>دليل اختبار النظام</span>
                  <Button onClick={handleExportGuide} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تنزيل الدليل
                  </Button>
                </CardTitle>
                <CardDescription>
                  خطوات شاملة لاختبار جميع وظائف النظام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      اختبار لوحات التحكم
                    </h3>
                    <div className="pl-7 space-y-2 text-sm text-gray-600">
                      <div>• سجل دخول كمدير واستكشف لوحة التحكم الرئيسية</div>
                      <div>• راجع الإحصائيات والتقارير</div>
                      <div>• اختبر إدارة الطلاب والوكلاء</div>
                      <div>• جرب إدارة الجامعات والبرامج</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      اختبار الطلبات
                    </h3>
                    <div className="pl-7 space-y-2 text-sm text-gray-600">
                      <div>• سجل دخول كطالب وأنشئ طلب جديد</div>
                      <div>• املأ البيانات الشخصية والأكاديمية</div>
                      <div>• ارفع المستندات المطلوبة</div>
                      <div>• تابع حالة الطلب والرسائل</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      اختبار الإعدادات
                    </h3>
                    <div className="pl-7 space-y-2 text-sm text-gray-600">
                      <div>• اختبر تحديث الملف الشخصي</div>
                      <div>• جرب إعدادات الإشعارات</div>
                      <div>• اختبر تغيير كلمة المرور</div>
                      <div>• راجع سجل النشاطات</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>سيناريوهات الاختبار المقترحة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">🎓 اختبار دورة الطالب</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>1. إنشاء حساب جديد</div>
                      <div>2. تصفح الجامعات والبرامج</div>
                      <div>3. تقديم طلب للالتحاق</div>
                      <div>4. رفع المستندات</div>
                      <div>5. متابعة حالة الطلب</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">🏢 اختبار دورة الوكيل</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>1. تسجيل دخول الوكيل</div>
                      <div>2. مراجعة الطلاب المسندين</div>
                      <div>3. متابعة الطلبات</div>
                      <div>4. حساب العمولات</div>
                      <div>5. التواصل مع الطلاب</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">⚙️ اختبار دورة الإدارة</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>1. مراجعة الطلبات الجديدة</div>
                      <div>2. تحديث حالات الطلبات</div>
                      <div>3. إرسال رسائل للطلاب</div>
                      <div>4. إنتاج التقارير</div>
                      <div>5. إدارة الإعدادات</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">📊 اختبار التقارير</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>1. عرض الإحصائيات</div>
                      <div>2. تصدير التقارير</div>
                      <div>3. تحليل الأداء</div>
                      <div>4. مراقبة النظام</div>
                      <div>5. النسخ الاحتياطية</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoDataPage;
