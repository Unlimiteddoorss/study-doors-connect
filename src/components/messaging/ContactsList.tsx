import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Contact {
  id: string;
  name: string;
  lastMessage?: string;
  avatar?: string;
  unreadCount?: number;
  timestamp?: string;
  isOnline?: boolean;
}

interface ContactsListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contactId: string) => void;
  className?: string;
}

const ContactsList = ({
  contacts,
  selectedContactId,
  onSelectContact,
  className,
}: ContactsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    
    const messageDate = new Date(timestamp);
    const today = new Date();
    
    // Check if the message is from today
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    }
    
    // Check if the message is from this week
    const diff = today.getTime() - messageDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 7) {
      return messageDate.toLocaleDateString('ar-SA', { weekday: 'short' });
    }
    
    // Otherwise show the date
    return messageDate.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card className={cn("h-full flex flex-col overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">المحادثات</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
          <Input
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="divide-y">
            {filteredContacts.length === 0 ? (
              <div className="p-4 text-center text-unlimited-gray">
                لا توجد محادثات لعرضها
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                    contact.id === selectedContactId && "bg-gray-100"
                  )}
                  onClick={() => onSelectContact(contact.id)}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        {contact.timestamp && (
                          <span className="text-xs text-unlimited-gray">
                            {formatTime(contact.timestamp)}
                          </span>
                        )}
                      </div>
                      {contact.lastMessage && (
                        <p className="text-sm text-unlimited-gray truncate">
                          {contact.lastMessage}
                        </p>
                      )}
                    </div>
                    {contact.unreadCount && contact.unreadCount > 0 && (
                      <Badge className="bg-unlimited-blue ml-2">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ContactsList;
