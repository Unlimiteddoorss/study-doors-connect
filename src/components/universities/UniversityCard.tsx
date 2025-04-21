import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, School, Users, Award, Globe, Book } from 'lucide-react';

export interface University {
  id: number;
  name: string;
  nameAr?: string;
  location: string;
  country: string;
  city?: string;
  district?: string;
  type?: string;
  image?: string;
  programs?: number;
  founded?: string;
  students?: number;
  ranking?: number;
  localRanking?: number;
  fees?: string;
  website?: string;
  accreditation?: string;
  accreditations?: string[];
  languages?: string[];
  isFeatured?: boolean;
  description?: string;
  campuses?: string[];
  faculties?: string[];
}

interface UniversityCardProps {
  university: University;
  countryTranslations?: Record<string, string>;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, countryTranslations = {} }) => {
  // ترجمة الموقع من الإنجليزية إلى العربية
  const translateLocation = (location: string): string => {
    return countryTranslations[location] || location;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-unlimited-blue">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={university.image}
          alt={university.nameAr || university.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        
        {/* Featured badge */}
        {university.isFeatured && (
          <Badge className="absolute top-2 right-2 bg-unlimited-blue">جامعة مميزة</Badge>
        )}
        
        {/* Programs badge - new! */}
        <Badge className="absolute top-2 left-2 bg-green-600">
          <Book className="w-3 h-3 mr-1" />
          {university.programs} برنامج
        </Badge>
        
        {/* Type badge */}
        <Badge 
          className={`absolute bottom-2 left-2 ${university.type === 'Private' ? 'bg-unlimited-blue' : 'bg-unlimited-dark-blue'}`}
        >
          {university.type === 'Private' ? 'خاصة' : 'حكومية'}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-xl mb-2">{university.nameAr || university.name}</h3>
        <div className="flex items-center text-unlimited-gray">
          <MapPin className="h-4 w-4 ml-2" />
          <span>{translateLocation(university.city)}، {translateLocation(university.country)}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4 text-unlimited-gray" />
            <div>
              <p className="text-unlimited-gray">تأسست عام:</p>
              <p className="font-medium">{university.founded}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <School className="h-4 w-4 text-unlimited-gray" />
            <div>
              <p className="text-unlimited-gray">البرامج:</p>
              <p className="font-medium">{university.programs}+ برنامج</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-unlimited-gray" />
            <div>
              <p className="text-unlimited-gray">الطلاب:</p>
              <p className="font-medium">{university.students}+ طالب</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {university.ranking ? (
              <>
                <Award className="h-4 w-4 text-unlimited-gray" />
                <div>
                  <p className="text-unlimited-gray">التصنيف:</p>
                  <p className="font-medium">#{university.ranking}</p>
                </div>
              </>
            ) : (
              <>
                <Award className="h-4 w-4 text-unlimited-gray" />
                <div>
                  <p className="text-unlimited-gray">الرسوم:</p>
                  <p className="font-medium text-unlimited-blue">{university.fees}</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Languages */}
        {university.languages && university.languages.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {university.languages.map((language, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {language === 'English' ? 'الإنجليزية' : 
                 language === 'Turkish' ? 'التركية' : 
                 language === 'Arabic' ? 'العربية' : language}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
          <Link to={`/universities/${university.id}`}>عرض التفاصيل</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/apply?university=${university.id}`}>تقدم الآن</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UniversityCard;
