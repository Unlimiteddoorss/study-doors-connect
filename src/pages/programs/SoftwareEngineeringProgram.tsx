
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Users, Building2, GraduationCap, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const SoftwareEngineeringProgram = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleApply = () => {
    toast({
      title: "تم بدء عملية التقديم",
      description: "سيتم توجيهك لصفحة التقديم للبرنامج",
    });
    navigate("/apply?program=software-engineering");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-8">
              <Badge className="mb-2 bg-unlimited-blue text-white">بكالوريوس</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">هندسة البرمجيات</h1>
              <p className="text-unlimited-gray mb-6">برنامج دراسي متكامل يؤهلك للعمل في مجال تطوير البرمجيات بأحدث التقنيات والمنهجيات العالمية</p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-unlimited-blue ml-2" />
                  <span>جامعة اسطنبول التقنية</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-unlimited-blue ml-2" />
                  <span>4 سنوات</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-unlimited-blue ml-2" />
                  <span>الحصة: 100 طالب</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-unlimited-blue ml-2" />
                  <span>لغة الدراسة: الإنجليزية</span>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="curriculum">المنهج الدراسي</TabsTrigger>
                <TabsTrigger value="requirements">متطلبات القبول</TabsTrigger>
                <TabsTrigger value="career">فرص العمل</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">عن البرنامج</h2>
                  <p className="text-unlimited-gray mb-4">
                    يقدم برنامج بكالوريوس هندسة البرمجيات في جامعة اسطنبول التقنية تجربة تعليمية شاملة ومتطورة في مجال تطوير البرمجيات. 
                    يهدف البرنامج إلى تأهيل خريجين قادرين على تحليل وتصميم وتطوير وصيانة أنظمة البرمجيات المعقدة باستخدام أحدث التقنيات 
                    والمنهجيات العالمية.
                  </p>
                  
                  <p className="text-unlimited-gray mb-4">
                    يتميز البرنامج بمزج الجوانب النظرية مع التطبيقات العملية، حيث يتاح للطلاب فرصة العمل على مشاريع حقيقية 
                    بالتعاون مع شركات تكنولوجية رائدة في تركيا والعالم. كما يوفر البرنامج فرصًا للتدريب العملي والمشاركة 
                    في مسابقات البرمجة المحلية والدولية.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">مميزات البرنامج</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-unlimited-blue ml-2" />
                      <span>مناهج دراسية متطورة ومحدثة باستمرار وفق احتياجات سوق العمل</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-unlimited-blue ml-2" />
                      <span>أعضاء هيئة تدريس ذوي خبرة أكاديمية وعملية في مجالات البرمجة المختلفة</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-unlimited-blue ml-2" />
                      <span>معامل حاسوب متطورة مجهزة بأحدث التقنيات والبرمجيات</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-unlimited-blue ml-2" />
                      <span>شراكات مع شركات تكنولوجية عالمية توفر فرص تدريب وتوظيف للخريجين</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-unlimited-blue ml-2" />
                      <span>إمكانية المشاركة في برامج التبادل الطلابي مع جامعات عالمية مرموقة</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-unlimited-blue ml-2" />
                      <span>إمكانية الحصول على شهادات مهنية معترف بها دوليًا بالإضافة للشهادة الأكاديمية</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">معلومات إضافية</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">الرسوم الدراسية</h3>
                      <p className="text-unlimited-blue font-bold">5500 دولار / سنويًا</p>
                      <p className="text-sm text-unlimited-gray">تشمل جميع المواد الدراسية والمعامل</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">نظام الدراسة</h3>
                      <p className="text-unlimited-blue font-bold">نظام الساعات المعتمدة</p>
                      <p className="text-sm text-unlimited-gray">240 ساعة معتمدة على مدار 8 فصول دراسية</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">تاريخ بدء الدراسة</h3>
                      <p className="text-unlimited-blue font-bold">سبتمبر 2025</p>
                      <p className="text-sm text-unlimited-gray">التقديم متاح حاليًا للفصل الدراسي القادم</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">السنة التحضيرية</h3>
                      <p className="text-unlimited-blue font-bold">إلزامية للغة الإنجليزية</p>
                      <p className="text-sm text-unlimited-gray">يمكن تجاوزها باختبار تحديد المستوى</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">المنهج الدراسي</h2>
                  <p className="text-unlimited-gray mb-4">
                    يتكون المنهج الدراسي لبرنامج بكالوريوس هندسة البرمجيات من مجموعة متنوعة من المقررات التي تغطي 
                    جميع جوانب تطوير البرمجيات، من الأساسيات النظرية إلى التطبيقات العملية المتقدمة.
                  </p>
                  
                  <div className="space-y-6">
                    {/* السنة الأولى */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 bg-unlimited-blue/10 p-2 rounded-md">السنة الأولى</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل الأول</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>مقدمة في علوم الحاسب</li>
                              <li>برمجة 1 (لغة C++)</li>
                              <li>رياضيات متقطعة</li>
                              <li>حساب التفاضل والتكامل</li>
                              <li>مهارات الاتصال الفنية</li>
                              <li>فيزياء 1</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل الثاني</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>هياكل البيانات</li>
                              <li>برمجة 2 (البرمجة كائنية التوجه)</li>
                              <li>الجبر الخطي</li>
                              <li>أساسيات الدوائر الكهربائية</li>
                              <li>فيزياء 2</li>
                              <li>مقدمة في نظم قواعد البيانات</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    {/* السنة الثانية */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 bg-unlimited-blue/10 p-2 rounded-md">السنة الثانية</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل الثالث</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>بنية الحاسب والتنظيم</li>
                              <li>خوارزميات وتحليلها</li>
                              <li>تطوير تطبيقات الويب</li>
                              <li>نظم قواعد البيانات المتقدمة</li>
                              <li>الإحصاء واحتمالات</li>
                              <li>هندسة البرمجيات 1</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل الرابع</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>نظم التشغيل</li>
                              <li>البرمجة الموزعة</li>
                              <li>تصميم واجهات المستخدم</li>
                              <li>هندسة البرمجيات 2</li>
                              <li>أمن المعلومات</li>
                              <li>التدريب الميداني 1</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    {/* السنة الثالثة */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 bg-unlimited-blue/10 p-2 rounded-md">السنة الثالثة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل الخامس</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>شبكات الحاسب</li>
                              <li>تطوير تطبيقات الهواتف الذكية</li>
                              <li>إدارة مشاريع البرمجيات</li>
                              <li>الحوسبة السحابية</li>
                              <li>الذكاء الاصطناعي</li>
                              <li>مقرر اختياري 1</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل السادس</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>اختبار البرمجيات وضمان الجودة</li>
                              <li>تعلم الآلة</li>
                              <li>تطوير البرمجيات الآمنة</li>
                              <li>إدارة قواعد البيانات المتقدمة</li>
                              <li>مقرر اختياري 2</li>
                              <li>التدريب الميداني 2</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    {/* السنة الرابعة */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 bg-unlimited-blue/10 p-2 rounded-md">السنة الرابعة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل السابع</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>مشروع التخرج 1</li>
                              <li>البيانات الضخمة وتحليلها</li>
                              <li>الحوسبة المتوازية والموزعة</li>
                              <li>أخلاقيات مهنة الحوسبة</li>
                              <li>مقرر اختياري 3</li>
                              <li>مقرر اختياري 4</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">الفصل الثامن</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>مشروع التخرج 2</li>
                              <li>ريادة الأعمال التقنية</li>
                              <li>تطوير البرمجيات المتقدم</li>
                              <li>موضوعات خاصة في هندسة البرمجيات</li>
                              <li>مقرر اختياري 5</li>
                              <li>التدريب الميداني 3</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    {/* المقررات الاختيارية */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 bg-unlimited-blue/10 p-2 rounded-md">المقررات الاختيارية</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">مسار تطوير الويب</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>تطوير واجهات الويب المتقدمة</li>
                              <li>إطارات عمل JavaScript الحديثة</li>
                              <li>خدمات الويب والواجهات البرمجية</li>
                              <li>تجربة المستخدم وتصميم الواجهات</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">مسار الذكاء الاصطناعي</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>التعلم العميق</li>
                              <li>معالجة اللغات الطبيعية</li>
                              <li>الرؤية الحاسوبية</li>
                              <li>نظم التوصية</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">مسار أمن المعلومات</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>التشفير وأمن الشبكات</li>
                              <li>تحليل البرمجيات الخبيثة</li>
                              <li>الجرائم الإلكترونية والأدلة الرقمية</li>
                              <li>أمن تطبيقات الويب</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">متطلبات القبول</h2>
                  <p className="text-unlimited-gray mb-4">
                    للقبول في برنامج بكالوريوس هندسة البرمجيات، يجب على المتقدمين استيفاء المتطلبات التالية:
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">المتطلبات الأكاديمية</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">شهادة الثانوية العامة</span>
                            <p className="text-sm text-unlimited-gray">بمعدل لا يقل عن 80% أو ما يعادلها</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">درجات متميزة في الرياضيات</span>
                            <p className="text-sm text-unlimited-gray">لا تقل عن 85% في مادة الرياضيات</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">درجات جيدة في العلوم (الفيزياء)</span>
                            <p className="text-sm text-unlimited-gray">يفضل الحصول على درجات متميزة في مادة الفيزياء</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">متطلبات اللغة</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">اتقان اللغة الإنجليزية</span>
                            <p className="text-sm text-unlimited-gray">الحصول على شهادة TOEFL بدرجة 80 على الأقل، أو IELTS بدرجة 6.0 على الأقل</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">اجتياز اختبار تحديد المستوى</span>
                            <p className="text-sm text-unlimited-gray">يمكن للطلاب الذين لا يستوفون شروط اللغة الإنجليزية دراسة السنة التحضيرية</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">المستندات المطلوبة</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">استمارة التقديم مكتملة البيانات</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">نسخة من جواز السفر ساري المفعول</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">شهادة الثانوية العامة وكشف الدرجات المعتمد</span>
                            <p className="text-sm text-unlimited-gray">مترجمة للغة الإنجليزية ومصدقة حسب الأصول</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">شهادة إتقان اللغة الإنجليزية</span>
                            <p className="text-sm text-unlimited-gray">TOEFL أو IELTS أو ما يعادلها</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">خطاب توصية</span>
                            <p className="text-sm text-unlimited-gray">يفضل تقديم خطاب توصية من معلمي الرياضيات أو الحاسوب</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">بيان شخصي</span>
                            <p className="text-sm text-unlimited-gray">يوضح سبب اختيارك لتخصص هندسة البرمجيات وأهدافك المهنية</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-unlimited-blue ml-2 mt-1" />
                          <div>
                            <span className="font-medium">صور شخصية</span>
                            <p className="text-sm text-unlimited-gray">4 صور شخصية حديثة بخلفية بيضاء</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">خطوات التقديم</h3>
                      <ol className="space-y-2">
                        <li className="flex items-start">
                          <span className="bg-unlimited-blue text-white rounded-full h-6 w-6 flex items-center justify-center ml-2 mt-1">1</span>
                          <div>
                            <span className="font-medium">تعبئة نموذج التقديم عبر الإنترنت</span>
                            <p className="text-sm text-unlimited-gray">يمكنك التقديم مباشرة من خلال موقعنا أو زيارة أحد مكاتبنا</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-unlimited-blue text-white rounded-full h-6 w-6 flex items-center justify-center ml-2 mt-1">2</span>
                          <div>
                            <span className="font-medium">دفع رسوم التقديم</span>
                            <p className="text-sm text-unlimited-gray">رسوم التقديم 100 دولار أمريكي غير قابلة للاسترداد</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-unlimited-blue text-white rounded-full h-6 w-6 flex items-center justify-center ml-2 mt-1">3</span>
                          <div>
                            <span className="font-medium">تقديم المستندات المطلوبة</span>
                            <p className="text-sm text-unlimited-gray">يمكن تقديم المستندات إلكترونياً أو في أحد مكاتبنا</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-unlimited-blue text-white rounded-full h-6 w-6 flex items-center justify-center ml-2 mt-1">4</span>
                          <div>
                            <span className="font-medium">المقابلة الشخصية (اختيارية)</span>
                            <p className="text-sm text-unlimited-gray">قد يتم دعوة بعض المتقدمين لإجراء مقابلة شخصية أو عبر الإنترنت</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-unlimited-blue text-white rounded-full h-6 w-6 flex items-center justify-center ml-2 mt-1">5</span>
                          <div>
                            <span className="font-medium">إصدار خطاب القبول</span>
                            <p className="text-sm text-unlimited-gray">سيتم إبلاغك بقرار القبول خلال 2-4 أسابيع من تاريخ التقديم</p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="career" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">فرص العمل والمسارات المهنية</h2>
                  <p className="text-unlimited-gray mb-4">
                    يتمتع خريجو برنامج هندسة البرمجيات بفرص وظيفية متنوعة وواسعة في سوق العمل المحلي والعالمي. 
                    نظرًا للطلب المتزايد على المتخصصين في تطوير البرمجيات، يمكن للخريجين العمل في مجموعة متنوعة 
                    من القطاعات والصناعات.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">المسارات الوظيفية</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">تطوير البرمجيات</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>مهندس برمجيات</li>
                              <li>مطور تطبيقات الويب</li>
                              <li>مطور تطبيقات الهواتف الذكية</li>
                              <li>مطور واجهات المستخدم</li>
                              <li>مطور الواجهات الخلفية</li>
                              <li>مهندس برمجيات التعلم الآلي</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">إدارة البرمجيات</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>مدير مشاريع البرمجيات</li>
                              <li>مهندس ضمان الجودة</li>
                              <li>محلل نظم</li>
                              <li>مصمم نظم البرمجيات</li>
                              <li>مهندس أمن البرمجيات</li>
                              <li>مهندس بيانات</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">مجالات متخصصة</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>مطور ألعاب</li>
                              <li>مهندس ذكاء اصطناعي</li>
                              <li>مهندس سحابة</li>
                              <li>مهندس DevOps</li>
                              <li>مطور الواقع الافتراضي/المعزز</li>
                              <li>مطور تطبيقات إنترنت الأشياء</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">المسارات الريادية والأكاديمية</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>رائد أعمال تكنولوجي</li>
                              <li>مستشار تقني</li>
                              <li>باحث في مجال البرمجيات</li>
                              <li>محاضر أكاديمي</li>
                              <li>مدرب تقني</li>
                              <li>كاتب محتوى تقني</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">القطاعات والصناعات</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-semibold">التكنولوجيا والاتصالات</h4>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>شركات البرمجيات العالمية</li>
                            <li>شركات التكنولوجيا الناشئة</li>
                            <li>شركات الاتصالات</li>
                            <li>مراكز البحث والتطوير</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-semibold">القطاع المالي</h4>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>البنوك والمؤسسات المالية</li>
                            <li>شركات التأمين</li>
                            <li>شركات التكنولوجيا المالية</li>
                            <li>بورصات الأوراق المالية</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-semibold">الصحة والتعليم</h4>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>المستشفيات ومراكز الرعاية الصحية</li>
                            <li>شركات التكنولوجيا الطبية</li>
                            <li>المؤسسات التعليمية</li>
                            <li>منصات التعليم الإلكتروني</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-semibold">الحكومة والقطاع العام</h4>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>هيئات تكنولوجيا المعلومات الحكومية</li>
                            <li>مشاريع الحكومة الإلكترونية</li>
                            <li>مؤسسات الدفاع والأمن</li>
                            <li>المنظمات غير الحكومية</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-semibold">الترفيه والإعلام</h4>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>شركات الألعاب الإلكترونية</li>
                            <li>منصات البث والمحتوى</li>
                            <li>استديوهات الوسائط المتعددة</li>
                            <li>شركات الإعلام الرقمي</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-semibold">النقل والخدمات اللوجستية</h4>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>شركات السيارات والنقل الذكي</li>
                            <li>الطيران وإدارة المطارات</li>
                            <li>شركات الشحن والخدمات اللوجستية</li>
                            <li>منصات التوصيل والخدمات</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">الشهادات المهنية</h3>
                      <p className="text-unlimited-gray mb-4">
                        يمكن للخريجين تعزيز فرصهم المهنية من خلال الحصول على شهادات مهنية معترف بها دولياً 
                        في مختلف مجالات تطوير البرمجيات:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">شهادات هندسة البرمجيات</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>Certified Software Development Professional (CSDP)</li>
                              <li>AWS Certified Developer</li>
                              <li>Microsoft Azure Developer Associate</li>
                              <li>Google Cloud Professional Developer</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">شهادات إدارة المشاريع</h4>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>Project Management Professional (PMP)</li>
                              <li>Certified ScrumMaster (CSM)</li>
                              <li>PRINCE2 Practitioner</li>
                              <li>Professional Scrum Product Owner</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">توقعات الأجور</h3>
                      <p className="text-unlimited-gray mb-4">
                        يتمتع خريجو هندسة البرمجيات بفرص أجور تنافسية تتطور مع اكتساب الخبرة:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-unlimited-blue/5 p-4 rounded-md border border-unlimited-blue/20">
                          <h4 className="font-semibold">مبتدئ (0-2 سنة)</h4>
                          <p className="text-unlimited-blue font-bold text-lg mt-2">35,000 - 50,000 دولار سنوياً</p>
                        </div>
                        <div className="bg-unlimited-blue/5 p-4 rounded-md border border-unlimited-blue/20">
                          <h4 className="font-semibold">متوسط (3-5 سنوات)</h4>
                          <p className="text-unlimited-blue font-bold text-lg mt-2">50,000 - 80,000 دولار سنوياً</p>
                        </div>
                        <div className="bg-unlimited-blue/5 p-4 rounded-md border border-unlimited-blue/20">
                          <h4 className="font-semibold">خبير (6+ سنوات)</h4>
                          <p className="text-unlimited-blue font-bold text-lg mt-2">80,000 - 120,000+ دولار سنوياً</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-24">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">ابدأ رحلتك الآن</h3>
                    <p className="text-unlimited-gray">تقدم بطلبك اليوم واحجز مقعدك في برنامج هندسة البرمجيات</p>
                  </div>
                  
                  <Button 
                    onClick={handleApply} 
                    className="w-full mb-4 bg-unlimited-blue hover:bg-unlimited-dark-blue"
                    size="lg"
                  >
                    تقدم الآن
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/contact">تواصل مع مستشار القبول</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">تفاصيل البرنامج</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-unlimited-gray">المستوى</span>
                      <span className="font-medium">بكالوريوس</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-unlimited-gray">مدة الدراسة</span>
                      <span className="font-medium">4 سنوات</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-unlimited-gray">لغة الدراسة</span>
                      <span className="font-medium">الإنجليزية</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-unlimited-gray">الرسوم الدراسية</span>
                      <span className="font-medium">5500 دولار/سنوياً</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-unlimited-gray">عدد المقاعد</span>
                      <span className="font-medium">100</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-unlimited-gray">بدء الدراسة</span>
                      <span className="font-medium">سبتمبر 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-unlimited-gray">آخر موعد للتقديم</span>
                      <span className="font-medium">15 يوليو 2025</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">برامج أخرى قد تهمك</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link to="/programs/computer-science" className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors">
                        <div>
                          <h4 className="font-medium hover:text-unlimited-blue">علوم الحاسوب</h4>
                          <p className="text-sm text-unlimited-gray">بكالوريوس - 4 سنوات</p>
                        </div>
                        <ArrowRight className="h-4 w-4 mr-auto text-unlimited-blue" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/programs/information-security" className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors">
                        <div>
                          <h4 className="font-medium hover:text-unlimited-blue">أمن المعلومات</h4>
                          <p className="text-sm text-unlimited-gray">بكالوريوس - 4 سنوات</p>
                        </div>
                        <ArrowRight className="h-4 w-4 mr-auto text-unlimited-blue" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/programs/artificial-intelligence" className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors">
                        <div>
                          <h4 className="font-medium hover:text-unlimited-blue">الذكاء الاصطناعي وعلوم البيانات</h4>
                          <p className="text-sm text-unlimited-gray">بكالوريوس - 4 سنوات</p>
                        </div>
                        <ArrowRight className="h-4 w-4 mr-auto text-unlimited-blue" />
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SoftwareEngineeringProgram;
