
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'السعودية', value: 35, color: '#2563eb' },
  { name: 'مصر', value: 25, color: '#16a34a' },
  { name: 'الأردن', value: 20, color: '#dc2626' },
  { name: 'لبنان', value: 12, color: '#ca8a04' },
  { name: 'سوريا', value: 8, color: '#9333ea' },
];

export const StudentsByCountry = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
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
