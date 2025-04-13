
import { 
  FileText, 
  Mail, 
  CalendarCheck, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BarChart4 
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  color: string;
};

const StatCard = ({ title, value, description, icon, color }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-unlimited-gray">
        {title}
      </CardTitle>
      <div className={`p-2 rounded-full ${color}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <CardDescription className="text-xs text-unlimited-gray mt-1">
          {description}
        </CardDescription>
      )}
    </CardContent>
  </Card>
);

type DashboardStatsProps = {
  userRole?: 'student' | 'admin' | 'agent';
};

const DashboardStats = ({ userRole = 'student' }: DashboardStatsProps) => {
  // Stats for student dashboard
  const studentStats = [
    {
      title: 'طلباتي',
      value: 3,
      description: 'إجمالي عدد الطلبات',
      icon: <FileText className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-blue',
    },
    {
      title: 'طلبات قيد المعالجة',
      value: 1,
      description: 'بانتظار الرد',
      icon: <Clock className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-warning',
    },
    {
      title: 'طلبات مقبولة',
      value: 2,
      description: 'تم قبولها من الجامعات',
      icon: <CheckCircle2 className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-success',
    },
    {
      title: 'رسائل غير مقروءة',
      value: 4,
      description: 'من فريق الدعم والجامعات',
      icon: <Mail className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-info',
    },
  ];

  // Stats for admin dashboard
  const adminStats = [
    {
      title: 'إجمالي الطلبات',
      value: 125,
      description: 'هذا الشهر',
      icon: <FileText className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-blue',
    },
    {
      title: 'طلبات جديدة',
      value: 24,
      description: 'بانتظار المراجعة',
      icon: <AlertCircle className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-warning',
    },
    {
      title: 'إجمالي الطلاب',
      value: 450,
      description: '50+ طالب جديد هذا الشهر',
      icon: <GraduationCap className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-info',
    },
    {
      title: 'إجمالي الوكلاء',
      value: 15,
      description: '3 وكلاء نشطين',
      icon: <BarChart4 className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-success',
    },
  ];

  // Stats for agent dashboard
  const agentStats = [
    {
      title: 'طلابي',
      value: 28,
      description: 'إجمالي عدد الطلاب',
      icon: <GraduationCap className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-blue',
    },
    {
      title: 'طلبات قيد المعالجة',
      value: 12,
      description: 'بانتظار الرد',
      icon: <Clock className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-warning',
    },
    {
      title: 'طلبات مقبولة',
      value: 45,
      description: 'تم قبولها من الجامعات',
      icon: <CheckCircle2 className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-success',
    },
    {
      title: 'اجتماعات قادمة',
      value: 3,
      description: 'في الأسبوع القادم',
      icon: <CalendarCheck className="h-4 w-4 text-white" />,
      color: 'bg-unlimited-info',
    },
  ];

  let stats;
  if (userRole === 'admin') {
    stats = adminStats;
  } else if (userRole === 'agent') {
    stats = agentStats;
  } else {
    stats = studentStats;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
