import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Bell, CheckCircle, X, Settings, MessageSquare, Mail, CalendarClock, FileText, Info, AlertCircle, ChevronDown, ArrowRight } from 'lucide-react';
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

interface NotificationSettingsProps {
  // Define any props here
}

const NotificationSettings: React.FC<NotificationSettingsProps> = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationSound, setNotificationSound] = useState("default");
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const [snoozeDuration, setSnoozeDuration] = useState("30");

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          إعدادات الإشعارات
        </CardTitle>
        <CardDescription>
          تخصيص أنواع الإشعارات التي تتلقاها وكيفية استلامها.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email">
            <Mail className="mr-2 h-4 w-4 inline-block" />
            الإشعارات عبر البريد الإلكتروني
          </Label>
          <Switch
            id="email"
            checked={emailNotifications}
            onCheckedChange={(checked) => setEmailNotifications(checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="push">
            <Bell className="mr-2 h-4 w-4 inline-block" />
            الإشعارات الفورية
          </Label>
          <Switch
            id="push"
            checked={pushNotifications}
            onCheckedChange={(checked) => setPushNotifications(checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sms">
            <MessageSquare className="mr-2 h-4 w-4 inline-block" />
            الإشعارات عبر الرسائل النصية القصيرة
          </Label>
          <Switch
            id="sms"
            checked={smsNotifications}
            onCheckedChange={(checked) => setSmsNotifications(checked)}
          />
        </div>

        <div>
          <Label htmlFor="sound">صوت الإشعارات</Label>
          <Select value={notificationSound} onValueChange={(value) => setNotificationSound(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="افتراضي" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>الأصوات</SelectLabel>
                <SelectItem value="default">افتراضي</SelectItem>
                <SelectItem value="chime">Chime</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
                <SelectItem value="none">بدون صوت</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button variant="secondary" onClick={handleSnoozeToggle}>
            {showSnoozeOptions ? (
              <>
                <X className="mr-2 h-4 w-4" />
                إخفاء خيارات التأجيل
              </>
            ) : (
              <>
                <CalendarClock className="mr-2 h-4 w-4" />
                تأجيل الإشعارات
              </>
            )}
          </Button>

          {showSnoozeOptions && (
            <div className="mt-4">
              <Label>مدة التأجيل</Label>
              <RadioGroup defaultValue={snoozeDuration} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15" id="r1" onClick={() => handleSnoozeDurationChange("15")} />
                  <Label htmlFor="r1">15 دقيقة</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30" id="r2" onClick={() => handleSnoozeDurationChange("30")} />
                  <Label htmlFor="r2">30 دقيقة</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60" id="r3" onClick={() => handleSnoozeDurationChange("60")} />
                  <Label htmlFor="r3">ساعة واحدة</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={handleResetSettings}>
          إعادة تعيين
        </Button>
        <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
