
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'السعودية', value: 450, color: '#3b82f6' },
  { name: 'الإمارات', value: 320, color: '#10b981' },
  { name: 'الكويت', value: 280, color: '#f59e0b' },
  { name: 'قطر', value: 180, color: '#ef4444' },
  { name: 'البحرين', value: 120, color: '#8b5cf6' },
  { name: 'عمان', value: 90, color: '#06b6d4' }
];

export const StudentsByCountry = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
