
import { useState } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  label: string;
  description?: string;
  required?: boolean;
  onChange?: (file: File | null) => void;
}

export const PhotoUpload = ({ 
  label, 
  description = "أضف صورة شخصية للطالب",
  required = false,
  onChange 
}: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreview(null);
      onChange && onChange(null);
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ في الملف",
        description: "يرجى اختيار صورة فقط",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "حجم الملف كبير جداً",
        description: "يجب أن لا يتجاوز حجم الصورة 5 ميجابايت",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onChange && onChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removePhoto = () => {
    setPreview(null);
    onChange && onChange(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging ? 'border-unlimited-blue bg-unlimited-blue/5' : 'border-gray-300 hover:border-unlimited-blue'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-unlimited-gray" />
          <p className="font-medium mb-1">{description}</p>
          <p className="text-sm text-unlimited-gray mb-4">اسحب وأفلت الصورة هنا أو انقر لاختيار صورة</p>
          <div className="flex justify-center">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Button variant="outline" type="button">
                <Camera className="h-4 w-4 ml-2" />
                اختيار صورة
              </Button>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            />
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-300">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="destructive" size="sm" onClick={removePhoto}>
              <X className="h-4 w-4 ml-1" />
              إزالة الصورة
            </Button>
          </div>
        </div>
      )}
      <p className="text-xs text-unlimited-gray mt-1">يفضل صورة بحجم 300×300 بيكسل، بخلفية بيضاء</p>
    </div>
  );
};
