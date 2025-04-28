
import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import MessageInput from '@/components/applications/messages/MessageInput';
import MessagesList from '@/components/messaging/MessagesList';
import ContactsList from '@/components/messaging/ContactsList';
import { User, MessageSquare, Search, Paperclip, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

export type Contact = {
  id: string;
  name: string;
  role: 'admin' | 'agent' | 'student';
  avatar?: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: Date;
};

export type Message = {
  id: string;
  content: string;
  sender: 'admin' | 'agent' | 'student';
  timestamp: Date;
  read: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
};

export type Conversation = {
  id: string;
  contact: Contact;
  messages: Message[];
};

const UserMessages = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 'contact-1',
      name: 'فريق الدعم',
      role: 'admin',
      lastMessage: 'شكراً لكم على المساعدة',
      unreadCount: 2,
      lastMessageTime: new Date(2023, 3, 15, 10, 30),
    },
    {
      id: 'contact-2',
      name: 'محمد الخالدي (وكيل)',
      role: 'agent',
      lastMessage: 'سأتواصل معك قريباً بخصوص مستنداتك',
      unreadCount: 3,
      lastMessageTime: new Date(2023, 3, 14, 14, 45),
    },
    {
      id: 'contact-3',
      name: 'مستشار القبول - جامعة إسطنبول',
      role: 'admin',
      lastMessage: 'تم استلام مستنداتك وسيتم مراجعتها',
      unreadCount: 0,
      lastMessageTime: new Date(2023, 3, 10, 9, 15),
    }
  ]);
  
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      contact: contacts[0],
      messages: [
        {
          id: 'msg-1',
          content: 'السلام عليكم، لدي استفسار حول طلب التسجيل الخاص بي',
          sender: 'student',
          timestamp: new Date(2023, 3, 15, 10, 0),
          read: true,
        },
        {
          id: 'msg-2',
          content: 'أهلاً بك، كيف يمكننا مساعدتك؟',
          sender: 'admin',
          timestamp: new Date(2023, 3, 15, 10, 5),
          read: true,
        },
        {
          id: 'msg-3',
          content: 'هل يمكنكم إخباري عن حالة طلبي؟',
          sender: 'student',
          timestamp: new Date(2023, 3, 15, 10, 10),
          read: true,
        },
        {
          id: 'msg-4',
          content: 'طلبك قيد المراجعة حالياً، سنخبرك بأي تحديثات خلال 48 ساعة',
          sender: 'admin',
          timestamp: new Date(2023, 3, 15, 10, 20),
          read: true,
        },
        {
          id: 'msg-5',
          content: 'شكراً لكم على المساعدة',
          sender: 'student',
          timestamp: new Date(2023, 3, 15, 10, 30),
          read: false,
        },
      ],
    },
    {
      id: 'conv-2',
      contact: contacts[1],
      messages: [
        {
          id: 'msg-6',
          content: 'مرحباً، أريد المساعدة بخصوص برنامج الطب البشري',
          sender: 'student',
          timestamp: new Date(2023, 3, 14, 14, 30),
          read: true,
        },
        {
          id: 'msg-7',
          content: 'أهلاً بك، أنا الوكيل المسؤول عن التقديم للجامعات البولندية. كيف يمكنني مساعدتك؟',
          sender: 'agent',
          timestamp: new Date(2023, 3, 14, 14, 35),
          read: true,
        },
        {
          id: 'msg-8',
          content: 'أحتاج لمعرفة المستندات المطلوبة والمواعيد النهائية للتقديم',
          sender: 'student',
          timestamp: new Date(2023, 3, 14, 14, 40),
          read: true,
        },
        {
          id: 'msg-9',
          content: 'سأرسل لك قائمة بكل المستندات المطلوبة ومواعيد التقديم قريباً',
          sender: 'agent',
          timestamp: new Date(2023, 3, 14, 14, 42),
          read: false,
        },
        {
          id: 'msg-10',
          content: 'سأتواصل معك قريباً بخصوص مستنداتك',
          sender: 'agent',
          timestamp: new Date(2023, 3, 14, 14, 45),
          read: false,
        },
      ],
    },
    {
      id: 'conv-3',
      contact: contacts[2],
      messages: [
        {
          id: 'msg-11',
          content: 'السلام عليكم، أود الاستفسار عن برنامج الماجستير في إدارة الأعمال',
          sender: 'student',
          timestamp: new Date(2023, 3, 10, 9, 0),
          read: true,
        },
        {
          id: 'msg-12',
          content: 'أهلاً بك، يمكنك الاطلاع على تفاصيل البرنامج من خلال الرابط التالي...',
          sender: 'admin',
          timestamp: new Date(2023, 3, 10, 9, 5),
          read: true,
        },
        {
          id: 'msg-13',
          content: 'قمت بتحميل المستندات المطلوبة، هل هناك شيء آخر؟',
          sender: 'student',
          timestamp: new Date(2023, 3, 10, 9, 10),
          read: true,
        },
        {
          id: 'msg-14',
          content: 'تم استلام مستنداتك وسيتم مراجعتها',
          sender: 'admin',
          timestamp: new Date(2023, 3, 10, 9, 15),
          read: true,
        },
      ],
    },
  ]);
  
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selecting a conversation
  const handleSelectConversation = (contactId: string) => {
    const conversation = conversations.find(conv => conv.contact.id === contactId) || null;
    
    if (conversation) {
      setActiveConversation(conversation);
      
      // Mark messages as read
      if (conversation.contact.unreadCount > 0) {
        setContacts(prevContacts => 
          prevContacts.map(c => 
            c.id === contactId ? { ...c, unreadCount: 0 } : c
          )
        );
        
        setConversations(prevConversations =>
          prevConversations.map(conv => {
            if (conv.id === conversation.id) {
              return {
                ...conv,
                messages: conv.messages.map(msg => ({ ...msg, read: true })),
                contact: { ...conv.contact, unreadCount: 0 }
              };
            }
            return conv;
          })
        );
      }
    }
  };

  // Send a new message
  const handleSendMessage = (messageText: string, attachments: File[]) => {
    if (!activeConversation) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content: messageText,
      sender: 'student',
      timestamp: new Date(),
      read: true,
      attachments: attachments.length > 0 ? attachments.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      })) : undefined
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          contact: {
            ...conv.contact,
            lastMessage: messageText || 'تم إرسال مرفق',
            lastMessageTime: new Date()
          }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Update the active conversation
    setActiveConversation(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, newMsg],
        contact: {
          ...prev.contact,
          lastMessage: messageText || 'تم إرسال مرفق',
          lastMessageTime: new Date()
        }
      };
    });
    
    // Update contacts list
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === activeConversation.contact.id 
          ? { 
              ...c, 
              lastMessage: messageText || 'تم إرسال مرفق',
              lastMessageTime: new Date()
            } 
          : c
      )
    );
    
    // Simulate reply after a delay
    setTimeout(() => {
      simulateReply(activeConversation.id);
    }, 3000);
  };
  
  // Simulate a reply from the contact
  const simulateReply = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    const replies = [
      'شكراً لتواصلك معنا، سنرد عليك في أقرب وقت.',
      'تم استلام رسالتك، وسيتم معالجتها قريباً.',
      'سنقوم بالرد على استفسارك خلال 24 ساعة.',
      'شكراً لك، هل هناك أي شيء آخر يمكننا مساعدتك به؟',
      'تم تسجيل طلبك، وسنتواصل معك قريباً.',
    ];
    
    const replyText = replies[Math.floor(Math.random() * replies.length)];
    
    const newReply: Message = {
      id: `reply-${Date.now()}`,
      content: replyText,
      sender: conversation.contact.role,
      timestamp: new Date(),
      read: false,
    };
    
    // Update conversations
    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newReply],
            contact: {
              ...conv.contact,
              lastMessage: replyText,
              lastMessageTime: new Date(),
              unreadCount: activeConversation?.id === conversationId ? 0 : conv.contact.unreadCount + 1
            }
          };
        }
        return conv;
      })
    );
    
    // Update contacts
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === conversation.contact.id 
          ? { 
              ...c, 
              lastMessage: replyText,
              lastMessageTime: new Date(),
              unreadCount: activeConversation?.id === conversationId ? 0 : c.unreadCount + 1
            } 
          : c
      )
    );
    
    // Update active conversation if it's the current one
    if (activeConversation?.id === conversationId) {
      setActiveConversation(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, newReply],
          contact: {
            ...prev.contact,
            lastMessage: replyText,
            lastMessageTime: new Date()
          }
        };
      });
    } else {
      // If it's not the active conversation, show a toast
      toast({
        title: "رسالة جديدة",
        description: `${conversation.contact.name}: ${replyText}`,
      });
    }
  };

  // Scroll to bottom of messages when active conversation changes or new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages]);
  
  // Get the total unread count for all contacts
  const totalUnreadCount = contacts.reduce((total, contact) => total + contact.unreadCount, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-150px)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-unlimited-dark-blue">الرسائل</h1>
            {totalUnreadCount > 0 && (
              <Badge className="bg-unlimited-blue text-white mr-2">{totalUnreadCount} جديدة</Badge>
            )}
          </div>
          
          <Button>
            <MessageSquare className="h-4 w-4 ml-2" />
            بدء محادثة جديدة
          </Button>
        </div>
        
        <div className="flex flex-1 border rounded-md overflow-hidden">
          {/* Contacts sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-l bg-gray-50">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
                <Input
                  placeholder="البحث في المحادثات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-270px)]">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 border-b ${
                    activeConversation?.contact.id === contact.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleSelectConversation(contact.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full ${
                        contact.role === 'admin' 
                          ? 'bg-unlimited-dark-blue' 
                          : contact.role === 'agent' 
                            ? 'bg-unlimited-blue' 
                            : 'bg-unlimited-gray'
                      } flex items-center justify-center text-white`}>
                        <User className="h-6 w-6" />
                      </div>
                      <div className="mr-3">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-unlimited-gray truncate max-w-[180px]">
                          {contact.lastMessage}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-unlimited-gray">
                        {formatDistanceToNow(contact.lastMessageTime, { addSuffix: true, locale: ar })}
                      </div>
                      {contact.unreadCount > 0 && (
                        <Badge className="bg-unlimited-blue">{contact.unreadCount}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          {/* Messages area */}
          {activeConversation ? (
            <div className="hidden md:flex md:flex-col flex-1">
              {/* Conversation header */}
              <div className="p-3 border-b flex items-center justify-between bg-gray-50">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full ${
                    activeConversation.contact.role === 'admin' 
                      ? 'bg-unlimited-dark-blue' 
                      : activeConversation.contact.role === 'agent' 
                        ? 'bg-unlimited-blue' 
                        : 'bg-unlimited-gray'
                  } flex items-center justify-center text-white`}>
                    <User className="h-6 w-6" />
                  </div>
                  <div className="mr-3">
                    <div className="font-medium">{activeConversation.contact.name}</div>
                  </div>
                </div>
              </div>
              
              {/* Messages content */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'student'
                            ? 'bg-unlimited-blue text-white rounded-tl-none'
                            : 'bg-gray-100 text-gray-800 rounded-tr-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Paperclip className="h-3 w-3" />
                                <a
                                  href={attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs underline"
                                >
                                  {attachment.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === 'student' ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-3 border-t">
                <MessageInput 
                  onSendMessage={handleSendMessage}
                  placeholder="اكتب رسالة..."
                />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="bg-unlimited-blue/10 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-12 w-12 text-unlimited-blue" />
                </div>
                <h3 className="text-xl font-medium text-unlimited-dark-blue mb-2">اختر محادثة</h3>
                <p className="text-unlimited-gray max-w-md">
                  اختر محادثة من القائمة للبدء في التواصل مع فريق الدعم أو الوكلاء.
                </p>
              </div>
            </div>
          )}
          
          {/* Mobile conversation view */}
          {activeConversation && (
            <div className="md:hidden flex flex-col flex-1">
              {/* Mobile conversation header */}
              <div className="p-3 border-b flex items-center bg-gray-50">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveConversation(null)}
                  className="mr-2"
                >
                  <User className="h-5 w-5" />
                </Button>
                <div className="font-medium">{activeConversation.contact.name}</div>
              </div>
              
              {/* Mobile messages content */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'student'
                            ? 'bg-unlimited-blue text-white rounded-tl-none'
                            : 'bg-gray-100 text-gray-800 rounded-tr-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === 'student' ? 'text-unlimited-light-blue' : 'text-unlimited-gray'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Mobile message input */}
              <div className="p-3 border-t">
                <MessageInput 
                  onSendMessage={handleSendMessage}
                  placeholder="اكتب رسالة..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserMessages;
