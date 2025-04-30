
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import MessagesList from '@/components/messaging/MessagesList';
import ContactsList from '@/components/messaging/ContactsList';

const AgentMessages = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Mock data for contacts
  const contacts = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'طالب',
      avatar: null,
      lastMessage: 'هل يمكنك مساعدتي في الطلب؟',
      timestamp: '10:30',
      lastMessageTime: new Date(),
      unread: 2,
    },
    {
      id: 2,
      name: 'مدير النظام',
      role: 'مدير',
      avatar: null,
      lastMessage: 'الرجاء مراجعة الطلب المعلق',
      timestamp: 'أمس',
      lastMessageTime: new Date(Date.now() - 86400000),
      unread: 1,
    },
    {
      id: 3,
      name: 'سارة خالد',
      role: 'طالب',
      avatar: null,
      lastMessage: 'شكراً لمساعدتك',
      timestamp: 'أمس',
      lastMessageTime: new Date(Date.now() - 86400000),
      unread: 0,
    },
    {
      id: 4,
      name: 'محمد علي',
      role: 'طالب',
      avatar: null,
      lastMessage: 'متى سيتم الرد على طلبي؟',
      timestamp: '22/04',
      lastMessageTime: new Date(Date.now() - 172800000),
      unread: 0,
    },
  ];

  // Mock messages for selected contact
  const [messages] = useState([
    {
      id: '1',
      content: 'مرحباً، هل يمكنك مساعدتي في طلب التحاق؟',
      sender: 'student1',
      timestamp: new Date(Date.now() - 3600000),
      attachments: [],
    },
    {
      id: '2',
      content: 'بالطبع، كيف يمكنني مساعدتك؟',
      sender: 'agent',
      timestamp: new Date(Date.now() - 3500000),
      attachments: [],
    },
    {
      id: '3',
      content: 'أريد معرفة المستندات المطلوبة للتقديم في جامعة إسطنبول التقنية',
      sender: 'student1',
      timestamp: new Date(Date.now() - 3400000),
      attachments: [],
    }
  ]);

  const handleContactSelect = (contactId: number) => {
    const contact = contacts.find(c => c.id === contactId);
    setSelectedContact(contact);
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="h-[calc(100vh-120px)]">
        <Card className="h-full shadow-sm">
          <CardContent className="p-0 h-full">
            <div className="grid grid-cols-12 h-full">
              <div className="col-span-12 md:col-span-4 xl:col-span-3 border-l">
                <ContactsList 
                  contacts={contacts} 
                  selectedContactId={selectedContact?.id} 
                  onSelectContact={handleContactSelect}
                />
              </div>
              <div className="col-span-12 md:col-span-8 xl:col-span-9">
                {selectedContact ? (
                  <MessagesList messages={messages} currentUserId="agent" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-unlimited-gray">اختر جهة اتصال للبدء في المحادثة</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentMessages;
