import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, Mail, FileText, Info, AlertCircle, Bell, X, Star, Bookmark, MessageSquare, Download, Trash2, MoreVertical, Filter, BarChart2, Clock, Calendar as CalendarIcon, ChevronDown, ChevronUp, Share2, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date?: string; // Adding actual date field for filtering
  isRead: boolean;
  type: 'success' | 'info' | 'warning' | 'error' | 'update' | 'deadline' | 'payment';
  actionUrl?: string;
  actionLabel?: string;
  isImportant?: boolean;
  sender?: string; // Adding sender field
  category?: 'application' | 'academic' | 'financial' | 'system' | 'general';
}

interface NotificationListProps {
  initialNotifications?: Notification[];
}

const NotificationList = ({ initialNotifications }: NotificationListProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications || [
    {
      id: 'notif1',
      title: 'تم تحديث حالة طلبك',
      message: 'تم قبول طلبك للبرنامج الدراسي في جامعة أوزيجين',
      time: 'منذ ساعتين',
      date: '2025-05-08',
      isRead: false,
      type: 'success',
      actionUrl: '/dashboard/applications/app-123',
      actionLabel: 'عرض الطلب',
      isImportant: true,
      sender: 'إدارة القبول',
      category: 'application'
    },
    {
      id: 'notif2',
      title: 'مستندات مطلوبة',
      message: 'يرجى تحميل نسخة من جواز السفر الخاص بك قبل الموعد النهائي',
      time: 'منذ 5 ساعات',
      date: '2025-05-08',
      isRead: false,
      type: 'warning',
      actionUrl: '/dashboard/applications/app-123?tab=documents',
      actionLabel: 'تحميل المستندات',
      category: 'application'
    },
    {
      id: 'notif3',
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة من قسم الدعم بخصوص استفسارك عن مواعيد التقديم',
      time: 'منذ يوم واحد',
      date: '2025-05-07',
      isRead: true,
      type: 'info',
      actionUrl: '/messages',
      actionLabel: 'عرض الرسالة',
      sender: 'فريق الدعم',
      category: 'general'
    },
    {
      id: 'notif4',
      title: 'تحديث النظام',
      message: 'تم تحديث منصة أبواب بلا حدود بميزات جديدة للبحث عن البرامج والجامعات',
      time: 'منذ 3 أيام',
      date: '2025-05-05',
      isRead: true,
      type: 'update',
      category: 'system'
    },
    {
      id: 'notif5',
      title: 'موعد مقابلة',
      message: 'لديك موعد مقابلة قادمة مع ممثل الجامعة يوم الثلاثاء القادم الساعة 2 ظهراً',
      time: 'منذ أسبوع',
      date: '2025-05-01',
      isRead: true,
      type: 'info',
      actionUrl: '/dashboard/calendar',
      actionLabel: 'إضافة للتقويم',
      isImportant: true,
      sender: 'مكتب العلاقات الدولية',
      category: 'application'
    },
    {
      id: 'notif6',
      title: 'عرض منحة دراسية',
      message: 'أنت مؤهل للتقديم على منحة دراسية في جامعة إسطنبول تغطي 50% من الرسوم الدراسية',
      time: 'منذ أسبوعين',
      date: '2025-04-24',
      isRead: true,
      type: 'success',
      actionUrl: '/scholarships/123',
      actionLabel: 'التقديم الآن',
      isImportant: true,
      sender: 'مكتب المنح الدراسية',
      category: 'financial'
    },
    {
      id: 'notif7',
      title: 'تذكير بالموعد النهائي',
      message: 'تبقى 3 أيام على الموعد النهائي للتقديم في برنامج الطب البشري بجامعة وارسو',
      time: 'منذ أسبوعين',
      date: '2025-04-24',
      isRead: true,
      type: 'warning',
      actionUrl: '/programs/456',
      actionLabel: 'التقديم الآن',
      category: 'application'
    },
    {
      id: 'notif8',
      title: 'موعد دفع الرسوم',
      message: 'تذكير: موعد دفع القسط الثاني من الرسوم الدراسية ينتهي في 15 مايو 2025',
      time: 'منذ يومين',
      date: '2025-05-06',
      isRead: false,
      type: 'payment',
      actionUrl: '/dashboard/payments',
      actionLabel: 'دفع الآن',
      isImportant: true,
      sender: 'الإدارة المالية',
      category: 'financial'
    },
    {
      id: 'notif9',
      title: 'الجدول الدراسي الجديد',
      message: 'تم نشر الجدول الدراسي للفصل القادم، يرجى الاطلاع عليه قبل بدء التسجيل',
      time: 'منذ 4 أيام',
      date: '2025-05-04',
      isRead: false,
      type: 'info',
      actionUrl: '/dashboard/schedule',
      actionLabel: 'عرض الجدول',
      sender: 'شؤون الطلاب',
      category: 'academic'
    },
    {
      id: 'notif10',
      title: 'موعد نهائي للتسجيل',
      message: 'تذكير: آخر موعد للتسجيل في المواد للفصل القادم هو 20 مايو 2025',
      time: 'اليوم',
      date: '2025-05-08',
      isRead: false,
      type: 'deadline',
      actionUrl: '/dashboard/registration',
      actionLabel: 'التسجيل الآن',
      isImportant: true,
      sender: 'مكتب التسجيل',
      category: 'academic'
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="h-5 w-5 text-green-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'update': return <Bell className="h-5 w-5 text-purple-500" />;
      case 'deadline': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'payment': return <FileText className="h-5 w-5 text-teal-500" />;
      default: return <Bell className="h-5 w-5 text-unlimited-blue" />;
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'application': return <FileText className="h-4 w-4 text-unlimited-blue" />;
      case 'academic': return <CalendarIcon className="h-4 w-4 text-green-500" />;
      case 'financial': return <FileText className="h-4 w-4 text-teal-500" />;
      case 'system': return <Info className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-unlimited-gray" />;
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'application': return 'طلبات القبول';
      case 'academic': return 'شؤون أكاديمية';
      case 'financial': return 'شؤون مالية';
      case 'system': return 'إشعارات النظام';
      default: return 'عام';
    }
  };

  const getNotificationBgColor = (type: string, isRead: boolean) => {
    if (!isRead) return 'bg-blue-50 border-r-4 border-unlimited-blue';
    
    switch (type) {
      case 'success': return 'bg-green-50';
      case 'info': return 'bg-blue-50';
      case 'warning': return 'bg-yellow-50';
      case 'error': return 'bg-red-50';
      case 'update': return 'bg-purple-50';
      case 'deadline': return 'bg-orange-50';
      case 'payment': return 'bg-teal-50';
      default: return 'bg-gray-50';
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      // Filter by tab
      if (activeTab !== 'all' && activeTab !== 'unread' && activeTab !== 'important' && notif.type !== activeTab) {
        return false;
      }
      
      if (activeTab === 'unread' && notif.isRead) {
        return false;
      }
      
      if (activeTab === 'important' && !notif.isImportant) {
        return false;
      }

      // Filter by date
      if (dateFilter && notif.date) {
        const notifDate = new Date(notif.date);
        const filterDate = new Date(dateFilter);
        if (
          notifDate.getDate() !== filterDate.getDate() ||
          notifDate.getMonth() !== filterDate.getMonth() ||
          notifDate.getFullYear() !== filterDate.getFullYear()
        ) {
          return false;
        }
      }

      // Filter by category
      if (selectedCategory !== 'all' && notif.category !== selectedCategory) {
        return false;
      }
      
      return true;
    });
  }, [notifications, activeTab, dateFilter, selectedCategory]);

  const analyticData = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.isRead).length;
    const important = notifications.filter(n => n.isImportant).length;
    const today = notifications.filter(n => n.date === format(new Date(), 'yyyy-MM-dd')).length;
    
    const byType = {
      success: notifications.filter(n => n.type === 'success').length,
      info: notifications.filter(n => n.type === 'info').length,
      warning: notifications.filter(n => n.type === 'warning').length,
      error: notifications.filter(n => n.type === 'error').length,
      update: notifications.filter(n => n.type === 'update').length,
      deadline: notifications.filter(n => n.type === 'deadline').length,
      payment: notifications.filter(n => n.type === 'payment').length,
    };

    const byCategory = {
      application: notifications.filter(n => n.category === 'application').length,
      academic: notifications.filter(n => n.category === 'academic').length,
      financial: notifications.filter(n => n.category === 'financial').length,
      system: notifications.filter(n => n.category === 'system').length,
      general: notifications.filter(n => n.category === 'general' || !n.category).length,
    };

    return { total, unread, important, today, byType, byCategory };
  }, [notifications]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    toast({
      title: t("notifications.markedAllRead", "تمت القراءة"),
      description: t("notifications.markedAllReadDescription", "تم تحديث جميع الإشعارات كمقروءة"),
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const deleteNotification = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: t("notifications.deleted", "تم الحذف"),
      description: t("notifications.deletedDescription", "تم حذف الإشعار بنجاح"),
    });
  };

  const toggleImportant = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isImportant: !notif.isImportant } : notif
    ));
    
    const notification = notifications.find(n => n.id === id);
    toast({
      title: notification?.isImportant ? "تمت إزالة الإشعار من المهمة" : "تمت إضافة الإشعار للمهمة",
      description: notification?.isImportant ? "تم إزالة الإشعار من قائمة الإشعارات المهمة" : "تم إضافة الإشعار إلى قائمة الإشعارات المهمة",
    });
  };

  const toggleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(nid => nid !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedNotifications([]);
  };

  const selectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(notif => !selectedNotifications.includes(notif.id)));
    toast({
      title: t("notifications.deleted", "تم الحذف"),
      description: `تم حذف ${selectedNotifications.length} إشعارات بنجاح`,
    });
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  const markSelectedAsRead = () => {
    setNotifications(notifications.map(notif => 
      selectedNotifications.includes(notif.id) ? { ...notif, isRead: true } : notif
    ));
    toast({
      title: t("notifications.markedRead", "تمت القراءة"),
      description: `تم تحديث ${selectedNotifications.length} إشعارات كمقروءة`,
    });
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  const downloadAllNotifications = () => {
    setIsExporting(true);
    
    // Simulate export processing
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "تم تصدير الإشعارات",
        description: "تم تصدير الإشعارات بنجاح إلى ملف",
      });
    }, 1500);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDateFilter(date);
  };

  const handleResetFilters = () => {
    setDateFilter(undefined);
    setSelectedCategory('all');
    setActiveTab('all');
  };

  const handleShowDetails = (id: string) => {
    setShowDetails(id);
  };

  const clearDateFilter = () => {
    setDateFilter(undefined);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">{t("notifications.title", "الإشعارات")}</CardTitle>
          <CardDescription>{t("notifications.subtitle", "إدارة الإشعارات والتنبيهات")}</CardDescription>
        </div>
        
        <div className="flex gap-2">
          {selectMode ? (
            <>
              <Button variant="outline" size="sm" onClick={toggleSelectMode}>
                <X className="h-4 w-4 ml-1" />
                إلغاء
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={selectAll}
              >
                {selectedNotifications.length === filteredNotifications.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAnalytics(true)}
                className="flex items-center gap-1"
              >
                <BarChart2 className="h-4 w-4 ml-1" />
                تحليلات
              </Button>
              <Button variant="outline" size="sm" onClick={toggleSelectMode}>
                <Check className="h-4 w-4 ml-1" />
                تحديد
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead} 
                disabled={unreadCount === 0}
              >
                تحديد الكل كمقروء
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={downloadAllNotifications} disabled={isExporting}>
                    <Download className="h-4 w-4 ml-2" />
                    {isExporting ? 'جاري التصدير...' : 'تصدير الإشعارات'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setNotifications([]);
                    toast({
                      title: "تم حذف جميع الإشعارات",
                      description: "تم حذف جميع الإشعارات بنجاح",
                    });
                  }}>
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف جميع الإشعارات
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </CardHeader>
      
      <div className="px-6 pb-4">
        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="h-4 w-4 ml-1" />
                    {dateFilter ? format(dateFilter, 'dd/MM/yyyy') : 'تصفية حسب التاريخ'}
                    {dateFilter && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 p-0 ml-1 hover:bg-transparent" 
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDateFilter();
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={handleDateSelect}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    {getCategoryIcon(selectedCategory === 'all' ? undefined : selectedCategory)}
                    <span className="mr-1">
                      {selectedCategory === 'all' ? 'جميع التصنيفات' : getCategoryLabel(selectedCategory)}
                    </span>
                    <ChevronDown className="h-3 w-3 mr-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>تصفية حسب التصنيف</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                    <Bell className="h-4 w-4 ml-2 text-unlimited-gray" />
                    جميع التصنيفات
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('application')}>
                    <FileText className="h-4 w-4 ml-2 text-unlimited-blue" />
                    طلبات القبول
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('academic')}>
                    <CalendarIcon className="h-4 w-4 ml-2 text-green-500" />
                    شؤون أكاديمية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('financial')}>
                    <FileText className="h-4 w-4 ml-2 text-teal-500" />
                    شؤون مالية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('system')}>
                    <Info className="h-4 w-4 ml-2 text-purple-500" />
                    إشعارات النظام
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('general')}>
                    <MessageSquare className="h-4 w-4 ml-2 text-unlimited-gray" />
                    عام
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {(dateFilter || selectedCategory !== 'all' || activeTab !== 'all') && (
              <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                <X className="h-4 w-4 ml-1" />
                إعادة ضبط التصفية
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">
              الكل
              {notifications.length > 0 && (
                <Badge variant="secondary" className="mr-2">{notifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              غير مقروءة
              {unreadCount > 0 && (
                <Badge variant="secondary" className="mr-2">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="important" className="flex-1">
              مهمة
              {notifications.filter(n => n.isImportant).length > 0 && (
                <Badge variant="secondary" className="mr-2">{notifications.filter(n => n.isImportant).length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="deadline" className="flex-1">
              مواعيد نهائية
              {notifications.filter(n => n.type === 'deadline').length > 0 && (
                <Badge variant="secondary" className="mr-2">{notifications.filter(n => n.type === 'deadline').length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex-1">
              مدفوعات
              {notifications.filter(n => n.type === 'payment').length > 0 && (
                <Badge variant="secondary" className="mr-2">{notifications.filter(n => n.type === 'payment').length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent>
          {selectMode && selectedNotifications.length > 0 && (
            <div className="bg-unlimited-light-blue/10 rounded-md p-3 mb-4 flex justify-between items-center">
              <div>تم تحديد {selectedNotifications.length} إشعارات</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={markSelectedAsRead}>
                  <Check className="h-4 w-4 ml-1" />
                  تحديد كمقروء
                </Button>
                <Button size="sm" variant="destructive" onClick={deleteSelected}>
                  <Trash2 className="h-4 w-4 ml-1" />
                  حذف المحدد
                </Button>
              </div>
            </div>
          )}
        
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex gap-3 p-4 rounded-lg relative ${
                    getNotificationBgColor(notification.type, notification.isRead)
                  } ${selectMode ? 'cursor-pointer' : ''}`}
                  onClick={() => selectMode ? toggleSelectNotification(notification.id) : markAsRead(notification.id)}
                >
                  {selectMode && (
                    <div className="absolute right-3 top-3">
                      <Checkbox 
                        checked={selectedNotifications.includes(notification.id)} 
                        onCheckedChange={() => toggleSelectNotification(notification.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  
                  <div className="bg-white p-2 h-min rounded-full shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex items-center flex-wrap gap-2">
                        <h4 className="font-medium">{notification.title}</h4>
                        {notification.isImportant && (
                          <Badge variant="outline" className="border-yellow-400 text-yellow-600">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                            مهم
                          </Badge>
                        )}
                        {notification.category && (
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryIcon(notification.category)}
                            <span className="mr-1">{getCategoryLabel(notification.category)}</span>
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-unlimited-gray whitespace-nowrap">{notification.time}</span>
                        {notification.date && (
                          <Badge variant="outline" className="text-xs">
                            <CalendarIcon className="h-3 w-3 ml-1" />
                            {format(new Date(notification.date), 'dd/MM/yyyy')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-unlimited-gray mt-1">{notification.message}</p>
                    
                    {notification.sender && (
                      <div className="mt-1 text-xs text-unlimited-gray flex items-center">
                        <Mail className="h-3 w-3 ml-1" />
                        <span>{notification.sender}</span>
                      </div>
                    )}
                    
                    <div className="flex mt-3 gap-2 flex-wrap">
                      {notification.actionUrl && notification.actionLabel && (
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = notification.actionUrl!;
                          }}
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImportant(notification.id, e);
                        }}
                      >
                        {notification.isImportant ? (
                          <>
                            <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400" />
                            إزالة من المهمة
                          </>
                        ) : (
                          <>
                            <Star className="h-3.5 w-3.5 mr-1" />
                            إضافة للمهمة
                          </>
                        )}
                      </Button>

                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowDetails(notification.id);
                        }}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        عرض التفاصيل
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(notification.message);
                            toast({
                              title: "تم النسخ",
                              description: "تم نسخ محتوى الإشعار إلى الحافظة",
                            });
                          }}>
                            نسخ المحتوى
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: "تمت المشاركة",
                              description: "تم نسخ رابط الإشعار إلى الحافظة",
                            });
                          }}>
                            <Share2 className="h-4 w-4 ml-2" />
                            مشاركة
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id, e);
                          }} className="text-red-500">
                            <Trash2 className="h-4 w-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-unlimited-gray opacity-30" />
                <p className="text-unlimited-gray mt-2">{t("notifications.empty", "لا توجد إشعارات جديدة")}</p>
                
                {(dateFilter || selectedCategory !== 'all' || activeTab !== 'all') && (
                  <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
                    إعادة ضبط التصفية
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        {filteredNotifications.length > 0 && (
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="text-sm text-unlimited-gray">
              {filteredNotifications.length} إشعارات
            </div>
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={!filteredNotifications.some(n => !n.isRead)}>
              <Check className="h-3.5 w-3.5 ml-1" />
              تحديد الكل كمقروء
            </Button>
          </CardFooter>
        )}
      </Tabs>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-5 w-5" />
              تحليلات الإشعارات
            </DialogTitle>
            <DialogDescription>
              نظرة عامة على إحصائيات الإشعارات الخاصة بك
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-unlimited-light-blue/10 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold">{analyticData.total}</div>
              <div className="text-sm text-unlimited-gray">إجمالي الإشعارات</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{analyticData.unread}</div>
              <div className="text-sm text-unlimited-gray">غير مقروءة</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{analyticData.important}</div>
              <div className="text-sm text-unlimited-gray">مهمة</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{analyticData.today}</div>
              <div className="text-sm text-unlimited-gray">اليوم</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">توزيع الإشعارات حسب النوع</h3>
              <div className="space-y-2">
                {Object.entries(analyticData.byType).map(([type, count]) => {
                  if (count === 0) return null;
                  const percentage = Math.round((count / analyticData.total) * 100);
                  let color = '';
                  
                  switch(type) {
                    case 'success': color = 'bg-green-500'; break;
                    case 'info': color = 'bg-blue-500'; break;
                    case 'warning': color = 'bg-yellow-500'; break;
                    case 'error': color = 'bg-red-500'; break;
                    case 'update': color = 'bg-purple-500'; break;
                    case 'deadline': color = 'bg-orange-500'; break;
                    case 'payment': color = 'bg-teal-500'; break;
                    default: color = 'bg-gray-500';
                  }
                  
                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{type === 'success' ? 'نجاح' : type === 'info' ? 'معلومات' : type === 'warning' ? 'تحذير' : type === 'error' ? 'خطأ' : type === 'update' ? 'تحديث' : type === 'deadline' ? 'مواعيد نهائية' : 'مدفوعات'}</span>
                        <span>{count} ({percentage}%)</span>
                      </div>
                      <Progress value={percentage} className={`h-2 ${color}`} />
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">توزيع الإشعارات حسب التصنيف</h3>
              <div className="space-y-2">
                {Object.entries(analyticData.byCategory).map(([category, count]) => {
                  if (count === 0) return null;
                  const percentage = Math.round((count / analyticData.total) * 100);
                  let color = '';
                  
                  switch(category) {
                    case 'application': color = 'bg-unlimited-blue'; break;
                    case 'academic': color = 'bg-green-500'; break;
                    case 'financial': color = 'bg-teal-500'; break;
                    case 'system': color = 'bg-purple-500'; break;
                    default: color = 'bg-gray-500';
                  }
                  
                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{getCategoryLabel(category)}</span>
                        <span>{count} ({percentage}%)</span>
                      </div>
                      <Progress value={percentage} className={`h-2 ${color}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnalytics(false)}>
              إغلاق
            </Button>
            <Button onClick={downloadAllNotifications} disabled={isExporting}>
              <Download className="h-4 w-4 ml-2" />
              {isExporting ? 'جاري التصدير...' : 'تصدير التقرير'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Details Dialog */}
      {showDetails && (
        <Dialog open={!!showDetails} onOpenChange={() => setShowDetails(null)}>
          <DialogContent className="sm:max-w-[525px]">
            {(() => {
              const notification = notifications.find(n => n.id === showDetails);
              if (!notification) return null;
              
              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 mb-1">
                      <div className={`p-1 rounded-full ${notification.type === 'success' ? 'bg-green-100' : notification.type === 'info' ? 'bg-blue-100' : notification.type === 'warning' ? 'bg-yellow-100' : notification.type === 'error' ? 'bg-red-100' : notification.type === 'update' ? 'bg-purple-100' : notification.type === 'deadline' ? 'bg-orange-100' : 'bg-teal-100'}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      {notification.title}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2 justify-between">
                      <div className="flex items-center gap-2">
                        {notification.date && (
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {format(new Date(notification.date), 'dd/MM/yyyy')}
                          </span>
                        )}
                        <span className="text-unlimited-gray">{notification.time}</span>
                      </div>
                      <Badge variant={notification.isRead ? "outline" : "default"} className="text-xs">
                        {notification.isRead ? 'مقروءة' : 'غير مقروءة'}
                      </Badge>
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="p-4 bg-muted/30 rounded-lg mb-4">
                    <p className="text-unlimited-dark-blue">{notification.message}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {notification.sender && (
                      <div className="flex items-center justify-between">
                        <span className="text-unlimited-gray">المرسل:</span>
                        <span>{notification.sender}</span>
                      </div>
                    )}
                    
                    {notification.category && (
                      <div className="flex items-center justify-between">
                        <span className="text-unlimited-gray">التصنيف:</span>
                        <Badge variant="secondary">
                          {getCategoryIcon(notification.category)}
                          <span className="mr-1">{getCategoryLabel(notification.category)}</span>
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-unlimited-gray">النوع:</span>
                      <Badge className={
                        notification.type === 'success' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                        notification.type === 'info' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 
                        notification.type === 'error' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                        notification.type === 'update' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 
                        notification.type === 'deadline' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : 
                        'bg-teal-100 text-teal-800 hover:bg-teal-200'
                      }>
                        {notification.type === 'success' ? 'نجاح' : 
                         notification.type === 'info' ? 'معلومات' : 
                         notification.type === 'warning' ? 'تحذير' : 
                         notification.type === 'error' ? 'خطأ' : 
                         notification.type === 'update' ? 'تحديث' : 
                         notification.type === 'deadline' ? 'موعد نهائي' : 'مدفوعات'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-unlimited-gray">الحالة:</span>
                      <Badge variant={notification.isImportant ? "outline" : "secondary"} className={notification.isImportant ? "border-yellow-400 text-yellow-600" : ""}>
                        {notification.isImportant && <Star className="h-3 w-3 mr-1 fill-yellow-400" />}
                        {notification.isImportant ? 'مهم' : 'عادي'}
                      </Badge>
                    </div>
                  </div>
                  
                  <DialogFooter className="flex gap-2 justify-between sm:justify-end flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => setShowDetails(null)}>
                      إغلاق
                    </Button>
                    
                    <div className="flex gap-2">
                      {notification.actionUrl && notification.actionLabel && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => {
                            window.location.href = notification.actionUrl!;
                          }}
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant={notification.isImportant ? "outline" : "secondary"}
                        className={notification.isImportant ? "border-yellow-400 text-yellow-600" : ""}
                        onClick={() => {
                          toggleImportant(notification.id);
                          setShowDetails(null);
                        }}
                      >
                        <Star className={`h-3.5 w-3.5 mr-1 ${notification.isImportant ? "fill-yellow-400" : ""}`} />
                        {notification.isImportant ? 'إزالة من المهمة' : 'إضافة للمهمة'}
                      </Button>
                    </div>
                  </DialogFooter>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default NotificationList;
