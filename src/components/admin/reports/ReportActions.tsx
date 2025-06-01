
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Filter, Calendar } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const ReportActions = () => {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            فترة التقرير
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>آخر 30 يوم</DropdownMenuItem>
          <DropdownMenuItem>آخر 3 أشهر</DropdownMenuItem>
          <DropdownMenuItem>آخر 6 أشهر</DropdownMenuItem>
          <DropdownMenuItem>السنة الحالية</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        فلاتر متقدمة
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <FileText className="h-4 w-4 mr-2" />
            تصدير PDF
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="h-4 w-4 mr-2" />
            تصدير Excel
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="h-4 w-4 mr-2" />
            تصدير CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
