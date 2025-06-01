
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, Mail, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { registerSchema } from '@/utils/validation';
import { z } from 'zod';

const SecureRegisterForm = () => {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
    if (errors.agreeTerms) {
      setErrors((prev) => ({ ...prev, agreeTerms: '' }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      // Validate input
      registerSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.userType,
      });
      
      if (!error) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
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
            className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
            required
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-red-600">{errors.fullName}</p>
        )}
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
            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
            required
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
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
            className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
            required
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="userType">نوع المستخدم</Label>
        <Select 
          value={formData.userType} 
          onValueChange={(value) => handleSelectChange('userType', value)}
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
            className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
            required
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
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
            className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            required
          />
          <Button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>
      
      <div className="flex items-start space-x-2 rtl:space-x-reverse">
        <Checkbox 
          id="terms" 
          checked={formData.agreeTerms} 
          onCheckedChange={handleCheckboxChange} 
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
      {errors.agreeTerms && (
        <p className="text-sm text-red-600">{errors.agreeTerms}</p>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-unlimited-blue hover:bg-unlimited-blue/90" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري إنشاء الحساب...
          </>
        ) : (
          'إنشاء حساب'
        )}
      </Button>
      
      <p className="text-center text-unlimited-gray text-sm">
        لديك حساب بالفعل؟{' '}
        <Link 
          to="/login" 
          className="text-unlimited-blue hover:underline font-medium"
        >
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
};

export default SecureRegisterForm;
