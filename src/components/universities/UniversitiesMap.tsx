
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { University } from '@/components/universities/UniversityCard';

interface UniversitiesMapProps {
  universities: University[];
  onSelectUniversity?: (universityId: number) => void;
  countryTranslations?: Record<string, string>;
}

const UniversitiesMap: React.FC<UniversitiesMapProps> = ({ 
  universities,
  onSelectUniversity,
  countryTranslations = {}
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // تحديد المواقع الرئيسية في تركيا لعرض نقاط الخريطة
  const locations = {
    'Istanbul': { top: 25, left: 40 },
    'Ankara': { top: 40, left: 55 },
    'Antalya': { top: 70, left: 50 },
    'Izmir': { top: 60, left: 20 },
    'Bursa': { top: 35, left: 45 },
    'Konya': { top: 55, left: 60 },
    'Kayseri': { top: 45, left: 70 },
    'Trabzon': { top: 25, left: 85 },
    'Eskisehir': { top: 40, left: 45 },
    'Alanya': { top: 75, left: 60 },
    'Sakarya': { top: 30, left: 50 },
    'Kyrenia': { top: 85, left: 80 }, // شمال قبرص
    'Nicosia': { top: 90, left: 75 }, // شمال قبرص
    'Famagusta': { top: 90, left: 85 }, // شمال قبرص
  };
  
  // حساب عدد الجامعات في كل مدينة
  const countByCity = universities.reduce((acc, university) => {
    const city = university.city;
    if (!acc[city]) acc[city] = [];
    acc[city].push(university);
    return acc;
  }, {} as Record<string, University[]>);

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${expanded ? 'h-[500px] sticky top-4' : 'h-[250px]'}`}>
      <div className="relative w-full h-full bg-gray-100">
        {/* خريطة تركيا (يمكن استبدالها بصورة خريطة حقيقية) */}
        <div className="absolute inset-0 bg-white p-4">
          <div className="relative w-full h-full border border-gray-200 rounded-lg bg-blue-50 overflow-hidden">
            {/* الخط الساحلي التقريبي لتركيا (تمثيل بسيط) */}
            <div className="absolute top-5 left-5 right-10 bottom-10 border-2 border-blue-300 rounded-[50%] border-r-0 bg-gradient-to-r from-blue-100 to-green-100"></div>
            
            {/* تمثيل شمال قبرص */}
            <div className="absolute top-[85%] left-[75%] w-[15%] h-[10%] bg-green-100 border border-blue-300 rounded-md"></div>
            
            {/* وضع نقاط الجامعات على الخريطة */}
            {Object.entries(locations).map(([city, position]) => {
              const universities = countByCity[city] || [];
              const count = universities.length;
              if (count === 0) return null;
              
              return (
                <button
                  key={city}
                  className={`absolute group rounded-full bg-unlimited-blue hover:bg-unlimited-dark-blue text-white
                          transition-all duration-200 flex items-center justify-center
                          ${count > 5 ? 'w-10 h-10' : count > 2 ? 'w-8 h-8' : 'w-6 h-6'}`}
                  style={{ top: `${position.top}%`, left: `${position.left}%` }}
                  onClick={() => onSelectUniversity && universities.length > 0 && onSelectUniversity(universities[0].id)}
                >
                  {count}
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 bg-white text-unlimited-dark-blue shadow-lg rounded p-2 text-xs whitespace-nowrap">
                    {countryTranslations[city] || city}: {count} جامعة
                  </div>
                </button>
              );
            })}
            
            {/* عنوان الخريطة */}
            <div className="absolute top-2 left-2 bg-white/80 p-2 rounded-lg shadow-sm">
              <h3 className="font-semibold text-unlimited-dark-blue text-sm flex items-center">
                <MapPin className="w-4 h-4 ml-1" /> 
                توزيع الجامعات في تركيا
              </h3>
            </div>
          </div>
        </div>
        
        {/* زر توسيع/تصغير الخريطة */}
        <Button 
          variant="outline" 
          size="sm"
          className="absolute top-2 left-2 bg-white hover:bg-gray-100 z-10"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          <span className="mr-1">{expanded ? 'تصغير' : 'توسيع'} الخريطة</span>
        </Button>
      </div>
    </Card>
  );
};

export default UniversitiesMap;
