
import { 
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  GraduationCap,
  School,
  FileText
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { ApplicationsChart } from '@/components/admin/reports/ApplicationsChart';
import { StudentsByCountry } from '@/components/admin/reports/StudentsByCountry';
import { UniversityStats } from '@/components/admin/reports/UniversityStats';
import { ReportActions } from '@/components/admin/reports/ReportActions';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const Reports = () => {
  const { logInfo } = useErrorHandler();

  const handleReportGeneration = (reportType: string) => {
    logInfo(`تم إنشاء تقرير: ${reportType}`, { reportType, timestamp: new Date().toISOString() });
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">التقارير والإحصائيات</h1>
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
      </div>
    </DashboardLayout>
  );
};

export default Reports;
