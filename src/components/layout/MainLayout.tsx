
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ArrowUp, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ar');

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
              size="icon"
              aria-label="تغيير اللغة"
            >
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage('ar')} className={currentLanguage === 'ar' ? 'bg-unlimited-blue/10' : ''}>
              العربية
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('en')} className={currentLanguage === 'en' ? 'bg-unlimited-blue/10' : ''}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('tr')} className={currentLanguage === 'tr' ? 'bg-unlimited-blue/10' : ''}>
              Türkçe
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
            size="icon"
            aria-label="العودة إلى الأعلى"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
