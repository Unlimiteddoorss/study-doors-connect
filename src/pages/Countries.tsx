
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, GraduationCap, Building } from 'lucide-react';
import { availableCountries } from '@/data/programsData';

interface CountryOption {
  value: string;
  label: string;
}

interface CountryInfo {
  id: string;
  name: string;
  nameAr: string;
  flag: string;
  description: string;
  universitiesCount: number;
  programsCount: number;
  featuredUniversities: string[];
  featuredPrograms: string[];
  visa: {
    requirements: string[];
    process: string;
    duration: string;
  };
  livingCost: {
    accommodation: string;
    food: string;
    transport: string;
    total: string;
  };
}

const countriesData: CountryInfo[] = [
  {
    id: "turkey",
    name: "Turkey",
    nameAr: "تركيا",
    flag: "/images/countries/turkey-flag.png",
    description: "تُعد تركيا وجهة دراسية رائدة توفر تعليمًا عالي الجودة بتكاليف معقولة. تجمع بين التقاليد العريقة والتطور الحديث، وتضم العديد من الجامعات المرموقة. تتميز بموقعها الإستراتيجي الذي يربط بين آسيا وأوروبا، وتوفر بيئة آمنة وغنية ثقافياً للطلاب الدوليين.",
    universitiesCount: 207,
    programsCount: 850,
    featuredUniversities: [
      "جامعة إسطنبول التقنية",
      "جامعة بيلكنت",
      "جامعة الشرق الأوسط التقنية"
    ],
    featuredPrograms: [
      "الطب البشري",
      "الهندسة المدنية",
      "علوم الحاسوب"
    ],
    visa: {
      requirements: [
        "جواز سفر ساري المفعول",
        "خطاب قبول من الجامعة",
        "إثبات القدرة المالية",
        "تأمين صحي"
      ],
      process: "يمكن التقديم عبر السفارة أو القنصلية التركية، ويستغرق معالجة الطلب حوالي 15-30 يومًا.",
      duration: "سنة واحدة قابلة للتجديد"
    },
    livingCost: {
      accommodation: "$150 - $350 شهرياً",
      food: "$150 - $200 شهرياً",
      transport: "$30 - $50 شهرياً",
      total: "$400 - $600 شهرياً"
    }
  },
  {
    id: "cyprus",
    name: "Cyprus",
    nameAr: "قبرص",
    flag: "/images/countries/cyprus-flag.png",
    description: "تتميز قبرص بمناخها المتوسطي الجميل وتوفر تعليماً عالي الجودة بنظام تعليمي بريطاني. تضم العديد من الجامعات المعترف بها دولياً، وتعتبر واحدة من أكثر الوجهات الدراسية أماناً في أوروبا مع تكاليف معيشة معقولة نسبياً مقارنة بدول أوروبية أخرى.",
    universitiesCount: 25,
    programsCount: 420,
    featuredUniversities: [
      "جامعة قبرص الشرقية",
      "جامعة قبرص الدولية",
      "جامعة جيرنا الأمريكية"
    ],
    featuredPrograms: [
      "إدارة الأعمال",
      "السياحة والضيافة",
      "العلوم الصحية"
    ],
    visa: {
      requirements: [
        "جواز سفر ساري المفعول",
        "خطاب قبول من الجامعة",
        "إثبات القدرة المالية",
        "تأمين صحي"
      ],
      process: "يتم التقديم عبر السفارة القبرصية، ويستغرق معالجة الطلب حوالي 4-6 أسابيع.",
      duration: "تصريح إقامة طالب لمدة سنة قابلة للتجديد"
    },
    livingCost: {
      accommodation: "$250 - $450 شهرياً",
      food: "$200 - $300 شهرياً",
      transport: "$50 - $80 شهرياً",
      total: "$500 - $800 شهرياً"
    }
  }
];

const Countries = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  
  // Filter countries based on search query
  const filteredCountries = searchQuery 
    ? availableCountries.filter(country => 
        country.label.includes(searchQuery) || 
        country.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availableCountries;
  
  // Handle country selection
  const handleCountrySelect = (countryValue: string) => {
    const countryData = countriesData.find(c => c.id === countryValue);
    if (countryData) {
      setSelectedCountry(countryData);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-unlimited-blue">استكشف دول الدراسة</h1>
        <p className="text-unlimited-gray mb-8">
          تعرف على أفضل الوجهات الدراسية حول العالم ومميزات كل دولة وبرامجها الأكاديمية
        </p>
        
        <div className="mb-8 relative">
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
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {filteredCountries.map((country) => (
            <Button
              key={country.value}
              variant={selectedCountry?.id === country.value ? "default" : "outline"}
              onClick={() => handleCountrySelect(country.value)}
              className="justify-between"
            >
              {country.label}
            </Button>
          ))}
        </div>
        
        {selectedCountry && (
          <div className="space-y-8">
            <Card className="overflow-hidden">
              <div className="bg-unlimited-blue text-white p-6 flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCountry.nameAr}</h2>
                  <p className="text-unlimited-light-blue">وجهة دراسية مميزة للطلاب الدوليين</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <img 
                    src={selectedCountry.flag} 
                    alt={`علم ${selectedCountry.nameAr}`} 
                    className="h-16 rounded shadow"
                  />
                </div>
              </div>
              <CardContent className="p-6">
                <p className="mb-6 text-unlimited-gray">{selectedCountry.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Building className="h-8 w-8 text-unlimited-blue mr-4" />
                    <div>
                      <p className="font-bold text-xl">{selectedCountry.universitiesCount}+</p>
                      <p className="text-unlimited-gray">جامعة</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <GraduationCap className="h-8 w-8 text-unlimited-blue mr-4" />
                    <div>
                      <p className="font-bold text-xl">{selectedCountry.programsCount}+</p>
                      <p className="text-unlimited-gray">برنامج دراسي</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <MapPin className="h-8 w-8 text-unlimited-blue mr-4" />
                    <div>
                      <p className="font-bold text-xl">مدن متعددة</p>
                      <p className="text-unlimited-gray">خيارات متنوعة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-unlimited-blue">أبرز الجامعات</h3>
                  <ul className="space-y-3">
                    {selectedCountry.featuredUniversities.map((uni, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-unlimited-blue mt-1 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {uni}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-4 w-full">
                    استعرض جميع الجامعات
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-unlimited-blue">أشهر التخصصات</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.featuredPrograms.map((program, index) => (
                      <Badge key={index} variant="outline" className="text-unlimited-blue border-unlimited-blue px-3 py-1">
                        {program}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    استعرض جميع التخصصات
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-unlimited-blue">متطلبات التأشيرة</h3>
                  <ul className="space-y-3">
                    {selectedCountry.visa.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-unlimited-blue mt-1 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2 text-unlimited-gray">
                    <p><strong>عملية التقديم:</strong> {selectedCountry.visa.process}</p>
                    <p><strong>مدة التأشيرة:</strong> {selectedCountry.visa.duration}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-unlimited-blue">تكاليف المعيشة</h3>
                  <div className="space-y-3 text-unlimited-gray">
                    <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                      <p>السكن:</p>
                      <p className="font-medium">{selectedCountry.livingCost.accommodation}</p>
                    </div>
                    <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                      <p>الطعام:</p>
                      <p className="font-medium">{selectedCountry.livingCost.food}</p>
                    </div>
                    <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                      <p>المواصلات:</p>
                      <p className="font-medium">{selectedCountry.livingCost.transport}</p>
                    </div>
                    <div className="flex justify-between font-bold text-unlimited-blue">
                      <p>المجموع التقريبي:</p>
                      <p>{selectedCountry.livingCost.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                قدم طلب الآن للدراسة في {selectedCountry.nameAr}
              </Button>
            </div>
          </div>
        )}
        
        {!selectedCountry && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-unlimited-gray mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-unlimited-gray text-lg">
              اختر دولة من القائمة أعلاه لعرض المزيد من المعلومات
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Countries;
