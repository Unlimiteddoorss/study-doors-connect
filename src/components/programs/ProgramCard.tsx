
import React from 'react';
import { Link } from 'react-router-dom';
import { Program } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Calendar, GraduationCap, Languages } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  // استخدام صورة افتراضية إذا لم تكن الصورة متوفرة
  const defaultImage = '/public/lovable-uploads/913e5c4b-e6ac-4c6d-843b-27eaa4980b85.png';
  
  return (
    <Link to={`/programs/${program.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={program.imageUrl || defaultImage} 
            alt={program.name} 
            className="w-full h-full object-cover"
          />
          {program.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-unlimited-blue">
              مميز
            </Badge>
          )}
        </div>
        
        <CardContent className="pt-4">
          <div className="space-y-2">
            <p className="text-unlimited-blue font-medium text-sm">{program.university}</p>
            <h3 className="font-bold text-lg line-clamp-2">{program.name}</h3>
            
            <div className="flex items-center gap-2 text-xs text-unlimited-gray">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span>
                {program.city}، {program.country}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-y-1 gap-x-3 pt-2">
              <div className="flex items-center gap-1 text-xs text-unlimited-gray">
                <GraduationCap className="h-3 w-3 flex-shrink-0" />
                <span>{program.degreeLevel}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-unlimited-gray">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span>{program.duration}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-unlimited-gray">
                <Languages className="h-3 w-3 flex-shrink-0" />
                <span>{program.language}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-3 flex justify-between items-center">
          <div>
            <Calendar className="h-3 w-3 inline mr-1 text-unlimited-gray" />
            <span className="text-xs text-unlimited-gray">{program.startDate || 'سبتمبر 2025'}</span>
          </div>
          
          <div className="font-bold text-unlimited-blue">
            {program.discount ? (
              <div className="flex flex-col items-end">
                <span className="text-xs line-through text-unlimited-gray">
                  {program.tuitionFee} {program.currency}/سنة
                </span>
                <span className="text-sm">
                  {parseFloat(program.tuitionFee) * (1 - program.discount / 100)} {program.currency}/سنة
                </span>
              </div>
            ) : (
              <span>
                {program.tuitionFee} {program.currency}/سنة
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProgramCard;
