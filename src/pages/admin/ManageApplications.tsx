
import { useState } from 'react';
import { FileText, CheckCircle, Clock, XCircle, Download, Edit, Eye, MoreHorizontal, Search, Filter, Calendar, User } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/admin/FormDialog';
import { AdminPageActions } from '@/components/admin/AdminPageActions';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useTableFilters } from '@/hooks/admin/useTableFilters';
import { TablePagination } from '@/components/admin/TablePagination';
import { TableSkeleton } from '@/components/admin/TableSkeleton';
import { useAdminActions } from '@/hooks/admin/useAdminActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  programName: string;
  universityName: string;
  submissionDate: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
  priority: 'high' | 'medium' | 'low';
  documents: number;
  agentName?: string;
}

const dummyApplications: Application[] = [
  {
    id: "APP001",
    studentName: "أحمد محمد علي",
    studentEmail: "ahmed@example.com",
    programName: "علوم الحاسوب",
    universityName: "جامعة إسطنبول التقنية",
    submissionDate: "2024-01-15",
    status: "pending",
    priority: "high",
    documents: 8,
    agentName: "سارة أحمد"
  },
  {
    id: "APP002",
    studentName: "فاطمة حسن",
    studentEmail: "fatima@example.com",
    programName: "الهندسة الميكانيكية",
    universityName: "جامعة الشرق الأوسط التقنية",
    submissionDate: "2024-01-14",
    status: "under_review",
    priority: "medium",
    documents: 7,
    agentName: "محمد يوسف"
  },
  {
    id: "APP003",
    studentName: "عبدالله يوسف",
    studentEmail: "abdullah@example.com",
    programName: "الطب البشري",
    universityName: "جامعة أنقرة",
    submissionDate: "2024-01-13",
    status: "accepted",
    priority: "high",
    documents: 9
  },
  {
    id: "APP004",
    studentName: "نور الدين",
    studentEmail: "nour@example.com",
    programName: "إدارة الأعمال",
    universityName: "جامعة بيلكنت",
    submissionDate: "2024-01-12",
    status: "rejected",
    priority: "low",
    documents: 5,
    agentName: "علي حسين"
  },
  {
    id: "APP005",
    studentName: "ليلى محمود",
    studentEmail: "layla@example.com",
    programName: "هندسة الحاسوب",
    universityName: "جامعة كوتش",
    submissionDate: "2024-01-11",
    status: "waitlisted",
    priority: "medium",
    documents: 6
  }
];

const itemsPerPage = 10;

const ManageApplications = () => {
  const [applications, setApplications] = useState<Application[]>(dummyApplications);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { 
    isLoading: isActionLoading, 
    handleAction 
  } = useAdminActions();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems: filteredApplications
  } = useTableFilters(
    applications,
    ['studentName', 'studentEmail', 'programName', 'universityName'],
    [
      { field: 'status', defaultValue: 'all' },
      { field: 'priority', defaultValue: 'all' }
    ]
  );

  // حساب الإحصائيات
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const underReviewApplications = applications.filter(app => app.status === 'under_review').length;
  const acceptedApplications = applications.filter(app => app.status === 'accepted').length;
  const rejectedApplications = applications.filter(app => app.status === 'rejected').length;
  const waitlistedApplications = applications.filter(app => app.status === 'waitlisted').length;

  const updateApplicationStatus = (id: string, newStatus: Application['status']) => {
    handleAction(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        setApplications(
          applications.map((app) =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        );
      },
      {
        successMessage: "تم تحديث حالة الطلب بنجاح"
      }
    );
  };

  const handleViewApplication = (id: string) => {
    setSelectedApplicationId(id);
    setIsViewDialogOpen(true);
  };

  const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-600 text-white' },
    under_review: { label: 'قيد المراجعة', color: 'bg-blue-600 text-white' },
    accepted: { label: 'مقبول', color: 'bg-green-600 text-white' },
    rejected: { label: 'مرفوض', color: 'bg-red-600 text-white' },
    waitlisted: { label: 'قائمة الانتظار', color: 'bg-purple-600 text-white' },
  };

  const priorityConfig = {
    high: { label: 'عالية', color: 'bg-red-100 text-red-800' },
    medium: { label: 'متوسطة', color: 'bg-yellow-100 text-yellow-800' },
    low: { label: 'منخفضة', color: 'bg-green-100 text-green-800' },
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const currentItems = filteredApplications.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const selectedApplication = selectedApplicationId ? 
    applications.find(app => app.id === selectedApplicationId) : null;

  return (
    <DashboardLayout userRole="admin">
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة طلبات القبول</h2>
          
          <AdminPageActions 
            onAdd={() => {}}
            onImport={() => {}}
            onExport={() => {}}
            addLabel="طلب جديد"
            importLabel="استيراد الطلبات"
            exportLabel="تصدير الطلبات"
            isLoading={isActionLoading}
          />
        </div>
        
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-dark-blue">{totalApplications}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">قيد الانتظار</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-2xl font-bold text-yellow-600">{pendingApplications}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">قيد المراجعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Eye className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-blue-600">{underReviewApplications}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">مقبولة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-green-600">{acceptedApplications}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">مرفوضة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-600 mr-2" />
                <span className="text-2xl font-bold text-red-600">{rejectedApplications}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">قائمة الانتظار</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-purple-600">{waitlistedApplications}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* مرشحات البحث */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="ابحث في الطلبات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="حالة الطلب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="under_review">قيد المراجعة</SelectItem>
                <SelectItem value="accepted">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
                <SelectItem value="waitlisted">قائمة الانتظار</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.priority} onValueChange={(value) => setFilters({...filters, priority: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأولويات</SelectItem>
                <SelectItem value="high">عالية</SelectItem>
                <SelectItem value="medium">متوسطة</SelectItem>
                <SelectItem value="low">منخفضة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* جدول الطلبات */}
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>اسم الطالب</TableHead>
                <TableHead>البرنامج</TableHead>
                <TableHead>الجامعة</TableHead>
                <TableHead>تاريخ التقديم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الأولوية</TableHead>
                <TableHead>المستندات</TableHead>
                <TableHead>الوكيل</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton columns={10} rows={itemsPerPage} />
              ) : currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-40 text-unlimited-gray">
                    لم يتم العثور على طلبات
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.studentName}</p>
                        <p className="text-xs text-unlimited-gray">{application.studentEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{application.programName}</TableCell>
                    <TableCell>{application.universityName}</TableCell>
                    <TableCell>{new Date(application.submissionDate).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[application.status].color}>
                        {statusConfig[application.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={priorityConfig[application.priority].color}>
                        {priorityConfig[application.priority].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {application.documents}
                      </div>
                    </TableCell>
                    <TableCell>
                      {application.agentName ? (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {application.agentName}
                        </div>
                      ) : (
                        <span className="text-unlimited-gray">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewApplication(application.id)}
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
                            <DropdownMenuLabel>تغيير الحالة</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, 'under_review')}>
                              قيد المراجعة
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, 'accepted')}>
                              قبول
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, 'rejected')}>
                              رفض
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, 'waitlisted')}>
                              قائمة الانتظار
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
        
        {filteredApplications.length > itemsPerPage && (
          <div className="py-4 flex justify-center">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Dialog عرض تفاصيل الطلب */}
        {selectedApplication && (
          <FormDialog
            open={isViewDialogOpen}
            onOpenChange={setIsViewDialogOpen}
            title="تفاصيل طلب القبول"
            description={`طلب رقم: ${selectedApplication.id}`}
            onSubmit={() => setIsViewDialogOpen(false)}
            submitLabel="إغلاق"
            isLoading={false}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">اسم الطالب</label>
                  <p className="font-medium">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">البريد الإلكتروني</label>
                  <p>{selectedApplication.studentEmail}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">البرنامج</label>
                  <p>{selectedApplication.programName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الجامعة</label>
                  <p>{selectedApplication.universityName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">تاريخ التقديم</label>
                  <p>{new Date(selectedApplication.submissionDate).toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">عدد المستندات</label>
                  <p>{selectedApplication.documents} مستند</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الحالة</label>
                  <Badge className={statusConfig[selectedApplication.status].color}>
                    {statusConfig[selectedApplication.status].label}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الأولوية</label>
                  <Badge variant="outline" className={priorityConfig[selectedApplication.priority].color}>
                    {priorityConfig[selectedApplication.priority].label}
                  </Badge>
                </div>
              </div>
              
              {selectedApplication.agentName && (
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الوكيل المسؤول</label>
                  <p>{selectedApplication.agentName}</p>
                </div>
              )}
            </div>
          </FormDialog>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default ManageApplications;
