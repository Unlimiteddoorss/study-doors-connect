
import MessagesContainer from './messages/MessagesContainer';

interface ApplicationMessagesProps {
  programName: string;
  universityName: string;
  applicationId: number;
}

const ApplicationMessages = ({ programName, universityName, applicationId }: ApplicationMessagesProps) => {
  return <MessagesContainer programName={programName} universityName={universityName} applicationId={applicationId} />;
};

export default ApplicationMessages;
