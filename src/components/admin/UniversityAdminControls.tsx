import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, ImagePlus, Building, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useAdminActions } from '@/hooks/admin/useAdminActions';

interface UniversityAdminControlsProps {
  universityId: number;
}

const UniversityAdminControls = ({ universityId }: UniversityAdminControlsProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isProgramsDialogOpen, setIsProgramsDialogOpen] = useState(false);

  const { handleAction } = useAdminActions();

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    await handleAction(
      async () => {
        // Here you would implement the actual save logic
        console.log('Saving university changes...');
      },
      {
        successMessage: 'تم تحديث بيانات الجامعة بنجاح',
        errorMessage: 'حدث خطأ أثناء تحديث بيانات الجامعة'
      }
    );
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    // Delete functionality will be handled by the AlertDialog
  };

  const handleConfirmDelete = () => {
    toast({
      title: "حذف الجامعة",
      description: "تم حذف الجامعة بنجاح",
      variant: "destructive"
    });
  };

  const handleUpdateImage = () => {
    setIsImageDialogOpen(true);
  };

  const handleSaveImage = async () => {
    await handleAction(
      async () => {
        // Here you would implement the actual image upload logic
        console.log('Uploading university image...');
      },
      {
        successMessage: 'تم تحديث صورة الجامعة بنجاح',
        errorMessage: 'حدث خطأ أثناء تحديث صورة الجامعة'
      }
    );
    setIsImageDialogOpen(false);
  };

  const handleManagePrograms = () => {
    setIsProgramsDialogOpen(true);
  };

  const handleAddProgram = async () => {
    await handleAction(
      async () => {
        // Here you would implement the actual program addition logic
        console.log('Adding new program...');
      },
      {
        successMessage: 'تم إضافة البرنامج بنجاح',
        errorMessage: 'حدث خطأ أثناء إضافة البرنامج'
      }
    );
  };

  const toggleControls = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-10">
        {isExpanded ? (
          <div className="bg-white p-2 rounded-lg shadow-lg animate-fade-in">
            <div className="flex justify-end mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={toggleControls}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                  >
                    <Trash className="h-4 w-4 ml-2" />
                    حذف الجامعة
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>هل أنت متأكد من حذف هذه الجامعة؟</AlertDialogTitle>
                    <AlertDialogDescription>
                      هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف الجامعة وجميع البرامج المرتبطة بها بشكل دائم من قاعدة البيانات.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleConfirmDelete}
                      className="bg-unlimited-danger hover:bg-unlimited-danger/90"
                    >
                      حذف
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <Button 
            className="bg-unlimited-blue hover:bg-unlimited-dark-blue rounded-full shadow-lg"
            size="icon"
            onClick={toggleControls}
          >
            <Edit className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Edit University Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تحرير بيانات الجامعة</DialogTitle>
            <DialogDescription>
              تحديث معلومات الجامعة وبياناتها الأساسية
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">اسم الجامعة</Label>
              <Input id="name" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nameAr" className="text-right">اسم الجامعة (عربي)</Label>
              <Input id="nameAr" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">الدولة</Label>
              <Select defaultValue="Turkey">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الدولة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Turkey">تركيا</SelectItem>
                  <SelectItem value="Cyprus">قبرص</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">المدينة</Label>
              <Select defaultValue="Istanbul">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Istanbul">إسطنبول</SelectItem>
                  <SelectItem value="Ankara">أنقرة</SelectItem>
                  <SelectItem value="Antalya">أنطاليا</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">النوع</Label>
              <Select defaultValue="Private">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="نوع الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">خاصة</SelectItem>
                  <SelectItem value="Public">حكومية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="founded" className="text-right">سنة التأسيس</Label>
              <Input id="founded" type="number" defaultValue="2000" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">الموقع الإلكتروني</Label>
              <Input id="website" type="url" defaultValue="https://www.example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ranking" className="text-right">التصنيف العالمي</Label>
              <Input id="ranking" type="number" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">الوصف</Label>
              <Textarea id="description" className="col-span-3" rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحديث صورة الجامعة</DialogTitle>
            <DialogDescription>
              قم بتحميل صورة جديدة للجامعة
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImagePlus className="h-10 w-10 mx-auto text-unlimited-gray mb-2" />
              <p className="text-sm text-unlimited-gray mb-2">
                اسحب وأفلت الصورة هنا أو انقر للاختيار
              </p>
              <Input id="picture" type="file" className="hidden" accept="image/*" />
              <Button variant="outline" onClick={() => document.getElementById('picture')?.click()}>
                اختيار صورة
              </Button>
            </div>
            <p className="text-sm text-unlimited-gray">
              يجب أن تكون الصورة بحجم لا يزيد عن 5 ميجابايت وبأبعاد لا تقل عن 1200×600 بكسل
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveImage}>تحديث الصورة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Programs Dialog */}
      <Dialog open={isProgramsDialogOpen} onOpenChange={setIsProgramsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>إدارة البرامج الدراسية</DialogTitle>
            <DialogDescription>
              إضافة، تعديل، وحذف البرامج الدراسية للجامعة
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">البرامج الحالية</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                إضافة برنامج
              </Button>
            </div>

            <div className="border rounded-md p-4 mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">بكالوريوس هندسة برمجيات</h4>
                  <p className="text-sm text-unlimited-gray">المدة: 4 سنوات | اللغة: الإنجليزية | الرسوم: 4000 دولار سنوياً</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-unlimited-danger">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">ماجستير إدارة أعمال</h4>
                  <p className="text-sm text-unlimited-gray">المدة: 2 سنة | اللغة: الإنجليزية | الرسوم: 5000 دولار سنوياً</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-unlimited-danger">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">بكالوريوس طب بشري</h4>
                  <p className="text-sm text-unlimited-gray">المدة: 6 سنوات | اللغة: الإنجليزية | الرسوم: 7000 دولار سنوياً</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-unlimited-danger">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsProgramsDialogOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UniversityAdminControls;
