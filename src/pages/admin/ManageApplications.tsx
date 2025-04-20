
import { useState } from 'react';
import { Archive, CheckCircle, Clock, Download, Edit, Eye, FileText, MoreHorizontal, Search, Trash, Upload, X } from 'lucide-react';
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

type ApplicationStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'completed' | 'archived';

type Application = {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  university: string;
  createdDate: string;
  updatedDate: string;
  status: ApplicationStatus;
  agentName?: string;
  hasDocs: boolean;
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
    status: 'approved',
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
    status: 'pending',
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
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const { toast } = useToast();

  const filteredApplications = applications.filter((application) => {
    const matchesSearch = 
      application.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.program.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleImportApplications = () => {
    // محاكاة استيراد بيانات الطلبات
    toast({
      title: "تم استيراد البيانات",
      description: "تم استيراد بيانات الطلبات بنجاح",
    });
    setIsImportDialogOpen(false);
  };

  const handleExportApplications = () => {
    // محاكاة تصدير بيانات الطلبات
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات الطلبات بنجاح",
    });
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter((application) => application.id !== id));
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
    setApplications(
      applications.map((application) =>
        application.id === id
          ? {
              ...application,
              status: newStatus,
              updatedDate: new Date().toISOString().split('T')[0],
            }
          : application
      )
    );
    
    toast({
      title: "تم تحديث الحالة",
      description: `تم تغيير حالة الطلب ${id} إلى ${statusConfig[newStatus].label}`,
    });
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
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة طلبات التسجيل</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>استيراد بيانات الطلبات</DialogTitle>
                  <DialogDescription>
                    يرجى تحميل ملف CSV أو Excel يحتوي على بيانات الطلبات.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                    <p className="mt-2 text-sm text-unlimited-gray">
                      اسحب وأفلت الملف هنا أو انقر للاختيار
                    </p>
                    <input type="file" className="hidden" />
                    <Button variant="outline" className="mt-4">
                      اختيار ملف
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleImportApplications}>
                    <Upload className="h-4 w-4 mr-2" />
                    استيراد البيانات
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportApplications}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="البحث عن طلب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as ApplicationStatus | 'all')}>
          <div className="overflow-x-auto">
            <TabsList className="mb-4 inline-flex">
              <TabsTrigger value="all" className="min-w-[80px]">
                الكل
                <Badge variant="outline" className="ml-2">{applicationsByStatus.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending" className="min-w-[80px]">
                قيد الانتظار
                <Badge variant="outline" className="ml-2">{applicationsByStatus.pending}</Badge>
              </TabsTrigger>
              <TabsTrigger value="processing" className="min-w-[80px]">
                قيد المعالجة
                <Badge variant="outline" className="ml-2">{applicationsByStatus.processing}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved" className="min-w-[80px]">
                مقبول
                <Badge variant="outline" className="ml-2">{applicationsByStatus.approved}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="min-w-[80px]">
                مرفوض
                <Badge variant="outline" className="ml-2">{applicationsByStatus.rejected}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="min-w-[80px]">
                مكتمل
                <Badge variant="outline" className="ml-2">{applicationsByStatus.completed}</Badge>
              </TabsTrigger>
              <TabsTrigger value="archived" className="min-w-[80px]">
                مؤرشف
                <Badge variant="outline" className="ml-2">{applicationsByStatus.archived}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <ApplicationsTable 
              applications={filteredApplications} 
              handleViewApplication={handleViewApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <ApplicationsTable 
              applications={filteredApplications.filter(a => a.status === 'pending')} 
              handleViewApplication={handleViewApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="processing">
            <ApplicationsTable 
              applications={filteredApplications.filter(a => a.status === 'processing')} 
              handleViewApplication={handleViewApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <ApplicationsTable 
              applications={filteredApplications.filter(a => a.status === 'approved')} 
              handleViewApplication={handleViewApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <ApplicationsTable 
              applications={filteredApplications.filter(a => a.status === 'rejected')} 
              handleViewApplication={handleViewApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <ApplicationsTable 
              applications={filteredApplications.filter(a => a.status === 'completed')} 
              handleViewApplication={handleViewApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="archived">
            <ApplicationsTable 
              applications={filteredApplications.filter(a => a.status === 'archived')} 
              handleViewApplication={handleViewApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
        </Tabs>
        
        {/* عرض تفاصيل الطلب */}
        {selectedApplication && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>تفاصيل الطلب {selectedApplication.id}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">معلومات الطلب</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-unlimited-gray text-sm">رقم الطلب</p>
                      <p className="font-medium">{selectedApplication.id}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">الحالة</p>
                      <Badge className={statusConfig[selectedApplication.status].color}>
                        {statusConfig[selectedApplication.status].label}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">تاريخ التقديم</p>
                      <p>{selectedApplication.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">آخر تحديث</p>
                      <p>{selectedApplication.updatedDate}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">الوكيل</p>
                      <p>{selectedApplication.agentName || 'لا يوجد'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">معلومات الطالب</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-unlimited-gray text-sm">رقم الطالب</p>
                      <p className="font-medium">{selectedApplication.studentId}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">اسم الطالب</p>
                      <p>{selectedApplication.studentName}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">البرنامج</p>
                      <p>{selectedApplication.program}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">الجامعة</p>
                      <p>{selectedApplication.university}</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg font-bold mb-4">المستندات</h3>
                  
                  {selectedApplication.hasDocs ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-unlimited-blue mr-2" />
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
                          <FileText className="h-8 w-8 text-unlimited-blue mr-2" />
                          <div>
                            <p className="font-medium">السجل الأكاديمي</p>
                            <p className="text-xs text-unlimited-gray">PDF - 3.5MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="border rounded p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-unlimited-blue mr-2" />
                          <div>
                            <p className="font-medium">شهادة اللغة</p>
                            <p className="text-xs text-unlimited-gray">PDF - 0.8MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="border rounded p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-unlimited-blue mr-2" />
                          <div>
                            <p className="font-medium">السيرة الذاتية</p>
                            <p className="text-xs text-unlimited-gray">PDF - 1.0MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 border rounded-md bg-gray-50">
                      <FileText className="h-12 w-12 text-unlimited-gray mx-auto mb-2" />
                      <p className="text-unlimited-gray">لم يتم رفع أي مستندات لهذا الطلب</p>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.status !== 'processing' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(selectedApplication.id, 'processing');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-info hover:bg-unlimited-info/90"
                    >
                      بدء المعالجة
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'approved' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(selectedApplication.id, 'approved');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-success hover:bg-unlimited-success/90"
                    >
                      قبول الطلب
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'rejected' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(selectedApplication.id, 'rejected');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-danger hover:bg-unlimited-danger/90"
                    >
                      رفض الطلب
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'completed' && selectedApplication.status !== 'archived' && (
                    <Button 
                      onClick={() => {
                        handleUpdateStatus(selectedApplication.id, 'completed');
                        setIsViewDialogOpen(false);
                      }}
                      className="bg-unlimited-blue hover:bg-unlimited-blue/90"
                    >
                      إكمال الطلب
                    </Button>
                  )}
                  
                  {selectedApplication.status !== 'archived' && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        handleUpdateStatus(selectedApplication.id, 'archived');
                        setIsViewDialogOpen(false);
                      }}
                    >
                      أرشفة الطلب
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline"
                    onClick={() => setIsViewDialogOpen(false)}
                  >
                    إغلاق
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
}

const ApplicationsTable = ({ 
  applications,
  handleViewApplication,
  handleDeleteApplication,
  handleUpdateStatus 
}: ApplicationsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">رقم الطلب</TableHead>
            <TableHead>الطالب</TableHead>
            <TableHead className="hidden md:table-cell">البرنامج</TableHead>
            <TableHead className="hidden lg:table-cell">الجامعة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="hidden md:table-cell">تاريخ التقديم</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-40 text-unlimited-gray">
                لا توجد بيانات متطابقة مع البحث
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell>
                  <div>
                    <p>{application.studentName}</p>
                    {application.agentName && (
                      <p className="text-xs text-unlimited-gray">وكيل: {application.agentName}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{application.program}</TableCell>
                <TableCell className="hidden lg:table-cell">{application.university}</TableCell>
                <TableCell>
                  <Badge className={statusConfig[application.status].color}>
                    {statusConfig[application.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{application.createdDate}</TableCell>
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
                        <DropdownMenuLabel>خيارات الطلب</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {application.status !== 'approved' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, 'approved')}>
                            <CheckCircle className="h-4 w-4 mr-2 text-unlimited-success" />
                            قبول الطلب
                          </DropdownMenuItem>
                        )}
                        {application.status !== 'rejected' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, 'rejected')}>
                            <X className="h-4 w-4 mr-2 text-unlimited-danger" />
                            رفض الطلب
                          </DropdownMenuItem>
                        )}
                        {application.status !== 'archived' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(application.id, 'archived')}>
                            <Archive className="h-4 w-4 mr-2" />
                            أرشفة الطلب
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-unlimited-danger focus:text-unlimited-danger"
                          onClick={() => handleDeleteApplication(application.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          حذف
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
