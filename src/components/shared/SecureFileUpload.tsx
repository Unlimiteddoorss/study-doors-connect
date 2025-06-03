
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateFile, validateFileType } from '@/utils/validation';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/RealAuthProvider';

interface SecureFileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  className?: string;
  bucketName?: string;
  autoUpload?: boolean;
}

const SecureFileUpload: React.FC<SecureFileUploadProps> = ({
  onFilesSelected,
  onUploadComplete,
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png'],
  className = '',
  bucketName = 'documents',
  autoUpload = false
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileValidation = useCallback((files: FileList) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const validation = validateFile(file, maxSizeMB);
      
      if (!validateFileType(file, acceptedTypes)) {
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

  const uploadFileToSupabase = async (file: File): Promise<string | null> => {
    if (!user) {
      throw new Error('يجب تسجيل الدخول لرفع الملفات');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleFileSelection = useCallback(async (files: FileList) => {
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

    if (autoUpload && validFiles.length > 0) {
      await handleUpload(validFiles);
    }
  }, [handleFileValidation, selectedFiles, onFilesSelected, autoUpload, toast]);

  const handleUpload = async (filesToUpload?: File[]) => {
    const files = filesToUpload || selectedFiles;
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const url = await uploadFileToSupabase(file);
        
        if (url) {
          uploadedUrls.push(url);
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        } else {
          throw new Error(`فشل في رفع الملف: ${file.name}`);
        }
      }

      toast({
        title: 'تم الرفع بنجاح',
        description: `تم رفع ${files.length} ملف بنجاح`,
      });

      if (onUploadComplete) {
        onUploadComplete(uploadedUrls);
      }

    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'خطأ في الرفع',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء رفع الملفات',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

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
          disabled={uploading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              جاري المعالجة...
            </>
          ) : (
            'اختيار الملفات'
          )}
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">الملفات المحددة:</h4>
            {!autoUpload && (
              <Button
                onClick={() => handleUpload()}
                disabled={uploading || selectedFiles.length === 0}
                size="sm"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الرفع...
                  </>
                ) : (
                  'رفع الملفات'
                )}
              </Button>
            )}
          </div>
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
                  {uploadProgress[file.name] !== undefined && (
                    <div className="w-24 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-unlimited-blue h-1 rounded-full transition-all"
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
                disabled={uploading}
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
