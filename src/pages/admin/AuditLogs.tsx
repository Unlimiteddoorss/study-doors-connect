
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangeSelector } from '@/components/admin/DateRangeSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, 
  Download, 
  Filter, 
  Search,
  Calendar,
  User,
  Activity,
  AlertTriangle,
  Database,
  FileText,
  Trash2
} from 'lucide-react';

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  tableName: string;
  recordId?: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  oldValues?: any;
  newValues?: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const AuditLogs = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedTable, setSelectedTable] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  // بيانات تجريبية لسجلات النظام
  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'أحمد محمد',
      userRole: 'admin',
      action: 'UPDATE',
      tableName: 'applications',
      recordId: 'app-123',
      timestamp: '2024-01-15T10:30:00Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      severity: 'medium',
      oldValues: { status: 'pending' },
      newValues: { status: 'approved' }
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'فاطمة أحمد',
      userRole: 'agent',
      action: 'INSERT',
      tableName: 'students',
      recordId: 'student-456',
      timestamp: '2024-01-15T09:15:00Z',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0...',
      severity: 'low'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'محمد علي',
      userRole: 'admin',
      action: 'DELETE',
      tableName: 'users',
      recordId: 'user-789',
      timestamp: '2024-01-15T08:45:00Z',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0...',
      severity: 'high'
    },
    {
      id: '4',
      userId: 'user1',
      userName: 'أحمد محمد',
      userRole: 'admin',
      action: 'LOGIN',
      tableName: 'auth_sessions',
      timestamp: '2024-01-15T08:00:00Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      severity: 'low'
    }
  ]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'INSERT': return <Database className="h-4 w-4 text-green-500" />;
      case 'UPDATE': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'DELETE': return <Trash2 className="h-4 w-4 text-red-500" />;
      case 'LOGIN': return <User className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[severity as keyof typeof colors] || colors.low}>
        {severity === 'low' ? 'منخفض' : 
         severity === 'medium' ? 'متوسط' : 
         severity === 'high' ? 'عالي' : 'حرج'}
      </Badge>
    );
  };

  const handleExportLogs = () => {
    toast({
      title: "تم التصدير",
      description: "تم تصدير سجلات النظام بنجاح"
    });
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tableName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    const matchesTable = selectedTable === 'all' || log.tableName === selectedTable;
    const matchesUser = selectedUser === 'all' || log.userRole === selectedUser;

    return matchesSearch && matchesAction && matchesSeverity && matchesTable && matchesUser;
  });

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-unlimited-dark-blue">سجلات النظام</h1>
            <p className="text-unlimited-gray">مراقبة جميع العمليات والأنشطة في النظام</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportLogs} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير السجلات
            </Button>
          </div>
        </div>

        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="logs">سجلات العمليات</TabsTrigger>
            <TabsTrigger value="security">سجلات الأمان</TabsTrigger>
            <TabsTrigger value="system">سجلات النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-4">
            {/* فلاتر البحث */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  فلاتر البحث والتصفية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البحث</label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث في السجلات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نوع العملية</label>
                    <Select value={selectedAction} onValueChange={setSelectedAction}>
                      <SelectTrigger>
                        <SelectValue placeholder="جميع العمليات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع العمليات</SelectItem>
                        <SelectItem value="INSERT">إدراج</SelectItem>
                        <SelectItem value="UPDATE">تحديث</SelectItem>
                        <SelectItem value="DELETE">حذف</SelectItem>
                        <SelectItem value="LOGIN">تسجيل دخول</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">مستوى الأهمية</label>
                    <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                      <SelectTrigger>
                        <SelectValue placeholder="جميع المستويات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المستويات</SelectItem>
                        <SelectItem value="low">منخفض</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="critical">حرج</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">الجدول</label>
                    <Select value={selectedTable} onValueChange={setSelectedTable}>
                      <SelectTrigger>
                        <SelectValue placeholder="جميع الجداول" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الجداول</SelectItem>
                        <SelectItem value="applications">الطلبات</SelectItem>
                        <SelectItem value="students">الطلاب</SelectItem>
                        <SelectItem value="users">المستخدمين</SelectItem>
                        <SelectItem value="universities">الجامعات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">نوع المستخدم</label>
                    <Select value={selectedUser} onValueChange={setSelectedUser}>
                      <SelectTrigger>
                        <SelectValue placeholder="جميع المستخدمين" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المستخدمين</SelectItem>
                        <SelectItem value="admin">مدير</SelectItem>
                        <SelectItem value="agent">وكيل</SelectItem>
                        <SelectItem value="student">طالب</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* جدول السجلات */}
            <Card>
              <CardHeader>
                <CardTitle>سجلات العمليات ({filteredLogs.length})</CardTitle>
                <CardDescription>جميع العمليات والأنشطة المسجلة في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>العملية</TableHead>
                      <TableHead>المستخدم</TableHead>
                      <TableHead>الجدول</TableHead>
                      <TableHead>التوقيت</TableHead>
                      <TableHead>عنوان IP</TableHead>
                      <TableHead>الأهمية</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getActionIcon(log.action)}
                            <span className="font-medium">{log.action}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{log.userName}</div>
                            <div className="text-sm text-gray-500">{log.userRole}</div>
                          </div>
                        </TableCell>
                        <TableCell>{log.tableName}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString('ar')}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>سجلات الأمان</CardTitle>
                <CardDescription>مراقبة الأنشطة الأمنية ومحاولات الدخول</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم تطوير هذه الميزة قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>سجلات النظام</CardTitle>
                <CardDescription>مراقبة أداء النظام والأخطاء</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم تطوير هذه الميزة قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
