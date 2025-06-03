
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FilterableTable } from '@/components/admin/FilterableTable';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle,
  Clock,
  FileText,
  Plus
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
}

const ManageApplications = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchQuery, statusFilter, priorityFilter]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      // محاكاة جلب البيانات
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
          priority: 'high'
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
          priority: 'medium'
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
          priority: 'high'
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

  const filterApplications = () => {
    let filtered = applications;

    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.programName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(app => app.priority === priorityFilter);
    }

    setFilteredApplications(filtered);
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
  };

  const handleDelete = (application: Application) => {
    toast({
      title: "حذف الطلب",
      description: `تم حذف طلب ${application.studentName}`,
      variant: "destructive"
    });
  };

  const handleExport = () => {
    toast({
      title: "تصدير البيانات",
      description: "جاري تحضير ملف Excel..."
    });
  };

  const columns = [
    {
      header: 'اسم الطالب',
      accessor: 'studentName'
    },
    {
      header: 'البريد الإلكتروني',
      accessor: 'studentEmail',
      hideOnMobile: true
    },
    {
      header: 'الجامعة',
      accessor: 'universityName',
      hideOnMobile: true
    },
    {
      header: 'البرنامج',
      accessor: 'programName'
    },
    {
      header: 'الحالة',
      accessor: 'status',
      render: (value: string) => getStatusBadge(value)
    },
    {
      header: 'الأولوية',
      accessor: 'priority',
      render: (value: string) => getPriorityBadge(value)
    },
    {
      header: 'المستندات',
      accessor: 'documents',
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
      hideOnMobile: true
    }
  ];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">
              إدارة الطلبات
            </h1>
            <p className="text-unlimited-gray mt-2">
              إدارة ومتابعة جميع طلبات الطلاب
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
            <Button onClick={() => navigate('/apply')}>
              <Plus className="h-4 w-4 mr-2" />
              طلب جديد
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {applications.filter(a => a.status === 'pending').length}
                  </p>
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
                  <p className="text-2xl font-bold text-blue-600">
                    {applications.filter(a => a.status === 'under_review').length}
                  </p>
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
                  <p className="text-2xl font-bold text-green-600">
                    {applications.filter(a => a.status === 'accepted').length}
                  </p>
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
                  <p className="text-2xl font-bold text-red-600">
                    {applications.filter(a => a.status === 'rejected').length}
                  </p>
                  <p className="text-sm text-gray-600">مرفوضة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والفلترة</CardTitle>
            <CardDescription>
              استخدم الأدوات التالية للبحث وفلترة الطلبات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث في الطلبات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="حالة الطلب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="under_review">قيد المراجعة</SelectItem>
                  <SelectItem value="accepted">مقبول</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأولويات</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="low">منخفضة</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                فلاتر متقدمة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الطلبات ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <FilterableTable
              data={filteredApplications}
              columns={columns}
              isLoading={isLoading}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManageApplications;
