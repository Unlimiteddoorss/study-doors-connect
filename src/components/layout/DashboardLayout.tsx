
import { ReactNode, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type DashboardLayoutProps = {
  children: ReactNode;
  userRole?: 'student' | 'admin' | 'agent';
};

const DashboardLayout = ({ children, userRole = 'student' }: DashboardLayoutProps) => {
  const { pathname, hash } = useLocation();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  let title = '';
  let subtitle = '';
  let breadcrumbs: { label: string; href: string }[] = [];
  let showNewApplicationButton = false;
  
  // Determine page title and breadcrumbs based on path
  if (pathname === '/dashboard') {
    title = t('dashboard.student.title');
    breadcrumbs = [
      { label: t('dashboard.home'), href: '/' }, 
      { label: t('dashboard.student.title'), href: '/dashboard' }
    ];
  } else if (pathname === '/dashboard/applications') {
    title = t('application.myApplications.title');
    subtitle = t('application.myApplications.subtitle');
    showNewApplicationButton = true;
    breadcrumbs = [
      { label: t('dashboard.home'), href: '/' },
      { label: t('dashboard.student.title'), href: '/dashboard' },
      { label: t('application.myApplications.title'), href: '/dashboard/applications' },
    ];
  } else if (pathname === '/admin' || pathname === '/admin/dashboard') {
    title = 'لوحة التحكم الإدارية';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' }, 
      { label: 'لوحة التحكم', href: '/admin' }
    ];
  } else if (pathname === '/admin/students' || pathname === '/admin/students-enhanced') {
    title = 'إدارة الطلاب';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'إدارة الطلاب', href: '/admin/students' },
    ];
  } else if (pathname === '/admin/applications') {
    title = 'إدارة الطلبات';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'إدارة الطلبات', href: '/admin/applications' },
    ];
  } else if (pathname === '/admin/programs' || pathname === '/admin/programs-enhanced') {
    title = 'إدارة البرامج';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'إدارة البرامج', href: '/admin/programs' },
    ];
  } else if (pathname === '/admin/agents' || pathname === '/admin/agents-enhanced') {
    title = 'إدارة الوكلاء';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'إدارة الوكلاء', href: '/admin/agents' },
    ];
  } else if (pathname === '/admin/universities') {
    title = 'إدارة الجامعات';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'إدارة الجامعات', href: '/admin/universities' },
    ];
  } else if (pathname === '/admin/reports') {
    title = 'التقارير والإحصائيات';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'التقارير', href: '/admin/reports' },
    ];
  } else if (pathname === '/admin/notifications') {
    title = 'إدارة الإشعارات';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'الإشعارات', href: '/admin/notifications' },
    ];
  } else if (pathname === '/admin/messages') {
    title = 'إدارة الرسائل';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/admin' },
      { label: 'الرسائل', href: '/admin/messages' },
    ];
  }
  
  // Handle hash change to update UI
  useEffect(() => {
    // This will handle the back/forward browser navigation with hash changes
    const handleHashChange = () => {
      // Force a re-render when hash changes
      window.dispatchEvent(new Event('hashchange'));
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className={`flex h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`}>
      {userRole === 'admin' ? <AdminSidebar /> : <Sidebar userRole={userRole} />}
      
      <div className={`flex flex-col flex-1 ${isRtl ? 'lg:pr-[250px]' : 'lg:pl-[250px]'} transition-all duration-300`}>
        <DashboardHeader userRole={userRole} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-2">{title}</h1>
              {subtitle && <p className="text-unlimited-gray">{subtitle}</p>}
              <nav className="flex mt-2">
                {breadcrumbs.map((item, i) => (
                  <div key={i} className="flex items-center">
                    {i > 0 && <span className="mx-2 text-unlimited-gray">/</span>}
                    {i === breadcrumbs.length - 1 ? (
                      <span className="text-unlimited-gray">{item.label}</span>
                    ) : (
                      <Link to={item.href} className="text-unlimited-blue hover:underline">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            
            {showNewApplicationButton && (
              <Link to="/apply">
                <Button className="flex items-center">
                  <Plus className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                  {t('application.myApplications.newApplication')}
                </Button>
              </Link>
            )}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
