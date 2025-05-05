
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { getMessages } from '@/services/messageService';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Download, Filter, Info, ArrowDown, SortDesc, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Message {
  id: string;
  application_id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  attachments?: any[];
  created_at: string;
  is_read: boolean;
}

interface MessagesContainerProps {
  programName: string;
  universityName: string;
  applicationId: string;
}

const MessagesContainer = ({ programName, universityName, applicationId }: MessagesContainerProps) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'student' | 'advisor' | 'university'>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [hasAttachments, setHasAttachments] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch messages when component mounts or applicationId changes
  useEffect(() => {
    fetchMessages();
  }, [applicationId]);

  // Apply filters when messages or filter options change
  useEffect(() => {
    let result = [...messages];
    
    // Apply filters
    if (filter !== 'all') {
      result = result.filter(message => message.sender_role === filter);
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(message => 
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredMessages(result);
  }, [messages, filter, searchTerm, sortDirection]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (sortDirection === 'asc') {
      scrollToBottom();
    }
  }, [filteredMessages, sortDirection]);

  // Add scroll event listener to show/hide the scroll button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;
      const isNotAtBottom = scrollTop + clientHeight < scrollHeight - 100;
      
      setShowScrollButton(isScrollable && isNotAtBottom);
    };
    
    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch messages from the server using Supabase
      const result = await getMessages(applicationId);
      setMessages(result);
      setFilteredMessages(result);
    } catch (error) {
      console.error('Error fetching messages:', error);
      
      // For demo, generate some mock messages if the server request fails
      const mockMessages: Message[] = [
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'advisor-1',
          sender_role: 'advisor',
          content: 'مرحباً، أود إبلاغك بأن طلبك قيد المراجعة حالياً. يمكنك الاستفسار عن أي شيء هنا.',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          is_read: true
        },
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'student-1',
          sender_role: 'student',
          content: 'شكراً لكم. متى يمكنني توقع رد نهائي على طلبي؟',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          is_read: true
        },
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'advisor-1',
          sender_role: 'advisor',
          content: 'عادة ما تستغرق مراجعة الطلبات من 7 إلى 14 يوم عمل. سيتم إشعارك فور صدور القرار النهائي.',
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          is_read: true
        },
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'university-1',
          sender_role: 'university',
          content: 'مرحباً، هذه رسالة من قسم القبول بالجامعة. نود إبلاغك بأننا بحاجة إلى بعض المستندات الإضافية لإكمال طلبك. يرجى الاطلاع على قائمة المستندات المطلوبة المرفقة وتقديمها في أقرب وقت ممكن.',
          attachments: [
            {
              name: 'قائمة_المستندات_المطلوبة.pdf',
              size: 1048576, // 1MB
              type: 'application/pdf'
            }
          ],
          created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          is_read: true
        },
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'student-1',
          sender_role: 'student',
          content: 'شكراً لكم على المعلومات. سأقوم بتجهيز المستندات المطلوبة وتقديمها قريباً.',
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          is_read: true
        },
        {
          id: uuidv4(),
          application_id: applicationId,
          sender_id: 'advisor-1',
          sender_role: 'advisor',
          content: 'ممتاز! نحن هنا للمساعدة إذا كان لديك أي أسئلة أخرى حول المستندات المطلوبة أو عملية التقديم.',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          is_read: true
        }
      ];
      
      setMessages(mockMessages);
      setFilteredMessages(mockMessages);
    } finally {
      setIsLoading(false);
      
      // Check if there are any messages with attachments
      setTimeout(() => {
        const hasAttach = messages.some(msg => msg.attachments && msg.attachments.length > 0);
        setHasAttachments(hasAttach);
      }, 500);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessageSent = () => {
    // Refresh messages after sending a new one
    fetchMessages();
  };

  const resetFilters = () => {
    setFilter('all');
    setSearchTerm('');
    setSortDirection('asc');
    setFilteredMessages(messages);
    toast({
      title: "تم إعادة ضبط الفلاتر",
      description: "تم إعادة ضبط جميع الفلاتر إلى الإعدادات الافتراضية",
    });
  };

  const downloadMessages = () => {
    // In a real app, this would generate a PDF or text file with the conversation
    toast({
      title: "جاري تحميل المحادثة",
      description: "يتم تجهيز المحادثة للتحميل...",
    });
    
    setTimeout(() => {
      toast({
        title: "تم التحميل",
        description: "تم تحميل المحادثة بنجاح",
      });
    }, 1500);
  };

  // تحديد عدد الرسائل اليوم والأسبوع الماضي والشهر الماضي
  const getMessageStats = () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const todayMessages = messages.filter(msg => 
      new Date(msg.created_at) >= oneDayAgo
    );
    
    const weekMessages = messages.filter(msg => 
      new Date(msg.created_at) >= oneWeekAgo && new Date(msg.created_at) < oneDayAgo
    );
    
    const monthMessages = messages.filter(msg => 
      new Date(msg.created_at) >= oneMonthAgo && new Date(msg.created_at) < oneWeekAgo
    );
    
    return {
      today: todayMessages.length,
      week: weekMessages.length,
      month: monthMessages.length,
      total: messages.length
    };
  };

  const messageStats = getMessageStats();

  // تحديد نسبة الرسائل من كل مرسل
  const getSenderBreakdown = () => {
    const studentMessages = messages.filter(msg => msg.sender_role === 'student').length;
    const advisorMessages = messages.filter(msg => msg.sender_role === 'advisor').length;
    const universityMessages = messages.filter(msg => msg.sender_role === 'university').length;
    
    return {
      student: {
        count: studentMessages,
        percentage: Math.round((studentMessages / messages.length) * 100) || 0
      },
      advisor: {
        count: advisorMessages,
        percentage: Math.round((advisorMessages / messages.length) * 100) || 0
      },
      university: {
        count: universityMessages,
        percentage: Math.round((universityMessages / messages.length) * 100) || 0
      }
    };
  };

  const senderBreakdown = getSenderBreakdown();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{t('application.messages.title', 'المراسلات')}</CardTitle>
            <CardDescription>
              {programName} - {universityName}
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 ml-1" />
                  فلتر
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>فلتر الرسائل</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuCheckboxItem
                    checked={filter === 'all'}
                    onCheckedChange={() => setFilter('all')}
                  >
                    الكل
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filter === 'student'}
                    onCheckedChange={() => setFilter('student')}
                  >
                    رسائلي
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filter === 'advisor'}
                    onCheckedChange={() => setFilter('advisor')}
                  >
                    المستشار التعليمي
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filter === 'university'}
                    onCheckedChange={() => setFilter('university')}
                  >
                    ممثل الجامعة
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                  <SortDesc className="h-4 w-4 ml-2" />
                  {sortDirection === 'asc' ? 'الأحدث أولاً' : 'الأقدم أولاً'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={resetFilters}>
                  إعادة ضبط الفلاتر
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={downloadMessages}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تحميل المحادثة</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="messages" className="flex-1">
              المراسلات
              <Badge variant="secondary" className="mr-2">
                {filteredMessages.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex-1">
              إحصائيات
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        <TabsContent value="messages" className="flex-1 flex flex-col m-0 h-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
            </div>
          ) : filteredMessages.length > 0 ? (
            <>
              <div className="px-4 py-2 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
                  <Input
                    placeholder="البحث في المراسلات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto mb-0 px-4 py-4 relative scroll-smooth"
              >
                <div className="space-y-4">
                  {filteredMessages.map((message, index) => {
                    // اضافة فاصل تاريخ بين الرسائل من أيام مختلفة
                    const showDateSeparator = index === 0 || (index > 0 && 
                      new Date(message.created_at).toDateString() !== 
                      new Date(filteredMessages[index - 1].created_at).toDateString()
                    );
                    
                    return (
                      <div key={message.id}>
                        {showDateSeparator && (
                          <div className="flex justify-center my-4">
                            <div className="bg-gray-100 rounded-full px-4 py-1 text-xs text-unlimited-gray">
                              {format(new Date(message.created_at), 'EEEE, d MMMM yyyy', { locale: ar })}
                            </div>
                          </div>
                        )}
                        
                        <MessageItem 
                          message={message} 
                          isCurrentUser={message.sender_role === 'student'}
                        />
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
                
                {showScrollButton && (
                  <button
                    onClick={scrollToBottom}
                    className="absolute bottom-4 right-4 bg-unlimited-blue text-white rounded-full p-2 shadow-md hover:bg-unlimited-dark-blue transition-colors"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="px-4 pb-4 pt-2">
                <MessageInput applicationId={applicationId} onMessageSent={handleMessageSent} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-unlimited-gray">
                <p>{t('application.messages.noMessages', 'لا توجد رسائل بعد.')}</p>
                <p>{t('application.messages.startConversation', 'ابدأ المحادثة بإرسال رسالة.')}</p>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="stats" className="m-0 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">إحصائيات المراسلات</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-unlimited-gray mb-1">اليوم</div>
                  <div className="text-2xl font-bold text-unlimited-blue">{messageStats.today}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-unlimited-gray mb-1">آخر أسبوع</div>
                  <div className="text-2xl font-bold text-unlimited-blue">{messageStats.week}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-unlimited-gray mb-1">آخر 30 يوم</div>
                  <div className="text-2xl font-bold text-unlimited-blue">{messageStats.month}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-unlimited-gray mb-1">المجموع</div>
                  <div className="text-2xl font-bold text-unlimited-blue">{messageStats.total}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">توزيع الرسائل</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-unlimited-blue ml-2"></div>
                      <span>أنت</span>
                    </div>
                    <div className="text-sm">
                      {senderBreakdown.student.count} رسائل ({senderBreakdown.student.percentage}%)
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-unlimited-blue h-2.5 rounded-full" 
                      style={{ width: `${senderBreakdown.student.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
                      <span>المستشار التعليمي</span>
                    </div>
                    <div className="text-sm">
                      {senderBreakdown.advisor.count} رسائل ({senderBreakdown.advisor.percentage}%)
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${senderBreakdown.advisor.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 ml-2"></div>
                      <span>ممثل الجامعة</span>
                    </div>
                    <div className="text-sm">
                      {senderBreakdown.university.count} رسائل ({senderBreakdown.university.percentage}%)
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-500 h-2.5 rounded-full" 
                      style={{ width: `${senderBreakdown.university.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {hasAttachments && (
              <div>
                <h3 className="text-lg font-medium mb-4">المرفقات</h3>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b font-medium">
                    المرفقات المشتركة
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {messages
                        .filter(msg => msg.attachments && msg.attachments.length > 0)
                        .map(msg => msg.attachments && msg.attachments.map((attachment, attachIndex) => (
                          <div key={`${msg.id}-${attachIndex}`} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                            <div className="flex items-center">
                              <div className="bg-gray-100 p-2 rounded-md ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-unlimited-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">{attachment.name}</div>
                                <div className="text-xs text-unlimited-gray flex items-center">
                                  <span className="ml-2">{(attachment.size / 1024 / 1024).toFixed(2)} MB</span>
                                  <span className="ml-2">
                                    {format(new Date(msg.created_at), 'd MMM yyyy', { locale: ar })}
                                  </span>
                                  <span className="ml-2">
                                    بواسطة {msg.sender_role === 'student' ? 'أنت' : msg.sender_role === 'advisor' ? 'المستشار' : 'ممثل الجامعة'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 ml-1" />
                              تحميل
                            </Button>
                          </div>
                        )))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-yellow-500 ml-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-700">معلومات مهمة</h3>
                  <p className="text-sm text-yellow-600 mt-1">
                    يمكنك الاحتفاظ بسجل لجميع المراسلات المتعلقة بطلبك للرجوع إليها في المستقبل. تأكد من الرد على الرسائل في الوقت المناسب لتجنب أي تأخير في معالجة طلبك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default MessagesContainer;
