
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, Mail, Phone, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/auth/RealAuthProvider';
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
    country: '',
    city: '',
    agreeTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
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
      await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.userType,
        country: formData.country,
        city: formData.city,
      });
      
      // Show success message instead of redirecting immediately
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            تم إنشاء حسابك بنجاح! تحقق من بريدك الإلكتروني للحصول على رابط التأكيد.
            بعد النقر على الرابط، ستتمكن من تسجيل الدخول إلى حسابك.
          </AlertDescription>
        </Alert>
        
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            لم تستلم الرسالة؟ تحقق من مجلد الرسائل غير المرغوب فيها.
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full"
          >
            العودة إلى تسجيل الدخول
          </Button>
        </div>
      </div>
    );
  }

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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">البلد</Label>
          <Input
            id="country"
            name="country"
            placeholder="أدخل بلدك"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">المدينة</Label>
          <Input
            id="city"
            name="city"
            placeholder="أدخل مدينتك"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
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
