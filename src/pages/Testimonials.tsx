
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, Filter, Star } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  
  // بيانات شهادات الطلاب (يمكن استبدالها بطلب API حقيقي)
  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      university: 'جامعة إسطنبول',
      program: 'هندسة البرمجيات',
      country: 'تركيا',
      image: '/lovable-uploads/021372d9-f6f5-4243-9671-e299e8bb342e.png',
      rating: 5,
      testimonial: 'تجربتي مع أبواب بلا حدود كانت رائعة وسلسة. ساعدوني في الحصول على قبول في جامعة إسطنبول وتأمين السكن المناسب. أنصح بخدماتهم لجميع الطلاب الراغبين بالدراسة في الخارج.',
      year: '2023'
    },
    {
      id: 2,
      name: 'سارة أحمد',
      university: 'جامعة كيبك',
      program: 'علوم الحاسب',
      country: 'كندا',
      rating: 4,
      testimonial: 'شكراً لفريق أبواب بلا حدود على المساعدة في تحقيق حلمي بالدراسة في كندا. كانت خطوات التقديم واضحة ومنظمة، وكان المستشارون متاحين للإجابة على استفساراتي بشكل سريع.',
      year: '2022'
    },
    {
      id: 3,
      name: 'محمد علي',
      university: 'جامعة ماليزيا للتكنولوجيا',
      program: 'هندسة الاتصالات',
      country: 'ماليزيا',
      image: '/lovable-uploads/6e0c99ef-ce91-48b1-b3c8-49e2ef5a454a.png',
      rating: 5,
      testimonial: 'أبواب بلا حدود قدمت لي خدمة ممتازة من البداية إلى النهاية. ساعدوني في اختيار البرنامج المناسب واستخراج التأشيرة بسهولة. الآن أنا أدرس في واحدة من أفضل الجامعات في ماليزيا.',
      year: '2023'
    },
    {
      id: 4,
      name: 'فاطمة خالد',
      university: 'الجامعة الأمريكية في قبرص',
      program: 'إدارة الأعمال',
      country: 'قبرص',
      rating: 5,
      testimonial: 'كنت قلقة من عملية التقديم للدراسة في الخارج، لكن أبواب بلا حدود جعلت الأمر سهلاً وبسيطاً. أشكرهم على الدعم المستمر والمتابعة حتى بعد وصولي للجامعة.',
      year: '2022'
    },
    {
      id: 5,
      name: 'عمر يوسف',
      university: 'جامعة بودابست',
      program: 'الطب البشري',
      country: 'المجر',
      image: '/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png',
      rating: 4,
      testimonial: 'أشكر فريق أبواب بلا حدود على الاحترافية في التعامل والمساعدة في الحصول على المنحة الدراسية. الدراسة في المجر تجربة رائعة والفضل يعود لدعمهم المتواصل.',
      year: '2023'
    },
    {
      id: 6,
      name: 'ياسمين محمود',
      university: 'جامعة وارسو',
      program: 'الصيدلة',
      country: 'بولندا',
      rating: 5,
      testimonial: 'تجربتي مع أبواب بلا حدود كانت مثالية. من الاستشارة الأولى وحتى وصولي إلى بولندا، كان الفريق معي خطوة بخطوة. أوصي بشدة بخدماتهم لكل من يريد الدراسة في الخارج.',
      year: '2023'
    }
  ];
  
  const countries = Array.from(new Set(testimonials.map(t => t.country)));
  const programs = Array.from(new Set(testimonials.map(t => t.program)));
  
  const filteredTestimonials = testimonials.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.testimonial.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.program.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCountry = countryFilter === 'all' || t.country === countryFilter;
    const matchesProgram = programFilter === 'all' || t.program === programFilter;
    
    return matchesSearch && matchesCountry && matchesProgram;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // تم تنفيذ البحث بالفعل من خلال التصفية أعلاه
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setCountryFilter('all');
    setProgramFilter('all');
  };

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-3xl font-bold text-unlimited-dark-blue mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('testimonials.title', 'شهادات طلابنا')}
          </motion.h1>
          <motion.p 
            className="text-unlimited-gray max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t('testimonials.subtitle', 'اقرأ عن تجارب طلابنا الناجحة وقصصهم الملهمة في مختلف الجامعات والبلدان حول العالم')}
          </motion.p>
          
          <motion.div 
            className="mt-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
                <Input 
                  type="text"
                  placeholder={t('testimonials.search', 'ابحث في شهادات الطلاب...')}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                {t('testimonials.searchBtn', 'بحث')}
              </Button>
            </form>
            
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
              <div className="flex items-center w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2 text-unlimited-gray" />
                <span className="text-sm text-unlimited-gray mr-2">{t('testimonials.filter', 'تصفية')}:</span>
                
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder={t('testimonials.allCountries', 'كل الدول')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('testimonials.allCountries', 'كل الدول')}</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={programFilter} onValueChange={setProgramFilter} className="ml-2">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder={t('testimonials.allPrograms', 'كل البرامج')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('testimonials.allPrograms', 'كل البرامج')}</SelectItem>
                    {programs.map(program => (
                      <SelectItem key={program} value={program}>{program}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {(searchQuery || countryFilter !== 'all' || programFilter !== 'all') && (
                <Button variant="ghost" onClick={handleReset} className="text-unlimited-gray hover:text-unlimited-dark-blue">
                  {t('testimonials.resetFilters', 'إعادة تعيين')}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                university={testimonial.university}
                program={testimonial.program}
                country={testimonial.country}
                image={testimonial.image}
                rating={testimonial.rating}
                testimonial={testimonial.testimonial}
                year={testimonial.year}
                delay={index * 0.1}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Star className="h-16 w-16 mx-auto text-unlimited-gray/20 mb-4" />
              <h3 className="text-xl font-medium text-unlimited-dark-blue mb-2">
                {t('testimonials.noResults', 'لا توجد نتائج')}
              </h3>
              <p className="text-unlimited-gray mb-6">
                {t('testimonials.tryAdjusting', 'لم نتمكن من العثور على شهادات تطابق معايير البحث. حاول تعديل الفلاتر أو كلمات البحث.')}
              </p>
              <Button variant="outline" onClick={handleReset}>
                {t('testimonials.resetFilters', 'إعادة تعيين')}
              </Button>
            </div>
          )}
        </div>
        
        {filteredTestimonials.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="min-w-[200px]">
              {t('testimonials.loadMore', 'تحميل المزيد من الشهادات')}
            </Button>
          </div>
        )}
        
        <motion.div 
          className="bg-unlimited-blue/5 rounded-xl p-8 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-unlimited-dark-blue mb-4">
            {t('testimonials.shareYourStory', 'شارك قصة نجاحك')}
          </h2>
          <p className="text-unlimited-gray mb-6 max-w-2xl mx-auto">
            {t('testimonials.shareYourStoryDesc', 'هل أنت أحد طلابنا السابقين؟ نحن نرحب دائماً بسماع قصص نجاحك ومشاركتها مع طلابنا الجدد. شاركنا تجربتك واجعل قصتك ملهمة للآخرين.')}
          </p>
          <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
            {t('testimonials.shareNow', 'شارك قصتك الآن')}
          </Button>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Testimonials;
