
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { ArrowUpRight, Loader2 } from 'lucide-react';

const InformationDashboard: React.FC = () => {
  const applicationData = [
    { month: 'Jan', Applications: 65, Accepted: 40, Rejected: 25 },
    { month: 'Feb', Applications: 80, Accepted: 45, Rejected: 35 },
    { month: 'Mar', Applications: 95, Accepted: 60, Rejected: 35 },
    { month: 'Apr', Applications: 75, Accepted: 50, Rejected: 25 },
    { month: 'May', Applications: 85, Accepted: 55, Rejected: 30 },
    { month: 'Jun', Applications: 100, Accepted: 70, Rejected: 30 },
  ];

  const countryData = [
    { name: 'تركيا', value: 45 },
    { name: 'قبرص', value: 25 },
    { name: 'ماليزيا', value: 15 },
    { name: 'مصر', value: 10 },
    { name: 'المجر', value: 5 },
  ];

  const revenueData = [
    { month: 'Jan', Revenue: 12000 },
    { month: 'Feb', Revenue: 15000 },
    { month: 'Mar', Revenue: 18000 },
    { month: 'Apr', Revenue: 16000 },
    { month: 'May', Revenue: 21000 },
    { month: 'Jun', Revenue: 22000 },
  ];

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold">المعلومات الرئيسية</h3>
        <Button variant="ghost" className="flex items-center gap-1">
          <span className="text-sm">عرض التقارير الكاملة</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="applications">الطلبات</TabsTrigger>
          <TabsTrigger value="students">الطلاب حسب الدولة</TabsTrigger>
          <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-0">
          <div className="h-80">
            <BarChart
              data={applicationData}
              index="month"
              categories={["Applications", "Accepted", "Rejected"]}
              colors={["#3B82F6", "#10B981", "#EF4444"]}
              className="h-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-0">
          <div className="h-80">
            <PieChart
              data={countryData}
              index="name"
              category="value"
              colors={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]}
              className="h-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-0">
          <div className="h-80">
            <LineChart
              data={revenueData}
              index="month"
              categories={["Revenue"]}
              valueFormatter={formatCurrency}
              className="h-full"
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InformationDashboard;
