
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';

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
  
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any registration will succeed
      toast({
        title: 'تم إنشاء الحساب بنجاح',
        description: 'مرحباً بك في منصة أبواب غير محدودة',
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">الاسم الكامل</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="أدخل اسمك الكامل"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">رقم الهاتف</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="أدخل رقم هاتفك"
          value={formData.phone}
          onChange={handleChange}
          required
        />
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
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
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
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="أعد إدخال كلمة المرور"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
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
      
      <Button 
        type="submit" 
        className="w-full bg-unlimited-blue hover:bg-unlimited-blue/90" 
        disabled={isLoading}
      >
        {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
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

export default RegisterForm;
