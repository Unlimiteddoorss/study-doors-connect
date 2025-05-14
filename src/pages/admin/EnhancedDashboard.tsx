
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AnimatedStatsGrid from '@/components/admin/AnimatedStatsGrid';
import QuickActionsPanel from '@/components/admin/QuickActionsPanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { DonutChart } from '@/components/ui/donut-chart';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import AdvancedSearch from '@/components/admin/AdvancedSearch';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Sample Data
const applicationStatusData = [
  { name: 'قيد المراجعة', value: 45 },
  { name: 'مقبول', value: 30 },
  { name: 'مكتمل', value: 20 },
  { name: 'مرفوض', value: 5 },
];

const studentsByCountryData = [
  { name: 'تركيا', value: 55 },
  { name: 'ماليزيا', value: 25 },
  { name: 'بريطانيا', value: 15 },
  { name: 'كندا', value: 5 },
];

const monthlyApplicationsData = [
  { month: 'Jan', applications: 20 },
  { month: 'Feb', applications: 32 },
  { month: 'Mar', applications: 45 },
  { month: 'Apr', applications: 40 },
  { month: 'May', applications: 55 },
  { month: 'Jun', applications: 60 },
  { month: 'Jul', applications: 48 },
  { month: 'Aug', applications: 52 },
  { month: 'Sep', applications: 65 },
  { month: 'Oct', applications: 70 },
  { month: 'Nov', applications: 68 },
  { month: 'Dec', applications: 72 },
];

const programTypeData = [
  { name: 'طب', students: 150, applications: 200 },
  { name: 'هندسة', students: 120, applications: 180 },
  { name: 'علوم حاسب', students: 80, applications: 120 },
  { name: 'أعمال', students: 100, applications: 140 },
  { name: 'علوم', students: 60, applications: 90 },
];

// Recent Activity Data
const recentActivities = [
  { id: 1, user: 'أحمد محمود', action: 'أضاف طلب جديد', program: 'بكالوريوس طب', time: 'منذ 5 دقائق' },
  { id: 2, user: 'سارة علي', action: 'تم قبولها في', program: 'ماجستير هندسة', time: 'منذ 30 دقيقة' },
  { id: 3, user: 'محمد خالد', action: 'أرسل وثائق جديدة', program: 'بكالوريوس علوم حاسب', time: 'منذ ساعة' },
  { id: 4, user: 'نور حسن', action: 'تم مراجعة طلبها', program: 'دكتوراه أعمال', time: 'منذ 3 ساعات' },
];

// Tasks Data
const tasks = [
  { id: 1, title: 'مراجعة طلبات جديدة', dueDate: '2023-05-15', priority: 'عالي', status: 'قيد التنفيذ' },
  { id: 2, title: 'التحقق من الوثائق المحملة', dueDate: '2023-05-16', priority: 'متوسط', status: 'قيد التنفيذ' },
  { id: 3, title: 'إرسال إيميلات القبول', dueDate: '2023-05-18', priority: 'عالي', status: 'قيد الانتظار' },
  { id: 4, title: 'تحديث قائمة البرامج', dueDate: '2023-05-20', priority: 'منخفض', status: 'مكتمل' },
];

const EnhancedDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState<{ from?: Date; to?: Date }>({});

  const handleSearch = (query: string, filters: any) => {
    console.log('Search Query:', query);
    console.log('Filters:', filters);
    // Implement actual search functionality
  };

  const formatCurrency = (value: number) => `${value}`;

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout userRole="admin">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={containerAnimation}
        className="space-y-6"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <motion.div variants={itemAnimation} className="flex-1">
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">{t('admin.dashboard.welcomeBack')}</h1>
            <p className="text-unlimited-gray">{t('admin.dashboard.lastLogin')}: 2023-05-14 10:30 AM</p>
          </motion.div>
          
          <motion.div variants={itemAnimation} className="flex flex-col sm:flex-row gap-2">
            <DatePickerWithRange 
              onChange={(range) => setSelectedDateRange(range)} 
              className="w-full sm:w-auto"
            />
            <QuickActionsPanel className="w-full sm:w-auto" />
          </motion.div>
        </div>

        <motion.div variants={itemAnimation}>
          <AdvancedSearch placeholder={t('admin.dashboard.searchPlaceholder')} onSearch={handleSearch} />
        </motion.div>

        <motion.div variants={itemAnimation}>
          <AnimatedStatsGrid />
        </motion.div>

        <motion.div variants={itemAnimation}>
          <Tabs defaultValue="overview" onValueChange={(value) => setActiveTab(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview">{t('admin.dashboard.tabs.overview')}</TabsTrigger>
              <TabsTrigger value="students">{t('admin.dashboard.tabs.students')}</TabsTrigger>
              <TabsTrigger value="applications">{t('admin.dashboard.tabs.applications')}</TabsTrigger>
              <TabsTrigger value="programs">{t('admin.dashboard.tabs.programs')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.dashboard.applicationStatus')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.applicationStatusDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <DonutChart 
                        data={applicationStatusData} 
                        animationEnabled={true}
                        showLabel={true}
                        label={
                          <div className="text-center">
                            <p className="text-3xl font-bold">100</p>
                            <p className="text-sm text-unlimited-gray">{t('admin.dashboard.totalApplications')}</p>
                          </div>
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.dashboard.monthlyApplications')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.monthlyApplicationsDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <LineChart
                        data={monthlyApplicationsData}
                        index="month"
                        categories={["applications"]}
                        colors={["#2563eb"]}
                        valueFormatter={formatCurrency}
                        className="h-72"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>{t('admin.dashboard.programTypes')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.programTypesDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={programTypeData}
                        index="name"
                        categories={["students", "applications"]}
                        colors={["#3498db", "#e67e22"]}
                        valueFormatter={formatCurrency}
                        className="h-72"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.dashboard.studentsByCountry')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.studentsByCountryDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <PieChart
                        data={studentsByCountryData}
                        index="name"
                        category="value"
                        colors={["#2563eb", "#10b981", "#f59e0b", "#ef4444"]}
                        valueFormatter={formatCurrency}
                        className="h-64"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.dashboard.recentActivity')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.recentActivityDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentActivities.map((activity) => (
                        <li key={activity.id} className="flex items-start gap-4 bg-gray-50 p-3 rounded-lg">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-unlimited-blue/20 flex items-center justify-center">
                            <span className="text-unlimited-blue font-bold">{activity.user.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.user}</p>
                            <p className="text-sm text-unlimited-gray">
                              {activity.action} <span className="font-medium text-unlimited-dark-blue">{activity.program}</span>
                            </p>
                            <span className="text-xs text-unlimited-gray">{activity.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.dashboard.pendingTasks')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.pendingTasksDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tasks.map((task) => (
                        <li key={task.id} className="border-l-4 border-unlimited-blue pl-3 py-2">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{task.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === 'عالي' 
                                ? 'bg-red-100 text-red-800' 
                                : task.priority === 'متوسط'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-unlimited-gray mt-1">
                            <span>تاريخ الاستحقاق: {task.dueDate}</span>
                            <span className={`${
                              task.status === 'مكتمل'
                                ? 'text-green-600'
                                : task.status === 'قيد التنفيذ'
                                  ? 'text-blue-600'
                                  : 'text-yellow-600'
                            }`}>
                              {task.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.studentAnalytics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-unlimited-gray">{t('admin.dashboard.studentAnalyticsContent')}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.applicationAnalytics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-unlimited-gray">{t('admin.dashboard.applicationAnalyticsContent')}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="programs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.programAnalytics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-unlimited-gray">{t('admin.dashboard.programAnalyticsContent')}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default EnhancedDashboard;
