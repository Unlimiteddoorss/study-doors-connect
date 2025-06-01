
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateFile } from '@/utils/validation';

interface SecureFileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  className?: string;
}

const SecureFileUpload: React.FC<SecureFileUploadProps> = ({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png'],
  className = ''
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileValidation = useCallback((files: FileList) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const validation = validateFile(file, maxSizeMB);
      
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: نوع الملف غير مدعوم`);
        return;
      }
      
      if (!validation.isValid) {
        errors.push(`${file.name}: ${validation.errors.join(', ')}`);
        return;
      }
      
      validFiles.push(file);
    });

    if (selectedFiles.length + validFiles.length > maxFiles) {
      errors.push(`يمكنك رفع ${maxFiles} ملفات كحد أقصى`);
      return { validFiles: [], errors };
    }

    return { validFiles, errors };
  }, [acceptedTypes, maxFiles, maxSizeMB, selectedFiles.length]);

  const handleFileSelection = useCallback((files: FileList) => {
    const { validFiles, errors } = handleFileValidation(files);
    
    if (errors.length > 0) {
      toast({
        title: 'خطأ في رفع الملفات',
        description: errors.join('\n'),
        variant: 'destructive',
      });
      return;
    }

    const newFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [handleFileValidation, selectedFiles, onFilesSelected, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files);
    }
  }, [handleFileSelection]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files);
    }
  }, [handleFileSelection]);

  const removeFile = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [selectedFiles, onFilesSelected]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-unlimited-blue bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          اسحب الملفات هنا أو انقر للتحديد
        </p>
        <p className="text-xs text-gray-500 mb-4">
          الحد الأقصى: {maxFiles} ملفات، {maxSizeMB} ميجابايت لكل ملف
        </p>
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          اختيار الملفات
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">الملفات المحددة:</h4>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} ميجابايت
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-start space-x-2 space-x-reverse">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-700">
            <p className="font-medium">تنبيه أمني:</p>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>تأكد من أن الملفات المرفوعة آمنة</li>
              <li>لا ترفع ملفات تحتوي على معلومات شخصية حساسة</li>
              <li>سيتم فحص جميع الملفات قبل الرفع</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureFileUpload;
