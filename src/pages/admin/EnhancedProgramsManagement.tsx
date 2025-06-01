
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  GraduationCap,
  School,
  Clock,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

const EnhancedProgramsManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedDegree, setSelectedDegree] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [stats, setStats] = useState({
    totalPrograms: 0,
    activePrograms: 0,
    totalApplications: 0,
    averageTuition: 0
  });

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
    quota: 50,
    is_active: true
  });

  const { toast } = useToast();

  const degreeTypes = [
    { value: 'bachelor', label: 'بكالوريوس' },
    { value: 'master', label: 'ماجستير' },
    { value: 'phd', label: 'دكتوراه' },
    { value: 'diploma', label: 'دبلوم' }
  ];

  const languages = [
    { value: 'arabic', label: 'العربية' },
    { value: 'english', label: 'الإنجليزية' },
    { value: 'turkish', label: 'التركية' },
    { value: 'french', label: 'الفرنسية' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, selectedUniversity, selectedDegree, selectedLanguage]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // جلب البرامج مع معلومات الجامعة
      const { data: programsData, error: programsError } = await supabase
        .from('programs')
        .select(`
          *,
          universities (
            id,
            name,
            name_ar,
            country,
            city
          )
        `)
        .order('created_at', { ascending: false });

      if (programsError) throw programsError;

      // جلب الجامعات
      const { data: universitiesData, error: universitiesError } = await supabase
        .from('universities')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (universitiesError) throw universitiesError;

      // جلب إحصائيات الطلبات
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('program_id');

      if (applicationsError) throw applicationsError;

      setPrograms(programsData || []);
      setUniversities(universitiesData || []);

      // حساب الإحصائيات
      const totalPrograms = programsData?.length || 0;
      const activePrograms = programsData?.filter(p => p.is_active).length || 0;
      const totalApplications = applicationsData?.length || 0;
      const averageTuition = programsData?.length > 0 
        ? programsData.reduce((sum, p) => sum + (p.tuition_fee || 0), 0) / programsData.length 
        : 0;

      setStats({
        totalPrograms,
        activePrograms,
        totalApplications,
        averageTuition
      });

    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterPrograms = () => {
    let filtered = programs;

    // فلترة حسب البحث
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.universities?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلترة حسب الجامعة
    if (selectedUniversity !== 'all') {
      filtered = filtered.filter(program => 
        program.university_id.toString() === selectedUniversity
      );
    }

    // فلترة حسب نوع الدرجة
    if (selectedDegree !== 'all') {
      filtered = filtered.filter(program => program.degree_type === selectedDegree);
    }

    // فلترة حسب اللغة
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(program => program.language === selectedLanguage);
    }

    setFilteredPrograms(filtered);
  };

  const handleAddProgram = async () => {
    try {
      const { error } = await supabase
        .from('programs')
        .insert([{
          ...newProgram,
          university_id: parseInt(newProgram.university_id)
        }]);

      if (error) throw error;

      toast({
        title: "نجح الحفظ",
        description: "تم إضافة البرنامج بنجاح",
      });

      setIsAddDialogOpen(false);
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
        quota: 50,
        is_active: true
      });
      fetchData();
    } catch (error) {
      console.error('خطأ في إضافة البرنامج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إضافة البرنامج",
        variant: "destructive",
      });
    }
  };

  const handleBulkImport = async (csvData) => {
    try {
      // معالجة البيانات من CSV
      const programs = csvData.map(row => ({
        name: row.name,
        name_ar: row.name_ar,
        description: row.description,
        description_ar: row.description_ar,
        university_id: parseInt(row.university_id),
        degree_type: row.degree_type,
        language: row.language,
        duration: parseInt(row.duration),
        tuition_fee: parseFloat(row.tuition_fee),
        quota: parseInt(row.quota),
        is_active: row.is_active === 'true'
      }));

      const { error } = await supabase
        .from('programs')
        .insert(programs);

      if (error) throw error;

      toast({
        title: "نجح الاستيراد",
        description: `تم استيراد ${programs.length} برنامج بنجاح`,
      });

      setIsBulkImportOpen(false);
      fetchData();
    } catch (error) {
      console.error('خطأ في الاستيراد:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في استيراد البرامج",
        variant: "destructive",
      });
    }
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`text-${color}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value.toLocaleString('ar-EG')}</div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">إدارة البرامج المتقدمة</h1>
            <p className="text-unlimited-gray">إدارة شاملة للبرامج الأكاديمية مع أدوات متقدمة</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsBulkImportOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              استيراد جماعي
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة برنامج
            </Button>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="إجمالي البرامج"
            value={stats.totalPrograms}
            icon={<GraduationCap className="h-4 w-4" />}
            color="unlimited-blue"
          />
          <StatCard
            title="البرامج النشطة"
            value={stats.activePrograms}
            icon={<School className="h-4 w-4" />}
            color="green-600"
          />
          <StatCard
            title="إجمالي الطلبات"
            value={stats.totalApplications}
            icon={<Users className="h-4 w-4" />}
            color="purple-600"
          />
          <StatCard
            title="متوسط الرسوم"
            value={`$${Math.round(stats.averageTuition)}`}
            icon={<DollarSign className="h-4 w-4" />}
            color="yellow-600"
          />
        </div>

        {/* أدوات البحث والفلترة */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والفلترة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-unlimited-gray" />
                <Input
                  placeholder="البحث في البرامج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجامعة" />
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
                  {degreeTypes.map((degree) => (
                    <SelectItem key={degree.value} value={degree.value}>
                      {degree.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="لغة التدريس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع اللغات</SelectItem>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* جدول البرامج */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة البرامج ({filteredPrograms.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم البرنامج</TableHead>
                  <TableHead>الجامعة</TableHead>
                  <TableHead>نوع الدرجة</TableHead>
                  <TableHead>المدة</TableHead>
                  <TableHead>الرسوم</TableHead>
                  <TableHead>الحصة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{program.name}</div>
                        <div className="text-sm text-unlimited-gray">{program.name_ar}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{program.universities?.name}</div>
                        <div className="text-sm text-unlimited-gray">
                          {program.universities?.city}, {program.universities?.country}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {degreeTypes.find(d => d.value === program.degree_type)?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {program.duration} سنوات
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center font-medium">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {program.tuition_fee?.toLocaleString('ar-EG')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {program.quota} طالب
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={program.is_active ? "default" : "secondary"}>
                        {program.is_active ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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

        {/* Dialog إضافة برنامج */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة برنامج جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم البرنامج (بالإنجليزية)</Label>
                <Input
                  id="name"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_ar">اسم البرنامج (بالعربية)</Label>
                <Input
                  id="name_ar"
                  value={newProgram.name_ar}
                  onChange={(e) => setNewProgram({...newProgram, name_ar: e.target.value})}
                />
              </div>
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label htmlFor="degree_type">نوع الدرجة</Label>
                <Select value={newProgram.degree_type} onValueChange={(value) => setNewProgram({...newProgram, degree_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الدرجة" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeTypes.map((degree) => (
                      <SelectItem key={degree.value} value={degree.value}>
                        {degree.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">لغة التدريس</Label>
                <Select value={newProgram.language} onValueChange={(value) => setNewProgram({...newProgram, language: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر لغة التدريس" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">المدة (بالسنوات)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newProgram.duration}
                  onChange={(e) => setNewProgram({...newProgram, duration: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tuition_fee">الرسوم الدراسية</Label>
                <Input
                  id="tuition_fee"
                  type="number"
                  value={newProgram.tuition_fee}
                  onChange={(e) => setNewProgram({...newProgram, tuition_fee: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quota">عدد المقاعد</Label>
                <Input
                  id="quota"
                  type="number"
                  value={newProgram.quota}
                  onChange={(e) => setNewProgram({...newProgram, quota: parseInt(e.target.value)})}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">الوصف (بالإنجليزية)</Label>
                <Textarea
                  id="description"
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description_ar">الوصف (بالعربية)</Label>
                <Textarea
                  id="description_ar"
                  value={newProgram.description_ar}
                  onChange={(e) => setNewProgram({...newProgram, description_ar: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddProgram}>
                حفظ البرنامج
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedProgramsManagement;
