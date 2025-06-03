
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Flag, 
  Download, 
  FileText, 
  Printer,
  Edit,
  MessageSquare 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ApplicationDetailsActionsProps {
  application: any;
  onStatusChange: (status: string) => void;
  onExport: (format: string) => void;
}

const ApplicationDetailsActions = ({ 
  application, 
  onStatusChange, 
  onExport 
}: ApplicationDetailsActionsProps) => {
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800' },
      under_review: { label: 'قيد المراجعة', color: 'bg-blue-100 text-blue-800' },
      accepted: { label: 'مقبول', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'مرفوض', color: 'bg-red-100 text-red-800' },
      cancelled: { label: 'ملغي', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { label: status, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus);
    toast({
      title: "تم تحديث الحالة",
      description: `تم تغيير حالة الطلب بنجاح`,
    });
  };

  const handleExport = (format: string) => {
    onExport(format);
    toast({
      title: "جاري التصدير",
      description: `جاري تصدير البيانات بصيغة ${format}`,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">طلب رقم #{application?.id}</h2>
          <p className="text-gray-600">{application?.studentName}</p>
        </div>
        {getStatusBadge(application?.status)}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Quick Status Actions */}
        <Button 
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => handleStatusChange('accepted')}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          قبول
        </Button>
        
        <Button 
          size="sm"
          variant="destructive"
          onClick={() => handleStatusChange('rejected')}
        >
          <XCircle className="h-4 w-4 mr-1" />
          رفض
        </Button>
        
        <Button 
          size="sm"
          variant="outline"
          onClick={() => handleStatusChange('under_review')}
        >
          <Clock className="h-4 w-4 mr-1" />
          مراجعة
        </Button>

        {/* Export Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              تصدير
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>تصدير البيانات</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              <FileText className="h-4 w-4 mr-2" />
              تصدير PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('excel')}>
              <FileText className="h-4 w-4 mr-2" />
              تصدير Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              <FileText className="h-4 w-4 mr-2" />
              تصدير CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* More Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              المزيد
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>إجراءات إضافية</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              تعديل البيانات
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="h-4 w-4 mr-2" />
              إرسال رسالة
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Flag className="h-4 w-4 mr-2" />
              إضافة ملاحظة
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer className="h-4 w-4 mr-2" />
              طباعة
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ApplicationDetailsActions;
