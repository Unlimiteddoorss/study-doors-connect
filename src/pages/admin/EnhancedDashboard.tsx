import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, TrendingUp, Users, GraduationCap, School, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { ApplicationsChart } from '@/components/admin/reports/ApplicationsChart';
import { StudentsByCountry } from '@/components/admin/reports/StudentsByCountry';
import { UniversityStats } from '@/components/admin/reports/UniversityStats';
import { ReportActions } from '@/components/admin/reports/ReportActions';
// Import the required components for the DonutChart
import { DonutChart } from "@/components/ui/donut-chart";

const EnhancedDashboard = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <ReportActions />
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

        <UniversityStats />

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">توزيع الطلاب حسب التخصص</h2>
          {/* Update the DonutChart usage to match its props */}
          <DonutChart
            data={[
              { name: 'Engineering', value: 42 },
              { name: 'Medicine', value: 28 },
              { name: 'Business', value: 15 },
              { name: 'Science', value: 10 },
              { name: 'Arts', value: 5 }
            ]}
            index="name"
            category="value"
            colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedDashboard;
