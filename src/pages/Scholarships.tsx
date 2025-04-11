
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import SectionTitle from '@/components/shared/SectionTitle';
import { Link } from 'react-router-dom';

// المنح الدراسية
const scholarships = [
  {
    id: 1,
    title: 'منحة التفوق الأكاديمي للطلاب الدوليين',
    university: 'جامعة صبنجي',
    coverage: 'تغطية كاملة للرسوم الدراسية',
    deadline: '15 يوليو 2025',
    eligibility: 'معدل تراكمي 3.5/4.0 وأعلى',
    category: 'منح تنافسية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'منحة الاتحاد التركي للطلاب العرب',
    university: 'متعددة الجامعات',
    coverage: 'تغطية 50% من الرسوم الدراسية',
    deadline: '30 أغسطس 2025',
    eligibility: 'الطلاب العرب بمعدل 3.0/4.0 وأعلى',
    category: 'منح إقليمية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'منحة الحكومة التركية (Türkiye Burslari)',
    university: 'جميع الجامعات الحكومية',
    coverage: 'تغطية كاملة مع راتب شهري',
    deadline: '20 فبراير 2026',
    eligibility: 'مفتوحة لجميع الطلاب الدوليين',
    category: 'منح حكومية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1596496181871-9681eacf9764?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'منحة كوتش للتفوق الدراسي',
    university: 'جامعة كوتش',
    coverage: 'تغطية 75% من الرسوم الدراسية',
    deadline: '1 مايو 2025',
    eligibility: 'معدل تراكمي 3.7/4.0 وأعلى',
    category: 'منح تنافسية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    title: 'منحة باهتشه شهير لبرامج الهندسة',
    university: 'جامعة باهتشه شهير',
    coverage: 'تغطية 50-100% من الرسوم الدراسية',
    deadline: '15 يونيو 2025',
    eligibility: 'الطلاب المتقدمين لبرامج الهندسة',
    category: 'منح تخصصية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    title: 'منحة بيلكنت للدراسات العليا',
    university: 'جامعة بيلكنت',
    coverage: 'تغطية كاملة مع راتب بحثي',
    deadline: '1 أبريل 2025',
    eligibility: 'طلاب الماجستير والدكتوراه',
    category: 'منح بحثية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 7,
    title: 'منحة الطلاب المتميزين في جامعة سابانجي',
    university: 'جامعة سابانجي',
    coverage: 'تغطية 25-100% من الرسوم الدراسية',
    deadline: '30 مايو 2025',
    eligibility: 'بناءً على اختبارات القبول',
    category: 'منح تنافسية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 8,
    title: 'منحة مدينة إسطنبول للطلاب الدوليين',
    university: 'جامعة إسطنبول',
    coverage: 'تغطية 50% من الرسوم الدراسية',
    deadline: '15 يوليو 2025',
    eligibility: 'الطلاب القادمين من الدول النامية',
    category: 'منح إقليمية',
    location: 'تركيا',
    image: 'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3'
  }
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships);

  // الفئات المتاحة للمنح
  const categories = [...new Set(scholarships.map(s => s.category))];

  useEffect(() => {
    let filtered = scholarships;
    
    // تطبيق البحث النصي
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // تطبيق فلتر الفئة
    if (selectedCategory) {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }
    
    setFilteredScholarships(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle 
          title="المنح الدراسية" 
          subtitle="استكشف المنح الدراسية المتاحة في أفضل الجامعات"
        />
        
        {/* قسم البحث */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <Input 
              placeholder="ابحث عن منحة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select 
              className="px-4 py-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">جميع الفئات</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button 
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              إعادة ضبط
            </Button>
          </div>
        </div>

        {/* عدد النتائج */}
        <div className="mb-6">
          <p className="text-unlimited-gray">
            تم العثور على <span className="font-semibold text-unlimited-blue">{filteredScholarships.length}</span> منحة دراسية
          </p>
        </div>

        {/* قائمة المنح */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={scholarship.image}
                    alt={scholarship.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge className="mb-2 bg-unlimited-blue hover:bg-unlimited-dark-blue">{scholarship.category}</Badge>
                  <h3 className="font-bold text-xl mb-1">{scholarship.title}</h3>
                  <p className="text-unlimited-gray">{scholarship.university}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-unlimited-gray text-sm">التغطية:</p>
                      <p className="font-medium">{scholarship.coverage}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray text-sm">الموعد النهائي:</p>
                      <p className="font-medium text-unlimited-blue">{scholarship.deadline}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-unlimited-gray text-sm">المؤهلات:</p>
                    <p>{scholarship.eligibility}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to="/contact">
                      تقديم طلب <ArrowRight className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على منح تطابق بحثك</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
            >
              إعادة ضبط البحث
            </Button>
          </div>
        )}
        
        {/* قسم الاستشارة */}
        <div className="mt-16 bg-unlimited-blue/10 p-8 rounded-lg">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">هل تحتاج إلى مساعدة في اختيار المنحة المناسبة؟</h2>
            <p className="text-unlimited-gray mb-6">
              فريقنا من المستشارين التعليميين جاهز لمساعدتك في اختيار المنحة الأنسب لك والتقديم عليها بنجاح.
            </p>
            <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
              <Link to="/contact">احصل على استشارة مجانية</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Scholarships;
