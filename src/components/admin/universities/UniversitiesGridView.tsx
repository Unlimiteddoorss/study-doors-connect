
import { Building, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface University {
  id: string;
  nameAr: string;
  nameEn: string;
  country: string;
  city: string;
  type: string;
  programsCount: number;
  studentsCount: number;
  ranking: number;
  status: 'active' | 'inactive';
}

interface UniversitiesGridViewProps {
  universities: University[];
  isLoading: boolean;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

export function UniversitiesGridView({
  universities,
  isLoading,
  onViewDetails,
  onEdit
}: UniversitiesGridViewProps) {
  const statusConfig = {
    active: { label: 'نشط', color: 'bg-unlimited-success text-white' },
    inactive: { label: 'غير نشط', color: 'bg-unlimited-gray text-white' },
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 shadow bg-card">
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="text-center py-10">
        <Building className="h-16 w-16 mx-auto text-unlimited-gray opacity-50" />
        <h3 className="mt-4 text-xl font-medium text-unlimited-gray">لا توجد جامعات</h3>
        <p className="text-unlimited-gray mt-2">
          لم يتم العثور على جامعات مطابقة لمعايير البحث.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {universities.map((university) => (
        <div key={university.id} className="border rounded-lg overflow-hidden shadow bg-card">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="h-10 w-10 rounded-lg bg-unlimited-blue/10 flex items-center justify-center">
                <Building className="h-5 w-5 text-unlimited-blue" />
              </div>
              <Badge className={statusConfig[university.status].color}>
                {statusConfig[university.status].label}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg mt-2 line-clamp-1">{university.nameAr}</h3>
            <p className="text-sm text-unlimited-gray mb-2 line-clamp-1">{university.nameEn}</p>
            <div className="flex items-center text-sm text-unlimited-gray mb-1">
              <span>🌍</span>
              <span className="ml-1">{university.country}, {university.city}</span>
            </div>
            <div className="flex items-center text-sm text-unlimited-gray mb-3">
              <span>🏆</span>
              <span className="ml-1">التصنيف: #{university.ranking}</span>
            </div>
            <div className="flex justify-between">
              <Button size="sm" className="text-xs" onClick={() => onViewDetails(university.id)}>
                <Eye className="h-3.5 w-3.5 ml-1" />
                عرض التفاصيل
              </Button>
              <Button size="icon" variant="outline" onClick={() => onEdit(university.id)}>
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
