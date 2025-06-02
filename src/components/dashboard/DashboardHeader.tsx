
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

// Import our simplified notification center component
import SimpleNotificationCenter from '@/components/admin/SimpleNotificationCenter';

interface DashboardHeaderProps {
  userRole?: 'student' | 'admin' | 'agent';
  toggleSidebar?: () => void;
}

const DashboardHeader = ({ userRole = 'student', toggleSidebar }: DashboardHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslation();
  
  // Safe function to get current language
  const getCurrentLang = () => {
    try {
      return getCurrentLanguage();
    } catch (error) {
      console.warn('Error getting current language:', error);
      return 'en';
    }
  };
  
  const currentLanguage = getCurrentLang();
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark');
      }
    } catch (error) {
      console.warn('Could not toggle theme:', error);
    }
  };

  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLanguage) {
      try {
        changeLanguage(lang);
      } catch (error) {
        console.warn('Could not change language:', error);
      }
    }
  };

  const getDashboardTitle = () => {
    try {
      if (userRole === 'admin') return t('admin.dashboard.title', 'لوحة تحكم الإدارة');
      if (userRole === 'agent') return t('agent.dashboard.title', 'لوحة تحكم الوكيل');
      return t('student.dashboard.title', 'لوحة تحكم الطالب');
    } catch (error) {
      console.warn('Error getting dashboard title:', error);
      return 'لوحة التحكم';
    }
  };

  const getUserName = () => {
    try {
      if (userRole === 'admin') return t('auth.userNames.admin', 'المدير');
      if (userRole === 'agent') return t('auth.userNames.agent', 'الوكيل');
      return t('auth.userNames.student', 'الطالب');
    } catch (error) {
      console.warn('Error getting user name:', error);
      return 'المستخدم';
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
              {getDashboardTitle()}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Globe className="h-4 w-4" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-unlimited-blue"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('language.select', 'اختر اللغة')}</DropdownMenuLabel>
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
          
          {/* Theme Toggle */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="transition-colors duration-200"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Notifications - Use the simplified component */}
          <SimpleNotificationCenter />
          
          {/* User Menu */}
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
                  {getUserName()}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('auth.profile', 'الملف الشخصي')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                {t('auth.viewProfile', 'عرض الملف الشخصي')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                {t('auth.settings', 'الإعدادات')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                {t('auth.logout', 'تسجيل الخروج')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
