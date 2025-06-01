
import { useState, useMemo } from 'react';

interface FilterConfig {
  field: string;
  defaultValue: string;
}

interface Filters {
  [key: string]: string;
}

export function useTableFilters<T extends Record<string, any>>(
  items: T[],
  searchFields: (keyof T)[],
  filterConfigs: FilterConfig[]
) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize filters with default values
  const initialFilters = filterConfigs.reduce((acc, config) => {
    acc[config.field] = config.defaultValue;
    return acc;
  }, {} as Filters);
  
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value && value !== 'all') {
        result = result.filter((item) => {
          const itemValue = item[field];
          return itemValue === value;
        });
      }
    });

    return result;
  }, [items, searchQuery, filters, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems,
  };
}
