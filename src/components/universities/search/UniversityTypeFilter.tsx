
import React from 'react';
import { Building } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UniversityTypeFilterProps {
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const UniversityTypeFilter: React.FC<UniversityTypeFilterProps> = ({
  selectedType,
  setSelectedType
}) => {
  return (
    <div className="relative">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="pl-4 pr-10">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-400" />
            <SelectValue placeholder="نوع الجامعة" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع الأنواع</SelectItem>
          <SelectItem value="Public">جامعات حكومية</SelectItem>
          <SelectItem value="Private">جامعات خاصة</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UniversityTypeFilter;
