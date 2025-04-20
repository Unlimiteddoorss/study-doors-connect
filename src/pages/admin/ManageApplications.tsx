import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminPageActions } from '@/components/admin/AdminPageActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/admin/TablePagination';
import { TableSkeleton } from '@/components/admin/TableSkeleton';
import { Check, Clock, FileText, Search, User, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
} from "@/components/ui/select";
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { FormDialog } from '@/components/admin/FormDialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface Application {
  id: string;
  status: string;
  studentName: string;
  studentEmail: string;
  university: string;
  program: string;
  submissionDate: string;
  lastUpdate: string;
  important: boolean;
  unread: boolean;
}

const statusOptions = [
  { value: 'all', label: 'كل الحالات' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'reviewing', label: 'قيد المراجعة' },
  { value: 'accepted', label: 'تم القبول' },
  { value: 'rejected', label: 'تم الرفض' },
];

const ManageApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [noteDialog, setNoteDialog] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [statusDialog, setStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

  useEffect(() => {
    const loadApplications = () => {
      try {
        const savedApplications = localStorage.getItem('adminApplications');
        if (savedApplications) {
          const parsed = JSON.parse(savedApplications);
          setApplications(parsed);
          setFilteredApplications(parsed);
        }
      } catch (error) {
        console.error('Error loading applications:', error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(loadApplications, 800);
  }, []);

  useEffect(() => {
    const filtered = applications.filter(application => {
      const matchesSearch = 
        application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.program.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, applications]);

  const handleAddNote = () => {
    setIsSubmitting(true);
    
    if (!selectedApplication) return;
    
    setTimeout(() => {
      const updatedApplications = applications.map(app => {
        if (app.id === selectedApplication.id) {
          const appData = JSON.parse(localStorage.getItem('adminApplications') || '[]');
          const appIndex = appData.findIndex((a: any) => a.id === selectedApplication.id);
          
          if (appIndex !== -1) {
            if (!appData[appIndex].notes) {
              appData[appIndex].notes = [];
            }
            appData[appIndex].notes.push({
              text: noteText,
              date: new Date().toLocaleDateString('ar-SA'),
              addedBy: 'مدير النظام'
            });
            localStorage.setItem('adminApplications', JSON.stringify(appData));
          }
          
          return {
            ...app,
            lastUpdate: new Date().toLocaleDateString('ar-SA')
          };
        }
        return app;
      });
      
      setApplications(updatedApplications);
      
      toast({
        title: "تمت إضافة الملاحظة بنجاح",
        description: `تم إضافة ملاحظة إلى الطلب ${selectedApplication.id}`,
      });
      
      setNoteText('');
      setNoteDialog(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handleUpdateStatus = () => {
    setIsSubmitting(true);
    
    if (!selectedApplication || !newStatus) return;
    
    setTimeout(() => {
      const updatedApplications = applications.map(app => {
        if (app.id === selectedApplication.id) {
          const adminAppData = JSON.parse(localStorage.getItem('adminApplications') || '[]');
          const adminAppIndex = adminAppData.findIndex((a: any) => a.id === selectedApplication.id);
          
          if (adminAppIndex !== -1) {
            adminAppData[adminAppIndex].status = newStatus;
            adminAppData[adminAppIndex].lastUpdate = new Date().toLocaleDateString('ar-SA');
            localStorage.setItem('adminApplications', JSON.stringify(adminAppData));
          }
          
          const studentAppData = JSON.parse(localStorage.getItem('studentApplications') || '[]');
          const studentAppIndex = studentAppData.findIndex((a: any) => a.id === selectedApplication.id);
          
          if (studentAppIndex !== -1) {
            studentAppData[studentAppIndex].status = newStatus;
            studentAppData[studentAppIndex].lastUpdate = new Date().toLocaleDateString('ar-SA');
            localStorage.setItem('studentApplications', JSON.stringify(studentAppData));
          }
          
          return {
            ...app,
            status: newStatus,
            lastUpdate: new Date().toLocaleDateString('ar-SA')
          };
        }
        return app;
      });
      
      setApplications(updatedApplications);
      
      toast({
        title: "تم تحديث حالة الطلب بنجاح",
        description: `تم تغيير حالة الطلب ${selectedApplication.id} إلى ${getStatusText(newStatus)}`,
      });
      
      setStatusDialog(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handleDeleteApplication = () => {
    setIsSubmitting(true);
    
    if (!selectedApplication) return;
    
    setTimeout(() => {
      const updatedApplications = applications.filter(app => app.id !== selectedApplication.id);
      setApplications(updatedApplications);
      
      const adminAppData = JSON.parse(localStorage.getItem('adminApplications') || '[]');
      const filteredAdminApps = adminAppData.filter((a: any) => a.id !== selectedApplication.id);
      localStorage.setItem('adminApplications', JSON.stringify(filteredAdminApps));
      
      const studentAppData = JSON.parse(localStorage.getItem('studentApplications') || '[]');
      const filteredStudentApps = studentAppData.filter((a: any) => a.id !== selectedApplication.id);
      localStorage.setItem('studentApplications', JSON.stringify(filteredStudentApps));
      
      toast({
        title: "تم حذف الطلب بنجاح",
        description: `تم حذف الطلب ${selectedApplication.id}`,
      });
      
      setDeleteDialog(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handleToggleImportant = (application: Application) => {
    const updatedApplications = applications.map(app => {
      if (app.id === application.id) {
        const appData = JSON.parse(localStorage.getItem('adminApplications') || '[]');
        const appIndex = appData.findIndex((a: any) => a.id === application.id);
        
        if (appIndex !== -1) {
          appData[appIndex].important = !application.important;
          localStorage.setItem('adminApplications', JSON.stringify(appData));
        }
        
        return {
          ...app,
          important: !app.important
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    
    toast({
      title: application.important ? "تم إزالة التمييز من الطلب" : "تم تمييز الطلب كهام",
      description: `تم تحديث حالة الطلب ${application.id}`,
    });
  };

  const handleMarkAsRead = (application: Application) => {
    if (!application.unread) return;
    
    const updatedApplications = applications.map(app => {
      if (app.id === application.id) {
        const appData = JSON.parse(localStorage.getItem('adminApplications') || '[]');
        const appIndex = appData.findIndex((a: any) => a.id === application.id);
        
        if (appIndex !== -1) {
          appData[appIndex].unread = false;
          localStorage.setItem('adminApplications', JSON.stringify(appData));
        }
        
        return {
          ...app,
          unread: false
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return 'تم القبول';
      case 'rejected': return 'تم الرفض';
      case 'reviewing': return 'قيد المراجعة';
      default: return 'قيد الانتظار';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-green-500">تم القبول</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">تم الرفض</Badge>;
      case 'reviewing':
        return <Badge className="bg-yellow-500">قيد المراجعة</Badge>;
      default:
        return <Badge className="bg-blue-500">قيد الانتظار</Badge>;
    }
  };

  const openApplicationDetails = (application: Application) => {
    handleMarkAsRead(application);
    
    toast({
      title: "عرض تفاصيل الطلب",
      description: `مشاهدة تفاصيل الطلب ${application.id}`,
    });
    
    navigate(`/admin/applications/${application.id}`);
  };

  const displayedApplications = filteredApplications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6">
      <AdminPageActions 
        title="إدارة طلبات الالتحاق" 
        subtitle="استعراض وإدارة طلبات الالتحاق المقدمة من الطلاب"
      />
      
      <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="البحث عن طلب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 w-full"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[220px]">
                <SelectValue placeholder="فلترة حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading ? (
          <TableSkeleton columns={7} rows={5} />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>الطالب</TableHead>
                  <TableHead>البرنامج</TableHead>
                  <TableHead>الجامعة</TableHead>
                  <TableHead>تاريخ التقديم</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedApplications.length > 0 ? (
                  displayedApplications.map((application) => (
                    <TableRow 
                      key={application.id} 
                      className={`${application.unread ? 'bg-blue-50' : ''} ${application.important ? 'bg-amber-50' : ''}`}
                    >
                      <TableCell>
                        <Checkbox 
                          checked={application.important}
                          onCheckedChange={() => handleToggleImportant(application)}
                        />
                      </TableCell>
                      <TableCell 
                        className="font-medium cursor-pointer"
                        onClick={() => openApplicationDetails(application)}
                      >
                        {application.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 ml-2 text-unlimited-gray" />
                          {application.studentName}
                        </div>
                      </TableCell>
                      <TableCell>{application.program}</TableCell>
                      <TableCell>{application.university}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-2 text-unlimited-gray" />
                          {application.submissionDate}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setStatusDialog(true);
                              setNewStatus(application.status);
                            }}
                          >
                            تحديث الحالة
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setNoteDialog(true);
                            }}
                          >
                            إضافة ملاحظة
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center text-unlimited-gray">
                        <FileText className="h-12 w-12 mb-2" />
                        <h3 className="text-lg font-medium mb-1">لا توجد طلبات</h3>
                        <p className="text-sm">
                          {searchQuery || statusFilter !== 'all' 
                            ? 'لا توجد طلبات مطابقة للفلاتر المحددة'
                            : 'لم يتم العثور على أي طلبات في النظام'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {filteredApplications.length > 0 && (
              <div className="p-4 border-t">
                <TablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
      
      <FormDialog
        open={noteDialog}
        onOpenChange={setNoteDialog}
        title="إضافة ملاحظة"
        description={`إضافة ملاحظة للطلب رقم: ${selectedApplication?.id || ''}`}
        onSubmit={handleAddNote}
        submitLabel="إضافة"
        cancelLabel="إلغاء"
        isLoading={isSubmitting}
      >
        <Textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="أدخل الملاحظة هنا..."
          className="h-32"
        />
      </FormDialog>
      
      <FormDialog
        open={statusDialog}
        onOpenChange={setStatusDialog}
        title="تحديث حالة الطلب"
        description={`تغيير حالة الطلب رقم: ${selectedApplication?.id || ''}`}
        onSubmit={handleUpdateStatus}
        submitLabel="تحديث"
        cancelLabel="إلغاء"
        isLoading={isSubmitting}
      >
        <Select value={newStatus} onValueChange={setNewStatus}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الحالة الجديدة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">قيد الانتظار</SelectItem>
            <SelectItem value="reviewing">قيد المراجعة</SelectItem>
            <SelectItem value="accepted">تم القبول</SelectItem>
            <SelectItem value="rejected">تم الرفض</SelectItem>
          </SelectContent>
        </Select>
      </FormDialog>
      
      <ConfirmDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDeleteApplication}
        title="حذف الطلب"
        description={`هل أنت متأكد من حذف الطلب رقم ${selectedApplication?.id || ''}؟ هذا الإجراء غير قابل للتراجع.`}
        confirmLabel="حذف"
        cancelLabel="إلغاء"
        isLoading={isSubmitting}
        destructive={true}
      />
    </div>
  );
};

export default ManageApplications;
