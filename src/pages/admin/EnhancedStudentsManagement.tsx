
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const EnhancedStudentsManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [agents, setAgents] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
    fetchAgents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, selectedStatus, selectedAgent]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      
      // جلب بيانات الطلاب مع ملفاتهم الشخصية وأدوارهم
      const { data: studentsData, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          user_profiles (*)
        `)
        .eq('role', 'student');

      if (error) throw error;

      // جلب إحصائيات الطلبات لكل طالب
      const studentsWithStats = await Promise.all(
        studentsData.map(async (student) => {
          const { count: totalApplications } = await supabase
            .from('applications')
            .select('*', { count: 'exact' })
            .eq('student_id', student.user_id);

          const { count: pendingApplications } = await supabase
            .from('applications')
            .select('*', { count: 'exact' })
            .eq('student_id', student.user_id)
            .eq('status', 'pending');

          const { count: acceptedApplications } = await supabase
            .from('applications')
            .select('*', { count: 'exact' })
            .eq('student_id', student.user_id)
            .eq('status', 'accepted');

          // جلب معلومات الوكيل المسؤول
          const { data: agentData } = await supabase
            .from('agent_students')
            .select(`
              agent_id,
              assigned_at,
              is_active,
              user_profiles!agent_students_agent_id_fkey (full_name)
            `)
            .eq('student_id', student.user_id)
            .eq('is_active', true)
            .single();

          return {
            ...student,
            totalApplications: totalApplications || 0,
            pendingApplications: pendingApplications || 0,
            acceptedApplications: acceptedApplications || 0,
            agent: agentData?.user_profiles?.full_name || 'غير محدد',
            agentId: agentData?.agent_id || null,
            lastActivity: new Date().toISOString(),
            status: totalApplications > 0 ? 'active' : 'inactive'
          };
        })
      );

      setStudents(studentsWithStats);
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

  const fetchAgents = async () => {
    try {
      const { data: agentsData, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          user_profiles (full_name)
        `)
        .eq('role', 'agent');

      if (error) throw error;
      setAgents(agentsData);
    } catch (error) {
      console.error('خطأ في جلب بيانات الوكلاء:', error);
    }
  };

  const filterStudents = () => {
    let filtered = [...students];

    // فلترة البحث
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.user_profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user_profiles?.phone?.includes(searchTerm) ||
        student.user_profiles?.country?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلترة الحالة
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    // فلترة الوكيل
    if (selectedAgent !== 'all') {
      filtered = filtered.filter(student => student.agentId === selectedAgent);
    }

    setFilteredStudents(filtered);
  };

  const assignAgent = async (studentId, agentId) => {
    try {
      // إلغاء تعيين الوكيل السابق
      await supabase
        .from('agent_students')
        .update({ is_active: false })
        .eq('student_id', studentId);

      // تعيين الوكيل الجديد
      const { error } = await supabase
        .from('agent_students')
        .insert({
          agent_id: agentId,
          student_id: studentId,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "تم التعيين",
        description: "تم تعيين الوكيل بنجاح",
      });

      fetchStudents();
    } catch (error) {
      console.error('خطأ في تعيين الوكيل:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تعيين الوكيل",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'نشط', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'غير نشط', className: 'bg-gray-100 text-gray-800' },
      suspended: { label: 'موقوف', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const StudentCard = ({ student }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.user_profiles?.avatar_url} />
                <AvatarFallback>
                  {student.user_profiles?.full_name?.split(' ').map(n => n[0]).join('') || 'طالب'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-unlimited-dark-blue">
                  {student.user_profiles?.full_name || 'غير محدد'}
                </h3>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-unlimited-gray">
                  <Mail className="h-3 w-3" />
                  <span>{student.user_id}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-unlimited-gray">
                  <MapPin className="h-3 w-3" />
                  <span>{student.user_profiles?.country || 'غير محدد'}</span>
                </div>
              </div>
            </div>
            {getStatusBadge(student.status)}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-unlimited-blue">{student.totalApplications}</div>
              <div className="text-xs text-unlimited-gray">إجمالي الطلبات</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">{student.pendingApplications}</div>
              <div className="text-xs text-unlimited-gray">قيد الانتظار</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{student.acceptedApplications}</div>
              <div className="text-xs text-unlimited-gray">مقبولة</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-unlimited-gray">
              الوكيل: <span className="font-medium">{student.agent}</span>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline" onClick={() => {
                setSelectedStudent(student);
                setShowDetails(true);
              }}>
                <Eye className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">إدارة الطلاب المتقدمة</h1>
            <p className="text-unlimited-gray">إدارة شاملة لجميع الطلاب والوكلاء</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير البيانات
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة طالب
            </Button>
          </div>
        </div>

        {/* فلاتر البحث */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
                <Input
                  placeholder="البحث بالاسم، الهاتف، أو البلد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="حالة الطالب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="suspended">موقوف</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="الوكيل المسؤول" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الوكلاء</SelectItem>
                  {agents.map((agent) => (
                    <SelectItem key={agent.user_id} value={agent.user_id}>
                      {agent.user_profiles?.full_name || 'وكيل غير محدد'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                مزيد من الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-unlimited-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-unlimited-dark-blue">{students.length}</div>
              <div className="text-sm text-unlimited-gray">إجمالي الطلاب</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {students.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-unlimited-gray">طلاب نشطون</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <UserX className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-600">
                {students.filter(s => s.status === 'inactive').length}
              </div>
              <div className="text-sm text-unlimited-gray">طلاب غير نشطين</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-unlimited-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-unlimited-blue">
                {students.reduce((sum, s) => sum + s.totalApplications, 0)}
              </div>
              <div className="text-sm text-unlimited-gray">إجمالي الطلبات</div>
            </CardContent>
          </Card>
        </div>

        {/* عرض البيانات */}
        <Tabs defaultValue="cards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">عرض البطاقات</TabsTrigger>
            <TabsTrigger value="table">عرض الجدول</TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <StudentCard key={student.user_id} student={student} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الطالب</TableHead>
                      <TableHead>البلد</TableHead>
                      <TableHead>الوكيل المسؤول</TableHead>
                      <TableHead>الطلبات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.user_id}>
                        <TableCell>
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {student.user_profiles?.full_name?.split(' ').map(n => n[0]).join('') || 'ط'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.user_profiles?.full_name || 'غير محدد'}</div>
                              <div className="text-sm text-unlimited-gray">{student.user_profiles?.phone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.user_profiles?.country || 'غير محدد'}</TableCell>
                        <TableCell>{student.agent}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.totalApplications}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* تفاصيل الطالب */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الطالب</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>المعلومات الشخصية</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">الاسم الكامل</label>
                        <p className="text-unlimited-gray">{selectedStudent.user_profiles?.full_name || 'غير محدد'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">رقم الهاتف</label>
                        <p className="text-unlimited-gray">{selectedStudent.user_profiles?.phone || 'غير محدد'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">البلد</label>
                        <p className="text-unlimited-gray">{selectedStudent.user_profiles?.country || 'غير محدد'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">المدينة</label>
                        <p className="text-unlimited-gray">{selectedStudent.user_profiles?.city || 'غير محدد'}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>إحصائيات الطلبات</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-unlimited-blue">{selectedStudent.totalApplications}</div>
                          <div className="text-sm text-unlimited-gray">إجمالي الطلبات</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-600">{selectedStudent.pendingApplications}</div>
                          <div className="text-sm text-unlimited-gray">قيد الانتظار</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{selectedStudent.acceptedApplications}</div>
                          <div className="text-sm text-unlimited-gray">مقبولة</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600">
                            {selectedStudent.totalApplications - selectedStudent.pendingApplications - selectedStudent.acceptedApplications}
                          </div>
                          <div className="text-sm text-unlimited-gray">مرفوضة</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>تعيين الوكيل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <Select 
                        value={selectedStudent.agentId || ''} 
                        onValueChange={(agentId) => assignAgent(selectedStudent.user_id, agentId)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="اختيار الوكيل" />
                        </SelectTrigger>
                        <SelectContent>
                          {agents.map((agent) => (
                            <SelectItem key={agent.user_id} value={agent.user_id}>
                              {agent.user_profiles?.full_name || 'وكيل غير محدد'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedStudentsManagement;
