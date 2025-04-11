
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowRight, Filter, Map, Search, School, SlidersHorizontal } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// Countries data from the provided screenshots
const availableCountries = [
  'Australia', 'Azerbaijan', 'Bosnia and Herzegovina', 'Czech Republic', 'Egypt', 
  'Georgia', 'Germany', 'Hungary', 'Ireland', 'Kosovo', 'Macedonia', 'Malaysia', 
  'Malta', 'Montenegro', 'Northern Cyprus', 'Poland', 'Scotland', 'Serbia', 'Spain', 
  'Turkey', 'United Kingdom', 'United States'
];

// Degree types from the provided screenshots
const degreeTypes = [
  'Associate', 'Bachelor', 'Diploma', 'Doctorate', 'Foundation Year', 
  'Language Course', 'Master', 'Training Course'
];

// Program specialties from the provided screenshots
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

const dummyPrograms = [
  {
    id: 1,
    title: 'بكالوريوس إدارة الأعمال',
    university: 'جامعة أوزيجين',
    location: 'تركيا، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$13,000 / سنة',
    discount: '$12,350',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'ماجستير علوم الحاسوب',
    university: 'جامعة فاتح سلطان محمد',
    location: 'تركيا، إسطنبول',
    language: 'الإنجليزية',
    duration: 'سنتان',
    deadline: '1 يوليو 2025',
    fee: '$15,000 / سنة',
    discount: '$14,250',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'دكتوراه الهندسة المدنية',
    university: 'جامعة المجر للتكنولوجيا',
    location: 'المجر، بودابست',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 سبتمبر 2025',
    fee: '$18,000 / سنة',
    discount: '$17,100',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'بكالوريوس الاقتصاد',
    university: 'جامعة أوزيجين',
    location: 'تركيا، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$12,500 / سنة',
    discount: '$12,000',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    title: 'بكالوريوس ريادة الأعمال',
    university: 'جامعة أوزيجين',
    location: 'تركيا، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$13,000 / سنة',
    discount: '$12,350',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    title: 'بكالوريوس التمويل الدولي',
    university: 'جامعة أوزيجين',
    location: 'تركيا، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$13,500 / سنة',
    discount: '$12,800',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState(dummyPrograms);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  
  // Filters state
  const [filters, setFilters] = useState({
    countries: [] as string[],
    levels: [] as string[],
    specialties: [] as string[],
    languages: [] as string[],
  });

  // Update filtered programs when search term or filters change
  useEffect(() => {
    let result = dummyPrograms;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        program =>
          program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply country filters
    if (filters.countries.length > 0) {
      result = result.filter(program => {
        const programCountry = program.location.split('،')[0].trim();
        return filters.countries.some(country => programCountry === country);
      });
    }
    
    // Apply level filters (this would need proper tagging in the data)
    if (filters.levels.length > 0) {
      result = result.filter(program => {
        if (program.title.includes('بكالوريوس') && filters.levels.includes('البكالوريوس')) return true;
        if (program.title.includes('ماجستير') && filters.levels.includes('الماجستير')) return true;
        if (program.title.includes('دكتوراه') && filters.levels.includes('الدكتوراه')) return true;
        return false;
      });
    }
    
    // Apply language filters
    if (filters.languages.length > 0) {
      result = result.filter(program => 
        filters.languages.includes(program.language)
      );
    }
    
    setFilteredPrograms(result);
  }, [searchTerm, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };

  const toggleCountryFilter = (country: string) => {
    setFilters(prevFilters => {
      if (prevFilters.countries.includes(country)) {
        return {
          ...prevFilters,
          countries: prevFilters.countries.filter(c => c !== country)
        };
      } else {
        return {
          ...prevFilters,
          countries: [...prevFilters.countries, country]
        };
      }
    });
  };

  const toggleLevelFilter = (level: string) => {
    setFilters(prevFilters => {
      if (prevFilters.levels.includes(level)) {
        return {
          ...prevFilters,
          levels: prevFilters.levels.filter(l => l !== level)
        };
      } else {
        return {
          ...prevFilters,
          levels: [...prevFilters.levels, level]
        };
      }
    });
  };

  const toggleSpecialtyFilter = (specialty: string) => {
    setFilters(prevFilters => {
      if (prevFilters.specialties.includes(specialty)) {
        return {
          ...prevFilters,
          specialties: prevFilters.specialties.filter(s => s !== specialty)
        };
      } else {
        return {
          ...prevFilters,
          specialties: [...prevFilters.specialties, specialty]
        };
      }
    });
  };

  const toggleLanguageFilter = (language: string) => {
    setFilters(prevFilters => {
      if (prevFilters.languages.includes(language)) {
        return {
          ...prevFilters,
          languages: prevFilters.languages.filter(l => l !== language)
        };
      } else {
        return {
          ...prevFilters,
          languages: [...prevFilters.languages, language]
        };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      countries: [],
      levels: [],
      specialties: [],
      languages: [],
    });
    setSearchTerm('');
    setSelectedCountry("");
    setSelectedDegree("");
    setSelectedSpecialty("");
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    if (value && value !== "all") {
      setFilters(prev => ({
        ...prev,
        countries: [value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        countries: []
      }));
    }
  };

  const handleDegreeChange = (value: string) => {
    setSelectedDegree(value);
    if (value && value !== "all") {
      const levelMapping: {[key: string]: string} = {
        'Bachelor': 'البكالوريوس',
        'Master': 'الماجستير',
        'Doctorate': 'الدكتوراه',
      };
      
      const arabicLevel = levelMapping[value] || value;
      
      setFilters(prev => ({
        ...prev,
        levels: [arabicLevel]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        levels: []
      }));
    }
  };

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
    if (value && value !== "all") {
      setFilters(prev => ({
        ...prev,
        specialties: [value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        specialties: []
      }));
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="البرامج الدراسية"
          subtitle="استكشف مئات البرامج الدراسية في أفضل الجامعات العالمية"
        />

        {/* Enhanced Search Bar with Dropdown Selects */}
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
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
                <Select value={selectedDegree} onValueChange={handleDegreeChange}>
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
                <Select value={selectedSpecialty} onValueChange={handleSpecialtyChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    <SelectGroup>
                      <SelectLabel>التخصصات</SelectLabel>
                      <SelectItem value="all">جميع التخصصات</SelectItem>
                      {programSpecialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" type="button" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span>تصفية متقدمة</span>
                    {(filters.countries.length > 0 || 
                     filters.levels.length > 0 || 
                     filters.languages.length > 0 || 
                     filters.specialties.length > 0) && (
                      <span className="h-5 w-5 rounded-full bg-unlimited-blue text-white text-xs flex items-center justify-center">
                        {filters.countries.length + filters.levels.length + filters.languages.length + filters.specialties.length}
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
                            {['الإنجليزية', 'التركية', 'العربية', 'الروسية', 'الألمانية', 'الفرنسية'].map((language) => (
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
                    <Button className="flex-grow">
                      تطبيق
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Button type="submit">بحث</Button>
              {(filters.countries.length > 0 || 
                filters.levels.length > 0 || 
                filters.languages.length > 0 || 
                filters.specialties.length > 0 || 
                searchTerm) && (
                <Button variant="ghost" onClick={resetFilters}>
                  مسح البحث
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Results info */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-unlimited-gray">
            تم العثور على {filteredPrograms.length} برنامج دراسي
          </p>
          <div className="flex items-center gap-2">
            <span className="text-unlimited-gray">ترتيب حسب:</span>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-md text-unlimited-gray focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
              defaultValue="relevance"
            >
              <option value="relevance">الأكثر صلة</option>
              <option value="newest">الأحدث</option>
              <option value="priceAsc">السعر: من الأقل للأعلى</option>
              <option value="priceDesc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.countries.length > 0 || filters.levels.length > 0 || filters.languages.length > 0 || filters.specialties.length > 0) && (
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

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-unlimited-gray mb-2">
                  <School className="h-4 w-4 ml-1" />
                  <span className="text-sm">{program.university}</span>
                </div>
                <h3 className="font-bold text-lg line-clamp-2">{program.title}</h3>
                <div className="flex items-center text-unlimited-gray">
                  <Map className="h-4 w-4 ml-1" />
                  <span className="text-sm">{program.location}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-unlimited-gray">اللغة:</span>
                    <p>{program.language}</p>
                  </div>
                  <div>
                    <span className="text-unlimited-gray">المدة:</span>
                    <p>{program.duration}</p>
                  </div>
                  <div>
                    <span className="text-unlimited-gray">الموعد النهائي:</span>
                    <p>{program.deadline}</p>
                  </div>
                  <div>
                    <span className="text-unlimited-gray">الرسوم:</span>
                    <p className="line-through text-unlimited-gray">{program.fee}</p>
                    <p className="font-semibold text-unlimited-blue">{program.discount}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/programs/${program.id}`}>عرض التفاصيل</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على برامج تطابق بحثك</p>
            <Button onClick={resetFilters}>إعادة ضبط البحث</Button>
          </div>
        )}

        {/* Pagination - for future implementation */}
        {filteredPrograms.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="icon" disabled className="mr-2">
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="mx-1 bg-unlimited-blue text-white">1</Button>
            <Button variant="outline" size="sm" className="mx-1">2</Button>
            <Button variant="outline" size="sm" className="mx-1">3</Button>
            <Button variant="outline" size="icon" className="ml-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Programs;
