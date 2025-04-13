
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationFilterProps {
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  cities: string[];
  countryTranslations: Record<string, string>;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedCity,
  setSelectedCity,
  cities,
  countryTranslations
}) => {
  // ترجمة اسم المدينة من الإنجليزية إلى العربية
  const translateCity = (city: string): string => {
    return countryTranslations[city] || city;
  };
  
  return (
    <Select 
      value={selectedCity} 
      onValueChange={setSelectedCity}
    >
      <SelectTrigger className="h-12 text-lg">
        <SelectValue placeholder="اختر المدينة" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">جميع المدن</SelectItem>
        {cities.sort().map((city) => (
          <SelectItem key={city} value={city}>
            {translateCity(city)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationFilter;
