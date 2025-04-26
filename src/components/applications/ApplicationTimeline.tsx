
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, FileText, MessageCircle, FileCheck } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'success' | 'error' | 'warning' | 'info' | 'pending';
  user: string;
  icon: 'check' | 'x' | 'clock' | 'file' | 'message' | 'file-check';
}

interface ApplicationTimelineProps {
  applicationId: string;
}

const ApplicationTimeline = ({ applicationId }: ApplicationTimelineProps) => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    // In a real app, this would fetch timeline events from an API
    const mockTimelineEvents: TimelineEvent[] = [
      {
        id: '1',
        date: '26/12/2024 09:16:14',
        title: t('application.timeline.created'),
        description: t('application.timeline.createdDescription'),
        status: 'info',
        user: 'محمد أحمد',
        icon: 'file',
      },
      {
        id: '2',
        date: '26/12/2024 14:30:22',
        title: t('application.timeline.documentsUploaded'),
        description: t('application.timeline.documentsUploadedDescription'),
        status: 'info',
        user: 'محمد أحمد',
        icon: 'file-check',
      },
      {
        id: '3',
        date: '27/12/2024 10:20:05',
        title: t('application.timeline.underReview'),
        description: t('application.timeline.underReviewDescription'),
        status: 'warning',
        user: 'جاسمين شاهين',
        icon: 'clock',
      },
      {
        id: '4',
        date: '28/12/2024 15:45:30',
        title: t('application.timeline.documentsRequested'),
        description: t('application.timeline.documentsRequestedDescription'),
        status: 'warning',
        user: 'جاسمين شاهين',
        icon: 'message',
      },
      {
        id: '5',
        date: '29/12/2024 11:10:18',
        title: t('application.timeline.documentsUploaded'),
        description: t('application.timeline.additionalDocumentsUploadedDescription'),
        status: 'info',
        user: 'محمد أحمد',
        icon: 'file-check',
      },
      {
        id: '6',
        date: '09/01/2025 04:23:51',
        title: t('application.timeline.conditionalAcceptance'),
        description: t('application.timeline.conditionalAcceptanceDescription'),
        status: 'success',
        user: 'جاسمين شاهين',
        icon: 'check',
      },
    ];

    setTimeout(() => {
      setEvents(mockTimelineEvents);
      setIsLoading(false);
    }, 500);
  }, [applicationId, t]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'check':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'x':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'clock':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'file':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'message':
        return <MessageCircle className="h-6 w-6 text-purple-500" />;
      case 'file-check':
        return <FileCheck className="h-6 w-6 text-teal-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'pending':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('application.timeline.title', 'مسار الطلب')}</CardTitle>
        <CardDescription>
          {t('application.timeline.subtitle', 'تتبع تقدم طلبك خطوة بخطوة')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-1 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Timeline events */}
            <div className="space-y-8">
              {events.map((event) => (
                <div key={event.id} className="relative flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white z-10">
                    {getIconComponent(event.icon)}
                  </div>
                  <div className={`flex-1 rounded-lg border p-4 ${getStatusColor(event.status)}`}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-sm font-medium text-unlimited-dark-blue">{event.title}</h4>
                        <p className="text-unlimited-gray text-xs">{event.user}</p>
                      </div>
                      <time className="text-xs text-unlimited-gray">{event.date}</time>
                    </div>
                    <p className="text-sm mt-2">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTimeline;
