
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Code, FileCheck, GraduationCap, Info, Languages, Layout, Map, Monitor, Phone, Mail, School, Users } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SectionTitle from '@/components/shared/SectionTitle';

const SoftwareEngineeringProgram = () => {
  const programInfo = {
    title: "هندسة البرمجيات",
    titleEn: "Software Engineering",
    universities: [
      {
        id: 4,
        name: "جامعة اسطنبول التقنية",
        nameEn: "Istanbul Technical University",
        location: "اسطنبول، تركيا",
        fee: "5500 دولار/سنوياً",
        discount: null,
        image: "/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png"
      },
      {
        id: 10,
        name: "جامعة اسطنبول كولتور",
        nameEn: "Istanbul Kultur University",
        location: "اسطنبول، تركيا",
        fee: "7600 دولار/سنوياً",
        discount: "3800 دولار/سنوياً",
        image: "/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png"
      }
    ],
    degree: "بكالوريوس",
    duration: "4 سنوات",
    language: "الإنجليزية",
    credits: 240,
    accreditation: "معتمد دولياً من مجلس التعليم العالي التركي YÖK",
    careerPaths: [
      "مهندس برمجيات",
      "مطور تطبيقات",
      "محلل نظم",
      "مطور واجهات المستخدم",
      "مطور تطبيقات الويب",
      "مطور تطبيقات الهواتف المحمولة",
      "مهندس DevOps",
      "مدير مشاريع تقنية",
      "مهندس ضمان الجودة",
      "مهندس أمن المعلومات"
    ],
    skills: [
      "لغات البرمجة (Java, C++, Python)",
      "تطوير تطبيقات الويب",
      "تطوير تطبيقات الهواتف المحمولة",
      "قواعد البيانات",
      "هندسة البرمجيات",
      "تحليل وتصميم النظم",
      "إدارة المشاريع البرمجية",
      "أمن المعلومات",
      "الذكاء الاصطناعي وتعلم الآلة",
      "تطوير واجهات المستخدم"
    ]
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            to="/programs" 
            className="flex items-center text-unlimited-blue hover:text-unlimited-dark-blue mb-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            <span>العودة إلى البرامج</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{programInfo.title}</h1>
          <p className="text-gray-500">{programInfo.titleEn}</p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Program Info */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="relative h-64 w-full mb-6">
                  <img 
                    src="/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png"
                    alt="هندسة البرمجيات" 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <School className="text-unlimited-blue h-6 w-6 mb-2" />
                    <span className="text-sm text-gray-500">الدرجة العلمية</span>
                    <span className="font-semibold">{programInfo.degree}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="text-unlimited-blue h-6 w-6 mb-2" />
                    <span className="text-sm text-gray-500">مدة الدراسة</span>
                    <span className="font-semibold">{programInfo.duration}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Languages className="text-unlimited-blue h-6 w-6 mb-2" />
                    <span className="text-sm text-gray-500">لغة الدراسة</span>
                    <span className="font-semibold">{programInfo.language}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="text-unlimited-blue h-6 w-6 mb-2" />
                    <span className="text-sm text-gray-500">الساعات المعتمدة</span>
                    <span className="font-semibold">{programInfo.credits} ECTS</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <FileCheck className="text-unlimited-blue h-6 w-6 mb-2" />
                    <span className="text-sm text-gray-500">الاعتماد</span>
                    <span className="font-semibold text-center text-xs">معتمد دولياً</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Users className="text-unlimited-blue h-6 w-6 mb-2" />
                    <span className="text-sm text-gray-500">فرص العمل</span>
                    <span className="font-semibold text-center text-xs">متعددة عالمياً</span>
                  </div>
                </div>
                
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="description">نظرة عامة</TabsTrigger>
                    <TabsTrigger value="curriculum">المنهج الدراسي</TabsTrigger>
                    <TabsTrigger value="career">المستقبل الوظيفي</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-unlimited-blue">
                        <Info className="h-5 w-5" />
                        نبذة عن البرنامج
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed">
                        برنامج هندسة البرمجيات هو برنامج متخصص يركز على تطوير مهارات الطلاب في تصميم وتطوير وصيانة أنظمة البرمجيات بكفاءة عالية. يجمع البرنامج بين علوم الكمبيوتر والمبادئ الهندسية لإنشاء حلول برمجية موثوقة وفعالة ومتطورة.
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed">
                        يهدف البرنامج إلى تخريج مهندسين برمجيات قادرين على تلبية احتياجات سوق العمل المتغيرة، وحل المشكلات المعقدة، وقيادة فرق التطوير في مختلف المجالات التقنية. من خلال منهج دراسي شامل، يكتسب الطلاب المهارات العملية والنظرية اللازمة للنجاح في هذا المجال المتطور باستمرار.
                      </p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">أهداف البرنامج</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>تطوير مهارات التفكير النقدي وحل المشكلات المعقدة في مجال تطوير البرمجيات</li>
                        <li>إتقان أساسيات علوم الكمبيوتر والمفاهيم الرياضية اللازمة لمهندسي البرمجيات</li>
                        <li>فهم دورة حياة تطوير البرمجيات من التحليل والتصميم إلى التنفيذ والاختبار والصيانة</li>
                        <li>التعرف على أحدث التقنيات والأدوات والمنهجيات المستخدمة في تطوير البرمجيات</li>
                        <li>تنمية مهارات العمل الجماعي والتواصل اللازمة لإدارة مشاريع البرمجيات بنجاح</li>
                        <li>بناء الخبرة العملية من خلال المشاريع والتدريب الميداني في شركات التقنية</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">متطلبات القبول</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>شهادة الثانوية العامة أو ما يعادلها</li>
                        <li>إثبات الكفاءة في اللغة الإنجليزية (اختبار TOEFL أو IELTS أو ما يعادله)</li>
                        <li>اجتياز اختبارات القبول الخاصة بالجامعة (حسب متطلبات كل جامعة)</li>
                        <li>المستندات الشخصية (جواز سفر، صور شخصية، شهادات صحية)</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-unlimited-blue">
                        <Layout className="h-5 w-5" />
                        المنهج الدراسي
                      </h3>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-3">السنة الأولى</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                          <div className="border-r border-dashed pr-4">
                            <h5 className="font-medium text-unlimited-blue">الفصل الأول</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>مقدمة في البرمجة</li>
                              <li>رياضيات متقدمة I</li>
                              <li>مدخل إلى علوم الحاسب</li>
                              <li>مهارات الاتصال الأكاديمي</li>
                              <li>الفيزياء للمهندسين</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-unlimited-blue">الفصل الثاني</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>هياكل البيانات والخوارزميات</li>
                              <li>رياضيات متقدمة II</li>
                              <li>تصميم الدوائر المنطقية</li>
                              <li>برمجة كائنية التوجه</li>
                              <li>الإحصاء والاحتمالات</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-3">السنة الثانية</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                          <div className="border-r border-dashed pr-4">
                            <h5 className="font-medium text-unlimited-blue">الفصل الثالث</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>خوارزميات متقدمة</li>
                              <li>تطوير تطبيقات الويب</li>
                              <li>نظم قواعد البيانات</li>
                              <li>تنظيم وتصميم الحاسب</li>
                              <li>الرياضيات المتقطعة</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-unlimited-blue">الفصل الرابع</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>هندسة البرمجيات الأساسية</li>
                              <li>شبكات الحاسب</li>
                              <li>برمجة متقدمة</li>
                              <li>تفاعل الإنسان والحاسوب</li>
                              <li>تحليل وتصميم النظم</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-3">السنة الثالثة</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                          <div className="border-r border-dashed pr-4">
                            <h5 className="font-medium text-unlimited-blue">الفصل الخامس</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>نظم التشغيل</li>
                              <li>تطوير تطبيقات الهواتف المحمولة</li>
                              <li>هندسة البرمجيات المتقدمة</li>
                              <li>أمن المعلومات</li>
                              <li>إدارة مشاريع البرمجيات</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-unlimited-blue">الفصل السادس</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>اختبار وضمان جودة البرمجيات</li>
                              <li>الذكاء الاصطناعي</li>
                              <li>تطوير خدمات الويب والـ API</li>
                              <li>تقنيات الحوسبة السحابية</li>
                              <li>مشروع تطوير برمجيات I</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-3">السنة الرابعة</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                          <div className="border-r border-dashed pr-4">
                            <h5 className="font-medium text-unlimited-blue">الفصل السابع</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>تعلم الآلة</li>
                              <li>تطوير البرمجيات للأنظمة الموزعة</li>
                              <li>تحليل البيانات الكبيرة</li>
                              <li>DevOps وأتمتة البنية التحتية</li>
                              <li>مشروع تطوير برمجيات II</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-unlimited-blue">الفصل الثامن</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                              <li>إنترنت الأشياء</li>
                              <li>اتجاهات متقدمة في هندسة البرمجيات</li>
                              <li>مواضيع مختارة في التقنيات الحديثة</li>
                              <li>أخلاقيات المهنة وقضايا قانونية</li>
                              <li>مشروع التخرج</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="career">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-unlimited-blue">
                        <Monitor className="h-5 w-5" />
                        المستقبل الوظيفي
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed">
                        يعد مجال هندسة البرمجيات من أكثر المجالات طلباً في سوق العمل العالمي، حيث توفر شهادة البكالوريوس في هندسة البرمجيات العديد من الفرص الوظيفية المجزية في مختلف القطاعات التقنية.
                      </p>
                      
                      <h4 className="font-semibold text-lg mt-6 mb-3">المسارات الوظيفية</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {programInfo.careerPaths.map((path, index) => (
                          <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                            <Code className="h-4 w-4 text-unlimited-blue flex-shrink-0" />
                            <span>{path}</span>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="font-semibold text-lg mt-6 mb-3">المهارات المكتسبة</h4>
                      <div className="flex flex-wrap gap-2">
                        {programInfo.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-sm py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <h4 className="font-semibold text-lg mt-6 mb-3">متوسط الرواتب</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-4 text-center">
                            <p className="text-xs text-gray-500">مبتدئ (0-2 سنوات)</p>
                            <p className="text-xl font-bold text-unlimited-blue">40,000$ - 60,000$</p>
                            <p className="text-xs">سنوياً</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-4 text-center">
                            <p className="text-xs text-gray-500">متوسط (3-5 سنوات)</p>
                            <p className="text-xl font-bold text-unlimited-blue">60,000$ - 90,000$</p>
                            <p className="text-xs">سنوياً</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-4 text-center">
                            <p className="text-xs text-gray-500">متقدم (6+ سنوات)</p>
                            <p className="text-xl font-bold text-unlimited-blue">90,000$ - 150,000$+</p>
                            <p className="text-xs">سنوياً</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="mt-6">
                        <p className="text-gray-700">
                          يمكن لخريجي هندسة البرمجيات العمل في مجموعة متنوعة من القطاعات بما في ذلك شركات التكنولوجيا، المؤسسات المالية، الرعاية الصحية، التعليم، الحكومة، وغيرها من القطاعات التي تعتمد على التقنية. كما يمكنهم متابعة دراساتهم العليا في مجالات متخصصة مثل الذكاء الاصطناعي، علوم البيانات، أو أمن المعلومات.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - University Options */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">الجامعات المتاحة</CardTitle>
                <CardDescription>اختر الجامعة المناسبة لك</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {programInfo.universities.map((university, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-200 hover:border-unlimited-blue transition-all">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={university.image}
                        alt={university.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">{university.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{university.nameEn}</p>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <Map className="h-4 w-4 text-unlimited-blue" />
                        <span>{university.location}</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">الرسوم الدراسية:</p>
                        {university.discount ? (
                          <>
                            <p className="line-through text-sm text-gray-400">{university.fee}</p>
                            <p className="font-bold text-green-600">{university.discount}</p>
                          </>
                        ) : (
                          <p className="font-bold">{university.fee}</p>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-unlimited-blue">بكالوريوس</Badge>
                        <Badge variant="outline">اللغة الإنجليزية</Badge>
                        {university.discount && <Badge className="bg-red-600">خصم 50%</Badge>}
                      </div>
                      
                      <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                        <Link to={`/apply?program=software-engineering&university=${university.id}`}>
                          تقدم الآن
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link to="/contact">استشارة مجانية</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">تواصل معنا</CardTitle>
                <CardDescription>للمزيد من المعلومات والاستفسارات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Map className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <div>
                    <p className="font-medium">العنوان</p>
                    <p className="text-gray-600 text-sm">اسطنبول Bahçelievler تركيا</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <div>
                    <p className="font-medium">رقم الهاتف</p>
                    <p className="text-gray-600 text-sm" dir="ltr">+90 55 24 212 214</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <div>
                    <p className="font-medium">البريد الإلكتروني</p>
                    <p className="text-gray-600 text-sm">unlimiteddoorss@gmail.com</p>
                  </div>
                </div>
                <Separator />
                <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                  <Link to="/contact">
                    طلب استشارة مجانية
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Related Programs Section */}
        <div className="mt-16">
          <SectionTitle
            title="برامج ذات صلة"
            subtitle="اكتشف المزيد من برامج الهندسة والتقنية"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/3282f8fb-3607-47d2-a8fa-d442b2cb1485.png"
                  alt="هندسة الكومبيوتر" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-xl mb-2">هندسة الكومبيوتر</h3>
                <p className="text-gray-500 mb-4 text-sm">برنامج بكالوريوس هندسة الكومبيوتر باللغة الإنجليزية.</p>
                <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                  <Link to="/programs/computer-engineering">عرض التفاصيل</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/cb9d586d-3538-4a35-9e99-b203ded72cf7.png"
                  alt="علوم الحاسب" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-xl mb-2">علوم الحاسب</h3>
                <p className="text-gray-500 mb-4 text-sm">برنامج بكالوريوس علوم الحاسب باللغة الإنجليزية.</p>
                <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                  <Link to="/programs/computer-science">عرض التفاصيل</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/dbd3909c-00e0-4028-87b9-7c67c6beda53.png"
                  alt="الذكاء الاصطناعي" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-xl mb-2">الذكاء الاصطناعي</h3>
                <p className="text-gray-500 mb-4 text-sm">برنامج بكالوريوس الذكاء الاصطناعي باللغة الإنجليزية.</p>
                <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                  <Link to="/programs/artificial-intelligence">عرض التفاصيل</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/programs">عرض جميع البرامج</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SoftwareEngineeringProgram;
