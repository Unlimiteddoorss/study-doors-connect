
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { RecentApplications } from "@/components/admin/RecentApplications";
import { PendingTasks } from "@/components/admin/PendingTasks";

const AdminDashboard = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const applicationData = {
    daily: [
      { name: "الأحد", total: 12 },
      { name: "الاثنين", total: 18 },
      { name: "الثلاثاء", total: 15 },
      { name: "الأربعاء", total: 21 },
      { name: "الخميس", total: 19 },
      { name: "الجمعة", total: 8 },
      { name: "السبت", total: 10 },
    ],
    weekly: [
      { name: "الأسبوع 1", total: 45 },
      { name: "الأسبوع 2", total: 62 },
      { name: "الأسبوع 3", total: 58 },
      { name: "الأسبوع 4", total: 71 },
    ],
    monthly: [
      { name: "يناير", total: 180 },
      { name: "فبراير", total: 220 },
      { name: "مارس", total: 195 },
      { name: "أبريل", total: 202 },
      { name: "مايو", total: 240 },
      { name: "يونيو", total: 252 },
      { name: "يوليو", total: 210 },
      { name: "أغسطس", total: 232 },
      { name: "سبتمبر", total: 259 },
      { name: "أكتوبر", total: 290 },
      { name: "نوفمبر", total: 310 },
      { name: "ديسمبر", total: 0 },
    ],
  };

  const applicationsDistribution = [
    { name: "الهندسة", value: 35 },
    { name: "الطب", value: 22 },
    { name: "إدارة الأعمال", value: 18 },
    { name: "العلوم", value: 12 },
    { name: "تقنية المعلومات", value: 8 },
    { name: "أخرى", value: 5 },
  ];

  const applicationsByCountry = [
    { name: "المملكة المتحدة", total: 18 },
    { name: "الولايات المتحدة", total: 15 },
    { name: "كندا", total: 12 },
    { name: "أستراليا", total: 10 },
    { name: "ألمانيا", total: 8 },
    { name: "فرنسا", total: 6 },
    { name: "إسبانيا", total: 5 },
    { name: "إيطاليا", total: 4 },
    { name: "تركيا", total: 3 },
    { name: "ماليزيا", total: 2 },
  ];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <DashboardStats userRole="admin" />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="tasks">المهام</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الطلبات الجديدة</CardTitle>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <TabsTrigger
                      value="daily"
                      variant="outline"
                      onClick={() => setPeriod('daily')}
                      className={period === 'daily' ? 'bg-unlimited-blue text-white' : ''}
                    >
                      يومي
                    </TabsTrigger>
                    <TabsTrigger
                      value="weekly"
                      variant="outline"
                      onClick={() => setPeriod('weekly')}
                      className={period === 'weekly' ? 'bg-unlimited-blue text-white' : ''}
                    >
                      أسبوعي
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      variant="outline"
                      onClick={() => setPeriod('monthly')}
                      className={period === 'monthly' ? 'bg-unlimited-blue text-white' : ''}
                    >
                      شهري
                    </TabsTrigger>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <AreaChart
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
                  <CardTitle className="text-sm font-medium">توزيع الطلبات حسب التخصص</CardTitle>
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

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">الطلبات حسب البلد</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={applicationsByCountry}
                  index="name"
                  categories={["total"]}
                  colors={["blue"]}
                  valueFormatter={(value: number) => `${value} طلب`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">تحليل أداء الوكلاء</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: "يناير", "وكيل 1": 12, "وكيل 2": 18, "وكيل 3": 10 },
                    { name: "فبراير", "وكيل 1": 15, "وكيل 2": 20, "وكيل 3": 12 },
                    { name: "مارس", "وكيل 1": 18, "وكيل 2": 22, "وكيل 3": 14 },
                    { name: "أبريل", "وكيل 1": 20, "وكيل 2": 25, "وكيل 3": 18 },
                    { name: "مايو", "وكيل 1": 22, "وكيل 2": 28, "وكيل 3": 20 },
                    { name: "يونيو", "وكيل 1": 25, "وكيل 2": 30, "وكيل 3": 22 },
                  ]}
                  index="name"
                  categories={["وكيل 1", "وكيل 2", "وكيل 3"]}
                  colors={["blue", "green", "orange"]}
                  valueFormatter={(value: number) => `${value} طلب`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-base font-medium">المهام المعلقة</CardTitle>
                </CardHeader>
                <CardContent>
                  <PendingTasks />
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-base font-medium">الطلبات الحديثة</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentApplications />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
