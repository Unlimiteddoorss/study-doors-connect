
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedFilterableTable } from '@/components/admin/EnhancedFilterableTable';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  Eye, 
  CheckCircle, 
  XCircle,
  FileText,
  Plus,
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  universityName: string;
  programName: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'completed';
  submittedAt: string;
  lastUpdate: string;
  documents: number;
  priority: 'high' | 'medium' | 'low';
  country: string;
}

const ManageApplications = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockApplications: Application[] = [
        {
          id: '1',
          studentName: 'أحمد محمد علي',
          studentEmail: 'ahmed@example.com',
          universityName: 'جامعة إسطنبول',
          programName: 'هندسة الحاسوب',
          status: 'pending',
          submittedAt: '2024-01-15',
          lastUpdate: '2024-01-20',
          documents: 8,
          priority: 'high',
          country: 'saudi'
        },
        {
          id: '2',
          studentName: 'فاطمة أحمد',
          studentEmail: 'fatema@example.com',
          universityName: 'جامعة أنقرة',
          programName: 'إدارة الأعمال',
          status: 'under_review',
          submittedAt: '2024-01-10',
          lastUpdate: '2024-01-18',
          documents: 6,
          priority: 'medium',
          country: 'uae'
        },
        {
          id: '3',
          studentName: 'محمد حسن',
          studentEmail: 'mohamed@example.com',
          universityName: 'جامعة إزمير',
          programName: 'الطب',
          status: 'accepted',
          submittedAt: '2024-01-05',
          lastUpdate: '2024-01-22',
          documents: 10,
          priority: 'high',
          country: 'kuwait'
        },
        {
          id: '4',
          studentName: 'سارة خالد',
          studentEmail: 'sara@example.com',
          universityName: 'جامعة بوغازيتشي',
          programName: 'الهندسة المدنية',
          status: 'rejected',
          submittedAt: '2024-01-08',
          lastUpdate: '2024-01-25',
          documents: 7,
          priority: 'low',
          country: 'qatar'
        },
        {
          id: '5',
          studentName: 'عبدالله أحمد',
          studentEmail: 'abdullah@example.com',
          universityName: 'جامعة الشرق الأوسط التقنية',
          programName: 'علوم الحاسب',
          status: 'completed',
          submittedAt: '2024-01-01',
          lastUpdate: '2024-01-30',
          documents: 9,
          priority: 'medium',
          country: 'bahrain'
        }
      ];
      
      setApplications(mockApplications);
    } catch (error) {
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل الطلبات",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">قيد الانتظار</Badge>;
      case 'under_review':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">قيد المراجعة</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">مقبول</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">مرفوض</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">مكتمل</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">عالية</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">متوسطة</Badge>;
      case 'low':
        return <Badge variant="outline">منخفضة</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleViewDetails = (application: Application) => {
    navigate(`/admin/applications/${application.id}`);
  };

  const handleEdit = (application: Application) => {
    toast({
      title: "تعديل الطلب",
      description: `جاري فتح صفحة تعديل طلب ${application.studentName}`
    });
    // يمكن إضافة التنقل لصفحة التعديل هنا
  };

  const handleDelete = (application: Application) => {
    toast({
      title: "حذف الطلب",
      description: `تم حذف طلب ${application.studentName}`,
      variant: "destructive"
    });
    // يمكن إضافة منطق الحذف هنا
  };

  const handleBulkAction = (action: string, items: string[]) => {
    console.log('Bulk action:', action, 'Items:', items);
    
    switch (action) {
      case 'approve':
        toast({
          title: "تم قبول الطلبات",
          description: `تم قبول ${items.length} طلب بنجاح`
        });
        break;
      case 'reject':
        toast({
          title: "تم رفض الطلبات", 
          description: `تم رفض ${items.length} طلب`,
          variant: "destructive"
        });
        break;
      case 'export':
        toast({
          title: "جاري التصدير",
          description: `جاري تصدير ${items.length} طلب...`
        });
        break;
      case 'send_email':
        toast({
          title: "جاري إرسال البريد الإلكتروني",
          description: `جاري إرسال بريد إلكتروني لـ ${items.length} طالب`
        });
        break;
      case 'delete':
        // تحديث البيانات المحلية
        setApplications(prev => prev.filter(app => !items.includes(app.id)));
        toast({
          title: "تم الحذف",
          description: `تم حذف ${items.length} طلب بنجاح`,
          variant: "destructive"
        });
        break;
    }
  };

  const columns = [
    {
      header: 'اسم الطالب',
      accessor: 'studentName',
      sortable: true
    },
    {
      header: 'البريد الإلكتروني',
      accessor: 'studentEmail',
      hideOnMobile: true,
      sortable: true
    },
    {
      header: 'الجامعة',
      accessor: 'universityName',
      hideOnMobile: true,
      sortable: true
    },
    {
      header: 'البرنامج',
      accessor: 'programName',
      sortable: true
    },
    {
      header: 'الحالة',
      accessor: 'status',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    },
    {
      header: 'الأولوية',
      accessor: 'priority',
      sortable: true,
      render: (value: string) => getPriorityBadge(value)
    },
    {
      header: 'المستندات',
      accessor: 'documents',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4 text-unlimited-blue" />
          <span>{value}</span>
        </div>
      )
    },
    {
      header: 'تاريخ التقديم',
      accessor: 'submittedAt',
      hideOnMobile: true,
      sortable: true
    }
  ];

  const getStatistics = () => {
    return {
      pending: applications.filter(a => a.status === 'pending').length,
      under_review: applications.filter(a => a.status === 'under_review').length,
      accepted: applications.filter(a => a.status === 'accepted').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      total: applications.length
    };
  };

  const stats = getStatistics();

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">
              إدارة الطلبات
            </h1>
            <p className="text-unlimited-gray mt-2">
              إدارة ومتابعة جميع طلبات الطلاب ({stats.total} طلب)
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/apply')}>
              <Plus className="h-4 w-4 mr-2" />
              طلب جديد
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-unlimited-blue" />
                <div>
                  <p className="text-2xl font-bold text-unlimited-blue">{stats.total}</p>
                  <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  <p className="text-sm text-gray-600">قيد الانتظار</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.under_review}</p>
                  <p className="text-sm text-gray-600">قيد المراجعة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                  <p className="text-sm text-gray-600">مقبولة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                  <p className="text-sm text-gray-600">مرفوضة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Table */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الطلبات</CardTitle>
            <CardDescription>
              إدارة شاملة لجميع الطلبات مع إمكانيات البحث والفلترة والإجراءات المجمعة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedFilterableTable
              data={applications}
              columns={columns}
              isLoading={isLoading}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBulkAction={handleBulkAction}
              searchPlaceholder="البحث في الطلبات..."
              enableBulkActions={true}
              enableSearch={true}
              enableExport={true}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManageApplications;
