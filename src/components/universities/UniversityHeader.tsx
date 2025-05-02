
import React from 'react';
import { University } from '@/data/programsData';
import { MapPin, Award, Users, Clock, Globe, School } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UniversityHeaderProps {
  university: University;
}

const UniversityHeader = ({ university }: UniversityHeaderProps) => {
  const translate = (text: string): string => {
    const translations: Record<string, string> = {
      'Turkey': 'تركيا',
      'Istanbul': 'إسطنبول',
      'Ankara': 'أنقرة',
      'Private': 'خاصة',
      'Public': 'حكومية',
      'English': 'الإنجليزية',
      'Turkish': 'التركية',
      'Arabic': 'العربية'
    };
    
    return translations[text] || text;
  };

  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <div className="h-[250px] w-full bg-gray-200 overflow-hidden rounded-lg">
          <img 
            src={university.image} 
            alt={university.nameAr || university.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg md:max-w-md">
          <div className="flex items-center gap-2 mb-2">
            {university.type === 'Private' ? (
              <Badge className="bg-unlimited-blue">جامعة خاصة</Badge>
            ) : (
              <Badge className="bg-unlimited-dark-blue">جامعة حكومية</Badge>
            )}
            {university.isFeatured && <Badge className="bg-green-600">جامعة مميزة</Badge>}
          </div>
          <h1 className="text-xl md:text-2xl font-bold">{university.nameAr || university.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MapPin className="h-4 w-4" />
            <span>{translate(university.city)}، {translate(university.country)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-unlimited-blue">
              <School className="mx-auto h-8 w-8 mb-2" />
            </div>
            <div className="text-2xl font-bold">{university.programs}</div>
            <div className="text-gray-600">برنامج دراسي</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-unlimited-blue">
              <Award className="mx-auto h-8 w-8 mb-2" />
            </div>
            <div className="text-2xl font-bold">
              {university.ranking ? `#${university.ranking}` : 'غير مصنفة'}
            </div>
            <div className="text-gray-600">التصنيف العالمي</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-unlimited-blue">
              <Users className="mx-auto h-8 w-8 mb-2" />
            </div>
            <div className="text-2xl font-bold">{university.students.toLocaleString()}+</div>
            <div className="text-gray-600">طالب</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-unlimited-blue">
              <Clock className="mx-auto h-8 w-8 mb-2" />
            </div>
            <div className="text-2xl font-bold">{new Date().getFullYear() - parseInt(university.founded)}</div>
            <div className="text-gray-600">سنة من تأسيسها</div>
          </CardContent>
        </Card>
      </div>

      {university.website && (
        <div className="mt-4 flex items-center gap-2">
          <Globe className="h-4 w-4 text-unlimited-blue" />
          <a 
            href={university.website} 
            target="_blank" 
            rel="noreferrer" 
            className="text-unlimited-blue hover:underline"
          >
            {university.website}
          </a>
        </div>
      )}
    </div>
  );
};

export default UniversityHeader;
