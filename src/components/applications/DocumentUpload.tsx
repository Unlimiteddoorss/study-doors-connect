
import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadProps {
  label: string;
  description?: string;
  acceptTypes?: string;
  required?: boolean;
  onChange?: (file: File | null) => void;
  maxSizeMB?: number;
}

export const DocumentUpload = ({
  label,
  description,
  acceptTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  required = false,
  onChange,
  maxSizeMB = 10
}: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (newFile: File | null) => {
    if (!newFile) {
      setFile(null);
      onChange && onChange(null);
      return;
    }

    // Check file size
    if (newFile.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "حجم الملف كبير جداً",
        description: `يجب أن لا يتجاوز حجم الملف ${maxSizeMB} ميجابايت`,
        variant: "destructive"
      });
      return;
    }

    // Check file type
    const fileExtension = newFile.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptTypes.split(',').map(type => 
      type.startsWith('.') ? type.substring(1) : type
    );
    
    if (fileExtension && !acceptedExtensions.includes(fileExtension)) {
      toast({
        title: "نوع الملف غير مدعوم",
        description: `يرجى اختيار ملف من الأنواع المدعومة: ${acceptTypes}`,
        variant: "destructive"
      });
      return;
    }

    setFile(newFile);
    onChange && onChange(newFile);
    
    // Simulate upload progress for demo
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
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

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    onChange && onChange(null);
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="h-12 w-12 text-unlimited-gray" />;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <File className="h-12 w-12 text-red-500" />;
      case 'doc':
      case 'docx':
        return <File className="h-12 w-12 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <File className="h-12 w-12 text-green-500" />;
      default:
        return <File className="h-12 w-12 text-unlimited-gray" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? 'border-unlimited-blue bg-unlimited-blue/5' : 'border-gray-300 hover:border-unlimited-blue'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-center mb-4">
          {getFileIcon()}
        </div>
        
        {!file ? (
          <>
            <p className="font-medium mb-1">{description || `رفع ${label}`}</p>
            <p className="text-sm text-unlimited-gray mb-4">
              اسحب وأفلت الملف هنا أو انقر لاختيار ملف
              <br />
              <span className="text-xs">الملفات المدعومة: {acceptTypes}</span>
            </p>
            <div className="flex justify-center">
              <label htmlFor={`file-upload-${label}`} className="cursor-pointer">
                <Button variant="outline" type="button">
                  <Upload className="h-4 w-4 ml-2" />
                  اختيار ملف
                </Button>
              </label>
              <input
                id={`file-upload-${label}`}
                type="file"
                accept={acceptTypes}
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
              />
            </div>
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{file.name}</span>
              <Button variant="ghost" size="sm" onClick={removeFile} className="text-red-500 h-8 px-2">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-unlimited-gray mb-2">{formatFileSize(file.size)}</div>
            <Progress value={uploadProgress} className="h-2 mb-2" />
            <div className="text-xs text-unlimited-gray text-right">{uploadProgress}% مكتمل</div>
          </div>
        )}
      </div>
    </div>
  );
};
