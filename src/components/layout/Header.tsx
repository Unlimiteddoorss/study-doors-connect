
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/components/auth/RealAuthProvider';

import Logo from '../shared/Logo';
import DarkModeToggle from '@/components/shared/DarkModeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const { user, userRole, signOut } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = userRole === 'admin';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.programs'), href: '/programs' },
    { name: t('nav.universities'), href: '/universities' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
    { name: t('nav.apply'), href: '/apply' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update document direction based on language
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

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

          {/* Add the dark mode toggle before the language selection or other header controls */}
          <div className="hidden md:flex items-center gap-4">
            <DarkModeToggle />
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Globe className="h-4 w-4 mr-2" />
                  {i18n.language === 'ar' ? 'العربية' : 'English'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
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
                  <DropdownMenuItem className="text-red-500" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-white hover:text-unlimited-light-blue">
                  <Link to="/login">{t('auth.login')}</Link>
                </Button>
                <Button asChild className="bg-unlimited-blue hover:bg-unlimited-blue/90">
                  <Link to="/register">{t('auth.register')}</Link>
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
            
            {/* Language Switcher (Mobile) */}
            <div className="py-2 border-t border-white/20">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
                onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
              >
                <Globe className="h-4 w-4 mr-2" />
                {i18n.language === 'ar' ? 'English' : 'العربية'}
              </Button>
            </div>

            {isLoggedIn ? (
              <div className="pt-2 border-t border-white/20 space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start text-white">
                  <Link to="/dashboard">لوحة التحكم</Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="ghost" className="w-full justify-start text-white">
                    <Link to="/admin">لوحة الإدارة</Link>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-300"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  تسجيل الخروج
                </Button>
              </div>
            ) : (
              <div className="pt-2 flex flex-col space-y-2">
                <Button asChild variant="outline" className="border-white text-white">
                  <Link to="/login">{t('auth.login')}</Link>
                </Button>
                <Button asChild className="bg-unlimited-blue hover:bg-unlimited-blue/90">
                  <Link to="/register">{t('auth.register')}</Link>
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
