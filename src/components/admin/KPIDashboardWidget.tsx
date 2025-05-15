
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  BarChart
} from '@/components/ui/chart';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Percent, Users, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KPIWidgetProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const KPIDashboardWidget: React.FC<KPIWidgetProps> = ({ 
  title = 'مؤشرات الأداء الرئيسية',
  subtitle = 'ملخص الإحصائيات وأداء النظام',
  className = ''
}) => {
  const { t } = useTranslation();
  
  // بيانات نمو الطلاب
  const studentGrowthData = [
    { month: 'يناير', students: 180 },
    { month: 'فبراير', students: 220 },
    { month: 'مارس', students: 275 },
    { month: 'أبريل', students: 310 },
    { month: 'مايو', students: 350 },
    { month: 'يونيو', students: 430 },
  ];
  
  // بيانات معدلات التحويل
  const conversionRatesData = [
    { category: 'بكالوريوس', rate: 24 },
    { category: 'ماجستير', rate: 18 },
    { category: 'دكتوراه', rate: 12 },
    { category: 'دبلوم', rate: 15 }
  ];
  
  // بيانات المؤشرات
  const kpiData = [
    {
      title: 'نسبة التحويل',
      value: '24.8%',
      change: 2.5,
      positive: true,
      icon: <Percent className="h-5 w-5" />,
      color: 'bg-green-500/10 text-green-500'
    },
    {
      title: 'الطلبات الجديدة',
      value: '128',
      change: 12.2,
      positive: true,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: 'متوسط قيمة الطلب',
      value: '$4,320',
      change: 1.8,
      positive: false,
      icon: <Wallet className="h-5 w-5" />,
      color: 'bg-purple-500/10 text-purple-500'
    },
    {
      title: 'الطلاب الجدد',
      value: '64',
      change: 8.4,
      positive: true,
      icon: <Users className="h-5 w-5" />,
      color: 'bg-amber-500/10 text-amber-500'
    }
  ];

  // متغيرات الرسوم المتحركة
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

  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-unlimited-dark-blue">{title}</h2>
          <p className="text-unlimited-gray text-sm">{subtitle}</p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          {t('dashboard.viewAllMetrics', 'عرض كل المؤشرات')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-full ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <div className={`flex items-center ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.positive ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs">{kpi.change}%</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-unlimited-gray text-sm mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-unlimited-dark-blue">{kpi.value}</h3>
              </div>
            </CardContent>
            <div className={`h-1 w-full ${kpi.positive ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </Card>
        ))}
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">{t('dashboard.studentGrowth', 'نمو الطلاب')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-unlimited-gray text-sm">{t('dashboard.averageGrowth', 'متوسط النمو')}</p>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-unlimited-dark-blue">+24.5%</h3>
                    <span className="text-green-500 text-xs flex items-center ml-2">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      8.2%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-unlimited-gray text-sm">{t('dashboard.totalStudents', 'إجمالي الطلاب')}</p>
                  <h3 className="text-xl font-bold text-unlimited-dark-blue">1,842</h3>
                </div>
              </div>
              <LineChart
                data={studentGrowthData}
                index="month"
                categories={["students"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value}`}
                className="h-52"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">{t('dashboard.conversionByProgram', 'معدل التحويل حسب البرنامج')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-unlimited-gray text-sm">{t('dashboard.averageRate', 'المتوسط الإجمالي')}</p>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-unlimited-dark-blue">18.2%</h3>
                    <span className="text-green-500 text-xs flex items-center ml-2">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      3.1%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-unlimited-gray text-sm">{t('dashboard.bestPerformer', 'الأفضل أداء')}</p>
                  <h3 className="text-xl font-bold text-unlimited-blue">{t('dashboard.bachelor', 'بكالوريوس')}</h3>
                </div>
              </div>
              <BarChart
                data={conversionRatesData}
                index="category"
                categories={["rate"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value}%`}
                className="h-52"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default KPIDashboardWidget;
