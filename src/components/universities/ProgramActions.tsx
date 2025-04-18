
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProgramActionsProps {
  programId: number;
  universityId: number;
}

const ProgramActions: React.FC<ProgramActionsProps> = ({ programId, universityId }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/apply?program=${programId}&university=${universityId}`);
  };

  const handleViewDetails = () => {
    navigate(`/programs/${programId}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button 
        onClick={handleApply}
        className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
      >
        تقدم الآن
      </Button>
      <Button 
        onClick={handleViewDetails}
        variant="outline" 
        className="w-full"
      >
        التفاصيل
      </Button>
    </div>
  );
};

export default ProgramActions;
