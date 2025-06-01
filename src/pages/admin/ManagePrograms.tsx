
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, GraduationCap, Plus, Eye, Edit, Trash2, DollarSign, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Program {
  id: number;
  name: string;
  name_ar: string;
  university_id: number;
  university_name: string;
  university_name_ar: string;
  degree_type: string;
  language: string;
  duration: number;
  tuition_fee: number;
  quota: number;
  description: string;
  description_ar: string;
  is_active: boolean;
  applications_count: number;
  created_at: string;
}

const ManagePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [universityFilter, setUniversityFilter] = useState('all');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // جلب بيانات الجامعات
      const { data: universitiesData } = await supabase
        .from('universities')
        .select('*')
        .eq('is_active', true);

      setUniversities(universitiesData || []);

      // جلب بيانات البرامج مع معلومات الجامعات
      const { data: programsData, error } = await supabase
        .from('programs')
        .select(`
          *,
          universities (
            name,
            name_ar
          )
        `)
        .order('name');

      if (error) throw error;

      // تحويل البيانات وإضافة عدد الطلبات
      const programsWithCounts = await Promise.all(
        programsData?.map(async (program) => {
          // جلب عدد الطلبات
          const { count: applicationsCount } = await supabase
            .from('applications')
            .select('*', { count: 'exact' })
            .eq('program_id', program.id);

          return {
            ...program,
            university_name: program.universities?.name || 'غير محدد',
            university_name_ar: program.universities?.name_ar || 'غير محدد',
            applications_count: applicationsCount || 0
          };
        }) || []
      );

      setPrograms(programsWithCounts);
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

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (program.name_ar && program.name_ar.includes(searchQuery)) ||
                         program.university_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUniversity = universityFilter === 'all' || program.university_id.toString() === universityFilter;
    const matchesDegree = degreeFilter === 'all' || program.degree_type === degreeFilter;
    const matchesLanguage = languageFilter === 'all' || program.language === languageFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && program.is_active) ||
                         (statusFilter === 'inactive' && !program.is_active);
    
    return matchesSearch && matchesUniversity && matchesDegree && matchesLanguage && matchesStatus;
  });

  const handleViewProgram = (program: Program) => {
    setSelectedProgram(program);
    setIsViewDialogOpen(true);
  };

  const handleToggleStatus = async (programId: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update({ is_active: !currentStatus })
        .eq('id', programId);

      if (error) throw error;

      setPrograms(programs.map(p => 
        p.id === programId ? { ...p, is_active: !currentStatus } : p
      ));

      toast({
        title: "تم التحديث",
        description: `تم ${!currentStatus ? 'تفعيل' : 'إلغاء تفعيل'} البرنامج بنجاح`,
      });
    } catch (error) {
      console.error('خطأ في تحديث حالة البرنامج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث حالة البرنامج",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProgram = async (programId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا البرنامج؟ سيتم حذف جميع الطلبات المرتبطة به.')) return;

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', programId);

      if (error) throw error;

      setPrograms(programs.filter(p => p.id !== programId));
      toast({
        title: "نجح الحذف",
        description: "تم حذف البرنامج بنجاح",
      });
    } catch (error) {
      console.error('خطأ في حذف البرنامج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف البرنامج",
        variant: "destructive",
      });
    }
  };

  const getDegreeTypeName = (type: string) => {
    const types: Record<string, string> = {
      'bachelor': 'بكالوريوس',
      'master': 'ماجستير', 
      'phd': 'دكتوراه',
      'diploma': 'دبلوم'
    };
    return types[type] || type;
  };

  const totalApplications = programs.reduce((sum, p) => sum + p.applications_count, 0);
  const activePrograms = programs.filter(p => p.is_active).length;
  const averageFee = programs.length > 0 ? programs.reduce((sum, p) => sum + Number(p.tuition_fee), 0) / programs.length : 0;

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة البرامج الدراسية</h2>
            <p className="text-unlimited-gray">إدارة وتتبع جميع البرامج الدراسية في النظام</p>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة برنامج جديد
          </Button>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي البرامج</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-dark-blue">{programs.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">برامج نشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-green-600">{activePrograms}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-blue-600">{totalApplications}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">متوسط الرسوم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-2xl font-bold text-yellow-600">
                  ${averageFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* أدوات البحث والفلترة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="ابحث عن برنامج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="الجامعة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الجامعات</SelectItem>
              {universities.map(university => (
                <SelectItem key={university.id} value={university.id.toString()}>
                  {university.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={degreeFilter} onValueChange={setDegreeFilter}>
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
          
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger>
              <SelectValue placeholder="اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع اللغات</SelectItem>
              <SelectItem value="English">الإنجليزية</SelectItem>
              <SelectItem value="Turkish">التركية</SelectItem>
              <SelectItem value="Arabic">العربية</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* جدول البرامج */}
        <div className="rounded-md border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم البرنامج</TableHead>
                <TableHead>الجامعة</TableHead>
                <TableHead>نوع الدرجة</TableHead>
                <TableHead>اللغة</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>الرسوم</TableHead>
                <TableHead>الحصة</TableHead>
                <TableHead>الطلبات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 10 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredPrograms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-40 text-unlimited-gray">
                    لم يتم العثور على برامج
                  </TableCell>
                </TableRow>
              ) : (
                filteredPrograms.map((program, index) => (
                  <motion.tr
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">
                      <div>
                        <p>{program.name}</p>
                        {program.name_ar && (
                          <p className="text-sm text-unlimited-gray">{program.name_ar}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{program.university_name}</p>
                        {program.university_name_ar && (
                          <p className="text-sm text-unlimited-gray">{program.university_name_ar}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getDegreeTypeName(program.degree_type)}</Badge>
                    </TableCell>
                    <TableCell>{program.language}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {program.duration} سنوات
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        ${Number(program.tuition_fee).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{program.quota || 'غير محدد'}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{program.applications_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={program.is_active ? 'default' : 'secondary'}
                        className={program.is_active ? 'bg-green-600' : 'bg-red-600'}
                      >
                        {program.is_active ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewProgram(program)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-8 w-8 ${program.is_active ? 'text-red-600' : 'text-green-600'}`}
                          onClick={() => handleToggleStatus(program.id, program.is_active)}
                        >
                          {program.is_active ? 'إلغاء' : 'تفعيل'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteProgram(program.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Dialog عرض تفاصيل البرنامج */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>تفاصيل البرنامج الدراسي</DialogTitle>
              <DialogDescription>
                معلومات مفصلة عن البرنامج المحدد
              </DialogDescription>
            </DialogHeader>
            
            {selectedProgram && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">اسم البرنامج (إنجليزي)</label>
                    <p className="font-medium">{selectedProgram.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">اسم البرنامج (عربي)</label>
                    <p>{selectedProgram.name_ar || 'غير محدد'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الجامعة</label>
                    <p className="font-medium">{selectedProgram.university_name}</p>
                    {selectedProgram.university_name_ar && (
                      <p className="text-sm text-unlimited-gray">{selectedProgram.university_name_ar}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">نوع الدرجة</label>
                    <Badge variant="outline">{getDegreeTypeName(selectedProgram.degree_type)}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">اللغة</label>
                    <p>{selectedProgram.language}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">المدة</label>
                    <p>{selectedProgram.duration} سنوات</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الرسوم</label>
                    <p className="font-bold text-green-600">${Number(selectedProgram.tuition_fee).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الحصة</label>
                    <p>{selectedProgram.quota || 'غير محدد'}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الوصف (إنجليزي)</label>
                  <p className="text-sm">{selectedProgram.description || 'غير محدد'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الوصف (عربي)</label>
                  <p className="text-sm">{selectedProgram.description_ar || 'غير محدد'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">عدد الطلبات</label>
                    <p className="text-lg font-bold text-blue-600">{selectedProgram.applications_count}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الحالة</label>
                    <Badge variant={selectedProgram.is_active ? 'default' : 'secondary'}>
                      {selectedProgram.is_active ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManagePrograms;
