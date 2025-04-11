
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ArrowUp, Bell, Globe, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ar');
  const [unreadNotifications, setUnreadNotifications] = useState(2); // عدد الإشعارات غير المقروءة (للعرض فقط)

  const checkScrollPosition = () => {
    if (window.scrollY > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    // This function would typically update the app's language context
    // or localStorage setting to persist the language preference
    console.log(`Language changed to: ${lang}`);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        {/* زر المساعدة الطافي */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
                size="icon"
                aria-label="تحدث مع مستشار"
                onClick={() => window.location.href = '/contact'}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>تحدث مع مستشار تعليمي</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* زر الإشعارات */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all relative"
                size="icon"
                aria-label="الإشعارات"
                onClick={() => window.location.href = '/dashboard/notifications'}
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>الإشعارات</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* زر تغيير اللغة */}
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
                    size="icon"
                    aria-label="تغيير اللغة"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>تغيير اللغة</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="min-w-[150px]">
            <DropdownMenuItem 
              onClick={() => changeLanguage('ar')} 
              className={`gap-2 ${currentLanguage === 'ar' ? 'bg-unlimited-blue/10' : ''}`}
            >
              <span className="text-sm">العربية</span>
              {currentLanguage === 'ar' && <span className="h-2 w-2 rounded-full bg-unlimited-blue"></span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => changeLanguage('en')} 
              className={`gap-2 ${currentLanguage === 'en' ? 'bg-unlimited-blue/10' : ''}`}
            >
              <span className="text-sm">English</span>
              {currentLanguage === 'en' && <span className="h-2 w-2 rounded-full bg-unlimited-blue"></span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => changeLanguage('tr')} 
              className={`gap-2 ${currentLanguage === 'tr' ? 'bg-unlimited-blue/10' : ''}`}
            >
              <span className="text-sm">Türkçe</span>
              {currentLanguage === 'tr' && <span className="h-2 w-2 rounded-full bg-unlimited-blue"></span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* زر العودة إلى الأعلى */}
        {showScrollTop && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={scrollToTop}
                  className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
                  size="icon"
                  aria-label="العودة إلى الأعلى"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>العودة إلى الأعلى</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
