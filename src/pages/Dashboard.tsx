
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, GraduationCap, Clock, CheckCircle, XCircle, Plus, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<'student' | 'admin' | 'agent'>('student');
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    documentsUploaded: 0
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      
      // جلب دور المستخدم
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // جلب دور المستخدم من قاعدة البيانات
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (roleData && (roleData.role === 'student' || roleData.role === 'admin' || roleData.role === 'agent')) {
        setUserRole(roleData.role);
      }

      // إذا كان المستخدم طالب، جلب إحصائياته
      if (roleData?.role === 'student') {
        await fetchStudentStats(user.id);
      }
    } catch (error) {
      console.error('خطأ في جلب بيانات المستخدم:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات المستخدم",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentStats = async (userId: string) => {
    try {
      // جلب إحصائيات الطلبات
      const { data: applications, error } = await supabase
        .from('applications')
        .select('*')
        .eq('student_id', userId);

      if (error) throw error;

      const totalApplications = applications?.length || 0;
      const pendingApplications = applications?.filter(app => app.status === 'pending').length || 0;
      const approvedApplications = applications?.filter(app => app.status === 'accepted').length || 0;
      const rejectedApplications = applications?.filter(app => app.status === 'rejected').length || 0;

      // جلب عدد المستندات
      const { count: documentsCount } = await supabase
        .from('documents')
        .select('*', { count: 'exact' })
        .in('application_id', applications?.map(app => app.id) || []);

      setStats({
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        documentsUploaded: documentsCount || 0
      });

      // جلب آخر الطلبات
      const { data: recentApps } = await supabase
        .from('applications')
        .select(`
          *,
          programs (name, name_ar),
          universities (name, name_ar)
        `)
        .eq('student_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentApplications(recentApps || []);
    } catch (error) {
      console.error('خطأ في جلب إحصائيات الطالب:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' },
      under_review: { label: 'قيد المراجعة', className: 'bg-blue-100 text-blue-800' },
      accepted: { label: 'مقبول', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'مرفوض', className: 'bg-red-100 text-red-800' },
      waitlisted: { label: 'قائمة الانتظار', className: 'bg-purple-100 text-purple-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const StatCard = ({ title, value, icon, color = 'unlimited-blue' }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-unlimited-gray">{title}</CardTitle>
        <div className={`text-${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-unlimited-dark-blue">
          {isLoading ? '...' : value}
        </div>
      </CardContent>
    </Card>
  );

  // إعادة توجيه حسب نوع المستخدم
  if (userRole === 'admin') {
    navigate('/admin');
    return null;
  }

  if (userRole === 'agent') {
    navigate('/agent');
    return null;
  }

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">لوحة التحكم</h1>
            <p className="text-unlimited-gray">مرحباً بك في منصة التعليم اللامحدود</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              الإشعارات
            </Button>
            <Button onClick={() => navigate('/apply')}>
              <Plus className="h-4 w-4 mr-2" />
              طلب جديد
            </Button>
          </div>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              title="إجمالي الطلبات"
              value={stats.totalApplications}
              icon={<FileText className="h-4 w-4" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              title="قيد الانتظار"
              value={stats.pendingApplications}
              icon={<Clock className="h-4 w-4" />}
              color="yellow-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              title="طلبات مقبولة"
              value={stats.approvedApplications}
              icon={<CheckCircle className="h-4 w-4" />}
              color="green-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard
              title="طلبات مرفوضة"
              value={stats.rejectedApplications}
              icon={<XCircle className="h-4 w-4" />}
              color="red-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StatCard
              title="المستندات المرفوعة"
              value={stats.documentsUploaded}
              icon={<GraduationCap className="h-4 w-4" />}
            />
          </motion.div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* الطلبات الأخيرة */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  الطلبات الأخيرة
                  <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/applications')}>
                    عرض الكل
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="p-4 border rounded-lg animate-pulse">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))
                  ) : recentApplications.length === 0 ? (
                    <div className="text-center py-8 text-unlimited-gray">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد طلبات حالياً</p>
                      <Button className="mt-4" onClick={() => navigate('/apply')}>
                        إنشاء طلب جديد
                      </Button>
                    </div>
                  ) : (
                    recentApplications.map((application, index) => (
                      <motion.div
                        key={application.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/dashboard/applications/${application.id}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-unlimited-dark-blue">
                              {application.programs?.name || application.programs?.name_ar}
                            </h3>
                            <p className="text-sm text-unlimited-gray">
                              {application.universities?.name || application.universities?.name_ar}
                            </p>
                            <p className="text-xs text-unlimited-gray mt-1">
                              تاريخ التقديم: {new Date(application.created_at).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(application.status)}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* الإجراءات السريعة */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" onClick={() => navigate('/apply')}>
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء طلب جديد
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/programs')}>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  تصفح البرامج
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/universities')}>
                  <FileText className="h-4 w-4 mr-2" />
                  تصفح الجامعات
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/profile')}>
                  <FileText className="h-4 w-4 mr-2" />
                  تحديث الملف الشخصي
                </Button>
              </CardContent>
            </Card>

            {/* الإشعارات الأخيرة */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>الإشعارات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">تم قبول طلبك</p>
                    <p className="text-xs text-unlimited-gray">علوم الحاسوب - جامعة إسطنبول</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium">يرجى رفع المستندات</p>
                    <p className="text-xs text-unlimited-gray">طلب الهندسة الطبية</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">تم تحديث حالة الطلب</p>
                    <p className="text-xs text-unlimited-gray">إدارة الأعمال - جامعة أنقرة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
