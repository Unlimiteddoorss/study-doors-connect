import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Edit, 
  MoreHorizontal, 
  Trash, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableSkeleton } from './TableSkeleton';
import { BulkActions } from './BulkActions';
import { EnhancedSearch } from './EnhancedSearch';

interface Column {
  header: string;
  accessor: string;
  hideOnMobile?: boolean;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface EnhancedFilterableTableProps {
  data: any[];
  columns: Column[];
  isLoading: boolean;
  onViewDetails: (item: any) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onBulkAction?: (action: string, items: string[]) => void;
  searchPlaceholder?: string;
  enableBulkActions?: boolean;
  enableSearch?: boolean;
  enableExport?: boolean;
}

export function EnhancedFilterableTable({
  data,
  columns,
  isLoading,
  onViewDetails,
  onEdit,
  onDelete,
  onBulkAction,
  searchPlaceholder = "البحث في البيانات...",
  enableBulkActions = true,
  enableSearch = true,
  enableExport = true
}: EnhancedFilterableTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filteredData, setFilteredData] = useState(data);

  // تطبيق الفلاتر والبحث
  const handleSearch = (filters: any) => {
    let filtered = data;

    // تطبيق البحث النصي
    if (filters.query) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(filters.query.toLowerCase())
        )
      );
    }

    // تطبيق فلاتر الحالة
    if (filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // تطبيق فلاتر الأولوية
    if (filters.priority !== 'all') {
      filtered = filtered.filter(item => item.priority === filters.priority);
    }

    // تطبيق فلاتر البلد
    if (filters.country !== 'all') {
      filtered = filtered.filter(item => item.country === filters.country);
    }

    // تطبيق فلاتر التخصص
    if (filters.program !== 'all') {
      filtered = filtered.filter(item => item.program === filters.program);
    }

    // تطبيق فلتر التاريخ
    if (filters.dateRange.from && filters.dateRange.to) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.submittedAt || item.createdAt || item.date);
        return itemDate >= filters.dateRange.from && itemDate <= filters.dateRange.to;
      });
    }

    setFilteredData(filtered);
  };

  // ترتيب البيانات
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        } else {
          return null; // إزالة الترتيب
        }
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(sortedData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-unlimited-blue" />
      : <ArrowDown className="h-4 w-4 text-unlimited-blue" />;
  };

  const isAllSelected = selectedItems.length === sortedData.length && sortedData.length > 0;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < sortedData.length;

  return (
    <div className="space-y-4">
      {enableSearch && (
        <EnhancedSearch
          onSearch={handleSearch}
          placeholder={searchPlaceholder}
          showExportOptions={enableExport}
        />
      )}

      {enableBulkActions && (
        <BulkActions
          selectedItems={selectedItems}
          totalItems={sortedData.length}
          onSelectAll={handleSelectAll}
          onBulkAction={onBulkAction || (() => {})}
        />
      )}

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {enableBulkActions && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    className={isIndeterminate ? 'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground' : ''}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.accessor}
                  className={`${column.hideOnMobile ? 'hidden md:table-cell' : ''} ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.accessor)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && getSortIcon(column.accessor)}
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton columns={columns.length + (enableBulkActions ? 2 : 1)} rows={10} />
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (enableBulkActions ? 2 : 1)} 
                  className="text-center h-40 text-unlimited-gray"
                >
                  لا توجد بيانات متطابقة مع البحث
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((item) => (
                <TableRow key={item.id} className={selectedItems.includes(item.id) ? 'bg-blue-50' : ''}>
                  {enableBulkActions && (
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      className={column.hideOnMobile ? 'hidden md:table-cell' : undefined}
                    >
                      {column.render ? column.render(item[column.accessor], item) : item[column.accessor]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => onViewDetails(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => onEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onViewDetails(item)}>
                            <Eye className="h-4 w-4 mr-2" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(item)}>
                            <Edit className="h-4 w-4 mr-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => onDelete(item)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {sortedData.length > 0 && (
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>عرض {sortedData.length} من {data.length} عنصر</span>
          {selectedItems.length > 0 && (
            <span>{selectedItems.length} عنصر محدد</span>
          )}
        </div>
      )}
    </div>
  );
}
