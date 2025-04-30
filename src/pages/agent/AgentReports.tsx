
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, PieChart } from '@/components/charts';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const AgentReports = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data for reports
  const applicationsByUniversity = [
    { name: 'جامعة الملك سعود', value: 32 },
    { name: 'جامعة القاهرة', value: 27 },
    { name: 'جامعة إسطنبول التقنية', value: 18 },
    { name: 'الجامعة الأمريكية', value: 14 },
    { name: 'جامعة الإمارات', value: 9 },
  ];

  const applicationsByStatus = [
    { name: 'مقبول', value: 42 },
    { name: 'قيد المراجعة', value: 28 },
    { name: 'قيد الانتظار', value: 18 },
    { name: 'مرفوض', value: 12 },
  ];

  const applicationsByMonth = [
    { month: 'يناير', pending: 5, approved: 8, rejected: 2 },
    { month: 'فبراير', pending: 7, approved: 10, rejected: 3 },
    { month: 'مارس', pending: 8, approved: 12, rejected: 4 },
    { month: 'أبريل', pending: 12, approved: 15, rejected: 5 },
    { month: 'مايو', pending: 10, approved: 18, rejected: 6 },
    { month: 'يونيو', pending: 8, approved: 16, rejected: 4 },
  ];

  const commissionsByMonth = [
    { month: 'يناير', amount: 12500 },
    { month: 'فبراير', amount: 15000 },
    { month: 'مارس', amount: 18000 },
    { month: 'أبريل', amount: 22000 },
    { month: 'مايو', amount: 25000 },
    { month: 'يونيو', amount: 20000 },
  ];

  const handleExportReport = (reportType: string) => {
    // Logic to export report
    console.log(`Exporting ${reportType} report...`);
    // Placeholder for actual export functionality
  };

  const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

  return (
    <DashboardLayout userRole="agent">
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">التقارير والإحصائيات</h1>
          
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر النطاق الزمني" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">آخر أسبوع</SelectItem>
                <SelectItem value="month">آخر شهر</SelectItem>
                <SelectItem value="quarter">آخر ربع سنة</SelectItem>
                <SelectItem value="year">آخر سنة</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              تصدير التقارير
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إجمالي الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-unlimited-dark-blue">48</div>
              <p className="text-sm text-unlimited-gray">زيادة بنسبة 12% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">طلبات الالتحاق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-unlimited-dark-blue">126</div>
              <p className="text-sm text-unlimited-gray">زيادة بنسبة 8% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إجمالي العمولات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-unlimited-dark-blue">112,500 ر.س</div>
              <p className="text-sm text-unlimited-gray">زيادة بنسبة 15% عن الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">تقارير الطلبات</TabsTrigger>
            <TabsTrigger value="commissions">تقارير العمولات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">طلبات الالتحاق حسب الجامعة</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => handleExportReport('universities')}>
                      <Download className="h-3 w-3" />
                      <span className="text-xs">تصدير</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <PieChart 
                      data={applicationsByUniversity}
                      valueFormatter={(value) => `${value} طلب`}
                      className="h-full"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">طلبات الالتحاق حسب الحالة</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => handleExportReport('status')}>
                      <Download className="h-3 w-3" />
                      <span className="text-xs">تصدير</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <PieChart 
                      data={applicationsByStatus}
                      valueFormatter={(value) => `${value} طلب`}
                      className="h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">تطور طلبات الالتحاق</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => handleExportReport('applications-trend')}>
                    <Download className="h-3 w-3" />
                    <span className="text-xs">تصدير</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <BarChart
                    data={applicationsByMonth}
                    index="month"
                    categories={["pending", "approved", "rejected"]}
                    colors={["#f59e0b", "#10b981", "#ef4444"]}
                    valueFormatter={(value) => `${value} طلب`}
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="commissions" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">العمولات الشهرية</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => handleExportReport('commissions')}>
                    <Download className="h-3 w-3" />
                    <span className="text-xs">تصدير</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <BarChart
                    data={commissionsByMonth}
                    index="month"
                    categories={["amount"]}
                    colors={["#3b82f6"]}
                    valueFormatter={formatCurrency}
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentReports;
