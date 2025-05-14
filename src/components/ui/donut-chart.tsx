

import * as React from "react";
import { PieChart } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface DonutChartProps {
  data: { name: string; value: number }[];
  index?: string;
  category?: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  animationEnabled?: boolean;
  showLabel?: boolean;
  label?: React.ReactNode;
}

export const DonutChart = ({
  data,
  index = "name",
  category = "value",
  colors = ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#9b59b6", "#1abc9c", "#34495e", "#e67e22"],
  valueFormatter = (value: number) => value.toString(),
  className,
  animationEnabled = true,
  showLabel = true,
  label,
}: DonutChartProps) => {
  const total = React.useMemo(
    () => data.reduce((acc, item) => {
      const value = Number(item[category as keyof typeof item] || 0);
      return acc + value;
    }, 0),
    [data, category]
  );

  return (
    <div className={cn("relative", className)}>
      <PieChart
        data={data}
        index={index}
        category={category}
        colors={colors}
        valueFormatter={valueFormatter}
        className="mx-auto"
      />
      
      {showLabel && (
        <motion.div
          initial={animationEnabled ? { opacity: 0, scale: 0.8 } : false}
          animate={animationEnabled ? { opacity: 1, scale: 1 } : false}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          {label || (
            <>
              <p className="text-3xl font-bold">{valueFormatter(total)}</p>
              <p className="text-sm text-unlimited-gray">Total</p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

