
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  university: string;
  program: string;
  degreeType: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  lastUpdated: string;
  documentsStatus: 'complete' | 'incomplete' | 'pending';
  universityResponse?: string;
}

const StudentApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      // محاكاة جلب البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockApplications: Application[] = [
        {
          id: '1',
          university: 'جامعة إسطنبول',
          program: 'هندسة الحاسوب',
          degreeType: 'بكالوريوس',
          status: 'under_review',
          submittedAt: '2024-01-15',
          lastUpdated: '2024-01-20',
          documentsStatus: 'complete'
        },
        {
          id: '2',
          university: 'جامعة البوسفور',
          program: 'إدارة الأعمال',
          degreeType: 'ماجستير',
          status: 'approved',
          submittedAt: '2024-01-10',
          lastUpdated: '2024-01-25',
          documentsStatus: 'complete',
          universityResponse: 'تم قبولك في البرنامج. يرجى إكمال إجراءات التسجيل.'
        },
        {
          id: '3',
          university: 'جامعة أنقرة',
          program: 'الطب',
          degreeType: 'بكالوريوس',
          status: 'pending',
          submittedAt: '2024-02-01',
          lastUpdated: '2024-02-01',
          documentsStatus: 'incomplete'
        }
      ];
      
      setApplications(mockApplications);
    } catch (error) {
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل طلباتك",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />مقبول</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />مرفوض</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />قيد المراجعة</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800"><AlertCircle className="h-3 w-3 mr-1" />في الانتظار</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const getDocumentsStatusBadge = (status: Application['documentsStatus']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">مكتملة</Badge>;
      case 'incomplete':
        return <Badge className="bg-red-100 text-red-800">ناقصة</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status).length;
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">
              طلباتي
            </h1>
            <p className="text-unlimited-gray mt-2">
              تابع حالة طلباتك وإدارة المستندات
            </p>
          </div>
          <Link to="/apply">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              طلب جديد
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">مقبولة</p>
                  <p className="text-2xl font-bold">{getApplicationsByStatus('approved')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">قيد المراجعة</p>
                  <p className="text-2xl font-bold">{getApplicationsByStatus('under_review')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">في الانتظار</p>
                  <p className="text-2xl font-bold">{getApplicationsByStatus('pending')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث في الطلبات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="pending">في الانتظار</option>
                  <option value="under_review">قيد المراجعة</option>
                  <option value="approved">مقبولة</option>
                  <option value="rejected">مرفوضة</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue mx-auto"></div>
              <p className="mt-2 text-gray-600">جاري تحميل الطلبات...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
                <p className="text-gray-600 mb-4">لم تقم بتقديم أي طلبات بعد</p>
                <Link to="/apply">
                  <Button>قدم طلبك الأول</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{application.university}</h3>
                        {getStatusBadge(application.status)}
                      </div>
                      <p className="text-gray-600 mb-1">{application.program} - {application.degreeType}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          تاريخ التقديم: {new Date(application.submittedAt).toLocaleDateString('ar-SA')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          آخر تحديث: {new Date(application.lastUpdated).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-600">حالة المستندات:</span>
                        {getDocumentsStatusBadge(application.documentsStatus)}
                      </div>
                      {application.universityResponse && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">{application.universityResponse}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        رسائل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplications;
