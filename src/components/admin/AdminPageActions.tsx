
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download } from 'lucide-react';

interface AdminPageActionsProps {
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  addLabel?: string;
  importLabel?: string;
  exportLabel?: string;
  isLoading?: boolean;
}

export const AdminPageActions: React.FC<AdminPageActionsProps> = ({
  onAdd,
  onImport,
  onExport,
  addLabel = "إضافة جديد",
  importLabel = "استيراد",
  exportLabel = "تصدير",
  isLoading = false
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {onAdd && (
        <Button onClick={onAdd} disabled={isLoading} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      )}
      
      {onImport && (
        <Button variant="outline" onClick={onImport} disabled={isLoading} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          {importLabel}
        </Button>
      )}
      
      {onExport && (
        <Button variant="outline" onClick={onExport} disabled={isLoading} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          {exportLabel}
        </Button>
      )}
    </div>
  );
};
