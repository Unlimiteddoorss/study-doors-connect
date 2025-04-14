
import { useState } from 'react';

export function useTableFilters<T>(
  items: T[],
  searchFields: (keyof T)[],
  filterFields: { field: keyof T; defaultValue: string }[]
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>(
    filterFields.reduce((acc, { field, defaultValue }) => {
      acc[field as string] = defaultValue;
      return acc;
    }, {} as Record<string, string>)
  );

  const filteredItems = items.filter((item) => {
    const matchesSearch = searchQuery === '' || searchFields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(searchQuery.toLowerCase());
    });

    const matchesFilters = Object.entries(filters).every(([field, filterValue]) => {
      return filterValue === 'all' || String(item[field as keyof T]) === filterValue;
    });

    return matchesSearch && matchesFilters;
  });

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems,
  };
}
