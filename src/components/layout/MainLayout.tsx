
import React, { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AdminProvider } from '@/contexts/AdminContext';
import { AdminToggle } from '@/components/admin/AdminToggle';

interface MainLayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const MainLayout = ({ children, hideFooter = false }: MainLayoutProps) => {
  return (
    <AdminProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        {!hideFooter && <Footer />}
        <AdminToggle />
      </div>
    </AdminProvider>
  );
};

export default MainLayout;
