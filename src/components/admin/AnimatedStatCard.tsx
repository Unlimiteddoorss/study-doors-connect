
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradientFrom: string;
  gradientTo: string;
  className?: string;
}

const AnimatedStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  gradientFrom,
  gradientTo,
  className,
}: AnimatedStatCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        `relative overflow-hidden rounded-xl border p-6 shadow-sm`,
        `bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`,
        className
      )}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-100 opacity-70">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <h3 className="text-2xl font-bold text-white">{value}</h3>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-green-300' : 'text-red-300'
                }`}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-2 text-sm text-white/70">{description}</p>
          )}
        </div>
        <div className="rounded-full bg-white/10 p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      
      {/* Background pattern for visual interest */}
      <div className="absolute -bottom-2 -right-2 h-24 w-24 opacity-20">
        <div className="absolute h-full w-full rotate-12 scale-125 rounded-full border-4 border-white/20" />
        <div className="absolute h-full w-full rotate-45 scale-110 rounded-full border-4 border-white/20" />
      </div>
    </motion.div>
  );
};

export default AnimatedStatCard;
