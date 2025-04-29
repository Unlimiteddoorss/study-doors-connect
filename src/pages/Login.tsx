
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  useEffect(() => {
    // التحقق من تكوين Supabase
    setSupabaseConfigured(hasValidSupabaseCredentials());
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabaseConfigured) {
      toast({
        title: t("supabase.setup.required", "إعداد Supabase مطلوب"),
        description: t("supabase.setup.configureFirst", "يجب تكوين Supabase قبل تسجيل الدخول"),
        variant: "destructive"
      });
      return;
    }
    
    if (!email || !password) {
      toast({
        title: t("login.error", "خطأ"),
        description: t("login.emptyFields", "الرجاء إدخال البريد الإلكتروني وكلمة المرور"),
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // إذا كان المستخدم مسجلاً بالفعل، فانتقل إلى لوحة المعلومات
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
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.email", "البريد الإلكتروني")}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="example@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!supabaseConfigured}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("login.password", "كلمة المرور")}</Label>
                  <Link to="/forgot-password" className={`text-sm text-unlimited-blue hover:underline ${!supabaseConfigured ? 'pointer-events-none opacity-50' : ''}`}>
                    {t("login.forgotPassword", "نسيت كلمة المرور؟")}
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={!supabaseConfigured}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                disabled={isLoading || !supabaseConfigured}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("login.loggingIn", "جاري تسجيل الدخول...")}
                  </>
                ) : (
                  t("login.loginButton", "تسجيل الدخول")
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-unlimited-gray">
                {t("login.noAccount", "ليس لديك حساب؟")}{" "}
                <Link to="/register" className={`text-unlimited-blue hover:underline ${!supabaseConfigured ? 'pointer-events-none opacity-50' : ''}`}>
                  {t("login.createAccount", "إنشاء حساب جديد")}
                </Link>
              </p>
            </div>
            
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
