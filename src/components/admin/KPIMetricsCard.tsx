
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart } from '@/components/ui/chart';
import { ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface KPIMetricsCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  percentageChange: number;
  timeRanges: { value: string; label: string }[];
  chartData: { [key: string]: { name: string; value: number }[] };
  valuePrefix?: string;
  valueSuffix?: string;
}

const KPIMetricsCard = ({
  title,
  currentValue,
  previousValue,
  percentageChange,
  timeRanges,
  chartData,
  valuePrefix = '',
  valueSuffix = '',
}: KPIMetricsCardProps) => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0].value);
  const isPositive = percentageChange >= 0;

  const numberFormatter = new Intl.NumberFormat('ar-SA');
  
  const formattedValue = `${valuePrefix}${numberFormatter.format(currentValue)}${valueSuffix}`;
  const formattedPreviousValue = `${valuePrefix}${numberFormatter.format(previousValue)}${valueSuffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-unlimited-dark-blue">{title}</h3>
            <div className="flex gap-1">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={selectedRange === range.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedRange(range.value)}
                  className="h-7 px-2.5 text-xs"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{formattedValue}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-unlimited-gray">مقارنة بـ </span>
                  <span className="text-sm font-medium">{formattedPreviousValue}</span>
                </div>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "flex items-center px-2.5 py-1 rounded-full text-sm",
                      isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                      {Math.abs(percentageChange)}%
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPositive ? 'زيادة' : 'انخفاض'} بنسبة {Math.abs(percentageChange)}% مقارنة بالفترة السابقة</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        <div className="px-6 pt-0 pb-4">
          <LineChart
            data={chartData[selectedRange]}
            index="name"
            categories={["value"]}
            colors={[isPositive ? "green" : "red"]}
            valueFormatter={(value: number) => `${valuePrefix}${value}${valueSuffix}`}
            className="h-36"
          />
        </div>
        
        {isPositive && (
          <div className="px-6 pb-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-sm text-unlimited-success"
            >
              <Sparkles className="h-4 w-4" />
              <span>أداء جيد مقارنة بالمتوسط</span>
            </motion.div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default KPIMetricsCard;
