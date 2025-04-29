
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Database, Key } from "lucide-react";
import { hasValidSupabaseCredentials } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const SupabaseSetupGuide = () => {
  const [hasCredentials, setHasCredentials] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    setHasCredentials(hasValidSupabaseCredentials());
  }, []);

  if (hasCredentials) {
    return null; // لا تعرض الدليل إذا كانت بيانات الاعتماد موجودة
  }

  return (
    <Card className="mb-8 border-yellow-200 bg-yellow-50">
      <CardHeader className="text-yellow-800">
        <CardTitle>{t("supabase.setup.title", "إعداد Supabase مطلوب")}</CardTitle>
        <CardDescription className="text-yellow-700">
          {t("supabase.setup.description", "لاستخدام جميع ميزات التطبيق، يجب تكوين Supabase للمصادقة وتخزين البيانات")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="bg-white border-yellow-300">
          <Database className="h-4 w-4 text-yellow-800" />
          <AlertTitle className="text-yellow-800">
            {t("supabase.setup.missingCredentials", "بيانات اعتماد Supabase غير مكتملة")}
          </AlertTitle>
          <AlertDescription className="text-yellow-700">
            {t("supabase.setup.followSteps", "اتبع الخطوات أدناه لإكمال إعداد Supabase:")}
          </AlertDescription>
        </Alert>
        
        <div className="mt-4 space-y-4">
          <div className="flex gap-4 p-4 border rounded-md bg-white">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
              1
            </div>
            <div>
              <h3 className="font-medium">{t("supabase.setup.step1", "إنشاء حساب Supabase")}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {t("supabase.setup.step1Description", "قم بالتسجيل أو تسجيل الدخول إلى Supabase وإنشاء مشروع جديد")}
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://app.supabase.com/sign-up" target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center">
                  <ExternalLink className="h-4 w-4" />
                  {t("supabase.setup.visitSupabase", "زيارة Supabase")}
                </a>
              </Button>
            </div>
          </div>

          <div className="flex gap-4 p-4 border rounded-md bg-white">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
              2
            </div>
            <div>
              <h3 className="font-medium">{t("supabase.setup.step2", "نسخ بيانات الاتصال")}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {t("supabase.setup.step2Description", "من لوحة تحكم مشروعك، انتقل إلى الإعدادات > API لنسخ عنوان URL ومفتاح API")}
              </p>
              <div className="p-3 bg-gray-50 rounded-md border border-dashed text-sm font-mono mb-2">
                <div className="flex items-center mb-2">
                  <Key className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-800">VITE_SUPABASE_URL</span>
                </div>
                <div className="flex items-center">
                  <Key className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-800">VITE_SUPABASE_ANON_KEY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 p-4 border rounded-md bg-white">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
              3
            </div>
            <div>
              <h3 className="font-medium">{t("supabase.setup.step3", "تحديث ملف Supabase")}</h3>
              <p className="text-sm text-gray-600">
                {t("supabase.setup.step3Description", "قم بتعديل ملف src/lib/supabase.ts واستبدل القيم الافتراضية ببيانات الاعتماد الخاصة بك")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-yellow-100/50 flex flex-col items-start pt-4 gap-2">
        <p className="text-sm text-yellow-800">
          {t("supabase.setup.tip", "نصيحة: يمكنك أيضًا ضبط المتغيرات البيئية في ملف .env.local أو عند نشر التطبيق")}
        </p>
        <Button variant="default" size="sm" asChild className="bg-yellow-600 hover:bg-yellow-700">
          <a href="https://docs.lovable.dev/integrations/supabase/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            {t("supabase.setup.readDocs", "قراءة وثائق تكامل Supabase")}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
