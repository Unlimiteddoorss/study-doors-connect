
import { useState } from 'react';
import { Shield, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const SecuritySettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  // تفعيل أو تعطيل المصادقة الثنائية
  const toggle2FA = async () => {
    setIsLoading(true);
    
    try {
      // محاكاة الاتصال بالخادم
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newStatus = !is2FAEnabled;
      setIs2FAEnabled(newStatus);
      
      toast({
        title: newStatus ? t('auth.securitySettings.twoFactorEnabled') : t('auth.securitySettings.twoFactorDisabled'),
        description: newStatus 
          ? t('auth.securitySettings.twoFactorEnabledDescription') 
          : t('auth.securitySettings.twoFactorDisabledDescription')
      });
    } catch (error) {
      toast({
        title: t('auth.securitySettings.error'),
        description: t('auth.securitySettings.errorDescription'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.securitySettings.title')}</CardTitle>
          <CardDescription>
            {t('auth.securitySettings.description')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 mt-1 text-unlimited-blue" />
                <div>
                  <h3 className="font-medium">{t('auth.securitySettings.twoFactor')}</h3>
                  <p className="text-sm text-unlimited-gray">
                    {is2FAEnabled 
                      ? t('auth.securitySettings.twoFactorEnabledInfo') 
                      : t('auth.securitySettings.twoFactorDisabledInfo')
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Switch
                  checked={is2FAEnabled}
                  onCheckedChange={toggle2FA}
                  disabled={isLoading}
                  className="mr-2"
                />
                <Button 
                  variant={is2FAEnabled ? "outline" : "unlimited"} 
                  onClick={toggle2FA}
                  disabled={isLoading}
                  size="sm"
                >
                  {is2FAEnabled ? t('auth.securitySettings.disable') : t('auth.securitySettings.enable')}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-start gap-4">
                <Key className="h-6 w-6 mt-1 text-unlimited-blue" />
                <div>
                  <h3 className="font-medium">{t('auth.securitySettings.changePassword')}</h3>
                  <p className="text-sm text-unlimited-gray">
                    {t('auth.securitySettings.changePasswordDescription')}
                  </p>
                </div>
              </div>
              
              <Button variant="outline">
                {t('auth.securitySettings.change')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.securitySettings.loginHistory')}</CardTitle>
          <CardDescription>
            {t('auth.securitySettings.loginHistoryDescription')}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Button variant="link" className="px-0">
            {t('auth.securitySettings.viewFullHistory')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
