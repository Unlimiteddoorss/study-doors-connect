
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BookOpen, Plus, Search, Filter, Grid, List, MoreHorizontal, Eye, Edit, Trash, School, Calendar, Clock, Download, Upload, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AdvancedSearch from '@/components/admin/AdvancedSearch';
import { toast } from '@/hooks/use-toast';
import { PieChart } from '@/components/ui/chart';

// Mock data for programs
const programsData = [
  { 
    id: '1', 
    name: 'بكالوريوس في الهندسة المدنية', 
    university: 'جامعة إسطنبول التقنية', 
    degree: 'بكالوريوس', 
    duration: '4 سنوات',
    language: 'التركية، الإنجليزية', 
    tuitionFee: '$4,000',
    status: 'نشط',
    applications: 45,
    featured: true,
    createdAt: '2023-01-15',
    description: 'برنامج البكالوريوس في الهندسة المدنية يغطي تصميم وبناء وصيانة البنية التحتية المادية والطبيعية',
    requirements: 'شهادة الثانوية العامة، IELTS 6.0، المعدل التراكمي 2.5+',
    image: '/lovable-uploads/e82df0f6-f604-4cb3-86ba-54121ae30ce9.png'
  },
  { 
    id: '2', 
    name: 'ماجستير في علوم الحاسب', 
    university: 'جامعة كوتش', 
    degree: 'ماجستير', 
    duration: '2 سنوات',
    language: 'الإنجليزية', 
    tuitionFee: '$5,500',
    status: 'نشط',
    applications: 32,
    featured: true,
    createdAt: '2023-02-20',
    description: 'برنامج الماجستير في علوم الحاسب يقدم تعليمًا متقدمًا في مجالات الذكاء الاصطناعي وعلم البيانات',
    requirements: 'بكالوريوس في مجال ذو صلة، IELTS 6.5، المعدل التراكمي 3.0+',
    image: '/lovable-uploads/6e0c99ef-ce91-48b1-b3c8-49e2ef5a454a.png'
  },
  { 
    id: '3', 
    name: 'بكالوريوس في إدارة الأعمال', 
    university: 'جامعة ماليزيا كيبانجسان', 
    degree: 'بكالوريوس', 
    duration: '3 سنوات',
    language: 'الإنجليزية', 
    tuitionFee: '$3,200',
    status: 'قيد المراجعة',
    applications: 15,
    featured: false,
    createdAt: '2023-03-10',
    description: 'برنامج البكالوريوس في إدارة الأعمال يغطي الإدارة والتسويق والمحاسبة والتمويل',
    requirements: 'شهادة الثانوية العامة، IELTS 6.0، المعدل التراكمي 2.5+',
    image: '/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png'
  },
  { 
    id: '4', 
    name: 'دكتوراه في العلوم الصيدلية', 
    university: 'جامعة كوالالمبور', 
    degree: 'دكتوراه', 
    duration: '4 سنوات',
    language: 'الإنجليزية', 
    tuitionFee: '$7,800',
    status: 'نشط',
    applications: 8,
    featured: false,
    createdAt: '2023-04-05',
    description: 'برنامج الدكتوراه في العلوم الصيدلية يركز على البحث المتقدم في مجال الصيدلة',
    requirements: 'ماجستير في التخصص، IELTS 7.0، المعدل التراكمي 3.5+',
    image: '/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png'
  },
  { 
    id: '5', 
    name: 'دبلوم في التصميم الجرافيكي', 
    university: 'أكاديمية لندن للفنون', 
    degree: 'دبلوم', 
    duration: '1 سنة',
    language: 'الإنجليزية', 
    tuitionFee: '$2,500',
    status: 'غير نشط',
    applications: 0,
    featured: false,
    createdAt: '2023-05-12',
    description: 'دبلوم في التصميم الجرافيكي يطور المهارات الإبداعية والتقنية في مجال التصميم',
    requirements: 'شهادة الثانوية العامة، تقديم ملف أعمال',
    image: '/lovable-uploads/51522d38-6d96-4884-8ab7-d1e182003a1d.png'
  },
];

// Mock data for universities
const universitiesData = [
  'جامعة إسطنبول التقنية',
  'جامعة كوتش',
  'جامعة ماليزيا كيبانجسان',
  'جامعة كوالالمبور',
  'أكاديمية لندن للفنون',
  'جامعة أنقرة',
  'جامعة مانشستر'
];

// Mock data for degrees
const degreesData = [
  'بكالوريوس',
  'ماجستير',
  'دكتوراه',
  'دبلوم',
  'شهادة مهنية'
];

// Mock data for languages
const languagesData = [
  'الإنجليزية',
  'التركية',
  'العربية',
  'الماليزية'
];

// Mock data for program distribution
const programDistributionData = [
  { name: 'بكالوريوس', value: 42 },
  { name: 'ماجستير', value: 28 },
  { name: 'دكتوراه', value: 15 },
  { name: 'دبلوم', value: 10 },
  { name: 'شهادة مهنية', value: 5 },
];

const EnhancedProgramsManagement = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({ degree: 'all', status: 'all', university: 'all' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProgram, setSelectedProgram] = useState<typeof programsData[0] | null>(null);
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
      description: "تم تصدير بيانات البرامج بنجاح",
    });
  };

  const handleImport = () => {
    toast({
      title: "تم استيراد البيانات",
      description: "تم استيراد بيانات البرامج بنجاح",
    });
  };

  const toggleProgramStatus = (id: string) => {
    toast({
      title: "تم تحديث الحالة",
      description: "تم تغيير حالة البرنامج بنجاح",
    });
  };

  const viewProgramDetails = (program: typeof programsData[0]) => {
    setSelectedProgram(program);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'غير نشط': return 'bg-red-100 text-red-800';
      case 'قيد المراجعة': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and search functionality
  const filteredPrograms = programsData.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.university.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesDegree = filters.degree === 'all' || program.degree === filters.degree;
    const matchesStatus = filters.status === 'all' || program.status === filters.status;
    const matchesUniversity = filters.university === 'all' || program.university === filters.university;
    
    if (activeTab === 'all') return matchesSearch && matchesDegree && matchesStatus && matchesUniversity;
    if (activeTab === 'active') return matchesSearch && matchesDegree && program.status === 'نشط' && matchesUniversity;
    if (activeTab === 'pending') return matchesSearch && matchesDegree && program.status === 'قيد المراجعة' && matchesUniversity;
    if (activeTab === 'inactive') return matchesSearch && matchesDegree && program.status === 'غير نشط' && matchesUniversity;
    if (activeTab === 'featured') return matchesSearch && matchesDegree && matchesStatus && matchesUniversity && program.featured;
    
    return matchesSearch && matchesDegree && matchesStatus && matchesUniversity;
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
            <h1 className="text-2xl font-bold">{t('admin.programsPage.title', 'إدارة البرامج الدراسية')}</h1>
            <p className="text-unlimited-gray">{t('admin.programsPage.subtitle', 'إدارة وتتبع البرامج الدراسية والدورات المتاحة')}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.programsPage.addProgram', 'إضافة برنامج')}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  {t('admin.programsPage.export', 'تصدير')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleExport} className="cursor-pointer">
                  <Download className="h-4 w-4 mr-2" />
                  {t('admin.programsPage.exportCSV', 'تصدير بتنسيق CSV')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExport} className="cursor-pointer">
                  <Download className="h-4 w-4 mr-2" />
                  {t('admin.programsPage.exportPDF', 'تصدير بتنسيق PDF')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('admin.programsPage.import', 'استيراد')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleImport} className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('admin.programsPage.importCSV', 'استيراد من CSV')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border-unlimited-blue/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-unlimited-dark-blue">
                {t('admin.programsPage.totalPrograms', 'إجمالي البرامج')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-unlimited-dark-blue">{programsData.length}</div>
                  <div className="text-unlimited-gray text-sm">
                    {t('admin.programsPage.activePrograms', 'نشط')}: {programsData.filter(p => p.status === 'نشط').length}
                  </div>
                </div>
                <div className="bg-unlimited-blue/10 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-unlimited-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-unlimited-dark-blue">
                {t('admin.programsPage.totalApplications', 'إجمالي الطلبات')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-unlimited-dark-blue">
                    {programsData.reduce((sum, program) => sum + program.applications, 0)}
                  </div>
                  <div className="text-unlimited-gray text-sm">
                    {t('admin.programsPage.thisMonth', 'هذا الشهر')}: +28
                  </div>
                </div>
                <div className="bg-green-500/10 p-3 rounded-full">
                  <School className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-unlimited-dark-blue">
                {t('admin.programsPage.featuredPrograms', 'البرامج المميزة')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-unlimited-dark-blue">
                    {programsData.filter(p => p.featured).length}
                  </div>
                  <div className="text-unlimited-gray text-sm">
                    {t('admin.programsPage.ofActive', 'من البرامج النشطة')}
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
                <TabsTrigger value="all">{t('admin.programsPage.all', 'الكل')}</TabsTrigger>
                <TabsTrigger value="active">{t('admin.programsPage.active', 'نشط')}</TabsTrigger>
                <TabsTrigger value="pending">{t('admin.programsPage.pending', 'قيد المراجعة')}</TabsTrigger>
                <TabsTrigger value="inactive">{t('admin.programsPage.inactive', 'غير نشط')}</TabsTrigger>
                <TabsTrigger value="featured">{t('admin.programsPage.featured', 'مميز')}</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <AdvancedSearch 
                  placeholder={t('admin.programsPage.searchPlaceholder', 'البحث في البرامج...')}
                  filterOptions={{
                    status: ['نشط', 'قيد المراجعة', 'غير نشط'],
                    degree: degreesData,
                    university: universitiesData
                  }}
                />
                
                <div className="flex border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`${viewMode === 'grid' ? 'bg-unlimited-blue/10 text-unlimited-blue' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`${viewMode === 'list' ? 'bg-unlimited-blue/10 text-unlimited-blue' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPrograms.map((program) => (
                  <motion.div 
                    key={program.id}
                    variants={itemVariants} 
                    className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={program.image} 
                        alt={program.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                      {program.featured && (
                        <div className="absolute top-2 right-2 bg-unlimited-blue text-white text-xs px-2 py-1 rounded">
                          {t('admin.programsPage.featured', 'مميز')}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-unlimited-dark-blue mb-1 line-clamp-1">{program.name}</h3>
                          <p className="text-unlimited-gray text-sm mb-2 line-clamp-1">{program.university}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewProgramDetails(program)} className="cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              {t('admin.programsPage.view', 'عرض')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              {t('admin.programsPage.edit', 'تعديل')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-unlimited-danger cursor-pointer">
                              <Trash className="h-4 w-4 mr-2" />
                              {t('admin.programsPage.delete', 'حذف')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3 mb-4">
                        <Badge variant="secondary" className="bg-unlimited-blue/10 text-unlimited-blue hover:bg-unlimited-blue/20">
                          {program.degree}
                        </Badge>
                        <Badge variant="secondary" className="bg-unlimited-gray/10 text-unlimited-gray hover:bg-unlimited-gray/20">
                          {program.duration}
                        </Badge>
                        <Badge variant="secondary" className="bg-unlimited-gray/10 text-unlimited-gray hover:bg-unlimited-gray/20">
                          {program.language}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-unlimited-blue">{program.tuitionFee}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <div className="text-sm">
                          <Clock className="h-4 w-4 inline-block mr-1 text-unlimited-gray" />
                          <span className="text-unlimited-gray">{program.createdAt}</span>
                        </div>
                        <div className="text-sm font-medium">
                          {program.applications} {t('admin.programsPage.applications', 'طلب')}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {filteredPrograms.length === 0 && (
                  <motion.div 
                    variants={itemVariants} 
                    className="col-span-3 flex flex-col items-center justify-center p-8 border rounded-lg bg-white"
                  >
                    <Search className="h-12 w-12 text-unlimited-gray mb-4" />
                    <p className="text-unlimited-gray text-lg font-medium">
                      {t('admin.programsPage.noProgramsFound', 'لم يتم العثور على برامج')}
                    </p>
                    <p className="text-unlimited-gray mb-4">
                      {t('admin.programsPage.tryAdjustingFilters', 'حاول تعديل معايير البحث أو التصفية')}
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({ degree: 'all', status: 'all', university: 'all' });
                        setActiveTab('all');
                      }}
                    >
                      {t('admin.programsPage.clearFilters', 'مسح عوامل التصفية')}
                    </Button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.programName', 'اسم البرنامج')}
                          </th>
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.university', 'الجامعة')}
                          </th>
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.degree', 'الدرجة')}
                          </th>
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.duration', 'المدة')}
                          </th>
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.tuition', 'الرسوم')}
                          </th>
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.applications', 'الطلبات')}
                          </th>
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.status', 'الحالة')}
                          </th>
                          <th className="py-3 px-4 text-right">
                            {t('admin.programsPage.actions', 'إجراءات')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPrograms.map((program) => (
                          <tr key={program.id} className="border-b hover:bg-unlimited-blue/5">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <img 
                                  src={program.image} 
                                  alt={program.name} 
                                  className="w-8 h-8 rounded mr-2 object-cover" 
                                />
                                <div>
                                  <div className="font-medium text-unlimited-dark-blue">{program.name}</div>
                                  {program.featured && (
                                    <Badge className="bg-unlimited-blue/10 text-unlimited-blue text-xs">
                                      {t('admin.programsPage.featured', 'مميز')}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{program.university}</td>
                            <td className="py-3 px-4">{program.degree}</td>
                            <td className="py-3 px-4">{program.duration}</td>
                            <td className="py-3 px-4 font-medium">{program.tuitionFee}</td>
                            <td className="py-3 px-4 text-center">{program.applications}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(program.status)}`}>
                                {program.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => viewProgramDetails(program)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-unlimited-danger"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        
                        {filteredPrograms.length === 0 && (
                          <tr>
                            <td colSpan={8} className="py-10 text-center">
                              <div className="flex flex-col items-center">
                                <Search className="h-10 w-10 text-unlimited-gray mb-2" />
                                <p className="text-unlimited-gray mb-2">
                                  {t('admin.programsPage.noProgramsFound', 'لم يتم العثور على برامج')}
                                </p>
                                <Button 
                                  variant="outline" 
                                  onClick={() => {
                                    setSearchQuery('');
                                    setFilters({ degree: 'all', status: 'all', university: 'all' });
                                    setActiveTab('all');
                                  }} 
                                  className="mt-1"
                                >
                                  {t('admin.programsPage.clearFilters', 'مسح عوامل التصفية')}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </Tabs>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.programsPage.programDistribution', 'توزيع البرامج حسب الدرجة')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PieChart
                  data={programDistributionData}
                  index="name"
                  category="value"
                  colors={["#3498db", "#2ecc71", "#9b59b6", "#f1c40f", "#e74c3c"]}
                  valueFormatter={(value) => `${value}%`}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.programsPage.topPrograms', 'البرامج الأكثر طلباً')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {programsData
                  .sort((a, b) => b.applications - a.applications)
                  .slice(0, 5)
                  .map((program, index) => (
                    <div key={program.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded mr-3 overflow-hidden">
                          <img 
                            src={program.image} 
                            alt={program.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <div className="font-medium line-clamp-1">{program.name}</div>
                          <div className="text-unlimited-gray text-xs">{program.university}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-semibold text-unlimited-blue">{program.applications}</div>
                        <div className="text-unlimited-gray text-xs">{t('admin.programsPage.applications', 'طلب')}</div>
                      </div>
                    </div>
                  ))
                }
                
                <Button variant="outline" className="w-full mt-2">
                  {t('admin.programsPage.viewAllStats', 'عرض جميع الإحصائيات')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Add Program Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('admin.programsPage.addNewProgram', 'إضافة برنامج جديد')}</DialogTitle>
            <DialogDescription>
              {t('admin.programsPage.addNewProgramDesc', 'أدخل معلومات البرنامج الدراسي الجديد')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('admin.programsPage.programName', 'اسم البرنامج')}</Label>
                <Input id="name" placeholder={t('admin.programsPage.programNamePlaceholder', 'أدخل اسم البرنامج')} />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="university">{t('admin.programsPage.university', 'الجامعة')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('admin.programsPage.selectUniversity', 'اختر الجامعة')} />
                  </SelectTrigger>
                  <SelectContent>
                    {universitiesData.map((university) => (
                      <SelectItem key={university} value={university}>
                        {university}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="degree">{t('admin.programsPage.degree', 'الدرجة العلمية')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('admin.programsPage.selectDegree', 'اختر الدرجة العلمية')} />
                  </SelectTrigger>
                  <SelectContent>
                    {degreesData.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration">{t('admin.programsPage.duration', 'المدة الدراسية')}</Label>
                <Input id="duration" placeholder={t('admin.programsPage.durationPlaceholder', 'مثال: 4 سنوات')} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="language">{t('admin.programsPage.language', 'لغة الدراسة')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('admin.programsPage.selectLanguage', 'اختر لغة الدراسة')} />
                  </SelectTrigger>
                  <SelectContent>
                    {languagesData.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tuition">{t('admin.programsPage.tuition', 'الرسوم الدراسية')}</Label>
                <Input id="tuition" placeholder={t('admin.programsPage.tuitionPlaceholder', 'مثال: $5,000')} />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">{t('admin.programsPage.description', 'وصف البرنامج')}</Label>
              <Textarea 
                id="description" 
                placeholder={t('admin.programsPage.descriptionPlaceholder', 'أدخل وصفاً للبرنامج الدراسي')} 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="requirements">{t('admin.programsPage.requirements', 'متطلبات القبول')}</Label>
              <Textarea 
                id="requirements" 
                placeholder={t('admin.programsPage.requirementsPlaceholder', 'أدخل متطلبات القبول')} 
                className="min-h-[60px]"
              />
            </div>
            
            <div className="grid gap-4">
              <Label>{t('admin.programsPage.programImage', 'صورة البرنامج')}</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                <p className="mt-2 text-sm text-unlimited-gray">
                  {t('admin.programsPage.dragDrop', 'اسحب وأفلت الصورة هنا، أو انقر للاختيار')}
                </p>
                <Button variant="outline" className="mt-4">
                  {t('admin.programsPage.chooseFile', 'اختر ملف')}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch id="featured" />
              <Label htmlFor="featured" className="cursor-pointer">
                {t('admin.programsPage.markAsFeatured', 'تمييز هذا البرنامج')}
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel', 'إلغاء')}
            </Button>
            <Button 
              onClick={() => {
                setIsAddDialogOpen(false);
                toast({
                  title: "تم إضافة البرنامج",
                  description: "تمت إضافة البرنامج الدراسي الجديد بنجاح",
                });
              }}
            >
              {t('admin.programsPage.addProgram', 'إضافة برنامج')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Program Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{t('admin.programsPage.programDetails', 'تفاصيل البرنامج')}</DialogTitle>
            <DialogDescription>
              {selectedProgram?.university}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProgram && (
            <div className="py-2">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="rounded-md overflow-hidden">
                    <img 
                      src={selectedProgram.image} 
                      alt={selectedProgram.name} 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div>
                      <h4 className="text-sm text-unlimited-gray">{t('admin.programsPage.status', 'الحالة')}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedProgram.status)}`}>
                        {selectedProgram.status}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-unlimited-gray">{t('admin.programsPage.applications', 'الطلبات')}</h4>
                      <p className="font-bold text-unlimited-dark-blue">{selectedProgram.applications}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-unlimited-gray">{t('admin.programsPage.featured', 'مميز')}</h4>
                      <div className="flex items-center">
                        {selectedProgram.featured ? (
                          <>
                            <Check className="h-4 w-4 text-unlimited-success mr-1" />
                            <span>{t('admin.programsPage.yes', 'نعم')}</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-unlimited-danger mr-1" />
                            <span>{t('admin.programsPage.no', 'لا')}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-unlimited-gray">{t('admin.programsPage.createdAt', 'تاريخ الإضافة')}</h4>
                      <p>{selectedProgram.createdAt}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-xl font-bold text-unlimited-dark-blue mb-4">{selectedProgram.name}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-unlimited-blue/10 text-unlimited-blue hover:bg-unlimited-blue/20">
                      {selectedProgram.degree}
                    </Badge>
                    <Badge variant="secondary" className="bg-unlimited-gray/10 text-unlimited-gray hover:bg-unlimited-gray/20">
                      {selectedProgram.duration}
                    </Badge>
                    <Badge variant="secondary" className="bg-unlimited-gray/10 text-unlimited-gray hover:bg-unlimited-gray/20">
                      {selectedProgram.language}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">{t('admin.programsPage.description', 'وصف البرنامج')}</h3>
                      <p className="text-unlimited-gray">{selectedProgram.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">{t('admin.programsPage.requirements', 'متطلبات القبول')}</h3>
                      <p className="text-unlimited-gray">{selectedProgram.requirements}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">{t('admin.programsPage.tuition', 'الرسوم الدراسية')}</h3>
                      <p className="text-unlimited-blue font-bold text-lg">{selectedProgram.tuitionFee}</p>
                      <p className="text-unlimited-gray text-sm">{t('admin.programsPage.perYear', 'سنوياً')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              {t('close', 'إغلاق')}
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              {t('admin.programsPage.edit', 'تعديل')}
            </Button>
            <Button variant="unlimited">
              {selectedProgram?.featured ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  {t('admin.programsPage.unfeature', 'إلغاء التمييز')}
                </>
              ) : (
                <>
                  <Badge className="h-4 w-4 mr-2" />
                  {t('admin.programsPage.markAsFeatured', 'تمييز البرنامج')}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default EnhancedProgramsManagement;
