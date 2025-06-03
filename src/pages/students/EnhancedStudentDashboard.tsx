
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Bell,
  MessageSquare,
  BookOpen,
  Calendar,
  TrendingUp,
  Download,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ApplicationStatus {
  id: string;
  university: string;
  program: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  submittedAt: Date;
  lastUpdate: Date;
  progress: number;
}

interface StudentStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  documentsUploaded: number;
  profileCompletion: number;
}

const EnhancedStudentDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    documentsUploaded: 0,
    profileCompletion: 0
  });
  
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    setIsLoading(true);
    
    // محاكاة جلب بيانات الطالب
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockApplications: ApplicationStatus[] = [
      {
        id: '1',
        university: 'جامعة إسطنبول التقنية',
        program: 'هندسة البرمجيات',
        status: 'in_review',
        submittedAt: new Date('2024-01-15'),
        lastUpdate: new Date('2024-01-20'),
        progress: 75
      },
      {
        id: '2',
        university: 'جامعة أنقرة',
        program: 'إدارة الأعمال',
        status: 'pending',
        submittedAt: new Date('2024-01-10'),
        lastUpdate: new Date('2024-01-18'),
        progress: 50
      },
      {
        id: '3',
        university: 'جامعة بوغازيتشي',
        program: 'الطب',
        status: 'approved',
        submittedAt: new Date('2024-01-05'),
        lastUpdate: new Date('2024-01-22'),
        progress: 100
      }
    ];

    setApplications(mockApplications);
    
    setStats({
      totalApplications: mockApplications.length,
      pendingApplications: mockApplications.filter(app => app.status === 'pending').length,
      approvedApplications: mockApplications.filter(app => app.status === 'approved').length,
      rejectedApplications: mockApplications.filter(app => app.status === 'rejected').length,
      documentsUploaded: 8,
      profileCompletion: 85
    });
    
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'مقبول';
      case 'rejected':
        return 'مرفوض';
      case 'in_review':
        return 'قيد المراجعة';
      default:
        return 'معلق';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4" />;
      case 'in_review':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-unlimited-blue to-unlimited-dark-blue text-white p-6 rounded-lg"
        >
          <h1 className="text-2xl font-bold mb-2">
            مرحباً بك، {user?.email?.split('@')[0] || 'الطالب'}!
          </h1>
          <p className="text-blue-100">
            لديك {stats.pendingApplications} طلبات قيد الانتظار و {stats.approvedApplications} طلبات مقبولة
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold">{stats.totalApplications}</p>
                  </div>
                  <FileText className="h-8 w-8 text-unlimited-blue" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">طلبات معلقة</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">طلبات مقبولة</p>
                    <p className="text-2xl font-bold text-green-600">{stats.approvedApplications}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">اكتمال الملف الشخصي</p>
                    <p className="text-2xl font-bold">{stats.profileCompletion}%</p>
                  </div>
                  <User className="h-8 w-8 text-unlimited-blue" />
                </div>
                <Progress value={stats.profileCompletion} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">طلباتي</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">طلباتي الجامعية</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                طلب جديد
              </Button>
            </div>

            <div className="space-y-4">
              {applications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{application.university}</h3>
                          <p className="text-gray-600">{application.program}</p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {getStatusText(application.status)}
                          </div>
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>تاريخ التقديم: {application.submittedAt.toLocaleDateString('ar-SA')}</span>
                          <span>آخر تحديث: {application.lastUpdate.toLocaleDateString('ar-SA')}</span>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>تقدم الطلب</span>
                            <span>{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            عرض التفاصيل
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            الرسائل
                          </Button>
                          {application.status === 'approved' && (
                            <Button size="sm" variant="outline" className="text-green-600">
                              <Download className="h-4 w-4 mr-1" />
                              تحميل القبول
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  الملف الشخصي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="h-16 w-16 bg-unlimited-blue rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {user?.email?.charAt(0).toUpperCase() || 'P'}
                    </div>
                    <div>
                      <h3 className="font-semibold">أكمل ملفك الشخصي</h3>
                      <p className="text-sm text-gray-600">اكتمال الملف الشخصي يزيد من فرص قبولك</p>
                      <Progress value={stats.profileCompletion} className="mt-2 w-48" />
                    </div>
                    <Button>تحديث الملف</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">المعلومات الأساسية</h4>
                      <p className="text-sm text-gray-600">الاسم، تاريخ الميلاد، الجنسية</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">مكتمل</Badge>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">المعلومات الأكاديمية</h4>
                      <p className="text-sm text-gray-600">الشهادات، الدرجات، الخبرة</p>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800">ناقص</Badge>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">معلومات الاتصال</h4>
                      <p className="text-sm text-gray-600">الهاتف، العنوان، البريد</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">مكتمل</Badge>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">المستندات</h4>
                      <p className="text-sm text-gray-600">الصور، الشهادات، البيانات</p>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800">ناقص</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  المستندات المطلوبة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'صورة شخصية', status: 'uploaded', required: true },
                    { name: 'شهادة الثانوية العامة', status: 'uploaded', required: true },
                    { name: 'كشف الدرجات', status: 'pending', required: true },
                    { name: 'شهادة اللغة الإنجليزية', status: 'uploaded', required: false },
                    { name: 'خطاب الدافع', status: 'pending', required: false },
                    { name: 'خطابات التوصية', status: 'not_uploaded', required: false }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          {doc.required && <span className="text-red-500 text-sm"> *</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === 'uploaded' ? (
                          <Badge className="bg-green-100 text-green-800">تم الرفع</Badge>
                        ) : doc.status === 'pending' ? (
                          <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">لم يتم الرفع</Badge>
                        )}
                        <Button size="sm" variant="outline">
                          {doc.status === 'uploaded' ? 'عرض' : 'رفع'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  الرسائل الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      from: 'جامعة إسطنبول التقنية',
                      subject: 'تحديث حالة طلبك',
                      date: 'منذ ساعتين',
                      unread: true
                    },
                    {
                      from: 'فريق الدعم',
                      subject: 'مطلوب مستندات إضافية',
                      date: 'أمس',
                      unread: false
                    },
                    {
                      from: 'جامعة بوغازيتشي',
                      subject: 'مبروك! تم قبولك',
                      date: 'قبل يومين',
                      unread: false
                    }
                  ].map((message, index) => (
                    <div key={index} className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${message.unread ? 'border-unlimited-blue bg-blue-50' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{message.from}</span>
                        <span className="text-sm text-gray-500">{message.date}</span>
                      </div>
                      <p className="text-gray-700">{message.subject}</p>
                      {message.unread && (
                        <Badge className="mt-2 bg-unlimited-blue text-white">جديد</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedStudentDashboard;
