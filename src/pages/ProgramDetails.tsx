
import React from 'react';
import { useParams } from 'react-router-dom';
import { getUniversityPrograms } from '@/data/universityPrograms';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Languages, 
  CalendarDays, 
  MapPin, 
  Building, 
  GraduationCap,
  DollarSign
} from 'lucide-react';
import ProgramActions from '@/components/universities/ProgramActions';

const ProgramDetails = () => {
  const { id } = useParams<{ id: string }>();
  const programId = parseInt(id || '0');
  
  // Find the program by iterating through all universities' programs
  const allPrograms = [...getUniversityPrograms(12)]; // Add more universities as needed
  const program = allPrograms.find(p => p.id === programId);

  if (!program) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center">البرنامج غير موجود</h1>
        </div>
      </MainLayout>
    );
  }

  const translateDegree = (degree: string): string => {
    const degrees: Record<string, string> = {
      'Bachelor': 'بكالوريوس',
      'Master': 'ماجستير',
      'PhD': 'دكتوراه',
      'Diploma': 'دبلوم'
    };
    return degrees[degree] || degree;
  };

  const translateLanguage = (lang: string): string => {
    const languages: Record<string, string> = {
      'English': 'الإنجليزية',
      'Turkish': 'التركية',
      'Arabic': 'العربية'
    };
    return languages[lang] || lang;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-4">{program.nameAr}</h1>
                <p className="text-gray-600 mb-6">{program.name}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Book className="text-unlimited-blue w-5 h-5" />
                    <div>
                      <p className="text-gray-600">الدرجة العلمية</p>
                      <p className="font-semibold">{translateDegree(program.degree)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Languages className="text-unlimited-blue w-5 h-5" />
                    <div>
                      <p className="text-gray-600">لغة الدراسة</p>
                      <p className="font-semibold">{translateLanguage(program.language)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-unlimited-blue w-5 h-5" />
                    <div>
                      <p className="text-gray-600">مدة الدراسة</p>
                      <p className="font-semibold">{program.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="text-unlimited-blue w-5 h-5" />
                    <div>
                      <p className="text-gray-600">الحرم الجامعي</p>
                      <p className="font-semibold">{program.campus}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">وصف البرنامج</h2>
                    <p className="text-gray-600">
                      برنامج {program.nameAr} هو برنامج متميز يقدم تعليماً عالي الجودة في مجال {program.nameAr.split('(')[0]}.
                      يتم تدريس البرنامج باللغة {translateLanguage(program.language)} ويمتد لمدة {program.duration}.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">متطلبات القبول</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>شهادة الثانوية العامة أو ما يعادلها</li>
                      {program.language === 'English' && (
                        <li>شهادة كفاءة في اللغة الإنجليزية (TOEFL/IELTS) أو اجتياز امتحان الجامعة</li>
                      )}
                      {program.language === 'Turkish' && (
                        <li>شهادة كفاءة في اللغة التركية (C1) أو اجتياز امتحان الجامعة</li>
                      )}
                      <li>جواز سفر ساري المفعول</li>
                      <li>صور شخصية حديثة</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">فرص العمل</h2>
                    <p className="text-gray-600">
                      يوفر البرنامج فرص عمل متنوعة في القطاعين العام والخاص، 
                      مع إمكانية متابعة الدراسات العليا في الجامعات العالمية.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">الرسوم الدراسية</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-600">الرسوم الأساسية:</p>
                        <p className="text-2xl font-bold text-unlimited-blue">
                          ${program.tuitionFee.toLocaleString()}
                        </p>
                      </div>

                      {program.discountedFee < program.tuitionFee && (
                        <div>
                          <p className="text-gray-600">بعد الخصم:</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${program.discountedFee.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            وفر ${(program.tuitionFee - program.discountedFee).toLocaleString()}
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-gray-600">رسوم التأمين:</p>
                        <p className="font-semibold">
                          ${program.depositFee.toLocaleString()}
                        </p>
                      </div>

                      {program.prepFee > 0 && (
                        <div>
                          <p className="text-gray-600">السنة التحضيرية:</p>
                          <p className="font-semibold">
                            ${program.prepFee.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <Badge className={program.available ? "bg-green-600 w-full justify-center mb-4" : "bg-red-600 w-full justify-center mb-4"}>
                        {program.available ? "متاح للتسجيل" : "مغلق للتسجيل"}
                      </Badge>

                      <ProgramActions 
                        programId={program.id} 
                        universityId={12}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
