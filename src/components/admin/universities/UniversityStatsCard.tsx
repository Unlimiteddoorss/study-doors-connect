
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface UniversityStatsCardProps {
  totalUniversities: number;
  activeUniversities: number;
  publicUniversities: number;
  privateUniversities: number;
  totalStudents: number;
  totalPrograms: number;
}

export const UniversityStatsCard = ({
  totalUniversities,
  activeUniversities,
  publicUniversities,
  privateUniversities,
  totalStudents,
  totalPrograms,
}: UniversityStatsCardProps) => {
  
  const statusData = [
    { name: 'مفعلة', value: activeUniversities, color: '#10b981' },
    { name: 'غير مفعلة', value: totalUniversities - activeUniversities, color: '#6b7280' },
  ];
  
  const typeData = [
    { name: 'حكومية', value: publicUniversities, color: '#3b82f6' },
    { name: 'خاصة', value: privateUniversities, color: '#8b5cf6' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">إجمالي الجامعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-unlimited-dark-blue">{totalUniversities}</div>
            <p className="text-unlimited-gray text-sm mt-1">
              {activeUniversities} مفعلة / {totalUniversities - activeUniversities} غير مفعلة
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">البرامج الدراسية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-unlimited-dark-blue">{totalPrograms}</div>
            <p className="text-unlimited-gray text-sm mt-1">
              بمتوسط {(totalPrograms / totalUniversities).toFixed(1)} لكل جامعة
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">إجمالي الطلاب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-unlimited-dark-blue">{totalStudents.toLocaleString()}</div>
            <p className="text-unlimited-gray text-sm mt-1">
              بمتوسط {(totalStudents / totalUniversities).toFixed(0)} لكل جامعة
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">توزيع الجامعات</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex justify-center">
            <div className="w-full h-[130px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'عدد الجامعات']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute bottom-2 right-3 flex items-center justify-end gap-4">
              <div className="flex items-center">
                <span className="inline-block h-3 w-3 bg-blue-500 rounded-full mr-1"></span>
                <span className="text-xs">حكومية</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block h-3 w-3 bg-purple-500 rounded-full mr-1"></span>
                <span className="text-xs">خاصة</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
