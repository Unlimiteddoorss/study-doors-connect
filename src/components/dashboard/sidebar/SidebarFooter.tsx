
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter = ({ collapsed }: SidebarFooterProps) => {
  return (
    <div className="p-4 border-t border-sidebar-border">
      <Button
        variant="ghost"
        className={cn(
          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full",
          collapsed ? "px-2 justify-center" : ""
        )}
      >
        <LogOut className="h-5 w-5 mr-2" />
        {!collapsed && <span>تسجيل الخروج</span>}
      </Button>
    </div>
  );
};

export default SidebarFooter;
