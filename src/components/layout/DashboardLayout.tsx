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
    title = t('dashboard.student.title', 'لوحة تحكم الطالب');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' }, 
      { label: t('dashboard.student.title', 'لوحة تحكم الطالب'), href: '/dashboard' }
    ];
  } else if (pathname === '/dashboard/applications') {
    title = t('application.myApplications.title', 'طلباتي');
    subtitle = t('application.myApplications.subtitle', 'متابعة جميع طلباتك الجامعية');
    showNewApplicationButton = true;
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('dashboard.student.title', 'لوحة تحكم الطالب'), href: '/dashboard' },
      { label: t('application.myApplications.title', 'طلباتي'), href: '/dashboard/applications' },
    ];
  } else if (pathname === '/admin' || pathname === '/admin/dashboard') {
    title = t('admin.dashboard.title', 'لوحة التحكم الإدارية');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' }, 
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' }
    ];
  } else if (pathname === '/admin/students' || pathname === '/admin/students-enhanced') {
    title = t('admin.sidebar.studentsManagement', 'إدارة الطلاب');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.studentsManagement', 'إدارة الطلاب'), href: '/admin/students' },
    ];
  } else if (pathname === '/admin/applications') {
    title = t('admin.sidebar.applicationsManagement', 'إدارة الطلبات');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.applicationsManagement', 'إدارة الطلبات'), href: '/admin/applications' },
    ];
  } else if (pathname === '/admin/programs' || pathname === '/admin/programs-enhanced') {
    title = t('admin.sidebar.programsManagement', 'إدارة البرامج');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.programsManagement', 'إدارة البرامج'), href: '/admin/programs' },
    ];
  } else if (pathname === '/admin/agents' || pathname === '/admin/agents-enhanced') {
    title = t('admin.sidebar.agentsManagement', 'إدارة الوكلاء');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.agentsManagement', 'إدارة الوكلاء'), href: '/admin/agents' },
    ];
  } else if (pathname === '/admin/universities') {
    title = t('admin.sidebar.universitiesManagement', 'إدارة الجامعات');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.universitiesManagement', 'إدارة الجامعات'), href: '/admin/universities' },
    ];
  } else if (pathname === '/admin/universities/review') {
    title = 'مراجعة الجامعات';
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: 'مراجعة الجامعات', href: '/admin/universities/review' },
    ];
  } else if (pathname === '/admin/reports') {
    title = t('admin.sidebar.reportsStatistics', 'التقارير والإحصائيات');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.reportsStatistics', 'التقارير'), href: '/admin/reports' },
    ];
  } else if (pathname === '/admin/notifications') {
    title = t('admin.sidebar.notifications', 'إدارة الإشعارات');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.notifications', 'الإشعارات'), href: '/admin/notifications' },
    ];
  } else if (pathname === '/admin/messages') {
    title = t('admin.sidebar.messagingSystem', 'إدارة الرسائل');
    breadcrumbs = [
      { label: t('dashboard.home', 'الرئيسية'), href: '/' },
      { label: t('admin.dashboard.title', 'لوحة التحكم'), href: '/admin' },
      { label: t('admin.sidebar.messagingSystem', 'الرسائل'), href: '/admin/messages' },
    ];
  }
  
  // Handle hash change to update UI
  useEffect(() => {
    const handleHashChange = () => {
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
                  {t('application.myApplications.newApplication', 'طلب جديد')}
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
