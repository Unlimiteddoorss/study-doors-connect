
import { useState } from 'react';
import { Bell, MessageSquare, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type DashboardHeaderProps = {
  userRole?: 'student' | 'admin' | 'agent';
  userName?: string;
};

const DashboardHeader = ({ 
  userRole = 'student', 
  userName = 'محمد أحمد'
}: DashboardHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6">
      <div className="flex justify-between items-center">
        {/* Left Section - Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block w-64">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="بحث سريع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 w-full"
          />
        </form>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">تم تحديث حالة طلبك</div>
                  <div className="text-sm text-gray-500 mt-1">تم قبول طلبك للبرنامج الدراسي في جامعة أوزيجين</div>
                  <div className="text-xs text-gray-400 mt-1">منذ ساعتين</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">رسالة جديدة</div>
                  <div className="text-sm text-gray-500 mt-1">لديك رسالة جديدة من قسم الدعم</div>
                  <div className="text-xs text-gray-400 mt-1">منذ 5 ساعات</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-unlimited-blue">
                عرض جميع الإشعارات
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>الرسائل</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">قسم الدعم</div>
                  <div className="text-sm text-gray-500 mt-1 line-clamp-1">مرحباً، هل يمكنك تزويدنا بمعلومات إضافية عن طلبك؟</div>
                  <div className="text-xs text-gray-400 mt-1">منذ ساعة</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">د. أحمد محمد</div>
                  <div className="text-sm text-gray-500 mt-1 line-clamp-1">شكراً لاستفسارك، يسعدنا تقديم المساعدة...</div>
                  <div className="text-xs text-gray-400 mt-1">منذ يومين</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-unlimited-blue">
                عرض جميع الرسائل
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <span className="hidden sm:inline-block">{userName}</span>
                <div className="h-8 w-8 rounded-full bg-unlimited-blue text-white flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>حسابي</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">تسجيل الخروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
