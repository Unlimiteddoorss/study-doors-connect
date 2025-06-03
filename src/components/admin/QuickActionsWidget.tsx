
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  UserPlus, 
  FileText, 
  Bell, 
  Settings, 
  Download,
  Mail,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const QuickActionsWidget = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickActions = [
    {
      title: 'طالب جديد',
      description: 'إضافة طالب جديد للنظام',
      icon: <UserPlus className="h-4 w-4" />,
      action: () => navigate('/admin/students'),
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      urgent: false
    },
    {
      title: 'مراجعة الطلبات',
      description: 'طلبات تحتاج مراجعة',
      icon: <FileText className="h-4 w-4" />,
      action: () => navigate('/admin/applications'),
      color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
      urgent: true,
      badge: '12'
    },
    {
      title: 'إشعار جماعي',
      description: 'إرسال إشعار لجميع الطلاب',
      icon: <Bell className="h-4 w-4" />,
      action: () => {
        toast({
          title: "إشعار جماعي",
          description: "تم فتح نافذة الإشعارات الجماعية"
        });
      },
      color: 'bg-green-50 text-green-600 hover:bg-green-100',
      urgent: false
    },
    {
      title: 'تقرير سريع',
      description: 'تصدير تقرير للبيانات الحالية',
      icon: <Download className="h-4 w-4" />,
      action: () => {
        toast({
          title: "تصدير التقرير",
          description: "جاري تحضير التقرير للتحميل..."
        });
      },
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      urgent: false
    },
    {
      title: 'رسائل الطلاب',
      description: 'عرض وإدارة رسائل الطلاب',
      icon: <Mail className="h-4 w-4" />,
      action: () => navigate('/admin/messages'),
      color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
      urgent: false,
      badge: '8'
    },
    {
      title: 'جدولة موعد',
      description: 'إضافة موعد جديد للتقويم',
      icon: <Calendar className="h-4 w-4" />,
      action: () => {
        toast({
          title: "جدولة موعد",
          description: "تم فتح نافذة إضافة الموعد"
        });
      },
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
      urgent: false
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5 text-unlimited-blue" />
          إجراءات سريعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-start text-right relative group transition-all duration-200 ${action.color}`}
              onClick={action.action}
            >
              {action.urgent && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
              
              {action.badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -left-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {action.badge}
                </Badge>
              )}
              
              <div className="flex items-center gap-2 mb-2 w-full">
                {action.icon}
                <span className="font-medium text-sm">{action.title}</span>
              </div>
              
              <p className="text-xs text-gray-500 text-right leading-relaxed">
                {action.description}
              </p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsWidget;
