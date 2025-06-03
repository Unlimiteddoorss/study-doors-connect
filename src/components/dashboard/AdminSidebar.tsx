
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Building2,
  BookOpen,
  UserCheck,
  MessageSquare,
  Bell,
  BarChart,
  CheckCircle,
  Settings
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح"
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive"
      });
    }
  };

  const menuItems = [
    {
      title: "لوحة التحكم",
      href: "/admin/dashboard",
      icon: BarChart3,
    },
    {
      title: "نظرة عامة",
      href: "/admin/overview",
      icon: TrendingUp,
    },
    {
      title: "إدارة الطلاب",
      href: "/admin/students",
      icon: Users,
    },
    {
      title: "إدارة الطلبات",
      href: "/admin/applications",
      icon: FileText,
    },
    {
      title: "إدارة الجامعات",
      href: "/admin/universities",
      icon: Building2,
    },
    {
      title: "مراجعة الجامعات",
      href: "/admin/universities/review",
      icon: CheckCircle,
    },
    {
      title: "إدارة البرامج",
      href: "/admin/programs",
      icon: BookOpen,
    },
    {
      title: "إدارة الوكلاء",
      href: "/admin/agents",
      icon: UserCheck,
    },
    {
      title: "الرسائل",
      href: "/admin/messages",
      icon: MessageSquare,
    },
    {
      title: "الإشعارات",
      href: "/admin/notifications",
      icon: Bell,
    },
    {
      title: "التقارير",
      href: "/admin/reports",
      icon: BarChart,
    },
    {
      title: "الإعدادات",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="bg-white border-r">
      <SidebarHeader>
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/logo.svg"
            alt="Unlimited Edu"
            className="h-8 w-8"
          />
          <span className="font-bold text-xl">Unlimited Edu</span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <a 
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                  location.pathname === item.href ? 'bg-gray-100 text-gray-900' : ''
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <button onClick={handleLogout} className="w-full py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-md">
          تسجيل الخروج
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
