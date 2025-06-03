
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Server, 
  Database, 
  Wifi, 
  Shield, 
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SystemMetric {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  value?: number;
  description: string;
  icon: React.ReactNode;
}

const SystemHealthWidget = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: 'خادم التطبيق',
      status: 'healthy',
      value: 95,
      description: 'يعمل بكفاءة عالية',
      icon: <Server className="h-4 w-4" />
    },
    {
      name: 'قاعدة البيانات',
      status: 'healthy',
      value: 88,
      description: 'الاتصال مستقر',
      icon: <Database className="h-4 w-4" />
    },
    {
      name: 'الاتصال بالإنترنت',
      status: 'healthy',
      value: 98,
      description: 'سرعة ممتازة',
      icon: <Wifi className="h-4 w-4" />
    },
    {
      name: 'الأمان',
      status: 'warning',
      value: 75,
      description: 'تحديث مطلوب',
      icon: <Shield className="h-4 w-4" />
    }
  ]);

  const [systemLoad, setSystemLoad] = useState(67);

  useEffect(() => {
    // محاكاة تحديث البيانات كل 30 ثانية
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(50, Math.min(100, (metric.value || 0) + (Math.random() - 0.5) * 10))
      })));
      
      setSystemLoad(prev => Math.max(30, Math.min(100, prev + (Math.random() - 0.5) * 15)));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-3 w-3" />;
      case 'warning':
      case 'error':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Activity className="h-3 w-3" />;
    }
  };

  const overallHealth = metrics.reduce((acc, metric) => acc + (metric.value || 0), 0) / metrics.length;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-unlimited-blue" />
            حالة النظام
          </div>
          <Badge 
            variant="secondary" 
            className={overallHealth > 85 ? 'bg-green-100 text-green-800' : 
                      overallHealth > 70 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
          >
            {overallHealth.toFixed(0)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* إجمالي حمولة النظام */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">حمولة النظام الإجمالية</span>
            <span className="font-medium">{systemLoad}%</span>
          </div>
          <Progress 
            value={systemLoad} 
            className="h-2"
          />
        </div>

        {/* مقاييس النظام */}
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${getStatusColor(metric.status)}`}>
                  {metric.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(metric.status)} flex items-center gap-1`}
                    >
                      {getStatusIcon(metric.status)}
                      {metric.status === 'healthy' ? 'سليم' : 
                       metric.status === 'warning' ? 'تحذير' : 'خطأ'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
              
              {metric.value && (
                <div className="text-right">
                  <div className="text-sm font-bold">{metric.value.toFixed(0)}%</div>
                  <Progress 
                    value={metric.value} 
                    className="h-1 w-16"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* معلومات إضافية */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700 mb-1">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">آخر فحص للنظام</span>
          </div>
          <p className="text-xs text-blue-600">
            تم إجراء آخر فحص شامل للنظام منذ 5 دقائق - جميع الخدمات تعمل بشكل طبيعي
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealthWidget;
