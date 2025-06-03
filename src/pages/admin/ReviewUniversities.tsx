
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, Filter, SortDesc, School } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAdminActions } from '@/hooks/admin/useAdminActions';
import UniversityReviewCard from '@/components/admin/universities/UniversityReviewCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import DateRangeSelector from '@/components/admin/DateRangeSelector';
import { supabase } from '@/integrations/supabase/client';

interface University {
  id: string;
  nameAr: string;
  nameEn: string;
  logo?: string;
  country: string;
  city: string;
  ranking?: number;
  foundedYear?: number;
  studentsCount: number;
  programsCount: number;
  rating?: number;
  status: 'pending' | 'approved' | 'rejected';
}

const ReviewUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isLoading: isActionLoading, confirmAction, isConfirmDialogOpen, executePendingAction, cancelConfirmAction } = useAdminActions();
  
  // حساب الإحصائيات
  const pendingCount = universities.filter(uni => uni.status === 'pending').length;
  const approvedCount = universities.filter(uni => uni.status === 'approved').length;
  const rejectedCount = universities.filter(uni => uni.status === 'rejected').length;
  
  useEffect(() => {
    fetchUniversities();
  }, []);
  
  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      
      const { data: universitiesData, error } = await supabase
        .from('universities')
        .select(`
          id,
          name,
          name_ar,
          country,
          city,
          founded_year,
          image_url,
          is_active,
          programs (id)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedUniversities: University[] = universitiesData?.map(uni => ({
        id: uni.id.toString(),
        nameAr: uni.name_ar || uni.name,
        nameEn: uni.name,
        logo: uni.image_url || undefined,
        country: uni.country,
        city: uni.city,
        ranking: Math.floor(Math.random() * 500) + 100, // تصنيف عشوائي للعرض
        foundedYear: uni.founded_year || undefined,
        studentsCount: Math.floor(Math.random() * 10000) + 1000, // عدد طلاب عشوائي
        programsCount: uni.programs?.length || 0,
        rating: Math.floor(Math.random() * 5) + 1,
        status: uni.is_active ? 'approved' : 'pending' as 'pending' | 'approved' | 'rejected'
      })) || [];

      setUniversities(formattedUniversities);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل بيانات الجامعات",
        variant: "destructive"
      });
      
      // استخدام بيانات تجريبية في حالة الخطأ
      const fallbackData: University[] = [
        {
          id: "1",
          nameAr: "جامعة إسطنبول التقنية",
          nameEn: "Istanbul Technical University",
          country: "تركيا",
          city: "إسطنبول",
          ranking: 350,
          foundedYear: 1773,
          studentsCount: 35000,
          programsCount: 45,
          rating: 4.5,
          status: 'pending'
        }
      ];
      setUniversities(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };
  
  // تصفية الجامعات بناءً على الفلاتر
  useEffect(() => {
    let filtered = [...universities];
    
    // تصفية حسب النص المدخل في البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(uni => 
        uni.nameAr.toLowerCase().includes(query) ||
        uni.nameEn.toLowerCase().includes(query) ||
        uni.country.toLowerCase().includes(query) ||
        uni.city.toLowerCase().includes(query)
      );
    }
    
    // تصفية حسب الدولة
    if (countryFilter !== 'all') {
      filtered = filtered.filter(uni => uni.country === countryFilter);
    }
    
    // تصفية حسب الحالة
    if (currentTab !== 'all') {
      filtered = filtered.filter(uni => uni.status === currentTab);
    }
    
    // الترتيب
    switch (sortOption) {
      case 'newest':
        // في البيانات الواقعية سنرتب حسب تاريخ الإضافة
        break;
      case 'oldest':
        // عكس الترتيب الحالي كمحاكاة
        filtered = [...filtered].reverse();
        break;
      case 'ranking':
        filtered = [...filtered].sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
        break;
      case 'programsCount':
        filtered = [...filtered].sort((a, b) => b.programsCount - a.programsCount);
        break;
    }
    
    setFilteredUniversities(filtered);
  }, [universities, searchQuery, countryFilter, sortOption, currentTab]);
  
  // استخراج قائمة الدول الفريدة
  const countries = Array.from(new Set(universities.map(uni => uni.country)));
  
  const handleApproveUniversity = (id: string) => {
    setSelectedUniversityId(id);
    setActionType('approve');
    
    confirmAction(
      async () => {
        const { error } = await supabase
          .from('universities')
          .update({ is_active: true })
          .eq('id', parseInt(id));
        
        if (error) throw error;
        
        setUniversities(universities.map(uni => 
          uni.id === id ? { ...uni, status: 'approved' } : uni
        ));
      },
      {
        successMessage: 'تمت الموافقة على الجامعة بنجاح'
      }
    );
  };
  
  const handleRejectUniversity = (id: string) => {
    setSelectedUniversityId(id);
    setActionType('reject');
    
    confirmAction(
      async () => {
        const { error } = await supabase
          .from('universities')
          .update({ is_active: false })
          .eq('id', parseInt(id));
        
        if (error) throw error;
        
        setUniversities(universities.map(uni => 
          uni.id === id ? { ...uni, status: 'rejected' } : uni
        ));
      },
      {
        successMessage: 'تم رفض الجامعة بنجاح'
      }
    );
  };
  
  const handleViewDetails = (id: string) => {
    toast({
      title: "عرض التفاصيل",
      description: `تم فتح تفاصيل الجامعة ${id}`
    });
  };
  
  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    toast({
      description: `تم اختيار الفترة من ${range.from.toLocaleDateString()} إلى ${range.to.toLocaleDateString()}`
    });
  };
  
  // getConfirmationText function
  const getConfirmationText = () => {
    const university = universities.find(uni => uni.id === selectedUniversityId);
    
    if (!university) return "";
    
    if (actionType === 'approve') {
      return `هل أنت متأكد من الموافقة على جامعة "${university.nameAr}"؟ سيتم إتاحتها للطلاب بعد الموافقة.`;
    } else {
      return `هل أنت متأكد من رفض جامعة "${university.nameAr}"؟ لن يتمكن الطلاب من رؤية هذه الجامعة.`;
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
          <span className="mr-3">جاري تحميل الجامعات...</span>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userRole="admin">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">مراجعة الجامعات</h2>
          
          <div className="flex flex-wrap gap-2">
            <DateRangeSelector onRangeChange={handleDateRangeChange} />
            
            <Button variant="default">
              <CheckCircle className="ml-2 h-4 w-4" />
              موافقة جماعية
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <School className="h-4 w-4 text-unlimited-blue" />
                </div>
                قيد المراجعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-unlimited-gray">جامعة تنتظر المراجعة</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                تمت الموافقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{approvedCount}</p>
              <p className="text-sm text-unlimited-gray">جامعة معتمدة</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <Search className="h-4 w-4 text-red-600" />
                </div>
                مرفوضة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{rejectedCount}</p>
              <p className="text-sm text-unlimited-gray">جامعة مرفوضة</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="بحث عن جامعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="ml-2 h-4 w-4" />
                <SelectValue placeholder="جميع الدول" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدول</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SortDesc className="ml-2 h-4 w-4" />
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث أولاً</SelectItem>
                <SelectItem value="oldest">الأقدم أولاً</SelectItem>
                <SelectItem value="ranking">التصنيف الأعلى</SelectItem>
                <SelectItem value="programsCount">عدد البرامج</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="all">الكل ({universities.length})</TabsTrigger>
            <TabsTrigger value="pending">قيد المراجعة ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">تمت الموافقة ({approvedCount})</TabsTrigger>
            <TabsTrigger value="rejected">مرفوضة ({rejectedCount})</TabsTrigger>
          </TabsList>
          
          {['all', 'pending', 'approved', 'rejected'].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredUniversities.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-unlimited-gray">
                    <School className="h-12 w-12 mb-2 opacity-50" />
                    <h3 className="text-lg font-medium">لا توجد جامعات</h3>
                    <p className="text-sm">لم يتم العثور على جامعات تطابق معايير البحث</p>
                  </div>
                ) : (
                  filteredUniversities.map(university => (
                    <UniversityReviewCard
                      key={university.id}
                      university={university}
                      onApprove={handleApproveUniversity}
                      onReject={handleRejectUniversity}
                      onViewDetails={handleViewDetails}
                      isLoading={isActionLoading && selectedUniversityId === university.id}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelConfirmAction}
          onConfirm={executePendingAction}
          title={actionType === 'approve' ? "تأكيد الموافقة" : "تأكيد الرفض"}
          description={getConfirmationText()}
          confirmLabel={actionType === 'approve' ? "موافقة" : "رفض"}
          cancelLabel="إلغاء"
          isLoading={isActionLoading}
          destructive={actionType !== 'approve'}
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default ReviewUniversities;
