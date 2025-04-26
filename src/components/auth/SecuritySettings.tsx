
import { useState } from 'react';
import { Shield, Key, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SecuritySettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <Shield className={`h-6 w-6 mt-1 text-unlimited-blue ${isRtl ? 'ml-2' : 'mr-2'}`} />
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
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse self-end sm:self-auto">
                <Switch
                  checked={is2FAEnabled}
                  onCheckedChange={toggle2FA}
                  disabled={isLoading}
                  className={`${isRtl ? 'ml-2' : 'mr-2'}`}
                />
                <Button 
                  variant={is2FAEnabled ? "outline" : "unlimited"} 
                  onClick={toggle2FA}
                  disabled={isLoading}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {is2FAEnabled ? t('auth.securitySettings.disable') : t('auth.securitySettings.enable')}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <Key className={`h-6 w-6 mt-1 text-unlimited-blue ${isRtl ? 'ml-2' : 'mr-2'}`} />
                <div>
                  <h3 className="font-medium">{t('auth.securitySettings.changePassword')}</h3>
                  <p className="text-sm text-unlimited-gray">
                    {t('auth.securitySettings.changePasswordDescription')}
                  </p>
                </div>
              </div>
              
              <Button variant="outline" className="self-end sm:self-auto whitespace-nowrap">
                {t('auth.securitySettings.change')}
              </Button>
            </div>
          </div>
          
          {!is2FAEnabled && (
            <Alert variant="warning" className="bg-yellow-50 text-yellow-800 border-yellow-200 mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t('auth.securitySettings.securityWarning')}</AlertTitle>
              <AlertDescription>
                {t('auth.securitySettings.securityWarningDesc')}
              </AlertDescription>
            </Alert>
          )}
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
          <div className="space-y-4">
            {/* Login history items */}
            <div className="border rounded-md p-3 space-y-1 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <p className="font-medium">{t('auth.securitySettings.lastLoginTitle')}</p>
                <span className="text-sm text-unlimited-gray">2023-04-25 14:30</span>
              </div>
              <p className="text-sm text-unlimited-gray">Chrome on Windows • IP: 192.168.1.1</p>
            </div>
            
            <div className="border rounded-md p-3 space-y-1 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <p className="font-medium">{t('auth.securitySettings.previousLoginTitle')}</p>
                <span className="text-sm text-unlimited-gray">2023-04-23 10:15</span>
              </div>
              <p className="text-sm text-unlimited-gray">Safari on macOS • IP: 192.168.1.100</p>
            </div>
          </div>
          
          <Button variant="link" className="px-0 mt-4">
            {t('auth.securitySettings.viewFullHistory')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
