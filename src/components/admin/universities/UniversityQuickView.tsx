
import React from 'react';
import { Building, Users, BookOpen, Calendar, Globe, Trophy, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

interface UniversityQuickViewProps {
  university: {
    id: string;
    nameAr: string;
    nameEn: string;
    country: string;
    city: string;
    type: string;
    founded?: number;
    website?: string;
    ranking?: number;
    programsCount: number;
    studentsCount: number;
    logoUrl?: string;
    status: 'active' | 'inactive';
  };
  onClose: () => void;
  onEdit: (id: string) => void;
}

const statusConfig = {
  active: { label: 'مفعل', color: 'bg-unlimited-success text-white' },
  inactive: { label: 'غير مفعل', color: 'bg-unlimited-gray text-white' },
};

export const UniversityQuickView = ({ university, onClose, onEdit }: UniversityQuickViewProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl overflow-hidden"
        variants={containerVariants}
      >
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <AspectRatio ratio={1/1}>
                {university.logoUrl ? (
                  <img 
                    src={university.logoUrl} 
                    alt={university.nameEn} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <Building className="h-16 w-16 text-unlimited-gray" />
                  </div>
                )}
              </AspectRatio>
            </div>
            <div className="mt-4 space-y-3">
              <Badge className={statusConfig[university.status].color + " w-full justify-center text-sm py-1"}>
                {statusConfig[university.status].label}
              </Badge>
              {university.website && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={university.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    زيارة الموقع
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <motion.div variants={itemVariants} className="mb-2 rtl:text-right ltr:text-left">
              <h2 className="text-2xl font-bold text-unlimited-dark-blue">{university.nameAr}</h2>
              <p className="text-unlimited-gray">{university.nameEn}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-3">
                  <Globe className="h-4 w-4 text-unlimited-blue" />
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">الدولة/المدينة</p>
                  <p className="font-medium">{university.country} / {university.city}</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-3">
                  <Trophy className="h-4 w-4 text-unlimited-blue" />
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">التصنيف العالمي</p>
                  <p className="font-medium">{university.ranking || 'غير محدد'}</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-3">
                  <BookOpen className="h-4 w-4 text-unlimited-blue" />
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">عدد البرامج</p>
                  <p className="font-medium">{university.programsCount}</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-unlimited-blue" />
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">عدد الطلاب</p>
                  <p className="font-medium">{university.studentsCount}</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-unlimited-blue" />
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">سنة التأسيس</p>
                  <p className="font-medium">{university.founded || 'غير محدد'}</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-3">
                  <Building className="h-4 w-4 text-unlimited-blue" />
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">نوع الجامعة</p>
                  <p className="font-medium">{university.type === 'Public' ? 'حكومية' : 'خاصة'}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-850 p-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>إغلاق</Button>
          <Button onClick={() => onEdit(university.id)}>
            تعديل البيانات
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const UniversityQuickViewSkeleton = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-3" />
                  <div className="w-full">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 flex justify-end gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  );
};
