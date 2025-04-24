
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
  } else if (pathname === '/admin') {
    title = t('admin.breadcrumbs.adminDashboard');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' }, 
      { label: t('admin.breadcrumbs.adminDashboard'), href: '/admin' }
    ];
  } else if (pathname === '/admin/students') {
    title = t('admin.students');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' },
      { label: t('admin.breadcrumbs.adminDashboard'), href: '/admin' },
      { label: t('admin.breadcrumbs.students'), href: '/admin/students' },
    ];
  } else if (pathname === '/admin/applications') {
    title = t('admin.applications');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' },
      { label: t('admin.breadcrumbs.adminDashboard'), href: '/admin' },
      { label: t('admin.breadcrumbs.applications'), href: '/admin/applications' },
    ];
  } else if (pathname === '/admin/programs') {
    title = t('admin.programs');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' },
      { label: t('admin.breadcrumbs.adminDashboard'), href: '/admin' },
      { label: t('admin.breadcrumbs.programs'), href: '/admin/programs' },
    ];
  } else if (pathname === '/admin/agents') {
    title = t('admin.agents');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' },
      { label: t('admin.breadcrumbs.adminDashboard'), href: '/admin' },
      { label: t('admin.breadcrumbs.agents'), href: '/admin/agents' },
    ];
  } else if (pathname === '/admin/universities') {
    title = t('admin.universities');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' },
      { label: t('admin.breadcrumbs.adminDashboard'), href: '/admin' },
      { label: t('admin.breadcrumbs.universities'), href: '/admin/universities' },
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
      
      <div className="flex flex-col flex-1 lg:pr-[250px] transition-all duration-300">
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
