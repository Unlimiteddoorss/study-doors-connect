
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, MessageCircle, ArrowLeft, Clock, Calendar, User, MapPin, Building, GraduationCap, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FormDialog } from '@/components/admin/FormDialog';
import { Textarea } from '@/components/ui/textarea';

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load application details from localStorage
    const storedApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    const foundApplication = storedApplications.find((app: any) => app.id === id);
    
    if (foundApplication) {
      setApplication(foundApplication);
    }
    
    setLoading(false);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'reviewing': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return 'تم القبول';
      case 'rejected': return 'تم الرفض';
      case 'reviewing': return 'قيد المراجعة';
      default: return 'قيد الانتظار';
    }
  };

  const handleSendFeedback = () => {
    setIsSendingFeedback(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم إرسال الملاحظات بنجاح",
        description: "سيتم الرد عليك قريباً من قبل فريق القبول",
      });
      
      setFeedbackDialogOpen(false);
      setIsSendingFeedback(false);
      setFeedback('');
    }, 1000);
  };

  const handleContactAdvisor = () => {
    navigate(`/messages?application=${id}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">لم يتم العثور على الطلب</h1>
          <p className="text-unlimited-gray">
            لم نتمكن من العثور على تفاصيل الطلب المطلوب. يرجى التحقق من الرقم المرجعي والمحاولة مرة أخرى.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/dashboard/applications')}
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة لقائمة الطلبات
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">تفاصيل الطلب</h1>
            <p className="text-unlimited-gray">
              رقم الطلب: {application.id}
            </p>
          </div>
          <Badge className={getStatusColor(application.status)}>
            {getStatusText(application.status)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات البرنامج</CardTitle>
                <CardDescription>تفاصيل البرنامج الذي تقدمت إليه</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded">
                    <img 
                      src={application.programDetails?.image || "/placeholder.svg"} 
                      alt={application.program} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{application.program}</h3>
                    <div className="flex items-center text-unlimited-gray mt-1">
                      <Building className="h-4 w-4 ml-2" />
                      <span>{application.university}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-unlimited-gray mb-1">تاريخ التقديم</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-unlimited-blue ml-2" />
                      <p className="font-semibold">{application.date}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-unlimited-gray mb-1">آخر تحديث</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-unlimited-blue ml-2" />
                      <p className="font-semibold">{application.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {application.personalInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>البيانات الشخصية</CardTitle>
                  <CardDescription>المعلومات الشخصية المقدمة في طلبك</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-unlimited-gray mb-1">الاسم الكامل</p>
                      <p className="font-semibold">{application.personalInfo.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-unlimited-gray mb-1">البريد الإلكتروني</p>
                      <p className="font-semibold">{application.personalInfo.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-unlimited-gray mb-1">رقم الهاتف</p>
                      <p className="font-semibold">{application.personalInfo.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-unlimited-gray mb-1">الجنسية</p>
                      <p className="font-semibold">{application.personalInfo.nationality}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {application.documents && application.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>المستندات المرفقة</CardTitle>
                  <CardDescription>المستندات التي تم رفعها مع طلبك</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {application.documents.map((doc: any, index: number) => (
                      <div key={index} className="flex items-center p-3 border rounded-md">
                        <File className="h-5 w-5 text-unlimited-blue ml-2" />
                        <div>
                          <p className="font-medium">{doc.type}</p>
                          <p className="text-sm text-unlimited-gray">{doc.name || "تم رفع المستند"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {application.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>ملاحظات</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{application.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>حالة الطلب</CardTitle>
                <CardDescription>تتبع حالة طلب التحاقك</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p>تقديم الطلب</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      تم
                    </Badge>
                  </div>
                  <div className="h-1 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p>مراجعة المستندات</p>
                    <Badge variant="outline" className={application.status !== 'pending' ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                      {application.status !== 'pending' ? "تم" : "قيد المراجعة"}
                    </Badge>
                  </div>
                  <div className={`h-1 ${application.status !== 'pending' ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p>الموافقة الأكاديمية</p>
                    <Badge variant="outline" className={application.status === 'reviewing' || application.status === 'accepted' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-500"}>
                      {application.status === 'reviewing' ? "قيد المراجعة" : application.status === 'accepted' ? "تم" : "قيد الانتظار"}
                    </Badge>
                  </div>
                  <div className={`h-1 ${application.status === 'accepted' ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p>إصدار خطاب القبول</p>
                    <Badge variant="outline" className={application.status === 'accepted' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-500"}>
                      {application.status === 'accepted' ? "قيد الإعداد" : "قيد الانتظار"}
                    </Badge>
                  </div>
                  <div className="h-1 bg-gray-300 rounded-full"></div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex-col">
                <p className="text-sm text-unlimited-gray mb-3">
                  يمكنك مراسلة مستشارينا في أي وقت للاستفسار عن حالة طلبك
                </p>
                <Button className="w-full" onClick={handleContactAdvisor}>
                  <MessageCircle className="h-4 w-4 ml-2" />
                  التواصل مع المستشار
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>أرسل ملاحظاتك</CardTitle>
                <CardDescription>
                  إذا كان لديك أي استفسار أو ملاحظات إضافية حول طلبك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFeedbackDialogOpen(true)}
                >
                  <FileText className="h-4 w-4 ml-2" />
                  إرسال ملاحظات إضافية
                </Button>
              </CardContent>
            </Card>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/dashboard/applications')}
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة لقائمة الطلبات
            </Button>
          </div>
        </div>
      </div>
      
      <FormDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        title="إرسال ملاحظات إضافية"
        description="أخبرنا بأي استفسارات أو معلومات إضافية مرتبطة بطلبك"
        onSubmit={handleSendFeedback}
        submitLabel="إرسال"
        cancelLabel="إلغاء"
        isLoading={isSendingFeedback}
      >
        <div className="space-y-4">
          <p className="text-unlimited-gray text-sm">
            الرقم المرجعي للطلب: {application.id}
          </p>
          <Textarea 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="اكتب ملاحظاتك أو استفساراتك هنا..."
            className="h-32"
          />
        </div>
      </FormDialog>
    </DashboardLayout>
  );
};

export default ApplicationDetails;
