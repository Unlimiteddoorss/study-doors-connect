
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../shared/Logo';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Main navigation links
  const navLinks = [
    { text: 'الرئيسية', href: '/' },
    { text: 'البرامج الدراسية', href: '/programs' },
    { text: 'الجامعات', href: '/universities' },
    { text: 'من نحن', href: '/about' },
    { text: 'تواصل معنا', href: '/contact' },
    { text: 'طلب التسجيل', href: '/apply' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all',
        isScrolled
          ? 'bg-unlimited-dark-blue bg-opacity-95 shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0 rtl:space-x-reverse">
            <nav className="flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 text-white hover:text-unlimited-light-blue transition-colors relative group',
                    location.pathname === link.href && 'text-unlimited-light-blue'
                  )}
                >
                  {link.text}
                  {location.pathname === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-unlimited-light-blue"></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button asChild variant="ghost" className="text-white hover:text-unlimited-light-blue hover:bg-transparent">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild className="bg-white text-unlimited-blue hover:bg-gray-100">
              <Link to="/register">إنشاء حساب</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-unlimited-dark-blue">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 text-white hover:text-unlimited-light-blue transition-colors',
                    location.pathname === link.href && 'text-unlimited-light-blue bg-white/10 rounded'
                  )}
                >
                  {link.text}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/20 flex space-x-4 rtl:space-x-reverse">
                <Button asChild variant="ghost" className="w-1/2 text-white hover:text-unlimited-light-blue hover:bg-transparent">
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
                <Button asChild className="w-1/2 bg-white text-unlimited-blue hover:bg-gray-100">
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
