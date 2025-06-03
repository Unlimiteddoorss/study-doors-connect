
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { AdminProvider } from '@/contexts/AdminContext';
import { AdminToggle } from '@/components/admin/AdminToggle';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AdminToggle />
      </div>
    </AdminProvider>
  );
};

export default MainLayout;
