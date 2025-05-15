
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Building, MapPin, Clock, GraduationCap, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ProgramInfo {
  id: number;
  name: string;
  name_ar?: string;
  university: string;
  university_id: number;
  university_image?: string;
  degree_type: 'bachelor' | 'master' | 'doctorate' | 'certificate';
  duration: number;
  tuition_fee: number;
  language: string;
  country: string;
  city: string;
  has_scholarship?: boolean;
  is_popular?: boolean;
  description?: string;
}

// Also export the legacy Program interface for backward compatibility
export interface Program {
  id: number;
  title: string;
  university: string;
  location: string;
  duration: string;
  language: string;
  fee: string;
  discount?: string;
  image?: string;
  badges?: string[];
  deadline?: string;
  scholarshipAvailable?: boolean;
  isFeatured?: boolean;
}

interface ProgramCardProps {
  program: ProgramInfo;
  index?: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, index = 0 }) => {
  // Animation configuration
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      } 
    }
  };

  // Format tuition fee with currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format degree type to be more readable
  const formatDegreeType = (type: string) => {
    switch (type) {
      case 'bachelor':
        return 'بكالوريوس';
      case 'master':
        return 'ماجستير';
      case 'doctorate':
        return 'دكتوراه';
      case 'certificate':
        return 'شهادة';
      default:
        return type;
    }
  };
  
  // Format duration with appropriate unit
  const formatDuration = (years: number) => {
    return years === 1 ? `سنة واحدة` : `${years} سنوات`;
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <Link to={`/programs/${program.id}`} className="block h-48 relative overflow-hidden">
          {program.university_image ? (
            <img 
              src={program.university_image}
              alt={program.university}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-unlimited-blue to-blue-700 flex items-center justify-center">
              <Building className="h-16 w-16 text-white/70" />
            </div>
          )}
          
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {program.has_scholarship && (
              <Badge className="bg-green-600">منحة دراسية</Badge>
            )}
            {program.is_popular && (
              <Badge className="bg-unlimited-blue">شائع</Badge>
            )}
          </div>
        </Link>
        
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="mb-3">
            <Link to={`/programs/${program.id}`}>
              <h3 className="font-bold text-lg hover:text-unlimited-blue transition-colors line-clamp-2 mb-1">
                {program.name_ar || program.name}
              </h3>
            </Link>
            
            <p className="text-unlimited-gray text-sm flex items-center">
              <Building className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
              <span className="line-clamp-1">{program.university}</span>
            </p>
          </div>
          
          <div className="space-y-2 text-sm flex-grow">
            <div className="flex items-center text-unlimited-gray">
              <MapPin className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
              <span>{program.city}, {program.country}</span>
            </div>
            
            <div className="flex items-center text-unlimited-gray">
              <GraduationCap className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
              <span>{formatDegreeType(program.degree_type)}</span>
            </div>
            
            <div className="flex items-center text-unlimited-gray">
              <Clock className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
              <span>{formatDuration(program.duration)}</span>
            </div>
            
            <div className="flex items-center text-unlimited-gray">
              <Languages className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
              <span>{program.language}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-xs text-unlimited-gray">الرسوم السنوية</span>
              <span className="font-bold text-unlimited-blue">{formatCurrency(program.tuition_fee)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProgramCard;
