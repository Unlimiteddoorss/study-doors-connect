
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  titleClassName?: string;
};

const StatsCard = ({
  title,
  value,
  icon,
  className,
  iconClassName,
  valueClassName,
  titleClassName,
}: StatsCardProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow p-6 flex flex-col items-center', className)}>
      {icon && <div className={cn('text-unlimited-blue mb-3', iconClassName)}>{icon}</div>}
      <div className={cn('text-3xl font-bold text-unlimited-dark-blue mb-2', valueClassName)}>
        {value}
      </div>
      <div className={cn('text-unlimited-gray text-sm', titleClassName)}>{title}</div>
    </div>
  );
};

export default StatsCard;
