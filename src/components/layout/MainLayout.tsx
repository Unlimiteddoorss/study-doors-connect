
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all z-50"
          size="icon"
          aria-label="العودة إلى الأعلى"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default MainLayout;
