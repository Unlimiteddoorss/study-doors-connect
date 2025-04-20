
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Calendar, Clock, Book, Languages, Award, GraduationCap, Globe, School } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { dummyPrograms } from '@/data/programsData';
import { Program } from '@/components/programs/ProgramCard';
import { useToast } from '@/hooks/use-toast';

// ترجمة أسماء الدول إلى العربية
const countryTranslations: Record<string, string> = {
  'Turkey': 'تركيا',
  'Egypt': 'مصر',
  'United Arab Emirates': 'الإمارات العربية المتحدة',
  'Hungary': 'المجر',
  'Istanbul': 'إسطنبول',
  'Ankara': 'أنقرة',
  'Cairo': 'القاهرة',
  'Abu Dhabi': 'أبوظبي',
  'Budapest': 'بودابست',
};

const ProgramDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [program, setProgram] = useState<Program | null>(null);
  const [relatedPrograms, setRelatedPrograms] = useState<Program[]>([]);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    message: ''
  });
  
  useEffect(() => {
    if (id) {
      // البحث عن البرنامج في قاعدة البيانات
      const foundProgram = dummyPrograms.find(p => p.id === parseInt(id));
      setProgram(foundProgram || null);
      
      // البحث عن برامج مشابهة
      if (foundProgram) {
        // تصفية البرامج المشابهة بناءً على الجامعة أو البلد أو الشهادة
        const similar = dummyPrograms.filter(p => 
          p.id !== foundProgram.id && 
          (p.university === foundProgram.university || 
           p.location === foundProgram.location || 
           (p.title.includes('بكالوريوس') && foundProgram.title.includes('بكالوريوس')) ||
           (p.title.includes('ماجستير') && foundProgram.title.includes('ماجستير')) ||
           (p.title.includes('دكتوراه') && foundProgram.title.includes('دكتوراه')))
        ).slice(0, 3);
        
        setRelatedPrograms(similar);
      }
    }
  }, [id]);

  // ترجمة الموقع من الإنجليزية إلى العربية
  const translateLocation = (location: string): string => {
    // استخراج المدينة والبلد
    const parts = location.split('،');
    if (parts.length === 2) {
      const country = parts[0].trim();
      const city = parts[1].trim();
      
      const translatedCountry = countryTranslations[country] || country;
      const translatedCity = countryTranslations[city] || city;
      
      return `${translatedCountry}، ${translatedCity}`;
    }
    return countryTranslations[location] || location;
  };

  const handleApplyNow = () => {
    setIsApplying(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      message: ''
    });
  };

  if (!program) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">جاري تحميل بيانات البرنامج...</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Program Header */}
        <div className="relative">
          <div className="h-64 md:h-80 overflow-hidden rounded-lg">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto -mt-24 relative z-10">
            <div className="flex flex-wrap gap-2 mb-3">
              {program.isFeatured && (
                <Badge className="bg-unlimited-blue">برنامج مميز</Badge>
              )}
              {program.scholarshipAvailable && (
                <Badge className="bg-green-600">فرصة منحة</Badge>
              )}
              {program.badges?.map((badge, idx) => (
                <Badge key={idx} variant="outline">{badge}</Badge>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">{program.title}</h1>
                <div className="flex items-center text-unlimited-gray mt-2">
                  <School className="h-4 w-4 ml-2" />
                  <span>{program.university}</span>
                </div>
              </div>
              
              <div className="text-right">
                {program.discount ? (
                  <>
                    <p className="line-through text-unlimited-gray">{program.fee}</p>
                    <p className="text-2xl font-bold text-unlimited-blue">{program.discount}</p>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-unlimited-blue">{program.fee}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Program Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="details">التفاصيل</TabsTrigger>
                <TabsTrigger value="requirements">متطلبات القبول</TabsTrigger>
                <TabsTrigger value="fees">الرسوم الدراسية</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">عن البرنامج</h2>
                  <p className="text-unlimited-gray leading-relaxed">
                    يقدم برنامج {program.title} فرصة تعليمية متميزة للطلاب الراغبين في الحصول على شهادة معترف بها دوليًا في مجال تخصصهم.
                    يجمع البرنامج بين الجوانب النظرية والعملية لتأهيل الطلاب بالمهارات والمعارف اللازمة للنجاح في سوق العمل.
                  </p>
                  
                  <p className="text-unlimited-gray leading-relaxed mt-4">
                    يتميز البرنامج بمناهج دراسية متطورة وأعضاء هيئة تدريس ذوي خبرة عالية في المجال. كما يوفر البرنامج فرصًا للتدريب العملي
                    والمشاركة في مشاريع بحثية وتطبيقية تساهم في تعزيز قدرات الطلاب وإعدادهم لمستقبل مهني ناجح.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="p-1">
                          <MapPin className="h-4 w-4" />
                        </Badge>
                        <div>
                          <p className="text-unlimited-gray text-sm">الموقع</p>
                          <p className="font-medium">{translateLocation(program.location)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="p-1">
                          <Clock className="h-4 w-4" />
                        </Badge>
                        <div>
                          <p className="text-unlimited-gray text-sm">مدة الدراسة</p>
                          <p className="font-medium">{program.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="p-1">
                          <Calendar className="h-4 w-4" />
                        </Badge>
                        <div>
                          <p className="text-unlimited-gray text-sm">آخر موعد للتقديم</p>
                          <p className="font-medium">{program.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="p-1">
                          <Globe className="h-4 w-4" />
                        </Badge>
                        <div>
                          <p className="text-unlimited-gray text-sm">لغة الدراسة</p>
                          <p className="font-medium">{program.language}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3">مميزات البرنامج</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-unlimited-blue" />
                      <span>شهادة معترف بها دوليًا</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-unlimited-blue" />
                      <span>أعضاء هيئة تدريس متميزون</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-unlimited-blue" />
                      <span>فرص تدريب عملي</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-unlimited-blue" />
                      <span>مرافق تعليمية حديثة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-unlimited-blue" />
                      <span>دعم وإرشاد أكاديمي</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-unlimited-blue" />
                      <span>أنشطة طلابية متنوعة</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">تفاصيل البرنامج</h2>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">محتوى البرنامج</h3>
                    <p className="text-unlimited-gray mb-4">
                      يتكون برنامج {program.title} من مجموعة من المقررات الأساسية والاختيارية التي تغطي جميع جوانب التخصص،
                      بالإضافة إلى مشروع تخرج يقوم الطالب بتنفيذه تحت إشراف أحد أعضاء هيئة التدريس.
                    </p>
                    
                    <h4 className="font-semibold mb-2">المقررات الرئيسية:</h4>
                    <ul className="list-disc list-inside space-y-1 text-unlimited-gray mr-6">
                      <li>مقدمة في {program.title}</li>
                      <li>أساسيات {program.title}</li>
                      <li>نظريات متقدمة في {program.title}</li>
                      <li>تطبيقات عملية في {program.title}</li>
                      <li>مناهج البحث في {program.title}</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">نظام الدراسة</h3>
                    <p className="text-unlimited-gray mb-2">
                      يعتمد البرنامج على نظام الساعات المعتمدة، حيث يتوجب على الطالب إكمال عدد محدد من الساعات المعتمدة
                      للحصول على الشهادة. يتم توزيع الساعات على المقررات الدراسية والتدريبات العملية ومشروع التخرج.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-unlimited-gray">إجمالي الساعات المعتمدة:</p>
                        <p className="font-medium">130 ساعة معتمدة</p>
                      </div>
                      <div>
                        <p className="text-unlimited-gray">نظام الدراسة:</p>
                        <p className="font-medium">فصلي</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">فرص العمل</h3>
                    <p className="text-unlimited-gray mb-3">
                      يتيح برنامج {program.title} للخريجين العمل في مجالات متعددة منها:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-unlimited-gray mr-6">
                      <li>العمل في القطاع الحكومي</li>
                      <li>العمل في الشركات والمؤسسات الخاصة</li>
                      <li>مجال البحث العلمي</li>
                      <li>العمل في المنظمات والهيئات الدولية</li>
                      <li>مجال الاستشارات</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="mt-6">
                <h2 className="text-2xl font-bold mb-4">متطلبات القبول</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">المؤهلات الأكاديمية</h3>
                    <ul className="list-disc list-inside space-y-2 text-unlimited-gray mr-6">
                      <li>شهادة الثانوية العامة أو ما يعادلها بمعدل لا يقل عن 70%</li>
                      <li>شهادة إتمام المرحلة الجامعية الأولى بتقدير جيد على الأقل (في حالة برامج الدراسات العليا)</li>
                      <li>اجتياز امتحان القبول الخاص بالبرنامج (إن وجد)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">المستندات المطلوبة</h3>
                    <ul className="list-disc list-inside space-y-2 text-unlimited-gray mr-6">
                      <li>صورة من جواز السفر ساري المفعول</li>
                      <li>صور شخصية حديثة</li>
                      <li>شهادات المؤهلات الأكاديمية معتمدة ومترجمة</li>
                      <li>كشف الدرجات معتمد ومترجم</li>
                      <li>شهادة إجادة اللغة الإنجليزية (TOEFL/IELTS) إذا كانت لغة الدراسة هي الإنجليزية</li>
                      <li>خطابات توصية (في حالة برامج الدراسات العليا)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">متطلبات اللغة</h3>
                    <p className="text-unlimited-gray mb-3">
                      يتطلب البرنامج إثبات كفاءة الطالب في لغة الدراسة:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-unlimited-gray mr-6">
                      <li>للبرامج باللغة الإنجليزية: اجتياز اختبار TOEFL بدرجة 550 أو IELTS بدرجة 6.0 على الأقل</li>
                      <li>للبرامج باللغة التركية: اجتياز امتحان TÖMER بمستوى B2 على الأقل</li>
                      <li>يمكن للطلاب الالتحاق ببرامج السنة التحضيرية للغة في حالة عدم تحقيق المستوى المطلوب</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="fees" className="mt-6">
                <h2 className="text-2xl font-bold mb-4">الرسوم الدراسية</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">ملخص الرسوم</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-unlimited-gray">رسوم البرنامج السنوية:</p>
                        <p className="text-2xl font-bold text-unlimited-blue">
                          {program.discount || program.fee}
                        </p>
                        {program.discount && (
                          <p className="text-sm text-unlimited-gray line-through">{program.fee}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-unlimited-gray">إجمالي رسوم البرنامج:</p>
                        <p className="font-medium">
                          {program.discount 
                            ? `${parseFloat(program.discount.replace('$', '').replace(',', '')) * parseInt(program.duration)}$` 
                            : `${parseFloat(program.fee.replace('$', '').replace(',', '')) * parseInt(program.duration)}$`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">رسوم إضافية</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>رسوم التسجيل (لمرة واحدة)</span>
                        <span className="font-medium">500$</span>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>رسوم السكن الجامعي (سنويًا)</span>
                        <span className="font-medium">2,500$ - 4,000$</span>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>التأمين الصحي (سنويًا)</span>
                        <span className="font-medium">300$</span>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <span>الكتب والمستلزمات الدراسية (تقريبًا)</span>
                        <span className="font-medium">500$ - 800$</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">خيارات المنح الدراسية</h3>
                    {program.scholarshipAvailable ? (
                      <div>
                        <p className="text-unlimited-gray mb-3">
                          يوفر البرنامج فرصًا للحصول على منح دراسية للطلاب المتفوقين والمتميزين:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-unlimited-gray mr-6">
                          <li>منحة التفوق الأكاديمي (تصل إلى 50% من الرسوم الدراسية)</li>
                          <li>منحة الطلاب الدوليين (تصل إلى 30% من الرسوم الدراسية)</li>
                          <li>منح المهارات الخاصة (الرياضية، الفنية، إلخ) (تصل إلى 25% من الرسوم الدراسية)</li>
                        </ul>
                      </div>
                    ) : (
                      <p className="text-unlimited-gray">لا تتوفر منح دراسية لهذا البرنامج حاليًا.</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">خيارات الدفع</h3>
                    <p className="text-unlimited-gray mb-3">
                      توفر الجامعة عدة خيارات لدفع الرسوم الدراسية:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-unlimited-gray mr-6">
                      <li>دفع كامل المبلغ مقدمًا (يتيح خصم 5% من إجمالي الرسوم)</li>
                      <li>دفع على قسطين (في بداية كل فصل دراسي)</li>
                      <li>دفع على أقساط شهرية (بعد دفعة أولى بنسبة 40% من الرسوم)</li>
                    </ul>
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
                  <h3 className="text-xl font-bold mb-4">هل تريد التسجيل؟</h3>
                  <p className="text-unlimited-gray mb-4">
                    قم بالتسجيل الآن للحصول على استشارة مجانية من مستشارينا وبدء رحلتك الدراسية.
                  </p>
                  <Button 
                    onClick={handleApplyNow} 
                    className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                  >
                    تقديم طلب الآن
                  </Button>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">أو تواصل معنا عبر:</h4>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full border-unlimited-blue text-unlimited-blue hover:bg-unlimited-blue/10"
                        asChild
                      >
                        <Link to="/contact">
                          استشارة مباشرة
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        asChild
                      >
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                          واتساب
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">تقديم طلب</h3>
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
                <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-unlimited-gray">البريد الإلكتروني:</p>
                    <p className="font-medium">info@unlimited.edu</p>
                  </div>
                  <div>
                    <p className="text-unlimited-gray">الهاتف:</p>
                    <p className="font-medium">+90 123 456 7890</p>
                  </div>
                  <div>
                    <p className="text-unlimited-gray">العنوان:</p>
                    <p className="font-medium">{translateLocation(program.location)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {program.scholarshipAvailable && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">معلومات المنحة</h3>
                  <p className="text-unlimited-gray mb-4">
                    يتوفر لهذا البرنامج فرص للحصول على منح دراسية تصل إلى 50% من الرسوم الدراسية.
                    للتقدم للمنحة، يرجى إرفاق المستندات التالية مع طلب التقديم:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-unlimited-gray mr-6 mb-4">
                    <li>رسالة تحفيزية</li>
                    <li>شهادات التفوق الأكاديمي</li>
                    <li>توصيات من الأساتذة</li>
                  </ul>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-unlimited-blue text-unlimited-blue hover:bg-unlimited-blue/10"
                  >
                    <Link to="/scholarships">معلومات أكثر عن المنح</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Related Programs */}
        {relatedPrograms.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">برامج ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPrograms.map((program) => (
                <Card key={program.id} className="overflow-hidden transition-all hover:shadow-lg hover:border-unlimited-blue">
                  <Link to={`/programs/${program.id}`} className="block h-48">
                    <img 
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                  
                  <CardContent className="p-4">
                    <Link to={`/programs/${program.id}`}>
                      <h3 className="font-bold text-lg mb-2 hover:text-unlimited-blue">{program.title}</h3>
                    </Link>
                    <div className="flex items-center text-unlimited-gray mb-2">
                      <School className="h-4 w-4 ml-1" />
                      <span className="text-sm">{program.university}</span>
                    </div>
                    <div className="flex items-center text-unlimited-gray">
                      <MapPin className="h-4 w-4 ml-1" />
                      <span className="text-sm">{translateLocation(program.location)}</span>
                    </div>
                    <div className="mt-3">
                      {program.discount ? (
                        <>
                          <p className="line-through text-unlimited-gray text-xs">{program.fee}</p>
                          <p className="font-semibold text-unlimited-blue">{program.discount}</p>
                        </>
                      ) : (
                        <p className="font-semibold">{program.fee}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
