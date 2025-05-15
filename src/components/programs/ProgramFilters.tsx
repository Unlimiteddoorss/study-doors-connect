import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ProgramFiltersValues {
  search: string;
  country: string[];
  degreeType: string[];
  language: string[];
  duration: [number, number];
  tuitionRange: [number, number];
  hasScholarship: boolean;
  isPopular: boolean;
}

interface ProgramFiltersProps {
  onApplyFilters: (filters: ProgramFiltersValues) => void;
  countries: string[];
  languages: string[];
  initialFilters: ProgramFiltersValues;
  isMobileFilterOpen?: boolean;
  onCloseMobileFilter?: () => void;
  className?: string;
}

const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  onApplyFilters,
  countries,
  languages,
  initialFilters,
  isMobileFilterOpen,
  onCloseMobileFilter,
  className = ""
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [search, setSearch] = useState(initialFilters.search);
  const [country, setCountry] = useState(initialFilters.country);
  const [degreeType, setDegreeType] = useState(initialFilters.degreeType);
  const [language, setLanguage] = useState(initialFilters.language);
  const [duration, setDuration] = useState(initialFilters.duration);
  const [tuitionRange, setTuitionRange] = useState(initialFilters.tuitionRange);
  const [hasScholarship, setHasScholarship] = useState(initialFilters.hasScholarship);
  const [isPopular, setIsPopular] = useState(initialFilters.isPopular);

  const toggleCountryFilter = (countryCode: string) => {
    if (country.includes(countryCode)) {
      setCountry(country.filter(c => c !== countryCode));
    } else {
      setCountry([...country, countryCode]);
    }
  };

  const toggleDegreeTypeFilter = (degree: string) => {
    if (degreeType.includes(degree)) {
      setDegreeType(degreeType.filter(d => d !== degree));
    } else {
      setDegreeType([...degreeType, degree]);
    }
  };

  const toggleLanguageFilter = (lang: string) => {
    if (language.includes(lang)) {
      setLanguage(language.filter(l => l !== lang));
    } else {
      setLanguage([...language, lang]);
    }
  };

  const handleDurationChange = (value: number[]) => {
    setDuration([value[0], value[1]] as [number, number]);
  };

  const handleTuitionRangeChange = (value: number[]) => {
    setTuitionRange([value[0], value[1]] as [number, number]);
  };

  const resetFilters = () => {
    setSearch('');
    setCountry([]);
    setDegreeType([]);
    setLanguage([]);
    setDuration([1, 6]);
    setTuitionRange([0, 50000]);
    setHasScholarship(false);
    setIsPopular(false);
  };

  const applyFilters = () => {
    onApplyFilters({
      search,
      country,
      degreeType,
      language,
      duration,
      tuitionRange,
      hasScholarship,
      isPopular
    });
    if (isMobileFilterOpen && onCloseMobileFilter) {
      onCloseMobileFilter();
    }
  };

  return (
    <Card className={`border-0 shadow-none ${className}`}>
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
            <Input
              type="text"
              placeholder={t('programs.searchPlaceholder', 'ابحث عن برنامج...')}
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <h4 className="font-semibold text-unlimited-dark-blue mb-2">{t('programs.country', 'الدولة')}</h4>
          {countries.map(c => (
            <div key={c} className="flex items-center mb-2">
              <Checkbox
                id={`country-${c}`}
                checked={country.includes(c)}
                onCheckedChange={() => toggleCountryFilter(c)}
              />
              <label
                htmlFor={`country-${c}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {c}
              </label>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <h4 className="font-semibold text-unlimited-dark-blue mb-2">{t('programs.degreeType', 'نوع الدرجة')}</h4>
          <div>
            <div className="flex items-center mb-2">
              <Checkbox
                id="degree-bachelor"
                checked={degreeType.includes('bachelor')}
                onCheckedChange={() => toggleDegreeTypeFilter('bachelor')}
              />
              <label
                htmlFor="degree-bachelor"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('programs.bachelor', 'بكالوريوس')}
              </label>
            </div>
            <div className="flex items-center mb-2">
              <Checkbox
                id="degree-master"
                checked={degreeType.includes('master')}
                onCheckedChange={() => toggleDegreeTypeFilter('master')}
              />
              <label
                htmlFor="degree-master"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('programs.master', 'ماجستير')}
              </label>
            </div>
            <div className="flex items-center mb-2">
              <Checkbox
                id="degree-phd"
                checked={degreeType.includes('phd')}
                onCheckedChange={() => toggleDegreeTypeFilter('phd')}
              />
              <label
                htmlFor="degree-phd"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('programs.phd', 'دكتوراه')}
              </label>
            </div>
            <div className="flex items-center mb-2">
              <Checkbox
                id="degree-diploma"
                checked={degreeType.includes('diploma')}
                onCheckedChange={() => toggleDegreeTypeFilter('diploma')}
              />
              <label
                htmlFor="degree-diploma"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('programs.diploma', 'دبلوم')}
              </label>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <h4 className="font-semibold text-unlimited-dark-blue mb-2">{t('programs.language', 'اللغة')}</h4>
          {languages.map(l => (
            <div key={l} className="flex items-center mb-2">
              <Checkbox
                id={`language-${l}`}
                checked={language.includes(l)}
                onCheckedChange={() => toggleLanguageFilter(l)}
              />
              <label
                htmlFor={`language-${l}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {l}
              </label>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <h4 className="font-semibold text-unlimited-dark-blue mb-2">{t('programs.duration', 'المدة')}</h4>
          <div className="flex items-center justify-between text-sm text-unlimited-gray mb-2">
            <span>{duration[0]} {t('programs.years', 'سنوات')}</span>
            <span>{duration[1]} {t('programs.years', 'سنوات')}</span>
          </div>
          <Slider
            defaultValue={duration}
            min={1}
            max={6}
            step={1}
            onValueChange={handleDurationChange}
          />
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <h4 className="font-semibold text-unlimited-dark-blue mb-2">{t('programs.tuitionFees', 'الرسوم الدراسية')}</h4>
          <div className="flex items-center justify-between text-sm text-unlimited-gray mb-2">
            <span>{tuitionRange[0]} USD</span>
            <span>{tuitionRange[1]} USD</span>
          </div>
          <Slider
            defaultValue={tuitionRange}
            min={0}
            max={50000}
            step={1000}
            onValueChange={handleTuitionRangeChange}
          />
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-unlimited-dark-blue">{t('programs.options', 'خيارات')}</h4>
          </div>
          <div className="mt-2">
            <div className="flex items-center mb-2">
              <Checkbox
                id="has-scholarship"
                checked={hasScholarship}
                onCheckedChange={() => setHasScholarship(!hasScholarship)}
              />
              <label
                htmlFor="has-scholarship"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('programs.hasScholarship', 'منح دراسية متاحة')}
              </label>
            </div>
            <div className="flex items-center mb-2">
              <Checkbox
                id="is-popular"
                checked={isPopular}
                onCheckedChange={() => setIsPopular(!isPopular)}
              />
              <label
                htmlFor="is-popular"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('programs.isPopular', 'برامج شائعة')}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={resetFilters} className="text-unlimited-gray hover:text-unlimited-dark-blue">
            {t('programs.resetFilters', 'إعادة تعيين')}
          </Button>
          <Button onClick={applyFilters} className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
            {t('programs.applyFilters', 'تطبيق الفلاتر')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramFilters;
