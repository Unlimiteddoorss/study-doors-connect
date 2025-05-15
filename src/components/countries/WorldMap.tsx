
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { availableCountries } from '@/data/programsData';

interface CountryOption {
  value: string;
  label: string;
}

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCountries = searchQuery 
    ? availableCountries.filter(country => 
        country.label.includes(searchQuery) || 
        country.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availableCountries;
  
  return (
    <Card className="dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="mb-4 relative">
          <Input
            type="text"
            placeholder="ابحث عن دولة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredCountries.map((country) => (
            <Button
              key={country.value}
              variant={selectedCountry === country.value ? "default" : "outline"}
              onClick={() => setSelectedCountry(country.value)}
              className="justify-between"
            >
              <span>{country.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
