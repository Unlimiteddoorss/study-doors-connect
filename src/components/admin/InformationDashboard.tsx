
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart } from '@/components/ui/chart';
import { DonutChart } from '@/components/ui/donut-chart';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Download, Calendar, Filter, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';

const InformationDashboard = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({});
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // بيانات مثال للرسوم البيانية
  const performanceData = [
    { month: "Jan", applications: 340, accepted: 120 },
    { month: "Feb", applications: 385, accepted: 148 },
    { month: "Mar", applications: 450, accepted: 190 },
    { month: "Apr", applications: 410, accepted: 210 },
    { month: "May", applications: 480, accepted: 250 },
    { month: "Jun", applications: 520, accepted: 290 },
    { month: "Jul", applications: 490, accepted: 270 },
    { month: "Aug", applications: 550, accepted: 310 },
    { month: "Sep", applications: 600, accepted: 350 },
  ];

  const applicationsStatusData = [
    { name: 'قيد المراجعة', value: 45 },
    { name: 'مقبول', value: 30 },
    { name: 'مكتمل', value: 20 },
    { name: 'مرفوض', value: 5 },
  ];

  const universityPopularityData = [
    { name: 'جامعة إسطنبول', value: 42 },
    { name: 'جامعة أنقرة', value: 28 },
    { name: 'جامعة البوسفور', value: 18 },
    { name: 'جامعة بهتشه شهير', value: 12 },
  ];

  const formatValue = (value: number) => `${value}`;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.dashboard.informationCenter')}</h2>
          <p className="text-muted-foreground">{t('admin.dashboard.systemPerformance')}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <DatePickerWithRange 
            onChange={range => setDateRange(range as { from?: Date; to?: Date })}
            className="w-auto"
          />
          
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            {t('admin.filters')}
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('admin.exportData')}
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">{t('admin.dashboard.overview')}</TabsTrigger>
            <TabsTrigger value="applications">{t('admin.dashboard.applications')}</TabsTrigger>
            <TabsTrigger value="universities">{t('admin.dashboard.universities')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t('admin.dashboard.systemPerformance')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.lastNineMonths')}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-unlimited-light-blue/10 text-unlimited-blue">
                    +24% {t('admin.dashboard.fromLastYear')}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={performanceData}
                      index="month"
                      categories={["applications", "accepted"]}
                      colors={["#3498db", "#2ecc71"]}
                      valueFormatter={formatValue}
                      className="h-72"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.applicationStatus')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.currentDistribution')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <DonutChart
                      data={applicationsStatusData}
                      animationEnabled={true}
                      showLabel={true}
                      colors={["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"]}
                      label={
                        <div className="text-center">
                          <p className="text-3xl font-bold">100</p>
                          <p className="text-sm text-unlimited-gray">{t('admin.dashboard.totalApplications')}</p>
                        </div>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.universityPopularity')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.mostRequestedUniversities')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <DonutChart
                      data={universityPopularityData}
                      animationEnabled={true}
                      showLabel={true}
                      colors={["#9b59b6", "#3498db", "#2ecc71", "#f1c40f"]}
                      label={
                        <div className="text-center">
                          <p className="text-3xl font-bold">100</p>
                          <p className="text-sm text-unlimited-gray">{t('admin.dashboard.totalRequests')}</p>
                        </div>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t('admin.dashboard.recentActivities')}</CardTitle>
                    <CardDescription>{t('admin.dashboard.lastActions')}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    {t('admin.viewAll')}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          i % 4 === 0 ? 'bg-red-100 text-red-600' :
                          i % 3 === 0 ? 'bg-purple-100 text-purple-600' :
                          i % 2 === 0 ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <span className="font-bold">{i}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            {i % 4 === 0 ? t('admin.dashboard.applicationRejected') :
                            i % 3 === 0 ? t('admin.dashboard.newStudentRegistered') :
                            i % 2 === 0 ? t('admin.dashboard.documentVerified') :
                            t('admin.dashboard.paymentReceived')}
                          </h4>
                          <p className="text-sm text-unlimited-gray">{t('admin.dashboard.minutesAgo', { minutes: i * 5 })}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${i % 4 === 0 ? 'bg-red-50 border-red-200 text-red-600' :
                              i % 3 === 0 ? 'bg-purple-50 border-purple-200 text-purple-600' :
                              i % 2 === 0 ? 'bg-green-50 border-green-200 text-green-600' :
                              'bg-blue-50 border-blue-200 text-blue-600'}
                          `}
                        >
                          {i % 4 === 0 ? t('admin.dashboard.critical') :
                          i % 3 === 0 ? t('admin.dashboard.info') :
                          i % 2 === 0 ? t('admin.dashboard.success') :
                          t('admin.dashboard.pending')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="applications">
            <div className="flex flex-col space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.applicationDetails')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.applicationStatsDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-unlimited-gray">{t('admin.dashboard.applicationContentPlaceholder')}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="universities">
            <div className="flex flex-col space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.universityDetails')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.universityStatsDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-unlimited-gray">{t('admin.dashboard.universityContentPlaceholder')}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default InformationDashboard;
