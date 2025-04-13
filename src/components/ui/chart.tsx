
import React from 'react';
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export interface PieChartProps extends Omit<ChartProps, 'categories'> {
  category: string;
}

export function AreaChart({
  data,
  index,
  categories,
  colors = ['blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'gray'],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: ChartProps) {
  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#22c55e',
    red: '#ef4444',
    yellow: '#eab308',
    purple: '#a855f7',
    indigo: '#6366f1',
    pink: '#ec4899',
    gray: '#9ca3af',
  };

  return (
    <div className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={valueFormatter}
            contentStyle={{ borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          />
          {categories.map((category, i) => (
            <Area
              key={category}
              dataKey={category}
              fill={colorMap[colors[i % colors.length]]}
              stroke={colorMap[colors[i % colors.length]]}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChart({
  data,
  index,
  categories,
  colors = ['blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'gray'],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: ChartProps) {
  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#22c55e',
    red: '#ef4444',
    yellow: '#eab308',
    purple: '#a855f7',
    indigo: '#6366f1',
    pink: '#ec4899',
    gray: '#9ca3af',
  };

  return (
    <div className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={valueFormatter}
            contentStyle={{ borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colorMap[colors[i % colors.length]]}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
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
  colors = ['blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'gray'],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: ChartProps) {
  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#22c55e',
    red: '#ef4444',
    yellow: '#eab308',
    purple: '#a855f7',
    indigo: '#6366f1',
    pink: '#ec4899',
    gray: '#9ca3af',
  };

  return (
    <div className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={valueFormatter}
            contentStyle={{ borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colorMap[colors[i % colors.length]]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChart({
  data,
  index,
  category,
  colors = ['blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'gray'],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: PieChartProps) {
  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#22c55e',
    red: '#ef4444',
    yellow: '#eab308',
    purple: '#a855f7',
    indigo: '#6366f1',
    pink: '#ec4899',
    gray: '#9ca3af',
  };

  const chartColors = colors.map((color) => colorMap[color] || color);

  return (
    <div className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={chartColors[i % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => valueFormatter(Number(value))}
            contentStyle={{ borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
