
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Download, Check, AlertCircle, File, X, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Document {
  id: string;
  name: string;
  nameAr: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  file?: File | null;
  uploadedAt?: Date | null;
  fileUrl?: string;
  comments?: string;
}

interface ApplicationDocumentsProps {
  programName: string;
  universityName: string;
  applicationId: number;
  readOnly?: boolean;
}

const ApplicationDocuments = ({ programName, universityName, applicationId, readOnly = false }: ApplicationDocumentsProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState<string>("required");
  const [viewDocument, setViewDocument] = useState<Document | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sample required documents
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Passport',
      nameAr: 'جواز السفر',
      required: true,
      status: 'pending'
    },
    {
      id: '2',
      name: 'Profile Picture',
      nameAr: 'الصورة الشخصية',
      required: true,
      status: 'uploaded',
      uploadedAt: new Date(),
      fileUrl: '/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png'
    },
    {
      id: '3',
      name: 'High School Transcript',
      nameAr: 'كشف درجات المدرسة الثانوية',
      required: true,
      status: 'approved',
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      fileUrl: '/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png'
    },
    {
      id: '4',
      name: 'English Proficiency',
      nameAr: 'شهادة إتقان اللغة الإنجليزية',
      required: true,
      status: 'rejected',
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      fileUrl: '/lovable-uploads/f8873ff7-8cb5-44bd-8671-099033106e13.png',
      comments: 'The certificate is expired. Please upload a valid certificate.'
    },
    {
      id: '5',
      name: 'Recommendation Letter',
      nameAr: 'خطاب توصية',
      required: false,
      status: 'pending'
    }
  ]);

  const requiredDocuments = documents.filter(doc => doc.required);
  const optionalDocuments = documents.filter(doc => !doc.required);
  const uploadedDocuments = documents.filter(doc => doc.status === 'uploaded' || doc.status === 'approved');
  
  const handleFileUpload = (documentId: string, file: File | null) => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Update document status
          setDocuments(prev => prev.map(doc => 
            doc.id === documentId 
              ? { ...doc, status: 'uploaded', file, uploadedAt: new Date(), fileUrl: URL.createObjectURL(file) } 
              : doc
          ));
          
          toast({
            title: "Document uploaded",
            description: "Your document has been uploaded successfully.",
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleDeleteDocument = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: 'pending', file: null, uploadedAt: null, fileUrl: undefined } 
        : doc
    ));
    
    toast({
      title: "Document deleted",
      description: "The document has been removed.",
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100">{t("application.documents.statusRequired")}</Badge>;
      case 'uploaded':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">{t("application.documents.statusUploaded")}</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">{t("application.documents.statusApproved")}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getDocumentName = (doc: Document) => {
    return isRtl ? doc.nameAr : doc.name;
  };
  
  const getCompletionPercentage = () => {
    const requiredCount = requiredDocuments.length;
    const uploadedRequiredCount = requiredDocuments.filter(doc => 
      doc.status === 'uploaded' || doc.status === 'approved'
    ).length;
    
    return requiredCount > 0 ? Math.round((uploadedRequiredCount / requiredCount) * 100) : 0;
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{t("application.documents.title")}</span>
            <Badge variant={getCompletionPercentage() === 100 ? "default" : "outline"} className={getCompletionPercentage() === 100 ? "bg-green-500" : ""}>
              {getCompletionPercentage()}% {t("application.status.completed")}
            </Badge>
          </CardTitle>
          <CardDescription>
            {t("application.documents.subtitle", { program: programName, university: universityName })}
          </CardDescription>
          
          <Progress 
            value={getCompletionPercentage()} 
            className="h-2 mt-2" 
          />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="required" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="required">{t("application.documents.statusRequired")} ({requiredDocuments.length})</TabsTrigger>
              <TabsTrigger value="uploaded">{t("application.documents.statusUploaded")} ({uploadedDocuments.length})</TabsTrigger>
              <TabsTrigger value="optional">Optional ({optionalDocuments.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="required">
              <div className="space-y-4">
                {requiredDocuments.length === 0 ? (
                  <div className="text-center py-8 text-unlimited-gray">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>{t("application.documents.noDocuments")}</p>
                  </div>
                ) : (
                  requiredDocuments.map(doc => (
                    <div key={doc.id} className="flex justify-between items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${doc.status === 'approved' ? 'bg-green-100' : 'bg-gray-100'} mr-3`}>
                          <FileText className={`h-5 w-5 ${doc.status === 'approved' ? 'text-green-600' : 'text-unlimited-gray'}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{getDocumentName(doc)}</h4>
                          <p className="text-sm text-unlimited-gray">
                            {doc.uploadedAt ? (
                              new Intl.DateTimeFormat(i18n.language, {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              }).format(doc.uploadedAt)
                            ) : 'Not uploaded'}
                          </p>
                          {doc.status === 'rejected' && doc.comments && (
                            <p className="text-sm text-red-600 mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {doc.comments}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {getStatusBadge(doc.status)}
                        
                        {!readOnly && (
                          doc.status === 'pending' || doc.status === 'rejected' ? (
                            <div className="relative">
                              <Button variant="outline" size="sm" className="flex gap-1 items-center">
                                <Upload className="h-4 w-4" />
                                {t("application.documents.upload")}
                              </Button>
                              <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                              />
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              {doc.fileUrl && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex gap-1 items-center" 
                                  onClick={() => setViewDocument(doc)}
                                >
                                  <FileText className="h-4 w-4" />
                                  View
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex gap-1 items-center text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        )}
                        
                        {readOnly && doc.fileUrl && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex gap-1 items-center"
                            onClick={() => window.open(doc.fileUrl, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                            {t("application.documents.download")}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {isUploading && (
                  <div className="mt-4">
                    <p className="text-sm text-unlimited-gray mb-1">Uploading document...</p>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="uploaded">
              <div className="space-y-4">
                {uploadedDocuments.length === 0 ? (
                  <div className="text-center py-8 text-unlimited-gray">
                    <Upload className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No documents uploaded yet.</p>
                  </div>
                ) : (
                  uploadedDocuments.map(doc => (
                    <div key={doc.id} className="flex justify-between items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${doc.status === 'approved' ? 'bg-green-100' : 'bg-blue-100'} mr-3`}>
                          <FileText className={`h-5 w-5 ${doc.status === 'approved' ? 'text-green-600' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{getDocumentName(doc)}</h4>
                          <p className="text-sm text-unlimited-gray">
                            {doc.uploadedAt ? (
                              new Intl.DateTimeFormat(i18n.language, {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              }).format(doc.uploadedAt)
                            ) : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {getStatusBadge(doc.status)}
                        
                        {doc.fileUrl && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex gap-1 items-center" 
                              onClick={() => setViewDocument(doc)}
                            >
                              <FileText className="h-4 w-4" />
                              View
                            </Button>
                            
                            {!readOnly && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex gap-1 items-center text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {readOnly && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex gap-1 items-center"
                                onClick={() => window.open(doc.fileUrl, '_blank')}
                              >
                                <Download className="h-4 w-4" />
                                {t("application.documents.download")}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="optional">
              <div className="space-y-4">
                {optionalDocuments.length === 0 ? (
                  <div className="text-center py-8 text-unlimited-gray">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No optional documents required.</p>
                  </div>
                ) : (
                  optionalDocuments.map(doc => (
                    <div key={doc.id} className="flex justify-between items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-gray-100 mr-3">
                          <FileText className="h-5 w-5 text-unlimited-gray" />
                        </div>
                        <div>
                          <h4 className="font-medium">{getDocumentName(doc)}</h4>
                          <p className="text-sm text-unlimited-gray">
                            Optional document
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {doc.status !== 'pending' ? (
                          <>
                            {getStatusBadge(doc.status)}
                            
                            {doc.fileUrl && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex gap-1 items-center" 
                                  onClick={() => setViewDocument(doc)}
                                >
                                  <FileText className="h-4 w-4" />
                                  View
                                </Button>
                                
                                {!readOnly && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex gap-1 items-center text-red-500 hover:text-red-600"
                                    onClick={() => handleDeleteDocument(doc.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          !readOnly && (
                            <div className="relative">
                              <Button variant="outline" size="sm" className="flex gap-1 items-center">
                                <Upload className="h-4 w-4" />
                                Upload
                              </Button>
                              <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Document Viewer Dialog */}
      <Dialog open={!!viewDocument} onOpenChange={(open) => !open && setViewDocument(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{viewDocument?.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setViewDocument(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Uploaded on {viewDocument?.uploadedAt ? new Intl.DateTimeFormat(i18n.language, {
                dateStyle: 'long',
                timeStyle: 'short'
              }).format(viewDocument.uploadedAt) : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden max-h-[70vh]">
            {viewDocument?.fileUrl && (
              viewDocument.fileUrl.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={viewDocument.fileUrl}
                  className="w-full h-[70vh]"
                  title={viewDocument.name}
                />
              ) : (
                <img
                  src={viewDocument.fileUrl}
                  alt={viewDocument.name}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )
            )}
          </div>
          
          <div className="mt-4 flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => window.open(viewDocument?.fileUrl, '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            
            {!readOnly && (
              <Button 
                variant="destructive" 
                onClick={() => {
                  handleDeleteDocument(viewDocument?.id || '');
                  setViewDocument(null);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Document
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationDocuments;
