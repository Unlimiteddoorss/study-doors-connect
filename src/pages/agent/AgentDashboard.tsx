import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, LineChart } from "@/components/ui/chart";
import { AgentStudentsList } from '@/components/agent/AgentStudentsList';
import AgentApplicationsList from '@/components/agent/AgentApplicationsList';

const AgentDashboard = () => {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  const applicationData = {
    weekly: [
      { name: "الأحد", applications: 4, students: 2 },
      { name: "الاثنين", applications: 7, students: 3 },
      { name: "الثلاثاء", applications: 5, students: 1 },
      { name: "الأربعاء", applications: 8, students: 4 },
      { name: "الخميس", applications: 6, students: 2 },
      { name: "الجمعة", applications: 3, students: 1 },
      { name: "السبت", applications: 5, students: 3 },
    ],
    monthly: [
      { name: "يناير", applications: 25, students: 12 },
      { name: "فبراير", applications: 30, students: 15 },
      { name: "مارس", applications: 22, students: 10 },
      { name: "أبريل", applications: 35, students: 18 },
      { name: "مايو", applications: 28, students: 14 },
      { name: "يونيو", applications: 32, students: 16 },
      { name: "يوليو", applications: 27, students: 13 },
      { name: "أغسطس", applications: 31, students: 15 },
      { name: "سبتمبر", applications: 38, students: 20 },
      { name: "أكتوبر", applications: 40, students: 22 },
      { name: "نوفمبر", applications: 45, students: 25 },
      { name: "ديسمبر", applications: 42, students: 21 },
    ],
    yearly: [
      { name: "2020", applications: 120, students: 60 },
      { name: "2021", applications: 220, students: 110 },
      { name: "2022", applications: 280, students: 140 },
      { name: "2023", applications: 350, students: 180 },
      { name: "2024", applications: 150, students: 70 },
    ],
  };

  const commissionData = {
    weekly: [
      { name: "الأسبوع 1", commission: 12000 },
      { name: "الأسبوع 2", commission: 18000 },
      { name: "الأسبوع 3", commission: 15000 },
      { name: "الأسبوع 4", commission: 21000 },
    ],
    monthly: [
      { name: "يناير", commission: 45000 },
      { name: "فبراير", commission: 52000 },
      { name: "مارس", commission: 48000 },
      { name: "أبريل", commission: 60000 },
      { name: "مايو", commission: 55000 },
      { name: "يونيو", commission: 65000 },
      { name: "يوليو", commission: 58000 },
      { name: "أغسطس", commission: 63000 },
      { name: "سبتمبر", commission: 70000 },
      { name: "أكتوبر", commission: 75000 },
      { name: "نوفمبر", commission: 80000 },
      { name: "ديسمبر", commission: 0 },
    ],
    yearly: [
      { name: "2020", commission: 250000 },
      { name: "2021", commission: 420000 },
      { name: "2022", commission: 580000 },
      { name: "2023", commission: 680000 },
      { name: "2024", commission: 320000 },
    ],
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        <DashboardStats userRole="agent" />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="students">طلابي</TabsTrigger>
            <TabsTrigger value="applications">طلبات التسجيل</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إحصائيات الطلاب والطلبات</CardTitle>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <TabsTrigger
                      value="weekly"
                      onClick={() => setPeriod('weekly')}
                      className={period === 'weekly' ? 'bg-unlimited-blue text-white' : ''}
                    >
                      أسبوعي
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      onClick={() => setPeriod('monthly')}
                      className={period === 'monthly' ? 'bg-unlimited-blue text-white' : ''}
                    >
                      شهري
                    </TabsTrigger>
                    <TabsTrigger
                      value="yearly"
                      onClick={() => setPeriod('yearly')}
                      className={period === 'yearly' ? 'bg-unlimited-blue text-white' : ''}
                    >
                      سنوي
                    </TabsTrigger>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <AreaChart
                    data={applicationData[period]}
                    index="name"
                    categories={["applications", "students"]}
                    colors={["blue", "green"]}
                    valueFormatter={(value: number) => `${value}`}
                    className="aspect-[4/3]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">العمولات</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={commissionData[period]}
                    index="name"
                    categories={["commission"]}
                    colors={["purple"]}
                    valueFormatter={(value: number) => `${value} ريال`}
                    className="aspect-[4/3]"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">قائمة طلابي</CardTitle>
              </CardHeader>
              <CardContent>
                <AgentStudentsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">طلبات التسجيل</CardTitle>
              </CardHeader>
              <CardContent>
                <AgentApplicationsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
