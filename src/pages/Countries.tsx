import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { availableCountries } from '@/data/programsData'; // Import fixed

const Countries = () => {
  const { country } = useParams();
  const [selectedCountry, setSelectedCountry] = useState(country || '');

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const countryGroups = [
    {
      name: 'الوجهات الأوروبية',
      countries: ['Turkey', 'Germany', 'United Kingdom', 'Spain', 'Poland', 'Czech Republic', 'Hungary', 'Ireland', 'Scotland', 'Serbia']
    },
    {
      name: 'الوجهات الآسيوية',
      countries: ['Malaysia', 'United Arab Emirates', 'Azerbaijan']
    },
    {
      name: 'الوجهات الأخرى',
      countries: ['Australia', 'United States', 'Bosnia and Herzegovina', 'Egypt', 'Georgia', 'Kosovo', 'Macedonia', 'Malta', 'Montenegro', 'Northern Cyprus']
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="استكشف وجهات الدراسة"
          subtitle="اختر البلد الذي ترغب بالدراسة فيه وابدأ رحلتك التعليمية"
        />

        {/* Country Selection */}
        <div className="mb-8">
          <Label htmlFor="country" className="block text-sm font-medium text-unlimited-gray mb-2">
            اختر بلد الدراسة:
          </Label>
          <select
            id="country"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-unlimited-blue focus:border-unlimited-blue sm:text-sm rounded-md"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">-- اختر بلد --</option>
            {availableCountries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countryGroups.map((group) => (
            <div key={group.name}>
              <h3 className="text-lg font-semibold text-unlimited-blue mb-3">{group.name}</h3>
              {group.countries.map((country) => (
                <Card key={country}>
                  <CardHeader>
                    <CardTitle>{country}</CardTitle>
                    <CardDescription>اكتشف فرص الدراسة في {country}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    معلومات حول الجامعات والبرامج المتوفرة في {country}.
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a href={`/countries/${country}`} className="flex items-center">
                        استكشف {country} <ArrowRight className="mr-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Countries;
