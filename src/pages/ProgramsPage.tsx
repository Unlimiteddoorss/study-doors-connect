import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProgramCard, { ProgramInfo } from '@/components/programs/ProgramCard';
import ProgramFilters, { ProgramFiltersValues } from '@/components/programs/ProgramFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, Search, BookOpen, Building, Loader2, MapPin } from 'lucide-react';

// بيانات تجريبية للبرامج - يمكن استبدالها بطلب API حقيقي
const samplePrograms: ProgramInfo[] = [
  {
    id: 1,
    name: 'Software Engineering',
    name_ar: 'هندسة البرمجيات',
    university: 'Istanbul Technical University',
    university_id: 1,
    university_image: '/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png',
    degree_type: 'bachelor',
    duration: 4,
    tuition_fee: 6000,
    language: 'English',
    country: 'Turkey',
    city: 'Istanbul',
    is_popular: true,
    description: 'برنامج متميز في هندسة البرمجيات يركز على تطوير المهارات العملية والنظرية في مجال البرمجة وتطوير البرمجيات.'
  },
  {
    id: 2,
    name: 'Business Administration',
    name_ar: 'إدارة الأعمال',
    university: 'Bahçeşehir University',
    university_id: 2,
    degree_type: 'bachelor',
    duration: 4,
    tuition_fee: 7500,
    language: 'English',
    country: 'Turkey',
    city: 'Istanbul',
    has_scholarship: true,
    description: 'برنامج شامل في إدارة الأعمال يؤهل الطلاب للعمل في مجالات الإدارة والتسويق والموارد البشرية وريادة الأعمال.'
  },
  {
    id: 3,
    name: 'Computer Science',
    name_ar: 'علوم الحاسب',
    university: 'Middle East Technical University',
    university_id: 3,
    degree_type: 'master',
    duration: 2,
    tuition_fee: 5000,
    language: 'English',
    country: 'Turkey',
    city: 'Ankara',
    is_popular: true,
    description: 'برنامج متقدم في علوم الحاسب يركز على الذكاء الاصطناعي وتعلم الآلة والحوسبة السحابية وأمن المعلومات.'
  },
  {
    id: 4,
    name: 'Medicine',
    name_ar: 'الطب البشري',
    university: 'Near East University',
    university_id: 4,
    university_image: '/lovable-uploads/6e0c99ef-ce91-48b1-b3c8-49e2ef5a454a.png',
    degree_type: 'bachelor',
    duration: 6,
    tuition_fee: 12000,
    language: 'English',
    country: 'Cyprus',
    city: 'Nicosia',
    is_popular: true,
    has_scholarship: true,
    description: 'برنامج الطب البشري المعتمد دولياً يؤهل الطلاب للعمل كأطباء مؤهلين في مختلف التخصصات الطبية.'
  },
  {
    id: 5,
    name: 'Civil Engineering',
    name_ar: 'الهندسة المدنية',
    university: 'University of Technology Malaysia',
    university_id: 5,
    degree_type: 'bachelor',
    duration: 4,
    tuition_fee: 8000,
    language: 'English',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    description: 'برنامج متكامل في الهندسة المدنية يغطي تصميم وبناء البنى التحتية والمباني والجسور والطرق وإدارة المشاريع الهندسية.'
  },
  {
    id: 6,
    name: 'International Relations',
    name_ar: 'العلاقات الدولية',
    university: 'Budapest University',
    university_id: 6,
    degree_type: 'master',
    duration: 2,
    tuition_fee: 4500,
    language: 'English',
    country: 'Hungary',
    city: 'Budapest',
    has_scholarship: true,
    description: 'برنامج متميز في العلاقات الدولية يتناول القضايا العالمية المعاصرة والدبلوماسية والسياسة الخارجية والمنظمات الدولية.'
  },
  {
    id: 7,
    name: 'Pharmacy',
    name_ar: 'الصيدلة',
    university: 'Warsaw Medical University',
    university_id: 7,
    degree_type: 'bachelor',
    duration: 5,
    tuition_fee: 9000,
    language: 'English',
    country: 'Poland',
    city: 'Warsaw',
    description: 'برنامج الصيدلة المعتمد دولياً يؤهل الطلاب للعمل كصيادلة محترفين في المستشفيات والصيدليات ومجال البحث والتطوير الدوائي.'
  },
  {
    id: 8,
    name: 'Architecture',
    name_ar: 'العمارة',
    university: 'Czech Technical University',
    university_id: 8,
    university_image: '/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png',
    degree_type: 'bachelor',
    duration: 5,
    tuition_fee: 7000,
    language: 'English',
    country: 'Czech Republic',
    city: 'Prague',
    description: 'برنامج متميز في العمارة يجمع بين النظرية والممارسة العملية في تصميم المباني والتخطيط العمراني والتصميم الداخلي.'
  },
  {
    id: 9,
    name: 'Dentistry',
    name_ar: 'طب الأسنان',
    university: 'Eastern Mediterranean University',
    university_id: 9,
    degree_type: 'bachelor',
    duration: 5,
    tuition_fee: 11000,
    language: 'English',
    country: 'Turkish Cyprus',
    city: 'Famagusta',
    is_popular: true,
    description: 'برنامج معتمد دولياً في طب الأسنان يؤهل الطلاب للعمل كأطباء أسنان مؤهلين مع التركيز على الممارسة العملية والتقنيات الحديثة.'
  },
];

const ProgramsPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // استخراج المعايير المتاحة من البيانات
  const countries = Array.from(new Set(samplePrograms.map(p => p.country)));
  const languages = Array.from(new Set(samplePrograms.map(p => p.language)));
  
  // محاكاة تحميل البيانات
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters({
        search: searchParams.get('search') || '',
        country: searchParams.getAll('country'),
        degreeType: searchParams.getAll('degree'),
        language: searchParams.getAll('language'),
        duration: [
          parseInt(searchParams.get('minDuration') || '1'),
          parseInt(searchParams.get('maxDuration') || '6')
        ] as [number, number],
        tuitionRange: [
          parseInt(searchParams.get('minTuition') || '0'),
          parseInt(searchParams.get('maxTuition') || '50000')
        ] as [number, number],
        hasScholarship: searchParams.get('scholarship') === 'true',
        isPopular: searchParams.get('popular') === 'true'
      });
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchParams]);
  
  const updateSearchParams = (filters: ProgramFiltersValues) => {
    // إنشاء نسخة جديدة من معلمات البحث
    const newParams = new URLSearchParams();
    
    // إضافة معايير البحث
    if (filters.search) newParams.set('search', filters.search);
    
    // إضافة البلدان
    filters.country.forEach(country => {
      newParams.append('country', country);
    });
    
    // إضافة أنواع الدرجات
    filters.degreeType.forEach(degree => {
      newParams.append('degree', degree);
    });
    
    // إضافة اللغات
    filters.language.forEach(lang => {
      newParams.append('language', lang);
    });
    
    // إضافة المدة
    newParams.set('minDuration', filters.duration[0].toString());
    newParams.set('maxDuration', filters.duration[1].toString());
    
    // إضافة الرسوم
    newParams.set('minTuition', filters.tuitionRange[0].toString());
    newParams.set('maxTuition', filters.tuitionRange[1].toString());
    
    // إضافة خيارات أخرى
    if (filters.hasScholarship) newParams.set('scholarship', 'true');
    if (filters.isPopular) newParams.set('popular', 'true');
    
    // تحديث عنوان URL
    setSearchParams(newParams);
  };
  
  const applyFilters = (filters: ProgramFiltersValues) => {
    setIsLoading(true);
    
    // تصفية البرامج حسب المعايير المحددة
    let filtered = [...samplePrograms];
    
    // البحث بالنص
    if (filters.search) {
      const searchQuery = filters.search.toLowerCase();
      filtered = filtered.filter(program => 
        program.name.toLowerCase().includes(searchQuery) ||
        (program.name_ar && program.name_ar.toLowerCase().includes(searchQuery)) ||
        program.university.toLowerCase().includes(searchQuery) ||
        program.description?.toLowerCase().includes(searchQuery)
      );
    }
    
    // تصفية حسب البلد
    if (filters.country.length > 0) {
      filtered = filtered.filter(program => filters.country.includes(program.country));
    }
    
    // تصفية حسب نوع الدرجة
    if (filters.degreeType.length > 0) {
      filtered = filtered.filter(program => filters.degreeType.includes(program.degree_type));
    }
    
    // تصفية حسب اللغة
    if (filters.language.length > 0) {
      filtered = filtered.filter(program => filters.language.includes(program.language));
    }
    
    // تصفية حسب المدة
    filtered = filtered.filter(program => 
      program.duration >= filters.duration[0] && program.duration <= filters.duration[1]
    );
    
    // تصفية حسب الرسوم
    filtered = filtered.filter(program => 
      program.tuition_fee >= filters.tuitionRange[0] && program.tuition_fee <= filters.tuitionRange[1]
    );
    
    // تصفية حسب المنح الدراسية
    if (filters.hasScholarship) {
      filtered = filtered.filter(program => program.has_scholarship);
    }
    
    // تصفية حسب الشعبية
    if (filters.isPopular) {
      filtered = filtered.filter(program => program.is_popular);
    }
    
    // ترتيب النتائج
    switch (sortBy) {
      case 'tuition_asc':
        filtered.sort((a, b) => a.tuition_fee - b.tuition_fee);
        break;
      case 'tuition_desc':
        filtered.sort((a, b) => b.tuition_fee - a.tuition_fee);
        break;
      case 'duration_asc':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration_desc':
        filtered.sort((a, b) => b.duration - a.duration);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // افتراضياً، الأكثر صلة (برامج شائعة ثم برامج بمنح)
        filtered.sort((a, b) => {
          if (a.is_popular && !b.is_popular) return -1;
          if (!a.is_popular && b.is_popular) return 1;
          if (a.has_scholarship && !b.has_scholarship) return -1;
          if (!a.has_scholarship && b.has_scholarship) return 1;
          return 0;
        });
    }
    
    // تحديث البرامج المعروضة
    setFilteredPrograms(filtered);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const handleApplyFilters = (filters: ProgramFiltersValues) => {
    updateSearchParams(filters);
    applyFilters(filters);
    setVisibleCount(6); // إعادة تعيين عدد البرامج المعروضة
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    // إعادة ترتيب البرامج المعروضة حالياً
    const currentFilters = {
      search: searchParams.get('search') || '',
      country: searchParams.getAll('country'),
      degreeType: searchParams.getAll('degree'),
      language: searchParams.getAll('language'),
      duration: [
        parseInt(searchParams.get('minDuration') || '1'),
        parseInt(searchParams.get('maxDuration') || '6')
      ] as [number, number],
      tuitionRange: [
        parseInt(searchParams.get('minTuition') || '0'),
        parseInt(searchParams.get('maxTuition') || '50000')
      ] as [number, number],
      hasScholarship: searchParams.get('scholarship') === 'true',
      isPopular: searchParams.get('popular') === 'true'
    };
    applyFilters(currentFilters);
  };
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredPrograms.length));
  };

  const visiblePrograms = filteredPrograms.slice(0, visibleCount);
  const hasMorePrograms = visibleCount < filteredPrograms.length;

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-unlimited-dark-blue mb-4">
              {t('programs.pageTitle', 'استكشف البرامج الدراسية')}
            </h1>
            <p className="text-unlimited-gray max-w-2xl mx-auto">
              {t('programs.pageDescription', 'اكتشف مجموعة واسعة من البرامج الدراسية المقدمة من الجامعات المرموقة حول العالم. استخدم أدوات التصفية لتحديد البرنامج المثالي لك.')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mt-8 justify-center"
          >
            <div className="flex items-center bg-unlimited-blue/10 rounded-full px-4 py-1.5">
              <BookOpen className="h-4 w-4 text-unlimited-blue mr-2" />
              <span className="text-unlimited-dark-blue font-medium text-sm">
                {filteredPrograms.length} {t('programs.availablePrograms', 'برنامج متاح')}
              </span>
            </div>
            
            <div className="flex items-center bg-unlimited-blue/10 rounded-full px-4 py-1.5">
              <Building className="h-4 w-4 text-unlimited-blue mr-2" />
              <span className="text-unlimited-dark-blue font-medium text-sm">
                {Array.from(new Set(filteredPrograms.map(p => p.university_id))).length} {t('programs.participatingUniversities', 'جامعة مشاركة')}
              </span>
            </div>
            
            <motion.div variants={itemVariants}>
              <span className="text-unlimited-blue font-medium text-sm">
                {Array.from(new Set(filteredPrograms.map(p => p.country))).length} {t('programs.countriesAvailable', 'دولة متاحة')}
              </span>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* فلاتر سطح المكتب */}
          <motion.div 
            className="hidden lg:block w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ProgramFilters
              onApplyFilters={handleApplyFilters}
              countries={countries}
              languages={languages}
              initialFilters={{
                search: searchParams.get('search') || '',
                country: searchParams.getAll('country'),
                degreeType: searchParams.getAll('degree'),
                language: searchParams.getAll('language'),
                duration: [
                  parseInt(searchParams.get('minDuration') || '1'),
                  parseInt(searchParams.get('maxDuration') || '6')
                ] as [number, number],
                tuitionRange: [
                  parseInt(searchParams.get('minTuition') || '0'),
                  parseInt(searchParams.get('maxTuition') || '50000')
                ] as [number, number],
                hasScholarship: searchParams.get('scholarship') === 'true',
                isPopular: searchParams.get('popular') === 'true'
              }}
            />
          </motion.div>
          
          {/* محتوى البرامج */}
          <div className="flex-1">
            <motion.div 
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-unlimited-dark-blue">{t('programs.results', 'النتائج')}</h2>
                <span className="text-unlimited-gray ml-2">({filteredPrograms.length})</span>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Sheet open={showMobileFilter} onOpenChange={setShowMobileFilter}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1 lg:hidden"
                      onClick={() => setShowMobileFilter(true)}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      {t('programs.filters', 'الفلاتر')}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={isRtl ? "right" : "left"} className="w-[320px] sm:w-[400px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>{t('programs.filters', 'فلاتر البرامج')}</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <ProgramFilters
                        onApplyFilters={handleApplyFilters}
                        countries={countries}
                        languages={languages}
                        initialFilters={{
                          search: searchParams.get('search') || '',
                          country: searchParams.getAll('country'),
                          degreeType: searchParams.getAll('degree'),
                          language: searchParams.getAll('language'),
                          duration: [
                            parseInt(searchParams.get('minDuration') || '1'),
                            parseInt(searchParams.get('maxDuration') || '6')
                          ] as [number, number],
                          tuitionRange: [
                            parseInt(searchParams.get('minTuition') || '0'),
                            parseInt(searchParams.get('maxTuition') || '50000')
                          ] as [number, number],
                          hasScholarship: searchParams.get('scholarship') === 'true',
                          isPopular: searchParams.get('popular') === 'true'
                        }}
                        isMobileFilterOpen={showMobileFilter}
                        onCloseMobileFilter={() => setShowMobileFilter(false)}
                        className="border-0 shadow-none"
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t('programs.sortBy', 'ترتيب حسب')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">{t('programs.sortByRelevance', 'الأكثر صلة')}</SelectItem>
                    <SelectItem value="tuition_asc">{t('programs.sortByTuitionAsc', 'الرسوم: من الأقل للأعلى')}</SelectItem>
                    <SelectItem value="tuition_desc">{t('programs.sortByTuitionDesc', 'الرسوم: من الأعلى للأقل')}</SelectItem>
                    <SelectItem value="duration_asc">{t('programs.sortByDurationAsc', 'المدة: من الأقصر للأطول')}</SelectItem>
                    <SelectItem value="duration_desc">{t('programs.sortByDurationDesc', 'المدة: من الأطول للأقصر')}</SelectItem>
                    <SelectItem value="name_asc">{t('programs.sortByNameAsc', 'الاسم: أ-ي')}</SelectItem>
                    <SelectItem value="name_desc">{t('programs.sortByNameDesc', 'الاسم: ي-أ')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
            
            {isLoading ? (
              <div className="grid place-items-center h-96">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-12 w-12 animate-spin text-unlimited-blue mb-4" />
                  <p className="text-unlimited-dark-blue">{t('programs.loading', 'جاري تحميل البرامج...')}</p>
                </div>
              </div>
            ) : (
              <>
                {filteredPrograms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    <AnimatePresence>
                      {visiblePrograms.map((program, index) => (
                        <ProgramCard key={program.id} program={program} index={index} />
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center bg-unlimited-blue/5 rounded-lg p-8 text-center h-64"
                  >
                    <Search className="h-12 w-12 text-unlimited-gray/20 mb-4" />
                    <h3 className="text-xl font-medium text-unlimited-dark-blue mb-2">
                      {t('programs.noResults', 'لم يتم العثور على برامج')}
                    </h3>
                    <p className="text-unlimited-gray mb-4">
                      {t('programs.tryAdjustingFilters', 'لم نتمكن من العثور على برامج تطابق معايير البحث. حاول تعديل الفلاتر أو توسيع نطاق البحث.')}
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchParams(new URLSearchParams());
                        applyFilters({
                          search: '',
                          country: [],
                          degreeType: [],
                          language: [],
                          duration: [1, 6],
                          tuitionRange: [0, 50000],
                          hasScholarship: false,
                          isPopular: false
                        });
                      }}
                    >
                      {t('programs.resetAllFilters', 'إعادة تعيين جميع الفلاتر')}
                    </Button>
                  </motion.div>
                )}
                
                {hasMorePrograms && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-10"
                  >
                    <Button variant="outline" onClick={handleLoadMore}>
                      {t('programs.loadMore', 'تحميل المزيد من البرامج')}
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ProgramsPage;
