
import { useState, useEffect } from 'react';

interface FilterField {
  field: string;
  defaultValue: string;
}

export function useTableFilters<T>(
  items: T[],
  searchFields: string[], 
  filterFields: FilterField[] = []
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  
  // Initialize filters with default values
  useEffect(() => {
    const initialFilters = filterFields.reduce((acc, filter) => {
      acc[filter.field] = filter.defaultValue;
      return acc;
    }, {} as Record<string, string>);
    
    setFilters(initialFilters);
  }, [filterFields]);
  
  // Filter items when search query, filters or items change
  useEffect(() => {
    let result = [...items];
    
    // Apply search filter if searchQuery is not empty
    if (searchQuery.trim() !== '') {
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      result = result.filter((item: any) => 
        searchFields.some(field => {
          const value = item[field];
          return value && 
            typeof value === 'string' && 
            value.toLowerCase().includes(lowerCaseQuery);
        })
      );
    }
    
    // Apply all active filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value !== 'all') {
        result = result.filter((item: any) => String(item[field]) === value);
      }
    });
    
    setFilteredItems(result);
  }, [searchQuery, filters, items, searchFields]);
  
  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems
  };
}
