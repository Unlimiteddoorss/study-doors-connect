
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card } from '@/components/ui/card';

const data = [
  { name: 'جامعة لندن', students: 142, applications: 280 },
  { name: 'جامعة تورنتو', students: 123, applications: 250 },
  { name: 'جامعة ملبورن', students: 98, applications: 190 },
  { name: 'جامعة برلين', students: 85, applications: 170 },
  { name: 'جامعة طوكيو', students: 76, applications: 150 },
];

export const UniversityStats = () => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">إحصائيات الجامعات</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#2563eb" name="الطلاب" />
            <Bar dataKey="applications" fill="#10b981" name="الطلبات" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
