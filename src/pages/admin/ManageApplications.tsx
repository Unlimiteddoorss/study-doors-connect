
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FilterableTable from '@/components/admin/FilterableTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, Eye, MessageCircle, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ManageApplications = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [universityFilter, setUniversityFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for applications
  const [applications] = useState([
    {
      id: "APP1001",
      studentName: "أحمد محمد",
      studentEmail: "ahmed@example.com",
      university: "جامعة الملك سعود",
      program: "هندسة البرمجيات",
      applyDate: "2023-08-15",
      status: "pending",
    },
    {
      id: "APP1002",
      studentName: "سارة خالد",
      studentEmail: "sarah@example.com",
      university: "جامعة القاهرة",
      program: "طب بشري",
      applyDate: "2023-08-10",
      status: "review",
    },
    {
      id: "APP1003",
      studentName: "محمد علي",
      studentEmail: "mohammed@example.com",
      university: "الجامعة الأمريكية",
      program: "إدارة أعمال",
      applyDate: "2023-08-05",
      status: "approved",
    },
    {
      id: "APP1004",
      studentName: "فاطمة أحمد",
      studentEmail: "fatima@example.com",
      university: "جامعة الملك سعود",
      program: "علوم الحاسب",
      applyDate: "2023-08-01",
      status: "rejected",
    },
  ]);

  // Filter applications based on search and filters
  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    const matchesUniversity = universityFilter === "all" || application.university === universityFilter;
    const matchesProgram = programFilter === "all" || application.program === programFilter;

    return matchesSearch && matchesStatus && matchesUniversity && matchesProgram;
  });

  // Extract unique universities and programs for filters
  const universities = [...new Set(applications.map((app) => app.university))];
  const programs = [...new Set(applications.map((app) => app.program))];

  // Status configuration for UI
  const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500 text-white' },
    review: { label: 'قيد المراجعة', color: 'bg-blue-500 text-white' },
    approved: { label: 'مقبول', color: 'bg-green-500 text-white' },
    conditional: { label: 'قبول مشروط', color: 'bg-purple-500 text-white' },
    rejected: { label: 'مرفوض', color: 'bg-red-500 text-white' },
  };

  // Handlers
  const handleViewApplication = (application) => {
    navigate(`/admin/applications/${application.id}`);
  };

  const handleUpdateStatus = (application, status) => {
    setSelectedApplication(application);
    setNewStatus(status);
    setIsUpdateStatusDialogOpen(true);
  };

  const handleConfirmStatusUpdate = () => {
    if (!selectedApplication || !newStatus) return;

    // Update application status logic would go here
    toast({
      title: "تم تحديث حالة الطلب",
      description: `تم تحديث حالة الطلب ${selectedApplication.id} إلى ${statusConfig[newStatus]?.label}`,
    });

    setIsUpdateStatusDialogOpen(false);
    setSelectedApplication(null);
    setNewStatus('');
    setStatusNote('');
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">إدارة طلبات الالتحاق</h1>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <Input
                placeholder="بحث برقم الطلب، اسم الطالب، أو البريد الإلكتروني"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="review">قيد المراجعة</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="conditional">قبول مشروط</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            <Select value={universityFilter} onValueChange={setUniversityFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الجامعة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الجامعات</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب البرنامج" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل البرامج</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FilterableTable
            data={filteredApplications}
            isLoading={isLoading}
            columns={[
              { header: "رقم الطلب", accessor: "id" },
              { header: "الطالب", accessor: "studentName" },
              { header: "البريد الإلكتروني", accessor: "studentEmail", hideOnMobile: true },
              { header: "الجامعة", accessor: "university", hideOnMobile: true },
              { header: "البرنامج", accessor: "program", hideOnMobile: true },
              { header: "تاريخ التقديم", accessor: "applyDate", hideOnMobile: true },
              {
                header: "الحالة",
                accessor: "status",
                render: (status) => (
                  <Badge className={statusConfig[status]?.color || "bg-gray-500"}>
                    {statusConfig[status]?.label || status}
                  </Badge>
                ),
              },
            ]}
            actions={(application) => [
              {
                icon: <Eye className="h-4 w-4" />,
                label: "عرض التفاصيل",
                onClick: () => handleViewApplication(application),
              },
              {
                icon: <MessageCircle className="h-4 w-4" />,
                label: "مراسلة الطالب",
                onClick: () => navigate(`/admin/messages?application=${application.id}`),
              },
              application.status !== 'approved' ? {
                icon: <Check className="h-4 w-4" />,
                label: "قبول الطلب",
                onClick: () => handleUpdateStatus(application, 'approved'),
              } : null,
              application.status !== 'rejected' ? {
                icon: <X className="h-4 w-4" />,
                label: "رفض الطلب",
                onClick: () => handleUpdateStatus(application, 'rejected'),
                destructive: true,
              } : null,
            ].filter(Boolean)}
          />
        </Card>

        {/* Update Status Dialog */}
        <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>تحديث حالة الطلب</DialogTitle>
              <DialogDescription>
                {selectedApplication && (
                  <span>
                    تحديث حالة الطلب رقم {selectedApplication.id} للطالب {selectedApplication.studentName}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">الحالة</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الحالة الجديدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="review">قيد المراجعة</SelectItem>
                    <SelectItem value="approved">مقبول</SelectItem>
                    <SelectItem value="conditional">قبول مشروط</SelectItem>
                    <SelectItem value="rejected">مرفوض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="statusNote" className="text-right">ملاحظات</Label>
                <Textarea
                  id="statusNote"
                  className="col-span-3"
                  placeholder="أضف ملاحظات حول تغيير الحالة (اختياري)"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateStatusDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleConfirmStatusUpdate}>تحديث الحالة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManageApplications;
