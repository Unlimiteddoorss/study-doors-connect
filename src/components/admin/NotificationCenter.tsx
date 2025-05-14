
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

const NotificationCenter = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  // Mock data for notifications - in a real app, this would come from an API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: t('notifications.application.new'),
        message: t('notifications.application.newDesc'),
        time: '5 ' + t('time.minutesAgo'),
        read: false,
        type: 'info'
      },
      {
        id: '2',
        title: t('notifications.document.uploaded'),
        message: t('notifications.document.uploadedDesc'),
        time: '30 ' + t('time.minutesAgo'),
        read: false,
        type: 'success'
      },
      {
        id: '3',
        title: t('notifications.student.accepted'),
        message: t('notifications.student.acceptedDesc'),
        time: '2 ' + t('time.hoursAgo'),
        read: false,
        type: 'success'
      },
      {
        id: '4',
        title: t('notifications.system.maintenance'),
        message: t('notifications.system.maintenanceDesc'),
        time: '1 ' + t('time.dayAgo'),
        read: true,
        type: 'warning'
      },
      {
        id: '5',
        title: t('notifications.deadline.approaching'),
        message: t('notifications.deadline.approachingDesc'),
        time: '2 ' + t('time.daysAgo'),
        read: true,
        type: 'warning'
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, [t]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const deleteNotification = (id: string) => {
    const notificationToDelete = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    if (notificationToDelete && !notificationToDelete.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const bellAnimation = {
    initial: { rotate: 0 },
    animate: isOpen ? { rotate: [0, 15, -15, 10, -10, 5, -5, 0] } : {},
    transition: { duration: 0.5 }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <motion.div 
            initial={bellAnimation.initial} 
            animate={bellAnimation.animate} 
            transition={bellAnimation.transition}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>{t('notifications.title')}</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-auto py-1" 
              onClick={markAllAsRead}
            >
              {t('notifications.markAllRead')}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-80 overflow-y-auto">
          <AnimatePresence>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <motion.div 
                  key={notification.id}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuItem className="flex flex-col items-start p-0">
                    <div className="w-full p-3 cursor-default">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2 items-start">
                          <div className={`h-2 w-2 ${getTypeColor(notification.type)} rounded-full mt-1.5 flex-shrink-0`} />
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {notification.title}
                              {!notification.read && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">
                                  {t('notifications.new')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <span className="text-xs text-unlimited-gray mt-1 block">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1">
                          {!notification.read && (
                            <Button
                              variant="ghost" 
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                            >
                              <span className="sr-only">{t('notifications.markRead')}</span>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <span className="sr-only">{t('notifications.delete')}</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 4H3.33333H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M5.33325 4.00001V2.66668C5.33325 2.31305 5.47373 1.97392 5.72378 1.72387C5.97383 1.47382 6.31296 1.33334 6.66659 1.33334H9.33325C9.68687 1.33334 10.026 1.47382 10.2761 1.72387C10.5261 1.97392 10.6666 2.31305 10.6666 2.66668V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12.6666 4V13.3333C12.6666 13.687 12.5261 14.0261 12.2761 14.2761C12.026 14.5262 11.6869 14.6667 11.3333 14.6667H4.66659C4.31296 14.6667 3.97383 14.5262 3.72378 14.2761C3.47373 14.0261 3.33325 13.687 3.33325 13.3333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </motion.div>
              ))
            ) : (
              <div className="py-6 text-center text-unlimited-gray">
                <div className="mx-auto w-12 h-12 rounded-full bg-unlimited-gray/10 flex items-center justify-center mb-2">
                  <Bell className="h-6 w-6 text-unlimited-gray" />
                </div>
                <p>{t('notifications.noNotifications')}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center cursor-pointer">
          <Button variant="ghost" className="w-full" size="sm">
            {t('notifications.viewAll')}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
