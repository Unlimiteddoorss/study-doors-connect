
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { UserPlus, Loader2, ShieldCheck } from 'lucide-react';

// نموذج البيانات للمستخدمين الفرعيين
interface SubUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
}

// مكون إدارة الحسابات
const AccountManagement = () => {
  const [subUsers, setSubUsers] = useState<SubUser[]>([
    { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', role: 'editor', isActive: true },
    { id: '2', name: 'سارة خالد', email: 'sara@example.com', role: 'viewer', isActive: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  
  const { toast } = useToast();
  const { t } = useTranslation();

  // إضافة مستخدم فرعي جديد
  const addSubUser = () => {
    if (!newUserEmail || !newUserName) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال الاسم والبريد الإلكتروني",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // محاكاة الاتصال بالخادم
    setTimeout(() => {
      const newUser: SubUser = {
        id: Date.now().toString(),
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        isActive: true
      };
      
      setSubUsers([...subUsers, newUser]);
      setNewUserEmail('');
      setNewUserName('');
      
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تمت إضافة ${newUserName} كمستخدم فرعي جديد`,
      });
      
      setIsLoading(false);
    }, 1000);
  };

  // تغيير حالة المستخدم الفرعي (نشط/غير نشط)
  const toggleUserStatus = (userId: string) => {
    setSubUsers(subUsers.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive } 
        : user
    ));
    
    const user = subUsers.find(u => u.id === userId);
    
    if (user) {
      const statusText = !user.isActive ? "تفعيل" : "تعطيل";
      
      toast({
        title: `تم ${statusText} المستخدم`,
        description: `تم ${statusText} حساب ${user.name} بنجاح`,
      });
    }
  };

  // حذف مستخدم فرعي
  const deleteSubUser = (userId: string) => {
    const user = subUsers.find(u => u.id === userId);
    
    setSubUsers(subUsers.filter(user => user.id !== userId));
    
    if (user) {
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف حساب ${user.name} بنجاح`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الحسابات الفرعية</CardTitle>
          <CardDescription>
            أضف وأدر المستخدمين الفرعيين وحدد صلاحياتهم
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input 
                  id="name" 
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="أدخل اسم المستخدم الفرعي"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">الصلاحية</Label>
              <select 
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                value={newUserRole}
                onChange={e => setNewUserRole(e.target.value as any)}
              >
                <option value="viewer">مشاهد - عرض فقط</option>
                <option value="editor">محرر - تعديل وعرض</option>
                <option value="admin">مدير - تحكم كامل</option>
              </select>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={addSubUser} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري الإضافة...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                إضافة مستخدم فرعي
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>المستخدمون الفرعيون</CardTitle>
          <CardDescription>
            إدارة المستخدمين الفرعيين وصلاحياتهم
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {subUsers.length === 0 ? (
              <p className="text-center py-4 text-unlimited-gray">
                لا يوجد مستخدمون فرعيون حالياً
              </p>
            ) : (
              subUsers.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-unlimited-gray">{user.email}</p>
                    <div className="flex items-center">
                      <ShieldCheck className="h-4 w-4 text-unlimited-blue mr-1" />
                      <span className="text-sm">
                        {user.role === 'admin' 
                          ? 'مدير' 
                          : user.role === 'editor' 
                            ? 'محرر' 
                            : 'مشاهد'
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch 
                        checked={user.isActive}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                        id={`user-status-${user.id}`}
                      />
                      <Label htmlFor={`user-status-${user.id}`}>
                        {user.isActive ? 'نشط' : 'غير نشط'}
                      </Label>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteSubUser(user.id)}
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountManagement;
