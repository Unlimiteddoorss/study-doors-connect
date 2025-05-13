
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsAppInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for app install
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      toast({
        title: "تم التثبيت",
        description: "تم تثبيت التطبيق بنجاح! يمكنك الآن الوصول إليه من شاشة البداية.",
      });
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      toast({
        title: "جاري التثبيت",
        description: "جاري تثبيت التطبيق على جهازك...",
      });
    } else {
      toast({
        title: "تم الإلغاء",
        description: "يمكنك تثبيت التطبيق في وقت لاحق.",
        variant: "destructive",
      });
    }
    
    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
  };

  if (isAppInstalled || !deferredPrompt) return null;

  return (
    <Button 
      onClick={handleInstallClick} 
      variant="outline" 
      size="sm"
      className="fixed bottom-4 left-4 z-50 shadow-lg bg-unlimited-blue text-white hover:bg-unlimited-dark-blue"
    >
      <Download className="h-4 w-4 ml-2" />
      تثبيت التطبيق
    </Button>
  );
}
