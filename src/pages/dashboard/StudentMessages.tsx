
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

const StudentMessages = () => {
  const [activeChat, setActiveChat] = useState('advisor');
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send message would go here
    console.log('Sending message:', message);
    setMessage('');
  };
  
  return (
    <MainLayout>
      <div className="bg-unlimited-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">الرسائل</h1>
          <p className="text-lg max-w-2xl mx-auto text-center">تواصل مع المرشدين الأكاديميين والمسؤولين عن طلبك</p>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Contacts Sidebar */}
            <div className="bg-gray-50 border-r border-gray-200">
              <Tabs defaultValue="advisor" className="w-full" onValueChange={setActiveChat}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="advisor">المرشدين</TabsTrigger>
                  <TabsTrigger value="admin">الإدارة</TabsTrigger>
                </TabsList>
                
                <TabsContent value="advisor" className="m-0">
                  <ScrollArea className="h-[500px] w-full">
                    <div className="space-y-1">
                      {[1, 2, 3].map((contact) => (
                        <button
                          key={contact}
                          className={`flex items-center p-4 w-full hover:bg-gray-100 transition ${activeChat === 'advisor' && contact === 1 ? 'bg-blue-50' : ''}`}
                        >
                          <Avatar className="h-10 w-10 border">
                            <div className="bg-unlimited-blue w-full h-full flex items-center justify-center text-white">
                              م{contact}
                            </div>
                          </Avatar>
                          <div className="mr-4 text-right">
                            <div className="font-medium">مرشد أكاديمي {contact}</div>
                            <p className="text-sm text-gray-500 truncate">رسالة تجريبية...</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="admin" className="m-0">
                  <ScrollArea className="h-[500px] w-full">
                    <div className="space-y-1">
                      {[1, 2].map((contact) => (
                        <button
                          key={contact}
                          className={`flex items-center p-4 w-full hover:bg-gray-100 transition ${activeChat === 'admin' && contact === 1 ? 'bg-blue-50' : ''}`}
                        >
                          <Avatar className="h-10 w-10 border">
                            <div className="bg-unlimited-dark-blue w-full h-full flex items-center justify-center text-white">
                              ا{contact}
                            </div>
                          </Avatar>
                          <div className="mr-4 text-right">
                            <div className="font-medium">مسؤول {contact}</div>
                            <p className="text-sm text-gray-500 truncate">رسالة تجريبية...</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Chat Area */}
            <div className="col-span-3 flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center">
                <Avatar className="h-10 w-10 border">
                  <div className="bg-unlimited-blue w-full h-full flex items-center justify-center text-white">
                    م1
                  </div>
                </Avatar>
                <div className="mr-4">
                  <div className="font-medium">مرشد أكاديمي 1</div>
                  <div className="text-sm text-gray-500">متصل</div>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p>مرحباً بك! كيف يمكنني مساعدتك اليوم؟</p>
                      <span className="text-xs text-gray-500 block mt-1">10:30 صباحاً</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-unlimited-blue text-white rounded-lg p-3 max-w-[80%]">
                      <p>مرحباً، أود الاستفسار عن برنامج بكالوريوس إدارة الأعمال</p>
                      <span className="text-xs text-white/70 block mt-1">10:32 صباحاً</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p>بالتأكيد! يعد برنامج بكالوريوس إدارة الأعمال من أكثر البرامج شعبية لدينا. هل لديك جامعة محددة تهتم بها؟</p>
                      <span className="text-xs text-gray-500 block mt-1">10:35 صباحاً</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1"
                />
                <Button type="submit" className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentMessages;
