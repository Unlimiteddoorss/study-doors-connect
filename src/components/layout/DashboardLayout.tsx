
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'student' | 'admin' | 'agent';
}

const DashboardLayout = ({ children, userRole = 'student' }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole={userRole} userName="محمد أحمد" />
      <div className="flex">
        <Sidebar userRole={userRole} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
