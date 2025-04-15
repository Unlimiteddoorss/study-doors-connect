
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'يناير', applications: 65 },
  { month: 'فبراير', applications: 85 },
  { month: 'مارس', applications: 110 },
  { month: 'أبريل', applications: 95 },
  { month: 'مايو', applications: 125 },
  { month: 'يونيو', applications: 160 },
];

export const ApplicationsChart = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
