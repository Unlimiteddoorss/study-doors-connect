
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'يناير', applications: 45, accepted: 38, rejected: 7 },
  { month: 'فبراير', applications: 52, accepted: 44, rejected: 8 },
  { month: 'مارس', applications: 68, accepted: 58, rejected: 10 },
  { month: 'أبريل', applications: 73, accepted: 62, rejected: 11 },
  { month: 'مايو', applications: 84, accepted: 71, rejected: 13 },
  { month: 'يونيو', applications: 91, accepted: 78, rejected: 13 }
];

export const ApplicationsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="applications" fill="#3b82f6" name="إجمالي الطلبات" />
        <Bar dataKey="accepted" fill="#10b981" name="مقبولة" />
        <Bar dataKey="rejected" fill="#ef4444" name="مرفوضة" />
      </BarChart>
    </ResponsiveContainer>
  );
};
