import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ProgramInfo } from '@/data/programsData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProgramsGridProps {
  programs: ProgramInfo[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  onResetFilters: () => void;
  isAdminMode?: boolean;
}

const ProgramsGrid: React.FC<ProgramsGridProps> = ({ 
  programs, 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading,
  onResetFilters,
  isAdminMode = false
}) => {
  const { toast } = useToast();
  
  const handleProgramDelete = (id: number) => {
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف البرنامج بنجاح"
    });
  };
  
  const handleProgramEdit = (id: number) => {
    toast({
      title: "تحرير البرنامج",
      description: "فتح نافذة تحرير البرنامج"
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {programs.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-semibold mb-2">لم يتم العثور على برامج</h3>
            <p className="text-unlimited-gray mb-4">لم نتمكن من العثور على أي برامج تطابق معايير البحث الخاصة بك.</p>
            <Button onClick={onResetFilters} variant="unlimited">إعادة تعيين المرشحات</Button>
          </div>
        ) : (
          programs.map((program) => (
            <Card key={program.id} className="overflow-hidden">
              <div className="relative">
                {isAdminMode && (
                  <div className="absolute top-2 right-2 z-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleProgramEdit(program.id)}>
                          <Edit className="h-4 w-4 ml-2" />
                          تحرير البرنامج
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleProgramDelete(program.id)}
                        >
                          <Trash className="h-4 w-4 ml-2" />
                          حذف البرنامج
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={program.university_image || "/images/placeholder-university.jpg"} 
                    alt={program.university} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{program.name}</h3>
                <p className="text-sm text-unlimited-gray line-clamp-1">{program.university}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-unlimited-blue font-medium">{program.tuition_fee}$</span>
                  <span className="text-xs text-unlimited-gray ml-1">/سنة</span>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Badge variant={program.has_scholarship ? "success" : "default"} className="text-xs font-normal">
                    {program.has_scholarship ? 'منحة متاحة' : 'لا توجد منحة'}
                  </Badge>
                  
                  <Button asChild size="sm" variant="unlimited-outline">
                    <Link to={`/programs/${program.id}`}>
                      تفاصيل البرنامج
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {programs.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <Button
              variant="pagination"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              السابق
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="pagination"
                aria-current={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="pagination"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              التالي
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsGrid;
