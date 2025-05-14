
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  BarChart, 
  LineChart 
} from '@/components/ui/chart';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  RefreshCw, 
  Upload, 
  Download,
  BarChart3,
  PieChart
} from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface InformationDashboardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const InformationDashboard: React.FC<InformationDashboardProps> = ({ 
  title = 'لوحة المعلومات',
  subtitle = 'تابع أحدث الإحصائيات والبيانات',
  className = ''
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const locale = isRtl ? ar : enUS;
  
  const [activeTimeframe, setActiveTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample data
  const performanceData = {
    day: [
      { hour: '00:00', value: 10 },
      { hour: '03:00', value: 5 },
      { hour: '06:00', value: 8 },
      { hour: '09:00', value: 25 },
      { hour: '12:00', value: 35 },
      { hour: '15:00', value: 40 },
      { hour: '18:00', value: 30 },
      { hour: '21:00', value: 20 },
    ],
    week: [
      { day: isRtl ? 'الأحد' : 'Sun', value: 45 },
      { day: isRtl ? 'الاثنين' : 'Mon', value: 52 },
      { day: isRtl ? 'الثلاثاء' : 'Tue', value: 48 },
      { day: isRtl ? 'الأربعاء' : 'Wed', value: 61 },
      { day: isRtl ? 'الخميس' : 'Thu', value: 55 },
      { day: isRtl ? 'الجمعة' : 'Fri', value: 32 },
      { day: isRtl ? 'السبت' : 'Sat', value: 40 },
    ],
    month: Array.from({ length: 30 }, (_, i) => ({
      date: i + 1,
      value: Math.floor(Math.random() * 80) + 20,
    })),
    year: [
      { month: isRtl ? 'يناير' : 'Jan', value: 420 },
      { month: isRtl ? 'فبراير' : 'Feb', value: 380 },
      { month: isRtl ? 'مارس' : 'Mar', value: 450 },
      { month: isRtl ? 'أبريل' : 'Apr', value: 520 },
      { month: isRtl ? 'مايو' : 'May', value: 480 },
      { month: isRtl ? 'يونيو' : 'Jun', value: 570 },
      { month: isRtl ? 'يوليو' : 'Jul', value: 610 },
      { month: isRtl ? 'أغسطس' : 'Aug', value: 590 },
      { month: isRtl ? 'سبتمبر' : 'Sep', value: 620 },
      { month: isRtl ? 'أكتوبر' : 'Oct', value: 670 },
      { month: isRtl ? 'نوفمبر' : 'Nov', value: 650 },
      { month: isRtl ? 'ديسمبر' : 'Dec', value: 630 },
    ],
  };
  
  const conversionData = {
    week: [
      { day: isRtl ? 'الأحد' : 'Sun', visits: 120, conversions: 22 },
      { day: isRtl ? 'الاثنين' : 'Mon', visits: 140, conversions: 25 },
      { day: isRtl ? 'الثلاثاء' : 'Tue', visits: 130, conversions: 28 },
      { day: isRtl ? 'الأربعاء' : 'Wed', visits: 160, conversions: 35 },
      { day: isRtl ? 'الخميس' : 'Thu', visits: 150, conversions: 32 },
      { day: isRtl ? 'الجمعة' : 'Fri', visits: 90, conversions: 15 },
      { day: isRtl ? 'السبت' : 'Sat', visits: 110, conversions: 20 },
    ],
  };
  
  const getTimeframeLabel = () => {
    switch (activeTimeframe) {
      case 'day':
        return format(currentDate, 'eeee, d MMMM yyyy', { locale });
      case 'week':
        const weekStart = format(currentDate, 'd MMM', { locale });
        const weekEnd = format(addDays(currentDate, 6), 'd MMM', { locale });
        return `${weekStart} - ${weekEnd}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale });
      case 'year':
        return format(currentDate, 'yyyy', { locale });
      default:
        return '';
    }
  };
  
  const handlePrevious = () => {
    switch (activeTimeframe) {
      case 'day':
        setCurrentDate(subDays(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(subDays(currentDate, 7));
        break;
      case 'month':
        const prevMonth = new Date(currentDate);
        prevMonth.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(prevMonth);
        break;
      case 'year':
        const prevYear = new Date(currentDate);
        prevYear.setFullYear(currentDate.getFullYear() - 1);
        setCurrentDate(prevYear);
        break;
    }
  };
  
  const handleNext = () => {
    switch (activeTimeframe) {
      case 'day':
        setCurrentDate(addDays(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(addDays(currentDate, 7));
        break;
      case 'month':
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(nextMonth);
        break;
      case 'year':
        const nextYear = new Date(currentDate);
        nextYear.setFullYear(currentDate.getFullYear() + 1);
        setCurrentDate(nextYear);
        break;
    }
  };
  
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-unlimited-dark-blue">{title}</h2>
          <p className="text-unlimited-gray text-sm">{subtitle}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <div className="flex items-center bg-gray-100 rounded-md">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-unlimited-gray h-8"
              onClick={handlePrevious}
            >
              {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            </Button>
            <span className="px-3 flex items-center text-sm">
              <Calendar className="h-3.5 w-3.5 mr-2 text-unlimited-gray" />
              {getTimeframeLabel()}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-unlimited-gray h-8"
              onClick={handleNext}
            >
              {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={refreshData}
              disabled={isLoading}
              className="h-8"
            >
              <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
              {t('dashboard.refresh')}
            </Button>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Upload className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="performance">{t('dashboard.performance')}</TabsTrigger>
            <TabsTrigger value="conversions">{t('dashboard.conversions')}</TabsTrigger>
            <TabsTrigger value="trends">{t('dashboard.trends')}</TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-unlimited-dark-blue font-medium">
                {t('dashboard.timeframeView')}
              </h3>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button 
                  variant={activeTimeframe === 'day' ? 'unlimited' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTimeframe('day')}
                  className="text-xs h-8"
                >
                  {t('dashboard.daily')}
                </Button>
                <Button 
                  variant={activeTimeframe === 'week' ? 'unlimited' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTimeframe('week')}
                  className="text-xs h-8"
                >
                  {t('dashboard.weekly')}
                </Button>
                <Button 
                  variant={activeTimeframe === 'month' ? 'unlimited' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTimeframe('month')}
                  className="text-xs h-8"
                >
                  {t('dashboard.monthly')}
                </Button>
                <Button 
                  variant={activeTimeframe === 'year' ? 'unlimited' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTimeframe('year')}
                  className="text-xs h-8"
                >
                  {t('dashboard.yearly')}
                </Button>
              </div>
            </div>
            
            <TabsContent value="performance" className="mt-0">
              <div className="p-2">
                <AreaChart
                  data={performanceData[activeTimeframe]}
                  index={activeTimeframe === 'day' ? 'hour' : activeTimeframe === 'week' ? 'day' : activeTimeframe === 'month' ? 'date' : 'month'}
                  categories={['value']}
                  colors={['blue']}
                  valueFormatter={(value) => `${value}`}
                  className="aspect-[4/2] w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-unlimited-gray text-sm mb-1.5">{t('dashboard.totalVisits')}</div>
                  <div className="text-2xl font-bold text-unlimited-dark-blue">1,245</div>
                  <div className="flex items-center mt-1 text-xs">
                    <span className="text-unlimited-success">+12.5%</span>
                    <span className="text-unlimited-gray ml-2">{t('dashboard.vsLastPeriod')}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-unlimited-gray text-sm mb-1.5">{t('dashboard.conversions')}</div>
                  <div className="text-2xl font-bold text-unlimited-dark-blue">245</div>
                  <div className="flex items-center mt-1 text-xs">
                    <span className="text-unlimited-success">+8.2%</span>
                    <span className="text-unlimited-gray ml-2">{t('dashboard.vsLastPeriod')}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-unlimited-gray text-sm mb-1.5">{t('dashboard.conversionRate')}</div>
                  <div className="text-2xl font-bold text-unlimited-dark-blue">19.7%</div>
                  <div className="flex items-center mt-1 text-xs">
                    <span className="text-unlimited-danger">-2.1%</span>
                    <span className="text-unlimited-gray ml-2">{t('dashboard.vsLastPeriod')}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-unlimited-gray text-sm mb-1.5">{t('dashboard.avgValue')}</div>
                  <div className="text-2xl font-bold text-unlimited-dark-blue">$128</div>
                  <div className="flex items-center mt-1 text-xs">
                    <span className="text-unlimited-success">+5.3%</span>
                    <span className="text-unlimited-gray ml-2">{t('dashboard.vsLastPeriod')}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="conversions" className="mt-0">
              <div className="p-2">
                <BarChart
                  data={conversionData.week}
                  index="day"
                  categories={['visits', 'conversions']}
                  colors={['blue', 'green']}
                  valueFormatter={(value) => `${value}`}
                  className="aspect-[4/2] w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card className="bg-blue-50 border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-600">{t('dashboard.conversionRate')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-unlimited-dark-blue">19.7%</div>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-unlimited-success">+2.5%</span>
                      <span className="text-unlimited-gray ml-2">{t('dashboard.vsLastWeek')}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-600">{t('dashboard.avgTimeToConvert')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-unlimited-dark-blue">2.5 {t('dashboard.days')}</div>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-unlimited-success">-0.5 {t('dashboard.days')}</span>
                      <span className="text-unlimited-gray ml-2">{t('dashboard.vsLastWeek')}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-600">{t('dashboard.topChannel')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-unlimited-dark-blue">{t('dashboard.direct')}</div>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-unlimited-gray">42% {t('dashboard.ofConversions')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-unlimited-dark-blue">
                      {t('dashboard.conversionTrend')}
                    </h3>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      {t('dashboard.viewReport')}
                    </Button>
                  </div>
                  <LineChart
                    data={[
                      { month: 'Jan', conversion: 65 },
                      { month: 'Feb', conversion: 72 },
                      { month: 'Mar', conversion: 68 },
                      { month: 'Apr', conversion: 78 },
                      { month: 'May', conversion: 82 },
                      { month: 'Jun', conversion: 75 }
                    ]}
                    index="month"
                    categories={['conversion']}
                    colors={['blue']}
                    valueFormatter={(value) => `${value}`}
                    className="aspect-[4/3]"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-unlimited-dark-blue">
                      {t('dashboard.channelDistribution')}
                    </h3>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <PieChart className="h-3 w-3 mr-1" />
                      {t('dashboard.viewDetails')}
                    </Button>
                  </div>
                  <div className="aspect-[4/3] flex items-center justify-center">
                    <div className="text-center text-unlimited-gray">
                      {t('dashboard.chartPlaceholder')}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default InformationDashboard;
