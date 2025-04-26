
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check, X, File, FilePlus, FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'required' | 'uploaded' | 'approved';
  file?: File;
}

interface DocumentsUploadFormProps {
  initialDocuments?: Document[];
  onSave: (documents: Document[]) => void;
}

const DocumentsUploadForm = ({ initialDocuments, onSave }: DocumentsUploadFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  const [documents, setDocuments] = useState<Document[]>(initialDocuments || [
    { id: '1', name: t('documents.passport'), type: 'pdf', status: 'required' },
    { id: '2', name: t('documents.diploma'), type: 'pdf', status: 'required' },
    { id: '3', name: t('documents.photo'), type: 'image', status: 'required' },
    { id: '4', name: t('documents.transcript'), type: 'pdf', status: 'required' },
    { id: '5', name: t('documents.motivation'), type: 'pdf', status: 'required' },
  ]);

  const handleFileChange = (id: string, file: File) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, file, status: 'uploaded' as const } : doc
    ));
    
    // إظهار رسالة نجاح
    toast({
      title: t('application.documents.uploaded'),
      description: t('application.documents.uploadedDescription'),
    });
    
    // حفظ التغييرات
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, file, status: 'uploaded' as const } : doc
    );
    onSave(updatedDocs);
  };

  const removeFile = (id: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, file: undefined, status: 'required' as const } : doc
    ));
    
    // إظهار رسالة
    toast({
      title: t('application.documents.removed'),
      description: t('application.documents.removedDescription'),
    });
    
    // حفظ التغييرات
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, file: undefined, status: 'required' as const } : doc
    );
    onSave(updatedDocs);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.documents.title')}</h3>
        <p className="text-unlimited-gray">{t('application.documents.description')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className={`${doc.status === 'uploaded' ? 'border-green-200' : 'border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-unlimited-gray" />
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
                <div className="mt-4">
                  <Label htmlFor={`file-${doc.id}`} className="block w-full">
                    <div className="border-2 border-dashed border-gray-200 rounded-md p-4 text-center hover:border-unlimited-blue transition-colors cursor-pointer">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-unlimited-gray" />
                      <span className="text-sm font-medium">{t('application.documents.uploadFile')}</span>
                      <p className="text-xs text-unlimited-gray mt-1">{t('application.documents.dragDrop')}</p>
                    </div>
                  </Label>
                  <Input 
                    id={`file-${doc.id}`}
                    type="file" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange(doc.id, file);
                    }}
                    accept={doc.type === 'pdf' ? '.pdf' : '.jpg,.jpeg,.png'}
                  />
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-1 rounded-full">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm">
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
