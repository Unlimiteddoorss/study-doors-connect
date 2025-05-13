import { ReactNode, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ArrowUp, Bell, Globe, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TurkishUniversitiesAnnouncement from '../announcements/TurkishUniversitiesAnnouncement';

type MainLayoutProps = {
  children: ReactNode;
};

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ar');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  // Don't show the floating announcement on these pages where it's already shown
  const hideAnnouncementOnPages = ['/turkish-applications', '/'];
  const shouldShowFloatingAnnouncement = !hideAnnouncementOnPages.includes(location.pathname);
  
  // Sample notifications for demo purposes
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'تم قبول طلب التسجيل',
      message: 'تهانينا! تم قبول طلبك للتسجيل في جامعة اسطنبول',
      time: 'منذ ساعتين',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'موعد المقابلة الشخصية',
      message: 'تم تحديد موعد للمقابلة الشخصية مع مسؤول القبول يوم الخميس القادم',
      time: 'منذ 5 ساعات',
      read: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'تذكير بموعد تقديم المستندات',
      message: 'يرجى تقديم المستندات المطلوبة قبل نهاية الأسبوع',
      time: 'منذ يومين',
      read: true,
      type: 'warning'
    }
  ]);
  
  // Sample messages for demo purposes
  const [messages] = useState([
    {
      id: 1,
      name: 'أحمد المستشار',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      message: 'مرحبًا! كيف يمكنني مساعدتك في اختيار البرنامج المناسب؟',
      time: '10:30 ص',
      unread: true
    },
    {
      id: 2,
      name: 'سارة مسؤولة القبول',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      message: 'لقد راجعت طلبك وأحتاج إلى بعض المعلومات الإضافية',
      time: 'الأمس',
      unread: false
    }
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  const checkScrollPosition = () => {
    if (window.scrollY > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    // This function would typically update the app's language context
    // or localStorage setting to persist the language preference
    toast({
      title: "تم تغيير اللغة",
      description: `تم تغيير اللغة إلى: ${lang === 'ar' ? 'العربية' : lang === 'en' ? 'English' : 'Türkçe'}`,
    });
  };
  
  const markNotificationAsRead = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "تم تحديث الإشعارات",
      description: "تم تعيين جميع الإشعارات كمقروءة",
    });
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  const goToMessages = () => {
    navigate('/messages');
    setChatOpen(false);
  };
  
  const goToNotifications = () => {
    navigate('/dashboard/notifications');
    setNotificationsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 dark:text-white transition-colors duration-300">
      <Header />
      {shouldShowFloatingAnnouncement && showAnnouncement && (
        <div className="container mx-auto px-4 pt-4">
          <TurkishUniversitiesAnnouncement onClose={() => setShowAnnouncement(false)} />
        </div>
      )}
      <main className="flex-grow">{children}</main>
      <Footer />
      
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        {/* زر المساعدة الطافي */}
        <Sheet open={chatOpen} onOpenChange={setChatOpen}>
          <SheetTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
                    size="icon"
                    aria-label="تحدث مع مستشار"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>تحدث مع مستشار تعليمي</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTrigger>
          <SheetContent side="right" className="w-[350px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-right">المحادثات</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              {messages.map(message => (
                <div key={message.id} className={`p-3 mb-2 rounded-lg ${message.unread ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{message.name}</h4>
                      <span className="text-xs text-unlimited-gray">{message.time}</span>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{message.message}</p>
                </div>
              ))}
              
              <Button onClick={goToMessages} className="w-full mt-4 bg-unlimited-blue hover:bg-unlimited-dark-blue">
                عرض جميع الرسائل
              </Button>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">ابدأ محادثة جديدة</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/messages?type=counselor">
                    <Button variant="outline" className="w-full text-sm h-auto py-2" asChild>
                      <div>
                        مستشار تعليمي
                      </div>
                    </Button>
                  </Link>
                  <Link to="/messages?type=admissions">
                    <Button variant="outline" className="w-full text-sm h-auto py-2" asChild>
                      <div>
                        مسؤول القبول
                      </div>
                    </Button>
                  </Link>
                  <Link to="/messages?type=visa">
                    <Button variant="outline" className="w-full text-sm h-auto py-2" asChild>
                      <div>
                        مستشار التأشيرة
                      </div>
                    </Button>
                  </Link>
                  <Link to="/messages?type=housing">
                    <Button variant="outline" className="w-full text-sm h-auto py-2" asChild>
                      <div>
                        مسؤول السكن
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* زر الإشعارات */}
        <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <SheetTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all relative"
                    size="icon"
                    aria-label="الإشعارات"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>الإشعارات</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTrigger>
          <SheetContent side="right" className="w-[350px] overflow-y-auto">
            <SheetHeader className="border-b pb-4">
              <div className="flex justify-between items-center">
                <SheetTitle className="text-right">الإشعارات</SheetTitle>
                {unreadNotificationsCount > 0 && (
                  <Button variant="link" className="text-unlimited-blue p-0" onClick={markAllNotificationsAsRead}>
                    تعيين الكل كمقروء
                  </Button>
                )}
              </div>
            </SheetHeader>
            <div className="mt-6 space-y-3">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div key={notification.id} className={`p-4 rounded-lg relative ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                    {!notification.read && (
                      <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-unlimited-blue"></span>
                    )}
                    <h4 className={`font-medium mb-1 ${notification.read ? '' : 'text-unlimited-blue'}`}>
                      {notification.title}
                    </h4>
                    <p className="text-sm text-unlimited-gray mb-2">{notification.message}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-unlimited-gray">{notification.time}</span>
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-xs"
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            تعيين كمقروء
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-7 w-7 p-0" 
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-unlimited-gray">
                  <p>لا توجد إشعارات حالياً</p>
                </div>
              )}
              
              <Button onClick={goToNotifications} className="w-full mt-4 bg-unlimited-blue hover:bg-unlimited-dark-blue">
                عرض جميع الإشعارات
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* إضافة زر تبديل المظهر */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-unlimited-blue rounded-full shadow-lg hover:bg-unlimited-dark-blue transition-all">
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>تبديل المظهر</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* زر تغيير اللغة */}
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
                    size="icon"
                    aria-label="تغيير اللغة"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>تغيير اللغة</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="min-w-[150px]">
            <DropdownMenuItem 
              onClick={() => changeLanguage('ar')} 
              className={`gap-2 ${currentLanguage === 'ar' ? 'bg-unlimited-blue/10' : ''}`}
            >
              <span className="text-sm">العربية</span>
              {currentLanguage === 'ar' && <span className="h-2 w-2 rounded-full bg-unlimited-blue"></span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => changeLanguage('en')} 
              className={`gap-2 ${currentLanguage === 'en' ? 'bg-unlimited-blue/10' : ''}`}
            >
              <span className="text-sm">English</span>
              {currentLanguage === 'en' && <span className="h-2 w-2 rounded-full bg-unlimited-blue"></span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => changeLanguage('tr')} 
              className={`gap-2 ${currentLanguage === 'tr' ? 'bg-unlimited-blue/10' : ''}`}
            >
              <span className="text-sm">Türkçe</span>
              {currentLanguage === 'tr' && <span className="h-2 w-2 rounded-full bg-unlimited-blue"></span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* زر العودة إلى الأعلى */}
        {showScrollTop && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={scrollToTop}
                  className="rounded-full p-3 bg-unlimited-blue shadow-lg hover:bg-unlimited-dark-blue transition-all"
                  size="icon"
                  aria-label="العودة إلى الأعلى"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>العودة إلى الأعلى</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
