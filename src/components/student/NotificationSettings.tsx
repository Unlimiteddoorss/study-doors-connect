
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, CheckCircle, X, Settings, MessageSquare, Mail, CalendarClock, FileText, 
  Info, AlertCircle, ChevronDown, ArrowRight, DeviceMobile, Share2, BarChart3,
  Vibrate, VolumeX, Volume2
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';

interface NotificationSettingsProps {
  initialSettings?: {
    emailNotifications: boolean;
    applicationUpdates: boolean;
    messageNotifications: boolean;
    marketingEmails: boolean;
  };
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ initialSettings }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // General notification settings
  const [emailNotifications, setEmailNotifications] = useState(initialSettings?.emailNotifications ?? true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationSound, setNotificationSound] = useState("default");
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const [snoozeDuration, setSnoozeDuration] = useState("30");
  const [notificationVolume, setNotificationVolume] = useState([70]);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  
  // Notification types
  const [applicationUpdates, setApplicationUpdates] = useState(initialSettings?.applicationUpdates ?? true);
  const [messageNotifications, setMessageNotifications] = useState(initialSettings?.messageNotifications ?? true);
  const [marketingEmails, setMarketingEmails] = useState(initialSettings?.marketingEmails ?? false);
  const [importantAlerts, setImportantAlerts] = useState(true);
  const [promotionalNotifications, setPromotionalNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  
  // Summary statistics
  const [notificationStats, setNotificationStats] = useState({
    today: 12,
    thisWeek: 37,
    thisMonth: 86,
    mostFrequent: 'تحديثات الطلبات',
  });
  
  // Device settings dialog
  const [isDeviceDialogOpen, setIsDeviceDialogOpen] = useState(false);
  const [devices, setDevices] = useState([
    { id: 'browser-chrome', name: 'Google Chrome - Windows', active: true, lastSeen: 'اليوم' },
    { id: 'mobile-app', name: 'تطبيق الجوال - iPhone 15', active: true, lastSeen: 'اليوم' },
    { id: 'browser-safari', name: 'Safari - MacBook', active: true, lastSeen: '2 مايو 2025' },
  ]);

  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم تحديث إعدادات الإشعارات بنجاح.",
    });
  };

  const handleResetSettings = () => {
    setEmailNotifications(true);
    setPushNotifications(false);
    setSmsNotifications(false);
    setNotificationSound("default");
    setApplicationUpdates(true);
    setMessageNotifications(true);
    setMarketingEmails(false);
    setImportantAlerts(true);
    setPromotionalNotifications(false);
    setWeeklyDigest(true);
    setEventReminders(true);
    setVibrationEnabled(true);
    setNotificationVolume([70]);
    
    toast({
      title: "تم إعادة تعيين الإعدادات",
      description: "تمت إعادة الإعدادات إلى الوضع الافتراضي.",
    });
  };

  const handleSnoozeToggle = () => {
    setShowSnoozeOptions(!showSnoozeOptions);
  };

  const handleSnoozeDurationChange = (value: string) => {
    setSnoozeDuration(value);
    toast({
      title: "تم تأجيل الإشعارات",
      description: `تم تأجيل الإشعارات لمدة ${value} دقيقة.`,
    });
  };
  
  const handleDisableDevice = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId ? {...device, active: false} : device
    ));
    
    toast({
      title: "تم تعطيل الجهاز",
      description: "لن يتلقى هذا الجهاز إشعارات بعد الآن.",
    });
  };
  
  const handleEnableAllDevices = () => {
    setDevices(devices.map(device => ({...device, active: true})));
    
    toast({
      title: "تم تفعيل جميع الأجهزة",
      description: "ستتلقى جميع الأجهزة الإشعارات الآن.",
    });
  };
  
  // New function to display notification schedule options
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState("22:00");
  const [quietHoursEnd, setQuietHoursEnd] = useState("08:00");
  
  // New notification channels with icons
  const notificationChannels = [
    { id: 'email', name: t('auth.notifications.channels.email'), icon: <Mail className="h-5 w-5" />, enabled: emailNotifications },
    { id: 'push', name: t('auth.notifications.channels.push'), icon: <Bell className="h-5 w-5" />, enabled: pushNotifications },
    { id: 'sms', name: t('auth.notifications.channels.sms'), icon: <MessageSquare className="h-5 w-5" />, enabled: smsNotifications },
    { id: 'app', name: t('auth.notifications.channels.app'), icon: <DeviceMobile className="h-5 w-5" />, enabled: true },
  ];
  
  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="mb-4">
        <TabsTrigger value="general">
          <Bell className="mr-2 h-4 w-4" />
          {t('auth.notifications.general')}
        </TabsTrigger>
        <TabsTrigger value="channels">
          <Share2 className="mr-2 h-4 w-4" />
          {t('auth.notifications.channels.title')}
        </TabsTrigger>
        <TabsTrigger value="preferences">
          <Settings className="mr-2 h-4 w-4" />
          {t('auth.notifications.preferences')}
        </TabsTrigger>
        <TabsTrigger value="statistics">
          <BarChart3 className="mr-2 h-4 w-4" />
          {t('auth.notifications.statistics')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  {t('auth.notifications.title')}
                </CardTitle>
                <CardDescription>
                  {t('auth.notifications.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-unlimited-light-blue/10 p-4 rounded-lg border border-unlimited-light-blue/30 mb-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="bg-unlimited-blue text-white p-2 rounded-full">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">{t('auth.notifications.status')}</h3>
                        <p className="text-unlimited-gray text-sm">{t('auth.notifications.statusDesc')}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={emailNotifications || pushNotifications || smsNotifications} 
                      onCheckedChange={(checked) => {
                        setEmailNotifications(checked);
                        setPushNotifications(checked);
                        setSmsNotifications(checked);
                        toast({
                          title: checked ? t('auth.notifications.enabled') : t('auth.notifications.disabled'),
                          description: checked ? t('auth.notifications.enabledDesc') : t('auth.notifications.disabledDesc'),
                        });
                      }} 
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-3">{t('auth.notifications.types')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <FileText className="h-4 w-4 text-unlimited-blue" />
                      </div>
                      <div>
                        <Label htmlFor="app-updates" className="font-medium">
                          {t('auth.notifications.types.applications')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">
                          {t('auth.notifications.types.applicationsDesc')}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="app-updates"
                      checked={applicationUpdates}
                      onCheckedChange={(checked) => setApplicationUpdates(checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-purple-100">
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <Label htmlFor="message-notif" className="font-medium">
                          {t('auth.notifications.types.messages')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">
                          {t('auth.notifications.types.messagesDesc')}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="message-notif"
                      checked={messageNotifications}
                      onCheckedChange={(checked) => setMessageNotifications(checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-amber-100">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <Label htmlFor="important-alerts" className="font-medium">
                          {t('auth.notifications.types.important')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">
                          {t('auth.notifications.types.importantDesc')}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="important-alerts"
                      checked={importantAlerts}
                      onCheckedChange={(checked) => setImportantAlerts(checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-100">
                        <CalendarClock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <Label htmlFor="event-reminders" className="font-medium">
                          {t('auth.notifications.types.events')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">
                          {t('auth.notifications.types.eventsDesc')}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="event-reminders"
                      checked={eventReminders}
                      onCheckedChange={(checked) => setEventReminders(checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gray-100">
                        <Bell className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <Label htmlFor="marketing" className="font-medium">
                          {t('auth.notifications.types.marketing')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">
                          {t('auth.notifications.types.marketingDesc')}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="marketing"
                      checked={marketingEmails}
                      onCheckedChange={(checked) => setMarketingEmails(checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" onClick={handleResetSettings}>
                  {t('common.reset')}
                </Button>
                <Button onClick={handleSaveSettings}>{t('common.saveChanges')}</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('auth.notifications.quickControls')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant={scheduleEnabled ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setScheduleEnabled(!scheduleEnabled)}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  {scheduleEnabled ? t('auth.notifications.disableSchedule') : t('auth.notifications.enableSchedule')}
                </Button>
                
                {scheduleEnabled && (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium mb-2">{t('auth.notifications.quietHours')}</h4>
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1">
                        <Label htmlFor="start-time" className="text-xs">{t('auth.notifications.from')}</Label>
                        <input
                          type="time"
                          id="start-time"
                          className="w-full px-2 py-1 border rounded text-sm"
                          value={quietHoursStart}
                          onChange={(e) => setQuietHoursStart(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="end-time" className="text-xs">{t('auth.notifications.to')}</Label>
                        <input
                          type="time"
                          id="end-time"
                          className="w-full px-2 py-1 border rounded text-sm"
                          value={quietHoursEnd}
                          onChange={(e) => setQuietHoursEnd(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-unlimited-gray">{t('auth.notifications.quietHoursDesc')}</p>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleSnoozeToggle}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  {showSnoozeOptions ? t('auth.notifications.hideSnoozeOptions') : t('auth.notifications.snoozeNotifications')}
                </Button>

                {showSnoozeOptions && (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <RadioGroup defaultValue={snoozeDuration} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="15" id="r1" onClick={() => handleSnoozeDurationChange("15")} />
                        <Label htmlFor="r1">15 {t('auth.notifications.minutes')}</Label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="30" id="r2" onClick={() => handleSnoozeDurationChange("30")} />
                        <Label htmlFor="r2">30 {t('auth.notifications.minutes')}</Label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="60" id="r3" onClick={() => handleSnoozeDurationChange("60")} />
                        <Label htmlFor="r3">1 {t('auth.notifications.hour')}</Label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="480" id="r4" onClick={() => handleSnoozeDurationChange("480")} />
                        <Label htmlFor="r4">8 {t('auth.notifications.hours')}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
                
                <Dialog open={isDeviceDialogOpen} onOpenChange={setIsDeviceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <DeviceMobile className="mr-2 h-4 w-4" />
                      {t('auth.notifications.manageDevices')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('auth.notifications.devices.title')}</DialogTitle>
                      <DialogDescription>{t('auth.notifications.devices.description')}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 my-4">
                      {devices.map(device => (
                        <div key={device.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <div className="flex items-center text-xs text-unlimited-gray gap-2">
                              <span>{t('auth.notifications.devices.lastSeen')}: {device.lastSeen}</span>
                              <Badge variant={device.active ? "outline" : "secondary"} className="ml-2">
                                {device.active ? t('auth.notifications.devices.active') : t('auth.notifications.devices.disabled')}
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDisableDevice(device.id)}
                            disabled={!device.active}
                          >
                            {device.active ? t('auth.notifications.devices.disable') : t('auth.notifications.devices.disabled')}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDeviceDialogOpen(false)}>
                        {t('common.close')}
                      </Button>
                      <Button onClick={handleEnableAllDevices}>{t('auth.notifications.devices.enableAll')}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('auth.notifications.soundsTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t('auth.notifications.volume')}</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <VolumeX className="h-4 w-4 text-unlimited-gray" />
                    <Slider
                      value={notificationVolume}
                      onValueChange={setNotificationVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <Volume2 className="h-4 w-4 text-unlimited-gray" />
                    <span className="text-sm text-unlimited-gray w-8 text-right">{notificationVolume[0]}%</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="sound">{t('auth.notifications.sound')}</Label>
                  <Select value={notificationSound} onValueChange={(value) => setNotificationSound(value)}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder={t('auth.notifications.defaultSound')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t('auth.notifications.sounds')}</SelectLabel>
                        <SelectItem value="default">{t('auth.notifications.defaultSound')}</SelectItem>
                        <SelectItem value="chime">Chime</SelectItem>
                        <SelectItem value="alert">Alert</SelectItem>
                        <SelectItem value="bell">Bell</SelectItem>
                        <SelectItem value="none">{t('auth.notifications.noSound')}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="vibration" className="font-medium block">
                      {t('auth.notifications.vibration')}
                    </Label>
                    <p className="text-sm text-unlimited-gray">{t('auth.notifications.vibrationDesc')}</p>
                  </div>
                  <Switch
                    id="vibration"
                    checked={vibrationEnabled}
                    onCheckedChange={setVibrationEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="channels">
        <Card>
          <CardHeader>
            <CardTitle>{t('auth.notifications.channels.title')}</CardTitle>
            <CardDescription>{t('auth.notifications.channels.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {notificationChannels.map(channel => (
                <div 
                  key={channel.id} 
                  className={`p-4 rounded-lg border ${channel.enabled ? 'border-unlimited-blue/30 bg-unlimited-light-blue/5' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-2 rounded-full ${channel.enabled ? 'bg-unlimited-light-blue' : 'bg-gray-100'}`}>
                      {channel.icon}
                    </div>
                    <Switch 
                      checked={channel.enabled} 
                      onCheckedChange={(checked) => {
                        switch(channel.id) {
                          case 'email':
                            setEmailNotifications(checked);
                            break;
                          case 'push':
                            setPushNotifications(checked);
                            break;
                          case 'sms':
                            setSmsNotifications(checked);
                            break;
                        }
                        
                        toast({
                          title: checked 
                            ? t('auth.notifications.channels.enabled', { channel: channel.name })
                            : t('auth.notifications.channels.disabled', { channel: channel.name }),
                          description: checked
                            ? t('auth.notifications.channels.enabledDesc')
                            : t('auth.notifications.channels.disabledDesc'),
                        });
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-1">{channel.name}</h3>
                  <p className="text-sm text-unlimited-gray">
                    {t(`auth.notifications.channels.${channel.id}Desc`)}
                  </p>
                  
                  {/* Channel-specific settings */}
                  {channel.enabled && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        {t('auth.notifications.channels.configure')}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">{t('auth.notifications.channels.customChannels')}</h3>
              <p className="text-unlimited-gray mb-4">{t('auth.notifications.channels.customChannelsDesc')}</p>
              
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t('auth.notifications.channels.addChannel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('auth.notifications.categories.title')}</CardTitle>
              <CardDescription>{t('auth.notifications.categories.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">{t('auth.notifications.categories.category')}</th>
                    <th className="py-2">{t('auth.notifications.categories.email')}</th>
                    <th className="py-2">{t('auth.notifications.categories.push')}</th>
                    <th className="py-2">{t('auth.notifications.categories.sms')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{t('auth.notifications.categories.applications')}</div>
                      <div className="text-sm text-unlimited-gray">{t('auth.notifications.categories.applicationsDesc')}</div>
                    </td>
                    <td className="py-3"><Switch checked={applicationUpdates} /></td>
                    <td className="py-3"><Switch checked={applicationUpdates && pushNotifications} /></td>
                    <td className="py-3"><Switch checked={false} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{t('auth.notifications.categories.messages')}</div>
                      <div className="text-sm text-unlimited-gray">{t('auth.notifications.categories.messagesDesc')}</div>
                    </td>
                    <td className="py-3"><Switch checked={messageNotifications} /></td>
                    <td className="py-3"><Switch checked={messageNotifications && pushNotifications} /></td>
                    <td className="py-3"><Switch checked={messageNotifications && smsNotifications} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{t('auth.notifications.categories.reminders')}</div>
                      <div className="text-sm text-unlimited-gray">{t('auth.notifications.categories.remindersDesc')}</div>
                    </td>
                    <td className="py-3"><Switch checked={eventReminders} /></td>
                    <td className="py-3"><Switch checked={eventReminders && pushNotifications} /></td>
                    <td className="py-3"><Switch checked={eventReminders && smsNotifications} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{t('auth.notifications.categories.marketing')}</div>
                      <div className="text-sm text-unlimited-gray">{t('auth.notifications.categories.marketingDesc')}</div>
                    </td>
                    <td className="py-3"><Switch checked={marketingEmails} /></td>
                    <td className="py-3"><Switch checked={false} /></td>
                    <td className="py-3"><Switch checked={false} /></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      <div className="font-medium">{t('auth.notifications.categories.security')}</div>
                      <div className="text-sm text-unlimited-gray">{t('auth.notifications.categories.securityDesc')}</div>
                    </td>
                    <td className="py-3"><Switch checked={true} disabled /></td>
                    <td className="py-3"><Switch checked={pushNotifications} /></td>
                    <td className="py-3"><Switch checked={true} disabled /></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>{t('common.saveChanges')}</Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.notifications.frequency.title')}</CardTitle>
                <CardDescription>{t('auth.notifications.frequency.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="digest-frequency" className="font-medium">
                      {t('auth.notifications.frequency.digest')}
                    </Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="digest-frequency" className="mt-1">
                        <SelectValue placeholder={t('auth.notifications.frequency.weekly')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">{t('auth.notifications.frequency.daily')}</SelectItem>
                        <SelectItem value="weekly">{t('auth.notifications.frequency.weekly')}</SelectItem>
                        <SelectItem value="monthly">{t('auth.notifications.frequency.monthly')}</SelectItem>
                        <SelectItem value="never">{t('auth.notifications.frequency.never')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm mt-1 text-unlimited-gray">
                      {t('auth.notifications.frequency.digestDesc')}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label htmlFor="max-notifications" className="font-medium">
                      {t('auth.notifications.frequency.maxDaily')}
                    </Label>
                    <Select defaultValue="10">
                      <SelectTrigger id="max-notifications" className="mt-1">
                        <SelectValue placeholder="10" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="unlimited">{t('auth.notifications.frequency.unlimited')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm mt-1 text-unlimited-gray">
                      {t('auth.notifications.frequency.maxDailyDesc')}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label htmlFor="notification-grouping" className="font-medium">
                      {t('auth.notifications.frequency.grouping')}
                    </Label>
                    <Select defaultValue="group">
                      <SelectTrigger id="notification-grouping" className="mt-1">
                        <SelectValue placeholder={t('auth.notifications.frequency.group')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group">{t('auth.notifications.frequency.group')}</SelectItem>
                        <SelectItem value="individual">{t('auth.notifications.frequency.individual')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm mt-1 text-unlimited-gray">
                      {t('auth.notifications.frequency.groupingDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.notifications.export.title')}</CardTitle>
                <CardDescription>{t('auth.notifications.export.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    {t('auth.notifications.export.history')}
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('auth.notifications.export.settings')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="statistics">
        <Card>
          <CardHeader>
            <CardTitle>{t('auth.notifications.statistics.title')}</CardTitle>
            <CardDescription>{t('auth.notifications.statistics.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-unlimited-light-blue/5 rounded-lg border border-unlimited-light-blue/20">
                <div className="text-sm text-unlimited-gray mb-1">{t('auth.notifications.statistics.today')}</div>
                <div className="text-3xl font-bold">{notificationStats.today}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-unlimited-gray mb-1">{t('auth.notifications.statistics.thisWeek')}</div>
                <div className="text-3xl font-bold">{notificationStats.thisWeek}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-unlimited-gray mb-1">{t('auth.notifications.statistics.thisMonth')}</div>
                <div className="text-3xl font-bold">{notificationStats.thisMonth}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-unlimited-gray mb-1">{t('auth.notifications.statistics.mostFrequent')}</div>
                <div className="text-lg font-bold truncate">{notificationStats.mostFrequent}</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 flex justify-center items-center">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">{t('auth.notifications.statistics.chartTitle')}</p>
                <p className="text-unlimited-gray">{t('auth.notifications.statistics.chartDesc')}</p>
                <Button className="mt-4">
                  {t('auth.notifications.statistics.viewDetailed')}
                </Button>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">{t('auth.notifications.statistics.recentActivity')}</h3>
              <div className="space-y-4">
                <div className="p-3 bg-unlimited-light-blue/5 border border-unlimited-light-blue/20 rounded-lg">
                  <div className="flex justify-between">
                    <div className="font-medium">{t('auth.notifications.statistics.messageReceived')}</div>
                    <div className="text-unlimited-gray">10:30</div>
                  </div>
                  <p className="text-sm text-unlimited-gray">
                    {t('auth.notifications.statistics.messageReceivedDesc')}
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <div className="flex justify-between">
                    <div className="font-medium">{t('auth.notifications.statistics.applicationUpdated')}</div>
                    <div className="text-unlimited-gray">09:15</div>
                  </div>
                  <p className="text-sm text-unlimited-gray">
                    {t('auth.notifications.statistics.applicationUpdatedDesc')}
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <div className="flex justify-between">
                    <div className="font-medium">{t('auth.notifications.statistics.reminderSent')}</div>
                    <div className="text-unlimited-gray">أمس</div>
                  </div>
                  <p className="text-sm text-unlimited-gray">
                    {t('auth.notifications.statistics.reminderSentDesc')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NotificationSettings;
