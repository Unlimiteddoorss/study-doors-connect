
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  centered?: boolean;
};

const SectionTitle = ({
  title,
  subtitle,
  action,
  className,
  titleClassName,
  subtitleClassName,
  centered = false,
}: SectionTitleProps) => {
  return (
    <div 
      className={cn(
        'mb-8 flex flex-col md:flex-row md:items-end md:justify-between',
        centered && 'text-center md:flex-col md:items-center',
        className
      )}
    >
      <div>
        <h2 
          className={cn(
            'text-2xl md:text-3xl font-bold text-unlimited-dark-blue',
            titleClassName
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p 
            className={cn(
              'mt-2 text-unlimited-gray',
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className={cn('mt-4 md:mt-0', centered && 'md:mt-4')}>{action}</div>
      )}
    </div>
  );
};

export default SectionTitle;
