
import { Bar } from "recharts";
import { BarChart as ReChartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

const BarChart = ({
  data,
  index,
  categories,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
  valueFormatter = (value) => `${value}`,
  className = ""
}: BarChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={valueFormatter}
            contentStyle={{ backgroundColor: "white", borderRadius: "6px", border: "1px solid #ddd" }}
            wrapperStyle={{ outline: "none" }}
          />
          <Legend wrapperStyle={{ paddingTop: 16 }} />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              barSize={20}
              name={category}
            />
          ))}
        </ReChartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
