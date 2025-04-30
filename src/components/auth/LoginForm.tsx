
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { hasValidSupabaseCredentials } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [supabaseConfigured] = useState(hasValidSupabaseCredentials());
  
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabaseConfigured) {
      toast({
        title: "خطأ",
        description: "يجب تكوين Supabase قبل تسجيل الدخول",
        variant: "destructive",
      });
      return;
    }
    
    if (!email || !password) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      console.log("Login successful, redirecting...");
      // Role-based redirection handled in useAuth hook
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={!supabaseConfigured || isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">كلمة المرور</Label>
          <Link 
            to="/forgot-password" 
            className={`text-sm text-unlimited-blue hover:underline ${(!supabaseConfigured || isLoading) ? 'pointer-events-none opacity-50' : ''}`}
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!supabaseConfigured || isLoading}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            disabled={!supabaseConfigured || isLoading}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-unlimited-blue hover:bg-unlimited-blue/90" 
        disabled={isLoading || !supabaseConfigured}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>جاري تسجيل الدخول...</span>
          </div>
        ) : (
          'تسجيل الدخول'
        )}
      </Button>
      
      <p className="text-center text-unlimited-gray text-sm">
        ليس لديك حساب؟{' '}
        <Link 
          to="/register" 
          className={`text-unlimited-blue hover:underline font-medium ${!supabaseConfigured ? 'pointer-events-none opacity-50' : ''}`}
        >
          إنشاء حساب جديد
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
