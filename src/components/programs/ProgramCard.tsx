
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { School, Map, Calendar, DollarSign, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Program {
  id: number;
  title: string;
  university: string;
  location: string;
  language: string;
  duration: string;
  deadline: string;
  fee: string;
  discount?: string;
  image: string;
  isFeatured?: boolean;
  scholarshipAvailable?: boolean;
  badges?: string[];
}

interface ProgramCardProps {
  program: Program;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  // حساب نسبة الخصم إذا كان متوفرًا
  const calculateDiscount = () => {
    if (program.discount) {
      const originalPrice = parseFloat(program.fee.replace('$', '').replace(',', ''));
      const discountedPrice = parseFloat(program.discount.replace('$', '').replace(',', ''));
      const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
      return discountPercentage > 0 ? `-${discountPercentage}%` : '';
    }
    return '';
  };
  
  const discountTag = calculateDiscount();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-unlimited-blue">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        
        {/* Featured badge */}
        {program.isFeatured && (
          <Badge className="absolute top-2 right-2 bg-unlimited-blue">برنامج مميز</Badge>
        )}
        
        {/* Scholarship badge */}
        {program.scholarshipAvailable && (
          <Badge className="absolute top-2 left-2 bg-green-600">فرصة منحة</Badge>
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
        <h3 className="font-bold text-lg line-clamp-2 hover:text-unlimited-blue">{program.title}</h3>
        <div className="flex items-center text-unlimited-gray">
          <Map className="h-4 w-4 ml-1" />
          <span className="text-sm">{program.location}</span>
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
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-unlimited-gray" />
            <span>{program.deadline}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-unlimited-gray" />
            <div>
              {program.discount ? (
                <>
                  <p className="line-through text-unlimited-gray text-xs">{program.fee}</p>
                  <p className="font-semibold text-unlimited-blue">{program.discount}</p>
                </>
              ) : (
                <p>{program.fee}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Program badges */}
        {program.badges && program.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {program.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
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
