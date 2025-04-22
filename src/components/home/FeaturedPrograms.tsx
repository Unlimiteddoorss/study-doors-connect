import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/shared/SectionTitle';
import ProgramCard from '@/components/programs/ProgramCard';
import { Program } from '@/components/programs/ProgramCard';
import { dummyPrograms } from '@/data/programsData';

// Filter featured programs
const featuredPrograms: Program[] = dummyPrograms
  .filter(program => program.isFeatured)
  .slice(0, 6);

// Convert to Program interface if needed
const typedFeaturedPrograms: Program[] = featuredPrograms;

const categories = ['الجميع', 'الطب', 'الهندسة', 'إدارة الأعمال', 'التكنولوجيا'];

const FeaturedPrograms = () => {
  const [activeCategory, setActiveCategory] = useState('الجميع');

  const filteredPrograms = activeCategory === 'الجميع'
    ? typedFeaturedPrograms
    : typedFeaturedPrograms.filter(program => {
        if (activeCategory === 'الطب') return program.title.includes('طب') || program.title.includes('صيدلة') || program.title.includes('طبي') || program.title.includes('تمريض');
        if (activeCategory === 'الهندسة') return program.title.includes('هندسة');
        if (activeCategory === 'إدارة الأعمال') return program.title.includes('إدارة أعمال') || program.title.includes('تسويق') || program.title.includes('محاسبة');
        if (activeCategory === 'التكنولوجيا') return program.title.includes('تكنولوجيا') || program.title.includes('برمجة') || program.title.includes('حاسوب');
        return true;
      });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="برامج مميزة"
          subtitle="اكتشف أحدث البرامج الدراسية التي نوصي بها في أفضل الجامعات"
        />

        <div className="flex justify-center space-x-4 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild size="lg" className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
            <Link to="/programs">
              استكشف جميع البرامج
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
