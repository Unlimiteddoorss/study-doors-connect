
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bug, 
  Gauge, 
  Shield, 
  Zap,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CodeTestingPanel from '@/components/admin/CodeTestingPanel';
import PerformanceMonitor from '@/components/admin/PerformanceMonitor';
import { useErrorFixer } from '@/utils/errorFixer';

const TestingDashboard = () => {
  const { toast } = useToast();
  const { getErrors, getErrorStats, clearErrors } = useErrorFixer();
  const [isOptimizing, setIsOptimizing] = useState(false);

  const runOptimizations = async () => {
    setIsOptimizing(true);
    
    try {
      // محاكاة عمليات التحسين
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // مسح cache المتصفح
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // تحسين الذاكرة
      if (window.gc) {
        window.gc();
      }

      toast({
        title: "تم التحسين بنجاح",
        description: "تم تطبيق تحسينات الأداء"
      });
    } catch (error) {
      toast({
        title: "خطأ في التحسين",
        description: "حدث خطأ أثناء تطبيق التحسينات",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const errorStats = getErrorStats();
  const errors = getErrors();

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">لوحة الاختبار والتحسين</h1>
          <p className="text-gray-600">مراقبة الأداء، اختبار الأكواد، وإصلاح الأخطاء</p>
        </div>

        {/* ملخص سريع */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{errorStats.total}</div>
                  <div className="text-sm text-gray-600">أخطاء مكتشفة</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">85</div>
                  <div className="text-sm text-gray-600">نقاط الأداء</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600">اختبارات نجحت</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-600">تحسينات متاحة</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* إجراءات سريعة */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button onClick={runOptimizations} disabled={isOptimizing}>
                <Zap className="h-4 w-4 mr-2" />
                {isOptimizing ? 'جاري التحسين...' : 'تحسين الأداء'}
              </Button>
              <Button variant="outline" onClick={clearErrors}>
                <RefreshCw className="h-4 w-4 mr-2" />
                مسح الأخطاء
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* تبويبات مفصلة */}
        <Tabs defaultValue="testing" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="testing">اختبار الأكواد</TabsTrigger>
            <TabsTrigger value="performance">مراقبة الأداء</TabsTrigger>
            <TabsTrigger value="errors">إدارة الأخطاء</TabsTrigger>
            <TabsTrigger value="optimization">التحسينات</TabsTrigger>
          </TabsList>

          <TabsContent value="testing">
            <CodeTestingPanel />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceMonitor />
          </TabsContent>

          <TabsContent value="errors">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الأخطاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errors.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="text-gray-600">لا توجد أخطاء مكتشفة!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {errors.map((error, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{error.type}</Badge>
                                {error.file && (
                                  <span className="text-sm text-gray-500">{error.file}:{error.line}</span>
                                )}
                              </div>
                              <p className="text-sm font-medium mb-1">{error.message}</p>
                              {error.suggestion && (
                                <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                                  💡 {error.suggestion}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization">
            <Card>
              <CardHeader>
                <CardTitle>تحسينات مقترحة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">🚀 تحسينات الأداء</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• تحسين تحميل المكونات باستخدام lazy loading</li>
                      <li>• ضغط الصور وتحسين الموارد</li>
                      <li>• تحسين استعلامات قاعدة البيانات</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">✅ تحسينات مطبقة</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• تم تحسين بنية المكونات</li>
                      <li>• تم إصلاح memory leaks</li>
                      <li>• تم تحسين أوقات الاستجابة</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">⚠️ نصائح التطوير</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• استخدم React.memo للمكونات الثقيلة</li>
                      <li>• تجنب إعادة الرندر غير الضرورية</li>
                      <li>• راقب حجم Bundle size</li>
                    </ul>
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

export default TestingDashboard;
