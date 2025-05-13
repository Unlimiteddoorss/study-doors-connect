
import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  formatter?: (value: number) => string;
  onComplete?: () => void;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const CountUp = ({
  start = 0,
  end,
  duration = 2000,
  formatter = (value) => Math.round(value).toString(),
  onComplete,
  suffix = '',
  prefix = '',
  className = '',
}: CountUpProps) => {
  const [count, setCount] = useState(start);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const isCompletedRef = useRef<boolean>(false);

  useEffect(() => {
    startTimeRef.current = undefined;
    isCompletedRef.current = false;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      
      const percentage = Math.min(progress / duration, 1);
      const currentCount = start + (end - start) * percentage;
      
      setCount(currentCount);
      
      if (percentage < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else if (!isCompletedRef.current) {
        isCompletedRef.current = true;
        onComplete?.();
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [start, end, duration, onComplete]);
  
  return (
    <span className={className}>
      {prefix}{formatter(count)}{suffix}
    </span>
  );
};

export default CountUp;
