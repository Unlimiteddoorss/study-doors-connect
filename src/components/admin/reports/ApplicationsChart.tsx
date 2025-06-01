
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'يناير', applications: 65, accepted: 45, rejected: 20 },
  { month: 'فبراير', applications: 78, accepted: 52, rejected: 26 },
  { month: 'مارس', applications: 90, accepted: 68, rejected: 22 },
  { month: 'أبريل', applications: 95, accepted: 71, rejected: 24 },
  { month: 'مايو', applications: 88, accepted: 65, rejected: 23 },
  { month: 'يونيو', applications: 102, accepted: 78, rejected: 24 },
];

export const ApplicationsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="applications" stroke="#2563eb" strokeWidth={2} name="إجمالي الطلبات" />
        <Line type="monotone" dataKey="accepted" stroke="#16a34a" strokeWidth={2} name="مقبولة" />
        <Line type="monotone" dataKey="rejected" stroke="#dc2626" strokeWidth={2} name="مرفوضة" />
      </LineChart>
    </ResponsiveContainer>
  );
};
