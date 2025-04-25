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
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Logo from '@/components/shared/Logo';
import Footer from '@/components/layout/Footer';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
  twoFactorCode?: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<LoginFormValues>();
  
  const onSubmit = async (data: LoginFormValues) => {
    if (show2FA && !data.twoFactorCode) {
      toast({
        title: t('login.2faRequired'),
        description: t('login.enter2faCode'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate login API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the login attempt for security tracking
      logLoginAttempt(data.email, true);
      
      // Simulate successful login
      toast({
        title: t('login.successTitle'),
        description: t('login.successMessage'),
      });
      
      // Direct user based on role
      if (data.email.includes('admin')) {
        navigate('/admin');
      } else if (data.email.includes('agent')) {
        navigate('/agent');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Log failed login attempt
      logLoginAttempt(data.email, false);
      
      toast({
        title: t('login.errorTitle'),
        description: t('login.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to handle initial login step
  const handleInitialLogin = () => {
    const data = getValues();
    
    // For demo, show 2FA for specific test accounts
    if (data.email.includes('secure')) {
      setShow2FA(true);
      toast({
        title: t('login.2faRequired'),
        description: t('login.enter2faCode'),
      });
    } else {
      // For regular accounts, proceed with login
      handleSubmit(onSubmit)();
    }
  };
  
  // Function to log login attempts
  const logLoginAttempt = (email: string, success: boolean) => {
    const loginLog = {
      email,
      timestamp: new Date().toISOString(),
      success,
      ipAddress: "127.0.0.1", // In a real app, this would be the actual IP
      userAgent: navigator.userAgent,
    };
    
    console.log('Login attempt logged:', loginLog);
    
    // In a real application, this would be sent to the server
    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    loginHistory.push(loginLog);
    localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
    
    // Check for suspicious activity (multiple failed attempts)
    if (!success) {
      const recentFailures = loginHistory
        .filter((log: any) => log.email === email && !log.success)
        .filter((log: any) => {
          const logTime = new Date(log.timestamp).getTime();
          const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
          return logTime > fiveMinutesAgo;
        });
      
      if (recentFailures.length >= 3) {
        toast({
          title: t('login.suspiciousActivityTitle'),
          description: t('login.suspiciousActivityDescription'),
          variant: 'destructive',
        });
      }
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
                onSubmit={show2FA ? onSubmit : handleInitialLogin}
                isLoading={isLoading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                show2FA={show2FA}
                setValue={setValue}
              />
            </TabsContent>
            
            <TabsContent value="agent">
              <LoginForm 
                role="agent"
                onSubmit={show2FA ? onSubmit : handleInitialLogin}
                isLoading={isLoading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                show2FA={show2FA}
                setValue={setValue}
              />
            </TabsContent>
            
            <TabsContent value="admin">
              <LoginForm 
                role="admin"
                onSubmit={show2FA ? onSubmit : handleInitialLogin}
                isLoading={isLoading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                show2FA={show2FA}
                setValue={setValue}
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
  show2FA: boolean;
  setValue: any;
}

const LoginForm = ({ 
  role, 
  onSubmit, 
  isLoading, 
  showPassword, 
  setShowPassword, 
  register, 
  errors, 
  handleSubmit,
  show2FA,
  setValue
}: LoginFormProps) => {
  const { t } = useTranslation();

  const handleOTPChange = (value: string) => {
    setValue('twoFactorCode', value);
  };
  
  return (
    <Card className="border-2 shadow-md">
      <CardHeader>
        <CardTitle>{t(`login.${role}Title`)}</CardTitle>
        <CardDescription>{t(`login.${role}Description`)}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {!show2FA ? (
            <>
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
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <ShieldCheck className="h-12 w-12 text-unlimited-blue mx-auto mb-2" />
                <h3 className="text-lg font-medium">{t('login.2faTitle')}</h3>
                <p className="text-sm text-unlimited-gray">{t('login.2faDescription')}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="2fa-code">{t('login.2faCodeLabel')}</Label>
                <InputOTP
                  maxLength={6}
                  value=""
                  onChange={handleOTPChange}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {show2FA ? t('login.verifying') : t('login.loggingIn')}
              </>
            ) : (
              show2FA ? t('login.verifyButton') : t('login.loginButton')
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
