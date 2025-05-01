
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Edit, Eye, Trash } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from './TableSkeleton';
import { TablePagination } from './TablePagination';

export interface FilterableTableProps {
  data: any[];
  columns: {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
    hideOnMobile?: boolean;
  }[];
  isLoading?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  actions?: (row: any) => {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  emptyStateMessage?: string;
  searchPlaceholder?: string;
  searchEnabled?: boolean;
  onViewDetails?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const FilterableTable = ({
  data = [],
  columns = [],
  isLoading = false,
  currentPage = 1,
  pageSize = 10,
  totalItems = 0,
  totalPages = 1,
  onPageChange,
  actions,
  emptyStateMessage = "لا توجد بيانات لعرضها",
  searchPlaceholder = "بحث...",
  searchEnabled = true,
  onViewDetails,
  onEdit,
  onDelete,
}: FilterableTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Update filtered data when data or search term changes
  React.useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      return columns.some((column) => {
        const value = item[column.accessor];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowercasedSearchTerm);
        }
        if (typeof value === 'number') {
          return value.toString().includes(lowercasedSearchTerm);
        }
        return false;
      });
    });

    setFilteredData(filtered);
  }, [data, searchTerm, columns]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <TableSkeleton columns={columns.length} rows={5} />;
  }

  // Generate default actions if the callback props are provided
  const getActions = (row: any) => {
    if (actions) {
      return actions(row);
    }
    
    const defaultActions = [];
    
    if (onViewDetails) {
      defaultActions.push({
        label: 'عرض التفاصيل',
        onClick: () => onViewDetails(row),
        icon: <Eye className="h-4 w-4" />
      });
    }
    
    if (onEdit) {
      defaultActions.push({
        label: 'تعديل',
        onClick: () => onEdit(row),
        icon: <Edit className="h-4 w-4" />
      });
    }
    
    if (onDelete) {
      defaultActions.push({
        label: 'حذف',
        onClick: () => onDelete(row),
        icon: <Trash className="h-4 w-4" />
      });
    }
    
    return defaultActions.length ? defaultActions : undefined;
  };

  const shouldShowActions = actions || onViewDetails || onEdit || onDelete;

  return (
    <div className="space-y-4">
      {searchEnabled && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 w-full md:w-64"
          />
        </div>
      )}
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.header} 
                  className={column.hideOnMobile ? "hidden md:table-cell" : ""}
                >
                  {column.header}
                </TableHead>
              ))}
              {shouldShowActions && <TableHead className="w-[80px]">إجراءات</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={shouldShowActions ? columns.length + 1 : columns.length}
                  className="text-center h-32"
                >
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <TableCell 
                      key={column.accessor}
                      className={column.hideOnMobile ? "hidden md:table-cell" : ""}
                    >
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : row[column.accessor]}
                    </TableCell>
                  ))}
                  {shouldShowActions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {getActions(row)?.map((action, i) => (
                            <DropdownMenuItem
                              key={i}
                              onClick={action.onClick}
                              className="cursor-pointer"
                            >
                              {action.icon && <span className="mr-2">{action.icon}</span>}
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {onPageChange && totalPages > 1 && (
        <div className="flex items-center justify-end">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
      
      {totalItems > 0 && (
        <div className="text-sm text-unlimited-gray text-right">
          إجمالي النتائج: {totalItems} | الصفحة {currentPage} من {totalPages}
        </div>
      )}
    </div>
  );
};

export { FilterableTable };
