
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export const AdminStatCard = ({
  title,
  value,
  change,
  trend,
  icon
}: AdminStatCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-unlimited-blue/10 p-2">
          {icon}
        </div>
        <div className={cn(
          "flex items-center text-sm",
          trend === 'up' ? 'text-unlimited-success' : 'text-unlimited-danger'
        )}>
          {trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          {change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-unlimited-gray">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </Card>
  );
};
