import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, Clock, Download, Globe, GraduationCap, Heart, MapPin, School, Share2, MessageSquare, Bookmark, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for program details
const programsData = [
  {
    id: 1,
    title: 'بكالوريوس إدارة الأعمال',
    university: 'جامعة أوزيجين',
    location: 'تركيا، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$13,000 / سنة',
    discount: '$12,350',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'برنامج البكالوريوس في إدارة الأعمال من جامعة أوزيجين يوفر تعليماً شاملاً في مجالات الإدارة والتسويق والموارد البشرية والتمويل. يهدف البرنامج إلى إعداد الخريجين للمناصب القيادية في عالم الأعمال العالمي من خلال التركيز على الابتكار والريادة والمهارات العملية.',
    applicationProcess: [
      { step: 'تقديم الطلب عبر الإنترنت', completed: true },
      { step: 'تحميل المستندات المطلوبة', completed: true },
      { step: 'دفع رسوم الطلب', completed: true },
      { step: 'اجتياز امتحان القبول', completed: false },
      { step: 'المقابلة الشخصية', completed: false },
      { step: 'استلام خطاب القبول', completed: false },
    ],
    requirements: [
      'شهادة الثانوية العامة بمعدل لا يقل عن 70%',
      'اجتياز اختبار اللغة الإنجليزية (التوفل أو الآيلتس)',
      'خطاب توصية',
      'السيرة الذاتية',
      'صورة جواز السفر ساري المفعول'
    ],
    curriculum: [
      {
        year: 'السنة الأولى',
        courses: [
          'مبادئ الإدارة',
          'الاقتصاد الجزئي',
          'الرياضيات للأعمال',
          'مهارات الاتصال',
          'تقنية المعلومات في الأعمال',
          'الإحصاء للأعمال',
          'المحاسبة المالية',
          'الاقتصاد الكلي'
        ]
      },
      {
        year: 'السنة الثانية',
        courses: [
          'إدارة الموارد البشرية',
          'التسويق',
          'المحاسبة الإدارية',
          'السلوك التنظيمي',
          'القانون التجاري',
          'نظم المعلومات الإدارية',
          'إدارة العمليات',
          'مبادئ التمويل'
        ]
      },
      {
        year: 'السنة الثالثة',
        courses: [
          'الإدارة الاستراتيجية',
          'إدارة المشاريع',
          'التجارة الدولية',
          'إدارة سلسلة التوريد',
          'أخلاقيات الأعمال',
          'التسويق الرقمي',
          'تحليل البيانات للأعمال',
          'التخصص الاختياري 1'
        ]
      },
      {
        year: 'السنة الرابعة',
        courses: [
          'ريادة الأعمال',
          'إدارة التغيير',
          'الإدارة المالية',
          'التخصص الاختياري 2',
          'التخصص الاختياري 3',
          'مشروع التخرج',
          'التدريب العملي',
          'ندوة في الإدارة المعاصرة'
        ]
      }
    ],
    faculty: [
      {
        name: 'د. أحمد المهدي',
        position: 'عميد كلية إدارة الأعمال',
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
      },
      {
        name: 'د. سارة الخليل',
        position: 'أستاذة التسويق',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3'
      },
      {
        name: 'د. محمد العمري',
        position: 'أستاذ الإدارة الاستراتيجية',
        image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3'
      }
    ],
    facilities: [
      'مكتبة حديثة تضم أكثر من 50,000 كتاب',
      'مختبرات كمبيوتر مجهزة بأحدث التقنيات',
      'قاعات دراسية ذكية',
      'مركز لريادة الأعمال',
      'قاعة محاكاة لسوق الأوراق المالية',
      'مركز للغات',
      'سكن طلابي'
    ],
    accreditation: ['هيئة الاعتماد الأكاديمي الدولي (IAA)', 'مجلس اعتماد كليات إدارة الأعمال (AACSB)'],
    careerOpportunities: [
      'محلل أعمال',
      'مدير مشاريع',
      'مدير تسويق',
      'مستشار إداري',
      'مدير موارد بشرية',
      'محلل مالي',
      'رائد أعمال'
    ],
    scholarships: [
      {
        title: 'منحة التفوق الأكاديمي',
        discount: '50%',
        requirements: 'معدل 90% فما فوق في الثانوية العامة'
      },
      {
        title: 'منحة الطلاب الدوليين',
        discount: '25%',
        requirements: 'للطلاب من خارج تركيا'
      },
      {
        title: 'منحة الإبداع',
        discount: '30%',
        requirements: 'للطلاب الذين لديهم إنجازات إبداعية أو ابتكارية'
      }
    ],
    faq: [
      {
        question: 'هل يمكنني الدراسة باللغة العربية؟',
        answer: 'لا، البرنامج متوفر فقط باللغة الإنجليزية، لكن يوجد دورات تحضيرية للغة الإنجليزية للطلاب الذين يحتاجون إلى تحسين مستواهم.'
      },
      {
        question: 'هل التدريب العملي إلزامي؟',
        answer: 'نعم، التدريب العملي جزء إلزامي من المنهج الدراسي في السنة الأخيرة.'
      },
      {
        question: 'هل يمكنني العمل أثناء الدراسة؟',
        answer: 'نعم، يمكن للطلاب العمل بدوام جزئي أثناء الدراسة، والجامعة توفر فرص عمل داخل الحرم الجامعي.'
      },
      {
        question: 'كيف يمكنني التقدم للمنح الدراسية؟',
        answer: 'يتم التقدم للمنح الدراسية أثناء عملية تقديم طلب القبول. سيتم تقييم المرشحين تلقائياً للأهلية.'
      }
    ],
    similarPrograms: [4, 5, 6]
  },
  {
    id: 2,
    title: 'ماجستير علوم الحاسوب',
    university: 'جامعة فاتح سلطان محمد',
    location: 'تركيا، إسطنبول',
    language: 'الإنجليزية',
    duration: 'سنتان',
    deadline: '1 يوليو 2025',
    fee: '$15,000 / سنة',
    discount: '$14,250',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    // Rest of details would be here...
  }
  // Other programs...
];

const ProgramDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the program based on the ID
  const programId = parseInt(id || '1');
  const program = programsData.find(p => p.id === programId);
  
  if (!program) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-4">البرنامج غير موجود</h1>
          <Button asChild>
            <Link to="/programs">العودة إلى البرامج</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleSaveProgram = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "تمت إزالة البرنامج" : "تم حفظ البرنامج",
      description: isSaved 
        ? "تمت إزالة البرنامج من قائمة المفضلة" 
        : "تم إضافة البرنامج إلى قائمة المفضلة بنجاح",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط البرنامج إلى الحافظة",
    });
  };

  const handleApplyNow = () => {
    toast({
      title: "جاري التوجيه",
      description: "سيتم توجيهك إلى صفحة تقديم الطلب",
    });
  };

  const handleDownloadBrochure = () => {
    toast({
      title: "جاري التنزيل",
      description: "بدأ تحميل كتيب البرنامج",
    });
  };

  const handleContactAdvisor = () => {
    toast({
      title: "التواصل مع مستشار",
      description: "سيتم توجيهك للتواصل مع أحد مستشارينا",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link to="/programs" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              العودة إلى البرامج
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue p-8 rounded-lg text-white">
              <div className="flex items-center gap-2 mb-3">
                <School className="h-5 w-5" />
                <span>{program.university}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-4 w-4" />
                <span>{program.location}</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge variant="outline" className="bg-white/20 text-white border-none">
                  <Globe className="h-3.5 w-3.5 mr-1" /> {program.language}
                </Badge>
                <Badge variant="outline" className="bg-white/20 text-white border-none">
                  <Clock className="h-3.5 w-3.5 mr-1" /> {program.duration}
                </Badge>
                <Badge variant="outline" className="bg-white/20 text-white border-none">
                  <GraduationCap className="h-3.5 w-3.5 mr-1" /> بكالوريوس
                </Badge>
                <Badge variant="outline" className="bg-white/20 text-white border-none">
                  <Calendar className="h-3.5 w-3.5 mr-1" /> الموعد النهائي: {program.deadline}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between">
                <div>
                  <span className="block text-white/70 mb-1">رسوم البرنامج:</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-white/60">{program.fee}</span>
                    <span className="text-xl font-bold">{program.discount}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    onClick={handleSaveProgram}
                  >
                    {isSaved ? <Bookmark className="h-4 w-4 fill-white" /> : <Bookmark className="h-4 w-4" />}
                    <span className="hidden sm:inline">{isSaved ? 'محفوظ' : 'حفظ'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">مشاركة</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Card className="h-fit">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <Button onClick={handleApplyNow} className="w-full">
                  تقدم الآن
                </Button>
                <Button onClick={handleDownloadBrochure} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> تحميل الكتيب
                </Button>
                <Button onClick={handleContactAdvisor} variant="secondary" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" /> تحدث مع مستشار
                </Button>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">خطوات التقديم</h3>
                  <div className="space-y-3">
                    {program.applicationProcess.map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          step.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        <span className={step.completed ? 'text-unlimited-gray' : ''}>{step.step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <span className="text-sm text-unlimited-gray block mb-2">اكتمال الطلب</span>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={50} 
                        className="h-2 flex-grow" 
                      />
                      <span className="text-sm font-medium">50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="curriculum">المنهج الدراسي</TabsTrigger>
            <TabsTrigger value="requirements">متطلبات القبول</TabsTrigger>
            <TabsTrigger value="faculty">هيئة التدريس</TabsTrigger>
            <TabsTrigger value="scholarships">المنح الدراسية</TabsTrigger>
            <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">نظرة عامة عن البرنامج</h2>
              <p className="text-unlimited-gray mb-6">{program.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">المرافق</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-unlimited-gray">
                    {program.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">الفرص الوظيفية</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-unlimited-gray">
                    {program.careerOpportunities.map((career, index) => (
                      <li key={index}>{career}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-3">الاعتمادات</h3>
              <div className="flex flex-wrap gap-2">
                {program.accreditation.map((item, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">المنهج الدراسي</h2>
              
              <div className="space-y-6">
                {program.curriculum.map((year, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium mb-3 bg-unlimited-blue/10 p-2 rounded">{year.year}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {year.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="flex items-center gap-2 py-2 border-b border-dashed">
                          <div className="w-6 h-6 bg-unlimited-blue/10 rounded-full flex items-center justify-center text-xs text-unlimited-blue">
                            {courseIndex + 1}
                          </div>
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requirements">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">متطلبات القبول</h2>
              <ul className="space-y-3">
                {program.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-unlimited-blue/10 text-unlimited-blue flex items-center justify-center mt-0.5">
                      {index + 1}
                    </div>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="faculty">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">هيئة التدريس</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.faculty.map((member, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-unlimited-gray">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">المنح الدراسية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.scholarships.map((scholarship, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-unlimited-blue text-white p-3">
                      <h3 className="font-medium">{scholarship.title}</h3>
                    </div>
                    <div className="p-4">
                      <div className="text-2xl font-bold text-unlimited-blue mb-2">خصم {scholarship.discount}</div>
                      <p className="text-sm text-unlimited-gray">{scholarship.requirements}</p>
                      <Button size="sm" className="w-full mt-4">تقدم الآن</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">الأسئلة الشائعة</h2>
              
              <div className="space-y-4">
                {program.faq.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-unlimited-blue mb-2">{item.question}</h3>
                    <p className="text-unlimited-gray">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar Programs */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">برامج مشابهة قد تهمك</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/programs" className="flex items-center gap-2">
                عرض جميع البرامج
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programsData.filter(p => program.similarPrograms.includes(p.id)).map((similarProgram) => (
              <Card key={similarProgram.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={similarProgram.image}
                    alt={similarProgram.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-unlimited-gray mb-1">
                    <School className="h-3.5 w-3.5 mr-1" />
                    <span className="text-sm">{similarProgram.university}</span>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-1">{similarProgram.title}</h3>
                  <div className="flex items-center text-unlimited-gray mb-3">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs">{similarProgram.location}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-xs text-unlimited-gray">الرسوم:</span>
                      <span className="font-medium text-unlimited-blue">{similarProgram.discount}</span>
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/programs/${similarProgram.id}`}>عرض</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Apply CTA */}
        <div className="mt-16 bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">هل أنت مستعد للتقديم؟</h2>
          <p className="mb-6 max-w-2xl mx-auto">قدم طلبك الآن للالتحاق ببرنامج {program.title} في {program.university} وابدأ رحلتك نحو مستقبل مهني مميز!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100">
              <Link to="/apply">تقدم الآن</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white">
                <MessageSquare className="h-5 w-5" />
                تحدث مع مستشار
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
