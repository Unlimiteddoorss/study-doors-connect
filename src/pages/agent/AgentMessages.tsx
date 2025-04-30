
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import MessagesList from '@/components/messaging/MessagesList';
import ContactsList from '@/components/messaging/ContactsList';
import { useToast } from '@/hooks/use-toast';

// Mock data for contacts and messages
const mockContacts = [
  {
    id: '1',
    name: 'أحمد محمد',
    lastMessage: 'متى يمكنني الحصول على قبول للجامعة؟',
    avatar: '/images/avatar-1.png',
    unreadCount: 2,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isOnline: true,
  },
  {
    id: '2',
    name: 'فاطمة علي',
    lastMessage: 'شكراً لمساعدتك في تقديم طلب القبول',
    avatar: '/images/avatar-2.png',
    unreadCount: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    isOnline: false,
  },
  {
    id: '3',
    name: 'محمد السيد',
    lastMessage: 'هل تم استلام المستندات المطلوبة؟',
    avatar: '/images/avatar-3.png',
    unreadCount: 1,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    isOnline: false,
  },
];

const mockMessages = {
  '1': [
    {
      id: '101',
      content: 'مرحباً، أود الاستفسار عن طلب القبول الخاص بي',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: '102',
      content: 'هل يمكنكم إخباري متى سيصدر قرار القبول؟',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      id: '103',
      content: 'مرحباً بك! سنقوم بمراجعة طلبك خلال الأيام القليلة القادمة وسنعلمك بالقرار',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    },
    {
      id: '104',
      content: 'متى يمكنني الحصول على قبول للجامعة؟',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ],
  '2': [
    {
      id: '201',
      content: 'السلام عليكم، أود أن أشكركم على المساعدة في تقديم طلب القبول',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: '202',
      content: 'وعليكم السلام، نحن سعداء بمساعدتك. هل لديك أي استفسارات أخرى؟',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    },
    {
      id: '203',
      content: 'شكراً لمساعدتك في تقديم طلب القبول',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    },
  ],
  '3': [
    {
      id: '301',
      content: 'لقد أرسلت جميع المستندات المطلوبة بالبريد الإلكتروني',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: '302',
      content: 'هل تم استلامها؟',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
  ],
};

const AgentMessages = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [contacts, setContacts] = useState(mockContacts);
  const [messages, setMessages] = useState(mockMessages);
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>(
    contacts.length > 0 ? contacts[0].id : undefined
  );

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!selectedContactId) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
    }));

    // Update the contact's last message
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === selectedContactId
          ? {
              ...contact,
              lastMessage: content,
              timestamp: new Date().toISOString(),
            }
          : contact
      )
    );

    toast({
      title: "تم إرسال الرسالة",
      description: "تم إرسال الرسالة بنجاح",
    });
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    
    // Mark messages as read
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, unreadCount: 0 }
          : contact
      )
    );
  };

  const selectedContact = contacts.find((c) => c.id === selectedContactId);
  const selectedMessages = selectedContactId ? messages[selectedContactId] || [] : [];

  return (
    <DashboardLayout userRole="agent">
      <div className="h-[calc(100vh-6rem)] p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
          <div className="md:col-span-1 h-full">
            <ContactsList
              contacts={contacts}
              selectedContactId={selectedContactId}
              onSelectContact={handleSelectContact}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 h-full">
            {selectedContact ? (
              <MessagesList
                messages={selectedMessages}
                recipient={{
                  id: selectedContact.id,
                  name: selectedContact.name,
                  avatar: selectedContact.avatar,
                  isOnline: selectedContact.isOnline,
                }}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <p className="text-unlimited-gray">
                    يرجى اختيار محادثة لبدء المراسلة
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentMessages;
