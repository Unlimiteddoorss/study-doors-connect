
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const universityData = [
  { name: 'جامعة إسطنبول', students: 145, applications: 180 },
  { name: 'جامعة أنقرة', students: 128, applications: 165 },
  { name: 'جامعة غازي عنتاب', students: 95, applications: 125 },
  { name: 'جامعة صباح الدين زعيم', students: 87, applications: 110 },
  { name: 'جامعة بيلكنت', students: 72, applications: 95 },
];

export const UniversityStats = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>إحصائيات الجامعات</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={universityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#2563eb" name="الطلاب المقبولين" />
            <Bar dataKey="applications" fill="#16a34a" name="إجمالي الطلبات" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
