
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { School, Map, Calendar, DollarSign, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Program as ProgramType } from '@/types';

// Adapting the Program type from types/index.ts to fit our UI needs
export interface ProgramCardProps {
  program: ProgramType;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  // Calculate discount if available
  const calculateDiscount = () => {
    if (program.discountedFee && program.tuitionFee) {
      const discountPercentage = Math.round(
        ((program.tuitionFee - program.discountedFee) / program.tuitionFee) * 100
      );
      return discountPercentage > 0 ? `-${discountPercentage}%` : '';
    }
    return '';
  };
  
  const discountTag = calculateDiscount();
  const programDuration = program.duration || '4 سنوات';
  const programDeadline = program.campus || 'مفتوح';

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-unlimited-blue">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={program.imageUrl || '/placeholder.svg'}
          alt={program.nameAr || program.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        
        {/* Featured badge */}
        {program.available && (
          <Badge className="absolute top-2 right-2 bg-unlimited-blue">برنامج متاح</Badge>
        )}
        
        {/* Scholarship badge */}
        {program.discountedFee && (
          <Badge className="absolute top-2 left-2 bg-green-600">خصم متاح</Badge>
        )}
        
        {/* Discount badge */}
        {discountTag && (
          <Badge className="absolute bottom-2 right-2 bg-red-600">{discountTag}</Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center text-unlimited-gray mb-2">
          <School className="h-4 w-4 ml-1" />
          <span className="text-sm">{program.university}</span>
        </div>
        <h3 className="font-bold text-lg line-clamp-2 hover:text-unlimited-blue">
          {program.nameAr || program.name}
        </h3>
        <div className="flex items-center text-unlimited-gray">
          <Map className="h-4 w-4 ml-1" />
          <span className="text-sm">{program.campus || 'الحرم الرئيسي'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4 text-unlimited-gray" />
            <span>{program.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-unlimited-gray" />
            <span>{programDuration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-unlimited-gray" />
            <span>{programDeadline}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-unlimited-gray" />
            <div>
              {program.discountedFee ? (
                <>
                  <p className="line-through text-unlimited-gray text-xs">{program.tuitionFee}$</p>
                  <p className="font-semibold text-unlimited-blue">{program.discountedFee}$</p>
                </>
              ) : (
                <p>{program.tuitionFee}$</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Program badges */}
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="text-xs">
            {program.degree === 'bachelor' ? 'بكالوريوس' : 
             program.degree === 'master' ? 'ماجستير' : 
             program.degree === 'phd' ? 'دكتوراه' : program.degree}
          </Badge>
          {program.requirements && program.requirements.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {program.requirements.length} متطلبات
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
          <Link to={`/programs/${program.id}`} className="flex items-center justify-center">
            عرض التفاصيل
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
