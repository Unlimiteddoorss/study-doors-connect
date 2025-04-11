
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Globe, Info, MapPin, Search, School } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// البيانات التجريبية للدول
const countries = [
  {
    id: 1,
    name: 'تركيا',
    englishName: 'Turkey',
    flagUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3',
    university_count: 52,
    program_count: 210,
    description: 'تعد تركيا من الوجهات الدراسية الرائدة في المنطقة، وتجمع بين التعليم الأكاديمي المتميز والثقافة الغنية والموقع الاستراتيجي بين أوروبا وآسيا.',
    ranking: 'تضم 7 جامعات من أفضل 500 جامعة عالمياً',
    tuitionRange: '$2,500 - $15,000 سنوياً',
    livingCosts: '$400 - $800 شهرياً',
    languages: ['التركية', 'الإنجليزية'],
    visaInfo: 'تأشيرة طالب لمدة عام قابلة للتجديد',
    scholarship: 'متاحة للطلبة المتفوقين (تصل إلى 100%)'
  },
  {
    id: 2,
    name: 'المجر',
    englishName: 'Hungary',
    flagUrl: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3',
    university_count: 28,
    program_count: 125,
    description: 'توفر المجر تعليماً عالي الجودة بتكاليف معقولة ومعترف به دولياً. الدراسة في المجر تعني الحصول على شهادة معتمدة أوروبياً وفرصة للعيش في قلب أوروبا.',
    ranking: 'تضم 5 جامعات من أفضل 800 جامعة عالمياً',
    tuitionRange: '$3,000 - $12,000 سنوياً',
    livingCosts: '$450 - $700 شهرياً',
    languages: ['المجرية', 'الإنجليزية'],
    visaInfo: 'تأشيرة طالب لمدة الدراسة، مع إمكانية العمل بدوام جزئي',
    scholarship: 'برنامج Stipendium Hungaricum للمنح الدراسية'
  },
  {
    id: 3,
    name: 'ماليزيا',
    englishName: 'Malaysia',
    flagUrl: 'https://images.unsplash.com/photo-1595932832926-5e518be93106?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
    university_count: 35,
    program_count: 180,
    description: 'تعتبر ماليزيا وجهة دراسية مثالية للطلاب الدوليين، حيث توفر تعليماً عالي الجودة بتكاليف معقولة، في بيئة متعددة الثقافات ومتطورة تكنولوجياً.',
    ranking: 'تضم 5 جامعات من أفضل 350 جامعة عالمياً',
    tuitionRange: '$3,500 - $10,000 سنوياً',
    livingCosts: '$350 - $600 شهرياً',
    languages: ['الملايو', 'الإنجليزية'],
    visaInfo: 'تأشيرة طالب لمدة الدراسة مع تجديد سنوي',
    scholarship: 'منح حكومية وجامعية متاحة'
  },
  {
    id: 4,
    name: 'الإمارات',
    englishName: 'United Arab Emirates',
    flagUrl: 'https://images.unsplash.com/photo-1547658386-3b873269badb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    university_count: 30,
    program_count: 150,
    description: 'تقدم الإمارات العربية المتحدة تعليماً ذو مستوى عالمي مع عدة فروع لجامعات عالمية مرموقة، في بيئة عربية متطورة وآمنة مع فرص وظيفية واعدة بعد التخرج.',
    ranking: 'تضم 3 جامعات من أفضل 400 جامعة عالمياً',
    tuitionRange: '$12,000 - $25,000 سنوياً',
    livingCosts: '$800 - $1,500 شهرياً',
    languages: ['العربية', 'الإنجليزية'],
    visaInfo: 'تأشيرة طالب مع إمكانية العمل بدوام جزئي خلال الدراسة',
    scholarship: 'منح تنافسية محدودة للطلبة المتفوقين'
  },
  {
    id: 5,
    name: 'جورجيا',
    englishName: 'Georgia',
    flagUrl: 'https://images.unsplash.com/photo-1565008576549-57569a69ba69?q=80&w=2889&auto=format&fit=crop&ixlib=rb-4.0.3',
    university_count: 20,
    program_count: 95,
    description: 'توفر جورجيا بيئة تعليمية متميزة بتكاليف منخفضة، مع سهولة في الحصول على تأشيرات الدراسة والإقامة، وتتميز بموقعها الاستراتيجي بين أوروبا وآسيا.',
    ranking: 'جامعة تبليسي الحكومية من أفضل 1000 جامعة عالمياً',
    tuitionRange: '$2,000 - $7,000 سنوياً',
    livingCosts: '$300 - $500 شهرياً',
    languages: ['الجورجية', 'الإنجليزية', 'الروسية'],
    visaInfo: 'إعفاء من تأشيرة الدخول للعديد من الجنسيات لمدة 365 يوماً',
    scholarship: 'منح دراسية متاحة للطلبة المتفوقين'
  },
  {
    id: 6,
    name: 'أذربيجان',
    englishName: 'Azerbaijan',
    flagUrl: 'https://images.unsplash.com/photo-1600493504591-fb7511a58c15?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3',
    university_count: 15,
    program_count: 80,
    description: 'تعتبر أذربيجان وجهة دراسية ناشئة تقدم برامج دراسية معترف بها عالمياً بتكاليف معقولة، وخاصة في مجالات الطب والهندسة والعلوم التطبيقية.',
    ranking: 'جامعة باكو الحكومية من أفضل 800 جامعة عالمياً',
    tuitionRange: '$2,500 - $8,000 سنوياً',
    livingCosts: '$350 - $600 شهرياً',
    languages: ['الأذرية', 'الإنجليزية', 'الروسية'],
    visaInfo: 'تأشيرة طالب لمدة عام قابلة للتجديد',
    scholarship: 'منح حكومية محدودة للطلبة المتميزين'
  }
];

// البيانات التجريبية للجامعات الشهيرة
const featuredUniversities = [
  {
    id: 1,
    name: 'جامعة إسطنبول',
    country: 'تركيا',
    logo: 'https://images.unsplash.com/photo-1599687266725-0d0e472c3c7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    programs: 45,
    ranking: '#350 عالمياً',
    fees: 'من $3,500 سنوياً',
    acceptance: '75%'
  },
  {
    id: 2,
    name: 'جامعة بودابست للتكنولوجيا',
    country: 'المجر',
    logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    programs: 30,
    ranking: '#420 عالمياً',
    fees: 'من $4,200 سنوياً',
    acceptance: '65%'
  },
  {
    id: 3,
    name: 'الجامعة المالايوية',
    country: 'ماليزيا',
    logo: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
    programs: 38,
    ranking: '#290 عالمياً',
    fees: 'من $5,000 سنوياً',
    acceptance: '60%'
  },
  {
    id: 4,
    name: 'جامعة الإمارات',
    country: 'الإمارات',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    programs: 42,
    ranking: '#320 عالمياً',
    fees: 'من $12,000 سنوياً',
    acceptance: '50%'
  }
];

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('countries');

  const filteredCountries = countries.filter(country =>
    country.name.includes(searchTerm) || country.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredUniversities = featuredUniversities.filter(university =>
    university.name.includes(searchTerm) || university.country.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="الدول والجامعات"
          subtitle="اكتشف أفضل الوجهات الدراسية والجامعات المميزة حول العالم"
        />

        {/* بحث */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="ابحث عن دولة أو جامعة..."
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* تبويبات عرض */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('countries')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'countries'
                  ? 'bg-unlimited-blue text-white'
                  : 'bg-white text-unlimited-gray'
              } rounded-r-md border`}
            >
              الدول
            </button>
            <button
              onClick={() => setActiveTab('universities')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'universities'
                  ? 'bg-unlimited-blue text-white'
                  : 'bg-white text-unlimited-gray'
              } rounded-l-md border-t border-b border-l`}
            >
              الجامعات
            </button>
          </div>
        </div>

        {/* عرض الدول */}
        {activeTab === 'countries' && (
          <>
            {/* عرض البطاقات للدول */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredCountries.map((country) => (
                <Link to={`/countries/${country.id}`} key={country.id}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={country.flagUrl}
                        alt={country.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">{country.name}</h3>
                        <span className="text-unlimited-gray text-sm">({country.englishName})</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-unlimited-gray mb-4 line-clamp-2">{country.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <School className="h-3 w-3" />
                          {country.university_count} جامعة
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {country.program_count} برنامج
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-unlimited-gray block">الرسوم الدراسية:</span>
                          <span>{country.tuitionRange}</span>
                        </div>
                        <div>
                          <span className="text-unlimited-gray block">تكاليف المعيشة:</span>
                          <span>{country.livingCosts}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        اكتشف المزيد
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredCountries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على دول تطابق بحثك</p>
                <Button onClick={() => setSearchTerm('')}>إعادة ضبط البحث</Button>
              </div>
            )}
          </>
        )}

        {/* عرض الجامعات */}
        {activeTab === 'universities' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredUniversities.map((university) => (
                <Link to={`/universities/${university.id}`} key={university.id}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={university.logo}
                        alt={university.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <h3 className="text-xl font-bold">{university.name}</h3>
                      <div className="flex items-center text-unlimited-gray">
                        <MapPin className="h-4 w-4 ml-1" />
                        <span className="text-sm">{university.country}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-unlimited-gray block">البرامج:</span>
                          <span>{university.programs} برنامج</span>
                        </div>
                        <div>
                          <span className="text-unlimited-gray block">التصنيف:</span>
                          <span>{university.ranking}</span>
                        </div>
                        <div>
                          <span className="text-unlimited-gray block">الرسوم:</span>
                          <span>{university.fees}</span>
                        </div>
                        <div>
                          <span className="text-unlimited-gray block">معدل القبول:</span>
                          <span>{university.acceptance}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        عرض البرامج
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredUniversities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على جامعات تطابق بحثك</p>
                <Button onClick={() => setSearchTerm('')}>إعادة ضبط البحث</Button>
              </div>
            )}
          </>
        )}
        
        {/* معلومات مقارنة الدول */}
        {activeTab === 'countries' && filteredCountries.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">مقارنة الدول الدراسية</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الدولة</TableHead>
                    <TableHead>تصنيف الجامعات</TableHead>
                    <TableHead>متوسط الرسوم</TableHead>
                    <TableHead>تكلفة المعيشة</TableHead>
                    <TableHead>التأشيرة</TableHead>
                    <TableHead>المنح الدراسية</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCountries.map((country) => (
                    <TableRow key={country.id}>
                      <TableCell className="font-medium">{country.name}</TableCell>
                      <TableCell>{country.ranking}</TableCell>
                      <TableCell>{country.tuitionRange}</TableCell>
                      <TableCell>{country.livingCosts}</TableCell>
                      <TableCell>{country.visaInfo}</TableCell>
                      <TableCell>{country.scholarship}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-8 bg-unlimited-blue/5 p-6 rounded-lg border border-unlimited-blue/20">
              <div className="flex items-start gap-3">
                <Info className="text-unlimited-blue mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-unlimited-blue mb-2">معلومات مهمة حول الدراسة في الخارج</h4>
                  <p className="text-unlimited-gray">تختلف متطلبات التأشيرة والرسوم والمنح الدراسية من دولة لأخرى. للحصول على الاستشارة المناسبة لحالتك، يرجى التواصل مع مستشارينا التعليميين.</p>
                  <div className="mt-4">
                    <Button asChild size="sm">
                      <Link to="/contact">
                        تحدث مع مستشار
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default Countries;
