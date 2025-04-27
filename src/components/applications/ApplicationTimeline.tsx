
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, FileDown, CircleDashed } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TimelineEvent {
  status: string;
  date: string;
  note: string;
}

interface ApplicationTimelineProps {
  applicationId: string;
}

const ApplicationTimeline = ({ applicationId }: ApplicationTimelineProps) => {
  const { t } = useTranslation();
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب بيانات مسار الطلب من التخزين المحلي
    const fetchTimelineData = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        try {
          const applications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
          const currentApp = applications.find((app: any) => app.id === applicationId);
          
          if (currentApp && currentApp.timeline) {
            setTimelineEvents(currentApp.timeline);
          } else {
            // إذا لم يوجد مسار زمني، نقوم بإنشاء مسار افتراضي
            const defaultTimeline = [
              {
                status: 'pending',
                date: new Date().toISOString(),
                note: 'تم استلام الطلب وهو قيد المراجعة'
              }
            ];
            setTimelineEvents(defaultTimeline);
            
            // تحديث مسار الطلب في التخزين المحلي
            if (currentApp) {
              currentApp.timeline = defaultTimeline;
              localStorage.setItem('studentApplications', JSON.stringify(applications));
            }
          }
        } catch (error) {
          console.error('Error fetching timeline data:', error);
          // إنشاء مسار افتراضي في حالة حدوث خطأ
          setTimelineEvents([{
            status: 'pending',
            date: new Date().toISOString(),
            note: 'تم استلام الطلب وهو قيد المراجعة'
          }]);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    };
    
    if (applicationId) {
      fetchTimelineData();
    }
  }, [applicationId]);

  // الحصول على أيقونة ولون حالة الطلب
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: <Clock className="h-5 w-5 text-yellow-500" />, color: 'bg-yellow-100 border-yellow-300' };
      case 'documents':
        return { icon: <FileDown className="h-5 w-5 text-purple-500" />, color: 'bg-purple-100 border-purple-300' };
      case 'review':
        return { icon: <CircleDashed className="h-5 w-5 text-blue-500" />, color: 'bg-blue-100 border-blue-300' };
      case 'conditional':
        return { icon: <AlertCircle className="h-5 w-5 text-indigo-500" />, color: 'bg-indigo-100 border-indigo-300' };
      case 'approved':
        return { icon: <CheckCircle className="h-5 w-5 text-green-500" />, color: 'bg-green-100 border-green-300' };
      case 'rejected':
        return { icon: <AlertCircle className="h-5 w-5 text-red-500" />, color: 'bg-red-100 border-red-300' };
      case 'paid':
        return { icon: <CheckCircle className="h-5 w-5 text-teal-500" />, color: 'bg-teal-100 border-teal-300' };
      case 'registered':
        return { icon: <CheckCircle className="h-5 w-5 text-emerald-500" />, color: 'bg-emerald-100 border-emerald-300' };
      default:
        return { icon: <CircleDashed className="h-5 w-5 text-gray-500" />, color: 'bg-gray-100 border-gray-300' };
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  // الحصول على نص الحالة
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('application.status.pending', 'قيد الانتظار');
      case 'documents':
        return t('application.status.documents', 'بانتظار المستندات');
      case 'review':
        return t('application.status.review', 'قيد المراجعة');
      case 'conditional':
        return t('application.status.conditional', 'قبول مشروط');
      case 'approved':
        return t('application.status.approved', 'مقبول');
      case 'rejected':
        return t('application.status.rejected', 'مرفوض');
      case 'paid':
        return t('application.status.paid', 'مدفوع');
      case 'registered':
        return t('application.status.registered', 'مسجل');
      default:
        return status;
    }
  };
  
  // إضافة أحداث مستقبلية محتملة في مسار الطلب
  const getPotentialNextSteps = () => {
    if (timelineEvents.length === 0) return [];
    
    // آخر حالة في المسار الزمني
    const lastStatus = timelineEvents[timelineEvents.length - 1].status;
    const nextSteps = [];
    
    if (lastStatus === 'pending') {
      nextSteps.push({
        status: 'review',
        isFuture: true,
        note: 'سيتم مراجعة طلبك من قبل فريق القبول'
      });
      nextSteps.push({
        status: 'documents',
        isFuture: true,
        note: 'قد يتم طلب مستندات إضافية'
      });
    } else if (lastStatus === 'documents') {
      nextSteps.push({
        status: 'review',
        isFuture: true,
        note: 'بعد تقديم المستندات، سيتم مراجعة طلبك'
      });
    } else if (lastStatus === 'review') {
      nextSteps.push({
        status: 'conditional',
        isFuture: true,
        note: 'قد تحصل على قبول مشروط'
      });
      nextSteps.push({
        status: 'approved',
        isFuture: true,
        note: 'أو قبول كامل'
      });
    } else if (lastStatus === 'conditional' || lastStatus === 'approved') {
      nextSteps.push({
        status: 'paid',
        isFuture: true,
        note: 'دفع الرسوم لتأكيد المقعد'
      });
    } else if (lastStatus === 'paid') {
      nextSteps.push({
        status: 'registered',
        isFuture: true,
        note: 'التسجيل في المقررات الدراسية'
      });
    }
    
    return nextSteps;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("application.details.timeline.title", "مسار الطلب")}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
          </div>
        ) : timelineEvents.length > 0 ? (
          <div className="relative space-y-8 before:absolute before:inset-0 before:left-6 before:h-full before:w-px before:bg-gray-200 ml-6 pl-6">
            {timelineEvents.map((event, index) => {
              const { icon, color } = getStatusInfo(event.status);
              return (
                <div key={index} className="relative">
                  <div className={`absolute -left-6 flex h-12 w-12 items-center justify-center rounded-full border-2 ${color}`}>
                    {icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{getStatusText(event.status)}</Badge>
                      <time className="text-sm text-unlimited-gray">{formatDate(event.date)}</time>
                    </div>
                    <p className="text-unlimited-dark-blue font-medium">{event.note}</p>
                  </div>
                </div>
              );
            })}
            
            {/* إضافة الخطوات المستقبلية المحتملة */}
            {getPotentialNextSteps().map((step, index) => {
              const { icon, color } = getStatusInfo(step.status);
              return (
                <div key={`future-${index}`} className="relative opacity-50">
                  <div className={`absolute -left-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed ${color}`}>
                    {icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{getStatusText(step.status)}</Badge>
                      <span className="text-sm text-unlimited-gray">{t("application.timeline.comingSoon", "قادم")}</span>
                    </div>
                    <p className="text-unlimited-dark-blue font-medium">{step.note}</p>
                  </div>
                </div>
              );
            })}
            
            {timelineEvents.length === 1 && timelineEvents[0].status === 'pending' && (
              <div className="text-center mt-4 border-t pt-4 text-unlimited-gray">
                <p>{t("application.timeline.justSubmitted", "لقد قمت للتو بتقديم طلبك. سنبقيك على اطلاع بأي تطورات.")}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-unlimited-gray">
              {t("application.timeline.noEvents", "لا توجد أحداث في مسار الطلب حتى الآن.")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTimeline;
