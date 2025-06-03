
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
  UserCheck, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  Download,
  UserPlus,
  Mail,
  Phone,
  DollarSign,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const EnhancedAgentsManagement = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    totalCommissions: 0,
    totalStudents: 0
  });

  const { toast } = useToast();
  const { handleAsyncError, logInfo } = useErrorHandler();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [agents, searchTerm, selectedStatus]);

  const fetchData = async () => {
    const result = await handleAsyncError(async () => {
      setIsLoading(true);
      
      // جلب الوكلاء مع معلوماتهم الشخصية
      const { data: agentsData, error: agentsError } = await supabase
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
        .eq('role', 'agent');

      if (agentsError) throw agentsError;

      // جلب العمولات لكل وكيل
      const { data: commissionsData, error: commissionsError } = await supabase
        .from('commissions')
        .select('agent_id, amount, status');

      if (commissionsError) throw commissionsError;

      // جلب الطلاب المرتبطين بكل وكيل
      const { data: agentStudentsData, error: agentStudentsError } = await supabase
        .from('agent_students')
        .select('agent_id, student_id, is_active');

      if (agentStudentsError) throw agentStudentsError;

      // ربط البيانات
      const agentsWithStats = agentsData.map(agent => {
        const agentCommissions = commissionsData.filter(comm => comm.agent_id === agent.user_id);
        const agentStudents = agentStudentsData.filter(as => as.agent_id === agent.user_id && as.is_active);
        
        const totalCommissions = agentCommissions
          .filter(comm => comm.status === 'paid')
          .reduce((sum, comm) => sum + (comm.amount || 0), 0);
        
        const pendingCommissions = agentCommissions
          .filter(comm => comm.status === 'pending')
          .reduce((sum, comm) => sum + (comm.amount || 0), 0);

        return {
          ...agent,
          students_count: agentStudents.length,
          total_commissions: totalCommissions,
          pending_commissions: pendingCommissions,
          commissions_count: agentCommissions.length
        };
      });

      setAgents(agentsWithStats || []);

      // حساب الإحصائيات
      const totalAgents = agentsWithStats.length;
      const activeAgents = agentsWithStats.filter(agent => agent.students_count > 0).length;
      const totalCommissions = agentsWithStats.reduce((sum, agent) => sum + agent.total_commissions, 0);
      const totalStudents = agentsWithStats.reduce((sum, agent) => sum + agent.students_count, 0);

      setStats({
        totalAgents,
        activeAgents,
        totalCommissions,
        totalStudents
      });

      logInfo('تم جلب بيانات الوكلاء بنجاح', { 
        agentsCount: totalAgents, 
        activeAgents,
        totalCommissions,
        totalStudents 
      });
    }, "خطأ في جلب بيانات الوكلاء");

    if (result !== null) {
      setIsLoading(false);
    }
  };

  const filterAgents = () => {
    let filtered = agents;

    // فلترة حسب البحث
    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.user_profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.user_profiles?.country?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلترة حسب الحالة
    if (selectedStatus === 'active') {
      filtered = filtered.filter(agent => agent.students_count > 0);
    } else if (selectedStatus === 'inactive') {
      filtered = filtered.filter(agent => agent.students_count === 0);
    }

    setFilteredAgents(filtered);
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

  const handleViewAgent = (agent) => {
    setSelectedAgent(agent);
    setIsDetailDialogOpen(true);
    logInfo(`عرض تفاصيل الوكيل: ${agent.user_profiles?.full_name}`, { agentId: agent.user_id });
  };

  const getAgentStatusBadge = (agent) => {
    if (agent.students_count > 0) {
      return <Badge variant="default">نشط</Badge>;
    }
    return <Badge variant="secondary">غير نشط</Badge>;
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
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">إدارة الوكلاء المتقدمة</h1>
            <p className="text-unlimited-gray">إدارة شاملة للوكلاء مع تتبع العمولات والأداء</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير التقارير
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              إضافة وكيل
            </Button>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="إجمالي الوكلاء"
            value={stats.totalAgents}
            icon={<UserCheck className="h-4 w-4" />}
            color="unlimited-blue"
          />
          <StatCard
            title="الوكلاء النشطون"
            value={stats.activeAgents}
            icon={<TrendingUp className="h-4 w-4" />}
            color="green-600"
          />
          <StatCard
            title="إجمالي العمولات"
            value={`$${Math.round(stats.totalCommissions)}`}
            icon={<DollarSign className="h-4 w-4" />}
            color="yellow-600"
          />
          <StatCard
            title="إجمالي الطلاب"
            value={stats.totalStudents}
            icon={<Users className="h-4 w-4" />}
            color="purple-600"
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
                  placeholder="البحث في الوكلاء..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الوكلاء</SelectItem>
                  <SelectItem value="active">الوكلاء النشطون</SelectItem>
                  <SelectItem value="inactive">الوكلاء غير النشطين</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                مزيد من الفلاتر
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تصدير القائمة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* جدول الوكلاء */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الوكلاء ({filteredAgents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الوكيل</TableHead>
                  <TableHead>عدد الطلاب</TableHead>
                  <TableHead>العمولات المدفوعة</TableHead>
                  <TableHead>العمولات المعلقة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ التسجيل</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.user_id}>
                    <TableCell>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-unlimited-blue rounded-full flex items-center justify-center text-white text-sm">
                          {agent.user_profiles?.full_name?.charAt(0) || 'و'}
                        </div>
                        <div>
                          <div className="font-medium">{agent.user_profiles?.full_name || 'غير محدد'}</div>
                          <div className="text-sm text-unlimited-gray flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {agent.user_profiles?.phone || 'غير محدد'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-unlimited-gray" />
                        <Badge variant="outline">
                          {agent.students_count} طالب
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center font-medium text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {agent.total_commissions.toLocaleString('ar-EG')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center font-medium text-yellow-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {agent.pending_commissions.toLocaleString('ar-EG')}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getAgentStatusBadge(agent)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-unlimited-gray" />
                        {new Date(agent.created_at).toLocaleDateString('ar-EG')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewAgent(agent)}
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

        {/* Dialog تفاصيل الوكيل */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الوكيل</DialogTitle>
            </DialogHeader>
            {selectedAgent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">المعلومات الشخصية</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>الاسم:</strong> {selectedAgent.user_profiles?.full_name || 'غير محدد'}</div>
                      <div><strong>الهاتف:</strong> {selectedAgent.user_profiles?.phone || 'غير محدد'}</div>
                      <div><strong>البلد:</strong> {selectedAgent.user_profiles?.country || 'غير محدد'}</div>
                      <div><strong>المدينة:</strong> {selectedAgent.user_profiles?.city || 'غير محدد'}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">إحصائيات الأداء</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>عدد الطلاب:</strong> {selectedAgent.students_count}</div>
                      <div><strong>العمولات المدفوعة:</strong> ${selectedAgent.total_commissions.toLocaleString('ar-EG')}</div>
                      <div><strong>العمولات المعلقة:</strong> ${selectedAgent.pending_commissions.toLocaleString('ar-EG')}</div>
                      <div><strong>إجمالي العمولات:</strong> {selectedAgent.commissions_count}</div>
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

export default EnhancedAgentsManagement;
