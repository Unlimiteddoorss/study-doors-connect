
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
import { MoreHorizontal, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TableSkeleton from './TableSkeleton';
import TablePagination from './TablePagination';

export interface FilterableTableProps {
  data: any[];
  columns: {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
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
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
              {actions && <TableHead className="w-[80px]">إجراءات</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={actions ? columns.length + 1 : columns.length}
                  className="text-center h-32"
                >
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.accessor}>
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : row[column.accessor]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions(row).map((action, i) => (
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
      
      {onPageChange && (
        <div className="flex items-center justify-end">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterableTable;
