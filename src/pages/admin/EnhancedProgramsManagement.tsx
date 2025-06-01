
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  GraduationCap,
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  Copy,
  School,
  Clock,
  DollarSign,
  Users,
  Globe,
  BookOpen,
  Star,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const EnhancedProgramsManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedDegree, setSelectedDegree] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const { toast } = useToast();

  const [newProgram, setNewProgram] = useState({
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    university_id: '',
    degree_type: '',
    language: '',
    duration: 4,
    tuition_fee: 0,
    quota: 100,
    is_active: true
  });

  useEffect(() => {
    fetchPrograms();
    fetchUniversities();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, selectedUniversity, selectedDegree, selectedLanguage]);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      
      const { data: programsData, error } = await supabase
        .from('programs')
        .select(`
          *,
          universities (name, name_ar, city, country)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // جلب إحصائيات لكل برنامج
      const programsWithStats = await Promise.all(
        programsData.map(async (program) => {
          const { count: totalApplications } = await supabase
            .from('applications')
            .select('*', { count: 'exact' })
            .eq('program_id', program.id);

          const { count: acceptedApplications } = await supabase
            .from('applications')
            .select('*', { count: 'exact' })
            .eq('program_id', program.id)
            .eq('status', 'accepted');

          return {
            ...program,
            totalApplications: totalApplications || 0,
            acceptedApplications: acceptedApplications || 0,
            acceptanceRate: totalApplications > 0 ? ((acceptedApplications / totalApplications) * 100).toFixed(1) : 0,
            availableQuota: program.quota - (acceptedApplications || 0)
          };
        })
      );

      setPrograms(programsWithStats);
    } catch (error) {
      console.error('خطأ في جلب البرامج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب البرامج",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUniversities = async () => {
    try {
      const { data: universitiesData, error } = await supabase
        .from('universities')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setUniversities(universitiesData);
    } catch (error) {
      console.error('خطأ في جلب الجامعات:', error);
    }
  };

  const filterPrograms = () => {
    let filtered = [...programs];

    // فلترة البحث
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.name_ar?.includes(searchTerm) ||
        program.universities?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.universities?.name_ar?.includes(searchTerm)
      );
    }

    // فلترة الجامعة
    if (selectedUniversity !== 'all') {
      filtered = filtered.filter(program => program.university_id === parseInt(selectedUniversity));
    }

    // فلترة نوع الدرجة
    if (selectedDegree !== 'all') {
      filtered = filtered.filter(program => program.degree_type === selectedDegree);
    }

    // فلترة اللغة
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(program => program.language === selectedLanguage);
    }

    setFilteredPrograms(filtered);
  };

  const handleAddProgram = async () => {
    try {
      const { error } = await supabase
        .from('programs')
        .insert([newProgram]);

      if (error) throw error;

      toast({
        title: "تم الإضافة",
        description: "تم إضافة البرنامج بنجاح",
      });

      setShowAddDialog(false);
      setNewProgram({
        name: '',
        name_ar: '',
        description: '',
        description_ar: '',
        university_id: '',
        degree_type: '',
        language: '',
        duration: 4,
        tuition_fee: 0,
        quota: 100,
        is_active: true
      });
      fetchPrograms();
    } catch (error) {
      console.error('خطأ في إضافة البرنامج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إضافة البرنامج",
        variant: "destructive",
      });
    }
  };

  const handleEditProgram = async () => {
    if (!selectedProgram) return;

    try {
      const { error } = await supabase
        .from('programs')
        .update(selectedProgram)
        .eq('id', selectedProgram.id);

      if (error) throw error;

      toast({
        title: "تم التحديث",
        description: "تم تحديث البرنامج بنجاح",
      });

      setShowEditDialog(false);
      setSelectedProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error('خطأ في تحديث البرنامج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث البرنامج",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProgram = async (programId) => {
    if (!confirm('هل أنت متأكد من حذف هذا البرنامج؟')) return;

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', programId);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف البرنامج بنجاح",
      });

      fetchPrograms();
    } catch (error) {
      console.error('خطأ في حذف البرنامج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف البرنامج",
        variant: "destructive",
      });
    }
  };

  const getDegreeTypeBadge = (type) => {
    const config = {
      'bachelor': { label: 'بكالوريوس', className: 'bg-blue-100 text-blue-800' },
      'master': { label: 'ماجستير', className: 'bg-green-100 text-green-800' },
      'phd': { label: 'دكتوراه', className: 'bg-purple-100 text-purple-800' },
      'diploma': { label: 'دبلوم', className: 'bg-orange-100 text-orange-800' }
    };
    
    const typeConfig = config[type] || config.bachelor;
    return <Badge className={typeConfig.className}>{typeConfig.label}</Badge>;
  };

  const getLanguageBadge = (language) => {
    const config = {
      'ar': { label: 'عربي', className: 'bg-green-100 text-green-800' },
      'en': { label: 'إنجليزي', className: 'bg-blue-100 text-blue-800' },
      'tr': { label: 'تركي', className: 'bg-red-100 text-red-800' },
      'fr': { label: 'فرنسي', className: 'bg-purple-100 text-purple-800' }
    };
    
    const langConfig = config[language] || config.en;
    return <Badge variant="outline" className={langConfig.className}>{langConfig.label}</Badge>;
  };

  const ProgramCard = ({ program }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-medium text-unlimited-dark-blue mb-1">
                {program.name_ar || program.name}
              </h3>
              <p className="text-sm text-unlimited-gray mb-2">
                {program.universities?.name_ar || program.universities?.name}
              </p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {getDegreeTypeBadge(program.degree_type)}
                {getLanguageBadge(program.language)}
              </div>
            </div>
            <Badge variant={program.is_active ? "default" : "secondary"}>
              {program.is_active ? 'نشط' : 'غير نشط'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="h-3 w-3 text-unlimited-gray" />
              <span>{program.duration} سنوات</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <DollarSign className="h-3 w-3 text-unlimited-gray" />
              <span>${program.tuition_fee?.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Users className="h-3 w-3 text-unlimited-gray" />
              <span>{program.totalApplications} طلب</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Star className="h-3 w-3 text-unlimited-gray" />
              <span>%{program.acceptanceRate} قبول</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>الكوتا المتاحة</span>
              <span>{program.availableQuota}/{program.quota}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-unlimited-blue h-2 rounded-full" 
                style={{ width: `${((program.quota - program.availableQuota) / program.quota) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setSelectedProgram(program);
                setShowDetailsDialog(true);
              }}
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                setSelectedProgram(program);
                setShowEditDialog(true);
              }}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline">
              <Copy className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleDeleteProgram(program.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">إدارة البرامج المتقدمة</h1>
            <p className="text-unlimited-gray">إدارة شاملة لجميع البرامج الأكاديمية</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير البيانات
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة برنامج
            </Button>
          </div>
        </div>

        {/* فلاتر البحث */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
                <Input
                  placeholder="البحث بالاسم أو الجامعة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الجامعات</SelectItem>
                  {universities.map((university) => (
                    <SelectItem key={university.id} value={university.id.toString()}>
                      {university.name_ar || university.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع الدرجة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الدرجات</SelectItem>
                  <SelectItem value="bachelor">بكالوريوس</SelectItem>
                  <SelectItem value="master">ماجستير</SelectItem>
                  <SelectItem value="phd">دكتوراه</SelectItem>
                  <SelectItem value="diploma">دبلوم</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="لغة التدريس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع اللغات</SelectItem>
                  <SelectItem value="ar">عربي</SelectItem>
                  <SelectItem value="en">إنجليزي</SelectItem>
                  <SelectItem value="tr">تركي</SelectItem>
                  <SelectItem value="fr">فرنسي</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                مزيد من الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 text-unlimited-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-unlimited-dark-blue">{programs.length}</div>
              <div className="text-sm text-unlimited-gray">إجمالي البرامج</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {programs.filter(p => p.is_active).length}
              </div>
              <div className="text-sm text-unlimited-gray">برامج نشطة</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <School className="h-8 w-8 text-unlimited-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-unlimited-blue">{universities.length}</div>
              <div className="text-sm text-unlimited-gray">الجامعات</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {programs.reduce((sum, p) => sum + p.totalApplications, 0)}
              </div>
              <div className="text-sm text-unlimited-gray">إجمالي الطلبات</div>
            </CardContent>
          </Card>
        </div>

        {/* عرض البيانات */}
        <Tabs defaultValue="cards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">عرض البطاقات</TabsTrigger>
            <TabsTrigger value="table">عرض الجدول</TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-32 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البرنامج</TableHead>
                      <TableHead>الجامعة</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>اللغة</TableHead>
                      <TableHead>المدة</TableHead>
                      <TableHead>الرسوم</TableHead>
                      <TableHead>الطلبات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{program.name_ar || program.name}</div>
                            <div className="text-sm text-unlimited-gray">{program.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{program.universities?.name_ar || program.universities?.name}</TableCell>
                        <TableCell>{getDegreeTypeBadge(program.degree_type)}</TableCell>
                        <TableCell>{getLanguageBadge(program.language)}</TableCell>
                        <TableCell>{program.duration} سنوات</TableCell>
                        <TableCell>${program.tuition_fee?.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{program.totalApplications}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={program.is_active ? "default" : "secondary"}>
                            {program.is_active ? 'نشط' : 'غير نشط'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteProgram(program.id)}>
                              <Trash2 className="h-3 w-3" />
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
        </Tabs>

        {/* حوار إضافة برنامج */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>إضافة برنامج جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">اسم البرنامج (إنجليزي)</Label>
                  <Input
                    id="name"
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                    placeholder="Computer Science"
                  />
                </div>
                
                <div>
                  <Label htmlFor="name_ar">اسم البرنامج (عربي)</Label>
                  <Input
                    id="name_ar"
                    value={newProgram.name_ar}
                    onChange={(e) => setNewProgram({...newProgram, name_ar: e.target.value})}
                    placeholder="علوم الحاسوب"
                  />
                </div>

                <div>
                  <Label htmlFor="university">الجامعة</Label>
                  <Select value={newProgram.university_id} onValueChange={(value) => setNewProgram({...newProgram, university_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجامعة" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((university) => (
                        <SelectItem key={university.id} value={university.id.toString()}>
                          {university.name_ar || university.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="degree_type">نوع الدرجة</Label>
                  <Select value={newProgram.degree_type} onValueChange={(value) => setNewProgram({...newProgram, degree_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الدرجة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor">بكالوريوس</SelectItem>
                      <SelectItem value="master">ماجستير</SelectItem>
                      <SelectItem value="phd">دكتوراه</SelectItem>
                      <SelectItem value="diploma">دبلوم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">لغة التدريس</Label>
                  <Select value={newProgram.language} onValueChange={(value) => setNewProgram({...newProgram, language: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر لغة التدريس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">عربي</SelectItem>
                      <SelectItem value="en">إنجليزي</SelectItem>
                      <SelectItem value="tr">تركي</SelectItem>
                      <SelectItem value="fr">فرنسي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="duration">مدة البرنامج (بالسنوات)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newProgram.duration}
                    onChange={(e) => setNewProgram({...newProgram, duration: parseInt(e.target.value)})}
                    min="1"
                    max="8"
                  />
                </div>

                <div>
                  <Label htmlFor="tuition_fee">الرسوم الدراسية (بالدولار)</Label>
                  <Input
                    id="tuition_fee"
                    type="number"
                    value={newProgram.tuition_fee}
                    onChange={(e) => setNewProgram({...newProgram, tuition_fee: parseFloat(e.target.value)})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="quota">عدد المقاعد المتاحة</Label>
                  <Input
                    id="quota"
                    type="number"
                    value={newProgram.quota}
                    onChange={(e) => setNewProgram({...newProgram, quota: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="is_active"
                    checked={newProgram.is_active}
                    onCheckedChange={(checked) => setNewProgram({...newProgram, is_active: checked})}
                  />
                  <Label htmlFor="is_active">البرنامج نشط</Label>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="description">وصف البرنامج (إنجليزي)</Label>
                  <Textarea
                    id="description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    placeholder="Enter program description in English..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="description_ar">وصف البرنامج (عربي)</Label>
                  <Textarea
                    id="description_ar"
                    value={newProgram.description_ar}
                    onChange={(e) => setNewProgram({...newProgram, description_ar: e.target.value})}
                    placeholder="أدخل وصف البرنامج باللغة العربية..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddProgram}>
                    إضافة البرنامج
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedProgramsManagement;
