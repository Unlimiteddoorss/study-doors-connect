
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Bell } from 'lucide-react';

const Dashboard = () => {
  const recentApplications = [
    {
      id: 1,
      program: 'بكالوريوس إدارة الأعمال',
      university: 'جامعة أوزيجين',
      status: 'مقبول',
      date: '15/04/2025',
      statusColor: 'text-green-600 bg-green-100',
    },
    {
      id: 2,
      program: 'ماجستير علوم الحاسوب',
      university: 'جامعة فاتح سلطان محمد',
      status: 'قيد المراجعة',
      date: '10/04/2025',
      statusColor: 'text-yellow-600 bg-yellow-100',
    },
    {
      id: 3,
      program: 'دكتوراه الهندسة المدنية',
      university: 'جامعة المجر للتكنولوجيا',
      status: 'بانتظار المستندات',
      date: '05/04/2025',
      statusColor: 'text-blue-600 bg-blue-100',
    },
  ];

  const notifications = [
    {
      id: 1,
      title: 'تم تحديث حالة طلبك',
      message: 'تم قبول طلبك للبرنامج الدراسي في جامعة أوزيجين',
      time: 'منذ ساعتين',
    },
    {
      id: 2,
      title: 'مستندات مطلوبة',
      message: 'يرجى تحميل نسخة من جواز السفر الخاص بك',
      time: 'منذ 5 ساعات',
    },
    {
      id: 3,
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة من قسم الدعم',
      time: 'منذ يوم واحد',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats */}
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">طلباتي الحالية</CardTitle>
                <CardDescription>آخر الطلبات المقدمة</CardDescription>
              </div>
              <Link to="/dashboard/applications">
                <Button variant="outline" size="sm" className="text-sm">
                  عرض الكل
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div 
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-unlimited-blue/10 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-unlimited-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">{app.program}</h4>
                        <p className="text-sm text-unlimited-gray">{app.university}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-unlimited-gray mt-1">{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {recentApplications.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-unlimited-gray mb-3">لم تقدم أي طلبات حتى الآن</p>
                  <Link to="/programs">
                    <Button>
                      استكشف البرامج
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">الإشعارات</CardTitle>
                <CardDescription>آخر التحديثات</CardDescription>
              </div>
              <Link to="/dashboard/notifications">
                <Button variant="outline" size="sm" className="text-sm">
                  عرض الكل
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="bg-unlimited-blue/10 p-2 h-min rounded-full">
                      <Bell className="h-4 w-4 text-unlimited-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-unlimited-gray">{notification.message}</p>
                      <span className="text-xs text-unlimited-gray mt-1">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Programs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">برامج مقترحة لك</CardTitle>
              <CardDescription>بناءً على تخصصك واهتماماتك</CardDescription>
            </div>
            <Link to="/programs">
              <Button variant="outline" size="sm" className="text-sm">
                عرض المزيد
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, idx) => (
                <Link key={idx} to={`/programs/${idx + 1}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                    <div className="h-40 bg-gray-200">
                      <img 
                        src={`https://images.unsplash.com/photo-152305085405${idx}-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3`}
                        alt="Program cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-unlimited-blue text-sm font-medium">جامعة أوزيجين</p>
                      <h4 className="font-bold my-1">بكالوريوس إدارة الأعمال</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-unlimited-gray text-sm">تركيا، إسطنبول</span>
                        <span className="text-green-600 text-sm font-medium">$12,350/سنة</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
