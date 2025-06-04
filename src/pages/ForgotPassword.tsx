
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import MainLayout from '@/components/layout/MainLayout';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';

interface ForgotPasswordFormValues {
  email: string;
  verificationCode?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'verification' | 'newPassword'>('email');
  const { toast } = useToast();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ForgotPasswordFormValues>();
  
  const onSubmitEmail = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      await resetPassword(data.email);
      toast({
        title: "تم إرسال الرابط",
        description: "تحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور",
      });
      
      // في التطبيق الحقيقي، سيتم إعادة توجيه المستخدم لصفحة التأكيد
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error sending reset email:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ في إرسال رابط إعادة التعيين",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmitVerification = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      // محاكاة التحقق من الكود
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم التحقق من الكود",
        description: "يمكنك الآن إدخال كلمة المرور الجديدة",
      });
      
      setStep('newPassword');
    } catch (error) {
      console.error('Error verifying code:', error);
      toast({
        title: "خطأ في التحقق",
        description: "الكود المدخل غير صحيح",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmitNewPassword = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('كلمات المرور غير متطابقة');
      }

      // محاكاة إعادة تعيين كلمة المرور
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تغيير كلمة المرور بنجاح، سيتم توجيهك لصفحة تسجيل الدخول",
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast({
        title: "خطأ في التغيير",
        description: error.message || "حدث خطأ في تغيير كلمة المرور",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (value: string) => {
    setValue('verificationCode', value);
  };

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <form onSubmit={handleSubmit(onSubmitEmail)}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="pl-10"
                    {...register('email', {
                      required: 'البريد الإلكتروني مطلوب',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'البريد الإلكتروني غير صالح',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  'إرسال رابط إعادة التعيين'
                )}
              </Button>
            </CardFooter>
          </form>
        );
        
      case 'verification':
        return (
          <form onSubmit={handleSubmit(onSubmitVerification)}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2 text-center">
                <p className="text-gray-600">
                  تم إرسال الكود إلى <strong>{watch('email')}</strong>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="verification-code">كود التحقق</Label>
                <div className="flex justify-center py-2">
                  <InputOTP
                    maxLength={6}
                    value=""
                    onChange={handleOTPChange}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} index={index} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
                
                <div className="text-center">
                  <Button variant="link" type="button" className="text-unlimited-blue">
                    إعادة إرسال الكود
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري التحقق...
                  </>
                ) : (
                  'تحقق من الكود'
                )}
              </Button>
              <Button 
                variant="ghost" 
                type="button" 
                className="w-full" 
                onClick={() => setStep('email')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة للبريد الإلكتروني
              </Button>
            </CardFooter>
          </form>
        );
        
      case 'newPassword':
        return (
          <form onSubmit={handleSubmit(onSubmitNewPassword)}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="أدخل كلمة المرور الجديدة"
                  {...register('newPassword', {
                    required: 'كلمة المرور مطلوبة',
                    minLength: {
                      value: 6,
                      message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
                    }
                  })}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور"
                  {...register('confirmPassword', {
                    required: 'تأكيد كلمة المرور مطلوب'
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري التغيير...
                  </>
                ) : (
                  'تغيير كلمة المرور'
                )}
              </Button>
            </CardFooter>
          </form>
        );
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[800px] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-md">
            <CardHeader>
              <CardTitle>إعادة تعيين كلمة المرور</CardTitle>
              <CardDescription>
                أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور
              </CardDescription>
            </CardHeader>
            {renderStep()}
            <CardFooter className="flex flex-col pt-0">
              <p className="text-sm text-center mt-4">
                تذكرت كلمة المرور؟{' '}
                <Link to="/login" className="text-unlimited-blue hover:underline">
                  العودة لتسجيل الدخول
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
