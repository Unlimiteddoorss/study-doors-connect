
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/shared/SectionTitle';
import { CircleCheck, GraduationCap, LanguagesIcon, Calendar, DollarSign, Clock, MapPin, Phone, Mail } from 'lucide-react';

const SoftwareEngineeringProgram = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-80 bg-unlimited-blue/10 flex items-center">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
              <img 
                src="/lovable-uploads/51522d38-6d96-4884-8ab7-d1e182003a1d.png" 
                alt="هندسة البرمجيات" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="container mx-auto px-4 py-8 relative z-10">
              <div className="flex flex-wrap md:flex-nowrap items-center gap-6">
                <div className="w-full md:w-1/4">
                  <div className="relative w-48 h-48 mx-auto md:mx-0">
                    <div className="absolute inset-0 bg-unlimited-blue rounded-full opacity-20"></div>
                    <img 
                      src="/lovable-uploads/51522d38-6d96-4884-8ab7-d1e182003a1d.png" 
                      alt="شعار برنامج هندسة البرمجيات" 
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/4 text-center md:text-right">
                  <Badge className="mb-2 bg-unlimited-blue">برنامج مميز</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">بكالوريوس هندسة البرمجيات</h1>
                  <div className="mb-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-unlimited-gray">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-5 w-5" />
                      <span>بكالوريوس</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LanguagesIcon className="h-5 w-5" />
                      <span>الإنجليزية</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5" />
                      <span>4 سنوات</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline" className="font-normal">
                      معتمد دولياً
                    </Badge>
                    <Badge variant="outline" className="font-normal">
                      فرص عمل عالية
                    </Badge>
                    <Badge variant="outline" className="font-normal">
                      فرص متابعة الدراسات العليا
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t p-6">
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-unlimited-blue" />
                <span>إسطنبول، تركيا</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-unlimited-blue" />
                <span dir="ltr">+90 552 286 8989</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-unlimited-blue" />
                <span dir="ltr">info@unlimited-edu.com</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                <Link to="/apply?program=software-engineering">تقدم الآن</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">استفسر عن البرنامج</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-unlimited-blue/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-unlimited-blue/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-unlimited-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">الرسوم السنوية</h3>
                <p className="text-unlimited-blue font-bold">5500 دولار</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-unlimited-blue/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-unlimited-blue/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-unlimited-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">مدة البرنامج</h3>
                <p>4 سنوات</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-unlimited-blue/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-unlimited-blue/10 p-3 rounded-full">
                <LanguagesIcon className="h-6 w-6 text-unlimited-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">لغة الدراسة</h3>
                <p>الإنجليزية</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-unlimited-blue/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-unlimited-blue/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-unlimited-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">آخر موعد للتقديم</h3>
                <p>31 ديسمبر 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="py-3">نظرة عامة</TabsTrigger>
            <TabsTrigger value="curriculum" className="py-3">المنهج الدراسي</TabsTrigger>
            <TabsTrigger value="requirements" className="py-3">متطلبات القبول</TabsTrigger>
            <TabsTrigger value="career" className="py-3">فرص العمل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-6 border rounded-md mt-2">
            <h2 className="text-xl font-bold mb-4">نبذة عن برنامج هندسة البرمجيات</h2>
            <p className="mb-4">
              هندسة البرمجيات هي تخصص أكاديمي يهتم بتطوير وبناء أنظمة البرمجيات بطريقة منهجية وموثوقة. يتعلم الطلاب في هذا البرنامج كيفية تصميم وتطوير وصيانة برامج الكمبيوتر باستخدام أحدث التقنيات والمنهجيات في مجال البرمجة وتطوير البرمجيات.
            </p>
            <p className="mb-4">
              يقدم البرنامج مزيجاً من الدراسة النظرية والتطبيق العملي، حيث يتعلم الطلاب أساسيات علوم الكمبيوتر، والخوارزميات، وهياكل البيانات، وقواعد البيانات، وتطوير الواجهات، وتطوير تطبيقات الويب والموبايل، والذكاء الاصطناعي، وأمن المعلومات.
            </p>
            
            <h3 className="text-lg font-bold mt-6 mb-2">المهارات المكتسبة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>البرمجة بلغات متعددة (Java, Python, C++)</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>تصميم وإدارة قواعد البيانات</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>تطوير تطبيقات الويب والموبايل</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>تحليل وتصميم النظم</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>إدارة المشاريع البرمجية</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>اختبار البرمجيات وضمان الجودة</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>أمن المعلومات والشبكات</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                <span>تطبيقات الذكاء الاصطناعي وتعلم الآلة</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mt-6 mb-2">مميزات البرنامج</h3>
            <ul className="list-disc pr-5 space-y-2">
              <li>مناهج محدثة تواكب أحدث التقنيات والاتجاهات في مجال هندسة البرمجيات</li>
              <li>هيئة تدريسية ذات خبرة أكاديمية وعملية في مجال تطوير البرمجيات</li>
              <li>مختبرات حاسوبية متطورة ومجهزة بأحدث البرمجيات والأدوات</li>
              <li>فرص للتدريب العملي في شركات تكنولوجيا المعلومات الرائدة</li>
              <li>إمكانية المشاركة في مشاريع بحثية وتطويرية حقيقية</li>
              <li>برامج تبادل طلابي مع جامعات عالمية مرموقة</li>
              <li>دعم في تطوير المشاريع الريادية في مجال التكنولوجيا</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="curriculum" className="p-6 border rounded-md mt-2">
            <h2 className="text-xl font-bold mb-4">المنهج الدراسي</h2>
            <p className="mb-6">
              يتكون برنامج البكالوريوس في هندسة البرمجيات من 8 فصول دراسية موزعة على 4 سنوات، ويشمل المقررات التالية:
            </p>
            
            <h3 className="text-lg font-bold my-3">السنة الأولى</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل الأول</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>مقدمة في علوم الحاسوب</li>
                    <li>مبادئ البرمجة</li>
                    <li>الرياضيات المتقطعة</li>
                    <li>مقدمة في نظم التشغيل</li>
                    <li>اللغة الإنجليزية التقنية</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل الثاني</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>برمجة كائنية التوجه</li>
                    <li>هياكل البيانات والخوارزميات</li>
                    <li>تفاضل وتكامل للمهندسين</li>
                    <li>أخلاقيات الحوسبة</li>
                    <li>مهارات الاتصال</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-lg font-bold my-3">السنة الثانية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل الثالث</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>قواعد البيانات المتقدمة</li>
                    <li>تطوير تطبيقات الويب</li>
                    <li>تحليل وتصميم النظم</li>
                    <li>الرياضيات للمهندسين</li>
                    <li>شبكات الحاسوب</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل الرابع</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>هندسة البرمجيات</li>
                    <li>برمجة واجهات المستخدم</li>
                    <li>نظم التشغيل المتقدمة</li>
                    <li>أساسيات الذكاء الاصطناعي</li>
                    <li>الإحصاء واحتمالات</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-lg font-bold my-3">السنة الثالثة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل الخامس</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>إدارة مشاريع البرمجيات</li>
                    <li>تطوير تطبيقات الموبايل</li>
                    <li>اختبار البرمجيات وضمان الجودة</li>
                    <li>الحوسبة السحابية</li>
                    <li>أمن المعلومات</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل السادس</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>تعلم الآلة</li>
                    <li>تطوير البرمجيات متعددة المنصات</li>
                    <li>تفاعل الإنسان والحاسوب</li>
                    <li>البرمجة المتوازية والموزعة</li>
                    <li>التدريب الصيفي</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-lg font-bold my-3">السنة الرابعة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل السابع</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>الشبكات العصبية وتعلم العميق</li>
                    <li>تطوير الألعاب</li>
                    <li>إنترنت الأشياء</li>
                    <li>مشروع التخرج (1)</li>
                    <li>مادة اختيارية (1)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">الفصل الثامن</h4>
                  <ul className="list-disc pr-5 mt-2">
                    <li>توثيق البرمجيات وأفضل الممارسات</li>
                    <li>ريادة الأعمال التقنية</li>
                    <li>مشروع التخرج (2)</li>
                    <li>مادة اختيارية (2)</li>
                    <li>مادة اختيارية (3)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="requirements" className="p-6 border rounded-md mt-2">
            <h2 className="text-xl font-bold mb-4">متطلبات القبول</h2>
            <p className="mb-6">
              للتقدم لبرنامج البكالوريوس في هندسة البرمجيات، يتوجب على المتقدم تحقيق الشروط التالية:
            </p>
            
            <h3 className="text-lg font-bold mb-3">الشروط الأكاديمية</h3>
            <ul className="list-disc pr-5 space-y-2 mb-6">
              <li>شهادة الثانوية العامة أو ما يعادلها بمعدل لا يقل عن 70%</li>
              <li>النجاح في امتحان اللغة الإنجليزية (TOEFL بدرجة 550 أو IELTS بدرجة 6.0 أو ما يعادلها)</li>
              <li>يفضل دراسة مواد الرياضيات والفيزياء في المرحلة الثانوية</li>
            </ul>
            
            <h3 className="text-lg font-bold mb-3">المستندات المطلوبة</h3>
            <ul className="list-disc pr-5 space-y-2 mb-6">
              <li>صورة عن جواز السفر ساري المفعول</li>
              <li>صورة مصدقة عن شهادة الثانوية العامة مترجمة ومعتمدة</li>
              <li>كشف علامات الثانوية العامة مترجم ومعتمد</li>
              <li>شهادة إتقان اللغة الإنجليزية</li>
              <li>صور شخصية حديثة عدد 4</li>
              <li>شهادة خلو من الأمراض</li>
              <li>تقرير طبي عام</li>
            </ul>
            
            <div className="bg-unlimited-blue/10 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">ملاحظات هامة</h3>
              <ul className="list-disc pr-5 space-y-2">
                <li>يمكن للطلاب الذين لا يستوفون شرط اللغة الإنجليزية الالتحاق بالسنة التحضيرية اللغوية</li>
                <li>تقدم الجامعة منح دراسية للطلاب المتفوقين تصل إلى 50% من الرسوم الدراسية</li>
                <li>يمكن للطلاب الاستفادة من برنامج التقسيط للرسوم الدراسية</li>
                <li>توفر الجامعة خدمة استخراج تأشيرة الطالب وتسهيل إجراءات الإقامة</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="career" className="p-6 border rounded-md mt-2">
            <h2 className="text-xl font-bold mb-4">فرص العمل والمسارات المهنية</h2>
            <p className="mb-6">
              يتمتع خريجي برنامج هندسة البرمجيات بفرص عمل متنوعة ومجزية في العديد من المجالات والقطاعات، حيث يمكنهم العمل في:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-3">الوظائف المتاحة</h3>
                  <ul className="list-disc pr-5 space-y-2">
                    <li>مهندس برمجيات</li>
                    <li>مطور ويب (أمامي وخلفي)</li>
                    <li>مطور تطبيقات موبايل</li>
                    <li>مهندس قواعد بيانات</li>
                    <li>مهندس الذكاء الاصطناعي</li>
                    <li>مدير مشاريع تقنية</li>
                    <li>مهندس اختبار وضمان جودة</li>
                    <li>مهندس امن سيبراني</li>
                    <li>مستشار تقني</li>
                    <li>محلل نظم</li>
                    <li>مصمم واجهات مستخدم وتجربة مستخدم</li>
                    <li>باحث في علوم الحاسوب</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-3">قطاعات العمل</h3>
                  <ul className="list-disc pr-5 space-y-2">
                    <li>شركات تطوير البرمجيات</li>
                    <li>شركات التكنولوجيا العالمية</li>
                    <li>المؤسسات المالية والبنوك</li>
                    <li>شركات الاتصالات</li>
                    <li>القطاع الحكومي</li>
                    <li>المؤسسات التعليمية والبحثية</li>
                    <li>الشركات الناشئة التقنية</li>
                    <li>مراكز البحث والتطوير</li>
                    <li>الصناعات الطبية والصحية</li>
                    <li>قطاع الإعلام والترفيه</li>
                    <li>التجارة الإلكترونية</li>
                    <li>العمل الحر والاستشارات</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-lg font-bold mb-3">الدراسات العليا والتطور المهني</h3>
            <p className="mb-4">
              يمكن لخريجي البرنامج متابعة دراساتهم العليا في مجالات متخصصة مثل:
            </p>
            <ul className="list-disc pr-5 space-y-2 mb-6">
              <li>ماجستير هندسة البرمجيات</li>
              <li>ماجستير علوم الحاسوب</li>
              <li>ماجستير الذكاء الاصطناعي</li>
              <li>ماجستير أمن المعلومات</li>
              <li>ماجستير تحليل البيانات الضخمة</li>
              <li>دكتوراه في مجالات الحوسبة المتقدمة</li>
            </ul>
            
            <div className="bg-unlimited-blue/10 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">الشهادات المهنية</h3>
              <p className="mb-2">
                يمكن للخريجين تعزيز فرصهم المهنية من خلال الحصول على شهادات مهنية معترف بها عالمياً مثل:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <span>AWS Certified Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <span>Microsoft Certified: Azure Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <span>Oracle Certified Professional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <span>Certified Scrum Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <span>Certified Information Systems Security Professional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-unlimited-blue flex-shrink-0" />
                  <span>Google Professional Cloud Developer</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar Programs */}
        <div className="mb-12">
          <SectionTitle 
            title="برامج مشابهة"
            subtitle="برامج أخرى قد تهمك في مجال تكنولوجيا المعلومات"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Card className="overflow-hidden">
              <div className="h-40 bg-unlimited-blue/10 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-unlimited-blue/40" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">هندسة الحاسوب</h3>
                <p className="text-unlimited-gray mb-4">دراسة تصميم وتطوير أنظمة الحاسوب وتكاملها مع البرمجيات</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/programs/computer-engineering">عرض التفاصيل</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-40 bg-unlimited-blue/10 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-unlimited-blue/40" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">علوم الحاسوب</h3>
                <p className="text-unlimited-gray mb-4">دراسة نظرية وعملية في مجالات الحوسبة والخوارزميات المتقدمة</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/programs/computer-science">عرض التفاصيل</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-40 bg-unlimited-blue/10 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-unlimited-blue/40" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">تكنولوجيا المعلومات</h3>
                <p className="text-unlimited-gray mb-4">دراسة إدارة وتطبيق أنظمة تكنولوجيا المعلومات في بيئات الأعمال</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/programs/information-technology">عرض التفاصيل</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Apply CTA */}
        <div className="bg-unlimited-blue text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">هل أنت مستعد للتقديم؟</h2>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            قدم طلبك الآن للالتحاق ببرنامج هندسة البرمجيات واحصل على فرصة الدراسة في إحدى أفضل الجامعات التركية. فريقنا جاهز لمساعدتك في كل خطوة من خطوات التقديم.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-white text-unlimited-blue hover:bg-gray-100">
              <Link to="/apply?program=software-engineering">تقدم الآن</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-unlimited-blue/80">
              <Link to="/contact">تواصل معنا</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SoftwareEngineeringProgram;
