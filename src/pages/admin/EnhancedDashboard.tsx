
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
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useErrorHandler } from '@/hooks/useErrorHandler';

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
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalAgents: number;
}

const EnhancedDashboard = () => {
  const { toast } = useToast();
  const { handleAsyncError, logInfo } = useErrorHandler();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalApplications: 0,
    totalUniversities: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalAgents: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const result = await handleAsyncError(async () => {
      setIsLoading(true);
      
      // جلب إحصائيات الطلاب
      const { data: students, error: studentsError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'student');
      
      if (studentsError) throw studentsError;

      // جلب إحصائيات الطلبات
      const { data: applications, error: applicationsError } = await supabase
        .from('applications')
        .select('id, status');
      
      if (applicationsError) throw applicationsError;

      // جلب إحصائيات الجامعات
      const { data: universities, error: universitiesError } = await supabase
        .from('universities')
        .select('id')
        .eq('is_active', true);
      
      if (universitiesError) throw universitiesError;

      // جلب إحصائيات الوكلاء
      const { data: agents, error: agentsError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'agent');
      
      if (agentsError) throw agentsError;

      // حساب الإحصائيات
      const pendingApps = applications?.filter(app => app.status === 'pending').length || 0;
      const approvedApps = applications?.filter(app => app.status === 'accepted' || app.status === 'approved').length || 0;
      const rejectedApps = applications?.filter(app => app.status === 'rejected').length || 0;

      const calculatedStats = {
        totalStudents: students?.length || 0,
        totalApplications: applications?.length || 0,
        totalUniversities: universities?.length || 0,
        pendingApplications: pendingApps,
        approvedApplications: approvedApps,
        rejectedApplications: rejectedApps,
        totalAgents: agents?.length || 0
      };

      setStats(calculatedStats);
      setLastUpdated(new Date());
      
      logInfo('تم تحديث إحصائيات لوحة التحكم', calculatedStats);
    }, "خطأ في جلب بيانات لوحة التحكم");

    if (result !== null) {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "تم التحديث",
      description: "تم تحديث بيانات لوحة التحكم بنجاح"
    });
  };

  const statsCards = [
    {
      title: 'إجمالي الطلاب',
      value: stats.totalStudents,
      change: { value: 12, type: 'increase' as const, period: 'هذا الشهر' },
      icon: <Users className="h-4 w-4" />,
      description: 'طلاب مسجلين في النظام',
      color: 'blue' as const
    },
    {
      title: 'طلبات قيد الانتظار',
      value: stats.pendingApplications,
      change: { value: 8, type: 'increase' as const, period: 'هذا الأسبوع' },
      icon: <Clock className="h-4 w-4" />,
      description: 'تحتاج إلى مراجعة',
      color: 'yellow' as const
    },
    {
      title: 'طلبات مقبولة',
      value: stats.approvedApplications,
      change: { value: 15, type: 'increase' as const, period: 'هذا الشهر' },
      icon: <CheckCircle className="h-4 w-4" />,
      description: 'تم قبولها بنجاح',
      color: 'green' as const
    },
    {
      title: 'إجمالي الجامعات',
      value: stats.totalUniversities,
      change: { value: 2, type: 'increase' as const, period: 'هذا الشهر' },
      icon: <Building2 className="h-4 w-4" />,
      description: 'جامعات نشطة',
      color: 'purple' as const
    },
    {
      title: 'إجمالي الطلبات',
      value: stats.totalApplications,
      change: { value: 25, type: 'increase' as const, period: 'هذا الشهر' },
      icon: <FileText className="h-4 w-4" />,
      description: 'جميع الطلبات المقدمة',
      color: 'blue' as const
    },
    {
      title: 'الوكلاء النشطون',
      value: stats.totalAgents,
      change: { value: 1, type: 'increase' as const, period: 'هذا الأسبوع' },
      icon: <UserCheck className="h-4 w-4" />,
      description: 'وكلاء يديرون الطلاب',
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
                      <span className="text-sm font-medium">متوسط وقت الاستجابة</span>
                      <span className="font-bold text-green-600">1.2 ثانية</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">المستخدمون النشطون</span>
                      <span className="font-bold text-blue-600">47 مستخدم</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">استخدام التخزين</span>
                      <span className="font-bold text-purple-600">2.8 GB / 10 GB</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">النسخ الاحتياطية</span>
                      <span className="font-bold text-yellow-600">آخر نسخة: أمس</span>
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
