
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  FileText, 
  User, 
  GraduationCap, 
  MessageSquare,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Flag
} from 'lucide-react';

interface ApplicationDetail {
  id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  university: string;
  program: string;
  status: string;
  submittedAt: string;
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    address: string;
  };
  academicInfo: {
    currentEducation: string;
    gpa: string;
    graduationYear: string;
    previousSchool: string;
    englishLevel: string;
  };
  documents: Array<{
    name: string;
    type: string;
    status: string;
    uploadedAt: string;
  }>;
  timeline: Array<{
    date: string;
    status: string;
    note: string;
    by: string;
  }>;
}

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
    setIsLoading(true);
    try {
      // محاكاة جلب البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockApplication: ApplicationDetail = {
        id: id || '1',
        studentName: 'أحمد محمد علي',
        studentEmail: 'ahmed@example.com',
        phone: '+966501234567',
        university: 'جامعة إسطنبول',
        program: 'هندسة الحاسوب',
        status: 'under_review',
        submittedAt: '2024-01-15',
        personalInfo: {
          fullName: 'أحمد محمد علي السعدي',
          dateOfBirth: '2000-05-15',
          nationality: 'سعودي',
          passportNumber: 'A12345678',
          address: 'الرياض، المملكة العربية السعودية'
        },
        academicInfo: {
          currentEducation: 'الثانوية العامة',
          gpa: '3.8',
          graduationYear: '2024',
          previousSchool: 'مدرسة الملك فهد الثانوية',
          englishLevel: 'متوسط'
        },
        documents: [
          { name: 'صورة جواز السفر', type: 'passport', status: 'approved', uploadedAt: '2024-01-15' },
          { name: 'شهادة الثانوية العامة', type: 'certificate', status: 'approved', uploadedAt: '2024-01-15' },
          { name: 'صورة شخصية', type: 'photo', status: 'pending', uploadedAt: '2024-01-15' },
          { name: 'شهادة اللغة الإنجليزية', type: 'language', status: 'rejected', uploadedAt: '2024-01-16' }
        ],
        timeline: [
          { date: '2024-01-15', status: 'submitted', note: 'تم تقديم الطلب', by: 'النظام' },
          { date: '2024-01-16', status: 'under_review', note: 'بدء مراجعة الطلب', by: 'أحمد المراجع' },
          { date: '2024-01-18', status: 'documents_requested', note: 'طلب وثائق إضافية', by: 'فاطمة المنسقة' }
        ]
      };
      
      setApplication(mockApplication);
    } catch (error) {
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل تفاصيل الطلب",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "تغيير حالة الطلب",
      description: `تم تغيير حالة الطلب إلى: ${newStatus}`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">قيد الانتظار</Badge>;
      case 'under_review':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">قيد المراجعة</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">مقبول</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">مرفوض</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout userRole="admin">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">الطلب غير موجود</h2>
          <Button onClick={() => navigate('/admin/applications')}>
            العودة إلى قائمة الطلبات
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/applications')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة
            </Button>
            <div>
              <h1 className="text-2xl font-bold">تفاصيل الطلب #{application.id}</h1>
              <p className="text-unlimited-gray">{application.studentName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {getStatusBadge(application.status)}
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              تعديل
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="flex items-center gap-2"
            onClick={() => handleStatusChange('approved')}
          >
            <CheckCircle className="h-4 w-4" />
            قبول الطلب
          </Button>
          <Button 
            variant="destructive" 
            className="flex items-center gap-2"
            onClick={() => handleStatusChange('rejected')}
          >
            <XCircle className="h-4 w-4" />
            رفض الطلب
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleStatusChange('pending')}
          >
            <Clock className="h-4 w-4" />
            قيد الانتظار
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Flag className="h-4 w-4" />
            إضافة ملاحظة
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
            <TabsTrigger value="academic">المعلومات الأكاديمية</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
            <TabsTrigger value="timeline">الخط الزمني</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    معلومات الطالب
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">الاسم الكامل</label>
                    <p className="font-medium">{application.studentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                    <p className="font-medium">{application.studentEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">رقم الهاتف</label>
                    <p className="font-medium">{application.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    معلومات البرنامج
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">الجامعة</label>
                    <p className="font-medium">{application.university}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">البرنامج</label>
                    <p className="font-medium">{application.program}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">تاريخ التقديم</label>
                    <p className="font-medium">{application.submittedAt}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">الاسم الكامل</label>
                    <p className="font-medium mt-1">{application.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">تاريخ الميلاد</label>
                    <p className="font-medium mt-1">{application.personalInfo.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">الجنسية</label>
                    <p className="font-medium mt-1">{application.personalInfo.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">رقم جواز السفر</label>
                    <p className="font-medium mt-1">{application.personalInfo.passportNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-600">العنوان</label>
                    <p className="font-medium mt-1">{application.personalInfo.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأكاديمية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">المستوى التعليمي الحالي</label>
                    <p className="font-medium mt-1">{application.academicInfo.currentEducation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">المعدل التراكمي</label>
                    <p className="font-medium mt-1">{application.academicInfo.gpa}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">سنة التخرج</label>
                    <p className="font-medium mt-1">{application.academicInfo.graduationYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">مستوى اللغة الإنجليزية</label>
                    <p className="font-medium mt-1">{application.academicInfo.englishLevel}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-600">المدرسة/الجامعة السابقة</label>
                    <p className="font-medium mt-1">{application.academicInfo.previousSchool}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  المستندات المرفقة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-unlimited-blue" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-600">تم الرفع في: {doc.uploadedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(doc.status)}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>الخط الزمني للطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 border-l-2 border-unlimited-blue">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-unlimited-blue rounded-full -ml-2"></div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.note}</p>
                            <p className="text-sm text-gray-600">بواسطة: {item.by}</p>
                          </div>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  المراسلات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد رسائل بعد</p>
                  <Button className="mt-4">إضافة رسالة جديدة</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetails;
