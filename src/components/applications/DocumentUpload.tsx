import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Upload, X, CheckCircle, AlertCircle, FileQuestion, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export interface DocumentFile {
  id: string;
  name: string;
  nameAr?: string;
  type: string;
  size: number;
  url: string;
  status: 'uploaded' | 'uploading' | 'error' | 'required' | 'verified';
  uploadProgress?: number;
  lastModified: string;
  errorMessage?: string;
}

export interface DocumentType {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  required: boolean;
  acceptedFormats: string[];
  maxSize: number;
  files: DocumentFile[];
}

interface DocumentUploadProps {
  documents: DocumentType[];
  onDocumentUpload: (documentTypeId: string, file: File) => Promise<void>;
  onDocumentDelete: (documentTypeId: string, fileId: string) => void;
  onDocumentDownload?: (file: DocumentFile) => void;
  readOnly?: boolean;
  className?: string;
}

export const DocumentUpload = ({
  documents,
  onDocumentUpload,
  onDocumentDelete,
  onDocumentDownload,
  readOnly = false,
  className
}: DocumentUploadProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const isRtl = i18n.language === 'ar';

  const getLocalizedValue = (enValue: string, arValue: string) => {
    return isRtl ? arValue : enValue;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, documentId: string) => {
    e.preventDefault();
    setIsDragging(documentId);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(null);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, documentId: string) => {
    e.preventDefault();
    setIsDragging(null);

    if (readOnly) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await uploadFile(documentId, files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(documentId, files[0]);
      e.target.value = ''; // Reset input value to allow uploading the same file again
    }
  };

  const uploadFile = async (documentId: string, file: File) => {
    const documentType = documents.find(doc => doc.id === documentId);
    if (!documentType) {
      toast({
        title: t("documents.error"),
        description: t("documents.documentTypeNotFound"),
        variant: "destructive"
      });
      return;
    }

    if (file.size > documentType.maxSize) {
      toast({
        title: t("documents.error"),
        description: t("documents.fileSizeTooLarge", { maxSize: formatBytes(documentType.maxSize) }),
        variant: "destructive"
      });
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const acceptedExtensions = documentType.acceptedFormats.map(format => 
      format.startsWith('.') ? format.substring(1).toLowerCase() : format.toLowerCase());

    if (!acceptedExtensions.includes(fileExtension)) {
      toast({
        title: t("documents.error"),
        description: t("documents.invalidFileFormat", { formats: documentType.acceptedFormats.join(', ') }),
        variant: "destructive"
      });
      return;
    }

    try {
      await onDocumentUpload(documentId, file);
      toast({
        title: t("documents.uploadSuccess"),
        description: t("documents.fileUploaded", { fileName: file.name }),
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: t("documents.error"),
        description: t("documents.uploadFailed"),
        variant: "destructive"
      });
    }
  };

  const handleDelete = (documentId: string, fileId: string, fileName: string) => {
    onDocumentDelete(documentId, fileId);
    toast({
      title: t("documents.deleted"),
      description: t("documents.fileDeleted", { fileName }),
    });
  };

  const handleDownload = (file: DocumentFile) => {
    if (onDocumentDownload) {
      onDocumentDownload(file);
    } else {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const getFileIcon = (file: DocumentFile) => {
    if (file.status === 'uploading') return <Upload className="h-5 w-5 text-unlimited-blue animate-pulse" />;
    if (file.status === 'error') return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (file.status === 'verified') return <CheckCircle className="h-5 w-5 text-green-500" />;
    
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return <FileQuestion className="h-5 w-5 text-unlimited-blue" />;
      default:
        return <FileText className="h-5 w-5 text-unlimited-blue" />;
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleClick = (documentId: string) => {
    if (!readOnly) {
      const fileInput = document.getElementById(`file-input-${documentId}`);
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-unlimited-blue">
          {t('documents.title')}
        </h2>
        
        {!readOnly && (
          <div className="text-sm text-unlimited-gray">
            {t('documents.dragAndDropHint')}
          </div>
        )}
      </div>

      {documents.map((document) => (
        <Card key={document.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {getLocalizedValue(document.name, document.nameAr)}
                  {document.required && (
                    <span className="text-red-500 text-sm">*</span>
                  )}
                </CardTitle>
                <CardDescription>
                  {getLocalizedValue(document.description, document.descriptionAr)}
                </CardDescription>
              </div>
              
              {!readOnly && document.files.length === 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="relative overflow-hidden"
                  type="button"
                >
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e, document.id)}
                    accept={document.acceptedFormats.join(',')}
                  />
                  <Upload className="h-4 w-4 mr-2" />
                  {t('documents.upload')}
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            {document.files.length > 0 ? (
              <ul className="space-y-2">
                {document.files.map((file) => (
                  <li key={file.id} className="relative p-3 border rounded-md bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {getFileIcon(file)}
                        <div>
                          <p className="font-medium">
                            {getLocalizedValue(file.name, file.nameAr || file.name)}
                          </p>
                          <div className="text-xs text-unlimited-gray">
                            {formatBytes(file.size)} • {new Date(file.lastModified).toLocaleDateString()}
                          </div>
                          {file.status === 'error' && file.errorMessage && (
                            <p className="text-xs text-red-500 mt-1">{file.errorMessage}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(file)}
                          title={t('documents.download')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        
                        {!readOnly && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(document.id, file.id, file.name)}
                            title={t('documents.delete')}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {file.status === 'uploading' && typeof file.uploadProgress === 'number' && (
                      <Progress 
                        value={file.uploadProgress} 
                        max={100}
                        className="h-1 mt-2 bg-gray-200" 
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={cn(
                  "border-2 border-dashed rounded-md p-6 text-center",
                  isDragging === document.id ? "border-unlimited-blue bg-unlimited-blue/5" : "border-gray-200",
                  readOnly ? "bg-gray-50" : "cursor-pointer"
                )}
                onDragOver={(e) => handleDragOver(e, document.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, document.id)}
                onClick={() => handleClick(document.id)}
              >
                {readOnly ? (
                  <div>
                    <FileText className="h-10 w-10 mx-auto text-unlimited-gray mb-2" />
                    <p className="text-unlimited-gray font-medium">
                      {t("documents.noDocumentsUploaded")}
                    </p>
                  </div>
                ) : (
                  <>
                    <input
                      id={`file-input-${document.id}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, document.id)}
                      accept={document.acceptedFormats.join(',')}
                    />
                    <Upload className="h-10 w-10 mx-auto text-unlimited-blue mb-2" />
                    <p className="font-medium text-unlimited-blue">
                      {t("documents.clickToUpload")}
                    </p>
                    <p className="text-sm text-unlimited-gray mt-1">
                      {t("documents.dragAndDrop")}
                    </p>
                    <p className="text-xs text-unlimited-gray mt-2">
                      {t("documents.supportedFormats")}: {document.acceptedFormats.join(', ')}
                    </p>
                    <p className="text-xs text-unlimited-gray">
                      {t("documents.maxSize")}: {formatBytes(document.maxSize)}
                    </p>
                  </>
                )}
              </div>
            )}
          </CardContent>
          
          {!readOnly && document.files.length > 0 && (
            <CardFooter className="border-t pt-4 pb-0">
              <Button
                variant="outline"
                size="sm"
                className="relative overflow-hidden"
              >
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(e, document.id)}
                  accept={document.acceptedFormats.join(',')}
                />
                <Upload className="h-4 w-4 mr-2" />
                {t('documents.uploadAnother')}
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DocumentUpload;
