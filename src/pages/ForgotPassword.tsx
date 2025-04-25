
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Logo from '@/components/shared/Logo';
import Footer from '@/components/layout/Footer';
import MainLayout from '@/components/layout/MainLayout';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface ForgotPasswordFormValues {
  email: string;
  verificationCode?: string;
}

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'verification' | 'newPassword'>('email');
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ForgotPasswordFormValues>();
  
  const onSubmitEmail = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('forgotPassword.emailSentTitle'),
        description: t('forgotPassword.emailSentDescription'),
      });
      
      setStep('verification');
    } catch (error) {
      console.error('Error sending reset email:', error);
      toast({
        title: t('forgotPassword.errorTitle'),
        description: t('forgotPassword.errorSendingEmail'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmitVerification = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('forgotPassword.codeVerifiedTitle'),
        description: t('forgotPassword.codeVerifiedDescription'),
      });
      
      setStep('newPassword');
    } catch (error) {
      console.error('Error verifying code:', error);
      toast({
        title: t('forgotPassword.errorTitle'),
        description: t('forgotPassword.errorVerifyingCode'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmitNewPassword = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to set new password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('forgotPassword.passwordResetTitle'),
        description: t('forgotPassword.passwordResetDescription'),
      });
      
      // In a real app, redirect to login page
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        title: t('forgotPassword.errorTitle'),
        description: t('forgotPassword.errorResettingPassword'),
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
                <Label htmlFor="email">{t('forgotPassword.emailLabel')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-unlimited-gray h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('forgotPassword.emailPlaceholder')}
                    className="pl-10"
                    {...register('email', {
                      required: t('forgotPassword.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('forgotPassword.emailInvalid'),
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-unlimited-danger">{errors.email.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('forgotPassword.sendingLink')}
                  </>
                ) : (
                  t('forgotPassword.sendResetLink')
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
                <p className="text-unlimited-gray">
                  {t('forgotPassword.codeSentTo')} <strong>{watch('email')}</strong>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="verification-code">{t('forgotPassword.verificationCodeLabel')}</Label>
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
                    {t('forgotPassword.resendCode')}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('forgotPassword.verifying')}
                  </>
                ) : (
                  t('forgotPassword.verifyCode')
                )}
              </Button>
              <Button 
                variant="ghost" 
                type="button" 
                className="w-full" 
                onClick={() => setStep('email')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('forgotPassword.backToEmail')}
              </Button>
            </CardFooter>
          </form>
        );
        
      case 'newPassword':
        return (
          <form onSubmit={handleSubmit(onSubmitNewPassword)}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">{t('forgotPassword.newPasswordLabel')}</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder={t('forgotPassword.newPasswordPlaceholder')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('forgotPassword.confirmPasswordLabel')}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('forgotPassword.resettingPassword')}
                  </>
                ) : (
                  t('forgotPassword.resetPassword')
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
              <CardTitle>{t('forgotPassword.title')}</CardTitle>
              <CardDescription>{t('forgotPassword.description')}</CardDescription>
            </CardHeader>
            {renderStep()}
            <CardFooter className="flex flex-col pt-0">
              <p className="text-sm text-center mt-4">
                {t('forgotPassword.rememberPassword')}{' '}
                <Link to="/login" className="text-unlimited-blue hover:underline">
                  {t('forgotPassword.backToLogin')}
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
