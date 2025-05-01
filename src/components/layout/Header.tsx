
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin,
  Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow" : "bg-transparent"
    )}>
      {/* Top Header with Contact Info */}
      <div className="bg-unlimited-dark-blue text-white py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span dir="ltr">+90 552 286 8989</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              <span>info@unlimited-edu.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>Istanbul, Bahçelievler, Turkey</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-unlimited-blue/50 p-1 h-6 w-6">
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Header with Navigation */}
      <div className={cn(
        "py-2 md:py-4 transition-all duration-300",
        isScrolled ? "bg-white" : "bg-white/90 md:bg-transparent"
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 md:h-14 w-auto transition-all duration-300">
              <img 
                src="/logo.svg" 
                alt="Unlimited Education"
                className={cn(
                  "h-full",
                  isScrolled ? "filter-none" : "md:brightness-0 md:invert"
                )}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" isActive={isActive('/')} isScrolled={isScrolled}>
              الرئيسية
            </NavLink>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "px-3 py-2 rounded-md flex items-center gap-1 transition-colors",
                  isActive('/countries') || isActive('/universities') || isActive('/universities/turkey') ? 
                    "text-unlimited-blue font-medium" : 
                    isScrolled ? "hover:text-unlimited-blue" : "text-white hover:text-unlimited-blue hover:bg-white/90"
                )}>
                  الدراسة في الخارج
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/countries" className="w-full cursor-pointer">الدراسة حسب الدول</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/universities" className="w-full cursor-pointer">جميع الجامعات</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/universities/turkey" className="w-full cursor-pointer">الجامعات التركية</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "px-3 py-2 rounded-md flex items-center gap-1 transition-colors",
                  isActive('/programs') || isActive('/programs/engineering') || isActive('/programs/medical') ? 
                    "text-unlimited-blue font-medium" : 
                    isScrolled ? "hover:text-unlimited-blue" : "text-white hover:text-unlimited-blue hover:bg-white/90"
                )}>
                  البرامج الدراسية
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/programs" className="w-full cursor-pointer">جميع البرامج</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/programs/engineering" className="w-full cursor-pointer">برامج الهندسة</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/programs/medical" className="w-full cursor-pointer">البرامج الطبية</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/programs/software-engineering" className="w-full cursor-pointer">هندسة البرمجيات</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <NavLink to="/scholarships" isActive={isActive('/scholarships')} isScrolled={isScrolled}>
              المنح الدراسية
            </NavLink>
            
            <NavLink to="/services" isActive={isActive('/services')} isScrolled={isScrolled}>
              خدماتنا
            </NavLink>
            
            <NavLink to="/about" isActive={isActive('/about')} isScrolled={isScrolled}>
              من نحن
            </NavLink>
            
            <NavLink to="/contact" isActive={isActive('/contact')} isScrolled={isScrolled}>
              اتصل بنا
            </NavLink>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="outline" className={cn(
              isScrolled ? "border-unlimited-blue text-unlimited-blue hover:bg-unlimited-blue hover:text-white" : 
              "border-white text-white hover:bg-white hover:text-unlimited-blue"
            )}>
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
              <Link to="/apply">تقدم الآن</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-white shadow transition-all duration-300 overflow-hidden",
        isMenuOpen ? "max-h-screen py-4" : "max-h-0"
      )}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-1">
            <MobileNavLink to="/" isActive={isActive('/')}>
              الرئيسية
            </MobileNavLink>
            
            <div className="border-b pb-1 pt-1">
              <div className="font-medium mb-2">الدراسة في الخارج</div>
              <div className="flex flex-col space-y-1 pr-4">
                <MobileNavLink to="/countries" isActive={isActive('/countries')} secondary>
                  الدراسة حسب الدول
                </MobileNavLink>
                <MobileNavLink to="/universities" isActive={isActive('/universities')} secondary>
                  جميع الجامعات
                </MobileNavLink>
                <MobileNavLink to="/universities/turkey" isActive={isActive('/universities/turkey')} secondary>
                  الجامعات التركية
                </MobileNavLink>
              </div>
            </div>
            
            <div className="border-b pb-1 pt-1">
              <div className="font-medium mb-2">البرامج الدراسية</div>
              <div className="flex flex-col space-y-1 pr-4">
                <MobileNavLink to="/programs" isActive={isActive('/programs')} secondary>
                  جميع البرامج
                </MobileNavLink>
                <MobileNavLink to="/programs/engineering" isActive={isActive('/programs/engineering')} secondary>
                  برامج الهندسة
                </MobileNavLink>
                <MobileNavLink to="/programs/medical" isActive={isActive('/programs/medical')} secondary>
                  البرامج الطبية
                </MobileNavLink>
                <MobileNavLink to="/programs/software-engineering" isActive={isActive('/programs/software-engineering')} secondary>
                  هندسة البرمجيات
                </MobileNavLink>
              </div>
            </div>
            
            <MobileNavLink to="/scholarships" isActive={isActive('/scholarships')}>
              المنح الدراسية
            </MobileNavLink>
            
            <MobileNavLink to="/services" isActive={isActive('/services')}>
              خدماتنا
            </MobileNavLink>
            
            <MobileNavLink to="/about" isActive={isActive('/about')}>
              من نحن
            </MobileNavLink>
            
            <MobileNavLink to="/contact" isActive={isActive('/contact')}>
              اتصل بنا
            </MobileNavLink>
          </nav>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button asChild variant="outline" className="border-unlimited-blue text-unlimited-blue hover:bg-unlimited-blue hover:text-white w-full">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue w-full">
              <Link to="/apply">تقدم الآن</Link>
            </Button>
          </div>
          
          <div className="flex flex-col gap-3 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-unlimited-blue" />
              <span dir="ltr">+90 552 286 8989</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-unlimited-blue" />
              <span>info@unlimited-edu.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-unlimited-blue" />
              <span>Istanbul, Bahçelievler, Turkey</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  isScrolled: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, isActive, isScrolled, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 rounded-md transition-colors",
        isActive ? "text-unlimited-blue font-medium" : 
          isScrolled ? "hover:text-unlimited-blue" : 
          "text-white hover:text-unlimited-blue hover:bg-white/90"
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  isActive: boolean;
  secondary?: boolean;
  children: React.ReactNode;
}

const MobileNavLink = ({ to, isActive, secondary = false, children }: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "py-2 px-3 rounded-md transition-colors",
        isActive ? "bg-unlimited-blue/10 text-unlimited-blue font-medium" : 
          secondary ? "text-gray-600 hover:text-unlimited-blue" : 
          "hover:bg-unlimited-blue/5 hover:text-unlimited-blue"
      )}
    >
      {children}
    </Link>
  );
};

export default Header;
