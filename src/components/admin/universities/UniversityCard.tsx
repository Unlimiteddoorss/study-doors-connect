
import React from 'react';
import { motion } from 'framer-motion';
import { Building, BookOpen, Users, Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

interface UniversityCardProps {
  university: {
    id: string;
    nameAr: string;
    nameEn: string;
    country: string;
    city: string;
    programsCount: number;
    studentsCount: number;
    ranking?: number;
    logoUrl?: string;
    status: 'active' | 'inactive';
  };
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const statusConfig = {
  active: { label: 'مفعل', color: 'bg-unlimited-success text-white' },
  inactive: { label: 'غير مفعل', color: 'bg-unlimited-gray text-white' },
};

export const UniversityCard = ({ university, onView, onEdit }: UniversityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative">
          <AspectRatio ratio={16/9} className="bg-gray-100 dark:bg-gray-800">
            {university.logoUrl ? (
              <img 
                src={university.logoUrl}
                alt={university.nameEn}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building className="h-12 w-12 text-unlimited-gray" />
              </div>
            )}
          </AspectRatio>
          <Badge 
            className={`${statusConfig[university.status].color} absolute top-2 left-2`}
          >
            {statusConfig[university.status].label}
          </Badge>
        </div>
        
        <CardContent className="flex-1 pt-4">
          <h3 className="font-bold text-lg text-unlimited-dark-blue mb-1">{university.nameAr}</h3>
          <p className="text-unlimited-gray text-sm mb-4">{university.nameEn}</p>
          
          <div className="flex items-center text-unlimited-gray text-sm mb-2">
            <Building className="h-4 w-4 mr-2" />
            <span>{university.country}, {university.city}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-unlimited-blue/5 p-2 rounded text-center">
              <div className="flex justify-center">
                <BookOpen className="h-4 w-4 text-unlimited-blue" />
              </div>
              <p className="text-xs text-unlimited-gray mt-1">البرامج</p>
              <p className="font-medium">{university.programsCount}</p>
            </div>
            
            <div className="bg-unlimited-blue/5 p-2 rounded text-center">
              <div className="flex justify-center">
                <Users className="h-4 w-4 text-unlimited-blue" />
              </div>
              <p className="text-xs text-unlimited-gray mt-1">الطلاب</p>
              <p className="font-medium">{university.studentsCount}</p>
            </div>
            
            <div className="bg-unlimited-blue/5 p-2 rounded text-center">
              <div className="flex justify-center">
                <Trophy className="h-4 w-4 text-unlimited-blue" />
              </div>
              <p className="text-xs text-unlimited-gray mt-1">التصنيف</p>
              <p className="font-medium">{university.ranking || '-'}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 dark:bg-gray-800 p-3 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(university.id)}
          >
            عرض التفاصيل
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(university.id)}
          >
            تعديل
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
