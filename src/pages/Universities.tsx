
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, School } from 'lucide-react';
import { turkishUniversities } from '@/data/programsData';

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(turkishUniversities);

  useEffect(() => {
    if (searchTerm) {
      setFilteredUniversities(
        turkishUniversities.filter(
          university =>
            university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            university.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUniversities(turkishUniversities);
    }
  }, [searchTerm]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="الجامعات التركية"
          subtitle="استكشف أفضل الجامعات التركية وتعرف على برامجها وميزاتها"
        />

        {/* Search Component */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن جامعة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Results info */}
        <div className="mb-6">
          <p className="text-unlimited-gray">
            تم العثور على <span className="font-semibold text-unlimited-blue">{filteredUniversities.length}</span> جامعة
          </p>
        </div>

        {/* Universities Grid */}
        {filteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((university) => (
              <Card key={university.id} className="overflow-hidden transition-all hover:shadow-lg hover:border-unlimited-blue">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={university.image}
                    alt={university.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-xl mb-2">{university.name}</h3>
                  <div className="flex items-center text-unlimited-gray">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{university.location}, Turkey</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-unlimited-gray">تأسست عام:</p>
                      <p className="font-medium">{university.founded}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray">النوع:</p>
                      <p className="font-medium">{university.type}</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray">البرامج:</p>
                      <p className="font-medium">{university.programs}+ برنامج</p>
                    </div>
                    <div>
                      <p className="text-unlimited-gray">الرسوم:</p>
                      <p className="font-medium text-unlimited-blue">{university.fees}</p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                    <Link to={`/universities/${university.id}`}>عرض التفاصيل</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على جامعات تطابق بحثك</p>
            <Button onClick={() => setSearchTerm("")} className="bg-unlimited-blue hover:bg-unlimited-dark-blue">إعادة ضبط البحث</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Universities;
