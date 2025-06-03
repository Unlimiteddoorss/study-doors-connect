
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
  File, 
  FolderOpen, 
  Upload, 
  Download, 
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  HardDrive,
  Image,
  FileText,
  Archive,
  Settings,
  Eye,
  Share
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  mimeType: string;
  category: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  isPublic: boolean;
  downloads: number;
  path: string;
}

interface FileSettings {
  id: string;
  fileType: string;
  maxSizeMB: number;
  allowedExtensions: string[];
  isRequired: boolean;
  category: string;
}

const FileManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // بيانات تجريبية للملفات
  const [files] = useState<FileItem[]>([
    {
      id: '1',
      name: 'شهادة_البكالوريوس.pdf',
      type: 'file',
      size: 2048000,
      mimeType: 'application/pdf',
      category: 'documents',
      uploadedBy: 'أحمد محمد',
      uploadedAt: '2024-01-15T10:30:00Z',
      lastModified: '2024-01-15T10:30:00Z',
      isPublic: false,
      downloads: 5,
      path: '/documents/certificates/'
    },
    {
      id: '2',
      name: 'صورة_الهوية.jpg',
      type: 'file',
      size: 1024000,
      mimeType: 'image/jpeg',
      category: 'images',
      uploadedBy: 'فاطمة أحمد',
      uploadedAt: '2024-01-15T09:15:00Z',
      lastModified: '2024-01-15T09:15:00Z',
      isPublic: false,
      downloads: 2,
      path: '/documents/identity/'
    },
    {
      id: '3',
      name: 'نسخة_احتياطية_2024.zip',
      type: 'file',
      size: 50480000,
      mimeType: 'application/zip',
      category: 'backups',
      uploadedBy: 'النظام',
      uploadedAt: '2024-01-15T00:00:00Z',
      lastModified: '2024-01-15T00:00:00Z',
      isPublic: false,
      downloads: 0,
      path: '/system/backups/'
    }
  ]);

  // إعدادات الملفات
  const [fileSettings, setFileSettings] = useState<FileSettings[]>([
    {
      id: '1',
      fileType: 'شهادة البكالوريوس',
      maxSizeMB: 5,
      allowedExtensions: ['pdf', 'jpg', 'png'],
      isRequired: true,
      category: 'documents'
    },
    {
      id: '2',
      fileType: 'صورة الهوية',
      maxSizeMB: 2,
      allowedExtensions: ['jpg', 'png'],
      isRequired: true,
      category: 'images'
    },
    {
      id: '3',
      fileType: 'النسخ الاحتياطية',
      maxSizeMB: 100,
      allowedExtensions: ['zip', 'tar', 'gz'],
      isRequired: false,
      category: 'backups'
    }
  ]);

  const [newSetting, setNewSetting] = useState({
    fileType: '',
    maxSizeMB: 5,
    allowedExtensions: '',
    isRequired: false,
    category: 'documents'
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-4 w-4 text-green-500" />;
    if (mimeType === 'application/pdf') return <FileText className="h-4 w-4 text-red-500" />;
    if (mimeType.includes('zip') || mimeType.includes('archive')) return <Archive className="h-4 w-4 text-purple-500" />;
    return <File className="h-4 w-4 text-gray-500" />;
  };

  const handleCreateSetting = () => {
    if (!newSetting.fileType) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const setting: FileSettings = {
      id: Date.now().toString(),
      fileType: newSetting.fileType,
      maxSizeMB: newSetting.maxSizeMB,
      allowedExtensions: newSetting.allowedExtensions.split(',').map(ext => ext.trim()),
      isRequired: newSetting.isRequired,
      category: newSetting.category
    };

    setFileSettings([...fileSettings, setting]);
    setNewSetting({
      fileType: '',
      maxSizeMB: 5,
      allowedExtensions: '',
      isRequired: false,
      category: 'documents'
    });
    setIsSettingsDialogOpen(false);

    toast({
      title: "تم الإنشاء",
      description: "تم إنشاء إعدادات الملف بنجاح"
    });
  };

  const handleDeleteFile = (fileId: string) => {
    toast({
      title: "تم الحذف",
      description: "تم حذف الملف بنجاح"
    });
  };

  const handleDownloadFile = (file: FileItem) => {
    toast({
      title: "تم التحميل",
      description: `تم تحميل ${file.name} بنجاح`
    });
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = searchQuery === '' || 
      file.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الملفات</h1>
            <p className="text-unlimited-gray">إدارة وتنظيم جميع ملفات النظام</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              رفع ملف
            </Button>
            <Button onClick={() => setIsSettingsDialogOpen(true)} variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              إعدادات الملفات
            </Button>
          </div>
        </div>

        <Tabs defaultValue="files" className="space-y-4">
          <TabsList>
            <TabsTrigger value="files">الملفات</TabsTrigger>
            <TabsTrigger value="settings">إعدادات الملفات</TabsTrigger>
            <TabsTrigger value="storage">مساحة التخزين</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-4">
            {/* فلاتر البحث */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  البحث والتصفية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البحث</label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث في الملفات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الفئة</label>
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="all">جميع الفئات</option>
                      <option value="documents">وثائق</option>
                      <option value="images">صور</option>
                      <option value="backups">نسخ احتياطية</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* جدول الملفات */}
            <Card>
              <CardHeader>
                <CardTitle>الملفات ({filteredFiles.length})</CardTitle>
                <CardDescription>جميع الملفات المرفوعة في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الملف</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>رفعه</TableHead>
                      <TableHead>تاريخ الرفع</TableHead>
                      <TableHead>التحميلات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.mimeType)}
                            <span className="font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatFileSize(file.size)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {file.category === 'documents' ? 'وثائق' :
                             file.category === 'images' ? 'صور' : 'نسخ احتياطية'}
                          </Badge>
                        </TableCell>
                        <TableCell>{file.uploadedBy}</TableCell>
                        <TableCell>{new Date(file.uploadedAt).toLocaleDateString('ar')}</TableCell>
                        <TableCell>{file.downloads}</TableCell>
                        <TableCell>
                          <Badge variant={file.isPublic ? "default" : "secondary"}>
                            {file.isPublic ? 'عام' : 'خاص'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadFile(file)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteFile(file.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إعدادات الملفات</CardTitle>
                    <CardDescription>تخصيص قواعد رفع الملفات</CardDescription>
                  </div>
                  <Button onClick={() => setIsSettingsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة إعداد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نوع الملف</TableHead>
                      <TableHead>الحد الأقصى للحجم</TableHead>
                      <TableHead>الامتدادات المسموحة</TableHead>
                      <TableHead>مطلوب</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fileSettings.map((setting) => (
                      <TableRow key={setting.id}>
                        <TableCell className="font-medium">{setting.fileType}</TableCell>
                        <TableCell>{setting.maxSizeMB} MB</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {setting.allowedExtensions.map((ext) => (
                              <Badge key={ext} variant="outline">{ext}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={setting.isRequired ? "default" : "secondary"}>
                            {setting.isRequired ? 'مطلوب' : 'اختياري'}
                          </Badge>
                        </TableCell>
                        <TableCell>{setting.category}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="storage">
            <Card>
              <CardHeader>
                <CardTitle>مساحة التخزين</CardTitle>
                <CardDescription>مراقبة استخدام مساحة التخزين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <HardDrive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم تطوير هذه الميزة قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog لإعدادات الملفات */}
        <FormDialog
          open={isSettingsDialogOpen}
          onOpenChange={setIsSettingsDialogOpen}
          title="إضافة إعدادات ملف جديد"
          description="تخصيص قواعد رفع نوع ملف معين"
          onSubmit={handleCreateSetting}
          submitLabel="إنشاء الإعداد"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-type">نوع الملف</Label>
              <Input
                id="file-type"
                value={newSetting.fileType}
                onChange={(e) => setNewSetting({ ...newSetting, fileType: e.target.value })}
                placeholder="شهادة البكالوريوس، صورة الهوية، إلخ"
              />
            </div>
            <div>
              <Label htmlFor="max-size">الحد الأقصى للحجم (MB)</Label>
              <Input
                id="max-size"
                type="number"
                value={newSetting.maxSizeMB}
                onChange={(e) => setNewSetting({ ...newSetting, maxSizeMB: parseInt(e.target.value) || 5 })}
              />
            </div>
            <div>
              <Label htmlFor="extensions">الامتدادات المسموحة (مفصولة بفاصلة)</Label>
              <Input
                id="extensions"
                value={newSetting.allowedExtensions}
                onChange={(e) => setNewSetting({ ...newSetting, allowedExtensions: e.target.value })}
                placeholder="pdf, jpg, png"
              />
            </div>
            <div>
              <Label htmlFor="category">الفئة</Label>
              <select 
                id="category"
                value={newSetting.category} 
                onChange={(e) => setNewSetting({ ...newSetting, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="documents">وثائق</option>
                <option value="images">صور</option>
                <option value="backups">نسخ احتياطية</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="required"
                checked={newSetting.isRequired}
                onCheckedChange={(checked) => setNewSetting({ ...newSetting, isRequired: checked })}
              />
              <Label htmlFor="required">مطلوب</Label>
            </div>
          </div>
        </FormDialog>

        {/* Dialog لرفع الملفات */}
        <FormDialog
          open={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          title="رفع ملف جديد"
          description="اختر الملف المراد رفعه"
          onSubmit={() => {
            setIsUploadDialogOpen(false);
            toast({
              title: "تم الرفع",
              description: "تم رفع الملف بنجاح"
            });
          }}
          submitLabel="رفع"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">اختر الملف</Label>
              <Input
                id="file-upload"
                type="file"
                className="cursor-pointer"
              />
            </div>
            <div>
              <Label htmlFor="file-category">الفئة</Label>
              <select 
                id="file-category"
                className="w-full p-2 border rounded-md"
              >
                <option value="documents">وثائق</option>
                <option value="images">صور</option>
                <option value="backups">نسخ احتياطية</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="public" />
              <Label htmlFor="public">ملف عام</Label>
            </div>
          </div>
        </FormDialog>
      </div>
    </DashboardLayout>
  );
};

export default FileManagement;
