
import React from 'react';
import { Link } from 'react-router-dom';
import { University } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Calendar, Award, Bookmark } from 'lucide-react';
import { Pagination } from '../shared/Pagination';

interface UniversitiesGridProps {
  universities: University[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
  countryTranslations: Record<string, string>;
}

const UniversitiesGrid: React.FC<UniversitiesGridProps> = ({
  universities,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
  countryTranslations
}) => {
  // ترجمة اسم البلد إذا كان متوفرًا
  const translateLocation = (location: string): string => {
    return countryTranslations[location] || location;
  };
  
  if (universities.length === 0) {
    return (
      <div className="text-center py-20">
        <Building className="w-12 h-12 mx-auto text-unlimited-gray mb-4" />
        <h3 className="text-xl font-semibold mb-2">لم يتم العثور على جامعات</h3>
        <p className="text-unlimited-gray mb-6">
          لا توجد جامعات تطابق معايير البحث، يرجى تعديل الفلاتر وإعادة المحاولة.
        </p>
        <Button onClick={onResetFilters}>إعادة ضبط الفلاتر</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map(university => (
          <Card key={university.id} className="hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={university.image} 
                alt={university.nameAr || university.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/400x300?text=University';
                }}
              />
              {university.isFeatured && (
                <Badge className="absolute top-2 right-2 bg-unlimited-blue">
                  <Bookmark className="w-3 h-3 mr-1" />
                  مميزة
                </Badge>
              )}
            </div>
            
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold">{university.nameAr || university.name}</h3>
                  <div className="flex items-center text-unlimited-gray text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{translateLocation(university.city || '')}، {translateLocation(university.country || '')}</span>
                  </div>
                </div>
                <Badge variant={university.type === 'Private' ? 'default' : 'secondary'}>
                  {university.type === 'Private' ? 'خاصة' : 'حكومية'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-unlimited-blue mr-2" />
                  <div>
                    <p className="text-xs text-unlimited-gray">تأسست عام</p>
                    <p className="font-semibold">{university.founded}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-unlimited-blue mr-2" />
                  <div>
                    <p className="text-xs text-unlimited-gray">التصنيف العالمي</p>
                    <p className="font-semibold">{university.ranking ? `#${university.ranking}` : 'غير مصنفة'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2 text-sm">
                <div>
                  <span className="text-unlimited-gray">البرامج: </span>
                  <span className="font-semibold">{university.programs}+ برنامج</span>
                </div>
                <div>
                  <span className="text-unlimited-gray">الرسوم: </span>
                  <span className="font-semibold">{university.fees}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                <Link to={`/universities/${university.id}`}>
                  عرض التفاصيل
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* ترقيم الصفحات */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange} 
          />
        </div>
      )}
    </div>
  );
};

export default UniversitiesGrid;
