
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, TrendingUp, Users, GraduationCap, School, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { ApplicationsChart } from '@/components/admin/reports/ApplicationsChart';
import { StudentsByCountry } from '@/components/admin/reports/StudentsByCountry';
import { UniversityStats } from '@/components/admin/reports/UniversityStats';
import { ReportActions } from '@/components/admin/reports/ReportActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EnhancedDashboard = () => {
  const [activePeriod, setActivePeriod] = useState<"day" | "week" | "month" | "year">("month");
  const [activeTab, setActiveTab] = useState("overview");

  // Interactive chart data
  const studentByMajorData = [
    { name: 'Engineering', value: 42 },
    { name: 'Medicine', value: 28 },
    { name: 'Business', value: 15 },
    { name: 'Science', value: 10 },
    { name: 'Arts', value: 5 }
  ];
  
  const applicationTrendData = [
    { month: 'Jan', applications: 45, approved: 25, rejected: 10 },
    { month: 'Feb', applications: 52, approved: 30, rejected: 8 },
    { month: 'Mar', applications: 61, approved: 35, rejected: 12 },
    { month: 'Apr', applications: 67, approved: 40, rejected: 15 },
    { month: 'May', applications: 70, approved: 45, rejected: 10 },
    { month: 'Jun', applications: 78, approved: 50, rejected: 12 }
  ];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            <p className="text-muted-foreground">نظرة عامة على أداء المنصة</p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={activePeriod}
              onValueChange={(value: "day" | "week" | "month" | "year") => setActivePeriod(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">آخر 24 ساعة</SelectItem>
                <SelectItem value="week">آخر أسبوع</SelectItem>
                <SelectItem value="month">آخر شهر</SelectItem>
                <SelectItem value="year">آخر سنة</SelectItem>
              </SelectContent>
            </Select>
            <ReportActions />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatCard
            title="إجمالي الطلاب"
            value="1,234"
            change="+12.5%"
            trend="up"
            icon={<Users className="h-6 w-6" />}
          />
          <AdminStatCard
            title="الطلبات النشطة"
            value="256"
            change="+5.2%"
            trend="up"
            icon={<FileText className="h-6 w-6" />}
          />
          <AdminStatCard
            title="الجامعات المتعاقدة"
            value="45"
            change="+2"
            trend="up"
            icon={<School className="h-6 w-6" />}
          />
          <AdminStatCard
            title="البرامج المتاحة"
            value="189"
            change="+8"
            trend="up"
            icon={<GraduationCap className="h-6 w-6" />}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="applications">الطلبات</TabsTrigger>
            <TabsTrigger value="universities">الجامعات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">تطور الطلبات</h2>
                <ApplicationsChart />
              </Card>
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">توزيع الطلاب حسب الدول</h2>
                <StudentsByCountry />
              </Card>
            </div>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">توزيع الطلاب حسب التخصص</h2>
              <div className="h-80">
                <PieChart
                  data={studentByMajorData}
                  index="name"
                  category="value"
                  colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
                  valueFormatter={(value: number) => `${value} طالب`}
                />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاهات الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={applicationTrendData}
                    index="month"
                    categories={["applications", "approved", "rejected"]}
                    colors={["#3B82F6", "#10B981", "#EF4444"]}
                    valueFormatter={(value: number) => `${value} طلب`}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">معدل القبول</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76.3%</div>
                  <p className="text-xs text-muted-foreground">+2.5% من الشهر الماضي</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">متوسط وقت المعالجة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5.2 يوم</div>
                  <p className="text-xs text-muted-foreground">-1.3 يوم من الشهر الماضي</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">نسبة الاكتمال</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.7%</div>
                  <p className="text-xs text-muted-foreground">+3.2% من الشهر الماضي</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="universities">
            <UniversityStats />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedDashboard;
