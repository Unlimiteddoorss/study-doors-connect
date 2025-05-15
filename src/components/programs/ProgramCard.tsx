
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Calendar, 
  Globe, 
  MapPin, 
  GraduationCap, 
  Building,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProgramInfo {
  id: number;
  name: string;
  name_ar?: string;
  university: string;
  university_id: number;
  university_image?: string;
  degree_type: 'bachelor' | 'master' | 'phd' | 'diploma';
  duration: number;
  tuition_fee: number;
  language: string;
  country: string;
  city: string;
  is_popular?: boolean;
  has_scholarship?: boolean;
  description?: string;
}

interface ProgramCardProps {
  program: ProgramInfo;
  index?: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, index = 0 }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const getDegreeLabel = (degree: string) => {
    switch (degree) {
      case 'bachelor':
        return t('programs.bachelor', 'بكالوريوس');
      case 'master':
        return t('programs.master', 'ماجستير');
      case 'phd':
        return t('programs.phd', 'دكتوراه');
      case 'diploma':
        return t('programs.diploma', 'دبلوم');
      default:
        return degree;
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRtl ? 'ar' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {program.university_image ? (
                  <div className="h-12 w-12 rounded overflow-hidden mr-3 border">
                    <img 
                      src={program.university_image} 
                      alt={program.university} 
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded bg-unlimited-blue/20 flex items-center justify-center mr-3">
                    <Building className="h-6 w-6 text-unlimited-blue" />
                  </div>
                )}
                <div>
                  <h3 className="text-unlimited-blue font-medium mb-1">
                    {program.university}
                  </h3>
                  <div className="flex items-center text-sm text-unlimited-gray">
                    <MapPin className="h-3 w-3 mr-1" />
                    {program.city}, {program.country}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-1">
                {program.is_popular && (
                  <Badge className="bg-unlimited-gold text-white hover:bg-unlimited-gold/90">
                    {t('programs.popular', 'شائع')}
                  </Badge>
                )}
                {program.has_scholarship && (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    {t('programs.scholarship', 'منحة')}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <h2 className="text-xl font-bold text-unlimited-dark-blue mb-1">
                {isRtl && program.name_ar ? program.name_ar : program.name}
              </h2>
              <p className="text-sm text-unlimited-gray mb-4 line-clamp-2">
                {program.description || t('programs.noDescription', 'لا يوجد وصف متاح لهذا البرنامج.')}
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-2">
                    <GraduationCap className="h-4 w-4 text-unlimited-blue" />
                  </div>
                  <div className="text-sm">
                    <p className="text-unlimited-gray">{t('programs.degreeType', 'الدرجة')}</p>
                    <p className="font-medium">{getDegreeLabel(program.degree_type)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-2">
                    <Calendar className="h-4 w-4 text-unlimited-blue" />
                  </div>
                  <div className="text-sm">
                    <p className="text-unlimited-gray">{t('programs.duration', 'المدة')}</p>
                    <p className="font-medium">{program.duration} {t('programs.years', 'سنوات')}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-2">
                    <Globe className="h-4 w-4 text-unlimited-blue" />
                  </div>
                  <div className="text-sm">
                    <p className="text-unlimited-gray">{t('programs.language', 'اللغة')}</p>
                    <p className="font-medium">{program.language}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-unlimited-blue/10 flex items-center justify-center mr-2">
                    <BookOpen className="h-4 w-4 text-unlimited-blue" />
                  </div>
                  <div className="text-sm">
                    <p className="text-unlimited-gray">{t('programs.tuition', 'الرسوم')}</p>
                    <p className="font-medium">{formatCurrency(program.tuition_fee)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto border-t p-4 flex items-center justify-between">
            <Link to={`/programs/${program.id}`} className="text-unlimited-blue hover:text-unlimited-dark-blue font-medium text-sm">
              {t('programs.viewDetails', 'عرض التفاصيل')}
            </Link>
            
            <Link to={`/apply?program=${program.id}`}>
              <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white flex items-center">
                {t('programs.apply', 'تقديم طلب')}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProgramCard;
