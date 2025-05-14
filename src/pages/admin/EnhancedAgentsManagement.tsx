
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Plus, 
  Upload, 
  Download, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  Send,
  UserPlus,
  FileText,
  Badge,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AdvancedSearch from '@/components/admin/AdvancedSearch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AreaChart } from '@/components/ui/chart';
import { toast } from '@/hooks/use-toast';

// Mock data for agents
const agentsData = [
  { 
    id: '1', 
    name: 'محمد أحمد', 
    email: 'mohamed@example.com', 
    phone: '+90 555 123 4567', 
    location: 'إسطنبول، تركيا', 
    status: 'نشط',
    students: 24,
    applications: 45,
    successRate: '87%',
    createdAt: '2023-01-15'
  },
  { 
    id: '2', 
    name: 'سارة محمود', 
    email: 'sara@example.com', 
    phone: '+90 555 234 5678', 
    location: 'أنقرة، تركيا', 
    status: 'نشط',
    students: 18,
    applications: 32,
    successRate: '91%',
    createdAt: '2023-02-20'
  },
  { 
    id: '3', 
    name: 'أحمد خالد', 
    email: 'ahmed@example.com', 
    phone: '+90 555 345 6789', 
    location: 'كوالالمبور، ماليزيا', 
    status: 'معلق',
    students: 7,
    applications: 12,
    successRate: '75%',
    createdAt: '2023-03-10'
  },
  { 
    id: '4', 
    name: 'فاطمة علي', 
    email: 'fatima@example.com', 
    phone: '+90 555 456 7890', 
    location: 'لندن، بريطانيا', 
    status: 'نشط',
    students: 15,
    applications: 28,
    successRate: '82%',
    createdAt: '2023-04-05'
  },
  { 
    id: '5', 
    name: 'عمر يوسف', 
    email: 'omar@example.com', 
    phone: '+90 555 567 8901', 
    location: 'دبي، الإمارات', 
    status: 'غير نشط',
    students: 3,
    applications: 5,
    successRate: '60%',
    createdAt: '2023-05-12'
  },
];

// Mock data for locations (for filters)
const locations = ['إسطنبول، تركيا', 'أنقرة، تركيا', 'كوالالمبور، ماليزيا', 'لندن، بريطانيا', 'دبي، الإمارات'];

// Performance data for charts
const monthlyPerformanceData = [
  { month: 'يناير', applications: 28, successful: 22 },
  { month: 'فبراير', applications: 35, successful: 30 },
  { month: 'مارس', applications: 42, successful: 36 },
  { month: 'أبريل', applications: 38, successful: 30 },
  { month: 'مايو', applications: 45, successful: 40 },
  { month: 'يونيو', applications: 50, successful: 43 },
];

const EnhancedAgentsManagement = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({ location: 'all', status: 'all' });
  const [selectedAgent, setSelectedAgent] = useState<typeof agentsData[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleExport = () => {
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات الوكلاء بنجاح",
    });
  };

  const handleImport = () => {
    setIsImportDialogOpen(false);
    toast({
      title: "تم استيراد البيانات",
      description: "تم استيراد بيانات الوكلاء بنجاح",
    });
  };

  const toggleAgentStatus = (id: string) => {
    // تنفيذ تبديل حالة الوكيل (نشط/غير نشط)
    toast({
      title: "تم تحديث الحالة",
      description: "تم تغيير حالة الوكيل بنجاح",
    });
  };

  const viewAgentDetails = (agent: typeof agentsData[0]) => {
    setSelectedAgent(agent);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'غير نشط': return 'bg-red-100 text-red-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and search functionality
  const filteredAgents = agentsData.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.phone.includes(searchQuery);
                          
    const matchesLocation = filters.location === 'all' || agent.location === filters.location;
    const matchesStatus = filters.status === 'all' || agent.status === filters.status;
    
    if (activeTab === 'all') return matchesSearch && matchesLocation && matchesStatus;
    if (activeTab === 'active') return matchesSearch && matchesLocation && agent.status === 'نشط';
    if (activeTab === 'pending') return matchesSearch && matchesLocation && agent.status === 'معلق';
    if (activeTab === 'inactive') return matchesSearch && matchesLocation && agent.status === 'غير نشط';
    
    return matchesSearch && matchesLocation && matchesStatus;
  });

  return (
    <DashboardLayout userRole="admin">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t('admin.agentsPage.title', 'إدارة الوكلاء')}</h1>
            <p className="text-unlimited-gray">{t('admin.agentsPage.subtitle', 'إدارة وتتبع معلومات وأداء وكلاء المؤسسة')}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.agentsPage.addAgent', 'إضافة وكيل')}
            </Button>
            
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('admin.agentsPage.importAgents', 'استيراد وكلاء')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.agentsPage.importData', 'استيراد بيانات')}</DialogTitle>
                  <DialogDescription>
                    {t('admin.agentsPage.importDataDesc', 'قم بتحميل ملف بيانات الوكلاء بتنسيق CSV أو Excel')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                    <p className="mt-2 text-sm text-unlimited-gray">
                      {t('admin.agentsPage.dragDrop', 'اسحب وأفلت الملفات هنا، أو انقر للاختيار')}
                    </p>
                    <input type="file" className="hidden" />
                    <Button variant="outline" className="mt-4">
                      {t('admin.agentsPage.chooseFile', 'اختر ملف')}
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleImport}>
                    <Upload className="h-4 w-4 mr-2" />
                    {t('admin.agentsPage.importAgents', 'استيراد وكلاء')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t('admin.agentsPage.exportAgents', 'تصدير وكلاء')}
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border-unlimited-blue/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-unlimited-dark-blue">
                {t('admin.agentsPage.totalAgents', 'إجمالي الوكلاء')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-unlimited-dark-blue">{agentsData.length}</div>
                  <div className="text-unlimited-gray text-sm">
                    {t('admin.agentsPage.activeAgents', 'نشط')}: {agentsData.filter(a => a.status === 'نشط').length}
                  </div>
                </div>
                <div className="bg-unlimited-blue/10 p-3 rounded-full">
                  <UserPlus className="h-6 w-6 text-unlimited-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-unlimited-dark-blue">
                {t('admin.agentsPage.totalStudents', 'إجمالي الطلاب')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-unlimited-dark-blue">
                    {agentsData.reduce((sum, agent) => sum + agent.students, 0)}
                  </div>
                  <div className="text-unlimited-gray text-sm">
                    {t('admin.agentsPage.byAgents', 'من خلال الوكلاء')}
                  </div>
                </div>
                <div className="bg-green-500/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-unlimited-dark-blue">
                {t('admin.agentsPage.avgSuccessRate', 'متوسط معدل النجاح')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-unlimited-dark-blue">
                    {Math.round(agentsData.reduce((sum, agent) => sum + parseInt(agent.successRate), 0) / agentsData.length)}%
                  </div>
                  <div className="text-unlimited-gray text-sm">
                    {t('admin.agentsPage.applications', 'مجموع الطلبات')}:&nbsp;
                    {agentsData.reduce((sum, agent) => sum + agent.applications, 0)}
                  </div>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-full">
                  <Badge className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
              <TabsList className="md:w-auto">
                <TabsTrigger value="all">{t('admin.agentsPage.all', 'الكل')}</TabsTrigger>
                <TabsTrigger value="active">{t('admin.agentsPage.active', 'نشط')}</TabsTrigger>
                <TabsTrigger value="pending">{t('admin.agentsPage.pending', 'معلق')}</TabsTrigger>
                <TabsTrigger value="inactive">{t('admin.agentsPage.inactive', 'غير نشط')}</TabsTrigger>
              </TabsList>
              
              <AdvancedSearch 
                placeholder={t('admin.agentsPage.searchPlaceholder', 'البحث عن وكلاء...')}
                filterOptions={{
                  status: ['نشط', 'معلق', 'غير نشط'],
                  location: locations
                }}
              />
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>{t('admin.agentsPage.agentsList', 'قائمة الوكلاء')}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">{t('admin.agentsPage.id', 'الرقم')}</TableHead>
                        <TableHead>{t('admin.agentsPage.name', 'الاسم')}</TableHead>
                        <TableHead>{t('admin.agentsPage.email', 'البريد الإلكتروني')}</TableHead>
                        <TableHead>{t('admin.agentsPage.phone', 'الهاتف')}</TableHead>
                        <TableHead>{t('admin.agentsPage.location', 'الموقع')}</TableHead>
                        <TableHead>{t('admin.agentsPage.students', 'الطلاب')}</TableHead>
                        <TableHead>{t('admin.agentsPage.applications', 'الطلبات')}</TableHead>
                        <TableHead>{t('admin.agentsPage.successRate', 'معدل النجاح')}</TableHead>
                        <TableHead>{t('admin.agentsPage.status', 'الحالة')}</TableHead>
                        <TableHead className="text-right">{t('admin.agentsPage.actions', 'إجراءات')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAgents.map((agent) => (
                        <TableRow key={agent.id} className="hover:bg-unlimited-blue/5 transition-colors">
                          <TableCell className="font-medium">{agent.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{agent.name}</div>
                          </TableCell>
                          <TableCell>{agent.email}</TableCell>
                          <TableCell>{agent.phone}</TableCell>
                          <TableCell>{agent.location}</TableCell>
                          <TableCell className="font-medium text-center">{agent.students}</TableCell>
                          <TableCell className="font-medium text-center">{agent.applications}</TableCell>
                          <TableCell className="font-medium text-center">
                            <span className={parseInt(agent.successRate) > 80 ? "text-green-600" : parseInt(agent.successRate) > 60 ? "text-yellow-600" : "text-red-600"}>
                              {agent.successRate}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agent.status)}`}>
                              {agent.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <span className="sr-only">{t('admin.agentsPage.openMenu', 'فتح القائمة')}</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t('admin.agentsPage.actions', 'إجراءات')}</DropdownMenuLabel>
                                <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => viewAgentDetails(agent)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t('admin.agentsPage.view', 'عرض التفاصيل')}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer">
                                  <Edit className="h-4 w-4 mr-2" />
                                  {t('admin.agentsPage.edit', 'تعديل')}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer">
                                  <Send className="h-4 w-4 mr-2" />
                                  {t('admin.agentsPage.sendMessage', 'إرسال رسالة')}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="flex items-center cursor-pointer"
                                  onClick={() => toggleAgentStatus(agent.id)}
                                >
                                  {agent.status === 'نشط' ? (
                                    <>
                                      <X className="h-4 w-4 mr-2 text-unlimited-danger" />
                                      <span className="text-unlimited-danger">{t('admin.agentsPage.deactivate', 'إلغاء تفعيل')}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Check className="h-4 w-4 mr-2 text-unlimited-success" />
                                      <span className="text-unlimited-success">{t('admin.agentsPage.activate', 'تفعيل')}</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer text-unlimited-danger">
                                  <Trash className="h-4 w-4 mr-2" />
                                  {t('admin.agentsPage.delete', 'حذف')}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredAgents.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center py-8">
                            <div className="flex flex-col items-center">
                              <Search className="h-10 w-10 text-unlimited-gray mb-2" />
                              <p className="text-unlimited-gray">
                                {t('admin.agentsPage.noAgentsFound', 'لم يتم العثور على وكلاء مطابقين')}
                              </p>
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setSearchQuery('');
                                  setFilters({ location: 'all', status: 'all' });
                                  setActiveTab('all');
                                }} 
                                className="mt-2"
                              >
                                {t('admin.agentsPage.clearFilters', 'مسح عوامل التصفية')}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.agentsPage.monthlyPerformance', 'الأداء الشهري')}</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={monthlyPerformanceData}
                index="month"
                categories={["applications", "successful"]}
                colors={["#3498db", "#2ecc71"]}
                valueFormatter={(value) => `${value}`}
                className="h-72"
              />
              <div className="flex justify-center mt-4 space-x-4 rtl:space-x-reverse text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#3498db] mr-2"></div>
                  <span>{t('admin.agentsPage.totalApplications', 'إجمالي الطلبات')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2ecc71] mr-2"></div>
                  <span>{t('admin.agentsPage.successfulApplications', 'الطلبات الناجحة')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.agentsPage.topPerformingAgents', 'أفضل الوكلاء أداءً')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentsData
                  .sort((a, b) => parseInt(b.successRate) - parseInt(a.successRate))
                  .slice(0, 3)
                  .map((agent, index) => (
                    <div key={agent.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-unlimited-blue/10 rounded-full flex items-center justify-center text-unlimited-blue font-bold mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-unlimited-gray text-xs">{agent.location}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-semibold">
                          <span className={parseInt(agent.successRate) > 80 ? "text-green-600" : "text-yellow-600"}>
                            {agent.successRate}
                          </span>
                        </div>
                        <div className="text-unlimited-gray text-xs">
                          {agent.students} {t('admin.agentsPage.studentsShort', 'طالب')}
                        </div>
                      </div>
                    </div>
                  ))
                }
                
                {agentsData.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-8 w-8 mx-auto text-unlimited-gray mb-2" />
                    <p className="text-unlimited-gray">{t('admin.agentsPage.noData', 'لا توجد بيانات متاحة')}</p>
                  </div>
                )}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                {t('admin.agentsPage.viewAllData', 'عرض جميع البيانات')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Add Agent Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>{t('admin.agentsPage.addNewAgent', 'إضافة وكيل جديد')}</DialogTitle>
            <DialogDescription>
              {t('admin.agentsPage.addNewAgentDesc', 'أدخل معلومات الوكيل الجديد لإضافته إلى النظام')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                {t('admin.agentsPage.firstName', 'الاسم الأول')}
              </label>
              <Input id="firstName" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                {t('admin.agentsPage.lastName', 'الاسم الأخير')}
              </label>
              <Input id="lastName" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t('admin.agentsPage.email', 'البريد الإلكتروني')}
              </label>
              <Input id="email" type="email" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                {t('admin.agentsPage.phone', 'الهاتف')}
              </label>
              <Input id="phone" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="location" className="text-sm font-medium">
                {t('admin.agentsPage.location', 'الموقع')}
              </label>
              <select
                id="location"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-unlimited-blue/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                {t('admin.agentsPage.status', 'الحالة')}
              </label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-unlimited-blue/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="نشط">{t('admin.agentsPage.active', 'نشط')}</option>
                <option value="معلق">{t('admin.agentsPage.pending', 'معلق')}</option>
                <option value="غير نشط">{t('admin.agentsPage.inactive', 'غير نشط')}</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel', 'إلغاء')}
            </Button>
            <Button 
              type="submit" 
              onClick={() => {
                setIsAddDialogOpen(false);
                toast({
                  title: "تم إضافة الوكيل",
                  description: "تمت إضافة الوكيل الجديد بنجاح",
                });
              }}
            >
              {t('admin.agentsPage.addAgent', 'إضافة وكيل')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Agent Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[675px]">
          <DialogHeader>
            <DialogTitle>{t('admin.agentsPage.agentDetails', 'تفاصيل الوكيل')}</DialogTitle>
            <DialogDescription>
              {selectedAgent?.name} - {selectedAgent?.location}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAgent && (
            <div className="py-2">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-unlimited-blue/5 border-unlimited-blue/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.students', 'الطلاب')}</h4>
                        <p className="text-2xl font-bold">{selectedAgent.students}</p>
                      </div>
                      <div className="bg-unlimited-blue/10 p-2 rounded-full">
                        <UserPlus className="h-4 w-4 text-unlimited-blue" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-500/5 border-green-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.applications', 'الطلبات')}</h4>
                        <p className="text-2xl font-bold">{selectedAgent.applications}</p>
                      </div>
                      <div className="bg-green-500/10 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('admin.agentsPage.contactInfo', 'معلومات الاتصال')}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.email', 'البريد الإلكتروني')}</h4>
                    <p>{selectedAgent.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.phone', 'الهاتف')}</h4>
                    <p>{selectedAgent.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.location', 'الموقع')}</h4>
                    <p>{selectedAgent.location}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.status', 'الحالة')}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedAgent.status)}`}>
                      {selectedAgent.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">{t('admin.agentsPage.performance', 'الأداء')}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.successRate', 'معدل النجاح')}</h4>
                      <p className={`text-2xl font-bold ${parseInt(selectedAgent.successRate) > 80 ? "text-green-600" : parseInt(selectedAgent.successRate) > 60 ? "text-yellow-600" : "text-red-600"}`}>
                        {selectedAgent.successRate}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-unlimited-gray">{t('admin.agentsPage.conversionRate', 'معدل التحويل')}</h4>
                      <p className="text-2xl font-bold text-unlimited-blue">
                        {Math.round(parseInt(selectedAgent.successRate) * 0.9)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-48">
                    <AreaChart
                      data={[
                        { month: 'يناير', value: 10 },
                        { month: 'فبراير', value: 15 },
                        { month: 'مارس', value: 22 },
                        { month: 'أبريل', value: 18 },
                        { month: 'مايو', value: 25 },
                        { month: 'يونيو', value: 30 },
                      ]}
                      index="month"
                      categories={["value"]}
                      colors={["blue"]}
                      valueFormatter={(value) => `${value}`}
                      className="h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              {t('close', 'إغلاق')}
            </Button>
            <Button variant="unlimited">
              <Send className="h-4 w-4 mr-2" />
              {t('admin.agentsPage.sendMessage', 'إرسال رسالة')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default EnhancedAgentsManagement;
