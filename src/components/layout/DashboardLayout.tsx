
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

type DashboardLayoutProps = {
  children: ReactNode;
  userRole?: 'student' | 'admin' | 'agent';
};

const DashboardLayout = ({ children, userRole = 'student' }: DashboardLayoutProps) => {
  const { pathname } = useLocation();
  
  let title = '';
  let breadcrumbs: { label: string; href: string }[] = [];
  
  // Determine page title and breadcrumbs based on path
  if (pathname === '/dashboard') {
    title = 'لوحة التحكم';
    breadcrumbs = [{ label: 'الرئيسية', href: '/' }, { label: 'لوحة التحكم', href: '/dashboard' }];
  } else if (pathname === '/dashboard/applications') {
    title = 'طلباتي';
    breadcrumbs = [
      { label: 'الرئيسية', href: '/' },
      { label: 'لوحة التحكم', href: '/dashboard' },
      { label: 'طلباتي', href: '/dashboard/applications' },
    ];
  }
  // Add more conditions for different paths

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      
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
