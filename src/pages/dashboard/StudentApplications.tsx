
import { useState } from 'react';
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
  PlusCircle
} from 'lucide-react';

type ApplicationStatus = 'pending' | 'review' | 'approved' | 'rejected' | 'documents';

interface Application {
  id: number;
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
  
  const applications: Application[] = [
    {
      id: 1,
      program: 'بكالوريوس إدارة الأعمال',
      university: 'جامعة أوزيجين',
      status: 'approved',
      date: '15/04/2025',
      statusColor: 'text-green-600 bg-green-100',
      messages: 2,
      documents: [
        { name: 'جواز السفر', status: 'approved' },
        { name: 'الشهادة الثانوية', status: 'approved' },
        { name: 'صورة شخصية', status: 'approved' }
      ]
    },
    {
      id: 2,
      program: 'ماجستير علوم الحاسوب',
      university: 'جامعة فاتح سلطان محمد',
      status: 'review',
      date: '10/04/2025',
      statusColor: 'text-yellow-600 bg-yellow-100',
      messages: 0,
      documents: [
        { name: 'جواز السفر', status: 'uploaded' },
        { name: 'الشهادة الجامعية', status: 'uploaded' },
        { name: 'السيرة الذاتية', status: 'required' }
      ]
    },
    {
      id: 3,
      program: 'دكتوراه الهندسة المدنية',
      university: 'جامعة المجر للتكنولوجيا',
      status: 'documents',
      date: '05/04/2025',
      statusColor: 'text-blue-600 bg-blue-100',
      messages: 1,
      documents: [
        { name: 'جواز السفر', status: 'uploaded' },
        { name: 'شهادة الماجستير', status: 'required' },
        { name: 'خطاب التوصية', status: 'required' },
        { name: 'مقترح البحث', status: 'required' }
      ]
    },
  ];

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
                    getFilteredApplications().map((app) => (
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
                      <p className="text-unlimited-gray mb-4">لم يتم العثور على طلبات في هذه الفئة</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 text-center">
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    تقديم طلب جديد
                  </Button>
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
