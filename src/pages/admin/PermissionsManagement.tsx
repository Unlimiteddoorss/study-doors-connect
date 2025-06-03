
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormDialog } from '@/components/admin/FormDialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  UserCheck,
  Lock,
  Unlock
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
  isActive: boolean;
}

const PermissionsManagement = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'admin',
      displayName: 'مدير النظام',
      description: 'صلاحيات كاملة على النظام',
      permissions: ['manage_users', 'manage_applications', 'manage_universities', 'view_reports', 'system_settings'],
      userCount: 3,
      isSystem: true
    },
    {
      id: '2',
      name: 'agent',
      displayName: 'وكيل',
      description: 'إدارة الطلاب والطلبات',
      permissions: ['manage_students', 'view_applications', 'send_messages'],
      userCount: 15,
      isSystem: true
    },
    {
      id: '3',
      name: 'student',
      displayName: 'طالب',
      description: 'تقديم الطلبات ومتابعتها',
      permissions: ['submit_application', 'view_own_applications', 'send_messages'],
      userCount: 450,
      isSystem: true
    }
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: '1', name: 'manage_users', category: 'المستخدمين', description: 'إدارة المستخدمين والحسابات', isActive: true },
    { id: '2', name: 'manage_applications', category: 'الطلبات', description: 'إدارة طلبات الطلاب', isActive: true },
    { id: '3', name: 'manage_universities', category: 'الجامعات', description: 'إدارة الجامعات والبرامج', isActive: true },
    { id: '4', name: 'view_reports', category: 'التقارير', description: 'عرض التقارير والإحصائيات', isActive: true },
    { id: '5', name: 'system_settings', category: 'النظام', description: 'تعديل إعدادات النظام', isActive: true },
    { id: '6', name: 'manage_students', category: 'الطلاب', description: 'إدارة بيانات الطلاب', isActive: true },
    { id: '7', name: 'submit_application', category: 'الطلبات', description: 'تقديم طلبات جديدة', isActive: true },
    { id: '8', name: 'send_messages', category: 'الرسائل', description: 'إرسال واستقبال الرسائل', isActive: true }
  ]);

  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

  const [newRole, setNewRole] = useState({
    name: '',
    displayName: '',
    description: '',
    permissions: [] as string[]
  });

  const [newPermission, setNewPermission] = useState({
    name: '',
    category: '',
    description: '',
    isActive: true
  });

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.displayName) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      displayName: newRole.displayName,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
      isSystem: false
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', displayName: '', description: '', permissions: [] });
    setIsRoleDialogOpen(false);

    toast({
      title: "تم الإنشاء",
      description: "تم إنشاء الدور الجديد بنجاح"
    });
  };

  const handleCreatePermission = () => {
    if (!newPermission.name || !newPermission.category) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const permission: Permission = {
      id: Date.now().toString(),
      name: newPermission.name,
      category: newPermission.category,
      description: newPermission.description,
      isActive: newPermission.isActive
    };

    setPermissions([...permissions, permission]);
    setNewPermission({ name: '', category: '', description: '', isActive: true });
    setIsPermissionDialogOpen(false);

    toast({
      title: "تم الإنشاء",
      description: "تم إنشاء الصلاحية الجديدة بنجاح"
    });
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      toast({
        title: "خطأ",
        description: "لا يمكن حذف أدوار النظام الأساسية",
        variant: "destructive"
      });
      return;
    }

    setRoles(roles.filter(r => r.id !== roleId));
    toast({
      title: "تم الحذف",
      description: "تم حذف الدور بنجاح"
    });
  };

  const togglePermissionStatus = (permissionId: string) => {
    setPermissions(permissions.map(p => 
      p.id === permissionId ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الأذونات والصلاحيات</h1>
            <p className="text-unlimited-gray">إدارة أدوار المستخدمين والصلاحيات</p>
          </div>
        </div>

        <Tabs defaultValue="roles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="roles">الأدوار</TabsTrigger>
            <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
            <TabsTrigger value="assignments">تعيين الأدوار</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة الأدوار</CardTitle>
                    <CardDescription>إنشاء وتعديل أدوار المستخدمين</CardDescription>
                  </div>
                  <Button onClick={() => setIsRoleDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة دور جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الدور</TableHead>
                      <TableHead>الوصف</TableHead>
                      <TableHead>عدد المستخدمين</TableHead>
                      <TableHead>الصلاحيات</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{role.displayName}</div>
                            <div className="text-sm text-gray-500">{role.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>{role.userCount}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((permission) => (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {role.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{role.permissions.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={role.isSystem ? "default" : "secondary"}>
                            {role.isSystem ? "نظام" : "مخصص"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {!role.isSystem && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteRole(role.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة الصلاحيات</CardTitle>
                    <CardDescription>إنشاء وتعديل صلاحيات النظام</CardDescription>
                  </div>
                  <Button onClick={() => setIsPermissionDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة صلاحية جديدة
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold mb-3">{category}</h3>
                      <div className="grid gap-4">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className="flex-1">
                                  <div className="font-medium">{permission.name}</div>
                                  <div className="text-sm text-gray-500">{permission.description}</div>
                                </div>
                                <Switch
                                  checked={permission.isActive}
                                  onCheckedChange={() => togglePermissionStatus(permission.id)}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 mr-4">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تعيين الأدوار للمستخدمين</CardTitle>
                <CardDescription>إدارة أدوار المستخدمين في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم تطوير هذه الميزة قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog for creating new role */}
        <FormDialog
          open={isRoleDialogOpen}
          onOpenChange={setIsRoleDialogOpen}
          title="إضافة دور جديد"
          description="إنشاء دور جديد مع تحديد الصلاحيات"
          onSubmit={handleCreateRole}
          submitLabel="إنشاء الدور"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="role-name">اسم الدور (بالإنجليزية)</Label>
              <Input
                id="role-name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="admin, moderator, etc."
              />
            </div>
            <div>
              <Label htmlFor="role-display-name">الاسم المعروض</Label>
              <Input
                id="role-display-name"
                value={newRole.displayName}
                onChange={(e) => setNewRole({ ...newRole, displayName: e.target.value })}
                placeholder="مدير، مشرف، إلخ"
              />
            </div>
            <div>
              <Label htmlFor="role-description">الوصف</Label>
              <Input
                id="role-description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                placeholder="وصف مختصر للدور"
              />
            </div>
          </div>
        </FormDialog>

        {/* Dialog for creating new permission */}
        <FormDialog
          open={isPermissionDialogOpen}
          onOpenChange={setIsPermissionDialogOpen}
          title="إضافة صلاحية جديدة"
          description="إنشاء صلاحية جديدة في النظام"
          onSubmit={handleCreatePermission}
          submitLabel="إنشاء الصلاحية"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="permission-name">اسم الصلاحية</Label>
              <Input
                id="permission-name"
                value={newPermission.name}
                onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                placeholder="manage_something"
              />
            </div>
            <div>
              <Label htmlFor="permission-category">الفئة</Label>
              <Input
                id="permission-category"
                value={newPermission.category}
                onChange={(e) => setNewPermission({ ...newPermission, category: e.target.value })}
                placeholder="الطلبات، المستخدمين، إلخ"
              />
            </div>
            <div>
              <Label htmlFor="permission-description">الوصف</Label>
              <Input
                id="permission-description"
                value={newPermission.description}
                onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                placeholder="وصف الصلاحية وما تسمح به"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="permission-active"
                checked={newPermission.isActive}
                onCheckedChange={(checked) => setNewPermission({ ...newPermission, isActive: checked })}
              />
              <Label htmlFor="permission-active">مفعلة</Label>
            </div>
          </div>
        </FormDialog>
      </div>
    </DashboardLayout>
  );
};

export default PermissionsManagement;
