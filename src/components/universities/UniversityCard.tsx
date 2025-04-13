
import React from 'react';
import { Link } from 'react-router-dom';
import { University } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, GraduationCap, Trophy } from 'lucide-react';

interface UniversityCardProps {
  university: University;
  countryTranslations?: Record<string, string>;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ 
  university,
  countryTranslations = {}
}) => {
  // استخدام صورة افتراضية إذا لم تكن الصورة متوفرة
  const defaultImage = '/public/lovable-uploads/6a53354c-8208-42a9-a03e-ccad494ff4be.png';
  
  // ترجمة اسم البلد إذا كانت متوفرة
  const countryName = countryTranslations[university.country] || university.country;
  
  return (
    <Link to={`/universities/${university.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={university.image || defaultImage} 
            alt={university.nameAr} 
            className="w-full h-full object-cover"
          />
          {university.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-unlimited-blue">
              مميز
            </Badge>
          )}
          {university.type && (
            <Badge className="absolute bottom-2 right-2" variant={university.type === "Public" ? "secondary" : "outline"}>
              {university.type === "Public" ? "حكومية" : "خاصة"}
            </Badge>
          )}
        </div>
        
        <CardContent className="pt-4">
          <div className="space-y-2">
            <h3 className="font-bold text-lg">{university.nameAr}</h3>
            
            <div className="flex items-center gap-2 text-xs text-unlimited-gray">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span>
                {university.city || university.location}، {countryName}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-y-1 gap-x-4 pt-2">
              <div className="flex items-center gap-1 text-xs text-unlimited-gray">
                <GraduationCap className="h-3 w-3 flex-shrink-0" />
                <span>{university.programsCount || 0} برنامج</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-unlimited-gray">
                <Trophy className="h-3 w-3 flex-shrink-0" />
                <span>
                  {university.ranking === "0" ? "غير مصنفة" : `التصنيف: ${university.ranking}`}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-3">
          {university.founded && (
            <div className="text-xs text-unlimited-gray">
              تأسست عام {university.founded}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default UniversityCard;
