
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, CircleCheck, Globe, GraduationCap, MapPin, School, Wallet } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import SectionTitle from '@/components/shared/SectionTitle';

// البيانات التجريبية للدول
const countries = [
  {
    id: 1,
    name: 'تركيا',
    englishName: 'Turkey',
    flagUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3',
    heroImage: 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6313?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    university_count: 52,
    program_count: 210,
    description: 'تعد تركيا من الوجهات الدراسية الرائدة في المنطقة، وتجمع بين التعليم الأكاديمي المتميز والثقافة الغنية والموقع الاستراتيجي بين أوروبا وآسيا. توفر الجامعات التركية تعليماً متطوراً معترفاً به دولياً مع تكاليف معيشة معقولة مقارنة بالدول الأوروبية والأمريكية.',
    ranking: 'تضم 7 جامعات من أفضل 500 جامعة عالمياً',
    tuitionRange: '$2,500 - $15,000 سنوياً',
    livingCosts: '$400 - $800 شهرياً',
    languages: ['التركية', 'الإنجليزية'],
    visaInfo: 'تأشيرة طالب لمدة عام قابلة للتجديد',
    scholarship: 'متاحة للطلبة المتفوقين (تصل إلى 100%)',
    applicationDeadline: 'الفصل الخريفي: 15 يوليو | الفصل الربيعي: 15 ديسمبر',
    admissionRequirements: [
      'شهادة الثانوية العامة بمعدل لا يقل عن 60%',
      'جواز سفر ساري المفعول',
      'شهادة إجادة اللغة (الإنجليزية أو التركية)',
      'صور شخصية حديثة',
      'خطاب دافع للدراسة'
    ],
    visaRequirements: [
      'قبول من إحدى الجامعات التركية',
      'إثبات القدرة المالية لتغطية تكاليف الدراسة والمعيشة',
      'تأمين صحي ساري المفعول',
      'حجز تذكرة الطيران'
    ],
    advantages: [
      'جودة تعليمية عالية بتكاليف معقولة',
      'تنوع ثقافي وحضاري غني',
      'قرب المسافة من الدول العربية',
      'إمكانية العمل بدوام جزئي أثناء الدراسة',
      'إمكانية الحصول على الجنسية بعد التخرج وفق شروط محددة'
    ],
    featuredCities: [
      {
        name: 'إسطنبول',
        image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3',
        description: 'المدينة الأكثر شهرة في تركيا، تجمع بين العراقة والحداثة وتضم عدداً من أفضل الجامعات في البلاد.'
      },
      {
        name: 'أنقرة',
        image: 'https://images.unsplash.com/photo-1589757400668-a6ad2ac33929?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        description: 'العاصمة التركية، تتميز بأجواء دراسية هادئة وتكاليف معيشة أقل من إسطنبول.'
      },
      {
        name: 'أزمير',
        image: 'https://images.unsplash.com/photo-1636129697039-2b291ce7bb5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        description: 'مدينة ساحلية جميلة توفر نمط حياة متوازن بين الدراسة والاستمتاع بالطبيعة.'
      }
    ],
    universities: [
      {
        id: 101,
        name: 'جامعة إسطنبول',
        image: 'https://images.unsplash.com/photo-1599687266725-0d0e472c3c7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        ranking: '#350 عالمياً',
        programs: 45,
        location: 'إسطنبول',
        tuition: 'من $3,500 سنوياً'
      },
      {
        id: 102,
        name: 'جامعة أنقرة',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
        ranking: '#420 عالمياً',
        programs: 38,
        location: 'أنقرة',
        tuition: 'من $3,000 سنوياً'
      },
      {
        id: 103,
        name: 'جامعة البوسفور',
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        ranking: '#320 عالمياً',
        programs: 50,
        location: 'إسطنبول',
        tuition: 'من $4,200 سنوياً'
      },
      {
        id: 104,
        name: 'جامعة أوزيجين',
        image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
        ranking: '#580 عالمياً',
        programs: 35,
        location: 'إسطنبول',
        tuition: 'من $3,800 سنوياً'
      },
    ],
    popularPrograms: [
      {
        id: 201,
        title: 'بكالوريوس هندسة الحاسوب',
        university: 'جامعة إسطنبول',
        duration: '4 سنوات',
        language: 'الإنجليزية',
        fee: '$4,500 / سنة'
      },
      {
        id: 202,
        title: 'ماجستير إدارة الأعمال',
        university: 'جامعة البوسفور',
        duration: 'سنتان',
        language: 'الإنجليزية',
        fee: '$5,200 / سنة'
      },
      {
        id: 203,
        title: 'بكالوريوس الطب البشري',
        university: 'جامعة أوزيجين',
        duration: '6 سنوات',
        language: 'الإنجليزية',
        fee: '$12,000 / سنة'
      },
      {
        id: 204,
        title: 'دكتوراه العلاقات الدولية',
        university: 'جامعة أنقرة',
        duration: '3-4 سنوات',
        language: 'الإنجليزية / التركية',
        fee: '$3,800 / سنة'
      }
    ]
  },
  // يمكن إضافة باقي الدول هنا بنفس الهيكلية
];

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب البيانات من API
    const fetchCountry = () => {
      setLoading(true);
      setTimeout(() => {
        const foundCountry = countries.find(c => c.id === Number(id));
        setCountry(foundCountry);
        setLoading(false);
      }, 500);
    };

    fetchCountry();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-unlimited-blue"></div>
        </div>
      </MainLayout>
    );
  }

  if (!country) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">لم يتم العثور على الدولة</h2>
          <p className="mb-6 text-unlimited-gray">يبدو أن الدولة التي تبحث عنها غير موجودة</p>
          <Button asChild>
            <Link to="/countries">العودة إلى صفحة الدول</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img 
          src={country.heroImage} 
          alt={country.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center">
          <div className="container mx-auto px-4 text-white">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <img 
                src={country.flagUrl}
                alt={`علم ${country.name}`}
                className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-center md:text-right">
                <h1 className="text-4xl font-bold mb-2">{country.name}</h1>
                <p className="text-xl opacity-90">{country.englishName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <School className="h-8 w-8 mx-auto mb-2 text-unlimited-blue" />
            <p className="text-unlimited-gray">عدد الجامعات</p>
            <p className="text-2xl font-bold">{country.university_count}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <GraduationCap className="h-8 w-8 mx-auto mb-2 text-unlimited-blue" />
            <p className="text-unlimited-gray">البرامج الدراسية</p>
            <p className="text-2xl font-bold">{country.program_count}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-unlimited-blue" />
            <p className="text-unlimited-gray">لغات الدراسة</p>
            <p className="text-lg font-bold">{country.languages.join(', ')}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <Wallet className="h-8 w-8 mx-auto mb-2 text-unlimited-blue" />
            <p className="text-unlimited-gray">متوسط الرسوم</p>
            <p className="text-lg font-bold">{country.tuitionRange}</p>
          </div>
        </div>

        {/* الوصف العام */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">نبذة عن الدراسة في {country.name}</h2>
          <p className="text-unlimited-gray leading-7">{country.description}</p>
        </div>

        {/* مميزات الدراسة */}
        <div className="bg-unlimited-blue/5 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-bold mb-4">مميزات الدراسة في {country.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {country.advantages.map((advantage: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>{advantage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs للمعلومات التفصيلية */}
        <Tabs defaultValue="universities" className="mb-12">
          <TabsList className="w-full grid grid-cols-1 sm:grid-cols-4">
            <TabsTrigger value="universities">الجامعات</TabsTrigger>
            <TabsTrigger value="programs">البرامج الشائعة</TabsTrigger>
            <TabsTrigger value="cities">أشهر المدن</TabsTrigger>
            <TabsTrigger value="requirements">متطلبات القبول</TabsTrigger>
          </TabsList>
          
          <TabsContent value="universities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {country.universities.map((university: any) => (
                <Card key={university.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={university.image}
                      alt={university.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="font-bold">{university.name}</h3>
                    <div className="flex items-center text-unlimited-gray text-sm">
                      <MapPin className="h-4 w-4 ml-1" />
                      {university.location}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-unlimited-gray block">التصنيف:</span>
                        <span>{university.ranking}</span>
                      </div>
                      <div>
                        <span className="text-unlimited-gray block">البرامج:</span>
                        <span>{university.programs}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-unlimited-gray block">الرسوم:</span>
                        <span>{university.tuition}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/universities/${university.id}`}>
                        تفاصيل الجامعة
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to="/universities" className="gap-2">
                  عرض جميع الجامعات
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="programs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {country.popularPrograms.map((program: any) => (
                <Card key={program.id} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="p-4 md:p-6 flex-grow">
                    <h3 className="font-bold mb-2">{program.title}</h3>
                    <div className="text-unlimited-gray mb-2">{program.university}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-unlimited-gray block">المدة:</span>
                        <span>{program.duration}</span>
                      </div>
                      <div>
                        <span className="text-unlimited-gray block">اللغة:</span>
                        <span>{program.language}</span>
                      </div>
                      <div>
                        <span className="text-unlimited-gray block">الرسوم:</span>
                        <span>{program.fee}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 md:border-r flex items-center justify-center">
                    <Button asChild>
                      <Link to={`/programs/${program.id}`}>
                        التفاصيل
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to={`/programs?country=${country.englishName}`} className="gap-2">
                  عرض جميع البرامج
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="cities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {country.featuredCities.map((city: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <h3 className="font-bold">{city.name}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-unlimited-gray">{city.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="requirements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 ml-2" />
                  متطلبات القبول
                </h3>
                <ul className="space-y-3">
                  {country.admissionRequirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CircleCheck className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-unlimited-gray">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-unlimited-blue" />
                    <span className="font-bold">مواعيد التقديم:</span>
                  </div>
                  <p>{country.applicationDeadline}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Globe className="h-5 w-5 ml-2" />
                  متطلبات التأشيرة الدراسية
                </h3>
                <ul className="space-y-3">
                  {country.visaRequirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CircleCheck className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Call to Action */}
        <div className="bg-unlimited-blue text-white p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">هل أنت مستعد للدراسة في {country.name}؟</h2>
              <p className="mb-6">فريق مستشارينا التعليميين جاهز لمساعدتك في كل خطوة من رحلتك الدراسية. تواصل معنا اليوم للحصول على الإرشاد المناسب.</p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100 font-bold">
                  <Link to="/apply">
                    قدم طلبك الآن
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link to="/contact">
                    تحدث مع مستشار
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="طلاب دوليين"
                className="rounded-lg max-h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CountryDetails;
