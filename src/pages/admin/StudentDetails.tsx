
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  School,
  Activity,
  Edit,
  Ban,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface StudentDetail {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  applicationsCount: number;
  lastLoginDate?: string;
  bio?: string;
  avatarUrl?: string;
}

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      setIsLoading(true);
      
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', id)
        .single();

      if (profileError) throw profileError;

      const { data: applicationsData } = await supabase
        .from('applications')
        .select('id')
        .eq('student_id', id);

      if (profileData) {
        setStudent({
          id: profileData.user_id,
          fullName: profileData.full_name || 'غير محدد',
          email: 'student@example.com', // يجب جلبها من auth.users
          phone: profileData.phone,
          country: profileData.country,
          city: profileData.city,
          joinDate: new Date(profileData.created_at).toLocaleDateString('ar-SA'),
          status: 'active',
          applicationsCount: applicationsData?.length || 0,
          bio: profileData.bio,
          avatarUrl: profileData.avatar_url
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل بيانات الطالب",
        variant: "destructive"
      });
      
      // بيانات تجريبية للعرض
      setStudent({
        id: id || '1',
        fullName: 'أحمد محمد علي',
        email: 'ahmed.mohamed@example.com',
        phone: '+966501234567',
        country: 'السعودية',
        city: 'الرياض',
        joinDate: '2024-01-15',
        status: 'active',
        applicationsCount: 3,
        lastLoginDate: '2024-01-20',
        bio: 'طالب متميز يسعى للحصول على تعليم عالي الجودة في الخارج.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'نشط',
      inactive: 'غير نشط',
      suspended: 'موقوف'
    };
    return labels[status] || status;
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      toast({
        title: "تم التحديث",
        description: `تم تغيير حالة الطالب إلى: ${getStatusLabel(newStatus)}`
      });
      
      setStudent(prev => prev ? { ...prev, status: newStatus as 'active' | 'inactive' | 'suspended' } : null);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث حالة الطالب",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
          <span className="mr-3">جاري تحميل بيانات الطالب...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout userRole="admin">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">الطالب غير موجود</h2>
          <p className="text-gray-600 mt-2">لم يتم العثور على الطالب المطلوب</p>
          <Button onClick={() => navigate('/admin/students')} className="mt-4">
            العودة للطلاب
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/students')}
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              {student.avatarUrl ? (
                <img 
                  src={student.avatarUrl} 
                  alt={student.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-unlimited-blue text-white flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-unlimited-dark-blue">
                  {student.fullName}
                </h1>
                <p className="text-unlimited-gray">{student.email}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(student.status)}>
              {getStatusLabel(student.status)}
            </Badge>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 ml-2" />
                تعديل
              </Button>
              {student.status !== 'suspended' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('suspended')}
                >
                  <Ban className="h-4 w-4 ml-2" />
                  إيقاف
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('active')}
                >
                  <CheckCircle className="h-4 w-4 ml-2" />
                  تفعيل
                </Button>
              )}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="applications">الطلبات</TabsTrigger>
            <TabsTrigger value="activity">النشاط</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 ml-2" />
                    المعلومات الشخصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">البريد الإلكتروني</label>
                      <p className="text-gray-900">{student.email}</p>
                    </div>
                  </div>
                  
                  {student.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">رقم الهاتف</label>
                        <p className="text-gray-900">{student.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {student.country && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">البلد والمدينة</label>
                        <p className="text-gray-900">{student.country}, {student.city}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">تاريخ الانضمام</label>
                      <p className="text-gray-900">{student.joinDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 ml-2" />
                    إحصائيات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">عدد الطلبات</span>
                    <span className="font-semibold text-unlimited-blue">{student.applicationsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">آخر تسجيل دخول</span>
                    <span className="font-semibold">{student.lastLoginDate || 'غير متوفر'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">حالة الحساب</span>
                    <Badge className={getStatusColor(student.status)}>
                      {getStatusLabel(student.status)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {student.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>نبذة شخصية</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{student.bio}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 ml-2" />
                  طلبات الطالب ({student.applicationsCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <School className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم عرض قائمة طلبات الطالب هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 ml-2" />
                  سجل النشاط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم عرض سجل نشاط الطالب هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDetails;
