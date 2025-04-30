
import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

export interface Contact {
  id: string | number;
  name: string;
  role: string;
  avatar?: string | null;
  lastMessage: string;
  timestamp: string;
  lastMessageTime: Date;
  unread: number;
  unreadCount?: number;
}

interface ContactsListProps {
  contacts: Contact[];
  selectedContactId?: string | number | null;
  activeContactId?: string;
  onSelectContact: (contactId: any) => void;
}

const ContactsList = ({ contacts, selectedContactId, activeContactId, onSelectContact }: ContactsListProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-unlimited-dark-blue';
      case 'agent':
        return 'bg-unlimited-blue';
      default:
        return 'bg-unlimited-gray';
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-270px)]">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`p-3 cursor-pointer hover:bg-gray-100 border-b ${
            (selectedContactId === contact.id || activeContactId === contact.id) ? 'bg-gray-100' : ''
          }`}
          onClick={() => onSelectContact(contact.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full ${getRoleColor(contact.role)} flex items-center justify-center text-white`}>
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
                {contact.lastMessageTime ? 
                  formatDistanceToNow(contact.lastMessageTime, { addSuffix: true, locale: ar }) : 
                  contact.timestamp}
              </div>
              {(contact.unread > 0 || contact.unreadCount && contact.unreadCount > 0) && (
                <Badge className="bg-unlimited-blue">{contact.unreadCount || contact.unread}</Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default ContactsList;
