import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import WorldMap from '@/components/countries/WorldMap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { availableCountries } from '@/data/programsData';

// ترجمة أسماء الدول إلى العربية
const countryTranslations: Record<string, string> = {
  'Australia': 'أستراليا',
  'Azerbaijan': 'أذربيجان',
  'Bosnia and Herzegovina': 'البوسنة والهرسك',
  'Czech Republic': 'جمهورية التشيك',
  'Egypt': 'مصر',
  'Georgia': 'جورجيا',
  'Germany': 'ألمانيا',
  'Hungary': 'المجر',
  'Ireland': 'أيرلندا',
  'Kosovo': 'كوسوفو',
  'Macedonia': 'مقدونيا',
  'Malaysia': 'ماليزيا',
  'Malta': 'مالطا',
  'Montenegro': 'الجبل الأسود',
  'Northern Cyprus': 'شمال قبرص',
  'Poland': 'بولندا',
  'Scotland': 'اسكتلندا',
  'Serbia': 'صربيا',
  'Spain': 'إسبانيا',
  'Turkey': 'تركيا',
  'United Kingdom': 'المملكة المتحدة',
  'United States': 'الولايات المتحدة الأمريكية',
  'United Arab Emirates': 'الإمارات العربية المتحدة'
};

// صور للدول
const countryImages: { [key: string]: string } = {
  'Turkey': 'https://images.unsplash.com/photo-1589561454668-97bd6c606f78?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
  'United Kingdom': 'https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  'Germany': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  'United States': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3',
  'Malaysia': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3',
  'Ireland': 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
  'Spain': 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  'Australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3',
  'Egypt': 'https://images.unsplash.com/photo-1568322445389-f64ac2515022?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
  'Azerbaijan': 'https://images.unsplash.com/photo-1633903998646-f610459bc17d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
};

// معلومات الدول
const countryInfo: { [key: string]: { universities: number, programs: number, description: string, languages: string[] } } = {
  'Turkey': {
    universities: 35,
    programs: 250,
    description: 'تتميز تركيا بموقعها الاستراتيجي بين أوروبا وآسيا، وتوفر تعليماً عالي الجودة بأسعار معقولة. الجامعات التركية معترف بها دولياً وتقدم برامج دراسية باللغات التركية والإنجليزية والعربية.',
    languages: ['التركية', 'الإنجليزية', 'العربية']
  },
  'United Kingdom': {
    universities: 15,
    programs: 120,
    description: 'تتمتع المملكة المتحدة بسمعة عالمية في مجال التعليم العالي، وتضم بعضاً من أقدم وأعرق الجامعات في العالم. توفر المملكة المتحدة بيئة أكاديمية متميزة وفرص تعليمية متنوعة.',
    languages: ['الإنجليزية']
  },
  'Germany': {
    universities: 12,
    programs: 85,
    description: 'تُعد ألمانيا وجهة مثالية للطلاب الدوليين بفضل جودة التعليم العالية والرسوم الدراسية المنخفضة أو المجانية في الجامعات الحكومية. تتميز بتخصصاتها التقنية والهندسية المتقدمة.',
    languages: ['الألمانية', 'الإنجليزية']
  },
  'United States': {
    universities: 8,
    programs: 65,
    description: 'تقدم الولايات المتحدة تجربة تعليمية فريدة مع أكثر من 4,000 جامعة وكلية. تُعرف بمرونتها الأكاديمية ونظامها التعليمي المتقدم، وتوفر العديد من فرص المنح والبحث العلمي.',
    languages: ['الإنجليزية']
  },
  'Malaysia': {
    universities: 10,
    programs: 70,
    description: 'تُعتبر ماليزيا من أفضل الوجهات الدراسية في جنوب شرق آسيا، وتوفر بيئة متعددة الثقافات ورسوم دراسية معقولة. تتميز بجامعاتها ذات التصنيفات العالمية وجودة التعليم العالية.',
    languages: ['الإنجليزية', 'الماليزية']
  },
};

// الدول الأكثر شعبية
const popularCountries = ['Turkey', 'United Kingdom', 'Germany', 'United States', 'Malaysia'];

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(availableCountries);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCountries(
        availableCountries.filter(
          country =>
            country.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCountries(availableCountries);
    }
  }, [searchTerm]);

  const getCountryImage = (country: string) => {
    return countryImages[country] || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.0.3';
  };

  const getCountryInfo = (country: string) => {
    return countryInfo[country] || { 
      universities: Math.floor(Math.random() * 10) + 3,
      programs: Math.floor(Math.random() * 50) + 10,
      description: 'توفر هذه الدولة فرصًا تعليمية متميزة للطلاب الدوليين مع مجموعة متنوعة من البرامج الأكاديمية.',
      languages: ['الإنجليزية']
    };
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // البحث تم تنفيذه في useEffect أعلاه
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="الدول الدراسية"
          subtitle="استكشف أفضل الوجهات الدراسية حول العالم واختر الدولة المناسبة لطموحاتك التعليمية"
        />

        {/* قسم البحث */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن دولة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
          </form>
        </div>

        {/* خريطة العالم التفاعلية */}
        <div className="bg-white rounded-lg shadow-sm border mb-12">
          <WorldMap />
        </div>

        {/* الدول الشائعة */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">الدول الأكثر شعبية للدراسة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCountries.map((country, index) => {
              const info = getCountryInfo(country);
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getCountryImage(country)} 
                      alt={country} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 ml-1" />
                          <h3 className="font-bold text-xl">{countryTranslations[country]}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-unlimited-gray text-sm">الجامعات</p>
                        <p className="font-semibold">{info.universities}+</p>
                      </div>
                      <div>
                        <p className="text-unlimited-gray text-sm">البرامج الدراسية</p>
                        <p className="font-semibold">{info.programs}+</p>
                      </div>
                      <div>
                        <p className="text-unlimited-gray text-sm">لغات الدراسة</p>
                        <p className="font-semibold">{info.languages.join(', ')}</p>
                      </div>
                    </div>
                    
                    <p className="text-unlimited-gray line-clamp-3">{info.description}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                      <Link to={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`}>عرض التفاصيل</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* كل الدول */}
        <div>
          <h2 className="text-2xl font-bold mb-6">جميع الدول ({filteredCountries.length})</h2>

          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCountries.map((country, index) => (
                <Link 
                  to={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`} 
                  key={index}
                  className="block"
                >
                  <Card className="overflow-hidden h-full hover:border-unlimited-blue hover:shadow-md transition-all">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-unlimited-blue/10 rounded-full flex items-center justify-center text-unlimited-blue">
                        <Globe className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium">{countryTranslations[country]}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على دول تطابق بحثك</p>
              <Button onClick={() => setSearchTerm("")} className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                إعادة ضبط البحث
              </Button>
            </div>
          )}
        </div>

        {/* قسم الاستشارة */}
        <div className="mt-16 bg-unlimited-blue/10 p-8 rounded-lg">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">غير متأكد من الوجهة الدراسية المناسبة لك؟</h2>
            <p className="text-unlimited-gray mb-6">
              دعنا نساعدك في اختيار الدولة والجامعة المثالية لأهدافك الأكاديمية والمهنية. مستشارونا التعليميون جاهزون لتقديم النصائح المخصصة لاحتياجاتك.
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

export default Countries;
