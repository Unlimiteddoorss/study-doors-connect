
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  User, 
  School, 
  FileText, 
  MessageSquare, 
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ApplicationTimeline from '@/components/applications/ApplicationTimeline';
import ApplicationMessages from '@/components/applications/ApplicationMessages';

interface ApplicationDetail {
  id: string;
  studentName: string;
  studentEmail: string;
  programName: string;
  universityName: string;
  status: string;
  submittedDate: string;
  personalInfo: any;
  academicInfo: any;
  documents: any[];
}

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(name, universities!inner(name)),
          user_profiles!fk_applications_student_profiles(full_name, user_id),
          documents(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setApplication({
          id: data.id,
          studentName: data.user_profiles?.full_name || 'طالب غير معروف',
          studentEmail: 'student@example.com', // يجب جلبها من auth.users
          programName: data.programs?.name || 'برنامج غير معروف',
          universityName: data.programs?.universities?.name || 'جامعة غير معروفة',
          status: data.status,
          submittedDate: new Date(data.created_at).toLocaleDateString('ar-SA'),
          personalInfo: data.personal_info || {},
          academicInfo: data.academic_info || {},
          documents: data.documents || []
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل تفاصيل الطلب",
        variant: "destructive"
      });
      
      // بيانات تجريبية للعرض
      setApplication({
        id: id || '1',
        studentName: 'أحمد محمد',
        studentEmail: 'ahmed@example.com',
        programName: 'هندسة البرمجيات',
        universityName: 'جامعة إسطنبول التقنية',
        status: 'pending',
        submittedDate: new Date().toLocaleDateString('ar-SA'),
        personalInfo: {
          fullName: 'أحمد محمد علي',
          dateOfBirth: '1995-05-15',
          nationality: 'سعودي',
          phone: '+966501234567'
        },
        academicInfo: {
          highSchoolGrade: '85%',
          graduationYear: '2020',
          previousEducation: 'الثانوية العامة'
        },
        documents: [
          { id: 1, name: 'الشهادة الثانوية', status: 'approved', file_path: '/docs/certificate.pdf' },
          { id: 2, name: 'جواز السفر', status: 'approved', file_path: '/docs/passport.pdf' },
          { id: 3, name: 'صورة شخصية', status: 'pending', file_path: '/docs/photo.jpg' }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      review: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'قيد الانتظار',
      approved: 'مقبول',
      rejected: 'مرفوض',
      review: 'قيد المراجعة'
    };
    return labels[status] || status;
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setApplication(prev => prev ? { ...prev, status: newStatus } : null);
      
      toast({
        title: "تم التحديث",
        description: `تم تغيير حالة الطلب إلى: ${getStatusLabel(newStatus)}`
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث حالة الطلب",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
          <span className="mr-3">جاري تحميل تفاصيل الطلب...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout userRole="admin">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">الطلب غير موجود</h2>
          <p className="text-gray-600 mt-2">لم يتم العثور على الطلب المطلوب</p>
          <Button onClick={() => navigate('/admin/applications')} className="mt-4">
            العودة للطلبات
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
              onClick={() => navigate('/admin/applications')}
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-unlimited-dark-blue">
                تفاصيل الطلب #{application.id}
              </h1>
              <p className="text-unlimited-gray">
                {application.studentName} - {application.programName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(application.status)}>
              {getStatusLabel(application.status)}
            </Badge>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange('approved')}
                disabled={application.status === 'approved'}
              >
                <CheckCircle className="h-4 w-4 ml-2" />
                قبول
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange('rejected')}
                disabled={application.status === 'rejected'}
              >
                <XCircle className="h-4 w-4 ml-2" />
                رفض
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
            <TabsTrigger value="timeline">التسلسل الزمني</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 ml-2" />
                    المعلومات الشخصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">الاسم الكامل</label>
                    <p className="text-gray-900">{application.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">تاريخ الميلاد</label>
                    <p className="text-gray-900">{application.personalInfo.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">الجنسية</label>
                    <p className="text-gray-900">{application.personalInfo.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">رقم الهاتف</label>
                    <p className="text-gray-900">{application.personalInfo.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <School className="h-5 w-5 ml-2" />
                    المعلومات الأكاديمية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">المعدل في الثانوية</label>
                    <p className="text-gray-900">{application.academicInfo.highSchoolGrade}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">سنة التخرج</label>
                    <p className="text-gray-900">{application.academicInfo.graduationYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">التعليم السابق</label>
                    <p className="text-gray-900">{application.academicInfo.previousEducation}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 ml-2" />
                  تفاصيل البرنامج
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">الجامعة</label>
                    <p className="text-gray-900">{application.universityName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">البرنامج</label>
                    <p className="text-gray-900">{application.programName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">تاريخ التقديم</label>
                    <p className="text-gray-900">{application.submittedDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">حالة الطلب</label>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusLabel(application.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>المستندات المرفقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <Badge className={getStatusColor(doc.status)}>
                            {getStatusLabel(doc.status)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 ml-2" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <ApplicationTimeline applicationId={application.id} />
          </TabsContent>

          <TabsContent value="messages">
            <ApplicationMessages applicationId={application.id} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default ApplicationDetails;
