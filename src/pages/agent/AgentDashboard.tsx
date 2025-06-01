
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, TrendingUp, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const AgentDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    monthlyCommission: 0,
    totalCommission: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAgentStats();
  }, []);

  const fetchAgentStats = async () => {
    try {
      setIsLoading(true);
      
      // هنا يمكن إضافة استعلامات لجلب إحصائيات الوكيل المحددة
      // مؤقتاً سنستخدم بيانات افتراضية
      setStats({
        totalStudents: 25,
        totalApplications: 47,
        pendingApplications: 12,
        approvedApplications: 28,
        rejectedApplications: 7,
        monthlyCommission: 2450,
        totalCommission: 18750
      });
    } catch (error) {
      console.error('خطأ في جلب إحصائيات الوكيل:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب الإحصائيات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, change, changeType, prefix = '', suffix = '' }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-unlimited-gray">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-unlimited-dark-blue">
          {isLoading ? '...' : `${prefix}${value.toLocaleString('ar-EG')}${suffix}`}
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
    <DashboardLayout userRole="agent">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">لوحة تحكم الوكيل</h1>
            <p className="text-unlimited-gray">مرحباً بك في لوحة التحكم الخاصة بك</p>
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
              change="+3 طلاب جدد هذا الشهر"
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
              change="+5 طلبات جديدة هذا الأسبوع"
              changeType="positive"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              title="العمولة الشهرية"
              value={stats.monthlyCommission}
              icon={<DollarSign className="h-4 w-4 text-unlimited-blue" />}
              change="+15% من الشهر الماضي"
              changeType="positive"
              prefix="$"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard
              title="إجمالي العمولات"
              value={stats.totalCommission}
              icon={<TrendingUp className="h-4 w-4 text-unlimited-blue" />}
              change="+25% من العام الماضي"
              changeType="positive"
              prefix="$"
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
            <TabsTrigger value="students">الطلاب</TabsTrigger>
            <TabsTrigger value="applications">الطلبات</TabsTrigger>
            <TabsTrigger value="commission">العمولات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الطلاب الجدد هذا الشهر</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">أحمد محمد علي</p>
                        <p className="text-sm text-unlimited-gray">انضم في 15 نوفمبر 2024</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        جديد
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">فاطمة حسن</p>
                        <p className="text-sm text-unlimited-gray">انضمت في 12 نوفمبر 2024</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        جديد
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الطلبات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">طلب علوم الحاسوب</p>
                        <p className="text-sm text-unlimited-gray">أحمد محمد - جامعة إسطنبول التقنية</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        قيد المراجعة
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">طلب الهندسة الطبية</p>
                        <p className="text-sm text-unlimited-gray">فاطمة حسن - جامعة أنقرة</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        مقبول
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلاب</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-unlimited-gray">قائمة الطلاب التابعين لك وإحصائياتهم</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-unlimited-gray">تتبع ومتابعة جميع طلبات القبول</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commission">
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل العمولات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-unlimited-dark-blue">عمولة هذا الشهر</h3>
                      <p className="text-2xl font-bold text-green-600">${stats.monthlyCommission}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-unlimited-dark-blue">إجمالي العمولات</h3>
                      <p className="text-2xl font-bold text-unlimited-blue">${stats.totalCommission}</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-unlimited-dark-blue mb-2">تفاصيل العمولة</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>عدد الطلاب النشطين:</span>
                        <span>{stats.totalStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>معدل العمولة لكل طالب:</span>
                        <span>$98</span>
                      </div>
                      <div className="flex justify-between">
                        <span>بونص الأداء:</span>
                        <span>$150</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
