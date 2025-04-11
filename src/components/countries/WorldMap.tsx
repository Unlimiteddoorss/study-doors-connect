
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { availableCountries } from '@/data/programsData';

const WorldMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [regions, setRegions] = useState<{ [key: string]: string[] }>({
    europe: ['Germany', 'United Kingdom', 'Ireland', 'Spain', 'Poland', 'Czech Republic', 'Malta', 'Montenegro', 'Macedonia', 'Kosovo', 'Bosnia and Herzegovina', 'Serbia', 'Scotland', 'Turkey', 'Northern Cyprus'],
    asia: ['Malaysia', 'Turkey', 'Azerbaijan', 'Georgia', 'United Arab Emirates'],
    america: ['United States'],
    africa: ['Egypt'],
    oceania: ['Australia']
  });

  const getCountriesByRegion = (region: string) => {
    return regions[region].filter(country => availableCountries.includes(country));
  };

  const getCountColor = (country: string) => {
    if (!availableCountries.includes(country)) return 'bg-gray-200 text-gray-500';
    return 'bg-unlimited-blue text-white hover:bg-unlimited-dark-blue';
  };

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">دول الدراسة المتاحة</h2>
        <p className="text-unlimited-gray">اختر المنطقة للاطلاع على الدول المتاحة للدراسة</p>
      </div>

      {/* خريطة العالم المبسطة */}
      <div className="relative max-w-4xl mx-auto mb-8 hidden md:block">
        <svg viewBox="0 0 1000 500" className="w-full h-auto">
          {/* أوروبا */}
          <path
            d="M500,200 Q520,180 540,150 Q580,140 610,130 Q630,120 650,130 Q670,140 690,120"
            fill="none"
            stroke={selectedRegion === 'europe' ? '#2563eb' : '#d1d5db'}
            strokeWidth="40"
            strokeLinecap="round"
            className="cursor-pointer hover:stroke-unlimited-blue transition-colors"
            onClick={() => setSelectedRegion('europe')}
          />
          
          {/* آسيا */}
          <path
            d="M690,120 Q710,140 730,150 Q750,160 770,150 Q790,140 810,150 Q830,160 850,170"
            fill="none"
            stroke={selectedRegion === 'asia' ? '#2563eb' : '#d1d5db'}
            strokeWidth="40"
            strokeLinecap="round"
            className="cursor-pointer hover:stroke-unlimited-blue transition-colors"
            onClick={() => setSelectedRegion('asia')}
          />
          
          {/* أفريقيا */}
          <path
            d="M550,240 Q570,260 590,270 Q610,280 630,290 Q650,300 670,290"
            fill="none"
            stroke={selectedRegion === 'africa' ? '#2563eb' : '#d1d5db'}
            strokeWidth="40"
            strokeLinecap="round"
            className="cursor-pointer hover:stroke-unlimited-blue transition-colors"
            onClick={() => setSelectedRegion('africa')}
          />
          
          {/* أمريكا الشمالية */}
          <path
            d="M300,150 Q320,140 340,150 Q360,160 380,170 Q400,180 420,170"
            fill="none"
            stroke={selectedRegion === 'america' ? '#2563eb' : '#d1d5db'}
            strokeWidth="40"
            strokeLinecap="round"
            className="cursor-pointer hover:stroke-unlimited-blue transition-colors"
            onClick={() => setSelectedRegion('america')}
          />
          
          {/* أستراليا */}
          <path
            d="M800,300 Q820,310 840,300 Q860,290 880,300"
            fill="none"
            stroke={selectedRegion === 'oceania' ? '#2563eb' : '#d1d5db'}
            strokeWidth="30"
            strokeLinecap="round"
            className="cursor-pointer hover:stroke-unlimited-blue transition-colors"
            onClick={() => setSelectedRegion('oceania')}
          />
          
          {/* تسميات القارات */}
          <text x="600" y="100" className="text-xs font-bold" fill="#4b5563">أوروبا</text>
          <text x="800" y="130" className="text-xs font-bold" fill="#4b5563">آسيا</text>
          <text x="620" y="330" className="text-xs font-bold" fill="#4b5563">أفريقيا</text>
          <text x="350" y="120" className="text-xs font-bold" fill="#4b5563">أمريكا الشمالية</text>
          <text x="840" y="330" className="text-xs font-bold" fill="#4b5563">أستراليا</text>
        </svg>
      </div>

      {/* اختيار المنطقة للأجهزة الصغيرة */}
      <div className="flex justify-center gap-2 mb-6 md:hidden">
        <Badge
          className={`cursor-pointer ${selectedRegion === 'europe' ? 'bg-unlimited-blue' : 'bg-gray-200 text-gray-700 hover:bg-unlimited-blue hover:text-white'}`}
          onClick={() => setSelectedRegion('europe')}
        >
          أوروبا
        </Badge>
        <Badge
          className={`cursor-pointer ${selectedRegion === 'asia' ? 'bg-unlimited-blue' : 'bg-gray-200 text-gray-700 hover:bg-unlimited-blue hover:text-white'}`}
          onClick={() => setSelectedRegion('asia')}
        >
          آسيا
        </Badge>
        <Badge
          className={`cursor-pointer ${selectedRegion === 'america' ? 'bg-unlimited-blue' : 'bg-gray-200 text-gray-700 hover:bg-unlimited-blue hover:text-white'}`}
          onClick={() => setSelectedRegion('america')}
        >
          أمريكا
        </Badge>
        <Badge
          className={`cursor-pointer ${selectedRegion === 'africa' ? 'bg-unlimited-blue' : 'bg-gray-200 text-gray-700 hover:bg-unlimited-blue hover:text-white'}`}
          onClick={() => setSelectedRegion('africa')}
        >
          أفريقيا
        </Badge>
        <Badge
          className={`cursor-pointer ${selectedRegion === 'oceania' ? 'bg-unlimited-blue' : 'bg-gray-200 text-gray-700 hover:bg-unlimited-blue hover:text-white'}`}
          onClick={() => setSelectedRegion('oceania')}
        >
          أستراليا
        </Badge>
      </div>

      {/* عرض الدول */}
      <div className="mt-8">
        {!selectedRegion ? (
          <div className="text-center p-6 bg-unlimited-blue/5 rounded-lg">
            <p>اختر منطقة من الخريطة لعرض الدول المتاحة للدراسة</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">
              الدول المتاحة في {
                selectedRegion === 'europe' ? 'أوروبا' : 
                selectedRegion === 'asia' ? 'آسيا' : 
                selectedRegion === 'america' ? 'أمريكا' : 
                selectedRegion === 'africa' ? 'أفريقيا' : 'أستراليا'
              }
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {getCountriesByRegion(selectedRegion).map((country, index) => (
                <Link to={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${getCountColor(country)}`}>
                        {country.substring(0, 2)}
                      </div>
                      <h4 className="font-medium text-sm">{country}</h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
