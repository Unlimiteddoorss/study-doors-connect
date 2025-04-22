
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  MessageSquare, 
  Check, 
  Clock, 
  AlertCircle,
  PlusCircle,
  Upload
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ApplicationStatus = 'pending' | 'review' | 'approved' | 'rejected' | 'documents';

interface Application {
  id: number | string;
  program: string;
  university: string;
  status: ApplicationStatus;
  date: string;
  statusColor: string;
  messages: number;
  documents: {
    name: string;
    status: 'uploaded' | 'required' | 'approved';
  }[];
}

const StudentApplications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<{applicationId: string | number, docName: string} | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  // Load applications from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedApps = localStorage.getItem('studentApplications');
      if (storedApps) {
        const parsedApps = JSON.parse(storedApps);
        setApplications(parsedApps);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء محاولة تحميل طلباتك",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const getFilteredApplications = () => {
    if (activeTab === 'all') return applications;
    return applications.filter(app => app.status === activeTab);
  };

  const getStatusLabel = (status: ApplicationStatus): string => {
    const statusMap: Record<ApplicationStatus, string> = {
      pending: 'قيد الانتظار',
      review: 'قيد المراجعة',
      approved: 'مقبول',
      rejected: 'مرفوض',
      documents: 'بانتظار المستندات'
    };
    return statusMap[status];
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved': return <Check className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      case 'review': return <Clock className="h-4 w-4" />;
      case 'documents': return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleMessageClick = (applicationId: number | string) => {
    toast({
      title: "فتح المحادثة",
      description: `تم فتح المحادثة للطلب رقم ${applicationId}`,
    });
    // Navigate to messages with application context
    navigate(`/messages?applicationId=${applicationId}`);
  };

  const handleDownloadDocument = (applicationId: number | string, document: string) => {
    toast({
      title: "تنزيل المستند",
      description: `جاري تنزيل ${document} للطلب رقم ${applicationId}`,
    });
  };

  const handleUploadDocument = (applicationId: number | string, docName: string) => {
    setSelectedDocument({ applicationId, docName });
    setIsUploadDialogOpen(true);
  };
  
  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files.length || !selectedDocument) return;
    
    const file = files[0];
    // In a real app, you would upload this to a server
    console.log(`Uploading ${file.name} for application ${selectedDocument.applicationId}`);
    
    // Update the application's document status
    const updatedApplications = applications.map(app => {
      if (app.id === selectedDocument.applicationId) {
        const updatedDocuments = app.documents.map(doc => {
          if (doc.name === selectedDocument.docName) {
            return { ...doc, status: 'uploaded' as const };
          }
          return doc;
        });
        return { ...app, documents: updatedDocuments };
      }
      return app;
    });
    
    // Update state and localStorage
    setApplications(updatedApplications);
    localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
    
    // Show success message
    toast({
      title: "تم رفع المستند بنجاح",
      description: `تم رفع ${selectedDocument.docName} بنجاح للطلب ${selectedDocument.applicationId}`,
    });
    
    // Close dialog
    setIsUploadDialogOpen(false);
  };

  const handleNewApplication = () => {
    navigate('/apply');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">طلباتي</CardTitle>
            <CardDescription>تابع حالة طلباتك وإجراء التحديثات اللازمة</CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
                <TabsTrigger value="review">قيد المراجعة</TabsTrigger>
                <TabsTrigger value="documents">بانتظار المستندات</TabsTrigger>
                <TabsTrigger value="approved">مقبول</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="p-0 pt-4">
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getFilteredApplications().length > 0 ? (
                      getFilteredApplications().map((app) => (
                        <div 
                          key={app.id}
                          className="border rounded-lg overflow-hidden hover:shadow-sm transition-all"
                        >
                          <div className="p-4 border-b bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="bg-unlimited-blue/10 p-2 rounded-full">
                                  <FileText className="h-5 w-5 text-unlimited-blue" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-lg">{app.program}</h3>
                                  <p className="text-unlimited-gray">{app.university}</p>
                                </div>
                              </div>
                              <Badge className={app.statusColor}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(app.status)}
                                  {getStatusLabel(app.status)}
                                </span>
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-medium mb-2">المستندات المطلوبة:</h4>
                            <div className="space-y-2">
                              {app.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Badge variant={doc.status === 'required' ? 'destructive' : doc.status === 'uploaded' ? 'outline' : 'default'}>
                                      {doc.status === 'required' ? 'مطلوب' : doc.status === 'uploaded' ? 'تم الرفع' : 'معتمد'}
                                    </Badge>
                                    <span>{doc.name}</span>
                                  </div>
                                  
                                  {doc.status === 'required' ? (
                                    <Button size="sm" variant="outline" onClick={() => handleUploadDocument(app.id, doc.name)}>
                                      <Upload className="h-4 w-4 mr-1" />
                                      رفع
                                    </Button>
                                  ) : (
                                    <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(app.id, doc.name)}>
                                      <Download className="h-4 w-4 mr-1" />
                                      تنزيل
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="p-4 border-t flex items-center justify-between bg-gray-50">
                            <div className="text-sm text-unlimited-gray">
                              تاريخ التقديم: {app.date}
                            </div>
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <Button size="sm" variant="outline" onClick={() => handleMessageClick(app.id)}>
                                <MessageSquare className="h-4 w-4 mr-1" />
                                الرسائل {app.messages > 0 && <Badge className="ml-1 bg-unlimited-blue">{app.messages}</Badge>}
                              </Button>
                              <Button size="sm" variant="default">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                تفاصيل الطلب
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 mx-auto mb-2 text-unlimited-gray" />
                        <p className="text-unlimited-gray mb-4">لم يتم العثور على طلبات في هذه الفئة</p>
                        <Button onClick={handleNewApplication} className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          تقديم طلب جديد
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-6 text-center">
                  <Button onClick={handleNewApplication} className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    تقديم طلب جديد
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Document Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>رفع المستند</DialogTitle>
            <DialogDescription>
              يرجى اختيار ملف المستند المطلوب لرفعه.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document">المستند المطلوب: {selectedDocument?.docName}</Label>
              <Input
                id="document"
                type="file"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <p className="text-sm text-unlimited-gray">يجب أن يكون الملف بصيغة PDF أو JPG أو PNG ولا يتجاوز حجمه 5MB.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit" onClick={() => {
              const fileInput = document.getElementById('document') as HTMLInputElement;
              handleFileUpload(fileInput.files);
            }}>
              رفع المستند
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default StudentApplications;
