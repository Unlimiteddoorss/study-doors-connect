
import React from 'react';
import { UniversityProgram } from '@/data/universityPrograms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, DollarSign, Languages, CalendarDays, School, MapPin, CheckCircle, Building, FileText, Users, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ProgramDetailsProps {
  program: UniversityProgram;
  universityName: string;
  universityId: number;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ program, universityName, universityId }) => {
  // ترجمة الدرجة العلمية
  const translateDegree = (degree: string): string => {
    switch(degree) {
      case 'Bachelor': return 'بكالوريوس';
      case 'Master': return 'ماجستير';
      case 'PhD': return 'دكتوراه';
      case 'Diploma': return 'دبلوم';
      case 'Vocational School': return 'معهد مهني';
      default: return degree;
    }
  };

  // ترجمة اللغة
  const translateLanguage = (language: string): string => {
    switch(language) {
      case 'English': return 'الإنجليزية';
      case 'Turkish': return 'التركية';
      case 'Arabic': return 'العربية';
      default: return language;
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-unlimited-blue shadow-lg">
      {/* رأس البطاقة */}
      <CardHeader className="bg-unlimited-blue text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Badge className="bg-white text-unlimited-blue mb-2">{translateDegree(program.degree)}</Badge>
            <CardTitle className="text-2xl md:text-3xl font-bold">{program.nameAr}</CardTitle>
            <p className="text-unlimited-light mt-1">{program.name}</p>
          </div>
          
          <Badge className={`text-lg py-2 px-4 ${program.available ? "bg-green-600" : "bg-unlimited-danger"}`}>
            {program.available ? "متاح للتسجيل" : "مغلق للتسجيل"}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-white/10 flex items-center gap-1">
            <School className="h-4 w-4" />
            {universityName}
          </Badge>
          
          <Badge variant="outline" className="bg-white/10 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {program.campus}
          </Badge>
          
          <Badge variant="outline" className="bg-white/10 flex items-center gap-1">
            <Languages className="h-4 w-4" />
            {translateLanguage(program.language)}
          </Badge>
          
          <Badge variant="outline" className="bg-white/10 flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {program.duration}
          </Badge>
        </div>
      </CardHeader>
      
      {/* محتوى البطاقة */}
      <CardContent className="p-0">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
            <TabsTrigger value="details" className="py-3">تفاصيل البرنامج</TabsTrigger>
            <TabsTrigger value="costs" className="py-3">الرسوم الدراسية</TabsTrigger>
            <TabsTrigger value="requirements" className="py-3">متطلبات القبول</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-unlimited-blue flex items-center gap-2">
                <Info className="h-5 w-5" />
                نبذة عن البرنامج
              </h3>
              <p className="text-unlimited-gray text-lg">
                برنامج {program.nameAr} هو أحد البرامج المميزة في {universityName}. يقدم البرنامج تعليماً متميزاً في مجال {program.nameAr.split(' ')[0]} باللغة {translateLanguage(program.language)}. مدة الدراسة في البرنامج هي {program.duration}.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-unlimited-blue flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                مميزات البرنامج
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                  <span>شهادة معترف بها دولياً</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                  <span>هيئة تدريس متميزة</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                  <span>فرص تدريب عملي</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                  <span>منهج دراسي متطور</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                  <span>مختبرات وتجهيزات حديثة</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                  <span>إمكانية المشاركة في برامج تبادل طلابي</span>
                </div>
              </div>
            </div>
            
            {program.details && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-unlimited-blue flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  تفاصيل المنهج الدراسي
                </h3>
                <p className="text-unlimited-gray text-lg">{program.details}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-unlimited-blue flex items-center gap-2">
                <Building className="h-5 w-5" />
                الحرم الجامعي
              </h3>
              <p className="text-unlimited-gray text-lg">
                يقع هذا البرنامج في حرم {program.campus} التابع لجامعة بهتشي شهير. يتميز الحرم بالمرافق الحديثة والموقع المتميز في مدينة إسطنبول.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="costs" className="p-6">
            <h3 className="text-xl font-bold mb-4 text-unlimited-blue flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              تفاصيل الرسوم الدراسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-unlimited-light-blue p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">الرسوم الدراسية السنوية</h4>
                <div className="flex items-center text-2xl font-bold text-unlimited-blue">
                  <DollarSign className="h-5 w-5" />
                  {program.tuitionFee.toLocaleString()}
                </div>
                {program.discountedFee < program.tuitionFee && (
                  <div className="mt-2 text-sm text-unlimited-gray">
                    <span className="line-through">{program.tuitionFee.toLocaleString()} USD</span>
                  </div>
                )}
              </div>
              
              {program.discountedFee < program.tuitionFee && (
                <div className="bg-green-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">الرسوم بعد الخصم</h4>
                  <div className="flex items-center text-2xl font-bold text-green-600">
                    <DollarSign className="h-5 w-5" />
                    {program.discountedFee.toLocaleString()}
                  </div>
                  <div className="mt-2 text-sm text-green-800">
                    توفير {(program.tuitionFee - program.discountedFee).toLocaleString()} USD
                  </div>
                </div>
              )}
              
              <div className="bg-unlimited-light-blue p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">رسوم التأمين</h4>
                <div className="flex items-center text-2xl font-bold text-unlimited-blue">
                  <DollarSign className="h-5 w-5" />
                  {program.depositFee.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-unlimited-gray">
                  تدفع مرة واحدة عند التسجيل
                </div>
              </div>
              
              <div className="bg-unlimited-light-blue p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">رسوم السنة التحضيرية</h4>
                <div className="flex items-center text-2xl font-bold text-unlimited-blue">
                  <DollarSign className="h-5 w-5" />
                  {program.prepFee.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-unlimited-gray">
                  للطلاب الذين يحتاجون لسنة تحضيرية للغة
                </div>
              </div>
            </div>
            
            <div className="bg-unlimited-blue/5 p-5 rounded-lg mt-6">
              <h4 className="font-semibold text-lg mb-2 text-unlimited-blue">ملاحظات مهمة</h4>
              <ul className="text-unlimited-gray space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                  <span>الرسوم المذكورة هي للسنة الأكاديمية الواحدة فقط.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                  <span>قد تتغير الرسوم سنوياً حسب سياسة الجامعة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                  <span>رسوم السنة التحضيرية تدفع في حال عدم اجتياز امتحان الكفاءة اللغوية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                  <span>رسوم التأمين تُسترجَع عند التخرج من الجامعة.</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="requirements" className="p-6">
            <h3 className="text-xl font-bold mb-4 text-unlimited-blue flex items-center gap-2">
              <FileText className="h-5 w-5" />
              متطلبات القبول
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">المستندات المطلوبة</h4>
                <ul className="space-y-2 text-unlimited-gray">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                    <span>شهادة الثانوية العامة مصدقة ومترجمة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                    <span>كشف درجات الثانوية العامة مصدق ومترجم</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                    <span>صورة جواز السفر سارية المفعول</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                    <span>صور شخصية حديثة</span>
                  </li>
                  {program.degree === 'Master' || program.degree === 'PhD' ? (
                    <>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <span>شهادة البكالوريوس مصدقة ومترجمة</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <span>كشف درجات البكالوريوس مصدق ومترجم</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <span>السيرة الذاتية</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <span>خطاب النوايا</span>
                      </li>
                      {program.name.includes('Thesis') && (
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                          <span>مقترح بحثي</span>
                        </li>
                      )}
                    </>
                  ) : null}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">متطلبات اللغة</h4>
                {program.language === 'English' ? (
                  <ul className="space-y-2 text-unlimited-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>شهادة توفل (TOEFL) بدرجة 70 على الأقل، أو</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>شهادة آيلتس (IELTS) بدرجة 5.5 على الأقل، أو</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>اجتياز امتحان الكفاءة اللغوية الذي تقدمه الجامعة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>في حال عدم توفر شهادة لغة، يمكن الالتحاق بالسنة التحضيرية للغة الإنجليزية</span>
                    </li>
                  </ul>
                ) : program.language === 'Turkish' ? (
                  <ul className="space-y-2 text-unlimited-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>شهادة التومر (TÖMER) بمستوى B2 على الأقل، أو</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>اجتياز امتحان الكفاءة اللغوية التركية الذي تقدمه الجامعة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>في حال عدم توفر شهادة لغة، يمكن الالتحاق بالسنة التحضيرية للغة التركية</span>
                    </li>
                  </ul>
                ) : (
                  <p className="text-unlimited-gray">يرجى التواصل مع الجامعة لمعرفة متطلبات اللغة الخاصة بهذا البرنامج.</p>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">الشروط الأكاديمية</h4>
                {program.degree === 'Bachelor' ? (
                  <ul className="space-y-2 text-unlimited-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 60%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>اجتياز المقابلة الشخصية (إن وجدت)</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2 text-unlimited-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>الحصول على شهادة البكالوريوس بمعدل لا يقل عن 2.5 من 4.0</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                      <span>اجتياز المقابلة الشخصية أو الامتحان التأهيلي (إن وجد)</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* تذييل البطاقة */}
      <CardFooter className="bg-unlimited-light-blue p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-unlimited-blue" />
          <span className="text-unlimited-gray">للمزيد من المعلومات يرجى التواصل معنا</span>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="w-full md:w-auto bg-unlimited-blue hover:bg-unlimited-dark-blue">
            <Link to={`/apply?program=${program.id}&university=${universityId}`}>
              تقدم الآن
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full md:w-auto">
            <Link to={`/universities/${universityId}`}>
              عرض الجامعة
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProgramDetails;
