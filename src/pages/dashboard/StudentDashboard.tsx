
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, MessageCircle, Bell, Paperclip } from 'lucide-react';

const StudentDashboard = () => {
  useEffect(() => {
    document.title = 'لوحة التحكم - أبواب بلا حدود';
  }, []);
  
  // Sample data for dashboard
  const applications = [
    {
      id: 1,
      program: "بكالوريوس إدارة الأعمال",
      university: "جامعة أوزيجين",
      status: "مقبول",
      date: "15/04/2025"
    },
    {
      id: 2,
      program: "ماجستير علوم الحاسوب",
      university: "جامعة فاتح سلطان محمد",
      status: "قيد المراجعة",
      date: "10/04/2025"
    },
    {
      id: 3,
      program: "دكتوراه الهندسة المدنية",
      university: "جامعة المجر التكنولوجيا",
      status: "بانتظار المستندات",
      date: "05/04/2025"
    }
  ];
  
  const notifications = [
    {
      id: 1,
      title: "تم تحديث حالة طلبك",
      message: "تم قبول طلبك للبرنامج الدراسي في جامعة أوزيجين",
      time: "منذ ساعتين",
      isRead: false
    },
    {
      id: 2,
      title: "مستندات مطلوبة",
      message: "يرجى تحميل صفحة من جواز السفر الخاص بك",
      time: "منذ 5 ساعات",
      isRead: false
    },
    {
      id: 3,
      title: "رسالة جديدة",
      message: "لديك رسالة جديدة من فريق الدعم",
      time: "منذ يوم",
      isRead: true
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">لوحة التحكم</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 rounded-full bg-blue-100 p-3">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-unlimited-gray">إجمالي عدد الطلبات</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 rounded-full bg-orange-100 p-3">
                <FileText className="h-6 w-6 text-orange-500" />
              </div>
              <div className="text-3xl font-bold">1</div>
              <p className="text-sm text-unlimited-gray">بانتظار الرد</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 rounded-full bg-green-100 p-3">
                <FileText className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-unlimited-gray">تم قبولها من الجامعات</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 rounded-full bg-blue-100 p-3">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold">4</div>
              <p className="text-sm text-unlimited-gray">من فريق الدعم والجامعات</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">طلباتي الحالية</CardTitle>
              <Link to="/dashboard/applications">
                <Button variant="link" className="text-unlimited-blue p-0">
                  عرض الكل
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {applications.map((application) => (
                <div key={application.id} className="border-b last:border-0 py-4">
                  <div className="flex items-center mb-2 gap-3">
                    <FileText className="text-unlimited-blue h-5 w-5" />
                    <div>
                      <h4 className="font-semibold">{application.program}</h4>
                      <p className="text-unlimited-gray text-sm">{application.university}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-unlimited-gray">{application.date}</div>
                    <div>
                      {application.status === 'مقبول' && (
                        <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded">مقبول</span>
                      )}
                      {application.status === 'قيد المراجعة' && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded">قيد المراجعة</span>
                      )}
                      {application.status === 'بانتظار المستندات' && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <Paperclip className="h-3 w-3 mr-1" />
                          تحميل المستندات
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">الإشعارات</CardTitle>
              <Link to="/dashboard/notifications">
                <Button variant="link" className="text-unlimited-blue p-0">
                  عرض الكل
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {notifications.map((notification) => (
                <div key={notification.id} className="border-b last:border-0 py-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 rounded-full p-2 ${notification.isRead ? 'bg-gray-100' : 'bg-blue-100'}`}>
                      <Bell className={`h-4 w-4 ${notification.isRead ? 'text-gray-400' : 'text-unlimited-blue'}`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${!notification.isRead ? 'text-unlimited-blue' : ''}`}>{notification.title}</h4>
                      <p className="text-unlimited-gray text-sm">{notification.message}</p>
                      <span className="text-xs text-unlimited-gray mt-1 block">{notification.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
