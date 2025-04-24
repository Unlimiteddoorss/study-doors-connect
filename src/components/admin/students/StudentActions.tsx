
import { Plus, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';

interface StudentActionsProps {
  onImport: () => void;
  onExport: () => void;
  isImportDialogOpen: boolean;
  setIsImportDialogOpen: (open: boolean) => void;
  setIsAddDialogOpen: (open: boolean) => void;
}

export function StudentActions({
  onImport,
  onExport,
  isImportDialogOpen,
  setIsImportDialogOpen,
  setIsAddDialogOpen
}: StudentActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Button onClick={() => setIsAddDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        {t('admin.studentsPage.addStudent')}
      </Button>
      
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            {t('admin.studentsPage.importStudents')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('admin.studentsPage.importData')}</DialogTitle>
            <DialogDescription>
              {t('admin.studentsPage.importDataDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
              <p className="mt-2 text-sm text-unlimited-gray">
                {t('admin.studentsPage.dragDrop')}
              </p>
              <input type="file" className="hidden" />
              <Button variant="outline" className="mt-4">
                {t('admin.studentsPage.chooseFile')}
              </Button>
            </div>
          </div>
          <Button onClick={onImport}>
            <Upload className="h-4 w-4 mr-2" />
            {t('admin.studentsPage.importStudents')}
          </Button>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" onClick={onExport}>
        <Download className="h-4 w-4 mr-2" />
        {t('admin.studentsPage.exportStudents')}
      </Button>
    </div>
  );
}
