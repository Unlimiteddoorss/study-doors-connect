
import { useState, useEffect, ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageCircle, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Search
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: 'student' | 'admin' | 'agent';
}

const DashboardLayout = ({ children, userRole = 'student' }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  
  useEffect(() => {
    // Set page title based on role
    let roleTitle = userRole === 'admin' ? 'المشرف' : userRole === 'agent' ? 'الوكيل' : 'الطالب';
    document.title = `لوحة تحكم ${roleTitle} - أبواب بلا حدود`;
  }, [userRole]);
  
  const handleLogout = () => {
    toast({
      title: "تم تسجيل الخروج بنجاح",
      description: "نراك قريباً!",
    });
    
    // Redirect to homepage after logout
    navigate('/');
  };
  
  // Determine dashboard home path based on role
  const dashboardHomePath = userRole === 'admin' 
    ? '/admin' 
    : userRole === 'agent' 
      ? '/agent' 
      : '/dashboard';

  // Determine messages path based on role
  const messagesPath = userRole === 'admin' 
    ? '/admin/messages' 
    : userRole === 'agent' 
      ? '/agent/messages' 
      : '/dashboard/messages';
      
  // Determine notifications path based on role
  const notificationsPath = userRole === 'admin' 
    ? '/admin/notifications' 
    : userRole === 'agent' 
      ? '/agent/notifications' 
      : '/dashboard/notifications';
      
  // Determine profile path based on role
  const profilePath = userRole === 'admin' 
    ? '/admin/profile' 
    : userRole === 'agent' 
      ? '/agent/profile' 
      : '/dashboard/profile';
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full" dir="rtl">
        <Sidebar side="right" className="bg-sidebar border-l">
          <SidebarHeader>
            <Link to="/" className="flex items-center gap-3 p-4">
              <img src="/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png" alt="Logo" className="h-10 w-auto" />
              <div>
                <h1 className="font-bold text-lg text-white">أبواب بلا حدود</h1>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === dashboardHomePath}
                    >
                      <Link to={dashboardHomePath}>
                        <LayoutDashboard className="h-5 w-5" />
                        <span>لوحة التحكم</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === `${dashboardHomePath}/applications` || location.pathname === `/dashboard/applications`}
                    >
                      <Link to={`${userRole === 'student' ? '/dashboard' : dashboardHomePath}/applications`}>
                        <FileText className="h-5 w-5" />
                        <span>{userRole === 'student' ? 'طلباتي' : 'الطلبات'}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === messagesPath}
                    >
                      <Link to={messagesPath}>
                        <MessageCircle className="h-5 w-5" />
                        <span>الرسائل</span>
                        {messages > 0 && (
                          <span className="mr-2 bg-unlimited-blue text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                            {messages}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === notificationsPath}
                    >
                      <Link to={notificationsPath}>
                        <Bell className="h-5 w-5" />
                        <span>الإشعارات</span>
                        {notifications > 0 && (
                          <span className="mr-2 bg-unlimited-blue text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                            {notifications}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === profilePath}
                    >
                      <Link to={profilePath}>
                        <User className="h-5 w-5" />
                        <span>الملف الشخصي</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>استكشاف</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/programs">
                        <FileText className="h-5 w-5" />
                        <span>البرامج الدراسية</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/universities">
                        <FileText className="h-5 w-5" />
                        <span>الجامعات</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarGroup>
              <SidebarGroupContent className="px-4 py-4">
                <Button 
                  variant="outline"
                  className="w-full justify-start text-white border-white/20 hover:bg-white/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  <span>تسجيل الخروج</span>
                </Button>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 bg-gray-50 min-h-screen">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container px-4 h-16 flex items-center justify-between">
              <div className="flex items-center w-full gap-4 justify-between">
                <Link to="/">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </Link>
                
                <div className="hidden md:block flex-1 max-w-sm ml-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-unlimited-gray" />
                    <Input
                      placeholder="بحث سريع..."
                      className="pl-4 pr-10"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link to={notificationsPath}>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </Link>
                  
                  <Link to={messagesPath}>
                    <Button variant="ghost" size="icon" className="relative">
                      <MessageCircle className="h-5 w-5" />
                      {messages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {messages}
                        </span>
                      )}
                    </Button>
                  </Link>
                  
                  <Link to={profilePath}>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>محمد أحمد</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
