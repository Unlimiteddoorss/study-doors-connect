
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export interface Column {
  header: React.ReactNode;
  accessorKey: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

interface ExpandableDataTableProps {
  columns: Column[];
  data: any[];
  renderExpandedRow: (row: any) => React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const ExpandableDataTable = ({ 
  columns, 
  data, 
  renderExpandedRow,
  className = '',
  isLoading = false
}: ExpandableDataTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (isLoading) {
    return (
      <div className={`border rounded-md shadow-sm ${className}`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              {columns.map((column, idx) => (
                <TableHead key={idx}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5).fill(0).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="w-6 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                </TableCell>
                {columns.map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={`border rounded-md shadow-sm overflow-hidden ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            {columns.map((column, idx) => (
              <TableHead key={idx}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center text-unlimited-gray">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIdx) => (
              <React.Fragment key={row.id || rowIdx}>
                <TableRow>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleRow(row.id || rowIdx.toString())}
                    >
                      {expandedRows[row.id || rowIdx.toString()] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  {columns.map((column, colIdx) => (
                    <TableCell key={colIdx}>
                      {column.cell 
                        ? column.cell(row[column.accessorKey], row) 
                        : row[column.accessorKey]
                      }
                    </TableCell>
                  ))}
                </TableRow>
                <AnimatePresence>
                  {expandedRows[row.id || rowIdx.toString()] && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan={columns.length + 1} className="bg-gray-50 px-4 py-3">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {renderExpandedRow(row)}
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpandableDataTable;
