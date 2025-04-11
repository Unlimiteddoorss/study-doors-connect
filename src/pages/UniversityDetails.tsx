
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Globe, School, Calendar, Building, GraduationCap } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { turkishUniversities, dummyPrograms } from '@/data/programsData';
import ProgramCard from '@/components/programs/ProgramCard';
import { useToast } from '@/hooks/use-toast';

// ترجمة أسماء الدول إلى العربية
const countryTranslations: Record<string, string> = {
  'Turkey': 'تركيا',
  'Istanbul': 'إسطنبول',
  'Ankara': 'أنقرة',
  'Antalya': 'أنطاليا',
  'Alanya': 'ألانيا',
  'Private': 'خاصة',
  'Public': 'حكومية',
};

const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [university, setUniversity] = useState<any>(null);
  const [universityPrograms, setUniversityPrograms] = useState<any[]>([]);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    program: '',
    message: ''
  });
  
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

  // ترجمة الكلمات والمواقع إلى العربية
  const translate = (text: string): string => {
    return countryTranslations[text] || text;
  };

  const handleApplyNow = () => {
    setIsApplying(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // في تطبيق حقيقي، هنا سنرسل البيانات إلى الخادم
    toast({
      title: "تم إرسال طلبك بنجاح",
      description: "سيقوم أحد مستشارينا بالتواصل معك قريبًا",
    });
    setIsApplying(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      nationality: '',
      program: '',
      message: ''
    });
  };
  
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
                  <span>{translate(university.location)}، {translate('Turkey')}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyNow}
                className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
              >
                تواصل مع مستشار
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
                    تعد {university.name} واحدة من أفضل الجامعات في تركيا، حيث تأسست عام {university.founded} وتقع في {translate(university.location)}. 
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
                      <p>{translate(university.type)}</p>
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
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">التصنيفات والاعتمادات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">التصنيفات العالمية</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>تصنيف QS العالمي</span>
                          <Badge>700-750</Badge>
                        </li>
                        <li className="flex justify-between">
                          <span>تصنيف التايمز للتعليم العالي</span>
                          <Badge>800+</Badge>
                        </li>
                        <li className="flex justify-between">
                          <span>تصنيف شنغهاي الأكاديمي</span>
                          <Badge>800-900</Badge>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">الاعتمادات الأكاديمية</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="p-1">
                            <School className="h-4 w-4" />
                          </Badge>
                          <span>{university.accreditation}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="p-1">
                            <School className="h-4 w-4" />
                          </Badge>
                          <span>ABET (للبرامج الهندسية)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="p-1">
                            <School className="h-4 w-4" />
                          </Badge>
                          <span>ACBSP (لبرامج إدارة الأعمال)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="programs" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">البرامج الدراسية</h2>
                {/* Program Categories */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">أقسام البرامج</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-unlimited-blue">
                            <GraduationCap className="h-4 w-4" />
                          </Badge>
                          <h4 className="font-semibold">برامج البكالوريوس</h4>
                        </div>
                        <p className="text-unlimited-gray text-sm mb-2">مدة الدراسة: 4 سنوات</p>
                        <p className="text-unlimited-gray text-sm">عدد البرامج: {Math.round(university.programs * 0.6)}+</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-unlimited-blue">
                            <GraduationCap className="h-4 w-4" />
                          </Badge>
                          <h4 className="font-semibold">برامج الماجستير</h4>
                        </div>
                        <p className="text-unlimited-gray text-sm mb-2">مدة الدراسة: 2 سنة</p>
                        <p className="text-unlimited-gray text-sm">عدد البرامج: {Math.round(university.programs * 0.3)}+</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-unlimited-blue">
                            <GraduationCap className="h-4 w-4" />
                          </Badge>
                          <h4 className="font-semibold">برامج الدكتوراه</h4>
                        </div>
                        <p className="text-unlimited-gray text-sm mb-2">مدة الدراسة: 4 سنوات</p>
                        <p className="text-unlimited-gray text-sm">عدد البرامج: {Math.round(university.programs * 0.1)}+</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Programs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {universityPrograms.map((program) => (
                    <ProgramCard key={program.id} program={{
                      ...program,
                      location: program.location.replace('Turkey', translate('Turkey'))
                    }} />
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
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3">خدمات الطلاب</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="p-1">
                            <Building className="h-4 w-4" />
                          </Badge>
                          <h4 className="font-semibold">السكن الطلابي</h4>
                        </div>
                        <p className="text-unlimited-gray text-sm">
                          توفر الجامعة سكنًا طلابيًا حديثًا ومريحًا بغرف فردية ومزدوجة، مع خدمات الإنترنت والمرافق المشتركة.
                          أسعار السكن تبدأ من 200$ شهريًا.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="p-1">
                            <Globe className="h-4 w-4" />
                          </Badge>
                          <h4 className="font-semibold">خدمات الطلاب الدوليين</h4>
                        </div>
                        <p className="text-unlimited-gray text-sm">
                          مكتب متخصص لمساعدة الطلاب الدوليين في الإجراءات القانونية، والتأقلم مع البيئة الجديدة،
                          وتوفير دورات لغوية، وأنشطة ثقافية.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {!isApplying ? (
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
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">طلب استشارة</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-unlimited-gray mb-1">الاسم الكامل</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-unlimited-gray mb-1">البريد الإلكتروني</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-unlimited-gray mb-1">رقم الهاتف</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="nationality" className="block text-unlimited-gray mb-1">الجنسية</label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="program" className="block text-unlimited-gray mb-1">البرنامج المطلوب</label>
                      <select
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
                        required
                      >
                        <option value="">اختر البرنامج</option>
                        <option value="Bachelor">بكالوريوس</option>
                        <option value="Master">ماجستير</option>
                        <option value="Doctorate">دكتوراه</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-unlimited-gray mb-1">رسالتك (اختياري)</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
                      ></textarea>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsApplying(false)}
                      >
                        إلغاء
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-unlimited-blue hover:bg-unlimited-dark-blue"
                      >
                        إرسال الطلب
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">الرسوم الدراسية</h3>
                <p className="text-unlimited-gray mb-2">تبدأ الرسوم الدراسية من:</p>
                <p className="text-2xl font-bold text-unlimited-blue">{university.fees}</p>
                <p className="text-unlimited-gray text-sm mt-2">تختلف الرسوم حسب البرنامج والتخصص</p>
                
                <div className="mt-6">
                  <Button 
                    onClick={handleApplyNow}
                    className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                  >
                    استشارة مجانية
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
