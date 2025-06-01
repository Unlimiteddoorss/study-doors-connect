
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, GraduationCap, School, FileText, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalApplications: 0,
    totalUniversities: 0,
    totalPrograms: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    monthlyRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      
      // جلب إحصائيات الطلاب
      const { count: studentsCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact' })
        .eq('role', 'student');

      // جلب إحصائيات الطلبات
      const { count: applicationsCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact' });

      // جلب إحصائيات الجامعات
      const { count: universitiesCount } = await supabase
        .from('universities')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      // جلب إحصائيات البرامج
      const { count: programsCount } = await supabase
        .from('programs')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      // جلب إحصائيات الطلبات حسب الحالة
      const { count: pendingCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact' })
        .eq('status', 'pending');

      const { count: approvedCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact' })
        .eq('status', 'accepted');

      const { count: rejectedCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact' })
        .eq('status', 'rejected');

      setStats({
        totalStudents: studentsCount || 0,
        totalApplications: applicationsCount || 0,
        totalUniversities: universitiesCount || 0,
        totalPrograms: programsCount || 0,
        pendingApplications: pendingCount || 0,
        approvedApplications: approvedCount || 0,
        rejectedApplications: rejectedCount || 0,
        monthlyRevenue: 0 // سيتم حسابه لاحقاً مع نظام المدفوعات
      });
    } catch (error) {
      console.error('خطأ في جلب الإحصائيات:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب الإحصائيات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, change, changeType }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-unlimited-gray">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-unlimited-dark-blue">
          {isLoading ? '...' : value.toLocaleString('ar-EG')}
        </div>
        {change && (
          <p className={`text-xs mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">لوحة تحكم المشرف</h1>
            <p className="text-unlimited-gray">مرحباً بك في لوحة التحكم الرئيسية</p>
          </div>
        </div>

        {/* بطاقات الإحصائيات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              title="إجمالي الطلاب"
              value={stats.totalStudents}
              icon={<Users className="h-4 w-4 text-unlimited-blue" />}
              change="+12% من الشهر الماضي"
              changeType="positive"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              title="إجمالي الطلبات"
              value={stats.totalApplications}
              icon={<FileText className="h-4 w-4 text-unlimited-blue" />}
              change="+8% من الشهر الماضي"
              changeType="positive"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              title="الجامعات النشطة"
              value={stats.totalUniversities}
              icon={<School className="h-4 w-4 text-unlimited-blue" />}
              change="+2 جامعات جديدة"
              changeType="positive"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard
              title="البرامج المتاحة"
              value={stats.totalPrograms}
              icon={<GraduationCap className="h-4 w-4 text-unlimited-blue" />}
              change="+15 برنامج جديد"
              changeType="positive"
            />
          </motion.div>
        </div>

        {/* بطاقات حالة الطلبات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StatCard
              title="طلبات قيد الانتظار"
              value={stats.pendingApplications}
              icon={<Clock className="h-4 w-4 text-yellow-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <StatCard
              title="طلبات مقبولة"
              value={stats.approvedApplications}
              icon={<CheckCircle className="h-4 w-4 text-green-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <StatCard
              title="طلبات مرفوضة"
              value={stats.rejectedApplications}
              icon={<XCircle className="h-4 w-4 text-red-600" />}
            />
          </motion.div>
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="activities">الأنشطة الأخيرة</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الطلبات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">أحمد محمد علي</p>
                        <p className="text-sm text-unlimited-gray">علوم الحاسوب - جامعة إسطنبول التقنية</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        قيد المراجعة
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">فاطمة حسن</p>
                        <p className="text-sm text-unlimited-gray">الهندسة الطبية - جامعة أنقرة</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        مقبول
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الإحصائيات السريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>معدل القبول</span>
                      <span className="text-green-600 font-bold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>متوسط وقت المعالجة</span>
                      <span className="font-bold">5 أيام</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>الوكلاء النشطون</span>
                      <span className="font-bold">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>التحليلات والرسوم البيانية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-unlimited-gray">سيتم إضافة الرسوم البيانية التفاعلية هنا</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm">تم قبول طلب أحمد محمد علي</p>
                      <p className="text-xs text-unlimited-gray">منذ 5 دقائق</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm">تم إضافة برنامج جديد في جامعة إسطنبول</p>
                      <p className="text-xs text-unlimited-gray">منذ ساعة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>التقارير المتقدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-unlimited-gray">سيتم إضافة نظام التقارير المتقدم هنا</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
