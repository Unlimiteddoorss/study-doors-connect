
import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we're online when the component mounts
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "تم استعادة الاتصال بالإنترنت",
        description: "يمكنك الآن استخدام جميع ميزات التطبيق.",
        variant: "default",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "أنت غير متصل بالإنترنت",
        description: "يمكنك مشاهدة المحتوى المحفوظ مسبقاً فقط.",
        variant: "destructive",
      });
    };

    // Add event listeners for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-8 md:right-auto flex items-center p-3 bg-amber-50 border border-amber-200 rounded-lg shadow-lg z-50">
      <WifiOff className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
      <div className="flex-1">
        <p className="text-amber-800 font-medium text-sm">أنت حاليا غير متصل بالإنترنت</p>
        <p className="text-amber-600 text-xs">يمكنك مشاهدة المحتوى المحفوظ مسبقاً فقط</p>
      </div>
    </div>
  );
};

export default OfflineSupport;
