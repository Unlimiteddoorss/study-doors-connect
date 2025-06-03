
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, GraduationCap, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalApplications: 0,
    totalUniversities: 0,
    totalPrograms: 0,
    pendingApplications: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);

      // Fetch students count
      const { count: studentsCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact' })
        .eq('role', 'student');

      // Fetch applications count
      const { count: applicationsCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact' });

      // Fetch pending applications
      const { count: pendingCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact' })
        .eq('status', 'pending');

      // Fetch universities count
      const { count: universitiesCount } = await supabase
        .from('universities')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      // Fetch programs count
      const { count: programsCount } = await supabase
        .from('programs')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      setStats({
        totalStudents: studentsCount || 0,
        totalApplications: applicationsCount || 0,
        totalUniversities: universitiesCount || 0,
        totalPrograms: programsCount || 0,
        pendingApplications: pendingCount || 0,
        totalRevenue: 125000 // Mock data for now
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب إحصائيات لوحة التحكم",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color = 'blue', change }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <div className={`text-${color}-600`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {isLoading ? '...' : value.toLocaleString()}
          </div>
          {change && (
            <p className="text-xs text-gray-500 mt-1">
              <span className={`inline-flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {change > 0 ? '+' : ''}{change}% من الشهر الماضي
              </span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الإدارية</h1>
          <p className="text-gray-600">نظرة شاملة على إحصائيات النظام</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="إجمالي الطلاب"
            value={stats.totalStudents}
            icon={<Users className="h-4 w-4" />}
            color="blue"
            change={12}
          />
          <StatCard
            title="إجمالي الطلبات"
            value={stats.totalApplications}
            icon={<FileText className="h-4 w-4" />}
            color="green"
            change={8}
          />
          <StatCard
            title="الطلبات المعلقة"
            value={stats.pendingApplications}
            icon={<AlertCircle className="h-4 w-4" />}
            color="orange"
            change={-5}
          />
          <StatCard
            title="الجامعات النشطة"
            value={stats.totalUniversities}
            icon={<GraduationCap className="h-4 w-4" />}
            color="purple"
            change={2}
          />
          <StatCard
            title="البرامج المتاحة"
            value={stats.totalPrograms}
            icon={<GraduationCap className="h-4 w-4" />}
            color="indigo"
            change={15}
          />
          <StatCard
            title="إجمالي الإيرادات"
            value={stats.totalRevenue}
            icon={<DollarSign className="h-4 w-4" />}
            color="green"
            change={22}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>الإجراءات السريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <a href="/admin/students" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <div className="text-sm font-medium">إدارة الطلاب</div>
                </a>
                <a href="/admin/applications" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="h-6 w-6 text-green-600 mb-2" />
                  <div className="text-sm font-medium">إدارة الطلبات</div>
                </a>
                <a href="/admin/universities" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <GraduationCap className="h-6 w-6 text-purple-600 mb-2" />
                  <div className="text-sm font-medium">إدارة الجامعات</div>
                </a>
                <a href="/admin/programs" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <GraduationCap className="h-6 w-6 text-indigo-600 mb-2" />
                  <div className="text-sm font-medium">إدارة البرامج</div>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التنبيهات الهامة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-600 ml-2" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800">طلبات تحتاج مراجعة</div>
                      <div className="text-yellow-700">{stats.pendingApplications} طلب في انتظار المراجعة</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-600 ml-2" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">طلاب جدد</div>
                      <div className="text-blue-700">تم تسجيل 25 طالب جديد هذا الأسبوع</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
