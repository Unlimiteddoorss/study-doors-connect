
import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface AddUniversityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const AddUniversityDialog = ({ open, onOpenChange, onSubmit, isLoading }: AddUniversityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-unlimited-dark-blue text-xl">إضافة جامعة جديدة</DialogTitle>
          <DialogDescription>
            أدخل بيانات الجامعة الجديدة واضغط على حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nameAr">اسم الجامعة (عربي)</Label>
            <Input id="nameAr" placeholder="أدخل اسم الجامعة بالعربية" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nameEn">اسم الجامعة (إنجليزي)</Label>
            <Input id="nameEn" placeholder="University name in English" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">الدولة</Label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                <SelectItem value="ae">الإمارات العربية المتحدة</SelectItem>
                <SelectItem value="tr">تركيا</SelectItem>
                <SelectItem value="my">ماليزيا</SelectItem>
                <SelectItem value="uk">المملكة المتحدة</SelectItem>
                <SelectItem value="us">الولايات المتحدة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">المدينة</Label>
            <Input id="city" placeholder="أدخل اسم المدينة" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">نوع الجامعة</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="اختر النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">حكومية</SelectItem>
                <SelectItem value="private">خاصة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ranking">التصنيف العالمي</Label>
            <Input id="ranking" type="number" placeholder="أدخل التصنيف" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">الموقع الإلكتروني</Label>
            <Input id="website" type="url" placeholder="https://example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">الحالة</Label>
            <Select>
              <SelectTrigger id="status">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">مفعلة</SelectItem>
                <SelectItem value="inactive">غير مفعلة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label>شعار الجامعة</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
              <p className="mt-2 text-sm text-unlimited-gray">
                قم بإسقاط الملف هنا، أو انقر للتصفح
              </p>
              <Button variant="outline" className="mt-4">
                اختيار ملف
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUniversityDialog;
