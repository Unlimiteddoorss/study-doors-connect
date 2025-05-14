
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
  Filter, 
  Send,
  UserPlus,
  FileText,
  Badge
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
import { StudentFilters } from '@/components/admin/students/StudentFilters';
import AdvancedSearch from '@/components/admin/AdvancedSearch';

// Mock data for students
const studentsData = [
  { 
    id: '1', 
    name: 'أحمد محمد', 
    email: 'ahmed@example.com', 
    phone: '+90 555 123 4567', 
    nationality: 'مصري', 
    status: 'نشط',
    applications: 2,
    createdAt: '2023-01-15'
  },
  { 
    id: '2', 
    name: 'فاطمة علي', 
    email: 'fatima@example.com', 
    phone: '+90 555 234 5678', 
    nationality: 'سعودية', 
    status: 'نشط',
    applications: 1,
    createdAt: '2023-02-20'
  },
  { 
    id: '3', 
    name: 'محمد أحمد', 
    email: 'mohamed@example.com', 
    phone: '+90 555 345 6789', 
    nationality: 'سوري', 
    status: 'معلق',
    applications: 3,
    createdAt: '2023-03-10'
  },
  { 
    id: '4', 
    name: 'نور حسن', 
    email: 'noor@example.com', 
    phone: '+90 555 456 7890', 
    nationality: 'أردنية', 
    status: 'نشط',
    applications: 1,
    createdAt: '2023-04-05'
  },
  { 
    id: '5', 
    name: 'علي حسين', 
    email: 'ali@example.com', 
    phone: '+90 555 567 8901', 
    nationality: 'عراقي', 
    status: 'غير نشط',
    applications: 0,
    createdAt: '2023-05-12'
  },
];

// Mock data for nationalities (for filters)
const nationalities = ['مصري', 'سعودي', 'سوري', 'أردني', 'عراقي', 'لبناني', 'فلسطيني', 'يمني', 'إماراتي', 'كويتي'];

const EnhancedStudentsManagement = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({ nationality: 'all', status: 'all' });
  
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
    console.log('Exporting students data...');
    // Implement export functionality
  };

  const handleImport = () => {
    console.log('Importing students data...');
    setIsImportDialogOpen(false);
    // Implement import functionality
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
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.phone.includes(searchQuery);
                          
    const matchesNationality = filters.nationality === 'all' || student.nationality === filters.nationality;
    const matchesStatus = filters.status === 'all' || student.status === filters.status;
    
    return matchesSearch && matchesNationality && matchesStatus;
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
            <h1 className="text-2xl font-bold">{t('admin.studentsPage.title')}</h1>
            <p className="text-unlimited-gray">{t('admin.studentsPage.subtitle')}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.studentsPage.addStudent')}
            </Button>
            
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('admin.studentsPage.importStudents')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.studentsPage.importData')}</DialogTitle>
                  <DialogDescription>
                    {t('admin.studentsPage.importDataDesc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                    <p className="mt-2 text-sm text-unlimited-gray">
                      {t('admin.studentsPage.dragDrop')}
                    </p>
                    <input type="file" className="hidden" />
                    <Button variant="outline" className="mt-4">
                      {t('admin.studentsPage.chooseFile')}
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleImport}>
                    <Upload className="h-4 w-4 mr-2" />
                    {t('admin.studentsPage.importStudents')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t('admin.studentsPage.exportStudents')}
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AdvancedSearch 
            placeholder={t('admin.studentsPage.searchPlaceholder')}
            filterOptions={{
              status: ['نشط', 'معلق', 'غير نشط'],
              nationality: nationalities
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="px-6">
              <CardTitle>{t('admin.studentsPage.studentsList')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>{t('admin.studentsPage.studentsList')}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">{t('admin.studentsPage.id')}</TableHead>
                      <TableHead>{t('admin.studentsPage.name')}</TableHead>
                      <TableHead>{t('admin.studentsPage.email')}</TableHead>
                      <TableHead>{t('admin.studentsPage.phone')}</TableHead>
                      <TableHead>{t('admin.studentsPage.nationality')}</TableHead>
                      <TableHead>{t('admin.studentsPage.status')}</TableHead>
                      <TableHead className="text-center">{t('admin.studentsPage.applications')}</TableHead>
                      <TableHead>{t('admin.studentsPage.createdAt')}</TableHead>
                      <TableHead className="text-right">{t('admin.studentsPage.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-unlimited-blue/5 transition-colors">
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{student.name}</div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student.nationality}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">{student.applications}</TableCell>
                        <TableCell>{student.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <span className="sr-only">{t('admin.studentsPage.openMenu')}</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{t('admin.studentsPage.actions')}</DropdownMenuLabel>
                              <DropdownMenuItem className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                {t('admin.studentsPage.view')}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                {t('admin.studentsPage.edit')}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Send className="h-4 w-4 mr-2" />
                                {t('admin.studentsPage.sendMessage')}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center text-unlimited-danger">
                                <Trash className="h-4 w-4 mr-2" />
                                {t('admin.studentsPage.delete')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredStudents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          <div className="flex flex-col items-center">
                            <Search className="h-10 w-10 text-unlimited-gray mb-2" />
                            <p className="text-unlimited-gray">
                              {t('admin.studentsPage.noStudentsFound')}
                            </p>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSearchQuery('');
                                setFilters({ nationality: 'all', status: 'all' });
                              }} 
                              className="mt-2"
                            >
                              {t('admin.studentsPage.clearFilters')}
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
                {t('admin.studentsPage.quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  {t('admin.studentsPage.newStudent')}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t('admin.studentsPage.newApplication')}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {t('admin.studentsPage.bulkMessage')}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Badge className="h-4 w-4" />
                  {t('admin.studentsPage.assignBadge')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('admin.studentsPage.recentActivity')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-2">
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1 text-sm">
                  <span>{t('admin.studentsPage.newStudentAdded')}</span>
                  <span className="text-unlimited-gray">10:30 AM</span>
                </div>
                <div className="flex justify-between border-b pb-1 text-sm">
                  <span>{t('admin.studentsPage.profileUpdated')}</span>
                  <span className="text-unlimited-gray">{t('time.yesterday')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('admin.studentsPage.documentSubmitted')}</span>
                  <span className="text-unlimited-gray">2 {t('time.daysAgo')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('admin.studentsPage.statsOverview')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.studentsPage.totalStudents')}</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.studentsPage.activeStudents')}</span>
                  <span className="font-bold text-unlimited-success">978</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('admin.studentsPage.pendingVerification')}</span>
                  <span className="font-bold text-unlimited-warning">56</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>{t('admin.studentsPage.addNewStudent')}</DialogTitle>
            <DialogDescription>
              {t('admin.studentsPage.addNewStudentDesc')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                {t('admin.studentsPage.firstName')}
              </label>
              <Input id="firstName" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                {t('admin.studentsPage.lastName')}
              </label>
              <Input id="lastName" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t('admin.studentsPage.email')}
              </label>
              <Input id="email" type="email" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                {t('admin.studentsPage.phone')}
              </label>
              <Input id="phone" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="nationality" className="text-sm font-medium">
                {t('admin.studentsPage.nationality')}
              </label>
              <select
                id="nationality"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-unlimited-blue/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {nationalities.map((nationality) => (
                  <option key={nationality} value={nationality}>
                    {nationality}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                {t('admin.studentsPage.status')}
              </label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-unlimited-blue/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="نشط">{t('admin.studentsPage.active')}</option>
                <option value="معلق">{t('admin.studentsPage.pending')}</option>
                <option value="غير نشط">{t('admin.studentsPage.inactive')}</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('admin.studentsPage.addStudent')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default EnhancedStudentsManagement;
