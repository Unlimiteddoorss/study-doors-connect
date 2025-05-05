import { useState, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Upload, Check, X, File, FilePlus, FileText, FileCheck, AlertCircle, 
  DownloadCloud, Plus, Trash2
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'required' | 'uploaded' | 'approved' | 'rejected';
  file?: File;
  progress?: number;
  error?: string;
  uploadDate?: string;
  isCustom?: boolean;
  applicationId?: string;
  filePath?: string;
}

interface DocumentsUploadFormProps {
  initialDocuments?: Document[];
  onSave: (documents: Document[]) => void;
  applicationId?: string;
}

const DEFAULT_DOCUMENTS = [
  { id: '1', name: 'passport', type: 'pdf', status: 'required' as const },
  { id: '2', name: 'diploma', type: 'pdf', status: 'required' as const },
  { id: '3', name: 'photo', type: 'image', status: 'required' as const },
  { id: '4', name: 'transcript', type: 'pdf', status: 'required' as const },
  { id: '5', name: 'motivation', type: 'pdf', status: 'required' as const },
];

const ADDITIONAL_DOCUMENT_TYPES = [
  { id: 'recommendation', label: 'Recommendation Letter', type: 'pdf' },
  { id: 'cv', label: 'CV/Resume', type: 'pdf' },
  { id: 'englishTest', label: 'English Test Results', type: 'pdf' },
  { id: 'idCard', label: 'ID Card', type: 'image' },
  { id: 'birthCertificate', label: 'Birth Certificate', type: 'pdf' },
  { id: 'medicalReport', label: 'Medical Report', type: 'pdf' },
  { id: 'financialStatement', label: 'Financial Statement', type: 'pdf' },
  { id: 'custom', label: 'Other Document', type: 'any' },
];

const DocumentsUploadForm = ({ initialDocuments, onSave, applicationId }: DocumentsUploadFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [dragActive, setDragActive] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>(
    initialDocuments || 
    DEFAULT_DOCUMENTS.map(doc => ({ 
      ...doc, 
      name: t(`documents.${doc.name}`),
    }))
  );
  const [showAddDocumentDialog, setShowAddDocumentDialog] = useState(false);
  const [newDocumentType, setNewDocumentType] = useState("");
  const [customDocumentName, setCustomDocumentName] = useState("");
  const [newDocumentFileType, setNewDocumentFileType] = useState("pdf");

  const uploadProgress = useMemo(() => {
    const total = documents.length;
    const uploaded = documents.filter(doc => doc.status === 'uploaded' || doc.status === 'approved').length;
    return total > 0 ? Math.round((uploaded / total) * 100) : 0;
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

  const uploadFileToSupabase = async (id: string, file: File) => {
    if (!applicationId) {
      simulateUpload(id, file);
      return;
    }
    
    // Upload to Supabase storage
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `applications/${applicationId}/${id}.${fileExt}`;
      
      setDocuments(docs => docs.map(doc => 
        doc.id === id ? { ...doc, file, progress: 0, status: 'required' } : doc
      ));
      
      // Create a progress tracker
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          setDocuments(docs => docs.map(doc => 
            doc.id === id ? { ...doc, progress } : doc
          ));
        }
      }, 200);
      
      const { error: uploadError, data } = await supabase
        .storage
        .from('application_documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      clearInterval(interval);
      
      if (uploadError) {
        setDocuments(docs => docs.map(doc => 
          doc.id === id ? { ...doc, error: uploadError.message, progress: undefined } : doc
        ));
        
        toast({
          title: t('application.documents.error'),
          description: uploadError.message,
          variant: 'destructive',
        });
        return;
      }
      
      // Update document record in database
      const { error: dbError } = await supabase
        .from('documents')
        .upsert({
          application_id: applicationId,
          name: documents.find(d => d.id === id)?.name || '',
          file_type: file.type,
          file_path: filePath,
          status: 'uploaded',
          uploaded_at: new Date().toISOString()
        });
      
      if (dbError) {
        toast({
          title: t('application.documents.error'),
          description: dbError.message,
          variant: 'destructive',
        });
        return;
      }
      
      setDocuments(docs => docs.map(doc => 
        doc.id === id ? { 
          ...doc, 
          file, 
          status: 'uploaded', 
          progress: 100,
          uploadDate: new Date().toISOString(),
          filePath
        } : doc
      ));
      
      setTimeout(() => {
        setDocuments(docs => docs.map(doc => 
          doc.id === id ? { ...doc, progress: undefined } : doc
        ));
        
        // Save data after upload
        const updatedDocs = documents.map(doc => 
          doc.id === id ? { 
            ...doc, 
            file, 
            status: 'uploaded' as const,
            progress: undefined,
            uploadDate: new Date().toISOString(),
            filePath
          } : doc
        );
        onSave(updatedDocs);
        
        // Show success message
        toast({
          title: t('application.documents.uploaded'),
          description: t('application.documents.uploadedDescription'),
        });
      }, 500);
      
    } catch (err: any) {
      toast({
        title: t('application.documents.error'),
        description: err.message || 'Error uploading file',
        variant: 'destructive',
      });
    }
  };

  const simulateUpload = (id: string, file: File) => {
    // Simulate upload progress from 0 to 100%
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
            doc.id === id ? { 
              ...doc, 
              file, 
              status: 'uploaded', 
              progress: undefined,
              uploadDate: new Date().toISOString() 
            } : doc
          ));
          
          // Save data after upload
          const updatedDocs = documents.map(doc => 
            doc.id === id ? { 
              ...doc, 
              file, 
              status: 'uploaded' as const, 
              progress: undefined,
              uploadDate: new Date().toISOString()
            } : doc
          );
          onSave(updatedDocs);
          
          // Show success message
          toast({
            title: t('application.documents.uploaded'),
            description: t('application.documents.uploadedDescription'),
          });
        }, 500);
      }
    }, 200);
  };

  const handleFile = (id: string, file: File) => {
    // Validate file type
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    
    const isValidType = doc.type === 'pdf' 
      ? file.type === 'application/pdf'
      : doc.type === 'image'
      ? file.type.startsWith('image/')
      : true; // Any type is allowed for custom documents
    
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
    
    // Check file size (max 5MB)
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
    
    // Clear any previous errors
    setDocuments(docs => docs.map(d => 
      d.id === id ? { ...d, error: undefined } : d
    ));
    
    // Start upload process
    uploadFileToSupabase(id, file);
  };

  const removeFile = async (id: string) => {
    const doc = documents.find(d => d.id === id);
    
    // If connected to Supabase and we have a file path, delete from storage
    if (applicationId && doc?.filePath) {
      try {
        const { error } = await supabase
          .storage
          .from('application_documents')
          .remove([doc.filePath]);
        
        if (error) {
          toast({
            title: t('application.documents.error'),
            description: error.message,
            variant: 'destructive',
          });
          return;
        }
        
        // Update document status in database
        await supabase
          .from('documents')
          .update({
            status: 'pending',
            updated_at: new Date().toISOString()
          })
          .match({ 
            application_id: applicationId,
            name: doc.name 
          });
      } catch (err: any) {
        toast({
          title: t('application.documents.error'),
          description: err.message || 'Error removing file',
          variant: 'destructive',
        });
        return;
      }
    }
    
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, file: undefined, status: 'required' as const, error: undefined, filePath: undefined } : doc
    ));
    
    // Show message
    toast({
      title: t('application.documents.removed'),
      description: t('application.documents.removedDescription'),
    });
    
    // Save changes
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, file: undefined, status: 'required' as const, error: undefined, filePath: undefined } : doc
    );
    onSave(updatedDocs);
  };

  const removeDocument = async (id: string) => {
    const doc = documents.find(d => d.id === id);
    
    // If connected to Supabase and we have a file path, delete from storage
    if (applicationId && doc?.filePath) {
      try {
        const { error } = await supabase
          .storage
          .from('application_documents')
          .remove([doc.filePath]);
        
        if (error) {
          toast({
            title: t('application.documents.error'),
            description: error.message,
            variant: 'destructive',
          });
          return;
        }
        
        // Delete document record from database
        await supabase
          .from('documents')
          .delete()
          .match({ 
            application_id: applicationId,
            name: doc.name 
          });
      } catch (err: any) {
        toast({
          title: t('application.documents.error'),
          description: err.message || 'Error removing document',
          variant: 'destructive',
        });
        return;
      }
    }
    
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    onSave(updatedDocuments);
    
    toast({
      title: t('application.documents.documentRemoved'),
      description: t('application.documents.documentRemovedDescription'),
    });
  };

  const handleAddDocument = async () => {
    if (newDocumentType === "") {
      toast({
        title: t('application.documents.error'),
        description: t('application.documents.selectDocumentType'),
        variant: 'destructive',
      });
      return;
    }

    if (newDocumentType === 'custom' && !customDocumentName) {
      toast({
        title: t('application.documents.error'),
        description: t('application.documents.enterDocumentName'),
        variant: 'destructive',
      });
      return;
    }

    const selectedType = ADDITIONAL_DOCUMENT_TYPES.find(type => type.id === newDocumentType);
    if (!selectedType) return;

    const documentName = newDocumentType === 'custom' 
      ? customDocumentName 
      : t(`documents.additional.${newDocumentType}`, selectedType.label);

    const newDocument: Document = {
      id: `custom-${Date.now()}`,
      name: documentName,
      type: newDocumentFileType,
      status: 'required',
      isCustom: true
    };

    // If connected to Supabase, add document to the database
    if (applicationId) {
      try {
        // Create a temporary file path for the pending document
        const tempFilePath = `applications/${applicationId}/pending-${Date.now()}`;
        
        const { error } = await supabase
          .from('documents')
          .insert({
            application_id: applicationId,
            name: documentName,
            file_type: newDocumentFileType === 'pdf' ? 'application/pdf' : 
                      newDocumentFileType === 'image' ? 'image/*' : 'application/octet-stream',
            status: 'pending',
            file_path: tempFilePath
          });
        
        if (error) {
          toast({
            title: t('application.documents.error'),
            description: error.message,
            variant: 'destructive',
          });
          return;
        }
      } catch (err: any) {
        toast({
          title: t('application.documents.error'),
          description: err.message || 'Error adding document',
          variant: 'destructive',
        });
        return;
      }
    }

    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    onSave(updatedDocuments);
    
    // Reset form and close dialog
    setNewDocumentType("");
    setCustomDocumentName("");
    setNewDocumentFileType("pdf");
    setShowAddDocumentDialog(false);

    toast({
      title: t('application.documents.documentAdded'),
      description: t('application.documents.documentAddedDescription'),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.documents.title')}</h3>
        <p className="text-unlimited-gray">{t('application.documents.description')}</p>
      </div>
      
      {/* Upload requirements */}
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

      {/* Upload progress */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{t('application.documents.uploadProgress')}</h4>
        <span className="text-sm font-medium">{uploadProgress}%</span>
      </div>
      <Progress 
        value={uploadProgress} 
        className="h-2" 
        color={
          uploadProgress >= 75 ? "bg-green-500" : 
          uploadProgress >= 50 ? "bg-unlimited-blue" : 
          uploadProgress >= 25 ? "bg-yellow-500" : "bg-red-400"
        }
      />
      
      {/* Add document button */}
      <div className="flex justify-end">
        <Dialog open={showAddDocumentDialog} onOpenChange={setShowAddDocumentDialog}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-unlimited-blue hover:text-white"
            >
              <Plus size={16} />
              {t('application.documents.addDocument')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('application.documents.addDocumentTitle')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="documentType">{t('application.documents.selectType')}</Label>
                <Select value={newDocumentType} onValueChange={setNewDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('application.documents.selectDocumentType')} />
                  </SelectTrigger>
                  <SelectContent>
                    {ADDITIONAL_DOCUMENT_TYPES.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {t(`documents.additional.${type.id}`, type.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {newDocumentType === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customName">{t('application.documents.customName')}</Label>
                  <Input 
                    id="customName"
                    value={customDocumentName}
                    onChange={(e) => setCustomDocumentName(e.target.value)}
                    placeholder={t('application.documents.enterCustomName')}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="fileType">{t('application.documents.fileType')}</Label>
                <Select value={newDocumentFileType} onValueChange={setNewDocumentFileType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">{t('application.documents.image')}</SelectItem>
                    <SelectItem value="any">{t('application.documents.anyFile')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t('common.cancel')}</Button>
              </DialogClose>
              <Button onClick={handleAddDocument}>{t('common.add')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Document cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card 
            key={doc.id} 
            className={`${
              doc.status === 'approved' ? 'border-green-300 bg-green-50' : 
              doc.status === 'rejected' ? 'border-red-300 bg-red-50' :
              doc.status === 'uploaded' ? 'border-green-200' : 
              dragActive === doc.id ? 'border-unlimited-blue border-2' : 
              'border-gray-200'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {doc.type === 'pdf' ? (
                    <FileText className="h-5 w-5 text-unlimited-gray" />
                  ) : doc.type === 'image' ? (
                    <FilePlus className="h-5 w-5 text-unlimited-gray" />
                  ) : (
                    <File className="h-5 w-5 text-unlimited-gray" />
                  )}
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-unlimited-gray">
                      {doc.type === 'pdf' ? 'PDF' : 
                       doc.type === 'image' ? t('application.documents.imageFormat') :
                       t('application.documents.anyFormat')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.isCustom && (
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => removeDocument(doc.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                  <Badge variant={
                    doc.status === 'required' ? 'destructive' : 
                    doc.status === 'approved' ? 'default' : 
                    doc.status === 'rejected' ? 'destructive' :
                    'outline'
                  }>
                    {doc.status === 'required' 
                      ? t('application.documents.required')
                      : doc.status === 'approved'
                      ? t('application.documents.approved')
                      : doc.status === 'rejected'
                      ? t('application.documents.rejected')
                      : t('application.documents.uploaded')
                    }
                  </Badge>
                </div>
              </div>
              
              {doc.status === 'required' ? (
                <div 
                  className={`mt-4 ${
                    doc.error ? 'border-2 border-red-300' : 'border-2 border-dashed'
                  } border-gray-200 rounded-md p-4 text-center hover:border-unlimited-blue transition-colors cursor-pointer`}
                  onDragEnter={(e) => handleDragEnter(e, doc.id)}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, doc.id)}
                  onClick={() => fileInputRef.current?.click()}
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
                    ref={doc.id === documents[0].id ? fileInputRef : undefined}
                    type="file" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(doc.id, file);
                    }}
                    accept={
                      doc.type === 'pdf' ? '.pdf' : 
                      doc.type === 'image' ? '.jpg,.jpeg,.png' : 
                      '*'
                    }
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
                      <div className={`p-1 rounded-full ${
                        doc.status === 'approved' ? 'bg-green-100' :
                        doc.status === 'rejected' ? 'bg-red-100' :
                        'bg-green-100'
                      }`}>
                        {doc.status === 'rejected' ? (
                          <X className="h-4 w-4 text-red-600" />
                        ) : (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <span className="text-sm truncate max-w-[180px]">
                        {doc.file?.name || `${doc.name}.${doc.type === 'pdf' ? 'pdf' : 'jpg'}`}
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
                  
                  {/* Display upload date */}
                  {doc.uploadDate && (
                    <p className="text-xs text-unlimited-gray mt-1 ml-7">
                      {t('application.documents.uploadedOn')}: {new Date(doc.uploadDate).toLocaleString()}
                    </p>
                  )}
                  
                  {/* File preview */}
                  {doc.file && doc.type === 'image' && (
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
                  
                  {/* Status messages for approved/rejected docs */}
                  {doc.status === 'rejected' && (
                    <div className="mt-2 bg-red-50 border border-red-200 rounded p-2">
                      <p className="text-xs text-red-800">
                        {t('application.documents.rejectedMessage')}
                      </p>
                    </div>
                  )}
                  
                  {doc.status === 'approved' && (
                    <div className="mt-2 bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-xs text-green-800">
                        {t('application.documents.approvedMessage')}
                      </p>
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
