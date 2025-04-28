
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Building,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  Users,
  UserCog,
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

type NavSection = {
  label?: string;
  items: NavItem[];
};

const AdminSidebarNav = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navSections: NavSection[] = [
    {
      items: [
        { 
          title: t('admin.sidebar.dashboard'),
          href: '/admin',
          icon: Home
        },
        { 
          title: t('admin.sidebar.studentsManagement'),
          href: '/admin/students',
          icon: Users
        },
        { 
          title: t('admin.sidebar.agentsManagement'),
          href: '/admin/agents',
          icon: UserCog
        },
        { 
          title: t('admin.sidebar.universitiesManagement'),
          href: '/admin/universities',
          icon: Building
        },
        { 
          title: t('admin.sidebar.programsManagement'),
          href: '/admin/programs',
          icon: BookOpen
        },
        { 
          title: t('admin.sidebar.applicationsManagement'),
          href: '/admin/applications',
          icon: FileText
        },
      ]
    },
    {
      label: t('admin.communication'),
      items: [
        { 
          title: t('admin.sidebar.messagingSystem'),
          href: '/admin/messages',
          icon: MessageSquare,
          badge: 12
        },
        { 
          title: t('admin.sidebar.notifications'),
          href: '/admin/notifications',
          icon: Bell,
          badge: 5
        },
      ]
    },
    {
      label: t('admin.additional'),
      items: [
        { 
          title: t('admin.sidebar.reportsStatistics'),
          href: '/admin/reports',
          icon: BarChart3
        },
        { 
          title: t('admin.sidebar.settings'),
          href: '/admin/settings',
          icon: Settings
        },
      ]
    }
  ];
  
  return (
    <nav className="space-y-1">
      {navSections.map((section, idx) => (
        <div key={idx}>
          {section.label && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <h3 className="px-3 text-xs font-semibold text-unlimited-gray uppercase tracking-wider">
                {section.label}
              </h3>
            </div>
          )}
          
          {section.items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center ${item.badge ? 'justify-between' : ''} px-3 py-2 rounded-md ${
                isActive(item.href)
                  ? 'bg-unlimited-blue text-white'
                  : 'text-unlimited-gray hover:bg-unlimited-blue/10'
              }`}
            >
              <div className="flex items-center">
                <item.icon className={`h-5 w-5 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                <span>{item.title}</span>
              </div>
              
              {item.badge && (
                <Badge className="bg-unlimited-warning text-white">{item.badge}</Badge>
              )}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default AdminSidebarNav;
