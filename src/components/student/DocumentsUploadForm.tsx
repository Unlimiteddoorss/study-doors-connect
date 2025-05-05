
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatBytes } from '@/utils/formatUtils';
import { 
  Upload, File, FileText, Image, RefreshCcw, 
  AlertCircle, X, Check, Trash, FileCheck, Eye 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

// Define accepted file types
const ACCEPTED_FILE_TYPES = {
  'application/pdf': 'PDF',
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface Document {
  id: string;
  name: string;
  description?: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'rejected';
  file?: File;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  comment?: string;
}

interface DocumentsUploadFormProps {
  initialDocuments?: Document[];
  onSave: (documents: Document[]) => void;
}

const DocumentsUploadForm = ({ initialDocuments = [], onSave }: DocumentsUploadFormProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { toast } = useToast();
  
  const [documents, setDocuments] = useState<Document[]>(initialDocuments.length > 0 ? initialDocuments : [
    { 
      id: 'passport', 
      name: t('documents.passport', 'جواز السفر'), 
      description: t('documents.passportDescription', 'نسخة من جواز السفر ساري المفعول'),
      required: true, 
      status: 'pending' 
    },
    { 
      id: 'transcript', 
      name: t('documents.transcript', 'كشف الدرجات'), 
      description: t('documents.transcriptDescription', 'نسخة من شهادة الثانوية العامة وكشف الدرجات'),
      required: true, 
      status: 'pending' 
    },
    { 
      id: 'cv', 
      name: t('documents.cv', 'السيرة الذاتية'), 
      description: t('documents.cvDescription', 'السيرة الذاتية محدثة باللغة الإنجليزية'),
      required: true, 
      status: 'pending' 
    },
    { 
      id: 'englishProficiency', 
      name: t('documents.englishProficiency', 'شهادة إجادة اللغة الإنجليزية'), 
      description: t('documents.englishProficiencyDescription', 'شهادة TOEFL أو IELTS أو ما يعادلها'),
      required: false, 
      status: 'pending' 
    },
    { 
      id: 'photo', 
      name: t('documents.photo', 'صورة شخصية'), 
      description: t('documents.photoDescription', 'صورة شخصية بخلفية بيضاء (بحجم صورة جواز السفر)'),
      required: false, 
      status: 'pending' 
    }
  ]);
  
  const [newDocumentName, setNewDocumentName] = useState('');
  const [newDocumentRequired, setNewDocumentRequired] = useState(false);
  const [newDocumentDescription, setNewDocumentDescription] = useState('');
  const [uploadingDocumentId, setUploadingDocumentId] = useState<string | null>(null);
  const [viewDocumentId, setViewDocumentId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // If initialDocuments change (e.g. from parent component)
  useEffect(() => {
    if (initialDocuments.length > 0) {
      setDocuments(initialDocuments);
    }
  }, [initialDocuments]);
  
  // Save documents whenever they change
  useEffect(() => {
    onSave(documents);
  }, [documents]);
  
  const handleAddDocument = () => {
    if (!newDocumentName.trim()) {
      toast({
        title: t('documents.error.nameRequired', 'اسم المستند مطلوب'),
        variant: 'destructive'
      });
      return;
    }
    
    const id = `custom-${Date.now()}`;
    
    setDocuments([...documents, {
      id,
      name: newDocumentName.trim(),
      description: newDocumentDescription.trim() || undefined,
      required: newDocumentRequired,
      status: 'pending'
    }]);
    
    setNewDocumentName('');
    setNewDocumentRequired(false);
    setNewDocumentDescription('');
    
    toast({
      title: t('documents.added', 'تمت إضافة المستند'),
      description: newDocumentName
    });
  };
  
  const handleRemoveDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    
    toast({
      title: t('documents.removed', 'تمت إزالة المستند')
    });
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: t('documents.error.fileTooLarge', 'الملف كبير جدًا'),
        description: t('documents.error.maxSize', 'الحد الأقصى لحجم الملف هو 5 ميجابايت'),
        variant: 'destructive'
      });
      return;
    }
    
    // Check file type
    if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
      toast({
        title: t('documents.error.invalidFileType', 'نوع ملف غير صالح'),
        description: t('documents.error.acceptedTypes', 'أنواع الملفات المقبولة: PDF، JPEG، PNG، DOC، DOCX'),
        variant: 'destructive'
      });
      return;
    }
    
    setUploadingDocumentId(documentId);
    setIsUploading(true);
    
    try {
      // Mock successful upload for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Try to upload to Supabase if connected
      let fileUrl;
      try {
        // Create a unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${documentId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `documents/${fileName}`;
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('applications')
          .upload(filePath, file);
        
        if (error) {
          throw error;
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('applications')
          .getPublicUrl(filePath);
        
        fileUrl = urlData.publicUrl;
      } catch (err) {
        console.log('Using mock file URL (Supabase not connected)');
        // Use mock URL for demo
        fileUrl = URL.createObjectURL(file);
      }
      
      // Update document in state
      setDocuments(prevDocs => prevDocs.map(doc => 
        doc.id === documentId 
          ? { 
              ...doc, 
              status: 'uploaded', 
              file, 
              fileUrl,
              fileType: file.type,
              fileSize: file.size
            } 
          : doc
      ));
      
      toast({
        title: t('documents.uploaded', 'تم رفع المستند بنجاح'),
        description: file.name
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: t('documents.error.uploadFailed', 'فشل في رفع الملف'),
        description: error instanceof Error ? error.message : t('documents.error.tryAgain', 'الرجاء المحاولة مرة أخرى'),
        variant: 'destructive'
      });
    } finally {
      setUploadingDocumentId(null);
      setIsUploading(false);
    }
  };
  
  const handleViewDocument = (documentId: string) => {
    setViewDocumentId(documentId);
  };
  
  const getDocumentTypeIcon = (fileType?: string) => {
    if (!fileType) return <File className="h-5 w-5" />;
    
    if (fileType.includes('pdf')) return <FileText className="h-5 w-5" />;
    if (fileType.includes('image')) return <Image className="h-5 w-5" />;
    
    return <File className="h-5 w-5" />;
  };
  
  const getDocumentStatus = (document: Document) => {
    if (document.status === 'uploaded') {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <Check className="h-4 w-4" />
          <span>{t('documents.uploaded', 'تم الرفع')}</span>
        </div>
      );
    } else if (document.required) {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{t('documents.required', 'مطلوب')}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-yellow-600">
          <AlertCircle className="h-4 w-4" />
          <span>{t('documents.optional', 'اختياري')}</span>
        </div>
      );
    }
  };
  
  return (
    <div>
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-medium">{t('documents.title', 'المستندات المطلوبة')}</h3>
        <p className="text-unlimited-gray">{t('documents.description', 'قم بتحميل المستندات المطلوبة للتقديم')}</p>
      </div>
      
      <div className="space-y-4 mb-8">
        {documents.map(document => (
          <Card key={document.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`grid grid-cols-1 md:grid-cols-3 ${document.status === 'uploaded' ? 'bg-green-50' : ''}`}>
                {/* Document info */}
                <div className="p-4 md:col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    {document.status === 'uploaded' ? getDocumentTypeIcon(document.fileType) : <File className="h-5 w-5" />}
                    <h4 className="font-medium">{document.name}</h4>
                    {document.required && <span className="text-xs text-red-600 bg-red-50 rounded-full px-2 py-0.5">{t('documents.required', 'مطلوب')}</span>}
                  </div>
                  
                  {document.description && (
                    <p className="text-sm text-unlimited-gray mb-2">{document.description}</p>
                  )}
                  
                  {document.status === 'uploaded' && (
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border">
                        <span className="text-unlimited-gray">{t('documents.fileName', 'اسم الملف')}:</span>
                        <span className="font-medium truncate max-w-[200px]">{document.file?.name}</span>
                      </div>
                      
                      {document.fileSize && (
                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border">
                          <span className="text-unlimited-gray">{t('documents.fileSize', 'حجم الملف')}:</span>
                          <span className="font-medium">{formatBytes(document.fileSize)}</span>
                        </div>
                      )}
                      
                      {document.fileType && (
                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border">
                          <span className="text-unlimited-gray">{t('documents.fileType', 'نوع الملف')}:</span>
                          <span className="font-medium">{ACCEPTED_FILE_TYPES[document.fileType as keyof typeof ACCEPTED_FILE_TYPES] || document.fileType}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Upload controls */}
                <div className="bg-gray-50 p-4 flex flex-col justify-center items-center gap-2 border-t md:border-t-0 md:border-l">
                  {document.status === 'uploaded' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewDocument(document.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {t('documents.view', 'عرض')}
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => setDocuments(prevDocs => prevDocs.map(doc => 
                            doc.id === document.id 
                              ? { ...doc, status: 'pending', file: undefined, fileUrl: undefined, fileType: undefined, fileSize: undefined } 
                              : doc
                          ))}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          {t('documents.remove', 'إزالة')}
                        </Button>
                      </div>
                      <p className="text-xs text-green-600">
                        <FileCheck className="h-3 w-3 inline-block mr-1" />
                        {t('documents.uploadedSuccessfully', 'تم الرفع بنجاح')}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mb-2">{getDocumentStatus(document)}</div>
                      <input
                        type="file"
                        id={`file-${document.id}`}
                        className="hidden"
                        accept="image/png, image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => handleFileChange(e, document.id)}
                        disabled={isUploading}
                      />
                      <label
                        htmlFor={`file-${document.id}`}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        ${document.required ? 'bg-unlimited-blue text-primary-foreground hover:bg-unlimited-blue/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'} 
                        h-9 px-4 py-2 cursor-pointer`}
                      >
                        {uploadingDocumentId === document.id ? (
                          <>
                            <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                            {t('documents.uploading', 'جاري الرفع...')}
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            {t('documents.upload', 'رفع')}
                          </>
                        )}
                      </label>
                      {!document.required && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-2 h-7 text-xs"
                          onClick={() => handleRemoveDocument(document.id)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          {t('documents.removeDocument', 'إزالة المستند')}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add custom document section */}
      <Separator className="my-6" />
      
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-medium">{t('documents.addCustomDocument', 'إضافة مستند جديد')}</h3>
        <p className="text-unlimited-gray">{t('documents.addCustomDocumentDescription', 'إذا كان لديك مستند إضافي ترغب في تقديمه، يمكنك إضافته هنا')}</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="documentName" className="mb-1 block">
              {t('documents.documentName', 'اسم المستند')}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="documentName"
              value={newDocumentName}
              onChange={(e) => setNewDocumentName(e.target.value)}
              placeholder={t('documents.documentNamePlaceholder', 'مثال: توصية، شهادة إضافية')}
              className={isRtl ? 'text-right' : 'text-left'}
            />
          </div>
          
          <div>
            <Label htmlFor="documentDescription" className="mb-1 block">
              {t('documents.documentDescription', 'وصف المستند')}
            </Label>
            <Textarea
              id="documentDescription"
              value={newDocumentDescription}
              onChange={(e) => setNewDocumentDescription(e.target.value)}
              placeholder={t('documents.documentDescriptionPlaceholder', 'وصف اختياري للمستند')}
              className={isRtl ? 'text-right' : 'text-left'}
            />
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              id="documentRequired"
              checked={newDocumentRequired}
              onChange={(e) => setNewDocumentRequired(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-unlimited-blue focus:ring-unlimited-blue"
            />
            <Label htmlFor="documentRequired">
              {t('documents.markAsRequired', 'وضع علامة كمستند مطلوب')}
            </Label>
          </div>
          
          <Button onClick={handleAddDocument}>
            {t('documents.addDocument', 'إضافة المستند')}
          </Button>
        </div>
      </div>
      
      {/* Document viewer dialog */}
      <Dialog open={viewDocumentId !== null} onOpenChange={() => setViewDocumentId(null)}>
        <DialogContent className="max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>
              {viewDocumentId && documents.find(d => d.id === viewDocumentId)?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-auto mt-4">
            {viewDocumentId && (() => {
              const doc = documents.find(d => d.id === viewDocumentId);
              
              if (!doc?.fileUrl) return (
                <div className="text-center text-unlimited-gray py-8">
                  {t('documents.noFileToPreview', 'لا يوجد ملف للعرض')}
                </div>
              );
              
              // Handle different file types
              if (doc.fileType?.includes('image')) {
                return <img src={doc.fileUrl} alt={doc.name} className="max-w-full h-auto" />;
              } else if (doc.fileType?.includes('pdf')) {
                return (
                  <iframe 
                    src={doc.fileUrl} 
                    width="100%" 
                    height="500px" 
                    title={doc.name}
                    className="border rounded"
                  />
                );
              } else {
                return (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-unlimited-gray" />
                    <p className="mb-4">{t('documents.filePreviewNotAvailable', 'معاينة الملف غير متاحة')}</p>
                    <Button asChild>
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" download>
                        {t('documents.downloadFile', 'تحميل الملف')}
                      </a>
                    </Button>
                  </div>
                );
              }
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsUploadForm;
