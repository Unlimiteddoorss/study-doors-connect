
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare,
  UserCheck,
  Building2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ActivityItem {
  id: string;
  type: 'application' | 'approval' | 'rejection' | 'message' | 'student' | 'university';
  title: string;
  description: string;
  user: {
    name: string;
    initials: string;
  };
  timestamp: Date;
  status?: 'success' | 'warning' | 'error' | 'info';
}

const RecentActivityFeed = () => {
  // بيانات تجريبية للأنشطة الحديثة
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'application',
      title: 'طلب جديد للتقديم',
      description: 'أحمد محمد قدم طلب للالتحاق ببرنامج هندسة البرمجيات',
      user: { name: 'أحمد محمد', initials: 'أم' },
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 دقيقة مضت
      status: 'info'
    },
    {
      id: '2',
      type: 'approval',
      title: 'قبول طلب',
      description: 'تم قبول طلب فاطمة علي للالتحاق بجامعة إسطنبول',
      user: { name: 'فاطمة علي', initials: 'فع' },
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 دقيقة مضت
      status: 'success'
    },
    {
      id: '3',
      type: 'message',
      title: 'رسالة جديدة',
      description: 'محمد خالد أرسل رسالة بخصوص حالة طلبه',
      user: { name: 'محمد خالد', initials: 'مخ' },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // ساعتين مضت
      status: 'warning'
    },
    {
      id: '4',
      type: 'student',
      title: 'طالب جديد',
      description: 'انضم سارة أحمد إلى النظام كطالبة جديدة',
      user: { name: 'سارة أحمد', initials: 'سأ' },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 ساعات مضت
      status: 'success'
    },
    {
      id: '5',
      type: 'rejection',
      title: 'رفض طلب',
      description: 'تم رفض طلب علي حسن لعدم استكمال المستندات',
      user: { name: 'علي حسن', initials: 'عح' },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 ساعات مضت
      status: 'error'
    },
    {
      id: '6',
      type: 'university',
      title: 'جامعة جديدة',
      description: 'تم إضافة جامعة أنقرة الجديدة إلى النظام',
      user: { name: 'مدير النظام', initials: 'من' },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // يوم مضى
      status: 'info'
    }
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'application':
        return <FileText className="h-4 w-4" />;
      case 'approval':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejection':
        return <XCircle className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'student':
        return <UserCheck className="h-4 w-4" />;
      case 'university':
        return <Building2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-unlimited-blue" />
          الأنشطة الأخيرة
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-1 p-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-unlimited-light-blue text-unlimited-blue">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-2 py-1 ${getStatusColor(activity.status)}`}
                      >
                        {getActivityIcon(activity.type)}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 line-clamp-2 mb-1">
                    {activity.description}
                  </p>
                  
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true, 
                      locale: ar 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivityFeed;
