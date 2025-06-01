
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
import { Search, School, Plus, Eye, Edit, Trash2, Globe, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface University {
  id: number;
  name: string;
  name_ar: string;
  country: string;
  city: string;
  website: string;
  description: string;
  description_ar: string;
  founded_year: number;
  is_active: boolean;
  programs_count: number;
  applications_count: number;
  created_at: string;
}

const ManageUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      
      const { data: universitiesData, error } = await supabase
        .from('universities')
        .select('*')
        .order('name');

      if (error) throw error;

      // إضافة عدد البرامج والطلبات لكل جامعة
      const universitiesWithCounts = await Promise.all(
        universitiesData?.map(async (university) => {
          // جلب عدد البرامج
          const { count: programsCount } = await supabase
            .from('programs')
            .select('*', { count: 'exact' })
            .eq('university_id', university.id)
            .eq('is_active', true);

          // جلب عدد الطلبات
          const { count: applicationsCount } = await supabase
            .from('applications')
            .select('*', { count: 'exact' })
            .eq('university_id', university.id);

          return {
            ...university,
            programs_count: programsCount || 0,
            applications_count: applicationsCount || 0
          };
        }) || []
      );

      setUniversities(universitiesWithCounts);
    } catch (error) {
      console.error('خطأ في جلب بيانات الجامعات:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات الجامعات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (university.name_ar && university.name_ar.includes(searchQuery)) ||
                         university.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = countryFilter === 'all' || university.country === countryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && university.is_active) ||
                         (statusFilter === 'inactive' && !university.is_active);
    
    return matchesSearch && matchesCountry && matchesStatus;
  });

  const handleViewUniversity = (university: University) => {
    setSelectedUniversity(university);
    setIsViewDialogOpen(true);
  };

  const handleToggleStatus = async (universityId: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('universities')
        .update({ is_active: !currentStatus })
        .eq('id', universityId);

      if (error) throw error;

      setUniversities(universities.map(u => 
        u.id === universityId ? { ...u, is_active: !currentStatus } : u
      ));

      toast({
        title: "تم التحديث",
        description: `تم ${!currentStatus ? 'تفعيل' : 'إلغاء تفعيل'} الجامعة بنجاح`,
      });
    } catch (error) {
      console.error('خطأ في تحديث حالة الجامعة:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث حالة الجامعة",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUniversity = async (universityId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الجامعة؟ سيتم حذف جميع البرامج والطلبات المرتبطة بها.')) return;

    try {
      const { error } = await supabase
        .from('universities')
        .delete()
        .eq('id', universityId);

      if (error) throw error;

      setUniversities(universities.filter(u => u.id !== universityId));
      toast({
        title: "نجح الحذف",
        description: "تم حذف الجامعة بنجاح",
      });
    } catch (error) {
      console.error('خطأ في حذف الجامعة:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف الجامعة",
        variant: "destructive",
      });
    }
  };

  const countries = [...new Set(universities.map(u => u.country))];
  const totalPrograms = universities.reduce((sum, u) => sum + u.programs_count, 0);
  const totalApplications = universities.reduce((sum, u) => sum + u.applications_count, 0);
  const activeUniversities = universities.filter(u => u.is_active).length;

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الجامعات</h2>
            <p className="text-unlimited-gray">إدارة وتتبع جميع الجامعات في النظام</p>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة جامعة جديدة
          </Button>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الجامعات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <School className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="text-2xl font-bold text-unlimited-dark-blue">{universities.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">جامعات نشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-green-600">{activeUniversities}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي البرامج</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-blue-600">{totalPrograms}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-unlimited-gray">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-2xl font-bold text-purple-600">{totalApplications}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* أدوات البحث والفلترة */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="ابحث عن جامعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الدولة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدول</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشطة</SelectItem>
                <SelectItem value="inactive">غير نشطة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* جدول الجامعات */}
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الجامعة</TableHead>
                <TableHead>الدولة</TableHead>
                <TableHead>المدينة</TableHead>
                <TableHead>سنة التأسيس</TableHead>
                <TableHead>عدد البرامج</TableHead>
                <TableHead>عدد الطلبات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الموقع الإلكتروني</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 9 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredUniversities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center h-40 text-unlimited-gray">
                    لم يتم العثور على جامعات
                  </TableCell>
                </TableRow>
              ) : (
                filteredUniversities.map((university, index) => (
                  <motion.tr
                    key={university.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">
                      <div>
                        <p>{university.name}</p>
                        {university.name_ar && (
                          <p className="text-sm text-unlimited-gray">{university.name_ar}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {university.country}
                      </div>
                    </TableCell>
                    <TableCell>{university.city}</TableCell>
                    <TableCell>{university.founded_year}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{university.programs_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{university.applications_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={university.is_active ? 'default' : 'secondary'}
                        className={university.is_active ? 'bg-green-600' : 'bg-red-600'}
                      >
                        {university.is_active ? 'نشطة' : 'غير نشطة'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {university.website && (
                        <a 
                          href={university.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-unlimited-blue hover:underline"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          زيارة الموقع
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewUniversity(university)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-8 w-8 ${university.is_active ? 'text-red-600' : 'text-green-600'}`}
                          onClick={() => handleToggleStatus(university.id, university.is_active)}
                        >
                          {university.is_active ? 'إلغاء' : 'تفعيل'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteUniversity(university.id)}
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

        {/* Dialog عرض تفاصيل الجامعة */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الجامعة</DialogTitle>
              <DialogDescription>
                معلومات مفصلة عن الجامعة المحددة
              </DialogDescription>
            </DialogHeader>
            
            {selectedUniversity && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">اسم الجامعة (إنجليزي)</label>
                    <p className="font-medium">{selectedUniversity.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">اسم الجامعة (عربي)</label>
                    <p>{selectedUniversity.name_ar || 'غير محدد'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الدولة</label>
                    <p>{selectedUniversity.country}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">المدينة</label>
                    <p>{selectedUniversity.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">سنة التأسيس</label>
                    <p>{selectedUniversity.founded_year}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الوصف (إنجليزي)</label>
                  <p className="text-sm">{selectedUniversity.description || 'غير محدد'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-unlimited-gray mb-1">الوصف (عربي)</label>
                  <p className="text-sm">{selectedUniversity.description_ar || 'غير محدد'}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">عدد البرامج</label>
                    <p className="text-lg font-bold text-blue-600">{selectedUniversity.programs_count}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">عدد الطلبات</label>
                    <p className="text-lg font-bold text-green-600">{selectedUniversity.applications_count}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الحالة</label>
                    <Badge variant={selectedUniversity.is_active ? 'default' : 'secondary'}>
                      {selectedUniversity.is_active ? 'نشطة' : 'غير نشطة'}
                    </Badge>
                  </div>
                </div>
                
                {selectedUniversity.website && (
                  <div>
                    <label className="block text-sm font-medium text-unlimited-gray mb-1">الموقع الإلكتروني</label>
                    <a 
                      href={selectedUniversity.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-unlimited-blue hover:underline"
                    >
                      {selectedUniversity.website}
                    </a>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManageUniversities;
