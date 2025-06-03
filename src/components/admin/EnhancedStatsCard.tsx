
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedStatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon: React.ReactNode;
  description?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  loading?: boolean;
}

const EnhancedStatsCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  description, 
  color = 'blue',
  loading = false 
}: EnhancedStatsCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case 'increase':
        return <TrendingUp className="h-3 w-3" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    if (!change) return '';
    
    switch (change.type) {
      case 'increase':
        return 'text-green-600 bg-green-100';
      case 'decrease':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </CardTitle>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
            {title}
          </CardTitle>
          <div className={cn('p-2 rounded-md transition-colors group-hover:scale-110', colorClasses[color])}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString('ar-SA') : value}
          </div>
          
          <div className="flex items-center justify-between">
            {description && (
              <p className="text-xs text-gray-500 flex-1">{description}</p>
            )}
            
            {change && (
              <Badge variant="secondary" className={cn('text-xs flex items-center gap-1', getTrendColor())}>
                {getTrendIcon()}
                {Math.abs(change.value)}%
                <span className="text-gray-500">({change.period})</span>
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedStatsCard;
