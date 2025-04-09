
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Building,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  Users,
  UserCog,
  Bell
} from 'lucide-react';
import Logo from '../shared/Logo';
import { Badge } from '../ui/badge';

const AdminSidebar = () => {
  const { pathname } = useLocation();
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  return (
    <div className="fixed inset-y-0 right-0 w-[250px] border-l border-gray-200 bg-white z-30 flex flex-col">
      <div className="p-4 bg-unlimited-dark-blue text-white">
        <Logo />
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        <nav className="space-y-1">
          <Link
            to="/admin"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin') && !isActive('/admin/students') && !isActive('/admin/agents') && !isActive('/admin/universities') && !isActive('/admin/applications') && !isActive('/admin/programs')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <Home className="h-5 w-5 ml-2" />
            <span>لوحة التحكم</span>
          </Link>
          
          <Link
            to="/admin/students"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/students')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <Users className="h-5 w-5 ml-2" />
            <span>إدارة الطلاب</span>
          </Link>
          
          <Link
            to="/admin/agents"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/agents')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <UserCog className="h-5 w-5 ml-2" />
            <span>إدارة الوكلاء</span>
          </Link>
          
          <Link
            to="/admin/universities"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/universities')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <Building className="h-5 w-5 ml-2" />
            <span>إدارة الجامعات</span>
          </Link>
          
          <Link
            to="/admin/programs"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/programs')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <BookOpen className="h-5 w-5 ml-2" />
            <span>إدارة البرامج</span>
          </Link>
          
          <Link
            to="/admin/applications"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/applications')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <FileText className="h-5 w-5 ml-2" />
            <span>إدارة الطلبات</span>
          </Link>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-unlimited-gray uppercase tracking-wider">
              التواصل والإشعارات
            </h3>
          </div>
          
          <Link
            to="/admin/messages"
            className={`flex items-center justify-between px-3 py-2 rounded-md ${
              isActive('/admin/messages')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 ml-2" />
              <span>نظام المراسلات</span>
            </div>
            <Badge className="bg-unlimited-warning text-white">12</Badge>
          </Link>
          
          <Link
            to="/admin/notifications"
            className={`flex items-center justify-between px-3 py-2 rounded-md ${
              isActive('/admin/notifications')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <div className="flex items-center">
              <Bell className="h-5 w-5 ml-2" />
              <span>الإشعارات</span>
            </div>
            <Badge className="bg-unlimited-danger text-white">5</Badge>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-unlimited-gray uppercase tracking-wider">
              إضافي
            </h3>
          </div>
          
          <Link
            to="/admin/reports"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/reports')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <BarChart3 className="h-5 w-5 ml-2" />
            <span>التقارير والإحصائيات</span>
          </Link>
          
          <Link
            to="/admin/settings"
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/settings')
                ? 'bg-unlimited-blue text-white'
                : 'text-unlimited-gray hover:bg-unlimited-blue/10'
            }`}
          >
            <Settings className="h-5 w-5 ml-2" />
            <span>الإعدادات</span>
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-unlimited-blue/20 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-unlimited-blue" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-unlimited-dark-blue">مدير النظام</p>
            <p className="text-xs text-unlimited-gray">أبواب بلا حدود</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
