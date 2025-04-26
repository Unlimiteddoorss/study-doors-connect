
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { Lock, Key, Globe } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountManagement from '@/components/auth/AccountManagement';
import SecuritySettings from '@/components/auth/SecuritySettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { changeLanguage, getCurrentLanguage, getLanguageName } from '@/i18n/config';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const AccountSettings = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  
  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLanguage) {
      changeLanguage(lang);
    }
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">{t('auth.accountSettings.title')}</h1>
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" />
              {t('auth.accountSettings.securitySettings')}
            </TabsTrigger>
            <TabsTrigger value="accounts">
              <Key className="mr-2 h-4 w-4" />
              {t('auth.accountSettings.subAccounts')}
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Globe className="mr-2 h-4 w-4" />
              {t('auth.accountSettings.preferences')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="accounts">
            <AccountManagement />
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.preferences.title')}</CardTitle>
                <CardDescription>
                  {t('auth.preferences.description')}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {t('auth.preferences.language')}
                  </h3>
                  <RadioGroup 
                    defaultValue={currentLanguage}
                    onValueChange={handleLanguageChange}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="ar" id="ar" />
                      <Label htmlFor="ar" className="flex-1 cursor-pointer">
                        <div className="font-medium">العربية</div>
                        <div className="text-sm text-unlimited-gray">اللغة العربية</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="en" id="en" />
                      <Label htmlFor="en" className="flex-1 cursor-pointer">
                        <div className="font-medium">English</div>
                        <div className="text-sm text-unlimited-gray">English Language</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="fr" id="fr" />
                      <Label htmlFor="fr" className="flex-1 cursor-pointer">
                        <div className="font-medium">Français</div>
                        <div className="text-sm text-unlimited-gray">Langue française</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="tr" id="tr" />
                      <Label htmlFor="tr" className="flex-1 cursor-pointer">
                        <div className="font-medium">Türkçe</div>
                        <div className="text-sm text-unlimited-gray">Türk dili</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    {t('auth.preferences.theme')}
                  </h3>
                  <RadioGroup 
                    defaultValue="light"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex-1 cursor-pointer">
                        <div className="font-medium">{t('auth.preferences.lightTheme')}</div>
                        <div className="text-sm text-unlimited-gray">{t('auth.preferences.lightThemeDesc')}</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex-1 cursor-pointer">
                        <div className="font-medium">{t('auth.preferences.darkTheme')}</div>
                        <div className="text-sm text-unlimited-gray">{t('auth.preferences.darkThemeDesc')}</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors col-span-full">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="flex-1 cursor-pointer">
                        <div className="font-medium">{t('auth.preferences.systemTheme')}</div>
                        <div className="text-sm text-unlimited-gray">{t('auth.preferences.systemThemeDesc')}</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
