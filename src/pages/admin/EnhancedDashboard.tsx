
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  GraduationCap, 
  School, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  DollarSign,
  Calendar,
  Globe,
  Activity,
  Bell,
  Download,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnhancedDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalApplications: 0,
    totalUniversities: 0,
    totalPrograms: 0,
    totalAgents: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
    newStudentsThisMonth: 0,
    conversionRate: 0
  });

  const [chartData, setChartData] = useState({
    applicationsChart: [],
    revenueChart: [],
    studentsChart: [],
    universitiesChart: []
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // جلب الإحصائيات الأساسية
      const [
        studentsResult,
        applicationsResult,
        universitiesResult,
        programsResult,
        agentsResult
      ] = await Promise.all([
        supabase.from('user_roles').select('*', { count: 'exact' }).eq('role', 'student'),
        supabase.from('applications').select('*', { count: 'exact' }),
        supabase.from('universities').select('*', { count: 'exact' }).eq('is_active', true),
        supabase.from('programs').select('*', { count: 'exact' }).eq('is_active', true),
        supabase.from('user_roles').select('*', { count: 'exact' }).eq('role', 'agent')
      ]);

      // جلب إحصائيات الطلبات حسب الحالة
      const [pendingApps, approvedApps, rejectedApps] = await Promise.all([
        supabase.from('applications').select('*', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('applications').select('*', { count: 'exact' }).eq('status', 'accepted'),
        supabase.from('applications').select('*', { count: 'exact' }).eq('status', 'rejected')
      ]);

      // إعداد بيانات الرسوم البيانية (بيانات تجريبية)
      const applicationsData = [
        { name: 'يناير', طلبات: 65, مقبول: 45, مرفوض: 10 },
        { name: 'فبراير', طلبات: 78, مقبول: 52, مرفوض: 15 },
        { name: 'مارس', طلبات: 90, مقبول: 68, مرفوض: 12 },
        { name: 'أبريل', طلبات: 85, مقبول: 61, مرفوض: 14 },
        { name: 'مايو', طلبات: 95, مقبول: 73, مرفوض: 10 },
        { name: 'يونيو', طلبات: 102, مقبول: 81, مرفوض: 11 }
      ];

      const revenueData = [
        { name: 'يناير', إيرادات: 12000, عمولات: 2400 },
        { name: 'فبراير', إيرادات: 15000, عمولات: 3000 },
        { name: 'مارس', إيرادات: 18000, عمولات: 3600 },
        { name: 'أبريل', إيرادات: 16500, عمولات: 3300 },
        { name: 'مايو', إيرادات: 20000, عمولات: 4000 },
        { name: 'يونيو', إيرادات: 22500, عمولات: 4500 }
      ];

      setStats({
        totalStudents: studentsResult.count || 0,
        totalApplications: applicationsResult.count || 0,
        totalUniversities: universitiesResult.count || 0,
        totalPrograms: programsResult.count || 0,
        totalAgents: agentsResult.count || 0,
        pendingApplications: pendingApps.count || 0,
        approvedApplications: approvedApps.count || 0,
        rejectedApplications: rejectedApps.count || 0,
        monthlyRevenue: 22500,
        totalRevenue: 180000,
        newStudentsThisMonth: 24,
        conversionRate: 78.5
      });

      setChartData({
        applicationsChart: applicationsData,
        revenueChart: revenueData,
        studentsChart: [],
        universitiesChart: []
      });

      // بيانات الأنشطة الأخيرة (تجريبية)
      setRecentActivities([
        {
          id: 1,
          type: 'application',
          title: 'طلب جديد تم تقديمه',
          description: 'أحمد محمد - علوم الحاسوب',
          time: 'منذ 5 دقائق',
          status: 'pending'
        },
        {
          id: 2,
          type: 'approval',
          title: 'تم قبول طلب',
          description: 'فاطمة علي - الهندسة الطبية',
          time: 'منذ 15 دقيقة',
          status: 'approved'
        },
        {
          id: 3,
          type: 'university',
          title: 'جامعة جديدة تمت إضافتها',
          description: 'جامعة إسطنبول التقنية',
          time: 'منذ ساعة',
          status: 'info'
        }
      ]);

    } catch (error) {
      console.error('خطأ في جلب بيانات لوحة التحكم:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, change, changeType, prefix = '', suffix = '' }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-unlimited-gray">{title}</CardTitle>
          <div className="text-unlimited-blue">{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-unlimited-dark-blue">
            {isLoading ? '...' : `${prefix}${value.toLocaleString('ar-EG')}${suffix}`}
          </div>
          {change && (
            <p className={`text-xs mt-1 flex items-center ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {change}
            </p>
          )}
        </CardContent>
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-unlimited-blue/10 to-transparent rounded-bl-full" />
      </Card>
    </motion.div>
  );

  const ActivityCard = ({ activity }: any) => (
    <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg border hover:bg-gray-50 transition-colors">
      <div className={`w-2 h-2 rounded-full mt-2 ${
        activity.status === 'approved' ? 'bg-green-500' :
        activity.status === 'pending' ? 'bg-yellow-500' :
        activity.status === 'rejected' ? 'bg-red-500' :
        'bg-blue-500'
      }`} />
      <div className="flex-1">
        <h4 className="font-medium text-unlimited-dark-blue">{activity.title}</h4>
        <p className="text-sm text-unlimited-gray">{activity.description}</p>
        <p className="text-xs text-unlimited-gray mt-1">{activity.time}</p>
      </div>
    </div>
  );

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">لوحة التحكم المتقدمة</h1>
            <p className="text-unlimited-gray">نظرة شاملة على أداء النظام والإحصائيات</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
            <Button>
              <Bell className="h-4 w-4 mr-2" />
              الإشعارات
            </Button>
          </div>
        </div>

        {/* فترة الإحصائيات */}
        <div className="flex gap-2">
          {['أسبوع', 'شهر', '3 أشهر', 'سنة'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>

        {/* الإحصائيات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="إجمالي الطلاب"
            value={stats.totalStudents}
            icon={<Users className="h-4 w-4" />}
            change="+12% من الشهر الماضي"
            changeType="positive"
          />
          <StatCard
            title="إجمالي الطلبات"
            value={stats.totalApplications}
            icon={<FileText className="h-4 w-4" />}
            change="+8% من الشهر الماضي"
            changeType="positive"
          />
          <StatCard
            title="الجامعات النشطة"
            value={stats.totalUniversities}
            icon={<School className="h-4 w-4" />}
            change="+2 جامعات جديدة"
            changeType="positive"
          />
          <StatCard
            title="البرامج المتاحة"
            value={stats.totalPrograms}
            icon={<GraduationCap className="h-4 w-4" />}
            change="+15 برنامج جديد"
            changeType="positive"
          />
        </div>

        {/* إحصائيات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="الوكلاء النشطون"
            value={stats.totalAgents}
            icon={<Activity className="h-4 w-4" />}
            change="+3 وكلاء جدد"
            changeType="positive"
          />
          <StatCard
            title="الإيرادات الشهرية"
            value={stats.monthlyRevenue}
            icon={<DollarSign className="h-4 w-4" />}
            change="+15% من الشهر الماضي"
            changeType="positive"
            prefix="$"
          />
          <StatCard
            title="طلاب جدد هذا الشهر"
            value={stats.newStudentsThisMonth}
            icon={<TrendingUp className="h-4 w-4" />}
            change="+20% من الشهر الماضي"
            changeType="positive"
          />
          <StatCard
            title="معدل التحويل"
            value={stats.conversionRate}
            icon={<CheckCircle className="h-4 w-4" />}
            change="+5.2% من الشهر الماضي"
            changeType="positive"
            suffix="%"
          />
        </div>

        {/* حالة الطلبات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="طلبات قيد الانتظار"
            value={stats.pendingApplications}
            icon={<Clock className="h-4 w-4 text-yellow-600" />}
          />
          <StatCard
            title="طلبات مقبولة"
            value={stats.approvedApplications}
            icon={<CheckCircle className="h-4 w-4 text-green-600" />}
          />
          <StatCard
            title="طلبات مرفوضة"
            value={stats.rejectedApplications}
            icon={<XCircle className="h-4 w-4 text-red-600" />}
          />
        </div>

        {/* الرسوم البيانية والتحليلات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* رسم بياني للطلبات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                إحصائيات الطلبات الشهرية
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData.applicationsChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="طلبات" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                  <Area type="monotone" dataKey="مقبول" stackId="1" stroke="#10B981" fill="#10B981" />
                  <Area type="monotone" dataKey="مرفوض" stackId="1" stroke="#EF4444" fill="#EF4444" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* رسم بياني للإيرادات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                تحليل الإيرادات والعمولات
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="إيرادات" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="عمولات" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* الأنشطة الأخيرة والإشعارات */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  الأنشطة الأخيرة
                  <Badge variant="secondary">{recentActivities.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* إحصائيات سريعة */}
          <Card>
            <CardHeader>
              <CardTitle>الإحصائيات السريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>معدل القبول</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>متوسط وقت المعالجة</span>
                  <span className="font-medium">5 أيام</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>رضا العملاء</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>النمو الشهري</span>
                  <span className="font-medium text-green-600">+15%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* أهداف الأداء */}
        <Card>
          <CardHeader>
            <CardTitle>أهداف الأداء الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-unlimited-blue">120</div>
                <div className="text-sm text-unlimited-gray">طلب جديد (الهدف: 150)</div>
                <Progress value={80} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">95</div>
                <div className="text-sm text-unlimited-gray">طلب مقبول (الهدف: 100)</div>
                <Progress value={95} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-unlimited-blue">$18,500</div>
                <div className="text-sm text-unlimited-gray">الإيرادات (الهدف: $20,000)</div>
                <Progress value={92.5} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24</div>
                <div className="text-sm text-unlimited-gray">طلاب جدد (الهدف: 30)</div>
                <Progress value={80} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedDashboard;
