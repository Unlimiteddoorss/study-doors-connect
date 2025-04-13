
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, MessageCircle, Bell, Building } from 'lucide-react';

interface DashboardStatsProps {
  userRole?: 'student' | 'admin' | 'agent';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userRole = 'student' }) => {
  // بيانات الإحصائيات حسب نوع المستخدم
  const statsData = {
    student: [
      { label: 'طلباتي', value: 3, icon: <FileText className="h-6 w-6 text-blue-500" />, bgColor: 'bg-blue-100', description: 'إجمالي عدد الطلبات' },
      { label: 'طلبات في المراجعة', value: 1, icon: <FileText className="h-6 w-6 text-orange-500" />, bgColor: 'bg-orange-100', description: 'بانتظار الرد' },
      { label: 'طلبات مقبولة', value: 2, icon: <FileText className="h-6 w-6 text-green-500" />, bgColor: 'bg-green-100', description: 'تم قبولها من الجامعات' },
      { label: 'رسائل', value: 4, icon: <MessageCircle className="h-6 w-6 text-blue-500" />, bgColor: 'bg-blue-100', description: 'من فريق الدعم والجامعات' },
    ],
    admin: [
      { label: 'طلبات جديدة', value: 15, icon: <FileText className="h-6 w-6 text-blue-500" />, bgColor: 'bg-blue-100', description: 'في انتظار المراجعة' },
      { label: 'طلاب جدد', value: 8, icon: <FileText className="h-6 w-6 text-orange-500" />, bgColor: 'bg-orange-100', description: 'مسجلين هذا الأسبوع' },
      { label: 'رسائل', value: 12, icon: <MessageCircle className="h-6 w-6 text-purple-500" />, bgColor: 'bg-purple-100', description: 'تحتاج للرد' },
      { label: 'جامعات', value: 42, icon: <Building className="h-6 w-6 text-green-500" />, bgColor: 'bg-green-100', description: 'مسجلة في النظام' },
    ],
    agent: [
      { label: 'طلاب', value: 18, icon: <FileText className="h-6 w-6 text-blue-500" />, bgColor: 'bg-blue-100', description: 'إجمالي عدد الطلاب' },
      { label: 'طلبات نشطة', value: 7, icon: <FileText className="h-6 w-6 text-orange-500" />, bgColor: 'bg-orange-100', description: 'قيد المعالجة' },
      { label: 'طلبات مقبولة', value: 12, icon: <FileText className="h-6 w-6 text-green-500" />, bgColor: 'bg-green-100', description: 'تم قبولها' },
      { label: 'رسائل', value: 5, icon: <MessageCircle className="h-6 w-6 text-purple-500" />, bgColor: 'bg-purple-100', description: 'تحتاج للرد' },
    ]
  };

  const activeStats = statsData[userRole];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {activeStats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex flex-col items-center p-6">
            <div className={`mb-2 rounded-full ${stat.bgColor} p-3`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-sm text-unlimited-gray">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
