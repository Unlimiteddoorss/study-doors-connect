import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { availableCountries } from '@/data/programsData';

const WorldMap = () => {
  const navigate = useNavigate();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (country: string) => {
    navigate(`/countries/${country.toLowerCase()}`);
  };

  return (
    <Card className="shadow-md overflow-hidden">
      <CardContent className="p-6">
        <div className="aspect-[16/9] relative bg-gray-100 rounded-md overflow-hidden">
          {/* Placeholder for the map - would be replaced by actual interactive map */}
          <div className="absolute inset-0 bg-[url('/images/world-map.svg')] bg-contain bg-no-repeat bg-center">
            {/* Sample country markers */}
            {availableCountries.map((country, index) => (
              <div
                key={country}
                className="absolute"
                style={{
                  top: `${20 + (index % 5) * 15}%`,
                  left: `${10 + (index * 7) % 80}%`,
                }}
              >
                <button
                  className="group relative"
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountryClick(country)}
                >
                  <MapPin
                    className={`h-6 w-6 text-unlimited-blue transition-all ${
                      hoveredCountry === country
                        ? "h-7 w-7 text-unlimited-dark-blue"
                        : ""
                    }`}
                    fill={hoveredCountry === country ? "#e1effe" : "none"}
                  />
                  
                  {hoveredCountry === country && (
                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md px-3 py-1 text-sm min-w-[100px] text-center z-10">
                      <p className="font-medium">{country}</p>
                      <Badge variant="outline" className="mt-1">
                        {Math.floor(Math.random() * 50) + 10} برامج
                      </Badge>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          انقر على أي دولة لاستعراض الجامعات والبرامج المتاحة فيها
        </p>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
