
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <Button
        variant={currentView === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className={`rounded-l-md ${currentView === 'grid' ? 'bg-unlimited-blue' : 'bg-transparent'}`}
      >
        <Grid className="h-4 w-4 mr-1" />
        <span>شبكة</span>
      </Button>
      <Button
        variant={currentView === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className={`rounded-r-md ${currentView === 'list' ? 'bg-unlimited-blue' : 'bg-transparent'}`}
      >
        <List className="h-4 w-4 mr-1" />
        <span>قائمة</span>
      </Button>
    </div>
  );
};

export default ViewToggle;
