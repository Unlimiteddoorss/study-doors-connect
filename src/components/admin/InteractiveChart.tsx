
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';

interface InteractiveChartProps {
  title?: string;
  description?: string;
  className?: string;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  title = 'تحليلات الطلاب',
  description = 'نظرة عامة على بيانات الطلاب الأكاديمية والمالية.',
  className = '',
}) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  
  // Sample data
  const weeklyData = [
    { day: 'الأحد', Applications: 12, Accepted: 8, Revenue: 2400 },
    { day: 'الإثنين', Applications: 19, Accepted: 15, Revenue: 3200 },
    { day: 'الثلاثاء', Applications: 15, Accepted: 11, Revenue: 2800 },
    { day: 'الأربعاء', Applications: 22, Accepted: 18, Revenue: 3600 },
    { day: 'الخميس', Applications: 28, Accepted: 20, Revenue: 4200 },
    { day: 'الجمعة', Applications: 16, Accepted: 12, Revenue: 2900 },
    { day: 'السبت', Applications: 8, Accepted: 5, Revenue: 1800 },
  ];
  
  const monthlyData = [
    { month: 'يناير', Applications: 65, Accepted: 40, Revenue: 12000 },
    { month: 'فبراير', Applications: 80, Accepted: 55, Revenue: 15000 },
    { month: 'مارس', Applications: 95, Accepted: 65, Revenue: 18000 },
    { month: 'أبريل', Applications: 75, Accepted: 50, Revenue: 14000 },
    { month: 'مايو', Applications: 85, Accepted: 60, Revenue: 16000 },
    { month: 'يونيو', Applications: 100, Accepted: 70, Revenue: 20000 },
  ];
  
  const yearlyData = [
    { year: '2018', Applications: 550, Accepted: 380, Revenue: 95000 },
    { year: '2019', Applications: 650, Accepted: 450, Revenue: 118000 },
    { year: '2020', Applications: 480, Accepted: 320, Revenue: 86000 },
    { year: '2021', Applications: 720, Accepted: 510, Revenue: 136000 },
    { year: '2022', Applications: 850, Accepted: 610, Revenue: 165000 },
  ];
  
  // Distribution data for pie chart
  const distributionData = [
    { name: 'الطب', value: 35 },
    { name: 'الهندسة', value: 25 },
    { name: 'العلوم', value: 15 },
    { name: 'الإدارة', value: 18 },
    { name: 'الآداب', value: 7 },
  ];
  
  // Get current data based on selected period
  const getCurrentData = () => {
    switch (period) {
      case 'week':
        return weeklyData;
      case 'year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };
  
  // Get index field name based on period
  const getIndexField = () => {
    switch (period) {
      case 'week':
        return 'day';
      case 'year':
        return 'year';
      default:
        return 'month';
    }
  };
  
  // Format currency
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-unlimited-gray text-sm">{description}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <Select value={period} onValueChange={(value) => setPeriod(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="week">أسبوعي</SelectItem>
                <SelectItem value="month">شهري</SelectItem>
                <SelectItem value="year">سنوي</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Tabs value={chartType} onValueChange={(value) => setChartType(value as any)} className="w-full">
            <TabsList className="grid grid-cols-3 w-[180px]">
              <TabsTrigger value="bar">عمودي</TabsTrigger>
              <TabsTrigger value="line">خطي</TabsTrigger>
              <TabsTrigger value="pie">دائري</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="h-80">
        {chartType === 'bar' && (
          <BarChart
            data={getCurrentData()}
            index={getIndexField()}
            categories={['Applications', 'Accepted', 'Revenue']}
            valueFormatter={(value) => value.toString()}
            className="h-full"
          />
        )}
        
        {chartType === 'line' && (
          <LineChart
            data={getCurrentData()}
            index={getIndexField()}
            categories={['Applications', 'Accepted', 'Revenue']}
            valueFormatter={(value) => value.toString()}
            className="h-full"
          />
        )}
        
        {chartType === 'pie' && (
          <PieChart
            data={distributionData}
            index="name"
            category="value"
            colors={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]}
            className="h-full"
          />
        )}
      </div>
    </Card>
  );
};

export default InteractiveChart;
