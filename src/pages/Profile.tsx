
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountManagement } from '@/components/auth/AccountManagement';
import { SecuritySettings } from '@/components/auth/SecuritySettings';

const Profile = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">الملف الشخصي</h1>
          <Button>تحديث الملف الشخصي</Button>
        </div>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>المعلومات الشخصية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <div className="flex h-full w-full items-center justify-center bg-unlimited-light-blue text-2xl font-medium text-white">
                  م أ
                </div>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">محمد أحمد</h2>
                <p className="text-unlimited-gray">student@example.com</p>
                <p className="text-unlimited-gray">+966 555 1234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">إعدادات الحساب</TabsTrigger>
            <TabsTrigger value="security">الأمان</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <AccountManagement />
          </TabsContent>
          <TabsContent value="security" className="mt-4">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
