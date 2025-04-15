
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Settings, ImagePlus, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UniversityAdminControlsProps {
  universityId: number;
}

const UniversityAdminControls = ({ universityId }: UniversityAdminControlsProps) => {
  const { toast } = useToast();

  const handleEdit = () => {
    toast({
      title: "تحرير الجامعة",
      description: "سيتم فتح نموذج تحرير بيانات الجامعة"
    });
  };

  const handleDelete = () => {
    toast({
      title: "حذف الجامعة",
      description: "هل أنت متأكد من حذف هذه الجامعة؟",
      variant: "destructive"
    });
  };

  const handleUpdateImage = () => {
    toast({
      title: "تحديث الصورة",
      description: "سيتم فتح نافذة لتحديث صورة الجامعة"
    });
  };

  const handleManagePrograms = () => {
    toast({
      title: "إدارة البرامج",
      description: "سيتم فتح صفحة إدارة برامج الجامعة"
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-lg">
      <Button
        onClick={handleEdit}
        className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
      >
        <Edit className="h-4 w-4 ml-2" />
        تحرير الجامعة
      </Button>
      
      <Button
        onClick={handleUpdateImage}
        variant="outline"
      >
        <ImagePlus className="h-4 w-4 ml-2" />
        تحديث الصورة
      </Button>
      
      <Button
        onClick={handleManagePrograms}
        variant="outline"
      >
        <Building className="h-4 w-4 ml-2" />
        إدارة البرامج
      </Button>

      <Button
        onClick={handleDelete}
        variant="destructive"
      >
        <Trash className="h-4 w-4 ml-2" />
        حذف الجامعة
      </Button>
    </div>
  );
};

export default UniversityAdminControls;
