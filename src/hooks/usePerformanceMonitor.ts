
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkRequests: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkRequests: 0
  });

  useEffect(() => {
    // قياس وقت التحميل
    const measureLoadTime = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        setMetrics(prev => ({ ...prev, loadTime }));
      }
    };

    // قياس وقت الرندر
    const measureRenderTime = () => {
      const paintTiming = performance.getEntriesByType('paint');
      const firstContentfulPaint = paintTiming.find(entry => entry.name === 'first-contentful-paint');
      if (firstContentfulPaint) {
        setMetrics(prev => ({ ...prev, renderTime: firstContentfulPaint.startTime }));
      }
    };

    // قياس استخدام الذاكرة
    const measureMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // تحويل إلى MB
        setMetrics(prev => ({ ...prev, memoryUsage }));
      }
    };

    // قياس طلبات الشبكة
    const measureNetworkRequests = () => {
      const resources = performance.getEntriesByType('resource');
      setMetrics(prev => ({ ...prev, networkRequests: resources.length }));
    };

    // تشغيل القياسات
    setTimeout(() => {
      measureLoadTime();
      measureRenderTime();
      measureMemoryUsage();
      measureNetworkRequests();
    }, 1000);

    // مراقبة مستمرة للذاكرة
    const memoryInterval = setInterval(measureMemoryUsage, 5000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  const getPerformanceScore = () => {
    const { loadTime, renderTime, memoryUsage } = metrics;
    
    // حساب نقاط الأداء (0-100)
    let score = 100;
    
    // خصم نقاط بناءً على وقت التحميل
    if (loadTime > 3000) score -= 30;
    else if (loadTime > 2000) score -= 20;
    else if (loadTime > 1000) score -= 10;
    
    // خصم نقاط بناءً على وقت الرندر
    if (renderTime > 2000) score -= 20;
    else if (renderTime > 1000) score -= 10;
    
    // خصم نقاط بناءً على استخدام الذاكرة
    if (memoryUsage > 100) score -= 20;
    else if (memoryUsage > 50) score -= 10;
    
    return Math.max(score, 0);
  };

  return {
    metrics,
    score: getPerformanceScore(),
    isGoodPerformance: getPerformanceScore() >= 80
  };
};
