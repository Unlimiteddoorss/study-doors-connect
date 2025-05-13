
import { useState } from 'react';
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown, 
  Menu, 
  Moon,
  Sun,
  Globe,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from 'react-i18next';
import { changeLanguage, getCurrentLanguage, getLanguageName } from '@/i18n/config';

// Import our notification center component
import NotificationCenter from '@/components/admin/NotificationCenter';

interface DashboardHeaderProps {
  userRole?: 'student' | 'admin' | 'agent';
  toggleSidebar?: () => void;
}

const DashboardHeader = ({ userRole = 'student', toggleSidebar }: DashboardHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Implement actual theme toggling here
    document.documentElement.classList.toggle('dark');
  };

  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLanguage) {
      changeLanguage(lang);
    }
  };

  return (
    <header className="border-b sticky top-0 z-10 bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="ml-4 md:ml-0">
            <h1 className="text-lg font-medium text-unlimited-dark-blue dark:text-white">
              {userRole === 'admin' ? t('admin.dashboard.title') : 
               userRole === 'agent' ? t('agent.dashboard.title') : 
               t('student.dashboard.title')}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Switcher - Enhanced */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Globe className="h-4 w-4" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-unlimited-blue"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('language.select')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={currentLanguage} onValueChange={handleLanguageChange}>
                <DropdownMenuRadioItem value="ar" className="flex items-center justify-between">
                  <span>العربية</span>
                  {currentLanguage === 'ar' && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en" className="flex items-center justify-between">
                  <span>English</span>
                  {currentLanguage === 'en' && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fr" className="flex items-center justify-between">
                  <span>Français</span>
                  {currentLanguage === 'fr' && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="tr" className="flex items-center justify-between">
                  <span>Türkçe</span>
                  {currentLanguage === 'tr' && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Theme Toggle - Enhanced */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="transition-colors duration-200"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Notifications - Use the new NotificationCenter component */}
          <NotificationCenter />
          
          {/* User Menu - Enhanced */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/assets/avatar.png" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">
                  {userRole === 'admin' ? 
                    t('auth.userNames.admin') : 
                    userRole === 'agent' ? 
                    t('auth.userNames.agent') : 
                    t('auth.userNames.student')}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('auth.profile')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                {t('auth.viewProfile')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                {t('auth.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-unlimited-danger focus:text-unlimited-danger">
                <LogOut className="h-4 w-4 mr-2" />
                {t('auth.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
