
import React from 'react';
import { MapPin } from 'lucide-react';
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
  // ترجمة أسماء المدن
  const translateCity = (city: string): string => {
    return countryTranslations[city] || city;
  };

  return (
    <div className="relative">
      <Select value={selectedCity} onValueChange={setSelectedCity}>
        <SelectTrigger className="pl-4 pr-10">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <SelectValue placeholder="اختر المدينة" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع المدن</SelectItem>
          {cities.map(city => (
            <SelectItem key={city} value={city}>
              {translateCity(city)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationFilter;
