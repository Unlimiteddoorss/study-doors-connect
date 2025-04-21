
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Bell, MessageSquare, ExternalLink, Eye, Clock, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Application {
  id: number;
  applicationNumber: string;
  programId: number;
  status: string;
  submissionDate: string;
  studentData: any;
  notes: string;
  notesAr: string;
  university?: string;
}

const Dashboard = () => {
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Fetch applications from localStorage when component mounts
    const fetchApplications = () => {
      const storedApplications = localStorage.getItem('studentApplications');
      if (storedApplications) {
        try {
          const parsedApplications: Application[] = JSON.parse(storedApplications);
          const sortedApplications = [...parsedApplications].sort((a, b) => 
            new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
          ).slice(0, 3);
          
          setRecentApplications(sortedApplications);
          console.log('Dashboard: Loaded recent applications:', sortedApplications);
        } catch (error) {
          console.error('Error parsing applications:', error);
          setRecentApplications([]);
        }
      } else {
        console.log('No applications found in localStorage');
        setRecentApplications([]);
      }
    };

    fetchApplications();
    
    // Add event listener for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'studentApplications') {
        fetchApplications();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const getProgramName = (programId: number) => {
    const programNames: Record<number, string> = {
      1: 'بكالوريوس إدارة الأعمال',
      2: 'ماجستير علوم الحاسوب',
      3: 'دكتوراه الهندسة المدنية',
      4: 'بكالوريوس هندسة الحاسوب',
      5: 'ماجستير إدارة الأعمال',
      'computer_science': 'علوم الحاسوب',
      'medicine': 'الطب البشري',
      'engineering': 'الهندسة',
      'business': 'إدارة الأعمال',
      'humanities': 'العلوم الإنسانية'
    };
    
    return programNames[programId] || 'برنامج غير محدد';
  };
  
  const getUniversityName = (universityId: string | number) => {
    const universityNames: Record<string, string> = {
      1: 'جامعة أوزيجين',
      2: 'جامعة فاتح سلطان محمد',
      3: 'جامعة المجر للتكنولوجيا',
      4: 'جامعة باهتشه شهير',
      5: 'جامعة اسطنبول',
      'istanbul': 'جامعة اسطنبول',
      'marmara': 'جامعة مرمرة',
      'ankara': 'جامعة أنقرة',
      'bogazici': 'جامعة بوغازيتشي',
      'yildiz': 'جامعة يلدز التقنية',
    };
    
    return universityNames[universityId] || 'جامعة غير محددة';
  };
  
  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending: 'قيد الانتظار',
      review: 'قيد المراجعة',
      approved: 'مقبول',
      rejected: 'مرفوض',
      documents: 'بانتظار المستندات'
    };
    return statusMap[status] || 'قيد المعالجة';
  };
  
  const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
      pending: 'text-gray-600 bg-gray-100',
      review: 'text-yellow-600 bg-yellow-100',
      approved: 'text-green-600 bg-green-100',
      rejected: 'text-red-600 bg-red-100',
      documents: 'text-blue-600 bg-blue-100'
    };
    return statusColors[status] || 'text-gray-600 bg-gray-100';
  };

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
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {recentApplications.length > 0 ? (
                  recentApplications.map((app) => (
                    <Link 
                      key={app.id}
                      to={`/dashboard/applications/${app.id}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="bg-unlimited-blue/10 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-unlimited-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {getProgramName(app.programId)}
                            </h4>
                            <p className="text-sm text-unlimited-gray">
                              {getUniversityName(app.university || app.programId)}
                            </p>
                            <p className="text-xs text-unlimited-gray mt-1">رقم الطلب: {app.applicationNumber}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                          <span className="text-xs text-unlimited-gray mt-1">{app.submissionDate}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-unlimited-gray mb-3">لم تقدم أي طلبات حتى الآن</p>
                    <Link to="/apply">
                      <Button>
                        تقديم طلب جديد
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

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
                  <Link
                    key={notification.id}
                    to="/dashboard/notifications"
                    className="block"
                  >
                    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="bg-unlimited-blue/10 p-2 h-min rounded-full">
                        <Bell className="h-4 w-4 text-unlimited-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-unlimited-gray">{notification.message}</p>
                        <span className="text-xs text-unlimited-gray mt-1">{notification.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">الملف الشخصي</CardTitle>
              <CardDescription>معلوماتك الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-24 h-24 rounded-full bg-unlimited-blue/10 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-unlimited-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">محمد أحمد</h3>
                <p className="text-unlimited-gray text-sm">طالب</p>
              </div>
              <div className="flex flex-col gap-1 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-unlimited-gray">البريد الإلكتروني:</span>
                  <span className="font-medium">mohammad.ahmed@example.com</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-unlimited-gray">رقم الهاتف:</span>
                  <span className="font-medium">+90 552 123 4567</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-unlimited-gray">البلد:</span>
                  <span className="font-medium">تركيا</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-0">
              <Link to="/dashboard/profile">
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  عرض الملف الشخصي
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">الرسائل</CardTitle>
              <CardDescription>التواصل مع فريق الدعم</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-unlimited-blue/10 p-2 h-min rounded-full">
                    <MessageSquare className="h-4 w-4 text-unlimited-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium">استفسار حول برنامج الطب</h4>
                    <p className="text-sm text-unlimited-gray">تم الرد بواسطة: أحمد المستشار</p>
                    <span className="text-xs text-unlimited-gray mt-1">منذ 3 أيام</span>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-unlimited-blue/10 p-2 h-min rounded-full">
                    <MessageSquare className="h-4 w-4 text-unlimited-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium">تأكيد موعد المقابلة</h4>
                    <p className="text-sm text-unlimited-gray">تم الرد بواسطة: سارة المستشارة</p>
                    <span className="text-xs text-unlimited-gray mt-1">منذ أسبوع</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-0">
              <Link to="/student/messages">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  فتح المحادثات
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

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
