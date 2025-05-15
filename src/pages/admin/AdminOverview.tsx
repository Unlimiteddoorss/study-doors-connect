
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { KPIDashboardWidget, AnalyticsDashboard, AdminTasksOverview } from '@/components/admin/exports';
import { QuickActionsPanel } from '@/components/admin/exports';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

const AdminOverview = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">{t('admin.overview.title', 'لوحة المشرف')}</h1>
            <p className="text-unlimited-gray">{t('admin.overview.subtitle', 'نظرة عامة على نشاط النظام والإحصائيات')}</p>
          </div>
          
          <QuickActionsPanel />
        </div>
        
        <KPIDashboardWidget />
        
        <Tabs defaultValue="analytics" className="space-y-8">
          <TabsList className="w-full bg-white p-1 border rounded-lg mb-6">
            <TabsTrigger value="analytics" className="flex-1">{t('admin.overview.analytics', 'التحليلات')}</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">{t('admin.overview.tasks', 'المهام')}</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">{t('admin.overview.activity', 'النشاط')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="mt-0">
            <AnalyticsDashboard className="w-full" />
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-0">
            <AdminTasksOverview />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <div className="bg-white border rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium text-unlimited-dark-blue mb-2">
                {t('admin.overview.activityLog', 'سجل النشاط')}
              </h3>
              <p className="text-unlimited-gray mb-4">
                {t('admin.overview.activityLogDescription', 'سجل تفصيلي لجميع الأنشطة والإجراءات التي تمت في النظام')}
              </p>
              <button className="text-unlimited-blue hover:underline">
                {t('admin.overview.viewActivityLog', 'عرض سجل النشاط الكامل')}
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminOverview;
