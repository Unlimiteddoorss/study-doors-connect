
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UniversityTypeFilterProps {
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const UniversityTypeFilter: React.FC<UniversityTypeFilterProps> = ({
  selectedType,
  setSelectedType,
}) => {
  return (
    <Select 
      value={selectedType} 
      onValueChange={setSelectedType}
    >
      <SelectTrigger className="h-12 text-lg">
        <SelectValue placeholder="نوع الجامعة" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">جميع أنواع الجامعات</SelectItem>
        <SelectItem value="Public">حكومية</SelectItem>
        <SelectItem value="Private">خاصة</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UniversityTypeFilter;
