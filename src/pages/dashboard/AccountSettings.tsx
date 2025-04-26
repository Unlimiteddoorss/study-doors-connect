
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { Lock, Key } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountManagement from '@/components/auth/AccountManagement';
import SecuritySettings from '@/components/auth/SecuritySettings';

const AccountSettings = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">{t('auth.accountSettings.title')}</h1>
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" />
              {t('auth.accountSettings.securitySettings')}
            </TabsTrigger>
            <TabsTrigger value="accounts">
              <Key className="mr-2 h-4 w-4" />
              {t('auth.accountSettings.subAccounts')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="accounts">
            <AccountManagement />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
