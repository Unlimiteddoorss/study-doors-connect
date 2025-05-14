
import React, { useState } from 'react';
import { Search, X, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface AdvancedSearchProps {
  placeholder?: string;
  onSearch?: (query: string, filters: any) => void;
  className?: string;
  filterOptions?: {
    status?: string[];
    type?: string[];
    country?: string[];
    program?: string[];
    [key: string]: string[] | undefined;
  };
}

const AdvancedSearch = ({ 
  placeholder = "البحث...", 
  onSearch, 
  className = '',
  filterOptions = {
    status: ['نشط', 'معلق', 'مرفوض', 'مكتمل'],
    type: ['بكالوريوس', 'ماجستير', 'دكتوراه'],
    country: ['تركيا', 'ماليزيا', 'بريطانيا', 'أمريكا', 'كندا'],
    program: ['طب', 'هندسة', 'علوم الحاسب', 'إدارة أعمال']
  }
}: AdvancedSearchProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, { ...filters, dateRange });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setFilters({});
    setDateRange({});
    setAppliedFilters([]);
    if (onSearch) {
      onSearch('', {});
    }
  };

  const applyFilter = (category: string, value: string) => {
    setFilters(prev => ({ ...prev, [category]: value }));
    
    const filterLabel = `${category}: ${value}`;
    if (!appliedFilters.includes(filterLabel)) {
      setAppliedFilters(prev => [...prev, filterLabel]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const [category] = filterToRemove.split(':');
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[category.trim()];
      return newFilters;
    });
    setAppliedFilters(prev => prev.filter(filter => filter !== filterToRemove));
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    const filterLabel = `${t('filter.date')}: ${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
    
    // Remove any existing date filters
    const updatedFilters = appliedFilters.filter(filter => !filter.startsWith(`${t('filter.date')}:`));
    setAppliedFilters([...updatedFilters, filterLabel]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4 mr-2" />
          {t('filter.filters')}
        </Button>
        
        <Button onClick={handleSearch}>{t('search')}</Button>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border rounded-md bg-white/50 backdrop-blur-sm shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(filterOptions).map(([category, values]) => (
                  <div key={category}>
                    <label className="block text-sm font-medium mb-1">
                      {t(`filter.${category}`)}
                    </label>
                    <Select 
                      onValueChange={(value) => applyFilter(category, value)}
                      value={filters[category]}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('filter.select')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t(`filter.${category}`)}</SelectLabel>
                          {values?.map(value => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('filter.dateRange')}
                  </label>
                  <DatePickerWithRange onChange={handleDateRangeChange} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {appliedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {appliedFilters.map(filter => (
            <Badge key={filter} variant="outline" className="px-2 py-1">
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-2 hover:text-unlimited-danger focus:outline-none"
              >
                <X className="h-3 w-3 inline" />
              </button>
            </Badge>
          ))}
          {appliedFilters.length > 1 && (
            <Button variant="ghost" size="sm" onClick={clearSearch} className="h-7">
              {t('filter.clearAll')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
