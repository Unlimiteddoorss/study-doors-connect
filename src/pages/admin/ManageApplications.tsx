
import { useState, useEffect } from 'react';
import { Archive, CheckCircle, Clock, Download, FileText, MoreHorizontal, Search, Trash, Upload, X, Eye } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

type ApplicationStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'completed' | 'archived';

type Application = {
  id: string;
  studentId?: string;
  studentName?: string;
  program: string;
  university: string;
  createdDate?: string;
  updatedDate?: string;
  date?: string;
  status: ApplicationStatus;
  agentName?: string;
  hasDocs?: boolean;
  documents?: {
    name: string;
    status: 'uploaded' | 'required' | 'approved';
  }[];
};

const initialApplications: Application[] = [
  {
    id: 'APP-2023-001',
    studentId: 'STD-001',
    studentName: 'أحمد محمد',
    program: 'هندسة البرمجيات',
    university: 'جامعة لندن',
    createdDate: '2023-04-01',
    updatedDate: '2023-04-05',
    status: 'approved' as ApplicationStatus,
    agentName: 'محمد العلي',
    hasDocs: true,
  },
  {
    id: 'APP-2023-002',
    studentId: 'STD-002',
    studentName: 'سارة عبدالله',
    program: 'علوم الحاسب',
    university: 'جامعة تورنتو',
    createdDate: '2023-04-02',
    updatedDate: '2023-04-02',
    status: 'pending' as ApplicationStatus,
    hasDocs: true,
  },
  {
    id: 'APP-2023-003',
    studentId: 'STD-003',
    studentName: 'عمر خالد',
    program: 'إدارة الأعمال',
    university: 'جامعة ملبورن',
    createdDate: '2023-04-03',
    updatedDate: '2023-04-07',
    status: 'processing',
    agentName: 'فهد الراشد',
    hasDocs: true,
  },
  {
    id: 'APP-2023-004',
    studentId: 'STD-004',
    studentName: 'فاطمة علي',
    program: 'الطب البشري',
    university: 'جامعة برلين',
    createdDate: '2023-04-04',
    updatedDate: '2023-04-09',
    status: 'rejected',
    hasDocs: true,
  },
  {
    id: 'APP-2023-005',
    studentId: 'STD-005',
    studentName: 'محمد أحمد',
    program: 'علوم البيانات',
    university: 'جامعة طوكيو',
    createdDate: '2023-04-05',
    updatedDate: '2023-04-12',
    status: 'completed',
    agentName: 'سارة المحمود',
    hasDocs: true,
  },
  {
    id: 'APP-2023-006',
    studentId: 'STD-006',
    studentName: 'نورة سعيد',
    program: 'الهندسة المدنية',
    university: 'جامعة السوربون',
    createdDate: '2023-04-06',
    updatedDate: '2023-04-15',
    status: 'archived',
    agentName: 'خالد الأحمد',
    hasDocs: true,
  },
  {
    id: 'APP-2023-007',
    studentId: 'STD-007',
    studentName: 'خالد سعد',
    program: 'الذكاء الاصطناعي',
    university: 'جامعة أكسفورد',
    createdDate: '2023-04-07',
    updatedDate: '2023-04-07',
    status: 'pending',
    hasDocs: false,
  },
];

const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-unlimited-warning text-white', icon: Clock },
  processing: { label: 'قيد المعالجة', color: 'bg-unlimited-info text-white', icon: FileText },
  approved: { label: 'مقبول', color: 'bg-unlimited-success text-white', icon: CheckCircle },
  rejected: { label: 'مرفوض', color: 'bg-unlimited-danger text-white', icon: X },
  completed: { label: 'مكتمل', color: 'bg-unlimited-blue text-white', icon: CheckCircle },
  archived: { label: 'مؤرشف', color: 'bg-unlimited-gray text-white', icon: Archive },
};

const ManageApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useTranslation();
  const [importFile, setImportFile] = useState<File | null>(null);
  const [academicYearFilter, setAcademicYearFilter] = useState<string>('all');
  const academicYears = ['2023-2024', '2024-2025', '2025-2026', '2026-2027'];

  useEffect(() => {
    setIsLoading(true);
    
    try {
      const adminAppsString = localStorage.getItem('adminApplications');
      let adminApps = adminAppsString ? JSON.parse(adminAppsString) : [];
      
      if (adminApps.length === 0) {
        const studentAppsString = localStorage.getItem('studentApplications');
        const studentApps = studentAppsString ? JSON.parse(studentAppsString) : [];
        
        if (studentApps.length > 0) {
          adminApps = [...studentApps];
          localStorage.setItem('adminApplications', JSON.stringify(adminApps));
        }
      }
      
      if (adminApps.length === 0) {
        adminApps = initialApplications;
        localStorage.setItem('adminApplications', JSON.stringify(adminApps));
      }
      
      setApplications(adminApps);
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications(initialApplications);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredApplications = applications.filter((application) => {
    const matchesSearch = 
      (application.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.program.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesAcademicYear = academicYearFilter === 'all' || 
      (application.createdDate && application.createdDate.includes(academicYearFilter));
    
    return matchesSearch && matchesStatus && matchesAcademicYear;
  });

  const handleImportApplications = () => {
    if (!importFile) {
      toast({
        title: t("application.import.selectFile"),
        description: t("application.import.instructions"),
        variant: "destructive",
      });
      return;
    }

    // В реальном приложении здесь был бы код для обработки файла Excel
    // Имитируем успешный импорт
    setTimeout(() => {
      toast({
        title: t("application.import.success"),
        description: t("application.import.successDesc"),
      });
      setIsImportDialogOpen(false);
      setImportFile(null);
    }, 1000);
  };

  const handleExportApplications = () => {
    // В реальном приложении здесь был бы код для экспорта в Excel
    // Имитируем успешный экспорт
    setTimeout(() => {
      toast({
        title: t("application.export.success"),
        description: t("application.export.successDesc"),
      });
      
      // Создаем фиктивный элемент для "скачивания" файла
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,');
      element.setAttribute('download', `applications_export_${new Date().toISOString().slice(0,10)}.xlsx`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImportFile(e.target.files[0]);
    }
  };

  const handleDeleteApplication = (id: string) => {
    const updatedApplications = applications.filter((application) => application.id !== id);
    setApplications(updatedApplications);
    localStorage.setItem('adminApplications', JSON.stringify(updatedApplications));
    
    try {
      const studentAppsString = localStorage.getItem('studentApplications');
      if (studentAppsString) {
        const studentApps = JSON.parse(studentAppsString);
        const updatedStudentApps = studentApps.filter((app: any) => app.id !== id);
        localStorage.setItem('studentApplications', JSON.stringify(updatedStudentApps));
      }
    } catch (error) {
      console.error("Error updating student applications:", error);
    }
    
    toast({
      title: "تم حذف الطلب",
      description: `تم حذف الطلب رقم ${id} بنجاح`,
    });
  };

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (id: string, newStatus: ApplicationStatus) => {
    const updatedApplications = applications.map((application) =>
      application.id === id
        ? {
            ...application,
            status: newStatus,
            updatedDate: new Date().toISOString().split('T')[0],
          }
        : application
    );
    
    setApplications(updatedApplications);
    localStorage.setItem('adminApplications', JSON.stringify(updatedApplications));
    
    try {
      const studentAppsString = localStorage.getItem('studentApplications');
      if (studentAppsString) {
        const studentApps = JSON.parse(studentAppsString);
        const updatedStudentApps = studentApps.map((app: any) => 
          app.id === id
            ? { 
                ...app, 
                status: newStatus,
                statusColor: getStatusColorClass(newStatus)
              }
            : app
        );
        localStorage.setItem('studentApplications', JSON.stringify(updatedStudentApps));
      }
    } catch (error) {
      console.error("Error updating student applications:", error);
    }
    
    toast({
      title: "تم تحديث الحالة",
      description: `تم تغيير حالة الطلب ${id} إلى ${statusConfig[newStatus].label}`,
    });
  };

  const getStatusColorClass = (status: ApplicationStatus): string => {
    switch(status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': 
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const applicationsByStatus = {
    all: filteredApplications.length,
    pending: filteredApplications.filter(a => a.status === 'pending').length,
    processing: filteredApplications.filter(a => a.status === 'processing').length,
    approved: filteredApplications.filter(a => a.status === 'approved').length,
    rejected: filteredApplications.filter(a => a.status === 'rejected').length,
    completed: filteredApplications.filter(a => a.status === 'completed').length,
    archived: filteredApplications.filter(a => a.status === 'archived').length,
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">{t('admin.applications')}</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('application.actions.import')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.dataManagement.import')}</DialogTitle>
                  <DialogDescription>
                    {t('application.import.instructions')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center"
                    onClick={() => document.getElementById('import-file-input')?.click()}
                  >
                    <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                    <p className="mt-2 text-sm text-unlimited-gray">
                      {t('application.import.dragDrop')}
                    </p>
                    <input 
                      id="import-file-input"
                      type="file" 
                      className="hidden" 
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                    />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('import-file-input')?.click()}>
                      {t('application.import.selectFile')}
                    </Button>
                    {importFile && (
                      <p className="mt-2 text-sm text-unlimited-success">
                        {importFile.name}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleImportApplications}>
                    <Upload className="h-4 w-4 mr-2" />
                    {t('application.actions.import')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportApplications}>
              <Download className="h-4 w-4 mr-2" />
              {t('application.actions.export')}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder={t('application.search.applications')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <Select value={academicYearFilter} onValueChange={setAcademicYearFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('application.filter.academicYear')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('application.filter.allYears')}</SelectItem>
              {academicYears.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
          </div>
        ) : (
          <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as ApplicationStatus | 'all')}>
            <div className="overflow-x-auto">
              <TabsList className="mb-4 inline-flex">
                <TabsTrigger value="all" className="min-w-[80px]">
                  {t('application.tabs.all')}
                  <Badge variant="outline" className="mr-2">{applicationsByStatus.all}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending" className="min-w-[80px]">
                  {t('application.status.pending')}
                  <Badge variant="outline" className="mr-2">{applicationsByStatus.pending}</Badge>
                </TabsTrigger>
                <TabsTrigger value="processing" className="min-w-[80px]">
                  {t('application.status.processing')}
                  <Badge variant="outline" className="mr-2">{applicationsByStatus.processing}</Badge>
                </TabsTrigger>
                <TabsTrigger value="approved" className="min-w-[80px]">
                  {t('application.status.approved')}
                  <Badge variant="outline" className="mr-2">{applicationsByStatus.approved}</Badge>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="min-w-[80px]">
                  {t('application.status.rejected')}
                  <Badge variant="outline" className="mr-2">{applicationsByStatus.rejected}</Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="min-w-[80px]">
                  {t('application.status.completed')}
                  <Badge variant="outline" className="mr-2">{applicationsByStatus.completed}</Badge>
                </TabsTrigger>
                <TabsTrigger value="archived" className="min-w-[80px]">
                  {t('application.status.archived')}
                  <Badge variant="outline" className="mr-2">{applicationsByStatus.archived}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <ApplicationsTable 
                applications={filteredApplications} 
                handleViewApplication={handleViewApplication}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateStatus={handleUpdateStatus}
                t={t}
              />
            </TabsContent>
            
            <TabsContent value="pending">
              <ApplicationsTable 
                applications={filteredApplications.filter(a => a.status === 'pending')} 
                handleViewApplication={handleViewApplication}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateStatus={handleUpdateStatus}
                t={t}
              />
            </TabsContent>
            
            <TabsContent value="processing">
              <ApplicationsTable 
                applications={filteredApplications.filter(a => a.status === 'processing')} 
                handleViewApplication={handleViewApplication}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateStatus={handleUpdateStatus}
                t={t}
              />
            </TabsContent>
            
            <TabsContent value="approved">
              <ApplicationsTable 
                applications={filteredApplications.filter(a => a.status === 'approved')} 
                handleViewApplication={handleViewApplication}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateStatus={handleUpdateStatus}
                t={t}
              />
            </TabsContent>
            
            <TabsContent value="rejected">
              <ApplicationsTable 
                applications={filteredApplications.filter(a => a.status === 'rejected')} 
                handleViewApplication={handleViewApplication}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateStatus={handleUpdateStatus}
                t={t}
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <ApplicationsTable 
                applications={filteredApplications.filter(a => a.status === 'completed')} 
                handleViewApplication={handleViewApplication}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateStatus={handleUpdateStatus}
                t={t}
              />
            </TabsContent>
            
            <TabsContent value="archived">
              <ApplicationsTable 
                applications={filteredApplications.filter(a => a.status === 'archived')} 
                handleViewApplication={handleViewApplication}
                handleDeleteApplication={handleDeleteApplication}
                handleUpdateStatus={handleUpdateStatus}
                t={t}
              />
            </TabsContent>
          </Tabs>
        )}
        
        {selectedApplication && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{t('application.actions.viewDetails')} {selectedApplication.id}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">{t('application.title')}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.id')}</p>
                      <p className="font-medium">{selectedApplication.id}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.status')}</p>
                      <Badge className={statusConfig[selectedApplication.status].color}>
                        {t(`application.status.${selectedApplication.status}`)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.submissionDate')}</p>
                      <p>{selectedApplication.createdDate || selectedApplication.date}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.lastUpdated')}</p>
                      <p>{selectedApplication.updatedDate || selectedApplication.date}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.agent')}</p>
                      <p>{selectedApplication.agentName || 'لا يوجد'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">{t('admin.students')}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.studentId')}</p>
                      <p className="font-medium">{selectedApplication.studentId || 'غير متوفر'}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.studentName')}</p>
                      <p>{selectedApplication.studentName || 'غير متوفر'}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.program')}</p>
                      <p>{selectedApplication.program}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">{t('application.table.university')}</p>
                      <p>{selectedApplication.university}</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg font-bold mb-4">{t('application.documents.title')}</h3>
                  
                  {(selectedApplication.hasDocs || selectedApplication.documents?.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedApplication.documents && selectedApplication.documents.map((doc, idx) => (
                        <div key={idx} className="border rounded p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-8 w-8 text-unlimited-blue ml-2" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-unlimited-gray">
                                {doc.status === 'uploaded' ? t('application.documents.statusUploaded') : 
                                 doc.status === 'approved' ? t('application.documents.approved') : t('application.documents.statusRequired')}
                              </p>
                            </div>
                          </div>
                          {doc.status !== 'required' && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      
                      {!selectedApplication.documents && (
                        <>
                          <div className="border rounded p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-unlimited-blue ml-2" />
                              <div>
                                <p className="font-medium">جواز السفر</p>
                                <p className="text-xs text-unlimited-gray">PDF - 1.2MB</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="border rounded p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-unlimited-blue ml-2" />
                              <div>
                                <p className="font-medium">السجل الأكاديمي</p>
                                <p className="text-xs text-unlimited-gray">PDF - 3.5MB</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-8 border rounded-md bg-gray-50">
                      <FileText className="h-12 w-12 text-unlimited-gray mx-auto mb-2" />
                      <p className="text-unlimited-gray">{t('application.documents.noDocuments')}</p>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.status !== 'processing' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(String(selectedApplication.id), 'processing');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-info hover:bg-unlimited-info/90"
                    >
                      {t('application.actions.process')}
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'approved' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(String(selectedApplication.id), 'approved');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-success hover:bg-unlimited-success/90"
                    >
                      {t('application.actions.approve')}
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'rejected' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(String(selectedApplication.id), 'rejected');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-danger hover:bg-unlimited-danger/90"
                    >
                      {t('application.actions.reject')}
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'completed' && selectedApplication.status !== 'archived' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(String(selectedApplication.id), 'completed');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-blue hover:bg-unlimited-blue/90"
                    >
                      {t('application.actions.complete')}
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'archived' && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        handleUpdateStatus(String(selectedApplication.id), 'archived');
                        setIsViewDialogOpen(false);
                      }}
                    >
                      {t('application.actions.archive')}
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline"
                    onClick={() => setIsViewDialogOpen(false)}
                  >
                    {t('application.actions.close')}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

interface ApplicationsTableProps {
  applications: Application[];
  handleViewApplication: (application: Application) => void;
  handleDeleteApplication: (id: string) => void;
  handleUpdateStatus: (id: string, status: ApplicationStatus) => void;
  t: (key: string) => string;
}

const ApplicationsTable = ({ 
  applications,
  handleViewApplication,
  handleDeleteApplication,
  handleUpdateStatus,
  t
}: ApplicationsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">{t('application.table.id')}</TableHead>
            <TableHead>{t('application.table.studentName')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('application.table.program')}</TableHead>
            <TableHead className="hidden lg:table-cell">{t('application.table.university')}</TableHead>
            <TableHead>{t('application.table.status')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('application.table.submissionDate')}</TableHead>
            <TableHead>{t('application.table.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-40 text-unlimited-gray">
                {t('application.noApplications.message')}
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell>
                  <div>
                    <p>{application.studentName || 'لا يوجد اسم'}</p>
                    {application.agentName && (
                      <p className="text-xs text-unlimited-gray">وكيل: {application.agentName}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{application.program}</TableCell>
                <TableCell className="hidden lg:table-cell">{application.university}</TableCell>
                <TableCell>
                  <Badge className={application.status === 'approved' ? 'bg-unlimited-success text-white' : 
                                  application.status === 'rejected' ? 'bg-unlimited-danger text-white' :
                                  application.status === 'pending' ? 'bg-unlimited-warning text-white' :
                                  application.status === 'processing' ? 'bg-unlimited-info text-white' :
                                  application.status === 'completed' ? 'bg-unlimited-blue text-white' :
                                  'bg-unlimited-gray text-white'}>
                    {t(`application.status.${application.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{application.createdDate || application.date || 'غير متوفر'}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleViewApplication(application)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('application.actions.options')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {application.status !== 'approved' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(String(application.id), 'approved')}>
                            <CheckCircle className="h-4 w-4 ml-2 text-unlimited-success" />
                            {t('application.actions.approve')}
                          </DropdownMenuItem>
                        )}
                        {application.status !== 'rejected' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(String(application.id), 'rejected')}>
                            <X className="h-4 w-4 ml-2 text-unlimited-danger" />
                            {t('application.actions.reject')}
                          </DropdownMenuItem>
                        )}
                        {application.status !== 'archived' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(String(application.id), 'archived')}>
                            <Archive className="h-4 w-4 ml-2" />
                            {t('application.actions.archive')}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-unlimited-danger focus:text-unlimited-danger"
                          onClick={() => handleDeleteApplication(String(application.id))}
                        >
                          <Trash className="h-4 w-4 ml-2" />
                          {t('application.actions.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageApplications;
