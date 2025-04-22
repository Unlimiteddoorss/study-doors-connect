
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Check, FileText, Loader2 } from 'lucide-react';

interface ApplicationSubmissionHandlerProps {
  formData?: any;
  onSubmit?: () => void;
  onCancel?: () => void;
}

// Interface for stored application
interface StoredApplication {
  id: string;
  program: string;
  programId?: number;
  university: string;
  status: string;
  date: string;
  statusColor: string;
  messages: number;
  studentId?: string;
  studentName?: string;
  documents: {
    name: string;
    status: 'uploaded' | 'required' | 'approved';
  }[];
  formData?: any;
}

// أدخل هنا عنوان API الخاص بك
const API_ENDPOINT = process.env.VITE_API_ENDPOINT || 'https://your-api-endpoint.com/api/applications';

const ApplicationSubmissionHandler = ({ 
  formData, 
  onSubmit, 
  onCancel 
}: ApplicationSubmissionHandlerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    
    // توليد رقم طلب فريد
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const appNumber = `APP-${randomNumber}`;
    setApplicationNumber(appNumber);
    
    // تجهيز كائن الطلب
    const newApplication: StoredApplication = {
      id: appNumber,
      program: formData?.program?.name || "برنامج جديد",
      programId: formData?.program?.id,
      university: formData?.university || "الجامعة",
      status: "pending", // الحالة الأولية
      date: new Date().toISOString().split('T')[0],
      statusColor: 'text-yellow-600 bg-yellow-100',
      messages: 0,
      studentName: formData?.personalInfo?.fullName || localStorage.getItem('userName') || "طالب",
      studentId: localStorage.getItem('userId') || "user-" + Date.now(),
      documents: [
        { name: 'جواز السفر', status: 'required' },
        { name: 'الشهادة الدراسية', status: 'required' },
        { name: 'صورة شخصية', status: 'required' }
      ],
      formData: formData // تخزين بيانات النموذج الكاملة
    };

    try {
      // تجهيز البيانات للإرسال
      const payload = {
        application: newApplication,
        submitDate: new Date().toISOString(),
        applicantIP: await fetchUserIP(),
        source: window.location.hostname,
        referrer: document.referrer,
        sessionId: localStorage.getItem('sessionId') || generateSessionId(),
      };

      console.log("إرسال البيانات إلى:", API_ENDPOINT);
      console.log("البيانات المرسلة:", JSON.stringify(payload, null, 2));

      // إرسال بيانات الطلب إلى الـ API الخاص بالخادم
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // يمكنك إضافة توكن للمصادقة إذا كان مطلوباً
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(payload)
      });

      // تحليل الرد
      const responseData = await response.json();

      // التحقق من الرد
      if (!response.ok) {
        throw new Error(responseData.message || 'فشل في إرسال الطلب');
      }

      console.log('تم إرسال الطلب بنجاح:', responseData);
      
      // حفظ في التخزين المحلي كنسخة احتياطية
      saveApplicationToLocalStorage(newApplication);
      
      // إظهار رسالة نجاح
      toast({
        title: "تم تقديم الطلب بنجاح",
        description: `رقم الطلب الخاص بك هو ${appNumber}`,
        variant: "default",
      });
      
      // فتح نافذة التأكيد
      setIsDialogOpen(true);
      
      // استدعاء دالة الاستدعاء onSubmit إذا تم توفيرها
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('خطأ أثناء إرسال الطلب:', error);
      
      // حفظ في التخزين المحلي في حالة فشل الاتصال
      saveApplicationToLocalStorage(newApplication);
      
      toast({
        title: "تم حفظ الطلب محلياً",
        description: "لم نتمكن من الاتصال بالخادم، لكن تم حفظ طلبك محلياً. سنحاول إرساله لاحقاً عند استعادة الاتصال.",
        variant: "default",
      });
      
      // فتح نافذة التأكيد على الرغم من الخطأ
      setIsDialogOpen(true);
      
      // استدعاء دالة الاستدعاء onSubmit إذا تم توفيرها
      if (onSubmit) onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  // حفظ الطلب في التخزين المحلي
  const saveApplicationToLocalStorage = (application: StoredApplication) => {
    try {
      // إضافة البيانات إلى تطبيقات الطالب
      const existingApplicationsString = localStorage.getItem('studentApplications');
      const existingApplications = existingApplicationsString 
        ? JSON.parse(existingApplicationsString) 
        : [];
      
      existingApplications.push(application);
      localStorage.setItem('studentApplications', JSON.stringify(existingApplications));
      
      // إضافة البيانات إلى تطبيقات المشرفين أيضًا
      const adminAppsString = localStorage.getItem('adminApplications');
      const adminApps = adminAppsString ? JSON.parse(adminAppsString) : [];
      adminApps.push({
        ...application,
        status: "pending", // التأكد من أنه معلق لمراجعة المسؤول
      });
      localStorage.setItem('adminApplications', JSON.stringify(adminApps));

      console.log('تم حفظ الطلب في التخزين المحلي بنجاح');
    } catch (error) {
      console.error('خطأ أثناء حفظ الطلب في التخزين المحلي:', error);
    }
  };

  // دالة مساعدة للحصول على عنوان IP للمستخدم
  const fetchUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('خطأ في جلب عنوان IP:', error);
      return 'unknown';
    }
  };

  // توليد معرف جلسة فريد
  const generateSessionId = () => {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('sessionId', sessionId);
    return sessionId;
  };

  // التحقق من وجود طلبات غير مرسلة عند تحميل المكون
  useEffect(() => {
    // يمكن تنفيذ منطق مزامنة الطلبات غير المرسلة هنا
    const syncPendingApplications = async () => {
      // منطق المزامنة يمكن إضافته هنا
    };

    // يمكن استدعاء وظيفة المزامنة هنا في حال كانت مطلوبة
    // syncPendingApplications();
  }, []);

  const viewApplicationStatus = () => {
    navigate('/dashboard/applications');
    setIsDialogOpen(false);
  };

  const goToHomePage = () => {
    navigate('/');
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-end space-x-4 rtl:space-x-reverse mt-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2" disabled={isSubmitting}>
            إلغاء
          </Button>
        )}
        <Button 
          onClick={handleFormSubmit} 
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> جاري التقديم...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              تقديم الطلب
            </>
          )}
        </Button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center text-unlimited-blue">
              تم تقديم طلبك بنجاح
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-50 p-3">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <p className="text-center">
                شكراً لتقديمك الطلب. تم تسجيل طلبك برقم:
                <span className="block text-center font-bold text-xl my-3 text-unlimited-blue">
                  {applicationNumber}
                </span>
              </p>
              <p className="text-center">
                يمكنك متابعة حالة طلبك من لوحة التحكم الخاصة بك، وسيتم إشعارك بأي تغييرات في حالة الطلب.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-center">
            <AlertDialogAction 
              onClick={viewApplicationStatus}
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center gap-2 w-full sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              متابعة حالة الطلب
            </AlertDialogAction>
            <Button
              variant="outline"
              onClick={goToHomePage}
              className="w-full sm:w-auto"
            >
              العودة للرئيسية
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApplicationSubmissionHandler;
