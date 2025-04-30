
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, PlusCircle, Eye, Edit, File, Trash } from 'lucide-react';
import { FilterableTable } from '@/components/admin/FilterableTable';

const AgentStudents = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock data for students
  const [students, setStudents] = useState([
    {
      id: "ST001",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      nationality: "سعودي",
      applicationsCount: 2,
      status: "active",
    },
    {
      id: "ST002",
      name: "سارة خالد",
      email: "sarah@example.com",
      phone: "+966507654321",
      nationality: "سعودي",
      applicationsCount: 1,
      status: "active",
    },
    {
      id: "ST003",
      name: "محمد علي",
      email: "mohammed@example.com",
      phone: "+966509876543",
      nationality: "كويتي",
      applicationsCount: 0,
      status: "pending",
    },
  ]);

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status configuration for UI
  const statusConfig = {
    active: { label: 'نشط', color: 'bg-green-500 text-white' },
    pending: { label: 'قيد التفعيل', color: 'bg-yellow-500 text-white' },
    inactive: { label: 'غير نشط', color: 'bg-gray-500 text-white' },
  };

  // Handlers
  const handleAddStudent = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleDeleteStudent = (student) => {
    const updatedStudents = students.filter(s => s.id !== student.id);
    setStudents(updatedStudents);
    toast({
      title: "تم حذف الطالب",
      description: `تم حذف الطالب ${student.name} بنجاح`,
    });
  };

  const handleViewApplications = (student) => {
    // Navigate to student applications
    console.log("View applications for student:", student.id);
  };

  const handleSaveNewStudent = () => {
    // Add new student logic
    const newStudent = {
      id: `ST${String(students.length + 1).padStart(3, '0')}`,
      name: "طالب جديد",
      email: "new.student@example.com",
      phone: "+966500000000",
      nationality: "سعودي",
      applicationsCount: 0,
      status: "pending",
    };

    setStudents([...students, newStudent]);
    setIsAddDialogOpen(false);
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة الطالب الجديد بنجاح",
    });
  };

  const handleSaveEditedStudent = () => {
    // Update student logic
    const updatedStudents = students.map(s => 
      s.id === selectedStudent.id ? selectedStudent : s
    );
    setStudents(updatedStudents);
    setIsEditDialogOpen(false);
    toast({
      title: "تم التحديث بنجاح",
      description: `تم تحديث بيانات الطالب ${selectedStudent.name} بنجاح`,
    });
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">قائمة الطلاب</h1>
          <Button onClick={handleAddStudent} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            إضافة طالب
          </Button>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <Input
                placeholder="بحث بالاسم، البريد الإلكتروني، أو الرمز"
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
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="pending">قيد التفعيل</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FilterableTable
            data={filteredStudents}
            isLoading={isLoading}
            columns={[
              { header: "رمز الطالب", accessor: "id" },
              { header: "اسم الطالب", accessor: "name" },
              { header: "البريد الإلكتروني", accessor: "email" },
              { header: "رقم الهاتف", accessor: "phone", hideOnMobile: true },
              { header: "الجنسية", accessor: "nationality", hideOnMobile: true },
              { 
                header: "عدد الطلبات", 
                accessor: "applicationsCount",
                render: (count) => <span>{count}</span>
              },
              { 
                header: "الحالة", 
                accessor: "status",
                render: (status) => (
                  <Badge className={statusConfig[status]?.color || "bg-gray-500"}>
                    {statusConfig[status]?.label || status}
                  </Badge>
                )
              },
            ]}
            actions={(student) => [
              {
                icon: <File className="h-4 w-4" />,
                label: "الطلبات",
                onClick: () => handleViewApplications(student),
              },
              {
                icon: <Edit className="h-4 w-4" />,
                label: "تعديل",
                onClick: () => handleEditStudent(student),
              },
              {
                icon: <Trash className="h-4 w-4" />,
                label: "حذف",
                onClick: () => handleDeleteStudent(student),
                destructive: true,
              },
            ]}
          />
        </Card>

        {/* Add Student Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة طالب جديد</DialogTitle>
              <DialogDescription>أدخل بيانات الطالب الجديد.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">اسم الطالب</Label>
                <Input id="name" className="col-span-3" placeholder="أدخل اسم الطالب" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
                <Input id="email" type="email" className="col-span-3" placeholder="أدخل البريد الإلكتروني" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">رقم الهاتف</Label>
                <Input id="phone" className="col-span-3" placeholder="أدخل رقم الهاتف" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nationality" className="text-right">الجنسية</Label>
                <Select>
                  <SelectTrigger id="nationality" className="col-span-3">
                    <SelectValue placeholder="اختر الجنسية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="سعودي">سعودي</SelectItem>
                    <SelectItem value="كويتي">كويتي</SelectItem>
                    <SelectItem value="إماراتي">إماراتي</SelectItem>
                    <SelectItem value="عماني">عماني</SelectItem>
                    <SelectItem value="بحريني">بحريني</SelectItem>
                    <SelectItem value="قطري">قطري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleSaveNewStudent}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Student Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>تعديل بيانات الطالب</DialogTitle>
              <DialogDescription>
                {selectedStudent && `تعديل بيانات ${selectedStudent.name}`}
              </DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">اسم الطالب</Label>
                  <Input 
                    id="edit-name" 
                    className="col-span-3" 
                    defaultValue={selectedStudent.name} 
                    onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">البريد الإلكتروني</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    className="col-span-3" 
                    defaultValue={selectedStudent.email} 
                    onChange={(e) => setSelectedStudent({...selectedStudent, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">رقم الهاتف</Label>
                  <Input 
                    id="edit-phone" 
                    className="col-span-3" 
                    defaultValue={selectedStudent.phone} 
                    onChange={(e) => setSelectedStudent({...selectedStudent, phone: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nationality" className="text-right">الجنسية</Label>
                  <Select 
                    defaultValue={selectedStudent.nationality}
                    onValueChange={(value) => setSelectedStudent({...selectedStudent, nationality: value})}
                  >
                    <SelectTrigger id="edit-nationality" className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سعودي">سعودي</SelectItem>
                      <SelectItem value="كويتي">كويتي</SelectItem>
                      <SelectItem value="إماراتي">إماراتي</SelectItem>
                      <SelectItem value="عماني">عماني</SelectItem>
                      <SelectItem value="بحريني">بحريني</SelectItem>
                      <SelectItem value="قطري">قطري</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">الحالة</Label>
                  <Select 
                    defaultValue={selectedStudent.status}
                    onValueChange={(value) => setSelectedStudent({...selectedStudent, status: value})}
                  >
                    <SelectTrigger id="edit-status" className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="pending">قيد التفعيل</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleSaveEditedStudent}>حفظ التغييرات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AgentStudents;
