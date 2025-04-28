
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  toggleMobileSidebar: () => void;
  isMobile: boolean;
}

const SidebarHeader = ({ collapsed, toggleCollapsed, toggleMobileSidebar, isMobile }: SidebarHeaderProps) => {
  return (
    <div className={cn(
      "p-4 flex items-center justify-between border-b border-sidebar-border",
      collapsed ? "justify-center" : ""
    )}>
      {!collapsed && (
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png" 
            alt="Unlimited Doors Logo" 
            className="h-8 w-auto"
          />
          <span className="text-lg font-bold">أبواب بلا حدود</span>
        </Link>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCollapsed}
        className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:flex hidden"
      >
        {collapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </Button>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SidebarHeader;
