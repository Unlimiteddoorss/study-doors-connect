
import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  students: number;
  applications: number;
  commission: number;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
};

const initialAgents: Agent[] = [
  {
    id: 'AGT-001',
    name: 'محمد العلي',
    email: 'mohammed@example.com',
    phone: '+966 50 123 4567',
    country: 'السعودية',
    students: 25,
    applications: 32,
    commission: 15000,
    status: 'active',
    registrationDate: '2022-05-15',
  },
  {
    id: 'AGT-002',
    name: 'خالد الأحمد',
    email: 'khaled@example.com',
    phone: '+971 55 987 6543',
    country: 'الإمارات',
    students: 18,
    applications: 22,
    commission: 12500,
    status: 'active',
    registrationDate: '2022-06-20',
  },
  {
    id: 'AGT-003',
    name: 'سارة المحمود',
    email: 'sarah@example.com',
    phone: '+965 60 123 4567',
    country: 'الكويت',
    students: 12,
    applications: 15,
    commission: 8000,
    status: 'inactive',
    registrationDate: '2022-08-05',
  },
  {
    id: 'AGT-004',
    name: 'فهد الراشد',
    email: 'fahad@example.com',
    phone: '+974 33 123 4567',
    country: 'قطر',
    students: 30,
    applications: 38,
    commission: 22000,
    status: 'active',
    registrationDate: '2022-09-12',
  },
  {
    id: 'AGT-005',
    name: 'نورة السعيد',
    email: 'noura@example.com',
    phone: '+973 35 123 4567',
    country: 'البحرين',
    students: 15,
    applications: 19,
    commission: 11000,
    status: 'pending',
    registrationDate: '2023-01-10',
  },
];

const statusConfig = {
  active: { label: 'نشط', color: 'bg-unlimited-success text-white' },
  inactive: { label: 'غير نشط', color: 'bg-unlimited-gray text-white' },
  pending: { label: 'قيد التفعيل', color: 'bg-unlimited-warning text-white' },
};

const ManageAgents = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddAgent = () => {
    // محاكاة إضافة وكيل جديد
    toast({
      title: "تمت إضافة الوكيل",
      description: "تم إضافة الوكيل الجديد بنجاح",
    });
    setIsAddDialogOpen(false);
  };

  const handleImportAgents = () => {
    // محاكاة استيراد بيانات الوكلاء
    toast({
      title: "تم استيراد البيانات",
      description: "تم استيراد بيانات الوكلاء بنجاح",
    });
    setIsImportDialogOpen(false);
  };

  const handleExportAgents = () => {
    // محاكاة تصدير بيانات الوكلاء
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات الوكلاء بنجاح",
    });
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id));
    toast({
      title: "تم حذف الوكيل",
      description: `تم حذف الوكيل رقم ${id} بنجاح`,
    });
  };

  const toggleAgentStatus = (id: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: agent.status === 'active' ? 'inactive' : 'active',
            }
          : agent
      )
    );
    
    const agent = agents.find((a) => a.id === id);
    if (agent) {
      toast({
        title: "تم تغيير الحالة",
        description: `تم تغيير حالة الوكيل ${agent.name} بنجاح`,
      });
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الوكلاء</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة وكيل
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>إضافة وكيل جديد</DialogTitle>
                  <DialogDescription>
                    أدخل معلومات الوكيل الجديد. اضغط على حفظ عند الانتهاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الاسم</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">البريد الإلكتروني</label>
                    <Input type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الهاتف</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">الدولة</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">نسبة العمولة (%)</label>
                    <Input type="number" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddAgent}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    حفظ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>استيراد بيانات الوكلاء</DialogTitle>
                  <DialogDescription>
                    يرجى تحميل ملف CSV أو Excel يحتوي على بيانات الوكلاء.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                    <p className="mt-2 text-sm text-unlimited-gray">
                      اسحب وأفلت الملف هنا أو انقر للاختيار
                    </p>
                    <input type="file" className="hidden" />
                    <Button variant="outline" className="mt-4">
                      اختيار ملف
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleImportAgents}>
                    <Upload className="h-4 w-4 mr-2" />
                    استيراد البيانات
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportAgents}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="البحث عن وكيل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
              <SelectItem value="pending">قيد التفعيل</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">رقم الوكيل</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead className="hidden md:table-cell">البريد الإلكتروني</TableHead>
                <TableHead className="hidden lg:table-cell">الهاتف</TableHead>
                <TableHead className="hidden lg:table-cell">الدولة</TableHead>
                <TableHead className="hidden md:table-cell">الطلاب</TableHead>
                <TableHead className="hidden md:table-cell">الطلبات</TableHead>
                <TableHead>العمولة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center h-40 text-unlimited-gray">
                    لا توجد بيانات متطابقة مع البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.id}</TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{agent.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{agent.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{agent.country}</TableCell>
                    <TableCell className="hidden md:table-cell">{agent.students}</TableCell>
                    <TableCell className="hidden md:table-cell">{agent.applications}</TableCell>
                    <TableCell>{agent.commission} ريال</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[agent.status].color}>
                        {statusConfig[agent.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>خيارات الوكيل</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                              {agent.status === 'active' ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>عرض طلبات الوكيل</DropdownMenuItem>
                            <DropdownMenuItem>عرض طلاب الوكيل</DropdownMenuItem>
                            <DropdownMenuItem>تعديل نسبة العمولة</DropdownMenuItem>
                            <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-unlimited-danger focus:text-unlimited-danger"
                              onClick={() => handleDeleteAgent(agent.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              حذف
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
      </div>
    </DashboardLayout>
  );
};

export default ManageAgents;
