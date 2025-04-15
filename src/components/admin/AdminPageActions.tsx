
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

export function AdminPageActions({
  onAdd,
  onImport,
  onExport,
  addLabel = 'إضافة جديد',
  importLabel = 'استيراد',
  exportLabel = 'تصدير',
  isLoading = false
}: AdminPageActionsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      {onAdd && (
        <Button onClick={onAdd} disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" />
          {addLabel}
        </Button>
      )}
      
      {onImport && (
        <Button variant="outline" onClick={onImport} disabled={isLoading}>
          <Upload className="h-4 w-4 mr-2" />
          {importLabel}
        </Button>
      )}
      
      {onExport && (
        <Button variant="outline" onClick={onExport} disabled={isLoading}>
          <Download className="h-4 w-4 mr-2" />
          {exportLabel}
        </Button>
      )}
    </div>
  );
}
