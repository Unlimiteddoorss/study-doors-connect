
import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/custom-sheet';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { FiltersState } from '@/components/universities/UniversityAdvancedFilters';

interface SavedFilterItem {
  id: string;
  name: string;
  filters: FiltersState;
  createdAt: number;
}

interface SavedFiltersProps {
  currentFilters: FiltersState;
  onApplyFilter: (filters: FiltersState) => void;
}

const SavedFilters = ({ currentFilters, onApplyFilter }: SavedFiltersProps) => {
  const [savedFilters, setSavedFilters] = useState<SavedFilterItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');
  
  // حمل التفضيلات المحفوظة من التخزين المحلي
  useEffect(() => {
    const storedFilters = localStorage.getItem('universityFilters');
    if (storedFilters) {
      try {
        setSavedFilters(JSON.parse(storedFilters));
      } catch (error) {
        console.error('Error parsing saved filters:', error);
        localStorage.removeItem('universityFilters');
      }
    }
  }, []);
  
  // احفظ التفضيلات عند التغيير
  useEffect(() => {
    if (savedFilters.length > 0) {
      localStorage.setItem('universityFilters', JSON.stringify(savedFilters));
    }
  }, [savedFilters]);
  
  const saveCurrentFilter = () => {
    if (!newFilterName.trim()) {
      toast({
        title: "يرجى إدخال اسم",
        description: "يجب إدخال اسم للفلتر قبل الحفظ",
        variant: "destructive",
      });
      return;
    }
    
    // تحقق من وجود فلاتر نشطة
    const hasActiveFilters = 
      currentFilters.search || 
      currentFilters.types.length > 0 || 
      currentFilters.locations.length > 0 || 
      currentFilters.languages.length > 0 ||
      currentFilters.minRanking !== undefined || 
      currentFilters.maxRanking !== undefined ||
      currentFilters.minStudents !== undefined || 
      currentFilters.maxStudents !== undefined ||
      currentFilters.featured;
    
    if (!hasActiveFilters) {
      toast({
        title: "لا توجد فلاتر نشطة",
        description: "يرجى تحديد فلاتر قبل الحفظ",
        variant: "destructive",
      });
      return;
    }
    
    const newFilter: SavedFilterItem = {
      id: Date.now().toString(),
      name: newFilterName,
      filters: { ...currentFilters },
      createdAt: Date.now()
    };
    
    setSavedFilters(prev => [newFilter, ...prev]);
    setNewFilterName('');
    
    toast({
      title: "تم حفظ الفلتر",
      description: `تم حفظ "${newFilterName}" بنجاح`,
    });
  };
  
  const deleteFilter = (id: string) => {
    setSavedFilters(prev => prev.filter(filter => filter.id !== id));
    toast({
      title: "تم حذف الفلتر",
      description: "تم حذف الفلتر بنجاح",
    });
  };
  
  const applyFilter = (filters: FiltersState) => {
    onApplyFilter(filters);
    setIsOpen(false);
    toast({
      title: "تم تطبيق الفلتر",
      description: "تم تطبيق الفلتر المحفوظ بنجاح",
    });
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Bookmark className="h-4 w-4 ml-2" />
          الفلاتر المحفوظة
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>الفلاتر المحفوظة</SheetTitle>
        </SheetHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Input
              value={newFilterName}
              onChange={(e) => setNewFilterName(e.target.value)}
              placeholder="اسم الفلتر الجديد"
              className="flex-1"
            />
            <Button onClick={saveCurrentFilter}>
              <Plus className="h-4 w-4 ml-2" />
              حفظ الحالي
            </Button>
          </div>
          
          <div className="mt-6 space-y-3">
            {savedFilters.length === 0 ? (
              <p className="text-unlimited-gray text-center py-8">
                لم تقم بحفظ أي فلاتر بعد
              </p>
            ) : (
              savedFilters.map((filter) => (
                <div 
                  key={filter.id} 
                  className="p-3 border rounded-md flex items-center justify-between hover:border-unlimited-blue transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{filter.name}</h4>
                    <p className="text-xs text-unlimited-gray">
                      {new Date(filter.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 w-8 p-0" 
                      onClick={() => applyFilter(filter.filters)}
                    >
                      <BookmarkCheck className="h-4 w-4" />
                      <span className="sr-only">تطبيق</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700" 
                      onClick={() => deleteFilter(filter.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">حذف</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">إغلاق</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SavedFilters;
