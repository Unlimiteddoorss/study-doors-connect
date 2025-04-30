
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, Mail, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { hasValidSupabaseCredentials } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    agreeTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [supabaseConfigured] = useState(hasValidSupabaseCredentials());
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Contains number or special char
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    
    return strength;
  };
  
  const passwordStrength = calculatePasswordStrength(formData.password);
  
  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'ضعيفة';
    if (passwordStrength <= 50) return 'متوسطة';
    if (passwordStrength <= 75) return 'جيدة';
    return 'قوية';
  };
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-unlimited-danger';
    if (passwordStrength <= 50) return 'bg-yellow-500';
    if (passwordStrength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'خطأ',
        description: 'كلمات المرور غير متطابقة',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: 'خطأ',
        description: 'يرجى الموافقة على الشروط والأحكام',
        variant: 'destructive',
      });
      return;
    }
    
    if (passwordStrength < 50) {
      toast({
        title: 'كلمة مرور ضعيفة',
        description: 'الرجاء اختيار كلمة مرور أقوى',
        variant: 'destructive',
      });
      return;
    }

    if (!supabaseConfigured) {
      toast({
        title: 'خطأ',
        description: 'يجب تكوين Supabase قبل التسجيل',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use the signUp method from useAuth instead of directly using Supabase
      await signUp(formData.email, formData.password, formData.userType as 'student' | 'admin' | 'agent');
      
      toast({
        title: 'تم إنشاء الحساب بنجاح',
        description: 'مرحباً بك في منصة أبواب غير محدودة',
      });
      
      // Navigate to login after successful registration
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: 'فشل في إنشاء الحساب',
        description: error.message || 'حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">الاسم الكامل</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            id="fullName"
            name="fullName"
            placeholder="أدخل اسمك الكامل"
            value={formData.fullName}
            onChange={handleChange}
            className="pl-10"
            required
            disabled={!supabaseConfigured}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            required
            disabled={!supabaseConfigured}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">رقم الهاتف</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            id="phone"
            name="phone"
            placeholder="أدخل رقم هاتفك"
            value={formData.phone}
            onChange={handleChange}
            className="pl-10"
            required
            disabled={!supabaseConfigured}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="userType">نوع المستخدم</Label>
        <Select 
          value={formData.userType} 
          onValueChange={(value) => handleSelectChange('userType', value)}
          disabled={!supabaseConfigured}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع المستخدم" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">طالب</SelectItem>
            <SelectItem value="agent">وكيل</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <div className="relative">
          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            className="pl-10"
            required
            disabled={!supabaseConfigured}
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            disabled={!supabaseConfigured}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Password strength indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex justify-between mb-1 text-sm">
              <span>قوة كلمة المرور: {getPasswordStrengthText()}</span>
              <span>{passwordStrength}%</span>
            </div>
            <Progress 
              value={passwordStrength} 
              className={`h-1 ${getPasswordStrengthColor()}`} 
            />
            <ul className="text-xs text-unlimited-gray mt-2 list-disc list-inside">
              <li className={passwordStrength > 25 ? "text-unlimited-blue" : ""}>
                على الأقل 8 أحرف
              </li>
              <li className={/[a-z]/.test(formData.password) ? "text-unlimited-blue" : ""}>
                تحتوي على حرف صغير
              </li>
              <li className={/[A-Z]/.test(formData.password) ? "text-unlimited-blue" : ""}>
                تحتوي على حرف كبير
              </li>
              <li className={/[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "text-unlimited-blue" : ""}>
                تحتوي على رقم أو رمز
              </li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
        <div className="relative">
          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="أعد إدخال كلمة المرور"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="pl-10"
            required
            disabled={!supabaseConfigured}
          />
          <Button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            disabled={!supabaseConfigured}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-sm text-unlimited-danger">كلمات المرور غير متطابقة</p>
        )}
      </div>
      
      <div className="flex items-start space-x-2 rtl:space-x-reverse">
        <Checkbox 
          id="terms" 
          checked={formData.agreeTerms} 
          onCheckedChange={handleCheckboxChange}
          disabled={!supabaseConfigured}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            أوافق على{' '}
            <Link to="/terms" className="text-unlimited-blue hover:underline">
              الشروط والأحكام
            </Link>{' '}
            و{' '}
            <Link to="/privacy" className="text-unlimited-blue hover:underline">
              سياسة الخصوصية
            </Link>
          </label>
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
            <span>جاري إنشاء الحساب...</span>
          </div>
        ) : (
          'إنشاء حساب'
        )}
      </Button>
      
      <p className="text-center text-unlimited-gray text-sm">
        لديك حساب بالفعل؟{' '}
        <Link 
          to="/login" 
          className={`text-unlimited-blue hover:underline font-medium ${!supabaseConfigured ? 'pointer-events-none opacity-50' : ''}`}
        >
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
