
import { useState, useEffect } from 'react';
import MessagesContainer from './messages/MessagesContainer';
import { useToast } from '@/components/ui/use-toast';

interface ApplicationMessagesProps {
  programName: string;
  universityName: string;
  applicationId: number;
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
    console.log(`Marking messages as read for application ID: ${applicationId}`);
    // This would be an API call in a real application
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
