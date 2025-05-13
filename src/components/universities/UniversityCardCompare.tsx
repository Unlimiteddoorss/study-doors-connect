
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UniversityCardCompareProps {
  id: number;
  isSelected: boolean;
  onToggleCompare: (id: number) => void;
}

const UniversityCardCompare: React.FC<UniversityCardCompareProps> = ({
  id,
  isSelected,
  onToggleCompare
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare(id);
            }}
            className={`absolute top-2 left-2 z-10 opacity-70 hover:opacity-100 ${isSelected ? 'bg-unlimited-blue' : 'bg-white'}`}
          >
            {isSelected ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isSelected ? 'إزالة من المقارنة' : 'إضافة للمقارنة'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UniversityCardCompare;
