
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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ApplicationStatus = 'pending' | 'review' | 'approved' | 'rejected' | 'documents';

interface ApplicationDocument {
  name: string;
  status: 'uploaded' | 'required' | 'approved';
}

interface Application {
  id: number;
  applicationNumber: string;
  programId: number | string;
  status: ApplicationStatus;
  submissionDate: string;
  studentData: any;
  notes: string;
  notesAr: string;
  university?: string;
}

const StudentApplications = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const { id: applicationId } = useParams();
  const navigate = useNavigate();
  
  // Fetch applications from localStorage on component mount
  useEffect(() => {
    const fetchApplications = () => {
      const storedApplications = localStorage.getItem('studentApplications');
      if (storedApplications) {
        try {
          const parsedApplications = JSON.parse(storedApplications);
          setApplications(parsedApplications);
          
          // Log for debugging
          console.log('StudentApplications: Loaded applications from localStorage:', parsedApplications);
        } catch (error) {
          console.error('Error parsing applications from localStorage:', error);
          setApplications([]);
        }
      } else {
        console.log('No applications found in localStorage');
        setApplications([]);
      }
    };
    
    fetchApplications();
    
    // Add event listener for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'studentApplications') {
        fetchApplications();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
    navigate(`/student/messages?application=${applicationId}`);
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
    // Open file upload dialog
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        handleFileUpload(applicationId, file);
      }
    };
    fileInput.click();
  };
  
  const handleFileUpload = (applicationId: number, file: File) => {
    // Simulate file upload
    toast({
      title: "جاري رفع المستند",
      description: `جاري رفع ${file.name}...`,
    });
    
    // Simulate upload delay
    setTimeout(() => {
      toast({
        title: "تم رفع المستند بنجاح",
        description: `تم رفع ${file.name} بنجاح وسيتم مراجعته قريباً`,
      });
      
      // Update application status in localStorage
      const updatedApplications = applications.map(app => {
        if (app.id === applicationId) {
          return { ...app, status: 'review' as ApplicationStatus };
        }
        return app;
      });
      
      localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
      setApplications(updatedApplications);
    }, 1500);
  };
  
  // Get program name by ID (simplified version)
  const getProgramName = (programId: number | string) => {
    // This is a simplified version - in a real app, you would fetch this from your database or API
    const programNames: Record<string | number, string> = {
      1: 'بكالوريوس إدارة الأعمال',
      2: 'ماجستير علوم الحاسوب',
      3: 'دكتوراه الهندسة المدنية',
      4: 'بكالوريوس هندسة الحاسوب',
      5: 'ماجستير إدارة الأعمال',
      'computer_science': 'علوم الحاسوب',
      'medicine': 'الطب البشري',
      'engineering': 'الهندسة',
      'business': 'إدارة الأعمال',
      'humanities': 'العلوم الإنسانية'
    };
    
    return programNames[programId] || 'برنامج غير محدد';
  };
  
  // Get university name (simplified)
  const getUniversityName = (universityId: string | number) => {
    const universityNames: Record<string | number, string> = {
      1: 'جامعة أوزيجين',
      2: 'جامعة فاتح سلطان محمد',
      3: 'جامعة المجر للتكنولوجيا',
      4: 'جامعة باهتشه شهير',
      5: 'جامعة اسطنبول',
      'istanbul': 'جامعة اسطنبول',
      'marmara': 'جامعة مرمرة',
      'ankara': 'جامعة أنقرة',
      'bogazici': 'جامعة بوغازيتشي',
      'yildiz': 'جامعة يلدز التقنية',
    };
    
    return universityNames[universityId] || 'جامعة غير محددة';
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
  
  // View specific application if ID is provided in URL
  useEffect(() => {
    if (applicationId) {
      const app = applications.find(app => app.id === Number(applicationId));
      if (app) {
        // Create a specialized view for the specific application
        // For now, we'll just show the application in the list and highlight it
        console.log('Viewing specific application:', app);
      }
    }
  }, [applicationId, applications]);

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
                      const isDetailView = applicationId && app.id === Number(applicationId);
                      
                      return (
                        <div 
                          key={app.id}
                          className={`border rounded-lg overflow-hidden transition-all ${isDetailView ? 'ring-2 ring-unlimited-blue' : ''}`}
                        >
                          <div className="p-4 border-b bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="bg-unlimited-blue/10 p-2 rounded-full">
                                  <FileText className="h-5 w-5 text-unlimited-blue" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-lg">{getProgramName(app.programId)}</h3>
                                  <p className="text-unlimited-gray">{getUniversityName(app.university || app.programId)}</p>
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
                            
                            {isDetailView && (
                              <div className="mt-6 space-y-4">
                                <h4 className="font-medium">تفاصيل الطلب:</h4>
                                <div className="border p-4 rounded-md bg-gray-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="font-medium text-unlimited-blue mb-2">معلومات الطالب</h5>
                                      {app.studentData?.personalInfo && (
                                        <div className="space-y-2">
                                          <p><strong>الاسم:</strong> {app.studentData.personalInfo.firstName} {app.studentData.personalInfo.lastName}</p>
                                          <p><strong>البريد الإلكتروني:</strong> {app.studentData.personalInfo.email}</p>
                                          <p><strong>الهاتف:</strong> {app.studentData.personalInfo.phone}</p>
                                          <p><strong>الجنسية:</strong> {app.studentData.personalInfo.nationality}</p>
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-unlimited-blue mb-2">معلومات البرنامج</h5>
                                      <div className="space-y-2">
                                        <p><strong>الجامعة:</strong> {getUniversityName(app.university || app.programId)}</p>
                                        <p><strong>البرنامج:</strong> {getProgramName(app.programId)}</p>
                                        <p><strong>تاريخ التقديم:</strong> {app.submissionDate}</p>
                                        <p><strong>حالة الطلب:</strong> {getStatusLabel(app.status)}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
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
                              {!isDetailView ? (
                                <Link to={`/dashboard/applications/${app.id}`}>
                                  <Button size="sm" variant="default">
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    تفاصيل الطلب
                                  </Button>
                                </Link>
                              ) : (
                                <Link to="/dashboard/applications">
                                  <Button size="sm" variant="default">
                                    العودة للقائمة
                                  </Button>
                                </Link>
                              )}
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
                
                {getFilteredApplications().length > 0 && (
                  <div className="mt-6 text-center">
                    <Link to="/apply">
                      <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        تقديم طلب جديد
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplications;
