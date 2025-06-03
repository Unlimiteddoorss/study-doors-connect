
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Building2, 
  TrendingUp,
  UserCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { realApplicationsService } from '@/services/realApplicationsService';
import { realUniversitiesService } from '@/services/realUniversitiesService';

// Import the enhanced components
import EnhancedStatsCard from '@/components/admin/EnhancedStatsCard';
import QuickActionsWidget from '@/components/admin/QuickActionsWidget';
import RecentActivityFeed from '@/components/admin/RecentActivityFeed';
import SystemHealthWidget from '@/components/admin/SystemHealthWidget';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { RecentApplications } from '@/components/admin/RecentApplications';

interface DashboardStats {
  totalStudents: number;
  totalApplications: number;
  totalUniversities: number;
  totalPrograms: number;
  pendingApplications: number;
  underReviewApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  thisMonth: number;
  thisWeek: number;
}

const EnhancedDashboard = () => {
  const { toast } = useToast();
  const { handleAsyncError, logInfo, logError } = useErrorHandler();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalApplications: 0,
    totalUniversities: 0,
    totalPrograms: 0,
    pendingApplications: 0,
    underReviewApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    thisMonth: 0,
    thisWeek: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const result = await handleAsyncError(async () => {
      setIsLoading(true);
      
      // جلب إحصائيات الطلبات
      const [applicationsStats, universitiesStats] = await Promise.all([
        realApplicationsService.getApplicationsStats(),
        realUniversitiesService.getUniversitiesStats()
      ]);

      const calculatedStats: DashboardStats = {
        totalStudents: universitiesStats.applicationStats?.thisMonth || 0, // تقريب مؤقت
        totalApplications: applicationsStats.total,
        totalUniversities: universitiesStats.totalUniversities,
        totalPrograms: universitiesStats.totalPrograms,
        pendingApplications: applicationsStats.pending,
        underReviewApplications: applicationsStats.underReview || 0,
        approvedApplications: applicationsStats.approved,
        rejectedApplications: applicationsStats.rejected,
        thisMonth: applicationsStats.thisMonth,
        thisWeek: applicationsStats.thisWeek
      };

      setStats(calculatedStats);
      setLastUpdated(new Date());
      
      logInfo('تم تحديث إحصائيات لوحة التحكم بالبيانات الحقيقية', calculatedStats);
    }, "خطأ في جلب بيانات لوحة التحكم");

    if (result !== null) {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await fetchDashboardData();
    toast({
      title: "تم التحديث",
      description: "تم تحديث بيانات لوحة التحكم بنجاح"
    });
  };

  const statsCards = [
    {
      title: 'إجمالي الطلبات',
      value: stats.totalApplications,
      change: { value: stats.thisWeek, type: 'increase' as const, period: 'هذا الأسبوع' },
      icon: <FileText className="h-4 w-4" />,
      description: 'جميع الطلبات المقدمة',
      color: 'blue' as const
    },
    {
      title: 'طلبات قيد الانتظار',
      value: stats.pendingApplications,
      change: { value: Math.round(stats.pendingApplications / Math.max(stats.totalApplications, 1) * 100), type: 'neutral' as const, period: 'من الإجمالي' },
      icon: <Clock className="h-4 w-4" />,
      description: 'تحتاج إلى مراجعة',
      color: 'yellow' as const
    },
    {
      title: 'طلبات مقبولة',
      value: stats.approvedApplications,
      change: { value: Math.round(stats.approvedApplications / Math.max(stats.totalApplications, 1) * 100), type: 'increase' as const, period: 'معدل القبول' },
      icon: <CheckCircle className="h-4 w-4" />,
      description: 'تم قبولها بنجاح',
      color: 'green' as const
    },
    {
      title: 'إجمالي الجامعات',
      value: stats.totalUniversities,
      change: { value: 5, type: 'increase' as const, period: 'جامعات جديدة' },
      icon: <Building2 className="h-4 w-4" />,
      description: 'جامعات نشطة',
      color: 'purple' as const
    },
    {
      title: 'البرامج المتاحة',
      value: stats.totalPrograms,
      change: { value: Math.round(stats.totalPrograms / Math.max(stats.totalUniversities, 1)), type: 'neutral' as const, period: 'برامج لكل جامعة' },
      icon: <Users className="h-4 w-4" />,
      description: 'برامج دراسية متنوعة',
      color: 'blue' as const
    },
    {
      title: 'هذا الشهر',
      value: stats.thisMonth,
      change: { value: stats.thisWeek, type: 'increase' as const, period: 'هذا الأسبوع' },
      icon: <TrendingUp className="h-4 w-4" />,
      description: 'طلبات جديدة',
      color: 'green' as const
    }
  ];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">
              لوحة التحكم المتقدمة
            </h1>
            <p className="text-unlimited-gray mt-2">
              مرحباً بك في لوحة التحكم المحسنة - آخر تحديث: {lastUpdated.toLocaleTimeString('ar-SA')}
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث البيانات
          </Button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((card, index) => (
            <EnhancedStatsCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              icon={card.icon}
              description={card.description}
              color={card.color}
              loading={isLoading}
            />
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="applications">الطلبات</TabsTrigger>
            <TabsTrigger value="system">النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActionsWidget />
              <RecentActivityFeed />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <RecentApplications />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SystemHealthWidget />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-unlimited-blue" />
                    إحصائيات الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">الطلبات النشطة</span>
                      <span className="font-bold text-green-600">
                        {stats.pendingApplications + stats.underReviewApplications}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">معدل القبول</span>
                      <span className="font-bold text-blue-600">
                        {stats.totalApplications > 0 
                          ? Math.round((stats.approvedApplications / stats.totalApplications) * 100)
                          : 0}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">متوسط البرامج</span>
                      <span className="font-bold text-purple-600">
                        {stats.totalUniversities > 0 
                          ? Math.round(stats.totalPrograms / stats.totalUniversities)
                          : 0} برنامج/جامعة
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">النمو الشهري</span>
                      <span className="font-bold text-yellow-600">
                        +{stats.thisMonth} طلب
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedDashboard;
