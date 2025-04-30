
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, PieChart, LineChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { AgentApplicationsList } from '@/components/agent/AgentApplicationsList';
import { AgentStudentsList } from '@/components/agent/AgentStudentsList';
import { FileText, Users, School, PlusCircle } from 'lucide-react';

const AgentDashboard = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const stats = [
    { 
      title: 'طلبات التحاق نشطة', 
      value: '24', 
      change: '+3', 
      trend: 'up',
      icon: <FileText className="h-6 w-6" />
    },
    { 
      title: 'الطلاب المسجلين', 
      value: '85', 
      change: '+12', 
      trend: 'up',
      icon: <Users className="h-6 w-6" />
    },
    { 
      title: 'الجامعات المتعاقدة', 
      value: '15', 
      change: '+2', 
      trend: 'up',
      icon: <School className="h-6 w-6" />
    },
  ];

  const applicationData = {
    daily: [
      { name: "الأحد", total: 2 },
      { name: "الاثنين", total: 3 },
      { name: "الثلاثاء", total: 2 },
      { name: "الأربعاء", total: 4 },
      { name: "الخميس", total: 2 },
      { name: "الجمعة", total: 1 },
      { name: "السبت", total: 0 },
    ],
    weekly: [
      { name: "الأسبوع 1", total: 8 },
      { name: "الأسبوع 2", total: 12 },
      { name: "الأسبوع 3", total: 9 },
      { name: "الأسبوع 4", total: 14 },
    ],
    monthly: [
      { name: "يناير", total: 30 },
      { name: "فبراير", total: 26 },
      { name: "مارس", total: 34 },
      { name: "أبريل", total: 28 },
      { name: "مايو", total: 32 },
      { name: "يونيو", total: 38 },
    ],
  };

  const applicationsDistribution = [
    { name: "قيد الانتظار", value: 35 },
    { name: "قيد المراجعة", value: 22 },
    { name: "مقبول", value: 18 },
    { name: "مرفوض", value: 12 },
    { name: "قبول مشروط", value: 8 },
  ];

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="rounded-full p-2 bg-blue-50">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  {stat.change} من الشهر الماضي
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="applications">الطلبات</TabsTrigger>
            <TabsTrigger value="students">الطلاب</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الطلبات الجديدة</CardTitle>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPeriod('daily')}
                      className={`px-2 py-1 text-xs rounded ${period === 'daily' ? 'bg-unlimited-blue text-white' : 'bg-gray-100'}`}
                    >
                      يومي
                    </button>
                    <button
                      onClick={() => setPeriod('weekly')}
                      className={`px-2 py-1 text-xs rounded ${period === 'weekly' ? 'bg-unlimited-blue text-white' : 'bg-gray-100'}`}
                    >
                      أسبوعي
                    </button>
                    <button
                      onClick={() => setPeriod('monthly')}
                      className={`px-2 py-1 text-xs rounded ${period === 'monthly' ? 'bg-unlimited-blue text-white' : 'bg-gray-100'}`}
                    >
                      شهري
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <LineChart
                    data={applicationData[period]}
                    index="name"
                    categories={["total"]}
                    colors={["blue"]}
                    valueFormatter={(value: number) => `${value} طلب`}
                    className="aspect-[4/3]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    توزيع الطلبات حسب الحالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={applicationsDistribution}
                    index="name"
                    category="value"
                    valueFormatter={(value: number) => `${value}%`}
                    className="aspect-[4/3]"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">الطلبات النشطة</h2>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                طلب جديد
              </Button>
            </div>
            <AgentApplicationsList />
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">الطلاب المسجلين</h2>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                إضافة طالب
              </Button>
            </div>
            <AgentStudentsList />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
