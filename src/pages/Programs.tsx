
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
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
    
    // Apply other filters here when implemented
    
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="البرامج الدراسية"
          subtitle="استكشف مئات البرامج الدراسية في أفضل الجامعات العالمية"
        />

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" type="button">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>تصفية</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-right">خيارات التصفية</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="countries">
                      <AccordionTrigger>الدول</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {['تركيا', 'المجر', 'بولندا', 'التشيك', 'قبرص', 'مصر', 'سوريا'].map((country) => (
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
                          {['البكالوريوس', 'الماجستير', 'الدكتوراه'].map((level) => (
                            <div key={level} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Checkbox 
                                id={`level-${level}`} 
                                checked={filters.levels.includes(level)}
                                onCheckedChange={() => toggleLevelFilter(level)}
                              />
                              <Label htmlFor={`level-${level}`}>{level}</Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="specialties">
                      <AccordionTrigger>التخصصات</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {['إدارة الأعمال', 'الهندسة', 'الطب', 'علوم الحاسوب', 'العلوم الإنسانية', 'العلوم الاجتماعية'].map((specialty) => (
                            <div key={specialty} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Checkbox id={`specialty-${specialty}`} />
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
                          {['الإنجليزية', 'التركية', 'العربية', 'الروسية'].map((language) => (
                            <div key={language} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Checkbox id={`language-${language}`} />
                              <Label htmlFor={`language-${language}`}>{language}</Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button className="flex-grow" onClick={() => setFilters({ countries: [], levels: [], specialties: [], languages: [] })}>
                    إعادة ضبط
                  </Button>
                  <Button variant="outline" className="flex-grow">
                    تطبيق
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button type="submit">بحث</Button>
          </form>
        </div>

        {/* Results info */}
        <div className="mb-6 flex justify-between items-center">
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
            <Button onClick={() => setSearchTerm('')}>إعادة ضبط البحث</Button>
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
