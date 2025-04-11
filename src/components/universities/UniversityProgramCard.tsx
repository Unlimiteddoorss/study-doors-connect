
import React from 'react';
import { Link } from 'react-router-dom';
import { UniversityProgram } from '@/data/universityPrograms';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, MapPin, DollarSign, Languages, CalendarDays, Book, Clock } from 'lucide-react';

interface UniversityProgramCardProps {
  program: UniversityProgram;
  universityId: number;
  universityName?: string;
  showUniversityInfo?: boolean;
}

const UniversityProgramCard: React.FC<UniversityProgramCardProps> = ({ 
  program, 
  universityId,
  universityName,
  showUniversityInfo = false
}) => {
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
  
  // حساب نسبة الخصم
  const discountPercentage = program.tuitionFee > 0 
    ? Math.round(((program.tuitionFee - program.discountedFee) / program.tuitionFee) * 100)
    : 0;

  return (
    <Card className="overflow-hidden hover:border-unlimited-blue transition-all h-full">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
          <div className="md:col-span-2 p-6">
            <div className="flex justify-between items-start">
              <Badge className="bg-unlimited-light-blue text-unlimited-blue mb-2 px-2">
                {translateDegree(program.degree)}
              </Badge>
              
              {discountPercentage > 0 && (
                <Badge className="bg-green-100 text-green-800">
                  خصم {discountPercentage}%
                </Badge>
              )}
            </div>
            
            <h3 className="font-bold text-xl mb-2 text-unlimited-blue">{program.nameAr}</h3>
            <p className="text-unlimited-gray mb-4">{program.name}</p>
            
            {showUniversityInfo && universityName && (
              <div className="flex items-center gap-1 mb-3 text-unlimited-gray">
                <School className="h-4 w-4" />
                <span>{universityName}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <Languages className="h-3 w-3" />
                {translateLanguage(program.language)}
              </Badge>
              
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3" />
                {program.campus}
              </Badge>
              
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <CalendarDays className="h-3 w-3" />
                {program.duration}
              </Badge>
              
              {program.degree === 'Master' && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  <Book className="h-3 w-3" />
                  {program.name.includes('Thesis') ? 'بأطروحة' : 'بدون أطروحة'}
                </Badge>
              )}

              {program.degree === 'Master' && program.name.includes('Distance') && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs bg-blue-50">
                  <Clock className="h-3 w-3" />
                  تعليم عن بعد
                </Badge>
              )}
            </div>
          </div>
          
          <div className="p-5 md:col-span-1 bg-gray-50 flex flex-col justify-center border-r border-b md:border-b-0 md:border-l">
            <div className="space-y-3">
              <div>
                <div className="text-xs text-unlimited-gray">الرسوم الدراسية:</div>
                <div className="font-semibold">
                  <DollarSign className="w-4 h-4 inline-block text-unlimited-blue" />
                  {program.tuitionFee.toLocaleString()} USD
                </div>
              </div>
              
              {program.discountedFee < program.tuitionFee && (
                <div>
                  <div className="text-xs text-unlimited-gray">بعد الخصم:</div>
                  <div className="font-semibold text-green-600">
                    <DollarSign className="w-4 h-4 inline-block" />
                    {program.discountedFee.toLocaleString()} USD
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-xs text-unlimited-gray">رسوم التأمين:</div>
                <div className="font-semibold">
                  <DollarSign className="w-4 h-4 inline-block" />
                  {program.depositFee.toLocaleString()} USD
                </div>
              </div>
              
              <div>
                <div className="text-xs text-unlimited-gray">رسوم السنة التحضيرية:</div>
                <div className="font-semibold">
                  <DollarSign className="w-4 h-4 inline-block" />
                  {program.prepFee.toLocaleString()} USD
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-5 md:col-span-1 flex flex-col justify-center items-center bg-gray-50 border-t md:border-t-0">
            <Badge className={program.available ? "bg-green-600 mb-4" : "bg-red-600 mb-4"}>
              {program.available ? "متاح للتسجيل" : "مغلق للتسجيل"}
            </Badge>
            
            <Button asChild className="w-full mb-2 bg-unlimited-blue hover:bg-unlimited-dark-blue">
              <Link to={`/apply?program=${program.id}&university=${universityId}`}>
                تقدم الآن
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to={`/programs/${program.id}?universityId=${universityId}`}>
                التفاصيل
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityProgramCard;
