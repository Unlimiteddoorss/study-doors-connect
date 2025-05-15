
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUp,
  ArrowDown,
  UserPlus,
  GraduationCap,
  FileText,
  Calendar,
  CreditCard,
  ChevronDown,
  Filter,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart } from '@/components/ui/chart';
import { DonutChart } from '@/components/ui/donut-chart';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DateRangeSelector from './DateRangeSelector';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface AnalyticsDashboardProps {
  periodFilter: 'day' | 'week' | 'month' | 'year';
  onPeriodChange: (period: 'day' | 'week' | 'month' | 'year') => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  periodFilter = 'month',
  onPeriodChange
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [dataType, setDataType] = useState<'students' | 'applications' | 'revenue'>('applications');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // بيانات المخططات
  const analyticsData = {
    students: [
      { month: 'يناير', value: 42 },
      { month: 'فبراير', value: 63 },
      { month: 'مارس', value: 52 },
      { month: 'أبريل', value: 73 },
      { month: 'مايو', value: 85 },
      { month: 'يونيو', value: 110 },
      { month: 'يوليو', value: 120 },
    ],
    applications: [
      { month: 'يناير', value: 65 },
      { month: 'فبراير', value: 85 },
      { month: 'مارس', value: 73 },
      { month: 'أبريل', value: 98 },
      { month: 'مايو', value: 112 },
      { month: 'يونيو', value: 140 },
      { month: 'يوليو', value: 168 },
    ],
    revenue: [
      { month: 'يناير', value: 12500 },
      { month: 'فبراير', value: 18200 },
      { month: 'مارس', value: 16400 },
      { month: 'أبريل', value: 21300 },
      { month: 'مايو', value: 24800 },
      { month: 'يونيو', value: 32100 },
      { month: 'يوليو', value: 36400 },
    ],
  };

  const programData = [
    { program: 'هندسة', value: 32 },
    { program: 'طب', value: 24 },
    { program: 'علوم حاسب', value: 18 },
    { program: 'إدارة أعمال', value: 14 },
    { program: 'أخرى', value: 12 },
  ];

  const countryData = [
    { country: 'تركيا', students: 45 },
    { country: 'قبرص', students: 18 },
    { country: 'ماليزيا', students: 12 },
    { country: 'المجر', students: 8 },
    { country: 'بولندا', students: 6 },
    { country: 'أخرى', students: 11 },
  ];
  
  const conversionData = [
    { stage: 'استعلام', value: 100 },
    { stage: 'تسجيل', value: 75 },
    { stage: 'تقديم مستندات', value: 48 },
    { stage: 'دراسة الطلب', value: 42 },
    { stage: 'قبول', value: 35 },
    { stage: 'تسجيل نهائي', value: 28 },
  ];

  const getDataTitle = () => {
    switch(dataType) {
      case 'students':
        return t('admin.analytics.newStudents', 'الطلاب الجدد');
      case 'applications':
        return t('admin.analytics.applications', 'الطلبات');
      case 'revenue':
        return t('admin.analytics.revenue', 'الإيرادات');
      default:
        return '';
    }
  };

  const getDataFormatter = () => {
    switch(dataType) {
      case 'revenue':
        return (value: number) => `$${value}`;
      default:
        return (value: number) => `${value}`;
    }
  };

  const handleDataTypeChange = (value: 'students' | 'applications' | 'revenue') => {
    setDataType(value);
  };

  const handleDownloadReport = () => {
    toast({
      title: t('admin.analytics.reportDownloaded', 'تم تنزيل التقرير'),
      description: t('admin.analytics.reportDownloadedDesc', 'تم تنزيل تقرير التحليلات بنجاح'),
    });
  };

  // Handler for date range changes
  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    console.log('Date range changed:', range);
    // Here you would typically update the data based on the new date range
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Select 
            value={dataType} 
            onValueChange={(value: any) => handleDataTypeChange(value)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('admin.analytics.dataType', 'نوع البيانات')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="students">{t('admin.analytics.students', 'الطلاب')}</SelectItem>
              <SelectItem value="applications">{t('admin.analytics.applications', 'الطلبات')}</SelectItem>
              <SelectItem value="revenue">{t('admin.analytics.revenue', 'الإيرادات')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={periodFilter} 
            onValueChange={(value: any) => onPeriodChange(value)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('admin.analytics.period', 'الفترة')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{t('admin.analytics.day', 'اليوم')}</SelectItem>
              <SelectItem value="week">{t('admin.analytics.week', 'الأسبوع')}</SelectItem>
              <SelectItem value="month">{t('admin.analytics.month', 'الشهر')}</SelectItem>
              <SelectItem value="year">{t('admin.analytics.year', 'السنة')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4 mr-1" />
                {t('admin.analytics.filter', 'تصفية')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('admin.analytics.filterOptions', 'خيارات التصفية')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t('admin.analytics.byCountry', 'حسب الدولة')}</DropdownMenuItem>
              <DropdownMenuItem>{t('admin.analytics.byProgram', 'حسب البرنامج')}</DropdownMenuItem>
              <DropdownMenuItem>{t('admin.analytics.byUniversity', 'حسب الجامعة')}</DropdownMenuItem>
              <DropdownMenuItem>{t('admin.analytics.byAgent', 'حسب الوكيل')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" onClick={handleDownloadReport} className="flex items-center gap-1">
            <Download className="h-4 w-4 mr-1" />
            {t('admin.analytics.downloadReport', 'تنزيل التقرير')}
          </Button>
          
          <DateRangeSelector onRangeChange={handleDateRangeChange} />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              <span>{getDataTitle()} - {periodFilter === 'month' ? t('admin.analytics.thisMonth', 'هذا الشهر') : t('admin.analytics.selected', 'المحدد')}</span>
              <span className="text-unlimited-blue">{dataType === 'revenue' ? '+18.2%' : '+23.1%'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={analyticsData[dataType]}
              index="month"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={getDataFormatter()}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t('admin.analytics.byProgram', 'التوزيع حسب البرنامج')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={programData}
              index="program"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value}`}
              className="h-[250px]"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t('admin.analytics.byCountry', 'التوزيع حسب الدولة')}</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={countryData}
              index="country"
              category="students"
              colors={["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#9b59b6", "#1abc9c"]}
              valueFormatter={(value) => `${value} ${t('admin.analytics.students', 'طالب')}`}
              className="h-[250px]"
            />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t('admin.analytics.conversionFunnel', 'معدل التحويل')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={conversionData}
              index="stage"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value}`}
              className="h-[250px]"
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
