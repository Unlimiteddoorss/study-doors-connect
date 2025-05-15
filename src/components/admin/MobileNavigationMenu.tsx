import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Building,
  BookOpen,
  FileText,
  MessageSquare,
  Settings,
  Menu,
  Bell,
  Search,
  Plus,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const MobileNavigationMenu = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const navigationItems: Record<string, NavigationItem[]> = {
    main: [
      { name: t('admin.sidebar.dashboard', 'لوحة التحكم'), href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
      { name: t('admin.sidebar.studentsManagement', 'إدارة الطلاب'), href: '/admin/students', icon: <Users className="h-5 w-5" /> },
      { name: t('admin.sidebar.agentsManagement', 'إدارة الوكلاء'), href: '/admin/agents', icon: <UserCog className="h-5 w-5" /> },
      { name: t('admin.sidebar.universitiesManagement', 'إدارة الجامعات'), href: '/admin/universities', icon: <Building className="h-5 w-5" /> },
      { name: t('admin.sidebar.programsManagement', 'إدارة البرامج'), href: '/admin/programs', icon: <BookOpen className="h-5 w-5" /> },
      { name: t('admin.sidebar.applicationsManagement', 'إدارة الطلبات'), href: '/admin/applications', icon: <FileText className="h-5 w-5" /> },
    ],
    communication: [
      { name: t('admin.sidebar.messagingSystem', 'نظام المراسلات'), href: '/admin/messages', icon: <MessageSquare className="h-5 w-5" />, badge: 5 },
      { name: t('admin.sidebar.notifications', 'الإشعارات'), href: '/admin/notifications', icon: <Bell className="h-5 w-5" />, badge: 8 },
    ],
    system: [
      { name: t('admin.sidebar.settings', 'الإعدادات'), href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
    ],
  };
  
  const quickActions = [
    { name: t('admin.quickNav.newStudent', 'إضافة طالب'), icon: <Users className="h-4 w-4" />, color: 'bg-blue-100 text-blue-600' },
    { name: t('admin.quickNav.newApplication', 'طلب جديد'), icon: <FileText className="h-4 w-4" />, color: 'bg-green-100 text-green-600' },
    { name: t('admin.quickNav.newProgram', 'برنامج جديد'), icon: <BookOpen className="h-4 w-4" />, color: 'bg-purple-100 text-purple-600' },
    { name: t('admin.quickNav.newUniversity', 'إضافة جامعة'), icon: <Building className="h-4 w-4" />, color: 'bg-amber-100 text-amber-600' },
  ];
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: isRtl ? -20 : 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="lg:hidden fixed bottom-4 left-4 z-50 shadow-md bg-unlimited-blue text-white hover:bg-unlimited-dark-blue border-none"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isRtl ? "right" : "left"} 
        className="w-[300px] p-0 overflow-auto"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center">
            <img 
              src="/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png" 
              alt="Unlimited Doors Logo" 
              className="h-8 w-auto" 
            />
            <span className="ml-2 text-unlimited-dark-blue">أبواب بلا حدود</span>
          </SheetTitle>
          <SheetDescription>
            {t('admin.mobileNav.subtitle', 'لوحة تحكم المسؤول')}
          </SheetDescription>
        </SheetHeader>
        
        <div className="p-4">
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <input 
                type="text" 
                placeholder={t('admin.mobileNav.search', 'بحث...')} 
                className="w-full pl-9 h-9 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <Button size="icon" className="h-9 w-9 text-unlimited-gray">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-6">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                className="h-auto flex flex-col items-center justify-center py-3 px-2 gap-2"
              >
                <div className={`p-2 rounded-full ${action.color}`}>
                  {action.icon}
                </div>
                <span className="text-xs">{action.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 px-1 text-xs font-semibold text-unlimited-gray uppercase tracking-wider">
                {t('admin.main', 'الرئيسية')}
              </h3>
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible" 
                className="space-y-1"
              >
                {navigationItems.main.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-md py-2 px-3 text-unlimited-dark-blue hover:bg-unlimited-blue/10",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 text-unlimited-gray">{item.icon}</div>
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-unlimited-gray" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div>
              <h3 className="mb-2 px-1 text-xs font-semibold text-unlimited-gray uppercase tracking-wider">
                {t('admin.communication', 'التواصل')}
              </h3>
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible" 
                className="space-y-1"
              >
                {navigationItems.communication.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-md py-2 px-3 text-unlimited-dark-blue hover:bg-unlimited-blue/10",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 text-unlimited-gray">{item.icon}</div>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="ml-2">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div>
              <h3 className="mb-2 px-1 text-xs font-semibold text-unlimited-gray uppercase tracking-wider">
                {t('admin.system', 'النظام')}
              </h3>
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible" 
                className="space-y-1"
              >
                {navigationItems.system.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-md py-2 px-3 text-unlimited-dark-blue hover:bg-unlimited-blue/10",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 text-unlimited-gray">{item.icon}</div>
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-unlimited-gray" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-4">
            <div className="flex items-center p-3 rounded-md bg-unlimited-blue/5">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-unlimited-blue/20 flex items-center justify-center">
                <span className="text-unlimited-blue font-bold">A</span>
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium text-unlimited-dark-blue">{t('admin.sidebar.adminPanel', 'لوحة المسؤول')}</p>
                <p className="text-xs text-unlimited-gray">{t('admin.loggedInAs', 'تم الدخول كمسؤول')}</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationMenu;
