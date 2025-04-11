
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Make these available to import from the data file
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

// Program specialties - full list
const programSpecialties = [
  'Accounting and Auditing', 'Accounting, Finance & Economics', 'Aerospace, Aeronautical', 
  'Agriculture', 'Agriculture Engineering', 'Animal Science', 'Anthropology', 'Arabic', 
  'Archaeology', 'Architectural Engineering', 'Architecture', 'Art', 'Astronomy', 
  'Aviation Management', 'Aviation Technology', 'Biochemistry', 'Biology', 'Biomedical', 
  'Biomedical Engineering', 'Business Administration, Management, General', 
  'Cartoon & Animation', 'Chemical Engineering', 'Chemistry', 'Civil Aviation Cabin Services', 
  'Civil Engineering & Construction', 'Communications', 'Community, Social Service', 
  'Comparative Literature', 'Computer Science', 'Cultural Studies, European Studies', 'Dentistry', 
  'Digital Microchip Design & Verification', 'Education', 'Electrical & Electronics Engineering', 
  'Engineering Management', 'English', 'English for Academic Studies', 'English Language and Literature', 
  'English Literature', 'Entrepreneurship', 'Environmental Engineering', 'Environmental, Earth Sciences', 
  'Fashion, Esthetics', 'Fine Arts & Design', 'Food and Culinary', 'Food Engineering', 
  'Food, Nutrition, Exercise', 'French', 'Game Design, Game Animation, Game Creation', 'Gastronomy', 
  'Gender Studies', 'General', 'Geography', 'Geology', 'German', 'Global Studies', 
  'Graphic Design, Interior Design', 'Handicrafts', 'Health Sciences, Nursing', 'History', 
  'Hospitality and Tourism, Recreation', 'Human Resources', 'Humanitarian Sciences', 
  'Industrial Design', 'Industrial Engineering', 'Information Systems Management', 'Interior Design', 
  'International Business, International Trade', 'International Relations', 'Islamic Studies', 
  'Journalism', 'Law, Politics, Policy & Security', 'Liberal Arts', 'Literature, Languages', 
  'Logistics & Supply Chain', 'Logistics and Transportation', 'Marine Science', 
  'Marketing, Analyst, Advertising', 'Material Engineering', 'Mathematics', 
  'Mechanical, Energy, Manufacturing, Robotic', 'Media, Photography, Film, Theater, Performance', 
  'Medicine', 'Molecular Biology and Genetics', 'Molecular Biology, Genetics, and Bioengineering', 
  'Music', 'Music, Audio', 'Natural and Mathematical Sciences', 'New Media', 'Optometry', 
  'Paramedic & Kinesiology', 'Petroleum Engineering', 'Pharmacy', 'Philosophy', 'Physics', 
  'Pilotage', 'Political', 'Political Science & Public Administration', 'Professional Pilot, Civil Aviation', 
  'Psychology', 'Psychology, Philosophy, Therapy', 'Public Relations', 'Public Relations & Advertising', 
  'Public Relations and Advertising', 'Radio, Television and Cinema', 'Radiography', 
  'Real Estate & Asset Valuation', 'Religion', 'Russian', 'Sociology', 'Spanish', 
  'Sports Management', 'Sports Science', 'Teaching, Early Development, Child Care', 
  'Technology, Software, Computer, IT', 'Theater', 'Tourism & Hotel Management', 
  'Translation & Interpretation', 'Transportation Engineering', 'Turkish', 
  'Turkish Language and Literature', 'Urban Planning', 'Veterinarian'
];

// Language options
const languageOptions = ['الإنجليزية', 'التركية', 'العربية', 'الروسية', 'الألمانية', 'الفرنسية'];

interface FiltersState {
  countries: string[];
  levels: string[];
  specialties: string[];
  languages: string[];
}

interface ProgramFiltersProps {
  filters: FiltersState;
  toggleCountryFilter: (country: string) => void;
  toggleLevelFilter: (level: string) => void;
  toggleSpecialtyFilter: (specialty: string) => void;
  toggleLanguageFilter: (language: string) => void;
  resetFilters: () => void;
}

const ProgramFilters = ({
  filters,
  toggleCountryFilter,
  toggleLevelFilter,
  toggleSpecialtyFilter,
  toggleLanguageFilter,
  resetFilters
}: ProgramFiltersProps) => {
  
  const totalActiveFilters = 
    filters.countries.length + 
    filters.levels.length + 
    filters.languages.length + 
    filters.specialties.length;
  
  return (
    <>
      {/* Advanced Filters Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" type="button" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>تصفية متقدمة</span>
            {totalActiveFilters > 0 && (
              <span className="h-5 w-5 rounded-full bg-unlimited-blue text-white text-xs flex items-center justify-center">
                {totalActiveFilters}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-right">خيارات التصفية المتقدمة</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="countries">
                <AccordionTrigger>الدول</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {availableCountries.map((country) => (
                      <div key={country} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id={`country-${country}`} 
                          checked={filters.countries.includes(country)}
                          onCheckedChange={() => toggleCountryFilter(country)}
                        />
                        <Label htmlFor={`country-${country}`}>{country}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="levels">
                <AccordionTrigger>المستوى الدراسي</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {degreeTypes.map((degree) => (
                      <div key={degree} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id={`level-${degree}`} 
                          checked={filters.levels.includes(degree)}
                          onCheckedChange={() => toggleLevelFilter(degree)}
                        />
                        <Label htmlFor={`level-${degree}`}>{degree}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specialties">
                <AccordionTrigger>التخصصات</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {programSpecialties.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id={`specialty-${specialty}`}
                          checked={filters.specialties.includes(specialty)}
                          onCheckedChange={() => toggleSpecialtyFilter(specialty)}
                        />
                        <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="languages">
                <AccordionTrigger>لغة الدراسة</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {languageOptions.map((language) => (
                      <div key={language} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id={`language-${language}`}
                          checked={filters.languages.includes(language)}
                          onCheckedChange={() => toggleLanguageFilter(language)}
                        />
                        <Label htmlFor={`language-${language}`}>{language}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-6 flex gap-2">
            <Button 
              className="flex-grow" 
              variant="outline"
              onClick={resetFilters}
            >
              إعادة ضبط
            </Button>
            <Button className="flex-grow bg-unlimited-blue hover:bg-unlimited-dark-blue">
              تطبيق
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Display active filters */}
      {totalActiveFilters > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-unlimited-gray">التصفيات النشطة:</span>
          {filters.countries.map(country => (
            <Badge key={country} variant="outline" className="px-3 py-1 gap-2">
              {country}
              <button 
                onClick={() => toggleCountryFilter(country)}
                className="text-unlimited-gray hover:text-unlimited-dark-blue"
              >
                ×
              </button>
            </Badge>
          ))}
          {filters.levels.map(level => (
            <Badge key={level} variant="outline" className="px-3 py-1 gap-2">
              {level}
              <button 
                onClick={() => toggleLevelFilter(level)}
                className="text-unlimited-gray hover:text-unlimited-dark-blue"
              >
                ×
              </button>
            </Badge>
          ))}
          {filters.specialties.map(specialty => (
            <Badge key={specialty} variant="outline" className="px-3 py-1 gap-2">
              {specialty}
              <button 
                onClick={() => toggleSpecialtyFilter(specialty)}
                className="text-unlimited-gray hover:text-unlimited-dark-blue"
              >
                ×
              </button>
            </Badge>
          ))}
          {filters.languages.map(language => (
            <Badge key={language} variant="outline" className="px-3 py-1 gap-2">
              {language}
              <button 
                onClick={() => toggleLanguageFilter(language)}
                className="text-unlimited-gray hover:text-unlimited-dark-blue"
              >
                ×
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-unlimited-gray">
            مسح الكل
          </Button>
        </div>
      )}
    </>
  );
};

export default ProgramFilters;
