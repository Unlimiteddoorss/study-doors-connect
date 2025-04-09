
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  GraduationCap,
  School,
  BookOpen,
  FileText,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const studentNavItems: NavItem[] = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'طلباتي', href: '/dashboard/applications', icon: <FileText className="h-5 w-5" /> },
  { label: 'البرامج الدراسية', href: '/programs', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'الجامعات', href: '/universities', icon: <School className="h-5 w-5" /> },
  { label: 'الرسائل', href: '/dashboard/messages', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'الإشعارات', href: '/dashboard/notifications', icon: <Bell className="h-5 w-5" /> },
  { label: 'الملف الشخصي', href: '/dashboard/profile', icon: <User className="h-5 w-5" /> },
  { label: 'الإعدادات', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
];

const adminNavItems: NavItem[] = [
  { label: 'لوحة التحكم', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'الطلبات', href: '/admin/applications', icon: <FileText className="h-5 w-5" /> },
  { label: 'الطلاب', href: '/admin/students', icon: <GraduationCap className="h-5 w-5" /> },
  { label: 'الوكلاء', href: '/admin/agents', icon: <User className="h-5 w-5" /> },
  { label: 'البرامج الدراسية', href: '/admin/programs', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'الجامعات', href: '/admin/universities', icon: <School className="h-5 w-5" /> },
  { label: 'الرسائل', href: '/admin/messages', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'الإشعارات', href: '/admin/notifications', icon: <Bell className="h-5 w-5" /> },
  { label: 'الإعدادات', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
];

const agentNavItems: NavItem[] = [
  { label: 'لوحة التحكم', href: '/agent', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'الطلاب', href: '/agent/students', icon: <GraduationCap className="h-5 w-5" /> },
  { label: 'الطلبات', href: '/agent/applications', icon: <FileText className="h-5 w-5" /> },
  { label: 'البرامج الدراسية', href: '/programs', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'الجامعات', href: '/universities', icon: <School className="h-5 w-5" /> },
  { label: 'الرسائل', href: '/agent/messages', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'الإشعارات', href: '/agent/notifications', icon: <Bell className="h-5 w-5" /> },
  { label: 'الملف الشخصي', href: '/agent/profile', icon: <User className="h-5 w-5" /> },
  { label: 'الإعدادات', href: '/agent/settings', icon: <Settings className="h-5 w-5" /> },
];

type SidebarProps = {
  userRole?: 'student' | 'admin' | 'agent';
};

const Sidebar = ({ userRole = 'student' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const navItems = userRole === 'admin' 
    ? adminNavItems 
    : userRole === 'agent' 
      ? agentNavItems 
      : studentNavItems;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed bottom-4 right-4 z-30 shadow-md bg-unlimited-blue text-white border-none hover:bg-unlimited-dark-blue"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground transition-all duration-300 fixed top-0 right-0 h-full z-40",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className={cn(
            "p-4 flex items-center justify-between border-b border-sidebar-border",
            collapsed ? "justify-center" : ""
          )}>
            {!collapsed && (
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/6e0c99ef-ce91-48b1-b3c8-49e2ef5a454a.png" 
                  alt="Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-lg font-bold">أبواب غير محدودة</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapsed}
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:flex hidden"
            >
              {collapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileSidebar}
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      collapsed ? "justify-center" : ""
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className={cn(
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full",
                collapsed ? "px-2 justify-center" : ""
              )}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {!collapsed && <span>تسجيل الخروج</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
