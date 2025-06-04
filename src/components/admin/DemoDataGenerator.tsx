
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database, Users, FileText, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { demoDataService, demoAccounts } from '@/services/demoDataService';

const DemoDataGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerateDemoData = async () => {
    setIsGenerating(true);
    try {
      const result = await demoDataService.initializeDemoData();
      
      setGenerationStatus(result);
      
      if (result.success) {
        toast({
          title: "تم إنشاء البيانات التجريبية",
          description: result.message,
        });
      } else {
        toast({
          title: "خطأ في إنشاء البيانات",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Demo data generation error:', error);
      toast({
        title: "خطأ في النظام",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid gap-6">
      {/* بطاقة إنشاء البيانات التجريبية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            إنشاء البيانات التجريبية
          </CardTitle>
          <CardDescription>
            إنشاء بيانات تجريبية شاملة للنظام تشمل الجامعات، البرامج، الطلبات، والرسائل
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleGenerateDemoData}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري إنشاء البيانات...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                إنشاء البيانات التجريبية
              </>
            )}
          </Button>

          {generationStatus && (
            <div className="mt-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {generationStatus.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">
                  {generationStatus.success ? 'تم بنجاح' : 'فشل'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{generationStatus.message}</p>
              
              {generationStatus.details && (
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(generationStatus.details).map(([key, value]) => (
                    <Badge 
                      key={key} 
                      variant={value ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {key}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* بطاقة الحسابات التجريبية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            الحسابات التجريبية
          </CardTitle>
          <CardDescription>
            حسابات جاهزة للاختبار - يمكن استخدامها لتسجيل الدخول واختبار الوظائف
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {demoAccounts.map((account, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{account.profile.full_name}</h4>
                  <Badge variant={
                    account.role === 'admin' ? 'destructive' : 
                    account.role === 'agent' ? 'default' : 'secondary'
                  }>
                    {account.role}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>البريد:</strong> {account.email}</div>
                  <div><strong>كلمة المرور:</strong> {account.password}</div>
                  <div><strong>الهاتف:</strong> {account.profile.phone}</div>
                  <div><strong>البلد:</strong> {account.profile.country}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* بطاقة معلومات البيانات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            محتويات البيانات التجريبية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">الجامعات:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• جامعة إسطنبول التقنية</li>
                <li>• جامعة بيلكنت</li>
                <li>• جامعة الشرق الأوسط التقنية</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">البرامج:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• هندسة الحاسوب</li>
                <li>• علوم الحاسوب</li>
                <li>• الهندسة الكهربائية</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">الطلبات:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• طلبات للطلاب التجريبيين</li>
                <li>• حالات مختلفة للطلبات</li>
                <li>• رسائل تواصل</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">الإعدادات:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• إعدادات العمولات</li>
                <li>• إعدادات الإشعارات</li>
                <li>• إعدادات الملفات</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoDataGenerator;
