
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarNav from './sidebar/SidebarNav';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';

type SidebarProps = {
  userRole?: 'student' | 'admin' | 'agent';
};

const Sidebar = ({ userRole = 'student' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed bottom-4 right-4 z-30 shadow-md bg-unlimited-blue text-white border-none hover:bg-unlimited-dark-blue"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground transition-all duration-300 fixed top-0 right-0 h-full z-40",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <SidebarHeader 
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
            toggleMobileSidebar={toggleMobileSidebar}
            isMobile={isMobile}
          />

          <nav className="flex-1 py-4 overflow-y-auto">
            <SidebarNav userRole={userRole} collapsed={collapsed} />
          </nav>

          <SidebarFooter collapsed={collapsed} />
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
