
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column {
  header: string;
  accessor: string;
  hideOnMobile?: boolean;
  render?: (value: any, row?: any) => React.ReactNode;
}

export interface Action {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

export interface FilterableTableProps {
  data: any[];
  columns: Column[];
  isLoading?: boolean;
  actions?: (row: any) => Action[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  className?: string;
}

const FilterableTable = ({
  data,
  columns,
  isLoading = false,
  actions,
  pagination,
  className,
}: FilterableTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, i) => (
              <TableHead
                key={i}
                className={cn(column.hideOnMobile && 'hidden md:table-cell')}
              >
                {column.header}
              </TableHead>
            ))}
            {actions && <TableHead className="w-[80px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn(column.hideOnMobile && 'hidden md:table-cell')}
                  >
                    {column.render
                      ? column.render(row[column.accessor], row)
                      : row[column.accessor]}
                  </TableCell>
                ))}
                
                {actions && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">فتح القائمة</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actions(row).map((action, actionIndex) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            onClick={() => action.onClick()}
                            className={cn(
                              action.destructive && 'text-red-600',
                              'gap-2'
                            )}
                          >
                            {action.icon}
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

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4 px-4 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            السابق
          </Button>
          <div className="text-sm text-unlimited-gray">
            الصفحة {pagination.currentPage} من {pagination.totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPage}
          >
            التالي
          </Button>
        </div>
      )}
    </div>
  );
};

// Export both as default and named export to support both import styles
export { FilterableTable };
export default FilterableTable;
