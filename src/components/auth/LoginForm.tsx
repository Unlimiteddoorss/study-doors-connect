
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      console.log("Login successful:", result);
      
      // Role-based redirection is handled in useAuth hook
      // But we can add additional handling here if needed
      const userRole = localStorage.getItem('userRole');
      console.log("User role after login:", userRole);
      
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'agent') {
        navigate('/agent');
      } else {
        navigate('/dashboard/applications');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Error handling is already in the useAuth hook
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
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">كلمة المرور</Label>
          <Link 
            to="/forgot-password" 
            className="text-sm text-unlimited-blue hover:underline"
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
          />
          <button
            type="button"
            onClick={toggleShowPassword}
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
        disabled={isLoading}
      >
        {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
      </Button>
      
      <p className="text-center text-unlimited-gray text-sm">
        ليس لديك حساب؟{' '}
        <Link 
          to="/register" 
          className="text-unlimited-blue hover:underline font-medium"
        >
          إنشاء حساب جديد
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
