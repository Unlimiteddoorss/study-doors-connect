
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Calendar, Filter } from 'lucide-react';

const AgentReports = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [applicationsChartType, setApplicationsChartType] = useState<'line' | 'bar'>('line');

  // Mock data for reports
  const applicationStatusData = [
    { name: "قيد الانتظار", value: 35 },
    { name: "قيد المراجعة", value: 22 },
    { name: "مقبول", value: 18 },
    { name: "قبول مشروط", value: 12 },
    { name: "مرفوض", value: 8 },
  ];

  const universityDistributionData = [
    { name: "جامعة إسطنبول التقنية", value: 45 },
    { name: "جامعة القاهرة", value: 20 },
    { name: "جامعة الملك سعود", value: 35 },
  ];

  const getApplicationsTrendData = () => {
    switch (timeRange) {
      case 'month':
        return [
          { name: "الأسبوع 1", value: 3 },
          { name: "الأسبوع 2", value: 5 },
          { name: "الأسبوع 3", value: 2 },
          { name: "الأسبوع 4", value: 4 },
        ];
      case 'quarter':
        return [
          { name: "يناير", value: 8 },
          { name: "فبراير", value: 10 },
          { name: "مارس", value: 12 },
        ];
      case 'year':
      default:
        return [
          { name: "يناير", value: 8 },
          { name: "فبراير", value: 10 },
          { name: "مارس", value: 12 },
          { name: "أبريل", value: 9 },
          { name: "مايو", value: 15 },
          { name: "يونيو", value: 18 },
          { name: "يوليو", value: 14 },
          { name: "أغسطس", value: 7 },
          { name: "سبتمبر", value: 12 },
          { name: "أكتوبر", value: 16 },
          { name: "نوفمبر", value: 13 },
          { name: "ديسمبر", value: 0 },
        ];
    }
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">التقارير والإحصائيات</h1>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <SelectValue placeholder="اختر الفترة الزمنية" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">الشهر الحالي</SelectItem>
                <SelectItem value="quarter">ربع سنوي</SelectItem>
                <SelectItem value="year">سنوي</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              تصدير البيانات
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <div className="text-sm text-green-500">+12% من الشهر الماضي</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">طلبات مقبولة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <div className="text-sm text-green-500">نسبة القبول 75%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">معدل التحويل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">62.5%</div>
              <div className="text-sm text-green-500">+5% من الشهر الماضي</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">طلبات التحاق عبر الزمن</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant={applicationsChartType === 'line' ? 'default' : 'outline'} 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={() => setApplicationsChartType('line')}
                >
                  خطي
                </Button>
                <Button 
                  variant={applicationsChartType === 'bar' ? 'default' : 'outline'} 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={() => setApplicationsChartType('bar')}
                >
                  شريطي
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {applicationsChartType === 'line' ? (
                <LineChart
                  data={getApplicationsTrendData()}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value: number) => `${value} طلب`}
                  className="aspect-[4/3]"
                />
              ) : (
                <BarChart
                  data={getApplicationsTrendData()}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value: number) => `${value} طلب`}
                  className="aspect-[4/3]"
                />
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">توزيع حالات الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart
                data={applicationStatusData}
                index="name"
                category="value"
                valueFormatter={(value: number) => `${value}%`}
                className="aspect-[4/3]"
              />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">توزيع الطلبات حسب الجامعة</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={universityDistributionData}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value: number) => `${value}%`}
              className="h-[300px]"
              layout="vertical"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentReports;
