
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

const AgentDashboard = () => {
  const [stats, setStats] = useState({
    myStudents: 0,
    myApplications: 0,
    pendingCommissions: 0,
    totalEarnings: 0,
    thisMonthApplications: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAgentStats();
  }, []);

  const fetchAgentStats = async () => {
    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mock data for now since we need to implement the agent system
      setStats({
        myStudents: 45,
        myApplications: 120,
        pendingCommissions: 8,
        totalEarnings: 15500,
        thisMonthApplications: 23
      });
    } catch (error) {
      console.error('Error fetching agent stats:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب إحصائيات الوكيل",
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
    <DashboardLayout userRole="agent">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم الوكيل</h1>
          <p className="text-gray-600">إدارة طلابك وطلباتك ومتابعة عمولاتك</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="طلابي"
            value={stats.myStudents}
            icon={<Users className="h-4 w-4" />}
            color="blue"
            change={8}
          />
          <StatCard
            title="إجمالي الطلبات"
            value={stats.myApplications}
            icon={<FileText className="h-4 w-4" />}
            color="green"
            change={15}
          />
          <StatCard
            title="العمولات المعلقة"
            value={stats.pendingCommissions}
            icon={<DollarSign className="h-4 w-4" />}
            color="orange"
            change={-2}
          />
          <StatCard
            title="إجمالي الأرباح"
            value={`$${stats.totalEarnings}`}
            icon={<DollarSign className="h-4 w-4" />}
            color="green"
            change={25}
          />
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>الإجراءات السريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-right">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <div className="text-sm font-medium">إضافة طالب جديد</div>
                  <div className="text-xs text-gray-500">إضافة طالب جديد لقائمتك</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-right">
                  <FileText className="h-6 w-6 text-green-600 mb-2" />
                  <div className="text-sm font-medium">متابعة الطلبات</div>
                  <div className="text-xs text-gray-500">عرض حالة طلبات طلابك</div>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-right">
                  <DollarSign className="h-6 w-6 text-purple-600 mb-2" />
                  <div className="text-sm font-medium">تقرير العمولات</div>
                  <div className="text-xs text-gray-500">عرض تفاصيل عمولاتك</div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">تم قبول طلب أحمد محمد</div>
                    <div className="text-xs text-gray-500">جامعة إسطنبول التقنية - منذ ساعتين</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">طلب جديد من سارة أحمد</div>
                    <div className="text-xs text-gray-500">برنامج إدارة الأعمال - منذ 3 ساعات</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">عمولة جديدة معلقة</div>
                    <div className="text-xs text-gray-500">$500 من طلب محمد علي - منذ يوم</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>أداء هذا الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.thisMonthApplications}</div>
                <div className="text-sm text-gray-500">طلب هذا الشهر</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">18</div>
                <div className="text-sm text-gray-500">طلب مقبول</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">78%</div>
                <div className="text-sm text-gray-500">معدل النجاح</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
