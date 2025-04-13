
import React from 'react';
import { Link } from 'react-router-dom';
import { UniversityProgram } from '@/data/universityPrograms';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  BookOpen,
  Clock,
  MapPin,
  DollarSign,
  FileCheck,
  Award,
  GraduationCap,
  Building,
  Globe,
  Check
} from 'lucide-react';

interface ProgramDetailsProps {
  program: UniversityProgram;
  universityName: string;
  universityId: string;
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

  // حساب نسبة الخصم إذا وجدت
  const discountPercentage = program.tuitionFee !== program.discountedFee
    ? Math.round(((program.tuitionFee - program.discountedFee) / program.tuitionFee) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* القسم الرئيسي للمعلومات */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{program.nameAr}</h1>
              <p className="text-unlimited-gray">{program.name}</p>
              <div className="flex items-center mt-2 text-unlimited-gray">
                <Building className="w-4 h-4 mr-2" />
                <span>{universityName}</span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge className="mb-2">
                {getArabicDegree(program.degree)}
              </Badge>
              <Badge variant="outline">
                {program.language === 'English' ? 'الإنجليزية' : 
                 program.language === 'Turkish' ? 'التركية' : 'العربية'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-unlimited-blue mr-2" />
              <div>
                <p className="text-sm text-unlimited-gray">الحرم الجامعي</p>
                <p>{program.campus}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-unlimited-blue mr-2" />
              <div>
                <p className="text-sm text-unlimited-gray">مدة الدراسة</p>
                <p>{program.duration}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-unlimited-blue mr-2" />
              <div>
                <p className="text-sm text-unlimited-gray">لغة الدراسة</p>
                <p>{program.language === 'English' ? 'الإنجليزية' : 
                    program.language === 'Turkish' ? 'التركية' : 'العربية'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-unlimited-blue mr-2" />
              <div>
                <p className="text-sm text-unlimited-gray">تاريخ البدء</p>
                <p>سبتمبر/يناير</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">نبذة عن البرنامج</h2>
            <p className="text-unlimited-gray">
              برنامج {program.nameAr} هو برنامج تعليمي متميز يقدم من جامعة {universityName} ويستمر لمدة {program.duration}. يتم تدريس البرنامج باللغة {program.language === 'English' ? 'الإنجليزية' : program.language === 'Turkish' ? 'التركية' : 'العربية'} ويضم مجموعة متنوعة من المواد الدراسية التي تغطي جميع جوانب التخصص.
            </p>
          </div>

          {/* متطلبات القبول */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileCheck className="w-5 h-5 text-unlimited-blue mr-2" />
              متطلبات القبول
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>شهادة الثانوية العامة أو ما يعادلها</span>
              </li>
              {program.language === 'English' && (
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>شهادة إتقان اللغة الإنجليزية (TOEFL/IELTS/YOS) أو اجتياز اختبار اللغة في الجامعة</span>
                </li>
              )}
              {program.language === 'Turkish' && (
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>شهادة إتقان اللغة التركية أو اجتياز اختبار اللغة في الجامعة</span>
                </li>
              )}
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>صورة عن جواز السفر</span>
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>صور شخصية</span>
              </li>
            </ul>
          </div>

          {/* المجالات الوظيفية */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 text-unlimited-blue mr-2" />
              المجالات الوظيفية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>العمل في القطاع الخاص</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>العمل في القطاع الحكومي</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>العمل في المنظمات الدولية</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>إنشاء مشاريع خاصة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الجانب الأيمن - معلومات الرسوم والتقديم */}
      <div>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 text-unlimited-blue mr-2" />
              الرسوم الدراسية
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-unlimited-gray">الرسوم الدراسية:</span>
                {program.discountedFee < program.tuitionFee ? (
                  <div className="text-right">
                    <span className="line-through text-gray-400">${program.tuitionFee}</span>
                    <Badge className="bg-green-600 mr-2">خصم {discountPercentage}%</Badge>
                  </div>
                ) : (
                  <span className="font-semibold">${program.tuitionFee}</span>
                )}
              </div>

              {program.discountedFee < program.tuitionFee && (
                <div className="flex justify-between items-center">
                  <span className="text-unlimited-gray">بعد الخصم:</span>
                  <span className="font-semibold text-green-600">${program.discountedFee}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-unlimited-gray">رسوم التأمين:</span>
                <span className="font-semibold">${program.depositFee}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-unlimited-gray">رسوم السنة التحضيرية:</span>
                <span className="font-semibold">${program.prepFee}</span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>المجموع:</span>
                  <span className="text-unlimited-blue">${program.discountedFee + program.depositFee}</span>
                </div>
                <p className="text-xs text-unlimited-gray mt-1">
                  * لا تشمل رسوم السنة التحضيرية إذا كانت مطلوبة
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 text-unlimited-blue mr-2" />
              معلومات البرنامج
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-unlimited-gray">الدرجة العلمية:</span>
                <span>{getArabicDegree(program.degree)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-unlimited-gray">لغة الدراسة:</span>
                <span>
                  {program.language === 'English' ? 'الإنجليزية' : 
                   program.language === 'Turkish' ? 'التركية' : 'العربية'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-unlimited-gray">مدة الدراسة:</span>
                <span>{program.duration}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-unlimited-gray">الحالة:</span>
                <Badge className={program.available ? "bg-green-600" : "bg-red-600"}>
                  {program.available ? 'متاح للتسجيل' : 'مغلق للتسجيل'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Button className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue" asChild>
            <Link to={`/apply?program=${program.id}&university=${universityId}`}>
              تقديم طلب
            </Link>
          </Button>
          
          <Button variant="outline" className="w-full" asChild>
            <Link to="#" onClick={() => window.open(`https://wa.me/+905000000000?text=استفسار حول برنامج ${program.nameAr} في جامعة ${universityName}`, '_blank')}>
              استفسار عبر الواتساب
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
