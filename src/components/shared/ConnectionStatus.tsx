
import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Function to update online status
    const updateOnlineStatus = () => {
      const status = navigator.onLine;
      
      if (status !== isOnline) {
        setIsOnline(status);
        
        if (status) {
          toast({
            title: "متصل بالإنترنت",
            description: "تم استعادة الاتصال بالإنترنت.",
            variant: "default",
          });
        } else {
          toast({
            title: "غير متصل بالإنترنت",
            description: "أنت غير متصل بالإنترنت. بعض الميزات قد لا تعمل.",
            variant: "destructive",
          });
        }
      }
    };

    // Add event listeners
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    // Clean up
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isOnline]);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-500 text-white p-2 rounded-lg shadow-lg flex items-center">
      <WifiOff className="h-4 w-4 ml-2" />
      <span className="text-sm">غير متصل بالإنترنت</span>
    </div>
  );
}
