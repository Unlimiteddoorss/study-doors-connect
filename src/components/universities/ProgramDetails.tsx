
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UniversityProgram } from '@/data/universityPrograms';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  GraduationCap,
  Clock,
  DollarSign,
  BookOpen,
  MapPin,
  Languages,
  CircleDollarSign,
  FileCheck,
  Award,
  Sparkles,
  Building,
  CheckCircle
} from 'lucide-react';

interface ProgramDetailsProps {
  program: UniversityProgram;
  universityName: string;
  universityId: string | number;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ 
  program, 
  universityName,
  universityId 
}) => {
  // ترجمة الدرجة العلمية إلى العربية
  const getArabicDegree = (degree: string) => {
    switch (degree) {
      case 'Bachelor':
        return 'بكالوريوس';
      case 'Master':
        return 'ماجستير';
      case 'PhD':
        return 'دكتوراه';
      case 'Diploma':
        return 'دبلوم';
      case 'Vocational School':
        return 'مدرسة مهنية';
      default:
        return degree;
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">{program.nameAr}</CardTitle>
                  <CardDescription className="text-lg mt-1">{program.name}</CardDescription>
                  <div className="mt-2">
                    <Link 
                      to={`/universities/${universityId}`} 
                      className="text-unlimited-blue hover:underline"
                    >
                      {universityName}
                    </Link>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="text-base py-1 px-3">
                    {getArabicDegree(program.degree)}
                  </Badge>
                  <Badge variant="outline" className="text-base py-1 px-3">
                    {program.language === 'English' ? 'الإنجليزية' : 
                     program.language === 'Turkish' ? 'التركية' : 'العربية'}
                  </Badge>
                  <Badge variant={program.available ? "secondary" : "destructive"} className="text-base py-1 px-3">
                    {program.available ? 'متاح للتسجيل' : 'غير متاح حالياً'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b pb-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-unlimited-blue" />
                    <div>
                      <div className="font-medium text-gray-500">الدرجة العلمية</div>
                      <div>{getArabicDegree(program.degree)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-unlimited-blue" />
                    <div>
                      <div className="font-medium text-gray-500">مدة الدراسة</div>
                      <div>{program.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Languages className="h-5 w-5 text-unlimited-blue" />
                    <div>
                      <div className="font-medium text-gray-500">لغة الدراسة</div>
                      <div>
                        {program.language === 'English' ? 'الإنجليزية' : 
                         program.language === 'Turkish' ? 'التركية' : 'العربية'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-unlimited-blue" />
                    <div>
                      <div className="font-medium text-gray-500">الحرم الجامعي</div>
                      <div>{program.campus}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CircleDollarSign className="h-5 w-5 text-unlimited-blue" />
                    <div>
                      <div className="font-medium text-gray-500">الرسوم السنوية</div>
                      <div className="flex items-center gap-2">
                        {program.discountedFee < program.tuitionFee ? (
                          <>
                            <span className="line-through text-gray-400">${program.tuitionFee}</span>
                            <span className="text-green-600 font-semibold">${program.discountedFee}</span>
                          </>
                        ) : (
                          <span>${program.tuitionFee}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-unlimited-blue" />
                    <div>
                      <div className="font-medium text-gray-500">رسوم التسجيل</div>
                      <div>${program.depositFee}</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-unlimited-blue" />
                    <span>متطلبات القبول</span>
                  </h3>
                  <ul className="space-y-2 list-disc list-inside pr-4 text-gray-700">
                    <li>شهادة الثانوية العامة أو ما يعادلها</li>
                    {program.language === 'English' && (
                      <li>شهادة إتقان اللغة الإنجليزية (TOEFL، IELTS) أو اجتياز امتحان اللغة بالجامعة</li>
                    )}
                    {program.language === 'Turkish' && (
                      <li>شهادة إتقان اللغة التركية (TÖMER) أو اجتياز امتحان اللغة بالجامعة</li>
                    )}
                    {program.degree === 'Bachelor' && (
                      <li>معدل لا يقل عن 60% في الثانوية العامة</li>
                    )}
                    {program.degree === 'Master' && (
                      <>
                        <li>شهادة البكالوريوس في تخصص ذي صلة</li>
                        <li>معدل تراكمي لا يقل عن 2.5/4.0 أو ما يعادله</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-unlimited-blue" />
                    <span>مزايا البرنامج</span>
                  </h3>
                  <ul className="space-y-2 pr-4 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>فرص للتدريب العملي في شركات ومؤسسات رائدة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>إمكانية المشاركة في برامج تبادل طلابي عالمية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>هيئة تدريس متميزة من خبراء المجال محلياً وعالمياً</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>مرافق حديثة ومختبرات متطورة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>برنامج معتمد دولياً ومعترف به عالمياً</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="hidden md:block">
            <h3 className="text-xl font-bold mb-6">وصف البرنامج</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                برنامج {program.nameAr} من البرامج المتميزة التي تقدمها {universityName} ويهدف إلى تخريج كوادر مؤهلة في هذا المجال الحيوي.
              </p>
              <p>
                يتميز البرنامج بمنهج دراسي متكامل يجمع بين الجوانب النظرية والتطبيقية، مع التركيز على أحدث التقنيات والأساليب المستخدمة في سوق العمل.
              </p>
              <p>
                يُدرس البرنامج باللغة {program.language === 'English' ? 'الإنجليزية' : program.language === 'Turkish' ? 'التركية' : 'العربية'} ويتضمن العديد من المقررات التخصصية بالإضافة إلى التدريب العملي والميداني.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4">معلومات التسجيل</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رسوم الدراسة</span>
                  <span className="font-bold">${program.tuitionFee}</span>
                </div>
                {program.discountedFee < program.tuitionFee && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">بعد الخصم</span>
                    <span className="font-bold text-green-600">${program.discountedFee}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رسوم التسجيل</span>
                  <span className="font-bold">${program.depositFee}</span>
                </div>
                {program.prepFee && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">سنة تحضيرية</span>
                    <span className="font-bold">${program.prepFee}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">حالة البرنامج</span>
                  <Badge variant={program.available ? "secondary" : "destructive"}>
                    {program.available ? 'متاح للتسجيل' : 'غير متاح حالياً'}
                  </Badge>
                </div>
                <Separator />
                <div className="pt-2">
                  <Button className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue" asChild>
                    <Link to={`/apply?program=${program.id}&university=${universityId}`}>
                      تقدم للالتحاق الآن
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-unlimited-blue" />
                <span>آفاق العمل للخريجين</span>
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-unlimited-blue flex-shrink-0" />
                  <span>العمل في كبرى الشركات المحلية والدولية</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-unlimited-blue flex-shrink-0" />
                  <span>العمل في المؤسسات الحكومية والخاصة</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-unlimited-blue flex-shrink-0" />
                  <span>فرص عمل في المنظمات الدولية</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-unlimited-blue flex-shrink-0" />
                  <span>إمكانية إكمال الدراسات العليا والعمل في مجال البحث العلمي</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-unlimited-blue flex-shrink-0" />
                  <span>إنشاء مشاريع خاصة في المجال</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="md:hidden mt-8">
        <h3 className="text-xl font-bold mb-6">وصف البرنامج</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            برنامج {program.nameAr} من البرامج المتميزة التي تقدمها {universityName} ويهدف إلى تخريج كوادر مؤهلة في هذا المجال الحيوي.
          </p>
          <p>
            يتميز البرنامج بمنهج دراسي متكامل يجمع بين الجوانب النظرية والتطبيقية، مع التركيز على أحدث التقنيات والأساليب المستخدمة في سوق العمل.
          </p>
          <p>
            يُدرس البرنامج باللغة {program.language === 'English' ? 'الإنجليزية' : program.language === 'Turkish' ? 'التركية' : 'العربية'} ويتضمن العديد من المقررات التخصصية بالإضافة إلى التدريب العملي والميداني.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProgramDetails;
