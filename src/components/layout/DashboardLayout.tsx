
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useTranslation } from 'react-i18next';

type DashboardLayoutProps = {
  children: ReactNode;
  userRole?: 'student' | 'admin' | 'agent';
};

const DashboardLayout = ({ children, userRole = 'student' }: DashboardLayoutProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  
  let title = '';
  let breadcrumbs: { label: string; href: string }[] = [];
  
  // Determine page title and breadcrumbs based on path
  if (pathname === '/dashboard') {
    title = t('admin.dashboard');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' }, 
      { label: t('admin.breadcrumbs.dashboard'), href: '/dashboard' }
    ];
  } else if (pathname === '/dashboard/applications') {
    title = t('application.myApplications.title');
    breadcrumbs = [
      { label: t('admin.breadcrumbs.home'), href: '/' },
      { label: t('admin.breadcrumbs.dashboard'), href: '/dashboard' },
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
  // Add more conditions for different paths

  return (
    <div className="flex h-screen bg-gray-50">
      {userRole === 'admin' ? <AdminSidebar /> : <Sidebar userRole={userRole} />}
      
      <div className="flex flex-col flex-1 lg:pr-[250px] transition-all duration-300">
        <DashboardHeader userRole={userRole} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-2">{title}</h1>
            <nav className="flex">
              {breadcrumbs.map((item, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <span className="mx-2 text-unlimited-gray">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-unlimited-gray">{item.label}</span>
                  ) : (
                    <a href={item.href} className="text-unlimited-blue hover:underline">
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
