
import { useState, useEffect } from 'react';
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
  FileX
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

type ApplicationStatus = 'pending' | 'review' | 'approved' | 'rejected' | 'documents';

interface ApplicationDocument {
  name: string;
  status: 'uploaded' | 'required' | 'approved';
}

interface Application {
  id: number;
  applicationNumber: string;
  programId: number;
  status: ApplicationStatus;
  submissionDate: string;
  studentData: any;
  notes: string;
  notesAr: string;
}

const StudentApplications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const { id: applicationId } = useParams();
  
  // Fetch applications from localStorage on component mount
  useEffect(() => {
    const storedApplications = localStorage.getItem('studentApplications');
    if (storedApplications) {
      const parsedApplications = JSON.parse(storedApplications);
      setApplications(parsedApplications);
      
      // Log for debugging
      console.log('Loaded applications from localStorage:', parsedApplications);
    }
  }, []);
  
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

  const handleMessageClick = (applicationId: number) => {
    toast({
      title: "فتح المحادثة",
      description: `تم فتح المحادثة للطلب رقم ${applicationId}`,
    });
  };

  const handleDownloadDocument = (applicationId: number, document: string) => {
    toast({
      title: "تنزيل المستند",
      description: `جاري تنزيل ${document} للطلب رقم ${applicationId}`,
    });
  };

  const handleUploadDocument = (applicationId: number) => {
    toast({
      title: "رفع مستند",
      description: `يرجى اختيار المستند لرفعه للطلب رقم ${applicationId}`,
    });
  };
  
  // Get program name by ID (simplified version)
  const getProgramName = (programId: number) => {
    // This is a simplified version - in a real app, you would fetch this from your database or API
    const programNames: Record<number, string> = {
      1: 'بكالوريوس إدارة الأعمال',
      2: 'ماجستير علوم الحاسوب',
      3: 'دكتوراه الهندسة المدنية',
      4: 'بكالوريوس هندسة الحاسوب',
      5: 'ماجستير إدارة الأعمال'
    };
    
    return programNames[programId] || 'برنامج غير محدد';
  };
  
  // Get university name (simplified)
  const getUniversityName = (programId: number) => {
    const universityNames: Record<number, string> = {
      1: 'جامعة أوزيجين',
      2: 'جامعة فاتح سلطان محمد',
      3: 'جامعة المجر للتكنولوجيا',
      4: 'جامعة باهتشه شهير',
      5: 'جامعة اسطنبول'
    };
    
    return universityNames[programId] || 'جامعة غير محددة';
  };
  
  // Generate mock documents based on application status
  const getApplicationDocuments = (application: Application): ApplicationDocument[] => {
    const documents: ApplicationDocument[] = [
      { name: 'جواز السفر', status: 'uploaded' },
      { name: 'الشهادة الثانوية', status: 'uploaded' }
    ];
    
    if (application.status === 'documents') {
      documents.push({ name: 'خطاب التوصية', status: 'required' });
      documents.push({ name: 'السيرة الذاتية', status: 'required' });
    } else if (application.status === 'approved') {
      documents.push({ name: 'خطاب القبول', status: 'approved' });
    }
    
    return documents;
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
                <div className="space-y-4">
                  {getFilteredApplications().length > 0 ? (
                    getFilteredApplications().map((app) => {
                      const documents = getApplicationDocuments(app);
                      return (
                        <div 
                          key={app.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="p-4 border-b bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="bg-unlimited-blue/10 p-2 rounded-full">
                                  <FileText className="h-5 w-5 text-unlimited-blue" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-lg">{getProgramName(app.programId)}</h3>
                                  <p className="text-unlimited-gray">{getUniversityName(app.programId)}</p>
                                  <p className="text-xs text-unlimited-gray mt-1">رقم الطلب: {app.applicationNumber}</p>
                                </div>
                              </div>
                              <Badge className={
                                app.status === 'approved' ? 'text-green-600 bg-green-100' : 
                                app.status === 'rejected' ? 'text-red-600 bg-red-100' : 
                                app.status === 'review' ? 'text-yellow-600 bg-yellow-100' : 
                                app.status === 'documents' ? 'text-blue-600 bg-blue-100' : 
                                'text-gray-600 bg-gray-100'
                              }>
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
                              {documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Badge variant={doc.status === 'required' ? 'destructive' : doc.status === 'uploaded' ? 'outline' : 'default'}>
                                      {doc.status === 'required' ? 'مطلوب' : doc.status === 'uploaded' ? 'تم الرفع' : 'معتمد'}
                                    </Badge>
                                    <span>{doc.name}</span>
                                  </div>
                                  
                                  {doc.status === 'required' ? (
                                    <Button size="sm" variant="outline" onClick={() => handleUploadDocument(app.id)}>
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
                              تاريخ التقديم: {app.submissionDate}
                            </div>
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <Button size="sm" variant="outline" onClick={() => handleMessageClick(app.id)}>
                                <MessageSquare className="h-4 w-4 mr-1" />
                                الرسائل
                              </Button>
                              <Button size="sm" variant="default">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                تفاصيل الطلب
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 flex flex-col items-center">
                      <FileX className="h-16 w-16 text-unlimited-gray/50 mb-4" />
                      <p className="text-unlimited-gray text-lg mb-2">لم يتم العثور على طلبات في هذه الفئة</p>
                      <p className="text-unlimited-gray/70 mb-6">قم بتقديم طلب جديد للبدء في رحلتك الدراسية</p>
                      <Link to="/apply">
                        <Button className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          تقديم طلب جديد
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 text-center">
                  <Link to="/apply">
                    <Button className="gap-2">
                      <PlusCircle className="h-4 w-4" />
                      تقديم طلب جديد
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplications;
