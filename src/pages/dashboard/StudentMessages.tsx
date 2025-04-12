
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Search, Paperclip, Image } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  agent: {
    name: string;
    avatar?: string;
  };
}

const StudentMessages = () => {
  useEffect(() => {
    document.title = 'الرسائل - أبواب بلا حدود';
  }, []);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'طلب تسجيل في جامعة اسطنبول',
      lastMessage: 'تم استلام أوراقك، سنتواصل معك قريباً',
      timestamp: new Date(2023, 3, 15, 14, 30),
      unread: 1,
      agent: {
        name: 'أحمد محمد',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    },
    {
      id: '2',
      title: 'استفسار حول السكن الجامعي',
      lastMessage: 'نعم، السكن متوفر للطلاب الدوليين',
      timestamp: new Date(2023, 3, 10, 11, 25),
      unread: 0,
      agent: {
        name: 'سارة خالد',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
    },
    {
      id: '3',
      title: 'تأشيرة الدراسة',
      lastMessage: 'الأوراق المطلوبة هي: جواز السفر، قبول الجامعة...',
      timestamp: new Date(2023, 3, 5, 9, 15),
      unread: 2,
      agent: {
        name: 'محمد علي',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    },
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1-1',
        text: 'مرحباً، لقد تقدمت بطلب للتسجيل في جامعة اسطنبول',
        sender: 'user',
        timestamp: new Date(2023, 3, 15, 10, 30),
        read: true,
      },
      {
        id: '1-2',
        text: 'مرحباً، شكراً لتواصلك معنا. سنقوم بمراجعة طلبك ومتابعته مع الجامعة.',
        sender: 'admin',
        timestamp: new Date(2023, 3, 15, 11, 45),
        read: true,
      },
      {
        id: '1-3',
        text: 'متى يمكنني الحصول على رد من الجامعة؟',
        sender: 'user',
        timestamp: new Date(2023, 3, 15, 12, 10),
        read: true,
      },
      {
        id: '1-4',
        text: 'عادة ما يستغرق الرد من الجامعة من 7 إلى 10 أيام عمل. سنبقيك على اطلاع بمجرد تلقينا أي معلومات جديدة.',
        sender: 'admin',
        timestamp: new Date(2023, 3, 15, 12, 45),
        read: true,
      },
      {
        id: '1-5',
        text: 'تم استلام أوراقك، سنتواصل معك قريباً',
        sender: 'admin',
        timestamp: new Date(2023, 3, 15, 14, 30),
        read: false,
      },
    ],
    '2': [
      {
        id: '2-1',
        text: 'هل يوجد سكن جامعي متاح للطلاب الدوليين؟',
        sender: 'user',
        timestamp: new Date(2023, 3, 10, 9, 15),
        read: true,
      },
      {
        id: '2-2',
        text: 'نعم، السكن متوفر للطلاب الدوليين وهناك عدة خيارات متاحة',
        sender: 'admin',
        timestamp: new Date(2023, 3, 10, 11, 25),
        read: true,
      },
    ],
    '3': [
      {
        id: '3-1',
        text: 'ما هي الأوراق المطلوبة للحصول على تأشيرة الدراسة؟',
        sender: 'user',
        timestamp: new Date(2023, 3, 5, 8, 30),
        read: true,
      },
      {
        id: '3-2',
        text: 'الأوراق المطلوبة هي: جواز السفر، قبول الجامعة...',
        sender: 'admin',
        timestamp: new Date(2023, 3, 5, 9, 15),
        read: false,
      },
      {
        id: '3-3',
        text: 'هل يلزم تصديق الأوراق من السفارة؟',
        sender: 'admin',
        timestamp: new Date(2023, 3, 5, 9, 17),
        read: false,
      },
    ],
  });
  
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: `${selectedConversation}-${messages[selectedConversation].length + 1}`,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      read: true,
    };
    
    // Update messages
    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...prev[selectedConversation], newMsg],
    }));
    
    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: newMessage, timestamp: new Date(), unread: 0 } 
          : conv
      )
    );
    
    // Clear input
    setNewMessage('');
  };
  
  const handleSelectConversation = (convId: string) => {
    setSelectedConversation(convId);
    
    // Mark messages as read
    setMessages(prev => ({
      ...prev,
      [convId]: prev[convId].map(msg => ({ ...msg, read: true })),
    }));
    
    // Update unread count in conversation
    setConversations(prev => 
      prev.map(conv => 
        conv.id === convId 
          ? { ...conv, unread: 0 } 
          : conv
      )
    );
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'الأمس';
    } else {
      return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'numeric' });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-130px)]">
          {/* Conversations list */}
          <Card className="md:col-span-1">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">الرسائل</CardTitle>
                <Badge className="bg-unlimited-blue">{conversations.reduce((acc, conv) => acc + conv.unread, 0)}</Badge>
              </div>
              <div className="relative">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-unlimited-gray" />
                <Input placeholder="بحث..." className="pl-4 pr-10" />
              </div>
            </CardHeader>
            
            <ScrollArea className="h-[calc(100vh-245px)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 ${
                    selectedConversation === conversation.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.agent.avatar} />
                    <AvatarFallback>{conversation.agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-sm truncate">{conversation.title}</h4>
                      <span className="text-xs text-unlimited-gray">{formatDate(conversation.timestamp)}</span>
                    </div>
                    <p className="text-sm text-unlimited-gray truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-unlimited-blue rounded-full h-5 w-5 flex items-center justify-center p-0">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </Card>
          
          {/* Messages */}
          <Card className="md:col-span-2">
            {selectedConversation && (
              <>
                <CardHeader className="py-3 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={conversations.find(c => c.id === selectedConversation)?.agent.avatar} />
                      <AvatarFallback>
                        {conversations.find(c => c.id === selectedConversation)?.agent.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {conversations.find(c => c.id === selectedConversation)?.agent.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {conversations.find(c => c.id === selectedConversation)?.title}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-310px)] p-4">
                    <div className="flex flex-col gap-4">
                      {messages[selectedConversation].map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === 'user'
                                ? 'bg-unlimited-blue text-white rounded-br-none'
                                : 'bg-gray-100 text-unlimited-dark-blue rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <div
                              className={`text-xs mt-1 flex justify-end ${
                                message.sender === 'user' ? 'text-unlimited-blue-light' : 'text-unlimited-gray'
                              }`}
                            >
                              {formatDate(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                
                <CardFooter className="p-3 border-t">
                  <div className="flex items-center w-full gap-2">
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="shrink-0 bg-unlimited-blue hover:bg-unlimited-dark-blue"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
