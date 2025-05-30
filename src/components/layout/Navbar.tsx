
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, User, BookOpen, Building, Phone, Info } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'الرئيسية', icon: null },
    { href: '/programs', label: 'البرامج', icon: BookOpen },
    { href: '/universities', label: 'الجامعات', icon: Building },
    { href: '/countries', label: 'الدول', icon: Globe },
    { href: '/about', label: 'عن الشركة', icon: Info },
    { href: '/contact', label: 'اتصل بنا', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-unlimited-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">UD</span>
            </div>
            <span className="font-bold text-xl text-unlimited-dark-blue">أبواب بلا حدود</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-unlimited-blue ${
                  isActive(item.href)
                    ? 'text-unlimited-blue'
                    : 'text-unlimited-gray'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
            <Button size="sm" className="bg-unlimited-blue hover:bg-unlimited-dark-blue" asChild>
              <Link to="/register">إنشاء حساب</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-unlimited-blue text-white'
                          : 'text-unlimited-gray hover:bg-gray-100'
                      }`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                
                <div className="border-t pt-4 mt-4 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login" onClick={() => setIsOpen(false)}>تسجيل الدخول</Link>
                  </Button>
                  <Button className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue" asChild>
                    <Link to="/register" onClick={() => setIsOpen(false)}>إنشاء حساب</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
