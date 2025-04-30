
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FilterableTable from '@/components/admin/FilterableTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Edit, Trash2, Eye, UserCheck, UserX, Filter, Search } from 'lucide-react';

const ManageAgents = () => {
  const [agents, setAgents] = useState([
    {
      id: 'AGT001',
      name: 'محمد عبدالله',
      email: 'mohammed@example.com',
      phone: '+966501234567',
      country: 'المملكة العربية السعودية',
      status: 'active',
      studentsCount: 24,
      applicationsCount: 38
    },
    {
      id: 'AGT002',
      name: 'أحمد الخالدي',
      email: 'ahmad@example.com',
      phone: '+966507654321',
      country: 'الإمارات العربية المتحدة',
      status: 'pending',
      studentsCount: 0,
      applicationsCount: 0
    },
    {
      id: 'AGT003',
      name: 'سارة القحطاني',
      email: 'sara@example.com',
      phone: '+966509876543',
      country: 'قطر',
      status: 'inactive',
      studentsCount: 12,
      applicationsCount: 18
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Filter agents based on search query and filters
  const filteredAgents = agents.filter(agent => {
    // Apply search filter
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    
    // Apply country filter
    const matchesCountry = countryFilter === 'all' || agent.country === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  // Get unique countries for the country filter
  const countries = [...new Set(agents.map(agent => agent.country))];

  // Status configuration for UI
  const statusConfig = {
    active: { label: 'نشط', color: 'bg-green-500 text-white' },
    inactive: { label: 'غير نشط', color: 'bg-gray-500 text-white' },
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500 text-white' },
  };

  // Handlers
  const handleAddAgent = () => {
    setIsAddDialogOpen(true);
  };

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent);
    // Navigate or show details
  };

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (agent) => {
    // Show confirmation dialog and delete
    const updatedAgents = agents.filter(a => a.id !== agent.id);
    setAgents(updatedAgents);
    toast({
      title: "تم حذف الوكيل",
      description: `تم حذف الوكيل ${agent.name} بنجاح`,
      variant: "default",
    });
  };

  const handleApprove = (agent) => {
    const updatedAgents = agents.map(a => 
      a.id === agent.id ? { ...a, status: 'active' } : a
    );
    setAgents(updatedAgents);
    toast({
      title: "تم تفعيل الوكيل",
      description: `تم تفعيل الوكيل ${agent.name} بنجاح`,
      variant: "default",
    });
  };

  const handleDeactivate = (agent) => {
    const updatedAgents = agents.map(a => 
      a.id === agent.id ? { ...a, status: 'inactive' } : a
    );
    setAgents(updatedAgents);
    toast({
      title: "تم تعطيل الوكيل",
      description: `تم تعطيل الوكيل ${agent.name} بنجاح`,
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الوكلاء</h1>
          <Button onClick={handleAddAgent} className="gap-2">
            <UserPlus className="h-4 w-4" />
            إضافة وكيل
          </Button>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الدولة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدول</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FilterableTable
            data={filteredAgents}
            isLoading={isLoading}
            columns={[
              { header: "رمز الوكيل", accessor: "id" },
              { header: "اسم الوكيل", accessor: "name" },
              { header: "البريد الإلكتروني", accessor: "email", hideOnMobile: true },
              { header: "الدولة", accessor: "country", hideOnMobile: true },
              { 
                header: "الحالة", 
                accessor: "status",
                render: (status) => (
                  <Badge className={statusConfig[status]?.color || "bg-gray-500"}>
                    {statusConfig[status]?.label || status}
                  </Badge>
                )
              },
              { 
                header: "الطلاب", 
                accessor: "studentsCount",
                render: (count) => <span>{count}</span>
              },
              { 
                header: "الطلبات", 
                accessor: "applicationsCount",
                render: (count) => <span>{count}</span>
              },
            ]}
            actions={(agent) => [
              {
                icon: <Eye className="h-4 w-4" />,
                label: "عرض التفاصيل",
                onClick: () => handleViewDetails(agent),
              },
              {
                icon: <Edit className="h-4 w-4" />,
                label: "تعديل",
                onClick: () => handleEdit(agent),
              },
              agent.status === 'pending' ? {
                icon: <UserCheck className="h-4 w-4" />,
                label: "تفعيل",
                onClick: () => handleApprove(agent),
              } : null,
              agent.status === 'active' ? {
                icon: <UserX className="h-4 w-4" />,
                label: "تعطيل",
                onClick: () => handleDeactivate(agent),
              } : null,
              {
                icon: <Trash2 className="h-4 w-4" />,
                label: "حذف",
                onClick: () => handleDelete(agent),
                destructive: true,
              },
            ].filter(Boolean)}
          />
        </Card>

        {/* Add Agent Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة وكيل جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل الوكيل الجديد هنا.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">الاسم</Label>
                <Input id="name" className="col-span-3" placeholder="أدخل اسم الوكيل" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
                <Input id="email" type="email" className="col-span-3" placeholder="أدخل البريد الإلكتروني" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">الهاتف</Label>
                <Input id="phone" className="col-span-3" placeholder="أدخل رقم الهاتف" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">الدولة</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="المملكة العربية السعودية">المملكة العربية السعودية</SelectItem>
                    <SelectItem value="الإمارات العربية المتحدة">الإمارات العربية المتحدة</SelectItem>
                    <SelectItem value="قطر">قطر</SelectItem>
                    <SelectItem value="الكويت">الكويت</SelectItem>
                    <SelectItem value="البحرين">البحرين</SelectItem>
                    <SelectItem value="عمان">عمان</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => {
                toast({
                  title: "تم إضافة الوكيل",
                  description: "تم إضافة الوكيل بنجاح",
                });
                setIsAddDialogOpen(false);
              }}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Agent Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>تعديل بيانات الوكيل</DialogTitle>
              <DialogDescription>قم بتعديل بيانات الوكيل هنا.</DialogDescription>
            </DialogHeader>
            {selectedAgent && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">الاسم</Label>
                  <Input id="edit-name" className="col-span-3" defaultValue={selectedAgent.name} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">البريد الإلكتروني</Label>
                  <Input id="edit-email" type="email" className="col-span-3" defaultValue={selectedAgent.email} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">الهاتف</Label>
                  <Input id="edit-phone" className="col-span-3" defaultValue={selectedAgent.phone} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-country" className="text-right">الدولة</Label>
                  <Select defaultValue={selectedAgent.country}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="المملكة العربية السعودية">المملكة العربية السعودية</SelectItem>
                      <SelectItem value="الإمارات العربية المتحدة">الإمارات العربية المتحدة</SelectItem>
                      <SelectItem value="قطر">قطر</SelectItem>
                      <SelectItem value="الكويت">الكويت</SelectItem>
                      <SelectItem value="البحرين">البحرين</SelectItem>
                      <SelectItem value="عمان">عمان</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">الحالة</Label>
                  <Select defaultValue={selectedAgent.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                      <SelectItem value="pending">قيد الانتظار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => {
                toast({
                  title: "تم تحديث البيانات",
                  description: "تم تحديث بيانات الوكيل بنجاح",
                });
                setIsEditDialogOpen(false);
              }}>حفظ التعديلات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManageAgents;
