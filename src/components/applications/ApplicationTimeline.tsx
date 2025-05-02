
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Clock, FileText, MessageCircle, AlertCircle, Calendar, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getApplicationFromStorage, getApplicationStatusColor } from '@/utils/applicationUtils';

type TimelineEvent = {
  id: number | string;
  date: string;
  title: string;
  description?: string;
  type?: string;
  status?: string;
  actor?: string;
};

interface ApplicationTimelineProps {
  applicationId: string;
}

const ApplicationTimeline = ({ applicationId }: ApplicationTimelineProps) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  useEffect(() => {
    const loadEvents = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        // الحصول على بيانات الطلب من التخزين المحلي
        const application = getApplicationFromStorage(applicationId);
        
        if (application) {
          // استخدام الأحداث الزمنية المحفوظة مع الطلب إذا كانت موجودة
          if (application.timeline && Array.isArray(application.timeline)) {
            setEvents(application.timeline);
          } else {
            // إنشاء أحداث زمنية افتراضية إذا لم تكن موجودة
            const defaultEvents = generateDefaultTimeline(application);
            setEvents(defaultEvents);
          }
        } else {
          setEvents([]);
        }
        
        setIsLoading(false);
      }, 500);
    };
    
    loadEvents();
  }, [applicationId]);
  
  const generateDefaultTimeline = (application: any): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    const submissionDate = new Date(application.date);
    
    // حدث إنشاء الطلب
    events.push({
      id: 1,
      date: submissionDate.toISOString(),
      title: t('application.timeline.applicationCreated', 'تم إنشاء الطلب'),
      description: t('application.timeline.applicationCreatedDesc', 'تم إنشاء الطلب وبدء عملية التقديم'),
      type: 'creation',
      status: 'draft',
    });
    
    // حدث تقديم الطلب (إذا لم يكن في حالة مسودة)
    if (application.status !== 'draft') {
      const submitDate = new Date(submissionDate);
      submitDate.setHours(submitDate.getHours() + 2);
      
      events.push({
        id: 2,
        date: submitDate.toISOString(),
        title: t('application.timeline.applicationSubmitted', 'تم تقديم الطلب'),
        description: t('application.timeline.applicationSubmittedDesc', 'تم تقديم الطلب للمراجعة'),
        type: 'submission',
        status: 'submitted',
      });
    }
    
    // حدث استلام المستندات (إذا كانت حالة الطلب بعد تقديم المستندات)
    if (['documents', 'review', 'conditional', 'approved', 'registered'].includes(application.status)) {
      const documentsDate = new Date(submissionDate);
      documentsDate.setDate(documentsDate.getDate() + 1);
      
      events.push({
        id: 3,
        date: documentsDate.toISOString(),
        title: t('application.timeline.documentsReceived', 'تم استلام المستندات'),
        description: t('application.timeline.documentsReceivedDesc', 'تم استلام المستندات المطلوبة وبدء مراجعتها'),
        type: 'documents',
        status: 'documents',
      });
    }
    
    // حدث مراجعة الطلب (إذا كانت حالة الطلب في مرحلة المراجعة أو بعدها)
    if (['review', 'conditional', 'approved', 'registered'].includes(application.status)) {
      const reviewDate = new Date(submissionDate);
      reviewDate.setDate(reviewDate.getDate() + 3);
      
      events.push({
        id: 4,
        date: reviewDate.toISOString(),
        title: t('application.timeline.applicationInReview', 'الطلب قيد المراجعة'),
        description: t('application.timeline.applicationInReviewDesc', 'بدأت الجامعة مراجعة طلبك'),
        type: 'review',
        status: 'review',
      });
    }
    
    // حدث القبول المشروط (إذا كانت حالة الطلب في مرحلة القبول المشروط أو بعدها)
    if (['conditional', 'approved', 'registered'].includes(application.status)) {
      const conditionalDate = new Date(submissionDate);
      conditionalDate.setDate(conditionalDate.getDate() + 7);
      
      events.push({
        id: 5,
        date: conditionalDate.toISOString(),
        title: t('application.timeline.conditionalAcceptance', 'قبول مشروط'),
        description: t('application.timeline.conditionalAcceptanceDesc', 'تم قبولك بشكل مشروط في البرنامج، مع بعض المتطلبات الإضافية'),
        type: 'decision',
        status: 'conditional',
      });
    }
    
    // حدث القبول النهائي (إذا كانت حالة الطلب في مرحلة القبول أو بعدها)
    if (['approved', 'registered'].includes(application.status)) {
      const approvedDate = new Date(submissionDate);
      approvedDate.setDate(approvedDate.getDate() + 14);
      
      events.push({
        id: 6,
        date: approvedDate.toISOString(),
        title: t('application.timeline.finalAcceptance', 'القبول النهائي'),
        description: t('application.timeline.finalAcceptanceDesc', 'تمت الموافقة النهائية على طلبك، مبروك!'),
        type: 'decision',
        status: 'approved',
      });
    }
    
    // حدث التسجيل (إذا كانت حالة الطلب في مرحلة التسجيل)
    if (application.status === 'registered') {
      const registeredDate = new Date(submissionDate);
      registeredDate.setDate(registeredDate.getDate() + 20);
      
      events.push({
        id: 7,
        date: registeredDate.toISOString(),
        title: t('application.timeline.registered', 'تم التسجيل'),
        description: t('application.timeline.registeredDesc', 'تم تسجيلك رسميًا في البرنامج'),
        type: 'registration',
        status: 'registered',
      });
    }
    
    // ترتيب الأحداث حسب التاريخ (الأحدث أولاً)
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getEventIcon = (eventType?: string, eventStatus?: string) => {
    switch (eventType) {
      case 'creation':
        return <Clock className="h-5 w-5" />;
      case 'submission':
        return <FileText className="h-5 w-5" />;
      case 'documents':
        return <FileText className="h-5 w-5" />;
      case 'message':
        return <MessageCircle className="h-5 w-5" />;
      case 'review':
        return <Check className="h-5 w-5" />;
      case 'decision':
        return <Check className="h-5 w-5" />;
      case 'registration':
        return <Calendar className="h-5 w-5" />;
      case 'payment':
        return <Check className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-unlimited-gray';
    return getApplicationStatusColor(status as any);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        formattedDate: date.toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        formattedTime: date.toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        relativeTime: formatDistanceToNow(date, { addSuffix: true, locale: ar })
      };
    } catch (error) {
      console.error('Error formatting date:', error);
      return {
        formattedDate: '---',
        formattedTime: '---',
        relativeTime: '---'
      };
    }
  };

  // Show only the last 3 events unless showAll is true
  const visibleEvents = showAll ? events : events.slice(0, 3);
  const hasMoreEvents = events.length > 3;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('application.timeline.title', 'مسار الطلب')}</CardTitle>
          <CardDescription>{t('application.timeline.subtitle', 'تتبع حالة طلبك عبر خط زمني')}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-12">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-unlimited-blue" />
            <p className="text-unlimited-gray mt-4">{t('application.timeline.loading', 'جارٍ تحميل مسار الطلب...')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('application.timeline.title', 'مسار الطلب')}</CardTitle>
        <CardDescription>{t('application.timeline.subtitle', 'تتبع حالة طلبك عبر خط زمني')}</CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('application.timeline.noEventsTitle', 'لا توجد أحداث')}</AlertTitle>
            <AlertDescription>
              {t('application.timeline.noEventsDescription', 'لا توجد أحداث مسجلة لهذا الطلب بعد.')}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <div className={`absolute left-5 top-0 bottom-4 w-0.5 ${!isRtl ? 'mr-4' : 'ml-4'} ${getStatusColor(visibleEvents[0]?.status)}`}></div>
              {visibleEvents.map((event, index) => {
                const { formattedDate, formattedTime, relativeTime } = formatDate(event.date);
                const isLastItem = index === visibleEvents.length - 1 && (!hasMoreEvents || showAll);
                
                return (
                  <div key={event.id} className="relative mb-6 last:mb-0">
                    {!isLastItem && (
                      <div 
                        className={`absolute left-5 top-10 bottom-0 w-0.5 
                          ${index < visibleEvents.length - 1 ? getStatusColor(visibleEvents[index + 1]?.status) : 'bg-unlimited-gray'}`}
                      ></div>
                    )}
                    
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getStatusColor(event.status)} flex items-center justify-center text-white`}>
                        {getEventIcon(event.type, event.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                          <h4 className="font-medium text-unlimited-dark-blue">{event.title}</h4>
                          <div className="text-sm text-unlimited-gray whitespace-nowrap">
                            {formattedDate} - {formattedTime}
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-unlimited-gray text-sm mb-1">{event.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="bg-gray-50">
                            {relativeTime}
                          </Badge>
                          
                          {event.status && (
                            <Badge className={getStatusColor(event.status)}>
                              {t(`application.status.${event.status}`, event.status)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {hasMoreEvents && (
              <>
                <Separator />
                <div className="flex justify-center">
                  <Button 
                    variant="ghost" 
                    className="text-unlimited-blue"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        {t('application.timeline.showLess', 'عرض أقل')}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        {t('application.timeline.showMore', 'عرض المزيد')} ({events.length - 3})
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTimeline;
