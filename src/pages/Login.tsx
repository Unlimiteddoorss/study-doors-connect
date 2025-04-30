
import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { hasValidSupabaseCredentials } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from 'react-i18next';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);
  const { user } = useAuth();
  const { t } = useTranslation();
  
  useEffect(() => {
    // Check if Supabase is configured
    const isConfigured = hasValidSupabaseCredentials();
    setSupabaseConfigured(isConfigured);
    
    if (!isConfigured) {
      console.warn('Supabase is not properly configured. Login functionality will be disabled.');
    }
  }, []);
  
  // If the user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">
              {t("login.title", "تسجيل الدخول")}
            </h2>
            <p className="mt-2 text-unlimited-gray">
              {t("login.subtitle", "قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك")}
            </p>
          </div>
          
          {!supabaseConfigured && (
            <Alert className="mb-6 border-red-300 bg-red-50" variant="destructive">
              <ShieldAlert className="h-4 w-4 text-red-800" />
              <AlertTitle className="text-red-800">
                {t("supabase.setup.missing", "Supabase غير مُكوّن")}
              </AlertTitle>
              <AlertDescription className="text-red-700">
                {t("supabase.setup.loginDisabled", "تسجيل الدخول معطل حاليًا حتى يتم تكوين Supabase. الرجاء الرجوع إلى دليل التثبيت في الصفحة الرئيسية.")}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-white p-8 shadow-md rounded-lg">
            <LoginForm />
            
            {!supabaseConfigured && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  {t("supabase.setup.adminInstruction", "للمسؤولين: قم بإعداد Supabase باتباع التعليمات في الصفحة الرئيسية")}
                </p>
                <div className="mt-3 flex justify-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/">
                      {t("supabase.setup.goToDashboard", "الانتقال إلى الصفحة الرئيسية")}
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
