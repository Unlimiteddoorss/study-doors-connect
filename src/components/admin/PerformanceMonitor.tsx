
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Gauge, 
  Clock, 
  MemoryStick, 
  Wifi,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

const PerformanceMonitor = () => {
  const { metrics, score, isGoodPerformance } = usePerformanceMonitor();

  const formatTime = (time: number) => {
    if (time < 1000) return `${Math.round(time)}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  const formatMemory = (memory: number) => {
    return `${memory.toFixed(1)} MB`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-unlimited-blue" />
          مراقبة الأداء
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* نقاط الأداء الإجمالية */}
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-600 mb-2">نقاط الأداء</div>
            <Badge className={getScoreBadgeColor(score)}>
              {isGoodPerformance ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  أداء ممتاز
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 mr-1" />
                  يحتاج تحسين
                </>
              )}
            </Badge>
            <Progress value={score} className="mt-3" />
          </div>

          {/* مقاييس مفصلة */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">وقت التحميل</span>
              </div>
              <div className="text-lg font-semibold">
                {formatTime(metrics.loadTime)}
              </div>
              <div className="text-xs text-gray-500">
                {metrics.loadTime < 1000 ? 'سريع جداً' :
                 metrics.loadTime < 2000 ? 'جيد' :
                 metrics.loadTime < 3000 ? 'متوسط' : 'بطيء'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">وقت الرندر</span>
              </div>
              <div className="text-lg font-semibold">
                {formatTime(metrics.renderTime)}
              </div>
              <div className="text-xs text-gray-500">
                {metrics.renderTime < 1000 ? 'سريع جداً' :
                 metrics.renderTime < 2000 ? 'جيد' : 'بطيء'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">استخدام الذاكرة</span>
              </div>
              <div className="text-lg font-semibold">
                {formatMemory(metrics.memoryUsage)}
              </div>
              <div className="text-xs text-gray-500">
                {metrics.memoryUsage < 50 ? 'ممتاز' :
                 metrics.memoryUsage < 100 ? 'جيد' : 'مرتفع'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">طلبات الشبكة</span>
              </div>
              <div className="text-lg font-semibold">
                {metrics.networkRequests}
              </div>
              <div className="text-xs text-gray-500">
                {metrics.networkRequests < 20 ? 'قليل' :
                 metrics.networkRequests < 50 ? 'متوسط' : 'كثير'}
              </div>
            </div>
          </div>

          {/* توصيات التحسين */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">توصيات التحسين:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {metrics.loadTime > 2000 && (
                <li>• قم بتحسين أوقات التحميل باستخدام lazy loading</li>
              )}
              {metrics.memoryUsage > 100 && (
                <li>• راقب استخدام الذاكرة وتجنب memory leaks</li>
              )}
              {metrics.networkRequests > 50 && (
                <li>• قلل عدد طلبات الشبكة عبر تجميع الموارد</li>
              )}
              {score >= 80 && (
                <li>✓ الأداء ممتاز! استمر بهذا المستوى</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMonitor;
