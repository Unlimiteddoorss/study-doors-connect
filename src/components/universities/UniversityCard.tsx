
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, School, Users, Award, Globe, Book } from 'lucide-react';
import { University as UniversityType } from '@/types';

interface UniversityCardProps {
  university: UniversityType;
  countryTranslations?: Record<string, string>;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, countryTranslations = {} }) => {
  // Translate location from English to Arabic
  const translateLocation = (location: string): string => {
    return countryTranslations[location] || location;
  };

  // Add default values for missing properties
  const programCount = university.programCount || 10;
  const studentCount = university.studentCount || 5000;
  const ranking = university.ranking || '4.5/5';
  const establishedYear = university.establishedYear || 1980;
  const isFeatured = true; // Set all universities as featured for now

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-unlimited-blue">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={university.imageUrl || '/placeholder.svg'}
          alt={university.nameAr || university.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        
        {/* Featured badge */}
        {isFeatured && (
          <Badge className="absolute top-2 right-2 bg-unlimited-blue">جامعة مميزة</Badge>
        )}
        
        {/* Programs badge - new! */}
        <Badge className="absolute top-2 left-2 bg-green-600">
          <Book className="w-3 h-3 mr-1" />
          {programCount} برنامج
        </Badge>
        
        {/* Type badge */}
        <Badge 
          className="absolute bottom-2 left-2 bg-unlimited-blue"
        >
          جامعة خاصة
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-xl mb-2">{university.nameAr || university.name}</h3>
        <div className="flex items-center text-unlimited-gray">
          <MapPin className="h-4 w-4 ml-2" />
          <span>{translateLocation(university.location)}، {translateLocation(university.country)}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4 text-unlimited-gray" />
            <div>
              <p className="text-unlimited-gray">تأسست عام:</p>
              <p className="font-medium">{establishedYear}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <School className="h-4 w-4 text-unlimited-gray" />
            <div>
              <p className="text-unlimited-gray">البرامج:</p>
              <p className="font-medium">{programCount}+ برنامج</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-unlimited-gray" />
            <div>
              <p className="text-unlimited-gray">الطلاب:</p>
              <p className="font-medium">{studentCount}+ طالب</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-unlimited-gray" />
            <div>
              <p className="text-unlimited-gray">التصنيف:</p>
              <p className="font-medium">{ranking}</p>
            </div>
          </div>
        </div>
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
