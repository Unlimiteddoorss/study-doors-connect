
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

const data = [
  { name: 'السعودية', value: 400, color: '#2563eb' },
  { name: 'مصر', value: 300, color: '#10b981' },
  { name: 'الإمارات', value: 200, color: '#f59e0b' },
  { name: 'الأردن', value: 150, color: '#6366f1' },
  { name: 'الكويت', value: 100, color: '#ec4899' },
  { name: 'عمان', value: 90, color: '#8b5cf6' },
  { name: 'البحرين', value: 80, color: '#14b8a6' },
  { name: 'أخرى', value: 184, color: '#6b7280' },
];

export const StudentsByCountry = () => {
  const { toast } = useToast();

  const handleClick = (entry: any) => {
    toast({
      title: `إحصائيات ${entry.name}`,
      description: `عدد الطلاب: ${entry.value} طالب (${((entry.value / 1504) * 100).toFixed(1)}%)`,
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-bold text-unlimited-dark-blue">{data.name}</p>
          <p className="text-unlimited-gray">{data.value} طالب</p>
          <p className="text-unlimited-blue">
            {((data.value / 1504) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            onClick={handleClick}
            className="animate-fade-in"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
