
import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, Check, X, File, FilePlus, FileText, 
  FileCheck, AlertCircle, DownloadCloud 
} from 'lucide-react';
import { 
  Progress 
} from "@/components/ui/progress";

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'required' | 'uploaded' | 'approved';
  file?: File;
  progress?: number;
  error?: string;
}

interface DocumentsUploadFormProps {
  initialDocuments?: Document[];
  onSave: (documents: Document[]) => void;
}

const DocumentsUploadForm = ({ initialDocuments, onSave }: DocumentsUploadFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  const [dragActive, setDragActive] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments || [
    { id: '1', name: t('documents.passport'), type: 'pdf', status: 'required' },
    { id: '2', name: t('documents.diploma'), type: 'pdf', status: 'required' },
    { id: '3', name: t('documents.photo'), type: 'image', status: 'required' },
    { id: '4', name: t('documents.transcript'), type: 'pdf', status: 'required' },
    { id: '5', name: t('documents.motivation'), type: 'pdf', status: 'required' },
  ]);

  const uploadProgress = useMemo(() => {
    const total = documents.length;
    const uploaded = documents.filter(doc => doc.status === 'uploaded' || doc.status === 'approved').length;
    return Math.round((uploaded / total) * 100);
  }, [documents]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(id);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(id, file);
    }
  }, []);

  const simulateUpload = (id: string, file: File) => {
    // يحاكي تقدم الرفع من 0 إلى 100%
    let progress = 0;
    
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, file, progress: 0, status: 'required' } : doc
    ));
    
    const interval = setInterval(() => {
      progress += 10;
      
      setDocuments(docs => docs.map(doc => 
        doc.id === id ? { ...doc, progress } : doc
      ));
      
      if (progress >= 100) {
        clearInterval(interval);
        
        setTimeout(() => {
          setDocuments(docs => docs.map(doc => 
            doc.id === id ? { ...doc, file, status: 'uploaded', progress: undefined } : doc
          ));
          
          // حفظ البيانات بعد الرفع
          const updatedDocs = documents.map(doc => 
            doc.id === id ? { ...doc, file, status: 'uploaded' as const, progress: undefined } : doc
          );
          onSave(updatedDocs);
          
          // إظهار رسالة نجاح
          toast({
            title: t('application.documents.uploaded'),
            description: t('application.documents.uploadedDescription'),
          });
        }, 500);
      }
    }, 200);
  };

  const handleFile = (id: string, file: File) => {
    // التحقق من نوع الملف
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    
    const isValidType = doc.type === 'pdf' 
      ? file.type === 'application/pdf'
      : file.type.startsWith('image/');
    
    if (!isValidType) {
      setDocuments(docs => docs.map(d => 
        d.id === id ? { ...d, error: t('application.documents.invalidType') } : d
      ));
      
      toast({
        title: t('application.documents.error'),
        description: t('application.documents.invalidTypeDescription'),
        variant: 'destructive',
      });
      
      return;
    }
    
    // التحقق من حجم الملف (الحد الأقصى 5 ميجابايت)
    if (file.size > 5 * 1024 * 1024) {
      setDocuments(docs => docs.map(d => 
        d.id === id ? { ...d, error: t('application.documents.fileTooLarge') } : d
      ));
      
      toast({
        title: t('application.documents.error'),
        description: t('application.documents.fileTooLargeDescription'),
        variant: 'destructive',
      });
      
      return;
    }
    
    // حذف أي خطأ سابق
    setDocuments(docs => docs.map(d => 
      d.id === id ? { ...d, error: undefined } : d
    ));
    
    // بدء عملية الرفع
    simulateUpload(id, file);
  };

  const removeFile = (id: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, file: undefined, status: 'required' as const, error: undefined } : doc
    ));
    
    // إظهار رسالة
    toast({
      title: t('application.documents.removed'),
      description: t('application.documents.removedDescription'),
    });
    
    // حفظ التغييرات
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, file: undefined, status: 'required' as const, error: undefined } : doc
    );
    onSave(updatedDocs);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.documents.title')}</h3>
        <p className="text-unlimited-gray">{t('application.documents.description')}</p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-unlimited-blue/10 rounded-full">
            <FileCheck className="h-5 w-5 text-unlimited-blue" />
          </div>
          <div>
            <h4 className="font-medium">{t('application.documents.uploadRequirements')}</h4>
            <p className="text-sm text-unlimited-gray">{t('application.documents.uploadRequirementsDescription')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1">PDF</Badge>
            <span className="text-sm">{t('application.documents.acceptedFormat')} - PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1">JPG/PNG</Badge>
            <span className="text-sm">{t('application.documents.acceptedFormat')} - JPG, PNG</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1">5MB</Badge>
            <span className="text-sm">{t('application.documents.maxSize')}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h4 className="font-medium">{t('application.documents.uploadProgress')}</h4>
        <span className="text-sm font-medium">{uploadProgress}%</span>
      </div>
      <Progress value={uploadProgress} className="h-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card 
            key={doc.id} 
            className={`${doc.status === 'uploaded' ? 'border-green-200' : dragActive === doc.id ? 'border-unlimited-blue border-2' : 'border-gray-200'}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {doc.type === 'pdf' ? (
                    <FileText className="h-5 w-5 text-unlimited-gray" />
                  ) : (
                    <FilePlus className="h-5 w-5 text-unlimited-gray" />
                  )}
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-unlimited-gray">{doc.type === 'pdf' ? 'PDF' : t('application.documents.imageFormat')}</p>
                  </div>
                </div>
                <Badge variant={doc.status === 'required' ? 'destructive' : doc.status === 'approved' ? 'default' : 'outline'}>
                  {doc.status === 'required' 
                    ? t('application.documents.required')
                    : doc.status === 'approved'
                      ? t('application.documents.approved')
                      : t('application.documents.uploaded')
                  }
                </Badge>
              </div>
              
              {doc.status === 'required' ? (
                <div 
                  className={`mt-4 ${doc.error ? 'border-2 border-red-300' : 'border-2 border-dashed'} border-gray-200 rounded-md p-4 text-center hover:border-unlimited-blue transition-colors cursor-pointer`}
                  onDragEnter={(e) => handleDragEnter(e, doc.id)}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, doc.id)}
                >
                  {doc.error ? (
                    <div className="text-red-500">
                      <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">{doc.error}</p>
                      <p className="text-xs mt-1">{t('application.documents.tryAgain')}</p>
                    </div>
                  ) : (
                    <>
                      <DownloadCloud className="h-6 w-6 mx-auto mb-2 text-unlimited-gray" />
                      <span className="text-sm font-medium">{t('application.documents.dragDropFiles')}</span>
                      <p className="text-xs text-unlimited-gray mt-1">{t('application.documents.or')}</p>
                      <Label 
                        htmlFor={`file-${doc.id}`}
                        className="mt-2 inline-block bg-unlimited-blue text-white px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-unlimited-dark-blue transition-colors"
                      >
                        {t('application.documents.browseFiles')}
                      </Label>
                    </>
                  )}
                  <Input 
                    id={`file-${doc.id}`}
                    type="file" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(doc.id, file);
                    }}
                    accept={doc.type === 'pdf' ? '.pdf' : '.jpg,.jpeg,.png'}
                  />
                </div>
              ) : doc.progress !== undefined ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{t('application.documents.uploading')}</span>
                    <span>{doc.progress}%</span>
                  </div>
                  <Progress value={doc.progress} className="h-1" />
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-1 rounded-full">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm truncate max-w-[180px]">
                        {doc.file?.name || `${doc.name}.${doc.type}`}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeFile(doc.id)}
                    >
                      <X className="h-4 w-4 text-unlimited-gray" />
                    </Button>
                  </div>
                  
                  {/* معاينة للمستند المرفوع */}
                  {doc.file && doc.type !== 'pdf' && (
                    <div className="mt-3 border rounded-md p-1">
                      <img 
                        src={URL.createObjectURL(doc.file)} 
                        alt={doc.name}
                        className="h-20 object-cover mx-auto rounded"
                      />
                    </div>
                  )}
                  
                  {doc.file && doc.type === 'pdf' && (
                    <div className="mt-3 border rounded-md p-2 bg-gray-50 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-red-500" />
                      <span className="text-xs">{t('application.documents.pdfUploaded')}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsUploadForm;
