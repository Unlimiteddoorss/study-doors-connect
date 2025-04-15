
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download } from 'lucide-react';

interface AdminPageActionsProps {
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  addLabel?: string;
  importLabel?: string;
  exportLabel?: string;
}

export function AdminPageActions({
  onAdd,
  onImport,
  onExport,
  addLabel = 'إضافة جديد',
  importLabel = 'استيراد',
  exportLabel = 'تصدير'
}: AdminPageActionsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      {onAdd && (
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          {addLabel}
        </Button>
      )}
      
      {onImport && (
        <Button variant="outline" onClick={onImport}>
          <Upload className="h-4 w-4 mr-2" />
          {importLabel}
        </Button>
      )}
      
      {onExport && (
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          {exportLabel}
        </Button>
      )}
    </div>
  );
}
