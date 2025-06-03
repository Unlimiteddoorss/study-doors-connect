
import React, { useState, useEffect } from 'react';
import { Search, X, Filter, Calendar, Download, FileText, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { useToast } from '@/hooks/use-toast';

interface SearchFilters {
  query: string;
  status: string;
  priority: string;
  country: string;
  program: string;
  dateRange: { from?: Date; to?: Date };
}

interface EnhancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onExport?: () => void;
  placeholder?: string;
  showExportOptions?: boolean;
}

export const EnhancedSearch = ({ 
  onSearch, 
  onExport,
  placeholder = "البحث في البيانات...",
  showExportOptions = true 
}: EnhancedSearchProps) => {
  const { toast } = useToast();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    status: 'all',
    priority: 'all',
    country: 'all',
    program: 'all',
    dateRange: {}
  });

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'pending', label: 'قيد الانتظار' },
    { value: 'under_review', label: 'قيد المراجعة' },
    { value: 'accepted', label: 'مقبول' },
    { value: 'rejected', label: 'مرفوض' },
    { value: 'completed', label: 'مكتمل' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'جميع الأولويات' },
    { value: 'high', label: 'عالية' },
    { value: 'medium', label: 'متوسطة' },
    { value: 'low', label: 'منخفضة' }
  ];

  const countryOptions = [
    { value: 'all', label: 'جميع البلدان' },
    { value: 'saudi', label: 'السعودية' },
    { value: 'uae', label: 'الإمارات' },
    { value: 'kuwait', label: 'الكويت' },
    { value: 'qatar', label: 'قطر' },
    { value: 'bahrain', label: 'البحرين' },
    { value: 'oman', label: 'عمان' }
  ];

  const programOptions = [
    { value: 'all', label: 'جميع التخصصات' },
    { value: 'medicine', label: 'الطب' },
    { value: 'engineering', label: 'الهندسة' },
    { value: 'computer', label: 'علوم الحاسب' },
    { value: 'business', label: 'إدارة الأعمال' },
    { value: 'law', label: 'الحقوق' }
  ];

  useEffect(() => {
    onSearch(filters);
  }, [filters, onSearch]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      status: 'all',
      priority: 'all',
      country: 'all',
      program: 'all',
      dateRange: {}
    });
    toast({
      title: "تم مسح الفلاتر",
      description: "تم إعادة تعيين جميع الفلاتر"
    });
  };

  const handleExport = (format: 'excel' | 'pdf' | 'csv') => {
    toast({
      title: `تصدير ${format.toUpperCase()}`,
      description: `جاري تحضير الملف بصيغة ${format.toUpperCase()}...`
    });
    
    // محاكاة عملية التصدير
    setTimeout(() => {
      toast({
        title: "تم التصدير بنجاح",
        description: `تم تحميل الملف بصيغة ${format.toUpperCase()}`
      });
      onExport?.();
    }, 2000);
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'query') return value !== '';
      if (key === 'dateRange') return value.from && value.to;
      return value !== 'all';
    }).length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          البحث والفلترة
          <div className="flex gap-2">
            {showExportOptions && (
              <>
                <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={placeholder}
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="pr-10"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="relative"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            فلاتر متقدمة
            {getActiveFiltersCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              مسح الكل
            </Button>
          )}
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1">الحالة</label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الأولوية</label>
              <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">البلد</label>
              <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">التخصص</label>
              <Select value={filters.program} onValueChange={(value) => handleFilterChange('program', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {programOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">فترة زمنية</label>
              <DatePickerWithRange 
                onChange={(range) => handleFilterChange('dateRange', range)}
              />
            </div>
          </div>
        )}

        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.query && (
              <Badge variant="secondary">
                البحث: {filters.query}
                <button
                  onClick={() => handleFilterChange('query', '')}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.status !== 'all' && (
              <Badge variant="secondary">
                الحالة: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', 'all')}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.priority !== 'all' && (
              <Badge variant="secondary">
                الأولوية: {priorityOptions.find(p => p.value === filters.priority)?.label}
                <button
                  onClick={() => handleFilterChange('priority', 'all')}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
