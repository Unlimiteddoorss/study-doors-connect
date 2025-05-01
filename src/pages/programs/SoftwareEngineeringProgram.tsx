
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Book, Calendar, DollarSign, Globe, GraduationCap, Languages, MapPin, School, Star, Users } from 'lucide-react';

const SoftwareEngineeringProgram = () => {
  const contactInfo = {
    phone: "+90 55 24 212 214",
    email: "unlimiteddoorss@gmail.com",
    address: "اسطنبول Bahçelievler تركيا"
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link to="/" className="text-unlimited-gray hover:text-unlimited-blue">
                  الرئيسية
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-unlimited-gray">/</span>
                  <Link to="/programs" className="text-unlimited-gray hover:text-unlimited-blue">
                    البرامج الدراسية
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-unlimited-gray">/</span>
                  <span className="text-unlimited-blue font-medium">هندسة البرمجيات</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4">بكالوريوس هندسة البرمجيات</h1>
              
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <School className="h-3 w-3" />
                  بكالوريوس
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Languages className="h-3 w-3" />
                  اللغة الإنجليزية
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  4 سنوات
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="text-unlimited-blue h-5 w-5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">الموقع</p>
                    <p>إسطنبول، تركيا</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <School className="text-unlimited-blue h-5 w-5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">الجامعات</p>
                    <p>متاح في عدة جامعات</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-unlimited-blue h-5 w-5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">موعد التقديم</p>
                    <p>مفتوح حتى 31/12/2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-unlimited-blue h-5 w-5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">التصنيف</p>
                    <p>تخصص عالي الطلب</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 text-unlimited-blue">تواصل معنا للتسجيل</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Phone className="h-5 w-5 text-unlimited-blue mt-1" />
                      <div>
                        <p className="text-sm text-unlimited-gray">رقم الهاتف</p>
                        <p className="font-semibold" dir="ltr">{contactInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-5 w-5 text-unlimited-blue mt-1" />
                      <div>
                        <p className="text-sm text-unlimited-gray">البريد الإلكتروني</p>
                        <p className="font-semibold">{contactInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-unlimited-blue mt-1" />
                      <div>
                        <p className="text-sm text-unlimited-gray">العنوان</p>
                        <p className="font-semibold">{contactInfo.address}</p>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to="/apply?program=software-engineering">تقدم للتسجيل الآن</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link to="/contact">استفسر أكثر</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="mt-8 mb-12">
          <Tabs defaultValue="overview">
            <TabsList className="w-full max-w-3xl grid grid-cols-4">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="universities">الجامعات</TabsTrigger>
              <TabsTrigger value="courses">المواد الدراسية</TabsTrigger>
              <TabsTrigger value="careers">الفرص الوظيفية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">ما هو تخصص هندسة البرمجيات؟</h2>
                  <p className="text-unlimited-gray leading-relaxed mb-4">
                    هندسة البرمجيات هي تخصص يركز على تطوير وتصميم وصيانة البرمجيات بطرق منهجية ومنظمة. يجمع هذا التخصص بين مبادئ علوم الحاسب والهندسة لإنتاج برمجيات عالية الجودة وقابلة للصيانة تلبي احتياجات المستخدمين.
                  </p>
                  <p className="text-unlimited-gray leading-relaxed">
                    خلال دراسة هندسة البرمجيات، سيتعلم الطلاب أساسيات البرمجة، وتصميم البرمجيات، وهندسة المتطلبات، واختبار البرمجيات، وإدارة المشاريع البرمجية، والأمن السيبراني، وأنظمة قواعد البيانات، وتطوير تطبيقات الويب والموبايل، والذكاء الاصطناعي.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">مميزات البرنامج</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-unlimited-blue/10 p-2 rounded-full">
                        <Star className="h-5 w-5 text-unlimited-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">منهج دراسي متطور</h3>
                        <p className="text-unlimited-gray">مناهج محدثة تواكب أحدث التقنيات والاتجاهات في مجال البرمجيات.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-unlimited-blue/10 p-2 rounded-full">
                        <GraduationCap className="h-5 w-5 text-unlimited-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">هيئة تدريس متميزة</h3>
                        <p className="text-unlimited-gray">أساتذة ذوو خبرة أكاديمية وعملية في مجال هندسة البرمجيات.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-unlimited-blue/10 p-2 rounded-full">
                        <Globe className="h-5 w-5 text-unlimited-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">اعتراف دولي</h3>
                        <p className="text-unlimited-gray">شهادات معترف بها دولياً تفتح آفاقاً واسعة للعمل في مختلف دول العالم.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-unlimited-blue/10 p-2 rounded-full">
                        <Users className="h-5 w-5 text-unlimited-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">فرص تدريب عملي</h3>
                        <p className="text-unlimited-gray">شراكات مع شركات تكنولوجيا محلية وعالمية لتوفير فرص تدريب للطلاب.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">متطلبات القبول</h2>
                  <ul className="list-disc list-inside space-y-2 text-unlimited-gray">
                    <li>شهادة الثانوية العامة بمعدل لا يقل عن 70%</li>
                    <li>إجادة اللغة الإنجليزية (شهادة TOEFL بدرجة 550 أو IELTS بدرجة 6.0)</li>
                    <li>اجتياز اختبار القبول الخاص بالجامعة (اختياري حسب الجامعة)</li>
                    <li>جواز سفر ساري المفعول</li>
                    <li>صور شخصية حديثة</li>
                    <li>شهادة صحية</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">الرسوم الدراسية</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">جامعة اسطنبول التقنية</h3>
                          <Badge>موصى بها</Badge>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-unlimited-gray">الرسوم السنوية:</span>
                            <span className="font-semibold">5,500 دولار</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-unlimited-gray">رسوم التسجيل:</span>
                            <span className="font-semibold">500 دولار</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-unlimited-gray">السنة التحضيرية:</span>
                            <span className="font-semibold">3,000 دولار</span>
                          </div>
                          <Button asChild className="w-full mt-2 bg-unlimited-blue hover:bg-unlimited-dark-blue">
                            <Link to="/apply?program=software-engineering&university=technical">تقديم طلب</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">جامعة اسطنبول كولتور</h3>
                          <Badge className="bg-green-600">خصم 50%</Badge>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-unlimited-gray">الرسوم السنوية:</span>
                            <div>
                              <span className="line-through text-unlimited-gray">7,600 دولار</span>
                              <span className="font-semibold text-green-600 block">3,800 دولار</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-unlimited-gray">رسوم التأمين:</span>
                            <span className="font-semibold">3,800 دولار</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-unlimited-gray">السنة التحضيرية:</span>
                            <span className="font-semibold">7,600 دولار</span>
                          </div>
                          <Button asChild className="w-full mt-2 bg-unlimited-blue hover:bg-unlimited-dark-blue">
                            <Link to="/apply?program=software-engineering&university=kultur">تقديم طلب</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="universities" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">الجامعات التي تقدم برنامج هندسة البرمجيات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-0">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src="/lovable-uploads/c680345e-7ede-49f4-9539-2d79414c5e22.png" 
                          alt="جامعة اسطنبول التقنية" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">جامعة اسطنبول التقنية</h3>
                        <div className="flex items-center text-unlimited-gray mb-2">
                          <MapPin className="h-4 w-4 ml-1" />
                          <span>إسطنبول، تركيا</span>
                        </div>
                        <p className="text-unlimited-gray mb-4">
                          تعد واحدة من أقدم الجامعات التقنية في العالم، تأسست عام 1773، وتتميز ببرامجها الهندسية عالية الجودة.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div>
                            <span className="text-unlimited-gray block text-sm">اللغة:</span>
                            <span>الإنجليزية</span>
                          </div>
                          <div>
                            <span className="text-unlimited-gray block text-sm">التصنيف العالمي:</span>
                            <span>#501-600</span>
                          </div>
                          <div>
                            <span className="text-unlimited-gray block text-sm">الرسوم السنوية:</span>
                            <span>5,500 دولار</span>
                          </div>
                          <div>
                            <span className="text-unlimited-gray block text-sm">نوع الجامعة:</span>
                            <span>حكومية</span>
                          </div>
                        </div>
                        <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                          <Link to="/universities/6">تفاصيل الجامعة</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-0">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src="/lovable-uploads/6081461c-4214-40a6-ab56-0a9480d441d5.png" 
                          alt="جامعة اسطنبول كولتور" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">جامعة اسطنبول كولتور</h3>
                        <div className="flex items-center text-unlimited-gray mb-2">
                          <MapPin className="h-4 w-4 ml-1" />
                          <span>إسطنبول، تركيا</span>
                        </div>
                        <p className="text-unlimited-gray mb-4">
                          تأسست عام 1997، وهي جامعة خاصة تقدم برامج أكاديمية متميزة وتشتهر ببرامجها في مجالات الهندسة والتكنولوجيا.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div>
                            <span className="text-unlimited-gray block text-sm">اللغة:</span>
                            <span>الإنجليزية</span>
                          </div>
                          <div>
                            <span className="text-unlimited-gray block text-sm">التصنيف العالمي:</span>
                            <span>#801-1000</span>
                          </div>
                          <div>
                            <span className="text-unlimited-gray block text-sm">الرسوم السنوية:</span>
                            <span className="line-through text-unlimited-gray">7,600 دولار</span>
                            <span className="text-green-600">3,800 دولار</span>
                          </div>
                          <div>
                            <span className="text-unlimited-gray block text-sm">نوع الجامعة:</span>
                            <span>خاصة</span>
                          </div>
                        </div>
                        <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                          <Link to="/universities/10">تفاصيل الجامعة</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">المواد الدراسية الرئيسية</h2>
                <p className="text-unlimited-gray mb-4">
                  يتضمن برنامج بكالوريوس هندسة البرمجيات مجموعة متنوعة من المواد الدراسية التي تغطي الجوانب النظرية والعملية في مجال تطوير البرمجيات:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Book className="h-5 w-5 ml-2 text-unlimited-blue" />
                        السنة الأولى
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">مقدمة في علوم الحاسوب</p>
                            <p className="text-unlimited-gray text-sm">أساسيات الحوسبة والخوارزميات</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">البرمجة الهيكلية</p>
                            <p className="text-unlimited-gray text-sm">لغة C/C++ والمفاهيم الأساسية</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">الرياضيات للمهندسين</p>
                            <p className="text-unlimited-gray text-sm">التفاضل والتكامل والجبر الخطي</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">الفيزياء العامة</p>
                            <p className="text-unlimited-gray text-sm">أساسيات الفيزياء للمهندسين</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Book className="h-5 w-5 ml-2 text-unlimited-blue" />
                        السنة الثانية
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">هياكل البيانات والخوارزميات</p>
                            <p className="text-unlimited-gray text-sm">تنظيم البيانات وتحليل الخوارزميات</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">البرمجة الموجهة للكائنات</p>
                            <p className="text-unlimited-gray text-sm">مفاهيم OOP ولغة Java</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">قواعد البيانات</p>
                            <p className="text-unlimited-gray text-sm">تصميم وإدارة قواعد البيانات العلائقية</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">نظم التشغيل</p>
                            <p className="text-unlimited-gray text-sm">مفاهيم وتطبيقات أنظمة التشغيل</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Book className="h-5 w-5 ml-2 text-unlimited-blue" />
                        السنة الثالثة
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">هندسة البرمجيات</p>
                            <p className="text-unlimited-gray text-sm">منهجيات تطوير البرمجيات ودورة حياة المشروع</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">تطوير تطبيقات الويب</p>
                            <p className="text-unlimited-gray text-sm">HTML, CSS, JavaScript, وأطر العمل الحديثة</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">شبكات الحاسوب</p>
                            <p className="text-unlimited-gray text-sm">بروتوكولات وتطبيقات الشبكات</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">اختبار البرمجيات وضمان الجودة</p>
                            <p className="text-unlimited-gray text-sm">استراتيجيات ومنهجيات اختبار البرمجيات</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Book className="h-5 w-5 ml-2 text-unlimited-blue" />
                        السنة الرابعة
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">أمن المعلومات</p>
                            <p className="text-unlimited-gray text-sm">أساسيات الأمن السيبراني وتشفير البيانات</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">الذكاء الاصطناعي وتعلم الآلة</p>
                            <p className="text-unlimited-gray text-sm">أساسيات AI/ML وتطبيقاتها في البرمجيات</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">تطوير تطبيقات الموبايل</p>
                            <p className="text-unlimited-gray text-sm">تطوير تطبيقات Android و iOS</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-unlimited-blue mt-2 ml-2"></div>
                          <div>
                            <p className="font-medium">مشروع التخرج</p>
                            <p className="text-unlimited-gray text-sm">تطوير مشروع برمجي متكامل</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="careers" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">الفرص الوظيفية لخريجي هندسة البرمجيات</h2>
                <p className="text-unlimited-gray mb-6">
                  يتمتع خريجو هندسة البرمجيات بفرص وظيفية متنوعة ومتميزة في سوق العمل المحلي والعالمي، حيث يمكنهم العمل في مجالات مختلفة:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="bg-unlimited-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-unlimited-blue" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">مطور برمجيات</h3>
                      <p className="text-unlimited-gray mb-4">
                        العمل على تصميم وتطوير وصيانة تطبيقات وأنظمة برمجية متنوعة في شركات التكنولوجيا والبرمجيات.
                      </p>
                      <div className="text-sm">
                        <p className="text-unlimited-gray">متوسط الراتب السنوي:</p>
                        <p className="font-semibold">$70,000 - $120,000</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="bg-unlimited-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-unlimited-blue" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">مهندس اختبار البرمجيات</h3>
                      <p className="text-unlimited-gray mb-4">
                        التخصص في اختبار البرمجيات وضمان الجودة لتحديد وإصلاح الأخطاء وتحسين أداء التطبيقات.
                      </p>
                      <div className="text-sm">
                        <p className="text-unlimited-gray">متوسط الراتب السنوي:</p>
                        <p className="font-semibold">$65,000 - $110,000</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="bg-unlimited-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-unlimited-blue" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">مهندس DevOps</h3>
                      <p className="text-unlimited-gray mb-4">
                        دمج عمليات التطوير والتشغيل لتسريع دورة حياة تطوير البرامج وضمان التسليم المستمر.
                      </p>
                      <div className="text-sm">
                        <p className="text-unlimited-gray">متوسط الراتب السنوي:</p>
                        <p className="font-semibold">$80,000 - $130,000</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="bg-unlimited-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-unlimited-blue" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">مهندس بيانات</h3>
                      <p className="text-unlimited-gray mb-4">
                        تصميم وبناء وإدارة أنظمة معالجة البيانات الكبيرة وتحليلها لاستخراج المعلومات القيمة.
                      </p>
                      <div className="text-sm">
                        <p className="text-unlimited-gray">متوسط الراتب السنوي:</p>
                        <p className="font-semibold">$75,000 - $135,000</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="bg-unlimited-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-unlimited-blue" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">مدير مشاريع تكنولوجية</h3>
                      <p className="text-unlimited-gray mb-4">
                        إدارة فرق تطوير البرمجيات وقيادة المشاريع التكنولوجية من التخطيط حتى التسليم.
                      </p>
                      <div className="text-sm">
                        <p className="text-unlimited-gray">متوسط الراتب السنوي:</p>
                        <p className="font-semibold">$90,000 - $150,000</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="bg-unlimited-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-unlimited-blue" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">أخصائي أمن سيبراني</h3>
                      <p className="text-unlimited-gray mb-4">
                        حماية الأنظمة والبيانات من التهديدات والاختراقات وتطوير استراتيجيات أمنية فعالة.
                      </p>
                      <div className="text-sm">
                        <p className="text-unlimited-gray">متوسط الراتب السنوي:</p>
                        <p className="font-semibold">$85,000 - $140,000</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-unlimited-blue/10 p-6 rounded-lg mt-6">
                  <h3 className="font-bold text-lg mb-3">آفاق مستقبلية</h3>
                  <p className="text-unlimited-gray mb-4">
                    يعد تخصص هندسة البرمجيات من التخصصات المطلوبة بشكل متزايد في سوق العمل العالمي، خاصة مع التحول الرقمي المتسارع في جميع القطاعات. وفقاً للإحصاءات العالمية، من المتوقع نمو الطلب على مهندسي البرمجيات بنسبة 22% حتى عام 2030، وهو معدل أعلى بكثير من متوسط المهن الأخرى.
                  </p>
                  <p className="text-unlimited-gray">
                    كما يمكن لخريجي هندسة البرمجيات إكمال دراساتهم العليا في مجالات متخصصة مثل الذكاء الاصطناعي، علوم البيانات، أمن المعلومات، أو تطوير التقنيات الناشئة مثل blockchain وإنترنت الأشياء.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">برامج دراسية مشابهة قد تهمك</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-0">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="/lovable-uploads/eb0c5633-c981-4a70-84a3-5274cb91e9e5.png" 
                    alt="هندسة الكمبيوتر" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">هندسة الكمبيوتر</h3>
                  <div className="text-unlimited-gray mb-4">
                    تخصص يجمع بين علوم الحاسب والهندسة الكهربائية لتطوير أنظمة الحاسوب المتكاملة.
                  </div>
                  <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to="/programs/computer-engineering">عرض التفاصيل</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="/lovable-uploads/dbd3909c-00e0-4028-87b9-7c67c6beda53.png" 
                    alt="علوم الحاسب" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">علوم الحاسب</h3>
                  <div className="text-unlimited-gray mb-4">
                    دراسة أساسيات الحوسبة والخوارزميات وتطبيقاتها في حل المشكلات المعقدة.
                  </div>
                  <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to="/programs/computer-science">عرض التفاصيل</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="/lovable-uploads/2be9319f-b77f-4bb2-9766-1d7f5383d723.png" 
                    alt="نظم المعلومات" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">نظم المعلومات</h3>
                  <div className="text-unlimited-gray mb-4">
                    دراسة كيفية استخدام تكنولوجيا المعلومات لدعم العمليات التجارية واتخاذ القرارات.
                  </div>
                  <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to="/programs/information-systems">عرض التفاصيل</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-unlimited-blue text-white p-8 rounded-lg mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">هل أنت مستعد للتقديم؟</h2>
              <p className="mb-6">تقدم بطلبك الآن للدراسة في برنامج هندسة البرمجيات وابدأ مسيرتك المهنية في عالم التكنولوجيا والبرمجة.</p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100 font-bold">
                  <Link to="/apply?program=software-engineering">
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
                src="/lovable-uploads/3282f8fb-3607-47d2-a8fa-d442b2cb1485.png"
                alt="هندسة البرمجيات"
                className="rounded-lg max-h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SoftwareEngineeringProgram;
