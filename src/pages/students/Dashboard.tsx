
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, MessageSquare, FileText, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const quickActions = [
    {
      title: 'تقديم طلب جديد',
      description: 'ابدأ في تقديم طلب للالتحاق بالجامعة',
      icon: BookOpen,
      href: '/application-form',
      color: 'bg-blue-500'
    },
    {
      title: 'الرسائل',
      description: 'تابع رسائلك مع المستشارين',
      icon: MessageSquare,
      href: '/student-messages',
      color: 'bg-green-500'
    },
    {
      title: 'الملف الشخصي',
      description: 'تحديث معلوماتك الشخصية',
      icon: User,
      href: '/profile',
      color: 'bg-purple-500'
    },
    {
      title: 'الإشعارات',
      description: 'عرض آخر الإشعارات',
      icon: Bell,
      href: '/notifications',
      color: 'bg-orange-500'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-unlimited-blue to-unlimited-dark-blue text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">
            مرحباً، {user?.email || 'الطالب'}
          </h1>
          <p className="text-blue-100">
            مرحباً بك في لوحة التحكم الخاصة بك. يمكنك من هنا متابعة طلباتك وإدارة حسابك.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={action.href}>ابدأ الآن</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              النشاط الأخير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">لا توجد أنشطة حديثة</h4>
                  <p className="text-sm text-gray-600">ابدأ بتقديم طلب جديد لرؤية النشاط هنا</p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/application-form">تقديم طلب</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
