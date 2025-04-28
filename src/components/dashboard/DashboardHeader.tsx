
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  CircleUser
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

type DashboardHeaderProps = {
  userRole?: 'student' | 'admin' | 'agent';
};

const DashboardHeader = ({ userRole = 'student' }: DashboardHeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Any header left side content */}
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <Badge className="bg-unlimited-blue absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                  <div className="font-medium">تم تحديث حالة طلبك</div>
                  <div className="text-xs text-unlimited-gray">منذ ساعتين</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                  <div className="font-medium">مستندات مطلوبة</div>
                  <div className="text-xs text-unlimited-gray">منذ 5 ساعات</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                  <div className="font-medium">رسالة جديدة</div>
                  <div className="text-xs text-unlimited-gray">منذ يوم واحد</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={userRole === 'admin' ? '/admin/notifications' : '/dashboard/notifications'} className="w-full text-center text-unlimited-blue cursor-pointer">
                  {t('dashboard.viewAllNotifications')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Messages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <MessageSquare className="h-5 w-5" />
                <Badge className="bg-unlimited-blue absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold">
                  2
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>الرسائل</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                  <div className="font-medium">فريق الدعم</div>
                  <div className="text-xs text-unlimited-gray truncate w-full">شكراً لاستفسارك، يمكننا مساعدتك في ذلك</div>
                  <div className="text-xs text-unlimited-gray">منذ 3 ساعات</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                  <div className="font-medium">مستشار القبول</div>
                  <div className="text-xs text-unlimited-gray truncate w-full">تم تحديث حالة طلبك، يرجى مراجعة لوحة التحكم</div>
                  <div className="text-xs text-unlimited-gray">منذ يوم واحد</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/messages" className="w-full text-center text-unlimited-blue cursor-pointer">
                  {t('dashboard.viewAllMessages')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <CircleUser className="h-5 w-5" />
                <span className="hidden md:inline-block">محمد أحمد</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>حسابي</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile" className="flex items-center cursor-pointer">
                  <User className="ml-2 h-4 w-4" />
                  <span>الملف الشخصي</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/account-settings" className="flex items-center cursor-pointer">
                  <Settings className="ml-2 h-4 w-4" />
                  <span>الإعدادات</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center cursor-pointer">
                <LogOut className="ml-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
