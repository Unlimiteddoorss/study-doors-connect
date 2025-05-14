
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
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
  Download, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  MessageSquare,
  UserCheck,
  UserX,
  Shield,
  BarChart
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
import { Input } from '@/components/ui/input';
import AdvancedSearch from '@/components/admin/AdvancedSearch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// بيانات مثال للوكلاء
const agentsData = [
  { 
    id: '1', 
    name: 'محمد العلي', 
    email: 'mohamed@agents.com', 
    phone: '+90 555 123 4567', 
    country: 'تركيا', 
    status: 'نشط',
    studentsCount: 24,
    applicationsCount: 38,
    commissionRate: '20%',
    joiningDate: '2023-01-15'
  },
  { 
    id: '2', 
    name: 'سارة الأحمد', 
    email: 'sara@agents.com', 
    phone: '+90 555 234 5678', 
    country: 'مصر', 
    status: 'نشط',
    studentsCount: 18,
    applicationsCount: 27,
    commissionRate: '18%',
    joiningDate: '2023-02-20'
  },
  { 
    id: '3', 
    name: 'أحمد محمد', 
    email: 'ahmed@agents.com', 
    phone: '+90 555 345 6789', 
    country: 'الأردن', 
    status: 'معلق',
    studentsCount: 12,
    applicationsCount: 15,
    commissionRate: '15%',
    joiningDate: '2023-03-10'
  },
  { 
    id: '4', 
    name: 'لينا خالد', 
    email: 'lina@agents.com', 
    phone: '+90 555 456 7890', 
    country: 'سوريا', 
    status: 'نشط',
    studentsCount: 31,
    applicationsCount: 42,
    commissionRate: '22%',
    joiningDate: '2023-04-05'
  },
  { 
    id: '5', 
    name: 'سليم حسين', 
    email: 'salim@agents.com', 
    phone: '+90 555 567 8901', 
    country: 'لبنان', 
    status: 'غير نشط',
    studentsCount: 8,
    applicationsCount: 11,
    commissionRate: '15%',
    joiningDate: '2023-05-12'
  },
];

// قائمة الدول للتصفية
const countries = ['تركيا', 'مصر', 'الأردن', 'سوريا', 'لبنان', 'السعودية', 'الإمارات', 'العراق', 'فلسطين', 'قطر'];

const AgentsManagement = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({ country: 'all', status: 'all' });
  
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
    console.log('Exporting agents data...');
    // تنفيذ وظيفة التصدير
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'غير نشط': return 'bg-red-100 text-red-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // تصفية وبحث الوكلاء
  const filteredAgents = agentsData.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.phone.includes(searchQuery);
                          
    const matchesCountry = filters.country === 'all' || agent.country === filters.country;
    const matchesStatus = filters.status === 'all' || agent.status === filters.status;
    
    return matchesSearch && matchesCountry && matchesStatus;
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
            <h1 className="text-2xl font-bold">{t('admin.agentsPage.title')}</h1>
            <p className="text-unlimited-gray">{t('admin.agentsPage.subtitle')}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.agentsPage.addAgent')}
            </Button>
            
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t('admin.agentsPage.exportAgents')}
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AdvancedSearch 
            placeholder={t('admin.agentsPage.searchPlaceholder')}
            filterOptions={{
              status: ['نشط', 'معلق', 'غير نشط'],
              country: countries
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="px-6">
              <CardTitle>{t('admin.agentsPage.agentsList')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>{t('admin.agentsPage.agentsList')}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">{t('admin.agentsPage.id')}</TableHead>
                      <TableHead>{t('admin.agentsPage.name')}</TableHead>
                      <TableHead>{t('admin.agentsPage.email')}</TableHead>
                      <TableHead>{t('admin.agentsPage.phone')}</TableHead>
                      <TableHead>{t('admin.agentsPage.country')}</TableHead>
                      <TableHead>{t('admin.agentsPage.status')}</TableHead>
                      <TableHead className="text-center">{t('admin.agentsPage.students')}</TableHead>
                      <TableHead className="text-center">{t('admin.agentsPage.applications')}</TableHead>
                      <TableHead>{t('admin.agentsPage.commissionRate')}</TableHead>
                      <TableHead>{t('admin.agentsPage.joiningDate')}</TableHead>
                      <TableHead className="text-right">{t('admin.agentsPage.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgents.map((agent) => (
                      <TableRow key={agent.id} className="hover:bg-unlimited-blue/5 transition-colors">
                        <TableCell className="font-medium">{agent.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${agent.name}`} alt={agent.name} />
                              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{agent.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{agent.email}</TableCell>
                        <TableCell>{agent.phone}</TableCell>
                        <TableCell>{agent.country}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agent.status)}`}>
                            {agent.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">{agent.studentsCount}</TableCell>
                        <TableCell className="text-center">{agent.applicationsCount}</TableCell>
                        <TableCell>{agent.commissionRate}</TableCell>
                        <TableCell>{agent.joiningDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <span className="sr-only">{t('admin.agentsPage.openMenu')}</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{t('admin.agentsPage.actions')}</DropdownMenuLabel>
                              <DropdownMenuItem className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                {t('admin.agentsPage.view')}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                {t('admin.agentsPage.edit')}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                {t('admin.agentsPage.sendMessage')}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <BarChart className="h-4 w-4 mr-2" />
                                {t('admin.agentsPage.viewStats')}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {agent.status === 'نشط' ? (
                                <DropdownMenuItem className="flex items-center text-orange-600">
                                  <UserX className="h-4 w-4 mr-2" />
                                  {t('admin.agentsPage.suspend')}
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="flex items-center text-green-600">
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  {t('admin.agentsPage.activate')}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="flex items-center text-unlimited-danger">
                                <Trash className="h-4 w-4 mr-2" />
                                {t('admin.agentsPage.delete')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredAgents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center py-8">
                          <div className="flex flex-col items-center">
                            <Search className="h-10 w-10 text-unlimited-gray mb-2" />
                            <p className="text-unlimited-gray">
                              {t('admin.agentsPage.noAgentsFound')}
                            </p>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSearchQuery('');
                                setFilters({ country: 'all', status: 'all' });
                              }} 
                              className="mt-2"
                            >
                              {t('admin.agentsPage.clearFilters')}
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
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('admin.agentsPage.performance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-2">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.agentsPage.topPerformer')}</span>
                  <span className="font-bold text-unlimited-success">لينا خالد (31)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.agentsPage.averageStudents')}</span>
                  <span className="font-bold">18.6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.agentsPage.totalCommissions')}</span>
                  <span className="font-bold text-unlimited-blue">$24,680</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('admin.agentsPage.recentActivity')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-2">
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1 text-sm">
                  <span>{t('admin.agentsPage.newAgentAdded')}</span>
                  <span className="text-unlimited-gray">10:30 AM</span>
                </div>
                <div className="flex justify-between border-b pb-1 text-sm">
                  <span>{t('admin.agentsPage.statusUpdated')}</span>
                  <span className="text-unlimited-gray">{t('time.yesterday')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('admin.agentsPage.commissionPaid')}</span>
                  <span className="text-unlimited-gray">2 {t('time.daysAgo')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('admin.agentsPage.statsOverview')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.agentsPage.totalAgents')}</span>
                  <span className="font-bold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.agentsPage.activeAgents')}</span>
                  <span className="font-bold text-unlimited-success">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.agentsPage.pendingVerification')}</span>
                  <span className="font-bold text-unlimited-warning">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* مربع حوار لإضافة وكيل جديد */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>{t('admin.agentsPage.addNewAgent')}</DialogTitle>
            <DialogDescription>
              {t('admin.agentsPage.addNewAgentDesc')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                {t('admin.agentsPage.firstName')}
              </label>
              <Input id="firstName" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                {t('admin.agentsPage.lastName')}
              </label>
              <Input id="lastName" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t('admin.agentsPage.email')}
              </label>
              <Input id="email" type="email" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                {t('admin.agentsPage.phone')}
              </label>
              <Input id="phone" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="country" className="text-sm font-medium">
                {t('admin.agentsPage.country')}
              </label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder={t('admin.agentsPage.selectCountry')} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                {t('admin.agentsPage.status')}
              </label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder={t('admin.agentsPage.selectStatus')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نشط">{t('admin.agentsPage.active')}</SelectItem>
                  <SelectItem value="معلق">{t('admin.agentsPage.pending')}</SelectItem>
                  <SelectItem value="غير نشط">{t('admin.agentsPage.inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="commissionRate" className="text-sm font-medium">
                {t('admin.agentsPage.commissionRate')}
              </label>
              <div className="flex items-center">
                <Input id="commissionRate" type="number" min="5" max="40" defaultValue="15" />
                <span className="ml-2">%</span>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="permissions" className="text-sm font-medium">
                {t('admin.agentsPage.permissions')}
              </label>
              <Select>
                <SelectTrigger id="permissions">
                  <SelectValue placeholder={t('admin.agentsPage.selectPermissions')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">{t('admin.agentsPage.standardPerms')}</SelectItem>
                  <SelectItem value="extended">{t('admin.agentsPage.extendedPerms')}</SelectItem>
                  <SelectItem value="limited">{t('admin.agentsPage.limitedPerms')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('admin.agentsPage.addAgent')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AgentsManagement;
