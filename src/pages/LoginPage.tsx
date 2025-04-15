
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
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Logo from '@/components/shared/Logo';
import Footer from '@/components/layout/Footer';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    // محاكاة طلب API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // نجاح تسجيل الدخول
      toast({
        title: t('login.successTitle'),
        description: t('login.successMessage'),
      });
      
      // توجيه المستخدم حسب نوعه
      if (data.email.includes('admin')) {
        navigate('/admin');
      } else if (data.email.includes('agent')) {
        navigate('/agent/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('login.errorTitle'),
        description: t('login.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/">{t('nav.home')}</Link>
              </Button>
              <Button asChild>
                <Link to="/register">{t('auth.register')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="student">{t('login.studentTab')}</TabsTrigger>
              <TabsTrigger value="agent">{t('login.agentTab')}</TabsTrigger>
              <TabsTrigger value="admin">{t('login.adminTab')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <LoginForm 
                role="student"
                onSubmit={onSubmit}
                isLoading={isLoading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </TabsContent>
            
            <TabsContent value="agent">
              <LoginForm 
                role="agent"
                onSubmit={onSubmit}
                isLoading={isLoading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </TabsContent>
            
            <TabsContent value="admin">
              <LoginForm 
                role="admin"
                onSubmit={onSubmit}
                isLoading={isLoading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface LoginFormProps {
  role: 'student' | 'agent' | 'admin';
  onSubmit: (data: LoginFormValues) => void;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  register: any;
  errors: any;
  handleSubmit: any;
}

const LoginForm = ({ 
  role, 
  onSubmit, 
  isLoading, 
  showPassword, 
  setShowPassword, 
  register, 
  errors, 
  handleSubmit 
}: LoginFormProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>{t(`login.${role}Title`)}</CardTitle>
        <CardDescription>{t(`login.${role}Description`)}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${role}-email`}>{t('login.emailLabel')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
              <Input
                id={`${role}-email`}
                type="email"
                placeholder={t('login.emailPlaceholder')}
                className="pl-10"
                {...register('email', {
                  required: t('login.emailRequired'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('login.emailInvalid'),
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-unlimited-danger">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${role}-password`}>{t('login.passwordLabel')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
              <Input
                id={`${role}-password`}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('login.passwordPlaceholder')}
                className="pl-10"
                {...register('password', {
                  required: t('login.passwordRequired'),
                  minLength: {
                    value: 6,
                    message: t('login.passwordTooShort'),
                  },
                })}
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
            {errors.password && (
              <p className="text-sm text-unlimited-danger">{errors.password.message}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox id={`${role}-remember`} {...register('rememberMe')} />
              <Label htmlFor={`${role}-remember`} className="text-sm">
                {t('login.rememberMe')}
              </Label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-unlimited-blue hover:underline"
            >
              {t('login.forgotPassword')}
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('login.loggingIn')}
              </>
            ) : (
              t('login.loginButton')
            )}
          </Button>
          <p className="text-sm text-center">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-unlimited-blue hover:underline">
              {t('login.createAccount')}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginPage;
