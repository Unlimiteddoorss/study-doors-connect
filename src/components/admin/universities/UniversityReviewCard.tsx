
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  School, 
  BookOpen, 
  Users, 
  Calendar, 
  Star, 
  Globe, 
  MessageCircle,
  Map,
  Building,
  Check,
  Loader2
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface UniversityReviewCardProps {
  university: {
    id: string;
    nameAr: string;
    nameEn: string;
    logo?: string;
    country: string;
    city: string;
    ranking?: number;
    foundedYear?: number;
    studentsCount: number;
    programsCount: number;
    rating?: number;
    status: 'pending' | 'approved' | 'rejected';
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (id: string) => void;
  isLoading?: boolean;
}

const UniversityReviewCard: React.FC<UniversityReviewCardProps> = ({
  university,
  onApprove,
  onReject,
  onViewDetails,
  isLoading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const statusConfig = {
    pending: { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' },
    approved: { label: 'تمت الموافقة', color: 'bg-green-100 text-green-800' },
    rejected: { label: 'مرفوض', color: 'bg-red-100 text-red-800' },
  };
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
              {university.logo ? (
                <img src={university.logo} alt={university.nameEn} className="w-full h-full object-cover" />
              ) : (
                <School className="h-6 w-6 text-unlimited-gray" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-unlimited-dark-blue">{university.nameAr}</h3>
                  <p className="text-sm text-unlimited-gray">{university.nameEn}</p>
                </div>
                <Badge className={statusConfig[university.status].color}>
                  {statusConfig[university.status].label}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mt-1 text-xs">
                <div className="flex items-center">
                  <Globe className="h-3 w-3 mr-1 text-unlimited-gray" />
                  {university.country}
                </div>
                <div className="flex items-center">
                  <Map className="h-3 w-3 mr-1 text-unlimited-gray" />
                  {university.city}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
              <BookOpen className="h-4 w-4 mb-1 text-unlimited-blue" />
              <span className="text-xs text-unlimited-gray">البرامج</span>
              <span className="text-sm font-semibold">{university.programsCount}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
              <Users className="h-4 w-4 mb-1 text-unlimited-blue" />
              <span className="text-xs text-unlimited-gray">الطلاب</span>
              <span className="text-sm font-semibold">{university.studentsCount}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
              {university.ranking ? (
                <>
                  <Star className="h-4 w-4 mb-1 text-unlimited-warning" />
                  <span className="text-xs text-unlimited-gray">التصنيف</span>
                  <span className="text-sm font-semibold">#{university.ranking}</span>
                </>
              ) : (
                <>
                  <Building className="h-4 w-4 mb-1 text-unlimited-gray" />
                  <span className="text-xs text-unlimited-gray">النوع</span>
                  <span className="text-sm font-semibold">خاص</span>
                </>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-unlimited-gray" />
                      <span className="text-sm">تاريخ التأسيس</span>
                    </div>
                    <span className="text-sm font-medium">{university.foundedYear || 'غير متوفر'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-unlimited-gray" />
                      <span className="text-sm">التقييم الإجمالي</span>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < (university.rating || 0) 
                            ? 'text-unlimited-warning fill-unlimited-warning' 
                            : 'text-unlimited-gray'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-unlimited-gray" />
                      <span className="text-sm">آخر تحديث</span>
                    </div>
                    <span className="text-sm font-medium">قبل أسبوع</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleToggleExpand}
            >
              {isExpanded ? 'عرض أقل' : 'عرض المزيد'}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(university.id)}
              >
                التفاصيل
              </Button>
              
              {university.status === 'pending' && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="unlimited-outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onReject(university.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>رفض الجامعة</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {university.status === 'pending' && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="unlimited"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onApprove(university.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>الموافقة على الجامعة</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default UniversityReviewCard;
