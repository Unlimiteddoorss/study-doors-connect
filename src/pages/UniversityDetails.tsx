
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Globe, School, Calendar, Building, GraduationCap } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { turkishUniversities, dummyPrograms } from '@/data/programsData';
import ProgramCard from '@/components/programs/ProgramCard';

const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [university, setUniversity] = useState<any>(null);
  const [universityPrograms, setUniversityPrograms] = useState<any[]>([]);
  
  useEffect(() => {
    if (id) {
      const uni = turkishUniversities.find(u => u.id === parseInt(id));
      setUniversity(uni);
      
      // Filter programs by university name
      if (uni) {
        const programs = dummyPrograms.filter(
          p => p.university.includes(uni.name) || 
               // Fallback to match by location if exact university name isn't found
               (p.location.includes('Turkey') && Math.random() > 0.7)
        );
        setUniversityPrograms(programs.length > 0 ? programs : dummyPrograms.slice(0, 3));
      }
    }
  }, [id]);
  
  if (!university) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">جاري تحميل بيانات الجامعة...</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* University Header */}
        <div className="relative">
          <div className="h-64 md:h-80 overflow-hidden rounded-lg">
            <img 
              src={university.image} 
              alt={university.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto -mt-24 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">{university.name}</h1>
                <div className="flex items-center text-unlimited-gray mt-2">
                  <MapPin className="h-4 w-4 ml-2" />
                  <span>{university.location}, Turkey</span>
                </div>
              </div>
              
              <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                <Link to="/contact" className="flex items-center gap-2">
                  تواصل مع مستشار <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* University Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">عن الجامعة</TabsTrigger>
                <TabsTrigger value="programs">البرامج الدراسية</TabsTrigger>
                <TabsTrigger value="facilities">المرافق</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">نبذة عن الجامعة</h2>
                  <p className="text-unlimited-gray leading-relaxed">
                    تعد {university.name} واحدة من أفضل الجامعات في تركيا، حيث تأسست عام {university.founded} وتقع في {university.location}. 
                    توفر الجامعة بيئة أكاديمية متميزة وبنية تحتية حديثة تدعم أكثر من {university.programs} برنامجاً دراسياً في مختلف التخصصات.
                  </p>
                  <p className="text-unlimited-gray leading-relaxed mt-4">
                    تتميز الجامعة بمناهج دراسية متطورة تجمع بين الجانب النظري والعملي، وتضم نخبة من أعضاء هيئة التدريس ذوي الخبرة والكفاءة العالية.
                    كما تحرص الجامعة على توفير بيئة تعليمية محفزة للإبداع والابتكار، وتشجع على البحث العلمي والمشاركة في المؤتمرات والندوات العلمية.
                  </p>
                  <p className="text-unlimited-gray leading-relaxed mt-4">
                    تتمتع شهادات {university.name} باعتراف دولي واسع النطاق، وتعمل الجامعة على بناء شراكات استراتيجية مع جامعات ومؤسسات علمية 
                    رائدة حول العالم، مما يتيح لطلابها فرصاً للتبادل الطلابي والتدريب العملي في أفضل المؤسسات العالمية.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Calendar className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">سنة التأسيس</h3>
                      <p>{university.founded}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Building className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">نوع الجامعة</h3>
                      <p>{university.type}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <GraduationCap className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">عدد البرامج</h3>
                      <p>{university.programs}+</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Globe className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">الموقع الإلكتروني</h3>
                      <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-unlimited-blue hover:underline">
                        زيارة الموقع
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="programs" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">البرامج الدراسية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {universityPrograms.map((program) => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to="/programs" className="flex items-center gap-2">
                      عرض جميع البرامج <ArrowRight className="h-4 w-4 mr-1" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="facilities" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">مرافق الجامعة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">المرافق الأكاديمية</h3>
                    <ul className="list-disc list-inside space-y-2 text-unlimited-gray">
                      <li>مكتبة حديثة تضم أكثر من 100,000 كتاب ومراجع علمية</li>
                      <li>مختبرات حاسوب متطورة</li>
                      <li>مختبرات علمية مجهزة بأحدث التقنيات</li>
                      <li>قاعات دراسية ذكية</li>
                      <li>مراكز بحثية متخصصة</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">المرافق الطلابية</h3>
                    <ul className="list-disc list-inside space-y-2 text-unlimited-gray">
                      <li>سكن طلابي آمن ومريح</li>
                      <li>مركز رياضي متكامل</li>
                      <li>مطاعم وكافيتريات متنوعة</li>
                      <li>مركز صحي</li>
                      <li>أماكن للأنشطة الثقافية والترفيهية</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3">الأنشطة الطلابية</h3>
                  <p className="text-unlimited-gray leading-relaxed">
                    تشجع {university.name} طلابها على المشاركة في مجموعة متنوعة من الأنشطة اللامنهجية من خلال النوادي والجمعيات الطلابية، 
                    والتي تغطي مجالات متعددة مثل الفنون، والرياضة، والعمل التطوعي، والأنشطة الثقافية والاجتماعية. 
                    كما تنظم الجامعة فعاليات وورش عمل ومؤتمرات دورية لتعزيز المهارات والخبرات العملية للطلاب.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">المميزات الرئيسية</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <School className="h-4 w-4" />
                    </div>
                    <span>اعتماد أكاديمي محلي ودولي ({university.accreditation})</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span>برامج معتمدة باللغتين الإنجليزية والتركية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <Globe className="h-4 w-4" />
                    </div>
                    <span>شراكات دولية مع أكثر من 50 جامعة عالمية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <Building className="h-4 w-4" />
                    </div>
                    <span>بنية تحتية حديثة ومتطورة</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">الرسوم الدراسية</h3>
                <p className="text-unlimited-gray mb-2">تبدأ الرسوم الدراسية من:</p>
                <p className="text-2xl font-bold text-unlimited-blue">{university.fees}</p>
                <p className="text-unlimited-gray text-sm mt-2">تختلف الرسوم حسب البرنامج والتخصص</p>
                
                <div className="mt-6">
                  <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to="/contact">استشارة مجانية</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">فرص المنح</h3>
                <p className="text-unlimited-gray mb-4">توفر الجامعة منح دراسية متنوعة للطلاب المتفوقين تصل إلى:</p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>منحة التفوق الأكاديمي</span>
                    <span className="font-semibold">50%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>منحة المهارات الخاصة</span>
                    <span className="font-semibold">25%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>منحة الطلاب الدوليين</span>
                    <span className="font-semibold">30%</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/scholarships">تفاصيل المنح</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UniversityDetails;
