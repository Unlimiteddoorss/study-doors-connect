
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { month: 'يناير', applications: 65, accepted: 45, pending: 20 },
  { month: 'فبراير', applications: 85, accepted: 60, pending: 25 },
  { month: 'مارس', applications: 110, accepted: 75, pending: 35 },
  { month: 'أبريل', applications: 95, accepted: 65, pending: 30 },
  { month: 'مايو', applications: 125, accepted: 90, pending: 35 },
  { month: 'يونيو', applications: 160, accepted: 120, pending: 40 },
];

export const ApplicationsChart = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="applications" 
            stroke="#2563eb" 
            strokeWidth={2}
            name="إجمالي الطلبات"
          />
          <Line 
            type="monotone" 
            dataKey="accepted" 
            stroke="#10b981" 
            strokeWidth={2}
            name="الطلبات المقبولة"
          />
          <Line 
            type="monotone" 
            dataKey="pending" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="الطلبات قيد المعالجة"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

