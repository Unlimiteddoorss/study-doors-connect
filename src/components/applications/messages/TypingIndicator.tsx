
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TypingIndicatorProps {
  isTyping?: boolean;
  name?: string;
  className?: string;
}

const TypingIndicator = ({ 
  isTyping = false, 
  name, 
  className 
}: TypingIndicatorProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isTyping) {
      setVisible(true);
    } else {
      // Small delay before hiding to prevent flickering when typing is intermittent
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isTyping]);
  
  if (!visible) return null;
  
  return (
    <div 
      className={cn(
        "flex items-center text-sm text-unlimited-gray py-1 px-2 animate-fade-in",
        className
      )}
    >
      <div className="flex items-center justify-center gap-1 mr-2">
        <span className="w-1.5 h-1.5 bg-unlimited-blue rounded-full animate-[pulse_1.2s_ease-in-out_infinite]"></span>
        <span className="w-1.5 h-1.5 bg-unlimited-blue rounded-full animate-[pulse_1.2s_ease-in-out_0.4s_infinite]"></span>
        <span className="w-1.5 h-1.5 bg-unlimited-blue rounded-full animate-[pulse_1.2s_ease-in-out_0.8s_infinite]"></span>
      </div>
      {name && <span>{name} يكتب الآن...</span>}
      {!name && <span>جاري الكتابة...</span>}
    </div>
  );
};

export default TypingIndicator;
