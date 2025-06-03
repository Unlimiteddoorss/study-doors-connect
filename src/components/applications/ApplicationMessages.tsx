import { useState, useEffect, useRef } from 'react';
import MessagesContainer from './messages/MessagesContainer';
import { useToast } from '@/hooks/use-toast';
import { markMessagesAsRead } from '@/services/messageService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, User, X, PaperclipIcon, SendHorizontal, MoreVertical, Calendar, Settings, Info, CheckCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import MessagesAI from './messages/MessagesAI';

interface ApplicationMessagesProps {
  programName: string;
  universityName: string;
  applicationId: string;
}

const ApplicationMessages = ({ programName, universityName, applicationId }: ApplicationMessagesProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("messages");
  const [showQuickReply, setShowQuickReply] = useState(false);
  const [quickReplyText, setQuickReplyText] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundNotifications: false
  });
  
  // Reference for scrolling to bottom of messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading messages
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Simulate new messages notification with a date from 2025
      if (Math.random() > 0.3) {
        setHasNewMessages(true);
        toast({
          title: "رسائل جديدة",
          description: "لديك رسائل جديدة متعلقة بهذا الطلب - تم استلامها في ٨ مايو ٢٠٢٥",
        });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [applicationId, toast]);
  
  useEffect(() => {
    // Mark messages as read when component mounts
    const markAsRead = async () => {
      try {
        // In a real app, you would get the current user ID
        const userId = 'student-1'; // Placeholder for demo
        await markMessagesAsRead(applicationId, userId);
        console.log(`Marked messages as read for application ID: ${applicationId}`);
        
        if (hasNewMessages) {
          setHasNewMessages(false);
        }
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    };
    
    if (!isLoading) {
      markAsRead();
    }
  }, [applicationId, isLoading, hasNewMessages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);

  // Handle quick reply submission
  const handleQuickReply = () => {
    if (!quickReplyText.trim()) return;

    // In a real app, you would send this message to the server
    toast({
      title: "تم إرسال الرسالة",
      description: "تم إرسال ردك بنجاح",
    });

    // Clear input and hide quick reply
    setQuickReplyText("");
    setShowQuickReply(false);
  };

  // Handle notification settings update
  const handleUpdateSettings = () => {
    toast({
      title: "تم تحديث الإعدادات",
      description: "تم تحديث إعدادات الإشعارات بنجاح",
    });
    setShowSettings(false);
  };

  // Quick reply suggestions
  const quickReplySuggestions = [
    "شكراً جزيلاً للمعلومات",
    "متى يمكنني توقع رد؟",
    "هل هناك معلومات إضافية مطلوبة؟",
    "أحتاج إلى مساعدة إضافية بخصوص هذا الطلب"
  ];

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-unlimited-blue" />
              المراسلات
            </CardTitle>
            <p className="text-sm text-unlimited-gray mt-1">
              {programName} - {universityName}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>إعدادات الإشعارات</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: "تم تصدير المحادثة",
                    description: "تم تصدير المحادثة كملف PDF بنجاح",
                  });
                }}>
                  <PaperclipIcon className="h-4 w-4 ml-2" />
                  تصدير المحادثة
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: "تمت إضافة موعد",
                    description: "تمت إضافة موعد المقابلة إلى التقويم",
                  });
                }}>
                  <Calendar className="h-4 w-4 ml-2" />
                  إضافة موعد للتقويم
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="messages" className="flex-1">
              المراسلات
              {hasNewMessages && (
                <Badge variant="destructive" className="mr-2 h-5 min-w-[20px] flex items-center justify-center">
                  جديد
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex-1">
              المساعد الذكي
              <Badge variant="secondary" className="mr-2">جديد</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-hidden">
        <TabsContent value="messages" className="h-full m-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
            </div>
          ) : (
            <div className="relative h-full flex flex-col">
              <MessagesContainer 
                programName={programName} 
                universityName={universityName} 
                applicationId={applicationId} 
              />
              
              {/* Quick Reply Feature */}
              {showQuickReply ? (
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                    {quickReplySuggestions.map((suggestion, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setQuickReplyText(suggestion)}
                        className="whitespace-nowrap"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="اكتب رسالتك السريعة هنا..." 
                      value={quickReplyText}
                      onChange={(e) => setQuickReplyText(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={handleQuickReply} 
                        disabled={!quickReplyText.trim()}
                        size="sm"
                      >
                        <SendHorizontal className="h-4 w-4 ml-1" />
                        إرسال
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowQuickReply(false)}
                      >
                        <X className="h-4 w-4 ml-1" />
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-4 right-4">
                  <Button 
                    onClick={() => setShowQuickReply(true)}
                    size="sm"
                    className="rounded-full shadow-lg"
                  >
                    <MessageSquare className="h-4 w-4 ml-1" />
                    رد سريع
                  </Button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ai-assistant" className="h-full m-0">
          <MessagesAI applicationId={applicationId} />
        </TabsContent>
      </CardContent>
      
      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إعدادات المراسلات
            </DialogTitle>
            <DialogDescription>
              قم بتخصيص طريقة تلقي الإشعارات والمراسلات
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">الإشعارات عبر البريد الإلكتروني</Label>
                <p className="text-sm text-unlimited-gray">تلقي إشعارات الرسائل الجديدة عبر البريد الإلكتروني</p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, emailNotifications: checked})
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="font-medium">الإشعارات الفورية</Label>
                <p className="text-sm text-unlimited-gray">تلقي إشعارات الرسائل الجديدة على المتصفح</p>
              </div>
              <Switch 
                id="push-notifications" 
                checked={notificationSettings.pushNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, pushNotifications: checked})
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sound-notifications" className="font-medium">التنبيهات الصوتية</Label>
                <p className="text-sm text-unlimited-gray">تشغيل صوت عند استلام رسالة جديدة</p>
              </div>
              <Switch 
                id="sound-notifications" 
                checked={notificationSettings.soundNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, soundNotifications: checked})
                }
              />
            </div>
            
            <div className="bg-unlimited-light-blue/10 p-3 rounded-md">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Info className="h-4 w-4 text-unlimited-blue" />
                تحديثات النظام
              </h3>
              <p className="text-sm text-unlimited-gray">
                تم تحديث نظام المراسلات في 5 مايو 2025 مع إضافة ميزة المساعد الذكي والردود السريعة.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateSettings}>
              <CheckCircle className="h-4 w-4 ml-1" />
              حفظ الإعدادات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ApplicationMessages;
