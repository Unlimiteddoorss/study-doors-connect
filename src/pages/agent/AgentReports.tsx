
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, PieChart } from '@/components/charts';
import { Label } from '@/components/ui/label';

const AgentReports = () => {
  const [period, setPeriod] = useState('monthly');
  const currentYear = new Date().getFullYear();
  
  // Mock data for applications by university
  const universityApplicationsData = [
    { name: 'جامعة الملك سعود', value: 42 },
    { name: 'جامعة إسطنبول التقنية', value: 28 },
    { name: 'جامعة القاهرة', value: 15 },
    { name: 'الجامعة الأمريكية', value: 10 },
    { name: 'جامعة أنقرة', value: 5 },
  ];
  
  // Mock data for applications by status
  const statusData = [
    { name: 'قيد الانتظار', value: 25 },
    { name: 'قيد المراجعة', value: 15 },
    { name: 'مقبول', value: 40 },
    { name: 'قبول مشروط', value: 10 },
    { name: 'مرفوض', value: 10 },
  ];
  
  // Mock data for applications by program
  const programData = [
    { name: 'هندسة البرمجيات', value: 30 },
    { name: 'الطب البشري', value: 25 },
    { name: 'إدارة الأعمال', value: 20 },
    { name: 'الهندسة المدنية', value: 15 },
    { name: 'علوم الحاسب', value: 10 },
  ];

  // Generate monthly application data
  const generateMonthlyData = () => {
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    return months.map(month => ({
      name: month,
      pending: Math.floor(Math.random() * 10) + 1,
      approved: Math.floor(Math.random() * 15) + 5,
      rejected: Math.floor(Math.random() * 5)
    }));
  };
  
  // Generate quarterly application data
  const generateQuarterlyData = () => {
    return [
      { name: 'الربع الأول', pending: 15, approved: 25, rejected: 5 },
      { name: 'الربع الثاني', pending: 10, approved: 30, rejected: 8 },
      { name: 'الربع الثالث', pending: 12, approved: 28, rejected: 6 },
      { name: 'الربع الرابع', pending: 18, approved: 22, rejected: 4 },
    ];
  };
  
  // Generate yearly application data
  const generateYearlyData = () => {
    return [
      { name: (currentYear - 2).toString(), pending: 45, approved: 80, rejected: 15 },
      { name: (currentYear - 1).toString(), pending: 55, approved: 95, rejected: 18 },
      { name: currentYear.toString(), pending: 60, approved: 100, rejected: 20 },
    ];
  };
  
  // Get data based on selected period
  const getApplicationsOverTimeData = () => {
    switch(period) {
      case 'monthly':
        return generateMonthlyData();
      case 'quarterly':
        return generateQuarterlyData();
      case 'yearly':
        return generateYearlyData();
      default:
        return generateMonthlyData();
    }
  };
  
  const applicationsOverTimeData = getApplicationsOverTimeData();
  
  // Status colors for consistency
  const statusColors = {
    pending: '#f59e0b',
    approved: '#10b981',
    rejected: '#ef4444'
  };
  
  // Mock data for country distribution
  const countryData = [
    { name: 'المملكة العربية السعودية', value: 55 },
    { name: 'الإمارات العربية المتحدة', value: 20 },
    { name: 'قطر', value: 15 },
    { name: 'الكويت', value: 10 },
    { name: 'البحرين', value: 5 },
    { name: 'عمان', value: 5 },
  ];

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">التقارير والإحصائيات</h1>
          <div className="flex items-center gap-2">
            <Label htmlFor="period" className="text-unlimited-gray">الفترة:</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="period" className="w-[180px]">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">شهري</SelectItem>
                <SelectItem value="quarterly">ربع سنوي</SelectItem>
                <SelectItem value="yearly">سنوي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="applications">طلبات الالتحاق</TabsTrigger>
            <TabsTrigger value="demographics">بيانات الطلاب</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>طلبات الالتحاق عبر الوقت</CardTitle>
                <CardDescription>
                  عرض تطور طلبات الالتحاق حسب الحالة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={applicationsOverTimeData}
                  index="name"
                  categories={['pending', 'approved', 'rejected']}
                  colors={[statusColors.pending, statusColors.approved, statusColors.rejected]}
                  valueFormatter={(value) => `${value} طلب`}
                  className="mt-6 aspect-[4/3]"
                />
                <div className="flex justify-center gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                    <span className="text-sm text-unlimited-gray">قيد الانتظار</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                    <span className="text-sm text-unlimited-gray">مقبول</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                    <span className="text-sm text-unlimited-gray">مرفوض</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>طلبات الالتحاق حسب الجامعة</CardTitle>
                  <CardDescription>
                    توزيع طلبات الالتحاق على الجامعات المختلفة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart 
                    data={universityApplicationsData} 
                    valueFormatter={(value) => `${value} طلب`} 
                    className="max-w-xs mx-auto aspect-square" 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>طلبات الالتحاق حسب الحالة</CardTitle>
                  <CardDescription>
                    توزيع طلبات الالتحاق حسب حالة الطلب
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart 
                    data={statusData} 
                    valueFormatter={(value) => `${value} طلب`}
                    colors={["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444"]}
                    className="max-w-xs mx-auto aspect-square"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>طلبات الالتحاق حسب البرنامج</CardTitle>
                  <CardDescription>
                    توزيع طلبات الالتحاق على البرامج الدراسية المختلفة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={programData}
                    index="name"
                    categories={['value']}
                    colors={['#3b82f6']}
                    valueFormatter={(value) => `${value} طلب`}
                    className="mt-6 aspect-[3/2]"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>توزيع الطلاب حسب الدولة</CardTitle>
                  <CardDescription>
                    توزيع طلبات الالتحاق حسب دولة الطالب
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart 
                    data={countryData} 
                    valueFormatter={(value) => `${value} طالب`}
                    className="max-w-xs mx-auto aspect-square"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentReports;
