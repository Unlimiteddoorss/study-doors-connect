
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { availableCountries } from '@/data/programsData';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ProgramSearchProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  searchQuery?: string; 
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry?: string;
  setSelectedCountry?: React.Dispatch<React.SetStateAction<string>>;
  selectedDegree?: string;
  setSelectedDegree?: React.Dispatch<React.SetStateAction<string>>;
  selectedSpecialty?: string;
  setSelectedSpecialty?: React.Dispatch<React.SetStateAction<string>>;
  handleSearch?: (e: React.FormEvent) => void;
  resetFilters?: () => void;
  countryTranslations?: Record<string, string>;
  placeholder?: string;
}

const ProgramSearch: React.FC<ProgramSearchProps> = ({ 
  onSearch, 
  onFilterChange,
  searchTerm = "",
  setSearchTerm,
  searchQuery = "",
  setSearchQuery,
  selectedCountry = null,
  setSelectedCountry,
  selectedDegree,
  setSelectedDegree,
  selectedSpecialty,
  setSelectedSpecialty,
  handleSearch,
  resetFilters,
  countryTranslations = {},
  placeholder = "ابحث عن برنامج دراسي..."
}) => {
  const [open, setOpen] = useState(false);
  
  // Use either searchTerm or searchQuery based on what's provided
  const localSearchTerm = searchQuery !== undefined ? searchQuery : (searchTerm !== undefined ? searchTerm : "");
  const localSetSearchTerm = setSearchQuery || setSearchTerm || (() => {});
  
  const handleLocalSearch = () => {
    if (onSearch) {
      onSearch(localSearchTerm);
    }
    
    if (handleSearch) {
      handleSearch(new Event('submit') as any);
    }
  };

  const handleCountrySelect = (value: string) => {
    if (setSelectedCountry) {
      setSelectedCountry(value);
      setOpen(false);
    }
    
    if (onFilterChange) {
      onFilterChange({ country: value });
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={localSearchTerm}
          onChange={(e) => localSetSearchTerm(e.target.value)}
          className="pl-10 pr-4"
        />
        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-[200px]">
              {selectedCountry 
                ? availableCountries.find(country => country.value === selectedCountry)?.label
                : "اختر الدولة"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="ابحث عن دولة..." />
              <CommandList>
                <CommandEmpty>لا توجد نتائج.</CommandEmpty>
                <CommandGroup>
                  {availableCountries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.value}
                      onSelect={handleCountrySelect}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedCountry === country.value ? "opacity-100" : "opacity-0"}`}
                      />
                      {country.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <Button onClick={handleLocalSearch} className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
          بحث
        </Button>
        
        {selectedCountry && (
          <Button
            variant="outline"
            onClick={() => {
              if (setSelectedCountry) {
                setSelectedCountry(null);
              }
              if (onFilterChange) {
                onFilterChange({ country: null });
              }
              if (resetFilters) {
                resetFilters();
              }
            }}
            className="gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {availableCountries.find(c => c.value === selectedCountry)?.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgramSearch;
