
import { useState, useEffect } from 'react';
import MessagesContainer from './messages/MessagesContainer';
import { useToast } from '@/components/ui/use-toast';
import { markMessagesAsRead } from '@/services/messageService';

interface ApplicationMessagesProps {
  programName: string;
  universityName: string;
  applicationId: string;
}

const ApplicationMessages = ({ programName, universityName, applicationId }: ApplicationMessagesProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Simulate loading messages
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [applicationId]);
  
  useEffect(() => {
    // Mark messages as read when component mounts
    const markAsRead = async () => {
      try {
        // In a real app, you would get the current user ID
        const userId = 'student-1'; // Placeholder for demo
        await markMessagesAsRead(applicationId, userId);
        console.log(`Marked messages as read for application ID: ${applicationId}`);
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    };
    
    markAsRead();
  }, [applicationId]);

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
