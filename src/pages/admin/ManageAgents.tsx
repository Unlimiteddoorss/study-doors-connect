
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Users, UserPlus, Eye, Edit, Trash2, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Agent {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  created_at: string;
  students_count: number;
  applications_count: number;
  commission_earned: number;
  status: 'active' | 'inactive' | 'pending';
}

const ManageAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      
      // جلب بيانات الوكلاء مع ملفاتهم الشخصية
      const { data: agentsData, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          user_roles!inner(role)
        `)
        .eq('user_roles.role', 'agent');

      if (error) throw error;

      // تحويل البيانات إلى التنسيق المطلوب
      const formattedAgents: Agent[] = agentsData?.map(agent => ({
        id: agent.user_id,
        full_name: agent.full_name || 'غير محدد',
        email: agent.user_id, // سيتم تحديثه من auth.users إذا أمكن
        phone: agent.phone || 'غير محدد',
        country: agent.country || 'غير محدد',
        city: agent.city || 'غير محدد',
        created_at: agent.created_at,
        students_count: 0, // سيتم حسابه لاحقاً
        applications_count: 0, // سيتم حسابه لاحقاً
        commission_earned: 0, // سيتم حسابه لاحقاً
        status: 'active' as const
      })) || [];

      setAgents(formattedAgents);
    } catch (error) {
      console.error('خطأ في جلب بيانات الوكلاء:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات الوكلاء",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.phone.includes(searchQuery)
  );

  const handleViewAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsViewDialogOpen(true);
  };

  const handleDeleteAgent = async (agentId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الوكيل؟')) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', agentId);

      if (error) throw error;

      setAgents(agents.filter(a => a.id !== agentId));
      toast({
        title: "نجح الحذف",
        description: "تم حذف الوكيل بنجاح",
      });
    } catch (error) {
      console.error('خطأ في حذف الوكيل:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف الوكيل",
        variant: "destructive",
      });
    }
  };

  const totalCommissions = agents.reduce((sum, agent) => sum + agent.commission_earned, 0);
  const totalStudents = agents.reduce((sum, agent) => sum + agent.students_count, 0);
  const totalApplications = agents.reduce((sum, agent) => sum + agent.applications_count, 0);

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الوكلاء</h2>
            <p className="text-unlimited-gray">إدارة وتتبع جميع الوكلاء في النظام</p>
          </div>
          
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            إضافة وكيل جديد
          </Button>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الوكلاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-dark-blue">{agents.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-green-600">{totalStudents}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-blue-600">{totalApplications}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي العمولات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-2xl font-bold text-yellow-600">
                  ${totalCommissions.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* أداة البحث */}
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
          <Input
            placeholder="ابحث عن وكيل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full md:w-[300px]"
          />
        </div>

        {/* جدول الوكلاء */}
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم الكامل</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>الدولة</TableHead>
                <TableHead>عدد الطلاب</TableHead>
                <TableHead>عدد الطلبات</TableHead>
                <TableHead>العمولة المكتسبة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ التسجيل</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 10 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredAgents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-40 text-unlimited-gray">
                    لم يتم العثور على وكلاء
                  </TableCell>
                </TableRow>
              ) : (
                filteredAgents.map((agent, index) => (
                  <motion.tr
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{agent.full_name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>{agent.country}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.students_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.applications_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        ${agent.commission_earned.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={agent.status === 'active' ? 'default' : 'secondary'}
                        className={agent.status === 'active' ? 'bg-green-600' : 'bg-red-600'}
                      >
                        {agent.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(agent.created_at).toLocaleDateString('ar-SA')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewAgent(agent)}
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
                          onClick={() => handleDeleteAgent(agent.id)}
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

        {/* Dialog عرض تفاصيل الوكيل */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الوكيل</DialogTitle>
              <DialogDescription>
                معلومات مفصلة عن الوكيل المحدد
              </DialogDescription>
            </DialogHeader>
            
            {selectedAgent && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الاسم الكامل</label>
                    <p className="font-medium">{selectedAgent.full_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">البريد الإلكتروني</label>
                    <p>{selectedAgent.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">رقم الهاتف</label>
                    <p>{selectedAgent.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الحالة</label>
                    <Badge variant={selectedAgent.status === 'active' ? 'default' : 'secondary'}>
                      {selectedAgent.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الدولة</label>
                    <p>{selectedAgent.country}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">المدينة</label>
                    <p>{selectedAgent.city}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">عدد الطلاب</label>
                    <p className="text-lg font-bold text-blue-600">{selectedAgent.students_count}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">عدد الطلبات</label>
                    <p className="text-lg font-bold text-green-600">{selectedAgent.applications_count}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">العمولة المكتسبة</label>
                    <p className="text-lg font-bold text-yellow-600">
                      ${selectedAgent.commission_earned.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">تاريخ التسجيل</label>
                  <p>{new Date(selectedAgent.created_at).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManageAgents;
