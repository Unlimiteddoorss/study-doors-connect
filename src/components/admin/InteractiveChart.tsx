
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  BarChart, 
  LineChart, 
  DonutChart 
} from '@/components/ui/chart';
import { 
  ArrowUpRight, 
  Download, 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  AreaChart as AreaChartIcon, 
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface ChartData {
  [period: string]: any[];
}

interface InteractiveChartProps {
  title: string;
  description?: string;
  chartData: ChartData;
  periods: string[];
  chartTypes?: ('line' | 'bar' | 'area' | 'donut')[];
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  index: string;
  className?: string;
  isLoading?: boolean;
  showFullScreenButton?: boolean;
  showDownloadButton?: boolean;
  showBadge?: boolean;
  badgeText?: string;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  title,
  description,
  chartData,
  periods,
  chartTypes = ['line', 'bar', 'area'],
  categories,
  colors = ['blue', 'green', 'orange', 'purple', 'yellow'],
  valueFormatter = (value) => `${value}`,
  index,
  className,
  isLoading = false,
  showFullScreenButton = true,
  showDownloadButton = true,
  showBadge = false,
  badgeText = 'تحديث',
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area' | 'donut'>(chartTypes[0]);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportChart = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
    }, 1500);
  };

  const chartIconMap = {
    'line': <LineChartIcon className="h-4 w-4" />,
    'bar': <BarChart3 className="h-4 w-4" />,
    'area': <AreaChartIcon className="h-4 w-4" />,
    'donut': <PieChartIcon className="h-4 w-4" />
  };

  const renderChartComponent = () => {
    const currentData = chartData[selectedPeriod];
    
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-unlimited-blue" />
          <p className="mt-2 text-sm text-unlimited-gray">جاري تحميل البيانات...</p>
        </div>
      );
    }

    switch (chartType) {
      case 'area':
        return (
          <AreaChart
            data={currentData}
            index={index}
            categories={categories}
            colors={colors}
            valueFormatter={valueFormatter}
            className="h-64"
            showLegend
            showAnimation
            startEndOnly
            curveType="natural"
          />
        );
      case 'bar':
        return (
          <BarChart
            data={currentData}
            index={index}
            categories={categories}
            colors={colors}
            valueFormatter={valueFormatter}
            className="h-64"
            showLegend
            showAnimation
          />
        );
      case 'donut':
        return (
          <DonutChart
            data={currentData}
            category="value"
            index={index}
            valueFormatter={valueFormatter}
            className="h-64"
            showLabel
            showAnimation
            colors={colors}
          />
        );
      case 'line':
      default:
        return (
          <LineChart
            data={currentData}
            index={index}
            categories={categories}
            colors={colors}
            valueFormatter={valueFormatter}
            className="h-64"
            showLegend
            showAnimation
            startEndOnly
            curveType="natural"
          />
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{title}</CardTitle>
              {showBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge variant="unlimited-outline" className="text-xs">
                    <ArrowUpRight className="ml-1 h-3 w-3" /> {badgeText}
                  </Badge>
                </motion.div>
              )}
            </div>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          
          <div className="flex items-center gap-2">
            {chartTypes.length > 1 && (
              <div className="flex bg-muted rounded-md p-1">
                {chartTypes.map((type) => (
                  <Button
                    key={type}
                    size="icon"
                    variant={chartType === type ? 'default' : 'ghost'}
                    className="h-8 w-8"
                    onClick={() => setChartType(type)}
                  >
                    {chartIconMap[type]}
                  </Button>
                ))}
              </div>
            )}
            
            <div className="flex gap-1">
              {showDownloadButton && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleExportChart}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {periods.length > 1 && (
          <Tabs 
            defaultValue={selectedPeriod} 
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-4">
              {periods.map((period) => (
                <TabsTrigger key={period} value={period} className="text-xs">
                  {period}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      
      <CardContent className="pt-2">
        <motion.div
          key={`${selectedPeriod}-${chartType}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {renderChartComponent()}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default InteractiveChart;
