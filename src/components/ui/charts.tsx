
import React from "react";
import { BarChart as RechartsBarChart, LineChart as RechartsLineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#3B82F6", "#60A5FA", "#93C5FD"],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
          {...props}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={index} 
            angle={-45} 
            textAnchor="end" 
            tick={{ fontSize: 12 }}
            height={60}
          />
          <YAxis />
          <Tooltip formatter={(value) => valueFormatter(value as number)} />
          <Legend />
          {categories.map((category, i) => (
            <Bar 
              key={category} 
              dataKey={category} 
              fill={colors[i % colors.length]} 
              name={category}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#3B82F6", "#60A5FA", "#93C5FD"],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          {...props}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={index} />
          <YAxis />
          <Tooltip formatter={(value) => valueFormatter(value as number)} />
          <Legend />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              name={category}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
