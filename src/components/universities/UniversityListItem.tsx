
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, School, Users, Award, Book } from 'lucide-react';
import { University } from './UniversityCard';
import UniversityCardCompare from './UniversityCardCompare';

interface UniversityListItemProps {
  university: University;
  isCompareSelected: boolean;
  onToggleCompare: (id: number) => void;
  countryTranslations?: Record<string, string>;
}

const UniversityListItem: React.FC<UniversityListItemProps> = ({
  university,
  isCompareSelected,
  onToggleCompare,
  countryTranslations = {}
}) => {
  const translateLocation = (location: string): string => {
    return countryTranslations[location] || location;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-unlimited-blue">
      <div className="flex">
        <div className="relative w-1/4 min-w-[140px]">
          <Link to={`/universities/${university.id}`} className="block h-full">
            <img 
              src={university.image}
              alt={university.nameAr || university.name}
              className="w-full h-full object-cover"
            />
          </Link>
          
          {/* Featured badge */}
          {university.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-unlimited-blue">جامعة مميزة</Badge>
          )}
          
          {/* Compare button */}
          <UniversityCardCompare
            id={university.id}
            isSelected={isCompareSelected}
            onToggleCompare={onToggleCompare}
          />
          
          {/* Type badge */}
          <Badge 
            className={`absolute bottom-2 left-2 ${university.type === 'Private' ? 'bg-unlimited-blue' : 'bg-unlimited-dark-blue'}`}
          >
            {university.type === 'Private' ? 'خاصة' : 'حكومية'}
          </Badge>
        </div>
        
        <CardContent className="flex-1 p-4">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-xl">
                <Link to={`/universities/${university.id}`} className="hover:text-unlimited-blue transition-colors">
                  {university.nameAr || university.name}
                </Link>
              </h3>
              <Badge className="bg-green-600 flex items-center">
                <Book className="w-3 h-3 ml-1" />
                {university.programs} برنامج
              </Badge>
            </div>
            
            <div className="flex items-center text-unlimited-gray mb-2">
              <MapPin className="h-4 w-4 ml-1" />
              <span>{translateLocation(university.city)}، {translateLocation(university.country)}</span>
            </div>
            
            <div className="flex flex-wrap gap-4 my-2 text-sm">
              <div className="flex items-center gap-1">
                <School className="h-4 w-4 text-unlimited-gray" />
                <span>تأسست عام: <strong>{university.founded}</strong></span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-unlimited-gray" />
                <span><strong>{university.students.toLocaleString()}+</strong> طالب</span>
              </div>
              
              {university.ranking && (
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-unlimited-gray" />
                  <span>التصنيف: <strong>#{university.ranking}</strong></span>
                </div>
              )}
              
              <div className="text-unlimited-blue font-medium">
                الرسوم: {university.fees}
              </div>
            </div>
            
            {/* Languages */}
            {university.languages && university.languages.length > 0 && (
              <div className="flex flex-wrap gap-1 my-2">
                {university.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {language === 'English' ? 'الإنجليزية' : 
                     language === 'Turkish' ? 'التركية' : 
                     language === 'Arabic' ? 'العربية' : language}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="mt-auto pt-2 flex gap-2">
              <Button asChild size="sm" className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                <Link to={`/universities/${university.id}`}>عرض التفاصيل</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to={`/apply?university=${university.id}`}>تقدم الآن</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default UniversityListItem;
