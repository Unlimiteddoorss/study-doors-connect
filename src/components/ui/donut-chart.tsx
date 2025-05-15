
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: { name: string; value: number; }[];
  index: string;
  category?: string; // Support for single category
  categories?: string[]; // Support for multiple categories
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function DonutChart({
  data,
  index,
  category = "value", // Default to "value" if not specified
  colors = ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: DonutChartProps) {
  // Generate additional colors if needed
  const extendedColors = [...colors];
  if (data.length > colors.length) {
    const additionalColors = Array.from({ length: data.length - colors.length }, (_, i) => {
      const hue = (360 / data.length) * (i + colors.length);
      return `hsl(${hue}, 70%, 60%)`;
    });
    extendedColors.push(...additionalColors);
  }

  const renderColorfulLegendText = (value: string) => {
    return <span className="text-sm">{value}</span>;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-unlimited-blue">{valueFormatter(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            innerRadius="60%"
            dataKey={category}
            nameKey={index}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={extendedColors[index % extendedColors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={renderColorfulLegendText}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
