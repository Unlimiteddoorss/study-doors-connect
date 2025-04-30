
import { PieChart as ReChartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  valueFormatter?: (value: number) => string;
  colors?: string[];
  className?: string;
}

const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6366f1", "#ec4899", "#94a3b8"];

const PieChart = ({
  data,
  valueFormatter = (value) => `${value}`,
  colors = defaultColors,
  className = ""
}: PieChartProps) => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    if (percent < 0.05) return null;
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            innerRadius="40%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={valueFormatter}
            contentStyle={{ backgroundColor: "white", borderRadius: "6px", border: "1px solid #ddd" }}
            wrapperStyle={{ outline: "none" }}
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </ReChartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
