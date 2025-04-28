
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
} from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  notificationCount?: number;
};

interface SidebarNavProps {
  userRole: 'student' | 'admin' | 'agent';
  collapsed: boolean;
}

const SidebarNav = ({ userRole, collapsed }: SidebarNavProps) => {
  const { pathname } = useLocation();
  
  const studentNavItems: NavItem[] = [
    { label: 'لوحة التحكم', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'طلباتي', href: '/dashboard/applications', icon: <FileText className="h-5 w-5" /> },
    { label: 'البرامج الدراسية', href: '/programs', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'الجامعات', href: '/universities', icon: <School className="h-5 w-5" /> },
    { label: 'الرسائل', href: '/messages', icon: <MessageSquare className="h-5 w-5" />, notificationCount: 2 },
    { label: 'الإشعارات', href: '/dashboard/notifications', icon: <Bell className="h-5 w-5" />, notificationCount: 3 },
    { label: 'الملف الشخصي', href: '/dashboard/profile', icon: <User className="h-5 w-5" /> },
    { label: 'الإعدادات', href: '/dashboard/account-settings', icon: <Settings className="h-5 w-5" /> },
  ];
  
  const adminNavItems: NavItem[] = [
    { label: 'لوحة التحكم', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'الطلبات', href: '/admin/applications', icon: <FileText className="h-5 w-5" />, notificationCount: 5 },
    { label: 'الطلاب', href: '/admin/students', icon: <GraduationCap className="h-5 w-5" /> },
    { label: 'الوكلاء', href: '/admin/agents', icon: <User className="h-5 w-5" /> },
    { label: 'البرامج الدراسية', href: '/admin/programs', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'الجامعات', href: '/admin/universities', icon: <School className="h-5 w-5" /> },
    { label: 'الرسائل', href: '/admin/messages', icon: <MessageSquare className="h-5 w-5" />, notificationCount: 8 },
    { label: 'الإشعارات', href: '/admin/notifications', icon: <Bell className="h-5 w-5" />, notificationCount: 3 },
    { label: 'الإعدادات', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];
  
  const agentNavItems: NavItem[] = [
    { label: 'لوحة التحكم', href: '/agent', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'الطلاب', href: '/agent/students', icon: <GraduationCap className="h-5 w-5" /> },
    { label: 'الطلبات', href: '/agent/applications', icon: <FileText className="h-5 w-5" />, notificationCount: 3 },
    { label: 'البرامج الدراسية', href: '/programs', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'الجامعات', href: '/universities', icon: <School className="h-5 w-5" /> },
    { label: 'الرسائل', href: '/agent/messages', icon: <MessageSquare className="h-5 w-5" />, notificationCount: 4 },
    { label: 'الإشعارات', href: '/agent/notifications', icon: <Bell className="h-5 w-5" />, notificationCount: 2 },
    { label: 'الملف الشخصي', href: '/agent/profile', icon: <User className="h-5 w-5" /> },
    { label: 'الإعدادات', href: '/agent/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const navItems = userRole === 'admin' 
    ? adminNavItems 
    : userRole === 'agent' 
      ? agentNavItems 
      : studentNavItems;

  return (
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
            <div className="relative">
              {item.icon}
              {item.notificationCount && !collapsed ? (
                <span className="absolute -top-2 -right-2 bg-unlimited-blue text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {item.notificationCount}
                </span>
              ) : item.notificationCount && collapsed ? (
                <span className="absolute -top-1 -right-1 bg-unlimited-blue rounded-full w-3 h-3"></span>
              ) : null}
            </div>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNav;
