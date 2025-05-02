
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Globe, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const isLoggedIn = false;
  const isAdmin = true;

  const contactInfo = {
    phone: "+90 55 24 212 214",
    email: "unlimiteddoorss@gmail.com"
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      {/* Top contact bar */}
      <div className="bg-unlimited-blue py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center hover:text-gray-200">
              <Mail className="h-4 w-4 mr-1" />
              <span dir="ltr">{contactInfo.email}</span>
            </a>
            <a href={`tel:${contactInfo.phone}`} className="flex items-center hover:text-gray-200">
              <Phone className="h-4 w-4 mr-1" />
              <span dir="ltr">{contactInfo.phone}</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => changeLanguage('ar')}
              className={`text-xs px-2 py-1 h-auto ${i18n.language === 'ar' ? 'bg-white/20' : ''}`}
            >
              العربية
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => changeLanguage('en')}
              className={`text-xs px-2 py-1 h-auto ${i18n.language === 'en' ? 'bg-white/20' : ''}`}
            >
              English
            </Button>
          </div>
        </div>
      </div>

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
            
            {/* Contact Info (Mobile) */}
            <div className="py-2 border-t border-white/20">
              <a href={`tel:${contactInfo.phone}`} className="block py-2 px-3 text-white hover:bg-blue-900/30">
                <Phone className="h-4 w-4 inline mr-2" />
                <span dir="ltr">{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="block py-2 px-3 text-white hover:bg-blue-900/30">
                <Mail className="h-4 w-4 inline mr-2" />
                <span>{contactInfo.email}</span>
              </a>
            </div>
            
            {!isLoggedIn && (
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
