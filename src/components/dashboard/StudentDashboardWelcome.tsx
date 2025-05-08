
import { useState } from 'react';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Calendar, Book, GraduationCap, Building2 } from 'lucide-react';

interface StudentDashboardWelcomeProps {
  studentName?: string;
}

const StudentDashboardWelcome = ({ studentName = 'محمد' }: StudentDashboardWelcomeProps) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // الحصول على اليوم والتاريخ بالعربية
  const formattedDate = format(currentTime, "EEEE، d MMMM yyyy", { locale: arSA });
  
  // تعيين الوقت من اليوم بناءً على الساعة
  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return 'صباح الخير';
    if (hour >= 12 && hour < 17) return 'مساء الخير';
    if (hour >= 17 && hour < 20) return 'مساء الخير';
    return 'مساء الخير';
  };

  // الحصول على رسالة الترحيب
  const welcomeMessage = getTimeOfDay();

  // الحصول على نصائح تعليمية عشوائية
  const getRandomTip = () => {
    const tips = [
      'لا تنس تحديث سيرتك الذاتية بأحدث المعلومات للحصول على فرص أفضل.',
      'من المهم متابعة مواعيد التقديم للبرامج الدراسية والمنح بانتظام.',
      'يمكنك الاطلاع على المزيد من برامج المنح الدراسية في قسم المنح.',
      'تأكد من تجهيز جميع مستنداتك قبل التقديم لتسريع عملية القبول.',
      'استخدم خدمة الاستشارة الأكاديمية للحصول على توجيه مخصص لاختياراتك الدراسية.',
      'أبق على اطلاع بآخر الأخبار عن الجامعات والقبول عبر خاصية الإشعارات.',
      'التقدم المبكر للبرامج يزيد من فرص القبول.',
      'احرص على اختيار التخصص المناسب لاهتماماتك وقدراتك.',
      'تابع آخر التحديثات على منصة أبواب بلا حدود للفرص الجديدة والعروض.',
      'هناك فرص للمنح المجانية متاحة الآن، تصفح قسم المنح لمعرفة المزيد.',
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  // القائمة السريعة
  const quickLinks = [
    { 
      title: 'استعراض البرامج', 
      icon: <GraduationCap className="h-5 w-5" />, 
      color: 'bg-blue-500', 
      url: '/programs' 
    },
    { 
      title: 'استكشاف الجامعات', 
      icon: <Building2 className="h-5 w-5" />, 
      color: 'bg-purple-500', 
      url: '/universities' 
    },
    { 
      title: 'طلباتي', 
      icon: <Book className="h-5 w-5" />, 
      color: 'bg-green-500', 
      url: '/dashboard/applications' 
    },
    { 
      title: 'التقويم والمواعيد', 
      icon: <Calendar className="h-5 w-5" />, 
      color: 'bg-orange-500', 
      url: '/dashboard/calendar' 
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-unlimited-blue to-unlimited-dark-blue text-white overflow-hidden border-0">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-white/80 mb-1">{formattedDate}</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {welcomeMessage}، {studentName}!
            </h1>
            <p className="text-white/90 mb-6 max-w-2xl">
              {getRandomTip()}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {quickLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => navigate(link.url)}
                  className={`${link.color} bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all p-3 rounded-lg flex flex-col items-center justify-center gap-2 text-center`}
                >
                  <div className={`${link.color} p-2 rounded-full`}>
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium">{link.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:ml-6 flex flex-col gap-4 self-start">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="h-5 w-5" />
                <h3 className="font-medium">التحديثات الجديدة</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>إشعارات غير مقروءة</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>رسائل جديدة</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>مواعيد قادمة</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs">1</span>
                </div>
              </div>

              <Button 
                variant="secondary" 
                className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white"
                onClick={() => navigate('/dashboard/notifications')}
              >
                عرض الكل
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDashboardWelcome;
