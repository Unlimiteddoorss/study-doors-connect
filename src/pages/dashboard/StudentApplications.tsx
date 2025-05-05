
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentApplicationHeader from '@/components/student/StudentApplicationHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Calendar, Download, Eye, X, Filter, Plus, FileCheck2, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';

// Interface for application data
interface Application {
  id: string;
  program: string;
  university: string;
  date: string;
  status: string;
  formData?: any;
  progress?: number;
  timeline?: any[];
}

const StudentApplications = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simulate fetching data from the server
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    setIsLoading(true);
    
    // In a real app, fetch from an API
    setTimeout(() => {
      try {
        // Try to get applications from localStorage
        const storedApplications = localStorage.getItem('studentApplications');
        let apps: Application[] = [];
        
        if (storedApplications) {
          apps = JSON.parse(storedApplications);
          
          // Calculate progress for each application if not already present
          apps = apps.map(app => {
            if (!app.progress && app.formData) {
              // Simple progress calculation for demo
              const progress = Math.min(
                Math.floor(
                  Object.keys(app.formData).filter(key => 
                    app.formData[key] && 
                    typeof app.formData[key] === 'object' && 
                    Object.keys(app.formData[key]).length > 0
                  ).length / 4 * 100
                ), 
                100
              );
              return { ...app, progress };
            }
            return app;
          });
        } else {
          // If no apps found, create mock data
          const mockApplications: Application[] = [
            {
              id: 'APP-001',
              program: 'بكالوريوس هندسة البرمجيات',
              university: 'جامعة إسطنبول التقنية',
              date: '2025-04-10',
              status: 'review',
              progress: 75
            },
            {
              id: 'APP-002',
              program: 'ماجستير إدارة الأعمال',
              university: 'جامعة أنقرة',
              date: '2025-03-22',
              status: 'documents',
              progress: 60
            },
            {
              id: 'APP-003',
              program: 'بكالوريوس العلوم الطبية',
              university: 'جامعة إسطنبول',
              date: '2025-02-15',
              status: 'approved',
              progress: 100
            },
            {
              id: 'APP-004',
              program: 'بكالوريوس الهندسة المعمارية',
              university: 'جامعة البسفور',
              date: '2025-01-30',
              status: 'rejected',
              progress: 90
            },
            {
              id: 'APP-005',
              program: 'ماجستير تقنية المعلومات',
              university: 'جامعة أنقرة',
              date: '2025-04-15',
              status: 'conditional',
              progress: 85
            },
          ];

          // Save mock applications to localStorage
          localStorage.setItem('studentApplications', JSON.stringify(mockApplications));
          apps = mockApplications;
        }

        setApplications(apps);
        setFilteredApplications(apps);
      } catch (error) {
        console.error('Error loading applications:', error);
        toast({
          title: t('error.loading', 'خطأ في التحميل'),
          description: t('error.tryAgain', 'حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.'),
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }, 800);
  };

  // Apply filters to the list
  useEffect(() => {
    let result = [...applications];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(app => 
        app.program.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (selectedStatus !== 'all') {
      result = result.filter(app => app.status === selectedStatus);
    }
    
    setFilteredApplications(result);
  }, [searchTerm, selectedStatus, applications]);

  // Get status details (color and label)
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
      case 'draft':
        return {
          color: 'bg-gray-100 text-gray-800',
          label: t('application.status.draft', 'مسودة')
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          label: status 
        };
    }
  };

  // Export data to Excel
  const handleExport = () => {
    toast({
      title: t('application.export.started', 'جاري التصدير'),
      description: t('application.export.preparing', 'جاري إعداد ملف Excel للتحميل'),
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast({
        title: t('application.export.success', 'تم التصدير بنجاح'),
        description: t('application.export.downloadStarted', 'بدأ تحميل الملف'),
      });
    }, 1500);
  };

  // Navigate to application details
  const viewApplicationDetails = (applicationId: string) => {
    navigate(`/dashboard/applications/${applicationId}`);
  };
  
  // Refresh applications list
  const refreshApplications = () => {
    setIsRefreshing(true);
    loadApplications();
  };
  
  // Create new application
  const createNewApplication = () => {
    navigate('/apply');
  };
  
  // Delete application
  const handleDeleteApplication = () => {
    if (!applicationToDelete) return;
    
    try {
      // Get existing applications
      const storedApplications = localStorage.getItem('studentApplications');
      if (!storedApplications) {
        setShowDeleteDialog(false);
        setApplicationToDelete(null);
        return;
      }
      
      // Filter out the application to be deleted
      const apps = JSON.parse(storedApplications);
      const updatedApps = apps.filter((app: Application) => app.id !== applicationToDelete);
      
      // Save updated applications list
      localStorage.setItem('studentApplications', JSON.stringify(updatedApps));
      
      // Update state
      setApplications(updatedApps);
      setFilteredApplications(updatedApps);
      
      // Show success toast
      toast({
        title: t('application.delete.success', 'تم حذف الطلب'),
        description: t('application.delete.description', 'تم حذف الطلب بنجاح'),
      });
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: t('error.title', 'خطأ'),
        description: t('error.delete', 'حدث خطأ أثناء حذف الطلب'),
        variant: 'destructive'
      });
    } finally {
      setShowDeleteDialog(false);
      setApplicationToDelete(null);
    }
  };
  
  // Confirm application deletion
  const confirmDelete = (applicationId: string) => {
    setApplicationToDelete(applicationId);
    setShowDeleteDialog(true);
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
              
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={createNewApplication}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {t('application.buttons.newApplication', 'طلب جديد')}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshApplications}
                  disabled={isRefreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing 
                    ? t('application.buttons.refreshing', 'جاري التحديث...') 
                    : t('application.buttons.refresh', 'تحديث')
                  }
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExport}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t('application.export.toExcel', 'تصدير إلى Excel')}
                </Button>
              </div>
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
                  <TabsTrigger value="draft">{t('application.status.draft', 'مسودة')}</TabsTrigger>
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
                                
                                {app.progress !== undefined && (
                                  <div className="mt-2 w-full max-w-[200px]">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>{t('application.progress', 'تقدم الطلب')}</span>
                                      <span>{app.progress}%</span>
                                    </div>
                                    <Progress 
                                      value={app.progress} 
                                      className={`h-1.5 ${
                                        app.progress >= 90 ? 'bg-green-500' : 
                                        app.progress >= 70 ? 'bg-unlimited-blue' : 
                                        app.progress >= 40 ? 'bg-yellow-500' : 'bg-red-400'
                                      }`} 
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 mt-3 md:mt-0">
                              <Badge className={status.color}>
                                {status.label}
                              </Badge>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="flex items-center gap-1"
                                  >
                                    <Eye className="h-4 w-4" />
                                    <span className="hidden sm:inline">{t('application.actions.options', 'خيارات')}</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>{t('application.actions.title', 'إجراءات الطلب')}</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  
                                  <DropdownMenuItem onClick={() => viewApplicationDetails(app.id)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    {t('application.actions.view', 'عرض التفاصيل')}
                                  </DropdownMenuItem>
                                  
                                  {app.status === 'draft' && (
                                    <DropdownMenuItem onClick={() => navigate(`/apply/${app.id}`)}>
                                      <FileCheck2 className="h-4 w-4 mr-2" />
                                      {t('application.actions.continue', 'متابعة التعبئة')}
                                    </DropdownMenuItem>
                                  )}
                                  
                                  <DropdownMenuItem onClick={() => confirmDelete(app.id)}>
                                    <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                                    <span className="text-red-500">{t('application.actions.delete', 'حذف الطلب')}</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-unlimited-gray mb-4">{t('application.noApplications.message', 'لا توجد طلبات مقدمة بعد')}</p>
                    <Button 
                      variant="default" 
                      onClick={createNewApplication}
                      className="flex items-center gap-2 mx-auto"
                    >
                      <Plus className="h-4 w-4" />
                      {t('application.buttons.createFirst', 'إنشاء أول طلب')}
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {/* Repeat same content for other tabs with filtered data */}
              {['pending', 'documents', 'conditional', 'approved', 'draft', 'rejected'].map((tab) => (
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
                                    
                                    {app.progress !== undefined && (
                                      <div className="mt-2 w-full max-w-[200px]">
                                        <div className="flex justify-between text-xs mb-1">
                                          <span>{t('application.progress', 'تقدم الطلب')}</span>
                                          <span>{app.progress}%</span>
                                        </div>
                                        <Progress 
                                          value={app.progress} 
                                          className={`h-1.5 ${
                                            app.progress >= 90 ? 'bg-green-500' : 
                                            app.progress >= 70 ? 'bg-unlimited-blue' : 
                                            app.progress >= 40 ? 'bg-yellow-500' : 'bg-red-400'
                                          }`} 
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 mt-3 md:mt-0">
                                  <Badge className={status.color}>
                                    {status.label}
                                  </Badge>
                                  
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="flex items-center gap-1"
                                      >
                                        <Eye className="h-4 w-4" />
                                        <span className="hidden sm:inline">{t('application.actions.options', 'خيارات')}</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>{t('application.actions.title', 'إجراءات الطلب')}</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      
                                      <DropdownMenuItem onClick={() => viewApplicationDetails(app.id)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        {t('application.actions.view', 'عرض التفاصيل')}
                                      </DropdownMenuItem>
                                      
                                      {app.status === 'draft' && (
                                        <DropdownMenuItem onClick={() => navigate(`/apply/${app.id}`)}>
                                          <FileCheck2 className="h-4 w-4 mr-2" />
                                          {t('application.actions.continue', 'متابعة التعبئة')}
                                        </DropdownMenuItem>
                                      )}
                                      
                                      <DropdownMenuItem onClick={() => confirmDelete(app.id)}>
                                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                                        <span className="text-red-500">{t('application.actions.delete', 'حذف الطلب')}</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-unlimited-gray mb-4">{t(`application.no${tab}Applications.message`, 'لا توجد طلبات في هذه الحالة')}</p>
                      <Button 
                        variant="default" 
                        onClick={createNewApplication}
                        className="flex items-center gap-2 mx-auto"
                      >
                        <Plus className="h-4 w-4" />
                        {t('application.buttons.createNew', 'إنشاء طلب جديد')}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>

          <CardFooter className="border-t flex justify-between pt-4">
            <div className="text-sm text-unlimited-gray">
              {t('application.totalCount', 'إجمالي الطلبات')}: {applications.length}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={createNewApplication}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {t('application.buttons.newApplication', 'طلب جديد')}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Confirmation Dialog for Deleting Applications */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              {t('application.delete.confirmTitle', 'تأكيد حذف الطلب')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('application.delete.confirmMessage', 'هل أنت متأكد من رغبتك في حذف هذا الطلب؟ هذا الإجراء لا يمكن التراجع عنه.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t('application.delete.cancel', 'إلغاء')}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteApplication}
            >
              {t('application.delete.confirm', 'نعم، حذف الطلب')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default StudentApplications;
