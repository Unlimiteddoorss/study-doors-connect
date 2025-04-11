
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Calendar, Clock, Book, Languages, Award, GraduationCap, Globe } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dummyPrograms } from '@/data/programsData';
import { useToast } from '@/hooks/use-toast';

const ProgramDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<any>(null);
  const [relatedPrograms, setRelatedPrograms] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      const foundProgram = dummyPrograms.find(p => p.id === parseInt(id));
      setProgram(foundProgram);
      
      // برامج مشابهة (نفس الجامعة أو نفس اللغة)
      if (foundProgram) {
        const similar = dummyPrograms
          .filter(p => 
            p.id !== foundProgram.id && 
            (p.university === foundProgram.university || 
             p.language === foundProgram.language)
          )
          .slice(0, 3);
        setRelatedPrograms(similar.length > 0 ? similar : dummyPrograms.slice(0, 3));
      }
    }
  }, [id]);

  const handleApply = () => {
    toast({
      title: "تم تقديم الطلب بنجاح",
      description: "سيتواصل معك مستشارنا التعليمي قريباً",
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
        {/* رأس صفحة البرنامج */}
        <div className="relative">
          <div className="h-64 md:h-80 overflow-hidden rounded-lg">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto -mt-24 relative z-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {program.badges && program.badges.map((badge: string) => (
                  <Badge key={badge} className="bg-unlimited-blue/10 text-unlimited-blue hover:bg-unlimited-blue/20">
                    {badge}
                  </Badge>
                ))}
                {program.scholarshipAvailable && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    منحة متاحة
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold">{program.title}</h1>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center text-unlimited-gray">
                    <GraduationCap className="h-4 w-4 ml-2" />
                    <span>{program.university}</span>
                  </div>
                  <div className="flex items-center text-unlimited-gray mt-1">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{program.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-unlimited-gray line-through text-sm">{program.fee}</div>
                  <div className="text-unlimited-blue font-bold text-xl">{program.discount || program.fee}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* تفاصيل البرنامج */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="curriculum">المنهج الدراسي</TabsTrigger>
                <TabsTrigger value="requirements">متطلبات القبول</TabsTrigger>
                <TabsTrigger value="career">فرص العمل</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">نبذة عن البرنامج</h2>
                  <p className="text-unlimited-gray leading-relaxed">
                    يعتبر برنامج {program.title} من أفضل البرامج الدراسية في مجاله في {program.location.split('،')[0]}. 
                    يقدم البرنامج مناهج حديثة تم تصميمها بالتعاون مع خبراء المجال، ويوفر للطلاب تجربة تعليمية 
                    تجمع بين النظرية والتطبيق العملي.
                  </p>
                  <p className="text-unlimited-gray leading-relaxed mt-4">
                    يعتمد البرنامج على أساليب تدريس متقدمة تراعي الفروق الفردية بين الطلاب، كما يتيح للطلاب 
                    فرصاً للمشاركة في مشاريع بحثية وتطبيقية تعزز من مهاراتهم العملية وتزيد من فرصهم المستقبلية 
                    في سوق العمل.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Calendar className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">الموعد النهائي</h3>
                      <p>{program.deadline}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Clock className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">المدة الدراسية</h3>
                      <p>{program.duration}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Languages className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">لغة الدراسة</h3>
                      <p>{program.language}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Award className="h-10 w-10 text-unlimited-blue mb-2" />
                      <h3 className="font-semibold">المؤهل</h3>
                      <p>{program.title.includes('بكالوريوس') ? 'بكالوريوس' : 
                         program.title.includes('ماجستير') ? 'ماجستير' : 
                         program.title.includes('دكتوراه') ? 'دكتوراه' : 'شهادة'}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3">أهداف البرنامج</h3>
                  <ul className="list-disc list-inside space-y-2 text-unlimited-gray">
                    <li>تزويد الطلاب بالمعارف النظرية والعملية الأساسية في مجال الدراسة.</li>
                    <li>تطوير مهارات الطلاب في التفكير النقدي وحل المشكلات.</li>
                    <li>إكساب الطلاب مهارات البحث العلمي والتعلم المستمر.</li>
                    <li>تنمية قدرات الطلاب على العمل ضمن فريق والتواصل الفعال.</li>
                    <li>إعداد خريجين قادرين على المنافسة في سوق العمل المحلي والدولي.</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="mt-6 space-y-6">
                <h2 className="text-2xl font-bold mb-4">المنهج الدراسي</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">السنة الأولى</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">الفصل الأول</h4>
                          <ul className="mt-2 space-y-1">
                            <li>مقدمة في التخصص</li>
                            <li>أساسيات الرياضيات</li>
                            <li>مهارات الاتصال</li>
                            <li>لغة أجنبية (1)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">الفصل الثاني</h4>
                          <ul className="mt-2 space-y-1">
                            <li>مبادئ التخصص</li>
                            <li>إحصاء تطبيقي</li>
                            <li>مهارات الحاسوب</li>
                            <li>لغة أجنبية (2)</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3">السنة الثانية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">الفصل الأول</h4>
                          <ul className="mt-2 space-y-1">
                            <li>نظريات متقدمة</li>
                            <li>تطبيقات عملية (1)</li>
                            <li>منهجية البحث</li>
                            <li>مقرر اختياري (1)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">الفصل الثاني</h4>
                          <ul className="mt-2 space-y-1">
                            <li>التحليل والتصميم</li>
                            <li>تطبيقات عملية (2)</li>
                            <li>أخلاقيات المهنة</li>
                            <li>مقرر اختياري (2)</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3">السنة الثالثة والرابعة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">مقررات التخصص</h4>
                          <ul className="mt-2 space-y-1">
                            <li>تقنيات متقدمة في المجال</li>
                            <li>إدارة المشاريع</li>
                            <li>دراسات الحالة</li>
                            <li>مقررات اختيارية متخصصة</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">المشروع النهائي والتدريب</h4>
                          <ul className="mt-2 space-y-1">
                            <li>مشروع التخرج</li>
                            <li>التدريب الميداني</li>
                            <li>ورش عمل تخصصية</li>
                            <li>مشاريع تطبيقية</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="mt-6 space-y-6">
                <h2 className="text-2xl font-bold mb-4">متطلبات القبول</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">المستندات المطلوبة</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                        <span>شهادة الثانوية العامة (للبكالوريوس) أو البكالوريوس (للدراسات العليا) مصدقة ومترجمة</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                        <span>كشف الدرجات مصدق ومترجم</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                        <span>صورة من جواز السفر ساري المفعول</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                        <span>صور شخصية حديثة</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                        <span>شهادة كفاءة اللغة (الإنجليزية أو التركية حسب لغة الدراسة)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                        <span>خطاب توصية (للدراسات العليا)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                        <span>بيان الغرض من الدراسة (للدراسات العليا)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3">المتطلبات الأكاديمية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">لبرامج البكالوريوس</h4>
                          <ul className="mt-2 space-y-1">
                            <li>معدل شهادة الثانوية العامة: 65% كحد أدنى</li>
                            <li>شهادة كفاءة اللغة الإنجليزية: TOEFL (70) أو IELTS (5.5)</li>
                            <li>اجتياز امتحان القبول (إن وجد)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">لبرامج الدراسات العليا</h4>
                          <ul className="mt-2 space-y-1">
                            <li>معدل البكالوريوس: 2.75/4.00 كحد أدنى</li>
                            <li>شهادة كفاءة اللغة الإنجليزية: TOEFL (80) أو IELTS (6.0)</li>
                            <li>اجتياز المقابلة الشخصية</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="bg-unlimited-blue/5 p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">ملاحظة هامة</h3>
                    <p>
                      قد تختلف المتطلبات حسب الجامعة والبرنامج. يرجى التواصل مع مستشارينا للحصول على المعلومات التفصيلية 
                      الخاصة بالبرنامج المحدد والمساعدة في إعداد ملف القبول.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="career" className="mt-6 space-y-6">
                <h2 className="text-2xl font-bold mb-4">فرص العمل والمسارات المهنية</h2>
                
                <p className="text-unlimited-gray">
                  يؤهل برنامج {program.title} الخريجين للعمل في مجالات متنوعة، ويفتح أمامهم العديد 
                  من الفرص المهنية المتميزة في مختلف القطاعات.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3">المجالات المهنية</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>شركات القطاع الخاص</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>المؤسسات الحكومية</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>المنظمات الدولية</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>قطاع التعليم والبحث العلمي</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>ريادة الأعمال</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3">المسميات الوظيفية</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>أخصائي / مستشار</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>مدير مشروع</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>محلل بيانات</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>باحث</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>مطور / مصمم</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3">فرص الدراسات العليا</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>برامج الماجستير المتخصصة</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>برامج الدكتوراه</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>الشهادات المهنية المتخصصة</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>برامج الزمالة البحثية</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-unlimited-blue mt-0.5 flex-shrink-0" />
                          <span>التخصصات البينية</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <p className="text-unlimited-gray">
                    تحرص {program.university} على توفير خدمات التوجيه المهني وفرص التدريب العملي للطلاب، 
                    كما تعقد شراكات مع مؤسسات رائدة في القطاعين العام والخاص لتعزيز فرص التوظيف للخريجين.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* الشريط الجانبي */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">التقديم على البرنامج</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-unlimited-gray">رسوم الدراسة:</span>
                  <span className="font-semibold text-unlimited-blue">{program.discount || program.fee}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-unlimited-gray">آخر موعد للتقديم:</span>
                  <span className="font-semibold">{program.deadline}</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button onClick={handleApply} className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    قدم الآن
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">تواصل مع مستشار</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">مميزات البرنامج</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <Book className="h-4 w-4" />
                    </div>
                    <span>منهج دراسي حديث ومتطور</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span>هيئة تدريس ذات خبرة عالمية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <Globe className="h-4 w-4" />
                    </div>
                    <span>فرص تبادل طلابي دولي</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-unlimited-blue/10 p-1 rounded text-unlimited-blue mt-1">
                      <Award className="h-4 w-4" />
                    </div>
                    <span>شهادة معترف بها دولياً</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">تحتاج مساعدة؟</h3>
                <p className="text-unlimited-gray mb-4">
                  مستشارونا جاهزون لمساعدتك في كل خطوات التسجيل وتقديم الطلب
                </p>
                <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                  <Link to="/contact">احصل على استشارة مجانية</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* برامج مشابهة */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">برامج قد تهمك أيضاً</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{program.title}</h3>
                  <p className="text-unlimited-gray mb-4">{program.university}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-unlimited-blue font-semibold">{program.discount || program.fee}</span>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/programs/${program.id}`}>عرض التفاصيل</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
