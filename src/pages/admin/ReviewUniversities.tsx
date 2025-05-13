
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

// بيانات تجريبية
const dummyUniversities = [
  {
    id: "uni001",
    nameAr: "جامعة الفلاح الدولية",
    nameEn: "Al-Falah International University",
    logo: undefined,
    country: "الإمارات العربية المتحدة",
    city: "دبي",
    ranking: 420,
    foundedYear: 2010,
    studentsCount: 3800,
    programsCount: 45,
    rating: 4,
    status: 'pending' as const
  },
  {
    id: "uni002",
    nameAr: "جامعة المستقبل التكنولوجية",
    nameEn: "Future Technology University",
    logo: undefined,
    country: "المملكة العربية السعودية",
    city: "الرياض",
    ranking: 380,
    foundedYear: 2005,
    studentsCount: 5200,
    programsCount: 62,
    rating: 4.5,
    status: 'pending' as const
  },
  {
    id: "uni003",
    nameAr: "جامعة الأندلس للعلوم",
    nameEn: "Andalusia University of Sciences",
    logo: undefined,
    country: "مصر",
    city: "القاهرة",
    ranking: 550,
    foundedYear: 1995,
    studentsCount: 8500,
    programsCount: 78,
    rating: 3.5,
    status: 'pending' as const
  },
  {
    id: "uni004",
    nameAr: "جامعة المعرفة الدولية",
    nameEn: "Knowledge International University",
    logo: undefined,
    country: "الأردن",
    city: "عمان",
    ranking: 480,
    foundedYear: 2008,
    studentsCount: 4100,
    programsCount: 53,
    rating: 4,
    status: 'approved' as const
  },
  {
    id: "uni005",
    nameAr: "جامعة الريادة",
    nameEn: "Leadership University",
    logo: undefined,
    country: "قطر",
    city: "الدوحة",
    ranking: 320,
    foundedYear: 2012,
    studentsCount: 3200,
    programsCount: 38,
    rating: 4.2,
    status: 'rejected' as const
  }
];

const ReviewUniversities = () => {
  const [universities, setUniversities] = useState(dummyUniversities);
  const [filteredUniversities, setFilteredUniversities] = useState(dummyUniversities);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const { toast } = useToast();
  const { isLoading, confirmAction, isConfirmDialogOpen, executePendingAction, cancelConfirmAction } = useAdminActions();
  
  // حساب الإحصائيات
  const pendingCount = universities.filter(uni => uni.status === 'pending').length;
  const approvedCount = universities.filter(uni => uni.status === 'approved').length;
  const rejectedCount = universities.filter(uni => uni.status === 'rejected').length;
  
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
        // في الواقع سنرسل طلب API هنا
        await new Promise(resolve => setTimeout(resolve, 800));
        
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
        // في الواقع سنرسل طلب API هنا
        await new Promise(resolve => setTimeout(resolve, 800));
        
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
    // سنستخدم هذا للتصفية حسب التاريخ في التنفيذ الحقيقي
    toast({
      description: `تم اختيار الفترة من ${range.from.toLocaleDateString()} إلى ${range.to.toLocaleDateString()}`
    });
  };
  
  const getConfirmationText = () => {
    const university = universities.find(uni => uni.id === selectedUniversityId);
    
    if (!university) return "";
    
    if (actionType === 'approve') {
      return `هل أنت متأكد من الموافقة على جامعة "${university.nameAr}"؟ سيتم إتاحتها للطلاب بعد الموافقة.`;
    } else {
      return `هل أنت متأكد من رفض جامعة "${university.nameAr}"؟ لن يتمكن الطلاب من رؤية هذه الجامعة.`;
    }
  };
  
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
          
          <TabsContent value="all" className="mt-6">
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
                    isLoading={isLoading && selectedUniversityId === university.id}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredUniversities.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-unlimited-gray">
                  <School className="h-12 w-12 mb-2 opacity-50" />
                  <h3 className="text-lg font-medium">لا توجد جامعات قيد المراجعة</h3>
                  <p className="text-sm">لم يتم العثور على جامعات تنتظر المراجعة</p>
                </div>
              ) : (
                filteredUniversities.map(university => (
                  <UniversityReviewCard
                    key={university.id}
                    university={university}
                    onApprove={handleApproveUniversity}
                    onReject={handleRejectUniversity}
                    onViewDetails={handleViewDetails}
                    isLoading={isLoading && selectedUniversityId === university.id}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="approved" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredUniversities.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-unlimited-gray">
                  <School className="h-12 w-12 mb-2 opacity-50" />
                  <h3 className="text-lg font-medium">لا توجد جامعات معتمدة</h3>
                  <p className="text-sm">لم يتم العثور على جامعات تمت الموافقة عليها</p>
                </div>
              ) : (
                filteredUniversities.map(university => (
                  <UniversityReviewCard
                    key={university.id}
                    university={university}
                    onApprove={handleApproveUniversity}
                    onReject={handleRejectUniversity}
                    onViewDetails={handleViewDetails}
                    isLoading={isLoading && selectedUniversityId === university.id}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredUniversities.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-unlimited-gray">
                  <School className="h-12 w-12 mb-2 opacity-50" />
                  <h3 className="text-lg font-medium">لا توجد جامعات مرفوضة</h3>
                  <p className="text-sm">لم يتم العثور على جامعات تم رفضها</p>
                </div>
              ) : (
                filteredUniversities.map(university => (
                  <UniversityReviewCard
                    key={university.id}
                    university={university}
                    onApprove={handleApproveUniversity}
                    onReject={handleRejectUniversity}
                    onViewDetails={handleViewDetails}
                    isLoading={isLoading && selectedUniversityId === university.id}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelConfirmAction}
          onConfirm={executePendingAction}
          title={actionType === 'approve' ? "تأكيد الموافقة" : "تأكيد الرفض"}
          description={getConfirmationText()}
          confirmLabel={actionType === 'approve' ? "موافقة" : "رفض"}
          cancelLabel="إلغاء"
          isLoading={isLoading}
          variant={actionType === 'approve' ? "default" : "destructive"}
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default ReviewUniversities;
