
import React from 'react';
import { Link } from 'react-router-dom';
import { UniversityProgram } from '@/data/universityPrograms';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, MapPin, GraduationCap, DollarSign } from 'lucide-react';

interface UniversityProgramCardProps {
  program: UniversityProgram;
  universityId: string | number;
  universityName: string;
}

const UniversityProgramCard: React.FC<UniversityProgramCardProps> = ({
  program,
  universityId,
  universityName
}) => {
  // تحديد لون الشارة اعتمادًا على نوع البرنامج
  const getBadgeVariant = () => {
    switch (program.degree) {
      case 'Bachelor':
        return 'default';
      case 'Master':
        return 'secondary';
      case 'PhD':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
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
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{program.nameAr}</CardTitle>
            <CardDescription className="mt-1">{program.name}</CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant={getBadgeVariant()}>
              {getArabicDegree(program.degree)}
            </Badge>
            <Badge variant="outline">
              {program.language === 'English' ? 'الإنجليزية' : 
               program.language === 'Turkish' ? 'التركية' : 'العربية'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-unlimited-gray">
          <BookOpen className="h-4 w-4 flex-shrink-0" />
          <span>الجامعة: {universityName}</span>
        </div>
        
        <div className="flex items-center gap-2 text-unlimited-gray">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>الحرم الجامعي: {program.campus}</span>
        </div>
        
        <div className="flex items-center gap-2 text-unlimited-gray">
          <GraduationCap className="h-4 w-4 flex-shrink-0" />
          <span>مدة الدراسة: {program.duration}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 flex-shrink-0 text-unlimited-gray" />
          <div>
            <span className="text-unlimited-gray">الرسوم الدراسية:</span>
            {program.discountedFee < program.tuitionFee ? (
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-400">${program.tuitionFee}</span>
                <span className="text-green-600 font-semibold">${program.discountedFee}</span>
              </div>
            ) : (
              <span className="ml-2">${program.tuitionFee}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-unlimited-gray">
          <Clock className="h-4 w-4 flex-shrink-0" />
          <span>الدوام: {program.language.includes('Turkish') ? 'صباحي' : 'صباحي / مسائي'}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full">
          <Button variant="outline" asChild>
            <Link to={`/programs/${program.id}?universityId=${universityId}`}>
              عرض التفاصيل
            </Link>
          </Button>
          <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue" asChild>
            <Link to={`/apply?program=${program.id}&university=${universityId}`}>
              تقديم طلب
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UniversityProgramCard;
