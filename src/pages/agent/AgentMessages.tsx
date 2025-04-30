
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { MessagesList } from '@/components/messaging/MessagesList';
import { ContactsList } from '@/components/messaging/ContactsList';

const AgentMessages = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  // Mock data for contacts
  const contacts = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'طالب',
      avatar: null,
      lastMessage: 'هل يمكنك مساعدتي في الطلب؟',
      timestamp: '10:30',
      unread: 2,
    },
    {
      id: 2,
      name: 'مدير النظام',
      role: 'مدير',
      avatar: null,
      lastMessage: 'الرجاء مراجعة الطلب المعلق',
      timestamp: 'أمس',
      unread: 1,
    },
    {
      id: 3,
      name: 'سارة خالد',
      role: 'طالب',
      avatar: null,
      lastMessage: 'شكراً لمساعدتك',
      timestamp: 'أمس',
      unread: 0,
    },
    {
      id: 4,
      name: 'محمد علي',
      role: 'طالب',
      avatar: null,
      lastMessage: 'متى سيتم الرد على طلبي؟',
      timestamp: '22/04',
      unread: 0,
    },
  ];

  const handleContactSelect = (contact) => {
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
                <MessagesList selectedContact={selectedContact} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentMessages;
