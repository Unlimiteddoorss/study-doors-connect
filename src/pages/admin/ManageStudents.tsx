
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Users, UserPlus, Eye, Edit, Trash2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Student {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  created_at: string;
  applications_count: number;
  status: 'active' | 'inactive' | 'pending';
}

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      
      // جلب بيانات الطلاب مع ملفاتهم الشخصية
      const { data: studentsData, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          user_roles!inner(role)
        `)
        .eq('user_roles.role', 'student');

      if (error) throw error;

      // تحويل البيانات إلى التنسيق المطلوب
      const formattedStudents: Student[] = studentsData?.map(student => ({
        id: student.user_id,
        full_name: student.full_name || 'غير محدد',
        email: student.user_id, // سيتم تحديثه من auth.users إذا أمكن
        phone: student.phone || 'غير محدد',
        country: student.country || 'غير محدد',
        city: student.city || 'غير محدد',
        created_at: student.created_at,
        applications_count: 0, // سيتم حسابه لاحقاً
        status: 'active' as const
      })) || [];

      setStudents(formattedStudents);
    } catch (error) {
      console.error('خطأ في جلب بيانات الطلاب:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات الطلاب",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطالب؟')) return;

    try {
      // حذف الطالب من قاعدة البيانات
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', studentId);

      if (error) throw error;

      setStudents(students.filter(s => s.id !== studentId));
      toast({
        title: "نجح الحذف",
        description: "تم حذف الطالب بنجاح",
      });
    } catch (error) {
      console.error('خطأ في حذف الطالب:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف الطالب",
        variant: "destructive",
      });
    }
  };

  const exportStudents = () => {
    const csvContent = [
      ['الاسم', 'البريد الإلكتروني', 'الهاتف', 'الدولة', 'المدينة', 'تاريخ التسجيل'].join(','),
      ...filteredStudents.map(student => [
        student.full_name,
        student.email,
        student.phone,
        student.country,
        student.city,
        new Date(student.created_at).toLocaleDateString('ar-SA')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الطلاب</h2>
            <p className="text-unlimited-gray">إدارة وتتبع جميع الطلاب المسجلين في النظام</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={exportStudents} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير البيانات
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              إضافة طالب جديد
            </Button>
          </div>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-dark-blue">{students.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">طلاب نشطون</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-green-600">
                  {students.filter(s => s.status === 'active').length}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">طلاب جدد هذا الشهر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-blue-600">12</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">متوسط الطلبات لكل طالب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-purple-600">2.3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* أدوات البحث والفلترة */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="ابحث عن طالب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="حالة الطالب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* جدول الطلاب */}
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم الكامل</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>الدولة</TableHead>
                <TableHead>المدينة</TableHead>
                <TableHead>عدد الطلبات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ التسجيل</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 9 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center h-40 text-unlimited-gray">
                    لم يتم العثور على طلاب
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.country}</TableCell>
                    <TableCell>{student.city}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.applications_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.status === 'active' ? 'default' : 'secondary'}
                        className={
                          student.status === 'active' ? 'bg-green-600' :
                          student.status === 'inactive' ? 'bg-red-600' :
                          'bg-yellow-600'
                        }
                      >
                        {student.status === 'active' ? 'نشط' :
                         student.status === 'inactive' ? 'غير نشط' : 'في الانتظار'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(student.created_at).toLocaleDateString('ar-SA')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Dialog عرض تفاصيل الطالب */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الطالب</DialogTitle>
              <DialogDescription>
                معلومات مفصلة عن الطالب المحدد
              </DialogDescription>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الاسم الكامل</label>
                    <p className="font-medium">{selectedStudent.full_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">البريد الإلكتروني</label>
                    <p>{selectedStudent.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">رقم الهاتف</label>
                    <p>{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الحالة</label>
                    <Badge variant={selectedStudent.status === 'active' ? 'default' : 'secondary'}>
                      {selectedStudent.status === 'active' ? 'نشط' :
                       selectedStudent.status === 'inactive' ? 'غير نشط' : 'في الانتظار'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الدولة</label>
                    <p>{selectedStudent.country}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">المدينة</label>
                    <p>{selectedStudent.city}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">تاريخ التسجيل</label>
                  <p>{new Date(selectedStudent.created_at).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManageStudents;
