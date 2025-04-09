
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import Logo from '../shared/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isLoggedIn = false; // Will be replaced with auth state
  // This would be determined by user role in a real app
  const isAdmin = true; // Demo: Setting to true to show admin options

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'البرامج الدراسية', href: '/programs' },
    { name: 'الجامعات', href: '/universities' },
    { name: 'من نحن', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
    { name: 'طلب التسجيل', href: '/apply' },
  ];

  return (
    <header className="bg-unlimited-dark-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium hover:text-unlimited-light-blue transition-colors ${
                  pathname === item.href ? 'text-unlimited-light-blue' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-unlimited-light-blue">
                    <User className="h-5 w-5 mr-2" />
                    <span>حسابي</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="w-full">لوحة التحكم</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">الملف الشخصي</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/admin" className="w-full flex items-center">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          <span>لوحة الإدارة</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/admin/students" className="w-full">إدارة الطلاب</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/admin/agents" className="w-full">إدارة الوكلاء</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/admin/universities" className="w-full">إدارة الجامعات</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/admin/applications" className="w-full">طلبات التسجيل</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-white hover:text-unlimited-light-blue">
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
                <Button asChild className="bg-unlimited-blue hover:bg-unlimited-blue/90">
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 px-3 rounded-md ${
                  pathname === item.href
                    ? 'bg-unlimited-blue text-white'
                    : 'hover:bg-blue-900/30'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="pt-2 flex flex-col space-y-2">
                <Button asChild variant="outline" className="border-white text-white">
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
                <Button asChild className="bg-unlimited-blue hover:bg-unlimited-blue/90">
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </div>
            )}
            {isLoggedIn && isAdmin && (
              <div className="pt-2 border-t border-white/20 mt-2">
                <p className="text-unlimited-light-blue font-semibold py-2">لوحات الإدارة</p>
                <Link
                  to="/admin"
                  className="block py-2 px-3 rounded-md hover:bg-blue-900/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  لوحة الإدارة الرئيسية
                </Link>
                <Link
                  to="/admin/students"
                  className="block py-2 px-3 rounded-md hover:bg-blue-900/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  إدارة الطلاب
                </Link>
                <Link
                  to="/admin/agents"
                  className="block py-2 px-3 rounded-md hover:bg-blue-900/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  إدارة الوكلاء
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
