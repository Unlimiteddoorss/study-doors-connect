
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils/dateUtils';
import { generateMockTimeline } from '@/utils/applicationUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, AlertCircle, FileCheck2, FileSearch, FileWarning, FileX2, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TimelineEvent {
  id: string;
  application_id: string;
  status: string;
  created_at: string;
  note?: string;
  created_by?: string;
}

interface ApplicationTimelineProps {
  applicationId: string;
}

const ApplicationTimeline = ({ applicationId }: ApplicationTimelineProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      setIsLoading(true);
      
      try {
        // Try to fetch from Supabase if connected
        const { data, error } = await supabase
          .from('timeline')
          .select('*')
          .eq('application_id', applicationId)
          .order('created_at', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          // Convert id to string for type consistency
          const formattedData: TimelineEvent[] = data.map(item => ({
            ...item,
            id: String(item.id) // Convert number id to string
          }));
          setTimelineEvents(formattedData);
        } else {
          // Use mock data for demonstration
          const application = JSON.parse(localStorage.getItem('studentApplications') || '[]')
            .find((app: any) => app.id === applicationId);
            
          const mockTimeline = generateMockTimeline(
            applicationId, 
            application?.status || 'submitted'
          );
          
          setTimelineEvents(mockTimeline);
        }
      } catch (err) {
        console.error('Error fetching timeline:', err);
        
        // Use mock data for demonstration
        const application = JSON.parse(localStorage.getItem('studentApplications') || '[]')
          .find((app: any) => app.id === applicationId);
          
        const mockTimeline = generateMockTimeline(
          applicationId, 
          application?.status || 'submitted'
        );
        
        setTimelineEvents(mockTimeline);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTimeline();
  }, [applicationId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Send className="h-5 w-5 text-unlimited-blue" />;
      case 'documents':
        return <FileCheck2 className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'review':
        return <FileSearch className="h-5 w-5 text-unlimited-blue" />;
      case 'conditional':
        return <FileWarning className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <FileX2 className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-unlimited-gray" />;
    }
  };

  const getStatusTitle = (status: string) => {
    switch (status) {
      case 'submitted':
        return t('application.status.submitted', 'تم تقديم الطلب');
      case 'documents':
        return t('application.status.documents', 'مراجعة المستندات');
      case 'pending':
        return t('application.status.pending', 'قيد الانتظار');
      case 'review':
        return t('application.status.review', 'مراجعة الطلب');
      case 'conditional':
        return t('application.status.conditional', 'قبول مشروط');
      case 'approved':
        return t('application.status.approved', 'تم القبول');
      case 'rejected':
        return t('application.status.rejected', 'تم الرفض');
      default:
        return t('application.status.unknown', 'حالة غير معروفة');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-unlimited-light-blue border-unlimited-blue';
      case 'documents':
      case 'pending':
      case 'conditional':
        return 'bg-yellow-50 border-yellow-200';
      case 'review':
        return 'bg-unlimited-light-blue border-unlimited-blue';
      case 'approved':
        return 'bg-green-50 border-green-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("application.timeline.title", "مسار الطلب")}</CardTitle>
        <CardDescription>
          {t("application.timeline.subtitle", "تتبع حالة طلبك ومراحل المعالجة")}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
          </div>
        ) : timelineEvents.length === 0 ? (
          <div className="text-center text-unlimited-gray py-8">
            {t("application.timeline.noEvents", "لا توجد أحداث لعرضها")}
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200"></div>
            
            {/* Timeline events */}
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute left-5 top-1.5 w-4 h-4 rounded-full border-2 border-white ${
                    index === timelineEvents.length - 1 
                      ? 'bg-unlimited-blue' 
                      : 'bg-gray-200'
                  }`}></div>
                  
                  {/* Event content */}
                  <div className="ml-12">
                    <div className={`p-4 rounded-md border ${getStatusColor(event.status)}`}>
                      <div className="flex items-start gap-3">
                        {getStatusIcon(event.status)}
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="font-medium">{getStatusTitle(event.status)}</h4>
                            <span className="text-sm text-unlimited-gray">
                              {formatDate(event.created_at, true)}
                            </span>
                          </div>
                          
                          {event.note && (
                            <p className="text-unlimited-gray">{event.note}</p>
                          )}
                        </div>
                      </div>
                    </div>
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
