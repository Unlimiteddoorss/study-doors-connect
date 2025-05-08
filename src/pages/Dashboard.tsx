
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { UniversityAnnouncements } from '@/components/dashboard/UniversityAnnouncements';
import { ProgramQuotas } from '@/components/dashboard/ProgramQuotas';
import StudentDashboardWelcome from '@/components/dashboard/StudentDashboardWelcome';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, Bell, MessageSquare, ExternalLink, Eye, CalendarClock, Calendar, Presentation, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Application {
  id: string | number;
  program: string;
  university: string;
  status: string;
  date: string;
  statusColor: string;
}

const Dashboard = () => {
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate] = useState(new Date());

  // Load applications from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedApps = localStorage.getItem('studentApplications');
      if (storedApps) {
        const parsedApps = JSON.parse(storedApps);
        // Take only the 3 most recent applications
        setRecentApplications(parsedApps.slice(0, 3));
      }
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sample notifications - in real app these would come from backend
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

  // Get the status display classes
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'documents': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  // Get status label in Arabic
  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'قيد الانتظار',
      'review': 'قيد المراجعة',
      'approved': 'مقبول',
      'rejected': 'مرفوض',
      'documents': 'بانتظار المستندات',
      'completed': 'مكتمل',
      'archived': 'مؤرشف'
    };
    
    return statusMap[status] || status;
  };

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'موعد مقابلة جامعة إسطنبول التقنية',
      date: '2025-05-15',
      time: '14:00',
      type: 'interview',
      location: 'عبر الإنترنت - زوم'
    },
    {
      id: 2,
      title: 'آخر موعد لتقديم المستندات',
      date: '2025-05-20',
      time: '23:59',
      type: 'deadline',
      program: 'بكالوريوس هندسة البرمجيات'
    },
    {
      id: 3,
      title: 'بدء التسجيل للفصل الدراسي القادم',
      date: '2025-06-01',
      time: '10:00',
      type: 'registration',
    },
    {
      id: 4,
      title: 'ندوة تعريفية عن الدراسة في تركيا',
      date: '2025-05-12',
      time: '18:00',
      type: 'seminar',
      location: 'عبر الإنترنت - يوتيوب'
    }
  ];

  // Featured programs
  const featuredPrograms = [
    {
      id: 1,
      title: 'بكالوريوس الطب البشري',
      university: 'جامعة إسطنبول',
      location: 'تركيا، إسطنبول',
      tuition: '15,000',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070',
      deadline: '2025-06-30',
      language: 'إنجليزي',
      duration: '6 سنوات',
      matching: 95,
    },
    {
      id: 2,
      title: 'ماجستير إدارة الأعمال',
      university: 'جامعة البسفور',
      location: 'تركيا، إسطنبول',
      tuition: '8,500',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2532',
      deadline: '2025-07-15',
      language: 'إنجليزي - تركي',
      duration: '2 سنوات',
      matching: 88,
    },
    {
      id: 3,
      title: 'بكالوريوس هندسة الحاسوب',
      university: 'جامعة أنقرة',
      location: 'تركيا، أنقرة',
      tuition: '9,200',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070',
      deadline: '2025-06-15',
      language: 'إنجليزي',
      duration: '4 سنوات',
      matching: 90,
    },
  ];

  const sortEventsByDate = (events: typeof upcomingEvents) => {
    return [...events].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortedEvents = sortEventsByDate(upcomingEvents);

  const getEventTypeIcon = (type: string) => {
    switch(type) {
      case 'interview': return <Presentation className="h-4 w-4" />;
      case 'deadline': return <CalendarClock className="h-4 w-4" />;
      case 'registration': return <FileText className="h-4 w-4" />;
      case 'seminar': return <GraduationCap className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeBadgeClass = (type: string) => {
    switch(type) {
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'registration': return 'bg-blue-100 text-blue-800';
      case 'seminar': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.getTime() === today.getTime()) {
      return 'اليوم';
    } else if (date.getTime() === tomorrow.getTime()) {
      return 'غداً';
    } else {
      // Format as 15 مايو
      const day = date.getDate();
      const month = date.toLocaleDateString('ar-EG', { month: 'long' });
      return `${day} ${month}`;
    }
  };

  const isDayWithinWeek = (dateString: string) => {
    const eventDate = new Date(dateString);
    const currentDate = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(currentDate.getDate() + 7);
    
    return eventDate <= oneWeekFromNow;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <StudentDashboardWelcome />
        
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
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.length > 0 ? (
                    recentApplications.map((app) => (
                      <Link 
                        key={app.id}
                        to={`/dashboard/applications`}
                        className="block"
                      >
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(app.status)}`}>
                              {getStatusLabel(app.status)}
                            </span>
                            <span className="text-xs text-unlimited-gray mt-1">{app.date}</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-unlimited-gray mb-3">لم تقدم أي طلبات حتى الآن</p>
                      <Link to="/programs">
                        <Button>
                          استكشف البرامج
                          <ArrowRight className="mr-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">المواعيد القادمة</CardTitle>
                  <CardDescription>أحداث ومواعيد هامة</CardDescription>
                </div>
                <Link to="/dashboard/calendar">
                  <Button variant="ghost" size="sm" className="text-sm">
                    <Calendar className="h-4 w-4 ml-1" />
                    التقويم
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mt-1">
                {sortedEvents.length > 0 ? (
                  sortedEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className={cn(
                        "p-3 rounded-lg border flex items-start gap-3",
                        isDayWithinWeek(event.date) ? "border-unlimited-blue bg-unlimited-light-blue/10" : "border-gray-200"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-full",
                        isDayWithinWeek(event.date) ? "bg-unlimited-blue/10" : "bg-gray-50"
                      )}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-unlimited-gray text-xs">
                          <Badge variant="outline" className="text-xs">
                            {formatEventDate(event.date)} - {event.time}
                          </Badge>
                          <Badge 
                            className={cn(
                              "text-xs font-normal",
                              getEventTypeBadgeClass(event.type)
                            )}
                          >
                            {event.type === 'interview' ? 'مقابلة' : 
                             event.type === 'deadline' ? 'موعد نهائي' : 
                             event.type === 'registration' ? 'تسجيل' : 'ندوة'}
                          </Badge>
                        </div>
                        {event.location && (
                          <p className="text-xs text-unlimited-gray mt-1">{event.location}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-8 w-8 mx-auto text-unlimited-gray opacity-50 mb-2" />
                    <p className="text-unlimited-gray">لا توجد مواعيد قادمة</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" size="sm">
                <CalendarClock className="h-4 w-4 ml-1" />
                إضافة موعد جديد
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UniversityAnnouncements />
          <ProgramQuotas />
        </div>

        {/* Profile & Messages Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">الملف الشخصي</CardTitle>
              <CardDescription>معلوماتك الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center justify-center py-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/assets/avatar.jpg" alt="صورة المستخدم" />
                  <AvatarFallback className="bg-unlimited-blue/10 text-unlimited-blue text-xl">
                    م أ
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-lg mt-3">محمد أحمد</h3>
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

                <div className="bg-unlimited-light-blue/10 rounded-lg p-3 mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-unlimited-blue border-unlimited-blue">60%</Badge>
                    <span className="text-sm">اكتمال الملف الشخصي</span>
                  </div>
                  <Button variant="link" size="sm" className="text-unlimited-blue p-0 h-auto">
                    أكمل ملفك
                  </Button>
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
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/assets/team/advisor1.jpg" alt="صورة المستشار" />
                    <AvatarFallback className="bg-green-100 text-green-800">أ م</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">استفسار حول برنامج الطب</h4>
                    <p className="text-sm text-unlimited-gray">تم الرد بواسطة: أحمد المستشار</p>
                    <span className="text-xs text-unlimited-gray mt-1 block">منذ 3 أيام</span>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/assets/team/advisor2.jpg" alt="صورة المستشار" />
                    <AvatarFallback className="bg-purple-100 text-purple-800">س م</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">تأكيد موعد المقابلة</h4>
                    <p className="text-sm text-unlimited-gray">تم الرد بواسطة: سارة المستشارة</p>
                    <span className="text-xs text-unlimited-gray mt-1 block">منذ أسبوع</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-3 bg-unlimited-light-blue/10 rounded-lg">
                  <div className="text-center">
                    <p className="text-unlimited-blue mb-1">بحاجة لمساعدة؟</p>
                    <p className="text-sm text-unlimited-gray mb-2">فريق الدعم متاح للإجابة عن استفساراتك</p>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 ml-1" />
                      بدء محادثة جديدة
                    </Button>
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
              {featuredPrograms.map((program) => (
                <Link key={program.id} to={`/programs/${program.id}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                    <div className="h-40 bg-gray-200 relative">
                      <img 
                        src={program.image}
                        alt={`صورة برنامج ${program.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-unlimited-blue">
                          تناسب {program.matching}%
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-unlimited-blue text-sm font-medium">{program.university}</p>
                      <h4 className="font-bold my-1">{program.title}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-unlimited-gray text-sm">{program.location}</span>
                        <span className="text-green-600 text-sm font-medium">${program.tuition}/سنة</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {program.language}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {program.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-200 bg-orange-50">
                          <CalendarClock className="h-3 w-3 ml-1" />
                          ينتهي: {program.deadline.split('-').reverse().join('/')}
                        </Badge>
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
