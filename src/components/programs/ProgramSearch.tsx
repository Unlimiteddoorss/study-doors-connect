
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

// Country and degree data from the Programs page
const availableCountries = [
  'Australia', 'Azerbaijan', 'Bosnia and Herzegovina', 'Czech Republic', 'Egypt', 
  'Georgia', 'Germany', 'Hungary', 'Ireland', 'Kosovo', 'Macedonia', 'Malaysia', 
  'Malta', 'Montenegro', 'Northern Cyprus', 'Poland', 'Scotland', 'Serbia', 'Spain', 
  'Turkey', 'United Kingdom', 'United States'
];

// Degree types
const degreeTypes = [
  'Associate', 'Bachelor', 'Diploma', 'Doctorate', 'Foundation Year', 
  'Language Course', 'Master', 'Training Course'
];

// Program specialties (first 20 for this dropdown, the full list will be in the filter)
const commonSpecialties = [
  'Accounting and Auditing', 'Architecture', 'Business Administration', 'Computer Science',
  'Civil Engineering', 'Economics', 'Education', 'Electrical Engineering', 'Law',
  'Marketing', 'Mathematics', 'Mechanical Engineering', 'Medicine', 'Nursing',
  'Pharmacy', 'Psychology', 'Physics', 'Political Science', 'Software Engineering', 'Tourism'
];

interface ProgramSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedDegree: string;
  setSelectedDegree: (degree: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  resetFilters: () => void;
}

const ProgramSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedDegree,
  setSelectedDegree,
  selectedSpecialty,
  setSelectedSpecialty,
  handleSearch,
  resetFilters
}: ProgramSearchProps) => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  return (
    <div className="max-w-5xl mx-auto mb-10">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text"
            placeholder="ابحث عن برامج، جامعات، تخصصات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
        
        {/* Always visible quick filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select value={selectedCountry} onValueChange={(value) => setSelectedCountry(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>الدول</SelectLabel>
                  <SelectItem value="all">جميع الدول</SelectItem>
                  {availableCountries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={selectedDegree} onValueChange={(value) => setSelectedDegree(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر المستوى الدراسي" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>المستوى الدراسي</SelectLabel>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  {degreeTypes.map(degree => (
                    <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={selectedSpecialty} onValueChange={(value) => setSelectedSpecialty(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر التخصص" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                <SelectGroup>
                  <SelectLabel>التخصصات</SelectLabel>
                  <SelectItem value="all">جميع التخصصات</SelectItem>
                  {commonSpecialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button type="submit" className="bg-unlimited-blue hover:bg-unlimited-dark-blue">بحث</Button>
          {(selectedCountry || selectedDegree || selectedSpecialty || searchTerm) && (
            <Button variant="outline" onClick={resetFilters} type="button">
              مسح البحث
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProgramSearch;
