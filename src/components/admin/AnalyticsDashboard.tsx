
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, BarChart, PieChart } from '@/components/ui/chart';
import { AdminStatCard } from './AdminStatCard';
import { TrendingUp, Users, GraduationCap, School, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';

interface AnalyticsDashboardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  periodFilter?: 'day' | 'week' | 'month' | 'year';
  onPeriodChange?: (period: 'day' | 'week' | 'month' | 'year') => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  title = 'لوحة التحليلات',
  subtitle = 'تحليلات الأداء والبيانات الإحصائية',
  className = '',
  periodFilter = 'month',
  onPeriodChange
}) => {
  const { t } = useTranslation();
  
  // بيانات المستخدمين الجدد
  const newUsersData = [
    { date: '01/05', students: 18, agents: 2 },
    { date: '02/05', students: 22, agents: 1 },
    { date: '03/05', students: 15, agents: 0 },
    { date: '04/05', students: 24, agents: 3 },
    { date: '05/05', students: 30, agents: 2 },
    { date: '06/05', students: 28, agents: 1 },
    { date: '07/05', students: 32, agents: 4 },
    { date: '08/05', students: 35, agents: 0 },
    { date: '09/05', students: 29, agents: 1 },
    { date: '10/05', students: 26, agents: 2 },
  ];
  
  // بيانات توزيع الطلاب حسب البرنامج
  const programDistributionData = [
    { program: 'بكالوريوس', value: 65 },
    { program: 'ماجستير', value: 25 },
    { program: 'دكتوراه', value: 10 },
    { program: 'دبلوم', value: 15 },
  ];
  
  // بيانات الطلبات الشهرية
  const monthlyApplicationsData = [
    { month: 'يناير', value: 65 },
    { month: 'فبراير', value: 85 },
    { month: 'مارس', value: 110 },
    { month: 'أبريل', value: 95 },
    { month: 'مايو', value: 125 },
  ];

  const handleExportData = () => {
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات التحليلات بنجاح",
    });
  };

  const handleShareReport = () => {
    toast({
      title: "تمت مشاركة التقرير",
      description: "تم إرسال التقرير عبر البريد الإلكتروني",
    });
  };

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

  return (
    <motion.div 
      className={`space-y-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">{title}</h2>
          <p className="text-unlimited-gray">{subtitle}</p>
        </div>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="bg-white border rounded-lg p-1 flex">
            <Button 
              variant={periodFilter === 'day' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onPeriodChange?.('day')}
            >
              {t('admin.analytics.day', 'يوم')}
            </Button>
            <Button 
              variant={periodFilter === 'week' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onPeriodChange?.('week')}
            >
              {t('admin.analytics.week', 'أسبوع')}
            </Button>
            <Button 
              variant={periodFilter === 'month' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onPeriodChange?.('month')}
            >
              {t('admin.analytics.month', 'شهر')}
            </Button>
            <Button 
              variant={periodFilter === 'year' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onPeriodChange?.('year')}
            >
              {t('admin.analytics.year', 'سنة')}
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleExportData}>
            {t('admin.analytics.export', 'تصدير البيانات')}
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleShareReport}>
            {t('admin.analytics.share', 'مشاركة التقرير')}
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="الطلاب الجدد"
          value="128"
          change="+15.2%"
          trend="up"
          icon={<Users className="h-6 w-6" />}
        />
        <AdminStatCard
          title="الطلبات الجديدة"
          value="52"
          change="+8.5%"
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <AdminStatCard
          title="الإشعارات"
          value="18"
          change="-2.4%"
          trend="down"
          icon={<Bell className="h-6 w-6" />}
        />
        <AdminStatCard
          title="البرامج الدراسية"
          value="24"
          change="+4"
          trend="up"
          icon={<GraduationCap className="h-6 w-6" />}
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('admin.analytics.newUsers', 'المستخدمين الجدد')}</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={newUsersData}
              index="date"
              categories={["students", "agents"]}
              colors={["blue", "green"]}
              valueFormatter={(value) => `${value}`}
              className="h-80"
            />
            <div className="flex justify-center mt-4 space-x-6 rtl:space-x-reverse text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>{t('admin.analytics.students', 'الطلاب')}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>{t('admin.analytics.agents', 'الوكلاء')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.analytics.userDistribution', 'توزيع المستخدمين')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <PieChart
                data={programDistributionData}
                index="program"
                categories={["value"]}
                colors={["blue", "cyan", "indigo", "violet"]}
                valueFormatter={(value) => `${value}`}
                className="h-full"
              />
            </div>
            <div className="mt-4">
              <ul className="space-y-2">
                {programDistributionData.map((item, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: index === 0 ? '#3182CE' : index === 1 ? '#06B6D4' : index === 2 ? '#4F46E5' : '#8B5CF6' }}
                      ></div>
                      <span>{item.program}</span>
                    </div>
                    <span className="font-semibold">{item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.analytics.monthlyApplications', 'الطلبات الشهرية')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={monthlyApplicationsData}
              index="month"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value}`}
              className="h-80"
            />
            <div className="mt-4 flex justify-between text-sm text-unlimited-gray">
              <span>{t('admin.analytics.totalApplications', 'إجمالي الطلبات')}: 480</span>
              <span>{t('admin.analytics.averagePerMonth', 'المتوسط الشهري')}: 96</span>
              <span>{t('admin.analytics.trend', 'الاتجاه')}: <span className="text-green-500">+12.4%</span></span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.analytics.topUniversities', 'أفضل الجامعات أداءً')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'جامعة اسطنبول', country: 'تركيا', applications: 86, success: '92%' },
                { name: 'جامعة أنقرة', country: 'تركيا', applications: 74, success: '88%' },
                { name: 'جامعة مانشستر', country: 'بريطانيا', applications: 62, success: '86%' },
                { name: 'جامعة طرابزون', country: 'تركيا', applications: 58, success: '84%' },
                { name: 'جامعة كوالالمبور', country: 'ماليزيا', applications: 45, success: '80%' },
              ].map((university, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-unlimited-blue/10 rounded-full flex items-center justify-center text-unlimited-blue font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{university.name}</div>
                      <div className="text-unlimited-gray text-xs">{university.country}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-semibold">{university.applications}</div>
                    <div className="text-green-500 text-xs">{university.success}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.analytics.topPrograms', 'أفضل البرامج أداءً')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'هندسة الحاسوب', university: 'جامعة اسطنبول', applications: 48, trend: '+15%' },
                { name: 'إدارة الأعمال', university: 'جامعة أنقرة', applications: 42, trend: '+8%' },
                { name: 'علوم الطب', university: 'جامعة مانشستر', applications: 36, trend: '+12%' },
                { name: 'الهندسة المدنية', university: 'جامعة طرابزون', applications: 34, trend: '+5%' },
                { name: 'علوم الحاسوب', university: 'جامعة كوالالمبور', applications: 30, trend: '+10%' },
              ].map((program, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-unlimited-blue/10 rounded-full flex items-center justify-center text-unlimited-blue font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{program.name}</div>
                      <div className="text-unlimited-gray text-xs">{program.university}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-semibold">{program.applications}</div>
                    <div className="text-green-500 text-xs">{program.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
