
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
  showBelow?: number;
  className?: string;
}

const ScrollToTop = ({ showBelow = 500, className }: ScrollToTopProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showBelow) {
        if (!show) setShow(true);
      } else {
        if (show) setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [show, showBelow]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={cn(
        "fixed bottom-8 right-8 p-3 rounded-full bg-unlimited-blue text-white shadow-lg z-50 transition-all duration-300 hover:bg-unlimited-dark-blue transform hover:scale-110",
        show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none",
        className
      )}
      onClick={handleClick}
      aria-label="إلى الأعلى"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTop;
