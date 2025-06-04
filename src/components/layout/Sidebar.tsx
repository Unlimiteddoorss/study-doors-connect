
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  FileText,
  Users,
  University,
  MessageSquare,
  Settings,
  BarChart3,
  UserCheck,
  Calendar,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  userRole?: 'student' | 'admin' | 'agent';
}

const Sidebar = ({ userRole = 'student' }: SidebarProps) => {
  const location = useLocation();

  const getNavigationItems = () => {
    if (userRole === 'admin') {
      return [
        { name: 'لوحة التحكم', href: '/admin', icon: Home },
        { name: 'الطلبات', href: '/admin/applications', icon: FileText },
        { name: 'الطلاب', href: '/admin/students', icon: Users },
        { name: 'الجامعات', href: '/admin/universities', icon: University },
        { name: 'الوكلاء', href: '/admin/agents', icon: UserCheck },
        { name: 'التقارير', href: '/admin/reports', icon: BarChart3 },
        { name: 'الرسائل', href: '/admin/messages', icon: MessageSquare },
        { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
      ];
    } else if (userRole === 'agent') {
      return [
        { name: 'لوحة التحكم', href: '/agent', icon: Home },
        { name: 'طلابي', href: '/agent/students', icon: Users },
        { name: 'الطلبات', href: '/agent/applications', icon: FileText },
        { name: 'الرسائل', href: '/messages', icon: MessageSquare },
        { name: 'التقويم', href: '/calendar', icon: Calendar },
        { name: 'الإعدادات', href: '/settings', icon: Settings },
      ];
    } else {
      return [
        { name: 'لوحة التحكم', href: '/dashboard', icon: Home },
        { name: 'طلباتي', href: '/applications', icon: FileText },
        { name: 'البرامج', href: '/programs', icon: BookOpen },
        { name: 'الجامعات', href: '/universities', icon: University },
        { name: 'الرسائل', href: '/messages', icon: MessageSquare },
        { name: 'الملف الشخصي', href: '/profile', icon: Users },
        { name: 'الإعدادات', href: '/settings', icon: Settings },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-unlimited-blue text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon className="ml-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
