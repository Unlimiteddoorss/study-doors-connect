
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Calendar, 
  Clock,
  HardDrive,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface BackupRecord {
  id: string;
  name: string;
  size: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'completed' | 'running' | 'failed';
  createdAt: string;
  description: string;
}

interface BackupSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  type: 'full' | 'incremental';
  isActive: boolean;
  lastRun: string;
  nextRun: string;
}

const BackupManagement = () => {
  const { toast } = useToast();
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isRestoreRunning, setIsRestoreRunning] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState(0);

  const [backups, setBackups] = useState<BackupRecord[]>([
    {
      id: '1',
      name: 'backup_2024_01_15_full',
      size: '2.4 GB',
      type: 'full',
      status: 'completed',
      createdAt: '2024-01-15 02:00:00',
      description: 'نسخة احتياطية كاملة يومية'
    },
    {
      id: '2',
      name: 'backup_2024_01_14_incremental',
      size: '145 MB',
      type: 'incremental',
      status: 'completed',
      createdAt: '2024-01-14 02:00:00',
      description: 'نسخة احتياطية تدريجية'
    },
    {
      id: '3',
      name: 'backup_2024_01_13_full',
      size: '2.3 GB',
      type: 'full',
      status: 'failed',
      createdAt: '2024-01-13 02:00:00',
      description: 'فشل في إنشاء النسخة الاحتياطية'
    }
  ]);

  const [schedules, setSchedules] = useState<BackupSchedule[]>([
    {
      id: '1',
      name: 'النسخ الاحتياطي اليومي',
      frequency: 'daily',
      time: '02:00',
      type: 'incremental',
      isActive: true,
      lastRun: '2024-01-15 02:00:00',
      nextRun: '2024-01-16 02:00:00'
    },
    {
      id: '2',
      name: 'النسخ الاحتياطي الأسبوعي',
      frequency: 'weekly',
      time: '01:00',
      type: 'full',
      isActive: true,
      lastRun: '2024-01-14 01:00:00',
      nextRun: '2024-01-21 01:00:00'
    }
  ]);

  const handleCreateBackup = async (type: 'full' | 'incremental') => {
    setIsBackupRunning(true);
    setBackupProgress(0);

    // محاكاة عملية النسخ الاحتياطي
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackupRunning(false);
          
          const newBackup: BackupRecord = {
            id: Date.now().toString(),
            name: `backup_${new Date().toISOString().split('T')[0]}_${type}`,
            size: type === 'full' ? '2.5 GB' : '150 MB',
            type,
            status: 'completed',
            createdAt: new Date().toLocaleString('ar-SA'),
            description: `نسخة احتياطية ${type === 'full' ? 'كاملة' : 'تدريجية'} يدوية`
          };

          setBackups([newBackup, ...backups]);
          
          toast({
            title: "تم إنشاء النسخة الاحتياطية",
            description: `تم إنشاء النسخة الاحتياطية ${type === 'full' ? 'الكاملة' : 'التدريجية'} بنجاح`
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleRestoreBackup = async (backupId: string) => {
    setIsRestoreRunning(true);
    setRestoreProgress(0);

    // محاكاة عملية الاستعادة
    const interval = setInterval(() => {
      setRestoreProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRestoreRunning(false);
          
          toast({
            title: "تم استعادة البيانات",
            description: "تم استعادة البيانات من النسخة الاحتياطية بنجاح"
          });
          
          return 100;
        }
        return prev + 8;
      });
    }, 600);
  };

  const handleDownloadBackup = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    toast({
      title: "بدء التحميل",
      description: `جاري تحميل النسخة الاحتياطية: ${backup?.name}`
    });
  };

  const toggleSchedule = (scheduleId: string) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, isActive: !schedule.isActive }
        : schedule
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">مكتمل</Badge>;
      case 'running':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">قيد التشغيل</Badge>;
      case 'failed':
        return <Badge variant="destructive">فاشل</Badge>;
      default:
        return <Badge variant="secondary">غير معروف</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'full':
        return <Badge variant="default">كاملة</Badge>;
      case 'incremental':
        return <Badge variant="secondary">تدريجية</Badge>;
      case 'differential':
        return <Badge variant="outline">تفاضلية</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-unlimited-dark-blue">إدارة النسخ الاحتياطي</h1>
            <p className="text-unlimited-gray">إنشاء واستعادة النسخ الاحتياطية للنظام</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <Database className="h-8 w-8 text-unlimited-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">نسخة احتياطية كاملة</h3>
                  <p className="text-sm text-gray-600">نسخ جميع البيانات</p>
                </div>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => handleCreateBackup('full')}
                disabled={isBackupRunning}
              >
                {isBackupRunning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Database className="h-4 w-4 mr-2" />}
                إنشاء نسخة كاملة
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <RefreshCw className="h-8 w-8 text-unlimited-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">نسخة احتياطية تدريجية</h3>
                  <p className="text-sm text-gray-600">نسخ التغييرات الجديدة فقط</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => handleCreateBackup('incremental')}
                disabled={isBackupRunning}
              >
                {isBackupRunning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                إنشاء نسخة تدريجية
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <Upload className="h-8 w-8 text-unlimited-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">استعادة البيانات</h3>
                  <p className="text-sm text-gray-600">استعادة من نسخة احتياطية</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                disabled={isRestoreRunning}
              >
                {isRestoreRunning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                رفع واستعادة
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress indicators */}
        {isBackupRunning && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">جاري إنشاء النسخة الاحتياطية...</span>
                  <span className="text-sm text-gray-500">{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {isRestoreRunning && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">جاري استعادة البيانات...</span>
                  <span className="text-sm text-gray-500">{restoreProgress}%</span>
                </div>
                <Progress value={restoreProgress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="backups" className="space-y-4">
          <TabsList>
            <TabsTrigger value="backups">النسخ الاحتياطية</TabsTrigger>
            <TabsTrigger value="schedules">الجدولة التلقائية</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="backups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>النسخ الاحتياطية المتوفرة</CardTitle>
                <CardDescription>قائمة بجميع النسخ الاحتياطية المحفوظة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم النسخة</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>تاريخ الإنشاء</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{backup.name}</div>
                            <div className="text-sm text-gray-500">{backup.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(backup.type)}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{getStatusBadge(backup.status)}</TableCell>
                        <TableCell>{backup.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadBackup(backup.id)}
                              disabled={backup.status !== 'completed'}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRestoreBackup(backup.id)}
                              disabled={backup.status !== 'completed' || isRestoreRunning}
                            >
                              <Upload className="h-4 w-4" />
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

          <TabsContent value="schedules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>جدولة النسخ الاحتياطي</CardTitle>
                <CardDescription>إعداد النسخ الاحتياطي التلقائي</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>التكرار</TableHead>
                      <TableHead>الوقت</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>آخر تشغيل</TableHead>
                      <TableHead>التشغيل التالي</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {schedule.frequency === 'daily' ? 'يومي' : 
                             schedule.frequency === 'weekly' ? 'أسبوعي' : 'شهري'}
                          </Badge>
                        </TableCell>
                        <TableCell>{schedule.time}</TableCell>
                        <TableCell>{getTypeBadge(schedule.type)}</TableCell>
                        <TableCell>{schedule.lastRun}</TableCell>
                        <TableCell>{schedule.nextRun}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={schedule.isActive}
                              onCheckedChange={() => toggleSchedule(schedule.id)}
                            />
                            <span className="text-sm">
                              {schedule.isActive ? 'مفعل' : 'معطل'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            تعديل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات التخزين</CardTitle>
                  <CardDescription>إعدادات حفظ النسخ الاحتياطية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">مدة الاحتفاظ (أيام)</Label>
                    <Input id="retention-period" defaultValue="30" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-backups">الحد الأقصى للنسخ</Label>
                    <Input id="max-backups" defaultValue="10" type="number" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="compression" defaultChecked />
                    <Label htmlFor="compression">ضغط النسخ الاحتياطية</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="encryption" defaultChecked />
                    <Label htmlFor="encryption">تشفير النسخ الاحتياطية</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الإشعارات</CardTitle>
                  <CardDescription>إشعارات العمليات</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="success-notifications" defaultChecked />
                    <Label htmlFor="success-notifications">إشعار عند النجاح</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="failure-notifications" defaultChecked />
                    <Label htmlFor="failure-notifications">إشعار عند الفشل</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-notifications" />
                    <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notification-email">البريد الإلكتروني للإشعارات</Label>
                    <Input id="notification-email" type="email" placeholder="admin@example.com" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BackupManagement;
