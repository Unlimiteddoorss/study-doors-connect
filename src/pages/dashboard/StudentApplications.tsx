
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentApplicationHeader from '@/components/student/StudentApplicationHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Calendar, Download, Eye, X } from 'lucide-react';

// مكون قائمة التطبيقات
interface Application {
  id: string;
  program: string;
  university: string;
  date: string;
  status: string;
}

const StudentApplications = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // محاكاة جلب البيانات من الخادم
  useEffect(() => {
    // في التطبيق الحقيقي، هذه البيانات ستأتي من الخادم
    const mockApplications: Application[] = [
      {
        id: 'APP-001',
        program: 'بكالوريوس هندسة البرمجيات',
        university: 'جامعة إسطنبول التقنية',
        date: '2025-04-10',
        status: 'review',
      },
      {
        id: 'APP-002',
        program: 'ماجستير إدارة الأعمال',
        university: 'جامعة أنقرة',
        date: '2025-03-22',
        status: 'documents',
      },
      {
        id: 'APP-003',
        program: 'بكالوريوس العلوم الطبية',
        university: 'جامعة إسطنبول',
        date: '2025-02-15',
        status: 'approved',
      },
      {
        id: 'APP-004',
        program: 'بكالوريوس الهندسة المعمارية',
        university: 'جامعة البسفور',
        date: '2025-01-30',
        status: 'rejected',
      },
      {
        id: 'APP-005',
        program: 'ماجستير تقنية المعلومات',
        university: 'جامعة أنقرة',
        date: '2025-04-15',
        status: 'conditional',
      },
    ];

    // حفظ البيانات في التخزين المحلي
    localStorage.setItem('studentApplications', JSON.stringify(mockApplications));
    
    setTimeout(() => {
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setIsLoading(false);
    }, 500);
  }, []);

  // تطبيق الفلاتر على القائمة
  useEffect(() => {
    let result = [...applications];
    
    // فلتر بحث
    if (searchTerm) {
      result = result.filter(app => 
        app.program.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // فلتر الحالة
    if (selectedStatus !== 'all') {
      result = result.filter(app => app.status === selectedStatus);
    }
    
    // يمكن إضافة فلتر السنة الدراسية إذا كان لدينا بيانات متعلقة بالسنة
    
    setFilteredApplications(result);
  }, [searchTerm, selectedStatus, applications]);

  // الحصول على لون خلفية وحالة الطلب
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800', 
          label: t('application.status.pending', 'قيد الانتظار') 
        };
      case 'review':
        return { 
          color: 'bg-blue-100 text-blue-800', 
          label: t('application.status.review', 'قيد المراجعة') 
        };
      case 'documents':
        return { 
          color: 'bg-purple-100 text-purple-800', 
          label: t('application.status.documents', 'بانتظار المستندات') 
        };
      case 'approved':
        return { 
          color: 'bg-green-100 text-green-800', 
          label: t('application.status.approved', 'مقبول') 
        };
      case 'rejected':
        return { 
          color: 'bg-red-100 text-red-800', 
          label: t('application.status.rejected', 'مرفوض') 
        };
      case 'conditional':
        return { 
          color: 'bg-indigo-100 text-indigo-800', 
          label: t('application.status.conditional', 'قبول مشروط') 
        };
      case 'paid':
        return { 
          color: 'bg-green-100 text-green-800', 
          label: t('application.status.paid', 'مدفوع') 
        };
      case 'registered':
        return { 
          color: 'bg-teal-100 text-teal-800', 
          label: t('application.status.registered', 'مسجل') 
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          label: status 
        };
    }
  };

  // تصدير البيانات إلى ملف Excel
  const handleExport = () => {
    alert('سيتم تصدير البيانات إلى ملف Excel');
  };

  // الانتقال إلى صفحة تفاصيل الطلب
  const viewApplicationDetails = (applicationId: string) => {
    navigate(`/dashboard/applications/${applicationId}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <StudentApplicationHeader showNewButton />
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <CardTitle>{t("application.myApplications.title", "طلباتي")}</CardTitle>
                <CardDescription>{t("application.myApplications.subtitle", "قائمة طلبات التقديم الخاصة بك")}</CardDescription>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
                className="flex items-center gap-2 self-end"
              >
                <Download className="h-4 w-4" />
                {t('application.export.toExcel', 'تصدير إلى Excel')}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="all" className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <TabsList className="mb-0">
                  <TabsTrigger value="all">{t('application.tabs.all', 'جميع الطلبات')}</TabsTrigger>
                  <TabsTrigger value="pending">{t('application.status.pending', 'قيد الانتظار')}</TabsTrigger>
                  <TabsTrigger value="documents">{t('application.status.documents', 'المستندات')}</TabsTrigger>
                  <TabsTrigger value="conditional">{t('application.status.conditional', 'مشروط')}</TabsTrigger>
                  <TabsTrigger value="approved">{t('application.status.approved', 'مقبول')}</TabsTrigger>
                  <TabsTrigger value="paid">{t('application.status.paid', 'مدفوع')}</TabsTrigger>
                  <TabsTrigger value="registered">{t('application.status.registered', 'مسجل')}</TabsTrigger>
                  <TabsTrigger value="rejected">{t('application.status.rejected', 'مرفوض')}</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedYear}
                    onValueChange={setSelectedYear}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="2025-2026" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('application.search.applications', 'بحث في الطلبات')}
                      className="pl-9 w-full md:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button 
                        className="absolute right-3 top-2.5"
                        onClick={() => setSearchTerm('')}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                {isLoading ? (
                  <div className="py-20 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
                  </div>
                ) : filteredApplications.length > 0 ? (
                  <div className="space-y-3 mt-4">
                    {filteredApplications.map((app) => {
                      const status = getStatusDetails(app.status);
                      return (
                        <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-start gap-3">
                              <div className="bg-unlimited-blue/10 p-2 rounded-full hidden sm:flex">
                                <FileText className="h-5 w-5 text-unlimited-blue" />
                              </div>
                              <div>
                                <h3 className="font-medium text-unlimited-dark-blue">{app.program}</h3>
                                <p className="text-sm text-unlimited-gray">{app.university}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">{app.id}</Badge>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar className="h-3 w-3" />
                                    <span>{app.date}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 mt-3 md:mt-0">
                              <Badge className={status.color}>
                                {status.label}
                              </Badge>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => viewApplicationDetails(app.id)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="hidden sm:inline">{t('view', 'عرض')}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-unlimited-gray">{t('application.noApplications.message', 'لا توجد طلبات مقدمة بعد')}</p>
                  </div>
                )}
              </TabsContent>
              
              {/* تكرار نفس المحتوى للتبويبات الأخرى */}
              {['pending', 'documents', 'conditional', 'approved', 'paid', 'registered', 'rejected'].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  {isLoading ? (
                    <div className="py-20 flex justify-center items-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
                    </div>
                  ) : filteredApplications.filter(app => app.status === tab).length > 0 ? (
                    <div className="space-y-3 mt-4">
                      {filteredApplications
                        .filter(app => app.status === tab)
                        .map((app) => {
                          const status = getStatusDetails(app.status);
                          return (
                            <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex items-start gap-3">
                                  <div className="bg-unlimited-blue/10 p-2 rounded-full hidden sm:flex">
                                    <FileText className="h-5 w-5 text-unlimited-blue" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-unlimited-dark-blue">{app.program}</h3>
                                    <p className="text-sm text-unlimited-gray">{app.university}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Badge variant="outline" className="text-xs">{app.id}</Badge>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Calendar className="h-3 w-3" />
                                        <span>{app.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 mt-3 md:mt-0">
                                  <Badge className={status.color}>
                                    {status.label}
                                  </Badge>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="flex items-center gap-1"
                                    onClick={() => viewApplicationDetails(app.id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                    <span className="hidden sm:inline">{t('view', 'عرض')}</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-unlimited-gray">{t('application.noApplications.message', 'لا توجد طلبات مقدمة بعد')}</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplications;
