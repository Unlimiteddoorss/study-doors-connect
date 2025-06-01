
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

const EnhancedStudentsManagement = () => {
  const [students, setStudents] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    newThisMonth: 0,
    withApplications: 0
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, selectedCountry, selectedAgent]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // جلب الطلاب مع معلوماتهم الشخصية
      const { data: studentsData, error: studentsError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          created_at,
          user_profiles!inner (
            full_name,
            country,
            city,
            phone,
            avatar_url
          )
        `)
        .eq('role', 'student');

      if (studentsError) throw studentsError;

      // جلب الوكلاء
      const { data: agentsData, error: agentsError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          user_profiles!inner (
            full_name
          )
        `)
        .eq('role', 'agent');

      if (agentsError) throw agentsError;

      // جلب الطلبات لكل طالب
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('student_id, status');

      if (applicationsError) throw applicationsError;

      // ربط البيانات
      const studentsWithApplications = studentsData.map(student => {
        const studentApplications = applicationsData.filter(app => app.student_id === student.user_id);
        return {
          ...student,
          applications_count: studentApplications.length,
          latest_application_status: studentApplications[0]?.status || null
        };
      });

      setStudents(studentsWithApplications || []);
      setAgents(agentsData || []);

      // حساب الإحصائيات
      const totalStudents = studentsWithApplications.length;
      const thisMonth = new Date();
      thisMonth.setMonth(thisMonth.getMonth() - 1);
      
      const newThisMonth = studentsWithApplications.filter(
        student => new Date(student.created_at) > thisMonth
      ).length;
      
      const withApplications = studentsWithApplications.filter(
        student => student.applications_count > 0
      ).length;

      setStats({
        totalStudents,
        activeStudents: totalStudents, // يمكن تعديل هذا حسب معايير النشاط
        newThisMonth,
        withApplications
      });

    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    // فلترة حسب البحث
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.user_profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user_profiles?.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user_profiles?.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلترة حسب البلد
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(student => 
        student.user_profiles?.country === selectedCountry
      );
    }

    setFilteredStudents(filtered);
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`text-${color}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value.toLocaleString('ar-EG')}</div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsDetailDialogOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'قيد المراجعة', variant: 'secondary' },
      accepted: { label: 'مقبول', variant: 'default' },
      rejected: { label: 'مرفوض', variant: 'destructive' }
    };
    
    const config = statusConfig[status] || { label: 'غير محدد', variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">إدارة الطلاب المتقدمة</h1>
            <p className="text-unlimited-gray">إدارة شاملة للطلاب مع تتبع الطلبات والوكلاء</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير البيانات
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              إضافة طالب
            </Button>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="إجمالي الطلاب"
            value={stats.totalStudents}
            icon={<Users className="h-4 w-4" />}
            color="unlimited-blue"
          />
          <StatCard
            title="الطلاب النشطون"
            value={stats.activeStudents}
            icon={<Users className="h-4 w-4" />}
            color="green-600"
          />
          <StatCard
            title="طلاب جدد هذا الشهر"
            value={stats.newThisMonth}
            icon={<UserPlus className="h-4 w-4" />}
            color="purple-600"
          />
          <StatCard
            title="لديهم طلبات"
            value={stats.withApplications}
            icon={<GraduationCap className="h-4 w-4" />}
            color="yellow-600"
          />
        </div>

        {/* أدوات البحث والفلترة */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والفلترة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-unlimited-gray" />
                <Input
                  placeholder="البحث في الطلاب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البلد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع البلدان</SelectItem>
                  <SelectItem value="saudi_arabia">السعودية</SelectItem>
                  <SelectItem value="egypt">مصر</SelectItem>
                  <SelectItem value="jordan">الأردن</SelectItem>
                  <SelectItem value="lebanon">لبنان</SelectItem>
                  <SelectItem value="syria">سوريا</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الوكيل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الوكلاء</SelectItem>
                  {agents.map((agent) => (
                    <SelectItem key={agent.user_id} value={agent.user_id}>
                      {agent.user_profiles?.full_name || 'غير محدد'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                مزيد من الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* جدول الطلاب */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الطلاب ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم الكامل</TableHead>
                  <TableHead>البلد والمدينة</TableHead>
                  <TableHead>عدد الطلبات</TableHead>
                  <TableHead>آخر طلب</TableHead>
                  <TableHead>تاريخ التسجيل</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.user_id}>
                    <TableCell>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-unlimited-blue rounded-full flex items-center justify-center text-white text-sm">
                          {student.user_profiles?.full_name?.charAt(0) || 'ط'}
                        </div>
                        <div>
                          <div className="font-medium">{student.user_profiles?.full_name || 'غير محدد'}</div>
                          <div className="text-sm text-unlimited-gray flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {student.user_profiles?.phone || 'غير محدد'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-unlimited-gray" />
                        <div>
                          <div>{student.user_profiles?.country || 'غير محدد'}</div>
                          <div className="text-sm text-unlimited-gray">{student.user_profiles?.city || 'غير محدد'}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {student.applications_count} طلب
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.latest_application_status ? 
                        getStatusBadge(student.latest_application_status) : 
                        <span className="text-unlimited-gray">لا يوجد</span>
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-unlimited-gray" />
                        {new Date(student.created_at).toLocaleDateString('ar-EG')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog تفاصيل الطالب */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الطالب</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">المعلومات الشخصية</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>الاسم:</strong> {selectedStudent.user_profiles?.full_name || 'غير محدد'}</div>
                      <div><strong>الهاتف:</strong> {selectedStudent.user_profiles?.phone || 'غير محدد'}</div>
                      <div><strong>البلد:</strong> {selectedStudent.user_profiles?.country || 'غير محدد'}</div>
                      <div><strong>المدينة:</strong> {selectedStudent.user_profiles?.city || 'غير محدد'}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">إحصائيات الطلبات</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>عدد الطلبات:</strong> {selectedStudent.applications_count}</div>
                      <div><strong>آخر طلب:</strong> {selectedStudent.latest_application_status ? getStatusBadge(selectedStudent.latest_application_status) : 'لا يوجد'}</div>
                      <div><strong>تاريخ التسجيل:</strong> {new Date(selectedStudent.created_at).toLocaleDateString('ar-EG')}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedStudentsManagement;
