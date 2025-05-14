
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/donut-chart';
import { LineChart, BarChart } from '@/components/ui/chart';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Download, Share2, RefreshCw } from 'lucide-react';

interface InformationDashboardProps {
  className?: string;
}

const InformationDashboard: React.FC<InformationDashboardProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const statusData = [
    { name: t('dashboard.stats.pending'), value: 35 },
    { name: t('dashboard.stats.inProgress'), value: 25 },
    { name: t('dashboard.stats.completed'), value: 30 },
    { name: t('dashboard.stats.rejected'), value: 10 },
  ];

  const performanceData = [
    { month: 'Jan', applications: 10, acceptances: 5 },
    { month: 'Feb', applications: 15, acceptances: 8 },
    { month: 'Mar', applications: 20, acceptances: 12 },
    { month: 'Apr', applications: 25, acceptances: 15 },
    { month: 'May', applications: 30, acceptances: 22 },
    { month: 'Jun', applications: 35, acceptances: 25 },
  ];

  const universityData = [
    { name: 'Istanbul University', students: 120 },
    { name: 'Ankara University', students: 90 },
    { name: 'Izmir University', students: 70 },
    { name: 'Bursa University', students: 50 },
    { name: 'Antalya University', students: 40 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('admin.dashboard.analyticsOverview')}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            {t('refresh')}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            {t('share')}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            {t('export')}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="performance">{t('admin.dashboard.tabs.performance')}</TabsTrigger>
          <TabsTrigger value="universities">{t('admin.dashboard.tabs.universities')}</TabsTrigger>
          <TabsTrigger value="students">{t('admin.dashboard.tabs.students')}</TabsTrigger>
          <TabsTrigger value="calendar">{t('admin.dashboard.tabs.calendar')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div 
              className="lg:col-span-2"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.applicationPerformance')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.applicationPerformanceDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={performanceData}
                      index="month"
                      categories={["applications", "acceptances"]}
                      colors={["#3498db", "#2ecc71"]}
                      valueFormatter={(value: number) => `${value}`}
                      className="h-72"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-unlimited-gray border-t pt-4">
                  <div>
                    {t('admin.dashboard.totalApplications')}: <span className="font-bold text-unlimited-dark-blue">135</span>
                  </div>
                  <div>
                    {t('admin.dashboard.acceptanceRate')}: <span className="font-bold text-unlimited-success">64%</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.applicationStatus')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.applicationStatusDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <DonutChart 
                    data={statusData} 
                    colors={["#3498db", "#f1c40f", "#2ecc71", "#e74c3c"]}
                    label={
                      <div className="text-center">
                        <p className="text-3xl font-bold">100</p>
                        <p className="text-sm text-unlimited-gray">{t('admin.dashboard.total')}</p>
                      </div>
                    }
                  />
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-unlimited-gray border-t pt-4">
                  <div>
                    {t('admin.dashboard.updated')}: <span className="font-semibold">1 {t('time.hourAgo')}</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="universities">
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.dashboard.topUniversities')}</CardTitle>
                <CardDescription>{t('admin.dashboard.topUniversitiesDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart
                    data={universityData}
                    index="name"
                    categories={["students"]}
                    colors={["#9b59b6"]}
                    valueFormatter={(value: number) => `${value}`}
                    className="h-72"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="students">
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.dashboard.studentStats')}</CardTitle>
                <CardDescription>{t('admin.dashboard.studentStatsDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-unlimited-gray">{t('admin.dashboard.studentStatsContent')}</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.dashboard.eventCalendar')}</CardTitle>
                <CardDescription>{t('admin.dashboard.eventCalendarDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InformationDashboard;
