
import { useState, useEffect } from 'react';
import MessagesContainer from './messages/MessagesContainer';
import { useToast } from '@/hooks/use-toast';
import { markMessagesAsRead } from '@/services/messageService';

interface ApplicationMessagesProps {
  programName: string;
  universityName: string;
  applicationId: string;
}

const ApplicationMessages = ({ programName, universityName, applicationId }: ApplicationMessagesProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  
  useEffect(() => {
    // Simulate loading messages
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Simulate new messages notification
      if (Math.random() > 0.5) {
        setHasNewMessages(true);
        toast({
          title: "رسائل جديدة",
          description: "لديك رسائل جديدة متعلقة بهذا الطلب",
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

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
        </div>
      ) : (
        <MessagesContainer 
          programName={programName} 
          universityName={universityName} 
          applicationId={applicationId} 
        />
      )}
    </div>
  );
};

export default ApplicationMessages;
